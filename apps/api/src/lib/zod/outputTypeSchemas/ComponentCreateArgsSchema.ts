import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ComponentCreateInputSchema } from '../inputTypeSchemas/ComponentCreateInputSchema'
import { ComponentUncheckedCreateInputSchema } from '../inputTypeSchemas/ComponentUncheckedCreateInputSchema'
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

export const ComponentCreateArgsSchema: z.ZodType<Prisma.ComponentCreateArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  data: z.union([ ComponentCreateInputSchema,ComponentUncheckedCreateInputSchema ]),
}).strict() ;

export default ComponentCreateArgsSchema;
