CREATE TYPE "public"."access_title" AS ENUM('user', 'guest', 'super-admin', 'admin', 'manager', 'accountant', 'sales');--> statement-breakpoint
CREATE TABLE "users" (
	"_id" bigserial NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone_no" varchar NOT NULL,
	"whatsapp_consent" boolean NOT NULL,
	"whatsapp_number" varchar,
	"password" varchar NOT NULL,
	"salt" varchar NOT NULL,
	"access_level" integer DEFAULT 0,
	"accessTitle" "access_title" DEFAULT 'user' NOT NULL,
	"is_deleted" integer DEFAULT 0,
	"is_blocked" integer DEFAULT 0,
	"is_archieved" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now(),
	"last_logged_in" date
);
