import itemsEntries from '@/data/weapons';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { GiArmorVest, GiSwordWound, GiTwoCoins } from 'rocketicons/gi';
import TitleCount from '../TitleCount';

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
			<div className='container sticky top-10 z-10 flex min-h-[20dvh] flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					Items
					{getAllItems.data && <TitleCount number={getAllItems.data.length} />}
				</h1>
			</div>
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr className='font-grenze text-xl dark:text-stone-200'>
							<th>Name</th>
							<th>Type</th>
							<th>Material</th>
							<th>Weight</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{getAllItems.data &&
							getAllItems.data.map(i => (
								<tr
									key={i.id}
									className='hover:dark:bg-stone-700'
								>
									<th
										className={cn('dark:text-stone-200', {
											'text-accent': i.quality === 'great',
											'text-stone-500': i.quality === 'poor',
											'text-primary': i.quality === 'masterpiece',
										})}
									>
										{capitalizeFirstLetter(i.name.join(', '))}
									</th>
									<th>
										{i.itemType === 'weapon' ? (
											<GiSwordWound className='icon-stone-200-sm' />
										) : i.itemType === 'armor' ? (
											<GiArmorVest className='icon-stone-200-sm' />
										) : (
											''
										)}
									</th>
									<th>
										{i.materialSubType} {i.material}
									</th>
									<th>{i.weight}</th>
									{i.value && (
										<th>
											{Math.floor(i?.value / 100)}{' '}
											<GiTwoCoins className='icon-goldenrod-300 icon-sm' />{' '}
											{i?.value % 100}{' '}
											<GiTwoCoins className='icon-stone-300 icon-sm' />
										</th>
									)}
								</tr>
							))}
					</tbody>
				</table>
			</div>

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
