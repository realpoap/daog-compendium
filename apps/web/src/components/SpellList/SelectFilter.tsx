import { cn } from '@/utils/classNames';
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const options = [
	{ label: 'Mouflette', value: 'mouflette' },
	{ label: 'Eau', value: 'eau' },
	{ label: 'Feu', value: 'feu' },
	{ label: 'Terre', value: 'terre' },
	{ label: 'Air', value: 'air' },
	{ label: 'Sang', value: 'sang' },
];

const SelectFilter = () => {
	const [selected, setSelected] = useState([]);

	return (
		<div>
			<MultiSelect
				className={cn(
					'b-stone-500 font-grenze mb-4 w-60 rounded-lg border p-1 pl-2 text-center text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
				)}
				options={options}
				value={selected}
				onChange={setSelected}
				labelledBy='Select'
			/>
		</div>
	);
};

export default SelectFilter;
