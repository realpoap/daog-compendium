import { trpc } from '@/utils/trpc';
import { NewCreature, ZodNewCreature } from '@api/lib/ZodCreature'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { calculateStats, defaultCreature } from '@/utils/calculateStats';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import TitleBack from '../../TitleBack';
import NewCreatureDetails from './NewCreatureDetails';
import NewCreatureForm from './NewCreatureForm';
import NewCreatureSteps from './NewCreatureSteps';

const NewCreaturePage = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);

	const methods = useForm<NewCreature>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodNewCreature)(data, context, options),
			);
			return zodResolver(ZodNewCreature)(data, context, options);
		},
		defaultValues: defaultCreature,
		shouldFocusError: true,
		mode: 'onTouched',
	});

	// TODO: Move things in a Context returning the FormProvider and methods

	// Create Fullname and Level
	useEffect(() => {
		const calcCreature = calculateStats(methods.getValues());
		methods.setValue('level', calcCreature.level);
		methods.setValue('fullname', calcCreature.fullname);
		methods.setValue('attack', calcCreature.attack);
		methods.setValue('ranged', calcCreature.ranged);
		methods.setValue('defense', calcCreature.defense);
		methods.setValue('armor', calcCreature.armor);
		methods.setValue('perception', calcCreature.perception);
		methods.setValue('discretion', calcCreature.discretion);
		methods.setValue('health', calcCreature.health);
		methods.setValue('spirit', calcCreature.spirit);
		methods.setValue('initiative', calcCreature.initiative);
	}, [methods.formState.isValidating, methods.formState.isSubmitting]);

	const createCreature = trpc.creatures.create.useMutation({
		onSuccess: data => {
			toast.success('Creature created !');
			methods.reset();
			setStep(1);
			navigate({
				to: '/bestiary/$id',
				params: { id: `${data.id}` },
			});
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const onSubmit = (data: NewCreature) => {
		createCreature.mutate(data);
	};

	return (
		<div className='mt-sm flex h-full w-full flex-col items-center justify-center'>
			<TitleBack title='New creature' />
			<NewCreatureSteps step={step} />
			<NewCreatureDetails
				step={step}
				creature={methods.getValues()}
			/>
			<FormProvider {...methods}>
				<NewCreatureForm
					step={step}
					setStep={setStep}
					trigger={methods.trigger}
					creature={methods.getValues()}
					handleSubmit={e => {
						e.preventDefault();
						methods.handleSubmit(onSubmit)(e);
					}}
					setValue={methods.setValue}
					isLoading={createCreature.isPending}
				/>
			</FormProvider>
		</div>
	);
};

export default NewCreaturePage;
