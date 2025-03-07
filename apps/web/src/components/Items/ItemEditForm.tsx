import {
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
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { StatProfil } from '@api/lib/ZodCreature';
import { Item, ItemSchema } from '@api/lib/ZodItem';
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
import MultiSelect from '../RHFComponents/MultiSelect';
import StatsForm from '../StatsForm';
import TitleBack from '../TitleBack';

type Props = {
	id: string;
};

const ItemEditForm = ({ id }: Props) => {
	const { history } = useRouter();
	const utils = trpc.useUtils();

	const [nameField, setNameField] = useState('');
	const [nameArray, setNameArray] = useState<string[]>([]);
	const [inflictTypes, setInflictTypes] = useState<string[]>([]);
	const [resistTypes, setResistTypes] = useState<string[]>([]);

	const itemById = trpc.items.getById.useQuery(id);
	const updateItem = trpc.items.update.useMutation({
		onSuccess: () => {
			toast.success('Item edited !');
			utils.items.getById.invalidate();
			history.go(-1);
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const methods = useForm<Item>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ItemSchema)(data, context, options),
			);
			return zodResolver(ItemSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		if (!itemById.data) return;
		setNameArray(itemById.data.name);
		methods.reset(itemById.data as Item);
		methods.setValue('name', ['']);
		//UPDATE INFLICT TYPES
		setInflictTypes(itemById.data.inflictType);
		methods.setValue('inflictType', itemById.data.inflictType);
		//UPDATE RESIST TYPES
		setResistTypes(itemById.data.resistType);
		methods.setValue('resistType', itemById.data.resistType);
	}, [itemById.data]);

	useEffect(() => {
		//UPDATE NAME ARRAY
		if (nameArray[0] !== null) {
			methods.setValue('name', nameArray);
		}
		const searchNameEdit = `${methods.getValues('name')[0]} - ${methods.getValues('materialType')} (${methods.getValues('quality')})}`;
		methods.setValue('searchName', searchNameEdit);
		//UPDATE INFLICT TYPES
		methods.setValue('inflictType', inflictTypes);
		//UPDATE RESIST TYPES
		methods.setValue('resistType', resistTypes);
		//DURABILITY
		methods.setValue('durability', methods.getValues('maxDurability'));
		//CONSTRAINTS
		const constraints = methods.getValues('constraints');
		if (constraints) {
			Object.entries(constraints).map(([k, v]) => {
				if (v === null) {
					constraints[k as keyof StatProfil] = 0;
				}
			});
			methods.setValue('constraints', constraints);
		}
	}, [methods.formState, inflictTypes, resistTypes]);

	const watchItemType = methods.watch('itemType');
	const watchMaterial = methods.watch('material');
	const watchMaterialType = methods.watch('materialType');
	const watchUsage = methods.watch('usage');
	const watchQuality = methods.watch('quality');

	const onSubmit = async (data: Item) => {
		utils.items.getById.invalidate();
		updateItem.mutate(data);
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
	if (itemById.isLoading && !itemById.data) {
		return (
			<div className='font-grenze flex h-screen flex-col items-center justify-center'>
				<p>Loading item</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define item object data after query success
	const item = itemById?.data;

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
						name='itemType'
						label='Type'
					>
						<Select
							name='itemType'
							options={itemTypeOptions}
							defaultValue={item?.itemType as string}
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
										defaultValue={(item?.usage as string) ?? ''}
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
											defaultValue={(item?.weaponType as string) ?? ''}
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
										defaultValue={(item?.rangeType as string) ?? 'close'}
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
							<div className='flex flex-row justify-center gap-4'>
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
									name='isCritical'
									label='Critical'
									width='third'
								>
									<Checkbox
										name='isCritical'
										label='critical damages'
									/>
								</Field>
							</div>
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
										defaultValue={(item?.rangeType as string) ?? 'none'}
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
							label='MaterialType'
						>
							<Select
								name='materialType'
								options={itemMaterialOptions}
								defaultValue={item?.materialType as string}
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
								defaultValue={item?.materialType as string}
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
															? ['', 'damascus', 'anvil', 'gardonium']
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
								defaultValue={item?.materialType as string}
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
									defaultValue={(item?.quality as string) ?? 'common'}
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
						</div>
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
								name='isRelic'
								label='Relic'
								width='third'
							>
								<Checkbox
									name='isRelic'
									label='is a relic'
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
						text='Update'
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default ItemEditForm;
