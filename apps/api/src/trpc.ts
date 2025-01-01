import {
	initTRPC,
	TRPCError,
	type inferRouterInputs,
	type inferRouterOutputs,
} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson';

import type { AppRouter } from '@api/router/_app';
import { deserializeUser } from './middleware/deserializeUser';

// export type Context = {
//   req: Request;
//   res: Response;
//   user?: {
//     id: string;
//     name: string;
//     isEditor: boolean;
//     isOwner: boolean;
//   };
// };

export const createContext = ({
	req,
	res,
	info,
}: trpcExpress.CreateExpressContextOptions) =>
	deserializeUser({ req, res, info });

const trpc = initTRPC.context<Context>().create({
	transformer: superjson,
});

export type Context = Awaited<ReturnType<typeof createContext>>;

// AUTHENTIFICATION MIDDLEWARE //
const isAuthorized = trpc.middleware(({ ctx, next }) => {
	if (!ctx.user || !ctx.req.cookies.logged_in) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in to access this resource',
		});
	}
	console.log(ctx.user);
	return next();
});

export const procedure = trpc.procedure;
export const secureProcedure = trpc.procedure.use(isAuthorized);

export const router = trpc.router;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
