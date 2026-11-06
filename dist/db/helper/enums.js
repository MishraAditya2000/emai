import { pgEnum } from "drizzle-orm/pg-core";
export const userRoles = pgEnum("access_title", ["user", "guest", "super-admin", "admin", "manager", "accountant", "sales"]);
export const aiConfidenceEnum = pgEnum("ai_confidence", ["high", "low"]);
