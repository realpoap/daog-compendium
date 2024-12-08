import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';

export const ComponentWhereInputSchema: z.ZodType<Prisma.ComponentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spells: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export default ComponentWhereInputSchema;
