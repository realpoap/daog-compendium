import { Context } from '@api/trpc';
import { TRPCError } from '@trpc/server';

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: 'success',
      user
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};