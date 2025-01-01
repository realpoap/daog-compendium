import { ActionButton, SubmitButton } from '@/components/Buttons';
import { RiArrowDropLeftLine } from 'rocketicons/ri';

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
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handlePrevious(4)}
				>
					<span className='pr-4 align-middle'>
						<RiArrowDropLeftLine className='icon-stone-800-base' /> Prev
					</span>
				</ActionButton>
				<SubmitButton
					text='Create'
					isLoading={isLoading}
					color='accent'
					textColor='stone-800'
				/>
			</div>
		</div>
	);
};

export default ResumeStep;
