// lib/coupon-security.ts
import { db } from "@/database/drizzle";
import { coupons, couponUsages } from "@/database/schema";
import { eq, and, lte, gte, count } from "drizzle-orm";
import { checkRateLimit as dbCheckRateLimit } from "@/database/session";

// 🔒 BIZTONSÁGI KONFIGURÁCIÓ
const SECURITY_CONFIG = {
  MAX_COUPON_ATTEMPTS_PER_MINUTE: 5,
  MAX_COUPON_ATTEMPTS_PER_HOUR: 20,
  SUSPICIOUS_ACTIVITY_THRESHOLD: 10,
  RATE_LIMIT_WINDOW_MS: 60 * 1000, // 1 perc
  AUDIT_LOG_RETENTION_DAYS: 90,
} as const;

// 🔒 BIZTONSÁGI AUDIT LOG
interface AuditLogEntry {
  timestamp: Date;
  userId: string;
  action: 'VALIDATE' | 'APPLY' | 'SUSPICIOUS' | 'RATE_LIMITED';
  couponCode?: string;
  couponId?: string;
  packageId?: number;
  success: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

// In-memory audit log (production-ban Redis vagy adatbázis)
const auditLog = new Map<string, AuditLogEntry[]>();

// 🔒 AUDIT LOG FUNKCIONALITÁS
export function logCouponActivity(entry: AuditLogEntry) {
  const key = `audit:${entry.userId}`;
  const userLogs = auditLog.get(key) || [];
  
  userLogs.push(entry);
  
  // Csak az utolsó 100 bejegyzést tartjuk meg felhasználónként
  if (userLogs.length > 100) {
    userLogs.splice(0, userLogs.length - 100);
  }
  
  auditLog.set(key, userLogs);
  
  // Konzolra is logolás biztonsági eseményekhez
  if (entry.action === 'SUSPICIOUS' || entry.action === 'RATE_LIMITED') {
    console.warn('🚨 BIZTONSÁGI ESEMÉNY:', entry);
  }
}

// 🔒 RATE LIMITING ELLENŐRZÉS
export async function checkRateLimit(userId: string, action: string): Promise<boolean> {
  const maxAttempts = action === 'validate' ? 
    SECURITY_CONFIG.MAX_COUPON_ATTEMPTS_PER_MINUTE : 
    SECURITY_CONFIG.MAX_COUPON_ATTEMPTS_PER_HOUR;
  
  const windowSeconds = action === 'validate' ? 60 : 3600; // 1 perc vagy 1 óra
  
  const allowed = await dbCheckRateLimit(userId, `coupon:${action}`, maxAttempts, windowSeconds);
  
  if (!allowed) {
    logCouponActivity({
      timestamp: new Date(),
      userId,
      action: 'RATE_LIMITED',
      success: false,
      errorMessage: `Túl sok kísérlet: ${maxAttempts} limit túllépve`,
      metadata: { action, windowSeconds }
    });
    return false;
  }
  
  return true;
}

// 🔒 GYANÚS AKTIVITÁS DETEKTÁLÁS
export function detectSuspiciousActivity(userId: string): boolean {
  const key = `audit:${userId}`;
  const userLogs = auditLog.get(key) || [];
  
  // Ellenőrzés: túl sok sikertelen próbálkozás az utolsó 10 percben
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const recentFailures = userLogs.filter(log => 
    log.timestamp > tenMinutesAgo && 
    !log.success && 
    (log.action === 'VALIDATE' || log.action === 'APPLY')
  );
  
  if (recentFailures.length >= SECURITY_CONFIG.SUSPICIOUS_ACTIVITY_THRESHOLD) {
    logCouponActivity({
      timestamp: new Date(),
      userId,
      action: 'SUSPICIOUS',
      success: false,
      errorMessage: `Gyanús aktivitás: ${recentFailures.length} sikertelen próbálkozás`,
      metadata: { recentFailures: recentFailures.length }
    });
    return true;
  }
  
  return false;
}

// 🔒 BIZTONSÁGI WRAPPER A KUPON VALIDÁCIÓHOZ
export async function secureValidateCoupon(
  userId: string,
  couponCode: string,
  packageId: number,
  request?: Request
): Promise<{ success: boolean; coupon?: any; calculation?: any; error?: string }> {
  
  // Rate limiting ellenőrzés
  if (!(await checkRateLimit(userId, 'validate'))) {
    return {
      success: false,
      error: 'Túl sok kísérlet. Kérlek várj egy percet.'
    };
  }
  
  // Gyanús aktivitás ellenőrzés
  if (detectSuspiciousActivity(userId)) {
    return {
      success: false,
      error: 'Gyanús aktivitás észlelve. Kérlek vedd fel a kapcsolatot a támogatással.'
    };
  }
  
  try {
    // Kupon validáció
    const result = await validateCouponInDatabase(userId, couponCode, packageId);
    
    // Audit log
    logCouponActivity({
      timestamp: new Date(),
      userId,
      action: 'VALIDATE',
      couponCode,
      couponId: result.coupon?.id,
      packageId,
      success: result.success,
      errorMessage: result.error,
      ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || 'unknown',
      userAgent: request?.headers.get('user-agent') || 'unknown'
    });
    
    return result;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ismeretlen hiba';
    
    // Audit log
    logCouponActivity({
      timestamp: new Date(),
      userId,
      action: 'VALIDATE',
      couponCode,
      packageId,
      success: false,
      errorMessage,
    });
    
    return {
      success: false,
      error: 'Szerverhiba a kupon ellenőrzés során'
    };
  }
}

// 🔒 ADATBÁZIS KUPON VALIDÁCIÓ
async function validateCouponInDatabase(userId: string, couponCode: string, packageId: number) {
  // Kupon keresése
  const couponResult = await db
    .select()
    .from(coupons)
    .where(
      and(
        eq(coupons.code, couponCode.toUpperCase()),
        eq(coupons.isActive, true),
        lte(coupons.validFrom, new Date()),
        gte(coupons.validUntil, new Date())
      )
    )
    .limit(1);

  if (couponResult.length === 0) {
    return {
      success: false,
      error: 'Érvénytelen vagy lejárt kupon kód'
    };
  }

  const coupon = couponResult[0];

  // Használati limit ellenőrzése
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return {
      success: false,
      error: 'A kupon elérte a használati limitjét'
    };
  }

