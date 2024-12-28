import { NewAction } from '@api/lib/ZodCreature';
import { SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import { Field, InputNumber } from '../RHFComponents';
import ActionForm from './utils/ActionForm';

const ActionsStep = ({
	setStep,
}: {
	setStep: React.Dispatch<SetStateAction<number>>;
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [actions, setActions] = useState<NewAction[]>([]);

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
				<button
					className='bg-accent font-grenze m-y-2 mt-8 flex w-2/3 flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold'
					onClick={e => {
						e.stopPropagation();
						setIsModalVisible(true);
						(
							document.getElementById('attribute-form') as HTMLDialogElement
						).showModal();
					}}
				>
					Add action
				</button>
				{isModalVisible &&
					createPortal(
						<ActionForm
							tags={actions}
							setTags={setActions}
							setVisible={setIsModalVisible}
						/>,
						document.body,
					)}
			</div>
			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => setStep(prev => prev - 1)}
				>
					&#10094; Prev
				</button>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => setStep(prev => prev + 1)}
				>
					Next &#10095;
				</button>
			</div>
		</div>
	);
};

export default ActionsStep;
