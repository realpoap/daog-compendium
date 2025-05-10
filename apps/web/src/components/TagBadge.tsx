import { cn } from '@/utils/classNames';

type Props = {
	onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
	text: string;
	tooltip?: string;
	button?: boolean;
	index?: number;
	xl?: boolean;
};

const TagBadge = ({
	onClick,
	index,
	tooltip,
	text,
	xl,
	button = true,
}: Props) => {
	return (
		<div
			className='tooltip tooltip-bottom gap'
			data-tip={tooltip}
		>
			<span
				key={index}
				className={cn(
					`badge font-cabin bg-primary badge-sm md:badge-md text-background text-md shadow-xs inline-flex border-0 text-center align-middle font-semibold capitalize`,

					{
						'hover:animate-shake hover:bg-background hover:text-error cursor-pointer transition-all duration-75 hover:shadow-black':
							button,
						'h-6 text-[0.9rem]': xl,
						'glass cursor-default opacity-70': !button,
					},
				)}
				onClick={onClick}
			>
				{text}
			</span>
		</div>
	);
};

export default TagBadge;
