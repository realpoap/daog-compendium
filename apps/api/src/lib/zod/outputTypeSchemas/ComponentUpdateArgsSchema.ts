import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ComponentUpdateInputSchema } from '../inputTypeSchemas/ComponentUpdateInputSchema'
import { ComponentUncheckedUpdateInputSchema } from '../inputTypeSchemas/ComponentUncheckedUpdateInputSchema'
import { ComponentWhereUniqueInputSchema } from '../inputTypeSchemas/ComponentWhereUniqueInputSchema'
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

export const ComponentUpdateArgsSchema: z.ZodType<Prisma.ComponentUpdateArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  data: z.union([ ComponentUpdateInputSchema,ComponentUncheckedUpdateInputSchema ]),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export default ComponentUpdateArgsSchema;
