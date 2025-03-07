import { capitalizeFirstLetter } from '@/utils/capitalize';
import { Component } from '@api/lib/ZodComponent';
import { Item } from '@api/lib/ZodItem';

type Props = {
	item: Item | Component;
};

const DescBlock = ({ item }: Props) => {
	return (
		<div className='mt-2 flex flex-col'>
			{'itemType' in item && (
				<div>
					<span className='font-semibold italic'>
						{capitalizeFirstLetter(item?.quality)} quality {item?.itemType}{' '}
						{item?.material !== '' && (
							<span>
								made in {item?.materialSubType} {item?.material}
							</span>
						)}
					</span>
				</div>
			)}
			{'componentType' in item && (
				<div className='mt-2 flex flex-col'>
					<span className='font-semibold italic'>
						{capitalizeFirstLetter(item?.rarity)} {item?.componentType}{' '}
						{item.scienceName && <span>- {item.scienceName}</span>}
					</span>
				</div>
			)}
			{item.description && (
				<div className='my-2 text-sm italic'>{item.description}</div>
			)}
		</div>
	);
};

export default DescBlock;
