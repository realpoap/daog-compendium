import {
	actionOptions,
	castingOptions,
	spellOptions,
	targetTypeOptions,
} from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ZodNewSpell } from '@api/lib/ZodSpell'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { SubmitButton } from '../Buttons';
import {
	Field,
	Input,
	InputNumber,
	Select,
	Textarea,
} from '../RHFComponents/index';
import TitleBack from '../TitleBack';
import TitleCollapse from '../TitleCollapse';

type NewSpell = z.infer<typeof ZodNewSpell>; // Types for New Spell to tRPC

const SpellForm = () => {
	const { history } = useRouter();

	const methods = useForm<NewSpell>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodNewSpell)(data, context, options),
			);
			return zodResolver(ZodNewSpell)(data, context, options);
		},
		shouldFocusError: true,
	});

	const highestSpellNumber = trpc.spells.getHighestNumber.useQuery();
	const createSpell = trpc.spells.create.useMutation({
		onSuccess: () => {
			toast.success('Spell created !');
			methods.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});
	let newSpellNumber = 0;

	const onSubmit = async (data: NewSpell) => {
		createSpell.mutate(data);
	};

	if (highestSpellNumber.isLoading && !highestSpellNumber.data) {
		return (
			<div className='flex h-[100dvh] flex-row items-center justify-center align-middle'>
				<p>Loading magic</p>
				<span className='loading loading-dots loading-sm'></span>
			</div>
		);
	}

	if (highestSpellNumber.isSuccess && highestSpellNumber.data) {
		newSpellNumber = Number(highestSpellNumber.data?._max?.number) + 1;
		console.log(newSpellNumber);
		methods.setValue('number', newSpellNumber);
	}

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title='New spell' />

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:w-2/3'
				>
					<p className='font-grenze text-center align-baseline text-2xl text-stone-500'>
						~ {newSpellNumber} ~
					</p>
					{/* TITLE -------------------------------------------------- */}
					<Field
						name='titleCommon'
						label='Name (common)'
					>
						<Input
							name='titleCommon'
							type='text'
						/>
					</Field>
					<div
						className='collapse'
						tabIndex={0}
					>
						<input
							type='checkbox'
							className='peer min-h-2'
						/>
						<TitleCollapse title='add glaise name' />
						<div
							className={cn(
								'collapse-content peer-checked:collapse-open flex flex-col items-center pb-0 pr-0',
							)}
						>
							<Field
								name='titleGlaise'
								label='Name (glaise)'
							>
								<Input
									name='titleGlaise'
									type='text'
								/>
							</Field>
						</div>
					</div>
					{/* NUMBERS ------------------------------------------------ */}
					<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
						<Field
							name='casting'
							width='small'
						>
							<Select
								name='casting'
								options={castingOptions}
								defaultValue='default'
							/>
						</Field>
						<Field
							name='action'
							width='small'
						>
							<Select
								name='action'
								options={actionOptions}
								defaultValue='default'
							/>
						</Field>
						<Field
							name='targetType'
							width='small'
							label='target'
						>
							<Select
								name='targetType'
								options={targetTypeOptions}
								defaultValue='default'
							/>
						</Field>
					</div>

					{/* TYPE --------------------------------------------------- */}
					<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
						<Field
							name='type'
							width='half'
							label='Magic domain'
						>
							<Select
								name='type'
								options={spellOptions}
								defaultValue='default'
							/>
						</Field>
					</div>

					{/* NUMBERS ------------------------------------------------ */}
					<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
						<Field
							name='level'
							width='small'
						>
							<InputNumber name='level' />
						</Field>
						<Field
							name='cost'
							width='small'
						>
							<InputNumber name='cost' />
						</Field>
						<Field
							name='difficulty'
							width='small'
						>
							<InputNumber name='difficulty' />
						</Field>
					</div>

					{/* DESC ------------------------------------------------- */}

					<Field
						name='flavor'
						label='Flavor'
					>
						<Textarea
							name='flavor'
							placeholder='How the spell looks...'
						/>
					</Field>
					<Field
						name='description'
						label='Description'
					>
						<Textarea
							name='description'
							placeholder='How the spell works...'
						/>
					</Field>

					{/* SPECS ------------------------------------------------ */}
					<div
						className='collapse mb-4'
						tabIndex={0}
					>
						<input
							type='checkbox'
							className='peer min-h-2 w-full py-0'
						/>
						<TitleCollapse title='add details' />
						<div
							className={cn(
								'collapse-content flex flex-col items-center justify-start p-0 pb-0 peer-checked:visible',
							)}
						>
							<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
								<Field
									name='damages'
									width='third'
								>
									<Input
										name='damages'
										type='text'
									/>
								</Field>
								<Field
									name='heal'
									width='third'
								>
									<Input
										name='heal'
										type='text'
									/>
								</Field>
							</div>
							<Field name='effects'>
								<Input
									name='effects'
									type='text'
								/>
							</Field>
							<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
								<Field
									name='range'
									width='small'
								>
									<Input name='range' />
								</Field>
								<Field
									name='duration'
									width='small'
								>
									<Input name='duration' />
								</Field>
								<Field
									name='target'
									width='small'
									label='Targets'
								>
									<Input
										name='target'
										type='text'
									/>
								</Field>
							</div>
							<Field name='components'>
								<Input
									name='components'
									type='text'
								/>
							</Field>
						</div>
					</div>

					{/* SUBMIT ------------------------------------------------- */}
					<SubmitButton
						isLoading={methods.formState.isSubmitting}
						color='accent'
						textColor='stone-800'
						text='Create'
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default SpellForm;
