import { appRouter } from '@api/router/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors middleware correctly
import 'dotenv/config';
import express from 'express';
import ImageKit from 'imagekit';
import { createContext } from './trpc';

async function main() {
	const port = process.env.PORT || 3000;

	const app = express();
	// const cors = require('cors'); // Remove this line, as you've already imported it

	app.use(cookieParser());

	const allowedOrigins: string[] = [];

	if (process.env.NODE_ENV === 'production') {
		if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
		if (process.env.IMAGEKIT_URL_ENDPOINT)
			allowedOrigins.push(process.env.IMAGEKIT_URL_ENDPOINT);
		if (allowedOrigins.length === 0) {
			console.warn('Warning: No allowed origins configured in production.');
		}
		allowedOrigins.push('https://daog-compendium.onrender.com');
	} else {
		allowedOrigins.push('http://localhost:3000');
		allowedOrigins.push('http://localhost:5173');
		if (process.env.IMAGEKIT_URL_ENDPOINT)
			allowedOrigins.push(process.env.IMAGEKIT_URL_ENDPOINT);
	}

	// app.use(cors());

	app.use(
		cors({
			origin: (origin, callback) => {
				console.log('Request origin:', origin); // 🔍 Debug log
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error(`Not allowed by CORS: ${origin}`));
				}
			},
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
		}),
	);
	app.options('*', cors()); // Allow preflight across all routes

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
		console.info(`Server is running now ! Origins set as : ${allowedOrigins}`);
		res.send(`Server is running now ! Origins set as : ${allowedOrigins}`);
	});

	app.listen(port, () => {
		console.assert(`App listening on port: ${port}`);
	});
}

main().catch(err => {
	console.error('Error starting the server:', err);
});
