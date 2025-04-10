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
} from "drizzle-orm/pg-core";
import { number } from "@drizzle-team/brocli";
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
