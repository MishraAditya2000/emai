import { pgTable, integer, varchar, boolean, date, bigserial } from "drizzle-orm/pg-core";
import { timestamps } from "../helper/timestamps";
import { flags } from "../helper/flags";
import { userRoles } from "../helper/enums";
//pgEnum is used for enum values
export const user = pgTable('users', {
    /**
     * SYNTAX
     * COLUMN_NAME_IN_TS:DATA_TYPE(COLUMN_NAME_IN_DB)
     * COLUMN_NAME_IN_TS:DATA_TYPE NOTE:: HERE COLUMN_NAME_IN_TS IS THE NAME USED IN TS CODE
     */
    _id: bigserial({ mode: 'number' }).primaryKey().unique(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    phoneNo: varchar("phone_no").notNull().notNull(),
    whatsappConsent: boolean("whatsapp_consent").notNull(),
    whatsappNo: varchar("whatsapp_number"),
    password: varchar('password').notNull(),
    salt: varchar("salt").notNull(),
    accessLevel: integer("access_level").default(0),
    accessTitle: userRoles().default("user").notNull(),
    ...flags,
    /*isDeleted:integer("is_deleted").default(0),
    isBlocked:integer("is_blocked").default(0),
    isArchieved:integer("is_archieved").default(0),*/
    /*
    createdAt:timestamp("created_at").defaultNow().notNull(),
    upadatedAt:timestamp("updated_at").defaultNow().notNull(),
    deletedAt:timestamp("deleted_at").defaultNow(),*/
    ...timestamps,
    lastLoggedIn: date("last_logged_in")
});
