import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Select = ({
	name,
	options,
	id,
	defaultValue,
}: {
	name: string;
	options: Array<{ label: string; value: string; icon?: JSX.Element } | string>;
	id?: string;
	defaultValue: string;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<select
			defaultValue={defaultValue}
			className={cn(
				'select select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral *:font-cabin h-8 min-h-6 w-full rounded-md px-2 py-0 shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
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
					key={typeof item === 'string' ? item : item.value}
					value={typeof item === 'string' ? item : item.value}
				>
					{capitalizeFirstLetter(typeof item === 'string' ? item : item.value)}
				</option>
			))}
		</select>
	);
};
