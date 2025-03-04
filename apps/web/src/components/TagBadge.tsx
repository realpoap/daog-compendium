import { cn } from '@/utils/classNames';

type Props = {
	onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
	text: string;
	button?: boolean;
	index?: number;
};

const TagBadge = ({ onClick, index, text, button = true }: Props) => {
	return (
		<>
			<span
				key={index}
				className={cn(
					`badge font-cabin bg-primary badge-sm md:badge-md inline-flex border-0 text-center align-middle font-semibold text-stone-800 shadow-sm`,

					{
						'hover:animate-shake cursor-pointer transition-all duration-75 hover:bg-stone-800 hover:text-red-500 hover:shadow-black':
							button,
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
