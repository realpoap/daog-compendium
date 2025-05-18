import { LanguageList, SpecificLanguage } from '@api/lib/ZodCharacter';

export const moufflian = {
	specie: 'human',
	sub: 'moufflian',
	specieDifficulty: 'easy',
	languages: [
		{
			label: 'gnomish',
			value: 'gnomish' as LanguageEnum,
		},
		{
			label: 'dwarvish',
			value: 'dwarvish' as LanguageEnum,
		},
	],
	description:
		'Humans were Grandmouffle’s first successful creation. Initially all male, they couldn’t reproduce, prompting the creation of women. Population exploded, causing ecological damage. The Immortals voted to destroy most of them, sparing only the elite. Grandmouffle defied them, saving others behind a protective barrier. These survivors thrived, becoming diverse and inventive. Human society is divided, flawed, yet adaptable and influential.',
	bio: {
		isCaster: false,
	},
	path: {
		skills: ['baratin-46', 'commerce-108', 'lecture-ecriture-153'],
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
				value: 0,
				flavor: '',
				id: 'cosmopolite-3',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
				value: 0,
				flavor: '',
				id: 'camarade-universel-2',
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
				value: 0,
				flavor: '',
				id: 'touche-a-tout-1',
			},
		],
	},
	specifics: {
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'moufflian_slang' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 15,
			DEX: 15,
			STR: 15,
			END: 15,
			VIT: 15,
			WIL: 15,
			INS: 15,
			SEN: 15,
			CHA: 15,
			SOC: 15,
			ERU: 15,
		},
	},
};

