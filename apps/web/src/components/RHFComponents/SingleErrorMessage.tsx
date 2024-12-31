import { Controller } from 'react-hook-form';

export const SingleErrorMessage = ({ name }: { name: string }) => {
	return (
		<Controller
			name={name}
			render={({ fieldState: { error } }) => (
				<p className='label-text text-error font-cabin pt-1 text-sm italic'>
					{error?.message}
				</p>
			)}
		/>
	);
};
