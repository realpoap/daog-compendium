import { Item } from '@api/lib/ZodItem';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { FiCopy } from 'rocketicons/fi';
import { ActionButton } from '../Buttons';
import ItemModalBlock from './ItemModalBlock';

type Props = { item: Item };

const ItemModal = ({ item }: Props) => {
	const navigate = useNavigate();

	const shareUrl = `${import.meta.env.VITE_FRONT_URL}/daog-compendium/#/items/item/${item.id}/share`;

	return (
		<dialog
			id='item-modal'
			className='modal'
		>
			<div className='modal-box gap-2 text-sm md:text-base dark:bg-stone-800'>
				{'itemType' in item && <ItemModalBlock item={item} />}

				<div className='flex flex-row gap-4'>
					<ActionButton
						color='accent'
						textColor='stone-800'
						onClick={() =>
							navigate({
								to: `/items/$type/$id/edit`,
								params: { type: 'item', id: `${item?.id}` },
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
					<p className='text-neutral py-4'>
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
