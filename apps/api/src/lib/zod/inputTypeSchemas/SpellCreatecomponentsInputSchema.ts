import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const SpellCreatecomponentsInputSchema: z.ZodType<Prisma.SpellCreatecomponentsInput> = z.object({
  set: z.string().array()
}).strict();

export default SpellCreatecomponentsInputSchema;
