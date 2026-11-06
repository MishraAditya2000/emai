import { pgTable, uuid, text, integer, uniqueIndex,boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { timestamps } from "../helper/timestamps";
import { flags } from "../helper/flags";
import { users } from "./user";

export const expenseCategories = pgTable(
  "expense_categories",
  {
    _id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users._id, {
      onDelete: "cascade",
    }),
    name: text("name").notNull(),
    icon: text("icon"),
    color: text("color"),
    sortOrder: integer("sort_order").notNull().default(0),
    isDeleted: boolean("is_deleted").notNull().default(false),
    ...timestamps,
  },
(t) => [
  uniqueIndex("uq_category_system_name")
    .on(t.name)
    .where(sql`${t.userId} IS NULL AND ${t.isDeleted} = false`),
  uniqueIndex("uq_category_user_name")
    .on(t.userId, t.name)
    .where(sql`${t.userId} IS NOT NULL AND ${t.isDeleted} = false`),
]
);