import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isOwner: z.boolean(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export default UserUncheckedCreateInputSchema;
