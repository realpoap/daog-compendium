import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const InputNumber = ({
	name,
	id,
	placeholder,
	defaultValue,
	step,
}: {
	name: string;
	id?: string;
	placeholder?: string;
	defaultValue?: number;
	step?: number;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<input
				id={id ?? name}
				{...register(name, {
					valueAsNumber: true,
					required: true,
				})}
				type='number'
				step={step ? step : 1}
				max={100000}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className={cn(
					'font-cabin text-md w-full rounded-md px-2 py-1 text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
					{
						'select-error': errors[name],
						'ring-error': errors[name],
						'ring-2': errors[name],
					},
				)}
			/>
		</>
	);
};
