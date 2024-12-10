import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@api/router/_app';

export const trpc = createTRPCReact<AppRouter>();
