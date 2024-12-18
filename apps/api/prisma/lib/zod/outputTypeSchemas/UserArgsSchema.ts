import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSelectSchema } from '../inputTypeSchemas/UserSelectSchema';

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
}).strict();

export default UserArgsSchema;
