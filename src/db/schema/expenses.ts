
import { pgTable, uuid, text, numeric, date, index, check,boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";
import { expenseCategories } from "./expenseCategories";
import { aiConfidenceEnum } from "../helper/enums";
import { timestamps } from "../helper/timestamps";
import { flags } from "../helper/flags";

export const expenses = pgTable(
  "expenses",
  {
    _id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users._id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => expenseCategories._id, { onDelete: "restrict" }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    description: text("description").notNull(),
    date: date("date", { mode: "string" }).notNull(),
    rawInput: text("raw_input"),
    aiConfidence: aiConfidenceEnum("ai_confidence"),
    ...flags.isDeleted,
    ...timestamps,
  },
  (t) => [
    index("idx_expenses_user_date").on(t.userId, t.date),
    check("amount_positive", sql`${t.amount} > 0`),
  ]
);