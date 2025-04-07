import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const usersRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.user.findMany({
				select: {
					role: true,
					id: true,
					email: true,
					name: true,
					isOwner: true,
					characters: true,
					campaigns: true,
					createdAt: true,
				},
				orderBy: {
					name: 'desc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getUserById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.user.findFirstOrThrow({
			where: { id: input },
		});
	}),
	updateCharacterOwnership: secureProcedure
		.input(
			z.object({
				userId: z.string(),
				characterId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { userId, characterId } = input;

			try {
				// 1. Remove characterId from any user that currently has it
				const usersWithCharacter = await prisma.user.findMany({
					where: {
						characters: {
							has: characterId,
						},
					},
				});

				await Promise.all(
					usersWithCharacter.map(user =>
						prisma.user.update({
							where: { id: user.id },
							data: {
								characters: user.characters.filter(c => c !== characterId),
							},
						}),
					),
				);

				// 2. Add characterId to the target user if it's not already there
				const targetUser = await prisma.user.findUnique({
					where: { id: userId },
				});

				if (!targetUser) throw new Error('User not found');

				if (!targetUser.characters.includes(characterId)) {
					const updatedUser = await prisma.user.update({
						where: { id: userId },
						data: {
							characters: [...targetUser.characters, characterId],
						},
					});

					return updatedUser;
				}

				// Return the user even if the character was already there
				return targetUser;
			} catch (error) {
				serverErrorHandler(error);
				throw error;
			}
		}),
});
