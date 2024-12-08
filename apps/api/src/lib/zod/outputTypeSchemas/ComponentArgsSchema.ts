import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentSelectSchema } from '../inputTypeSchemas/ComponentSelectSchema';

export const ComponentArgsSchema: z.ZodType<Prisma.ComponentDefaultArgs> = z.object({
  select: z.lazy(() => ComponentSelectSchema).optional(),
}).strict();

export default ComponentArgsSchema;
