import { z } from 'zod';

export const StatProfilSchema = z.object({
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
})

export type StatProfil = z.infer<typeof StatProfilSchema>

export const ActionSchema = z.object({
	action: z.enum(['main','limited','free', 'travel','epic']),
	id: z.string(),
	name: z.string(),
	type: z.string(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	effects: z.string().nullable(),
	heal: z.string().nullable(),
	target: z.string().nullable(),
	range: z.string().nullable(),
	creatureId: z.string().nullable(),
})

export type Action = z.infer<typeof ActionSchema>

export const NewActionSchema = z.object({
	action: z.enum(['main','limited','free', 'travel','epic']),
	name: z.string(),
	type: z.string(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	effects: z.string().nullable(),
	heal: z.string().nullable(),
	target: z.string().nullable(),
	range: z.string().nullable(),
})

export type NewAction = z.infer<typeof NewActionSchema>

export const ActionListSchema = z.object({
  main: z.number().int(),
  limited: z.number().int().nullable(),
  free: z.number().int().nullable(),
  travel: z.number().int().nullable(),
  epic: z.number().int(),
})

export type ActionList = z.infer<typeof ActionListSchema>

export const AttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
  creatureId: z.string().nullable(),
})

export type Attribute = z.infer<typeof AttributeSchema>

export const NewAttributeSchema = z.object({
  name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
})

export type NewAttribute = z.infer<typeof NewAttributeSchema>

export const ZodCreature = z.object({
	size: z.enum(['tiny','small','average','large','huge','gigantic'],{
  errorMap: () => ({ message: 'A creature must have a size' })}),
	stats: StatProfilSchema,
	id: z.string(),
	fullname: z.string(),
	name: z.string({required_error: 'It shall be named !'}),
	rank: z.string().nullable(),
	type: z.enum(['plant','demon','fae','insect','person','beast','monster','undead','wyrm','golem'],{
  errorMap: () => ({ message: 'A creature must have a type' })}),
	subtype: z.string().nullable(),
	alignment: z.enum(['saint','good','neutral','bad','evil'],{
  errorMap: () => ({ message: 'Choose an alignment' })}),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	level: z.number().int(), 
	attack: z.number().int(),
	attackBonus: z.number().int(),
	defense: z.number().int(),
	defenseBonus: z.number().int(),
	ranged: z.number().int(),
	rangedBonus: z.number().int(),
	health: z.number().int(),
	glory: z.number().int().nullable(),
	armor: z.number().int().nullable(),
	perception: z.number().int(),
	perceptionBonus: z.number().int().nullable(),
	magic: z.number().int().nullable(),
	spirit: z.number().int().nullable(),
	loot: z.string().array(),
	objects: z.string().array(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	actionList: ActionListSchema.nullable(),
	attributes: z.array(AttributeSchema),
	actions: z.array(ActionSchema),
})

export type Creature = z.infer<typeof ZodCreature>

export const ZodNewCreature = z.object({
	size: z.enum(['tiny','small','average','large','huge','gigantic'],{
  errorMap: () => ({ message: 'A creature must have a size' })}),
	stats: StatProfilSchema,
	fullname: z.string(),
	name: z.string({required_error: 'It shall be named !'}).min(3,'Name is not long enough'),
	rank: z.string().nullable(),
	isBoss: z.boolean().nullable(),
	type: z.enum(['plant','demon','fae','insect','person','beast','monster','undead','wyrm','golem'],{
  errorMap: () => ({ message: 'A creature must have a type' })}),
	subtype: z.string().nullable(),
	alignment: z.enum(['saint','good','neutral','bad','evil'],{
  errorMap: () => ({ message: 'Choose an alignment' })}),
	level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().nullable(),
  health: z.number().int(),
  armor: z.number().int().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().nullable(),
  magic: z.number().int().nullable(),
  spirit: z.number().int().nullable(),
  glory: z.number().int().nullable(),
  loot: z.string().array(),
  objects: z.string().array(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
	actionList: ActionListSchema.nullable(),
	attributes: z.array(AttributeSchema),
	actions: z.array(ActionSchema),
})

export type NewCreature = z.infer<typeof ZodNewCreature>
