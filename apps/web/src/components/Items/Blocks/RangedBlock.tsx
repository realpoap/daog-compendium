import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Item } from '@api/lib/ZodItem';
import { GiBullseye, GiTwoCoins } from 'rocketicons/gi';

type Props = {
	item: Item;
};

const RangedBlock = ({ item }: Props) => {
	return (
		<div className='flex flex-col'>
			<h3
				className={cn(
					'font-grenze flex flex-row justify-between text-4xl font-bold',
					{
						'text-gray-500 dark:text-gray-500':
							'quality' in item && item.quality === 'poor',
						'text-teal-500 dark:text-teal-500':
							'quality' in item && item.quality === 'great',
						'dark:text-accent text-accent':
							'quality' in item && item.quality === 'masterpiece',
						'text-orange-500 dark:text-orange-500':
							'quality' in item && item.quality === 'legendary',
					},
				)}
			>
				{item?.name && capitalizeFirstLetter(item?.name[0])}
				<div>
					<GiBullseye
						className={cn('icon-stone-200-xl', {
							'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
							'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
							'dark:icon-accent icon-accent': item.quality === 'masterpiece',
							'icon-orange-500 dark:icon-orange-500':
								item.quality === 'legendary',
						})}
					/>
				</div>
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
				<span className='font-semibold italic'>
					{capitalizeFirstLetter(item?.quality)} {item?.itemType} made in{' '}
					{item?.materialSubType} {item?.material}
				</span>
			</div>
			<div className='text-sm italic'>{item.description}</div>
			<div className='my-2 flex flex-col'>
				<span>
					Range : {item.rangeType} {item.range && <span>({item.range})</span>}
				</span>
				<span>Damages : {item.damages}</span>
				<div>Properties: {item.properties}</div>
			</div>
			<div className='flex flex-row gap-2'>
				Damages type :
				{item.resistType.map(r => (
					<span
						className='badge font-cabin bg-primary badge-md inline-flex cursor-default border-0 text-center align-middle font-semibold'
						key={r}
					>
						{r}
					</span>
				))}
			</div>
			<div className='flex flex-row gap-2'>
				<span>Weight : {item.weight}</span>
				<span>Magic load : {item.magicWeight ?? 0}</span>
			</div>
			<div>
				<span>Value : </span>
				{item.value && Math.floor(item?.value / 100)}{' '}
				<GiTwoCoins className='icon-goldenrod-300 icon-sm' />{' '}
				{item.value && item?.value % 100}{' '}
				<GiTwoCoins className='icon-stone-300 icon-sm' />
			</div>
		</div>
	);
};

export default RangedBlock;
