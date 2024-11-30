import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const images = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),
    url: text("url").notNull(),
    user_id: uuid("user_id").references(() => users.id).notNull(),
    uploader_name: text("uploader_name").notNull(),
    created_at: timestamp("created_at").defaultNow(),
});