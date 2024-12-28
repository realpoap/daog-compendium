import { trpc } from '@/utils/trpc';
import {
	AttributeSchema,
	NewCreature,
	ZodNewCreature,
} from '@api/lib/ZodCreature'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { capitalizeFirstLetter } from '@/utils/capitalize';
import { useEffect, useState } from 'react';
import TitleBack from '../TitleBack';
import NewCreatureDetails from './NewCreatureDetails';
import NewCreatureForm from './NewCreatureForm';
import NewCreatureSteps from './NewCreatureSteps';

const NewCreaturePage = () => {
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
		defaultValues: {
			size: undefined,
			stats: {
				CEL: 15,
				AGI: 15,
				DEX: 15,
				STR: 15,
				END: 15,
				VIT: 15,
				COU: 15,
				INS: 15,
				SEN: 15,
				CHA: 15,
				SOC: 15,
				ERU: 15,
			},
			fullname: undefined,
			name: '',
			rank: null,
			isBoss: false,
			type: undefined,
			subtype: null,
			alignment: undefined,
			level: undefined,
			attack: undefined,
			attackBonus: null,
			defense: undefined,
			defenseBonus: null,
			ranged: undefined,
			rangedBonus: null,
			health: undefined,
			armor: null,
			perception: undefined,
			perceptionBonus: null,
			magic: null,
			spirit: null,
			glory: null,
			loot: [],
			objects: [],
			flavor: null,
			description: null,
			actionList: null,
			attributes: [],
			actions: [],
		},
		shouldFocusError: true,
		mode: 'onTouched',
	});

	// TODO: Move things in a Context returning the FormProvider and methods

	// Create Fullname and Leve
	useEffect(() => {
		setFormValues();
	}, [methods.formState.isValidating]);

	const setFormValues = () => {
		const creature = methods.getValues();
		console.log('Calculating data...');

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
						//e.stopPropagation();
						//e.preventDefault();
						methods.handleSubmit(onSubmit)(e);
					}}
					setAttributeValue={methods.setValue}
				/>
			</FormProvider>
		</div>
	);
};

export default NewCreaturePage;
