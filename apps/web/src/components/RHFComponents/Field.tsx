import React from 'react';
import { useFormContext } from 'react-hook-form';
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
	const {
		formState: { errors },
	} = useFormContext();
	const widthClass =
		width === 'third'
			? 'w-1/3'
			: width === 'half'
				? 'w-1/2'
				: width === 'small'
					? 'w-1/4'
					: 'w-11/12';
	return (
		<div className={`${widthClass} self-center`}>
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
