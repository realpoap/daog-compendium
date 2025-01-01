import { prisma } from '@api/index';
import { ComponentSchema } from '@api/lib/ZodComponent';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

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
	create: procedure.input(ComponentSchema).mutation(async ({ input }) => {
		console.log('💌 creating component #', input.name);
		return await prisma.component.create({
			data: input,
		});
	}),
	createMany: procedure.input(ComponentSchema).mutation(async ({ input }) => {
		console.log('💌 creating multiple components ...');
		return await prisma.component.createMany({
			data: input,
		});
	}),
	update: procedure.input(ComponentSchema).mutation(async ({ input }) => {
		console.log('💌 updating component :', input.searchName);
		return await prisma.component.update({
			where: { searchName: input.searchName },
			data: input,
		});
	}),
});
