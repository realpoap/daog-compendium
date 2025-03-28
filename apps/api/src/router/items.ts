import {
	ItemSchema,
	ItemTypeSchema,
	NewItemSchema,
	qualityTypeSchema,
} from '@api/lib/ZodItem';
import { prisma } from '@api/prismaClient';
import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

const ItemNewSchema = z.object({
	itemType: ItemTypeSchema,
	searchName: z.string(),
	name: z.string().array(),
	material: z.string(),
	materialType: z.string(),
	materialSubType: z.string().nullable(),
	quality: qualityTypeSchema,
	weight: z.number().nullable(),
	value: z.number().nullable(),
	durability: z.number().int().nullable(),
	damages: z.string().nullable(),
	protection: z.number().int().nullable(),
	isFood: z.boolean().nullable(),
});

export const itemsRouter = router({
	getAll: procedure.query(async () => {
		try {
			return await prisma.item.findMany({
				orderBy: {
					name: 'asc',
				},
			});
		} catch (error) {
			console.error('Error in items.getAll:', error); // Log the error for debugging
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.item.count({
				select: {
					_all: true,
					name: true, // count all records with name non-null
				},
			});
		} catch (error) {
			console.error('Error in item.count:', error);
			throw new Error(`Internal server error`);
		}
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		return await prisma.item.findFirstOrThrow({
			where: { id: input },
		});
	}),
	create: secureProcedure.input(NewItemSchema).mutation(async ({ input }) => {
		console.log('💌 creating item #', input.name);
		return await prisma.item.create({
			data: input,
		});
	}),
	createMany: secureProcedure
		.input(ItemNewSchema)
		.mutation(async ({ input }) => {
			console.log('💌 creating multiple items ...');
			return await prisma.item.createMany({
				data: input,
			});
		}),
	update: secureProcedure.input(ItemSchema).mutation(async ({ input }) => {
		const { id, ...item } = input;
		return await prisma.item.update({
			where: { id: id },
			data: item,
		});
	}),
});
