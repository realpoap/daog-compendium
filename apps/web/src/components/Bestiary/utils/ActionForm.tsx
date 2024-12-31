import { Field, Input, Select, Textarea } from '@/components/RHFComponents';
import { actionTargetOptions } from '@/types/actionOptions';
import { ActionOptions } from '@/types/creatureOptions';
import { actionOptions } from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import {
	Action,
	ActionSchema,
	ActionWithCreatureId,
	CreatureAction,
	NewAction,
} from '@api/lib/ZodAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiSolidLock } from 'rocketicons/bi';
import { GiPadlock, GiTripleLock } from 'rocketicons/gi';

type Props = {
	id: string;
	name: string;
	actions: CreatureAction[];
	setActions: React.Dispatch<SetStateAction<CreatureAction[]>>;
};

const ActionForm = ({ id, name, actions, setActions }: Props) => {
	const methods = useForm<Action>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ActionSchema)(data, context, options),
			);
			return zodResolver(ActionSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	const createAction = trpc.actions.create.useMutation({
		onSuccess: () => {
			toast.success('Action added !');
			methods.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const addActionOnCreature = trpc.creatures.addAction.useMutation({
		onSuccess: () => {
			toast.success('Action linked !');
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		methods.setValue('id', id);
		methods.setValue('searchName', `${methods.getValues('name')} (${name})`);
	}, []);

	const onActionSubmit = (data: Action) => {
		const { id, searchName, ...action } = data;
		const actionForCreate = { ...action, searchName };
		const actionForAddTo = { ...action, id };
		setActions([...actions, action]);
		createAction.mutate(actionForCreate as NewAction);
		addActionOnCreature.mutate(actionForAddTo as ActionWithCreatureId);
		(document.getElementById('action-form') as HTMLDialogElement).close();
	};
	return (
		<>
			<dialog
				id='action-form'
				className='modal'
			>
				<div className='modal-box bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
					<h3 className='font-grenze w-full text-center text-4xl font-bold text-purple-400'>
						New Action
					</h3>
					<FormProvider {...methods}>
						<form
							className='flex flex-col items-center justify-start'
							onSubmit={e => {
								e.stopPropagation();
								e.preventDefault();

								methods.handleSubmit(onActionSubmit)(e);
							}}
						>
							<button
								className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
								type='button'
								onClick={e => {
									e.stopPropagation();
									(
										document.getElementById('action-form') as HTMLDialogElement
									).close();
								}}
							>
								✕
							</button>
							<Field name='name'>
								<Input name='name' />
							</Field>
							<Field name='action'>
								<Select
									name='action'
									options={ActionOptions}
									defaultValue=''
								/>
							</Field>
							<Field name='type'>
								<Select
									name='type'
									options={actionOptions}
									defaultValue=''
								/>
							</Field>
							<Field name='flavor'>
								<Input name='flavor' />
							</Field>
							<Field name='description'>
								<Textarea name='description' />
							</Field>
							<div
								className='collapse'
								tabIndex={0}
							>
								<input
									type='checkbox'
									className='peer min-h-2'
								/>
								<div className='collapse-title font-noto m-0 ml-[5vw] mt-2 min-h-2 py-0 text-xs text-purple-400'>
									+ modifiers
								</div>
								<div
									className={cn(
										'collapse-content peer-checked:collapse-open flex w-full flex-wrap items-center justify-center gap-4 pb-0 pr-0 md:flex-row',
									)}
								>
									<Field name='effects'>
										<Textarea name='effects' />
									</Field>
									<Field name='damages'>
										<Input name='damages'></Input>
									</Field>
									<Field name='heal'>
										<Input name='heal'></Input>
									</Field>
									<Field name='target'>
										<Select
											name='target'
											options={actionTargetOptions}
											defaultValue=''
										/>
									</Field>
									<Field name='range'>
										<Input name='range'></Input>
									</Field>
								</div>
							</div>

							<button
								type='submit'
								disabled={createAction.isPending || !methods.formState.isValid}
								className='bg-accent font-cabin m-y-2 disabled:bg-accent disabled:hover:glass disabled:hover:bg-accent mt-8 flex w-2/3 cursor-pointer flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold uppercase text-stone-800 transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:opacity-100 disabled:hover:ring-0'
							>
								{!createAction.isPending ? (
									<span className='text-center'>
										{!methods.formState.isValid ? (
											<BiSolidLock className='icon-stone-500-lg' />
										) : (
											'Add Action'
										)}
									</span>
								) : (
									<span className='loading loading-dots loading-md align-baseline'></span>
								)}
							</button>
						</form>
					</FormProvider>
					<p className='py-4 text-center text-stone-500'>
						Press <kbd className='kbd kbd-sm'>ESC</kbd> key or click on ✕ button
						to close
					</p>
				</div>
			</dialog>
		</>
	);
};

export default ActionForm;
