import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { NewActionSchema } from '@api/lib/ZodAction';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const actionsRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.action.findMany({
				orderBy: {
					name: 'asc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.action.count({
				select: {
					_all: true,
					name: true, // count all records with name non-null
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.action.findFirstOrThrow({
			where: { id: input },
		});
	}),
	getBySearchName: procedure.input(z.string()).query(async ({ input }) => {
		try {
			return await prisma.action.findFirstOrThrow({
				where: { searchName: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	create: secureProcedure.input(NewActionSchema).mutation(async ({ input }) => {
		try {
			return await prisma.action.create({
				data: input,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	createMany: secureProcedure
		.input(NewActionSchema)
		.mutation(async ({ input }) => {
			return await prisma.action.createMany({
				data: input,
			});
		}),
	update: secureProcedure.input(NewActionSchema).mutation(async ({ input }) => {
		try {
			return await prisma.action.update({
				where: { searchName: input.searchName },
				data: input,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	delete: secureProcedure.input(z.string()).mutation(async ({ input }) => {
		try {
			return await prisma.action.delete({
				where: { searchName: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
});
