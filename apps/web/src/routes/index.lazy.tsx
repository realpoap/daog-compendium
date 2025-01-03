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
	const { user, isAuthLoading, accessToken } = useAuth();
	console.log(user?.name);
	const spellCount = trpc.spells.getTotal.useQuery();
	const spellLatest = trpc.spells.getLatest.useQuery();
	const creatureCount = trpc.creatures.getTotal.useQuery();
	const creatureLatest = trpc.creatures.getLatest.useQuery();

	if (isAuthLoading) {
		return (
			<div className='mt-8 flex flex-col items-center justify-start'>
				<h1 className='skeleton h-8 w-1/3 py-4 dark:bg-stone-700'></h1>
				<div className='m-4 flex flex-col justify-center gap-4 md:flex-row'>
					<div className='skeleton h-1/3 w-1/3 dark:bg-stone-700'></div>
				</div>
			</div>
		);
	}

	if (user && !isAuthLoading) {
		return (
			<div>
				<h1 className='font-grenze py-4 text-center text-4xl'>
					Welcome {capitalizeFirstLetter(user?.name)} !
				</h1>
				<section className='flex flex-row justify-around gap-4 p-4 md:flex-row'>
					<div className='stats h-5/12 w-full shadow md:h-1/4 md:w-1/4 dark:bg-stone-700'>
						<div className='stat flex flex-col justify-start gap-1 p-4'>
							<div className='stat-title dark:text-purple-200'>Spell count</div>
							<div className='stat-value font-grenze text-primary pb-2 text-4xl md:text-6xl'>
								{spellCount?.data?.number}
							</div>
							<div className='stat-desc flex flex-col dark:text-purple-200'>
								<span>Recently added: </span>
								<span className='font-grenze text-primary text-lg md:text-xl'>
									{spellLatest?.data?.titleCommon}{' '}
								</span>
							</div>
						</div>
					</div>
					<div className='stats h-5/12 w-full shadow md:h-1/4 md:w-1/4 dark:bg-stone-700'>
						<div className='stat flex flex-col justify-start gap-1 p-4'>
							<div className='stat-title dark:text-purple-200'>
								Creature count
							</div>
							<div className='stat-value font-grenze text-primary pb-2 text-4xl md:text-6xl'>
								{creatureCount?.data?.name}
							</div>
							<div className='stat-desc flex flex-col dark:text-purple-200'>
								<span>Recently added: </span>
								<span className='font-grenze text-primary text-lg md:text-xl'>
									{creatureLatest?.data?.name}{' '}
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}

	if (!accessToken) {
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
