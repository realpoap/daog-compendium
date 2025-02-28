import {
	loginHandler,
	logoutHandler,
	refreshTokenHandler,
	registerHandler,
} from '@api/controllers/auth-controller';
import { getMeHandler } from '@api/controllers/user-controller';
import { prisma } from '@api/prismaClient';
import { ZodLogin, ZodUser } from '@api/lib/ZodUser';
import { procedure, router } from '@api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = router({
	checkEmail: procedure.input(z.string()).query(async ({ input }) => {
		try {
			const user = await prisma.user.findFirst({
				where: { email: input },
			});
			if (user) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Error in auth.checkEmail:', error);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Could not find email ${input}`,
			});
		}
	}),
	registerUser: procedure
		.input(ZodUser)
		.mutation(({ input }) => registerHandler({ input })),
	login: procedure
		.input(ZodLogin)
		.mutation(({ input, ctx }) => loginHandler({ input, ctx })),
	logout: procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
	refreshToken: procedure.query(({ ctx }) => refreshTokenHandler({ ctx })),
	getMe: procedure.query(({ ctx }) => getMeHandler({ ctx })),
});
