import { SmallCircleButton } from '@/components/Buttons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SpinningNumber from 'react-spinning-number';
import { GiDiceFire } from 'rocketicons/gi';
import { useDebounce } from 'use-debounce';

const CharFormStep10 = () => {
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
			<fieldset>
				<span>Roll for your destiny !</span>
				<SmallCircleButton onClick={() => handleRoll(3)}>
					<GiDiceFire className='icon-base dark:icon-background' />
				</SmallCircleButton>
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

export default CharFormStep10;
