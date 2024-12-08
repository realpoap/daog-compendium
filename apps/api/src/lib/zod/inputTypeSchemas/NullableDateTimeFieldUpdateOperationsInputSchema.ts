import type { Prisma } from '../../../generated/client';

import { z } from 'zod';

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export default NullableDateTimeFieldUpdateOperationsInputSchema;
