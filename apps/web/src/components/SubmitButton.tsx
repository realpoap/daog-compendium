type Props = {
	text: string;
	isLoading: boolean;
};

const SubmitButton = ({ text, isLoading }: Props) => {
	return (
		<button
			type='submit'
			disabled={isLoading}
			className='bg-accent font-grenze m-y-2 mt-8 flex w-2/3 flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
		>
			{!isLoading ? (
				<span className='text-center'>{text}</span>
			) : (
				<span className='loading loading-dots loading-md align-baseline'></span>
			)}
		</button>
	);
};

export default SubmitButton;
