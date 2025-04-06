import {
	armagnac,
	barbarian,
	bourguignon,
	durhkran,
	free,
	grey,
	halfogre,
	halfvampire,
	inclay,
	moufflian,
	pipourray,
	proschöne,
	republican,
	royalist,
	troll,
	villous,
} from '@/data/speciesProfile';
import { useAuth } from '@/store/authContext';
import { characterSpecieOptions } from '@/types/characterOptions';
import { masteriesReset, variablesReset } from '@/utils/calculateStats';
import { trpc } from '@/utils/trpc';
import { NewCharacter, NewCharacterSchema } from '@api/lib/ZodCharacter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SubmitButton } from '../Buttons';
import { Field, Input, InputNumber, Select } from '../RHFComponents';
import { Option } from '../SpellList/SelectFilter';

type Props = {
	campaigns: Option[];
};

const CharacterNewForm = ({ campaigns }: Props) => {
	const { user } = useAuth();
	const utils = trpc.useUtils();
	const createCharacter = trpc.characters.create.useMutation({
		onSuccess: () => {
			utils.characters.getAll.invalidate();
			methods.reset();
			(document.getElementById('add-char-modal') as HTMLDialogElement).close();
			toast.success('Character created !');
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				toast.error('You must be logged in');
			} else toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const methods = useForm<NewCharacter>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			const result = await zodResolver(NewCharacterSchema)(
				data,
				context,
				options,
			);
			console.dir('Validation result:', result);
			return result;
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		methods.setValue(
			'fullname',
			`${methods.getValues('bio.name')} (${methods.getValues('bio.subspecies') + ' '}${methods.getValues('bio.species')}) - lvl ${methods.getValues('profile.level')}`,
		);
		user?.id && methods.setValue('bio.creator', user?.id);
		user?.id && methods.setValue('bio.owner', user?.id);
		switch (methods.getValues('bio.subspecies')) {
			case 'moufflian':
				methods.setValue('profile.stats', moufflian.profile.statsStarting);
				methods.setValue(
					'profile.statsStarting',
					moufflian.profile.statsStarting,
				);
				break;
			case 'inclay':
				methods.setValue('profile.stats', inclay.profile.statsStarting);
				methods.setValue('profile.statsStarting', inclay.profile.statsStarting);
				break;
			case 'bourguignon':
				methods.setValue(
					'profile.statsStarting',
					bourguignon.profile.statsStarting,
				);
				break;
			case 'armagnac':
				methods.setValue(
					'profile.statsStarting',
					armagnac.profile.statsStarting,
				);
				break;
			case 'durhkran':
				methods.setValue(
					'profile.statsStarting',
					durhkran.profile.statsStarting,
				);
				break;
			case 'grey':
				methods.setValue('profile.statsStarting', grey.profile.statsStarting);
				break;
			case 'republican':
				methods.setValue(
					'profile.statsStarting',
					republican.profile.statsStarting,
				);
				break;
			case 'royalist':
				methods.setValue(
					'profile.statsStarting',
					royalist.profile.statsStarting,
				);
				break;
			case 'free':
				methods.setValue('profile.statsStarting', free.profile.statsStarting);
				break;
			case 'proschöne':
				methods.setValue(
					'profile.statsStarting',
					proschöne.profile.statsStarting,
				);
				break;
			case 'pipourray':
				methods.setValue(
					'profile.statsStarting',
					pipourray.profile.statsStarting,
				);
				break;
			case 'villous':
				methods.setValue(
					'profile.statsStarting',
					villous.profile.statsStarting,
				);
				break;
			default:
				break;
		}
		switch (methods.getValues('bio.species')) {
			case 'half-vampire':
				methods.setValue(
					'profile.statsStarting',
					halfvampire.profile.statsStarting,
				);
				break;
			case 'half-ogre':
				methods.setValue(
					'profile.statsStarting',
					halfogre.profile.statsStarting,
				);
				break;
			case 'barbarian':
				methods.setValue(
					'profile.statsStarting',
					barbarian.profile.statsStarting,
				);
				break;
			case 'troll':
				methods.setValue('profile.statsStarting', troll.profile.statsStarting);
				break;
			default:
				break;
		}
		methods.setValue('profile.variables', variablesReset);
		methods.setValue('profile.boni', variablesReset);

		const levelBonus = Math.floor(methods.getValues('profile.level') / 5);
		methods.setValue('status.health.max', 15 + levelBonus + 1);
		methods.setValue('status.health.current', 15 + levelBonus + 1);
		methods.setValue('status.spirit.max', 15 + levelBonus + 1);
		methods.setValue('status.spirit.current', 15 + levelBonus + 1);
		methods.setValue('status.weight.max', 7);
		methods.setValue('status.weight.current', 0);
		methods.setValue('status.magicLoad.max', 1 + levelBonus);
		methods.setValue('status.magicLoad.current', 0);
		methods.setValue('path', {});
		methods.setValue('masteries', masteriesReset);
		methods.setValue('specifics', { description: '', background: '' });
	}, [methods.formState]);
	methods.setValue('equipment', {});

	const onSubmit = async (data: NewCharacter) => {
		console.log('handle submit');

		await createCharacter.mutate(data);
	};

	const watchSpecie = methods.watch('bio.species');

	return (
		<dialog
			className='modal h-[100dvh] w-[100dvw]'
			id='add-char-modal'
		>
			<div className='modal-box bg-background flex flex-col items-center'>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className='flex w-full flex-col rounded-lg p-4 md:w-3/4'
					>
						<Field
							name='bio.name'
							label='Name'
						>
							<Input
								name='bio.name'
								type='text'
							/>
						</Field>
						<div className='flex flex-row items-center justify-center gap-4'>
							<Field
								name='bio.species'
								width='third'
								label='Species'
							>
								<Select
									name='bio.species'
									options={characterSpecieOptions}
									defaultValue=''
								/>
							</Field>
							{(watchSpecie === 'human' ||
								watchSpecie === 'elf' ||
								watchSpecie === 'dwarf' ||
								watchSpecie === 'gobelin' ||
								watchSpecie === 'gnome' ||
								watchSpecie === 'orc') && (
								<Field
									name='bio.subspecies'
									width='third'
									label='Sub-Species'
								>
									<Select
										name='bio.subspecies'
										defaultValue=''
										options={
											watchSpecie === 'human'
												? ['moufflian', 'inclay']
												: watchSpecie === 'elf'
													? ['bourguignon', 'armagnac']
													: watchSpecie === 'dwarf'
														? [`durhkran`, `grey`]
														: watchSpecie === 'gobelin'
															? ['republican', 'royalist']
															: watchSpecie === 'gnome'
																? ['free', 'proschöne']
																: watchSpecie === 'orc'
																	? ['villous', 'pipourray']
																	: ['']
										}
									/>
								</Field>
							)}
							<Field
								name='profile.level'
								width='digit'
								label='level'
							>
								<InputNumber
									name='profile.level'
									min='1'
									step='1'
									defaultValue='1'
								/>
							</Field>
						</div>
						<Field
							name='bio.campaign'
							width='full'
							label='active campaign'
						>
							<Select
								name='bio.campaign'
								options={campaigns}
								defaultValue=''
							/>
						</Field>
						<SubmitButton
							isLoading={methods.formState.isSubmitting}
							color='accent'
							textColor='background'
							text='Create'
						/>
					</form>
				</FormProvider>
				<div className='flex flex-row justify-between'>
					<p className='text-neutral py-4'>
						Press ESC key or click outside to close
					</p>
				</div>
			</div>
			<form
				method='dialog'
				className='modal-backdrop text-neutral-content'
			>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default CharacterNewForm;
