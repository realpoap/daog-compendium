import { Component } from '@api/lib/ZodComponent';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { FiCopy } from 'rocketicons/fi';
import { ActionButton } from '../Buttons';
import ComponentModalBlock from './ComponentModalBlock';

type Props = { item: Component };

const ComponentModal = ({ item }: Props) => {
	const navigate = useNavigate();

	const shareUrl = `${import.meta.env.VITE_FRONT_URL}/daog-compendium/#/items/component/${item.id}/share`;

	return (
		<dialog
			id='component-modal'
			className='modal'
		>
			<div className='modal-box dark:bg-stone-800'>
				<div className='flex flex-col'>
					{'componentType' in item && <ComponentModalBlock item={item} />}
				</div>
				<div className='flex flex-row gap-4'>
					<ActionButton
						color='accent'
						textColor='stone-800'
						onClick={() =>
							navigate({
								to: `/items/$type/$id/edit`,
								params: { type: 'component', id: `${item?.id}` },
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

export default ComponentModal;
