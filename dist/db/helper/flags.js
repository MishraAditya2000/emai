import { boolean } from "drizzle-orm/pg-core";
export const flags = {
    isDeleted: { isDeleted: boolean("is_deleted").default(false) },
    isBlocked: { isBlocked: boolean("is_blocked").default(false) },
    isArchived: { isArchived: boolean("is_archived").default(false) }
};
