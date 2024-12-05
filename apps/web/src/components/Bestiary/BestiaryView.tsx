import { cn } from '@/utils/classNames';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { default as monsters } from '../../data/5e-SRD-Monsters.json';

import { MonsterEntry } from '@/types/MonsterEntry';

// type MonsterEntry = {
// 	name: string;
// 	size: string;
// 	type: string;
// 	subtype: string;
// 	alignment: string;
// 	armor_class: number;
// 	hit_points: number;
// 	hit_dice: string;
// 	speed: string;
// 	strength: number | undefined;
// 	dexterity: number | undefined;
// 	constitution: number | undefined;
// 	intelligence: number | undefined;
// 	wisdom: number | undefined;
// 	charisma: number | undefined;
// 	constitution_save?: number | undefined;
// 	intelligence_save?: number | undefined;
// 	wisdom_save?: number | undefined;
// 	medicine?: number | undefined;
// 	history?: number | undefined;
// 	religion?: number | undefined;
// 	perception?: number | undefined;
// 	damage_vulnerabilities: string;
// 	damage_resistances: string;
// 	damage_immunities: string;
// 	condition_immunities: string;
// 	senses: string;
// 	languages: string;
// 	challenge_rating: string;
// 	special_abilities: object[];
// 	actions: object[];
// 	legendary_actions: object[];
// 	description?: string;
// };

const BestiaryView = () => {
	const [items, setItems] = useState<MonsterEntry[]>(monsters);
	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);
	const [prunedItems, setPrunedItems] = useState<MonsterEntry[]>([]);

	const keys = ['name', 'description', 'type', 'alignment', 'subtype'];

	useEffect(() => {
		const filteredItems = items.filter(item =>
			keys.some(key =>
				item[key as keyof MonsterEntry]
					?.toString()
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase()),
			),
		);
		setPrunedItems(filteredItems);
	}, [debouncedSearch, items]);

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
							~ {m.size} {m.type} ~
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BestiaryView;
