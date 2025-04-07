export type OriginCharacter = {
	name: string;
	statBonus: string[];
	skill1: string;
	skill2: string;
	skill3: string;
	knowledges: string[];
	equipmentA: string[];
	equipmentB: string[];
	description: string;
};
export const origins: OriginCharacter[] = [
	{
		name: 'Petty Thug',
		statBonus: ['AGI', 'WIL', 'CHA'],
		skill1: 'mockery',
		skill2: 'lockpicking',
		skill3: 'evasion',
		knowledges: ['shady districts', 'law', 'thief tools'],
		equipmentA: ['dagger', 'hood', 'lockpicking tools'],
		equipmentB: ['club', 'pouch', 'heavy boots'],
		description:
			'You grew up on the edge of the law, learning to fend for yourself with quick hands and a sharper tongue. Whether by necessity or thrill, you’ve honed the skills of stealth and deception, always ready to flee or fight back.',
	},
	{
		name: 'Naive Country Kid',
		statBonus: ['INS', 'STR', 'VIT'],
		skill1: 'animal care',
		skill2: 'gossip',
		skill3: 'whistling',
		knowledges: ['fruits and vegetables', 'rural life', 'common animals'],
		equipmentA: ['bundle', 'straw hat', 'farmer’s knife'],
		equipmentB: ['travel bag', 'bird whistle', 'walking stick'],
		description:
			'Raised on a farm far from the noise of the cities, you’ve spent your days working the fields and caring for animals. Your simplicity and kindness are matched by surprising endurance and an unshakable connection to nature.',
	},
	{
		name: 'Raised Wildling',
		statBonus: ['AGI', 'INS', 'SEN'],
		skill1: 'fasting',
		skill2: 'animal calls',
		skill3: 'stealth',
		knowledges: ['edible plants', 'animal tracks', 'survivalism'],
		equipmentA: ['tunic', 'club', 'scarf'],
		equipmentB: ['loincloth', 'fur vest', 'flint spear'],
		description:
			"Found and taken in after years of wilderness life, you still carry the habits of your feral youth. Your senses are sharp, and your instincts primal. Civilization is a strange concept, but you're learning… slowly.",
	},
	{
		name: 'Child Mage',
		statBonus: ['SEN', 'WIL', 'INS'],
		skill1: 'pantomime',
		skill2: 'recitation',
		skill3: 'rituals',
		knowledges: [
			'types of magic',
			'common magical monsters',
			'common ingredients',
		],
		equipmentA: ['pointy hat', 'broomstick', 'satchel'],
		equipmentB: ['robe', 'wand', 'ingredient pouches'],
		description:
			'Magic sparked within you at a young age, whether due to talent or accident. You’re still learning to control it, mimicking grown mages and clinging to books and rituals like toys. Spells are as wondrous as they are dangerous.',
	},
	{
		name: 'Boarding School Student',
		statBonus: ['ERU', 'END', 'SOC'],
		skill1: 'recitation',
		skill2: 'filing',
		skill3: 'stealth',
		knowledges: ['school gossip', 'education system', 'etiquette'],
		equipmentA: ['notebook', 'uniform', 'backpack'],
		equipmentB: ['school crest pin', 'hidden snack pouch', 'ruler'],
		description:
			'Shipped away from home, you’ve adapted to the strict rules and rivalries of boarding school. Between sneaking into the kitchens and cramming before exams, you’ve learned how to navigate rigid hierarchies and long corridors.',
	},
	{
		name: 'Juvenile Athlete',
		statBonus: ['AGI', 'STR', 'CHA'],
		skill1: 'acrobatics',
		skill2: 'fasting',
		skill3: 'filing',
		knowledges: ['sports teams', 'competitions', 'body training basics'],
		equipmentA: ['training gear', 'water flask', 'wristbands'],
		equipmentB: ['ball', 'protein bar', 'sandals'],
		description:
			'You thrive on movement, speed, and the adrenaline of victory. Sports have taught you discipline, teamwork, and how to push your limits. Competition is in your blood, even if you don’t always win fair.',
	},
	{
		name: 'Hidden Disciple',
		statBonus: ['AGI', 'CEL', 'SEN'],
		skill1: 'stealth',
		skill2: 'filing',
		skill3: 'martial arts',
		knowledges: ['secret societies', 'pressure points', 'inner balance'],
		equipmentA: ['practice robe', 'rice ball', 'wooden sword'],
		equipmentB: ['belted tunic', 'hidden dagger', 'meditation stone'],
		description:
			"You were chosen by a secret order, or maybe stumbled upon it by fate. Trained in silence, you’ve learned patience and precision—lessons etched into every movement. You're still just a student, but your path is set.",
	},
	{
		name: 'Seasonal Greengrocer',
		statBonus: ['SOC', 'ERU', 'STR'],
		skill1: 'herbalism',
		skill2: 'mental arithmetic',
		skill3: 'chatter',
		knowledges: ['market life', 'seasonal produce', 'haggling techniques'],
		equipmentA: ['stall apron', 'scales', 'pocket ledger'],
		equipmentB: ['crate of fruit', 'vendor hat', 'pouch of small coins'],
		description:
			'Every market day is a test of wit and charm. You’ve hauled crates, memorized prices, and kept up with customers since you could lift a basket. Whether under the sun or rain, you know how to sell and smile.',
	},
	{
		name: 'Disgraced Noble',
		statBonus: ['DEX', 'CHA', 'ERU'],
		skill1: 'etiquette',
		skill2: 'heraldry',
		skill3: 'fencing',
		knowledges: ['noble houses', 'court intrigues', 'literature'],
		equipmentA: ['embroidered shirt', 'family signet ring', 'fencing foil'],
		equipmentB: ['worn cloak', 'etiquette manual', 'hidden coin purse'],
		description:
			'Once from a family of prestige, you’ve fallen from grace—but not from memory. The elegance remains in your poise, and the sharp tongue hasn’t dulled. You know how the world of wealth works, and perhaps how to reenter it...',
	},
];
