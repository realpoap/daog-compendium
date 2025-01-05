import { LockButton } from '@/components/Buttons';
import Collapsible from '@/components/Collapsible';
import { Field, Input, Select, Textarea } from '@/components/RHFComponents';
import { actionTargetOptions } from '@/types/actionOptions';
import { ActionOptions } from '@/types/creatureOptions';
import { actionOptions } from '@/types/spellOptions';
import { trpc } from '@/utils/trpc';
import { Action, ActionSchema, NewAction } from '@api/lib/ZodAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
	creatureId: string;
	name: string;
	actions: NewAction[];
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
};

const ActionForm = ({ creatureId, name, actions, setActions }: Props) => {
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

	const searchAction = trpc.actions.getBySearchName.useQuery(
		methods.getValues('searchName'),
		{ enabled: methods.getValues('searchName') && methods.formState.isValid },
	);
	const createAction = trpc.actions.create.useMutation({
		onSuccess: () => {},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});
	const addActionOnCreature = trpc.creatures.addAction.useMutation({
		onSuccess: () => {
			toast.success('Action added !');
			(document.getElementById('action-form') as HTMLDialogElement).close();
			methods.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		methods.setValue('id', creatureId);
		methods.setValue('searchName', `${methods.getValues('name')} (${name})`);
	}, [
		methods.getValues('name'),
		methods.formState.isValidating,
		methods.formState.isSubmitting,
	]);

	const onActionSubmit = (data: Action) => {
		const { id, ...action } = data;
		const exists = actions.find(a => a.searchName === data.searchName);
		// if exists on creature, cancel (should be present in DB)
		if (exists) {
			toast.error('The creature can already do this !');
			methods.setError('name', {
				type: 'custom',
				message: `Already present on the creature`,
			});
			return;
		}
		// if exists on DB, add that document to creature
		if (searchAction?.data) {
			toast('👌 Exists elsewhere, fetching...');
			const object = searchAction.data;
			object.id = creatureId;
			addActionOnCreature.mutate(object as Action);
			const { id, ...action } = object;
			setActions([...actions, action]);
			return;
		}
		// if does not exists on creature or DB, create new doc and associate to creature
		createAction.mutate(action as NewAction);
		addActionOnCreature.mutate(data);
		setActions([...actions, action]);
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
							<Field name='target'>
								<Select
									name='target'
									options={actionTargetOptions}
									defaultValue=''
								/>
							</Field>

							<Field name='description'>
								<Textarea name='description' />
							</Field>
							<Field name='damages'>
								<Input name='damages'></Input>
							</Field>
							<Collapsible title='add details'>
								<Field name='effects'>
									<Textarea name='effects' />
								</Field>

								<Field name='heal'>
									<Input name='heal'></Input>
								</Field>
								<Field name='range'>
									<Input name='range'></Input>
								</Field>
								<Field name='flavor'>
									<Input name='flavor' />
								</Field>
							</Collapsible>

							<LockButton
								isLoading={createAction.isPending}
								isValid={methods.formState.isValid}
								color='accent'
								textColor='stone-800'
								text='Add Action'
							/>
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
