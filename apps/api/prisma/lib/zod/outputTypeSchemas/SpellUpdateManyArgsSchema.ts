import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellUpdateManyMutationInputSchema } from '../inputTypeSchemas/SpellUpdateManyMutationInputSchema'
import { SpellUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SpellUncheckedUpdateManyInputSchema'
import { SpellWhereInputSchema } from '../inputTypeSchemas/SpellWhereInputSchema'

export const SpellUpdateManyArgsSchema: z.ZodType<Prisma.SpellUpdateManyArgs> = z.object({
  data: z.union([ SpellUpdateManyMutationInputSchema,SpellUncheckedUpdateManyInputSchema ]),
  where: SpellWhereInputSchema.optional(),
}).strict() ;

export default SpellUpdateManyArgsSchema;
