import { pgEnum } from "drizzle-orm/pg-core";
export const roles = pgEnum("role", ["user", "guest", "super-admin", "admin", "manager", "accountant", "sales"]);
