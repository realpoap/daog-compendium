import { usersRouter } from '@api/router/users';
import { router } from '@api/trpc';
import { actionsRouter } from './actions';
import { attributesRouter } from './attributes';
import { authRouter } from './auth';
import { campaignsRouter } from './campaigns';
import { charactersRouter } from './characters';
import { componentsRouter } from './components';
import { creaturesRouter } from './creatures';
import { itemsRouter } from './items';
import { spellsRouter } from './spells';

export const appRouter = router({
	users: usersRouter,
	spells: spellsRouter,
	auth: authRouter,
	creatures: creaturesRouter,
	attributes: attributesRouter,
	components: componentsRouter,
	actions: actionsRouter,
	items: itemsRouter,
	characters: charactersRouter,
	campaigns: campaignsRouter,
});

export type AppRouter = typeof appRouter;
