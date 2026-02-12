import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  // Use Postgres in production (Vercel), SQLite locally
  // Check for Postgres connection at runtime
  const postgresUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
  
  if (postgresUrl && postgresUrl.startsWith('postgres')) {
    // Production: Vercel Postgres with adapter
    const pool = new Pool({ connectionString: postgresUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } else {
    // Development: SQLite with adapter
    const dbPath = path.join(process.cwd(), "prisma", "dev.db");
    const adapter = new PrismaBetterSqlite3({
      url: `file:${dbPath}`,
    });
    return new PrismaClient({ adapter });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
