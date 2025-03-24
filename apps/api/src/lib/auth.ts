import { TRPCError } from '@trpc/server';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secretAccess = process.env.JWT_ACCESS_SECRET!;
const secretRefresh = process.env.JWT_REFRESH_SECRET!;

export const createAccessToken = async (id: string) => {
	try {
		const token = await jwt.sign({ id }, secretAccess, { expiresIn: '15m' });
		return token;
	} catch (error) {
		if (error instanceof Error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: error.message,
			});
		} else {
			// Handle internal server errors
			console.error('Internal Server Error:', JSON.stringify(error, null, 2));

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Malformed payload',
			});
		}
	}
};

export const createRefreshToken = async (id: string) => {
	try {
		const token = await jwt.sign({ id }, secretRefresh, { expiresIn: '1d' });
		return token;
	} catch (error) {
		if (error instanceof Error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: error.message,
			});
		} else {
			// Handle internal server errors
			console.error('Internal Server Error:', JSON.stringify(error, null, 2));

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Malformed payload',
			});
		}
	}
};

export const verifyAccessToken = async (token: string) => {
	try {
		console.log(token);
		const verified = await jwt.verify(token, secretAccess);
		console.info(verified);
		return verified;
	} catch (error) {
		if (error instanceof Error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: error.message,
			});
		} else {
			// Handle internal server errors
			console.error('Internal Server Error:', JSON.stringify(error, null, 2));

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Token has expired',
			});
		}
	}
};
export const verifyRefreshToken = async (token: string) => {
	try {
		console.info(token);
		const verified = await jwt.verify(token, secretRefresh);
		console.info(verified);
		return verified;
	} catch (error) {
		if (error instanceof Error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: error.message,
			});
		} else {
			// Handle internal server errors
			console.error('Internal Server Error:', JSON.stringify(error, null, 2));

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Token has expired',
			});
		}
	}
};
