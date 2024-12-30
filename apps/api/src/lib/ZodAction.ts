import { z } from 'zod';

export const ActionTypeSchema = z.enum(['main','limited','free','travel','epic']);

export const CreatureActionSchema = z.object({
	action: ActionTypeSchema,
	name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
	type: z.string(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	effects: z.string().nullable(),
	heal: z.string().nullable(),
	target: z.string().nullable(),
	range: z.string().nullable(),
})

export const ActionSchema = z.object({
	id: z.string(),
	action: ActionTypeSchema,
	searchName: z.string(),
	name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
	type: z.string(),
	flavor: z.string().nullable(),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	effects: z.string().nullable(),
	heal: z.string().nullable(),
	target: z.string().nullable(),
	range: z.string().nullable(),
})

export const ActionWithCreatureIdSchema = CreatureActionSchema.extend({
	id: z.string(),
})

export type ActionWithCreatureId = z.infer<typeof ActionWithCreatureIdSchema>

export type CreatureAction = z.infer<typeof CreatureActionSchema>