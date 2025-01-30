import { Item } from '@api/lib/ZodItem';
import ArmorBlock from './Blocks/ArmorBlock';
import WeaponBlock from './Blocks/WeaponBlock';

type Props = { item: Item };

const ItemModal = ({ item }: Props) => {
	return (
		<dialog
			id='item-modal'
			className='modal'
		>
			<div className='modal-box dark:bg-stone-800'>
				{item.itemType === 'armor' && <ArmorBlock item={item} />}
				{item.itemType === 'weapon' && item && <WeaponBlock item={item} />}

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

export default ItemModal;
