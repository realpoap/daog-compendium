import { z } from 'zod';

export const ZodNewSpell = z.object({
	type: z.enum(['mouflette','beast','nature','scourge','spirit','death','life','earth','fire','water','air','blood'],{
  errorMap: () => ({ message: 'A spell shall have a type' })}),
	number: z.number({ message: 'A number is needed'}).int().positive(),
	titleGlaise: z.string().nullable(),
	titleCommon: z.string().min(5, 'A name must be given'),

	level: z.number({ message: 'A number is needed'}).int().max(5, 'There is no highest level than 5'),
	cost: z.number({ message: 'A number is needed'}).int().min(1, 'Everything has a cost').max(12, 'No-one can harness such power'),
	difficulty: z.number({ message: 'A number is needed'}).int().positive('Magic is no foolish game'),
	description: z.string().nullable(),
	damages: z.string().nullable(),
	heal: z.string().nullable(),
	effects: z.string().nullable(),
	range: z.string().nullable(),
	duration: z.string().nullable(),
	target: z.string().nullable(),
	components: z.string().nullable(),
})