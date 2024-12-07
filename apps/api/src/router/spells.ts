import { procedure, router } from '@api/trpc';
import { z } from 'zod';
import { prisma } from '..';
import { SpellSchema } from '../lib/zod/modelSchema/SpellSchema';

const SpellNewSchema = SpellSchema.omit({id: true});

export const spellsRouter = router({
	getAll: procedure.query(async ()=> {
		return await prisma.spell.findMany({
			orderBy: {
				updatedAt: 'desc'
			}
		});
	}),
	getByNumber: procedure
		.input(z.number())
		.query(async({input}) => {
			return await prisma.spell.findFirstOrThrow({
				where:{number:input}
			})
		}),
	create: procedure
		.input(SpellNewSchema)
		.mutation(async({input}) => {
			console.log('💌 creating spell :', input.titleCommon)
			return await prisma.spell.create({
				data: input
			})
		}),
	createMany: procedure
		.input(SpellNewSchema)
		.mutation(async({input}) => {
			console.log('💌 creating multiple spells ...');
			return await prisma.spell.createMany({
				data: input
			})
		}),
	update: procedure
		.input(SpellSchema)
		.mutation(async({input}) =>{
			console.log('💌 updating spell :', input.titleCommon)
			const {id} = input;
			return await prisma.spell.update({
				where: {id},
				data: input
			})
		}),
})
