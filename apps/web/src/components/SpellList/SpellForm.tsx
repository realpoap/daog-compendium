import { spellOptions } from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ZodNewSpell } from '@api/lib/ZodSpell'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
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

	const totalCount = trpc.spells.getTotal.useQuery();
	const createSpell = trpc.spells.create.useMutation();
	let number = 0;

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

	if (totalCount.isLoading && !totalCount.data) {
		return (
			<div className='flex h-screen flex-col items-center justify-center'>
				<p>{totalCount.status}</p>
				<span className='loading loading-spinner loading-lg'></span>
			</div>
		);
	}
	// SET DEFAULT VALUES -----------------------------------------
	if (totalCount.isSuccess) {
		number = Number(totalCount.data?.number) + 1;
		console.log('spell number:', totalCount.data);
	}

	return (
		<div className='mt-sm flex flex-col items-center p-2 px-4'>
			<div className='container sticky top-10 z-10 flex min-h-[20dvh] flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					New Spell
				</h1>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit, onError)}
					className='flex w-full flex-col'
				>
					<Field name='number'>
						<InputNumber
							name='number'
							placeholder={number}
						/>
					</Field>
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
						<div className='collapse-title font-noto m-0 max-h-4 min-h-4 py-0 text-xs text-purple-400 peer-checked:hidden'>
							+ add glaise name
						</div>
						<div className={cn('collapse-content p-0 pb-0')}>
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

					{/* TYPE --------------------------------------------------- */}
					<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
						<Field
							name='type'
							width='small'
						>
							<Select
								name='type'
								options={spellOptions}
								id='type-select'
								defaultValue='default'
							/>
						</Field>
						<Field
							name='level'
							width='small'
						>
							<InputNumber name='level' />
						</Field>
					</div>

					{/* NUMBERS ------------------------------------------------ */}
					<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
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
						name='description'
						label='Description'
					>
						<Textarea
							name='description'
							placeholder='Something smart'
						/>
					</Field>

					{/* SPECS ------------------------------------------------ */}
					<div
						className='collapse mb-4'
						tabIndex={0}
					>
						<input
							type='checkbox'
							className='max-h-4 min-h-2'
						/>
						<div className='collapse-title font-noto m-0 max-h-8 min-h-4 py-2 text-xs text-purple-400 peer-checked:hidden'>
							+ details
						</div>
						<div className={cn('collapse-content p-0 pb-0')}>
							<Field name='damages'>
								<Input
									name='damages'
									type='text'
								/>
							</Field>
							<Field name='heal'>
								<Input
									name='heal'
									type='text'
								/>
							</Field>
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
							</div>
							<div className='flex w-full flex-row flex-wrap justify-center gap-x-4'>
								<Field
									name='target'
									width='small'
								>
									<Input
										name='target'
										type='text'
									/>
								</Field>
								<Field
									name='duration'
									width='small'
								>
									<Input
										name='duration'
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
						className='bg-accent font-grenze rounded-lg px-4 py-2 text-lg font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					>
						{!methods.formState.isSubmitting ? (
							<span>Create</span>
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
