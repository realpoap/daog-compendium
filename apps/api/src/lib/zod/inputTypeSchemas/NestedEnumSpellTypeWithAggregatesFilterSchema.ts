import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSpellTypeFilterSchema } from './NestedEnumSpellTypeFilterSchema';

export const NestedEnumSpellTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpellTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional()
}).strict();

export default NestedEnumSpellTypeWithAggregatesFilterSchema;
