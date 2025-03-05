import { Item } from '@api/lib/ZodItem';
import { useEffect, useState } from 'react';
import { GiCursedStar, GiTwoCoins, GiWeight } from 'rocketicons/gi';
import { TbSwitchHorizontal } from 'rocketicons/tb';

type Props = {
	item: Item;
};

const ValueBlock = ({ item }: Props) => {
	const [sellPrice, setSellPrice] = useState(0);

	useEffect(() => {
		if (item.value !== null) {
			switch (item.quality) {
				case 'poor':
					setSellPrice(item.value * 0.2);
					break;
				case 'common':
					setSellPrice(item.value * 0.5);
					break;
				case 'great':
					setSellPrice(item.value * 0.7);
					break;
				case 'masterpiece':
					setSellPrice(item.value * 0.85);
					break;
				case 'legendary':
					setSellPrice(item.value);
					break;

				default:
					break;
			}
		}
	}, []);

	return (
		<div className='mt-2 flex w-full flex-col'>
			<div className='flex w-full flex-row items-center justify-between'>
				<div>
					<span>Market value : </span>
					{item.value && Math.floor(item?.value / 100)}{' '}
					<GiTwoCoins className='icon-goldenrod-300 icon-xs md:icon-sm w-fit' />{' '}
					{item.value && item?.value % 100}{' '}
					<GiTwoCoins className='icon-stone-300 icon-xs md:icon-sm w-fit' />
				</div>
				<TbSwitchHorizontal className='icon-neutral' />
				<div>
					Reselling for : {sellPrice && Math.floor(sellPrice / 100)}{' '}
					<GiTwoCoins className='icon-goldenrod-300 icon-xs md:icon-sm w-fit' />{' '}
					{sellPrice && sellPrice % 100}{' '}
					<GiTwoCoins className='icon-stone-300 icon-xs md:icon-sm w-fit' />
				</div>
			</div>
			<div className='items-top flex flex-col justify-center'>
				<span>
					Weight : {item.weight}{' '}
					<GiWeight className='dark:icon-stone-200 icon-sm' />
				</span>
				<span>{item.isRelic && `relic`}</span>
				<span>
					Magic load : {item.magicWeight ?? 0}
					<GiCursedStar className='dark:icon-stone-200 icon-md ml-1' />
				</span>
			</div>
		</div>
	);
};

export default ValueBlock;
