import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';

export const NestedEnumSpellTypeFilterSchema: z.ZodType<Prisma.NestedEnumSpellTypeFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumSpellTypeFilterSchema;
