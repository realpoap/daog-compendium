import { useAuth } from '@/store/authContext';
import { useCharacterForm } from '@/store/characterContext';
import { setupCompleteCharacterFormValues } from '@/utils/setCharacterFormData';
import { trpc } from '@/utils/trpc';
import { StatProfil } from '@api/lib/ZodCreature';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import CharFormStep1 from './Steps/CharFormStep1';
import CharFormStep10 from './Steps/CharFormStep10';
import CharFormStep11 from './Steps/CharFormStep11';
import CharFormStep12 from './Steps/CharFormStep12';
import CharFormStep2 from './Steps/CharFormStep2';
import CharFormStep3 from './Steps/CharFormStep3';
import CharFormStep4 from './Steps/CharFormStep4';
import CharFormStep5 from './Steps/CharFormStep5';
import CharFormStep6 from './Steps/CharFormStep6';
import CharFormStep7 from './Steps/CharFormStep7';
import CharFormStep8 from './Steps/CharFormStep8';
import CharFormStep9 from './Steps/CharFormStep9';

const CharacterFormNavigation = () => {
	const { methods } = useCharacterForm();

	return (
		<div className='card font-cabin bg-card text-base-300 flex w-full flex-col items-start p-4 shadow shadow-lg sm:w-3/4 md:w-1/2'>
			<FormProvider {...methods}>
				<CharacterFormInner />
			</FormProvider>
		</div>
	);
};

const CharacterFormInner = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { methods, currentStep, nextStep, prevStep } = useCharacterForm();
	const { handleSubmit } = methods;

	const createCharacter = trpc.characters.create.useMutation({
		onSuccess: data => {
			methods.reset();
			if (data) updatecharacter.mutate(data);
			navigate({
				to: '/characters',
			});
			toast.success('Character created !');
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				toast.error('You must be logged in');
			} else toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const updatecharacter = trpc.characters.update.useMutation({
		onSuccess: () => {},
		onError: error => {
			toast.error('Could not update character...');
			throw new Error(error.message);
		},
	});

	const [destinyClicked, setDestinyClicked] = useState(false);

	const profile: StatProfil = useWatch({ name: 'profile.statsStarting' });
	const variables = useWatch({ name: 'profile.variables' });

	const onSubmit = handleSubmit(() => {
		if (currentStep === steps.length - 1) {
			// Final step → submit to backend
			const complete = setupCompleteCharacterFormValues(methods, user);
			//console.log('Final submit:', complete);
			createCharacter.mutate(complete);
		} else {
			//console.log('Step valid data:', data);
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
			component: <CharFormStep2 />,
		},
		{
			id: 2,
			label: 'Attributes',
			component: <CharFormStep5 />,
		},
		{ id: 3, label: 'Origins', component: <CharFormStep3 /> },
		{
			id: 4,
			label: 'Specificities',
			component: <CharFormStep4 />,
		},
		{
			id: 5,
			label: 'Skills',
			component: <CharFormStep6 />,
		},
		{ id: 6, label: 'Careers', component: <CharFormStep10 /> },
		{ id: 7, label: 'Talent & Feats', component: <CharFormStep9 /> },
		{ id: 8, label: 'Magic', component: <CharFormStep11 /> },
		{
			id: 9,
			label: 'Features',
			component: <CharFormStep7 />,
		},
		{ id: 10, label: 'Background', component: <CharFormStep8 /> },
		{
			id: 11,
			label: 'Destiny',
			component: (
				<CharFormStep12
					clicked={destinyClicked}
					setClicked={setDestinyClicked}
				/>
			),
		},
	];

	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			{/* Progress Bar */}

			<div className='font-grenze'>
				<span>
					{currentStep + 1}/12 {': '}
				</span>
				<span>{steps[currentStep].label}</span>
			</div>
			<div className='font-cabin text-neutral-content flex flex-row gap-1 text-[0.7rem]'>
				{profile &&
					Object.keys(profile).map(stat => (
						<div
							key={stat}
							className='flex flex-row'
						>
							<span>{stat}:</span>
							<span>{profile[stat as keyof StatProfil]}</span>
						</div>
					))}
			</div>
			<div className='font-cabin text-neutral-content flex h-20 flex-col flex-wrap gap-1 text-[0.7rem]'>
				{variables &&
					Object.keys(variables).map(variable => (
						<div
							key={variable}
							className='flex flex-row'
						>
							<span>{variable}:</span>
							<span>{variables[variable]}</span>
						</div>
					))}
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
