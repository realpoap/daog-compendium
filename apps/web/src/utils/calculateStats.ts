import { HabitatTypeType, SpellTypeType } from '@api/lib/zod-prisma';
import { NewAction } from '@api/lib/ZodAction';
import { Character } from '@api/lib/ZodCharacter';
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

export const calcCharacterStats = (c: Character) => {
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
	c.profile.variables.initiative =
		c.profile.boni.initiative +
		c.profile.stats.CEL +
		c.profile.stats.WIL +
		c.masteries.movement.current +
		c.specifics.sizeBonus;

	// ATTACK --------------------------------------------------------------------------
	c.profile.variables.attack =
		c.path.attackType === 'STR'
			? c.profile.boni.attack +
				c.profile.stats.STR +
				c.masteries.fighting.current
			: c.profile.boni.attack +
				c.profile.stats.AGI +
				c.masteries.fighting.current;

	// DEFENSE --------------------------------------------------------------------------

	if (c.status.weight && c.status.carryWeight && c.status.weightBonus) {
		c.path.defenseType =
			c.status.carryWeight >
			c.profile.stats.END * 0.5 +
				Math.floor(c.profile.stats.END / 10) +
				levelBonus
				? 'STR'
				: 'AGI';
	}

	c.profile.variables.defense =
		c.path.defenseType === 'STR'
			? c.profile.boni.defense +
				c.profile.variables.defense +
				c.profile.stats.STR +
				c.masteries.defense.current
			: c.profile.boni.defense +
				c.profile.stats.AGI +
				Math.floor(c.profile.stats.AGI / 10) +
				levelBonus +
				c.masteries.defense.current;

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
	}

	// RANGED ---------------------------------------------------------------------------

	c.profile.variables.ranged =
		c.profile.boni.ranged +
		c.profile.stats.CEL +
		Math.floor(c.profile.stats.DEX / 10) +
		levelBonus +
		c.masteries.ranged.current;

	// PERCEPTION ---------------------------------------------------------------------------
	c.profile.variables.perception =
		c.profile.boni.perception +
		c.profile.stats.INS +
		Math.floor(c.profile.stats.INS / 10) +
		levelBonus +
		c.masteries.perception.current;

	// DISCRETION ---------------------------------------------------------------------------

	c.profile.variables.discretion =
		c.profile.boni.discretion +
		c.profile.stats.AGI +
		Math.floor(c.profile.stats.AGI / 10) +
		levelBonus +
		c.specifics.sizeBonus -
		Number(c.specifics.massive);

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
	c.profile.variables.bravery =
		c.profile.stats.WIL +
		c.profile.boni.bravery +
		c.masteries.esoterism.current;
	// SPEECH ---------------------------------------------------------------------------
	c.profile.variables.speech =
		c.profile.stats.CHA + c.profile.boni.speech + c.masteries.speech.current;
	// TRADE ---------------------------------------------------------------------------
	c.profile.variables.trade =
		c.profile.stats.SOC + c.profile.boni.trade + c.masteries.trading.current;
	// PERFORMANCE--------------------------------------------------------------------------
	c.profile.variables.performance =
		c.profile.stats.CHA +
		c.profile.boni.performance +
		c.masteries.performance.current;
	// INTIMIDATION--------------------------------------------------------------------------
	c.profile.variables.intimidation =
		c.profile.stats.CHA +
		c.profile.boni.intimidation +
		Math.floor(c.profile.stats.STR / 10);
	// SURVIVAL --------------------------------------------------------------------------
	c.profile.variables.survival =
		c.profile.stats.INS +
		c.profile.boni.survival +
		c.masteries.survival.current;
	// ENIGMS --------------------------------------------------------------------------
	c.profile.variables.enigms =
		c.profile.stats.ERU + c.profile.boni.enigms + c.masteries.logic.current;
	// MAGICLOAD + SPELL BONUS---------------------------------------------------------------
	c.status.magicLoad.max = Math.floor(c.profile.stats.SEN / 10) + levelBonus;
	c.profile.variables.magic =
		c.profile.boni.magic + c.status.magicLoad.max + c.masteries.magic.current;

	//console.log('😎 Character after calculation : ', c);
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
	enigms: 0,
	speech: 0,
	trade: 0,
	performance: 0,
	intimidation: 0,
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
