import { useAuth } from '@/store/authContext';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Creature } from '@api/lib/ZodCreature';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'rocketicons/ri';
import { useDebounce } from 'use-debounce';
import SkeletonList from '../SkeletonList';

const BestiaryView = () => {
	const [items, setItems] = useState<Creature[] | undefined>();
	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);
	const [prunedItems, setPrunedItems] = useState<Creature[]>([]);

	const getAllCreatures = trpc.creatures.getAll.useQuery(undefined, {
		enabled: items === undefined,
	});

	const { user } = useAuth();

	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	const keys = ['name', 'description', 'type', 'alignment', 'subtype'];

	useEffect(() => {
		setItems(getAllCreatures.data);
	}, [getAllCreatures.data]);

	useEffect(() => {
		if (getAllCreatures.isLoading) {
			return console.log('loading data...');
		}
		if (getAllCreatures.data && items !== undefined) {
			const filteredItems = items.filter(item =>
				keys.some(key =>
					item[key as keyof Creature]
						?.toString()
						.toLowerCase()
						.includes(debouncedSearch.toLowerCase()),
				),
			);
			setPrunedItems(filteredItems);
		}
	}, [debouncedSearch, items]);

	var prevScrollpos = window.scrollY;
	window.onscroll = function () {
		var currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById('add-button')?.classList.add('opacity-1');
			document.getElementById('add-button')?.classList.remove('opacity-0');
		} else {
			document.getElementById('add-button')?.classList.add('opacity-0');
			document.getElementById('add-button')?.classList.remove('opacity-1');
		}
		prevScrollpos = currentScrollPos;
	};

	if (getAllCreatures.isLoading) {
		return <SkeletonList />;
	}

	return (
		<div className='mt-sm flex flex-col items-center p-2'>
			<div className='container sticky top-8 z-10 flex flex-col items-center bg-gradient-to-b from-stone-100 from-80% pb-8 dark:from-stone-800'>
				<h1 className='font-grenze sticky z-10 mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					Bestiary
				</h1>
				<input
					onChange={e => setSearch(e.target.value)}
					placeholder='a curious monster...'
					className={cn(
						'b-stone-500 font-grenze mb-4 w-60 rounded-lg border p-1 pl-2 text-center text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
					)}
					type='search'
				/>
				{isEditor && (
					<Link
						id='add-button'
						to={'/bestiary/add'}
						className='badge bg-accent z-20 mb-2 h-10 w-10 border-none shadow-md shadow-stone-900 transition-opacity duration-200'
					>
						<RiAddLine className='icon-white-2xl' />
					</Link>
				)}
			</div>

			{prunedItems.map(m => (
				<Link
					className='w-full'
					key={m.name}
					to={`/bestiary/$id`}
					params={{ id: `${m.name}` }}
				>
					<div className='flex w-full translate-y-8 snap-center flex-col items-center rounded-md p-1 pb-2 text-center opacity-100 transition-all duration-1000 ease-out hover:bg-stone-700'>
						<p
							className={cn(
								'font-noto font-bold tracking-wider text-purple-900 dark:text-purple-400',
							)}
						>
							{m.name}
						</p>
						<span className='font-noto mr-2 text-sm text-stone-500'>
							~ {m.size} {m.alignment} {m.type} ~
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BestiaryView;
