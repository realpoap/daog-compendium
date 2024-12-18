import { Controller } from 'react-hook-form';

export const SingleErrorMessage = ({ name }: { name: string }) => {
	return (
		<Controller
			name={name}
			render={({ fieldState: { error } }) => (
				<p className='label-text text-error font-noto text-xs italic'>
					{error?.message}
				</p>
			)}
		/>
	);
};
