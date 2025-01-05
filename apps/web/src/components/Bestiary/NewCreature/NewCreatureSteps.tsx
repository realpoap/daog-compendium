const NewCreatureSteps = ({ step }: { step: number }) => {
	return (
		<>
			<ul className='steps font-cabin steps-horizontal md:steps-horizontal z-20 dark:text-stone-200'>
				<li
					className={`step ${step > 0 ? 'step-accent' : ''} ${step === 1 ? 'border-1 border-stone-200' : ''} `}
				>
					Description
				</li>
				<li className={`step ${step > 1 ? 'step-accent' : ''}`}>Profile</li>
				<li className={`step ${step > 2 ? 'step-accent' : ''}`}>Actions</li>
				<li className={`step ${step > 3 ? 'step-accent' : 'step'}`}>
					Equipment
				</li>
				<li className={`step ${step > 4 ? 'step-accent' : 'step'}`}>
					Validation
				</li>
			</ul>
		</>
	);
};

export default NewCreatureSteps;
