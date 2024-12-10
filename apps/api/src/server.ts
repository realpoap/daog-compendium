import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { appRouter } from '@api/router';

async function main() {
  const port = process.env.PORT || 3000;

  const app = express();

  app.options('*', cors()); // handle preflight
  app.use(cors({
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: (ctx) => ({ req: ctx.req, res: ctx.res }),
      onError:
        process.env.NODE_ENV === 'development'
          ? ({ path, error }) => {
              console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
            }
          : undefined,
    })
  );

  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => {
    console.log('server running');
    res.send('Server is running now!');
  })

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
