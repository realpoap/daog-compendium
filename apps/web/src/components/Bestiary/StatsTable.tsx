import { Creature } from '@api/lib/ZodCreature';
import StatsGroup from './StatsGroup';

type Props = {
	creature: Creature;
};

const StatsTable = ({ creature }: Props) => {
	return (
		<div className='flex flex-row flex-wrap items-center justify-center p-0 md:flex-row md:gap-0'>
			<StatsGroup
				text='Adroitness'
				inputs={Object.fromEntries(Object.entries(creature.stats).slice(0, 3))}
			/>
			<StatsGroup
				text='Constitution'
				inputs={Object.fromEntries(Object.entries(creature.stats).slice(3, 6))}
			/>
			<StatsGroup
				text='Perception'
				inputs={Object.fromEntries(Object.entries(creature.stats).slice(6, 9))}
			/>
			<StatsGroup
				text='Shroudness'
				inputs={Object.fromEntries(Object.entries(creature.stats).slice(9, 12))}
			/>
		</div>
	);
};

export default StatsTable;
