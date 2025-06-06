import { z } from 'zod';
import { NewActionSchema } from './ZodAction';
import { CreatureComponentSchema } from './ZodComponent';
import { ActionListSchema, CreatureAttributeSchema } from './ZodCreature';
import { CreatureItemSchema } from './ZodItem';

export const genderSchema = z.enum(['male', 'female', 'fluid', 'unknown'], {
	errorMap: () => ({ message: 'Choose a gender' }),
});

export const SpellTypeSchema = z.enum([
	'mouflette',
	'beast',
	'nature',
	'scourge',
	'spirit',
	'death',
	'life',
	'earth',
	'fire',
	'water',
	'air',
	'blood',
]);

export const ImageSchema = z.object({
	path: z.string().nullable().optional(),
	url: z.string().nullable().optional(),
});
export type Image = z.infer<typeof ImageSchema>;

export const BioSchema = z.object({
	creator: z.string(),
	owner: z.string(),
	campaign: z.string(),
	isDead: z.boolean().optional(),
	avatar: ImageSchema.nullable().optional(),
	name: z
		.string()
		.regex(/\b[^\d\W]+\b/g, 'Name should not contain numbers')
		.min(5, 'Name must be at least 5 characters long'),
	surname: z
		.string()
		.regex(/\b[^\d\W]+\b/g, 'Name should not contain numbers')
		.min(5, 'Name must be at least 5 characters long')
		.optional()
		.nullable(),
	species: z.string(),
	subspecies: z.string().optional().nullable(),
	fighterType: z.string().optional().nullable(),
	isBoss: z.boolean().optional(),
	isCaster: z.boolean().optional(),
	isPun: z.boolean().optional(),
});

export const CarreerSchema = z.object({
	current: z.string(),
	master: z.string(),
	skills: z.string().array(),
	dangerous: z.boolean().nullable(),
	illegal: z.boolean().nullable(),
	arcane: z.boolean().nullable(),
});

export const StatVariableSchema = z.object({
	current: z.number().int(),
	max: z.number().int(),
});

export const MasteriesSchema = z.object({
	crafting: StatVariableSchema,
	fighting: StatVariableSchema,
	defense: StatVariableSchema,
	detection: StatVariableSchema,
	discretion: StatVariableSchema,
	speech: StatVariableSchema,
	esoterism: StatVariableSchema,
	logic: StatVariableSchema,
	brawl: StatVariableSchema,
	magic: StatVariableSchema,
	preciseness: StatVariableSchema,
	movement: StatVariableSchema,
	trading: StatVariableSchema,
	perception: StatVariableSchema,
	performance: StatVariableSchema,
	persuasion: StatVariableSchema,
	physique: StatVariableSchema,
	knowledge: StatVariableSchema,
	sciences: StatVariableSchema,
	healing: StatVariableSchema,
	survival: StatVariableSchema,
	ranged: StatVariableSchema,
});

export type Masteries = z.infer<typeof MasteriesSchema>;

export const InventorySchema = z.object({
	weapons: z.array(CreatureItemSchema).optional(),
	armors: z.array(CreatureItemSchema).optional(),
	items: z.array(CreatureItemSchema).optional(),
	components: z.array(CreatureComponentSchema).optional(),
	armorValue: z.number().int().optional(),
	armorClass: z.number().int().optional(),
});

export const SkillSchema = z.object({
	id: z.string(),
	name: z.string({ required_error: 'It shall be named !' }),
	mastery: z.string(),
	description: z.string().nullable(),
	playerLevel: z.number().int().nullable(),
	playerPoints: z.number().int().nullable(),
});

export type CharacterSkill = z.infer<typeof SkillSchema>;

