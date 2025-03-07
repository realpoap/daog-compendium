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
		<div className='modal-box dark:bg-stone-800'>
			<NameBlock item={item} />
			<DescBlock item={item} />

			<div className='flex flex-row'>
				<ToxicityBlock item={item} />
				<div className='divider divider-horizontal divider-neutral'></div>
				<ValueBlock item={item} />
			</div>
		</div>
	);
};

export default ComponentModalBlock;
