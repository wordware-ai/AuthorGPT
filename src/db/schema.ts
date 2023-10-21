import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("book", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  completedAt: timestamp("completedAt"),
  genre: text("genre").notNull(),
  style: text("style").notNull(),
  prompt: text("prompt").notNull(),
  bookData: jsonb("bookData").notNull(),
  title: text("title").notNull(),
  content: jsonb("content"),
});
