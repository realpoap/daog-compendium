type Props = {
	onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
	text: string;
	index?: number;
};

const TagBadge = ({ onClick, index, text }: Props) => {
	return (
		<>
			<span
				key={index}
				className='badge font-cabin hover:animate-shake bg-primary badge-sm md:badge-lg inline-flex cursor-pointer border-0 text-center align-middle font-semibold text-stone-800 shadow-sm transition-all duration-75 hover:bg-stone-800 hover:text-red-500 hover:shadow-black'
				onClick={onClick}
			>
				{text}
			</span>
		</>
	);
};

export default TagBadge;
