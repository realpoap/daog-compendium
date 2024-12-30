import { trpc } from '@/utils/trpc';
import { CreatureComponent } from '@api/lib/ZodComponent';
import { CreatureItem, NewCreature } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Field } from '../../../RHFComponents';
import { ComponentsTags } from '../../utils/ComponentsTags';
import { ItemsTags } from '../../utils/ItemsTag';

const LootStep = ({
	handlePrevious,
	handleNext,
	setValue,
}: {
	handlePrevious: (step: number) => void;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
	setValue: UseFormSetValue<NewCreature>;
}) => {
	const componentsList = trpc.components.getAll.useQuery();
	const itemsList = trpc.items.getAll.useQuery();
	const [components, setComponents] = useState<string[]>([]);
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		if (componentsList.data) {
			const list = componentsList.data;
			let compObjects = [] as CreatureComponent[];
			components?.map(att => {
				const compObject = list.find(el => el.name === att);
				if (compObject) {
					const { id, ...rest } = compObject;
					compObjects.push(rest);
				}
			});
			console.log(compObjects);
			setValue('scavenge', compObjects as CreatureComponent[]);
		}
	}, [components]);

	useEffect(() => {
		if (itemsList.data) {
			const list = itemsList.data;
			let itemObjects = [] as CreatureItem[];
			items?.map(att => {
				const itemObject = list.find(el => el.name === att);
				if (itemObject) {
					const { id, ...rest } = itemObject;
					itemObjects.push(rest);
				}
			});
			console.log(itemObjects);
			setValue('loot', itemObjects as CreatureItem[]);
		}
	}, [items]);

	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='flex w-full flex-col flex-wrap items-center justify-center gap-4 px-[4vw]'>
				<h3 className='font-grenze text-left text-4xl text-purple-400'>
					Equipment
				</h3>
				<div className='font-noto italic text-stone-500'>
					<p>
						Objects and trinkets worn by the creature, either they are used or
						not :
					</p>
					{items.length !== 0 ? (
						<div className='mt-4 h-4 w-full p-2'>
							{items?.map(i => <li>{i}</li>)}
						</div>
					) : (
						<div className='skeleton mt-4 h-4 w-full p-2 dark:bg-stone-700'></div>
					)}
				</div>
				<Field
					name='items'
					label='Search Items'
				>
					{itemsList.data ? (
						<ItemsTags
							setTags={setItems}
							tags={items}
							list={itemsList?.data}
						/>
					) : (
						<div className='skeleton h-10 w-full dark:bg-stone-700'></div>
					)}
				</Field>
				<div className='divider h-1 rounded bg-stone-700'></div>
				<h3 className='font-grenze text-left text-4xl text-purple-400'>
					Scavenge
				</h3>
				<div className='font-noto italic text-stone-500'>
					<p>Components and parts scavenged after the creature is slain :</p>
					{components.length !== 0 ? (
						<div className='mt-4 h-4 w-full p-2'>
							{components?.map(c => <li>{c}</li>)}
						</div>
					) : (
						<div className='skeleton mt-4 h-4 w-full p-2 dark:bg-stone-700'></div>
					)}
				</div>
				<Field
					name='components'
					label='Search Components'
				>
					{componentsList.data ? (
						<ComponentsTags
							setTags={setComponents}
							tags={components}
							list={componentsList?.data}
						/>
					) : (
						<div className='skeleton h-10 w-full dark:bg-stone-700'></div>
					)}
				</Field>
			</div>
			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => handlePrevious(3)}
				>
					&#10094; Prev
				</button>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => handleNext([], 5)}
				>
					Next &#10095;
				</button>
			</div>
		</div>
	);
};

export default LootStep;
