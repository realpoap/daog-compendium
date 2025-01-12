import { type Roll } from '@/utils/calculateStats';
import { cn } from '@/utils/classNames';
import SpinningNumber from 'react-spinning-number';

type Props = {
	rolledStat: Roll;
};

const RolledStat = ({ rolledStat }: Props) => {
	const score = rolledStat?.score ? rolledStat?.score : 15;
	return (
		<div
			className='tooltip'
			data-tip={`${rolledStat.stat} + ${rolledStat.roll} + ${rolledStat.avRoll}`}
		>
			<span
				className={cn('text-accent animate-pulse', {
					'text-red-500': rolledStat?.state === 'fumble',
					'text-yellow-500': rolledStat?.state === 'crit',
				})}
			>
				<SpinningNumber fontSize={1}>{score}</SpinningNumber>
			</span>
		</div>
	);
};

export default RolledStat;
