import { Creature,  CreatureAttribute, NewCreature } from "@api/lib/ZodCreature";
import { CreatureAction } from "@api/lib/ZodAction";
import { CreatureItem } from "@api/lib/ZodItem";
import { CreatureComponent } from "@api/lib/ZodComponent";

export const calculateStats = (creature: Creature | NewCreature) => {

	creature.level = calcLevel(creature);
	console.log('creature after calc : ',creature)
	return creature
}

const calcLevel = (creature: Creature | NewCreature) => {
	const att = creature.attack ? creature.attack -15 : 0;
	const def = creature.defense ? creature.defense -15 : 0;
	const vit = creature.health ? creature.health -15 : 0;
	const per = creature.perception ? creature.perception -15 : 0;
	const sen = creature.spirit ? creature.spirit -15 : 0;
	const will = creature.stats.WIL ? creature.stats.WIL -15 : 0;
	const main = creature?.actionList?.main ? creature.actionList?.main * 2 : 1;
	const epic = creature?.actionList?.main ? creature.actionList?.main * 5 : 1;
	const attributes = creature?.attributes ? creature.attributes.length : 0

	const level = Math.round(((att*4 + def*4 + vit + sen*3 + per*2 + will*2 + main + attributes) / 8 +epic))

	console.log('level:', level);

	return level
}

export const defaultCreature : NewCreature = {
			size: 'average',
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
			fullname: 'test',
			name: 'test',
			rank: null,
			isBoss: false,
			type: 'plant',
			subtype: null,
			alignment: 'neutral',
			level: 0,
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
			magic: null,
			spirit: null,
			glory: null,
			flavor: 'flavor text',
			description: 'description text',
			actionList: {
				main: 1,
				epic:0,
				limited:null,
				free: null,
				travel:null,
			},
			loot: <CreatureItem[]>[],
			scavenge:<CreatureComponent[]>[],
			attributes:<CreatureAttribute[]>[],
			actions: <CreatureAction[]>[],
		}