export enum LanguageEnum {
	common = 'common',
	moufflian_slang = 'moufflian_slang',
	clay = 'clay',
	elven = 'elven',
	dwarvish = 'dwarvish',
	gnomish = 'gnomish',
	goblin = 'goblin',
	giant = 'giant',
	troll = 'troll',
	high_elven = 'high_elven',
	titan = 'titan',
	rosmary = 'rosmary',
	dead_speech = 'dead_speech',
	fifilanto = 'fifilanto',
	primal = 'primal',
	amphibian = 'amphibian',
	silvan = 'silvan',
	signs = 'signs',
	thieves_marks = 'thieves_marks',
	forester_symbols = 'forester_symbols',
	dwarven_runes = 'dwarven_runes',
	kabbalistic_glyphs = 'kabbalistic_glyphs',
}

export const languagesSchema = z.enum([
	'common',
	'moufflian_slang',
	'clay',
	'elven',
	'dwarvish',
	'gnomish',
	'goblin',
	'giant',
	'troll',
	'high_elven',
	'titan',
	'rosmary',
	'dead_speech',
	'fifilanto',
	'primal',
	'amphibian',
	'silvan',
	'signs',
	'thieves_marks',
	'forester_symbols',
	'dwarven_runes',
	'kabbalistic_glyphs',
]);

export type LanguageList = z.infer<typeof languagesSchema>;

export const LanguageSchema = z.object({
	language: languagesSchema,
	mastery: z.number().int(),
	label: z.string().nullable(),
});

export type SpecificLanguage = z.infer<typeof LanguageSchema>;

export const FeatSchema = z.object({
	name: z.string(),
	mastery: z.string(),
	description: z.string(),
	combatEffects: z.string().nullable(),
	travelEffects: z.string().nullable(),
	passive: z.string().nullable(),
	rank: z.number().int(),
	color: z.string(),
	racial: z.boolean().nullable(),
});

export const StatProfilSchema = z.object({
	CEL: z.number().int(),
	AGI: z.number().int(),
	DEX: z.number().int(),
	STR: z.number().int(),
	END: z.number().int(),
	VIT: z.number().int(),
	WIL: z.number().int(),
	INS: z.number().int(),
	SEN: z.number().int(),
	CHA: z.number().int(),
	SOC: z.number().int(),
	ERU: z.number().int(),
});

export const OriginSchema = z.object({
	name: z.string(),
	description: z.string().nullable().optional(),
	type: z.string().nullable().optional(),
	knowledges: z.string().array(),
	profileBonus: z.string().array(),
	skills: z.string().array(),
	equipmentA: z.string().array().optional(),
	equipmentB: z.string().array().optional(),
});

export type Origin = z.infer<typeof OriginSchema>;

export const SpeedSchema = z.object({
	crawling: z.number().int(),
	walking: z.number().int(),
	running: z.number().int(),
	obstacle: z.number().int(),
});

export const DamageBonusSchema = z.object({
	ranged: z.number().int().optional().nullable(),
	fighting: z.number().int().optional().nullable(),
	brawling: z.number().int().optional().nullable(),
	defense: z.number().int().optional().nullable(),
	sneak: z.number().int().optional().nullable(),
	critical: z.number().int().optional().nullable(),
	magical: z.number().int().optional().nullable(),
});

export type DamageBonus = z.infer<typeof DamageBonusSchema>;

export const VariablesSchema = z.object({
	initiative: z.number().int(),
	attack: z.number().int(),
	brawl: z.number().int(),
	defense: z.number().int(),
	ranged: z.number().int(),
	perception: z.number().int(),
	discretion: z.number().int(),
	magic: z.number().int(),
	bravery: z.number().int(),
	survival: z.number().int(),
	logic: z.number().int(),
	speech: z.number().int(),
	trading: z.number().int(),
	performance: z.number().int(),
	preciseness: z.number().int(),
	intimidation: z.number().int(),
	persuasion: z.number().int(),
	knowledge: z.number().int(),
	sciences: z.number().int(),
	physique: z.number().int(),
	crafting: z.number().int(),
	detection: z.number().int(),
	esoterism: z.number().int(),
	movement: z.number().int(),
	healing: z.number().int(),
});

