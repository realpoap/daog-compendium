import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SpellAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpellAvgOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SpellAvgOrderByAggregateInputSchema;
