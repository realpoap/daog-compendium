import { useAuth } from '@/store/authContext';
import {
	levelOptions,
	spellOptions,
	targetTypeOptions,
} from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GiDrop, GiFairyWand, GiPolarStar } from 'rocketicons/gi';
import { RiAddLine } from 'rocketicons/ri';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
import SkeletonList from '../SkeletonList';
import SelectFilter, { Option } from './SelectFilter';

type Spell = z.infer<typeof SpellSchema>;

const SpellSearch = () => {
	const [items, setItems] = useState<Spell[]>();
	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);
	const [prunedItems, setPrunedItems] = useState<Spell[]>([]);
	const query = trpc.spells.getAll.useQuery(undefined, {
		enabled: items === undefined,
	});
	const [_latestNumber, setLatestNumber] = useState(0);
	const { user } = useAuth();

	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	const [selectedDomain, setSelectedDomain] = useState<Option[]>([]);
	const [selectedLevel, setSelectedLevel] = useState<Option[]>([]);
	const [selectedTarget, setSelectedTarget] = useState<Option[]>([]);

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
			let filteredSpells: Spell[] = items;

			// if domain selected
			if (selectedDomain.length !== 0) {
				filteredSpells = items.filter(i =>
					selectedDomain.some(a => a.value === i.type),
				);
			}
			// and level selected
			if (selectedLevel.length !== 0) {
				filteredSpells = filteredSpells.filter(i =>
					selectedLevel.some(a => Number(a.value) === Number(i.level)),
				);
			}
			// and target selected
			if (selectedTarget.length !== 0) {
				filteredSpells = filteredSpells.filter(i =>
					selectedTarget.some(a => a.value === i.targetType),
				);
			}

			const filteredItems = filteredSpells.filter(item =>
				keys.some(key =>
					item[key as keyof Spell]
						?.toString()
						.toLowerCase()
						.includes(debouncedSearch.toLowerCase()),
				),
			);
			setPrunedItems(filteredItems);
		}
	}, [debouncedSearch, items, selectedDomain, selectedLevel, selectedTarget]);

	let prevScrollpos = window.scrollY;
	window.onscroll = function () {
		const currentScrollPos = window.scrollY;
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
		return <SkeletonList />;
	}
	//console.log(prunedItems);
	console.log(selectedLevel);

	if (query.data) {
		return (
			<div className='mt-sm flex min-h-[100dvh] flex-col items-center p-2'>
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
					{isEditor && (
						<Link
							id='add-button'
							to={'/spells/add'}
							className='badge bg-accent z-20 mb-2 h-10 w-10 border-none shadow-md shadow-stone-900 transition-opacity duration-200'
						>
							<RiAddLine className='icon-white-2xl' />
						</Link>
					)}
				</div>
				<div className='flex w-full flex-col items-center justify-start md:w-1/2 md:flex-row md:items-start md:justify-center'>
					{/* FILTER FOR MAGIC DOMAINS */}
					<SelectFilter
						value={selectedDomain}
						options={spellOptions}
						onChange={o => setSelectedDomain(o)}
						placeholder='Magic domains'
						isMulti
					/>
					{/* FILTER FOR LVL */}
					<SelectFilter
						value={selectedLevel}
						options={levelOptions}
						onChange={o => setSelectedLevel(o)}
						placeholder='Spell Level'
						isMulti
					/>
					{/* FILTER FOR TARGET */}
					<SelectFilter
						value={selectedTarget}
						options={targetTypeOptions}
						onChange={o => setSelectedTarget(o)}
						placeholder='Spell Target'
						isMulti
					/>
				</div>

				<div className='max-w-screen container z-0 flex snap-y snap-mandatory flex-col items-center justify-start overflow-hidden text-center'>
					{prunedItems.length === 0 && (
						<div className='font-grenze flex flex-col items-center justify-center'>
							<h3 className='text-4xl'>No spell could be found</h3>
							<span className='font-cabin italic'>
								Those arcanes are too deep for your skills or the knowledge you
								search does not exist ...
							</span>
						</div>
					)}
					{prunedItems.map(d => (
						<Link
							className='w-full'
							key={d.number}
							to={`/spells/$id`}
							params={{ id: `${d.number}` }}
						>
							<div className='flex w-full translate-y-8 snap-center flex-col items-center rounded-md p-1 pb-2 text-center opacity-100 transition-all duration-1000 ease-out hover:bg-stone-700'>
								<span className='font-cabin text-sm text-stone-500'>
									#{d.number}
								</span>
								<p
									className={cn(
										'font-cabin text-primary font-bold tracking-wider',
									)}
								>
									{d.titleCommon}
								</p>
								<span className='font-cabinalign-baseline font-regular text-sm capitalize'>
									{d.type}
								</span>
								<ul className='font-cabin font-regular flex w-3/4 list-none flex-row flex-wrap items-center justify-center gap-1 align-middle text-sm md:w-full'>
									<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
										<GiPolarStar className='icon-stone-900 dark:icon-stone-200 icon-sm mr-1' />
										{d?.level}
									</span>

									<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
										<GiDrop className='icon-stone-900 dark:icon-stone-100 icon-sm mr-1' />
										{d.level}
									</span>

									<span className='after:pl-2 after:text-stone-500'>
										<GiFairyWand className='icon-stone-900 dark:icon-stone-200 icon-sm mr-1' />
										{d.difficulty}
									</span>
								</ul>
								<span className='font-cabin text-sm text-stone-500'>
									{'// '} {d?.casting} spell to {d?.action}{' '}
									{d?.targetType !== 'none' && d?.targetType}
									{d?.targetType === 'none'
										? 'noone'
										: d?.targetType === 'self'
											? ''
											: d?.targetType === 'single'
												? ' creature'
												: ' creatures'}
									{' //'}
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
