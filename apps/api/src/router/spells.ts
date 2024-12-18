import { prisma } from '@api/index';
import { ZodNewSpell } from '@api/lib/ZodSpell';
import { procedure, router } from '@api/trpc';
import { number, z } from 'zod';

export const spellsRouter = router({
	getAll: procedure.query(async ()=> {
		try {
			return await prisma.spell.findMany({
				orderBy: {
					updatedAt: 'desc'
				}
			});
		} catch (error) {
			console.error("Error in spells.getAll:", error); // Log the error for debugging
      throw new Error(`Internal server error`);
		}
	}),
	getTotal: procedure.query(async () => {
		try {
			return await prisma.spell.count({
				select: {
					_all:true,
					number:true, // count all records with number non-null
				}
			});
		} catch (error) {
			console.error("Error in spells.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
	getHighestNumber: procedure.query(async () => {
		try {
			return await prisma.spell.aggregate({
					_max: {
						number: true
					}
			})
		} catch (error) {
			console.error("Error in spells.count:", error)
			throw new Error(`Internal server error`);
		}
	}),
	getByNumber: procedure
		.input(z.number())
		.query(async({input}) => {
			return await prisma.spell.findFirstOrThrow({
				where:{number:input}
			})
		}),
	create: procedure
		.input(ZodNewSpell)
		.mutation(async({input}) => {
			console.log('💌 creating spell :', input.titleCommon)
			return await prisma.spell.create({
				data: input,
			})
		}),
	createMany: procedure
		.input(ZodNewSpell)
		.mutation(async({input}) => {
			console.log('💌 creating multiple spells ...');
			return await prisma.spell.createMany({
				data: input
			})
		}),
	// update: procedure
	// 	.input(ZodNewSpell)
	// 	.mutation(async({input}) =>{
	// 		console.log('💌 updating spell :', input.titleCommon)
	// 		//const {id} = input;
	// 		return await prisma.spell.update({
	// 			where: {id},
	// 			data: input
	// 		})
	// 	}),
})
