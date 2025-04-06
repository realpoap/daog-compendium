import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';
import TagBadge from '../TagBadge';

type Option = {
	label: string;
	value: string;
};

type Props<T> = {
	name: string;
	list: T[];
	getOptionLabel: (item: T) => string;
	getOptionValue: (item: T) => string;
	values: T[];
	setValues: React.Dispatch<React.SetStateAction<T[]>>;
	placeholder?: string;
};

const MultiSelect = <T extends unknown>({
	name,
	list,
	values,
	setValues,
	getOptionLabel,
	getOptionValue,
	placeholder = 'Select...',
}: Props<T>) => {
	const {
		formState: { errors },
	} = useFormContext();

	const toggleSelect = (item: T) => {
		const value = getOptionValue(item);
		const isSelected = values.some(v => getOptionValue(v) === value);
		if (isSelected) {
			setValues(values.filter(v => getOptionValue(v) !== value));
		} else {
			setValues([...values, item]);
		}
	};

	const handleClearAll = () => setValues([]);

	return (
		<>
			<div className='dropdown form-control w-full'>
				<div
					tabIndex={0}
					className={cn(
						'flex h-8 w-full cursor-pointer items-center rounded-md px-2 text-sm italic hover:bg-stone-700 dark:bg-stone-700',
						{
							'select-error ring-error ring-2': errors[name],
						},
					)}
				>
					<div className='flex w-full items-center justify-between'>
						<span>{placeholder}</span>
						<span
							onClick={handleClearAll}
							className='text-error hover:animate-shake hidden cursor-pointer rounded-lg bg-stone-800 p-2 group-hover:flex'
						>
							Clear All
						</span>
					</div>
				</div>

				<ul
					tabIndex={0}
					className='menu dropdown-content z-10 mt-10 h-36 w-full overflow-y-auto rounded-md shadow-sm dark:bg-stone-700'
				>
					{list.map(item => {
						const value = getOptionValue(item);
						const label = getOptionLabel(item);
						const isSelected = values.some(v => getOptionValue(v) === value);

						return (
							<li
								key={value}
								onClick={() => toggleSelect(item)}
								className={cn('w-fit cursor-pointer', {
									'text-primary': isSelected,
								})}
							>
								<span>{label}</span>
							</li>
						);
					})}
				</ul>
			</div>

			{values.length > 0 && (
				<div className='mt-3 flex flex-wrap gap-2'>
					{values.map(item => (
						<TagBadge
							key={getOptionValue(item)}
							text={getOptionLabel(item)}
							onClick={e => {
								e.stopPropagation();
								toggleSelect(item);
							}}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default MultiSelect;
