import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats";

export const messageRolesEnum = pgEnum("message_role", ["user", "assistant", "system"])

export const messages = pgTable("messages", {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id").references(() => chats.id, { onDelete: "cascade" }).notNull(),
    role: messageRolesEnum("message_role").notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Message = typeof messages.$inferSelect