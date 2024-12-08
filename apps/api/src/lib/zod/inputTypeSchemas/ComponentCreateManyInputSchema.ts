import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { ComponentCreatespellsInputSchema } from './ComponentCreatespellsInputSchema';

export const ComponentCreateManyInputSchema: z.ZodType<Prisma.ComponentCreateManyInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentCreatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export default ComponentCreateManyInputSchema;
