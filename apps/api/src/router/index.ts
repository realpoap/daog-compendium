import { helloRouter } from '@api/router/hello';
import { router } from '@api/trpc';
import { spellsRouter } from './spells';

export const appRouter = router({
  hello: helloRouter,
  spells: spellsRouter,
});

export type AppRouter = typeof appRouter;
