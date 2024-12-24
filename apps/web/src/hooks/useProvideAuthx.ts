import { trpc } from "@/utils/trpc";
import { UserSchema } from "@api/lib/zod-prisma";
import { CreateUserInput, LoginUserInput } from "@api/lib/ZodUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

export const useProvideAuth = () => {
	const [user, setUser] = useState< User|null>(null);
	const [accessToken, setAccessToken] = useState('')
	const [isAuthLoading, setAuthLoading] = useState(false);
	const [authErrors, setAuthErrors] = useState('');
	const me = trpc.hello.getMe.useQuery();

	const registerUser = trpc.auth.registerUser.useMutation({
		onSuccess: () => {
			toast.success('User created !');
			setAuthLoading(false)
		},
		onError: (error) => {
			if(error) {
					setAuthErrors(error?.message);
					console.log(authErrors)
				}
			toast.error('Something bad happened...');
			throw new Error(error?.message);
		},
		});

	const loginUser = trpc.auth.login.useMutation({
			onSuccess: (data) => {
				setAccessToken(data.access_token)
				toast.success('Successfully logged in');
				setAuthLoading(false);
			},
			onError: (error) => {
				if(error) {
					setAuthErrors(error?.message);
					console.log(authErrors)
				}
				setAccessToken('')
				setUser(null);
				toast.error('Could not log in');
				throw new Error(error?.message);
			}
		});
	
	const logoutUser = trpc.auth.logout.useMutation({
			onSuccess: () => {
				setUser(null);
				setAccessToken('')
				toast.success('Successfully logged out');
				setAuthLoading(false);
			},
			onError: (error) => {
				if(error) {
					setAuthErrors(error?.message);
					console.log(authErrors)
				}
				toast.error('Could not log out')
				throw new Error(error?.message);

			}
		});
	
	useEffect(()=> {
		setAuthErrors('')
		setAuthLoading(true)
		if(me.isError) {
			setAuthErrors(me.error?.message);
			console.log(authErrors)
			setUser(null);
			setAccessToken('');
			logout()
			toast.error('Could not get current user');
			throw new Error(me.error?.message);
		}
		if(me.data?.data.user && me.isSuccess) {
			setUser(me.data.data.user)
			const currentUser = {
				email: me.data.data.user?.email,
				password: me.data.data.user?.password,
			}
			login(currentUser);
			toast.success(`Welcome back ${user?.name}`);
			setAuthLoading(false)
		}
	},[])
	
	const logout = () => {
		setAuthErrors('')
		setAuthLoading(true)
		logoutUser.mutate();
	}

	const login = (input:LoginUserInput) => {
		setAuthErrors('')
		setAuthLoading(true)
		loginUser.mutate(input)
	}
	
	const register = async (input:CreateUserInput) => {
		setAuthErrors('')
		setAuthLoading(true)
		await registerUser.mutateAsync(input);
		const user = {
				email: input.email,
				password: input.password
			}
		await loginUser.mutate(user);
	}

	return {user, accessToken, authErrors, isAuthLoading, register, login, logout}
}

