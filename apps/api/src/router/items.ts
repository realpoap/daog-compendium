import { prisma } from '@api/index';
import { ItemSchema } from '@api/lib/ZodItem';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

export const itemsRouter = router({
	getAll: procedure.query(async ()=> {
		try {
			return await prisma.item.findMany({
				orderBy: {
					name: 'asc'
				}
			});
		} catch (error) {
			console.error("Error in items.getAll:", error); // Log the error for debugging
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.item.count({
				select: {
					_all:true,
					name:true, // count all records with name non-null
				}
			});
		} catch (error) {
			console.error("Error in item.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
		getById: procedure
		.input(z.string())
		.query(async({input}) => {
			return await prisma.item.findFirstOrThrow({
				where:{id:input}
			})
		}),
	create: procedure
		.input(ItemSchema)
		.mutation(async({input}) => {
			console.log('💌 creating item #', input.name)
			return await prisma.item.create({
				data: input,
			})
		}),
	createMany: procedure
		.input(ItemSchema)
		.mutation(async({input}) => {
			console.log('💌 creating multiple items ...');
			return await prisma.item.createMany({
				data: input
			})
		}),
	update: procedure
		.input(ItemSchema)
		.mutation(async({input}) =>{
			console.log('💌 updating item :', input.searchName)
			return await prisma.item.update({
				where: {searchName: input.searchName},
				data: input
			})
		}),
})
