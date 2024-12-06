import { z } from 'zod';

/////////////////////////////////////////
// COMPONENT SCHEMA
/////////////////////////////////////////

export const ComponentSchema = z.object({
  id: z.string(),
  quantity: z.number().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  rarity: z.string().nullable(),
  spells: z.string().array(),
})

export type Component = z.infer<typeof ComponentSchema>

export default ComponentSchema;
