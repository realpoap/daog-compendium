import * as z from 'zod';

export const SpellSchema = z.object({
	number: z.number().positive().int(),
	titleCommon:z.string(),
	titleGlaise:z.string(),
	level:z.number().int().min(1).max(5),
	type: z.string(),
	cost:z.number().int().min(1).max(5),
	difficulty: z.number().positive().multipleOf(5).min(10).max(50),
	components:z.string().optional(),
	description:z.string(),
	effects:z.string().optional(),
	damages:z.union([z.string().optional(), z.number().optional()]),
	heal:z.string().optional(),
	range:z.number().nonnegative().max(500).transform((r) => `${r} m`).optional(),
	duration:z.string().optional(),
	target:z.string().optional(),
});

export type Spell = z.infer<typeof SpellSchema>;