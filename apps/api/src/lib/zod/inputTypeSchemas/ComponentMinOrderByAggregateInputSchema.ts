import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ComponentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ComponentMinOrderByAggregateInputSchema;
