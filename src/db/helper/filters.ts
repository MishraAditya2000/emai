import { and, eq } from "drizzle-orm";
import { expenses } from "../schema/expenses";

export const activeExpenses = (userId: string) =>
  and(eq(expenses.userId, userId), eq(expenses.isDeleted, false));