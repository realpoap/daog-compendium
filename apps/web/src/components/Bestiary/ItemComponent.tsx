import { CreatureItem } from '@api/lib/ZodItem';
import { GiRollingDiceCup } from 'rocketicons/gi';
import Collapsible from '../Collapsible';

type Props = {
	items: CreatureItem[] | undefined;
};

const ItemComponent = ({ items }: Props) => {
	return (
		<div className='card flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-stone-700 p-2'>
			<div className='flex flex-row items-center gap-2'>
				<h3 className='font-grenze text-4xl font-semibold tracking-wider'>
					Loot
				</h3>
				<GiRollingDiceCup className='dark:icon-stone-200-2xl hover:icon-primary' />
			</div>

			<Collapsible title='see details'>
				<ul className='flex flex-col justify-start'>
					{items?.map(item => <li key={item.id}>{item.name}</li>)}
				</ul>
			</Collapsible>
		</div>
	);
};

export default ItemComponent;
