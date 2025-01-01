import { TRPCError } from '@trpc/server';

export const serverErrorHandler = (error: unknown) => {
	// Check if it's a validation error
	if (error instanceof Error) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: error.message,
		});
	} else {
		// Handle internal server errors
		console.error('Internal Server Error:', error);

		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: 'User not created',
		});
	}
};
