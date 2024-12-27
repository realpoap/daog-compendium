import { z } from 'zod';

export const StatProfilSchema = z.object({
  id: z.string(),
  CEL: z.number().int(),
  AGI: z.number().int(),
  DEX: z.number().int(),
  STR: z.number().int(),
  END: z.number().int(),
  VIT: z.number().int(),
  COU: z.number().int(),
  INS: z.number().int(),
  SEN: z.number().int(),
  CHA: z.number().int(),
  SOC: z.number().int(),
  ERU: z.number().int(),
  creatureId: z.string().nullable(),
})

export type StatProfil = z.infer<typeof StatProfilSchema>

export const CreatureSchema = z.object({
	size: z.enum(['tiny','small','average','large','huge','gigantic'],{
  errorMap: () => ({ message: 'A creature must have a size' })}),
	stats: StatProfilSchema.nullable(),
	id: z.string(),
	fullname: z.string(),
	name: z.string(),
	rank: z.string().nullable(),
	type: z.string(),
	subtype: z.string().nullable(),
	createdAd: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	level: z.number().int(),
	attack: z.number().int(),
	defense: z.number().int(),
	ranged: z.number().int(),
	health: z.number().int(),
	armor: z.number().int().nullable(),
	perception: z.number().int().nullable(),
	magic: z.number().int().nullable(),
	spirit: z.number().int().nullable(),
	loot: z.string().array(),
	objects: z.string().array(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
})

export type Creature = z.infer<typeof CreatureSchema>