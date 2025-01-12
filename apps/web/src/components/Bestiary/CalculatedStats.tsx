import { calcSizeAvantage, Roll, rollStats } from '@/utils/calculateStats';
import { Creature } from '@api/lib/ZodCreature';
import { useEffect, useRef, useState } from 'react';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiFairyWand,
	GiHood,
	GiRollingDiceCup,
	GiSemiClosedEye,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';
import RolledStat from './RolledStat';

type Props = {
	monster: Creature;
};

const CalculatedStats = ({ monster }: Props) => {
	const [rolled, setRolled] = useState(false);
	const [rolledInit, setRolledInit] = useState<Roll>();
	const [rolledAttack, setRolledAttack] = useState<Roll>();
	const [rolledDefense, setRolledDefense] = useState<Roll>();
	const [rolledPerception, setRolledPerception] = useState<Roll>();
	const [rolledDiscretion, setRolledDiscretion] = useState<Roll>();
	const [rolledRanged, setRolledRanged] = useState<Roll>();

	const timerId = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timerId.current !== null) window.clearTimeout(timerId.current);
		};
	}, []);

	const startTimer = () => {
		if (timerId.current !== null) return;
		timerId.current = window.setTimeout(() => {
			console.log('reset');
			setRolled(false);
		}, 5000);
	};

	const stopTimer = () => {
		if (timerId.current === null) return;
		window.clearTimeout(timerId.current);
		timerId.current = null;
	};

	const rollAllStats = (avantage: number) => {
		setRolledInit(rollStats(monster.initiative || 15, 0));
		setRolledAttack(rollStats(monster.attack, avantage));
		setRolledDefense(rollStats(monster.defense, avantage));
		setRolledRanged(rollStats(monster.ranged, avantage));
		setRolledDiscretion(rollStats(monster.discretion || 15, avantage));
		setRolledPerception(rollStats(monster.perception, avantage));
	};
	return (
		<>
			<button>
				<GiRollingDiceCup
					className='icon-2xl dark:icon-stone-200 hover:icon-primary hover:shadow-stone-900 hover:drop-shadow-lg'
					onClick={() => {
						stopTimer();
						const avantage = calcSizeAvantage(monster);
						setRolled(true);
						rollAllStats(avantage);
						startTimer();
					}}
				/>
			</button>
			<div className='font-cabin flex w-full list-none flex-col items-center justify-center gap-2 px-8 pt-4 text-base font-semibold md:w-1/2 md:flex-row'>
				<div className='flex w-full justify-center gap-2 space-x-2 md:w-1/2 md:justify-start'>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiThunderSkull className='icon-stone-900 dark:icon-stone-200 icon-[1.1rem] mr-2' />
						{rolled && rolledInit ? (
							<RolledStat rolledStat={rolledInit} />
						) : monster?.initiative ? (
							monster?.initiative
						) : (
							'~'
						)}
					</span>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-200 icon-base mr-2' />
						{rolled && rolledAttack ? (
							<RolledStat rolledStat={rolledAttack} />
						) : monster?.attack ? (
							monster?.attack
						) : (
							'~'
						)}
					</span>

					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiCheckedShield className='icon-stone-900 dark:icon-stone-200 mr-2 size-[1.1rem]' />
						{rolled && rolledDefense ? (
							<RolledStat rolledStat={rolledDefense} />
						) : monster?.defense ? (
							monster?.defense
						) : (
							'~'
						)}
					</span>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 md:after:text-stone-500 md:after:content-["|"]'>
						<GiArmorVest className='icon-stone-900 dark:icon-stone-200 mr-2 size-[1.1rem]' />
						{monster?.armor || '~'}
					</span>
				</div>
				<div className='flex w-full justify-center gap-2 space-x-2 md:w-1/2 md:justify-start'>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiBullseye className='icon-stone-900 dark:icon-stone-200 icon-base mr-2' />
						{rolled && rolledRanged ? (
							<RolledStat rolledStat={rolledRanged} />
						) : monster?.ranged ? (
							monster?.ranged
						) : (
							'~'
						)}
					</span>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSemiClosedEye className='icon-stone-900 dark:icon-stone-200 icon-sm mr-2' />
						{rolled && rolledPerception ? (
							<RolledStat rolledStat={rolledPerception} />
						) : monster?.perception ? (
							monster?.perception
						) : (
							'~'
						)}
					</span>
					<span className='flex w-1/4 justify-between after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiHood className='icon-stone-900 dark:icon-stone-200 icon-[1.1rem] mr-2' />
						{rolled && rolledDiscretion ? (
							<RolledStat rolledStat={rolledDiscretion} />
						) : monster?.discretion ? (
							monster?.discretion
						) : (
							'~'
						)}
					</span>
					<span className='flex w-1/4 items-center justify-between after:pl-2 after:text-transparent after:content-["|"]'>
						<GiFairyWand className='icon-stone-900 dark:icon-stone-200 icon-sm max-w-1/6 mr-2' />
						{monster?.magic || '~'}
					</span>
				</div>
			</div>
		</>
	);
};

export default CalculatedStats;
