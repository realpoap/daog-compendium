import { cn } from '@/utils/classNames';
import { SetStateAction } from 'react';

type Props = {
	tags: string[];
	setTags: React.Dispatch<SetStateAction<string[]>>;
};

export const AttributeTags = ({ setTags, tags }: Props) => {
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

	const removeTag = (index: number) => {
		setTags(tags.filter((el, i) => i !== Number(index)));
	};
	return (
		<div
			className={cn(
				'font-grenze flex w-full flex-row flex-wrap items-center gap-2 rounded-lg p-2 text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:placeholder:text-stone-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
			)}
		>
			{tags.map((tag, index) => (
				<span
					key={index}
					className='badge font-grenze inline-flex cursor-pointer border-0 bg-purple-500 text-center align-middle text-lg font-semibold text-stone-800 hover:bg-stone-500 hover:text-red-500'
					onClick={() => removeTag(index)}
				>
					{tag}
				</span>
			))}
			<input
				className={cn(
					'flex-1 bg-transparent px-2 focus:outline-none focus:ring-0',
				)}
				placeholder='Write attributes separated by a comma'
				type='text'
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
			/>
		</div>
	);
};
