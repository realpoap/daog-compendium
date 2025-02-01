import { cn } from '@/utils/classNames';
import { Component, CreatureComponent } from '@api/lib/ZodComponent';

import { SetStateAction, useState } from 'react';

type Props = {
	tags: CreatureComponent[];
	setTags: React.Dispatch<SetStateAction<CreatureComponent[]>>;
	list: Component[];
};

export const ComponentsTags = ({ setTags, tags, list }: Props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSelect = (item: Component) => {
		const input = document.getElementById('item-input') as HTMLInputElement;
		input.value = '';
		setSearchTerm('');
		const addedItem = {
			id: item.id,
			name: item.searchName,
			quantity: 1,
		};
		setTags([...tags, addedItem]);
		setResults([...results, item.searchName]);
	};
	const removeTag = (index: number) => {
		setTags(tags.filter((_el, i) => i !== Number(index)));
	};
	return (
		<div
			className={cn(
				'font-cabin flex w-full flex-row flex-wrap items-center gap-2 rounded-lg p-2 text-lg text-purple-900 caret-purple-900 shadow-sm focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:placeholder:text-stone-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
			)}
		>
			{tags.map((tag, index) => (
				<span
					key={tag.id}
					className='badge font-cabin inline-flex cursor-pointer border-0 bg-purple-500 text-center align-middle text-lg font-semibold text-stone-800 hover:bg-stone-500 hover:text-red-500'
					onClick={() => removeTag(index)}
				>
					{tag.name}
				</span>
			))}
			<div className='items-left flex flex-1 flex-col justify-between gap-2 text-left'>
				<input
					className={cn(
						'flex-1 bg-transparent px-2 placeholder:italic placeholder:text-stone-500 focus:outline-none focus:ring-0',
					)}
					placeholder='Search items'
					type='text'
					id='item-input'
					onChange={handleChange}
				/>
				{searchTerm && (
					<div className='align-center z-10 ml-2 flex max-h-svh flex-col justify-start rounded dark:bg-stone-700'>
						<ResultList
							tags={results}
							results={list}
							searchTerm={searchTerm}
							handleSelect={handleSelect}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
type ResultListProps = {
	tags: string[];
	results: Component[];
	searchTerm: string;
	handleSelect: (item: Component) => void;
};
function ResultList({
	tags,
	results,
	searchTerm,
	handleSelect,
}: ResultListProps): JSX.Element {
	const matchedTerm = (name: string, searchTerm: string) => {
		const index = name.toLowerCase().indexOf(searchTerm.toLowerCase());
		if (index === -1) {
			return name;
		}
		return (
			<>
				{name.substring(0, index)}
				<b className='text-purple-400 group-hover:text-stone-800'>
					{name.substring(index, index + searchTerm.length)}
				</b>
				{name.substring(index + searchTerm.length)}
			</>
		);
	};
	if (results.length === 0) {
		return (
			<div className='px-2 py-1 align-baseline text-sm italic text-red-500'>
				No item found
			</div>
		);
	}
	return (
		<>
			<div>
				{results
					.filter(r => !tags.includes(r.id))
					.filter(r =>
						r.searchName.toLowerCase().includes(searchTerm.toLowerCase()),
					)
					.map(result => (
						<li
							key={result.id}
							onClick={() => handleSelect(result)}
							className='hover:bg-accent group cursor-pointer list-none rounded-sm px-1 text-stone-200 hover:text-stone-800'
						>
							<>{matchedTerm(result.searchName, searchTerm)}</>
						</li>
					))}
			</div>
		</>
	);
}
