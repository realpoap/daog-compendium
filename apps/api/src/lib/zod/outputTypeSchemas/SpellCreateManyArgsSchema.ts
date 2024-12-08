import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellCreateManyInputSchema } from '../inputTypeSchemas/SpellCreateManyInputSchema'

export const SpellCreateManyArgsSchema: z.ZodType<Prisma.SpellCreateManyArgs> = z.object({
  data: z.union([ SpellCreateManyInputSchema,SpellCreateManyInputSchema.array() ]),
}).strict() ;

export default SpellCreateManyArgsSchema;
