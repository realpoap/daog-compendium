import { procedure, router } from '@api/trpc';
import { prisma } from '..';

import { SpellSchema } from '../lib/zod/modelSchema/SpellSchema';

export const spellsRouter = router({
	getAll: procedure.query(()=> {
		return prisma.spell.findMany();
	}),
	create: procedure
		.input(SpellSchema)
		.mutation(async({input}) => {
			console.log('💌 creating spell :', input.titleCommon)
			return await prisma.spell.create({
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
