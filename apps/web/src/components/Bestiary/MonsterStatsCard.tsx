import { Creature } from '@api/lib/ZodCreature';
import { GiGlassHeart, GiPotionBall } from 'rocketicons/gi';
import Collapsible from '../Collapsible';
import CalculatedStats from './CalculatedStats';
import StatsTable from './StatsTable';

type Props = {
	monster: Creature;
};

const MonsterStatsCard = ({ monster }: Props) => {
	return (
		<div className='card bg-card flex w-full flex-col items-center gap-2 rounded-lg p-2'>
			<h3 className='font-grenze text-4xl font-semibold tracking-wider'>
				Stats
			</h3>
			<div className='flex w-full flex-row items-end justify-center gap-8 align-baseline'>
				<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
					<div className='relative flex'>
						<GiGlassHeart className='icon-error icon-2xl absolute animate-ping opacity-50' />
						<GiGlassHeart className='icon-error icon-2xl relative drop-shadow-md' />
					</div>
					<p className='font-cabin align-baseline text-lg font-semibold text-red-500'>
						{monster?.health}
					</p>
					<p className='font-cabin align-baseline text-sm font-light text-stone-500'>
						(1d3 +{monster?.stats?.VIT && Math.floor(monster?.stats?.VIT / 10)})
					</p>
				</div>
				{monster?.isCaster && (
					<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
						<div className='relative flex'>
							<GiPotionBall className='icon-info icon-3xl absolute animate-ping opacity-50' />
							<GiPotionBall className='icon-info icon-3xl relative drop-shadow-md' />
						</div>
						<p className='font-cabin align-baseline text-lg font-semibold text-indigo-500'>
							{monster?.spirit}
						</p>
						<p className='font-cabin align-baseline text-sm font-light text-stone-500'>
							(1d3 +
							{monster?.stats?.SEN && Math.floor(monster?.stats?.SEN / 10)})
						</p>
					</div>
				)}
			</div>
			<CalculatedStats monster={monster} />
			<div className='md:w-[54dvw] lg:w-2/5'>
				<Collapsible title='show stats'>
					<StatsTable creature={monster} />
				</Collapsible>
			</div>
		</div>
	);
};

export default MonsterStatsCard;
