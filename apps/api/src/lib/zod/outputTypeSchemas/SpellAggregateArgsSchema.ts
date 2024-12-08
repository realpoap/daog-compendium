import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellWhereInputSchema } from '../inputTypeSchemas/SpellWhereInputSchema'
import { SpellOrderByWithRelationInputSchema } from '../inputTypeSchemas/SpellOrderByWithRelationInputSchema'
import { SpellWhereUniqueInputSchema } from '../inputTypeSchemas/SpellWhereUniqueInputSchema'

export const SpellAggregateArgsSchema: z.ZodType<Prisma.SpellAggregateArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SpellAggregateArgsSchema;
