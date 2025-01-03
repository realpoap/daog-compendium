import { z } from 'zod';

export const ActionTypeSchema = z.enum([
	'main',
	'limited',
	'free',
	'travel',
	'epic',
]);
export const SpellTargetSchema = z.enum([
	'single',
	'multiple',
	'random',
	'self',
	'terrain',
	'none',
]);
export const SpellActionSchema = z.enum([
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
]);

// export const CreatureActionSchema = z.object({
// 	action: ActionTypeSchema,
// 	name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
// 	type: SpellActionSchema,
// 	flavor: z.string().nullable(),
// 	description: z.string().nullable(),
// 	damages: z.string().nullable(),
// 	effects: z.string().nullable(),
// 	heal: z.string().nullable(),
// 	target: SpellTargetSchema,
// 	range: z.string().nullable(),
// })

export const ActionSchema = z.object({
	id: z.string(),
	action: ActionTypeSchema,
	searchName: z.string(),
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, 'Name must be greater than 2'),
	type: SpellActionSchema,
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	effects: z.string().nullable(),
	heal: z.string().nullable(),
	target: SpellTargetSchema,
	range: z.string().nullable(),
});

// export const ActionWithCreatureIdSchema = CreatureActionSchema.extend({
// 	id: z.string(),
// })

export const NewActionSchema = ActionSchema.omit({ id: true });
export type NewAction = z.infer<typeof NewActionSchema>;

export const ActionArraySchema = z.object({
	id: z.string(),
	actions: z.array(NewActionSchema),
});

export type ActionArray = z.infer<typeof ActionArraySchema>;

//export type ActionWithCreatureId = z.infer<typeof ActionWithCreatureIdSchema>

//export type CreatureAction = z.infer<typeof CreatureActionSchema>
export type Action = z.infer<typeof ActionSchema>;
