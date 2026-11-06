import { timestamp } from "drizzle-orm/pg-core";
export const timestamps = {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    upadatedAt: timestamp("updated_at").defaultNow().notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at").defaultNow(),
};
