import SubmitButton from '../../../SubmitButton';

const ResumeStep = ({
	handlePrevious,
	isLoading,
}: {
	handlePrevious: (step: number) => void;
	isLoading: boolean;
}) => {
	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => handlePrevious(4)}
				>
					&#10094; Prev
				</button>
				<SubmitButton
					text='Create'
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default ResumeStep;
