import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ComponentCreatespellsInputSchema: z.ZodType<Prisma.ComponentCreatespellsInput> = z.object({
  set: z.string().array()
}).strict();

export default ComponentCreatespellsInputSchema;
