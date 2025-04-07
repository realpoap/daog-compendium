import { trpc } from '@/utils/trpc';
import { Component } from '@api/lib/ZodComponent';
import { Item } from '@api/lib/ZodItem';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BackButton } from '../Buttons';
import ComponentModalBlock from './ComponentModalBlock';
import ItemModalBlock from './ItemModalBlock';

const ItemSingleShared = () => {
	const { id, type } = useParams({ strict: false });
	const [item, setItem] = useState<Item>();
	const [component, setComponent] = useState<Component>();

	const navigate = useNavigate();

	const itemById = trpc.items.getById.useQuery(id as string, {
		enabled: type === 'item',
	});
	const componentById = trpc.components.getById.useQuery(id as string, {
		enabled: type === 'component',
	});

	//Loading -----------------------------------------------------------------

	// define item object data after query success
	useEffect(() => {
		if (itemById.data) setItem(itemById.data);
		if (componentById.data) setComponent(componentById.data);
	}, [itemById, item, component]);
	if (!id) {
		toast.error('Cannot find item.');
		history.go(-1);
	}

	return (
		<div className='flex w-full flex-col items-center'>
			<BackButton onClick={() => navigate({ to: `/items` })} />
			<div className='mt-4 h-fit w-fit'>
				<div className='dark:bg-card card p-8 shadow shadow-xl'>
					{type === 'item' && item && <ItemModalBlock item={item} />}
					{component && <ComponentModalBlock item={component} />}
				</div>
			</div>
		</div>
	);
};

export default ItemSingleShared;
