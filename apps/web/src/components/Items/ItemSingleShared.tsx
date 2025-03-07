import { trpc } from '@/utils/trpc';
import { useNavigate, useParams } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { BackButton } from '../Buttons';
import ComponentModalBlock from './ComponentModalBlock';
import ItemModalBlock from './ItemModalBlock';

const ItemSingleShared = () => {
	const { id, type } = useParams({ strict: false });
	const navigate = useNavigate();

	const itemById = trpc.items.getById.useQuery(id as string, {
		enabled: type === 'item',
	});
	const componentById = trpc.components.getById.useQuery(id as string, {
		enabled: type === 'component',
	});
	//Loading -----------------------------------------------------------------
	if (!id) {
		toast.error('Cannot find item.');
		history.go(-1);
	}

	// define item object data after query success
	const item = itemById.data;
	const component = componentById.data;

	return (
		<div className='flex flex-col items-center'>
			<BackButton onClick={() => navigate({ to: `/items` })} />
			<div className='modal-box dark:bg-stone-800'>
				{type === 'item' && item && <ItemModalBlock item={item} />}
				{type === 'component' && component && (
					<ComponentModalBlock item={component} />
				)}
			</div>
		</div>
	);
};

export default ItemSingleShared;
