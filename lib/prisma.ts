// lib/prisma.ts

// Avoid PrismaClient type import causing TS issues
const { PrismaClient } = require("@prisma/client")

const globalForPrisma = globalThis as any

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}