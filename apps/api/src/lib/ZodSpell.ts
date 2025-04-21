import { z } from 'zod';
import { rangeTypeSchema } from './ZodItem';

export const SpellTypeSchema = z.enum([
	'mouflette',
	'beast',
	'nature',
	'scourge',
	'spirit',
	'death',
	'life',
	'earth',
	'fire',
	'water',
	'air',
	'blood',
]);

export type SpellType = `${z.infer<typeof SpellTypeSchema>}`;

export const ZodNewSpell = z.object({
	type: z.enum(
		[
			'mouflette',
			'beast',
			'nature',
			'scourge',
			'spirit',
			'death',
			'life',
			'earth',
			'fire',
			'water',
			'air',
			'blood',
		],
		{
			errorMap: () => ({ message: 'A spell shall have a type' }),
		},
	),
	number: z.number({ message: 'A number is needed' }).int().positive(),
	titleGlaise: z.string().nullable(),
	titleCommon: z.string().min(5, 'A name must be given'),
	level: z
		.number({ message: 'A number is needed' })
		.int()
		.max(5, 'There is no highest level than 5'),
	cost: z
		.number({ message: 'A number is needed' })
		.int()
		.min(1, 'Everything has a cost')
		.max(12, 'No-one can harness such power'),
	difficulty: z
		.number({ message: 'A number is needed' })
		.int()
		.positive('Magic is no foolish game'),
	flavor: z.string().nullable(),
	action: z.enum(
		[
			'charm',
			'damage',
			'heal',
			'protect',
			'enhance',
			'link',
			'create',
			'transform',
			'move',
			'remove',
			'restrain',
			'puzzle',
		],
		{
			errorMap: () => ({ message: 'A spell shall do something' }),
		},
	),
	targetType: z
		.enum(['single', 'multiple', 'random', 'self', 'none'], {
			errorMap: () => ({ message: 'A spell shall have a target' }),
		})
		.nullable(),
	casting: z
		.enum(['instant', 'delayed', 'ritual', 'concentration', 'upkeep'], {
			errorMap: () => ({ message: 'A spell must be casted' }),
		})
		.nullable(),
	description: z.string({
		message: 'Wizards are no seer : tell us the secrets of this magic !',
	}),
	damages: z.string().nullable(),
	heal: z.string().nullable(),
	effects: z.string().nullable(),
	range: z.string().nullable(),
	rangeType: rangeTypeSchema.nullable(),
	duration: z.string().nullable(),
	target: z.string().nullable(),
	components: z.string().nullable(),
});

export const ZodSpell = z.object({
	// id:z.string(),
	type: z.enum(
		[
			'mouflette',
			'beast',
			'nature',
			'scourge',
			'spirit',
			'death',
			'life',
			'earth',
			'fire',
			'water',
			'air',
			'blood',
		],
		{
			errorMap: () => ({ message: 'A spell shall have a type' }),
		},
	),
	number: z.number({ message: 'A number is needed' }).int().positive(),
	titleGlaise: z.string().nullable(),
	titleCommon: z.string().min(5, 'A name must be given'),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
	level: z
		.number({ message: 'A number is needed' })
		.int()
		.max(5, 'There is no highest level than 5'),
	cost: z
		.number({ message: 'A number is needed' })
		.int()
		.min(1, 'Everything has a cost')
		.max(12, 'No-one can harness such power'),
	difficulty: z
		.number({ message: 'A number is needed' })
		.int()
		.positive('Magic is no foolish game'),
	flavor: z.string().nullable(),
	action: z.enum(
		[
			'charm',
			'damage',
			'heal',
			'protect',
			'enhance',
			'link',
			'create',
			'transform',
			'move',
			'remove',
			'restrain',
			'puzzle',
		],
		{
			errorMap: () => ({ message: 'A spell shall do something' }),
		},
	),
	targetType: z
		.enum(['single', 'multiple', 'random', 'self', 'none'], {
			errorMap: () => ({ message: 'A spell shall have a target' }),
		})
		.nullable(),
	casting: z
		.enum(['instant', 'delayed', 'ritual', 'concentration', 'upkeep'], {
			errorMap: () => ({ message: 'A spell must be casted' }),
		})
		.nullable(),
	description: z.string({
		message: 'Wizards are no seer : tell us the secrets of this magic !',
	}),
	damages: z.string().nullable(),
	heal: z.string().nullable(),
	effects: z.string().nullable(),
	range: z.string().nullable(),
	duration: z.string().nullable(),
	target: z.string().nullable(),
	components: z.string().nullable(),
});
