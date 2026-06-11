/**
 * prisma — the singleton Prisma client.
 * STATUS: stub
 *
 * What goes here (M1): the standard Next.js singleton pattern (globalThis
 * cache in dev to survive HMR). All server code imports { prisma } from here;
 * nothing instantiates PrismaClient anywhere else.
 *
 *   import { PrismaClient } from "@prisma/client";
 *   const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
 *   export const prisma = globalForPrisma.prisma ?? new PrismaClient();
 *   if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
 *
 * (Left unwired until `prisma generate` has run against a real DATABASE_URL in M1.)
 * @see docs/DATA_MODEL.md
 */
export {};
