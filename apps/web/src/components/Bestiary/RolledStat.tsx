import { type Roll } from '@/utils/calculateStats';
import { cn } from '@/utils/classNames';
import SpinningNumber from 'react-spinning-number';

type Props = {
	rolledStat: Roll | undefined;
	rolled: boolean;
	initialValue: number;
};

const RolledStat = ({ rolledStat, initialValue, rolled }: Props) => {
	const score = rolled && rolledStat ? rolledStat?.score : initialValue;
	return (
		<div
			className='tooltip'
			data-tip={
				rolledStat
					? `${rolledStat.stat} + ${rolledStat.roll} + ${rolledStat.avRoll}`
					: ``
			}
		>
			<span
				className={cn('text-stone-200', {
					'text-red-500': rolledStat?.state === 'fumble',
					'text-accent': rolledStat?.state === 'crit',
					'animate-pulse': rolled,
				})}
			>
				<SpinningNumber fontSize={1}>{score}</SpinningNumber>
			</span>
		</div>
	);
};

export default RolledStat;
