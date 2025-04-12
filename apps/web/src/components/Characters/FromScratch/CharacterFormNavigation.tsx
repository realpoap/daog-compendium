import { SpecieDataForm, allSpecies } from '@/data/speciesProfile';
import { useCharacterForm } from '@/store/characterContext';
import { defaultValuesCharacter } from '@/types/defaultValuesCharacter';
import { NewCharacter, NewCharacterSchema } from '@api/lib/ZodCharacter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
	FormProvider,
	useForm,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import CharFormStep1 from './Steps/CharFormStep1';
import CharFormStep10 from './Steps/CharFormStep10';
import CharFormStep2 from './Steps/CharFormStep2';
import CharFormStep3 from './Steps/CharFormStep3';
import CharFormStep4 from './Steps/CharFormStep4';
import CharFormStep5 from './Steps/CharFormStep5';
import CharFormStep6 from './Steps/CharFormStep6';
import CharFormStep7 from './Steps/CharFormStep7';
import CharFormStep8 from './Steps/CharFormStep8';
import CharFormStep9 from './Steps/CharFormStep9';

const CharacterFormNavigation = () => {
	const methods = useForm<NewCharacter>({
		resolver: zodResolver(NewCharacterSchema),
		defaultValues: defaultValuesCharacter,
		shouldFocusError: true,
	});

	return (
		<div className='card font-cabin bg-card text-base-300 flex w-full flex-col items-start p-4 shadow shadow-lg sm:w-3/4 md:w-1/2'>
			<FormProvider {...methods}>
				<CharacterFormInner />
			</FormProvider>
		</div>
	);
};

const CharacterFormInner = () => {
	const methods = useFormContext();
	const { control, handleSubmit } = methods;
	const { currentStep, setCurrentStep } = useCharacterForm();

	const [selectedSpecieData, setSelectedSpecieData] =
		useState<SpecieDataForm>();
	const selectedSub = useWatch({ control, name: 'bio.subspecies' });

	useEffect(() => {
		if (selectedSub !== '')
			setSelectedSpecieData(
				allSpecies.find(specie => specie.sub === selectedSub),
			);
	}, [selectedSub]);

	const nextStep = () => {
		if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
	};
	const prevStep = () => {
		if (currentStep > 0) setCurrentStep(prev => prev - 1);
	};

	const onSubmit = handleSubmit(data => {
		if (currentStep === steps.length - 1) {
			// Final step → submit to backend
			console.log('Submit character:', data);
		} else {
			console.log('Step valid data:', data);
			nextStep();
		}
	});

	const steps = [
		{
			id: 0,
			label: 'Character Name',
			component: <CharFormStep1 />,
		},
		{
			id: 1,
			label: 'Species',
			component: <CharFormStep2 selected={selectedSpecieData} />,
		},
		{ id: 2, label: 'Origins', component: <CharFormStep3 /> },
		{
			id: 3,
			label: 'Languages',
			component: <CharFormStep4 selected={selectedSpecieData} />,
		},
		{
			id: 4,
			label: 'Attributes',
			component: <CharFormStep5 selected={selectedSpecieData} />,
		},
		{
			id: 5,
			label: 'Skills',
			component: <CharFormStep6 />,
		},
		{
			id: 6,
			label: 'Features',
			component: <CharFormStep7 />,
		},
		{ id: 7, label: 'Background', component: <CharFormStep8 /> },
		{ id: 8, label: 'Talent & Feats', component: <CharFormStep9 /> },
		{ id: 9, label: 'Destiny', component: <CharFormStep10 /> },
	];

	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			{/* Progress Bar */}
			<div>
				<span>
					{currentStep + 1}/10 {': '}
				</span>
				<span>{steps[currentStep].label}</span>
			</div>
			{/* Step content */}
			<div className='flex w-full flex-col items-center'>
				{steps[currentStep]?.component}
			</div>

			{/* Navigation */}
			<div className='mt-4 flex w-full justify-between'>
				{currentStep > 0 && (
					<button
						type='button'
						className='btn btn-outline'
						onClick={prevStep}
					>
						← Back
					</button>
				)}
				<button
					type='submit'
					className='btn btn-primary ml-auto'
				>
					{currentStep === steps.length - 1 ? 'Submit' : 'Next →'}
				</button>
			</div>
		</form>
	);
};

export default CharacterFormNavigation;
