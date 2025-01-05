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
				className={cn('label checkbox checkbox-primary cursor-pointer', {
					'select-error': errors[name],
					'ring-error': errors[name],
					'ring-2': errors[name],
				})}
				type='checkbox'
				defaultChecked={false}
				{...register(name)}
				id={`${id}-checkbox`}
			/>
			<span className='label-text font-cabin text-primary text-base font-bold'>
				{label ?? name}
			</span>
		</div>
	);
};
