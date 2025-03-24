import { ComponentSchema } from '@api/lib/ZodComponent';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

import { HabitatTypeSchema } from '@api/lib/ZodComponent';

const raritySchema = z.enum(['common', 'unusual', 'rare', 'fabled']);

const ComponentNewSchema = z.object({
	rarity: raritySchema,
	habitat: z.array(HabitatTypeSchema),
	searchName: z.string(),
	name: z.string().array(),
	componentType: z.string(),
	scienceName: z.string(),
	description: z.string().nullable(),
	weight: z.number().nullable(),
	value: z.number().nullable(),
	valueWeight: z.number().nullable(),
	toxic: z.boolean(),
	isFood: z.boolean().nullable(),
	toxicity: z.string().nullable(),
	uses: z.object({
		ointment: z.boolean(),
		potion: z.boolean(),
		extract: z.boolean(),
		catalyst: z.boolean(),
	}),
});

export const componentsRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.component.findMany({
				orderBy: {
					name: 'asc',
				},
			});
		} catch (error) {
			console.error('Error in components.getAll:', error); // Log the error for debugging
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.component.count({
				select: {
					_all: true,
					name: true, // count all records with name non-null
				},
			});
		} catch (error) {
			console.error('Error in component.count:', error);
			throw new Error(`Internal server error`);
		}
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.component.findFirstOrThrow({
			where: { id: input },
		});
	}),
	create: secureProcedure
		.input(ComponentNewSchema)
		.mutation(async ({ input }) => {
			console.log('💌 creating component #', input.name);
			return await prisma.component.create({
				data: input,
			});
		}),
	createMany: secureProcedure
		.input(ComponentNewSchema)
		.mutation(async ({ input }) => {
			console.log('💌 creating multiple components ...');
			return await prisma.component.createMany({
				data: input,
			});
		}),
	update: secureProcedure.input(ComponentSchema).mutation(async ({ input }) => {
		const { id, ...component } = input;
		return await prisma.component.update({
			where: { id: id },
			data: component,
		});
	}),
});
