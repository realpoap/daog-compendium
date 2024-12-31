import { ActionButton } from '@/components/Buttons';
import { NewCreature } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'rocketicons/ri';
import { Field, InputNumber } from '../../../RHFComponents';

type ActionStepProps = {
	handlePrevious: (step: number) => void;
	creature: NewCreature;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
};

const ActionsStep = ({
	handlePrevious,
	handleNext,
	creature,
}: ActionStepProps) => {
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
