import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SpellTypeSchema } from './SpellTypeSchema';

export const EnumSpellTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSpellTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellTypeSchema).optional()
}).strict();

export default EnumSpellTypeFieldUpdateOperationsInputSchema;
