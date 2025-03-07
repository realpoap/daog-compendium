import { Component } from '@api/lib/ZodComponent';
import DescBlock from './Blocks/DescBlock';
import NameBlock from './Blocks/NameBlock';
import ToxicityBlock from './Blocks/ToxicityBlock';
import ValueBlock from './Blocks/ValueBlock';

type Props = {
	item: Component;
};

const ComponentModalBlock = ({ item }: Props) => {
	return (
		<>
			<NameBlock item={item} />
			<DescBlock item={item} />

			<div className='flex flex-row'>
				<ToxicityBlock item={item} />
				<div className='divider divider-horizontal divider-neutral'></div>
				<ValueBlock item={item} />
			</div>
		</>
	);
};

export default ComponentModalBlock;
