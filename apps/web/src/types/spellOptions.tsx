import {
	GiBlood,
	GiBrainTentacle,
	GiBurningSkull,
	GiCardRandom,
	GiCarrion,
	GiEarthSpit,
	GiFlatPawPrint,
	GiGhost,
	GiGoat,
	GiHeartDrop,
	GiSmallFire,
	GiTreeBranch,
	GiWaterfall,
	GiWhirlwind,
} from 'rocketicons/gi';

export const spellOptions = [
	{
		label: 'Mouflette',
		value: 'mouflette',
		icon: <GiGoat className='icon-stone-900 dark:icon-stone-100 icon-4xl' />,
	},
	{
		label: 'Eau',
		value: 'water',
		icon: (
			<GiWaterfall className='icon-stone-900 dark:icon-stone-100 icon-2xl' />
		),
	},
	{
		label: 'Feu',
		value: 'fire',
		icon: (
			<GiSmallFire className='icon-stone-900 dark:icon-stone-100 icon-4xl' />
		),
	},
	{
		label: 'Terre',
		value: 'earth',
		icon: (
			<GiEarthSpit className='icon-stone-900 dark:icon-stone-100 icon-5xl' />
		),
	},
	{
		label: 'Air',
		value: 'air',
		icon: (
			<GiWhirlwind className='icon-stone-900 dark:icon-stone-100 icon-4xl' />
		),
	},
	{
		label: 'Sang',
		value: 'blood',
		icon: <GiBlood className='icon-stone-900 dark:icon-stone-100 icon-4xl' />,
	},
	{
		label: 'Bête',
		value: 'beast',
		icon: (
			<GiFlatPawPrint className='icon-stone-900 dark:icon-stone-100 icon-4xl' />
		),
	},
	{
		label: 'Nature',
		value: 'nature',
		icon: (
			<GiTreeBranch className='icon-stone-900 dark:icon-stone-100 icon-3xl' />
		),
	},
	{
		label: 'Vie',
		value: 'life',
		icon: (
			<GiHeartDrop className='icon-stone-900 dark:icon-stone-100 icon-4xl' />
		),
	},
	{
		label: 'Mort',
		value: 'death',
		icon: (
			<GiBurningSkull className='icon-stone-900 dark:icon-stone-100 icon-4xl' />
		),
	},
	{
		label: 'Fléau',
		value: 'scourge',
		icon: <GiCarrion className='icon-stone-900 dark:icon-stone-100 icon-4xl' />,
	},
	{
		label: 'Esprit',
		value: 'spirit',
		icon: <GiGhost className='icon-stone-900 dark:icon-stone-100 icon-4xl' />,
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
		label: 'charm',
		value: 'charm',
	},
	{
		label: 'create',
		value: 'create',
	},
	{
		label: 'damage',
		value: 'damage',
	},
	{
		label: 'enhance',
		value: 'enhance',
	},
	{
		label: 'heal',
		value: 'heal',
	},
	{
		label: 'link',
		value: 'link',
	},
	{
		label: 'move',
		value: 'move',
	},
	{
		label: 'protect',
		value: 'protect',
	},
	{
		label: 'puzzle',
		value: 'puzzle',
	},
	{
		label: 'transform',
		value: 'transform',
	},
	{
		label: 'remove',
		value: 'remove',
	},
];
