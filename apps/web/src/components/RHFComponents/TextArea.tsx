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
				'font-cabin text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary dark:placeholder:text-neutral w-full rounded-md px-2 py-1 text-center shadow-sm placeholder:italic focus:outline-none focus:ring-1 dark:bg-stone-700',
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
