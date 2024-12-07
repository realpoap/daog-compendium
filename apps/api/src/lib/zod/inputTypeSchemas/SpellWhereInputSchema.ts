import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { EnumSpellTypeFilterSchema } from './EnumSpellTypeFilterSchema';
import { SpellTypeSchema } from './SpellTypeSchema';

export const SpellWhereInputSchema: z.ZodType<Prisma.SpellWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  titleGlaise: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  titleCommon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellTypeFilterSchema),z.lazy(() => SpellTypeSchema) ]).optional(),
  cost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  difficulty: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  components: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default SpellWhereInputSchema;
