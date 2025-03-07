import { cn } from '@/utils/classNames';
import { BiSolidLock } from 'rocketicons/bi';
import { FiChevronLeft } from 'rocketicons/fi';

type ActionButtonProps = {
	color: string;
	textColor: string;
	isLoading?: boolean;
	children?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ActionButton = ({
	color,
	textColor,
	isLoading,
	children,
	type,
	onClick,
}: ActionButtonProps) => {
	return (
		<button
			type={type ? type : 'button'}
			disabled={isLoading ? isLoading : false}
			onClick={onClick}
			className={cn(
				`badge badge-lg bg-${color} font-cabin m-y-2 disabled:bg-${color} disabled:hover:glass disabled:hover:bg-${color} mt-8 flex cursor-pointer flex-col items-center justify-center self-center rounded-full px-4 py-2 text-sm font-bold uppercase md:text-base text-${textColor} align-middle transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:opacity-100 disabled:hover:ring-0`,
			)}
		>
			{children}
		</button>
	);
};

type SubmitButtonProps = {
	text: string;
	isLoading: boolean;
	color: string;
	textColor: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SubmitButton = ({
	color,
	textColor,
	text,
	isLoading,
	onClick,
}: SubmitButtonProps) => {
	return (
		<ActionButton
			type='submit'
			color={color}
			textColor={textColor}
			isLoading={isLoading}
			onClick={onClick}
		>
			{!isLoading ? (
				<span className='text-center drop-shadow-lg'>{text}</span>
			) : (
				<span className='loading loading-dots loading-md align-baseline'></span>
			)}
		</ActionButton>
	);
};

type LockButtonProps = {
	text: string;
	isLoading: boolean;
	isValid: boolean;
	color: string;
	textColor: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const LockButton = ({
	color,
	textColor,
	text,
	isLoading,
	isValid,
	onClick,
}: LockButtonProps) => {
	return (
		<ActionButton
			type='submit'
			color={color}
			textColor={textColor}
			isLoading={isLoading}
			onClick={onClick}
		>
			{!isLoading ? (
				<span className='text-center'>
					{!isValid ? (
						<BiSolidLock className='icon-stone-800-lg' />
					) : (
						<>{text}</>
					)}
				</span>
			) : (
				<span className='loading loading-dots loading-md align-baseline'></span>
			)}
		</ActionButton>
	);
};

type SmallCircleButtonProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
	color?: string;
};

export const SmallCircleButton = ({
	children,
	onClick,
	color,
}: SmallCircleButtonProps) => {
	return (
		<button
			className={cn(
				`btn-sm btn-circle bg-accent font-cabin z-20 flex flex-col items-center justify-center self-center text-stone-900 shadow-sm shadow-stone-900 transition-all duration-100 hover:ring-2 hover:ring-stone-200`,
				color,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export const BackButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<button
			className='badge font-cabin mt-4 flex items-center justify-center border-none bg-stone-500 pl-0 align-middle text-base uppercase text-stone-800 hover:bg-stone-200'
			onClick={onClick}
		>
			<FiChevronLeft className='icon-stone-800-sm' /> Back
		</button>
	);
};
