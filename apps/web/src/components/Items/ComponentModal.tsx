import { Component } from '@api/lib/ZodComponent';

type Props = { item: Component };

const ComponentModal = ({ item }: Props) => {
	return (
		<dialog
			id='item-modal'
			className='modal'
		>
			<div className='modal-box dark:bg-stone-800'>
				{item.componentType === 'armor'}

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

export default ComponentModal;
