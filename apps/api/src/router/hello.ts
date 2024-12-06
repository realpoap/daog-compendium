import { z } from 'zod';

import { procedure, router } from '@api/trpc';

export const schema = z.object({
  name: z.string(),
});

export const helloRouter = router({
  get: procedure.input(schema).query(async ({ input }) => ({ success: true, message: `Hello ${input.name}!` })),
});
