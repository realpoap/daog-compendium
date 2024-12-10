import { PrismaClient } from '@prisma/client';
export type { AppRouter } from './router';
export type { RouterInput, RouterOutput } from './trpc';

export const prisma = new PrismaClient();
