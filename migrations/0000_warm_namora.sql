CREATE TYPE "public"."day" AS ENUM('Hétfő', 'Kedd', 'Szerda', 'CSütörtök', 'Péntek', 'Szombat', 'Vasárnap');--> statement-breakpoint
CREATE TYPE "public"."package" AS ENUM('START', 'KASZA', 'KASZADELLA');--> statement-breakpoint
CREATE TYPE "public"."period_status" AS ENUM('Expired', 'Active');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Pending', 'Approved', 'Customer');--> statement-breakpoint
CREATE TABLE "forgot_password_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket_tips" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"day_name" varchar(20) NOT NULL,
	"subscription" varchar(50) NOT NULL,
	"package" varchar(50) NOT NULL,
	"combination" varchar(20) NOT NULL,
	"slip_name" varchar(100) NOT NULL,
	"tip_name" varchar(100) NOT NULL,
	"tip_description" varchar(255) NOT NULL,
	"odds_value" varchar(10) NOT NULL,
	"sum_odds" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"status" "status" DEFAULT 'Pending',
	"role" "role" DEFAULT 'USER',
	"package_id" text NOT NULL,
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"subscription_start" timestamp with time zone,
	"subscription_end" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "weeklyTips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package" "package" NOT NULL,
	"day" "day" NOT NULL,
	"tip" text NOT NULL,
	"total_odds" numeric
);
