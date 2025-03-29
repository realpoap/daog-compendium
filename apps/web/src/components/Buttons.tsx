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
				`badge badge-lg bg-${color} font-cabin m-y-2 relative z-40 disabled:bg-${color} disabled:glass disabled:hover:bg-${color} mt-8 flex cursor-pointer flex-col items-center justify-center self-center rounded-full px-4 py-2 text-sm font-bold uppercase md:text-base text-${textColor} align-middle transition-all duration-100 before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[800ms] focus:ring-2 focus:ring-stone-200 disabled:opacity-100 disabled:hover:ring-0 dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)]`,
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
				`btn-xs md:btn-sm btn-circle bg-accent font-cabin text-background shadow-bakground relative z-50 flex cursor-pointer flex-col items-center justify-center self-center shadow-sm transition-all duration-100 before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[800ms] active:ring-2 active:ring-stone-200 dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)]`,
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
			className='badge badge-md font-cabin bg-tile hover:bg-neutral text-background mt-4 border-none text-sm uppercase'
			onClick={onClick}
		>
			<FiChevronLeft className='icon-background-sm' />
			<span className='mx-0'>Back</span>
		</button>
	);
};
