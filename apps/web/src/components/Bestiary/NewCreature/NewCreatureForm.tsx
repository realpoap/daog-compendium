import { NewCreature } from '@api/lib/ZodCreature';
import { SetStateAction } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import toast from 'react-hot-toast';
import ActionsStep from './FormSteps/ActionsStep';
import DescriptionStep from './FormSteps/DescriptionStep';
import LootStep from './FormSteps/LootStep';
import ProfileStep from './FormSteps/ProfileStep';
import ResumeStep from './FormSteps/ResumeStep';

type CreatureFormProps = {
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	setStep: React.Dispatch<SetStateAction<number>>;
	setValue: UseFormSetValue<NewCreature>;
	step: number;
	trigger: UseFormTrigger<NewCreature>;
	isLoading: boolean;
	creature: NewCreature;
};

const NewCreatureForm = ({
	handleSubmit,
	setStep,
	setValue,
	step,
	trigger,
	isLoading,
	creature,
}: CreatureFormProps) => {
	const handleNext = async (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => {
		const output = await trigger(inputs);
		if (!output) toast.error('Please fix your inputs');
		if (output) setStep(nextStep);
	};

	const handlePrevious = (step: number) => {
		setStep(step);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full flex-col md:w-2/3'
		>
			{/* DESCRIPTION STEP ----------------------------------------- */}
			{step === 1 && (
				<DescriptionStep
					setValue={setValue}
					handleNext={handleNext}
				/>
			)}
			{/* PROFILE STEP ----------------------------------------- */}
			{step === 2 && (
				<ProfileStep
					handlePrevious={handlePrevious}
					handleNext={handleNext}
				/>
			)}
			{/* ACTIONS STEP ----------------------------------------- */}
			{step === 3 && (
				<ActionsStep
					handlePrevious={handlePrevious}
					handleNext={handleNext}
					creature={creature}
				/>
			)}
			{/* EQUIPMENT STEP ----------------------------------------- */}
			{step === 4 && (
				<LootStep
					setValue={setValue}
					handlePrevious={handlePrevious}
					handleNext={handleNext}
				/>
			)}
			{/* VALIDATION STEP ----------------------------------------- */}
			{step === 5 && (
				<ResumeStep
					handlePrevious={handlePrevious}
					isLoading={isLoading}
				/>
			)}
		</form>
	);
};

export default NewCreatureForm;
