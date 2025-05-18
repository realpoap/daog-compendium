import { cn } from '@/utils/classNames';
import { SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SpinningNumber from 'react-spinning-number';
import { GiDiceFire } from 'rocketicons/gi';
import { useDebounce } from 'use-debounce';

type Props = {
	clicked: boolean;
	setClicked: React.Dispatch<SetStateAction<boolean>>;
};

const CharFormStep12 = ({ clicked, setClicked }: Props) => {
	const { setValue } = useFormContext();
	const [rolledDestiny, setRolledDestiny] = useState<number>();
	const debouncedRoll = useDebounce(rolledDestiny, 500);
	useEffect(() => {
		setValue('profile.destiny', rolledDestiny);
	}, [debouncedRoll]);

	const handleRoll = (dice: number) => {
		if (!clicked) {
			const roll = Math.ceil(Math.random() * dice);
			setRolledDestiny(roll);

			setClicked(true);
		}
	};

	return (
		<div>
			<fieldset className='flex flex-col items-center gap-2'>
				<span>Roll for your destiny !</span>
				<div
					className={cn('btn btn-accent btn-circle', {
						'btn-disabled border-1 border-neutral': clicked,
					})}
					onClick={() => handleRoll(3)}
				>
					<GiDiceFire
						className={cn('icon-base dark:icon-background', {
							'dark:icon-neutral': clicked,
						})}
					/>
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
