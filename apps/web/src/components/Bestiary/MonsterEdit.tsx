import { useAuth } from '@/store/authContext';
import {
	creatureAlignmentOptions,
	creatureHabitatOptions,
	creatureSizeOptions,
	creatureTypeOptions,
} from '@/types/creatureOptions';
import { spellOptions } from '@/types/spellOptions';
import { calculateStats } from '@/utils/calculateStats';
import { trpc } from '@/utils/trpc';
import { HabitatTypeType, SpellTypeType } from '@api/lib/zod-prisma';
import { Creature, ZodCreature } from '@api/lib/ZodCreature';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SubmitButton } from '../Buttons';
import Collapsible from '../Collapsible';
import {
	Checkbox,
	Field,
	Input,
	InputNumber,
	Select,
	Textarea,
} from '../RHFComponents';
import MultiSelect from '../RHFComponents/MultiSelect';
import TitleBack from '../TitleBack';

const MonsterEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const utils = trpc.useUtils();
	const [habitats, setHabitats] = useState<string[]>([]);
	const [domains, setDomains] = useState<string[]>([]);

	const creatureById = trpc.creatures.getById.useQuery(id as string);

	const methods = useForm<Creature>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodCreature)(data, context, options),
			);
			return zodResolver(ZodCreature)(data, context, options);
		},
		shouldFocusError: true,
		mode: 'onTouched',
	});

	useEffect(() => {
		if (!creatureById.isSuccess) return;
		methods.reset(creatureById.data as Creature);
		setHabitats(creatureById.data.habitat);
		setDomains(creatureById.data.magicDomain);
	}, [creatureById.status]);

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
		methods.setValue('magicDomain', domains as SpellTypeType[]);
		methods.setValue('habitat', habitats as HabitatTypeType[]);
	}, [methods.formState.isValidating, methods.formState.isSubmitting]);

	const updateCreature = trpc.creatures.update.useMutation({
		onSuccess: data => {
			toast.success('Creature created !');
			methods.reset();
			utils.creatures.getById.invalidate();
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

	const onSubmit = (data: Creature) => {
		updateCreature.mutate(data);
	};

	//Loading -----------------------------------------------------------------
	if (creatureById.isLoading && !creatureById.data) {
		return (
			<div className='font-grenze flex h-screen flex-row flex-col items-center justify-center'>
				<p>Hunting creature</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define spell object data after query success
	const creature = creatureById?.data;

	/////////////////////////////////////////
	// RETURN
	/////////////////////////////////////////

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={`Edit ${creature?.name}`} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col items-center md:w-2/3'
				>
					<Field
						name='name'
						label='Name'
					>
						<Input
							name='name'
							type='text'
							disabled={true}
						/>
					</Field>
					<Field
						name='isBoss'
						label=''
						width='full'
					>
						<Checkbox
							name='isBoss'
							label='legendary creature'
						/>
					</Field>
					<div className='flex w-full justify-center gap-4 md:flex-row'>
						<Field
							name='type'
							label='Type'
							width='small'
						>
							<Select
								name='type'
								options={creatureTypeOptions}
								defaultValue=''
							/>
						</Field>
						<Field
							name='size'
							label='Size'
							width='small'
						>
							<Select
								name='size'
								options={creatureSizeOptions}
								defaultValue=''
							/>
						</Field>
						<Field
							name='alignment'
							label='Alignment'
							width='small'
						>
							<Select
								name='alignment'
								options={creatureAlignmentOptions}
								defaultValue=''
							/>
						</Field>
					</div>
					<Collapsible title='add details'>
						<Field
							name='habitat'
							label='Habitat'
						>
							<MultiSelect
								name='habitat'
								list={creatureHabitatOptions}
								values={habitats}
								setValues={setHabitats}
								placeholder='Select one or several habitat'
							/>
						</Field>
						<Field
							name='subtype'
							label='Sub-Type'
						>
							<Input
								name='subtype'
								type='text'
							/>
						</Field>
						<Field
							name='flavor'
							label='Flavor'
						>
							<Input name='flavor' />
						</Field>
					</Collapsible>
					<Field
						name='description'
						label='Description'
					>
						<Textarea name='description' />
					</Field>

					<Collapsible title='change stats'>
						<div className='flex flex-col flex-wrap items-center justify-between px-[2vw] md:w-full md:flex-row'>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
									Adroitness
								</h4>
								<div className='flex flex-row justify-center gap-2'>
									<Field
										name='stats.CEL'
										width='small'
										label='CEL'
									>
										<InputNumber name='stats.CEL' />
									</Field>
									<Field
										name='stats.AGI'
										width='small'
										label='AGI'
									>
										<InputNumber name='stats.AGI' />
									</Field>
									<Field
										name='stats.DEX'
										width='small'
										label='DEX'
									>
										<InputNumber name='stats.DEX' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
									Constitution
								</h4>
								<div className='flex flex-row justify-center gap-2'>
									<Field
										name='stats.STR'
										width='small'
										label='STR'
									>
										<InputNumber name='stats.STR' />
									</Field>
									<Field
										name='stats.END'
										width='small'
										label='END'
									>
										<InputNumber name='stats.END' />
									</Field>
									<Field
										name='stats.VIT'
										width='small'
										label='VIT'
									>
										<InputNumber name='stats.VIT' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
									Perception
								</h4>
								<div className='flex flex-row justify-center gap-2'>
									<Field
										name='stats.WIL'
										width='small'
										label='WIL'
									>
										<InputNumber name='stats.WIL' />
									</Field>
									<Field
										name='stats.INS'
										width='small'
										label='INS'
									>
										<InputNumber name='stats.INS' />
									</Field>
									<Field
										name='stats.SEN'
										width='small'
										label='SEN'
									>
										<InputNumber name='stats.SEN' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
									Shroudness
								</h4>
								<div className='flex flex-row justify-center gap-2'>
									<Field
										name='stats.CHA'
										width='small'
										label='CHA'
									>
										<InputNumber name='stats.CHA' />
									</Field>
									<Field
										name='stats.SOC'
										width='small'
										label='SOC'
									>
										<InputNumber name='stats.SOC' />
									</Field>
									<Field
										name='stats.ERU'
										width='small'
										label='ERU'
									>
										<InputNumber name='stats.ERU' />
									</Field>
								</div>
							</section>
						</div>
					</Collapsible>
					<Collapsible title='change modifiers'>
						<div className='flex w-full flex-wrap items-center justify-center gap-4 pb-0 pr-0 md:flex-row'>
							<Field
								name='attackBonus'
								label='&#xb1; Attack'
								width='tiny'
							>
								<InputNumber name='attackBonus' />
							</Field>
							<Field
								name='defenseBonus'
								label='&#xb1; Defense'
								width='tiny'
							>
								<InputNumber name='defenseBonus' />
							</Field>
							<Field
								name='rangedBonus'
								label='&#xb1; Ranged'
								width='tiny'
							>
								<InputNumber name='rangedBonus' />
							</Field>
							<Field
								name='perceptionBonus'
								label='&#xb1; Perception'
								width='tiny'
							>
								<InputNumber name='perceptionBonus' />
							</Field>
							<Field
								name='armor'
								label='&#xb1; Armor'
								width='tiny'
							>
								<InputNumber name='armor' />
							</Field>
							<Field
								name='magic'
								label='&#xb1; Magic'
								width='tiny'
							>
								<InputNumber name='magic' />
							</Field>
							<Field
								name='glory'
								label='&#xb1; Glory'
								width='tiny'
							>
								<InputNumber name='glory' />
							</Field>
						</div>
					</Collapsible>
					<div className='flex flex-row flex-wrap items-center justify-center gap-4 px-[4vw] md:flex-row'>
						<Field
							name='actionList.main'
							width='small'
							label='Main'
						>
							<InputNumber name='actionList.main' />
						</Field>
						{creature?.isBoss && (
							<Field
								name='actionList.epic'
								width='small'
								label='Epics'
							>
								<InputNumber name='actionList.epic' />
							</Field>
						)}
					</div>
					<section className='flex w-full flex-col items-center justify-end md:flex-row md:pl-6 md:pr-2'>
						<div className='w-1/2 md:w-2/5 md:pt-4'>
							<Field
								name='isCaster'
								label=''
							>
								<Checkbox
									id='magicdomain'
									name='isCaster'
									label='can use magic'
								/>
							</Field>
						</div>
						<div className='flex w-full flex-col items-center justify-center'>
							<Field
								name='magicDomain'
								label='Magic domain'
							>
								<MultiSelect
									name='magicDomain'
									list={spellOptions}
									values={domains}
									setValues={setDomains}
									placeholder='Select one or several magic domains'
								/>
							</Field>
						</div>
					</section>
					<SubmitButton
						text='Update'
						isLoading={methods.formState.isLoading}
						color='accent'
						textColor='stone-800'
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default MonsterEdit;
