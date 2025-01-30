//import itemsEntries from '@/data/weapons';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Component } from '@api/lib/ZodComponent';
import { Item } from '@api/lib/ZodItem';
import { useState } from 'react';
import {
	GiArmorVest,
	GiBullseye,
	GiSwordWound,
	GiTwoCoins,
} from 'rocketicons/gi';
import TitleCount from '../TitleCount';
import ComponentModal from './ComponentModal';
import ItemModal from './ItemModal';

const ItemsSearch = () => {
	const getAllItems = trpc.items.getAll.useQuery();
	const getAllComponents = trpc.components.getAll.useQuery();
	//const createManyItems = trpc.items.createMany.useMutation();
	//const createManyComponents = trpc.components.createMany.useMutation();

	const [selected, setSelected] = useState<Item | Component>();

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

	const openItemModal = (item: Item) => {
		setSelected(item);
		if (selected && 'rangeType' in selected)
			(document.getElementById('item-modal') as HTMLDialogElement).showModal();
		if (selected && 'uses' in selected)
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
					{getAllItems.data && <TitleCount number={getAllItems.data.length} />}
				</h1>
			</div>
			<div className='overflow-x-auto'>
				<table className='table-xs md:table-sm table whitespace-normal'>
					<thead>
						<tr className='font-grenze text-lg dark:text-stone-200'>
							<th>Name</th>
							<th>Type</th>
							<th>Material</th>
							<th>Weight</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody className='text-xs md:text-sm'>
						{getAllItems.data &&
							getAllItems.data.map(i => (
								<tr
									key={i.id}
									className='hover:dark:bg-stone-700'
									onClick={e => {
										e.stopPropagation();
										openItemModal(i);
									}}
								>
									<th
										className={cn('dark:text-stone-200', {
											'dark:text-accent text-accent': i.quality === 'great',
											'text-slate-500 dark:text-slate-500':
												i.quality === 'poor',
											'text-orange-500 dark:text-orange-500':
												i.quality === 'masterpiece',
										})}
									>
										{capitalizeFirstLetter(i.name.join(', '))}
									</th>
									<th>
										{i.itemType === 'weapon' && i.rangeType === 'close' ? (
											<GiSwordWound className='icon-stone-200-sm' />
										) : i.itemType === 'weapon' && i.rangeType !== 'close' ? (
											<GiBullseye className='icon-stone-200-sm' />
										) : i.itemType === 'armor' ? (
											<GiArmorVest className='icon-stone-200-sm' />
										) : (
											''
										)}
									</th>
									<th>
										{i.materialSubType} {i.material}
									</th>
									<th>{i.weight}</th>
									{i.value && (
										<th>
											{Math.floor(i?.value / 100)}{' '}
											<GiTwoCoins className='icon-goldenrod-300 icon-sm' />{' '}
											{i?.value % 100}{' '}
											<GiTwoCoins className='icon-stone-300 icon-sm' />
										</th>
									)}
								</tr>
							))}
					</tbody>
				</table>
				{selected && 'itemType' in selected && <ItemModal item={selected} />}
				{selected && 'componentType' in selected && (
					<ComponentModal item={selected} />
				)}
			</div>
			<div className='flex flex-col gap-1'>
				{getAllComponents.data &&
					getAllComponents.data.map(c => (
						<span key={c.id}>{capitalizeFirstLetter(c.name.join(', '))}</span>
					))}
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
