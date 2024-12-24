import LoginForm from '@/components/User/LoginForm';
import RegisterForm from '@/components/User/RegisterForm';
import { useAuth } from '@/store/authContext';
import { trpc } from '@/utils/trpc';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const utils = trpc.useUtils();
	const { user } = useAuth();

	if (!user) {
		return (
			<div className='width-full font-noto flex max-h-fit flex-col items-center justify-center gap-8 md:flex-row'>
				{/* Register ------------------------------------ */}
				<div className='flex w-full flex-col items-center justify-center'>
					<div
						className='collapse rounded'
						tabIndex={0}
					>
						<input
							type='radio'
							className='peer min-h-2'
							name='login-register'
						/>
						<div className='collapse-title font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
							<h3>Sign In</h3>
						</div>
						<div className='collapse-content peer-checked:collapse-open'>
							<RegisterForm />
						</div>
					</div>
				</div>

				{/* DIVIDER ------------------------------------ */}
				<div className='flex w-full flex-row items-center justify-center gap-4 text-stone-500 md:mt-4 md:w-4 md:flex-col md:gap-4'>
					<div className='h-1 w-1/3 rounded bg-stone-700 md:h-[40dvh] md:w-1'></div>
					<p>or</p>
					<div className='h-1 w-1/3 rounded bg-stone-700 md:h-[40dvh] md:w-1'></div>
				</div>

				{/* Login ------------------------------------ */}
				<div className='flex w-full flex-col items-center justify-start'>
					<div
						className='collapse rounded'
						tabIndex={0}
					>
						<input
							type='radio'
							className='peer min-h-2'
							name='login-register'
						/>
						<div className='collapse-title font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
							<h3>Login</h3>
						</div>
						<div className='collapse-content peer-checked:collapse-open'>
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<p className='font-grenze text-center text-xl'>Welcome {user?.name} !</p>
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
