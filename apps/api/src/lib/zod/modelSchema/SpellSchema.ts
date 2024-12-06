import { z } from 'zod';
import { SpellTypeSchema } from '../inputTypeSchemas/SpellTypeSchema'

/////////////////////////////////////////
// SPELL SCHEMA
/////////////////////////////////////////

export const SpellSchema = z.object({
  type: SpellTypeSchema,
  id: z.string(),
  number: z.number().int(),
  titleGlaise: z.string().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  level: z.number().int(),
  cost: z.number().int(),
  difficulty: z.number().int(),
  description: z.string().nullable(),
  damages: z.string().nullable(),
  heal: z.string().nullable(),
  effects: z.string().nullable(),
  range: z.string().nullable(),
  duration: z.string().nullable(),
  target: z.string().nullable(),
  components: z.string().array(),
})

export type Spell = z.infer<typeof SpellSchema>

export default SpellSchema;
