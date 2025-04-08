type StatModifier = {
	amount: string;
	stat: string;
	dice?: string;
};

type Mastery = {
	amount: string;
	target: string;
};

type Attribute = {
	id: string;
	name: string;
	value: number;
	effect: string;
	statModifier: StatModifier[] | StatModifier | null;
	masteries: Mastery[] | Mastery | null;
	flavor: string;
	description: string;
};

export const characterAttributes: Attribute[] = [
	{
		name: 'absent',
		value: -1,
		effect: 'Unaware of surrounding conversations.',
		statModifier: {
			amount: '-1',
			stat: 'INS',
		},
		masteries: null,
		flavor: "doesn't pay attention to conversations",
		description:
			"This character is often lost in their own thoughts and doesn't notice what others are saying.",
		id: 'absent-1',
	},
	{
		name: 'bright',
		value: 1,
		effect: 'Notices changes in the environment easily.',
		statModifier: {
			amount: '+1',
			stat: 'INS',
		},
		masteries: null,
		flavor: 'pays attention to changes in their environment',
		description:
			'This character is highly observant and quickly picks up on any alterations in their surroundings.',
		id: 'alerte-2',
	},
	{
		name: 'bloodsucker',
		value: 0,
		effect:
			'No health recovery during rest; recovers by consuming blood or flesh.',
		statModifier: null,
		masteries: null,
		flavor: 'needs blood to live and regenerate',
		description:
			'This character possesses a vampiric metabolism, requiring the consumption of blood or flesh for sustenance and healing instead of traditional rest.',
		id: 'alimentation-vampirique-3',
	},
	{
		name: 'ambidextrous',
		value: 1,
		effect: 'Proficient with both hands.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'performance',
			},
			{
				amount: '+1',
				target: 'preciseness',
			},
		],
		flavor: 'equal use of both hands',
		description:
			'This character is equally skilled with both their left and right hands.',
		id: 'ambidextre-4',
	},
	{
		name: 'friendly',
		value: 1,
		effect: 'People are generally more willing to help this character.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'speech',
		},
		flavor: 'a beautiful, sympathetic soul who is rarely refused anything',
		description:
			'This character has a friendly and approachable demeanor, making it easier to gain the favor of others.',
		id: 'amical-5',
	},
	{
		name: 'lover',
		value: -1,
		effect:
			'Incapable of harming the object of their affection, or charming persons',
		statModifier: null,
		masteries: null,
		flavor:
			'madly in love with someone and cannot harm them, their heart is already taken gentlemen/ladies',
		description:
			'This character is deeply in love with a specific person and is emotionally incapable of causing them harm.',
		id: 'amour-sincere-6',
	},
	{
		name: 'amputee',
		value: -1,
		effect: 'Reduced physical dexterity or agility.',
		statModifier: {
			amount: '-2',
			stat: 'DEX',
		},
		masteries: null,
		flavor:
			"something is missing from the character, but I can't quite put my finger on it...",
		description:
			'This character has lost a limb, which impacts their physical capabilities.',
		id: 'ampute-7',
	},
	{
		name: 'soothed',
		value: 1,
		effect: 'Possesses a calm and open demeanor.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'esoterism',
		},
		flavor: 'a personality and energies open to the outside',
		description:
			'This character has a peaceful and serene nature, with an open and receptive attitude.',
		id: 'apaise-8',
	},
	{
		name: 'meticulous',
		value: 1,
		effect: 'Dedicated and patient in their work.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'crafting',
		},
		flavor: 'length and patience of time when creating pieces',
		description:
			'This character is diligent and takes their time when crafting items, resulting in high-quality work.',
		id: 'applique-9',
	},
	{
		name: 'ascetic',
		value: 0,
		effect: 'Socially withdrawn but knowledgeable in esoteric matters.',
		statModifier: {
			amount: '-2',
			stat: 'speech',
		},
		masteries: {
			amount: '+2',
			target: 'esoterism',
		},
		flavor: 'a long solitary life leaves time to occupy oneself',
		description:
			'This character has spent a long time in solitude, leading to a detachment from social interaction but a deeper understanding of esoteric knowledge.',
		id: 'ascete-10',
	},
	{
		name: 'associable',
		value: -1,
		effect: 'Experiences difficulty integrating into social groups.',
		statModifier: {
			amount: '-1',
			stat: 'speech',
		},
		masteries: null,
		flavor: 'difficulties integrating',
		description:
			'This character struggles to connect with others and fit into social situations.',
		id: 'associable-11',
	},
	{
		name: 'watchful',
		value: 1,
		effect: 'Good at noticing small details and logical inconsistencies.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'detection',
			},
			{
				amount: '+1',
				target: 'logic',
			},
		],
		flavor: 'has a knack for noticing small details',
		description:
			'This character is very observant and has a talent for spotting minor details and logical flaws.',
		id: 'attentif-12',
	},
	{
		name: 'vampiric',
		value: -1,
		effect: 'Pale skin, sensitive to sunlight, visible fangs.',
		statModifier: null,
		masteries: null,
		flavor:
			'slightly more pointed fangs, pale skin, sunburns that mark quickly, or gothic influences',
		description:
			'This character possesses physical traits associated with vampirism, such as pale skin, sensitivity to sunlight, and noticeable fangs.',
		id: 'attributs-vampiriques-13',
	},
	{
		name: 'miser',
		value: -1,
		effect: 'Reluctant to spend money, especially on others.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'trading',
		},
		flavor:
			'seeks to conserve their money, will not spend on someone else and very little on themselves',
		description:
			'This character is stingy and avoids spending money, both on others and themselves.',
		id: 'avare-14',
	},
	{
		name: 'oaf',
		value: -1,
		effect: 'Clumsy and uncoordinated movements.',
		statModifier: {
			amount: '-1',
			stat: 'movement',
		},
		masteries: null,
		flavor: 'always the same one we expect',
		description:
			'This character is awkward and tends to stumble or make clumsy movements.',
		id: 'balourd-15',
	},
	{
		name: 'handsome',
		value: 1,
		effect: 'Physically attractive.',
		statModifier: {
			amount: '+1',
			stat: 'persuasion',
		},
		masteries: null,
		flavor: 'yet another handsome hero',
		description: 'This character possesses striking good looks.',
		id: 'beau-16',
	},
	{
		name: 'stutterer',
		value: -1,
		effect: 'Difficulty speaking fluently.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'speech',
		},
		flavor: 'h-h-hard to s-s-speak',
		description:
			'This character has a speech impediment that causes them to stutter.',
		id: 'begue-17',
	},
	{
		name: 'warlike',
		value: -1,
		effect: 'Prefers fighting over discussions.',
		statModifier: [
			{
				amount: '-1',
				stat: 'trading',
			},
			{
				amount: '+1',
				stat: 'fighting',
			},
		],
		masteries: [
			{
				amount: '-1',
				target: 'trading',
			},
			{
				amount: '+1',
				target: 'fighting',
			},
		],
		flavor: 'prefers fighting to discussions',
		description:
			'This character has an aggressive nature and is more inclined to resolve conflicts through violence than diplomacy.',
		id: 'belliqueux-18',
	},
	{
		name: 'accepted',
		value: 1,
		effect: 'Generally accepted and trusted by the community.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'trading',
			},
			{
				amount: '+1',
				target: 'speech',
			},
		],
		flavor: 'cancels out prejudices against the character',
		description:
			'This character is well-respected and easily accepted within social circles.',
		id: 'bien-integre-19',
	},
	{
		name: 'caring',
		value: 1,
		effect: 'Naturally inclined to help and care for others.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'healing',
		},
		flavor: 'a caring face and fairy fingers',
		description:
			'This character is kind-hearted and has a natural desire to assist and heal those in need.',
		id: 'bienveillant-20',
	},
	{
		name: 'old injury',
		value: -1,
		effect: 'Reduced maximum health.',
		statModifier: {
			amount: '-1',
			stat: 'physique',
			dice: 'd3',
		},
		masteries: null,
		flavor: 'a painful wound affects daily life',
		description:
			'This character suffers from a permanent injury that reduces their overall vitality.',
		id: 'blessure-permanente-21',
	},
	{
		name: 'deep wound',
		value: -1,
		effect: 'Takes additional damage from critical hits.',
		statModifier: null,
		masteries: null,
		flavor: 'blows resonate more strongly in their bones',
		description:
			'This character has a severe injury that makes them more vulnerable to critical attacks.',
		id: 'blessure-profonde-22',
	},
	{
		name: 'good metabolism',
		value: 1,
		effect: 'Recovers from ailments more easily.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'healing',
		},
		flavor: 'these antibodies are heroes in their own right!',
		description:
			'This character has a strong constitution and recovers from illnesses and negative effects quickly.',
		id: 'bon-metabolisme-23',
	},
	{
		name: 'smell',
		value: 1,
		effect: 'Enhanced sense of smell.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'perception',
			},
			{
				amount: '+1',
				target: 'detection',
			},
		],
		flavor: 'can remember smells, sense a presence',
		description:
			'This character has a highly developed sense of smell, allowing them to identify scents and detect hidden presences.',
		id: 'bon-odorat-24',
	},
	{
		name: 'recovery',
		value: 1,
		effect: 'Takes less damage from falls.',
		statModifier: null,
		masteries: null,
		flavor: 'everyone should know how to do a good roll',
		description:
			'This character has a knack for landing gracefully, reducing the impact of falls.',
		id: 'bon-retablissement-25',
	},
	{
		name: 'good hearing',
		value: 1,
		effect: 'Enhanced sense of hearing.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'perception',
			},
			{
				amount: '+1',
				target: 'survival',
			},
		],
		flavor: 'hears approaches more easily, distinguishes different sounds',
		description:
			'This character has excellent hearing, making it easier to detect approaching sounds and differentiate between them.',
		id: 'bonne-ouie-26',
	},
	{
		name: 'reflexes',
		value: 1,
		effect: 'Reacts quickly to stimuli.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'defense',
			},
			{
				amount: '+1',
				target: 'performance',
			},
		],
		flavor: "it's like they're in the matrix",
		description:
			'This character has exceptionally fast reflexes, allowing them to react quickly to danger or opportunities.',
		id: 'bons-reflexes-27',
	},
	{
		name: 'one-eyed',
		value: -2,
		effect: 'Reduced depth perception and field of vision.',
		statModifier: null,
		masteries: [
			{
				amount: '-2',
				target: 'defense',
			},
			{
				amount: '-2',
				target: 'ranged',
			},
		],
		flavor: 'one eye less!',
		description:
			'This character has lost an eye, impairing their depth perception and accuracy with ranged attacks.',
		id: 'borgne-28',
	},
	{
		name: 'burned',
		value: -1,
		effect: 'Fear of fire (disadvantage on fear saving throws).',
		statModifier: {
			amount: '-1',
			stat: 'persuasion',
		},
		masteries: null,
		flavor: 'the mysterious trace of a dark past, or a kitchen accident',
		description:
			'This character bears a burn scar that has left them with a debilitating fear of fire.',
		id: 'brulure-29',
	},
	{
		name: 'bully',
		value: 1,
		effect: 'Intimidating presence.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'persuasion',
		},
		flavor: 'big biceps are sometimes more useful than beautiful phrasing',
		description:
			'This character possesses a physically imposing build that can be used to intimidate others.',
		id: 'brute-30',
	},
	{
		name: 'loud',
		value: -1,
		effect: 'Makes it difficult to move stealthily.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'discretion',
		},
		flavor: 'just shut up!',
		description:
			'This character is naturally loud and struggles to be quiet, making stealth difficult.',
		id: 'bruyant-31',
	},
	{
		name: 'calm',
		value: 2,
		effect: 'Resistant to stress and maintains composure easily.',
		statModifier: null,
		masteries: null,
		flavor: 'appreciates silence and relaxed environments',
		description:
			'This character has a naturally calm disposition and finds peace in quiet surroundings.',
		id: 'calme-32',
	},
	{
		name: 'skeptic',
		value: -1,
		effect: 'Skeptical of the supernatural.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'esoterism',
		},
		flavor: 'their mind is a little closed to the supernatural',
		description:
			'This character has a rational and logical mind, making them resistant to believing in the supernatural.',
		id: 'carthesien-33',
	},
	{
		name: 'nightmare',
		value: -1,
		effect: 'Experiences restless nights and may be fatigued.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'healing',
		},
		flavor: "has difficulty getting good nights' sleep",
		description:
			'This character is plagued by recurring nightmares, making it hard for them to rest properly.',
		id: 'cauchemar-recurrent-34',
	},
	{
		name: 'squabbler',
		value: 1,
		effect: 'Prone to brawling and quick to act.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'fighting',
			},
			{
				amount: '+1',
				target: 'movement',
			},
		],
		flavor: 'grew up in tough street gangs and looks for a fight',
		description:
			'This character has a combative nature and is always ready for a scuffle, often acting impulsively.',
		id: 'chamailleur-35',
	},
	{
		name: 'lucky',
		value: 2,
		effect:
			'Once per day/session, can reroll a die roll concerning them, must keep the second result.',
		statModifier: null,
		masteries: null,
		flavor: 'was born under a lucky star',
		description:
			'This character is blessed with good fortune and has a limited ability to alter fate.',
		id: 'chanceux-36',
	},
	{
		name: 'blackmail',
		value: 1,
		effect: 'Has leverage over someone.',
		statModifier: null,
		masteries: null,
		flavor: 'has means of pressure on a person',
		description:
			'This character possesses compromising information or influence over another individual.',
		id: 'chantage-37',
	},
	{
		name: 'pesty',
		value: -1,
		effect: 'Annoys and irritates people compulsively.',
		statModifier: {
			amount: '-2',
			stat: 'speech',
		},
		masteries: null,
		flavor: 'drives people to their breaking point, compulsively',
		description:
			"This character has an irritating personality and tends to push people's buttons.",
		id: 'chieur-38',
	},
	{
		name: 'scared',
		value: 1,
		effect: 'A noticeable scar that can be either alluring or intimidating.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'persuasion',
			},
			{
				amount: '+1',
				target: 'persuasion',
			},
		],
		flavor:
			"it makes one dream or disgust, it's a choice; in any case, it doesn't go unnoticed",
		description:
			'This character bears a prominent scar that draws attention and can evoke either fascination or repulsion.',
		id: 'cicatrice-39',
	},
	{
		name: 'city dweller',
		value: 1,
		effect: 'Familiar with urban environments but less so with the wilderness.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'movement',
			},
			{
				amount: '-1',
				target: 'survival',
			},
		],
		flavor: "a proud regular of the city's animation and taverns",
		description:
			'This character is accustomed to city life and its intricacies but may struggle in the wild.',
		id: 'citadin-40',
	},
	{
		name: 'farseeing',
		value: 1,
		effect: 'Excellent at discerning truthfulness.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'perception',
		},
		flavor: "you can't fool them!",
		description:
			'This character has a keen intuition and can easily see through lies and deception.',
		id: 'clairvoyant-41',
	},
	{
		name: 'bum',
		value: -1,
		effect: 'Threats are not taken seriously.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'persuasion',
		},
		flavor: 'no one takes this threat seriously',
		description:
			'This character lacks the presence or credibility to make their threats believable.',
		id: 'clampin-42',
	},
	{
		name: 'trader',
		value: 1,
		effect: 'Skilled in trade and negotiation.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'trading',
		},
		flavor: 'good at business',
		description:
			'This character has a natural talent for buying, selling, and striking deals.',
		id: 'commercant-43',
	},
	{
		name: 'plugged',
		value: 1,
		effect:
			'Once per adventure, can use the name of their protector or contact to escape a legal decision or misunderstanding.',
		statModifier: null,
		masteries: null,
		flavor: 'can use their connections to get out of bad situations',
		description:
			'This character has a powerful ally or connection they can call upon in dire circumstances.',
		id: 'contact-44',
	},
	{
		name: 'coquettish',
		value: -1,
		effect:
			'Highly concerned with their appearance, potentially at the expense of practicality.',
		statModifier: {
			amount: '+1',
			stat: 'CHA',
		},
		masteries: {
			amount: '-2',
			target: 'survival',
		},
		flavor: 'pays very close attention to their appearance',
		description:
			'This character is vain and spends a significant amount of time and effort on their looks.',
		id: 'coquet-45',
	},
	{
		name: 'gullible',
		value: -1,
		effect: 'Easily deceived or manipulated.',
		statModifier: {
			amount: '-1',
			stat: 'persuasion',
		},
		masteries: {
			amount: '-1',
			target: 'trading',
		},
		flavor: 'a somewhat problematic naivety',
		description:
			'This character is trusting to a fault and tends to believe what others tell them.',
		id: 'credule-46',
	},
	{
		name: 'greedy',
		value: 1,
		effect: 'Motivated by the acquisition of wealth.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'trading',
			},
			{
				amount: '+1',
				target: 'persuasion',
			},
		],
		flavor: 'seeks to obtain money',
		description:
			'This character is driven by greed and constantly seeks opportunities to gain wealth.',
		id: 'cupide-47',
	},
	{
		name: 'oldschool',
		value: -1,
		effect:
			'Avoids anything mechanical or originating from goblin or gnome technology.',
		statModifier: null,
		masteries: null,
		flavor: 'avoids anything mechanical or from goblin or gnome technology',
		description:
			'This character has a strong aversion to mechanical devices, especially those created by goblins or gnomes.',
		id: 'decroissant-48',
	},
	{
		name: 'insane',
		value: -3,
		effect:
			'Unable to follow conversations, may scream, shout, laugh without reason, and tell incoherent stories.',
		statModifier: null,
		masteries: null,
		flavor:
			'cannot follow a conversation, screams, shouts, laughs for no reason, tells nonsensical stories',
		description:
			'This character suffers from a severe mental instability, making coherent interaction difficult.',
		id: 'dement-49',
	},
	{
		name: 'addicted',
		value: -1,
		effect: 'Must regularly take their substance to avoid withdrawal.',
		statModifier: null,
		masteries: null,
		flavor: 'must regularly take their dose or suffer withdrawal',
		description:
			"This character is addicted to a substance and experiences negative effects if they don't consume it regularly.",
		id: 'dependance-a-50',
	},
	{
		name: 'soft',
		value: -1,
		effect: 'Sensitive to violence, blood, and blows.',
		statModifier: null,
		masteries: {
			amount: '-1',
			target: 'defense',
		},
		flavor: 'sensitive to violence, blood, blows',
		description:
			'This character is squeamish and easily disturbed by scenes of violence or injury.',
		id: 'douillet-51',
	},
	{
		name: 'frightening',
		value: 3,
		effect: 'Opponents must make a panic saving throw.',
		statModifier: null,
		masteries: null,
		flavor: 'obligatory panic test for their opponents',
		description:
			'This character has a terrifying presence that can induce fear in their adversaries.',
		id: 'effrayant-52',
	},
	{
		name: 'eloquent',
		value: 1,
		effect: 'Skilled in persuasive speaking.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'speech',
		},
		flavor: 'words are sometimes stronger than steel',
		description:
			'This character is articulate and has a talent for using words to influence others.',
		id: 'eloquent-53',
	},
	{
		name: 'tough',
		value: 1,
		effect: 'High stamina and resilience.',
		statModifier: {
			amount: '+1',
			stat: 'physique',
		},
		masteries: null,
		flavor: 'of strong constitution, this fellow can go the distance!',
		description:
			'This character has a robust physique and can withstand significant physical exertion.',
		id: 'endurant-54',
	},
	{
		name: 'vigorous',
		value: 1,
		effect: 'Full of energy and vitality.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'physique',
		},
		flavor: 'energetic',
		description:
			'This character possesses a high level of energy and enthusiasm.',
		id: 'energique-55',
	},
	{
		name: 'balanced',
		value: 1,
		effect: 'Advantage on jump and balance checks.',
		statModifier: null,
		masteries: {
			amount: '+1',
			target: 'movement',
		},
		flavor:
			'a true feline when it comes to climbing trees or the tops of buildings',
		description:
			'This character has excellent balance and agility, making them adept at climbing and maintaining their footing.',
		id: 'equilibre-56',
	},
	{
		name: 'learned',
		value: 1,
		effect: 'Knowledgeable and well-read.',
		statModifier: {
			amount: '+1',
			stat: 'logic',
		},
		masteries: null,
		flavor: 'who said spending time with your nose in books was a bad thing?',
		description:
			'This character is intelligent and has acquired a significant amount of knowledge through study.',
		id: 'erudit-57',
	},
	{
		name: 'know-it-all',
		value: 1,
		effect: 'Possesses a wide range of general knowledge.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'knowledge',
		},
		flavor: 'know-it-all',
		description:
			'This character believes they know everything and often shares their knowledge (solicited or not).',
		id: 'je-sais-tout-58',
	},
	{
		name: 'feeble',
		value: -1,
		effect: 'Lacks physical strength.',
		statModifier: {
			amount: '-1',
			stat: 'physique',
		},
		masteries: null,
		flavor: 'some people would do well to get some exercise',
		description:
			'This character is physically weak and lacks significant strength.',
		id: 'faible-59',
	},
	{
		name: 'fascinated',
		value: -1,
		effect: 'Prone to distraction by their object of fascination.',
		statModifier: null,
		masteries: null,
		flavor: 'bound by a great compulsive curiosity',
		description:
			'This character has a strong and often distracting interest in a particular subject or thing.',
		id: 'fascine-par-60',
	},
	{
		name: 'phlegmatic',
		value: -1,
		effect: 'Slow to react and not easily moved emotionally.',
		statModifier: {
			amount: '-1',
			stat: 'speech',
		},
		masteries: null,
		flavor: 'an unwavering nonchalance',
		description:
			'This character is calm and unexcitable, often reacting slowly to events.',
		id: 'flegmatique-61',
	},
	{
		name: 'strong',
		value: 1,
		effect: 'Possesses significant physical strength.',
		statModifier: {
			amount: '+1',
			stat: 'physique',
		},
		masteries: null,
		flavor: 'what fine biceps!',
		description:
			'This character is physically strong and capable of lifting heavy objects and exerting great force.',
		id: 'fort-62',
	},
	{
		name: 'fragile',
		value: -1,
		effect: 'Susceptible to illness and injury.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'healing',
			},
			{
				amount: '-1',
				target: 'defense',
			},
		],
		flavor: 'they should think about eating some soup',
		description:
			'This character has a weak constitution and is easily harmed or falls ill.',
		id: 'fragile-63',
	},
	{
		name: 'smoker',
		value: 0,
		effect: 'Regularly smokes tobacco.',
		statModifier: {
			amount: '+1',
			stat: 'CHA',
		},
		masteries: {
			amount: '+2',
			target: 'physique',
		},
		flavor: 'tobacco is taboo',
		description: 'This character has a habit of smoking tobacco.',
		id: 'fumeur-64',
	},
	{
		name: 'strapper',
		value: 1,
		effect: 'Increased vitality.',
		statModifier: {
			amount: '+1',
			stat: 'VIE',
			dice: 'd3',
		},
		masteries: null,
		flavor: 'a handsome baby!',
		description:
			'This character is robust and healthy, possessing extra vitality.',
		id: 'gaillard-65',
	},
	{
		name: 'genius',
		value: 1,
		effect: 'Exceptional intellect but socially awkward.',
		statModifier: [
			{
				amount: '+3',
				stat: 'logic',
			},
			{
				amount: '-2',
				stat: 'speech',
			},
		],
		masteries: null,
		flavor: 'genius',
		description:
			'This character possesses remarkable intelligence but struggles with social interactions.',
		id: 'genie-66',
	},
	{
		name: 'Long destiny',
		value: 2,
		effect:
			'+1 Fate Point, +level*10 experience points when using a Fate Point in action.',
		statModifier: null,
		masteries: null,
		flavor: 'seems less likely to die in bad situations',
		description:
			'This character is believed to have a significant destiny, granting them luck and experience bonuses.',
		id: 'grande-destinee-67',
	},
	{
		name: 'glutton',
		value: -1,
		effect:
			'Consumes one extra ration per day of travel, tends to devour food.',
		statModifier: null,
		masteries: null,
		flavor:
			'has trouble resisting a treat, goes back for seconds, needs to eat a lot!',
		description:
			'This character has a large appetite and struggles to control their eating habits.',
		id: 'groinfre-68',
	},
	{
		name: 'deft',
		value: 1,
		effect: 'Dexterous and skilled with their hands.',
		statModifier: {
			amount: '+1',
			stat: 'DEX',
		},
		masteries: null,
		flavor: 'knows what to do with their ten fingers',
		description:
			'This character is nimble and proficient in tasks requiring manual dexterity.',
		id: 'habile-69',
	},
	{
		name: 'hatred',
		value: -1,
		effect: 'Actively seeks to offend their target in all circumstances.',
		statModifier: null,
		masteries: null,
		flavor: 'seeks to offend their target in all circumstances',
		description:
			'This character harbors a strong hatred towards a specific individual or group, leading them to be deliberately offensive.',
		id: 'haine-contre-70',
	},
	{
		name: 'proud',
		value: -1,
		effect: 'Condescending and dismissive of others.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'speech',
		},
		flavor: 'thinks they are on a high horse',
		description:
			'This character has an arrogant and superior attitude towards others.',
		id: 'hautain-71',
	},
	{
		name: 'idiot',
		value: -1,
		effect: 'Slow-witted and struggles with understanding.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'knowledge',
		},
		flavor: 'has some difficulties at the synapse level',
		description:
			'This character has a lower than average intelligence and struggles with comprehension.',
		id: 'idiot-72',
	},
	{
		name: 'illiterate',
		value: -1,
		effect: 'Cannot read or write.',
		statModifier: {
			amount: '-1',
			stat: 'logic',
		},
		masteries: null,
		flavor: 'illiterate',
		description: 'This character has never learned to read or write.',
		id: 'illettre-73',
	},
	{
		name: 'illuminated',
		value: 1,
		effect: 'Attracts magical energies.',
		statModifier: {
			amount: '+1',
			stat: 'perception',
		},
		masteries: null,
		flavor: 'the magical winds are drawn to them',
		description:
			'This character has a natural affinity for magic, causing magical energies to be drawn towards them.',
		id: 'illumine-74',
	},
	{
		name: 'imposing',
		value: 1,
		effect: 'Physically large and intimidating.',
		statModifier: null,
		masteries: null,
		flavor: 'imposing',
		description: 'This character has a large and physically imposing presence.',
		id: 'imposant-75',
	},
	{
		name: 'inscrutable',
		value: 1,
		effect: 'Difficult to read or understand their thoughts and emotions.',
		statModifier: null,
		masteries: null,
		flavor: 'inscrutable',
		description:
			'This character is enigmatic and their thoughts and feelings are difficult for others to discern.',
		id: 'impenetrable-76',
	},
	{
		name: 'inattentive',
		value: -1,
		effect: 'Fails to pay attention to plans and surroundings.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'detection',
		},
		flavor: "doesn't follow plans, doesn't pay attention",
		description:
			'This character is easily distracted and often misses important details or instructions.',
		id: 'inattentif-77',
	},
	{
		name: 'adamant',
		value: 1,
		effect: 'Resistant to being controlled or manipulated.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'discretion',
		},
		flavor: 'a mind of steel in a... normal body',
		description:
			'This character has a strong will and is difficult to influence or control.',
		id: 'inflexible-78',
	},
	{
		name: 'nordic',
		value: 0,
		effect: 'Resistant to cold temperatures.',
		statModifier: null,
		masteries: null,
		flavor: 'does not feel the effects',
		description:
			'This character has a natural resistance to the effects of cold weather.',
		id: 'froid-79',
	},
	{
		name: 'clumsy',
		value: -1,
		effect: 'Clumsy or awkward in their movements.',
		statModifier: null,
		masteries: null,
		flavor: 'awkward',
		description: 'This character is not particularly graceful or coordinated.',
		id: 'gauche-80',
	},
	{
		name: 'carefree',
		value: -1,
		effect: 'Does not prioritize patience or discretion.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'discretion',
			},
			{
				amount: '-1',
				target: 'logic',
			},
		],
		flavor: 'does not prioritize patience and discretion',
		description:
			'This character is carefree and tends to act without much thought for the consequences or subtlety.',
		id: 'insouciant-81',
	},
	{
		name: 'upright',
		value: 1,
		effect: 'Difficult to intimidate.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'persuasion',
		},
		flavor: 'a beautiful soul who is not easily manipulated',
		description:
			'This character is honest and principled, making them resistant to intimidation.',
		id: 'integre-82',
	},
	{
		name: 'irritable',
		value: -1,
		effect: 'Easily angered or irritated.',
		statModifier: null,
		masteries: null,
		flavor: 'gets angry over nothing',
		description:
			'This character has a short temper and is prone to getting angry easily.',
		id: 'irascible-83',
	},
	{
		name: 'Born Leader',
		value: 1,
		effect: 'Draws attention and is easily listened to.',
		statModifier: {
			amount: '+1',
			stat: 'COU',
		},
		masteries: null,
		flavor: 'attracts attention and is easily listened to',
		description:
			'This character has a natural charisma and leadership quality, making people inclined to listen to them.',
		id: 'leader-ne-84',
	},
	{
		name: 'Slow',
		value: -1,
		effect: 'Slow reflexes.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'defense',
			},
			{
				amount: '-1',
				target: 'attack',
			},
		],
		flavor: 'somewhat lacks reflexes',
		description: 'This character is slow to react and lacks quick reflexes.',
		id: 'lent-85',
	},
	{
		name: 'Ancestral Ties',
		value: 1,
		effect:
			'Can be guided by ancestors in dreams and meditations, an advantage if resting.',
		statModifier: null,
		masteries: null,
		flavor: 'can be guided by ancestors in dreams and meditations',
		description:
			'This character has a spiritual connection to their ancestors who can offer guidance through dreams and meditation, especially during rest.',
		id: 'liens-ancestraux-86',
	},
	{
		name: 'Clumsy',
		value: -1,
		effect: 'Clumsy.',
		statModifier: {
			amount: '-1',
			stat: 'DEX',
		},
		masteries: null,
		flavor: 'some are born with fins instead of hands',
		description: 'This character is clumsy and lacks physical coordination.',
		id: 'maladroit-87',
	},
	{
		name: 'Poor Hearing',
		value: -1,
		effect: 'Difficulty hearing.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'perception',
			},
			{
				amount: '-1',
				target: 'speech',
			},
		],
		flavor:
			'has trouble hearing, will be surprised more easily by an intrusion',
		description:
			'This character has poor hearing and is more easily surprised.',
		id: 'mauvaise-ouie-88',
	},
	{
		name: 'Bad Reputation',
		value: -1,
		effect: 'Avoided by people, attracts mistrust.',
		statModifier: null,
		masteries: null,
		flavor: 'is avoided by people, attracts mistrust',
		description:
			'This character has a negative reputation, causing people to avoid and distrust them.',
		id: 'mauvaise-reputation-89',
	},
	{
		name: 'Poor Eyesight',
		value: -1,
		effect: 'Poor eyesight.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'ranged',
			},
			{
				amount: '-1',
				target: 'detection',
			},
		],
		flavor:
			'astigmatic, presbyopic or myopic, is cross-eyed in short (a pair of glasses is recommended)',
		description:
			'This character has poor vision, affecting their accuracy with ranged attacks and their ability to detect things.',
		id: 'mauvaise-vue-90',
	},
	{
		name: 'Memory',
		value: 1,
		effect: '+2 to memory rolls.',
		statModifier: null,
		masteries: null,
		flavor: 'can remember precise things',
		description:
			'This character has an excellent memory and can recall details easily.',
		id: 'memoire-91',
	},
	{
		name: 'Battered',
		value: -2,
		effect: 'Starts death saving throws at 20.',
		statModifier: null,
		masteries: null,
		flavor: 'this body has already seen some wild and unripe things',
		description:
			"This character's body has endured much, causing them to begin death saving throws at a higher value.",
		id: 'meurtri-92',
	},
	{
		name: 'Ugly',
		value: -1,
		effect: 'Unattractive.',
		statModifier: {
			amount: '-1/-2',
			stat: 'CHA',
		},
		masteries: {
			amount: '-1',
			target: 'speech',
		},
		flavor: 'would do better to wear a veil',
		description:
			'This character is physically unattractive, which can negatively impact their social interactions.',
		id: 'moche-93',
	},
	{
		name: 'Nemesis',
		value: -2,
		effect: 'Has an enemy who dedicates their life to harming them.',
		statModifier: null,
		masteries: null,
		flavor: 'has an enemy who dedicates their life to harming them',
		description:
			'This character has a dedicated enemy who actively seeks to cause them harm.',
		id: 'nemesis-94',
	},
	{
		name: 'Nyctalope',
		value: 2,
		effect: 'Sees in the dark in shades of gray.',
		statModifier: null,
		masteries: null,
		flavor: 'nice savings on candles and torches!',
		description:
			'This character can see in complete darkness, perceiving the environment in shades of gray.',
		id: 'nyctalope-95',
	},
	{
		name: 'Obligation',
		value: -1,
		effect: 'Bound by an obligation to someone or something.',
		statModifier: null,
		masteries: null,
		flavor: 'bound by an obligation to someone or something',
		description:
			'This character is bound by a significant obligation that they must uphold.',
		id: 'obligation-96',
	},
	{
		name: 'Eagle-Eyed',
		value: 1,
		effect: 'Excellent vision.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'perception',
			},
			{
				amount: '+1',
				target: 'ranged',
			},
		],
		flavor: 'sees further, distinguishes more easily',
		description:
			'This character has exceptionally sharp eyesight, allowing them to see further and distinguish details more easily.',
		id: 'oeil-de-lynx-97',
	},
	{
		name: 'Beta',
		value: -1,
		effect: 'Lacks knowledge.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'knowledge',
		},
		flavor: '',
		description: 'This character is not very knowledgeable.',
		id: 'beta-98',
	},
	{
		name: 'Forgetful',
		value: -1,
		effect: 'Disadvantage on memory rolls.',
		statModifier: null,
		masteries: {
			amount: '-1',
			target: 'memory',
		},
		flavor: '',
		description:
			'This character is forgetful and has difficulty remembering things.',
		id: 'oublieux-99',
	},
	{
		name: 'Pacifist',
		value: -2,
		effect: 'Refuses to fight, dislikes weapons.',
		statModifier: null,
		masteries: {
			amount: '-2',
			target: 'attack',
		},
		flavor: "refuses to fight, doesn't like weapons",
		description:
			'This character is strongly opposed to violence and avoids fighting or using weapons.',
		id: 'pacifiste-100',
	},
	{
		name: 'Awkward',
		value: -1,
		effect: 'Clumsy and slow.',
		statModifier: null,
		masteries: [
			{
				amount: '-1',
				target: 'preciseness',
			},
			{
				amount: '-1',
				target: 'initiative',
			},
		],
		flavor: 'precision is not for them',
		description:
			'This character is clumsy and lacks precision in their actions.',
		id: 'pataud-101',
	},
	{
		name: 'Annoying',
		value: -1,
		effect: 'Annoying due to their behavior and remarks.',
		statModifier: null,
		masteries: null,
		flavor: 'annoys by their behavior, their remarks',
		description:
			"This character's personality and comments tend to irritate others.",
		id: 'penible-102',
	},
	{
		name: 'Perceptive',
		value: 1,
		effect: 'Insightful.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'detection',
			},
			{
				amount: '+1',
				target: 'logic',
			},
		],
		flavor: '',
		description:
			'This character is perceptive and good at understanding situations and people.',
		id: 'perspicace-103',
	},
	{
		name: 'Insecure',
		value: -1,
		effect: 'Lacks self-confidence.',
		statModifier: null,
		masteries: null,
		flavor: 'a slight lack of self-confidence',
		description: 'This character has a slight lack of self-confidence.',
		id: 'peu-assure-104',
	},
	{
		name: 'Fearful',
		value: -1,
		effect: 'Fearful.',
		statModifier: {
			amount: '-1',
			stat: 'COU',
		},
		masteries: null,
		flavor: 'often called a coward',
		description:
			'This character is easily frightened and often considered cowardly.',
		id: 'peureux-105',
	},
	{
		name: 'Phobia of',
		value: -1,
		effect:
			'Will do anything to avoid their phobia, will panic when encountered.',
		statModifier: null,
		masteries: null,
		flavor:
			'will do anything to avoid their phobia, will panic when encountered',
		description:
			'This character has a specific phobia that they will go to great lengths to avoid and will panic if confronted with it.',
		id: 'phobie-de-106',
	},
	{
		name: 'Stone Fists',
		value: 1,
		effect: 'Unarmed attacks are powerful.',
		statModifier: null,
		masteries: null,
		flavor: 'hands like bricks',
		description:
			"This character's fists are unusually hard and strong, making their unarmed attacks formidable.",
		id: 'poings-de-pierre-107',
	},
	{
		name: 'Unlucky',
		value: -1,
		effect:
			"Reroll of an ally's success once per day, according to DM's choice or 1d12 fiasco.",
		statModifier: null,
		masteries: null,
		flavor:
			'attracts misadventures to themselves and those nearby, but is never harmed by these events',
		description:
			'This character attracts misfortune to themselves and those around them, but they are never harmed by these events.',
		id: 'poissard-108',
	},
	{
		name: 'Polite',
		value: 0,
		effect: 'Well-mannered.',
		statModifier: null,
		masteries: [
			{
				amount: '+2',
				target: 'speech',
			},
			{
				amount: '-2',
				target: 'persuasion',
			},
		],
		flavor:
			'very well respects the rules of etiquette, congratulations to the parents',
		description:
			'This character is very polite and adheres strictly to social etiquette, but may struggle with intimidation.',
		id: 'poli-109',
	},
	{
		name: 'Possessed',
		value: -2,
		effect:
			'May lose self-control in crisis situations (terror, drugged, magic sleep).',
		statModifier: null,
		masteries: null,
		flavor:
			'may lose self-control in crisis situations (terror, drugged, magic sleep)',
		description:
			'This character is susceptible to losing control of their actions in stressful or magically influenced situations.',
		id: 'possede-110',
	},
	{
		name: 'Precise',
		value: 1,
		effect: 'Accurate.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'ranged',
			},
			{
				amount: '+1',
				target: 'preciseness',
			},
		],
		flavor: 'their actions hit the mark',
		description: "This character's actions are accurate and precise.",
		id: 'precis-111',
	},
	{
		name: 'Presumptuous',
		value: -1,
		effect: 'Overconfident.',
		statModifier: {
			amount: '-1',
			stat: 'perception',
		},
		masteries: null,
		flavor: 'feels capable of more than they are capable of',
		description:
			'This character has an inflated sense of their own abilities and often overestimates what they can do.',
		id: 'presomptueux-112',
	},
	{
		name: 'Primitive',
		value: 1,
		effect: 'Connected to nature and magical forces.',
		statModifier: null,
		masteries: [
			{
				amount: '+1',
				target: 'survival',
			},
			{
				amount: '+1',
				target: 'perception',
			},
		],
		flavor: 'connected to nature and magical forces',
		description:
			'This character has a strong connection to the natural world and magical energies.',
		id: 'primitif-113',
	},
	{
		name: 'Prodigy',
		value: 1,
		effect: 'Doubles their learning speed.',
		statModifier: null,
		masteries: {
			amount: '+2',
			target: 'learning',
		},
		flavor: 'full of natural talent',
		description:
			'This character is a prodigy and learns new skills at twice the normal rate.',
		id: 'prodige-114',
	},
	{
		name: 'Cautious',
		value: 1,
		effect: 'Cautious.',
		statModifier: null,
		masteries: [
			{
				amount: '-2',
				target: 'initiative',
			},
			{
				amount: '+1',
				target: 'logic',
			},
		],
		flavor: '',
		description:
			'This character is careful and thinks things through before acting, which can sometimes make them slow to react.',
		id: 'prudent-115',
	},
	{
		name: 'Unremarkable',
		value: 1,
		effect: 'Goes unnoticed in public places.',
		statModifier: null,
		masteries: [
			{ amount: '-1', target: 'performance' },
			{ amount: '+1', target: 'discretion' },
		],
		flavor: 'not noticed in public places',
		description: 'This character blends into crowds and is easily overlooked.',
		id: 'quelconque-116',
	},
	{
		name: 'Stiff',
		value: -1,
		effect: 'Lacks agility.',
		statModifier: { amount: '-1', stat: 'AGI' },
		masteries: null,
		flavor: 'a piece of wood would be more flexible',
		description: 'This character is physically stiff and lacks flexibility.',
		id: 'raide-117',
	},
	{
		name: 'Reasoned',
		value: 1,
		effect: 'People tend to listen to their conclusions.',
		statModifier: null,
		masteries: { amount: '+2', target: 'logic' },
		flavor: 'people tend to listen to their conclusions',
		description:
			'This character is logical and their reasoning is often trusted by others.',
		id: 'raisonne-118',
	},
	{
		name: 'Fast',
		value: 1,
		effect: 'Has good legs.',
		statModifier: { amount: '+1', stat: 'MOU' },
		masteries: null,
		flavor: 'has good legs',
		description: 'This character is quick and agile.',
		id: 'rapide-119',
	},
	{
		name: 'Polyglot',
		value: 1,
		effect: 'Speaks multiple languages.',
		statModifier: null,
		masteries: null,
		flavor: '',
		description: 'This character is proficient in several languages.',
		id: 'polyglotte-120',
	},
	{
		name: 'Wanted',
		value: -1,
		effect: 'Can be arrested at any time if recognized.',
		statModifier: null,
		masteries: null,
		flavor: 'can be arrested at any time if recognized',
		description:
			'This character is a fugitive and faces arrest if their identity is discovered.',
		id: 'recherche-121',
	},
	{
		name: 'Feared',
		value: 1,
		effect:
			'Opponents have disadvantage on intimidation and negotiation checks against them.',
		statModifier: null,
		masteries: [
			{ amount: '-2', target: 'persuasion' },
			{ amount: '-2', target: 'trading' },
		],
		flavor:
			'a sinister aura hangs over them, few people dare to cause them trouble',
		description:
			'This character has a fearsome presence that makes others hesitant to oppose or negotiate with them.',
		id: 'redoute-122',
	},
	{
		name: 'Connections',
		value: 1,
		effect: 'Knows useful people.',
		statModifier: null,
		masteries: null,
		flavor: 'knows useful people',
		description: 'This character has a network of helpful contacts.',
		id: 'relations-123',
	},
	{
		name: 'Resilient',
		value: 1,
		effect: 'Not easy to finish off.',
		statModifier: null,
		masteries: null,
		flavor: 'not easy to finish off',
		description: 'This character is tough and difficult to defeat.',
		id: 'resilient-124',
	},
	{
		name: 'Resistant',
		value: 1,
		effect: '+1d4 on physical resistance rolls.',
		statModifier: null,
		masteries: null,
		flavor: 'shows increased tenacity',
		description: 'This character has a natural resistance to physical harm.',
		id: 'resistant-125',
	},
	{
		name: 'Daredevil',
		value: 1,
		effect: 'Advantage on fear saving throws.',
		statModifier: null,
		masteries: null,
		flavor: 'goes towards danger',
		description: 'This character is fearless and faces danger head-on.',
		id: 'risque-tout-126',
	},
	{
		name: 'Rude',
		value: -1,
		effect: 'Lacks social graces.',
		statModifier: null,
		masteries: { amount: '-2', target: 'healing' },
		flavor: '',
		description: 'This character is impolite and lacks social skills.',
		id: 'rude-127',
	},
	{
		name: 'Wise',
		value: 1,
		effect: 'Knows how to make the right decisions when they are crucial.',
		statModifier: null,
		masteries: { amount: '+2', target: 'knowledge' },
		flavor: 'knows how to make the right decisions when they are crucial',
		description:
			'This character possesses wisdom and makes sound judgments in critical situations.',
		id: 'sage-128',
	},
	{
		name: 'Dirty',
		value: -2,
		effect: 'Cannot frequent all public places, smells bad.',
		statModifier: { amount: '-1', stat: 'SOC' },
		masteries: { amount: '-2', target: 'speech' },
		flavor: 'cannot frequent all public places, smells bad',
		description:
			"This character's poor hygiene makes them unwelcome in many public areas and they have a strong odor.",
		id: 'sale-129',
	},
	{
		name: 'Sense of Direction',
		value: 1,
		effect: 'Good at navigation.',
		statModifier: null,
		masteries: [
			{ amount: '+1', target: 'movement' },
			{ amount: '+1', target: 'survival' },
		],
		flavor: 'trust them not to get lost!',
		description:
			'This character has an excellent sense of direction and rarely gets lost.',
		id: 'sens-de-l-orientation-130',
	},
	{
		name: 'Silent',
		value: 1,
		effect: 'Knows how to approach stealthily.',
		statModifier: null,
		masteries: { amount: '+2', target: 'discretion' },
		flavor: 'knows how to approach stealthily',
		description: 'This character is skilled at moving quietly and unnoticed.',
		id: 'silencieux-131',
	},
	{
		name: 'Simple-minded',
		value: -1,
		effect: 'Not very intelligent.',
		statModifier: { amount: '-1', stat: 'perception' },
		masteries: null,
		flavor: '',
		description: 'This character is not very bright.',
		id: 'simplet-132',
	},
	{
		name: 'Sociable',
		value: 1,
		effect: 'Can spend hours chatting with a stranger.',
		statModifier: { amount: '+1', stat: 'SOC' },
		masteries: null,
		flavor: 'can spend hours chatting with a stranger',
		description:
			'This character is friendly and enjoys interacting with others.',
		id: 'sociable-133',
	},
	{
		name: 'Dark Fate',
		value: -1,
		effect: 'Their choices will inexorably lead them towards evil.',
		statModifier: null,
		masteries: null,
		flavor: 'their choices will inexorably lead them towards evil',
		description:
			'This character is destined for a dark path, regardless of their intentions.',
		id: 'sombre-destin-134',
	},
	{
		name: 'Submissive',
		value: -1,
		effect: 'Vulnerable to torture and intimidation.',
		statModifier: null,
		masteries: [
			{ amount: '-2', target: 'resistance' },
			{ amount: '-2', target: 'persuasion' },
		],
		flavor: "don't hit, don't hit!",
		description:
			'This character is easily dominated and resistant to coercion.',
		id: 'soumis-135',
	},
	{
		name: 'Supple',
		value: 1,
		effect: 'Agile.',
		statModifier: { amount: '+1', stat: 'AGI' },
		masteries: null,
		flavor: 'thanks to evening stretches',
		description: 'This character is flexible and agile.',
		id: 'souple-136',
	},
	{
		name: 'Deaf',
		value: -2,
		effect: 'Cannot hear anything.',
		statModifier: null,
		masteries: null,
		flavor: 'hears nothing',
		description: 'This character has complete hearing loss.',
		id: 'sourd-137',
	},
	{
		name: 'Survivor',
		value: 1,
		effect:
			'Can skip one death saving throw, the difficulty changes if successful.',
		statModifier: null,
		masteries: null,
		flavor: '',
		description:
			'This character has a strong will to live and a knack for surviving dangerous situations.',
		id: 'survivant-138',
	},
	{
		name: 'Tactician',
		value: 1,
		effect: 'Has a good analytical mind for tactical situations.',
		statModifier: null,
		masteries: null,
		flavor: 'has a good analytical mind for tactical situations',
		description:
			'This character is skilled at analyzing tactical situations and planning accordingly.',
		id: 'tacticien-139',
	},
	{
		name: 'Flashy',
		value: 1,
		effect: 'Easily noticed, stands out.',
		statModifier: null,
		masteries: [
			{ amount: '-2', target: 'discretion' },
			{ amount: '+2', target: 'performance' },
		],
		flavor: 'easily noticed, stands out',
		description:
			'This character has a flamboyant style that makes them easily noticeable.',
		id: 'tape-a-l-oeil-140',
	},
	{
		name: 'Cool-headed',
		value: 1,
		effect: 'Reacts quickly in complex situations.',
		statModifier: null,
		masteries: { amount: '+1', target: 'initiative' },
		flavor: 'reacts quickly in complex situations',
		description:
			'This character remains calm and thinks clearly under pressure, allowing them to react quickly.',
		id: 'tete-froide-141',
	},
	{
		name: 'Stubborn',
		value: 1,
		effect: 'Disadvantage on persuasion checks when involved.',
		statModifier: null,
		masteries: { amount: '-1', target: 'persuasion' },
		flavor: 'a real hardhead',
		description:
			'This character is obstinate and difficult to persuade, especially when they have a personal stake in the matter.',
		id: 'tetu-142',
	},
	{
		name: 'Distracted',
		value: -1,
		effect:
			'Has trouble following conversations, interrupts, wanders off to other activities.',
		statModifier: null,
		masteries: null,
		flavor:
			'has trouble following a conversation, interrupts, wanders off to other activities',
		description:
			'This character has difficulty focusing and easily gets sidetracked.',
		id: 'toque-143',
	},
	{
		name: 'Barterer',
		value: -1,
		effect: 'Prefers to barter rather than buy or sell with money.',
		statModifier: null,
		masteries: null,
		flavor: 'prefers to barter rather than buy or sell with money',
		description:
			'This character prefers trading goods and services over monetary transactions.',
		id: 'troqueur-144',
	},
	{
		name: 'Valiant',
		value: 1,
		effect: 'Few things scare them.',
		statModifier: { amount: '+1', stat: 'COU' },
		masteries: null,
		flavor: 'few things scare them',
		description: 'This character is courageous and not easily frightened.',
		id: 'vaillant-145',
	},
	{
		name: 'Wealthy',
		value: 1,
		effect: 'Has significant financial resources.',
		statModifier: null,
		masteries: null,
		flavor: '',
		description: 'This character possesses a considerable amount of wealth.',
		id: 'fortune-146',
	},
	{
		name: 'Lively',
		value: 1,
		effect: 'Agile and quick.',
		statModifier: null,
		masteries: { amount: '+2', target: 'movement' },
		flavor: '',
		description: 'This character is energetic and moves swiftly.',
		id: 'vif-147',
	},
	{
		name: 'Vulgar',
		value: -1,
		effect: 'Lacks refinement.',
		statModifier: null,
		masteries: { amount: '-2', target: 'speech' },
		flavor: '',
		description: 'This character is crude and lacks social etiquette.',
		id: 'vulgaire-148',
	},
];
