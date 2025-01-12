import { cn } from '@/utils/classNames';
import { useState } from 'react';

export type Option = {
	label: string;
	value: string | number;
	icon?: JSX.Element;
};

type Props = {
	options: Option[];
	placeholder: string;
} & (SingleProps | MultiProps);

type SingleProps = {
	value?: Option;
	onChange: (value: Option | undefined) => void;
	isMulti?: false;
};

type MultiProps = {
	value: Option[];
	onChange: (value: Option[]) => void;
	isMulti: true;
};

const SelectFilter = ({
	isMulti,
	placeholder,
	value,
	onChange,
	options,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const clearOptions = () => {
		if (isMulti) {
			onChange([]);
		} else {
			onChange(undefined);
		}
	};

	const selectOption = (option: Option) => {
		if (isMulti) {
			if (value?.includes(option)) {
				onChange(value.filter(o => o.value !== option.value));
			} else {
				onChange([...value, option]);
			}
		} else {
			onChange(option);
		}
	};

	return (
		<div
			onClick={() => setIsOpen(prev => !prev)}
			onBlur={() => setIsOpen(false)}
			tabIndex={0}
			className='font-cabin focus:border-primary m-1 flex w-fit flex-col items-start justify-start gap-2 rounded-lg border-stone-200 bg-stone-700 px-2 shadow-lg outline-none'
		>
			<div className='w-full'>
				<div className='flex h-fit w-full flex-row items-center justify-stretch gap-2'>
					<span className='flex flex-1 overflow-hidden'>
						{isMulti
							? value.length === 0 && (
									<span className='font-grenze text-lg text-stone-500'>
										{placeholder}
									</span>
								)
							: value === null && (
									<span className='font-grenze text-lg text-stone-500'>
										{placeholder}
									</span>
								)}
						{isMulti
							? value.map(v => (
									<button
										key={`btn-${v.value}`}
										className='btn btn-sm btn-ghost hover:animate-shake hover:bg-stone-900 hover:text-red-500'
										onClick={e => {
											e.stopPropagation();
											selectOption(v);
										}}
									>
										{v.label}
									</button>
								))
							: value?.value}
					</span>
					<button
						onClick={e => {
							e.stopPropagation();
							clearOptions();
						}}
						className='hover:text-primary cursor-pointer bg-none p-0 text-3xl text-stone-500'
					>
						&times;
					</button>
					<div className='divider divider-horizontal m-0 w-1 rounded'></div>

					<span className='hover:text-primary mt-1 cursor-pointer bg-none p-0 text-2xl text-stone-500'>
						&#9662;
					</span>
				</div>
				<ul
					className={cn(
						`h-42 z-50 flex w-full list-none flex-col flex-wrap rounded-lg bg-stone-700`,
						{
							hidden: !isOpen,
						},
					)}
				>
					{options.map(o => (
						<li
							onClick={e => {
								e.stopPropagation();
								selectOption(o);
								setIsOpen(false);
							}}
							className={cn(
								'w-full cursor-pointer rounded-md p-1 hover:bg-stone-500',
								{
									hidden: isMulti
										? value.includes(o)
										: value?.value === o.value,
								},
							)}
							key={o.value}
						>
							{o.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SelectFilter;
