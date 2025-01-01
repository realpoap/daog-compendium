import { z } from 'zod';
import { NewActionSchema } from './ZodAction';
import { CreatureComponentSchema } from './ZodComponent';
import { CreatureItemSchema } from './ZodItem';

export const StatProfilSchema = z.object({
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

export type StatProfil = z.infer<typeof StatProfilSchema>;

export const ActionListSchema = z.object({
	main: z.number().int(),
	limited: z.number().int().nullable(),
	free: z.number().int().nullable(),
	travel: z.number().int().nullable(),
	epic: z.number().int(),
});

export type ActionList = z.infer<typeof ActionListSchema>;

export const CreatureAttributeSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(4, 'Name must be greater than 3'),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
});

export type CreatureAttribute = z.infer<typeof CreatureAttributeSchema>;

export const AttributeSchema = z.object({
	id: z.string(),
	name: z
		.string({ required_error: 'Name is required' })
		.min(4, 'Name must be greater than 3'),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
});

export type Attribute = z.infer<typeof AttributeSchema>;
export const NewAttributeSchema = AttributeSchema.omit({ id: true });
export type NewAttribute = z.infer<typeof NewAttributeSchema>;

export const ZodCreature = z.object({
	size: z
		.enum(['tiny', 'small', 'average', 'large', 'huge', 'gigantic'], {
			errorMap: () => ({ message: 'A creature must have a size' }),
		})
		.nullable(),
	stats: StatProfilSchema,
	id: z.string(),
	fullname: z.string(),
	name: z.string({ required_error: 'It shall be named !' }),
	rank: z.string().nullable(),
	type: z
		.enum(
			[
				'plant',
				'demon',
				'fae',
				'insect',
				'person',
				'beast',
				'monster',
				'undead',
				'wyrm',
				'golem',
				'oddity',
			],
			{
				errorMap: () => ({ message: 'A creature must have a type' }),
			},
		)
		.nullable(),
	subtype: z.string().nullable(),
	alignment: z
		.enum(['saint', 'good', 'neutral', 'bad', 'evil'], {
			errorMap: () => ({ message: 'Choose an alignment' }),
		})
		.nullable(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
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
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	actionList: ActionListSchema,
	loot: z.array(CreatureItemSchema),
	scavenge: z.array(CreatureComponentSchema),
	attributes: z.array(CreatureAttributeSchema),
	actions: z.array(NewActionSchema),
});

export type Creature = z.infer<typeof ZodCreature>;

export const ZodNewCreature = z.object({
	size: z
		.enum(['tiny', 'small', 'average', 'large', 'huge', 'gigantic'], {
			errorMap: () => ({ message: 'A creature must have a size' }),
		})
		.nullable(),
	stats: StatProfilSchema,
	fullname: z.string(),
	name: z
		.string({ required_error: 'It shall be named !' })
		.min(3, 'Name is not long enough'),
	rank: z.string().nullable(),
	isBoss: z.boolean().nullable(),
	type: z
		.enum(
			[
				'plant',
				'demon',
				'fae',
				'insect',
				'oddity',
				'person',
				'beast',
				'monster',
				'undead',
				'wyrm',
				'golem',
			],
			{
				errorMap: () => ({ message: 'A creature must have a type' }),
			},
		)
		.nullable(),
	subtype: z.string().nullable(),
	alignment: z
		.enum(['saint', 'good', 'neutral', 'bad', 'evil'], {
			errorMap: () => ({ message: 'Choose an alignment' }),
		})
		.nullable(),
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
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	actionList: ActionListSchema,
	loot: z.array(CreatureItemSchema),
	scavenge: z.array(CreatureComponentSchema),
	attributes: z.array(CreatureAttributeSchema),
	actions: z.array(NewActionSchema),
});

export type NewCreature = z.infer<typeof ZodNewCreature>;
