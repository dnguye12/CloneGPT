import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { messages } from "./messages";

export const messageFiles = pgTable("messageFiles", {
    id: uuid("id").primaryKey().defaultRandom(),
    messageId: uuid("message_id").references(() => messages.id, { onDelete: "cascade" }).notNull(),
    mediaType: text("media-type").notNull(),
    fileName: text("file-name"),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type MessageFiles = typeof messageFiles.$inferSelect
