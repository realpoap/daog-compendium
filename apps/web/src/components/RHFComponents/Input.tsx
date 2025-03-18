import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Input = ({
	name,
	id,
	placeholder,
	type,
	disabled,
}: {
	disabled?: boolean;
	name: string;
	id?: string;
	placeholder?: string;
	type?: string;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<input
				className={cn(
					'disabled:glass font-cabin autofill:font-cabin text-primary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary text-md dark:placeholder:text-neutral w-full rounded-md px-2 py-1 shadow-sm placeholder:italic focus:outline-none focus:ring-1 disabled:text-stone-800 dark:bg-stone-700 autofill:dark:bg-stone-700 dark:active:bg-stone-700',
					{
						'select-error': errors[name],
						'ring-error': errors[name],
						'ring-2': errors[name],
					},
				)}
				placeholder={placeholder}
				id={id ?? name}
				disabled={disabled}
				type={type ?? 'text'}
				{...register(name)}
			/>
		</>
	);
};
