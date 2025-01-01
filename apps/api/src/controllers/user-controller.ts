import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { Context } from '@api/trpc';

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
	try {
		const user = ctx.user;
		return {
			status: 'success',
			user,
		};
	} catch (error) {
		serverErrorHandler(error);
	}
};
