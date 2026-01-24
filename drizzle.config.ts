import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: [
    "./src/db/schema",
    "./src/db/helper"
  ],
  out:'./src/db/migrations',
  verbose:true,
  strict:true
})