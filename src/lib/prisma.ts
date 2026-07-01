import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPool() {
  const url = new URL(process.env.DATABASE_URL!);
  const ssl = url.searchParams.get("sslmode") === "require";
  url.searchParams.delete("sslmode");
  return new Pool({
    connectionString: url.toString(),
    ssl: ssl ? { rejectUnauthorized: false } : false,
  });
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(createPool()),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
