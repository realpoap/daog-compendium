import { Field, Input, Textarea } from '@/components/RHFComponents';
import { trpc } from '@/utils/trpc';
import { NewAction, NewActionSchema, NewAttribute } from '@api/lib/ZodCreature';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
	setVisible: React.Dispatch<SetStateAction<boolean>>;
	setTags: React.Dispatch<SetStateAction<NewAction[]>>;
	tags: NewAction[];
};

const ActionForm = ({ setVisible, setTags, tags }: Props) => {
	const methods3 = useForm<NewAction>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewActionSchema)(data, context, options),
			);
			return zodResolver(NewActionSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	const createAction = trpc.attributes.create.useMutation({
		onSuccess: () => {
			toast.success('Action added !');
			methods3.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const onAttributeSubmit = (data: NewAttribute) => {
		createAction.mutate(data);
		setTags([...tags, data.name]);
		methods3.reset();
	};
	return (
		<>
			<dialog
				id='action-form'
				className='modal'
			>
				<div className='modal-box bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
					<FormProvider {...methods3}>
						<form
							onSubmit={e => {
								e.stopPropagation();
								e.preventDefault();
								methods3.handleSubmit(onAttributeSubmit)(e);
							}}
						>
							<button
								className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
								type='button'
								onClick={() =>
									(
										document.getElementById(
											'attribute-form',
										) as HTMLDialogElement
									).close()
								}
							>
								✕
							</button>
							<Field name='name'>
								<Input name='name' />
							</Field>
							<Field name='flavor'>
								<Input name='flavor' />
							</Field>
							<Field name='description'>
								<Textarea name='description' />
							</Field>
							<button
								type='submit'
								disabled={createAction.isPending || !setVisible}
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
					<p className='py-4 text-stone-500'>
						Press ESC key or click on ✕ button to close
					</p>
				</div>
			</dialog>
		</>
	);
};

export default ActionForm;
