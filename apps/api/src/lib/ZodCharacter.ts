import { z } from 'zod';
import { ActionListSchema, StatProfilSchema } from './ZodCreature';

export const CarreerSchema = z.object({
	current: z.string(),
	master: z.string(),
	skills: z.string().array(),
	dangerous: z.boolean().nullable(),
	illegal: z.boolean().nullable(),
	arcane: z.boolean().nullable(),
});

export type Carreer = z.infer<typeof CarreerSchema>;

export const StatVariableSchema = z.object({
	current: z.number().int(),
	max: z.number().int(),
});

export type StatVariable = z.infer<typeof StatVariableSchema>;

export const CharacterSchema = z.object({
	id: z.string(),
	size: z.enum(['tiny', 'small', 'average', 'large', 'huge', 'gigantic'], {
		errorMap: () => ({ message: 'A character must have a size' }),
	}),
	alignment: z.enum(['saint', 'good', 'neutral', 'bad', 'evil'], {
		errorMap: () => ({ message: 'Choose an alignment' }),
	}),
	//magicDomain: SpellTypeSchema.array(),
	creator: z.string(),
	owner: z.string(),
	campaign: z.string(),
	fullname: z.string(),
	name: z.string(),
	surname: z.string().nullable(),
	species: z.string(),
	subspecies: z.string().nullable(),
	level: z.number().int(),
	experience: z.number().int().optional(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	background: z.string().nullable(),
	description: z.string().nullable(),
	glory: z.number().int(),
	luck: z.number().int(),
	isBoss: z.boolean(),
	isPun: z.boolean(),
	isCaster: z.boolean(),
	isDead: z.boolean(),
	initiative: z.number().int(),
	initiativeBonus: z.number().int(),
	attack: z.number().int(),
	attackBonus: z.number().int(),
	defense: z.number().int(),
	defenseBonus: z.number().int(),
	ranged: z.number().int(),
	rangedBonus: z.number().int(),
	armor: z.number().int(),
	armorClass: z.number().int(),
	perception: z.number().int(),
	perceptionBonus: z.number().int(),
	discretion: z.number().int(),
	discretionBonus: z.number().int(),
	magic: z.number().int(),
	sizeBonus: z.number().int(),
	weightBonus: z.number().int(),
	carryWeight: z.number().int(),
	weightClass: z.number().int(), //0= ok, 1=over, 2=noway
	careers: z.string().array(),
	fighterType: z.string().nullable(),
	attackType: z.string(),
	defenseType: z.string(),
	actionList: ActionListSchema.nullable(),
	stats: StatProfilSchema,
	health: StatVariableSchema,
	spirit: StatVariableSchema,
	weight: StatVariableSchema,
});

export type Character = z.infer<typeof CharacterSchema>;

export const ExpUpdateSchema = z.object({
	id: z.string(),
	experience: z.number().int().optional(),
	level: z.number().int(),
});

export const CampaignUpdateSchema = z.object({
	id: z.string(),
	campaignId: z.string(),
});

export const NewCharacterSchema = z.object({
	fullname: z.string(),
	name: z.string(),
	species: z.string(),
	subspecies: z.string().optional().nullable(),
	level: z.number().int(),
	creator: z.string(),
	owner: z.string(),
	campaign: z.string(),
	stats: StatProfilSchema,
	health: StatVariableSchema,
	spirit: StatVariableSchema,
	weight: StatVariableSchema,
});

export type NewCharacter = z.infer<typeof NewCharacterSchema>;
