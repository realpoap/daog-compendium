import { z } from 'zod';
import type { Prisma } from '@prisma/client';
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

export const ComponentDeleteArgsSchema: z.ZodType<Prisma.ComponentDeleteArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export default ComponentDeleteArgsSchema;
