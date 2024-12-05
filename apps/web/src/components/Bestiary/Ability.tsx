type AbilityProps = {
	name: string;
	description: string;
};

const Ability = ({ name, description }: AbilityProps) => {
	console.log(description);

	return (
		<div
			className='tooltip tooltip-bottom rounded-md'
			data-tip={description}
		>
			<div className='badge badge-md font-noto cursor-pointer px-4 py-3 hover:opacity-90'>
				{name}
			</div>
		</div>
	);
};

export default Ability;
