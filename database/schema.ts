import {
  uuid,
  text,
  integer,
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  date,
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

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").default("Pending"),
  role: ROLE_ENUM("role").default("USER"),
  package: text("package_id").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
