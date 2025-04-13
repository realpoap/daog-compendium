// Define TypeScript interfaces
export type SkillData = {
	id: string;
	name: string;
	stat: string;
	mastery: string;
	description: string;
};

export const skillsData: SkillData[] = [
	{
		id: 'boulangerie-1',
		name: 'Baking',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The skill of preparing and cooking bread and other baked goods. Requires dexterity and knowledge of ingredients.',
	},
	{
		id: 'coiffure-2',
		name: 'Hairdressing',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The art of styling and cutting hair. Demands dexterity and an understanding of different hair types and styles.',
	},
	{
		id: 'confection-3',
		name: 'Garment Making',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The craft of creating clothing and other textile items. Requires precise handwork and knowledge of fabrics.',
	},
	{
		id: 'conserves-4',
		name: 'Preserving',
		stat: 'éru',
		mastery: 'crafting',
		description:
			'The technique of preserving food to extend its shelf life, often involving canning or pickling. Requires knowledge of food safety.',
	},
	{
		id: 'cordonnerie-5',
		name: 'Shoemaking',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. Crafting and repairing footwear with skill and precision.',
	},
	{
		id: 'empaillage-6',
		name: 'Taxidermy',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The art of preparing, stuffing, and mounting the skins of animals for display or study. Requires delicate work.',
	},
	{
		id: 'explosifs-7',
		name: 'Explosives',
		stat: 'éru',
		mastery: 'crafting',
		description:
			'The knowledge and creation of explosive devices. This skill can be dangerous and requires careful handling.',
	},
	{
		id: 'fermentation-8',
		name: 'Fermentation',
		stat: 'ins',
		mastery: 'crafting',
		description:
			'The process of using microorganisms to transform food and beverages. Requires understanding of biological processes.',
	},
	{
		id: 'forge-9',
		name: 'Smithing',
		stat: 'éru',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. The craft of shaping metal by heating and hammering.',
	},
	{
		id: 'joaillerie-10',
		name: 'Jewelry Making',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. Creating intricate and valuable ornaments from precious materials.',
	},
	{
		id: 'macrame-11',
		name: 'Macrame',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. The art of knotting cords or strings to create decorative patterns.',
	},
	{
		id: 'menuiserie-12',
		name: 'Carpentry',
		stat: 'for',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. The skill of working with wood to construct and repair structures.',
	},
	{
		id: 'patisserie-13',
		name: 'Pastry Making',
		stat: 'ins',
		mastery: 'crafting',
		description:
			'The art of creating delicate and flavorful pastries and desserts. Requires precision and a keen sense of taste.',
	},
	{
		id: 'rafistolage-14',
		name: 'Patching Up',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The ability to mend and repair damaged items, often in a quick or makeshift manner. Useful for survival.',
	},
	{
		id: 'reparation-15',
		name: 'Repair',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'The skill of fixing and restoring broken or damaged objects to working order. Often requires technical knowledge.',
	},
	{
		id: 'replique-16',
		name: 'Replica Making',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The ability to create accurate copies or imitations of existing objects. Requires attention to detail and manual skill.',
	},
	{
		id: 'sculpture-17',
		name: 'Sculpting',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. The art of shaping materials into three-dimensional forms.',
	},
	{
		id: 'tannage-18',
		name: 'Tanning',
		stat: 'for',
		mastery: 'crafting',
		description:
			'The process of treating animal hides to produce leather. Requires physical effort and knowledge of chemicals.',
	},
	{
		id: 'textiles-19',
		name: 'Textiles',
		stat: 'dex',
		mastery: 'crafting',
		description:
			'The artisan uses techniques to produce quality traditional objects. The skill of working with fabrics, including weaving and sewing.',
	},
	{
		id: 'baton-20',
		name: 'Staff',
		stat: 'for / agi',
		mastery: 'fighting',
		description:
			'Using a weapon is essential for an adventurer. Proficiency with a versatile two-handed weapon for offense and defense.',
	},
	{
		id: 'dague-21',
		name: 'Dagger',
		stat: 'for / agi',
		mastery: 'fighting',
		description:
			'Using a weapon is essential for an adventurer. Skill in wielding a small, sharp blade for close combat and stealth.',
	},
	{
		id: 'epee-22',
		name: 'Sword',
		stat: 'for / agi',
		mastery: 'fighting',
		description:
			'Using a weapon is essential for an adventurer. Expertise in handling a bladed weapon, varying in size and style.',
	},
	{
		id: 'hache-23',
		name: 'Axe',
		stat: 'for',
		mastery: 'fighting',
		description:
			'Skill in wielding a heavy, bladed weapon, effective for both combat and chopping. Often requires significant strength.',
	},
	{
		id: 'lance-24',
		name: 'Spear',
		stat: 'agi / for',
		mastery: 'fighting',
		description:
			'Using a weapon is essential for an adventurer. Proficiency with a polearm, offering reach and thrusting capabilities.',
	},
	{
		id: 'masse-25',
		name: 'Mace',
		stat: 'for / agi',
		mastery: 'fighting',
		description:
			'Using a weapon is essential for an adventurer. Skill in wielding a blunt weapon, effective against armored opponents.',
	},
	{
		id: 'riposte-26',
		name: 'Riposte',
		stat: 'agi',
		mastery: 'defense',
		description:
			"The ability to make a quick counter-attack immediately after successfully defending against an opponent's move.",
	},
	{
		id: 'bouclier-27',
		name: 'Shield',
		stat: 'for',
		mastery: 'defense',
		description:
			'Using a weapon is essential for an adventurer. Proficiency in using a shield for protection in combat.',
	},
	{
		id: 'parade-28',
		name: 'Parry',
		stat: 'agi',
		mastery: 'defense',
		description:
			"The skill of deflecting or blocking an incoming attack with a weapon or one's own body.",
	},
	{
		id: 'derobade-29',
		name: 'Evasion',
		stat: 'agi',
		mastery: 'defense',
		description:
			'The ability to quickly evade or move out of the way of an attack, relying on agility and reflexes.',
	},
	{
		id: 'esquive-30',
		name: 'Dodge',
		stat: 'agi',
		mastery: 'defense',
		description:
			'The skill of avoiding harm by dodging or moving swiftly to avoid incoming threats.',
	},
	{
		id: 'arcanes-31',
		name: 'Arcana',
		stat: 'sen',
		mastery: 'detection',
		description:
			'Knowledge of mystical traditions, secret lore, magic spells, and magical creatures. Useful for identifying magical phenomena.',
	},
	{
		id: 'cinema-32',
		name: 'Cinema',
		stat: 'ins',
		mastery: 'detection',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. Understanding of film, its history, and techniques.',
	},
	{
		id: 'enquete-33',
		name: 'Investigation',
		stat: 'ins',
		mastery: 'detection',
		description:
			'The ability to carefully examine clues and deduce information to solve mysteries or uncover hidden truths.',
	},
	{
		id: 'fouille-34',
		name: 'Searching',
		stat: 'ins',
		mastery: 'detection',
		description:
			'The skill of thoroughly examining an area or object to find hidden items or clues. Requires attention to detail.',
	},
	{
		id: 'photographie-35',
		name: 'Photography',
		stat: 'ins',
		mastery: 'detection',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. The art of capturing images using a camera.',
	},
	{
		id: 'pieges-36',
		name: 'Traps',
		stat: 'éru',
		mastery: 'detection',
		description:
			'Knowledge of how to identify, disarm, and potentially set up traps. Useful for avoiding danger or capturing prey.',
	},
	{
		id: 'reconnaissance-37',
		name: 'Reconnaissance',
		stat: 'éru',
		mastery: 'detection',
		description:
			'The ability to scout and gather information about an area or enemy, often involving observation and stealth.',
	},
	{
		id: 'sabotage-38',
		name: 'Sabotage',
		stat: 'éru',
		mastery: 'detection',
		description:
			'The skill of deliberately damaging or disrupting enemy equipment or plans. Requires knowledge of mechanics or weaknesses.',
	},
	{
		id: 'camouflage-39',
		name: 'Camouflage',
		stat: 'agi',
		mastery: 'discretion',
		description:
			'The character is able to blend into the scenery like a chameleon in a tropical forest full of shimmering colors, in urban or rural environments.',
	},
	{
		id: 'deguisement-40',
		name: 'Disguise',
		stat: 'soc',
		mastery: 'discretion',
		description:
			"The art of altering one's appearance to avoid detection or to impersonate someone else. Requires acting and makeup skills.",
	},
	{
		id: 'equilibre-41',
		name: 'Balance',
		stat: 'agi',
		mastery: 'discretion',
		description:
			'The ability to maintain stability while moving or standing in precarious situations. Essential for stealth and acrobatics.',
	},
	{
		id: 'escamotage-42',
		name: 'Sleight of Hand',
		stat: 'mou',
		mastery: 'discretion',
		description:
			'Skill in performing delicate manipulations with the hands, often used for entertainment or petty theft.',
	},
	{
		id: 'filature-43',
		name: 'Tail',
		stat: 'mou',
		mastery: 'discretion',
		description:
			'The ability to follow someone discreetly without being noticed. Requires patience and awareness of surroundings.',
	},
	{
		id: 'furtivite-44',
		name: 'Stealth',
		stat: 'ins',
		mastery: 'discretion',
		description:
			'The skill of moving quietly and avoiding detection. Relies on awareness, timing, and careful movement.',
	},
	{
		id: 'etranglement-45',
		name: 'Strangulation',
		stat: 'agi',
		mastery: 'discretion',
		description:
			'The dangerous technique of constricting the neck to subdue or incapacitate an opponent. Requires close proximity.',
	},
	{
		id: 'baratin-46',
		name: 'Smooth Talk',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The character tells tall tales to achieve their goals. The ability to persuade or deceive with charming and persuasive language.',
	},
	{
		id: 'commandement-47',
		name: 'Command',
		stat: 'cha',
		mastery: 'speech',
		description:
			'The character is able to command respect from their entire group and passersby: people listen and take their experience into account.',
	},
	{
		id: 'contes-48',
		name: 'Storytelling',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The art of captivating an audience with engaging narratives and tales. Can be used for entertainment or persuasion.',
	},
	{
		id: 'dressage-49',
		name: 'Animal Handling',
		stat: 'ins',
		mastery: 'speech',
		description:
			'The ability to train, calm, and work with animals. Requires understanding of animal behavior and patience.',
	},
	{
		id: 'enseignement-50',
		name: 'Teaching',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The skill of conveying knowledge and instructions effectively to others. Requires clarity and patience.',
	},
	{
		id: 'jeux-de-mots-51',
		name: 'Puns',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The clever use of words with multiple meanings or similar sounds for humorous effect. Requires quick wit.',
	},
	{
		id: 'moquerie-52',
		name: 'Mockery',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The use of ridicule or scorn to belittle or insult someone. Can be effective but risks alienating others.',
	},
	{
		id: 'rhetorique-53',
		name: 'Rhetoric',
		stat: 'éru',
		mastery: 'speech',
		description:
			'The art of effective or persuasive speaking or writing, especially the use of figures of speech and other compositional techniques.',
	},
	{
		id: 'rimes-54',
		name: 'Rhymes',
		stat: 'soc',
		mastery: 'speech',
		description:
			'The ability to create words that sound alike, often used in poetry or songs for artistic expression.',
	},
	{
		id: 'astrologie-55',
		name: 'Astrology',
		stat: 'ins',
		mastery: 'esoterism',
		description:
			'The character knows how to recognize the stars and use them for divination purposes. The study of celestial bodies and their supposed influence.',
	},
	{
		id: 'chiromancie-56',
		name: 'Chiromancy',
		stat: 'soc',
		mastery: 'esoterism',
		description:
			'The character knows how to read the lines of the hand so that they reveal the future. Palm reading for fortune-telling.',
	},
	{
		id: 'divination-57',
		name: 'Divination',
		stat: 'ins',
		mastery: 'esoterism',
		description:
			'The practice of seeking knowledge of the future or the unknown by supernatural means.',
	},
	{
		id: 'hypnose-58',
		name: 'Hypnosis',
		stat: 'soc',
		mastery: 'esoterism',
		description:
			'The art of inducing a trance-like state in another person, often to influence their thoughts or actions.',
	},
	{
		id: 'rituels-59',
		name: 'Rituals',
		stat: 'éru',
		mastery: 'esoterism',
		description:
			'Knowledge of ceremonial acts or procedures, often with symbolic or spiritual significance.',
	},
	{
		id: 'spiritisme-60',
		name: 'Spiritism',
		stat: 'sen',
		mastery: 'esoterism',
		description:
			'Belief in and communication with the spirits of the deceased.',
	},
	{
		id: 'cartographie-61',
		name: 'Cartography',
		stat: 'éru',
		mastery: 'logic',
		description:
			"The character's observation and analysis skills allow them to read and reproduce maps and plans effectively.",
	},
	{
		id: 'tuture-62',
		name: 'Driving',
		stat: 'ins',
		mastery: 'logic',
		description:
			'The character has their license and knows how to drive a vehicle or a horse-drawn carriage without causing accidents.',
	},
	{
		id: 'art-militaire-63',
		name: 'Military Art',
		stat: 'éru / ins',
		mastery: 'logic',
		description:
			'The character knows how to organize armies and apply effective strategies to win a battle.',
	},
	{
		id: 'calcul-mental-64',
		name: 'Arithmetic',
		stat: 'éru',
		mastery: 'logic',
		description:
			'The character is capable of solving calculations without using tools such as an abacus.',
	},
	{
		id: 'classement-65',
		name: 'Ranking',
		stat: 'éru',
		mastery: 'logic',
		description:
			'The ability to organize and categorize information efficiently and logically.',
	},
	{
		id: 'dactylographie-66',
		name: 'Typing',
		stat: 'dex',
		mastery: 'logic',
		description:
			'Proficiency in using a keyboard to write quickly and accurately.',
	},
	{
		id: 'enigmes-67',
		name: 'Riddles',
		stat: 'éru',
		mastery: 'logic',
		description:
			'The ability to understand, solve, and create perplexing questions or statements.',
	},
	{
		id: 'legislation-68',
		name: 'Legislation',
		stat: 'éru',
		mastery: 'logic',
		description: 'Knowledge of laws, statutes, and legal procedures.',
	},
	{
		id: 'planification-69',
		name: 'Planning',
		stat: 'éru',
		mastery: 'logic',
		description:
			'The skill of devising strategies and organizing tasks to achieve specific goals.',
	},
	{
		id: 'recitation-70',
		name: 'Recitation',
		stat: 'éru',
		mastery: 'logic',
		description:
			'The ability to memorize and deliver texts or speeches from memory.',
	},
	{
		id: 'mediation-71',
		name: 'Mediation',
		stat: 'soc',
		mastery: 'logic',
		description:
			'The skill of facilitating communication and finding solutions between conflicting parties.',
	},
	{
		id: 'jeux-72',
		name: 'Games',
		stat: 'éru',
		mastery: 'logic',
		description:
			'Knowledge of rules and strategies for various types of games, both mental and physical.',
	},
	{
		id: 'assommage-73',
		name: 'Knockout',
		stat: 'for',
		mastery: 'brawl',
		description:
			'The ability to render an opponent unconscious through a forceful blow.',
	},
	{
		id: 'bagarre-74',
		name: 'Brawling',
		stat: 'for',
		mastery: 'brawl',
		description:
			'The street is often tough and ruled by the law of the strongest: you have to know how to fight, to survive or to exchange points of view.',
	},
	{
		id: 'savate-75',
		name: 'Savate',
		stat: 'agi',
		mastery: 'brawl',
		description:
			'A French martial art using feet and hands as weapons, combining elements of boxing and kicking.',
	},
	{
		id: 'broyage-anal-76',
		name: 'Anal Crushing',
		stat: 'for',
		mastery: 'brawl',
		description:
			"A brutal and likely prohibited close-combat technique focused on crushing an opponent's lower body.",
	},
	{
		id: 'bras-de-fer-77',
		name: 'Arm Wrestling',
		stat: 'for',
		mastery: 'brawl',
		description:
			"A test of strength involving two participants locking hands and attempting to pin the other's arm down.",
	},
	{
		id: 'contorsion-78',
		name: 'Contortion',
		stat: 'agi',
		mastery: 'brawl',
		description:
			'Although the character prefers not to go to clubs, they know how to make themselves small when necessary. Their body can bend to all their demands.',
	},
	{
		id: 'lutte-79',
		name: 'Wrestling',
		stat: 'for',
		mastery: 'brawl',
		description:
			'A grappling combat style focused on takedowns, holds, and submissions.',
	},
	{
		id: 'catalyseurs-80',
		name: 'Catalysts',
		stat: 'éru',
		mastery: 'magic',
		description:
			'Knowledge of materials and techniques used to enhance or focus magical energies.',
	},
	{
		id: 'enchantement-81',
		name: 'Enchantment',
		stat: 'sen',
		mastery: 'magic',
		description:
			'The skill of imbuing objects or beings with magical properties or effects.',
	},
	{
		id: 'forge-magique-82',
		name: 'Magical Forging',
		stat: 'sen',
		mastery: 'magic',
		description:
			'The art of creating magical items through specialized forging techniques.',
	},
	{
		id: 'glyphes-83',
		name: 'Glyphs',
		stat: 'sen',
		mastery: 'magic',
		description:
			'Knowledge of magical symbols and their application in spells and rituals.',
	},
	{
		id: 'incantation-84',
		name: 'Incantation',
		stat: 'sen',
		mastery: 'magic',
		description:
			'The skill of casting spells through spoken words and magical phrases.',
	},
	{
		id: 'pantomime-85',
		name: 'Pantomime',
		stat: 'dex',
		mastery: 'magic',
		description:
			'Using silent gestures and expressions to channel or focus magical energies.',
	},
	{
		id: 'horlogerie-86',
		name: 'Clockmaking',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'The intricate craft of designing, building, and repairing timekeeping mechanisms.',
	},
	{
		id: 'bilboquet-87',
		name: 'Cup-and-Ball',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'Skill in the classic toy game involving tossing a ball and catching it in a cup.',
	},
	{
		id: 'chatouillage-88',
		name: 'Tickling',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			"The character knows how to use their fingers in sensitive places to forge new relationships (with a lot of 'goozi gooza').",
	},
	{
		id: 'combat-de-pouces-89',
		name: 'Thumb Wrestling',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			"A test of dexterity and strength involving locking thumbs and trying to pin the opponent's thumb.",
	},
	{
		id: 'crochetage-90',
		name: 'Lockpicking',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'Whether for investigation or less noble purposes, the rogue is able to open a lock with one or more small tools.',
	},
	{
		id: 'decoupe-91',
		name: 'Cutting',
		stat: 'éru',
		mastery: 'preciseness',
		description:
			'The skill of making precise incisions or divisions with sharp tools.',
	},
	{
		id: 'dessin-92',
		name: 'Drawing',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. The skill of creating images with lines and shading.',
	},
	{
		id: 'epilation-93',
		name: 'Epilation',
		stat: 'dex',
		mastery: 'preciseness',
		description: 'The precise removal of hair from the body.',
	},
	{
		id: 'gravure-94',
		name: 'Engraving',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. The art of carving designs or text into a surface.',
	},
	{
		id: 'noeuds-95',
		name: 'Knots',
		stat: 'éru',
		mastery: 'preciseness',
		description:
			'Knowledge of different types of knots and their practical applications.',
	},
	{
		id: 'rapine-96',
		name: 'Petty Theft',
		stat: 'dex',
		mastery: 'discretion',
		description:
			'The skill of stealing small or insignificant items without being noticed.',
	},
	{
		id: 'tatouage-97',
		name: 'Tattooing',
		stat: 'dex',
		mastery: 'preciseness',
		description:
			'The art of creating permanent designs on the skin by inserting ink with needles.',
	},
	{
		id: 'prestidigitation-98',
		name: 'Prestidigitation',
		stat: 'soc',
		mastery: 'preciseness',
		description:
			'Skill in performing magic tricks with the hands; sleight of hand.',
	},
	{
		id: 'art-martial-99',
		name: 'Martial Art',
		stat: 'agi',
		mastery: 'movement',
		description:
			'A system of combat practices and traditions, often focused on self-defense and discipline.',
	},
	{
		id: 'escrime-100',
		name: 'Fencing',
		stat: 'dex',
		mastery: 'movement',
		description:
			'The art of combat with swords, focusing on precision, speed, and footwork.',
	},
	{
		id: 'feinte-101',
		name: 'Feint',
		stat: 'agi',
		mastery: 'movement',
		description:
			'A deceptive movement intended to distract or mislead an opponent.',
	},
	{
		id: 'canotage-102',
		name: 'Boating',
		stat: 'ins',
		mastery: 'movement',
		description: 'Skill in navigating and operating a boat or canoe.',
	},
	{
		id: 'urinotechnie-103',
		name: 'Urinotechnics',
		stat: 'agi',
		mastery: 'movement',
		description:
			'The (perhaps dubious) skill of manipulating urine flow with agility and control.',
	},
	{
		id: 'jonglerie-104',
		name: 'Juggling',
		stat: 'agi',
		mastery: 'movement',
		description:
			'The skill of keeping multiple objects in motion in the air by repeatedly throwing and catching them.',
	},
	{
		id: 'course-105',
		name: 'Running',
		stat: 'mou',
		mastery: 'movement',
		description:
			'The character relied heavily on Physical Education and Sports to get their diploma. They are therefore very good at running, jumping, climbing, swimming or gymnastics.',
	},
	{
		id: 'gymnastique-106',
		name: 'Gymnastics',
		stat: 'agi',
		mastery: 'movement',
		description:
			'Skill in performing coordinated and controlled body movements, often involving flexibility and strength.',
	},
	{
		id: 'commerage-107',
		name: 'Gossiping',
		stat: 'soc',
		mastery: 'trading',
		description:
			'Spreading rumors and private information, often for social influence or personal gain.',
	},
	{
		id: 'commerce-108',
		name: 'Trade',
		stat: 'soc',
		mastery: 'trading',
		description: 'The activity of buying and selling goods or services.',
	},
	{
		id: 'estimation-109',
		name: 'Appraisal',
		stat: 'éru',
		mastery: 'trading',
		description:
			'The ability to determine the value or worth of goods or objects.',
	},
	{
		id: 'mendicite-110',
		name: 'Begging',
		stat: 'soc',
		mastery: 'trading',
		description:
			'The act of asking for money or food, often by appealing to charity.',
	},
	{
		id: 'sincerite-111',
		name: 'Sincerity',
		stat: 'soc',
		mastery: 'trading',
		description:
			"The quality of being genuine and honest in one's interactions and negotiations.",
	},
	{
		id: 'composition-112',
		name: 'Composition',
		stat: 'ins',
		mastery: 'perception',
		description:
			'The artisan uses techniques to produce quality traditional objects. The ability to arrange elements to create a harmonious whole.',
	},
	{
		id: 'peinture-113',
		name: 'Painting',
		stat: 'ins',
		mastery: 'perception',
		description:
			'Art awakens the soul and softens hearts, but to master them all takes time. The art of applying paint to a surface to create images.',
	},
	{
		id: 'navigation-114',
		name: 'Navigation',
		stat: 'ins',
		mastery: 'perception',
		description:
			'The skill of determining position and direction, especially at sea or in unfamiliar terrain.',
	},
	{
		id: 'cris-d-animaux-115',
		name: 'Animal Sounds',
		stat: 'ins',
		mastery: 'perception',
		description:
			'The ability to recognize and interpret the calls and sounds of various animals.',
	},
	{
		id: 'magidentification-116',
		name: 'Magic Identification',
		stat: 'sen',
		mastery: 'perception',
		description:
			'The ability to perceive and understand magical energies and effects.',
	},
	{
		id: 'meditation-117',
		name: 'Meditation',
		stat: 'sen',
		mastery: 'perception',
		description:
			'The practice of focused attention to induce a state of mental clarity and calmness.',
	},
	{
		id: 'veille-118',
		name: 'Vigilance',
		stat: 'end',
		mastery: 'perception',
		description:
			'The ability to stay alert and observant over extended periods.',
	},
	{
		id: 'vents-magiques-119',
		name: 'Magic Winds',
		stat: 'sen',
		mastery: 'perception',
		description:
			'The ability to sense and interpret magical currents in the air.',
	},
	{
		id: 'blagues-120',
		name: 'Jokes',
		stat: 'soc',
		mastery: 'performance',
		description:
			'The ability to tell humorous anecdotes and stories to entertain others.',
	},
	{
		id: 'boite-a-rythme-121',
		name: 'Beatboxing',
		stat: 'ins',
		mastery: 'performance',
		description:
			'One can use their mouth for many things; the character can imitate sounds and clicks to reproduce a rhythm.',
	},
	{
		id: 'chant-122',
		name: 'Singing',
		stat: 'cha',
		mastery: 'performance',
		description:
			'The character, who initially only brightened long winter evenings to the great pleasure of their family, now uses their vocal cords wonderfully.',
	},
	{
		id: 'comedie-123',
		name: 'Comedy',
		stat: 'cha',
		mastery: 'performance',
		description:
			'The character performs their comedy on the giant stage of the street. They are thus able to abuse the gullibility of the populace to achieve their ends.',
	},
	{
		id: 'danse-124',
		name: 'Dancing',
		stat: 'agi',
		mastery: 'movement',
		description:
			'Whether twisting furiously, grooving to disco, or contorting to techno, the character knows how to move their body to the great pleasure of the audience.',
	},
	{
		id: 'duperie-125',
		name: 'Deception',
		stat: 'soc',
		mastery: 'performance',
		description:
			'The art of misleading or tricking others through words or actions.',
	},
	{
		id: 'etiquette-126',
		name: 'Etiquette',
		stat: 'soc',
		mastery: 'speech',
		description: 'Knowledge of social conventions and polite behavior.',
	},
	{
		id: 'grimage-127',
		name: 'Makeup',
		stat: 'dex',
		mastery: 'performance',
		description:
			"The skill of applying cosmetics to alter one's appearance for theatrical or disguise purposes.",
	},
	{
		id: 'imitation-128',
		name: 'Imitation',
		stat: 'soc',
		mastery: 'performance',
		description:
			'The ability to mimic the voices, sounds, or behaviors of others.',
	},
	{
		id: 'marionnettes-129',
		name: 'Puppetry',
		stat: 'soc',
		mastery: 'performance',
		description:
			'The art of manipulating puppets to tell stories or entertain.',
	},
	{
		id: 'musique-130',
		name: 'Music',
		stat: 'éru',
		mastery: 'performance',
		description:
			'Knowledge and skill in playing musical instruments or understanding musical theory.',
	},
	{
		id: 'poesie-131',
		name: 'Poetry',
		stat: 'éru',
		mastery: 'performance',
		description:
			'The art of writing or reciting poems, often with rhythmic and metaphorical language.',
	},
	{
		id: 'politesse-132',
		name: 'Politeness',
		stat: 'soc',
		mastery: 'performance',
		description:
			'The practice of showing courtesy and respect in social interactions.',
	},
	{
		id: 'sifflements-133',
		name: 'Whistling',
		stat: 'cha',
		mastery: 'performance',
		description:
			'The ability to produce clear and controlled sounds by forcing air through the lips or teeth.',
	},
	{
		id: 'corruption-134',
		name: 'Corruption',
		stat: 'soc',
		mastery: 'persuasion',
		description:
			'The act of using bribery or dishonest means to gain an advantage.',
	},
	{
		id: 'flagornerie-135',
		name: 'Flattery',
		stat: 'soc',
		mastery: 'persuasion',
		description: 'Excessive and insincere praise, often used to gain favor.',
	},
	{
		id: 'intimidation-136',
		name: 'Intimidation',
		stat: 'cha',
		mastery: 'persuasion',
		description: 'The act of using threats or force to coerce someone.',
	},
	{
		id: 'persuasion-137',
		name: 'Persuasion',
		stat: 'soc',
		mastery: 'persuasion',
		description:
			'The ability to convince someone to do or believe something through reasoning or charm.',
	},
	{
		id: 'seduction-138',
		name: 'Seduction',
		stat: 'cha',
		mastery: 'persuasion',
		description: 'The art of attracting and enticing someone.',
	},
	{
		id: 'torture-139',
		name: 'Torture',
		stat: 'cou',
		mastery: 'persuasion',
		description:
			'The act of inflicting severe pain or suffering as a means of coercion or punishment.',
	},
	{
		id: 'equitation-140',
		name: 'Horsemanship',
		stat: 'ins',
		mastery: 'physique',
		description: 'Skill in riding and controlling horses.',
	},
	{
		id: 'acrobatie-141',
		name: 'Acrobatics',
		stat: 'agi',
		mastery: 'physique',
		description:
			'The character uses gymnastics to impress the gallery or to get out of tricky situations.',
	},
	{
		id: 'cyclisme-142',
		name: 'Cycling',
		stat: 'agi',
		mastery: 'physique',
		description:
			'The character showed courage in their childhood and overcame training wheels.',
	},
	{
		id: 'escalade-143',
		name: 'Climbing',
		stat: 'for / agi',
		mastery: 'physique',
		description: 'The skill of ascending steep surfaces using hands and feet.',
	},
	{
		id: 'boxe-144',
		name: 'Boxing',
		stat: 'agi',
		mastery: 'physique',
		description:
			'A combat sport involving two participants striking each other with their fists.',
	},
	{
		id: 'culturisme-145',
		name: 'Bodybuilding',
		stat: 'cha',
		mastery: 'physique',
		description:
			'The practice of strengthening and enlarging the muscles of the body through exercise.',
	},
	{
		id: 'mule-146',
		name: 'Carrying Capacity',
		stat: 'for',
		mastery: 'physique',
		description: 'The ability to carry heavy loads or resist being moved.',
	},
	{
		id: 'nage-147',
		name: 'Swimming',
		stat: 'mou / for',
		mastery: 'physique',
		description: 'The ability to propel oneself through water using limbs.',
	},
	{
		id: 'runes-148',
		name: 'Runes',
		stat: 'éru',
		mastery: 'knowledge',
		description:
			'Knowledge of ancient alphabets and their potential magical or symbolic meanings.',
	},
	{
		id: 'astronomie-149',
		name: 'Astronomy',
		stat: 'éru',
		mastery: 'knowledge',
		description:
			'An astronomer can study celestial bodies: planets, stars, gas clouds... and define their size, speed of movement, and composition.',
	},
	{
		id: 'botanique-150',
		name: 'Botany',
		stat: 'éru',
		mastery: 'knowledge',
		description: 'The scientific study of plants.',
	},
	{
		id: 'heraldique-151',
		name: 'Heraldry',
		stat: 'éru',
		mastery: 'knowledge',
		description:
			'Knowledge of coats of arms and their history and significance.',
	},
	{
		id: 'histoire-legendes-152',
		name: 'History & Legends',
		stat: 'éru',
		mastery: 'knowledge',
		description: 'Knowledge of past events, cultures, and traditional stories.',
	},
	{
		id: 'lecture-ecriture-153',
		name: 'Letters',
		stat: 'éru',
		mastery: 'knowledge',
		description:
			'The fundamental skills of interpreting written language and forming written text.',
	},
	{
		id: 'potamologie-154',
		name: 'Potamology',
		stat: 'éru',
		mastery: 'knowledge',
		description: 'The study of rivers and streams.',
	},
	{
		id: 'religion-cultes-155',
		name: 'Religion & Cults',
		stat: 'éru',
		mastery: 'knowledge',
		description:
			'Knowledge of various religious beliefs, practices, and organizations.',
	},
	{
		id: 'anatomie-156',
		name: 'Anatomy',
		stat: 'éru',
		mastery: 'sciences',
		description: 'The scientific study of the structure of living organisms.',
	},
	{
		id: 'chimie-157',
		name: 'Chemistry',
		stat: 'éru',
		mastery: 'sciences',
		description:
			"The science of the functions of carbon chains, aqueous solutions, or atomic relationships is child's play for the chemist.",
	},
	{
		id: 'distillation-158',
		name: 'Distillation',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'The process of separating components or substances from a liquid mixture by using selective boiling and condensation.',
	},
	{
		id: 'geologie-159',
		name: 'Geology',
		stat: 'éru',
		mastery: 'sciences',
		description:
			"The character's knowledge and mastery allow them to dig in the earth and rock in the right places to harvest resources or escape.",
	},
	{
		id: 'geometrie-160',
		name: 'Geometry',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'The character can measure angles and draw perpendiculars and parallels instinctively.',
	},
	{
		id: 'mecanique-161',
		name: 'Mechanics',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'Knowledge of how machines work and the ability to repair or build them.',
	},
	{
		id: 'poisons-162',
		name: 'Poisons',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'Knowledge of various toxic substances, their effects, and their uses.',
	},
	{
		id: 'potions-163',
		name: 'Potions',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'The art of brewing and mixing magical or medicinal concoctions.',
	},
	{
		id: 'technologie-164',
		name: 'Technology',
		stat: 'éru',
		mastery: 'sciences',
		description:
			'Knowledge and understanding of modern tools, devices, and systems.',
	},
	{
		id: 'chirurgie-165',
		name: 'Surgery',
		stat: 'dex',
		mastery: 'healing',
		description:
			'A true virtuoso with a bread knife, corkscrew, saw, and scalpel, the character can operate on others with confidence.',
	},
	{
		id: 'massage-166',
		name: 'Massage',
		stat: 'dex',
		mastery: 'healing',
		description:
			'The practice of manipulating soft tissues in the body to relieve tension and pain.',
	},
	{
		id: 'medecine-167',
		name: 'Medicine',
		stat: 'éru',
		mastery: 'healing',
		description:
			'Knowledge of diseases, their diagnosis, treatment, and prevention.',
	},
	{
		id: 'onguents-168',
		name: 'Ointments',
		stat: 'éru',
		mastery: 'healing',
		description:
			'The preparation and application of medicinal salves and balms.',
	},
	{
		id: 'premiers-soins-169',
		name: 'First Aid',
		stat: 'éru',
		mastery: 'healing',
		description:
			'Basic medical care given to an injured or ill person before professional help arrives.',
	},
	{
		id: 'simples-170',
		name: 'Herbalism',
		stat: 'eru',
		mastery: 'healing',
		description:
			'Knowledge of medicinal plants and their uses for healing and remedies.',
	},
	{
		id: 'soin-des-animaux-171',
		name: 'Animal Care',
		stat: 'éru',
		mastery: 'healing',
		description:
			'Knowledge and skills related to the health and well-being of animals.',
	},
	{
		id: 'depecage-172',
		name: 'Skinning',
		stat: 'dex',
		mastery: 'survival',
		description: 'The skill of removing the skin from an animal.',
	},
	{
		id: 'chasse-173',
		name: 'Hunting',
		stat: 'ins',
		mastery: 'survival',
		description:
			'The skill of tracking and killing animals for food or other resources.',
	},
	{
		id: 'collets-174',
		name: 'Traps (Snares)',
		stat: 'dex',
		mastery: 'survival',
		description: 'The ability to create and set snares to capture animals.',
	},
	{
		id: 'cuisine-175',
		name: 'Cooking',
		stat: 'ins',
		mastery: 'survival',
		description:
			'Tired of buttered pasta or charred steaks, the character now knows how to make good food.',
	},
	{
		id: 'feu-176',
		name: 'Fire Starting',
		stat: 'éru',
		mastery: 'survival',
		description:
			'The ability to create and maintain a fire using various methods and materials.',
	},
	{
		id: 'jeune-177',
		name: 'Fasting',
		stat: 'end',
		mastery: 'survival',
		description: 'The ability to endure periods without food.',
	},
	{
		id: 'orientation-178',
		name: 'Exploration',
		stat: 'éru',
		mastery: 'survival',
		description:
			"The ability to determine one's location and direction in the wilderness.",
	},
	{
		id: 'peche-179',
		name: 'Fishing',
		stat: 'ins',
		mastery: 'survival',
		description: 'The skill of catching fish.',
	},
	{
		id: 'pistage-180',
		name: 'Tracking',
		stat: 'ins',
		mastery: 'survival',
		description: 'The ability to follow the signs left by animals or people.',
	},
	{
		id: 'cueillette-181',
		name: 'Gathering',
		stat: 'éru',
		mastery: 'survival',
		description:
			'The skill of finding and collecting edible plants and other natural resources.',
	},
	{
		id: 'arbalete-182',
		name: 'Crossbow',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'Using a weapon is essential for an adventurer. Proficiency with a ranged weapon that fires projectiles with mechanical force.',
	},
	{
		id: 'arc-183',
		name: 'Bow',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'Using a weapon is essential for an adventurer. Skill in using a flexible weapon that shoots arrows.',
	},
	{
		id: 'fusil-184',
		name: 'Rifle',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'Using a weapon is essential for an adventurer. Expertise with a long-barreled firearm designed for accurate shooting at a distance.',
	},
	{
		id: 'jet-185',
		name: 'Throwing',
		stat: 'dex / for',
		mastery: 'ranged',
		description:
			'Using a weapon is essential for an adventurer. Skill in accurately throwing objects, such as knives, axes, or stones.',
	},
	{
		id: 'pistol-186',
		name: 'Pistol',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'Using a weapon is essential for an adventurer. Proficiency with a handheld firearm.',
	},
	{
		id: 'ricochets-187',
		name: 'Ricochets',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'The ability to make projectiles bounce off surfaces to hit targets indirectly.',
	},
	{
		id: 'visee-188',
		name: 'Aiming',
		stat: 'dex',
		mastery: 'ranged',
		description: 'The skill of accurately targeting with a ranged weapon.',
	},
	{
		id: 'trajectoires-189',
		name: 'Trajectories',
		stat: 'dex',
		mastery: 'ranged',
		description:
			'Knowledge of how to calculate and predict the path of a projectile.',
	},
	{
		id: 'tir-monte-190',
		name: 'Mounted Shooting',
		stat: 'agi',
		mastery: 'ranged',
		description: 'The ability to accurately shoot while riding a mount.',
	},
];
