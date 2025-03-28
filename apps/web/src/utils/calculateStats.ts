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
	if (!c.stats) {
		c.stats = {
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
	if (!c.weight) {
		c.weight = {
			current: 0,
			max: 0,
		};
	}
	if (!c.health) {
		c.health = {
			current: 0,
			max: 0,
		};
	}
	if (!c.spirit) {
		c.spirit = {
			current: 0,
			max: 0,
		};
	}
	const levelBonus = Math.floor(c.level / 5);
	c.actionList = {
		main: levelBonus,
		limited: levelBonus,
		free: 1,
		travel: 2,
		epic: c.isBoss ? levelBonus : 0,
	};
	const maxHealth = c.glory
		? c.stats.VIT + Number(c.isPun) + c.glory
		: c.stats.VIT + Number(c.isPun);
	const maxSpirit = c.glory
		? c.stats.SEN + Number(c.isPun) + c.glory
		: c.stats.SEN + Number(c.isPun);
	c.health = {
		current: c.health.current,
		max: maxHealth,
	};
	c.spirit = {
		current: c.spirit.current,
		max: maxSpirit,
	};

	c.initiative = c.initiativeBonus
		? c.initiativeBonus + c.stats.CEL + c.stats.WIL
		: c.stats.CEL + c.stats.WIL;

	if (c.attackBonus) {
		c.attack =
			c.attackType === 'STR'
				? c.attackBonus + c.stats.STR
				: c.attackBonus + c.stats.AGI;
	} else {
		c.attack = c.attackType === 'STR' ? c.stats.STR : c.stats.AGI;
	}

	if (c.weight && c.carryWeight && c.weightBonus) {
		c.defenseType =
			c.carryWeight >
			c.stats.END * 0.5 + Math.floor(c.stats.END / 10) + levelBonus
				? 'STR'
				: 'AGI';
	}
	if (c.defenseBonus) {
		c.defense =
			c.defenseType === 'STR'
				? c.defenseBonus + c.defense + c.stats.STR
				: c.defenseBonus +
					c.stats.AGI +
					Math.floor(c.stats.AGI / 10) +
					levelBonus;
	} else {
		c.defense =
			c.defenseType === 'STR'
				? c.defense + c.stats.STR
				: c.stats.AGI + Math.floor(c.stats.AGI / 10) + levelBonus;
	}
	if (c.armor) {
		c.armorClass =
			c.armor > 15
				? 5
				: c.armor > 10
					? 4
					: c.armor > 5
						? 3
						: c.armor > 3
							? 2
							: c.armor > 1
								? 1
								: 0;
	}
	c.ranged = c.rangedBonus
		? c.rangedBonus + c.stats.CEL + Math.floor(c.stats.DEX / 10) + levelBonus
		: c.stats.CEL + Math.floor(c.stats.DEX / 10) + levelBonus;

	c.perception = c.perceptionBonus
		? c.perceptionBonus +
			c.stats.INS +
			Math.floor(c.stats.INS / 10) +
			levelBonus
		: c.stats.INS + Math.floor(c.stats.INS / 10) + levelBonus;
	switch (c.size) {
		case 'tiny':
			c.sizeBonus = -5;
			break;
		case 'small':
			c.sizeBonus = -2;
			break;
		case 'large':
			c.sizeBonus = +2;
			break;
		case 'huge':
			c.sizeBonus = +5;
			break;
		case 'gigantic':
			c.sizeBonus = +10;
			break;

		default:
			break;
	}
	if (c.sizeBonus) {
		c.discretion = c.discretionBonus
			? c.discretionBonus +
				c.stats.AGI +
				Math.floor(c.stats.AGI / 10) +
				levelBonus -
				c.sizeBonus
			: c.stats.AGI + Math.floor(c.stats.AGI / 10) + levelBonus - c.sizeBonus;
	} else {
		c.discretion = c.discretionBonus
			? c.discretionBonus +
				c.stats.AGI +
				Math.floor(c.stats.AGI / 10) +
				levelBonus
			: c.stats.AGI + Math.floor(c.stats.AGI / 10) + levelBonus;
	}

	c.magic = Math.floor(c.stats.SEN / 10) + levelBonus;

	console.log('😎 Character after calculation : ', c);
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
