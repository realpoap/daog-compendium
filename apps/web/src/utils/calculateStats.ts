import { HabitatTypeType, SpellTypeType } from '@api/lib/zod-prisma';
import { NewAction } from '@api/lib/ZodAction';
import { Character, Masteries, NewCharacter } from '@api/lib/ZodCharacter';
import { CreatureComponent } from '@api/lib/ZodComponent';
import { Creature, CreatureAttribute, NewCreature } from '@api/lib/ZodCreature';
import { CreatureItem } from '@api/lib/ZodItem';
import { capitalizeFirstLetter } from './capitalize';

export const calcSizeAvantage = (creature: Creature) => {
	const av =
		creature.size === 'tiny'
			? 2
			: creature.size === 'small'
				? 1
				: creature.size === 'gigantic'
					? -3
					: creature.size === 'huge'
						? -2
						: creature.size === 'large'
							? -1
							: 0;
	return av;
};

export type Roll = {
	score: number;
	state: string | null;
	roll: number | null;
	stat: number;
	avantages: number;
	avRoll: number | null;
};

export const resetNonRoll = (stat: number, avantages: number) => {
	return {
		score: stat,
		state: null,
		roll: null,
		stat: stat,
		avantages: avantages,
		avRoll: null,
	};
};

export const rollStats = (stat: number, avantages: number) => {
	const d12 = Math.ceil(Math.random() * 12);
	const d4 = Math.ceil(Math.random() * 4);
	const av = d4 * avantages;
	const score = stat + d12 + av;
	const diceState = d12 === 1 ? 'fumble' : d12 === 12 ? 'crit' : 'normal';
	console.log(`🎲 result: ${score} (${stat} + ${d12} + ${av}) - ${diceState}`);
	return {
		score: score,
		state: diceState,
		roll: d12,
		stat: stat,
		avantages: avantages,
		avRoll: av,
	};
};

export const calculateStats = (creature: Creature | NewCreature) => {
	const newCreature = calcModifiersBonus(creature);
	creature.level = calcLevel(newCreature);
	console.log('🐺 Creature after calculation : ', newCreature);
	return creature;
};

export const calcLevel = (creature: Creature | NewCreature) => {
	console.log('old level:', creature.level);

	const cel = creature.stats.CEL ? creature.stats.CEL - 15 : 0;
	const att = creature.attack ? creature.attack - 15 : 0;
	const def = creature.defense ? creature.defense - 15 : 0;
	const vit = creature.health ? creature.health - 15 : 0;
	const per = creature.perception ? creature.perception - 15 : 0;
	const sen = creature.spirit ? creature.spirit - 15 : 0;
	const will = creature.stats.WIL ? creature.stats.WIL - 15 : 0;
	const disc = creature.discretion ? creature.discretion - 15 : 0;
	const caster = creature?.isCaster === true ? 2 : 1;
	const main = creature?.actionList?.main ? creature.actionList?.main * 5 : 1;
	const epic = creature?.actionList?.main ? creature.actionList?.main * 10 : 1;
	const attributes = creature?.attributes ? creature.attributes.length : 0;
	const magic = creature?.magic ? creature.magic : 0;
	const glory = creature.glory === null ? 1 : 1 + Number(creature.glory) * 0.1;

	const level = Math.round(
		(att * 5 +
			def * 5 +
			vit * 2 +
			sen * 3 * caster +
			magic +
			per * 2 +
			will * 1 +
			disc * 2 +
			main * 3 +
			cel * 1 +
			epic * 3 +
			attributes * 2) /
			12 +
			glory,
	);

	console.log('level:', level);

	return level;
};

