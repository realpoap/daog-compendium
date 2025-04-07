import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { CharacterSchema, NewCharacterSchema } from '@api/lib/ZodCharacter';
import { CreatureComponentSchema } from '@api/lib/ZodComponent';
import { CreatureItemSchema } from '@api/lib/ZodItem';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const charactersRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.character.findMany({
				orderBy: {
					createdAt: 'asc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getPlayerCharacters: secureProcedure
		.input(z.string().array().nullable())
		.query(async ({ input }) => {
			if (!input || input.length === 0)
				throw new Error('No characters assigned to user');
			try {
				return await prisma.character.findMany({
					where: {
						id: { in: input },
					},
					select: {
						fullname: true,
						id: true,
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
					fullname: true,
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.character.findFirstOrThrow({
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
		const { id, ...char } = input;
		try {
			return await prisma.character.update({
				where: { id: id },
				data: char,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	updateCampaign: secureProcedure
		.input(z.object({ id: z.string(), campaignId: z.string() }))
		.mutation(async ({ input }) => {
			const { id, campaignId } = input;

			try {
				// Fetch the current bio object first
				const character = await prisma.character.findUnique({
					where: { id },
					select: { bio: true }, // Get existing bio
				});

				if (!character) throw new Error('Character not found');

				return await prisma.character.update({
					where: { id },
					data: {
						bio: {
							set: {
								...character.bio, // Keep all previous fields
								campaign: campaignId, // Update only campaign
							},
						},
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	updateOwner: secureProcedure
		.input(z.object({ id: z.string(), userId: z.string() }))
		.mutation(async ({ input }) => {
			const { id, userId } = input;

			try {
				// Fetch the current bio object first
				const character = await prisma.character.findUnique({
					where: { id },
					select: { bio: true }, // Get existing bio
				});

				if (!character) throw new Error('Character not found');

				return await prisma.character.update({
					where: { id },
					data: {
						bio: {
							set: {
								...character.bio, // Keep all previous fields
								owner: userId, // Update only owner
							},
						},
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	updateAvatar: secureProcedure
		.input(
			z.object({
				id: z.string(),
				path: z.string().optional(),
				url: z.string().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			const { id, url, path } = input;

			try {
				// Fetch the current bio object first
				const character = await prisma.character.findUnique({
					where: { id },
					select: { bio: true }, // Get existing bio
				});

				if (!character) throw new Error('Character not found');
				const avatarObject = { path: path, url: url };
				return await prisma.character.update({
					where: { id },
					data: {
						bio: {
							set: {
								...character.bio,
								avatar: avatarObject,
							},
						},
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	updateXp: secureProcedure
		.input(
			z.object({
				id: z.string(),
				experience: z.number().int().optional(),
				level: z.number().int(),
			}),
		)
		.mutation(async ({ input }) => {
			const { id, experience, level } = input;

			try {
				// Fetch the current bio object first
				const character = await prisma.character.findUnique({
					where: { id },
					select: { profile: true }, // Get existing bio
				});

				if (!character) throw new Error('Character not found');

				return await prisma.character.update({
					where: { id },
					data: {
						profile: {
							set: {
								...character.profile, // Keep all previous fields
								level: level,
								experience: experience,
							},
						},
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	updateItems: secureProcedure
		.input(z.object({ id: z.string(), item: CreatureItemSchema }))
		.mutation(async ({ input }) => {
			const { id, item } = input;
			try {
				// Fetch the current bio object first
				const targetCharacter = await prisma.character.findUnique({
					where: { id },
					select: { equipment: true }, // Get existing equipment
				});

				if (!targetCharacter) throw new Error('Character not found');

				return await prisma.character.update({
					where: { id },
					data: {
						equipment: {
							set: {
								...targetCharacter.equipment, // Keep all previous fields
								items: [...targetCharacter.equipment.items, item],
							},
						},
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	updateComponents: secureProcedure
		.input(z.object({ id: z.string(), item: CreatureComponentSchema }))
		.mutation(async ({ input }) => {
			const { id, item } = input;
			try {
				// Fetch the current bio object first
				const targetCharacter = await prisma.character.findUnique({
					where: { id },
					select: { equipment: true }, // Get existing equipment
				});

				if (!targetCharacter) throw new Error('Character not found');

				return await prisma.character.update({
					where: { id },
					data: {
						equipment: {
							set: {
								...targetCharacter.equipment, // Keep all previous fields
								components: [...targetCharacter.equipment.components, item],
							},
						},
					},
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
