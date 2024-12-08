import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentWhereInputSchema } from '../inputTypeSchemas/ComponentWhereInputSchema'
import { ComponentOrderByWithRelationInputSchema } from '../inputTypeSchemas/ComponentOrderByWithRelationInputSchema'
import { ComponentWhereUniqueInputSchema } from '../inputTypeSchemas/ComponentWhereUniqueInputSchema'

export const ComponentAggregateArgsSchema: z.ZodType<Prisma.ComponentAggregateArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ComponentAggregateArgsSchema;
