import { creatureHabitatOptions } from '@/types/creatureOptions';
import {
	componentTypeOptions,
	damageTypeOptions,
	itemArmorOptions,
	itemMaterialOptions,
	itemQualityOptions,
	itemRarityOptions,
	itemTypeOptions,
	itemUsageOptions,
	mineralMaterialTypeOptions,
	organicMaterialTypeOptions,
	rangeType,
	weaponType,
} from '@/types/itemOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { NewComponent, NewComponentSchema } from '@api/lib/ZodComponent';
import { NewItem, NewItemSchema } from '@api/lib/ZodItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiAddLine } from 'rocketicons/ri';
import { SmallCircleButton, SubmitButton } from '../Buttons';
import Collapsible from '../Collapsible';
import {
	Checkbox,
	Field,
	Input,
	InputNumber,
	Select,
	Textarea,
} from '../RHFComponents';
import MultiSelect from '../RHFComponents/MultiSelect';
import StatsForm from '../StatsForm';
import TitleBack from '../TitleBack';

const NewItemPage = () => {
	const { history } = useRouter();

	const utils = trpc.useUtils();

	const [radioType, setRadioType] = useState('');
	const [nameField, setNameField] = useState('');
	const [nameArray, setNameArray] = useState<string[]>([]);
	const [inflictTypes, setInflictTypes] = useState<string[]>([]);
	const [resistTypes, setResistTypes] = useState<string[]>([]);
	const [habitatTypes, setHabitatTypes] = useState<string[]>([]);

	const createItem = trpc.items.create.useMutation({
		onSuccess: () => {
			toast.success('Item created !');
			utils.items.getById.invalidate();
			history.go(-1);
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const createComponent = trpc.components.create.useMutation({
		onSuccess: () => {
			toast.success('Component created !');
			utils.items.getById.invalidate();
			history.go(-1);
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const methods = useForm<NewItem>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewItemSchema)(data, context, options),
			);
			return zodResolver(NewItemSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	const methods2 = useForm<NewComponent>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewComponentSchema)(data, context, options),
			);
			return zodResolver(NewComponentSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		//UPDATE NAME ARRAY
		if (nameArray[0] !== null || nameArray[0] !== undefined) {
			methods.setValue('name', nameArray);
		} else {
			methods.setValue('name', nameArray);
		}
		if (methods.getValues('isCritical') === undefined)
			methods.setValue('isCritical', false);
		const searchNameEdit = `${methods.getValues('name')[0]} - ${methods.getValues('materialType')} (${methods.getValues('quality')})}`;
		methods.setValue('searchName', searchNameEdit);
		//UPDATE INFLICT TYPES
		methods.setValue('inflictType', inflictTypes);
		//UPDATE RESIST TYPES
		methods.setValue('resistType', resistTypes);
		//DURABILITY
		methods.setValue('durability', methods.getValues('maxDurability'));
	}, [methods.formState, inflictTypes, resistTypes]);

	useEffect(() => {
		//UPDATE NAME ARRAY
		if (nameArray[0] !== null) {
			methods2.setValue('name', nameArray);
		}
		console.log(methods2.getValues('habitat'));
		console.log(methods2.getValues('toxicity'));
		if (methods2.getValues('toxicity') === undefined)
			methods2.setValue('toxicity', '');
		const searchNameEdit = `${methods2.getValues('name')[0]} - ${methods2.getValues('componentType')} (${methods2.getValues('rarity')})`;
		methods2.setValue('searchName', searchNameEdit);
		//UPDATE INFLICT TYPES
		//methods2.setValue('habitat', habitatTypes);
	}, [methods2.formState, habitatTypes]);

	const onItemSubmit = async (data: NewItem) => {
		if (radioType === 'item') createItem.mutate(data as NewItem);
	};
	const onComponentSubmit = async (data: NewComponent) => {
		if (radioType === 'component') createComponent.mutate(data as NewComponent);
	};

	// ADDING NAMES
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
		setNameArray([...nameArray, nameField]);
		setNameField('');
	};

	const watchItemType = methods.watch('itemType');
	const watchMaterial = methods.watch('material');
	const watchMaterialType = methods.watch('materialType');
	const watchUsage = methods.watch('usage');
	const watchQuality = methods.watch('quality');
	const watchComponentType = methods2.watch('componentType');
	const watchToxic = methods2.watch('toxic');

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title='New item' />
			{/* RADIO TYPE */}
			<>
				<legend className='font-grenze text-neutral mb-2 text-2xl'>
					Select the type of item
				</legend>
				<div className='flex w-full flex-row items-center gap-2 md:w-1/2'>
					<div className='card flex w-full flex-col items-center rounded-xl bg-stone-700 p-2'>
						<input
							className={cn(
								'label checkbox checkbox-primary peer cursor-pointer',
							)}
							defaultChecked={false}
							type='radio'
							value={'item'}
							name='radio-type'
							id={'radio-item'}
							onChange={e => setRadioType(e.target.value)}
						/>
						<label
							htmlFor={'radio-item'}
							className='label text-sm'
						>
							Item
						</label>
					</div>
					<div className='card flex w-full flex-col items-center rounded-xl bg-stone-700 p-2'>
						<input
							className={cn(
								'label checkbox checkbox-primary peer cursor-pointer',
							)}
							defaultChecked={false}
							type='radio'
							value={'component'}
							name='radio-type'
							id={'radio-component'}
							onChange={e => setRadioType(e.target.value)}
						/>
						<label
							htmlFor={'radio-item'}
							className='label text-sm'
						>
							Component
						</label>
					</div>
				</div>
				<div className='my-2 flex gap-1'>
					{nameArray.map((n, index) => (
						<span
							key={n}
							className='badge font-cabin bg-primary inline-flex cursor-pointer border-0 text-center align-middle font-semibold text-stone-800 hover:bg-stone-500 hover:text-red-500 md:text-lg'
							onClick={() => removeName(index)}
						>
							{n}
						</span>
					))}
				</div>
			</>

			{radioType === 'item' && (
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onItemSubmit)}
						className='flex w-full flex-col md:w-2/3'
					>
						{/* Name -------------------------------------------------- */}
						<label>
							<div className='flex h-fit w-full flex-row items-center justify-stretch gap-2'>
								<input
									id='addNameInput'
									className={cn(
										'disabled:glass input font-cabin autofill:font-cabin text-primary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-md dark:placeholder:text-neutral-content w-full rounded-md px-2 py-1 shadow-sm placeholder:italic focus:outline-none focus:ring-1 disabled:text-stone-800 dark:bg-stone-700 autofill:dark:bg-stone-700 dark:active:bg-stone-700',
										{
											'select-error': methods.formState.errors['name'],
											'ring-error': methods.formState.errors['name'],
											'ring-1': methods.formState.errors['name'],
										},
									)}
									placeholder={'You can add several names'}
									onKeyDown={handleKeyDown}
									onKeyUp={handleKeyUp}
									value={nameField}
									onChange={e => setNameField(e.target.value)}
								/>

								<SmallCircleButton onClick={addName}>
									<RiAddLine className='icon-stone-800-sm' />
								</SmallCircleButton>
							</div>
						</label>
						{methods.formState.errors['name'] && (
							<p className='text-error font-cabin pt-1 text-sm italic'>
								You must enter at least one name
							</p>
						)}
						<Field
							name='itemType'
							label='Type'
						>
							<Select
								name='itemType'
								options={itemTypeOptions}
								defaultValue={''}
							/>
						</Field>

						{/* NUMBERS ------------------------------------------------ */}
						{watchItemType === 'weapon' && (
							<>
								<div className='flex w-full flex-row justify-center gap-x-4'>
									<Field
										name='usage'
										width={watchUsage !== 'fighting' ? 'full' : 'third'}
										label='Usage'
									>
										<Select
											name='usage'
											options={itemUsageOptions}
											defaultValue={''}
										/>
									</Field>
									{watchUsage === 'fighting' && (
										<Field
											name='weaponType'
											width='third'
											label='Weapon'
										>
											<Select
												name='weaponType'
												options={weaponType}
												defaultValue={'versatile'}
											/>
										</Field>
									)}
								</div>
								<div className='flex w-full flex-row justify-center gap-x-4'>
									<Field
										name='rangeType'
										width='third'
										label='Range'
									>
										<Select
											name='rangeType'
											options={rangeType}
											defaultValue={'close'}
										/>
									</Field>
									<Field
										name='range'
										width='third'
										label='Distance'
									>
										<Input
											name='range'
											type='text'
										/>
									</Field>
								</div>
								<Field
									name='damages'
									width='third'
									label='Damages'
								>
									<Input
										name='damages'
										type='text'
									/>
								</Field>

								<Field
									name='inflictType'
									label='Damage types'
									width='half'
								>
									<MultiSelect
										name='inflictType'
										list={damageTypeOptions}
										values={inflictTypes}
										setValues={setInflictTypes}
										placeholder='Select one or several damage types'
									/>
								</Field>
								<Field
									name='isCritical'
									label='Critical'
									width='third'
								>
									<Checkbox
										name='isCritical'
										label='critical damages'
									/>
								</Field>
							</>
						)}
						{(watchItemType === 'armor' || watchItemType === 'shield') && (
							<>
								<div className='flex w-full flex-row justify-center gap-x-4'>
									<Field
										name='armorClass'
										width='small'
										label='Armor Type'
									>
										<Select
											name='armorClass'
											options={itemArmorOptions}
											defaultValue={'none'}
										/>
									</Field>
									<Field
										name='protection'
										label='Protection'
										width='digit'
									>
										<InputNumber name='protection' />
									</Field>
									<Field
										name='maxDurability'
										label='Durability'
										width='digit'
									>
										<InputNumber
											name='maxDurability'
											defaultValue={'1'}
										/>
									</Field>
									<Field
										name='isCritical'
										label='Critical'
										width='third'
									>
										<Checkbox
											name='isCritical'
											label='resist critical damages'
										/>
									</Field>
								</div>
								<Field
									name='resistType'
									label='Resisting'
									width='half'
								>
									<MultiSelect
										name='resistType'
										list={damageTypeOptions}
										values={resistTypes}
										setValues={setResistTypes}
										placeholder='Select one or several damage types'
									/>
								</Field>
							</>
						)}
						<div className='flex w-full flex-row justify-center gap-x-4'>
							<Field
								name='materialType'
								width='small'
								label='Material type'
							>
								<Select
									name='materialType'
									options={itemMaterialOptions}
									defaultValue={''}
								/>
							</Field>
							<Field
								name='material'
								width='small'
								label='Material'
							>
								<Select
									name='material'
									options={
										watchMaterialType === 'organic'
											? ['', ...organicMaterialTypeOptions]
											: ['', ...mineralMaterialTypeOptions]
									}
									defaultValue={''}
								/>
							</Field>
							<Field
								name='materialSubType'
								width='small'
								label='Sub-type'
							>
								<Select
									name='materialSubType'
									options={
										watchMaterial === 'leather'
											? ['', 'boiled']
											: watchMaterial === 'bronze'
												? ['', 'sick']
												: watchMaterial === 'scales'
													? ['', 'fire']
													: watchMaterial === 'crystal'
														? ['', 'moon', 'onyx', 'jade']
														: watchMaterial === 'iron'
															? ['', 'blood', 'black']
															: watchMaterial === 'steel'
																? ['', 'damascus', 'anvil', 'king']
																: watchMaterial === 'silver'
																	? ['', 'witch', 'gardonium']
																	: watchMaterial === 'bone'
																		? ['', 'magical', 'mycellyum']
																		: watchMaterial === 'wood'
																			? ['', 'enchanted']
																			: watchMaterial === 'stone'
																				? ['', 'flint', 'granit', 'volcanic']
																				: watchMaterial === 'soil'
																					? ['', 'argile', 'ceramic']
																					: watchMaterial === 'gold'
																						? ['', 'cursed', 'pale']
																						: watchMaterial === 'dragon'
																							? ['', 'ancient']
																							: ['']
									}
									defaultValue={''}
								/>
							</Field>
						</div>
						<Collapsible
							title={`details (current quality: ${watchQuality ?? 'common'})`}
						>
							<div className='flex w-full flex-row items-center justify-center gap-8'>
								<Field
									name='quality'
									width='third'
									label='Quality'
								>
									<Select
										name='quality'
										options={itemQualityOptions}
										defaultValue={'common'}
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
										defaultValue={'common'}
									/>
								</Field>
							</div>
							<div className='flex w-full flex-col justify-start'>
								<Field
									name='description'
									label='Description'
								>
									<Textarea
										name='description'
										placeholder='The obscure legend of this artifact enfolds...'
									/>
								</Field>
								<Field
									name='properties'
									label='Properties'
								>
									<Textarea
										name='properties'
										placeholder='The craftmanship or the magic imbued give this object curious properties...'
									/>
								</Field>
							</div>

							<div className='ml-auto flex w-full flex-col items-center justify-center md:flex-row'>
								<Field
									name='isFood'
									label=''
									width='third'
								>
									<Checkbox
										name='isFood'
										label='Consumable'
									/>
								</Field>
								<Field
									name='isRelic'
									label=''
									width='third'
								>
									<Checkbox
										name='isRelic'
										label='Relic'
									/>
								</Field>
							</div>
						</Collapsible>

						<div className='flex w-full flex-row justify-center gap-x-4 align-baseline'>
							<Field
								name='magicProtection'
								label='Magic Protection'
								width='digit'
							>
								<InputNumber name='magicProtection' />
							</Field>
							<Field
								name='magicWeight'
								label='Magic Burden'
								width='digit'
							>
								<InputNumber name='magicWeight' />
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

						<Collapsible title='constraints (advanced)'>
							<StatsForm />
						</Collapsible>

						{/* SUBMIT ------------------------------------------------- */}
						<SubmitButton
							isLoading={methods.formState.isSubmitting}
							color='accent'
							textColor='stone-800'
							text='Create'
						/>
					</form>
				</FormProvider>
			)}

			{radioType === 'component' && (
				<FormProvider {...methods2}>
					<form
						onSubmit={methods2.handleSubmit(onComponentSubmit)}
						className='flex w-full flex-col md:w-2/3'
					>
						{/* Name -------------------------------------------------- */}
						<label>
							<div className='flex h-fit w-full flex-row items-center justify-stretch gap-2'>
								<input
									id='addNameInput'
									className={cn(
										'disabled:glass input font-cabin autofill:font-cabin text-primary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-md dark:placeholder:text-neutral-content w-full rounded-md px-2 py-1 shadow-sm placeholder:italic focus:outline-none focus:ring-1 disabled:text-stone-800 dark:bg-stone-700 autofill:dark:bg-stone-700 dark:active:bg-stone-700',
										{
											'select-error': methods2.formState.errors['name'],
											'ring-error': methods2.formState.errors['name'],
											'ring-1': methods2.formState.errors['name'],
										},
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
						{methods2.formState.errors['name'] && (
							<p className='text-error font-cabin pt-1 text-sm italic'>
								You must enter at least one name
							</p>
						)}
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
								defaultValue=''
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
								defaultValue=''
							/>
						</Field>

						<Collapsible title={`Details`}>
							<div className='flex w-full flex-row items-center justify-center gap-8'></div>
							{(watchComponentType === 'fungus' ||
								watchComponentType === 'plant') && (
								<Field
									name='habitat'
									label='Habitat'
								>
									<MultiSelect
										name='habitat'
										list={creatureHabitatOptions}
										values={habitatTypes}
										setValues={setHabitatTypes}
										placeholder='Select one or several habitat'
									/>
								</Field>
							)}
							<Field
								name='description'
								label='Description'
							>
								<Textarea
									name='description'
									placeholder='The obscure legend of this artifact enfolds...'
								/>
							</Field>
							<div className='flex w-full flex-col justify-center md:flex-row'>
								<Field
									name='isFood'
									label=''
									width='third'
								>
									<Checkbox
										name='isFood'
										label='Consumable'
									/>
								</Field>
								<Field
									name='toxic'
									label=''
									width='third'
								>
									<Checkbox
										name='toxic'
										label='Toxic'
									/>
								</Field>
							</div>
							{watchToxic && (
								<div>
									<Field
										name='toxicity'
										label='Toxicity'
									>
										<Textarea
											name='toxicity'
											placeholder=''
										/>
									</Field>
								</div>
							)}
						</Collapsible>
						<fieldset className='fieldset mb-4 flex flex-col items-center md:items-center'>
							<div className='flex flex-col'>
								<legend className='font-grenze text-neutral text-2xl'>
									Usages :
								</legend>
								<p className='font-cabin text-neutral'>
									Check all that applies
								</p>
							</div>
							<div className='-ml-16 flex flex-col items-start gap-0 md:ml-0 md:flex-row md:items-center md:gap-4'>
								<Field
									name='uses.ointment'
									label=''
									width='third'
								>
									<Checkbox
										name='uses.ointment'
										label='Ointment'
									/>
								</Field>
								<Field
									name='uses.potion'
									label=''
									width='third'
								>
									<Checkbox
										name='uses.potion'
										label='Potion'
									/>
								</Field>
								<Field
									name='uses.extract'
									label=''
									width='third'
								>
									<Checkbox
										name='uses.extract'
										label='Extract'
									/>
								</Field>
								<Field
									name='uses.catalyst'
									label=''
									width='third'
								>
									<Checkbox
										name='uses.catalyst'
										label='Catalyst'
									/>
								</Field>
							</div>
						</fieldset>

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
							isLoading={methods2.formState.isSubmitting}
							color='accent'
							textColor='stone-800'
							text='Create'
						/>
					</form>
				</FormProvider>
			)}
		</div>
	);
};

export default NewItemPage;
