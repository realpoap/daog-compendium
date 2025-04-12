import { useAuth } from '@/store/authContext';
import { characterSpecieOptions } from '@/types/characterOptions';
import { setupBasicCharacterFormValues } from '@/utils/setCharacterFormData';
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
		setupBasicCharacterFormValues(methods, user);
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
