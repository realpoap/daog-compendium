import { z } from 'zod';

export const SpellTypeSchema = z.enum(['mouflette','beast','nature','scourge','spirit','death','life','earth','fire','water','air','blood']);

export type SpellTypeType = `${z.infer<typeof SpellTypeSchema>}`

export default SpellTypeSchema;
