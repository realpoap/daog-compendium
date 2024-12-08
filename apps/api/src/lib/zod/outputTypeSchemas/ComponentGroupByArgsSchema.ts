import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentWhereInputSchema } from '../inputTypeSchemas/ComponentWhereInputSchema'
import { ComponentOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ComponentOrderByWithAggregationInputSchema'
import { ComponentScalarFieldEnumSchema } from '../inputTypeSchemas/ComponentScalarFieldEnumSchema'
import { ComponentScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ComponentScalarWhereWithAggregatesInputSchema'

export const ComponentGroupByArgsSchema: z.ZodType<Prisma.ComponentGroupByArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithAggregationInputSchema.array(),ComponentOrderByWithAggregationInputSchema ]).optional(),
  by: ComponentScalarFieldEnumSchema.array(),
  having: ComponentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ComponentGroupByArgsSchema;
