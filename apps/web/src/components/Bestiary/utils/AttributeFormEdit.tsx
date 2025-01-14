import { LockButton } from '@/components/Buttons';
import { Field, Input, Textarea } from '@/components/RHFComponents';
import { trpc } from '@/utils/trpc';
import {
	Attribute,
	AttributeArray,
	AttributeSchema,
	CreatureAttribute,
} from '@api/lib/ZodCreature';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
	creatureId: string;
	attributes: CreatureAttribute[];
	defaultAttribute: Attribute | undefined;
	setAttributes: React.Dispatch<SetStateAction<CreatureAttribute[]>>;
};

const AttributeFormEdit = ({
	creatureId,
	attributes,
	defaultAttribute,
	setAttributes,
}: Props) => {
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
		defaultValues: defaultAttribute,
		shouldFocusError: true,
	});

	const updateAttribute = trpc.attributes.update.useMutation({
		onSuccess: () => {},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});
	const updateAttributeOnCreature = trpc.creatures.updateAttribute.useMutation({
		onSuccess: () => {
			toast.success('Attribute updated !');
			(
				document.getElementById('attribute-form-edit') as HTMLDialogElement
			).close();
			methods.reset();
		},
		onError: error => {
			if (error.shape) toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (defaultAttribute)
			methods.reset(defaultAttribute as Attribute, {
				keepDefaultValues: false,
			});
	}, [defaultAttribute]);

	const onActionSubmit = (data: Attribute) => {
		const { id, ...attribute } = data;
		updateAttribute.mutate(data as Attribute);

		const prunedAttributesArray = attributes.filter(a => a.name !== data.name);
		setAttributes([...prunedAttributesArray, attribute]);
		const attributeArray: AttributeArray = {
			id: creatureId,
			attributes: [...prunedAttributesArray, attribute],
		};
		updateAttributeOnCreature.mutate(attributeArray as AttributeArray);
	};

	if (defaultAttribute) {
		return (
			<>
				<dialog
					id={`${defaultAttribute.name}-attribute-form-edit`}
					className='modal'
				>
					<div className='modal-box bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
						<h3 className='font-grenze w-full text-center text-4xl font-bold text-purple-400'>
							Edit Attribute
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
												`${defaultAttribute.name}-attribute-form-edit`,
											) as HTMLDialogElement
										).close();
									}}
								>
									✕
								</button>
								<Field name='name'>
									<Input
										name='name'
										disabled
									/>
								</Field>
								<Field name='flavor'>
									<Input name='flavor' />
								</Field>
								<Field name='description'>
									<Textarea name='description' />
								</Field>
								<LockButton
									isLoading={updateAttribute.isPending}
									isValid={methods.formState.isValid}
									color='accent'
									textColor='stone-800'
									text='Edit Attribute'
								/>
							</form>
						</FormProvider>
						<p className='py-4 text-center text-stone-500'>
							Press <kbd className='kbd kbd-sm'>ESC</kbd> key or click on ✕
							button to close
						</p>
					</div>
				</dialog>
			</>
		);
	}
};

export default AttributeFormEdit;
