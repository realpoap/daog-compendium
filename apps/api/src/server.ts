import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { appRouter } from '@api/router';

async function main() {
  const port = process.env.PORT || 3000;

  const app = express();

  const corsOptions ={
   origin:'daog-compendium.vercel.app', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

 app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
  createContext: (ctx) => ({ req: ctx.req, res: ctx.res }),
  responseMeta(ctx) {
    ctx.ctx?.res?.setHeader(
      'Access-Control-Allow-Origin',
      '.brand.localhost'
    )
    ctx.ctx?.res?.setHeader('Access-Control-Request-Method', '*')
    ctx.ctx?.res?.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET'
    )
    ctx.ctx?.res?.setHeader('Access-Control-Allow-Headers', '*')

    if (ctx.ctx?.req?.method === 'OPTIONS') {
      ctx.ctx?.res?.writeHead(200)
    }

    return {
      headers: ctx.ctx?.res?.getHeaders() as Record<
        string,
        string
      >,
      statusCode: ctx.ctx?.res?.statusCode || 200
    }
  }
    })
  );

  // app.use(
  //   '/trpc',
  //   createExpressMiddleware({
  //     router: appRouter,
  //     createContext: (ctx) => ({ req: ctx.req, res: ctx.res }),
  //     onError:
  //       process.env.NODE_ENV === 'development'
  //         ? ({ path, error }) => {
  //             console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
  //           }
  //         : undefined,
  //   })
  // );

  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => res.send('Server is running now!'));

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
