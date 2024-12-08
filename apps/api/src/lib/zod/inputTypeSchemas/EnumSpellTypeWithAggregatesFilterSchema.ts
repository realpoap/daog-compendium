import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';
import { NestedEnumSpellTypeWithAggregatesFilterSchema } from './NestedEnumSpellTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSpellTypeFilterSchema } from './NestedEnumSpellTypeFilterSchema';

export const EnumSpellTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpellTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional()
}).strict();

export default EnumSpellTypeWithAggregatesFilterSchema;
