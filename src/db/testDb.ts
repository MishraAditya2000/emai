import { eq } from "drizzle-orm";
import { db, pool } from "./connection";
import { users } from "./schema/user";
import  {expenses} from "./schema/expenses";
import { expenseCategories } from "./schema/expenseCategories";
import { activeExpenses } from "./helper/filters";

async function test() {
  const [user] = await db
    .insert(users)
    .values({ googleId: "test-google-id", name: "Test User", email: "test@example.com" })
    .onConflictDoUpdate({ target: users.googleId, set: { name: "Test User" } })
    .returning();

  const [food] = await db
    .select()
    .from(expenseCategories)
    .where(eq(expenseCategories.name, "Food"));

  await db.insert(expenses).values({
    userId: user._id,
    categoryId: food._id,
    amount: "4000.00",
    description: "Dinner at XYZ Cafe",
    date: "2026-10-31",
    rawInput: "4000 dinner at XYZ cafe",
    aiConfidence: "high",
  });

  const rows = await db
    .select({
      amount: expenses.amount,
      description: expenses.description,
      date: expenses.date,
      category: expenseCategories.name,
    })
    .from(expenses)
    .innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories._id))
    .where(activeExpenses(user._id));

  console.log(rows);
  await pool.end();
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});