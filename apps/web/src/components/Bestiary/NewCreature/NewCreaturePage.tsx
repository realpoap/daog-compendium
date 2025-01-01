import { trpc } from '@/utils/trpc';
import { NewCreature, ZodNewCreature } from '@api/lib/ZodCreature'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { calculateStats, defaultCreature } from '@/utils/calculateStats';
import { capitalizeFirstLetter } from '@/utils/capitalize';
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
		setFormValues();
		const calcCreature = calculateStats(methods.getValues());
		methods.setValue('level', calcCreature.level);
	}, [methods.formState.isValidating, methods.formState.touchedFields]);

	const setFormValues = () => {
		const creature = methods.getValues();

		// Fullname
		let fullnameString = '';
		if (creature.name) fullnameString = capitalizeFirstLetter(creature.name);
		if (creature.subtype)
			fullnameString = fullnameString.concat(' ', creature.subtype);
		if (creature.rank && creature.rank !== 'default')
			fullnameString = fullnameString.concat(', ', creature.rank);
		if (creature.type)
			fullnameString = fullnameString.concat(
				' (',
				capitalizeFirstLetter(creature.type),
				')',
			);
		methods.setValue('fullname', fullnameString);

		// Stats
		if (creature.stats?.AGI && creature.stats?.STR) {
			const attB = creature.attackBonus ?? 0;
			const attack = Math.max(creature.stats?.STR, creature.stats?.AGI) + attB;
			methods.setValue('attack', attack);
		}
		if (creature.stats?.DEX) {
			const ranB = creature.rangedBonus ?? 0;
			const ranged = creature.stats?.DEX + ranB;
			methods.setValue('ranged', ranged);
		}
		if (creature.stats?.AGI && creature.stats?.STR) {
			const defB = creature.defenseBonus ?? 0;
			const armor = creature.armor ?? 0;

			const defense =
				Math.max(creature.stats?.STR, creature.stats?.AGI) + defB + armor;
			methods.setValue('defense', defense);
		}
		if (creature.stats?.ERU && creature.stats?.SEN && creature.stats?.INS) {
			const perB = creature.perceptionBonus ?? 0;

			const perception =
				Math.max(
					creature.stats?.STR,
					creature.stats?.AGI,
					creature.stats?.ERU,
				) + perB;
			methods.setValue('perception', perception);
		}
		if (creature.stats?.VIT) {
			const glory = creature.glory ?? 0;

			methods.setValue('health', creature.stats.VIT + glory);
		}
		if (creature.stats?.SEN) {
			const magic = creature.magic ?? 0;

			methods.setValue('spirit', creature.stats.SEN + magic);
		}
	};

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
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
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
