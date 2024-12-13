import { appRouter } from '@api/router/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { log } from 'console';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

async function main() {
  const port = process.env.PORT || 3000;

  const app = express();

  const origin = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL 
  : true;
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
    res.send(`Server is running now ! Front end set as : ${origin}`);
  })

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();

