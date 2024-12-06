import { z } from 'zod';

export const RoleSchema = z.enum(['BASIC','ADITOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
