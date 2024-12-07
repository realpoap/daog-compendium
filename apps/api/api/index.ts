import { PrismaClient } from "@prisma/client";

export type { AppRouter } from '../src/router';
export type { RouterInput, RouterOutput } from '../src/trpc';

export const prisma = new PrismaClient();