export const inclay = {
	specie: 'human',
	sub: 'inclay',
	specieDifficulty: 'easy',
	description:
		'Early Peacefull Lands colonists, Inclays sought refuge from barbarians and goblins in the chaotic yet temperate weather from the Eastern territories. They coexisted with early Moisi forces while building their colonial and maritime empire. Their ambivalent stance in the Moisi Wars was seen as betrayal from the alliance. Taciturn and stoic, English humans are often distrusted due to their Moisi proximity and detachment from Vieux-Mouffle concerns.',
	bio: {
		isCaster: false,
	},
	languages: [
		{
			label: 'goblin',
			value: 'goblin' as LanguageEnum,
		},
		{
			label: 'moufflian slang',
			value: 'moufflian_slang' as LanguageEnum,
		},
	],
	path: {
		skills: ['duperie-125', 'politesse-132', 'etiquette-126'],
		attributes: [
			{
				name: 'Incredible Composure',
				effect: 'Can only be surprised by a fiasco, -2 to initiative.',
				description: `In the worst situations, inclay humans remain eerily calm. Whether it's due to their scheming culture or the odd nature of the Claylands, they can keep a straight face no matter what.`,
				value: 0,
				flavor: '',
				id: 'flegme-incroyable-21',
			},
			{
				name: 'Strange Humor',
				effect: `Roll two dice for humor and performance checks, keep the best—unless it's a fiasco.`,
				description: `En-Glaise humans have developed a subtle and strange sense of humor, baffling to other races. Their sharp tongue often hits the mark, causing laughter—unless it gets too cryptic.`,
				value: 0,
				flavor: '',
				id: 'humour-etrange-20',
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
				value: 0,
				flavor: '',
				id: 'touche-a-tout-1',
			},
		],
	},
	specifics: {
		speaks: [
			{
				language: 'clay' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 15,
			DEX: 16,
			STR: 15,
			END: 14,
			VIT: 15,
			WIL: 16,
			INS: 14,
			SEN: 17,
			CHA: 15,
			SOC: 13,
			ERU: 15,
		},
	},
};
export const bourguignon = {
	specie: 'elf',
	sub: 'bourguignon',
	specieDifficulty: 'easy',
	languages: [
		{
			label: 'high-elven',
			value: 'high_elven' as LanguageEnum,
		},
		{
			label: 'fifilanto',
			value: 'fifilanto' as LanguageEnum,
		},
	],
	description:
		'The Bourguignon Elves remain loyal to nature, living in harmony in Cuinacaen Forest. Seen as trustworthy and kind - but also slightly arrogant -, they faced a civil war after some rejected their forests post-Confusion war. Their society is led by a council of elders under the King of Ages. They live self-sufficiently in the forest, gathering food and hunting deer with bows. Their existence is peaceful and tied to the natural cycles of their woodland realm.',
	bio: {
		isCaster: true,
	},
	specifics: {
		speaks: [
			{
				language: 'elven' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'botanique-150',
			'escalade-143',
			'politesse-132',
			'soin-des-animaux-171',
		],
		attributes: [
			{
				name: 'Magical Defiance',
				effect:
					'+1 advantage die against enchantments, charms, and curses targeting them solely',
				description:
					'The ancient rites and customs of the Sylvan Elves grant them natural resistance to curses. Their heightened senses are trained from childhood to detect and resist magical manipulation.',
				value: 0,
				flavor: '',
				id: 'defiance-magique-19',
			},
			{
				name: 'Structured Upbringing',
				effect: ` Choose one: +1 CHA and skill "bows" or +1 ERU and skill "letters"`,
				description: `The caste-based Bourguignon society lets elves choose the path of soldier or scholar early in life, shaping future leaders from childhood.`,
				value: 0,
				flavor: '',
				id: 'enseignement-cloisonne-18',
			},
			{
				name: 'Magic Sensitivity',
				effect: `Can cast spells without magical training.`,
				description: `Elves’ long lifespans and forested homelands make them natural conduits for magical energy. From youth, their minds are shaped to sense and identify magic around them.`,
				value: 0,
				flavor: '',
				id: 'sensibilite-magique-11',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 16,
			AGI: 16,
			DEX: 16,
			STR: 13,
			END: 12,
			VIT: 15,
			WIL: 14,
			INS: 17,
			SEN: 17,
			CHA: 17,
			SOC: 12,
			ERU: 15,
		},
	},
};
export const armagnac = {
	specie: 'elf',
	sub: 'armagnac',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'dwarvish',
			value: 'dwarvish' as LanguageEnum,
		},
		{
			label: `thieves' marks`,
			value: 'thieves_marks' as LanguageEnum,
		},
	],
	description:
		'These are the dissident elves who abandoned the forests after the Grande Confusion, leading to a major civil war. They rejected their traditional ways, trading bows for firearms and other weapons. Their hair became dyed in unnatural colors, and they forsook traditional elven plants for stronger, less reputable substances. Considered a separate people, they are viewed as brothers by humans and receive some sympathy from dwarves. They live among other races in Vieux-Mouffle and Peacefull Landes cities, often marginalized and seen as potentially dangerous rebels by Bourguignon elves and many citizens.',
	bio: {
		isCaster: false,
	},
	specifics: {
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'elven' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'bagarre-74',
			'fouille-34',
			'meditation-117',
			'legislation-68',
			'furtivite-44',
		],
		attributes: [
			{
				name: 'Wanderer',
				effect:
					'Always recovers at least as if from a short rest, even with little sleep or poor conditions; +1 remission.',
				description:
					'Elves who left their forests to live in cities have become refugees constantly on the move. Their grace faded, replaced by hardened endurance built on the road.',
				value: 0,
				flavor: '',
				id: 'baroudeur-17',
			},
			{
				name: 'Desensitized',
				effect: `Drugs and enchantments affect them less; advantage on END and SEN rolls.`,
				description: `Armagnac elves abuse herbs, drugs, and alcohol—shaming their lineage and ruining their longevity. However, their heightened senses remain, now dulled to toxins.`,
				value: 0,
				flavor: '',
				id: 'desensibilisation-16',
			},
			{
				name: 'Ill-Reputed',
				effect: `Advantage on gossip and bargaining rolls; but are accused first by guards or onlookers.`,
				description: `Though common folk enjoy their simplicity, Armagnacs are viewed with suspicion by lawkeepers, often accused of brewing rebellion in the shadows.`,
				value: 0,
				flavor: '',
				id: 'mal-fame-15',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 15,
			DEX: 17,
			STR: 14,
			END: 16,
			VIT: 14,
			WIL: 15,
			INS: 15,
			SEN: 16,
			CHA: 15,
			SOC: 15,
			ERU: 15,
		},
	},
};
export const durhkran = {
	specie: 'dwarf',
	sub: 'durhkran',
	specieDifficulty: 'easy',
	languages: [
		{
			label: 'moufflian slang',
			value: 'moufflian_slang' as LanguageEnum,
		},
		{
			label: 'dwarven runes',
			value: 'dwarven_runes' as LanguageEnum,
		},
	],
	description: `Grandmouffle's second attempt at creation, dwarves are short, powerfully built beings born from a less refined but sturdier material than the "effeminate" elves. After the Great Confusion, they settled in mountains, becoming skilled in forging and brewing beer. A tragic split occurred over the prized Granitos biscuits, denied to some turbulent young dwarves. Corrupted by Chaos with promises of endless Granitos, these became the Grey Dwarves, leading to a devastating civil war that remains a painful memory in Durhkran society.`,
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'dwarvish' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'histoire-legendes-152',
			'bras-de-fer-77',
			'estimation-109',
			'chant-122',
			'fermentation-8',
		],
		attributes: [
			{
				name: 'Proud People',
				effect:
					'Can reroll sincerity checks once; disadvantage on deception and persuasion.',
				description: `A dwarf's honor is tied to their word and ancestry. They never lie and have learned to spot betrayal—especially from Grey Dwarves who sneak into their cities`,
				value: 0,
				flavor: '',
				id: 'peuple-fier-14',
			},
			{
				name: 'Hard-Headed',
				effect: `Advantage against stunning blows; helmets count as weightless.`,
				description: `Born with iron-rich bones, dwarves have famously durable skulls. Trained since childhood to wear helmets heavier than themselves, they rarely suffer knockouts.`,
				value: 0,
				flavor: '',
				id: 'crane-dure-13',
			},
			{
				name: 'Hereditary Tolerance',
				effect: `Alcohol has reduced effect; advantage on inebriation rolls.`,
				description: `Durhkran dwarves drink for every minor occasion (even “it's been a while”). Over time, they’ve developed legendary alcohol resistance—tea vendors weep.`,
				value: 0,
				flavor: '',
				id: 'tolerance-hereditaire-10',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 13,
			AGI: 13,
			DEX: 15,
			STR: 17,
			END: 18,
			VIT: 16,
			WIL: 17,
			INS: 14,
			SEN: 14,
			CHA: 13,
			SOC: 15,
			ERU: 15,
		},
	},
};
export const grey = {
	specie: 'dwarf',
	sub: 'grey',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'goblin',
			value: 'goblin' as LanguageEnum,
		},
		{
			label: 'kabbalistic glyphs',
			value: 'kabbalistic_glyphs' as LanguageEnum,
		},
	],
	description: `These are the dwarves who succumbed to Chaos after being denied Granitos biscuits as children. Promised endless amounts of the treat, they turned against their Durhkran brethren, causing a terrible civil war. This schism deeply scarred dwarven society, and the event is a sensitive topic. Grey Dwarves are now associated with Chaos and are the traditional enemies of the Durhkran dwarves, representing a dark chapter in their history stemming from a childhood grievance amplified by dark forces.`,
	bio: {
		isCaster: true,
	},
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'clay' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'dwarvish' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'conserves-4',
			'intimidation-136',
			'geologie-159',
			'deguisement-40',
			'blagues-120',
		],
		attributes: [
			{
				name: 'Underground Life',
				effect:
					'See equally in dim and bright light; advantage on perception and navigation rolls underground.',
				description:
					'Living in the deepest tunnels, Grey Dwarves developed heightened light sensitivity and a keen instinct for lurking dangers.',
				value: 0,
				flavor: '',
				id: 'vie-souterraine-4',
			},
			{
				name: 'Magic-Sensitive',
				effect: `Can cast spells without formal magical training.`,
				description: `Grey Dwarves, having few hobbies, tuned into magic and even the whispers of the Moisi. They sense arcane forces hidden in mountain stone.`,
				value: 0,
				flavor: '',
				id: 'sensibilite-magique-11',
			},
			{
				name: 'Unshakable',
				effect: `+5 starting skill points`,
				description: `Denied sweets and legendary Granitos, Grey Dwarves go into sugar-frenzies when tempted. Their untrained stomachs grant them a burst of power… followed by a crash.`,
				value: 0,
				flavor: '',
				id: 'inebranlable-12',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 13,
			AGI: 13,
			DEX: 16,
			STR: 16,
			END: 17,
			VIT: 15,
			WIL: 16,
			INS: 16,
			SEN: 16,
			CHA: 13,
			SOC: 14,
			ERU: 15,
		},
	},
};
export const republican = {
	specie: 'goblin',
	sub: 'republican',
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'gnomish',
			value: 'gnomish' as LanguageEnum,
		},
		{
			label: 'clay',
			value: 'clay' as LanguageEnum,
		},
	],
	description:
		'These enlightened goblins replaced their monarchy with a democracy that’s slow but proud. The Gobeline Republic is governed by a national assembly of brilliant (and old) politicians, ensuring security, equality and economic supremacy over the other cultures. Although extremely bureaucratic, the numerous laws are rarely enforced but beautifully displayed in glass cases. Republican goblins are good companions, except when splitting bills or clarifying legal points, as their national motto suggests: “Better to debate than decide”',
	bio: {
		isCaster: false,
	},
	size: 'small',
	specifics: {
		speaks: [
			{
				language: 'goblin' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'estimation-109',
			'commerce-108',
			'lecture-ecriture-153',
			'legislation-68',
			'politesse-132',
		],
		attributes: [
			{
				name: 'Skilled Negotiator',
				effect: 'Advantage on persuasion and trade rolls.',
				description:
					'Republican goblins have built a thriving society and quickly became expert traders. Their mastery of treaties and market rates is legendary.',
				value: 0,
				flavor: '',
				id: 'fin-negociateur-7',
			},
			{
				name: 'Cartesian Schooling',
				effect: `+1 knowledge and +1 in knowledge mastery; disadvantage on performance and artistic rolls.`,
				description: `Their education is Enlightenment-based and laser-focused on logic, leaving little room for creativity.`,
				value: 0,
				flavor: '',
				id: 'enseignement-cartesien-8',
			},
			{
				name: 'Bureaucratic Mind',
				effect: `May reroll a failed logic roll, but loses 1 SOC for the day (stackable).`,
				description: `Only citizens of the Republic can withstand its infernal paperwork. Trained to overcome cerebral torture.`,
				value: 0,
				flavor: '',
				id: 'procedurier-9',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 14,
			AGI: 13,
			DEX: 15,
			STR: 12,
			END: 13,
			VIT: 15,
			WIL: 15,
			INS: 16,
			SEN: 15,
			CHA: 16,
			SOC: 17,
			ERU: 18,
		},
	},
};
export const royalist = {
	specie: 'goblin',
	sub: 'royalist',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'dwarven runes',
			value: 'dwarven_runes' as LanguageEnum,
		},
		{
			label: 'dead speech',
			value: 'dead_speech' as LanguageEnum,
		},
	],
	description: `These goblins, with brownish or even black skin, remain loyal to the royal lineage in the depths. They don't maintain their nails, possessing sharp claws for underground movement. They view the surface-dwelling Republican goblins as separatists who stole their ancestral lands. Resentful of the Republic's rise, they attempted violent protests. Now, their current king, Injur Tuverha, seeks to reclaim their surface territory through the Republic's own legal system, with royalist supporters attempting to gain influence within Republican society. They are seen as less refined but also more ferocious than their republican counterparts.`,
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'goblin' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'clay' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'veille-118',
			'fouille-34',
			'jeune-177',
			'rapine-96',
			'mendicite-110',
		],
		attributes: [
			{
				name: 'Underground Life',
				effect:
					'See in dim light as if it were daylight; advantage on underground navigation and perception.',
				description:
					'Used to tight tunnels, royalist goblins developed acute vision in darkness.',
				value: 0,
				flavor: '',
				id: 'vie-souterraine-4',
			},
			{
				name: 'Sharp Priorities',
				effect: `+1 survival; advantage on evasion, disadvantage on fear.`,
				description: `Always on alert, they sleep with one eye open and are great at bolting when danger comes.`,
				value: 0,
				flavor: '',
				id: 'sens-des-priorites-5',
			},
			{
				name: 'Carrion eaters',
				effect: `Can reroll a failed END test if not a fiasco, can consume rotten food`,
				description: `Carrion eater description`,
				value: 0,
				flavor: '',
				id: 'charognards-6',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 17,
			DEX: 17,
			STR: 15,
			END: 14,
			VIT: 15,
			WIL: 15,
			INS: 18,
			SEN: 15,
			CHA: 11,
			SOC: 11,
			ERU: 13,
		},
	},
};
export const free = {
	specie: 'gnome',
	sub: 'free',
	specieDifficulty: 'easy',
	languages: [
		{
			label: 'dwarvish',
			value: 'dwarvish' as LanguageEnum,
		},
		{
			label: 'goblin',
			value: 'goblin' as LanguageEnum,
		},
	],
	description: `Gnomes are small, agile artisans with easygoing and bubbly attitudes. Their hairy feet aid their swiftness, matching their bold nature. Believed to be favored by Grandmouffle, their sudden appearance in Boute's pastures is debated. Some link them to Grandmouffle, others to a magical accident involving the local spapareille fern, which caused the first settlers to shrink and become the energetic, joyful gnomes.`,
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'gnomish' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'cuisine-175',
			'calcul-mental-64',
			'commerce-108',
			'jeux-72',
			'commerage-107',
		],
		attributes: [
			{
				name: 'Tireless Chatterbox',
				effect:
					'No fatigue penalties with one short rest per day, +1 carry capacity, disadvantage on stealth when accompanied',
				description:
					'Traveling with a gnome means endless conversation. Their joy in meeting strangers and telling stories makes them forget their tiredness—but not their volume.',
				value: 0,
				flavor: '',
				id: 'babillard-infatigable-31',
			},
			{
				name: 'Blessed Luck',
				effect: 'Critical successes grant a luck roll',
				description:
					'Even gnomes admit it: they’re outrageously lucky. Whether it’s divine blessing or lingering Spapareille magic, they always seem to bounce back from disaster.',
				value: 0,
				flavor: '',
				id: 'vernis-32',
			},
			{
				name: 'Crafting Heritage',
				effect: 'Start with one artisan trade at rank 1 and the matching skill',
				description:
					'Though hyperactive, gnomes channel their energy into long-standing artisanal traditions. From a young age, they master trades that rival even the finest Mouffian craftsmen.',
				value: 0,
				flavor: '',
				id: 'famille-artisans-33',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 12,
			DEX: 18,
			STR: 13,
			END: 16,
			VIT: 15,
			WIL: 17,
			INS: 13,
			SEN: 14,
			CHA: 14,
			SOC: 17,
			ERU: 16,
		},
	},
};
export const proschöne = {
	specie: 'gnome',
	sub: 'proschöne',
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'fifilanto',
			value: 'fifilanto' as LanguageEnum,
		},
		{
			label: 'primal',
			value: 'primal' as LanguageEnum,
		},
	],
	description:
		'Wild gnomes, also known as proschöne gnomes, are deeply connected to nature. Often smaller and more slender than their "free" kin, they possess an ethereal beauty with piercing eyes and long, flowing hair, sometimes adorned with natural elements. Their clothing is typically made from leaves, moss, and other forest materials. They are often mischievous, elusive, and possess a strong affinity for magic tied to the natural world. Their origins are shrouded in mystery, often linked to ancient spirits of the land or forgotten deities.',
	bio: {
		isCaster: true,
	},
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'gnomish' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'astrologie-55',
			'contes-48',
			'cueillette-181',
			'duperie-125',
			'cris-d-animaux-115',
		],

		attributes: [
			{
				name: 'Tiny Form',
				effect:
					'Can use 1 SEN and an action to shrink to Tiny size, gaining advantage on stealth',
				description:
					'Thanks to an odd biological trait or perhaps ancient magic, Proschöne gnomes can compress their bodies down to something the size of a teapot. Great for hiding. Less great for reaching shelves.',
				value: 0,
				flavor: '',
				id: 'minuscule-34',
			},
			{
				name: 'Forest Bond',
				effect:
					'+1d4 HP and SEN when resting in a forest or in contact with a lively tree',
				description:
					'Proschöne gnomes draw strength from trees, moss, and birdsong. Just touching bark seems to energize them, and a nap beneath leaves restores more than rest.',
				value: 0,
				flavor: '',
				id: 'connexion-forestiere-35',
			},
			{
				name: 'Deceptive Mind',
				effect:
					'Advantage on CHA rolls, enemies have disadvantage on SEN rolls to resist your charms and enchantments',
				description:
					'Mischievous to their core, Proschöne gnomes twist words and enchantments like storytellers weave tales. It’s hard to know when to trust them—and harder to resist their charm.',
				value: 0,
				flavor: '',
				id: 'esprit-trompeur-36',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 16,
			AGI: 13,
			DEX: 15,
			STR: 12,
			END: 18,
			VIT: 17,
			WIL: 13,
			INS: 17,
			SEN: 19,
			CHA: 13,
			SOC: 14,
			ERU: 15,
		},
	},
};
export const pipourray = {
	specie: 'orc',
	sub: 'pipourray',
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'kabbalistic glyphs',
			value: 'kabbalistic_glyphs' as LanguageEnum,
		},
		{
			label: 'elven',
			value: 'elven' as LanguageEnum,
		},
	],
	description:
		'Result of a schism among velus orcs during the Guerre du Moisi. Exposed to peace, they formed a truce, angering Grand Moisi and creating the scattered Pipoura tribe. Unlike their kin, they integrated well into human/Armagnac society, embracing freedom in refugee camps/squats. They value peace, nature, thriving in crafts/poetry. While not focused on combat, they retain inherent strength. Rarely armed, they adorn their hair with flowers/vines. Their culture shifted from war to harmony.',
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'clay' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'cuisine-175',
			'chant-122',
			'dressage-49',
			'simples-170',
			'baton-20',
		],
		attributes: [
			{
				name: 'Pacifist',
				effect:
					'Uses force only in self-defense, may reroll persuasion or eloquence once per day',
				description:
					'The Pipoura have abandoned weapons and warfare in pursuit of a peaceful life. Though this pursuit is often tested, they believe in the power of words over violence—at least for a while.',
				value: 0,
				flavor: '',
				id: 'pacifiste-22',
			},
			{
				name: 'Natural Harmony',
				effect:
					'+1 remission in rural areas, advantage on animal handling and nature rolls',
				description:
					'Pipoura tribes often settle in shaded glades and forest clearings, where they reconnect with their wild orcish roots. Their nomadic society passes down rural knowledge as sacred tradition.',
				value: 0,
				flavor: '',
				id: 'harmonie-naturelle-23',
			},
			{
				name: 'Artistic Passion',
				effect: '+1 Crafting skill, +1 performance',
				description:
					'Pipoura orcs cultivate wonder and beauty within their camps, believing that music and song are the best remedies for violent instincts. Their culture thrives on creativity and expression.',
				value: 0,
				flavor: '',
				id: 'passion-artistique-24',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 14,
			DEX: 13,
			STR: 16,
			END: 17,
			VIT: 15,
			WIL: 14,
			INS: 18,
			SEN: 16,
			CHA: 12,
			SOC: 14,
			ERU: 12,
		},
	},
};
export const villous = {
	specie: 'orc',
	sub: 'villous',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'common',
			value: 'common' as LanguageEnum,
		},
		{
			label: 'dead speech',
			value: 'dead_speech' as LanguageEnum,
		},
	],
	description:
		'Large, muscular, confident orcs with greenish skin adapted to jungles/deserts. Powerful limbs, claws, tusked jaws. Favor practical attire, warriors wear armor. Created by Grand Moisi, they became a dominant, warlike force east of Peacefull Landes. Initially few, their strength devastated early skirmishes in the Guerre du Moisi. Impatience and battle-lust drove them. Trench warfare and calming substances led to a shift, resulting in a peace treaty and the emergence of the pacifist Pipoura. Their hierarchical society values strength, with a supreme general under Grand Moisi. Warrior culture supported by simple rites and shamanic practices using euphoric substances for control.',
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'clay' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'bras-de-fer-77',
			'intimidation-136',
			'jeune-177',
			'rafistolage-14',
		],
		attributes: [
			{
				name: 'Hot-Blooded',
				effect: 'On failed SOC check, must resort to force with advantage',
				description:
					'Unaccustomed to lengthy negotiation, warrior orcs often turn to raw strength when words fail. A flexed chest and a stomped ground usually get the message across.',
				value: 0,
				flavor: '',
				id: 'fougueux-25',
			},
			{
				name: 'Martial Training',
				effect: '+1 melee weapon skill, +1 strength',
				description:
					'Born for war, Velus orc tribes train their youth from a young age to fight. Whether with fists or clubs, every orc knows how to answer a call to arms.',
				value: 0,
				flavor: '',
				id: 'entrainement-martial-26',
			},
			{
				name: 'Resilient',
				effect: 'Once per day, on falling to 0 HP, roll END to stay at 1 HP',
				description:
					'Velus orcs are known for their legendary toughness. Their powerful metabolism and will to fight keep them standing long after others would fall.',
				value: 0,
				flavor: '',
				id: 'resilient-27',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 15,
			AGI: 15,
			DEX: 14,
			STR: 17,
			END: 18,
			VIT: 16,
			WIL: 17,
			INS: 17,
			SEN: 14,
			CHA: 11,
			SOC: 11,
			ERU: 13,
		},
	},
};
export const halfvampire = {
	specie: 'half-vampire',
	sub: 'half-vampire',
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'moufflian slang',
			value: 'moufflian_slang' as LanguageEnum,
		},
		{
			label: 'clay',
			value: 'clay' as LanguageEnum,
		},
	],
	description: `Resembling vampires, half-vampires have slightly elongated canines, pale skin, and are prone to sunburn. They often conceal their strength and features. A suppressed rage surfaces when blood-deprived, leading to intense gazes at small animals. Born from pregnant women turned vampire, they are less powerful than their undead sires but possess notable strength and speed. They cannot transmit vampirism by a bite but reproduce naturally. Forced into solitary lives due to their need for blood, they are scattered, with a concentration in Vieux-Mouffle's Naibreux County, inspiring local legends.`,
	bio: {
		isCaster: true,
	},
	specifics: {
		size: 'average',
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'dead_speech' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'equilibre-41',
			'heraldique-151',
			'grimage-127',
			'sincerite-111',
			'furtivite-44',
		],

		attributes: [
			{
				name: 'Night Vision',
				effect:
					'Can see in total darkness up to 15 meters; advantage on perception at night',
				description:
					'Thanks to their undead ancestry, Half-Vampires see clearly in the dark. Whether lurking or watching, their gaze pierces the shadows better than most mortals.',
				value: 0,
				flavor: '',
				id: 'vision-nocturne-43',
			},
			{
				name: 'Blood Recovery',
				effect:
					'Can only heal through blood; cures poison with meat or blood during short rest rolls. Health potions also work.',
				description:
					'Half-Vampires digest food like normal folk, but only blood truly mends their wounds. A quiet nibble or fresh prey is the key to their survival and restoration.',
				value: 0,
				flavor: '',
				id: 'regain-sang-44',
			},
			{
				name: 'Magical Sensitivity',
				effect: 'Can cast spells and detect magic without training',
				description:
					'Magic runs thick in their cursed lineage. With no formal schooling, Half-Vampires sense magical winds and manipulate them as if guided by instinct alone.',
				value: 0,
				flavor: '',
				id: 'sensible-magie-45',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 17,
			AGI: 18,
			DEX: 15,
			STR: 16,
			END: 13,
			VIT: 13,
			WIL: 14,
			INS: 16,
			SEN: 16,
			CHA: 16,
			SOC: 12,
			ERU: 14,
		},
	},
};
export const barbarian = {
	specie: 'barbarian',
	sub: 'barbarian',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'clay',
			value: 'clay' as LanguageEnum,
		},
		{
			label: 'forester symbols',
			value: 'forester_symbols' as LanguageEnum,
		},
	],
	description:
		'Towering brutes from frozen lands, barbarians live in tight-knit clans ruled by pride and the “spirit of the belly,” to whom daily food is offered. Shirtless for honor, they love to fight, feast, and hunt. Once isolated, they joined the war against the Grand Moisi, led by Colonel Christophe. Now, each clan seeks glory in the yearly Royal Battle, armed with enchanted gear and a thirst for brawling.',
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'giant' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: ['bagarre-74', 'lutte-79', 'chasse-173', 'massage-166'],
		attributes: [
			{
				name: 'Long-Range Hunter',
				effect: 'May reroll athletics checks, +1 physique',
				description:
					'Barbarian hunters travel long distances in search of big game. From a young age, they’re trained to move fast, carry gear, and endure exhaustion without complaint.',
				value: 0,
				flavor: '',
				id: 'chasseur-distance-28',
			},
			{
				name: 'Harsh Life',
				effect:
					'+1 remission, less affected by cold, snow, rain, or wind (advantage on END rolls)',
				description:
					'Barbarian life in the Peaceful Lands is shaped by harsh weather. Over time, their bodies adapted to storms, frost, and raw nature. Even rest feels deeper for them.',
				value: 0,
				flavor: '',
				id: 'vie-rude-29',
			},
			{
				name: 'Warrior Tradition',
				effect:
					'+1 weapon skill; advantage on melee combat rolls after each solo kill; 2x disadvantage if wearing chest armor',
				description:
					'For barbarians, fighting is sacred. Wearing chest armor is dishonorable. But when blood flows, their love for battle shines—often terrifying allies and enemies alike.',
				value: 0,
				flavor: '',
				id: 'tradition-guerriere-30',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 16,
			AGI: 16,
			DEX: 14,
			STR: 17,
			END: 17,
			VIT: 15,
			WIL: 18,
			INS: 17,
			SEN: 11,
			CHA: 16,
			SOC: 12,
			ERU: 11,
		},
	},
};
export const halfogre = {
	specie: 'half-ogre',
	sub: 'half-ogre',
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'signs',
			value: 'signs' as LanguageEnum,
		},
		{
			label: 'giant',
			value: 'giant' as LanguageEnum,
		},
	],
	description:
		'Half-ogres appear as walking piles of belongings, but beneath their gear are big-hearted individuals. Descended from giants, they possess impressive size and strength, often simply called "ogres." Their sturdy frames support their bulky limbs and round bellies, making them the largest civilized beings. They carry all their possessions and adorn themselves with numerous trinkets and jewelry. Their most striking feature is their simple, honest smile that softens their rugged faces.',
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'large',
		massive: true,
		speaks: [
			{
				language: 'common' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'gnomish' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'orientation-178',
			'commerce-108',
			'lutte-79',
			'estimation-109',
			'soin-des-animaux-171',
		],

		attributes: [
			{
				name: 'Wandering Trader',
				effect: 'Trades instead of selling, +1 strength',
				description:
					'With enormous backpacks full of oddities, Half-Ogres prefer bartering over traditional currency. Their collections may contain hidden gems—or total junk.',
				value: 0,
				flavor: '',
				id: 'troqueur-ambulant-37',
			},
			{
				name: 'Simple-Minded',
				effect:
					'Disadvantage on logic and knowledge rolls, resistant to magical mind effects',
				description:
					'Slow thinkers but hard to control, Half-Ogres confuse sorcerers simply by not having minds worth dominating. They rarely get the point—but they’re hard to hex.',
				value: 0,
				flavor: '',
				id: 'faible-esprit-38',
			},
			{
				name: 'Long-Haul Traveler',
				effect: 'Roll 2 dice when resting, keep the best; +1 remission',
				description:
					'Half-Ogres are tireless walkers, often sleeping with their back to their bag and a cow in tow. They recover well even after long treks or awkward naps.',
				value: 0,
				flavor: '',
				id: 'grand-voyageur-39',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 14,
			AGI: 11,
			DEX: 13,
			STR: 20,
			END: 19,
			VIT: 20,
			WIL: 13,
			INS: 15,
			SEN: 10,
			CHA: 12,
			SOC: 18,
			ERU: 10,
		},
	},
};
export const troll = {
	specie: 'troll',
	sub: 'troll',
	specieDifficulty: 'normal',
	languages: [
		{
			label: 'clay',
			value: 'clay' as LanguageEnum,
		},
		{
			label: 'primal',
			value: 'primal' as LanguageEnum,
		},
	],
	description:
		'Trolls are a simple people with cryptic traditions, adorning their slender bodies with bone jewelry, ritualistic paintings, and scarifications. Prominent tusks symbolize spiritual elevation, not physical prowess. Their coarse hair is often braided or styled with pigmented grease. Though sometimes mistaken for the forest-dwelling drolles due to the greenish hue of Peacefull Landes trolls, they are a proud and civilized race. Their origins are linked to the Grand Bazaar, surprisingly, given their pacifistic nature and vigilance over their territories.',
	bio: {
		isCaster: false,
	},
	specifics: {
		size: 'average',
		speaks: [
			{
				language: 'troll' as LanguageEnum,
				mastery: 3,
				label: 'species',
			},
			{
				language: 'common' as LanguageEnum,
				mastery: 2,
				label: 'species',
			},
		],
	},
	path: {
		skills: [
			'cris-d-animaux-115',
			'lecture-ecriture-153',
			'soin-des-animaux-171',
			'vents-magiques-119',
		],
		attributes: [
			{
				name: 'Prodigy',
				effect:
					'Can do an ERU test at the end of an adventure to gain 1 additionnal Skill Point',
				description:
					'Trolls were accidentally gifted with remarkable intellect by the Moisi. Their thirst for knowledge makes them rapid learners, devouring skills like they would a wild boar.',
				value: 0,
				flavor: '',
				id: 'prodige-40',
			},
			{
				name: 'Tech-Averse',
				effect:
					'Avoids goblin and gnome technology; advantage on survival rolls',
				description:
					'Descendants of ancient troll nations scorn machines. Deep-rooted traditions forbid the use of goblin and gnome tech, which they see as invasive and unnatural.',
				value: 0,
				flavor: '',
				id: 'decroissant-41',
			},
			{
				name: 'Natural Hunter',
				effect: '+1 survival skill, +1 stealth, +1 ranged',
				description:
					'From treetop jungles to cliffside canyons, trolls are skilled hunters. Capable of going days without supplies, they move silently and strike accurately in the wild.',
				value: 0,
				flavor: '',
				id: 'chasseur-naturel-42',
			},
		],
	},
	profile: {
		statsStarting: {
			CEL: 16,
			AGI: 16,
			DEX: 15,
			STR: 12,
			END: 10,
			VIT: 15,
			WIL: 15,
			INS: 18,
			SEN: 22,
			CHA: 11,
			SOC: 12,
			ERU: 18,
		},
	},
};

