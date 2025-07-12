import {
  uuid,
  text,
  integer,
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  date,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "Pending",
  "Approved",
  "Customer",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const PERIOD_STATUS_ENUM = pgEnum("period_status", [
  "Expired",
  "Active",
]);

export const PACKAGE_ENUM = pgEnum("package", ["START", "KASZA", "KASZADELLA"]);
export const DAY_ENUM = pgEnum("day", [
  "Hétfő",
  "Kedd",
  "Szerda",
  "CSütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
]);
export const weeklyTips = pgTable("weeklyTips", {
  id: uuid("id").primaryKey().defaultRandom(),
  package: PACKAGE_ENUM("package").notNull(), // START, KASZA, KASZADELLA
  day: DAY_ENUM("day").notNull(), // Hétfő, Kedd, ...
  tip: text("tip").notNull(), // Tipp szöveg vagy összesítő odds
  oddsSummary: numeric("total_odds"), //
});

export const forgotPasswordTokens = pgTable("forgot_password_tokens", {
  id: uuid("id").notNull().primaryKey().defaultRandom(), // Egyedi azonosító
  email: text("email").notNull(), // A felhasználó email címe, akinek a token tartozik
  token: text("token").notNull(), // A visszaállító token (pl. UUID vagy random string)
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), // Lejárati idő
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(), // Létrehozás dátuma
});

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").default("Pending"),
  role: ROLE_ENUM("role").default("USER"),
  package: text("package_id").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  subscription_start: timestamp("subscription_start", {
    withTimezone: true,
  }),
  subscription_end: timestamp("subscription_end", {
    withTimezone: true,
  }),
});

// lib/db/schema.ts

export const ticket_tips = pgTable("ticket_tips", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(), // YYYY-MM-DD
  day_name: varchar("day_name", { length: 20 }).notNull(), // pl. "Hétfő"
  subscription: varchar("subscription", { length: 50 }).notNull(), // pl. "Start csomag"
  package: varchar("package", { length: 50 }).notNull(), // pl. "Kicsi tipp"
  combination: varchar("combination", { length: 20 }).notNull(), // pl. "3-as kötés"
  slip_name: varchar("slip_name", { length: 100 }).notNull(), // pl. "20250416_St_Kic_3_1"
  tip_name: varchar("tip_name", { length: 100 }).notNull(),
  tip_description: varchar("tip_description", { length: 255 }).notNull(),
  odds_value: varchar("odds_value", { length: 10 }).notNull(), // X.XX
  sum_odds: varchar("sum_odds", { length: 10 }).notNull(), // X.XX
});

// 🎫 KUPON TÍPUSOK
export const COUPON_TYPE_ENUM = pgEnum("coupon_type", [
  "percentage", // százalékos kedvezmény (20%)
  "fixed",      // fix összeg (1000 Ft)
  "free"        // ingyenes
]);

// 🎫 KUPON KÓDOK TÁBLÁJA
export const coupons = pgTable("coupons", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 50 }).notNull().unique(), // "SAVE20"
  name: varchar("name", { length: 100 }).notNull(), // "Téli Akció"
  type: COUPON_TYPE_ENUM("type").notNull(),
  value: integer("value").notNull(), // 20 vagy 1000
  minAmount: integer("min_amount").default(0), // Min. vásárlási összeg
  maxDiscount: integer("max_discount"), // Max kedvezmény
  usageLimit: integer("usage_limit"), // Max használat
  usedCount: integer("used_count").default(0),
  validFrom: timestamp("valid_from", { withTimezone: true }).notNull(),
  validUntil: timestamp("valid_until", { withTimezone: true }).notNull(),
  isActive: boolean("is_active").default(true),
  applicablePackages: text("applicable_packages"), // JSON: [1,2,3]
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// 🎫 KUPON HASZNÁLAT NYILVÁNTARTÁS
export const couponUsages = pgTable("coupon_usages", {
  id: uuid("id").primaryKey().defaultRandom(),
  couponId: uuid("coupon_id").notNull().references(() => coupons.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  packageId: integer("package_id").notNull(),
  originalPrice: integer("original_price").notNull(),
  discountAmount: integer("discount_amount").notNull(), 
  finalPrice: integer("final_price").notNull(),
  stripeSessionId: varchar("stripe_session_id", { length: 200 }),
  usedAt: timestamp("used_at", { withTimezone: true }).notNull().defaultNow(),
});


// MEGJEGYZÉS: sessions, rateLimits, tempCache táblák helyett 
// in-memory megoldást használunk (database/session.ts)

export interface CouponCalculation {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
}

export function calculateDiscount(
  originalPrice: number,
  coupon: any
): CouponCalculation {
  let discountAmount = 0;

  switch (coupon.type) {
    case 'percentage':
      discountAmount = Math.round((originalPrice * coupon.value) / 100);
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount * 100);
      }
      break;
      
    case 'fixed':
      discountAmount = coupon.value * 100; // Ft -> fillér
      break;
      
    case 'free':
      discountAmount = originalPrice;
      break;
      
    default:
      discountAmount = 0;
  }

  // Ne lehessen negatív ár
  discountAmount = Math.min(discountAmount, originalPrice);
  
  const finalPrice = originalPrice - discountAmount;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

  return {
    originalPrice,
    discountAmount,
    finalPrice,
    discountPercentage
  };
}
