import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ComponentWhereInputSchema } from '../inputTypeSchemas/ComponentWhereInputSchema'

export const ComponentDeleteManyArgsSchema: z.ZodType<Prisma.ComponentDeleteManyArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
}).strict() ;

export default ComponentDeleteManyArgsSchema;
