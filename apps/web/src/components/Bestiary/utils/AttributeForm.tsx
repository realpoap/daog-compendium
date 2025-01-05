import { LockButton } from '@/components/Buttons';
import { Field, Input, Textarea } from '@/components/RHFComponents';
import { trpc } from '@/utils/trpc';
import {
	Attribute,
	AttributeSchema,
	CreatureAttribute,
	NewAttribute,
} from '@api/lib/ZodCreature';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
	creatureId: string;
	attributes: CreatureAttribute[];
	setAttributes: React.Dispatch<SetStateAction<CreatureAttribute[]>>;
};

const AttributeForm = ({ creatureId, attributes, setAttributes }: Props) => {
	const methods = useForm<Attribute>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(AttributeSchema)(data, context, options),
			);
			return zodResolver(AttributeSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	const searchAttribute = trpc.attributes.getByName.useQuery(
		methods?.getValues('name'),
		{
			enabled: methods.getValues('name') !== null && methods.formState.isValid,
		},
	);
	const createAttribute = trpc.attributes.create.useMutation({
		onSuccess: () => {},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});
	const addAttributeOnCreature = trpc.creatures.addAttribute.useMutation({
		onSuccess: () => {
			toast.success('Attribute added !');
			(document.getElementById('attribute-form') as HTMLDialogElement).close();
			methods.reset();
		},
		onError: error => {
			if (error.shape) toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		methods.setValue('id', creatureId);
	}, [methods.getValues('name'), methods.formState.isValidating]);

	const onActionSubmit = (data: Attribute) => {
		const { id, ...attribute } = data;
		const exists = attributes.find(a => a.name === data.name);
		// if exists on creature, cancel (should be present in DB)
		if (exists) {
			toast.error('Already exists on creature !');
			methods.setError('name', {
				type: 'custom',
				message: `Already present on the creature`,
			});
			return;
		}
		// if exists on DB, add that document to creature
		if (searchAttribute?.data) {
			toast('👌 Exists elsewhere, fetching...');
			const object = {
				id: creatureId,
				name: searchAttribute?.data.name,
				flavor: searchAttribute?.data.flavor,
				description: searchAttribute?.data.description,
			};
			addAttributeOnCreature.mutate(object as Attribute);
			const { id, ...attribute } = object;
			setAttributes([...attributes, attribute]);
			return;
		}
		// if does not exists on creature or DB, create new doc and associate to creature
		createAttribute.mutate(attribute as NewAttribute);
		addAttributeOnCreature.mutate(data as Attribute);
		setAttributes([...attributes, attribute]);
	};

	return (
		<>
			<dialog
				id='attribute-form'
				className='modal'
			>
				<div className='modal-box bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
					<h3 className='font-grenze w-full text-center text-4xl font-bold text-purple-400'>
						New Attribute
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
											'attribute-form',
										) as HTMLDialogElement
									).close();
								}}
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
							<LockButton
								isLoading={createAttribute.isPending}
								isValid={methods.formState.isValid}
								color='accent'
								textColor='stone-800'
								text='Add Attribute'
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

export default AttributeForm;
