import { LockButton } from '@/components/Buttons';
import Collapsible from '@/components/Collapsible';
import { Field, Input, Select, Textarea } from '@/components/RHFComponents';
import { actionTargetOptions } from '@/types/actionOptions';
import { ActionOptions } from '@/types/creatureOptions';
import { actionOptions } from '@/types/spellOptions';
import { trpc } from '@/utils/trpc';
import {
	Action,
	ActionArray,
	ActionSchema,
	NewAction,
} from '@api/lib/ZodAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
	creatureId: string;
	creatureName: string;
	actions: NewAction[];
	defaultAction: NewAction;
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
};

const ActionFormEdit = ({
	creatureId,
	creatureName,
	actions,
	defaultAction,
	setActions,
}: Props) => {
	const getAction = trpc.actions.getBySearchName.useQuery(
		defaultAction.searchName,
	);

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
		defaultValues: defaultAction,
		shouldFocusError: true,
	});

	const updateAction = trpc.actions.update.useMutation({
		onSuccess: () => {
			toast.success('Action updated !');
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const updateActionOnCreature = trpc.creatures.updateAction.useMutation({
		onSuccess: () => {},
		onError: error => {
			toast.error('Could not update creature...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (getAction.data)
			methods.reset(getAction.data as Action, { keepDefaultValues: false });
	}, [getAction.data]);

	useEffect(() => {
		if (methods.getValues('name') === defaultAction.name) return; // do not change searchName (and create new action) if name of action is unchanged (limit duplicates)
		methods.setValue(
			'searchName',
			`${methods.getValues('name')} (${creatureName})`,
		);
	}, [
		methods.getValues('name'),
		methods.formState.isValidating,
		methods.formState.isSubmitting,
	]); // name field is now DISABLED, could remove this

	const onActionSubmit = (data: Action) => {
		const { id, ...action } = data;
		updateAction.mutate(action);
		const prunedActionArray = actions.filter(
			a => a.searchName !== data.searchName,
		);
		setActions([...prunedActionArray, action]);
		const actionArray: ActionArray = {
			id: creatureId,
			actions: [...prunedActionArray, action],
		};
		updateActionOnCreature.mutate(actionArray);
		(
			document.getElementById(
				`${defaultAction.searchName}-action-form-edit`,
			) as HTMLDialogElement
		).close();
	};

	return (
		<>
			<dialog
				id={`${defaultAction.searchName}-action-form-edit`}
				className='modal'
			>
				<div className='modal-box bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
					<h3 className='font-grenze w-full text-center text-4xl font-bold text-purple-400'>
						Edit Action
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
										document.getElementById(
											`${defaultAction.searchName}-action-form-edit`,
										) as HTMLDialogElement
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
								isLoading={updateAction.isPending}
								isValid={methods.formState.isValid}
								color='accent'
								textColor='stone-800'
								text='Update Action'
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

export default ActionFormEdit;