const calcModifiersBonus = (creature: Creature | NewCreature) => {
	const calCreature = creature;
	// FULLNAME
	let fullnameString = '';
	if (creature.name) fullnameString = capitalizeFirstLetter(creature.name);
	if (creature.subtype)
		fullnameString = fullnameString.concat(' ', creature.subtype);
	if (creature.rank && creature.rank !== 'default')
		fullnameString = fullnameString.concat(', ', creature.rank);
	if (creature.type)
		calCreature.fullname = fullnameString.concat(
			' (',
			capitalizeFirstLetter(creature.type),
			')',
		);

	// INITIATIVE
	if (creature.stats?.CEL && creature.stats?.WIL && creature.stats?.AGI) {
		const perB =
			creature.perceptionBonus === null ? 0 : creature.perceptionBonus;
		const discB =
			creature.discretionBonus === null ? 0 : creature.discretionBonus;
		const celB = Math.floor(creature.stats?.CEL / 10);
		const sizeMod =
			creature.size === 'large'
				? -5
				: creature.size === 'huge'
					? -10
					: creature.size === 'gigantic'
						? -20
						: 0;
		calCreature.initiative =
			creature.stats?.WIL + creature.stats?.CEL + perB + discB + celB + sizeMod;
	}
	// ATTACK
	if (creature.stats?.AGI && creature.stats?.STR) {
		const attB = creature.attackBonus === null ? 0 : creature.attackBonus;
		const sizeMod =
			creature.size === 'large'
				? -3
				: creature.size === 'huge'
					? -5
					: creature.size === 'gigantic'
						? -10
						: 0;
		calCreature.attack =
			Math.max(creature.stats?.STR, creature.stats?.AGI) + attB + sizeMod;
	}
	// RANGED
	if (creature.stats?.DEX) {
		const ranB = creature.rangedBonus ?? 0;
		const armorB = creature.armor === null ? 0 : creature.armor;
		const disc = creature.armor === null ? 0 : creature.armor;

		const isNimble =
			creature.stats?.STR < creature.stats?.AGI &&
			creature.stats?.CEL > creature.stats?.STR &&
			armorB < 5 &&
			creature.stats?.INS > 15;
		const agiB = isNimble ? 2 : 0;
		const discB = disc > 30 ? 3 : 0;
		calCreature.ranged = creature.stats?.DEX + ranB + agiB + discB;
	}
	// DEFENSE
	if (creature.stats?.AGI && creature.stats?.STR) {
		const armorB = creature.armor === null ? 0 : creature.armor;
		const defB = creature.defenseBonus ?? 0;
		const sizeMod =
			creature.size === 'large'
				? -3
				: creature.size === 'huge'
					? -5
					: creature.size === 'gigantic'
						? -10
						: 0;
		const isNimble =
			creature.stats?.STR < creature.stats?.AGI &&
			creature.stats?.CEL > creature.stats?.STR &&
			armorB < 5 &&
			creature.stats?.INS > 15;
		const agiB = isNimble ? Math.floor(creature.stats.AGI / 10) : 0;

		calCreature.defense =
			Math.max(creature.stats?.STR, creature.stats?.AGI) +
			agiB +
			defB +
			armorB +
			sizeMod;
	}
	if (creature.stats?.ERU && creature.stats?.SEN && creature.stats?.INS) {
		const perB =
			creature.perceptionBonus === null ? 0 : creature.perceptionBonus;
		const insB = Math.floor(creature.stats?.INS / 10);

		calCreature.perception =
			Math.max(creature.stats?.STR, creature.stats?.AGI, creature.stats?.ERU) +
			perB +
			insB;
	}
	if (creature.stats?.AGI && creature.stats?.DEX) {
		const discB =
			creature.discretionBonus === null ? 0 : creature.discretionBonus;
		const dex = creature.stats?.DEX;
		const dexB = dex > 20 ? 2 : 0;
		calCreature.discretion = creature.stats.AGI + discB + dexB;
	}
	if (creature.stats?.VIT) {
		const gloryMod =
			creature.glory === null ? 1 : 1 + Number(creature.glory) * 0.1;
		calCreature.health = creature.stats.VIT * gloryMod;
	}
	if (creature.stats?.SEN) {
		const gloryMod =
			creature.glory === null ? 1 : 1 + Number(creature.glory) * 0.1;
		const magic = creature.magic === null ? 0 : creature.magic;
		const senB = Math.floor(creature.stats?.SEN / 10);
		calCreature.spirit = creature.stats.SEN * gloryMod + magic + senB;
	}

	return calCreature;
};

