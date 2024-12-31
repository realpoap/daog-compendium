type Props = {
	text: string;
	isLoading: boolean;
};

const SubmitButton = ({ text, isLoading }: Props) => {
	return (
		<button
			type='submit'
			disabled={isLoading}
			className='bg-accent font-cabin m-y-2 disabled:bg-accent disabled:hover:glass disabled:hover:bg-accent mt-8 flex max-h-fit max-w-fit cursor-pointer flex-col items-center justify-center self-center rounded-full px-8 py-2 text-base font-bold uppercase text-stone-900 transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:opacity-100 disabled:hover:ring-0'
		>
			{!isLoading ? (
				<span className='text-center drop-shadow-lg'>{text}</span>
			) : (
				<span className='loading loading-dots loading-md align-baseline'></span>
			)}
		</button>
	);
};

export default SubmitButton;
