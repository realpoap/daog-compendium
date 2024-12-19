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
import { useParams, useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Field,
	Input,
	InputNumber,
	Select,
	Textarea,
} from '../RHFComponents/index';

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
	const createSpell = trpc.spells.create.useMutation();
	let newSpellNumber = 0;

	const errors = useMemo(() => methods.formState.errors, [methods.formState]);

	const onSubmit = async (data: NewSpell) => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		await createSpell.mutate(data);
		if (!createSpell.isSuccess) {
			alert('Spell creation failed.');
			return;
		}
		methods.reset();
	};

	const onError = () => {
		console.log(errors);
	};

	if (highestSpellNumber.isLoading && !highestSpellNumber.data) {
		return (
			<div className='flex h-screen flex-col items-center justify-center'>
				<p>{highestSpellNumber.status}</p>
				<span className='loading loading-spinner loading-lg'></span>
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
			<button
				className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
				onClick={() => history.go(-1)}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>
			<div className='container sticky top-10 z-10 flex h-fit flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					New Spell
				</h1>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit, onError)}
					className='flex w-full flex-col'
				>
					<p className='font-grenze text-center text-2xl text-stone-500'>
						{' '}
						~ {newSpellNumber} ~{' '}
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
							className='max-h-4 min-h-2'
						/>
						<div className='collapse-title font-noto m-0 mt-2 max-h-4 min-h-4 py-0 text-xs text-purple-400 peer-checked:hidden'>
							+ add glaise name
						</div>
						<div className={cn('collapse-content pb-0 pr-0')}>
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
						<div className='collapse-title font-noto m-0 mt-2 min-h-2 py-0 text-xs text-purple-400'>
							+ details
						</div>
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
					<button
						type='submit'
						disabled={methods.formState.isSubmitting}
						className='bg-accent font-grenze w-1/2 self-center rounded-lg px-4 py-2 text-lg font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					>
						{!methods.formState.isSubmitting ? (
							<span className='text-center'>Create</span>
						) : (
							<span className='loading loading-dots loading-md'></span>
						)}
					</button>
				</form>
			</FormProvider>
		</div>
	);
};

export default SpellForm;
