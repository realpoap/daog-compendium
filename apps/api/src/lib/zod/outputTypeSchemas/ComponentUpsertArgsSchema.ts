import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentWhereUniqueInputSchema } from '../inputTypeSchemas/ComponentWhereUniqueInputSchema'
import { ComponentCreateInputSchema } from '../inputTypeSchemas/ComponentCreateInputSchema'
import { ComponentUncheckedCreateInputSchema } from '../inputTypeSchemas/ComponentUncheckedCreateInputSchema'
import { ComponentUpdateInputSchema } from '../inputTypeSchemas/ComponentUpdateInputSchema'
import { ComponentUncheckedUpdateInputSchema } from '../inputTypeSchemas/ComponentUncheckedUpdateInputSchema'
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

export const ComponentUpsertArgsSchema: z.ZodType<Prisma.ComponentUpsertArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
  create: z.union([ ComponentCreateInputSchema,ComponentUncheckedCreateInputSchema ]),
  update: z.union([ ComponentUpdateInputSchema,ComponentUncheckedUpdateInputSchema ]),
}).strict() ;

export default ComponentUpsertArgsSchema;
