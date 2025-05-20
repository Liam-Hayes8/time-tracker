import { PrismaClient } from "@/generated/prisma";

// Single PrismaClient for hot-reload in development

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["query"],             //Logs every SQL query in dev
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
