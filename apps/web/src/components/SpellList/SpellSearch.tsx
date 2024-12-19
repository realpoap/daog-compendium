import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
	GiBrain,
	GiDrop,
	GiFairyWand,
	GiPolarStar,
	GiRoundStar,
} from 'rocketicons/gi';
import { RiAddLine } from 'rocketicons/ri';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

type Spell = z.infer<typeof SpellSchema>;

const SpellSearch = () => {
	const [items, setItems] = useState<Spell[]>();
	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);
	const [prunedItems, setPrunedItems] = useState<Spell[]>([]);
	const query = trpc.spells.getAll.useQuery(undefined, {
		enabled: items === undefined,
	});
	const [latestNumber, setLatestNumber] = useState(0);

	const keys = [
		'titleCommon',
		'titleGlaise',
		'type',
		'description',
		'component',
		'effects',
		'targetType',
		'casting',
		'flavor',
	];

	useEffect(() => {
		setItems(query.data);
	}, [query.data]);

	useEffect(() => {
		if (query.isLoading) {
			return console.log('loading data...');
		}

		if (query.data && items !== undefined) {
			setLatestNumber(Math.max(...items.map(i => i.number)));

			const filteredItems = items.filter(item =>
				keys.some(key =>
					item[key as keyof Spell]
						?.toString()
						.toLowerCase()
						.includes(debouncedSearch.toLowerCase()),
				),
			);
			setPrunedItems(filteredItems);
		}
	}, [debouncedSearch, items]);

	console.log(latestNumber);

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

	if (query.isLoading) {
		return (
			<div className='flex h-screen flex-row items-center justify-center'>
				<p className='font-grenze text-lg'>Fetching amazing spells</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	//console.log(prunedItems);

	if (query.data) {
		return (
			<div className='mt-sm flex flex-col items-center p-2'>
				<div className='container sticky top-10 z-10 flex min-h-[20dvh] flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
					<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
						Spells
					</h1>
					<input
						onChange={e => setSearch(e.target.value)}
						placeholder='some strange wizardry...'
						className={cn(
							'b-stone-500 font-grenze mb-4 w-60 rounded-lg border p-1 pl-2 text-center text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
						)}
						type='search'
					/>
					<Link
						id='add-button'
						to={'/spells/add'}
						className='badge bg-accent z-20 mb-2 h-10 w-10 border-none shadow-md shadow-stone-900 transition-opacity duration-200'
					>
						<RiAddLine className='icon-white-2xl' />
					</Link>
				</div>

				<div className='max-w-screen container z-0 flex snap-y snap-mandatory flex-col items-center justify-start gap-8 overflow-hidden text-center'>
					{prunedItems.map(d => (
						<Link
							className='w-full'
							key={d.number}
							to={`/spells/$id`}
							params={{ id: `${d.number}` }}
						>
							<div className='flex w-full translate-y-8 snap-center flex-col items-center rounded-md p-1 pb-2 text-center opacity-100 transition-all duration-1000 ease-out hover:bg-stone-700'>
								<span className='font-noto mr-2 text-sm text-stone-500'>
									~ {d.number} ~
								</span>
								<p
									className={cn(
										'font-noto font-bold tracking-wider text-purple-900 dark:text-purple-400',
									)}
								>
									{d.titleCommon}
								</p>
								<span className='font-noto mr-1 align-baseline text-sm font-semibold capitalize'>
									{d.type}
								</span>
								<div className='font-noto flex w-48 flex-row items-baseline justify-center align-baseline dark:text-stone-200'>
									<span className='font-noto align-baseline text-sm font-semibold'>
										<GiPolarStar className='icon-stone-900 dark:icon-stone-100 icon-md mr-1' />
										{d?.level}
									</span>
									<span className='mx-2 align-baseline text-sm font-semibold'>
										|
									</span>
									<span className='font-noto align-baseline text-sm font-semibold'>
										<GiDrop className='icon-stone-900 dark:icon-stone-100 icon-sm' />
										{d.level}
									</span>
									<span className='mx-2 align-baseline text-sm font-semibold'>
										|
									</span>
									<span className='font-noto align-baseline text-sm font-semibold'>
										<GiFairyWand className='icon-stone-900 dark:icon-stone-100 icon-sm mr-1' />
										{d.difficulty}
									</span>
								</div>
								<span className='font-noto mt-1 align-baseline text-xs font-light italic dark:text-stone-400'>
									// {d?.casting} spell to {d?.action}{' '}
									{d?.targetType !== 'none' && d?.targetType}
									{d?.targetType === 'none'
										? 'noone'
										: d?.targetType === 'self'
											? ''
											: d?.targetType === 'single'
												? ' creature'
												: ' creatures'}{' '}
									//
								</span>
								<div
									className={cn(
										'font-noto mt-1 line-clamp-2 max-w-72 text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl md:text-ellipsis dark:text-stone-400',
									)}
								>
									{d.flavor}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	}
};

export default SpellSearch;
