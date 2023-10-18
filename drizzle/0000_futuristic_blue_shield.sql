CREATE TABLE IF NOT EXISTS "book" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"completedAt" timestamp,
	"genre" text NOT NULL,
	"style" text NOT NULL,
	"prompt" text NOT NULL,
	"bookData" jsonb
);
