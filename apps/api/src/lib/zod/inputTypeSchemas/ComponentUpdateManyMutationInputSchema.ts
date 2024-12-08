import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableFloatFieldUpdateOperationsInputSchema } from './NullableFloatFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ComponentUpdatespellsInputSchema } from './ComponentUpdatespellsInputSchema';

export const ComponentUpdateManyMutationInputSchema: z.ZodType<Prisma.ComponentUpdateManyMutationInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentUpdatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export default ComponentUpdateManyMutationInputSchema;
