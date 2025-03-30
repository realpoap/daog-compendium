import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { prisma } from '@api/prismaClient';
import { procedure, router } from '@api/trpc';
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
});
