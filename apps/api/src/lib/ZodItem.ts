import { z } from 'zod';
import { raritySchema } from './ZodComponent';

const StatProfilSchema = z.object({
	CEL: z.number().int().nullable(),
	AGI: z.number().int().nullable(),
	DEX: z.number().int().nullable(),
	STR: z.number().int().nullable(),
	END: z.number().int().nullable(),
	VIT: z.number().int().nullable(),
	WIL: z.number().int().nullable(),
	INS: z.number().int().nullable(),
	SEN: z.number().int().nullable(),
	CHA: z.number().int().nullable(),
	SOC: z.number().int().nullable(),
	ERU: z.number().int().nullable(),
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
	rangeType: rangeTypeSchema.nullable(),
	weaponType: weaponTypeSchema.nullable(),
	usage: z.string().nullable(),
	range: z.string().nullable(),
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
