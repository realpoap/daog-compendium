const NewCreatureSteps = ({ step }: { step: number }) => {
	console.log(step);

	return (
		<>
			<ul className='steps steps-vertical md:steps-horizontal'>
				<li className={`step ${step > 0 ? 'step-accent' : ''}`}>Description</li>
				<li className={`step ${step > 1 ? 'step-accent' : ''}`}>Profile</li>
				<li className={`step ${step > 2 ? 'step-accent' : ''}`}>Actions</li>
				<li className={`step ${step > 3 ? 'step-accent' : 'step'}`}>
					Equipment
				</li>
			</ul>
		</>
	);
};

export default NewCreatureSteps;
