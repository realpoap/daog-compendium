import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentWhereInputSchema } from '../inputTypeSchemas/ComponentWhereInputSchema'
import { ComponentOrderByWithRelationInputSchema } from '../inputTypeSchemas/ComponentOrderByWithRelationInputSchema'
import { ComponentWhereUniqueInputSchema } from '../inputTypeSchemas/ComponentWhereUniqueInputSchema'
import { ComponentScalarFieldEnumSchema } from '../inputTypeSchemas/ComponentScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ComponentSelectSchema: z.ZodType<Prisma.ComponentSelect> = z.object({
  id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  rarity: z.boolean().optional(),
  spells: z.boolean().optional(),
}).strict()

export const ComponentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ComponentFindFirstOrThrowArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ComponentScalarFieldEnumSchema,ComponentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ComponentFindFirstOrThrowArgsSchema;
