import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SpellSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpellSumOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SpellSumOrderByAggregateInputSchema;
