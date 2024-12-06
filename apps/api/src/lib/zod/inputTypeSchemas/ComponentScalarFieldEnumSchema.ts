import { z } from 'zod';

export const ComponentScalarFieldEnumSchema = z.enum(['id','quantity','name','description','weight','value','rarity','spells']);

export default ComponentScalarFieldEnumSchema;