export const StatisticsSchema = z.object({
	glory: z.number().int().optional(),
	luck: z.number().int().optional(),
	destiny: z.number().int().optional(),
	level: z.number().int(),
	experience: z.number().int().optional(),
	stats: StatProfilSchema.nullable().optional(),
	statsStarting: StatProfilSchema,
	speed: SpeedSchema.nullable().optional(),
	variables: VariablesSchema,
	boni: VariablesSchema,
	advantages: VariablesSchema,
});

export const StatusSchema = z.object({
	weightBonus: z.number().int().optional(),
	carryWeight: z.number().int().optional(),
	weightClass: z.number().int().optional(),
	exhaustion: z.number().int().optional(),
	gold: z.number().int().optional(),
	equipmentValue: z.number().int().optional(),
	tempHealth: z.number().int().nullable().optional(),
	tempSpirit: z.number().int().nullable().optional(),
	advantages: z.number().int().nullable().optional(),
	weight: StatVariableSchema,
	health: StatVariableSchema,
	spirit: StatVariableSchema,
	magicLoad: StatVariableSchema,
});

export const PathSchema = z.object({
	magicDomain: z.array(SpellTypeSchema).optional(),
	tree: z.string().nullable().optional(),
	careers: z.string().array().optional(),
	skills: z.array(SkillSchema).optional(),
	feats: z.array(FeatSchema).optional(),
	actions: z.array(NewActionSchema).optional(),
	attributes: z.array(CreatureAttributeSchema).optional(),
	attackType: z.string().optional(),
	defenseType: z.string().optional(),
	origin: OriginSchema.nullable().optional(),
	actionList: ActionListSchema.nullable().optional(),
	skillPoints: z.number().int().optional(),
});

export const SpecificsSchema = z.object({
	size: z
		.enum(['tiny', 'small', 'average', 'large', 'huge', 'gigantic'], {
			errorMap: () => ({ message: 'A creature must have a size' }),
		})
		.optional(),
	alignment: z
		.enum(['saint', 'good', 'neutral', 'bad', 'evil'], {
			errorMap: () => ({ message: 'Choose an alignment' }),
		})
		.optional(),
	gender: genderSchema.nullable().optional(),
	speaks: z.array(LanguageSchema).optional(),
	sizeBonus: z.number().int().optional(),
	background: z.string().nullable(),
	description: z.string().nullable(),
	age: z.number().int().nullable().optional(),
	weight: z.number().int().nullable().optional(),
	height: z.number().int().nullable().optional(),
	bornIn: z.string().nullable().optional(),
	restBonus: z.number().int().nullable().optional(),
	meditationBonus: z.number().int().nullable().optional(),
	dmgBonus: DamageBonusSchema.optional().nullable(),
	massive: z.boolean().optional(),
});

export const CharacterSchema = z.object({
	id: z.string(),
	fullname: z.string(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	bio: BioSchema,
	path: PathSchema,
	status: StatusSchema,
	masteries: MasteriesSchema,
	variables: VariablesSchema,
	profile: StatisticsSchema,
	specifics: SpecificsSchema,
	equipment: InventorySchema,
});

export type Character = z.infer<typeof CharacterSchema>;

export const ExpUpdateSchema = z.object({
	id: z.string(),
	experience: z.number().int().optional(),
	level: z.number().int(),
});

export const CampaignUpdateSchema = z.object({
	id: z.string(),
	campaignId: z.string(),
});

export const NewCharacterSchema = z.object({
	fullname: z.string(),
	bio: BioSchema,
	path: PathSchema,
	status: StatusSchema,
	masteries: MasteriesSchema,
	variables: VariablesSchema,
	profile: StatisticsSchema,
	specifics: SpecificsSchema,
	equipment: InventorySchema,
});

export type NewCharacter = z.infer<typeof NewCharacterSchema>;
