import dotenv from 'dotenv';

dotenv.config({ path: '/apps/api/.env' });

const customConfig: {
	accessTokenExpiresIn: number;
	refreshTokenExpiresIn: number;
	accessTokenPrivateKey: string;
	accessTokenPublicKey: string;
	refreshTokenPrivateKey: string;
	refreshTokenPublicKey: string;
} = {
	accessTokenExpiresIn: 60,
	refreshTokenExpiresIn: 60 * 24,
	accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
	accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
	refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
	refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

export default customConfig;
