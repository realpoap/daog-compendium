import {
	GiCarnivorousPlant,
	GiCowled,
	GiGolemHead,
	GiHaunting,
	GiInfestedMass,
	GiMummyHead,
	GiRaccoonHead,
	GiRaiseZombie,
	GiSparkSpirit,
	GiSpiderFace,
	GiSpikedDragonHead,
	GiToadTeeth,
	GiTroglodyte,
	GiUnicorn,
} from 'rocketicons/gi';

export const creatureTypeOptions = [
	{
		label: 'Golem',
		value: 'golem',
		icon: <GiGolemHead />,
	},
	{
		label: 'Beast',
		value: 'beast',
		icon: <GiToadTeeth />,
	},
	{
		label: 'Critter',
		value: 'critter',
		icon: <GiRaccoonHead />,
	},
	{
		label: 'Demon',
		value: 'demon',
		icon: <GiSparkSpirit />,
	},
	{
		label: 'Fae',
		value: 'fae',
		icon: <GiUnicorn />,
	},
	{
		label: 'Insect',
		value: 'insect',
		icon: <GiSpiderFace />,
	},
	{
		label: 'Monster',
		value: 'monster',
		icon: <GiTroglodyte />,
	},
	{
		label: 'Oddity',
		value: 'oddity',
		icon: <GiInfestedMass />,
	},
	{
		label: 'Person',
		value: 'person',
		icon: <GiCowled />,
	},
	{
		label: 'Plant',
		value: 'plant',
		icon: <GiCarnivorousPlant />,
	},
	{
		label: 'Undead',
		value: 'undead',
		icon: <GiHaunting />,
	},
	{
		label: 'Wyrm',
		value: 'wyrm',
		icon: <GiSpikedDragonHead />,
	},
];

export const creatureSizeOptions = [
	{
		label: 'Tiny',
		value: 'tiny',
	},
	{
		label: 'Small',
		value: 'small',
	},
	{
		label: 'Average',
		value: 'average',
	},
	{
		label: 'Large',
		value: 'large',
	},
	{
		label: 'Huge',
		value: 'huge',
	},
	{
		label: 'Gigantic',
		value: 'gigantic',
	},
];

export const creatureAlignmentOptions = [
	{
		label: 'Saint',
		value: 'saint',
	},
	{
		label: 'Good',
		value: 'good',
	},
	{
		label: 'Neutral',
		value: 'neutral',
	},
	{
		label: 'Bad',
		value: 'bad',
	},
	{
		label: 'Evil',
		value: 'evil',
	},
];

export const ActionOptions = [
	{
		label: 'Main',
		value: 'main',
	},
	{
		label: 'Limited',
		value: 'limited',
	},
	{
		label: 'Free',
		value: 'free',
	},
	{
		label: 'Travel',
		value: 'travel',
	},
	{
		label: 'Epic',
		value: 'epic',
	},
];
