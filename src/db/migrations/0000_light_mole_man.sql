CREATE TYPE "public"."ai_confidence" AS ENUM('high', 'low');--> statement-breakpoint
CREATE TYPE "public"."access_title" AS ENUM('user', 'guest', 'super-admin', 'admin', 'manager', 'accountant', 'sales');--> statement-breakpoint
CREATE TABLE "expense_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"icon" text,
	"color" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"raw_input" text,
	"ai_confidence" "ai_confidence",
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now(),
	CONSTRAINT "amount_positive" CHECK ("expenses"."amount" > 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" text NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone_no" varchar,
	"whatsapp_number" varchar,
	"password" varchar,
	"salt" varchar,
	"access_level" integer DEFAULT 0,
	"accessTitle" "access_title" DEFAULT 'user' NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"is_blocked" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now(),
	"last_logged_in" date,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
ALTER TABLE "expense_categories" ADD CONSTRAINT "expense_categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_category_id_expense_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."expense_categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_category_system_name" ON "expense_categories" USING btree ("name") WHERE "expense_categories"."user_id" IS NULL AND "expense_categories"."is_deleted" = false;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_category_user_name" ON "expense_categories" USING btree ("user_id","name") WHERE "expense_categories"."user_id" IS NOT NULL AND "expense_categories"."is_deleted" = false;--> statement-breakpoint
CREATE INDEX "idx_expenses_user_date" ON "expenses" USING btree ("user_id","date");