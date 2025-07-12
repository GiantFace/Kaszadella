import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq, lt, and } from "drizzle-orm";

// Egyszerű in-memory rate limiting (production-ban adatbázis tábla kellene)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting ellenőrzés
export async function checkRateLimit(
  identifier: string, 
  action: string, 
  limit: number, 
  windowSeconds: number
): Promise<boolean> {
  const now = Date.now();
  const key = `${identifier}:${action}`;
  
  // Tisztítás - töröljük a lejárt bejegyzéseket
  for (const [k, v] of rateLimitStore.entries()) {
    if (v.resetTime < now) {
      rateLimitStore.delete(k);
    }
  }
  
  const existing = rateLimitStore.get(key);
  
  if (!existing) {
    // Új bejegyzés
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + (windowSeconds * 1000)
    });
    return true;
  }
  
  if (existing.resetTime < now) {
    // Lejárt ablak - reset
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + (windowSeconds * 1000)
    });
    return true;
  }
  
  if (existing.count >= limit) {
    // Rate limit túllépve
    return false;
  }
  
  // Számláló növelése
  existing.count++;
  return true;
}

// Session kezelés egyszerű in-memory cache-szel (production-ban Redis vagy DB)
const sessionStore = new Map<string, { data: any; expiresAt: number }>();

export async function setSession(key: string, data: any, ttlSeconds: number = 3600) {
  const expiresAt = Date.now() + (ttlSeconds * 1000);
  sessionStore.set(key, { data, expiresAt });
}

export async function getSession(key: string) {
  const session = sessionStore.get(key);
  
  if (!session) return null;
  
  if (session.expiresAt < Date.now()) {
    sessionStore.delete(key);
    return null;
  }
  
  return session.data;
}

// Cache kezelés
const cacheStore = new Map<string, { value: any; expiresAt: number }>();

export async function setCache(key: string, value: any, ttlSeconds: number = 3600) {
  const expiresAt = Date.now() + (ttlSeconds * 1000);
  cacheStore.set(key, { value, expiresAt });
}

export async function getCache(key: string) {
  const cached = cacheStore.get(key);
  
  if (!cached) return null;
  
  if (cached.expiresAt < Date.now()) {
    cacheStore.delete(key);
    return null;
  }
  
  return cached.value;
}

// Cleanup task - törölje a lejárt elemeket
setInterval(() => {
  const now = Date.now();
  
  // Rate limit cleanup
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  // Session cleanup
  for (const [key, value] of sessionStore.entries()) {
    if (value.expiresAt < now) {
      sessionStore.delete(key);
    }
  }
  
  // Cache cleanup
  for (const [key, value] of cacheStore.entries()) {
    if (value.expiresAt < now) {
      cacheStore.delete(key);
    }
  }
}, 60000); // 1 percenként cleanup 