import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';
import { Option as SelectOption } from '../SpellList/SelectFilter';

export const Select = ({
	name,
	options,
	id,
	defaultValue,
	required,
	disabled,
}: {
	name: string;
	options: Array<SelectOption | string>;
	id?: string;
	defaultValue: string;
	required?: boolean;
	disabled?: boolean;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<select
			disabled={disabled}
			defaultValue={defaultValue}
			required={required}
			className={cn(
				'select select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral h-8 min-h-6 w-full rounded-md px-2 py-0 shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
				{
					'select-error': errors[name],
					'ring-error': errors[name],
					'ring-1': errors[name],
				},
			)}
			{...register(name)}
			id={id ?? name}
		>
			<option
				value={undefined}
				hidden
				disabled
			>
				{id}
			</option>
			{options.map(item => (
				<option
					key={typeof item === 'string' ? item : item.label}
					value={typeof item === 'string' ? item : item.value}
					className={cn(
						'font-cabin text-content text-base font-normal capitalize',
					)}
				>
					{typeof item === 'string' && capitalizeFirstLetter(item)}
					{typeof item !== 'string' &&
						typeof item.value === 'string' &&
						capitalizeFirstLetter(item.label)}
				</option>
			))}
		</select>
	);
};
