import { prisma } from '@api/index';
import { ActionSchema } from '@api/lib/ZodAction';
import { ActionWithCreatureIdSchema, CreatureActionSchema, ZodCreature, ZodNewCreature } from '@api/lib/ZodCreature';
import { procedure, router } from '@api/trpc';
import { z } from 'zod';

export const creaturesRouter = router({
	getAll: procedure.query(async ()=> {
		try {
			return await prisma.creature.findMany({
				orderBy: {
					updatedAt: 'desc'
				}
			});
		} catch (error) {
			console.error("Error in creatures.getAll:", error); // Log the error for debugging
      throw new Error(`Internal server error`);
		}
	}),
	getLatest: procedure.query(async () => {
		try {
			return await prisma.creature.findFirst({
				orderBy: {
            createdAt: 'desc',
        },
        take: 1,
			})
		} catch (error) {
			console.error("Error in creatures.getLatest:", error)
			throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.creature.count({
				select: {
					_all:true,
					name:true, // count all records with name non-null
				}
			});
		} catch (error) {
			console.error("Error in creatures.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
	getOrderByLevel: procedure.input(z.enum(['desc','asc'])).query(async (input) => {
		try {
			console.log('order by:', input.input)
			return await prisma.creature.aggregate({
					orderBy: {
						level: input.input
					}
			})
		} catch (error) {
			console.error("Error in creature.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
	getByFullName: procedure
		.input(z.string())
		.query(async({input}) => {
			return await prisma.creature.findFirstOrThrow({
				where:{fullname:input}
			})
		}),
	getById: procedure
		.input(z.string())
		.query(async({input}) => {
			return await prisma.creature.findFirstOrThrow({
				where:{id:input}
			})
		}),
	create: procedure
		.input(ZodNewCreature)
		.mutation(async({input}) => {
			console.log('💌 creating creature :', input.fullname,' ...')
			return await prisma.creature.create({
				data: input,
			})
		}),
	createMany: procedure
		.input(ZodNewCreature)
		.mutation(async({input}) => {
			console.log('💌 creating multiple creatures ...');
			return await prisma.creature.createMany({
				data: input
			})
		}),
	update: procedure
		.input(ZodCreature)
		.mutation(async({input}) =>{
			console.log('💌 updating creature :', input.fullname)
			return await prisma.creature.update({
				where: {id: input.id},
				data: input
			})
		}),
	addAction: procedure
		.input(ActionSchema)
		.mutation(async({input}) =>{
			console.log('💌 updating creature action :', input.name, 'with id:', input.id)
			const {id,searchName, ...action} = input
			return await prisma.creature.update({
				where: {id: input.id},
				data: {
					actions: {
						push:action
					}
				}
			})
		}),
})
