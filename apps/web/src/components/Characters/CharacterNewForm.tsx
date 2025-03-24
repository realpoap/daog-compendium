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
	}, [methods.formState]);

	const onSubmit = async (data: NewCharacter) => {
		await createCharacter.mutate(data);
	};

	const watchSpecie = methods.watch('species');

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='bg-background flex w-full flex-col rounded-lg p-4 shadow shadow-lg md:w-2/3'
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
					name='campaigns'
					width='full'
					label='active campaign'
				>
					<Select
						name='campaigns'
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
	);
};

export default CharacterNewForm;
