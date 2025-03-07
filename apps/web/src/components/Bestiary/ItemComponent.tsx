import { CreatureItem } from '@api/lib/ZodItem';
import { GiRollingDiceCup } from 'rocketicons/gi';
import Collapsible from '../Collapsible';

type Props = {
	items: CreatureItem[] | undefined;
	//components: CreatureComponent;
};

const ItemComponent = ({ items }: Props) => {
	return (
		<div className='my-4 flex w-full flex-col items-center justify-center gap-2 px-2'>
			<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
				Loot
			</h3>
			<GiRollingDiceCup className='dark:icon-stone-200-2xl hover:icon-primary' />
			<Collapsible title='see details'>
				<ul className='flex flex-col justify-start'>
					{items?.map(item => (
						<li
							className={'flex flex-row justify-start gap-2'}
							key={item.id}
						>
							<span>{item.quantity}x</span>
							<span>{item.name}</span>
						</li>
					))}
				</ul>
			</Collapsible>
		</div>
	);
};

export default ItemComponent;
