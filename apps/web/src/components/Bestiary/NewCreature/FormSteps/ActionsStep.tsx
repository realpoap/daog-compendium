import { NewCreature } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { Field, InputNumber } from '../../../RHFComponents';

const ActionsStep = ({
	handlePrevious,
	handleNext,
}: {
	handlePrevious: (step: number) => void;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
}) => {
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
				<Field
					name='actionList.epic'
					width='small'
					label='Epics'
				>
					<InputNumber name='actionList.epic' />
				</Field>
			</div>
			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => handlePrevious(2)}
				>
					&#10094; Prev
				</button>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => handleNext([], 4)}
				>
					Next &#10095;
				</button>
			</div>
		</div>
	);
};

export default ActionsStep;
