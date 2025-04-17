export type OriginCharacter = {
	name: string;
	profileBonus: string[];
	skills: string[];
	knowledges: string[];
	equipmentA?: string[];
	equipmentB?: string[];
	description?: string | null;
};
export const origins: OriginCharacter[] = [
	{
		name: 'Young Grunt',
		profileBonus: ['END', 'WIL', 'SOC'],
		skills: ['jeux-72', 'course-105', 'orientation-178'],
		knowledges: ['camp setup', 'common monsters', 'military tactics'],
		equipmentA: ['sword', 'shield', 'hiking backpack'],
		equipmentB: ['shortbow', '20x arrows', '2x poultices'],
		description:
			"Enlisted in the armed forces, you hardened through training camps and rigorous field exercises. You've learned to obey strict discipline and strengthened your body and martial abilities. The spirit of camaraderie grew in you naturally as you shared camps with your fellow soldiers.",
	},
	{
		name: 'Apprentice Craftsman',
		profileBonus: ['DEX', 'SOC', 'ERU'],
		skills: ['politesse-132', 'commerage-107', 'rafistolage-14'],
		knowledges: ['basic crafting', 'appraisal', 'urban life'],
		equipmentA: ['sturdy knife', 'pencil', 'repair tools'],
		equipmentB: ['work gloves', 'mallet', 'toolbelt'],
		description:
			'Under the supervision of a seasoned artisan, you learned the value of honest work and respect for craftsmanship. Accompanying your master to the city for selling goods or buying supplies, you observed the commercial games between merchants and clients.',
	},
	{
		name: 'Library Rat',
		profileBonus: ['ERU', 'DEX', 'SEN'],
		skills: ['lecture-ecriture-153', 'contes-48', 'furtivite-44'],
		knowledges: ['general culture', 'heraldry', 'legendary monsters'],
		equipmentA: ['spectacles', 'leather satchel', '1d3 books'],
		equipmentB: ['quill & inkwell', 'notebook', 'penknife'],
		description:
			'You fell into books and their fantastic stories from an early age, spending countless hours poring over marvelous illustrations and teaching yourself to read complex writings about the history of lands and races. Your vivid imagination was fed by tales and legends of known peoples and stories of wars and intrigues.',
	},
	{
		name: 'Wandering Artist',
		profileBonus: ['CHA', 'SOC', 'INS'],
		skills: ['blagues-120', 'commerage-107', 'imitation-128'],
		knowledges: ['folk tales', 'musical instruments', 'cosmetics'],
		equipmentA: ['flute', 'throwing knife', 'cloak'],
		equipmentB: ['harmonica', 'dagger', 'satchel'],
		description:
			'You traveled across towns and villages with a troupe of performers, witnessing the charm of nightly shows and the warmth your presence brought. You developed musical sensitivity and a sharp sense of humor during those journeys among people born into the art of performance.',
	},
	{
		name: 'Seasoned Traveler',
		profileBonus: ['SOC', 'INS', 'CEL'],
		skills: ['commerage-107', 'canotage-102', 'veille-118'],
		knowledges: ['regions and counties', 'common plants', 'regional dishes'],
		equipmentA: ['mushroom knife', 'satchel', 'notebook'],
		equipmentB: ['rusty sword', 'wool coat', 'heavy belt'],
		description:
			"A young life of wandering and resourcefulness shaped you tough. You know your way around the country's roads and easily blend into new communities.",
	},
	{
		name: 'Petty Thug',
		profileBonus: ['AGI', 'WIL', 'CHA'],
		skills: ['moquerie-52', 'crochetage-90', 'derobade-29'],
		knowledges: ['shady districts', 'law', 'thief tools'],
		equipmentA: ['dagger', 'hood', 'lockpicking tools'],
		equipmentB: ['club', 'pouch', 'heavy boots'],
		description:
			'You grew up on the edge of the law, learning to fend for yourself with quick hands and a sharper tongue. Whether by necessity or thrill, you’ve honed the skills of stealth and deception, always ready to flee or fight back.',
	},
	{
		name: 'Naive Country Kid',
		profileBonus: ['INS', 'STR', 'VIT'],
		skills: ['soin-des-animaux-171', 'commerage-107', 'sifflements-133'],
		knowledges: ['fruits and vegetables', 'rural life', 'common animals'],
		equipmentA: ['bundle', 'straw hat', 'farmer’s knife'],
		equipmentB: ['travel bag', 'bird whistle', 'walking stick'],
		description:
			'Raised on a farm far from the noise of the cities, you’ve spent your days working the fields and caring for animals. Your simplicity and kindness are matched by surprising endurance and an unshakable connection to nature.',
	},
	{
		name: 'Raised Wildling',
		profileBonus: ['AGI', 'INS', 'SEN'],
		skills: ['jeune-177', 'Animal Sounds', 'furtivite-44'],
		knowledges: ['edible plants', 'animal tracks', 'survivalism'],
		equipmentA: ['tunic', 'club', 'scarf'],
		equipmentB: ['loincloth', 'fur vest', 'flint spear'],
		description:
			"Found and taken in after years of wilderness life, you still carry the habits of your feral youth. Your senses are sharp, and your instincts primal. Civilization is a strange concept, but you're learning… slowly.",
	},
	{
		name: 'Child Mage',
		profileBonus: ['SEN', 'WIL', 'INS'],
		skills: ['pantomime-85', 'recitation-70', 'rituels-59'],
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
		profileBonus: ['ERU', 'END', 'SOC'],
		skills: ['recitation-70', 'classement-65', 'furtivite-44'],
		knowledges: ['school gossip', 'education system', 'etiquette'],
		equipmentA: ['notebook', 'uniform', 'backpack'],
		equipmentB: ['school crest pin', 'hidden snack pouch', 'ruler'],
		description:
			'Shipped away from home, you’ve adapted to the strict rules and rivalries of boarding school. Between sneaking into the kitchens and cramming before exams, you’ve learned how to navigate rigid hierarchies and long corridors.',
	},
	{
		name: 'Juvenile Athlete',
		profileBonus: ['AGI', 'STR', 'CHA'],
		skills: ['acrobatie-141', 'jeune-177', 'classement-65'],
		knowledges: ['sports teams', 'competitions', 'body training basics'],
		equipmentA: ['training gear', 'water flask', 'wristbands'],
		equipmentB: ['ball', 'protein bar', 'sandals'],
		description:
			'You thrive on movement, speed, and the adrenaline of victory. Sports have taught you discipline, teamwork, and how to push your limits. Competition is in your blood, even if you don’t always win fair.',
	},
	{
		name: 'Hidden Disciple',
		profileBonus: ['AGI', 'CEL', 'SEN'],
		skills: ['furtivite-44', 'classement-65', 'art-martial-99'],
		knowledges: ['secret societies', 'pressure points', 'inner balance'],
		equipmentA: ['practice robe', 'rice ball', 'wooden sword'],
		equipmentB: ['belted tunic', 'hidden dagger', 'meditation stone'],
		description:
			"You were chosen by a secret order, or maybe stumbled upon it by fate. Trained in silence, you’ve learned patience and precision—lessons etched into every movement. You're still just a student, but your path is set.",
	},
	{
		name: 'Seasonal Greengrocer',
		profileBonus: ['SOC', 'ERU', 'STR'],
		skills: ['simples-170', 'calcul-mental-64', 'baratin-46'],
		knowledges: ['market life', 'seasonal produce', 'haggling techniques'],
		equipmentA: ['stall apron', 'scales', 'pocket ledger'],
		equipmentB: ['crate of fruit', 'vendor hat', 'pouch of small coins'],
		description:
			'Every market day is a test of wit and charm. You’ve hauled crates, memorized prices, and kept up with customers since you could lift a basket. Whether under the sun or rain, you know how to sell and smile.',
	},
	{
		name: 'Disgraced Noble',
		profileBonus: ['DEX', 'CHA', 'ERU'],
		skills: ['etiquette-126', 'heraldique-151', 'escrime-100'],
		knowledges: ['noble houses', 'court intrigues', 'literature'],
		equipmentA: ['embroidered shirt', 'family signet ring', 'fencing foil'],
		equipmentB: ['worn cloak', 'etiquette manual', 'hidden coin purse'],
		description:
			'Once from a family of prestige, you’ve fallen from grace—but not from memory. The elegance remains in your poise, and the sharp tongue hasn’t dulled. You know how the world of wealth works, and perhaps how to reenter it...',
	},
];
