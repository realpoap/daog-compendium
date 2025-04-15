import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SpinningNumber from 'react-spinning-number';
import { GiDiceFire } from 'rocketicons/gi';
import { useDebounce } from 'use-debounce';

const CharFormStep12 = () => {
	const { setValue } = useFormContext();
	const [rolledDestiny, setRolledDestiny] = useState<number>();
	const debouncedRoll = useDebounce(rolledDestiny, 500);
	useEffect(() => {
		setValue('profile.destiny', rolledDestiny);
	}, [debouncedRoll]);

	const handleRoll = (dice: number) => {
		const roll = Math.ceil(Math.random() * dice);
		setRolledDestiny(roll);
	};

	return (
		<div>
			<fieldset className='flex flex-col items-center gap-2'>
				<span>Roll for your destiny !</span>
				<div
					className='btn btn-accent btn-circle'
					onClick={() => handleRoll(3)}
				>
					<GiDiceFire className='icon-base dark:icon-background' />
				</div>
				<SpinningNumber
					fontSize={1}
					stagger={100}
				>
					{debouncedRoll[0] ? debouncedRoll[0] : 0}
				</SpinningNumber>
			</fieldset>
		</div>
	);
};

export default CharFormStep12;
