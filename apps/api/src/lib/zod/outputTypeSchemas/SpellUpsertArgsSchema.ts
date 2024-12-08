import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellWhereUniqueInputSchema } from '../inputTypeSchemas/SpellWhereUniqueInputSchema'
import { SpellCreateInputSchema } from '../inputTypeSchemas/SpellCreateInputSchema'
import { SpellUncheckedCreateInputSchema } from '../inputTypeSchemas/SpellUncheckedCreateInputSchema'
import { SpellUpdateInputSchema } from '../inputTypeSchemas/SpellUpdateInputSchema'
import { SpellUncheckedUpdateInputSchema } from '../inputTypeSchemas/SpellUncheckedUpdateInputSchema'
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

export const SpellUpsertArgsSchema: z.ZodType<Prisma.SpellUpsertArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
  create: z.union([ SpellCreateInputSchema,SpellUncheckedCreateInputSchema ]),
  update: z.union([ SpellUpdateInputSchema,SpellUncheckedUpdateInputSchema ]),
}).strict() ;

export default SpellUpsertArgsSchema;
