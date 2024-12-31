import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Input = ({
	name,
	id,
	placeholder,
	type,
}: {
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
					'font-cabin autofill:font-cabin w-full rounded-lg px-4 py-2 text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:placeholder:text-stone-400 autofill:dark:bg-stone-700 dark:focus:border-purple-400 dark:focus:ring-purple-400 dark:active:bg-stone-700',
					{
						'select-error': errors[name],
						'ring-error': errors[name],
						'ring-2': errors[name],
					},
				)}
				placeholder={placeholder}
				id={id ?? name}
				type={type ?? 'text'}
				{...register(name)}
			/>
		</>
	);
};
