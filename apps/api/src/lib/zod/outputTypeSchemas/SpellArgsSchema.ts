import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellSelectSchema } from '../inputTypeSchemas/SpellSelectSchema';

export const SpellArgsSchema: z.ZodType<Prisma.SpellDefaultArgs> = z.object({
  select: z.lazy(() => SpellSelectSchema).optional(),
}).strict();

export default SpellArgsSchema;
