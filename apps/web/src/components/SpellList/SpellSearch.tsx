import { useAuth } from '@/store/authContext';
import {
	levelOptions,
	spellOptions,
	targetTypeOptions,
} from '@/types/spellOptions';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'rocketicons/ri';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
import Collapsible from '../Collapsible';
import SkeletonList from '../SkeletonList';
import TitleCount from '../TitleCount';
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

	if (query.isLoading) {
		return <SkeletonList />;
	}
	//console.log(prunedItems);
	console.log(selectedLevel);

	if (query.data) {
		return (
			<div className='mt-sm flex min-h-[100dvh] flex-col items-center p-2'>
				<div className='dark:from-background container sticky top-10 z-10 flex min-h-[25dvh] flex-col items-center bg-gradient-to-b from-stone-100 from-80%'>
					<h1 className='font-grenze dark:text-primary sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8'>
						Spells
						{query.data && <TitleCount number={query.data.length} />}
					</h1>
					<input
						onChange={e => setSearch(e.target.value)}
						placeholder='some strange wizardry...'
						className={cn(
							'font-grenze dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:bg-tile placeholder:text-neutral-content rounded-lg border border-none p-1 pl-2 text-center text-lg shadow-sm placeholder:italic focus:outline-none focus:ring-1 md:w-1/2',
						)}
						type='search'
					/>
					<Collapsible title='filter results'>
						<div className='flex w-full flex-col items-center justify-start md:flex-row md:items-start md:justify-center'>
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
					</Collapsible>

					{isEditor && (
						<Link
							id='add-button'
							to={'/spells/add'}
							className='badge bg-accent fixed bottom-4 z-20 my-2 h-10 w-10 border-none text-stone-900 shadow-md shadow-stone-900 transition-opacity duration-200'
						>
							<RiAddLine className='icon-stone-900-2xl' />
						</Link>
					)}
				</div>

				<div className='z-0 flex w-full snap-y snap-mandatory flex-col items-center justify-start gap-1 overflow-hidden px-4 text-center'>
					{prunedItems.length === 0 && (
						<div className='font-grenze flex flex-col items-center justify-center'>
							<h3 className='text-4xl'>No spell found</h3>
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
							<div className='font-cabin hover:bg-card group flex w-full translate-y-8 snap-center flex-col items-center rounded-lg p-1 pb-2 text-center opacity-100 transition-all duration-500 ease-out hover:shadow-sm'>
								<div>
									<span className='font-cabin text-xs text-stone-500 transition-colors duration-500 after:px-2 after:content-["-"] group-hover:text-stone-200 md:text-sm'>
										#{d.number}
									</span>
									<span className='font-cabin font-regular align-baseline text-sm capitalize text-stone-500 transition-colors duration-500 group-hover:text-stone-200'>
										{capitalizeFirstLetter(d.type)}
									</span>
								</div>
								<p
									className={cn(
										'font-cabin text-primary font-bold tracking-wider',
									)}
								>
									{d.titleCommon}
								</p>

								{/* <ul className='font-cabin font-regular flex w-3/4 list-none flex-row flex-wrap items-center justify-center gap-1 align-middle text-sm md:w-full'>
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
								</ul> */}
								<span className='font-cabin text-sm italic text-stone-500 transition-colors duration-500 group-hover:text-stone-200'>
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
								{/* <div
									className={cn(
										'font-noto text-card mt-1 line-clamp-2 max-w-72 text-sm italic md:line-clamp-none md:max-w-xl md:text-ellipsis dark:text-stone-400',
									)}
								>
									{d.flavor}
								</div> */}
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	}
};

export default SpellSearch;
