import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Textarea = ({
	name,
	id,
	placeholder,
}: {
	name: string;
	id?: string;
	placeholder?: string;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<textarea
			className={cn(
				'font-grenze w-full rounded-lg px-4 py-2 text-center text-lg text-purple-900 caret-purple-900 shadow-sm placeholder:italic focus:border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 dark:bg-stone-700 dark:text-purple-400 dark:caret-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-400',
				{
					'select-error': errors[name],
					'ring-error': errors[name],
					'ring-2': errors[name],
				},
			)}
			{...register(name)}
			id={id ?? name}
			rows={2}
			placeholder={placeholder}
		/>
	);
};
