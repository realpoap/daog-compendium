import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { CharacterSchema, NewCharacterSchema } from '@api/lib/ZodCharacter';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const charactersRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.character.findMany({
				orderBy: {
					updatedAt: 'asc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.character.count({
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
	getByFullName: procedure.input(z.string()).query(async ({ input }) => {
		try {
			return await prisma.character.findFirstOrThrow({
				where: { fullname: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	create: secureProcedure
		.input(NewCharacterSchema)
		.mutation(async ({ input }) => {
			try {
				return await prisma.character.create({
					data: input,
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	createMany: secureProcedure
		.input(NewCharacterSchema)
		.mutation(async ({ input }) => {
			return await prisma.character.createMany({
				data: input,
			});
		}),
	update: secureProcedure.input(CharacterSchema).mutation(async ({ input }) => {
		try {
			return await prisma.action.update({
				where: { id: input.id },
				data: input,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	delete: secureProcedure.input(z.string()).mutation(async ({ input }) => {
		try {
			return await prisma.character.delete({
				where: { id: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
});
