import itemsEntries from '@/data/weapons';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { trpc } from '@/utils/trpc';

const ItemsSearch = () => {
	const getAllItems = trpc.items.getAll.useQuery();
	const createManyItems = trpc.items.createMany.useMutation();

	const sendItems = () => {
		itemsEntries.map(i => {
			console.log(i);
			createManyItems.mutate(i);
		});
	};

	if (!getAllItems.data) return <div>Loading</div>;

	return (
		<div className='flex flex-col items-center'>
			<ul className='flex flex-col items-center gap-2'>
				{getAllItems.data &&
					getAllItems.data.map(i => (
						<li
							key={i.id}
							className='flex flex-col items-center justify-start'
						>
							<h3 className='font-grenze text-2xl tracking-wider'>
								{capitalizeFirstLetter(i.name.join(', '))}
							</h3>
							<div className='flex flex-col items-center text-stone-500'>
								<p className='font-cabin flex flex-row gap-2 text-stone-500'>
									<span className='text-sm italic'>{i.itemType}</span>

									<span className='text-sm italic'>
										{i.materialSubType} {i.material}
									</span>
									<span className='text-sm italic'>{i.quality}</span>
								</p>
								{i.damages && <p>Damages : {i.damages}</p>}
								{i.protection && <p>Protection : {i.protection}</p>}
							</div>
						</li>
					))}
			</ul>

			<div className='hidden'>
				<button
					onClick={sendItems}
					disabled={createManyItems.isPending}
					className='btn btn-sm m-8'
				>
					Import Items
				</button>
				{createManyItems.error && (
					<p>Something went wrong! {createManyItems.error.message}</p>
				)}
			</div>
		</div>
	);
};

export default ItemsSearch;
