import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';
import { NestedEnumSpellTypeFilterSchema } from './NestedEnumSpellTypeFilterSchema';

export const EnumSpellTypeFilterSchema: z.ZodType<Prisma.EnumSpellTypeFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeFilterSchema) ]).optional(),
}).strict();

export default EnumSpellTypeFilterSchema;
