CREATE TABLE "forgot_password_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "forgot_password_tokens_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_start" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_end" timestamp with time zone;