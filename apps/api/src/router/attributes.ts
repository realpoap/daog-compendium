import { prisma } from '@api/index';
import { AttributeSchema } from '@api/lib/zod-prisma';
import { NewAttributeSchema } from '@api/lib/ZodCreature';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

export const attributesRouter = router({
	getAll: procedure.query(async ()=> {
		try {
			return await prisma.attribute.findMany({
				orderBy: {
					name: 'asc'
				}
			});
		} catch (error) {
			console.error("Error in attributes.getAll:", error); // Log the error for debugging
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.attribute.count({
				select: {
					_all:true,
					name:true, // count all records with name non-null
				}
			});
		} catch (error) {
			console.error("Error in attribute.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
		getById: procedure
		.input(z.string())
		.query(async({input}) => {
			return await prisma.attribute.findFirstOrThrow({
				where:{id:input}
			})
		}),
	create: procedure
		.input(NewAttributeSchema)
		.mutation(async({input}) => {
			try {
				console.log('💌 creating attribute #', input.name)
				return await prisma.attribute.create({
				data: input,
			})
			} catch (error) {
				console.error("Error in attribute.create:", error)
				throw new Error(`Internal server error`);
			}
		}),
	createMany: procedure
		.input(NewAttributeSchema)
		.mutation(async({input}) => {
			console.log('💌 creating multiple attributes ...');
			return await prisma.attribute.createMany({
				data: input
			})
		}),
	update: procedure
		.input(AttributeSchema)
		.mutation(async({input}) =>{
			console.log('💌 updating attribute :', input.name)
			return await prisma.attribute.update({
				where: {name: input.name},
				data: input
			})
		}),
})
