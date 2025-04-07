import { useAuth } from '@/store/authContext';
import {
	creatureAlignmentOptions,
	creatureGenderOptions,
	creatureSizeOptions,
} from '@/types/creatureOptions';
import { calcCharacterStats } from '@/utils/calculateStats';
import { trpc } from '@/utils/trpc';
import { Character, CharacterSchema } from '@api/lib/ZodCharacter';
import { SpellType } from '@api/lib/ZodSpell';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
	const [character, setCharacter] = useState<Character>();
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
		if (characterById.data) {
			setCharacter(calcCharacterStats(characterById.data));

			Object.entries(characterById.data).forEach(([name, value]) =>
				methods.setValue(name as keyof Character, value),
			);
			console.groupCollapsed('Character');
			console.dir(methods.getValues());
			console.groupEnd();
		}
	}, [characterById.data]);

	useEffect(() => {
		if (character) {
			const c = calcCharacterStats(methods.getValues());
			if (id) methods.setValue('id', id);

			Object.entries(c).forEach(([name, value]) =>
				methods.setValue(name as keyof Character, value),
			);
			methods.setValue('path.careers', []);
			methods.setValue('path.magicDomain', [] as SpellType[]);
			methods.setValue(
				'fullname',
				`${methods.getValues('bio.name')} (${methods.getValues('bio.subspecies') + ' '}${methods.getValues('bio.species')}) - lvl ${methods.getValues('profile.level')}`,
			);
			console.groupCollapsed('Character sent');
			console.dir(methods.getValues());
			console.groupEnd();
		}
	}, [methods.formState.isSubmitting]);

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

	const watchExp = methods.watch('profile.experience');

	//Loading -----------------------------------------------------------------
	if (characterById.isLoading && !characterById.data) {
		return (
			<div className='font-grenze flex h-screen flex-col items-center justify-center gap-2'>
				<span className='text-2xl'>Looking for character</span>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}

	/////////////////////////////////////////
	// RETURN
	/////////////////////////////////////////

	return (
		<div>
			<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
				<TitleBack title={`${character?.bio.name}`} />

				<div className='flex flex-row gap-2'>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiThunderSkull className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.initiative')}
					</div>

					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiBullseye className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.ranged')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSwordWound className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.attack')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiCheckedShield className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.defense')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiArmorVest className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('equipment.armorClass')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSemiClosedEye className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.perception')}
					</div>
					<div className='font-cabin flex flex-row after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiHood className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.discretion')}
					</div>
					<div className='font-cabin flex flex-row'>
						<GiFairyWand className='icon-background dark:icon-stone-200 icon-base mr-2' />{' '}
						{methods.getValues('profile.variables.magic')}
					</div>
				</div>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className='flex w-full flex-col items-center md:w-2/3'
					>
						<Field
							name='bio.name'
							label='name'
						>
							<Input
								name='bio.name'
								type='text'
							/>
						</Field>
						<Field
							name='bio.surname'
							label='surname'
						>
							<Input
								name='bio.surname'
								type='text'
							/>
						</Field>
						<div className='flex w-full flex-row justify-center gap-4'>
							<Field
								name='specifics.gender'
								width='third'
								label='gender'
							>
								<Select
									name='specifics.gender'
									options={creatureGenderOptions}
									defaultValue=''
								/>
							</Field>
							<Field
								name='specifics.age'
								width='digit'
								label='age'
							>
								<InputNumber name='specifics.age' />
							</Field>
							<Field
								name='bio.isPun'
								label=''
								width='third'
							>
								<Checkbox
									name='bio.isPun'
									label='name is a pun'
								/>
							</Field>
						</div>

						<div className='mb-2 flex w-full flex-row items-center justify-center gap-4'>
							<Field
								name='profile.level'
								width='digit'
								label='level'
							>
								<InputNumber name='profile.level' />
							</Field>
							<Field
								name='profile.experience'
								width='digit'
								label='experience'
							>
								<InputNumber name='profile.experience' />
							</Field>
						</div>
						<progress
							className='progress progress-primary h-1 w-full md:w-1/2'
							value={watchExp}
							max={
								methods.getValues('profile.level') &&
								methods.getValues('profile.level') * 100
							}
						></progress>
						<div className='flex w-full flex-row justify-center gap-4'>
							<Field
								name='specifics.size'
								width='third'
								label='size'
							>
								<Select
									name='specifics.size'
									options={creatureSizeOptions}
									defaultValue=''
								/>
							</Field>
							<Field
								name='specifics.alignment'
								width='third'
								label='alignment'
							>
								<Select
									name='specifics.alignment'
									options={creatureAlignmentOptions}
									defaultValue=''
								/>
							</Field>
						</div>
						<div className='flex flex-row justify-center gap-4'>
							<Field
								name='status.health.current'
								label='health'
							>
								<InputNumber
									name='status.health.current'
									max={methods.getValues('status.health.max')}
								/>
							</Field>
							<Field
								name='status.spirit.current'
								label='spirit'
							>
								<InputNumber
									name='status.spirit.current'
									max={methods.getValues('status.spirit.max')}
								/>
							</Field>
						</div>

						<div className='flex w-full flex-row justify-center gap-4'>
							<Field
								name='statistics.glory'
								width='digit'
								label='glory'
							>
								<InputNumber name='statistics.glory' />
							</Field>
							<Field
								name='statistics.luck'
								width='digit'
								label='luck'
							>
								<InputNumber name='statistics.luck' />
							</Field>
							<Field
								name='statistics.destiny'
								width='digit'
								label='destiny'
							>
								<InputNumber name='statistics.destiny' />
							</Field>

							<Field
								name='status.exhaustion'
								width='digit'
								label='fatigue'
							>
								<InputNumber name='status.exhaustion' />
							</Field>
						</div>
						{(isEditor || characterById?.data?.bio.creator === user?.id) && (
							<>
								<div className='flex w-full flex-row justify-center'>
									<Field
										name='bio.isBoss'
										label=''
										width='third'
									>
										<Checkbox
											name='bio.isBoss'
											label='unique'
										/>
									</Field>
									<Field
										name='bio.isDead'
										label=''
										width='third'
									>
										<Checkbox
											name='bio.isDead'
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
													name='profile.stats.CEL'
													width='small'
													label='CEL'
												>
													<InputNumber name='profile.stats.CEL' />
												</Field>
												<Field
													name='profile.stats.AGI'
													width='small'
													label='AGI'
												>
													<InputNumber name='profile.stats.AGI' />
												</Field>
												<Field
													name='profile.stats.DEX'
													width='small'
													label='DEX'
												>
													<InputNumber name='profile.stats.DEX' />
												</Field>
											</div>
										</section>
										<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
											<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
												Constitution
											</h4>
											<div className='flex flex-row justify-center gap-2'>
												<Field
													name='profile.stats.STR'
													width='small'
													label='STR'
												>
													<InputNumber name='profile.stats.STR' />
												</Field>
												<Field
													name='profile.stats.END'
													width='small'
													label='END'
												>
													<InputNumber name='profile.stats.END' />
												</Field>
												<Field
													name='profile.stats.VIT'
													width='small'
													label='VIT'
												>
													<InputNumber name='profile.stats.VIT' />
												</Field>
											</div>
										</section>
										<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
											<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
												Perception
											</h4>
											<div className='flex flex-row justify-center gap-2'>
												<Field
													name='profile.stats.WIL'
													width='small'
													label='WIL'
												>
													<InputNumber name='profile.stats.WIL' />
												</Field>
												<Field
													name='profile.stats.INS'
													width='small'
													label='INS'
												>
													<InputNumber name='profile.stats.INS' />
												</Field>
												<Field
													name='profile.stats.SEN'
													width='small'
													label='SEN'
												>
													<InputNumber name='profile.stats.SEN' />
												</Field>
											</div>
										</section>
										<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
											<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
												Shroudness
											</h4>
											<div className='flex flex-row justify-center gap-2'>
												<Field
													name='profile.stats.CHA'
													width='small'
													label='CHA'
												>
													<InputNumber name='profile.stats.CHA' />
												</Field>
												<Field
													name='profile.stats.SOC'
													width='small'
													label='SOC'
												>
													<InputNumber name='profile.stats.SOC' />
												</Field>
												<Field
													name='profile.stats.ERU'
													width='small'
													label='ERU'
												>
													<InputNumber name='profile.stats.ERU' />
												</Field>
											</div>
										</section>
									</div>
								</Collapsible>
								<Collapsible title='change modifiers'>
									<div className='flex w-full flex-wrap items-center justify-center gap-4 pb-0 pr-0 md:flex-row'>
										<Field
											name='profile.boni.initiative'
											label='&#xb1; Initiative'
											width='digit'
										>
											<InputNumber name='profile.boni.initiative' />
										</Field>
										<Field
											name='profile.boni.ranged'
											label='&#xb1; Ranged'
											width='digit'
										>
											<InputNumber name='profile.boni.ranged' />
										</Field>
										<Field
											name='profile.boni.attack'
											label='&#xb1; Attack'
											width='digit'
										>
											<InputNumber name='profile.boni.attack' />
										</Field>
										<Field
											name='profile.boni.defense'
											label='&#xb1; Defense'
											width='digit'
										>
											<InputNumber name='profile.boni.defense' />
										</Field>

										<Field
											name='profile.boni.perception'
											label='&#xb1; Perception'
											width='digit'
										>
											<InputNumber name='profile.boni.perception' />
										</Field>
										<Field
											name='profile.boni.discretion'
											label='&#xb1; Discretion'
											width='digit'
										>
											<InputNumber name='profile.boni.discretion' />
										</Field>

										<Field
											name='profile.boni.survival'
											label='&#xb1; Survival'
											width='digit'
										>
											<InputNumber name='profile.boni.survival' />
										</Field>
										<Field
											name='profile.boni.enigms'
											label='&#xb1; Logic'
											width='digit'
										>
											<InputNumber name='profile.boni.enigms' />
										</Field>
										<Field
											name='profile.boni.speech'
											label='&#xb1; Speech'
											width='digit'
										>
											<InputNumber name='profile.boni.speech' />
										</Field>
										<Field
											name='profile.boni.trade'
											label='&#xb1; Trade'
											width='digit'
										>
											<InputNumber name='profile.boni.trade' />
										</Field>
										<Field
											name='profile.boni.performance'
											label='&#xb1; Performance'
											width='digit'
										>
											<InputNumber name='profile.boni.performance' />
										</Field>
										<Field
											name='profile.boni.initimidation'
											label='&#xb1; Intimidation'
											width='digit'
										>
											<InputNumber name='profile.boni.intimidation' />
										</Field>
										<Field
											name='profile.boni.bravery'
											label='&#xb1; Bravery'
											width='digit'
										>
											<InputNumber name='profile.boni.bravery' />
										</Field>
										<Field
											name='equipment.armorValue'
											label='&#xb1; Armor'
											width='digit'
										>
											<InputNumber name='equipment.armorValue' />
										</Field>
										<Field
											name='profile.boni.magic'
											label='&#xb1; Magic'
											width='digit'
										>
											<InputNumber name='profile.boni.magic' />
										</Field>
									</div>
								</Collapsible>
							</>
						)}

						{/* SUBMIT ------------------------------------------------- */}
						<SubmitButton
							isLoading={methods.formState.isSubmitting}
							color='accent'
							textColor='background'
							text='Update'
						/>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default CharacterEdit;