export const calcCharacterStats = (c: Character | NewCharacter) => {
	console.log('calcCharacterStats: Entered function');
	if (!c.profile.statsStarting) {
		c.profile.statsStarting = {
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
		};
	}

	// Set base data ------------------------------------------
	if (!c.profile.stats) {
		c.profile.stats = { ...c.profile.statsStarting };
	} else {
		for (const key in c.profile.statsStarting) {
			const statKey = key as keyof typeof c.profile.statsStarting;
			if (
				c.profile.stats[statKey] === null ||
				c.profile.stats[statKey] === undefined
			) {
				c.profile.stats[statKey] = c.profile.statsStarting[statKey];
			}
		}
	}

	if (!c.status.weight) {
		c.status.weight = {
			current: 0,
			max: 0,
		};
	}
	if (!c.status.health) {
		c.status.health = {
			current: 0,
			max: 0,
		};
	}
	if (!c.status.spirit) {
		c.status.spirit = {
			current: 0,
			max: 0,
		};
	}
	console.log('calcCharacterStats: About to call calcMasteriesScores');

	calcMasteriesScores(c);

	const levelBonus = Math.floor(c.profile.level / 5);
	c.path.actionList = {
		main: levelBonus,
		limited: levelBonus,
		free: 1,
		travel: 2,
		epic: c.bio.isBoss ? levelBonus : 0,
	};
	const maxHealth = c.profile.glory
		? c.profile.stats.VIT +
			Number(c.bio.isPun) +
			levelBonus +
			Math.floor(c.profile.stats.VIT / 10) +
			c.profile.glory
		: c.profile.stats.VIT +
			Number(c.bio.isPun) +
			levelBonus +
			Math.floor(c.profile.stats.VIT / 10);
	const maxSpirit = c.profile.glory
		? c.profile.stats.SEN +
			levelBonus +
			Math.floor(c.profile.stats.SEN / 10) +
			c.profile.glory
		: c.profile.stats.SEN + levelBonus + Math.floor(c.profile.stats.SEN / 10);
	c.status.health = {
		current: c.status.health.current,
		max: maxHealth,
	};
	c.status.spirit = {
		current: c.status.spirit.current,
		max: maxSpirit,
	};

	// SIZEBONUS ---------------------------------------------------------------------------
	switch (c.specifics.size) {
		case 'tiny':
			c.specifics.sizeBonus = 5;
			break;
		case 'small':
			c.specifics.sizeBonus = 2;
			break;
		case 'large':
			c.specifics.sizeBonus = -2;
			break;
		case 'huge':
			c.specifics.sizeBonus = -5;
			break;
		case 'gigantic':
			c.specifics.sizeBonus = -10;
			break;

		default:
			c.specifics.sizeBonus = 0;
			break;
	}

	// INITIATIVE
	c.variables.initiative =
		c.profile.boni.initiative +
		c.profile.variables.initiative +
		c.profile.stats.CEL +
		c.profile.stats.WIL +
		c.masteries.movement.current +
		c.specifics.sizeBonus;

	// ATTACK --------------------------------------------------------------------------
	c.variables.attack =
		c.path.attackType === 'STR'
			? c.profile.boni.attack +
				c.profile.variables.attack +
				c.profile.stats.STR +
				c.masteries.fighting.current
			: c.profile.boni.attack +
				c.profile.variables.attack +
				c.profile.stats.AGI +
				c.masteries.fighting.current;

	// TODO: Add the bonus regarding weapon

	// DEFENSE --------------------------------------------------------------------------

	if (c.status.weight && c.status.carryWeight && c.status.weightBonus) {
		c.path.defenseType =
			c.status.carryWeight >
			c.profile.stats.END * 0.5 +
				Math.floor(c.profile.stats.END / 10) +
				levelBonus
				? 'STR'
				: 'AGI';
	} else {
		c.path.defenseType = 'STR';
	}

	// ARMORVALUE ----------------------------------------------------------------
	if (c.equipment.armorValue) {
		c.equipment.armorClass =
			c.equipment.armorValue > 15
				? 5
				: c.equipment.armorValue > 10
					? 4
					: c.equipment.armorValue > 5
						? 3
						: c.equipment.armorValue > 3
							? 2
							: c.equipment.armorValue > 1
								? 1
								: 0;

		c.variables.defense =
			c.path.defenseType === 'STR'
				? c.profile.boni.defense +
					c.profile.variables.defense +
					c.profile.stats.STR +
					c.masteries.defense.current +
					c.equipment.armorValue
				: c.profile.boni.defense +
					c.profile.variables.defense +
					c.profile.stats.AGI +
					Math.floor(c.profile.stats.AGI / 10) +
					levelBonus +
					c.masteries.defense.current +
					c.equipment.armorValue;
	}

	// RANGED ---------------------------------------------------------------------------

	c.variables.ranged =
		c.profile.boni.ranged +
		c.profile.variables.ranged +
		c.profile.stats.DEX +
		Math.floor(c.profile.stats.DEX / 10) +
		levelBonus +
		c.masteries.ranged.current;

	// PERCEPTION ---------------------------------------------------------------------------
	c.variables.perception =
		c.profile.boni.perception +
		c.profile.variables.perception +
		c.profile.stats.INS +
		Math.floor(c.profile.stats.INS / 10) +
		levelBonus +
		c.masteries.perception.current;
	// DETECTION ---------------------------------------------------------------------------
	c.variables.perception =
		c.profile.boni.perception +
		c.profile.variables.perception +
		c.profile.stats.INS +
		Math.floor(c.profile.stats.INS / 10) +
		levelBonus +
		c.masteries.perception.current;

	// DISCRETION ---------------------------------------------------------------------------

	c.variables.discretion =
		c.profile.boni.discretion +
		c.profile.variables.discretion +
		c.profile.stats.AGI +
		Math.floor(c.profile.stats.CEL / 10) +
		levelBonus +
		Number(c.specifics.sizeBonus) -
		2 * Number(c.specifics.massive);

	// SPEED ---------------------------------------------------------------------------
	c.profile.speed = {
		crawling: Math.floor(
			c.profile.stats.CEL * 0.5 +
				c.masteries.movement.current +
				c.specifics.sizeBonus,
		),

		walking: Math.floor(c.profile.stats.CEL + c.masteries.movement.current),
		running: Math.floor(
			c.profile.stats.CEL * 2 +
				c.masteries.physique.current +
				c.specifics.sizeBonus,
		),
		obstacle: Math.floor(
			c.profile.stats.CEL * 0.5 +
				c.masteries.physique.current -
				c.specifics.sizeBonus,
		),
	};

	// BRAVERY ---------------------------------------------------------------------------
	c.variables.bravery =
		c.profile.stats.WIL +
		c.profile.boni.bravery +
		c.profile.variables.bravery +
		c.masteries.esoterism.current +
		Math.floor(c.profile.stats.CHA / 10) +
		levelBonus;
	// SPEECH ---------------------------------------------------------------------------
	c.variables.speech =
		c.profile.stats.SOC +
		c.profile.boni.speech +
		c.profile.variables.speech +
		c.masteries.speech.current +
		Math.floor(c.profile.stats.CHA / 10) +
		levelBonus;
	// TRADING ---------------------------------------------------------------------------
	c.variables.trading =
		c.profile.stats.SOC +
		c.profile.boni.trading +
		c.profile.variables.trading +
		c.masteries.trading.current +
		Math.floor(c.profile.stats.ERU / 10) +
		levelBonus;

	// CRAFTING ---------------------------------------------------------------------------
	c.variables.crafting =
		c.profile.stats.DEX +
		c.profile.boni.crafting +
		c.profile.variables.crafting +
		c.masteries.crafting.current +
		Math.floor(c.profile.stats.WIL / 10) +
		levelBonus;
	// PERFORMANCE--------------------------------------------------------------------------
	c.variables.performance =
		c.profile.stats.CHA +
		c.profile.boni.performance +
		c.profile.variables.performance +
		c.masteries.performance.current +
		Math.floor(c.profile.stats.AGI / 10) +
		levelBonus;
	// INTIMIDATION--------------------------------------------------------------------------
	c.variables.intimidation =
		c.profile.stats.STR + Math.floor(c.profile.stats.CHA / 10) + levelBonus;
	// TODO: merge

	// PERSUASION--------------------------------------------------------------------------
	c.variables.persuasion =
		c.profile.stats.CHA +
		c.profile.boni.persuasion +
		c.profile.variables.persuasion +
		c.masteries.persuasion.current +
		Math.floor(c.profile.stats.ERU / 10) +
		levelBonus;

	// SURVIVAL --------------------------------------------------------------------------
	c.variables.survival =
		c.profile.stats.INS +
		c.profile.boni.survival +
		c.profile.variables.survival +
		c.masteries.survival.current +
		Math.floor(c.profile.stats.ERU / 10) +
		levelBonus;

	// LOGIC/MEMORY --------------------------------------------------------------------------
	c.variables.logic =
		c.profile.stats.ERU +
		c.profile.boni.logic +
		c.profile.variables.logic +
		c.masteries.logic.current +
		Math.floor(c.profile.stats.WIL / 10) +
		levelBonus;

	// INVESTIGATION --------------------------------------------------------------------------
	c.variables.logic =
		c.profile.stats.ERU +
		c.profile.boni.detection +
		c.profile.variables.detection +
		c.masteries.detection.current +
		Math.floor(c.profile.stats.INS / 10) +
		levelBonus;

	// MAGICLOAD + SPELL BONUS---------------------------------------------------------------
	c.status.magicLoad.max = Math.floor(c.profile.stats.SEN / 10) + levelBonus;

	c.variables.magic =
		c.profile.boni.magic +
		c.status.magicLoad.max +
		c.profile.variables.magic +
		c.masteries.magic.current;

	//console.log('😎 Character after calculation : ', c);
	console.log('calcCharacterStats: Exiting function');

	return c;
};

