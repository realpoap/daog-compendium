import { trpc } from '@/utils/trpc';
import { NewCreature, ZodNewCreature } from '@api/lib/ZodCreature'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { capitalizeFirstLetter } from '@/utils/capitalize';
import { useEffect, useState } from 'react';
import TitleBack from '../TitleBack';
import NewCreatureDetails from './NewCreatureDetails';
import NewCreatureForm from './NewCreatureForm';
import NewCreatureSteps from './NewCreatureSteps';

const NewCreaturePage = () => {
	const { history } = useRouter();

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
		shouldFocusError: true,
	});

	const formValues = methods.watch();

	// TODO: Move things in a Context returning the FormProvider and methods

	// Create Fullname and Level
	useEffect(() => {
		setTimeout(() => {
			setFormValues;
		}, 2000);
	}, [formValues]);

	const setFormValues = () => {
		const creature = methods.getValues();
		console.log(creature);

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

		if (creature.attackBonus && creature.stats?.AGI && creature.stats?.STR) {
			const attack =
				Math.max(creature.stats?.STR, creature.stats?.AGI) +
				creature.attackBonus;
			methods.setValue('attack', attack);
		}
		if (creature.rangedBonus && creature.stats?.DEX) {
			const ranged = creature.stats?.DEX + creature.rangedBonus;
			methods.setValue('ranged', ranged);
		}
		if (
			creature.defenseBonus &&
			creature.armor &&
			creature.stats?.AGI &&
			creature.stats?.STR
		) {
			const defense =
				Math.max(creature.stats?.STR, creature.stats?.AGI) +
				creature.defenseBonus +
				creature.armor;
			methods.setValue('defense', defense);
		}
		if (
			creature.perceptionBonus &&
			creature.stats?.ERU &&
			creature.stats?.SEN &&
			creature.stats?.INS
		) {
			const perception =
				Math.max(
					creature.stats?.STR,
					creature.stats?.AGI,
					creature.stats?.ERU,
				) + creature.perceptionBonus;
			methods.setValue('perception', perception);
		}
		if (creature.stats?.VIT && creature.glory) {
			methods.setValue('health', creature.stats.VIT + creature.glory);
		}
		if (creature.stats?.SEN && creature.magic) {
			methods.setValue('spirit', creature.stats.SEN + creature.magic);
		}
	};

	const createCreature = trpc.creatures.create.useMutation({
		onSuccess: () => {
			toast.success('Creature created !');
			methods.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const onSubmit = (data: NewCreature) => console.log(data);

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title='New creature' />
			<NewCreatureSteps step={step} />
			<NewCreatureDetails creature={methods.getValues()} />
			<FormProvider {...methods}>
				<NewCreatureForm
					step={step}
					setStep={setStep}
					handleSubmit={e => {
						e.stopPropagation();
						e.preventDefault();
						methods.handleSubmit(onSubmit)(e);
					}}
					setAttributeValue={methods.setValue}
				/>
			</FormProvider>
		</div>
	);
};

export default NewCreaturePage;
