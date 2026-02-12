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
  const postgresUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (postgresUrl && (postgresUrl.includes('postgres://') || postgresUrl.includes('prisma+postgres://'))) {
    // Production: Vercel Postgres with adapter
    // Handle both regular postgres:// URLs and Prisma Accelerate URLs
    const connectionString = postgresUrl.startsWith('prisma+') 
      ? postgresUrl.replace('prisma+', '')  // Remove prisma+ prefix
      : postgresUrl;
    
    const pool = new Pool({ connectionString });
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
