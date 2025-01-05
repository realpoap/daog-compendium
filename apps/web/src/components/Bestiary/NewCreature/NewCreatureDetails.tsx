import { NewCreature } from '@api/lib/ZodCreature';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiCrownedSkull,
	GiFairyWand,
	GiGlassHeart,
	GiHood,
	GiPotionBall,
	GiRoundStar,
	GiSemiClosedEye,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';

const NewCreatureDetails = ({
	creature,
	step,
}: {
	creature: NewCreature;
	step: number;
}) => {
	return (
		<div className='indicator w-full p-4'>
			<div className='skeleton my-8 flex min-h-40 min-w-full flex-col items-center justify-start gap-1 rounded-xl bg-stone-700 p-4 text-purple-400 shadow-xl'>
				<div className='flex w-full flex-row items-start justify-end'>
					<div className='indicator -right-6 -top-4'>
						{creature?.isBoss && (
							<div className='indicator-item badge bg-goldenrod-500 glass badge-lg absolute size-6 animate-bounce content-center items-center rounded-full p-0 shadow-sm shadow-stone-900'>
								<GiCrownedSkull className='dark:icon-stone-800-sm' />
							</div>
						)}
					</div>
				</div>
				{creature.name !== '' && (
					<p className='font-grenze text-4xl font-bold'>
						{creature.name} {creature.subtype}
					</p>
				)}

				{creature.level !== 0 && (
					<p className='font-grenze text-3xl font-bold dark:text-stone-200'>
						<GiRoundStar className='icon-lg icon-stone-200' /> {creature.level}
					</p>
				)}
				<p className='font-cabin text-xl font-semibold capitalize italic dark:text-stone-200'>
					{creature?.size as string} {creature?.alignment as string}{' '}
					{creature?.type as string}
				</p>
				{creature?.attributes && (
					<div className='flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-visible px-2'>
						{creature.attributes.map(a => (
							<div
								key={a.name}
								className='badge badge-md font-cabin cursor-pointer border-none bg-stone-200 px-4 py-3 font-semibold text-stone-700 shadow-sm'
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
								<div className='font-cabin my-2 flex flex-row items-center justify-center gap-1 text-xl font-bold text-stone-200'>
									<GiGlassHeart className='icon-lg icon-stone-200' />
									<p className='pl-1 text-2xl'> {creature.health}</p>
								</div>
							)}
							{creature.spirit != null && (
								<div className='font-cabin my-2 flex flex-row items-center justify-center gap-1 text-xl font-bold text-stone-200'>
									<GiPotionBall className='icon-xl icon-stone-200' />
									<p className='text-2xl'>{creature.spirit}</p>
								</div>
							)}
						</div>
						<div className='font-cabin -mt-3 flex w-full flex-row flex-wrap items-center justify-center gap-4 text-lg font-bold text-stone-200'>
							{creature.initiative != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiThunderSkull className='icon-base icon-stone-200' />
									{/* <p>Initiative :</p> */}
									<p>{creature.initiative}</p>
								</div>
							)}
							{creature.attack != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiSwordWound className='icon-base icon-stone-200' />
									{/* <p>Attack :</p> */}
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
									<GiCheckedShield className='icon-base icon-stone-200' />
									{/* <p>Defense :</p> */}
									<p>{creature.defense}</p>
								</div>
							)}
							{creature.armor != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiArmorVest className='icon-base icon-stone-200' />
									{/* <p>Armor :</p> */}
									<p>{creature.armor}</p>
								</div>
							)}

							{creature.ranged != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiBullseye className='icon-base icon-stone-200' />
									{/* <p>Ranged :</p> */}
									<p>{creature.ranged}</p>
								</div>
							)}
							{creature.perception != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiSemiClosedEye className='icon-base icon-stone-200' />
									{/* <p>Perception :</p> */}
									<p>{creature.perception}</p>
								</div>
							)}
							{creature.discretion != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiHood className='icon-base icon-stone-200' />
									{/* <p>Discretion :</p> */}
									<p>{creature.discretion}</p>
								</div>
							)}
							{creature.magic != null && (
								<div className='flex flex-row items-center justify-center gap-1'>
									<GiFairyWand className='icon-base icon-stone-200' />
									{/* <p>Magic :</p> */}
									<p>{creature?.magic}</p>
								</div>
							)}
						</div>
					</>
				)}
				{step > 2 && (
					<div className='flex flex-col dark:text-stone-200'>
						<h3>Actions :</h3>
						<div className='flex flex-row items-center justify-center gap-1'>
							<p>Main :</p>
							<p>{creature?.actionList.main}</p>
						</div>
						{creature.actionList.epic !== 0 && (
							<div className='flex flex-row items-center justify-center gap-1'>
								<p>Epic :</p>
								<p>{creature?.actionList.epic}</p>
							</div>
						)}
						<ul className='flex list-none flex-row space-x-1'>
							{creature?.actions.map(a => (
								<li
									className='after:content-[","] after:last:content-[""]'
									key={a.searchName}
								>
									{a.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewCreatureDetails;
