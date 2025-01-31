import { z } from 'zod';

export const ItemTypeSchema = z.enum([
	'weapon',
	'armor',
	'shield',
	'garnment',
	'accessorie',
	'trinket',
	'jewell',
	'potion',
	'ammunition',
	'food',
	'junk',
	'book',
]);

export type ItemTypeType = `${z.infer<typeof ItemTypeSchema>}`;

export const armorClassSchema = z.enum(['none', 'light', 'medium', 'heavy']);

export type armorClassType = `${z.infer<typeof armorClassSchema>}`;

export const rangeTypeSchema = z.enum([
	'self',
	'close',
	'near',
	'far',
	'visible',
]);
export type rangeTypeType = `${z.infer<typeof rangeTypeSchema>}`;

export const weaponTypeSchema = z.enum(['finesse', 'heavy', 'versatile']);

export type weaponTypeType = `${z.infer<typeof weaponTypeSchema>}`;

export const ItemSchema = z.object({
	itemType: ItemTypeSchema,
	id: z.string(),
	searchName: z.string(),
	name: z.string().array(),
	material: z.string(),
	materialType: z.string(),
	materialSubType: z.string().nullable(),
	description: z.string().nullable(),
	properties: z.string().nullable(),
	quality: z.string(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	durability: z.number().int().nullable(),
	magicWeight: z.number().int().nullable(),
	isRelic: z.boolean().nullable(),
	damages: z.string().nullable(),
	inflictType: z.string().array(),
	protection: z.number().int().nullable(),
	resistType: z.string().array(),
	armorClass: z.string().nullable(),
	magicProtection: z.number().int().nullable(),
	rangeType: rangeTypeSchema.nullable(),
	weaponType: weaponTypeSchema.nullable(),
	range: z.string().nullable(),
});

export type Item = z.infer<typeof ItemSchema>;

export const CreatureItemSchema = z.object({
	id: z.string(),
	name: z.string(),
	quantity: z.number().int(),
});

export type CreatureItem = z.infer<typeof CreatureItemSchema>;
