import { procedure, router, secureProcedure } from '@api/trpc';
import { z } from 'zod';

export const schema = z.object({
	name: z.string(),
});

export const helloRouter = router({
	hello: procedure.input(schema).query(async ({ input }) => ({
		success: true,
		message: `Hello ${input.name}!`,
	})),
	secureAction: secureProcedure.mutation(({ ctx }) => {
		const { user } = ctx;
		console.log('User id in tRPC protected route', user?.id);
		return { data: 'sensitive information' };
	}),
});
