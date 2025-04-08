import { cn } from '@/utils/classNames';

type Props = {
	onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
	text: string;
	button?: boolean;
	index?: number;
	xl?: boolean;
};

const TagBadge = ({ onClick, index, text, xl, button = true }: Props) => {
	return (
		<>
			<span
				key={index}
				className={cn(
					`badge font-cabin bg-primary badge-sm md:badge-md text-background text-md shadow-xs inline-flex border-0 text-center align-middle font-semibold`,

					{
						'hover:animate-shake hover:bg-background hover:text-error cursor-pointer transition-all duration-75 hover:shadow-black':
							button,
						'h-6 text-[0.9rem] md:size-6': xl,
					},
				)}
				onClick={onClick}
			>
				{text}
			</span>
		</>
	);
};

export default TagBadge;
