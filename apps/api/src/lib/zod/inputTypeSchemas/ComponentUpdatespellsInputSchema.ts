import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ComponentUpdatespellsInputSchema: z.ZodType<Prisma.ComponentUpdatespellsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default ComponentUpdatespellsInputSchema;
