import { trpc } from "./trpc";

export const checkIfEmailIsValid = async (input) => {
	const exists = trpc.auth.checkEmail.useQuery(input);
	if (exists) return true;
} 