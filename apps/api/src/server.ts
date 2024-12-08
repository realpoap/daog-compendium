import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { appRouter } from '@api/router';

async function main() {
  const port = process.env.PORT || 3000;

  const app = express();

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  app.use(cors(corsOptions));

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
  app.get('/', (req, res) => res.send('Server is running now!'));

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
