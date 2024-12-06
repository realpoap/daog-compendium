import { cn } from '@/utils/classNames';
import { useParams, useRouter } from '@tanstack/react-router';
import {
	GiBullseye,
	GiCrownedSkull,
	GiGlassHeart,
	GiRoundShield,
	GiSwordSpin,
} from 'rocketicons/gi';

import { default as monsters } from '../../data/5e-SRD-Monsters.json';
import Ability from './Ability';
import Action from './Action';

const MonsterDetails = () => {
	const { history } = useRouter();
	const { id } = useParams({ strict: false });

	const monster = monsters.find(m => m.name === id);

	return (
		<div className='item-center flex flex-col'>
			<div className='align-center flex flex-col items-center justify-center gap-2'>
				<button
					className='font-grenze mt-1 align-middle text-2xl text-stone-500'
					onClick={() => history.go(-1)}
				>
					<span className='text-2xl'>&#8249;</span> Back
				</button>

				<div className='align-center relative mt-4 flex flex-col content-center text-wrap p-4 text-center'>
					<div className='min-w-54 mx-2 w-min'>
						<h3
							className={cn(
								'font-grenze text-wrap text-4xl font-extrabold tracking-wider text-purple-900 dark:text-purple-400',
							)}
						>
							{monster?.name}
						</h3>
						{monster?.legendary_actions && (
							<div className='badge badge-accent badge-lg absolute -right-2 top-2 size-6 animate-bounce content-center items-center rounded-full p-0 drop-shadow-md'>
								<GiCrownedSkull className='icon-stone-200-sm' />
							</div>
						)}
					</div>
					<p className='text-md font-noto align-baseline font-semibold text-stone-500'>
						{monster?.size} {monster?.type}
					</p>
				</div>
				<div
					className={cn(
						'font-noto max-w-72 text-center text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{monster?.description}
				</div>
				<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
					<div className='relative flex'>
						<GiGlassHeart className='icon-red-500 icon-xl absolute animate-ping opacity-20' />
						<GiGlassHeart className='icon-red-500 icon-xl relative drop-shadow-md' />
					</div>
					<p className='font-noto align-baseline text-sm font-semibold text-red-500'>
						{monster?.hit_points}
					</p>
					<p className='font-noto align-baseline text-sm font-medium text-stone-500'>
						(+{monster?.hit_dice})
					</p>
				</div>
				<div>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiSwordSpin className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.strength || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiBullseye className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.dexterity || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiRoundShield className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.armor_class || '~'}
					</span>
				</div>
				{monster?.special_abilities && (
					<div className='flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-visible px-2'>
						{monster.special_abilities.map(a => (
							<Ability
								key={a.name}
								name={a.name}
								description={a.desc}
							/>
						))}
					</div>
				)}
				<div className='flex w-full flex-col items-center justify-center px-2'>
					<h3 className='font-grenze line mb-1 border-b-2 text-2xl font-semibold tracking-wider'>
						Actions
					</h3>
					{monster?.actions?.map(a => (
						<Action
							key={a.name}
							name={a.name}
							description={a.desc}
							dmg={a.attack_bonus}
						/>
					))}
				</div>

				{monster?.legendary_actions && (
					<div className='flex w-full flex-col items-center justify-center px-2'>
						<h3 className='font-grenze line mb-1 border-b-2 text-2xl font-semibold tracking-wider'>
							Epics
						</h3>
						{monster.legendary_actions.map(a => (
							<Action
								key={a.name}
								name={a.name}
								description={a.desc}
								dmg={a.attack_bonus}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MonsterDetails;
