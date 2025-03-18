import { cn } from '@/utils/classNames';
import { SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
	name: string;
	id?: string;
	placeholder?: string;
	type?: string;
	tags: string[];
	setTags: React.Dispatch<SetStateAction<string[]>>;
};

export const Tag = ({ name, id, placeholder, type, setTags, tags }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== ' ' || e.code !== 'Space' || e.which !== 32) return;
		const value = (e.target as HTMLInputElement).value;
		if (!value.trim()) return;
		setTags([...tags, value]);
		(e.target as HTMLInputElement).value = '';
	};

	const removeTag = (index: number) => {
		setTags(tags.filter((_el, i) => i !== Number(index)));
	};
	return (
		<div
			className={cn(
				'font-cabin text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary dark:placeholder:text-neutral flex w-full flex-row flex-wrap items-center gap-2 rounded-lg p-2 shadow-sm placeholder:italic focus:outline-none focus:ring-1 md:text-lg dark:bg-stone-700',
				{
					'select-error': errors[name],
					'ring-error': errors[name],
					'ring-2': errors[name],
				},
			)}
		>
			{tags.map((tag, index) => (
				<span
					key={index}
					className='badge font-cabin bg-primary inline-flex cursor-pointer border-0 text-center align-middle font-semibold text-stone-800 hover:bg-stone-500 hover:text-red-500 md:text-lg'
					onClick={() => removeTag(index)}
				>
					{tag}
				</span>
			))}
			<input
				className={cn(
					'flex-1 bg-transparent px-2 focus:outline-none focus:ring-0',
				)}
				placeholder={placeholder}
				id={id ?? name}
				type={type ?? 'text'}
				{...register(name)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};