// TYPES

type Language = {
	label: string;
	value: LanguageList;
};

type Bio = {
	isCaster: boolean;
};

type Path = {
	skills: string[];
	attributes: Attribute[];
};

type Attribute = {
	name: string;
	effect: string;
	description: string;
	flavor?: string | null;
	id: string;
	value?: number | null;
};

type Specifics = {
	speaks: SpecificLanguage[];
	size?: string;
	massive?: boolean;
};

type StatsStarting = {
	CEL: number;
	AGI: number;
	DEX: number;
	STR: number;
	END: number;
	VIT: number;
	WIL: number;
	INS: number;
	SEN: number;
	CHA: number;
	SOC: number;
	ERU: number;
};

type Profile = {
	statsStarting: StatsStarting;
};

export type SpecieDataForm = {
	specie: string;
	sub: string;
	specieDifficulty: string;
	languages: Language[];
	specifics: Specifics;
	profile: Profile;
	path: Path;
	bio?: Bio;
	description?: string;
};

export const speciesMap: Record<string, SpecieDataForm> = {
	moufflian,
	inclay,
	bourguignon,
	armagnac,
	durhkran,
	grey,
	republican,
	royalist,
	free,
	proschöne,
	pipourray,
	villous,
	'half-vampire': halfvampire,
	'half-ogre': halfogre,
	barbarian,
	troll,
};

export type LanguageEnum =
	| 'common'
	| 'moufflian_slang'
	| 'clay'
	| 'elven'
	| 'dwarvish'
	| 'gnomish'
	| 'goblin'
	| 'giant'
	| 'troll'
	| 'high_elven'
	| 'titan'
	| 'rosmary'
	| 'dead_speech'
	| 'fifilanto'
	| 'primal'
	| 'amphibian'
	| 'silvan'
	| 'signs'
	| 'thieves_marks'
	| 'forester_symbols'
	| 'dwarven_runes'
	| 'kabbalistic_glyphs';

export const allSpecies = [
	moufflian,
	inclay,
	bourguignon,
	armagnac,
	durhkran,
	grey,
	villous,
	pipourray,
	free,
	proschöne,
	republican,
	royalist,
	halfogre,
	halfvampire,
	barbarian,
	troll,
];
