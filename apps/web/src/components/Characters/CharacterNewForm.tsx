import { useAuth } from '@/store/authContext';
import { characterSpecieOptions } from '@/types/characterOptions';
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
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewCharacterSchema)(data, context, options),
			);
			return zodResolver(NewCharacterSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		methods.setValue(
			'fullname',
			`${methods.getValues('name')} (${methods.getValues('subspecies') + ' '}${methods.getValues('species')}) - lvl ${methods.getValues('level')}`,
		);
		user?.id && methods.setValue('creator', user?.id);
		user?.id && methods.setValue('owner', user?.id);
		methods.setValue('stats', {
			CEL: 15,
			AGI: 15,
			DEX: 15,
			STR: 15,
			END: 15,
			VIT: 15,
			WIL: 15,
			INS: 15,
			SEN: 15,
			CHA: 15,
			SOC: 15,
			ERU: 15,
		});
		const levelBonus = Math.floor(methods.getValues('level') / 5);
		methods.setValue('health.max', 15 + levelBonus + 1);
		methods.setValue('health.current', 15 + levelBonus + 1);
		methods.setValue('spirit.max', 15 + levelBonus + 1);
		methods.setValue('spirit.current', 15 + levelBonus + 1);
		methods.setValue('weight.max', 7);
		methods.setValue('weight.current', 0);
	}, [methods.formState, methods.handleSubmit]);

	const onSubmit = async (data: NewCharacter) => {
		await createCharacter.mutate(data);
	};

	const watchSpecie = methods.watch('species');

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
						<Field name='name'>
							<Input
								name='name'
								type='text'
							/>
						</Field>
						<div className='flex flex-row items-center justify-center gap-4'>
							<Field
								name='species'
								width='third'
							>
								<Select
									name='species'
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
									name='subspecies'
									width='third'
									label='Sub-Species'
								>
									<Select
										name='subspecies'
										defaultValue=''
										options={
											watchSpecie === 'human'
												? ['moufflian', 'inclay']
												: watchSpecie === 'elf'
													? ['bourguignon', 'armagnac']
													: watchSpecie === 'dwarf'
														? ['durkran', 'grey']
														: watchSpecie === 'gobelin'
															? ['republican', 'royalist']
															: watchSpecie === 'gnome'
																? ['free', 'wild']
																: watchSpecie === 'orc'
																	? ['villous', 'pipourray']
																	: ['']
										}
									/>
								</Field>
							)}
							<Field
								name='level'
								width='digit'
							>
								<InputNumber name='level' />
							</Field>
						</div>
						<Field
							name='campaign'
							width='full'
							label='active campaign'
						>
							<Select
								name='campaign'
								options={campaigns}
								defaultValue=''
							/>
						</Field>
						<SubmitButton
							isLoading={methods.formState.isSubmitting}
							color='accent'
							textColor='stone-800'
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
