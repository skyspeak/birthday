import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  
  if (!postgresUrl) {
    throw new Error("Database connection string not found. Please set POSTGRES_URL environment variable.");
  }
  
  // Remove prisma+ prefix if present (for Accelerate URLs)
  const connectionString = postgresUrl.startsWith('prisma+') 
    ? postgresUrl.replace('prisma+', '') 
    : postgresUrl;
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
