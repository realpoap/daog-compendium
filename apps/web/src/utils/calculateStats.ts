import { NewAction } from '@api/lib/ZodAction';
import { CreatureComponent } from '@api/lib/ZodComponent';
import { Creature, CreatureAttribute, NewCreature } from '@api/lib/ZodCreature';
import { CreatureItem } from '@api/lib/ZodItem';
import { capitalizeFirstLetter } from './capitalize';

export const calculateStats = (creature: Creature | NewCreature) => {
	const newCreature = calcModifiersBonus(creature);
	creature.level = calcLevel(newCreature);
	console.log('🐺 Creature after calculation : ', newCreature);
	return creature;
};

const calcLevel = (creature: Creature | NewCreature) => {
	const att = creature.attack ? creature.attack - 15 : 0;
	const def = creature.defense ? creature.defense - 15 : 0;
	const vit = creature.health ? creature.health - 15 : 0;
	const per = creature.perception ? creature.perception - 15 : 0;
	const sen = creature.spirit ? creature.spirit - 15 : 0;
	const will = creature.stats.WIL ? creature.stats.WIL - 15 : 0;
	const disc = creature.discretion ? creature.discretion - 15 : 0;
	const glory = creature?.glory != null ? 1 + Number(creature.glory) * 0.1 : 0;
	const main = creature?.actionList?.main ? creature.actionList?.main * 10 : 1;
	const epic = creature?.actionList?.main ? creature.actionList?.main * 10 : 1;
	const attributes = creature?.attributes ? creature.attributes.length : 0;

	const level = Math.round(
		(att * 4 +
			def * 4 +
			vit * 2 +
			sen * 3 +
			per * 2 +
			will * 2 +
			disc * 2 +
			main * 2 +
			attributes * 2 +
			epic * 2) /
			11,
	);

	console.log('level:', level);

	return level;
};

const calcModifiersBonus = (creature: Creature | NewCreature) => {
	let calCreature = creature;
	// FULLNAME
	let fullnameString = '';
	if (creature.name) fullnameString = capitalizeFirstLetter(creature.name);
	if (creature.subtype)
		fullnameString = fullnameString.concat(' ', creature.subtype);
	if (creature.rank && creature.rank !== 'default')
		fullnameString = fullnameString.concat(', ', creature.rank);
	if (creature.type)
		fullnameString = fullnameString.concat(
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
	isBoss: false,
	type: null,
	subtype: null,
	alignment: null,
	level: 0,
	initiative: null,
	attack: 0,
	attackBonus: null,
	defense: 0,
	defenseBonus: null,
	ranged: 0,
	rangedBonus: null,
	health: 0,
	armor: null,
	perception: 0,
	perceptionBonus: null,
	discretion: 0,
	discretionBonus: null,
	magic: null,
	spirit: null,
	glory: null,
	flavor: '',
	description: '',
	actionList: {
		main: 1,
		epic: 0,
		limited: null,
		free: null,
		travel: null,
	},
	loot: <CreatureItem[]>[],
	scavenge: <CreatureComponent[]>[],
	attributes: <CreatureAttribute[]>[],
	actions: <NewAction[]>[],
};
