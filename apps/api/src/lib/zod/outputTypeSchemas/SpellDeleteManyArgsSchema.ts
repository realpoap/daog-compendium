import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellWhereInputSchema } from '../inputTypeSchemas/SpellWhereInputSchema'

export const SpellDeleteManyArgsSchema: z.ZodType<Prisma.SpellDeleteManyArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
}).strict() ;

export default SpellDeleteManyArgsSchema;
