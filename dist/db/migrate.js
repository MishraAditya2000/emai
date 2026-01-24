import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";
// import env from "@/lib/env";
console.log(process.env.DB_URL);
const pool = new Pool({
    connectionString: process.env.DB_URL,
});
const db = drizzle(pool);
async function main() {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migration done!");
}
main()
    .catch((e) => {
    console.error(e);
    console.log(e.message);
})
    .finally(async () => {
    await pool.end();
});
