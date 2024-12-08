import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ComponentCreatespellsInputSchema } from './ComponentCreatespellsInputSchema';

export const ComponentUncheckedCreateInputSchema: z.ZodType<Prisma.ComponentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentCreatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export default ComponentUncheckedCreateInputSchema;
