import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentCreateManyInputSchema } from '../inputTypeSchemas/ComponentCreateManyInputSchema'

export const ComponentCreateManyArgsSchema: z.ZodType<Prisma.ComponentCreateManyArgs> = z.object({
  data: z.union([ ComponentCreateManyInputSchema,ComponentCreateManyInputSchema.array() ]),
}).strict() ;

export default ComponentCreateManyArgsSchema;
