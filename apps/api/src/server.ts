// import { createExpressMiddleware } from '@trpc/server/adapters/express';
// import cors from 'cors';
// import 'dotenv/config';
// import express from 'express';

// import { appRouter } from '@api/router/_app';

// async function main() {
//   const port = process.env.PORT || 3000;

//   const app = express();

//   app.options('*', cors()); // handle preflight
//   app.use(cors({
//     origin: '*',
//     methods: 'GET,POST,OPTIONS',
//     allowedHeaders: 'Content-Type,Authorization',
//   }));

//   app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.status(204).end(); // respond with no content
//   } else {
//     next();
//   }
// });

//   app.use(
//     '/trpc',
//     createExpressMiddleware({
//       router: appRouter,
//       createContext: (ctx) => ({ req: ctx.req, res: ctx.res }),
//       onError:
//         process.env.NODE_ENV === 'development'
//           ? ({ path, error }) => {
//               console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
//             }
//           : undefined,
//     })
//   );

//   // For testing purposes, wait-on requests '/'
//   app.get('/', (req, res) => {
//     console.log('server running');
//     res.send('Server is running now!');
//   })

//   app.listen(port, () => {
//     console.log(`App listening on port: ${port}`);
//   });
// }

// void main();

import { appRouter } from '@api/router/_app';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => {
    console.log('server running');
    res.send('Server is running now!');
  })

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
