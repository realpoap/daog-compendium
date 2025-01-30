import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Item } from '@api/lib/ZodItem';
import { GiSwordWound, GiTwoCoins } from 'rocketicons/gi';

type Props = {
	item: Item;
};

const WeaponBlock = ({ item }: Props) => {
	return (
		<div className='flex flex-col'>
			<h3 className='font-grenze flex flex-row justify-between text-4xl font-bold'>
				{item?.name && capitalizeFirstLetter(item?.name[0])}
				<div>
					<GiSwordWound
						className={cn('icon-stone-200-xl', {
							'dark:icon-accent icon-accent': item.quality === 'great',
							'icon-slate-500 dark:icon-slate-500': item.quality === 'poor',
							'icon-orange-500 dark:icon-orange-500':
								item.quality === 'masterpiece',
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
				<span className='font-semibold'>
					{item?.quality} {item?.materialSubType} {item?.material}{' '}
					{item?.itemType}
				</span>
			</div>
			<div className='text-sm italic'>{item.description}</div>
			<div className='my-2 flex flex-col'>
				<span>Armor : {item.armorClass}</span>
				<span>Durability : {item.durability}</span>
				<span>Protection : {item.protection}</span>
				<span>Magic resistance : {item.magicProtection}</span>
			</div>
			<div>{item.properties}</div>
			<div className='flex flex-row gap-2'>
				Resistant to :
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
				<span>Magic load : {item.magicWeight}</span>
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

export default WeaponBlock;
