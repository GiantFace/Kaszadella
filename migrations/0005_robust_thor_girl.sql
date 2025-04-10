ALTER TABLE "weeklyTips" RENAME COLUMN "isSummary" TO "total_odds";--> statement-breakpoint
ALTER TABLE "forgot_password_tokens" DROP CONSTRAINT "forgot_password_tokens_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_start" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_end" timestamp with time zone;