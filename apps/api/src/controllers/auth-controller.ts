import customConfig from '@api/config/default';
import { prisma } from '@api/index';
import { serverErrorHandler } from '@api/lib/utils/errorHandler';
import { signJwt, signToken, verifyJwt } from '@api/lib/utils/jwt';
import { CreateUserInput, LoginUserInput } from '@api/lib/ZodUser';
import { Context } from '@api/trpc';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

// Cookie options
export const accessTokenCookieOptions = {
	...cookieOptions,
	expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 60 * 1000), //15 min
	maxAge: customConfig.accessTokenExpiresIn * 60 * 1000, //15min
};

export const refreshTokenCookieOptions = {
	...cookieOptions,
	expires: new Date(
		Date.now() + customConfig.refreshTokenExpiresIn * 60 * 1000,
	), // 1 day
	maxAge: customConfig.refreshTokenExpiresIn * 60 * 1000, // 1 day
};

// Register new user
export const registerHandler = async ({
	input,
}: {
	input: CreateUserInput;
}) => {
	try {
		const exists = await prisma.user.findFirst({
			where: { email: input.email },
		});
		if (exists)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Email already exists',
			});

		// generate salt and hash password
		// salt is a random string that is added to the password before hashing
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(input.password, salt);

		const user = await prisma.user.create({
			data: {
				name: input.name,
				password: hashPassword,
				email: input.email,
			},
		});

		// exclude password in returned user
		const { password, ...userWithoutPassword } = user;

		return {
			status: 'success',
			data: userWithoutPassword,
		};
	} catch (error) {
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
	}
};

// Login user
export const loginHandler = async ({
	input,
	ctx,
}: {
	input: LoginUserInput;
	ctx: Context;
}) => {
	try {
		const user = await prisma.user.findFirst({
			where: { email: input.email },
		});

		if (!user)
			throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });

		const validPassword = bcrypt.compare(input.password, user.password);

		if (!validPassword)
			throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid password' });

		const { access_token, refresh_token } = await signToken(user);

		// Send Access Token in Cookie
		ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
		ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
		ctx.res.cookie('logged_in', true, {
			...accessTokenCookieOptions,
			httpOnly: false,
		});
		console.log('cookies after login:', ctx.req.cookies);

		// Send Access Token
		return {
			status: 'success',
			access_token,
		};
	} catch (error) {
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
				message: 'Could not log in',
			});
		}
	}
};
// Refresh Tokens handler
export const refreshTokenHandler = async ({ ctx }: { ctx: Context }) => {
	try {
		// Get the refresh token from cookie
		const refresh_token = ctx.req.cookies.refresh_token as string;

		const message = 'Could not refresh access token';
		if (!refresh_token) {
			throw new TRPCError({ code: 'FORBIDDEN', message });
		}

		// Validate the Refresh token
		const decoded = verifyJwt<{ sub: string }>(
			refresh_token,
			'refreshTokenPublicKey',
		);

		if (!decoded) {
			throw new TRPCError({ code: 'FORBIDDEN', message });
		}

		// Check if the user exist
		const user = await prisma.user.findFirst({
			where: { email: ctx.user?.email },
		});

		if (!user) {
			throw new TRPCError({ code: 'FORBIDDEN', message });
		}

		// Sign new access token
		const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
			expiresIn: `${customConfig.accessTokenExpiresIn}m`,
		});

		// Send the access token as cookie
		ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
		ctx.res.cookie('logged_in', true, {
			...accessTokenCookieOptions,
			httpOnly: false,
		});

		// Send response
		return {
			status: 'success',
			access_token,
		};
	} catch (error) {
		serverErrorHandler(error);
	}
};

// Logout handler
const logout = ({ ctx }: { ctx: Context }) => {
	ctx.user = null;
	ctx.res.cookie('access_token', '', { maxAge: -1 });
	ctx.res.cookie('refresh_token', '', { maxAge: -1 });
	ctx.res.cookie('logged_in', '', {
		maxAge: -1,
	});
};
export const logoutHandler = async ({ ctx }: { ctx: Context }) => {
	try {
		logout({ ctx });
		return { status: 'success' };
	} catch (error) {
		serverErrorHandler(error);
	}
};
