// lib/simple-coupon-system.ts
// Egyszerű kupon rendszer adatbázis nélkül

interface SimpleCoupon {
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'free';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicablePackages: number[];
}

interface CouponCalculation {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  finalPriceFormatted: string;
  discountAmountFormatted: string;
  discountPercentage: string;
}

// Statikus kupon adatok
const STATIC_COUPONS: SimpleCoupon[] = [
  {
    code: "WELCOME20",
    name: "Üdvözlő 20% kedvezmény",
    type: "percentage",
    value: 20,
    minAmount: 0,
    maxDiscount: 2000,
    usageLimit: 100,
    usedCount: 0,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    applicablePackages: [1, 2, 3]
  },
  {
    code: "SAVE1000",
    name: "1000 Ft kedvezmény",
    type: "fixed", 
    value: 1000,
    minAmount: 3000,
    usageLimit: 50,
    usedCount: 0,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    applicablePackages: [2, 3]
  },
  {
    code: "FREESTART",
    name: "Ingyenes START csomag",
    type: "free",
    value: 0,
    minAmount: 0,
    usageLimit: 10,
    usedCount: 0,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    applicablePackages: [1]
  },
  {
    code: "TESTCOUPON",
    name: "Teszt kupon - 50%",
    type: "percentage",
    value: 50,
    minAmount: 0,
    usedCount: 0,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    applicablePackages: [1, 2, 3]
  }
];

// Használt kuponok tárolása (session-based)
const usedCoupons = new Map<string, Set<string>>(); // userId -> Set of couponCodes

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Kedvezmény számítás
function calculateDiscount(originalPrice: number, coupon: SimpleCoupon): CouponCalculation {
  let discountAmount = 0;
  
  switch (coupon.type) {
    case 'percentage':
      discountAmount = Math.round((originalPrice * coupon.value) / 100);
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
      break;
      
    case 'fixed':
      discountAmount = coupon.value;
      break;
      
    case 'free':
      discountAmount = originalPrice;
      break;
  }

  // Ne lehessen negatív ár
  discountAmount = Math.min(discountAmount, originalPrice);
  
  const finalPrice = originalPrice - discountAmount;
  const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

  return {
    originalPrice,
    discountAmount,
    finalPrice,
    finalPriceFormatted: finalPrice.toLocaleString('hu-HU'),
    discountAmountFormatted: discountAmount.toLocaleString('hu-HU'),
    discountPercentage: discountPercentage.toString()
  };
}

// Rate limiting ellenőrzés
function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const key = `coupon:${userId}`;
  const limit = rateLimitMap.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 }); // 1 perc
    return true;
  }
  
  if (limit.count >= 5) {
    return false;
  }
  
  limit.count++;
  return true;
}

// Kupon validáció
export async function validateSimpleCoupon(
  userId: string,
  couponCode: string,
  packageId: number,
  packagePrice: number
): Promise<{ success: boolean; coupon?: SimpleCoupon; calculation?: CouponCalculation; error?: string }> {
  
  // Rate limiting
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: 'Túl sok kísérlet. Kérlek várj egy percet.'
    };
  }
  
  // Kupon keresése
  const coupon = STATIC_COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
  
  if (!coupon) {
    return {
      success: false,
      error: 'Érvénytelen kupon kód'
    };
  }
  
  // Aktív-e
  if (!coupon.isActive) {
    return {
      success: false,
      error: 'A kupon nem aktív'
    };
  }
  
  // Érvényességi idő
  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    return {
      success: false,
      error: 'A kupon lejárt vagy még nem érvényes'
    };
  }
  
  // Használati limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return {
      success: false,
      error: 'A kupon elérte a használati limitjét'
    };
  }
  
  // Felhasználó már használta-e
  const userUsed = usedCoupons.get(userId) || new Set();
  if (userUsed.has(coupon.code)) {
    return {
      success: false,
      error: 'Ezt a kupon kódot már felhasználtad'
    };
  }
  
  // Csomag kompatibilitás
  if (!coupon.applicablePackages.includes(packageId)) {
    return {
      success: false,
      error: 'A kupon nem érvényes erre a csomagra'
    };
  }
  
  // Minimum összeg
  if (coupon.minAmount && packagePrice < coupon.minAmount) {
    return {
      success: false,
      error: `Minimum vásárlási összeg: ${coupon.minAmount.toLocaleString('hu-HU')} Ft`
    };
  }
  
  // Kedvezmény számítás
  const calculation = calculateDiscount(packagePrice, coupon);
  
  return {
    success: true,
    coupon,
    calculation
  };
}

// Kupon alkalmazás (session-based)
export function applyCoupon(userId: string, couponCode: string): void {
  const userUsed = usedCoupons.get(userId) || new Set();
  userUsed.add(couponCode.toUpperCase());
  usedCoupons.set(userId, userUsed);
  
  // Növeljük a használat számát
  const coupon = STATIC_COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
  if (coupon) {
    coupon.usedCount++;
  }
}

// Kupon eltávolítás
export function removeCoupon(userId: string, couponCode: string): void {
  const userUsed = usedCoupons.get(userId);
  if (userUsed) {
    userUsed.delete(couponCode.toUpperCase());
  }
} 