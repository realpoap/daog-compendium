import React from 'react';
import { Label } from './Label';
import { SingleErrorMessage } from './SingleErrorMessage';

export const Field = (props: {
	name: string;
	width?: string;
	id?: string;
	label?: string;
	withoutError?: boolean;
	children: React.ReactNode;
}) => {
	const { name, id, label, withoutError = false, children, width } = props;
	return (
		<div className={`${width === 'small' ? 'w-1/3' : 'w-full'}`}>
			<Label
				name={name}
				id={id ?? name}
				label={label ?? name}
			/>
			{children}
			{withoutError ? null : <SingleErrorMessage name={name} />}
		</div>
	);
};
