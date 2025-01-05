import TagBadge from '@/components/TagBadge';
import { cn } from '@/utils/classNames';
import { Action } from '@api/lib/ZodAction';
import { SetStateAction, useState } from 'react';

type Props = {
	tags: string[];
	setTags: React.Dispatch<SetStateAction<string[]>>;
	actionsList: Action[];
};

export const ActionsTags = ({ setTags, tags, actionsList }: Props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [resultList, setResults] = useState<Action[]>(actionsList);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setResults(
			actionsList.filter(r =>
				r.name.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		);
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
	const handleSelect = (action: Action) => {
		const input = document.getElementById('action-input') as HTMLInputElement;
		input.value = '';
		setSearchTerm('');
		setTags([...tags, action.searchName]);
	};

	const removeTag = (index: number) => {
		setTags(tags.filter((_el, i) => i !== Number(index)));
	};
	return (
		<>
			<div
				className={cn(
					'font-cabin text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary mb-2 flex w-full flex-row flex-wrap items-center gap-2 rounded-lg p-2 text-lg shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700 dark:placeholder:text-stone-400',
				)}
			>
				<div className='items-left flex flex-1 flex-row justify-between gap-2 text-left'>
					<input
						className={cn(
							'flex-1 bg-transparent px-2 placeholder:text-sm placeholder:italic placeholder:text-stone-500 focus:outline-none focus:ring-0',
						)}
						placeholder='Search for existing actions or add new ones'
						type='text'
						id='action-input'
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onKeyUp={handleKeyUp}
					/>
				</div>
			</div>
			{searchTerm && (
				<div
					className={cn(
						`items-left '*:-mt-2' z-10 flex max-h-[20dvh] w-fit flex-col justify-start`,
						{
							'*:dark:bg-stone-700': resultList.length !== 0,
							'*:-mt-2': resultList.length === 0,
						},
					)}
				>
					<ResultList
						tags={tags}
						results={resultList}
						searchTerm={searchTerm}
						handleSelect={handleSelect}
					/>
				</div>
			)}
			<div className='flex flex-row gap-2'>
				{tags.map((tag, index) => (
					<TagBadge
						key={index}
						text={tag}
						onClick={() => removeTag(index)}
					/>
				))}
			</div>
		</>
	);
};

type ResultListProps = {
	tags: string[];
	results: Action[];
	searchTerm: string;
	handleSelect: (action: Action) => void;
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
			<div className='font-cabin flex w-full flex-col items-start justify-start px-2 py-1 align-baseline text-sm italic text-red-500'>
				No action found{' '}
				<span className='text-stone-500'>
					( add a comma{' '}
					<kbd className='kbd-xs rounded bg-stone-300 align-baseline text-stone-800 dark:bg-stone-500 dark:text-stone-200'>
						,
					</kbd>{' '}
					or press{' '}
					<kbd className='kbd-xs rounded bg-stone-300 align-baseline text-stone-800 dark:bg-stone-500 dark:text-stone-200'>
						Enter
					</kbd>{' '}
					to create your entry)
				</span>
			</div>
		);
	}
	return (
		<>
			<div className='ml-2 rounded-sm shadow-md shadow-stone-800'>
				{results
					.filter(r => !tags.includes(r.name))
					.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
					.map(result => (
						<li
							key={result.name}
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
