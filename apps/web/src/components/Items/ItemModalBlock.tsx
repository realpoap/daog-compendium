import { Item } from '@api/lib/ZodItem';
import DescBlock from './Blocks/DescBlock';
import NameBlock from './Blocks/NameBlock';
import PropertiesBlock from './Blocks/PropertiesBlock';
import ValueBlock from './Blocks/ValueBlock';

type Props = {
	item: Item;
};

const ItemModalBlock = ({ item }: Props) => {
	return (
		<>
			<NameBlock item={item} />
			<DescBlock item={item} />
			<div className='divider divider-neutral'></div>
			<PropertiesBlock item={item} />
			<ValueBlock item={item} />
		</>
	);
};

export default ItemModalBlock;
