import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','isOwner','role','createdAt']);

export default UserScalarFieldEnumSchema;
