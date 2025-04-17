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
