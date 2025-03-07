import { useParams, useRouter } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import ComponentEditForm from './ComponentEditForm';
import ItemEditForm from './ItemEditForm';

const ItemEdit = () => {
	const { history } = useRouter();

	const { id, type } = useParams({ strict: false });

	if (!id) {
		toast.error('Cannot find item.');
		history.go(-1);
	}

	if (type === 'item' && id) return <ItemEditForm id={id} />;
	if (type === 'component' && id) return <ComponentEditForm id={id} />;
};

export default ItemEdit;
