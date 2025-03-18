import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const InputNumber = ({
	name,
	id,
	placeholder,
	defaultValue,
	step,
	min,
}: {
	name: string;
	id?: string;
	placeholder?: string;
	defaultValue?: string;
	step?: string;
	min?: string;
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
				step={step ? step : '1'}
				max={100000}
				placeholder={placeholder ? placeholder : ''}
				defaultValue={defaultValue ? defaultValue : '0'}
				min={min ? min : '0'}
				className={cn(
					'font-cabin text-md dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-secondary caret-secondary focus:border-secondary focus:ring-secondary w-full rounded-md px-2 py-1 shadow-sm placeholder:italic focus:outline-none focus:ring-1 dark:bg-stone-700',
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
