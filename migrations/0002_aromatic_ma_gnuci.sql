CREATE TYPE "public"."day" AS ENUM('Hétfő', 'Kedd', 'Szerda', 'CSütörtök', 'Péntek', 'Szombat', 'Vasárnap');--> statement-breakpoint
CREATE TYPE "public"."package" AS ENUM('START', 'KASZA', 'KASZADELLA');--> statement-breakpoint
CREATE TABLE "weeklyTips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package" "package" NOT NULL,
	"day" "day" NOT NULL,
	"tip" text NOT NULL,
	"isSummary" numeric
);
