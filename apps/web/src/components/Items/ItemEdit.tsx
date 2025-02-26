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
import { trpc } from '@/utils/trpc';
import { Item, ItemSchema } from '@api/lib/ZodItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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

const ItemEdit = () => {
	const { history } = useRouter();
	//const navigate = useNavigate();

	const { id } = useParams({ strict: false });
	const utils = trpc.useUtils();

	const [nameArray, setNameArray] = useState<string[]>([]);
	const [inflictTypes, setInflictTypes] = useState<string[]>([]);
	const [resistTypes, setResistTypes] = useState<string[]>([]);

	const itemById = trpc.items.getById.useQuery(id as string);
	const updateItem = trpc.items.update.useMutation({
		onSuccess: () => {
			toast.success('item edited !');
			utils.items.getById.invalidate();
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
		if (!itemById.isSuccess) return;
		setNameArray(itemById.data.name);
		methods.reset(itemById.data as Item);
		methods.setValue('name', ['']);
	}, [itemById.status]);

	useEffect(() => {
		methods.setValue('name', nameArray);
		const searchNameEdit = `${methods.getValues('name')[0]} - ${methods.getValues('materialType')} (${methods.getValues('quality')})}`;
		methods.setValue('searchName', searchNameEdit);
	}, [methods.formState]);

	const watchItemType = methods.watch('itemType');
	const watchMaterial = methods.watch('material');
	const watchMaterialType = methods.watch('materialType');
	const watchUsage = methods.watch('usage');
	const watchQuality = methods.watch('quality');

	const onSubmit = async (data: Item) => {
		utils.items.getById.invalidate();
		updateItem.mutate(data);
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
			{/* Back button ------------------------------------------------- */}
			<button
				className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
				onClick={() => history.back()}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>
			<div className='container sticky top-10 z-10 flex h-fit flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-4xl font-bold tracking-wide text-purple-900 md:mt-8 md:text-6xl dark:text-purple-400'>
					Edit : {item?.name[0]}
				</h1>
			</div>

			{/* Modals ------------------------------------------------- */}

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:w-2/3'
				>
					{/* Name -------------------------------------------------- */}
					<Field
						name='name'
						label='Name (add)'
					>
						<Input
							name='name'
							type='text'
						/>
					</Field>
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
									<InputNumber
										name='protection'
										placeholder={0}
									/>
								</Field>
								<Field
									name='maxDurability'
									label='Durability'
									width='digit'
								>
									<InputNumber
										name='maxDurability'
										placeholder={1}
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
							name='material'
							width='small'
							label='Material'
						>
							<Select
								name='material'
								options={itemMaterialOptions}
								defaultValue={item?.material as string}
							/>
						</Field>
						<Field
							name='materialType'
							width='small'
							label='Material type'
						>
							<Select
								name='materialType'
								options={
									watchMaterial === 'organic'
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
									watchMaterialType === 'leather'
										? ['', 'boiled']
										: watchMaterialType === 'bronze'
											? ['', 'sick']
											: watchMaterialType === 'scales'
												? ['', 'fire']
												: watchMaterialType === 'crystal'
													? ['', 'moon', 'onyx']
													: watchMaterialType === 'iron'
														? ['', 'blood', 'black']
														: watchMaterialType === 'steel'
															? ['', 'damascus', 'orpal']
															: watchMaterialType === 'bone'
																? ['', 'magical', 'mycellyum']
																: watchMaterialType === 'wood'
																	? ['', 'enchanted']
																	: watchMaterialType === 'stone'
																		? ['', 'flint', 'granit']
																		: watchMaterialType === 'dragon'
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
									defaultValue={(item?.material as string) ?? 'common'}
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
									defaultValue={(item?.material as string) ?? 'common'}
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
									name='isFood'
									label='is a relic'
								/>
							</Field>
						</div>
					</Collapsible>

					<div className='align-center justify-baseline flex w-full flex-row gap-x-4'>
						<Field
							name='magicProtection'
							label='Magic Protection'
							width='digit'
						>
							<InputNumber
								name='magicProtection'
								placeholder={0}
							/>
						</Field>
						<Field
							name='magicWeight'
							label='Magic Burden'
							width='digit'
						>
							<InputNumber
								name='magicWeight'
								placeholder={0}
							/>
						</Field>
						<Field
							name='weight'
							label='Weight'
							width='digit'
						>
							<InputNumber
								name='weight'
								placeholder={0}
							/>
						</Field>
						<Field
							name='value'
							label='Value (MA)'
							width='digit'
						>
							<InputNumber
								name='value'
								placeholder={0}
							/>
						</Field>
						<Field
							name='valueWeight'
							label='Value/Weight'
							width='digit'
						>
							<InputNumber
								name='valueWeight'
								placeholder={0}
							/>
						</Field>
					</div>

					<Collapsible title='constraints (advanced)'>
						<div className='flex flex-col flex-wrap items-center justify-center md:w-full md:flex-row'>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
									Adroitness
								</h4>
								<div className='flex w-full flex-row justify-center gap-2 px-2'>
									<Field
										name='constraints.CEL'
										label='CEL'
										width='digit'
									>
										<InputNumber name='constraints.CEL' />
									</Field>
									<Field
										name='constraints.AGI'
										label='AGI'
										width='digit'
									>
										<InputNumber name='constraints.AGI' />
									</Field>
									<Field
										name='constraints.DEX'
										label='DEX'
										width='digit'
									>
										<InputNumber name='constraints.DEX' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
									Constitution
								</h4>
								<div className='flex w-full flex-row justify-center gap-2 px-2'>
									<Field
										name='constraints.STR'
										label='STR'
										width='digit'
									>
										<InputNumber name='constraints.STR' />
									</Field>
									<Field
										name='constraints.END'
										label='END'
										width='digit'
									>
										<InputNumber name='constraints.END' />
									</Field>
									<Field
										name='constraints.VIT'
										label='VIT'
										width='digit'
									>
										<InputNumber name='constraints.VIT' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
									Perception
								</h4>
								<div className='flex w-full flex-row justify-center gap-2 px-2'>
									<Field
										name='constraints.WIL'
										label='WIL'
										width='digit'
									>
										<InputNumber name='constraints.WIL' />
									</Field>
									<Field
										name='constraints.INS'
										label='INS'
										width='digit'
									>
										<InputNumber name='constraints.INS' />
									</Field>
									<Field
										name='constraints.SEN'
										label='SEN'
										width='digit'
									>
										<InputNumber name='constraints.SEN' />
									</Field>
								</div>
							</section>
							<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
								<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
									Shroudness
								</h4>
								<div className='flex w-full flex-row justify-center gap-2 px-2'>
									<Field
										name='constraints.CHA'
										label='CHA'
										width='digit'
									>
										<InputNumber name='constraints.CHA' />
									</Field>
									<Field
										name='constraints.SOC'
										label='SOC'
										width='digit'
									>
										<InputNumber name='constraints.SOC' />
									</Field>
									<Field
										name='constraints.ERU'
										label='ERU'
										width='digit'
									>
										<InputNumber name='constraints.ERU' />
									</Field>
								</div>
							</section>
						</div>
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

export default ItemEdit;
