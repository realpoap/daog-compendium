import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Component } from '@api/lib/ZodComponent';
import { FiCheck, FiX } from 'rocketicons/fi';
import {
	GiChicken,
	GiClothJar,
	GiDaisy,
	GiMushroomGills,
	GiPowder,
	GiStonePile,
	GiTwoCoins,
	GiWeight,
} from 'rocketicons/gi';
import { TbSwitchHorizontal } from 'rocketicons/tb';
import { ActionButton } from '../Buttons';

type Props = { item: Component };

const ComponentModal = ({ item }: Props) => {
	return (
		<dialog
			id='component-modal'
			className='modal'
		>
			<div className='modal-box dark:bg-stone-800'>
				<div className='flex flex-col'>
					<h3
						className={cn(
							'font-grenze flex flex-row justify-between text-4xl font-bold',
							{
								'text-teal-500 dark:text-teal-500': item.rarity === 'unusual',
								'dark:text-accent text-accent': item.rarity === 'rare',
								'text-orange-500 dark:text-orange-500':
									item.rarity === 'fabled',
							},
						)}
					>
						<span>{item?.name && capitalizeFirstLetter(item?.name[0])} </span>
						<div>
							{item?.componentType === 'fungus' && (
								<GiMushroomGills
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
							{item?.componentType === 'animal' && (
								<GiChicken
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
							{item?.componentType === 'mineral' && (
								<GiStonePile
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
							{item?.componentType === 'spice' && (
								<GiPowder
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
							{item?.componentType === 'ferment' && (
								<GiClothJar
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
							{item?.componentType === 'plant' && (
								<GiDaisy
									className={cn('icon-stone-200-xl', {
										'icon-teal-500 dark:icon-teal-500':
											item.rarity === 'unusual',
										'dark:icon-accent icon-accent': item.rarity === 'rare',
										'icon-orange-500 dark:icon-orange-500':
											item.rarity === 'fabled',
									})}
								/>
							)}
						</div>
					</h3>
					<div
						className={cn('font-grenze text-xl font-bold tracking-wide', {
							'text-teal-500 dark:text-teal-500': item.rarity === 'unusual',
							'dark:text-accent text-accent': item.rarity === 'rare',
							'text-orange-500 dark:text-orange-500': item.rarity === 'fabled',
						})}
					>
						{item?.name.length !== undefined &&
							item?.name.length > 1 &&
							item.name.map((n, i) => {
								if (i !== 0) {
									return (
										<span
											className='after:mr-1 after:content-[","] last:after:content-[""]'
											key={n}
										>
											{capitalizeFirstLetter(n)}
										</span>
									);
								}
							})}
					</div>
					<div className='mt-2 flex flex-col'>
						<div>
							<span className='font-semibold italic'>
								{capitalizeFirstLetter(item?.rarity)} {item?.componentType}{' '}
								{item.scienceName && <span>- {item.scienceName}</span>}
							</span>
						</div>
						{item.description && (
							<div className='my-2 text-sm italic'>{item.description}</div>
						)}
					</div>
				</div>
				<div className='divider divider-neutral'></div>

				<div className='flex flex-col'>
					<div className='flex flex-col'>
						<div className='flex flex-row gap-2'>
							Habitats :
							{item.habitat.map(r => (
								<span
									className='badge font-cabin bg-primary badge-md inline-flex cursor-default border-0 text-center align-middle font-semibold'
									key={r}
								>
									{r}
								</span>
							))}
						</div>

						<div className='flex flex-col'>
							<span>Uses :</span>
							<span className='ml-4'>
								Ointment :{' '}
								{item.uses.ointment ? (
									<FiCheck className='icon-accent-sm' />
								) : (
									<FiX className='icon-red-500-sm' />
								)}{' '}
							</span>
							<span className='ml-4'>
								Potion :{' '}
								{item.uses.potion ? (
									<FiCheck className='icon-accent-sm' />
								) : (
									<FiX className='icon-red-500-sm' />
								)}{' '}
							</span>
							<span className='ml-4'>
								Extract :{' '}
								{item.uses.extract ? (
									<FiCheck className='icon-accent-sm' />
								) : (
									<FiX className='icon-red-500-sm' />
								)}{' '}
							</span>
							<span className='ml-4'>
								Catalyst :{' '}
								{item.uses.catalyst ? (
									<FiCheck className='icon-accent-sm' />
								) : (
									<FiX className='icon-red-500-sm' />
								)}{' '}
							</span>
						</div>

						{item.toxic && <span>Toxicity : {item.toxicity}</span>}
						<div className='divider divider-neutral'></div>

						<div className='flex flex-col'>
							<div className='flex flex-row items-center justify-between'>
								<div>
									<span>
										Weight : {item.weight}{' '}
										<GiWeight className='dark:icon-stone-200 icon-sm' />
									</span>
								</div>
								<TbSwitchHorizontal className='icon-neutral' />
								<div>
									Market value :{' '}
									{item.valueWeight && Math.floor(item?.valueWeight / 100)}{' '}
									<GiTwoCoins className='icon-goldenrod-300 icon-sm' />{' '}
									{item.valueWeight && item.valueWeight % 100}{' '}
									<GiTwoCoins className='icon-stone-300 icon-sm' />
								</div>
							</div>
						</div>
					</div>
				</div>
				<ActionButton
					color='accent'
					textColor='stone-800'
				>
					Edit
				</ActionButton>
				<p className='py-4 text-stone-500'>
					Press ESC key or click outside to close
				</p>
			</div>
			<form
				method='dialog'
				className='modal-backdrop'
			>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default ComponentModal;