export const calcMasteriesScores = (c: Character | NewCharacter) => {
	// check if data is here --------------------------------
	if (!c.profile.variables) {
		console.info('No variables found');
	}
	if (!c.profile.boni) {
		console.info('No boni found');
	}
	if (!c.masteries) {
		console.error('No masteries found');
		return;
	}
	if (!c.path.skills) {
		console.error('No skills found');
		return;
	}

	c.masteries = masteriesReset;
	//FIXME: logic fucked

	// Loop through skills and update masteries accordingly
	c.path.skills.forEach((skill, i) => {
		console.log(`FUNCTION ENTERED for character`); // LOG A

		const skillMast = skill.mastery as keyof Masteries;
		if (!c.masteries[skillMast] || !skill.playerLevel) return;
		const current = c.masteries[skillMast].current;
		const max = c.masteries[skillMast].max;
		console.error(i, current, skill.playerLevel);
		console.log(
			i,
			`Processing Skill: ${skill.name}, Mastery: ${skillMast}, Level: ${skill.playerLevel}`,
		); // LOG B
		c.masteries[skillMast] = {
			current: current + skill.playerLevel,
			max: max < skill.playerLevel ? skill.playerLevel : max,
		};
	});
	console.info(`FUNCTION COMPLETED for character`); // LOG C
	//console.dir(c.masteries);
	return c;
};

