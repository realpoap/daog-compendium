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
	options: { label: string; value: string; icon?: JSX.Element }[];
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
				'select select-bordered font-cabin w-full rounded-lg px-4 py-2 text-lg text-purple-900 caret-purple-900 shadow-sm focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400 peer-default:dark:text-stone-400',
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
					key={item.value}
					value={item.value}
					className='active:bg-accent hover:bg-accent focus-within:bg-accent'
				>
					{capitalizeFirstLetter(item.value)}
				</option>
			))}
		</select>
	);
};
