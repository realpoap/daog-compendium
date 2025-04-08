import { cn } from '@/utils/classNames';
import { useFormContext } from 'react-hook-form';

export const Checkbox = ({
	name,
	label,
	id,
	disabled,
	checked,
}: {
	name: string;
	label: string;
	id?: string;
	disabled?: boolean;
	checked?: boolean;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='form-control flex w-min cursor-pointer flex-row items-center gap-2'>
			<input
				className={cn(
					'label checkbox checkbox-sm checkbox-primary cursor-pointer',
					{
						'select-error': errors[name],
						'ring-error': errors[name],
						'ring-2': errors[name],
					},
				)}
				type='checkbox'
				defaultChecked={checked}
				{...register(name)}
				id={`${id}-checkbox`}
				disabled={disabled}
			/>
			<span className='label-text font-cabin text-primary w-fit text-sm font-bold'>
				{label ?? name}
			</span>
		</div>
	);
};
