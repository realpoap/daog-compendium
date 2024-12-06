import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ComponentWhereInputSchema } from './ComponentWhereInputSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';

export const ComponentWhereUniqueInputSchema: z.ZodType<Prisma.ComponentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spells: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict());

export default ComponentWhereUniqueInputSchema;
