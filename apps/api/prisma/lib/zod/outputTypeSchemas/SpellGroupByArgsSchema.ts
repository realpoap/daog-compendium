import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellWhereInputSchema } from '../inputTypeSchemas/SpellWhereInputSchema'
import { SpellOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SpellOrderByWithAggregationInputSchema'
import { SpellScalarFieldEnumSchema } from '../inputTypeSchemas/SpellScalarFieldEnumSchema'
import { SpellScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SpellScalarWhereWithAggregatesInputSchema'

export const SpellGroupByArgsSchema: z.ZodType<Prisma.SpellGroupByArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithAggregationInputSchema.array(),SpellOrderByWithAggregationInputSchema ]).optional(),
  by: SpellScalarFieldEnumSchema.array(),
  having: SpellScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SpellGroupByArgsSchema;
