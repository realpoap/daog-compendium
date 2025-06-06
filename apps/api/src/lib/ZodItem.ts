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

export const ItemTypeSchema = z.enum(
	[
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
	],
	{
		errorMap: () => ({ message: 'You must select a type for the item' }),
	},
);

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
	name: z
		.string()
		.min(5, { message: 'Must be 5 or more characters long' })
		.array()
		.min(1),
	material: z.string(),
	materialType: z.string(),
	materialSubType: z.string().nullable(),
	description: z.string().nullable(),
	properties: z.string().nullable(),
	quality: qualityTypeSchema,
	rarity: raritySchema,
	weight: z.number().nullable(),
	value: z
		.number({
			required_error: 'Value is required',
			invalid_type_error: 'Value must be a number',
		})
		.nullable(),
	valueWeight: z.number().nullable(),
	maxDurability: z.number().int().nullable(),
	durability: z.number().int().nullable(),
	magicWeight: z.number().int().nullable(),
	isRelic: z.boolean().nullable(),
	damages: z.string().nullable(),
	inflictType: z.string().array(),
	protection: z.number().int().nullable(),
	resistType: z.string().array(),
	armorClass: armorClassSchema.nullable(),
	magicProtection: z.number().int().nullable(),
	rangeType: rangeTypeSchema.nullable(),
	weaponType: weaponTypeSchema.nullable(),
	usage: z.string().nullable(),
	range: z.string().nullable(),
	isFood: z.boolean().nullable(),
	isCritical: z.boolean().nullable(),
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
