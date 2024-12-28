import { NewCreature } from '@api/lib/ZodCreature';
import {
	GiArmorVest,
	GiBrain,
	GiBullseye,
	GiCheckedShield,
	GiFairyWand,
	GiGlassHeart,
	GiRoundStar,
	GiSemiClosedEye,
	GiSwordWound,
} from 'rocketicons/gi';

const NewCreatureDetails = ({ creature }: { creature: NewCreature }) => {
	return (
		<div>
			<div className='my-8 flex flex-col items-center justify-start gap-1'>
				<p className='font-grenze text-4xl font-bold dark:text-stone-500'>
					{creature.name} {creature.subtype}
				</p>
				<p className='font-grenze text-2xl font-bold dark:text-stone-500'>
					<GiRoundStar className='icon-lg icon-stone-500' /> {creature.level}
				</p>
				<p className='font-grenze text-2xl font-semibold italic dark:text-stone-500'>
					{creature.size} {creature.alignment} {creature.type}
				</p>

				<div className='flex w-full flex-row items-center justify-center gap-8'>
					{creature.health && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiGlassHeart className='icon-4xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-5xl font-semibold text-stone-500'>
								{creature.health}
							</p>
						</div>
					)}
				</div>
				<div className='flex w-full flex-row flex-wrap items-center justify-center gap-4'>
					{creature.attack && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiSwordWound className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.attack}
							</p>
						</div>
					)}
					{creature.defense && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiCheckedShield className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.defense}
							</p>
						</div>
					)}
					{creature.armor && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiArmorVest className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.armor}
							</p>
						</div>
					)}
					{creature.ranged && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiBullseye className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.ranged}
							</p>
						</div>
					)}
					{creature.perception && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiSemiClosedEye className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.perception}
							</p>
						</div>
					)}
					{creature.magic && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiFairyWand className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.magic}
							</p>
						</div>
					)}
					{creature.spirit && (
						<div className='flex flex-row items-center justify-center gap-1'>
							<GiBrain className='icon-xl icon-stone-500' />
							<p className='font-grenze -mt-3 text-4xl font-semibold text-stone-500'>
								{creature.spirit}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewCreatureDetails;
