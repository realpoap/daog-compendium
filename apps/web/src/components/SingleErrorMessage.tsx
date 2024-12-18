import { useFormContext } from 'react-hook-form';

export const SingleErrorMessage = ({
	name,
	id,
}: {
	name: string;
	id?: string;
}) => {
	const {
		formState: { errors },
	} = useFormContext();

	return (
		<>
			{errors[name] ? (
				<label
					htmlFor={id ?? name}
					className='label-text text-error font-noto text-xs italic'
				>
					{errors?.[name]?.message}
				</label>
			) : null}
		</>
	);
};
