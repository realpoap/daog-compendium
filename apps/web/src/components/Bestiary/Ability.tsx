import { useState } from 'react';

type AbilityProps = {
	name: string;
	description: string;
};

const Ability = ({ name, description }: AbilityProps) => {
	const [open, setOpen] = useState(false);

	const openTooltip = () => {
		setOpen(true);
	};
	const closeTooltip = () => {
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	return (
		<div
			className={`tooltip tooltip-bottom hover:tooltip-open ${open ? 'tooltip-open' : ''}`}
			data-tip={description}
		>
			<button
				onMouseDown={openTooltip}
				onMouseUp={closeTooltip}
				onTouchStart={openTooltip}
				onTouchEnd={closeTooltip}
				className='badge badge-md font-noto bg-grey-900 cursor-pointer border-none px-4 py-3 font-semibold shadow-sm hover:bg-purple-500 hover:text-purple-900'
			>
				{name}
			</button>
		</div>
	);
};

export default Ability;
