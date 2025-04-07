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
				className='dropdown form-control flex h-fit w-full flex-col items-center justify-start'
				{...register(name)}
			>
				<div
					tabIndex={0}
					className={cn(
						'font-cabin text-neutral flex h-8 min-h-6 w-full cursor-pointer items-center rounded-md border-none px-1 pl-2 text-sm italic hover:bg-stone-700 dark:bg-stone-700',
						{
							'select-error': errors[name],
							'ring-error': errors[name],
							'ring-2': errors[name],
						},
					)}
				>
					<div className='group flex h-fit w-full flex-row items-center justify-between'>
						<span className='self-left flex text-left'>{placeholder}</span>
						<span
							onClick={handleClearAll}
							className='hover:animate-shake text-error hidden cursor-pointer rounded-lg bg-stone-800 p-2 group-hover:flex'
						>
							Clear All
						</span>
					</div>
				</div>
				<ul
					tabIndex={0}
					className='menu dropdown-content font-cabin autofill:font-cabin text-md z-10 mt-10 h-36 w-full overflow-x-scroll rounded-md text-stone-500 shadow-sm dark:bg-stone-700 autofill:dark:bg-stone-700 dark:active:bg-stone-700'
				>
					{list.map(o => (
						<li
							key={o.value}
							onClick={() => handleSelect(o.value)}
							className={`w-fit cursor-pointer ${
								values.includes(o.value) ? 'text-primary' : ''
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
