import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import {
	GiBugleCall,
	GiBullseye,
	GiCampfire,
	GiCheckedShield,
	GiDominoMask,
	GiGhost,
	GiHammerNails,
	GiHood,
	GiMagnifyingGlass,
	GiSemiClosedEye,
	GiSly,
	GiSwapBag,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';

type Props = {
	char: Character;
};

const CharacterVariablesPanel = ({ char }: Props) => {
	return (
		<div
			className={cn(
				'collapse-content group hidden grid-cols-5 gap-4 font-bold',
				{
					'grayscale-50 opacity-50': char.bio.isDead,
				},
			)}
		>
			{[
				{
					icon: GiThunderSkull,
					stat: 'WIL',
					label: `CEL/WIL ${char.profile.stats?.CEL} + ${char.profile.stats?.WIL} +
							${char.profile.boni.initiative + char.profile.variables.initiative + char.masteries.movement.current} +
							${char.specifics.sizeBonus}`,
					value: char.variables.initiative,
					name: 'initiative',
				},
				// { icon: GiWingfoot, value: char.profile.speed?.running },
				{
					icon: GiBullseye,
					stat: 'DEX',
					label: `DEX ${
						char.profile.stats?.DEX &&
						char.profile.stats?.DEX +
							Math.floor(char.profile.stats?.INS / 10) +
							Math.floor(char.profile.level / 5)
					} +
							
							${char.profile.boni.ranged + char.profile.variables.ranged + char.masteries.ranged.current}
							`,
					value: char.variables.ranged,
					name: 'Ranged',
				},
				{
					icon: GiSwordWound,
					stat: 'STR',
					label: `${
						char.path.attackType === 'STR'
							? `STR ${char.profile.stats?.STR} + ${char.profile.boni.attack} + ${char.profile.variables.attack} + ${char.masteries.fighting.current}`
							: `AGI ${char.profile.stats?.AGI} + ${char.profile.boni.attack + char.profile.variables.attack} + ${char.masteries.fighting.current}`
					}`,
					value: char.variables.attack,
					name: 'Attack',
				},
				{
					icon: GiCheckedShield,
					stat: 'STR',
					label: `${
						char.path.defenseType === 'STR'
							? `STR${char.profile.boni.defense + char.profile.variables.defense} + ${char.profile.stats?.STR ?? 0} + ${char.masteries.defense.current} + ${char.equipment.armorValue}`
							: `AGI ${char.profile.stats?.AGI ?? 0 + Math.floor((char.profile.stats?.AGI ?? 0) / 10) + Math.floor(char.profile.level / 5)} + ${char.profile.boni.defense + char.profile.variables.defense} + ${char.masteries.defense.current} + ${char.equipment.armorValue}`
					}`,
					value: char.variables.defense,
					name: 'Defense',
				},

				{
					icon: GiHood,
					stat: 'AGI',
					label: `AGI ${
						(char.profile.stats?.AGI ?? 0) +
						Math.floor((char.profile.stats?.CEL ?? 0) / 10) +
						Math.floor(char.profile.level / 5) +
						(char.specifics.sizeBonus ?? 0) -
						Number(char.specifics.massive)
					} + ${
						char.profile.boni.discretion + char.profile.variables.discretion
					} + ${char.masteries?.discretion?.current ?? 0}`,
					value: char.variables.discretion,
					name: 'Discretion',
				},

				{
					icon: GiCampfire,
					stat: 'INS',
					label: `INS ${
						(char.profile.stats?.INS ?? 0) +
						Math.floor((char.profile.stats?.ERU ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.survival + char.profile.variables.survival
					} + ${char.masteries.survival.current}`,
					value: char.variables.survival,
					name: 'Survival',
				},
				{
					icon: GiSemiClosedEye,
					stat: 'INS',
					label: `${
						(char.profile.stats?.INS ?? 0) +
						Math.floor((char.profile.stats?.INS ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.perception + char.profile.variables.perception
					} + ${char.masteries.perception.current}`,
					value: char.variables.perception,
					name: 'Perception',
				},
				{
					icon: GiMagnifyingGlass,
					stat: 'ERU',
					label: `ERU ${
						(char.profile.stats?.ERU ?? 0) +
						Math.floor((char.profile.stats?.INS ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.detection + char.profile.variables.detection
					} + ${char.masteries.detection.current}`,
					value: char.variables.detection,
					name: 'Investigation',
				},
				{
					icon: GiGhost,
					stat: 'WIL',
					label: `WIL ${
						(char.profile.stats?.WIL ?? 0) +
						Math.floor((char.profile.stats?.CHA ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.bravery + char.profile.variables.bravery
					} + ${char.masteries.esoterism.current}`,
					value: char.variables.bravery,
					name: 'Bravery',
				},
				{
					icon: GiBugleCall,
					stat: 'SOC',
					label: `SOC ${
						(char.profile.stats?.CHA ?? 0) +
						Math.floor((char.profile.stats?.CHA ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.speech + char.profile.variables.speech
					} + ${char.masteries.speech.current}`,
					value: char.variables.speech,
					name: 'Speech',
				},
				{
					icon: GiSwapBag,
					stat: 'SOC',
					label: `SOC ${
						(char.profile.stats?.ERU ?? 0) +
						Math.floor((char.profile.stats?.ERU ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.trading + char.profile.variables.trading
					} + ${char.masteries.trading.current}`,
					value: char.variables.trading,
					name: 'Trading',
				},
				{
					icon: GiDominoMask,
					stat: 'CHA',
					label: `CHA ${
						(char.profile.stats?.CHA ?? 0) +
						Math.floor((char.profile.stats?.AGI ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.performance + char.profile.variables.performance
					} + ${char.masteries.performance.current}`,
					value: char.variables.performance,
					name: 'Performance',
				},
				{
					icon: GiSly,
					stat: 'CHA',
					value:
						char.specifics.alignment === 'evil' ||
						char.specifics.alignment === 'neutral' ||
						char.specifics.alignment === 'bad'
							? char.variables.intimidation > char.variables.persuasion
								? char.variables.intimidation
								: char.variables.persuasion
							: char.variables.persuasion,

					name:
						char.specifics.alignment === 'evil' ||
						char.specifics.alignment === 'neutral' ||
						char.specifics.alignment === 'bad'
							? char.variables.intimidation > char.variables.persuasion
								? 'Intimidation'
								: 'Persuasion'
							: 'Persuasion',

					label:
						char.specifics.alignment === 'evil' ||
						char.specifics.alignment === 'neutral' ||
						char.specifics.alignment === 'bad'
							? char.variables.intimidation > char.variables.persuasion
								? `STR ${
										(char.profile.stats?.STR ?? 0) +
										Math.floor((char.profile.stats?.CHA ?? 0) / 10) +
										Math.floor(char.profile.level / 5)
									} `
								: `CHA ${
										(char.profile.stats?.CHA ?? 0) +
										Math.floor((char.profile.stats?.ERU ?? 0) / 10) +
										Math.floor(char.profile.level / 5)
									} + ${
										char.profile.boni.persuasion +
										char.profile.variables.persuasion
									} + ${char.masteries.persuasion.current}`
							: `CHA ${
									(char.profile.stats?.CHA ?? 0) +
									Math.floor((char.profile.stats?.ERU ?? 0) / 10) +
									Math.floor(char.profile.level / 5)
								} + ${
									char.profile.boni.persuasion +
									char.profile.variables.persuasion
								} + ${char.masteries.persuasion.current}`,
				},
				{
					icon: GiHammerNails,
					label: `DEX ${
						(char.profile.stats?.DEX ?? 0) +
						Math.floor((char.profile.stats?.WIL ?? 0) / 10) +
						Math.floor(char.profile.level / 5)
					} + ${
						char.profile.boni.crafting + char.profile.variables.crafting
					} + ${char.masteries.crafting.current}`,
					value: char.variables.crafting,
					name: 'Crafting',
					stat: 'DEX',
				},
			].map(({ icon: Icon, label, value, name, stat }, index) => (
				<div
					className='tooltip'
					key={index}
				>
					<div className='tooltip-content z-50 flex flex-col'>
						<span className='font-cabin text-normal text-sm'>
							{capitalizeFirstLetter(name)}
						</span>
						<span className='font-cabin text-xs'>{label}</span>
					</div>
					<div
						className={cn(
							`font-cabin bg-tile text-neutral-content flex w-full flex-row items-center justify-center rounded-sm p-1`,
							{
								'ring-0': !stat,
								'ring-1 ring-indigo-500': stat && stat === 'CEL',
								'ring-1 ring-blue-500': stat && stat === 'AGI',
								'ring-1 ring-green-500': stat && stat === 'DEX',
								'ring-1 ring-red-500': stat && stat === 'STR',
								'ring-black-500 ring-1': stat && stat === 'END',

								'ring-1 ring-teal-500': stat && stat === 'WIL',
								'ring-1 ring-orange-500': stat && stat === 'INS',
								'ring-1 ring-purple-500': stat && stat === 'SEN',
								'ring-1 ring-yellow-500': stat && stat === 'CHA',
								'ring-1 ring-pink-500': stat && stat === 'SOC',
								'ring-grey-500 ring-1': stat && stat === 'ERU',
							},
						)}
					>
						<Icon className='icon-background dark:icon-neutral-content mr-1 size-[1rem] flex-shrink-0' />
						<span>{value}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CharacterVariablesPanel;
