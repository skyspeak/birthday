-- Initial schema for Vercel Postgres
-- Run this in Vercel Dashboard → Storage → Your Database → Query

CREATE TABLE IF NOT EXISTS "Invitee" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  "adultsCount" INTEGER NOT NULL DEFAULT 0,
  "kidsCount" INTEGER NOT NULL DEFAULT 0,
  "maxKidsCount" INTEGER,
  "isAttending" BOOLEAN,
  "message" TEXT,
  "respondedAt" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on name for faster lookups
CREATE INDEX IF NOT EXISTS "Invitee_name_idx" ON "Invitee"("name");
