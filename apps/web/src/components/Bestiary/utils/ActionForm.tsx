import { Field, Input, Select, Textarea } from '@/components/RHFComponents';
import { ActionOptions } from '@/types/creatureOptions';
import { trpc } from '@/utils/trpc';
import {
	Action,
	ActionSchema,
	ActionWithCreatureId,
	CreatureAction,
	CreatureActionSchema,
} from '@api/lib/ZodAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

	const onActionSubmit = (data: Action) => {
		const { id, searchName, ...action } = data;
		const actionForCreate = { ...action, searchName };
		const actionForAddTo = { ...action, id };
		setActions([...actions, action]);
		createAction.mutate(actionForCreate as Action);
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
								methods.setValue('id', id);
								methods.setValue(
									'searchName',
									`${methods.getValues('name')} (${name})`,
								);
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
								<Input name='type' />
							</Field>
							<Field name='flavor'>
								<Input name='flavor' />
							</Field>
							<Field name='description'>
								<Textarea name='description' />
							</Field>
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
								<Input name='target'></Input>
							</Field>
							<Field name='range'>
								<Input name='range'></Input>
							</Field>
							<button
								type='submit'
								disabled={createAction.isPending}
								className='bg-accent font-grenze m-y-2 mt-8 flex w-2/3 flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
							>
								{!createAction.isPending ? (
									<span className='text-center'>Add</span>
								) : (
									<span className='loading loading-dots loading-md align-baseline'></span>
								)}
							</button>
						</form>
					</FormProvider>
					<p className='py-4 text-center text-stone-500'>
						Press ESC key or click on ✕ button to close
					</p>
				</div>
			</dialog>
		</>
	);
};

export default ActionForm;
