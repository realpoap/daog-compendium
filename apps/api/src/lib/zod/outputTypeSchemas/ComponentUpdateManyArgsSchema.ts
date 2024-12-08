import { z } from 'zod';
import type { Prisma } from '../../../generated/client';
import { ComponentUpdateManyMutationInputSchema } from '../inputTypeSchemas/ComponentUpdateManyMutationInputSchema'
import { ComponentUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ComponentUncheckedUpdateManyInputSchema'
import { ComponentWhereInputSchema } from '../inputTypeSchemas/ComponentWhereInputSchema'

export const ComponentUpdateManyArgsSchema: z.ZodType<Prisma.ComponentUpdateManyArgs> = z.object({
  data: z.union([ ComponentUpdateManyMutationInputSchema,ComponentUncheckedUpdateManyInputSchema ]),
  where: ComponentWhereInputSchema.optional(),
}).strict() ;

export default ComponentUpdateManyArgsSchema;
