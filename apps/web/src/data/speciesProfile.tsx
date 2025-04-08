export const moufflian = {
	specie: 'human',
	sub: 'moufflian',
	specieDifficulty: 'easy',
	languages: [
		{
			label: 'gnomish',
			value: 'gnomish',
		},
		{
			label: 'dwarvish',
			value: 'dwarvish',
		},
	],
	description:
		'Humans were Grandmouffle’s first successful creation. Initially all male, they couldn’t reproduce, prompting the creation of women. Population exploded, causing ecological damage. The Immortals voted to destroy most of them, sparing only the elite. Grandmouffle defied them, saving others behind a protective barrier. These survivors thrived, becoming diverse and inventive. Human society is divided, flawed, yet adaptable and influential.',
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
			},
		],
	},
	specifics: {
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'moufflian slang',
				mastery: '2',
			},
		],
	}, // TODO: add skill list from skilldatabase (pull object)
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
	languages: [
		{
			label: 'goblin',
			value: 'goblin',
		},
		{
			label: 'moufflian slang',
			value: 'moufflian_slang',
		},
	],
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
			},
		],
	},
	specifics: {
		speaks: [
			{
				language: 'clay',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
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
			value: 'high_elven',
		},
		{
			label: 'fifilanto',
			value: 'fifilanto',
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
				language: 'elven',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			label: 'dwarven',
			value: 'dwarven',
		},
		{
			label: `thieves' marks`,
			value: 'thieves_marks',
		},
	],
	description:
		'These are the dissident elves who abandoned the forests after the Grande Confusion, leading to a major civil war. They rejected their traditional ways, trading bows for firearms and other weapons. Their hair became dyed in unnatural colors, and they forsook traditional elven plants for stronger, less reputable substances. Considered a separate people, they are viewed as brothers by humans and receive some sympathy from dwarves. They live among other races in Vieux-Mouffle and Peacefull Landes cities, often marginalized and seen as potentially dangerous rebels by Bourguignon elves and many citizens.',
	specifics: {
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'elven',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			label: 'moufflian slanf',
			value: 'moufflian slang',
		},
		{
			label: 'dwarven runes',
			value: 'dwarven_runes',
		},
	],
	description: `Grandmouffle's second attempt at creation, dwarves are short, powerfully built beings born from a less refined but sturdier material than the "effeminate" elves. After the Great Confusion, they settled in mountains, becoming skilled in forging and brewing beer. A tragic split occurred over the prized Granitos biscuits, denied to some turbulent young dwarves. Corrupted by Chaos with promises of endless Granitos, these became the Grey Dwarves, leading to a devastating civil war that remains a painful memory in Durhkran society.`,
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'dwarven',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'goblin',
			value: 'goblin',
		},
		{
			label: 'kabbalistic glyphs',
			value: 'kabbalistic_glyphs',
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
				language: 'clay',
				mastery: '3',
			},
			{
				language: 'dwarven',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'gnomish',
		},
		{
			label: 'clay',
			value: 'clay',
		},
	],
	description:
		'These enlightened goblins replaced their monarchy with a democracy that’s slow but proud. The Gobeline Republic is governed by a national assembly of brilliant (and old) politicians, ensuring security, equality and economic supremacy over the other cultures. Although extremely bureaucratic, the numerous laws are rarely enforced but beautifully displayed in glass cases. Republican goblins are good companions, except when splitting bills or clarifying legal points, as their national motto suggests: “Better to debate than decide”',
	size: 'small',
	specifics: {
		speaks: [
			{
				language: 'goblin',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'dwarven_runes',
		},
		{
			label: 'dead speech',
			value: 'dead_speech',
		},
	],
	description: `These goblins, with brownish or even black skin, remain loyal to the royal lineage in the depths. They don't maintain their nails, possessing sharp claws for underground movement. They view the surface-dwelling Republican goblins as separatists who stole their ancestral lands. Resentful of the Republic's rise, they attempted violent protests. Now, their current king, Injur Tuverha, seeks to reclaim their surface territory through the Republic's own legal system, with royalist supporters attempting to gain influence within Republican society. They are seen as less refined but also more ferocious than their republican counterparts.`,
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'goblin',
				mastery: '3',
			},
			{
				language: 'clay',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'dwarvish',
		},
		{
			label: 'goblin',
			value: 'goblin',
		},
	],
	description: `Gnomes are small, agile artisans with easygoing and bubbly attitudes. Their hairy feet aid their swiftness, matching their bold nature. Believed to be favored by Grandmouffle, their sudden appearance in Boute's pastures is debated. Some link them to Grandmouffle, others to a magical accident involving the local spapareille fern, which caused the first settlers to shrink and become the energetic, joyful gnomes.`,
	specifics: {
		size: 'small',
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'gnomish',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'fifilanto',
		},
		{
			label: 'primal',
			value: 'primal',
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
				language: 'gnomish',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'kabbalistic_glyphs',
		},
		{
			label: 'elven',
			value: 'elven',
		},
	],
	description:
		'Result of a schism among velus orcs during the Guerre du Moisi. Exposed to peace, they formed a truce, angering Grand Moisi and creating the scattered Pipoura tribe. Unlike their kin, they integrated well into human/Armagnac society, embracing freedom in refugee camps/squats. They value peace, nature, thriving in crafts/poetry. While not focused on combat, they retain inherent strength. Rarely armed, they adorn their hair with flowers/vines. Their culture shifted from war to harmony.',
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'clay',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'common',
			value: 'common',
		},
		{
			label: 'dead speech',
			value: 'dead_speech',
		},
	],
	description:
		'Large, muscular, confident orcs with greenish skin adapted to jungles/deserts. Powerful limbs, claws, tusked jaws. Favor practical attire, warriors wear armor. Created by Grand Moisi, they became a dominant, warlike force east of Peacefull Landes. Initially few, their strength devastated early skirmishes in the Guerre du Moisi. Impatience and battle-lust drove them. Trench warfare and calming substances led to a shift, resulting in a peace treaty and the emergence of the pacifist Pipoura. Their hierarchical society values strength, with a supreme general under Grand Moisi. Warrior culture supported by simple rites and shamanic practices using euphoric substances for control.',
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'clay',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'moufflian_slang',
		},
		{
			label: 'clay',
			value: 'clay',
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
				language: 'common',
				mastery: '3',
			},
			{
				language: 'dead speech',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'clay',
		},
		{
			label: 'forester symbols',
			value: 'forester_symbols',
		},
	],
	description:
		'Towering brutes from frozen lands, barbarians live in tight-knit clans ruled by pride and the “spirit of the belly,” to whom daily food is offered. Shirtless for honor, they love to fight, feast, and hunt. Once isolated, they joined the war against the Grand Moisi, led by Colonel Christophe. Now, each clan seeks glory in the yearly Royal Battle, armed with enchanted gear and a thirst for brawling.',
	specifics: {
		size: 'average',
		massive: true,
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'giant',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
			value: 'signs',
		},
		{
			label: 'giant',
			value: 'giant',
		},
	],
	description:
		'Half-ogres appear as walking piles of belongings, but beneath their gear are big-hearted individuals. Descended from giants, they possess impressive size and strength, often simply called "ogres." Their sturdy frames support their bulky limbs and round bellies, making them the largest civilized beings. They carry all their possessions and adorn themselves with numerous trinkets and jewelry. Their most striking feature is their simple, honest smile that softens their rugged faces.',
	specifics: {
		size: 'large',
		massive: true,
		speaks: [
			{
				language: 'common',
				mastery: '3',
			},
			{
				language: 'gnomish',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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
	specieDifficulty: 'tough',
	languages: [
		{
			label: 'clay',
			value: 'clay',
		},
		{
			label: 'primal',
			value: 'primal',
		},
	],
	description:
		'Trolls are a simple people with cryptic traditions, adorning their slender bodies with bone jewelry, ritualistic paintings, and scarifications. Prominent tusks symbolize spiritual elevation, not physical prowess. Their coarse hair is often braided or styled with pigmented grease. Though sometimes mistaken for the forest-dwelling drolles due to the greenish hue of Peacefull Landes trolls, they are a proud and civilized race. Their origins are linked to the Grand Bazaar, surprisingly, given their pacifistic nature and vigilance over their territories.',
	specifics: {
		size: 'average',
		speaks: [
			{
				language: 'troll',
				mastery: '3',
			},
			{
				language: 'common',
				mastery: '2',
			},
		],
	},
	path: {
		attributes: [
			{
				name: 'Cosmopolitan',
				effect: '1 additional language (F), 1 additional language (E)',
				description:
					'Humans are in constant contact with foreign races and have developed developed great talents for adapting to trade or to improve to improve understanding within their community. A human will often one or two additional languages from an early age, by virtue of the the different races with whom they make friends.',
			},
			{
				name: 'Universal comrade',
				effect: `Naturally welcomed and accepted, advantage in gossip and trade`,
				description: `Of all the races, humans are clearly the most able to form bonds with the most obscure individuals. Even proud trolls find these voluble little beings friendly, and let's not even mention the dwarves with whom they are almost blood brothers.`,
			},
			{
				name: 'Jack-of-all-trades',
				effect: `+5 starting skill points`,
				description: `Because of their great curiosity and the vagaries of life, humans are a resourceful people. a resourceful people who find many subjects of interest. Every different from one individual to the next.`,
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

type Language = {
	label: string;
	value: string;
};

type Bio = {
	isCaster: boolean;
};

type Path = {
	attributes: Attribute[];
};

type Attribute = {
	name: string;
	effect: string;
	description: string;
};

type SpecificSpeak = {
	language: string;
	mastery: string;
};

type Specifics = {
	size?: string;
	speaks: SpecificSpeak[];
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
