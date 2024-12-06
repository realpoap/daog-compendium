import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  isOwner: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export default UserSelectSchema;
