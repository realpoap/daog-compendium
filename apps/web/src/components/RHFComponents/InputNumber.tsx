import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const InputNumber = ({
	name,
	id,
	placeholder,
}: {
	name: string;
	id?: string;
	placeholder?: number;
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
				max={1000}
				min={0}
				defaultValue={placeholder}
				className={cn(
					'font-grenze w-full rounded-lg px-4 py-2 text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
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
