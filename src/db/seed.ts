import { db, pool } from "./connection";
import { expenseCategories } from "./schema/expenseCategories";

const defaults = [
  { name: "Food", icon: "🍔", color: "#F59E0B", sortOrder: 1 },
  { name: "Transport", icon: "🚗", color: "#3B82F6", sortOrder: 2 },
  { name: "Bills", icon: "🧾", color: "#8B5CF6", sortOrder: 3 },
  { name: "Shopping", icon: "🛍️", color: "#EC4899", sortOrder: 4 },
  { name: "Health", icon: "💊", color: "#10B981", sortOrder: 5 },
  { name: "Other", icon: "📦", color: "#6B7280", sortOrder: 99 },
];

async function seed() {
  await db.insert(expenseCategories).values(defaults).onConflictDoNothing();
  console.log("✅ Categories seeded");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});