import { trpc } from '@/utils/trpc';
import TitleCount from '../TitleCount';

const AttributesList = () => {
	const getAllAttributes = trpc.attributes.getAll.useQuery();

	if (!getAllAttributes.data) return <></>;

	return (
		<div className='flex w-full flex-col items-center gap-2'>
			<h1 className='font-grenze dark:text-primary text-secondary sticky z-10 mx-auto my-4 text-center text-6xl font-bold tracking-wide md:mt-8'>
				Attributes
				<TitleCount number={getAllAttributes?.data.length} />
			</h1>
			{getAllAttributes.data.map(a => (
				<div
					key={a.id}
					className='flex flex-col items-center justify-start'
				>
					<h4 className='font-grenze text-2xl tracking-wider dark:text-stone-200'>
						{a.name}
					</h4>
					<p className='font-cabin italic dark:text-stone-500'>
						{a.description}
					</p>
				</div>
			))}
		</div>
	);
};

export default AttributesList;
