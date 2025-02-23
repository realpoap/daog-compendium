import { Item } from '@api/lib/ZodItem';
import { ActionButton } from '../Buttons';
import DescBlock from './Blocks/DescBlock';
import NameBlock from './Blocks/NameBlock';
import PropertiesBlock from './Blocks/PropertiesBlock';
import ValueBlock from './Blocks/ValueBlock';

type Props = { item: Item };

const ItemModal = ({ item }: Props) => {
	return (
		<dialog
			id='item-modal'
			className='modal'
		>
			<div className='modal-box dark:bg-stone-800'>
				<NameBlock item={item} />
				<DescBlock item={item} />
				<div className='divider divider-neutral'></div>
				<PropertiesBlock item={item} />
				<ValueBlock item={item} />

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

export default ItemModal;
