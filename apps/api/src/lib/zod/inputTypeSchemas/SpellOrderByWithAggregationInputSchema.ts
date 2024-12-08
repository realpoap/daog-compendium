import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SpellCountOrderByAggregateInputSchema } from './SpellCountOrderByAggregateInputSchema';
import { SpellAvgOrderByAggregateInputSchema } from './SpellAvgOrderByAggregateInputSchema';
import { SpellMaxOrderByAggregateInputSchema } from './SpellMaxOrderByAggregateInputSchema';
import { SpellMinOrderByAggregateInputSchema } from './SpellMinOrderByAggregateInputSchema';
import { SpellSumOrderByAggregateInputSchema } from './SpellSumOrderByAggregateInputSchema';

export const SpellOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpellOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpellCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpellAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpellMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpellMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpellSumOrderByAggregateInputSchema).optional()
}).strict();

export default SpellOrderByWithAggregationInputSchema;
