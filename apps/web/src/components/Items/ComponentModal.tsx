import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Component } from '@api/lib/ZodComponent';
import { GiTwoCoins } from 'rocketicons/gi';
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
								'dark:text-accent text-accent': item.rarity === 'rare',
								'text-slate-500 dark:text-slate-500': item.rarity === 'common',
								'text-orange-500 dark:text-orange-500':
									item.rarity === 'fabled',
							},
						)}
					>
						{item?.name && capitalizeFirstLetter(item?.name[0])}
						<div></div>
					</h3>
					<div className='font-grenze text-lg'>
						{item?.name.length !== undefined &&
							item?.name.length > 1 &&
							item.name.map((n, i) => {
								if (i !== 0) {
									return (
										<span
											className='text-lg after:mr-1 after:content-[","] last:after:content-[""]'
											key={n}
										>
											{capitalizeFirstLetter(n)}
										</span>
									);
								}
							})}
					</div>
					<div>
						<span className='italic'>{item.scienceName}</span>
						<span className='font-semibold'>
							{item?.rarity} {item?.componentType}
						</span>
					</div>
					<div className='text-sm italic'>{item.description}</div>
					<div className='my-2 flex flex-col'>
						{item.toxic && <span>Toxicity : {item.toxicity}</span>}
					</div>

					<div className='flex flex-row gap-2'>
						<span>Weight : {item.weight}</span>
					</div>
					<div>
						<span>Value : </span>
						{item.value && Math.floor(item?.value / 100)}{' '}
						<GiTwoCoins className='icon-goldenrod-300 icon-sm' />{' '}
						{item.value && item?.value % 100}{' '}
						<GiTwoCoins className='icon-stone-300 icon-sm' />
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
