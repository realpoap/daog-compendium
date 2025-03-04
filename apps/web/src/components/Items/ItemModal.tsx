import { Item } from '@api/lib/ZodItem';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { FiCopy } from 'rocketicons/fi';
import { ActionButton } from '../Buttons';
import DescBlock from './Blocks/DescBlock';
import NameBlock from './Blocks/NameBlock';
import PropertiesBlock from './Blocks/PropertiesBlock';
import ValueBlock from './Blocks/ValueBlock';

type Props = { item: Item };

const ItemModal = ({ item }: Props) => {
	const navigate = useNavigate();

	const shareUrl = `${import.meta.env.VITE_FRONT_URL}/daog-compendium/#/items/share/${item.id}`;

	return (
		<dialog
			id='item-modal'
			className='modal'
		>
			<div className='modal-box gap-2 text-sm md:text-base dark:bg-stone-800'>
				<NameBlock item={item} />
				<DescBlock item={item} />
				<div className='divider divider-neutral'></div>
				<PropertiesBlock item={item} />
				<ValueBlock item={item} />
				<div className='flex flex-row gap-4'>
					<ActionButton
						color='accent'
						textColor='stone-800'
						onClick={() =>
							navigate({
								to: `/items/edit/$id`,
								params: { id: `${item?.id}` },
							})
						}
					>
						Edit
					</ActionButton>

					{/* <ActionButton
						color='primary'
						textColor='stone-800'
					>
						Share
					</ActionButton> */}
				</div>

				<div className='flex flex-row justify-between'>
					<p className='py-4 text-stone-500'>
						Press ESC key or click outside to close
					</p>
					<button
						onClick={async () =>
							await navigator.clipboard
								.writeText(shareUrl)
								.then(() => toast('Item copied to clipboard !'))
						}
					>
						<FiCopy className='icon-neutral' />
					</button>
				</div>
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
