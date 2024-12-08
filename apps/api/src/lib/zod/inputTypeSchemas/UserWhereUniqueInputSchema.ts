import type { Prisma } from '../../../generated/client';

import { z } from 'zod';
import { UserNamePasswordCompoundUniqueInputSchema } from './UserNamePasswordCompoundUniqueInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumRoleFilterSchema } from './EnumRoleFilterSchema';
import { RoleSchema } from './RoleSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    password: z.string(),
  }),
  z.object({
    id: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    password: z.string(),
  }),
  z.object({
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  password: z.string().optional(),
  name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOwner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export default UserWhereUniqueInputSchema;
