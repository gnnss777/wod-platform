import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function initPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL não configurada");
  return new PrismaClient({
    adapter: new PrismaPg(new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })),
  });
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!globalForPrisma.prisma) globalForPrisma.prisma = initPrisma();
    return (globalForPrisma.prisma as any)[prop];
  },
});
