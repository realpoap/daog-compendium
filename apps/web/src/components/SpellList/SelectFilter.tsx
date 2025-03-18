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
			className='font-cabin active:border-primary active:border-1 focus:border-1 focus:border-primary bg-tile m-1 flex w-fit flex-col items-start justify-start gap-2 rounded-lg border-stone-200 px-2 shadow-lg outline-none'
		>
			<div className='w-full flex-col items-center'>
				<div className='flex h-fit w-full flex-row items-center justify-stretch gap-2'>
					<span className='flex flex-1 overflow-scroll'>
						{isMulti
							? value.length === 0 && (
									<span className='font-grenze text-neutral-content text-lg'>
										{placeholder}
									</span>
								)
							: value === null && (
									<span className='font-grenze text-neutral-content text-lg'>
										{placeholder}
									</span>
								)}
						{isMulti
							? value.map(v => (
									<button
										key={`btn-${v.value}`}
										className='btn btn-sm btn-ghost hover:animate-shake hover:bg-background hover:text-error'
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
						className='hover:text-primary text-neutral-content cursor-pointer bg-none p-0 text-3xl'
					>
						&times;
					</button>
					<div className='divider divider-horizontal m-0 w-1 rounded'></div>

					<span className='hover:text-primary text-neutral-content mt-1 cursor-pointer bg-none p-0 text-2xl'>
						&#9662;
					</span>
				</div>
				<div
					className={cn('flex flex-col items-center', {
						hidden: !isOpen,
					})}
				>
					<ul
						className={cn(
							`shadow-background h-34 bg-tile align-center absolute z-50 mx-4 mt-2 flex w-full list-none flex-col flex-wrap items-center justify-start rounded-lg p-2 shadow-lg *:m-0 md:w-1/2`,
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
									'hover:bg-primary hover:text-background w-fit cursor-pointer rounded-md px-2',
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
		</div>
	);
};

export default SelectFilter;
