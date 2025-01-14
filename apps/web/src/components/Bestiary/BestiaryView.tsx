import { useAuth } from '@/store/authContext';
import {
	creatureHabitatOptions,
	creatureTypeOptions,
} from '@/types/creatureOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { HabitatTypeType } from '@api/lib/zod-prisma';
import { Creature } from '@api/lib/ZodCreature';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
	GiCheckedShield,
	GiRoundStar,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';
import { RiAddLine } from 'rocketicons/ri';
import { useDebounce } from 'use-debounce';
import Collapsible from '../Collapsible';
import SkeletonList from '../SkeletonList';
import SelectFilter, { Option } from '../SpellList/SelectFilter';
import TitleCount from '../TitleCount';

const BestiaryView = () => {
	const [items, setItems] = useState<Creature[] | undefined>();
	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);
	const [prunedItems, setPrunedItems] = useState<Creature[]>([]);

	const [rangeLevel, setRangeLevel] = useState({
		min: 0,
		max: 100,
	});
	const [selectedHabitat, setSelectedHabitat] = useState<Option[]>([]);
	const [selectedType, setSelectedType] = useState<Option[]>([]);
	const [selectedMaxLevel, setSelectedMaxLevel] = useState<number>();
	const [selectedLegendary, setSelectedLegendary] = useState<boolean>(true);
	const [selectedMundane, setSelectedMundane] = useState<boolean>(true);

	const getAllCreatures = trpc.creatures.getAll.useQuery(undefined, {
		enabled: items === undefined,
	});

	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	const keys = [
		'name',
		'description',
		'type',
		'alignment',
		'subtype',
		'habitat',
	];

	useEffect(() => {
		if (!getAllCreatures.data) return;
		setItems(getAllCreatures.data);
		const maxLevel = Number(
			Math.max(...getAllCreatures.data.map(o => o.level)),
		);
		setRangeLevel({
			min: 0,
			max: Math.ceil(maxLevel / 5) * 5,
		});
		setSelectedMaxLevel(rangeLevel.max);
	}, [getAllCreatures.data]);

	useEffect(() => {
		if (getAllCreatures.isLoading) {
			return console.log('loading data...');
		}
		if (getAllCreatures.data && items !== undefined) {
			let filteredCreatures: Creature[] = items;

			// if domain selected
			if (selectedHabitat.length !== 0) {
				filteredCreatures = filteredCreatures.filter(i =>
					selectedHabitat.some(a =>
						i.habitat.includes(a.value as HabitatTypeType),
					),
				);
			}

			// if type selected
			if (selectedType.length !== 0) {
				filteredCreatures = filteredCreatures.filter(i =>
					selectedType.some(a => i.type === a.value),
				);
			}

			if (selectedMaxLevel !== undefined && selectedMaxLevel !== 0) {
				filteredCreatures = filteredCreatures.filter(
					i => i.level <= selectedMaxLevel,
				);
			}

			if (!selectedLegendary) {
				filteredCreatures = filteredCreatures.filter(i => i.isBoss === false);
			}

			if (!selectedMundane) {
				filteredCreatures = filteredCreatures.filter(i => i.isBoss === true);
			}

			const filteredItems = filteredCreatures.filter(item =>
				keys.some(key =>
					item[key as keyof Creature]
						?.toString()
						.toLowerCase()
						.includes(debouncedSearch.toLowerCase()),
				),
			);
			setPrunedItems(filteredItems);
		}
	}, [
		debouncedSearch,
		items,
		selectedHabitat,
		selectedMaxLevel,
		selectedType,
		selectedLegendary,
		selectedMundane,
	]);

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

	if (getAllCreatures.isLoading) {
		return <SkeletonList />;
	}

	return (
		<div className='mt-sm flex h-[100dvh] flex-col items-center p-2'>
			<div className='container sticky top-8 z-10 flex flex-col items-center bg-gradient-to-b from-stone-100 from-80% pb-8 dark:from-stone-800'>
				<h1 className='font-grenze dark:text-primary text-secondary sticky z-10 mx-auto my-4 text-center text-6xl font-bold tracking-wide md:mt-8'>
					Bestiary
					{getAllCreatures.data && (
						<TitleCount number={getAllCreatures.data.length} />
					)}
				</h1>
				<input
					onChange={e => setSearch(e.target.value)}
					placeholder='a curious monster...'
					className={cn(
						'font-grenze dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-secondary caret-secondary focus:border-secondary focus:ring-secondary mb-4 w-60 rounded-lg border border-none p-1 pl-2 text-center text-lg shadow-sm placeholder:italic placeholder:text-stone-500 focus:outline-none focus:ring-1 dark:bg-stone-700',
					)}
					type='search'
				/>

				<Collapsible title='filter results'>
					<div className='flex w-full flex-col items-center justify-start gap-1 md:flex-row md:items-start md:justify-center'>
						{/* FILTER FOR HABITATS */}
						<SelectFilter
							value={selectedHabitat}
							options={creatureHabitatOptions}
							onChange={o => setSelectedHabitat(o)}
							placeholder='Habitats'
							isMulti
						/>
						{/* FILTER FOR TYPES */}
						<SelectFilter
							value={selectedType}
							options={creatureTypeOptions}
							onChange={o => setSelectedType(o)}
							placeholder='Types'
							isMulti
						/>
					</div>
					<div className='flex flex-row gap-4'>
						<label className='font-grenze mb-4 flex w-4/5 flex-row items-center justify-center gap-2 px-4 text-center text-stone-500 md:w-1/2'>
							<input
								type='checkbox'
								defaultChecked
								className='checkbox checkbox-xs checkbox-primary'
								checked={selectedMundane}
								onChange={() => setSelectedMundane(prev => !prev)}
							/>
							<span>Mundane</span>
						</label>
						<label className='font-grenze mb-4 flex w-4/5 flex-row items-center justify-center gap-2 px-4 text-center text-stone-500 md:w-1/2'>
							<input
								type='checkbox'
								defaultChecked
								className='checkbox checkbox-xs checkbox-primary'
								checked={selectedLegendary}
								onChange={() => setSelectedLegendary(prev => !prev)}
							/>
							<span>Legendary</span>
						</label>
					</div>
					<div className='mb-4 flex w-3/5 flex-col items-center justify-start gap-1 md:justify-center'>
						<label className='font-grenze text-cemter w-full px-4 text-stone-500'>
							<div className='flex flex-row justify-between'>
								<span>Max Level</span>
								<span className='text-primary font-cabin text-sm'>
									{selectedMaxLevel}
								</span>
							</div>
							<input
								type='range'
								min={rangeLevel.min}
								max={rangeLevel.max}
								value={selectedMaxLevel}
								defaultValue={rangeLevel.max}
								step='5'
								onChange={e => setSelectedMaxLevel(Number(e.target.value))}
								className='range range-primary rounded-xs h-2'
							/>
						</label>
					</div>
				</Collapsible>

				{isEditor && (
					<Link
						id='add-button'
						to={'/bestiary/add'}
						className='badge bg-accent z-20 my-2 h-10 w-10 border-none shadow-md shadow-stone-900 transition-opacity duration-200'
					>
						<RiAddLine className='icon-white-2xl' />
					</Link>
				)}
			</div>
			{prunedItems.length === 0 && (
				<div className='font-grenze flex flex-col items-center justify-center'>
					<h3 className='text-4xl'>No creature could be found</h3>
					<span className='font-cabin italic'>
						These lands are barren or your prey too sneaky ...
					</span>
				</div>
			)}
			{prunedItems.map(m => (
				<Link
					className='w-full'
					key={m.id}
					to={`/bestiary/$id`}
					params={{ id: `${m.id}` }}
				>
					<div className='flex w-full translate-y-8 snap-center flex-col items-center rounded-md p-1 pb-2 text-center opacity-100 transition-all duration-1000 ease-out hover:bg-stone-700'>
						<span className='font-cabin pt-1 align-baseline text-sm text-stone-500'>
							<GiRoundStar className='icon-stone-500 size-4 pb-1 pr-1' />
							{m.level}
						</span>
						<p
							className={cn('font-noto text-primary font-bold tracking-wider')}
						>
							{m.name}
						</p>
						<ul className='font-cabin font-regular flex w-3/4 list-none flex-row flex-wrap items-center justify-center gap-1 align-middle text-sm md:w-full'>
							<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
								<GiThunderSkull className='icon-stone-900 dark:icon-stone-200 mr-1 size-[1.1rem]' />
								{m?.initiative || '~'}
							</span>
							<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
								<GiSwordWound className='icon-stone-900 dark:icon-stone-200 icon-sm mr-1' />
								{m?.attack || '~'}
							</span>
							<span className='after:text-stone-500'>
								<GiCheckedShield className='icon-stone-900 dark:icon-stone-200 mr-1 size-[0.9rem] align-middle' />
								{m?.defense || '~'}
							</span>
						</ul>
						<span className='font-cabin text-sm text-stone-500'>
							{'// '} {m.size} {m.alignment} {m.type} {' //'}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BestiaryView;
