import { trpc } from '@/utils/trpc';
import { useParams } from '@tanstack/react-router';
import DescBlock from './Blocks/DescBlock';
import NameBlock from './Blocks/NameBlock';
import PropertiesBlock from './Blocks/PropertiesBlock';
import ValueBlock from './Blocks/ValueBlock';

const ItemSingleShared = () => {
	const { id } = useParams({ strict: false });
	const itemById = trpc.items.getById.useQuery(id as string);
	//Loading -----------------------------------------------------------------
	if (itemById.isLoading && !itemById.data) {
		return (
			<div className='font-grenze flex h-screen flex-col items-center justify-center'>
				<p>Loading item</p>
				<span className='loading loading-dots loading-md'></span>
			</div>
		);
	}
	// define item object data after query success
	if (itemById.isSuccess && itemById.data) {
		const item = itemById?.data;
		return (
			<div className='flex flex-col items-center'>
				<div className='modal-box text-sm md:text-base dark:bg-stone-800'>
					<NameBlock item={item} />
					<DescBlock item={item} />
					<div className='divider divider-neutral'></div>
					<PropertiesBlock item={item} />
					<ValueBlock item={item} />
				</div>
			</div>
		);
	}
};

export default ItemSingleShared;
