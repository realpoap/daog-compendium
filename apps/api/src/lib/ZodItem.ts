
import { z } from 'zod';

export const ComponentSchema = z.object({
	id: z.string(),
	quantity: z.number().nullable(),
	name: z.string(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	rarity: z.string().nullable(),
	uses: z.string().nullable(),
})

export type Component = z.infer<typeof ComponentSchema>

export const NewComponentSchema = z.object({
	quantity: z.number().nullable(),
	name: z.string(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	rarity: z.string().nullable(),
	uses: z.string().nullable(),
})

export type NewComponent = z.infer<typeof NewComponentSchema>

export const ItemSchema = z.object({
  id: z.string(),
  quantity: z.number().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  damages: z.string().nullable(),
  isRelic: z.boolean().nullable(),
  magicWeight: z.number().int().nullable(),
})

export type Item = z.infer<typeof ItemSchema>

export const NewItemSchema = z.object({
  quantity: z.number().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  damages: z.string().nullable(),
  armor: z.number().int().nullable(),
  properties: z.string().nullable(),
  isRelic: z.boolean().nullable(),
  magicWeight: z.number().int().nullable(),
})

export type NewItem = z.infer<typeof NewItemSchema>