import { prisma } from '@api/index';
import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { ActionArraySchema, ActionSchema } from '@api/lib/ZodAction';
import {
	AttributeArraySchema,
	AttributeSchema,
	ZodCreature,
	ZodNewCreature,
} from '@api/lib/ZodCreature';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

export const creaturesRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.creature.findMany({
				orderBy: {
					updatedAt: 'desc',
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getLatest: procedure.query(async () => {
		try {
			return await prisma.creature.findFirst({
				orderBy: {
					createdAt: 'desc',
				},
				take: 1,
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.creature.count({
				select: {
					_all: true,
					name: true, // count all records with name non-null
				},
			});
		} catch (error) {
			serverErrorHandler(error);
		}
	}),
	getOrderByLevel: procedure
		.input(z.enum(['desc', 'asc']))
		.query(async input => {
			try {
				console.log('order by:', input.input);
				return await prisma.creature.aggregate({
					orderBy: {
						level: input.input,
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	getByFullName: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.creature.findFirstOrThrow({
			where: { fullname: input },
		});
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.creature.findFirstOrThrow({
			where: { id: input },
		});
	}),
	create: procedure.input(ZodNewCreature).mutation(async ({ input }) => {
		console.log('💌 creating creature :', input.fullname, ' ...');
		return await prisma.creature.create({
			data: input,
		});
	}),
	createMany: procedure.input(ZodNewCreature).mutation(async ({ input }) => {
		return await prisma.creature.createMany({
			data: input,
		});
	}),
	update: procedure.input(ZodCreature).mutation(async ({ input }) => {
		const { id, ...creature } = input;
		return await prisma.creature.update({
			where: { id: id },
			data: creature,
		});
	}),
	addAction: procedure.input(ActionSchema).mutation(async ({ input }) => {
		const { id, ...action } = input; // id is not action.id
		return await prisma.creature.update({
			where: { id: id },
			data: {
				actions: {
					push: action,
				},
			},
		});
	}),
	updateAction: procedure
		.input(ActionArraySchema)
		.mutation(async ({ input }) => {
			try {
				return await prisma.creature.update({
					where: { id: input.id },
					data: {
						actions: input.actions,
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
	addAttribute: procedure.input(AttributeSchema).mutation(async ({ input }) => {
		const { id, ...attribute } = input;
		return await prisma.creature.update({
			where: { id: id },
			data: {
				attributes: {
					push: attribute,
				},
			},
		});
	}),
	updateAttribute: procedure
		.input(AttributeArraySchema)
		.mutation(async ({ input }) => {
			try {
				return await prisma.creature.update({
					where: { id: input.id },
					data: {
						attributes: input.attributes,
					},
				});
			} catch (error) {
				serverErrorHandler(error);
			}
		}),
});
