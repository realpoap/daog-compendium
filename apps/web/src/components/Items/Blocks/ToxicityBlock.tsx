import { Component } from '@api/lib/ZodComponent';
import { FiCheck, FiX } from 'rocketicons/fi';

type Props = {
	item: Component;
};

const ToxicityBlock = ({ item }: Props) => {
	return (
		<div className='mt-2 flex w-full flex-col'>
			<div className='flex flex-row gap-2'>
				Habitats :
				{item.habitat.map(r => (
					<span
						className='badge font-cabin bg-primary badge-md inline-flex cursor-default border-0 text-center align-middle font-semibold'
						key={r}
					>
						{r}
					</span>
				))}
			</div>

			<div className='flex flex-col'>
				<span>Uses :</span>
				<span className='ml-4'>
					Ointment :{' '}
					{item.uses.ointment ? (
						<FiCheck className='icon-accent-sm' />
					) : (
						<FiX className='icon-red-500-sm' />
					)}{' '}
				</span>
				<span className='ml-4'>
					Potion :{' '}
					{item.uses.potion ? (
						<FiCheck className='icon-accent-sm' />
					) : (
						<FiX className='icon-red-500-sm' />
					)}{' '}
				</span>
				<span className='ml-4'>
					Extract :{' '}
					{item.uses.extract ? (
						<FiCheck className='icon-accent-sm' />
					) : (
						<FiX className='icon-red-500-sm' />
					)}{' '}
				</span>
				<span className='ml-4'>
					Catalyst :{' '}
					{item.uses.catalyst ? (
						<FiCheck className='icon-accent-sm' />
					) : (
						<FiX className='icon-red-500-sm' />
					)}{' '}
				</span>
			</div>

			{item.toxic && <span>Toxicity : {item.toxicity}</span>}
		</div>
	);
};

export default ToxicityBlock;
