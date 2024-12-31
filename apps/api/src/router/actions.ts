import { prisma } from '@api/index';
import { ActionSchema, NewActionSchema } from '@api/lib/ZodAction';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

export const actionsRouter = router({
	getAll: procedure.query(async ()=> {
		try {
			return await prisma.action.findMany({
				orderBy: {
					name: 'asc'
				}
			});
		} catch (error) {
			console.error("Error in actions.getAll:", error); // Log the error for debugging
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.action.count({
				select: {
					_all:true,
					name:true, // count all records with name non-null
				}
			});
		} catch (error) {
			console.error("Error in action.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
		getById: procedure
		.input(z.string())
		.query(async({input}) => {
			return await prisma.action.findFirstOrThrow({
				where:{id:input}
			})
		}),
	create: procedure
		.input(NewActionSchema)
		.mutation(async({input}) => {
			try {
				console.log('💌 creating action #', input.searchName)
			return await prisma.action.create({
				data: input,
			})
			} catch (error) {
				
			}
		}),
	createMany: procedure
		.input(NewActionSchema)
		.mutation(async({input}) => {
			console.log('💌 creating multiple actions ...');
			return await prisma.action.createMany({
				data: input
			})
		}),
	update: procedure
		.input(ActionSchema)
		.mutation(async({input}) =>{
			try {
					console.log('💌 updating action :', input.searchName)
			return await prisma.action.update({
				where: {searchName: input.searchName},
				data: input
			})
			} catch (error) {
				console.error("Error in action.count:", error)
			throw new Error(`Internal server error`);
			}
		}),
})
