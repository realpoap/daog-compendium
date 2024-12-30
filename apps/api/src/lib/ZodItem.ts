
import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string(),
  searchName: z.string(),
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

export const CreatureItemSchema = z.object({
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

export type CreatureItem = z.infer<typeof CreatureItemSchema>