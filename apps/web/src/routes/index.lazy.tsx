import { trpc } from '@/utils/trpc';
import { CreateUserInput } from '@api/lib/ZodUser';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const user: CreateUserInput = {
		email: 'user@gmail.com',
		name: 'user',
		password: 'password',
		confirmPassword: 'password',
	};
	const utils = trpc.useUtils();

	const query = trpc.hello.get.useQuery({ name: 'Admin' });
	const secure = trpc.hello.secureAction.useMutation();
	const register = trpc.auth.registerUser.useMutation();
	const login = trpc.auth.login.useMutation({
		onSuccess: () => {
			utils.auth.invalidate();
			utils.hello.invalidate();
		},
	});
	const getMe = trpc.hello.getMe.useQuery();
	const logout = trpc.auth.logout.useMutation({
		onSuccess: () => utils.spells.invalidate(),
	});

	const handleClick = () => {
		console.log('Button clicked !');
		secure.mutate();
	};

	const handleRegister = () => {
		console.log('Registering...');
		register.mutate(user);
	};

	const handleLogin = () => {
		login.mutate({ email: 'user@gmail.com', password: 'password' });
	};

	const handleLogout = () => {
		logout.mutate();
	};

	return (
		<div>
			<p className='text-xl'>
				Message: {query.data?.message}, and server url:{' '}
				{import.meta.env.VITE_API_URL}
			</p>
			<div>
				<button
					onClick={handleClick}
					className='rounded bg-stone-500'
				>
					Test secure route
				</button>
				{secure?.data && <p>{secure.data.data}</p>}
				{secure?.error && (
					<p className='text-red-500'>{secure.error.message}</p>
				)}
			</div>
			<div>
				<button
					onClick={handleRegister}
					className='rounded bg-stone-500'
				>
					Test Register route
				</button>
			</div>
			<div>
				<button
					onClick={handleLogout}
					className='rounded bg-stone-500'
				>
					Test Logout route
				</button>
			</div>
			<div>
				<button
					onClick={handleLogin}
					className='rounded bg-stone-500'
				>
					Test Login route
				</button>
			</div>
			{getMe?.data && <div>{getMe.data.data.user?.name}</div>}
		</div>
	);
}

// function Index() {
// const mutation = trpc.spells.create.useMutation();
// const sendSpell = () => {
// 	spellEntries.map(s => {
// 		console.log(s);
// 		mutation.mutate(s);
// 	});
// };

// 	return (
// 		<div>
// 			{/* <h1>Api test</h1>
// 			<p>{mutation.data?.id}</p>
// 			<button
// 				onClick={sendSpell}
// 				disabled={mutation.isPending}
// 			>
// 				Create Spell
// 			</button>
// 			{mutation.error && <p>Something went wrong! {mutation.error.message}</p>} */}
// 		</div>
// 	);
// }
