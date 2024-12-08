import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ComponentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ComponentSumOrderByAggregateInputSchema;
