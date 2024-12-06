import { z } from 'zod';

export const SpellScalarFieldEnumSchema = z.enum(['id','number','titleGlaise','titleCommon','createdAt','updatedAt','level','type','cost','difficulty','description','damages','heal','effects','range','duration','target','components']);

export default SpellScalarFieldEnumSchema;
