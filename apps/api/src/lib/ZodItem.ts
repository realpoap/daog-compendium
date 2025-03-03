import { z } from 'zod';
import { raritySchema } from './ZodComponent';

const StatProfilSchema = z.object({
	CEL: z.number().int(),
	AGI: z.number().int(),
	DEX: z.number().int(),
	STR: z.number().int(),
	END: z.number().int(),
	VIT: z.number().int(),
	WIL: z.number().int(),
	INS: z.number().int(),
	SEN: z.number().int(),
	CHA: z.number().int(),
	SOC: z.number().int(),
	ERU: z.number().int(),
});

export const ItemTypeSchema = z.enum([
	'weapon',
	'armor',
	'shield',
	'garnment',
	'accessory',
	'trinket',
	'jewel',
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

export const qualityTypeSchema = z.enum([
	'common',
	'poor',
	'great',
	'masterpiece',
	'legendary',
]);

export type qualityTypeType = `${z.infer<typeof qualityTypeSchema>}`;

export const ItemSchema = z.object({
	itemType: ItemTypeSchema,
	id: z.string(),
	searchName: z.string(),
	constraints: StatProfilSchema.nullable(),
	name: z.string().array(),
	material: z.string(),
	materialType: z.string(),
	materialSubType: z.string().nullable().optional(),
	description: z.string().nullable(),
	properties: z.string().nullable(),
	quality: qualityTypeSchema,
	rarity: raritySchema,
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable().optional(),
	maxDurability: z.number().int().nullable().optional(),
	durability: z.number().int().nullable().optional(),
	magicWeight: z.number().int().nullable(),
	isRelic: z.boolean().nullable().optional(),
	damages: z.string().nullable().optional(),
	inflictType: z.string().array().optional(),
	protection: z.number().int().nullable().optional(),
	resistType: z.string().array().optional(),
	armorClass: armorClassSchema.nullable().optional(),
	magicProtection: z.number().int().nullable(),
	rangeType: rangeTypeSchema.nullable().optional(),
	weaponType: weaponTypeSchema.nullable().optional(),
	usage: z.string().nullable().optional(),
	range: z.string().nullable().optional(),
	isFood: z.boolean().nullable(),
});

export type Item = z.infer<typeof ItemSchema>;

export const NewItemSchema = ItemSchema.omit({ id: true });
export type NewItem = z.infer<typeof NewItemSchema>;

export const CreatureItemSchema = z.object({
	id: z.string(),
	name: z.string(),
	quantity: z.number().int(),
});

export type CreatureItem = z.infer<typeof CreatureItemSchema>;
