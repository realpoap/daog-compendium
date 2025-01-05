import {
	GiBlood,
	GiBurningSkull,
	GiCarrion,
	GiFlatPawPrint,
	GiGhost,
	GiGoat,
	GiHeartDrop,
	GiPeaks,
	GiSmallFire,
	GiTreeBranch,
	GiWaterfall,
	GiWhirlwind,
} from 'rocketicons/gi';

export const spellOptions = [
	{
		label: 'Mouflette',
		value: 'mouflette',
		icon: <GiGoat />,
	},
	{
		label: 'Eau',
		value: 'water',
		icon: <GiWaterfall />,
	},
	{
		label: 'Feu',
		value: 'fire',
		icon: <GiSmallFire />,
	},
	{
		label: 'Terre',
		value: 'earth',
		icon: <GiPeaks />,
	},
	{
		label: 'Air',
		value: 'air',
		icon: <GiWhirlwind />,
	},
	{
		label: 'Sang',
		value: 'blood',
		icon: <GiBlood />,
	},
	{
		label: 'Bête',
		value: 'beast',
		icon: <GiFlatPawPrint />,
	},
	{
		label: 'Nature',
		value: 'nature',
		icon: <GiTreeBranch />,
	},
	{
		label: 'Vie',
		value: 'life',
		icon: <GiHeartDrop />,
	},
	{
		label: 'Mort',
		value: 'death',
		icon: <GiBurningSkull />,
	},
	{
		label: 'Fléau',
		value: 'scourge',
		icon: <GiCarrion />,
	},
	{
		label: 'Esprit',
		value: 'spirit',
		icon: <GiGhost />,
	},
];

export const targetTypeOptions = [
	{
		label: 'single',
		value: 'single',
	},
	{
		label: 'multiple',
		value: 'multiple',
	},
	{
		label: 'self',
		value: 'self',
	},
	{
		label: 'random',
		value: 'random',
	},
	{
		label: 'none',
		value: 'none',
	},
];

export const castingOptions = [
	{
		label: 'instant',
		value: 'instant',
	},
	{
		label: 'delayed',
		value: 'delayed',
	},
	{
		label: 'ritual',
		value: 'ritual',
	},
	{
		label: 'concentration',
		value: 'concentration',
	},
	{
		label: 'upkeep',
		value: 'upkeep',
	},
];

export const actionOptions = [
	{
		label: 'Charm',
		value: 'charm',
	},
	{
		label: 'Create',
		value: 'create',
	},
	{
		label: 'Damage',
		value: 'damage',
	},
	{
		label: 'Enhance',
		value: 'enhance',
	},
	{
		label: 'Heal',
		value: 'heal',
	},
	{
		label: 'Link',
		value: 'link',
	},
	{
		label: 'Move',
		value: 'move',
	},
	{
		label: 'Protect',
		value: 'protect',
	},
	{
		label: 'Puzzle',
		value: 'puzzle',
	},
	{
		label: 'Remove',
		value: 'remove',
	},
	{
		label: 'Restrain',
		value: 'restrain',
	},
	{
		label: 'Transform',
		value: 'transform',
	},
];
