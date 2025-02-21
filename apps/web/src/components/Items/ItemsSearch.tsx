//import itemsEntries from '@/data/weapons';
import {
	itemMaterialOptions,
	itemRarityOptions,
	itemTypeOptions,
} from '@/types/itemOptions';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Component } from '@api/lib/ZodComponent';
import { Item } from '@api/lib/ZodItem';
import { useEffect, useState } from 'react';
import { GiTwoCoins } from 'rocketicons/gi';
import { useDebounce } from 'use-debounce';
import Collapsible from '../Collapsible';
import SelectFilter, { Option } from '../SpellList/SelectFilter';
import TitleCount from '../TitleCount';
import ComponentModal from './ComponentModal';
import ItemModal from './ItemModal';

const ItemsSearch = () => {
	const getAllItems = trpc.items.getAll.useQuery();
	const getAllComponents = trpc.components.getAll.useQuery();
	//const createManyItems = trpc.items.createMany.useMutation();
	//const createManyComponents = trpc.components.createMany.useMutation();

	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search, 500);

	const [selected, setSelected] = useState<Item | Component>();
	const [combinedItems, setCombinedItems] = useState<Array<Item | Component>>(
		[],
	);
	const [prunedItems, setPrunedItems] = useState<Array<Item | Component>>([]);

	const [selectedMaterial, setSelectedMaterial] = useState<Option[]>([]);
	const [selectedRarity, setSelectedRarity] = useState<Option[]>([]);
	const [selectedType, setSelectedType] = useState<Option[]>([]);

	useEffect(() => {
		if (getAllItems.data && getAllComponents.data)
			setCombinedItems([...getAllItems.data, ...getAllComponents.data]);
	}, [getAllItems.data, getAllComponents.data]);

	useEffect(() => {
		let filteredItems = combinedItems;

		// if domain selected
		if (selectedMaterial.length !== 0) {
			filteredItems = combinedItems.filter(i =>
				selectedMaterial.some(a => {
					if ('materialType' in i) {
						return a.value === i.materialType;
					}
				}),
			);
		}
		// // and level selected
		// if (selectedLevel.length !== 0) {
		// 	filteredSpells = filteredSpells.filter(i =>
		// 		selectedLevel.some(a => Number(a.value) === Number(i.level)),
		// 	);
		// }
		// // and target selected
		// if (selectedTarget.length !== 0) {
		// 	filteredSpells = filteredSpells.filter(i =>
		// 		selectedTarget.some(a => a.value === i.targetType),
		// 	);
		// }
		const filtered = filteredItems.filter(item =>
			item.searchName
				.toString()
				.toLowerCase()
				.includes(debouncedSearch.toLowerCase()),
		);
		setPrunedItems(filtered);
	}, [
		debouncedSearch,
		combinedItems,
		selectedMaterial,
		selectedRarity,
		selectedType,
	]);

	// const sendItems = () => {
	// 	itemsEntries.map(i => {
	// 		console.log(i);
	// 		createManyItems.mutate(i);
	// 	});
	// };

	// const sendComponents = () => {
	// 	componentsEntries.map(c => {
	// 		console.log(c);
	// 		createManyComponents.mutate(c);
	// 	});
	// };

	const openItemModal = (item: Item | Component) => {
		setSelected(item);
		if (selected && 'itemType' in selected)
			(document.getElementById('item-modal') as HTMLDialogElement).showModal();
		if (selected && 'componentType' in selected)
			(
				document.getElementById('component-modal') as HTMLDialogElement
			).showModal();
	};

	if (!getAllItems.data) return <div>Loading</div>;
	if (!getAllComponents.data) return <div>Loading</div>;

	return (
		<div className='flex flex-col items-center'>
			<div className='container sticky top-10 z-10 flex min-h-[20dvh] flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					Items
					{prunedItems && <TitleCount number={prunedItems.length} />}
				</h1>
				<input
					onChange={e => setSearch(e.target.value)}
					placeholder='a curious trinket...'
					className={cn(
						'font-grenze dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary mb-4 w-60 rounded-lg border border-none p-1 pl-2 text-center text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic placeholder:text-stone-500 focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700',
					)}
					type='search'
				/>
				<Collapsible title='filter results'>
					<div className='flex w-full flex-col items-center justify-start md:flex-row md:items-start md:justify-center'>
						{/* FILTER FOR MATERIAL */}
						<SelectFilter
							value={selectedMaterial}
							options={itemMaterialOptions}
							onChange={o => setSelectedMaterial(o)}
							placeholder='Material'
							isMulti
						/>
						{/* FILTER FOR RARITY */}
						<SelectFilter
							value={selectedRarity}
							options={itemRarityOptions}
							onChange={o => setSelectedRarity(o)}
							placeholder='Rarity'
							isMulti
						/>
						{/* FILTER FOR TYPE */}
						<SelectFilter
							value={selectedType}
							options={itemTypeOptions}
							onChange={o => setSelectedType(o)}
							placeholder='Item type'
							isMulti
						/>
					</div>
				</Collapsible>
			</div>
			<div className='overflow-x-auto'>
				<table className='table-xs md:table-sm table whitespace-normal'>
					<thead>
						<tr className='font-grenze text-lg dark:text-stone-200'>
							<th>Name</th>
							<th className='text-center'>Type</th>
							<th className='text-center'>Weight</th>
							<th className='text-center'>Cost</th>
						</tr>
					</thead>
					<tbody className='text-xs md:text-sm'>
						{prunedItems &&
							prunedItems.map(i => (
								<tr
									key={i.id}
									className='cursor-pointer hover:dark:bg-stone-700'
									onClick={e => {
										e.stopPropagation();
										openItemModal(i);
									}}
								>
									<th
										className={cn('dark:text-stone-200', {
											'dark:text-accent text-accent':
												('quality' in i && i.quality === 'great') ||
												('rarity' in i && i.rarity === 'rare'),
											'text-slate-500 dark:text-slate-500':
												('quality' in i && i.quality === 'poor') ||
												('rarity' in i && i.rarity === 'common'),
											'text-orange-500 dark:text-orange-500':
												('quality' in i && i.quality === 'masterpiece') ||
												('rarity' in i && i.rarity === 'fabled'),
										})}
									>
										{capitalizeFirstLetter(i.name.join(', '))}
									</th>
									{'itemType' in i && (
										<th className='text-center'>{i.itemType}</th>
									)}
									{'componentType' in i && (
										<th className='text-center'>{i.componentType}</th>
									)}
									{i.weight ? (
										<th className='text-center'>{i.weight}</th>
									) : (
										<th></th>
									)}
									{i.value !== 0 && i.value !== null && (
										<th className='flex flex-row justify-center gap-1'>
											{Math.floor(i?.value / 100) !== 0 && i.value !== 0 && (
												<span>
													{Math.floor(i?.value / 100)}
													<GiTwoCoins className='icon-goldenrod-300 icon-sm' />
												</span>
											)}
											{i?.value % 100 !== 0 && i.value !== 0 && (
												<span>
													{i?.value % 100}
													<GiTwoCoins className='icon-stone-300 icon-sm' />
												</span>
											)}
										</th>
									)}
									{!i.value && i.valueWeight && i.valueWeight !== 0 && (
										<th className='flex flex-row justify-center gap-1'>
											{Math.floor(i?.valueWeight / 100) !== 0 && (
												<span>
													{Math.floor(i?.valueWeight / 100)}
													<GiTwoCoins className='icon-goldenrod-300 icon-sm' />
												</span>
											)}
											{i?.valueWeight % 100 !== 0 && (
												<span>
													{i?.valueWeight % 100}
													<GiTwoCoins className='icon-stone-300 icon-sm' />
												</span>
											)}
										</th>
									)}
									{!i.value && !i.valueWeight && <th></th>}
								</tr>
							))}
					</tbody>
				</table>
				{selected && 'itemType' in selected && <ItemModal item={selected} />}
				{selected && 'componentType' in selected && (
					<ComponentModal item={selected} />
				)}
			</div>

			{/* <div className='hidden'>
				<button
					onClick={sendItems}
					disabled={createManyItems.isPending}
					className='btn btn-sm m-8'
				>
					Import Items
				</button>
				{createManyItems.error && (
					<p>Something went wrong! {createManyItems.error.message}</p>
				)}
			</div> */}
			{/* <div className='hidden'>
				<button
					onClick={sendComponents}
					disabled={createManyComponents.isPending}
					className='btn btn-sm m-8'
				>
					Import Components
				</button>
				{createManyComponents.error && (
					<p>Something went wrong! {createManyComponents.error.message}</p>
				)}
			</div> */}
		</div>
	);
};

export default ItemsSearch;
