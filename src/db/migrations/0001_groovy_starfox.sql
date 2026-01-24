ALTER TABLE "users" ADD PRIMARY KEY ("_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users__id_unique" UNIQUE("_id");