  // Felhasználó már használta-e ezt a kupont
  const userUsageResult = await db
    .select({ count: count() })
    .from(couponUsages)
    .where(
      and(
        eq(couponUsages.couponId, coupon.id),
        eq(couponUsages.userId, userId)
      )
    );

  if (userUsageResult[0]?.count > 0) {
    return {
      success: false,
      error: 'Ezt a kupon kódot már felhasználtad'
    };
  }

  // Csomag kompatibilitás ellenőrzése
  if (coupon.applicablePackages) {
    try {
      const applicablePackages = JSON.parse(coupon.applicablePackages);
      if (!applicablePackages.includes(packageId)) {
        return {
          success: false,
          error: 'A kupon nem érvényes erre a csomagra'
        };
      }
    } catch (e) {
      return {
        success: false,
        error: 'Kupon konfiguráció hiba'
      };
    }
  }

  // Minimum összeg ellenőrzése
  // Itt hozzáadhatnánk a pkg.price ellenőrzést...

  return {
    success: true,
    coupon,
    calculation: null // A calculation külön számolódik
  };
}

// 🔒 BIZTONSÁGI RIPORT GENERÁLÁS
export function generateSecurityReport(userId: string): {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  suspiciousActivity: boolean;
  recentLogs: AuditLogEntry[];
} {
  const key = `audit:${userId}`;
  const userLogs = auditLog.get(key) || [];
  
  const totalAttempts = userLogs.length;
  const successfulAttempts = userLogs.filter(log => log.success).length;
  const failedAttempts = totalAttempts - successfulAttempts;
  const suspiciousActivity = detectSuspiciousActivity(userId);
  
  // Utolsó 10 bejegyzés
  const recentLogs = userLogs.slice(-10);
  
  return {
    totalAttempts,
    successfulAttempts,
    failedAttempts,
    suspiciousActivity,
    recentLogs
  };
}

// 🔒 AUDIT LOG TISZTÍTÁS (periodikus hívás szükséges)
export function cleanupAuditLogs(): void {
  const cutoffDate = new Date(Date.now() - SECURITY_CONFIG.AUDIT_LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  
  for (const [key, logs] of auditLog.entries()) {
    const filteredLogs = logs.filter(log => log.timestamp > cutoffDate);
    
    if (filteredLogs.length === 0) {
      auditLog.delete(key);
    } else {
      auditLog.set(key, filteredLogs);
    }
  }
  
  console.log('🧹 Audit log tisztítás befejezve');
} 