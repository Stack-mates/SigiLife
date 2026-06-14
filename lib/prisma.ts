/**
 * prisma — the singleton Prisma client.
 * STATUS: implemented
 *
 * Standard Next.js singleton: cache on globalThis in dev so HMR doesn't open
 * a new connection pool on every reload. All server code imports { prisma }
 * from here; nothing else instantiates PrismaClient.
 *
 * @see docs/DATA_MODEL.md
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