export const defaultCreature: NewCreature = {
	size: null,
	stats: {
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
	fullname: '',
	name: '',
	rank: null,
	type: null,
	isBoss: false,
	isCaster: false,
	subtype: null,
	alignment: null,
	level: 0,
	initiative: null,
	attack: 0,
	attackBonus: 0,
	defense: 0,
	defenseBonus: 0,
	ranged: 0,
	rangedBonus: 0,
	health: 0,
	armor: 0,
	perception: 0,
	perceptionBonus: 0,
	discretion: 0,
	discretionBonus: 0,
	magic: 0,
	spirit: 0,
	glory: 0,
	flavor: '',
	description: '',
	actionList: {
		main: 1,
		epic: 0,
		limited: null,
		free: null,
		travel: null,
	},
	magicDomain: <SpellTypeType[]>[],
	habitat: <HabitatTypeType[]>[],
	loot: <CreatureItem[]>[],
	scavenge: <CreatureComponent[]>[],
	attributes: <CreatureAttribute[]>[],
	actions: <NewAction[]>[],
};

export const profileReset = {};
export const specificsReset = {};
export const equipmentReset = {};
export const pathReset = {};

export const variablesReset = {
	initiative: 0,
	attack: 0,
	brawl: 0,
	defense: 0,
	ranged: 0,
	perception: 0,
	discretion: 0,
	magic: 0,
	bravery: 0,
	survival: 0,
	logic: 0,
	speech: 0,
	trading: 0,
	performance: 0,
	intimidation: 0,
	persuasion: 0,
	knowledge: 0,
	sciences: 0,
	physique: 0,
	preciseness: 0,
	crafting: 0,
	detection: 0,
	esoterism: 0,
	movement: 0,
	healing: 0,
};

export const masteriesReset = {
	crafting: { current: 0, max: 0 },
	fighting: { current: 0, max: 0 },
	defense: { current: 0, max: 0 },
	detection: { current: 0, max: 0 },
	discretion: { current: 0, max: 0 },
	speech: { current: 0, max: 0 },
	esoterism: { current: 0, max: 0 },
	logic: { current: 0, max: 0 },
	brawl: { current: 0, max: 0 },
	magic: { current: 0, max: 0 },
	preciseness: { current: 0, max: 0 },
	movement: { current: 0, max: 0 },
	trading: { current: 0, max: 0 },
	perception: { current: 0, max: 0 },
	performance: { current: 0, max: 0 },
	persuasion: { current: 0, max: 0 },
	physique: { current: 0, max: 0 },
	knowledge: { current: 0, max: 0 },
	sciences: { current: 0, max: 0 },
	healing: { current: 0, max: 0 },
	survival: { current: 0, max: 0 },
	ranged: { current: 0, max: 0 },
};
