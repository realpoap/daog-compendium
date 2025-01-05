import { capitalizeFirstLetter } from '@/utils/capitalize';
import { trpc } from '@/utils/trpc';
import { UserSchema } from '@api/lib/zod-prisma';
import { CreateUserInput, LoginUserInput } from '@api/lib/ZodUser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import useNetworkStatus from './useNetworkStatus';

type User = z.infer<typeof UserSchema>;
type UserWithoutPass = Omit<User, 'password'>;

export const useProvideAuth = () => {
	const [user, setUser] = useState<UserWithoutPass | null>(null);
	const [accessToken, setAccessToken] = useState('');
	const [isAuthLoading, setAuthLoading] = useState(false);
	const [logged, setLogged] = useState(false);
	const [authErrors, setAuthErrors] = useState('');
	const { isOnline } = useNetworkStatus();

	const me = trpc.auth.getMe.useQuery(undefined, {
		enabled: user === null && isOnline === true,
	});
	const utils = trpc.useUtils();

	const registerUser = trpc.auth.registerUser.useMutation({
		onSuccess: () => {
			toast.success('User created !');
			setAuthLoading(false);
		},
		onError: error => {
			if (error) {
				setAuthErrors(error?.message);
				console.log(authErrors);
			}
			toast.error('Could not create user...');
			setAuthLoading(false);

			throw new Error(error?.message);
		},
	});

	const loginUser = trpc.auth.login.useMutation({
		onSuccess: data => {
			setAccessToken(data.access_token);
			setLogged(true);
			setAuthLoading(false);
		},
		onError: error => {
			if (error) {
				setAuthErrors(error?.message);
				console.log(authErrors);
			}
			setAccessToken('');
			setUser(null);
			toast.error('Could not log in');
			setAuthLoading(false);
			throw new Error(error?.message);
		},
	});

	const logoutUser = trpc.auth.logout.useMutation({
		onSuccess: () => {
			setUser(null);
			setAccessToken('');
			toast.success('Successfully logged out');
			setAuthLoading(false);
		},
		onError: error => {
			if (error) {
				setAuthErrors(error?.message);
				console.log(authErrors);
			}
			toast.error('Could not log out');
			setAuthLoading(false);
			throw new Error(error?.message);
		},
	});

	useEffect(() => {
		getMe();
	}, [me.data]);

	const getMe = async () => {
		console.log('calling getMe()');
		if (me.data?.user) {
			if (logged && !isAuthLoading && user) {
				if (user.name !== undefined) {
					toast.success(`Welcome back ${capitalizeFirstLetter(user.name)}`);
				}
			} else {
				console.log('calling login with:', user?.name);
				const currentUser = {
					email: me.data.user?.email,
					password: me.data.user?.password,
				};
				await login(currentUser);
			}
			const { password, ...userReceived } = me.data.user;
			setUser(userReceived);
		}
	};

	const logout = () => {
		setAuthErrors('');
		setAuthLoading(true);
		logoutUser.mutate();
	};

	const login = async (input: LoginUserInput) => {
		setAuthErrors('');
		setAuthLoading(true);
		await loginUser.mutateAsync(input);
		utils.auth.getMe.invalidate();
	};

	const register = async (input: CreateUserInput) => {
		setAuthErrors('');
		setAuthLoading(true);
		await registerUser.mutateAsync(input);
		const user = {
			email: input.email,
			password: input.password,
		};
		loginUser.mutate(user);
	};

	return {
		user,
		accessToken,
		authErrors,
		isAuthLoading,
		register,
		login,
		logout,
	};
};
