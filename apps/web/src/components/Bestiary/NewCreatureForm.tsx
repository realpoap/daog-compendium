import { NewCreature } from '@api/lib/ZodCreature';
import { SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import ActionsStep from './ActionsStep';
import DescriptionStep from './DescriptionStep';
import ProfileStep from './ProfileStep';

const NewCreatureForm = ({
	handleSubmit,
	setStep,
	setAttributeValue,
	step,
}: {
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	setStep: React.Dispatch<SetStateAction<number>>;
	setAttributeValue: UseFormSetValue<NewCreature>;
	step: number;
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full flex-col md:w-2/3'
		>
			{/* DESCRIPTION STEP ----------------------------------------- */}
			{step === 1 && (
				<DescriptionStep
					setValue={setAttributeValue}
					setStep={setStep}
					step={step}
				/>
			)}
			{/* PROFILE STEP ----------------------------------------- */}
			{step === 2 && <ProfileStep setStep={setStep} />}
			{/* ACTIONS STEP ----------------------------------------- */}
			{step === 3 && <ActionsStep setStep={setStep} />}
			{/* EQUIPMENT STEP ----------------------------------------- */}
		</form>
	);
};

export default NewCreatureForm;
