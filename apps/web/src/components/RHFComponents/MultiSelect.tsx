import { cn } from '@/utils/classNames';
import { SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import TagBadge from '../TagBadge';

type Props = {
	name: string;
	list: { label: string; value: string; icon?: JSX.Element }[];
	values: string[];
	setValues: React.Dispatch<SetStateAction<string[]>>;
	placeholder?: string;
};

const MultiSelect = ({ name, list, values, setValues, placeholder }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const handleSelect = (option: string) => {
		const isSelected = values.includes(option);
		if (isSelected) {
			setValues(values.filter(v => v !== option));
		} else {
			setValues([...values, option]);
		}
	};

	const handleClearAll = () => {
		setValues([]);
	};

	return (
		<>
			<div
				className='dropdown form-control dropdown-hover flex h-fit w-full flex-col items-center justify-start'
				{...register(name)}
			>
				<div
					tabIndex={0}
					className={cn(
						'font-cabin flex h-11 w-full cursor-pointer items-center rounded-md border-none p-2 pl-4 text-sm italic text-stone-500 hover:bg-stone-700 dark:bg-stone-700',
						{
							'select-error': errors[name],
							'ring-error': errors[name],
							'ring-2': errors[name],
						},
					)}
				>
					<div className='justify-left group flex h-fit w-full flex-row items-center hover:justify-center'>
						<span className='self-left flex w-full text-left group-hover:hidden'>
							{placeholder}
						</span>
						<span
							onClick={handleClearAll}
							className='hidden w-full cursor-pointer self-center text-red-500 group-hover:flex'
						>
							Clear All
						</span>
					</div>
				</div>
				<ul className='menu dropdown-content bg-base-100 font-cabin autofill:font-cabin text-primary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary z-10 mt-10 h-48 w-full overflow-x-scroll rounded-md text-lg shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700 dark:placeholder:text-stone-400 autofill:dark:bg-stone-700 dark:active:bg-stone-700'>
					{list.map(o => (
						<li
							key={o.value}
							onClick={() => handleSelect(o.value)}
							className={`w-fit cursor-pointer ${
								values.includes(o.value) ? 'bg-gray-500' : ''
							}`}
						>
							<span>{o.label}</span>
						</li>
					))}
				</ul>
			</div>
			<div>
				{values.length > 0 && (
					<div className='mb-2 mt-3 flex flex-wrap gap-2'>
						{values.map(v => {
							const selectedOption = list.find(o => o.value === v);
							return (
								<TagBadge
									key={v}
									text={v}
									onClick={e => {
										e.stopPropagation();
										if (selectedOption) {
											handleSelect(selectedOption?.value);
										}
									}}
								/>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default MultiSelect;
