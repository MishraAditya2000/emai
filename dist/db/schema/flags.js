import { integer } from "drizzle-orm/pg-core";
export const flags = { isDeleted: integer("is_deleted").default(0),
    isBlocked: integer("is_blocked").default(0),
    isArchieved: integer("is_archieved").default(0), };
