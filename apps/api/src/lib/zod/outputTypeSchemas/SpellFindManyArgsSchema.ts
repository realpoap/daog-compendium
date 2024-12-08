import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { SpellWhereInputSchema } from '../inputTypeSchemas/SpellWhereInputSchema'
import { SpellOrderByWithRelationInputSchema } from '../inputTypeSchemas/SpellOrderByWithRelationInputSchema'
import { SpellWhereUniqueInputSchema } from '../inputTypeSchemas/SpellWhereUniqueInputSchema'
import { SpellScalarFieldEnumSchema } from '../inputTypeSchemas/SpellScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SpellSelectSchema: z.ZodType<Prisma.SpellSelect> = z.object({
  id: z.boolean().optional(),
  number: z.boolean().optional(),
  titleGlaise: z.boolean().optional(),
  titleCommon: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  level: z.boolean().optional(),
  type: z.boolean().optional(),
  cost: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  description: z.boolean().optional(),
  damages: z.boolean().optional(),
  heal: z.boolean().optional(),
  effects: z.boolean().optional(),
  range: z.boolean().optional(),
  duration: z.boolean().optional(),
  target: z.boolean().optional(),
  components: z.boolean().optional(),
}).strict()

export const SpellFindManyArgsSchema: z.ZodType<Prisma.SpellFindManyArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default SpellFindManyArgsSchema;
