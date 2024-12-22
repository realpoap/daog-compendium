import customConfig from '@api/config/default';
import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import { UserSchema } from '../zod-prisma';
dotenv.config({ path: '/apps/api/.env' });

type User = z.infer<typeof UserSchema>

const accessSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  console.warn('in sign jwt')
  const privateKey = Buffer.from(customConfig[key], 'base64').toString();
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(customConfig[key], 'base64').toString();
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Sign Token util
export const signToken = async (user:User) => {
  const userId = user.id.toString();
  // // Sign the access token
  // const access_token = signJwt({ sub: userId }, 'accessTokenPrivateKey', {
  //   expiresIn: `${customConfig.accessTokenExpiresIn}m`,
  // });

  // // Sign the refresh token
  // const refresh_token = signJwt({ sub: userId }, 'refreshTokenPrivateKey', {
  //   expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
  // });

        const access_token = jwt.sign({
            sub: userId
        }, accessSecret, {
            expiresIn: 60*60
        });

        const refresh_token = jwt.sign({
            sub: userId
        }, refreshSecret, { expiresIn: '1d' });

  // Return access token
  return { access_token, refresh_token };
};
