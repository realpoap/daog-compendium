import { trpc } from '@/utils/trpc';
import TitleCount from '../TitleCount';

const AttributesList = () => {
	const getAllAttributes = trpc.attributes.getAll.useQuery();

	if (!getAllAttributes.data) return <></>;

	return (
		<div className='flex h-[40dvh] w-full flex-col gap-2 overflow-y-scroll'>
			<h1 className='font-grenze dark:text-primary text-secondary sticky z-10 mx-auto my-4 text-center text-6xl font-bold tracking-wide md:mt-8'>
				Attributes
				<TitleCount number={getAllAttributes?.data.length} />
			</h1>
			{getAllAttributes.data.map(a => (
				<div key={a.id}>
					<h4 className='font-grenze text-2xl tracking-wider dark:text-stone-200'>
						{a.name}
					</h4>
					<p className='font-cabin dark:text-stone-500'>{a.description}</p>
				</div>
			))}
		</div>
	);
};

export default AttributesList;
