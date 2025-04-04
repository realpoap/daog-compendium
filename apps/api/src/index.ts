import { appRouter } from '@api/router/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import ImageKit from 'imagekit';
import { createContext } from './trpc';

async function main() {
	const port = process.env.PORT || 3000;

	const app = express();

	app.use(cookieParser());

	// Configure specific origins and options:
	const origin =
		process.env.NODE_ENV === 'production'
			? [process.env.FRONTEND_URL, process.env.IMAGEKIT_URL_ENDPOINT]
			: true;
	app.use(
		cors({
			origin: ['http://localhost:3000', 'https://your-frontend.com'],
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true, // If you need to handle cookies or authorization headers
		}),
	);

	const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
	if (!IMAGEKIT_PRIVATE_KEY) {
		console.warn('ImageKit Private Key is missing');
	}
	if (IMAGEKIT_PRIVATE_KEY) console.info('ImageKit Private Key ok');

	const imagekit = new ImageKit({
		urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
		publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
		privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
	});

	app.use((req, res, next) => {
		if (req.method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type,Authorization',
			);
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

	app.get('/healthcheck', (_req, res) => {
		console.info(`Monitoring health 🩺...`);
		res.sendStatus(200);
	});

	app.get('/auth', function (_req, res) {
		const result = imagekit.getAuthenticationParameters();
		res.send(result);
	});

	app.get('/signed-url', (req, res) => {
		const filePath = req.query.path as string;

		if (!filePath) {
			return res.status(400).json({ error: 'Missing file path.' });
		}

		const expireSeconds = 600; // Signed URL expires in 10 minutes

		const url = imagekit.url({
			path: filePath,
			signed: true,
			expireSeconds,
		});

		res.json({ url });
	});

	app.get('/', (_req, res) => {
		console.info(`Server is running now ! Front end set as : ${origin}`);
		res.send(`Server is running now ! Front end set as : ${origin}`);
	});

	app.listen(port, () => {
		console.assert(`App listening on port: ${port}`);
	});
}

void main();
