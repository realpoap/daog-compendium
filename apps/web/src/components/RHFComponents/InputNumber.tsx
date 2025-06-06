import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const InputNumber = ({
	name,
	id,
	placeholder,
	defaultValue,
	step,
	min,
	max,
}: {
	name: string;
	id?: string;
	placeholder?: string;
	defaultValue?: string;
	step?: string;
	min?: string;
	max?: string | number;
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
				placeholder={placeholder ? placeholder : ''}
				defaultValue={defaultValue ? defaultValue : '0'}
				min={min ? min : '0'}
				max={max ? max : '10000'}
				className={cn(
					'font-cabin text-md dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-secondary caret-secondary focus:border-secondary focus:ring-secondary h-8 w-full rounded-md px-2 py-1 text-center shadow-sm placeholder:italic focus:outline-none focus:ring-1 dark:bg-stone-700',
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
