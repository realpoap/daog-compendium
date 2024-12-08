import type { Prisma } from '../../../generated/client';

import { z } from 'zod';

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export default NullableStringFieldUpdateOperationsInputSchema;
