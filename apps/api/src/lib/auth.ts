import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secretAccess = process.env.JWT_ACCESS_SECRET!;
const secretRefresh = process.env.JWT_REFRESH_SECRET!;

export const createAccessToken = async (id:string) => {
	try {
		const token = await jwt.sign({id},secretAccess,{expiresIn:'15m'})
		return token
	} catch (error) {
		throw new Error('Malformed payload')
	}
}

export const createRefreshToken = async (id:string) => {
	try {
		const token = await jwt.sign({id},secretRefresh,{expiresIn:'1d'})
		return token
	} catch (error) {
		throw new Error('Malformed payload')
	}
}

export const verifyAccessToken = async(token:string) => {
	try {
		console.log(token)
		const verified = await jwt.verify(token, secretAccess);
		console.log(verified)
		return verified;
	} catch (error) {
		throw new Error('Token has expired')
	}
}
export const verifyRefreshToken = async(token:string) => {
	try {
		console.log(token)
		const verified = await jwt.verify(token, secretRefresh);
		console.log(verified)
		return verified;
	} catch (error) {
		throw new Error('Token has expired')
	}
}
