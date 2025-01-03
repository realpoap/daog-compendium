import { ActionButton } from '@/components/Buttons';
import { trpc } from '@/utils/trpc';
import { NewAction } from '@api/lib/ZodAction';
import { NewCreature } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'rocketicons/ri';
import { Field, InputNumber } from '../../../RHFComponents';
import { ActionsTags } from '../../utils/ActionsTag';

type ActionStepProps = {
	handlePrevious: (step: number) => void;
	creature: NewCreature;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
	setValue: UseFormSetValue<NewCreature>;
};

const ActionsStep = ({
	handlePrevious,
	handleNext,
	creature,
	setValue,
}: ActionStepProps) => {
	const [tags, setTags] = useState<string[]>([]);
	const actionsList = trpc.actions.getAll.useQuery();

	useEffect(() => {
		const actions = creature.actions.map(a => a.searchName);
		setTags(actions);
	}, [creature]);

	useEffect(() => {
		if (actionsList.data) {
			const list = actionsList.data;
			const arrObjects = [] as NewAction[];
			tags?.map(att => {
				const object = list.find(el => el.searchName === att);
				if (object) {
					const { id, ...rest } = object;
					arrObjects.push(rest as NewAction);
				}
			});
			console.log(arrObjects);
			setValue('actions', arrObjects as NewAction[]);
		}
	}, [tags]);

	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='flex flex-row flex-wrap items-center justify-center gap-4 px-[4vw] md:flex-row'>
				<Field
					name='actionList.main'
					width='small'
					label='Main'
				>
					<InputNumber name='actionList.main' />
				</Field>
				{creature.isBoss && (
					<Field
						name='actionList.epic'
						width='small'
						label='Epics'
					>
						<InputNumber name='actionList.epic' />
					</Field>
				)}
			</div>
			<Field
				name='actions'
				label='Search actions'
			>
				{actionsList.data?.length !== 0 && actionsList?.data ? (
					<ActionsTags
						setTags={setTags}
						tags={tags}
						actionsList={actionsList?.data}
					/>
				) : (
					<div className='skeleton rounded-btn h-11 w-full dark:bg-stone-700'></div>
				)}
			</Field>
			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handlePrevious(2)}
				>
					<span className='pr-4 align-middle'>
						<RiArrowDropLeftLine className='icon-stone-800-base' /> Prev
					</span>
				</ActionButton>
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handleNext([], 4)}
				>
					<span className='pl-4 align-middle'>
						Next <RiArrowDropRightLine className='icon-stone-800-base' />
					</span>
				</ActionButton>
			</div>
		</div>
	);
};

export default ActionsStep;
