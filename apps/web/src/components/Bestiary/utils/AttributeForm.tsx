import { Field, Input, Select, Textarea } from '@/components/RHFComponents';
import { cn } from '@/utils/classNames';
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
import { BiSolidLock } from 'rocketicons/bi';

type Props = {
	id: string;
	attributes: CreatureAttribute[];
	setAttributes: React.Dispatch<SetStateAction<CreatureAttribute[]>>;
};

const AttributeForm = ({ id, attributes, setAttributes }: Props) => {
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

	const createAttribute = trpc.attributes.create.useMutation({
		onSuccess: () => {
			toast.success('Attribute added !');
			methods.reset();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const addAttributeOnCreature = trpc.creatures.addAttribute.useMutation({
		onSuccess: () => {
			toast.success('Attribute linked !');
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		methods.setValue('id', id);
	}, []);

	const onActionSubmit = (data: Attribute) => {
		const { id, ...attribute } = data;
		setAttributes([...attributes, attribute]);
		createAttribute.mutate(attribute as NewAttribute);
		addAttributeOnCreature.mutate(data as Attribute);
		(document.getElementById('attribute-form') as HTMLDialogElement).close();
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
							<button
								type='submit'
								disabled={
									createAttribute.isPending || !methods.formState.isValid
								}
								className='bg-accent font-cabin m-y-2 disabled:bg-accent disabled:hover:glass disabled:hover:bg-accent mt-8 flex w-2/3 cursor-pointer flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold uppercase text-stone-800 transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:opacity-100 disabled:hover:ring-0'
							>
								{!createAttribute.isPending ? (
									<span className='text-center'>
										{!methods.formState.isValid ? (
											<BiSolidLock className='icon-stone-500-lg' />
										) : (
											'Add Attribute'
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

export default AttributeForm;
