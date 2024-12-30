import {z} from 'zod';

export const CreatureComponentSchema = z.object({
	name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
	quantity: z.number().nullable(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	rarity: z.string().nullable(),
	uses: z.string().nullable(),
})

export type CreatureComponent = z.infer<typeof CreatureComponentSchema>

export const ComponentSchema = z.object({
	id: z.string(),
	searchName: z.string(),
	name: z.string({required_error: 'Name is required'}).min(4,'Name must be greater than 3'),
	quantity: z.number().nullable(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	rarity: z.string().nullable(),
	uses: z.string().nullable(),
})

export type Component = z.infer<typeof CreatureComponentSchema>