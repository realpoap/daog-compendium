import { appRouter } from '@api/router/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { createContext } from './trpc';

const port = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

const origin =
	process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : true;
app.use(cors({ origin, credentials: true }));

app.use((req, res, next) => {
	if (req.method === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
		res.status(204).end(); // respond with no content
	} else {
		next();
	}
});

app.use(
	'/trpc',
	createExpressMiddleware({
		router: appRouter,
		createContext,
		onError:
			process.env.NODE_ENV === 'development'
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
						);
					}
				: undefined,
	}),
);

app.get('/health', (_req, res) => {
	console.log(`Monitoring health 🩺...`);
	res.sendStatus(200);
});

app.get('/', (_req, res) => {
	console.log(`Server is running now ! Front end set as : ${origin}`);
	res.send(`Server is running now ! Front end set as : ${origin}`);
});

app.listen(port, () => {
	console.log(`App listening on port: ${port}`);
});

module.exports = app;
