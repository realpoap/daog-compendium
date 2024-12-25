import LoginForm from '@/components/User/LoginForm';
import RegisterForm from '@/components/User/RegisterForm';
import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { trpc } from '@/utils/trpc';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const { user, isAuthLoading } = useAuth();
	console.log(user?.name);
	const spellCount = trpc.spells.getTotal.useQuery();
	const spellLatest = trpc.spells.getLatest.useQuery();

	if (isAuthLoading) {
		return (
			<div className='flex h-screen flex-row items-center justify-center'>
				<p className='font-grenze text-lg'>Loading components</p>
				<span className='loading loading-dots loading-sm ml-1'></span>
			</div>
		);
	}

	if (!user?.name) {
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
			<h1 className='font-grenze py-4 text-center text-4xl'>
				Welcome {capitalizeFirstLetter(user?.name)} !
			</h1>
			<section className='flex flex-col justify-center gap-4 md:flex-row'>
				<div className='stats shadow dark:bg-stone-700'>
					<div className='stat flex flex-col justify-center gap-1'>
						<div className='stat-title dark:text-purple-200'>Spell count</div>
						<div className='stat-value font-grenze pb-2 text-6xl text-purple-500'>
							{spellCount?.data?.number}
						</div>
						<div className='stat-desc flex flex-col dark:text-purple-200'>
							<span>Recently added: </span>
							<span className='font-grenze text-xl text-purple-500'>
								{spellLatest?.data?.titleCommon}{' '}
							</span>
						</div>
					</div>
				</div>
			</section>
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
