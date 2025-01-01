import {
	actionOptions,
	castingOptions,
	spellOptions,
	targetTypeOptions,
} from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ZodSpell } from '@api/lib/ZodSpell'; // resolver for RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
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

type Spell = z.infer<typeof ZodSpell>; // Types for New Spell to tRPC

const SpellEdit = () => {
	const { history } = useRouter();
	const navigate = useNavigate();

	const { id } = useParams({ strict: false });
	const utils = trpc.useUtils();

	const spellById = trpc.spells.getById.useQuery(id as string);
	const updateSpell = trpc.spells.update.useMutation({
		onSuccess: () => {
			toast.success('Spell edited !');
			utils.spells.getByNumber.invalidate();
			utils.spells.getById.invalidate();
			navigate({
				to: '/spells/$id',
				params: { id: `${spell?.number}` },
			});
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (!spellById.isSuccess) return;
		methods.reset(spellById.data as Spell);
	}, [spellById.status]);

	const methods = useForm<Spell>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodSpell)(data, context, options),
			);
			return zodResolver(ZodSpell)(data, context, options);
		},
		shouldFocusError: true,
	});

	const onSubmit = async (data: Spell) => {
		utils.spells.getByNumber.invalidate();
		updateSpell.mutate(data);
	};

	//Loading -----------------------------------------------------------------
	if (spellById.isLoading && !spellById.data) {
		return (
			<div className='font-grenze flex h-screen flex-row flex-col items-center justify-center'>
				<p>Opening spell</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define spell object data after query success
	const spell = spellById?.data;

	/////////////////////////////////////////
	// RETURN
	/////////////////////////////////////////

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			{/* Back button ------------------------------------------------- */}
			<button
				className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
				onClick={() => history.back()}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>
			<div className='container sticky top-10 z-10 flex h-fit flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					Edit : {spell?.titleCommon}
				</h1>
			</div>

			{/* Modals ------------------------------------------------- */}

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:w-2/3'
				>
					<p className='font-grenze 2xl items-center text-center text-stone-500'>
						{' '}
						~ {spell?.number} ~{' '}
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
						<div className='collapse-title font-noto m-0 ml-4 mt-2 min-h-2 py-0 text-xs text-purple-400'>
							+ add glaise name
						</div>
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
								defaultValue={spell?.casting as string}
							/>
						</Field>
						<Field
							name='action'
							width='small'
						>
							<Select
								name='action'
								options={actionOptions}
								defaultValue={spell?.action as string}
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
								defaultValue={spell?.targetType as string}
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
								defaultValue={spell?.type as string}
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
						<Textarea name='flavor' />
					</Field>
					<Field
						name='description'
						label='Description'
					>
						<Textarea name='description' />
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
						<div className='collapse-title font-noto m-0 ml-4 mt-2 min-h-2 py-0 text-xs text-purple-400'>
							+ add details
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
					<SubmitButton
						isLoading={methods.formState.isSubmitting}
						color='accent'
						textColor='stone-800'
						text='Update'
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default SpellEdit;
