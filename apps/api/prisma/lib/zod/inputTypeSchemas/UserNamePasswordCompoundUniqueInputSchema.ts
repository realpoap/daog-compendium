import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserNamePasswordCompoundUniqueInputSchema: z.ZodType<Prisma.UserNamePasswordCompoundUniqueInput> = z.object({
  name: z.string(),
  password: z.string()
}).strict();

export default UserNamePasswordCompoundUniqueInputSchema;
