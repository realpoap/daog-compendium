import { useAuth } from '@/store/authContext';
import {
	creatureAlignmentOptions,
	creatureSizeOptions,
} from '@/types/creatureOptions';
import { calcCharacterStats } from '@/utils/calculateStats';
import { trpc } from '@/utils/trpc';
import { Character, CharacterSchema } from '@api/lib/ZodCharacter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiFairyWand,
	GiHood,
	GiSemiClosedEye,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';
import { SubmitButton } from '../Buttons';
import Collapsible from '../Collapsible';
import { Checkbox, Field, Input, InputNumber, Select } from '../RHFComponents';
import TitleBack from '../TitleBack';

const CharacterEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const { user } = useAuth();

	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';
	const utils = trpc.useUtils();
	const characterById = trpc.characters.getById.useQuery(id as string);

	const methods = useForm<Character>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.dir(
				'❌ Validation errors',
				await zodResolver(CharacterSchema)(data, context, options),
			);
			return zodResolver(CharacterSchema)(data, context, options);
		},
		shouldFocusError: true,
		mode: 'onTouched',
	});

	useEffect(() => {
		if (!characterById.isSuccess) return;
		methods.reset(characterById.data as Character);
	}, [characterById.status]);

	useEffect(() => {
		const c = calcCharacterStats(methods.getValues());
		id && methods.setValue('id', id);
		methods.setValue('fullname', c.fullname);
		methods.setValue('attack', c.attack);
		methods.setValue('ranged', c.ranged);
		methods.setValue('defense', c.defense);
		methods.setValue('perception', c.perception);
		methods.setValue('discretion', c.discretion);
		methods.setValue('health', c.health);
		methods.setValue('spirit', c.spirit);
		methods.setValue('initiative', c.initiative);
		methods.setValue('weight', c.weight);
		methods.setValue('armorClass', c.armorClass);
		methods.setValue('actionList', c.actionList);
		methods.setValue('defenseType', c.defenseType);
		// methods.setValue('magicDomain', domains as SpellTypeType[]);
	}, [methods.formState.isValidating, methods.formState.isSubmitting]);

	const updatecharacter = trpc.characters.update.useMutation({
		onSuccess: () => {
			utils.characters.getById.invalidate();
			utils.characters.getAll.invalidate();
			toast.success('Character created !');
			methods.reset();
			navigate({
				to: '/characters',
			});
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const onSubmit = (data: Character) => {
		updatecharacter.mutate(data);
	};

	const watchExp = methods.watch('experience');

	//Loading -----------------------------------------------------------------
	if (characterById.isLoading && !characterById.data) {
		return (
			<div className='font-grenze flex h-screen flex-col items-center justify-center gap-2'>
				<span className='text-2xl'>Looking for character</span>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define spell object data after query success
	const character = characterById?.data;

	/////////////////////////////////////////
	// RETURN
	/////////////////////////////////////////

	return (
		<div>
			<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
				<TitleBack title={`${character?.name}`} />

				<div className='flex flex-row gap-2'>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiThunderSkull className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('initiative')}
					</div>

					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiBullseye className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('ranged')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSwordWound className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('attack')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiCheckedShield className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('defense')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiArmorVest className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('armorClass')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSemiClosedEye className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('perception')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiHood className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('discretion')}
					</div>
					<div className='font-cabin flex flex-row'>
						<GiFairyWand className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('magic')}
					</div>
				</div>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className='flex w-full flex-col items-center md:w-2/3'
					>
						<Field name='name'>
							<Input
								name='name'
								type='text'
							/>
						</Field>
						<Field name='surname'>
							<Input
								name='surname'
								type='text'
							/>
						</Field>
						<div className='mb-2 flex w-full flex-row items-center justify-center gap-4'>
							<Field
								name='level'
								width='digit'
							>
								<InputNumber name='level' />
							</Field>
							<Field
								name='experience'
								width='digit'
							>
								<InputNumber name='experience' />
							</Field>
						</div>
						<progress
							className='progress progress-primary w-full md:w-1/2'
							value={watchExp}
							max={
								methods.getValues('level') && methods.getValues('level') * 100
							}
						></progress>
						<div className='flex w-full flex-row justify-center gap-4'>
							<Field
								name='size'
								width='third'
							>
								<Select
									name='size'
									options={creatureSizeOptions}
									defaultValue=''
								/>
							</Field>
							<Field
								name='alignment'
								width='third'
							>
								<Select
									name='alignment'
									options={creatureAlignmentOptions}
									defaultValue=''
								/>
							</Field>
						</div>
						<div className='flex flex-row justify-center gap-4'>
							<Field
								name='health.current'
								label='health'
							>
								<InputNumber
									name='health.current'
									max={methods.getValues('health.max')}
								/>
							</Field>
							<Field
								name='spirit.current'
								label='spirit'
							>
								<InputNumber
									name='spirit.current'
									max={methods.getValues('spirit.max')}
								/>
							</Field>
						</div>

						<div className='flex w-full flex-row justify-center gap-4'>
							<Field
								name='glory'
								width='digit'
							>
								<InputNumber name='glory' />
							</Field>
							<Field
								name='luck'
								width='digit'
							>
								<InputNumber name='luck' />
							</Field>

							<Field
								name='exhaustion'
								width='digit'
							>
								<InputNumber name='exhaustion' />
							</Field>
						</div>
						{(isEditor || characterById?.data?.creator === user?.id) && (
							<>
								<div className='flex w-full flex-row justify-center'>
									<Field
										name='isPun'
										label=''
										width='third'
									>
										<Checkbox
											name='isPun'
											label='pun name'
										/>
									</Field>
									<Field
										name='isBoss'
										label=''
										width='third'
									>
										<Checkbox
											name='isBoss'
											label='legendary'
										/>
									</Field>
									<Field
										name='isCaster'
										label=''
										width='third'
									>
										<Checkbox
											name='isCaster'
											label='caster'
										/>
									</Field>
									<Field
										name='isDead'
										label=''
										width='third'
									>
										<Checkbox
											name='isDead'
											label='dead'
										/>
									</Field>
								</div>
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
									</div>
								</Collapsible>
							</>
						)}

						{/* SUBMIT ------------------------------------------------- */}
						<SubmitButton
							isLoading={methods.formState.isSubmitting}
							color='accent'
							textColor='stone-800'
							text='Update'
						/>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default CharacterEdit;
