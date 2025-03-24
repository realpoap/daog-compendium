import { z } from 'zod';
import { ActionListSchema, StatProfilSchema } from './ZodCreature';
import { SpellTypeSchema } from './ZodSpell';

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
	size: z
		.enum(['tiny', 'small', 'average', 'large', 'huge', 'gigantic'], {
			errorMap: () => ({ message: 'A character must have a size' }),
		})
		.nullable(),
	alignment: z
		.enum(['saint', 'good', 'neutral', 'bad', 'evil'], {
			errorMap: () => ({ message: 'Choose an alignment' }),
		})
		.nullable(),
	magicDomain: SpellTypeSchema.array(),
	id: z.string(),
	fullname: z.string(),
	name: z.string(),
	surname: z.string().nullable(),
	species: z.string(),
	subspecies: z.string().nullable(),
	level: z.number().int(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	background: z.string().nullable(),
	description: z.string().nullable(),
	glory: z.number().int().nullable(),
	isBoss: z.boolean().nullable(),
	isCaster: z.boolean().nullable(),
	initiative: z.number().int().nullable(),
	attack: z.number().int(),
	attackBonus: z.number().int().nullable(),
	defense: z.number().int(),
	defenseBonus: z.number().int().nullable(),
	ranged: z.number().int(),
	rangedBonus: z.number().int().nullable(),
	armor: z.number().int().nullable(),
	armorClass: z.number().int().nullable(),
	perception: z.number().int(),
	perceptionBonus: z.number().int().nullable(),
	discretion: z.number().int().nullable(),
	discretionBonus: z.number().int().nullable(),
	magic: z.number().int().nullable(),
	careers: z.string().array(),
	fighterType: z.string().nullable(),
	actionList: ActionListSchema,
	stats: StatProfilSchema,
	health: StatVariableSchema,
	spirit: StatVariableSchema,
});

export type Character = z.infer<typeof CharacterSchema>;

export const NewCharacterSchema = z.object({
	fullname: z.string(),
	name: z.string(),
	species: z.string(),
	subspecies: z.string().nullable(),
	level: z.number().int(),
});

export type NewCharacter = z.infer<typeof NewCharacterSchema>;
