import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { SpellWhereInputSchema } from './SpellWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumSpellTypeFilterSchema } from './EnumSpellTypeFilterSchema';
import { SpellTypeSchema } from './SpellTypeSchema';

export const SpellWhereUniqueInputSchema: z.ZodType<Prisma.SpellWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    number: z.number().int()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    number: z.number().int(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  number: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  titleGlaise: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  titleCommon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellTypeFilterSchema),z.lazy(() => SpellTypeSchema) ]).optional(),
  cost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  difficulty: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  components: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default SpellWhereUniqueInputSchema;
