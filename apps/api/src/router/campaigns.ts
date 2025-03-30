import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { CampaignSchema, NewCampaignSchema } from '@api/lib/ZodCampaign';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const campaignsRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.campaigns.findMany({
				orderBy: {
					createdAt: 'desc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.campaigns.count({
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
		return await prisma.campaigns.findFirstOrThrow({
			where: { id: input },
		});
	}),
	getByDMId: procedure.input(z.string()).query(async ({ input }) => {
		try {
			return await prisma.campaigns.findMany({
				where: { dm: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getByPlayer: procedure.input(z.string()).query(async ({ input }) => {
		try {
			console.info(input);
			return await prisma.campaigns.findMany({
				where: {
					players: {
						has: input,
					},
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	create: secureProcedure
		.input(NewCampaignSchema)
		.mutation(async ({ input }) => {
			try {
				return await prisma.campaigns.create({
					data: input,
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	createMany: secureProcedure
		.input(NewCampaignSchema)
		.mutation(async ({ input }) => {
			return await prisma.campaigns.createMany({
				data: input,
			});
		}),
	update: secureProcedure.input(CampaignSchema).mutation(async ({ input }) => {
		try {
			return await prisma.campaigns.update({
				where: { id: input.id },
				data: input,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	updatePlayers: secureProcedure
		.input(z.object({ id: z.string(), players: z.string().array() }))
		.mutation(async ({ input }) => {
			try {
				return await prisma.campaigns.update({
					where: {
						id: input.id,
					},
					data: {
						players: input.players,
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	toggleActive: secureProcedure
		.input(z.object({ id: z.string(), active: z.boolean() }))
		.mutation(async ({ input }) => {
			try {
				return await prisma.campaigns.update({
					where: { id: input.id },
					data: {
						active: input.active,
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	delete: secureProcedure.input(z.string()).mutation(async ({ input }) => {
		try {
			return await prisma.campaigns.delete({
				where: { id: input },
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
});
