import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Component } from '@api/lib/ZodComponent';
import { Item } from '@api/lib/ZodItem';
import {
	GiArmorVest,
	GiArrowCluster,
	GiBrokenBottle,
	GiBullseye,
	GiCheckedShield,
	GiChicken,
	GiChickenLeg,
	GiClothJar,
	GiDaisy,
	GiGemPendant,
	GiJeweledChalice,
	GiMushroomGills,
	GiPolarStar,
	GiPoncho,
	GiPotionBall,
	GiPowder,
	GiRopeCoil,
	GiStonePile,
	GiSwordWound,
	GiWhiteBook,
} from 'rocketicons/gi';

type Props = {
	item: Item | Component;
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
							'rarity' in item && item.rarity === 'unusual',
						'dark:text-accent text-accent':
							'rarity' in item && item.rarity === 'rare',
						'text-orange-500 dark:text-orange-500':
							'rarity' in item && item.rarity === 'fabled',
					},
				)}
			>
				<span>
					{item?.name && capitalizeFirstLetter(item?.name[0])}{' '}
					{'itemType' in item && item.isRelic && (
						<GiPolarStar className='icon-md icon-stone-200 relative -top-2 animate-pulse' />
					)}
				</span>
				<div>
					{'itemType' in item &&
						item?.itemType === 'weapon' &&
						item.rangeType === 'close' && (
							<GiSwordWound
								className={cn('icon-stone-200-xl', {
									'icon-gray-500 dark:icon-gray-500':
										'quality' in item && item.quality === 'poor',
									'icon-teal-500 dark:icon-teal-500':
										'rarity' in item && item.rarity === 'unusual',
									'dark:icon-accent icon-accent':
										'rarity' in item && item.rarity === 'rare',
									'icon-orange-500 dark:icon-orange-500':
										'rarity' in item && item.rarity === 'fabled',
								})}
							/>
						)}
					{'itemType' in item &&
						item?.itemType === 'weapon' &&
						item.rangeType !== 'close' && (
							<GiBullseye
								className={cn('icon-stone-200-xl', {
									'icon-gray-500 dark:icon-gray-500':
										'quality' in item && item.quality === 'poor',
									'icon-teal-500 dark:icon-teal-500':
										'rarity' in item && item.rarity === 'unusual',
									'dark:icon-accent icon-accent':
										'rarity' in item && item.rarity === 'rare',
									'icon-orange-500 dark:icon-orange-500':
										'rarity' in item && item.rarity === 'fabled',
								})}
							/>
						)}
					{'itemType' in item && item?.itemType === 'armor' && (
						<GiArmorVest
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'shield' && (
						<GiCheckedShield
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'trinket' && (
						<GiJeweledChalice
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'jewel' && (
						<GiGemPendant
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'garnment' && (
						<GiPoncho
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'junk' && (
						<GiBrokenBottle
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'book' && (
						<GiWhiteBook
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'accessory' && (
						<GiRopeCoil
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'ammunition' && (
						<GiArrowCluster
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'potion' && (
						<GiPotionBall
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'itemType' in item && item?.itemType === 'food' && (
						<GiChickenLeg
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'fungus' && (
						<GiMushroomGills
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'animal' && (
						<GiChicken
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'plant' && (
						<GiDaisy
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'mineral' && (
						<GiStonePile
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'spice' && (
						<GiPowder
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
							})}
						/>
					)}
					{'componentType' in item && item?.componentType === 'ferment' && (
						<GiClothJar
							className={cn('icon-stone-200-xl', {
								'icon-gray-500 dark:icon-gray-500':
									'quality' in item && item.quality === 'poor',
								'icon-teal-500 dark:icon-teal-500':
									'rarity' in item && item.rarity === 'unusual',
								'dark:icon-accent icon-accent':
									'rarity' in item && item.rarity === 'rare',
								'icon-orange-500 dark:icon-orange-500':
									'rarity' in item && item.rarity === 'fabled',
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
						'rarity' in item && item.rarity === 'unusual',
					'dark:text-accent text-accent':
						'rarity' in item && item.rarity === 'rare',
					'text-orange-500 dark:text-orange-500':
						'rarity' in item && item.rarity === 'fabled',
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
