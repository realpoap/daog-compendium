import { capitalizeFirstLetter } from '@/utils/capitalize';
import { Item } from '@api/lib/ZodItem';

type Props = {
	item: Item;
};

const DescBlock = ({ item }: Props) => {
	return (
		<div className='mt-2 flex flex-col'>
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
			{item.description && (
				<div className='my-2 text-sm italic'>{item.description}</div>
			)}
		</div>
	);
};

export default DescBlock;
