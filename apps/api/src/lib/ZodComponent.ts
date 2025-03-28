import { z } from 'zod';

export const HabitatTypeSchema = z.enum([
	'any',
	'abyss',
	'coast',
	'canyon',
	'cave',
	'desert',
	'dungeon',
	'farm',
	'forest',
	'jungle',
	'lagoon',
	'mountain',
	'sea',
	'river',
	'ruin',
	'shrubland',
	'swamp',
	'toundra',
	'town',
	'volcano',
]);

export const raritySchema = z.enum(['common', 'unusual', 'rare', 'fabled'], {
	errorMap: () => ({ message: 'Rarity is required' }),
});

export const componentUsesSchema = z.object({
	ointment: z.boolean(),
	potion: z.boolean(),
	extract: z.boolean(),
	catalyst: z.boolean(),
});

export const ComponentSchema = z.object({
	rarity: raritySchema,
	habitat: HabitatTypeSchema.array(),
	id: z.string(),
	searchName: z.string(),
	name: z
		.string()
		.min(5, { message: 'Must be 5 or more characters long' })
		.array()
		.min(1),
	componentType: z.string(),
	isFood: z.boolean().nullable(),
	scienceName: z.string(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	toxic: z.boolean(),
	uses: componentUsesSchema,
	toxicity: z.string().nullable(),
});

export type Component = z.infer<typeof ComponentSchema>;

export const NewComponentSchema = ComponentSchema.omit({ id: true });
export type NewComponent = z.infer<typeof NewComponentSchema>;

export const CreatureComponentSchema = z.object({
	id: z.string(),
	name: z.string(),
	quantity: z.number().int(),
});

export type CreatureComponent = z.infer<typeof CreatureComponentSchema>;
