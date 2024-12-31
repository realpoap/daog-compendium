import { cn } from '@/utils/classNames';
import { Attribute } from '@api/lib/ZodCreature';
import { SetStateAction, useState } from 'react';

type Props = {
	tags: string[];
	setTags: React.Dispatch<SetStateAction<string[]>>;
	attributesList: Attribute[];
};

export const AttributeTags = ({ setTags, tags, attributesList }: Props) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== ',' || e.code !== 'Comma') return;
		const value = (e.target as HTMLInputElement).value;
		if (!value.trim()) return;
		setTags([...tags, value]);
		(e.target as HTMLInputElement).value = '';
	};
	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.key !== ',' || e.code !== 'Comma') return;
		(e.target as HTMLInputElement).value = '';
	};
	const handleSelect = (attribute: Attribute) => {
		const input = document.getElementById(
			'attribute-input',
		) as HTMLInputElement;
		input.value = '';
		setSearchTerm('');
		setTags([...tags, attribute.name]);
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
					key={index}
					className='badge font-cabin hover:animate-shake inline-flex cursor-pointer border-0 bg-purple-500 text-center align-middle text-base font-semibold text-stone-800 shadow-sm transition-all duration-75 hover:bg-stone-800 hover:text-red-500 hover:shadow-black'
					onClick={() => removeTag(index)}
				>
					{tag}
				</span>
			))}
			<div className='items-left flex flex-1 flex-col justify-between gap-2 text-left'>
				<input
					className={cn(
						'flex-1 bg-transparent px-2 placeholder:italic placeholder:text-stone-500 focus:outline-none focus:ring-0',
					)}
					placeholder='Write attributes separated by a comma'
					type='text'
					id='attribute-input'
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onKeyUp={handleKeyUp}
				/>
				{searchTerm && (
					<div className='align-center absolute z-10 ml-2 mt-10 flex max-h-svh flex-col justify-start rounded dark:bg-stone-700'>
						<ResultList
							tags={tags}
							results={attributesList}
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
	results: Attribute[];
	searchTerm: string;
	handleSelect: (attribute: Attribute) => void;
};

export default function ResultList({
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
				No attribute found
			</div>
		);
	}
	return (
		<>
			<div>
				{results
					.filter(r => !tags.includes(r.name))
					.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
					.map(result => (
						<li
							key={result.name}
							onClick={() => handleSelect(result)}
							className='hover:bg-accent group cursor-pointer list-none rounded-sm px-1 text-stone-200 hover:text-stone-800'
						>
							<>{matchedTerm(result.name, searchTerm)}</>
						</li>
					))}
			</div>
		</>
	);
}
