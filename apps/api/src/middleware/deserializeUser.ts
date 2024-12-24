import { prisma } from '@api/index';
import { TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const accessSecret = process.env.ACCESS_TOKEN_SECRET as string

export const deserializeUser = async ({
  req, res}: trpcExpress.CreateExpressContextOptions) => {
  try {
    // Get the token
    let access_token;
    console.log('cookies', req.cookies)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    const notAuthenticated = {
        req,
        res,
        user: null,
    };

    if (!access_token) {
      console.log('did not find access token')
      return notAuthenticated;
    }

    // Validate Access Token
    const decoded = jwt.verify(
      access_token,
      accessSecret
    );
    
    if (!decoded) {
      console.log('did not decode')
      return notAuthenticated;
    }
    const decodedId = decoded.sub as string

    // Check if user still exist
    const user = await prisma.user.findFirst({
			where: {id: decodedId}
		});

    if (!user) {
      console.log('did not find user')
      return notAuthenticated;
    }

    return {
        req,
        res,
        user: { ...user, id: user.id.toString() },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};