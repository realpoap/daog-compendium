// @api/router/imagekit.ts

import { procedure, router } from '@api/trpc';
import ImageKit from 'imagekit';
import { z } from 'zod';

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const imagekitRouter = router({
	getSignedUrl: procedure
		.input(z.object({ path: z.string() }))
		.query(({ input }) => {
			console.log('imagekit url input', input);
			const url = imagekit.url({
				path: input.path,
				signed: true,
				expireSeconds: 600,
			});
			return { url };
		}),
});
