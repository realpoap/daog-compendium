import * as z from 'zod';

export const SpellSchema = z.object({
	uid: z.string(),
	title:z.string(),
	type: z.enum(['mouflette','nature','vie','mort','feu','vent']),
	difficulty: z.number().positive().multipleOf(5).min(10).max(50),
	level:z.number().int().min(1).max(5),
	description:z.string(),
	component:z.string().optional(),
	range:z.number().nonnegative().max(500).transform((r) => `${r} m`),
	target:z.string(),
	effect:z.string().optional(),
	damages:z.string().optional(),
});

export type Spell = z.infer<typeof SpellSchema>;