import { componentTypeOptions, itemRarityOptions } from '@/types/itemOptions';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Component, ComponentSchema } from '@api/lib/ZodComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiAddLine } from 'rocketicons/ri';
import { SubmitButton } from '../Buttons';
import Collapsible from '../Collapsible';
import {
	Checkbox,
	Field,
	Input,
	InputNumber,
	Select,
	Textarea,
} from '../RHFComponents';
import TitleBack from '../TitleBack';

type Props = {
	id: string;
};

const ComponentEditForm = ({ id }: Props) => {
	const { history } = useRouter();
	const utils = trpc.useUtils();

	const [nameField, setNameField] = useState('');
	const [nameArray, setNameArray] = useState<string[]>([]);
	const [habitatTypes, setHabitatTypes] = useState<string[]>([]);

	const componentById = trpc.components.getById.useQuery(id);
	const updateComponent = trpc.components.update.useMutation({
		onSuccess: () => {
			toast.success('Item edited !');
			utils.components.getById.invalidate();
			history.go(-1);
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const methods = useForm<Component>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ComponentSchema)(data, context, options),
			);
			return zodResolver(ComponentSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		if (!componentById.isSuccess) return;
		setNameArray(componentById.data.name);
		methods.reset(componentById.data as Component);
		methods.setValue('name', ['']);
		//UPDATE HABITAT TYPES
		setHabitatTypes(componentById.data.habitat);
		methods.setValue('habitat', componentById.data.habitat);
	}, [componentById.data]);

	useEffect(() => {
		//UPDATE NAME ARRAY
		if (nameArray[0] !== null) {
			methods.setValue('name', nameArray);
		}
		const searchNameEdit = `${methods.getValues('name')[0]} - ${methods.getValues('componentType')} (${methods.getValues('rarity')})`;
		methods.setValue('searchName', searchNameEdit);
		//UPDATE INFLICT TYPES
		methods.setValue('habitat', methods.getValues('habitat'));
	}, [methods.formState, habitatTypes]);

	const watchToxic = methods.watch('toxic');

	const onSubmit = async (data: Component) => {
		utils.components.getById.invalidate();
		updateComponent.mutate(data);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== ',' || e.code !== 'Comma') return;
		const value = (e.target as HTMLInputElement).value;
		if (!value.trim()) return;
		setNameArray([...nameArray, value]);
		(e.target as HTMLInputElement).value = '';
	};

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.key !== ',' || e.code !== 'Comma') return;
		(e.target as HTMLInputElement).value = '';
	};

	const removeName = (index: number) => {
		setNameArray(nameArray.filter((_el, i) => i !== Number(index)));
	};

	const addName = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setNameArray([...nameArray, capitalizeFirstLetter(nameField)]);
		setNameField('');
	};

	//Loading -----------------------------------------------------------------
	if (componentById.isLoading && !componentById.data) {
		return (
			<div className='font-grenze flex h-screen flex-col items-center justify-center'>
				<p>Loading item</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define item object data after query success
	const item = componentById?.data;

	/////////////////////////////////////////
	// RETURN
	/////////////////////////////////////////

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={item?.name !== undefined ? item?.name[0] : 'Edit'} />{' '}
			<div className='my-2 flex gap-1'>
				{nameArray.map((n, index) => (
					<span
						key={`${item?.id}-${n}`}
						className='badge font-cabin bg-primary inline-flex cursor-pointer border-0 text-center align-middle font-semibold text-stone-800 hover:bg-stone-500 hover:text-red-500 md:text-lg'
						onClick={() => removeName(index)}
					>
						{n}
					</span>
				))}
			</div>
			{/* Modals ------------------------------------------------- */}
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:w-2/3'
				>
					{/* Name -------------------------------------------------- */}
					<label>
						<div className='flex h-fit w-full flex-row items-center justify-stretch gap-2'>
							<input
								id='addNameInput'
								className={cn(
									'disabled:glass font-cabin autofill:font-cabin text-primary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-md w-full rounded-md px-2 py-1 shadow-sm placeholder:italic focus:outline-none focus:ring-1 disabled:text-stone-800 dark:bg-stone-700 dark:placeholder:text-stone-400 autofill:dark:bg-stone-700 dark:active:bg-stone-700',
								)}
								placeholder={'You can add several names'}
								onKeyDown={handleKeyDown}
								onKeyUp={handleKeyUp}
								value={nameField}
								onChange={e => setNameField(e.target.value)}
							/>
							<button
								className='btn btn-circle btn-accent btn-xs'
								onClick={addName}
							>
								<RiAddLine className='icon-stone-800-sm' />
							</button>
						</div>
					</label>
					<Field
						name='scienceName'
						label='Scientific Name'
					>
						<Input name='scienceName' />
					</Field>
					<Field
						name='itemType'
						label='Type'
					>
						<Select
							name='componentType'
							options={componentTypeOptions}
							defaultValue={item?.componentType as string}
						/>
					</Field>
					<Field
						name='rarity'
						width='third'
						label='Rarity'
					>
						<Select
							name='rarity'
							options={itemRarityOptions}
							defaultValue={(item?.rarity as string) ?? 'common'}
						/>
					</Field>

					<Collapsible title={`description`}>
						<div className='flex w-full flex-row items-center justify-center gap-8'></div>
						<Field
							name='description'
							label='Description'
						>
							<Textarea
								name='description'
								placeholder='The obscure legend of this artifact enfolds...'
							/>
						</Field>
						<div className='ml-auto flex w-full flex-col justify-center md:flex-row'>
							<Field
								name='isFood'
								label='Food'
								width='third'
							>
								<Checkbox
									name='isFood'
									label='can be consumed'
								/>
							</Field>
							<Field
								name='toxic'
								label='Toxic'
								width='third'
							>
								<Checkbox
									name='toxic'
									label='is toxic'
								/>
							</Field>
						</div>
						{watchToxic && (
							<div>
								<Field
									name='toxicity'
									label='Toxicity'
								>
									<Textarea name='toxicity' />
								</Field>
							</div>
						)}
					</Collapsible>
					<div className='flex flex-row gap-2'>
						<Field
							name='uses.ointment'
							label='Ointment'
							width='third'
						>
							<Checkbox
								name='uses.ointment'
								label=''
							/>
						</Field>
						<Field
							name='uses.potion'
							label='Potion'
							width='third'
						>
							<Checkbox
								name='uses.potion'
								label=''
							/>
						</Field>
						<Field
							name='uses.extract'
							label='Extract'
							width='third'
						>
							<Checkbox
								name='uses.extract'
								label=''
							/>
						</Field>
						<Field
							name='uses.catalyst'
							label='Catalyst'
							width='third'
						>
							<Checkbox
								name='uses.catalyst'
								label=''
							/>
						</Field>
					</div>

					<div className='flex w-full flex-row justify-center gap-x-4 align-baseline'>
						<Field
							name='weight'
							label='Weight'
							width='digit'
						>
							<InputNumber
								name='weight'
								step={'0.1'}
							/>
						</Field>
						<Field
							name='value'
							label='Value (MA)'
							width='digit'
						>
							<InputNumber name='value' />
						</Field>
						<Field
							name='valueWeight'
							label='Value/Weight'
							width='digit'
						>
							<InputNumber
								name='valueWeight'
								step={'0.1'}
							/>
						</Field>
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

export default ComponentEditForm;
