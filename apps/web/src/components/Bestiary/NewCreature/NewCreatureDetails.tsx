import { capitalizeFirstLetter } from '@/utils/capitalize';
import { NewCreature } from '@api/lib/ZodCreature';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiCrownedSkull,
	GiFairyWand,
	GiGlassHeart,
	GiRoundStar,
	GiSemiClosedEye,
	GiSwordWound,
	GiTentacleHeart,
} from 'rocketicons/gi';
import Ability from '../Ability';

const NewCreatureDetails = ({
	creature,
	step,
}: {
	creature: NewCreature;
	step: number;
}) => {
	return (
		<div className='indicator'>
			<div className='skeleton my-8 flex min-w-full flex-col items-center justify-start gap-1 rounded-xl bg-stone-700 p-4 text-purple-400 shadow-xl'>
				<div className='flex w-full flex-row items-start justify-end'>
					<div className='indicator -right-6 -top-4'>
						{creature?.isBoss && (
							<div className='indicator-item badge bg-goldenrod-500 glass badge-lg absolute size-6 animate-bounce content-center items-center rounded-full p-0 shadow-sm shadow-stone-900'>
								<GiCrownedSkull className='dark:icon-stone-800-sm' />
							</div>
						)}
					</div>
				</div>
				{creature.name !== '' ? (
					<p className='font-grenze text-4xl font-bold'>
						{creature.name} {creature.subtype}
					</p>
				) : (
					<p className='skeleton h-12 w-[20vw] dark:bg-stone-700'></p>
				)}

				{creature.level !== 0 && (
					<p className='font-grenze text-3xl font-bold dark:text-stone-500'>
						<GiRoundStar className='icon-lg icon-stone-500' /> {creature.level}
					</p>
				)}
				<p className='font-cabin text-xl font-semibold capitalize italic dark:text-stone-500'>
					{creature?.size as string} {creature?.alignment as string}{' '}
					{creature?.type as string}
				</p>
				{creature?.attributes && (
					<div className='flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-visible px-2'>
						{creature.attributes.map(a => (
							<div
								key={a.name}
								className='badge badge-md font-cabin cursor-pointer border-none bg-stone-500 px-4 py-3 font-semibold text-stone-700 shadow-sm'
							>
								{a.name}
							</div>
						))}
					</div>
				)}

				{step > 1 && (
					<>
						<div className='my-2 flex w-full flex-row items-center justify-center gap-8'>
							{creature.health != null && (
								<div className='font-cabin my-2 flex flex-row items-center justify-center gap-1 text-xl font-bold text-stone-500'>
									<GiGlassHeart className='icon-lg icon-stone-500' />
									<p className='text-2xl'>{creature.health}</p>
								</div>
							)}
							{creature.spirit != null && (
								<div className='font-cabin my-2 flex flex-row items-center justify-center gap-1 text-xl font-bold text-stone-500'>
									<GiTentacleHeart className='icon-lg icon-stone-500' />
									<p className='text-2xl'>{creature.spirit}</p>
								</div>
							)}
						</div>
						<div className='font-cabin -mt-3 flex w-full flex-row flex-wrap items-center justify-center gap-4 text-lg font-bold text-stone-500'>
							{creature.attack != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiSwordWound className='icon-base icon-stone-500' />
									<p>Attack :</p>
									<p>
										{creature.attack}{' '}
										{/* <span className='text-lg'>
											{`${creature.stats?.STR != 0 ? `(+ ${Math.floor(creature.stats.STR / 10)} dmg)` : ''}`}
										</span> */}
									</p>
								</div>
							)}
							{creature.defense != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiCheckedShield className='icon-base icon-stone-500' />
									<p>Defense :</p>
									<p>{creature.defense}</p>
								</div>
							)}
							{creature.armor != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiArmorVest className='icon-base icon-stone-500' />
									<p>Armor :</p>
									<p>{creature.armor}</p>
								</div>
							)}
							{creature.ranged != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiBullseye className='icon-base icon-stone-500' />
									<p>Ranged :</p>
									<p>{creature.ranged}</p>
								</div>
							)}
							{creature.perception != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiSemiClosedEye className='icon-base icon-stone-500' />
									<p>Perception :</p>
									<p>{creature.perception}</p>
								</div>
							)}
							{creature.magic != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiFairyWand className='icon-base icon-stone-500' />
									<p>Magic :</p>
									<p>{creature?.magic}</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default NewCreatureDetails;
