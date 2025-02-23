import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Item } from '@api/lib/ZodItem';
import {
	GiArmorVest,
	GiArrowCluster,
	GiBrokenBottle,
	GiBullseye,
	GiCheckedShield,
	GiCheeseWedge,
	GiGemPendant,
	GiJeweledChalice,
	GiPolarStar,
	GiPoncho,
	GiPotionBall,
	GiRopeCoil,
	GiSwordWound,
	GiWhiteBook,
} from 'rocketicons/gi';

type Props = {
	item: Item;
};

const NameBlock = ({ item }: Props) => {
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
				<span>
					{item?.name && capitalizeFirstLetter(item?.name[0])}{' '}
					{item.isRelic && (
						<GiPolarStar className='icon-md icon-stone-200 relative -top-2 animate-pulse' />
					)}
				</span>
				<div>
					{item?.itemType === 'weapon' && item.rangeType === 'close' && (
						<GiSwordWound
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'weapon' && item.rangeType !== 'close' && (
						<GiBullseye
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'armor' && (
						<GiArmorVest
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'shield' && (
						<GiCheckedShield
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'trinket' && (
						<GiJeweledChalice
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'jewel' && (
						<GiGemPendant
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'garnment' && (
						<GiPoncho
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'junk' && (
						<GiBrokenBottle
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'book' && (
						<GiWhiteBook
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'accessory' && (
						<GiRopeCoil
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'ammunition' && (
						<GiArrowCluster
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'potion' && (
						<GiPotionBall
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
					{item?.itemType === 'food' && (
						<GiCheeseWedge
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500': item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500': item.quality === 'great',
								'dark:icon-accent icon-accent': item.quality === 'masterpiece',
								'icon-orange-500 dark:icon-orange-500':
									item.quality === 'legendary',
							})}
						/>
					)}
				</div>
			</h3>
			<div
				className={cn('font-grenze text-xl font-bold tracking-wide', {
					'text-gray-500 dark:text-gray-500':
						'quality' in item && item.quality === 'poor',
					'text-teal-500 dark:text-teal-500':
						'quality' in item && item.quality === 'great',
					'dark:text-accent text-accent':
						'quality' in item && item.quality === 'masterpiece',
					'text-orange-500 dark:text-orange-500':
						'quality' in item && item.quality === 'legendary',
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
		</div>
	);
};

export default NameBlock;
