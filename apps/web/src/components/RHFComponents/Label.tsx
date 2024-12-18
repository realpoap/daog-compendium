import React from 'react';

export const Label = ({
	name,
	id,
	label,
}: {
	name: string;
	id?: string;
	label?: string;
}) => {
	return (
		<label
			htmlFor={id ?? name}
			className='label font-noto pb-1 text-xs capitalize text-stone-500'
		>
			{label ?? name}
		</label>
	);
};
