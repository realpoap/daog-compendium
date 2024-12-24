import { helloRouter } from '@api/router/hello';
import { router } from '@api/trpc';
import { spellsRouter } from './spells';
import { authRouter } from './auth';

export const appRouter = router({
  hello: helloRouter,
  spells: spellsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
