import { CreatureItem } from '@api/lib/ZodItem';

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
			<ul>{items?.map(item => <li key={item.id}>{item.name}</li>)}</ul>
		</div>
	);
};

export default ItemComponent;
