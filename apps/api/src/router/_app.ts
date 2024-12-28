import { helloRouter } from '@api/router/hello';
import { router } from '@api/trpc';
import { attributesRouter } from './attributes';
import { authRouter } from './auth';
import { creaturesRouter } from './creatures';
import { spellsRouter } from './spells';

export const appRouter = router({
  hello: helloRouter,
  spells: spellsRouter,
  auth: authRouter,
  creatures: creaturesRouter,
  attributes: attributesRouter
});

export type AppRouter = typeof appRouter;
