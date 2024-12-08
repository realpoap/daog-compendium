import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ComponentCountOrderByAggregateInputSchema } from './ComponentCountOrderByAggregateInputSchema';
import { ComponentAvgOrderByAggregateInputSchema } from './ComponentAvgOrderByAggregateInputSchema';
import { ComponentMaxOrderByAggregateInputSchema } from './ComponentMaxOrderByAggregateInputSchema';
import { ComponentMinOrderByAggregateInputSchema } from './ComponentMinOrderByAggregateInputSchema';
import { ComponentSumOrderByAggregateInputSchema } from './ComponentSumOrderByAggregateInputSchema';

export const ComponentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ComponentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ComponentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ComponentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ComponentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ComponentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ComponentSumOrderByAggregateInputSchema).optional()
}).strict();

export default ComponentOrderByWithAggregationInputSchema;
