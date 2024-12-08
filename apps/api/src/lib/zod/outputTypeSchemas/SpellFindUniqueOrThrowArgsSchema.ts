import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SpellWhereUniqueInputSchema } from '../inputTypeSchemas/SpellWhereUniqueInputSchema'
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

export const SpellFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpellFindUniqueOrThrowArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export default SpellFindUniqueOrThrowArgsSchema;
