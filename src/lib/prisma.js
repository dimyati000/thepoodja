import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured. Add it to .env.local or the hosting environment variables."
  );
}

const createPrismaClient = () => {
  // const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
  const pool = new Pool({
    connectionString,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
  });
};

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma;
}

export default prisma;