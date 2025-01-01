import { ActionButton } from '@/components/Buttons';
import { trpc } from '@/utils/trpc';
import { CreatureComponent } from '@api/lib/ZodComponent';
import { NewCreature } from '@api/lib/ZodCreature';
import { CreatureItem } from '@api/lib/ZodItem';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'rocketicons/ri';
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
			const compObjects = [] as CreatureComponent[];
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
			const itemObjects = [] as CreatureItem[];
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
							{items?.map(i => <li key={i}>{i}</li>)}
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
				<div className='divider h-1 rounded bg-stone-700 shadow'></div>
				<h3 className='font-grenze text-left text-4xl text-purple-400'>
					Scavenge
				</h3>
				<div className='font-noto italic text-stone-500'>
					<p>Components and parts scavenged after the creature is slain :</p>
					{components.length !== 0 ? (
						<div className='mt-4 h-4 w-full p-2'>
							{components?.map(c => <li key={c}>{c}</li>)}
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
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handlePrevious(3)}
				>
					<span className='align-base pr-4'>
						<RiArrowDropLeftLine className='icon-stone-800-base' /> Prev
					</span>
				</ActionButton>
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handleNext([], 5)}
				>
					<span className='pl-4 align-middle'>
						Next <RiArrowDropRightLine className='icon-stone-800-base' />
					</span>
				</ActionButton>
			</div>
		</div>
	);
};

export default LootStep;
