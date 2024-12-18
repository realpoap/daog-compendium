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
	options: { label: string; value: string; icon: JSX.Element }[];
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
				'select select-bordered font-grenze w-full rounded-lg px-4 py-2 text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
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
				value={'default'}
				disabled
			>
				Magic Type
			</option>
			{options.map(item => (
				<option
					key={item.value}
					value={item.value}
				>
					{capitalizeFirstLetter(item.value)}
				</option>
			))}
		</select>
	);
};
