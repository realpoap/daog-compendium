import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';
import { SpellCreatecomponentsInputSchema } from './SpellCreatecomponentsInputSchema';

export const SpellUncheckedCreateInputSchema: z.ZodType<Prisma.SpellUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  number: z.number().int(),
  titleGlaise: z.string().optional().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  level: z.number().int(),
  type: z.lazy(() => SpellTypeSchema),
  cost: z.number().int(),
  difficulty: z.number().int(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  components: z.union([ z.lazy(() => SpellCreatecomponentsInputSchema),z.string().array() ]).optional(),
}).strict();

export default SpellUncheckedCreateInputSchema;
