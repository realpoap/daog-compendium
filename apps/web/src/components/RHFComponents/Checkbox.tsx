import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Checkbox = ({
	name,
	label,
	id,
}: {
	name: string;
	id?: string;
	label: string;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='form-control flex cursor-pointer flex-row items-center gap-2 space-x-1'>
			<input
				className={cn('label checkbox checkbox-accent cursor-pointer', {
					'select-error': errors[name],
					'ring-error': errors[name],
					'ring-2': errors[name],
				})}
				type='checkbox'
				defaultChecked={false}
				{...register(name)}
				id={id}
			/>
			<span className='label-text font-cabin text-accent text-sm'>
				{label ?? name}
			</span>
		</div>
	);
};
