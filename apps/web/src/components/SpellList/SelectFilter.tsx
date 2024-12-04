import { cn } from '@/utils/classNames';
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  {label: 'Mouflette', value:'mouflette'},
  {label: 'Eau', value:'eau'},
  {label: 'Feu', value:'feu'},
  {label: 'Terre', value:'terre'},
  {label: 'Air', value:'air'},
  {label: 'Sang', value:'sang'},
]

const SelectFilter = () => {
	  const [selected, setSelected] = useState([])

	return (
		<div>
			<MultiSelect
        className={cn('rounded-lg w-60 mb-4 pl-2 p-1 border b-stone-500 dark:bg-stone-700 text-lg text-purple-900 dark:text-purple-400 focus:outline-none focus:ring-purple-900 dark:focus:ring-purple-400 focus:border-purple-900 dark:focus:border-purple-400 focus:ring-1 caret-purple-900 dark:caret-purple-400 shadow-sm placeholder:italic text-center font-grenze')}        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy='Select'
      />
		</div>
	);
}

export default SelectFilter;
