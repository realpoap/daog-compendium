// import { initTRPC, type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
// import type { Request, Response } from 'express';
// import superjson from 'superjson';

// import type { AppRouter } from '@api/router';

// type Context = {
//   req: Request;
//   res: Response;
// };

// const trpc = initTRPC.context<Context>().create({
//   transformer: superjson,
// });

// export const procedure = trpc.procedure;
// export const router = trpc.router;

// export type RouterInput = inferRouterInputs<AppRouter>;
// export type RouterOutput = inferRouterOutputs<AppRouter>;

import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create({
  transformer: superjson,
});
 
export const router = t.router;
export const procedure = t.procedure;
