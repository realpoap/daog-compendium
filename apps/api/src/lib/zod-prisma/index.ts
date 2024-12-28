import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','isOwner','role','createdAt']);

export const CreatureScalarFieldEnumSchema = z.enum(['id','fullname','name','rank','isBoss','type','subtype','alignment','size','createdAt','updatedAt','level','attack','attackBonus','defense','defenseBonus','ranged','rangedBonus','health','armor','perception','perceptionBonus','magic','spirit','glory','loot','objects','flavor','description']);

export const AttributeScalarFieldEnumSchema = z.enum(['id','name','flavor','description','creatureId']);

export const ActionScalarFieldEnumSchema = z.enum(['id','name','action','type','flavor','description','damages','effects','heal','target','range','creatureId']);

export const SpellScalarFieldEnumSchema = z.enum(['id','number','titleGlaise','titleCommon','createdAt','updatedAt','level','type','cost','difficulty','casting','targetType','action','flavor','description','damages','heal','effects','range','duration','target','components']);

export const ComponentScalarFieldEnumSchema = z.enum(['id','quantity','name','description','weight','value','rarity','spells']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RoleSchema = z.enum(['VIEWER','EDITOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const TypeSchema = z.enum(['plant','demon','fae','insect','person','beast','monster','undead','wyrm','golem']);

export type TypeType = `${z.infer<typeof TypeSchema>}`

export const AlignmentSchema = z.enum(['saint','good','neutral','bad','evil']);

export type AlignmentType = `${z.infer<typeof AlignmentSchema>}`

export const ActionTypeSchema = z.enum(['main','limited','free','travel','epic']);

export type ActionTypeType = `${z.infer<typeof ActionTypeSchema>}`

export const CreatureSizeSchema = z.enum(['tiny','small','average','large','huge','gigantic']);

export type CreatureSizeType = `${z.infer<typeof CreatureSizeSchema>}`

export const SpellTypeSchema = z.enum(['mouflette','beast','nature','scourge','spirit','death','life','earth','fire','water','air','blood']);

export type SpellTypeType = `${z.infer<typeof SpellTypeSchema>}`

export const SpellActionSchema = z.enum(['charm','damage','heal','protect','enhance','link','create','transform','move','remove','puzzle']);

export type SpellActionType = `${z.infer<typeof SpellActionSchema>}`

export const SpellCastingSchema = z.enum(['instant','delayed','ritual','concentration','upkeep']);

export type SpellCastingType = `${z.infer<typeof SpellCastingSchema>}`

export const SpellTargetSchema = z.enum(['single','multiple','random','self','none']);

export type SpellTargetType = `${z.infer<typeof SpellTargetSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isOwner: z.boolean(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CREATURE SCHEMA
/////////////////////////////////////////

export const CreatureSchema = z.object({
  type: TypeSchema,
  alignment: AlignmentSchema,
  size: CreatureSizeSchema,
  id: z.string(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().nullable(),
  isBoss: z.boolean().nullable(),
  subtype: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().nullable(),
  health: z.number().int(),
  armor: z.number().int().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().nullable(),
  magic: z.number().int().nullable(),
  spirit: z.number().int().nullable(),
  glory: z.number().int().nullable(),
  loot: z.string().array(),
  objects: z.string().array(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
})

export type Creature = z.infer<typeof CreatureSchema>

/////////////////////////////////////////
// ATTRIBUTE SCHEMA
/////////////////////////////////////////

export const AttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
  creatureId: z.string().nullable(),
})

export type Attribute = z.infer<typeof AttributeSchema>

/////////////////////////////////////////
// ACTION SCHEMA
/////////////////////////////////////////

export const ActionSchema = z.object({
  action: ActionTypeSchema,
  id: z.string(),
  name: z.string(),
  type: z.string(),
  flavor: z.string().nullable(),
  description: z.string(),
  damages: z.string().nullable(),
  effects: z.string().nullable(),
  heal: z.string().nullable(),
  target: z.string().nullable(),
  range: z.string().nullable(),
  creatureId: z.string().nullable(),
})

export type Action = z.infer<typeof ActionSchema>

/////////////////////////////////////////
// SPELL SCHEMA
/////////////////////////////////////////

export const SpellSchema = z.object({
  type: SpellTypeSchema,
  casting: SpellCastingSchema.nullable(),
  targetType: SpellTargetSchema.nullable(),
  action: SpellActionSchema.nullable(),
  id: z.string(),
  number: z.number().int(),
  titleGlaise: z.string().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  level: z.number().int(),
  cost: z.number().int(),
  difficulty: z.number().int(),
  flavor: z.string().nullable(),
  description: z.string(),
  damages: z.string().nullable(),
  heal: z.string().nullable(),
  effects: z.string().nullable(),
  range: z.string().nullable(),
  duration: z.string().nullable(),
  target: z.string().nullable(),
  components: z.string().nullable(),
})

export type Spell = z.infer<typeof SpellSchema>

/////////////////////////////////////////
// COMPONENT SCHEMA
/////////////////////////////////////////

export const ComponentSchema = z.object({
  id: z.string(),
  quantity: z.number().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  rarity: z.string().nullable(),
  spells: z.string().array(),
})

export type Component = z.infer<typeof ComponentSchema>

/////////////////////////////////////////
// COMPOSITE TYPES
/////////////////////////////////////////
// CREATURE ATTRIBUTE
//------------------------------------------------------


/////////////////////////////////////////
// CREATURE ATTRIBUTE SCHEMA
/////////////////////////////////////////

export const CreatureAttributeSchema = z.object({
  name: z.string(),
  flavor: z.string().nullable(),
  Description: z.string().nullable(),
})

export type CreatureAttribute = z.infer<typeof CreatureAttributeSchema>
// ACTION LIST
//------------------------------------------------------


/////////////////////////////////////////
// ACTION LIST SCHEMA
/////////////////////////////////////////

export const ActionListSchema = z.object({
  main: z.number().int(),
  limited: z.number().int().nullable(),
  free: z.number().int().nullable(),
  travel: z.number().int().nullable(),
  epic: z.number().int(),
})

export type ActionList = z.infer<typeof ActionListSchema>
// CREATURE ACTIONS
//------------------------------------------------------


/////////////////////////////////////////
// CREATURE ACTIONS SCHEMA
/////////////////////////////////////////

export const CreatureActionsSchema = z.object({
  action: ActionTypeSchema,
  name: z.string(),
  type: z.string(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
  damages: z.string().nullable(),
  effects: z.string().nullable(),
  heal: z.string().nullable(),
  target: z.string().nullable(),
  range: z.string().nullable(),
})

export type CreatureActions = z.infer<typeof CreatureActionsSchema>
// STAT PROFIL
//------------------------------------------------------


/////////////////////////////////////////
// STAT PROFIL SCHEMA
/////////////////////////////////////////

export const StatProfilSchema = z.object({
  CEL: z.number().int(),
  AGI: z.number().int(),
  DEX: z.number().int(),
  STR: z.number().int(),
  END: z.number().int(),
  VIT: z.number().int(),
  COU: z.number().int(),
  INS: z.number().int(),
  SEN: z.number().int(),
  CHA: z.number().int(),
  SOC: z.number().int(),
  ERU: z.number().int(),
})

export type StatProfil = z.infer<typeof StatProfilSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  isOwner: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

// CREATURE
//------------------------------------------------------

export const CreatureIncludeSchema: z.ZodType<Prisma.CreatureInclude> = z.object({
}).strict()

export const CreatureArgsSchema: z.ZodType<Prisma.CreatureDefaultArgs> = z.object({
  select: z.lazy(() => CreatureSelectSchema).optional(),
  include: z.lazy(() => CreatureIncludeSchema).optional(),
}).strict();

export const CreatureCountOutputTypeArgsSchema: z.ZodType<Prisma.CreatureCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CreatureCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CreatureCountOutputTypeSelectSchema: z.ZodType<Prisma.CreatureCountOutputTypeSelect> = z.object({
  attributes: z.boolean().optional(),
  actions: z.boolean().optional(),
}).strict();

export const CreatureSelectSchema: z.ZodType<Prisma.CreatureSelect> = z.object({
  id: z.boolean().optional(),
  fullname: z.boolean().optional(),
  name: z.boolean().optional(),
  rank: z.boolean().optional(),
  isBoss: z.boolean().optional(),
  type: z.boolean().optional(),
  subtype: z.boolean().optional(),
  alignment: z.boolean().optional(),
  size: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  level: z.boolean().optional(),
  attack: z.boolean().optional(),
  attackBonus: z.boolean().optional(),
  defense: z.boolean().optional(),
  defenseBonus: z.boolean().optional(),
  ranged: z.boolean().optional(),
  rangedBonus: z.boolean().optional(),
  health: z.boolean().optional(),
  armor: z.boolean().optional(),
  perception: z.boolean().optional(),
  perceptionBonus: z.boolean().optional(),
  magic: z.boolean().optional(),
  spirit: z.boolean().optional(),
  glory: z.boolean().optional(),
  stats: z.union([z.boolean(),z.lazy(() => StatProfilArgsSchema)]).optional(),
  loot: z.boolean().optional(),
  objects: z.boolean().optional(),
  actionList: z.union([z.boolean(),z.lazy(() => ActionListArgsSchema)]).optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  attributes: z.union([z.boolean(),z.lazy(() => AttributeArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => ActionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CreatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ATTRIBUTE
//------------------------------------------------------

export const AttributeIncludeSchema: z.ZodType<Prisma.AttributeInclude> = z.object({
}).strict()

export const AttributeArgsSchema: z.ZodType<Prisma.AttributeDefaultArgs> = z.object({
  select: z.lazy(() => AttributeSelectSchema).optional(),
  include: z.lazy(() => AttributeIncludeSchema).optional(),
}).strict();

export const AttributeSelectSchema: z.ZodType<Prisma.AttributeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  creatureId: z.boolean().optional(),
  Creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
}).strict()

// ACTION
//------------------------------------------------------

export const ActionIncludeSchema: z.ZodType<Prisma.ActionInclude> = z.object({
}).strict()

export const ActionArgsSchema: z.ZodType<Prisma.ActionDefaultArgs> = z.object({
  select: z.lazy(() => ActionSelectSchema).optional(),
  include: z.lazy(() => ActionIncludeSchema).optional(),
}).strict();

export const ActionSelectSchema: z.ZodType<Prisma.ActionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  action: z.boolean().optional(),
  type: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  damages: z.boolean().optional(),
  effects: z.boolean().optional(),
  heal: z.boolean().optional(),
  target: z.boolean().optional(),
  range: z.boolean().optional(),
  creatureId: z.boolean().optional(),
  Creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
}).strict()

// SPELL
//------------------------------------------------------

export const SpellArgsSchema: z.ZodType<Prisma.SpellDefaultArgs> = z.object({
  select: z.lazy(() => SpellSelectSchema).optional(),
}).strict();

export const SpellSelectSchema: z.ZodType<Prisma.SpellSelect> = z.object({
  id: z.boolean().optional(),
  number: z.boolean().optional(),
  titleGlaise: z.boolean().optional(),
  titleCommon: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  level: z.boolean().optional(),
  type: z.boolean().optional(),
  cost: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  casting: z.boolean().optional(),
  targetType: z.boolean().optional(),
  action: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  damages: z.boolean().optional(),
  heal: z.boolean().optional(),
  effects: z.boolean().optional(),
  range: z.boolean().optional(),
  duration: z.boolean().optional(),
  target: z.boolean().optional(),
  components: z.boolean().optional(),
}).strict()

// COMPONENT
//------------------------------------------------------

export const ComponentArgsSchema: z.ZodType<Prisma.ComponentDefaultArgs> = z.object({
  select: z.lazy(() => ComponentSelectSchema).optional(),
}).strict();

export const ComponentSelectSchema: z.ZodType<Prisma.ComponentSelect> = z.object({
  id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  rarity: z.boolean().optional(),
  spells: z.boolean().optional(),
}).strict()

// STAT PROFIL
//------------------------------------------------------

export const StatProfilArgsSchema: z.ZodType<Prisma.StatProfilDefaultArgs> = z.object({
  select: z.lazy(() => StatProfilSelectSchema).optional(),
}).strict();

export const StatProfilSelectSchema: z.ZodType<Prisma.StatProfilSelect> = z.object({
  CEL: z.boolean().optional(),
  AGI: z.boolean().optional(),
  DEX: z.boolean().optional(),
  STR: z.boolean().optional(),
  END: z.boolean().optional(),
  VIT: z.boolean().optional(),
  COU: z.boolean().optional(),
  INS: z.boolean().optional(),
  SEN: z.boolean().optional(),
  CHA: z.boolean().optional(),
  SOC: z.boolean().optional(),
  ERU: z.boolean().optional(),
}).strict()

// ACTION LIST
//------------------------------------------------------

export const ActionListArgsSchema: z.ZodType<Prisma.ActionListDefaultArgs> = z.object({
  select: z.lazy(() => ActionListSelectSchema).optional(),
}).strict();

export const ActionListSelectSchema: z.ZodType<Prisma.ActionListSelect> = z.object({
  main: z.boolean().optional(),
  limited: z.boolean().optional(),
  free: z.boolean().optional(),
  travel: z.boolean().optional(),
  epic: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOwner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isOwner: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
    password: z.string(),
  }),
  z.object({
    id: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    email: z.string(),
    password: z.string(),
  }),
  z.object({
    email: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    password: z.string(),
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
  z.object({
    password: z.string(),
  }),
  z.object({
    name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  name_password: z.lazy(() => UserNamePasswordCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOwner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isOwner: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isOwner: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CreatureWhereInputSchema: z.ZodType<Prisma.CreatureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureWhereInputSchema),z.lazy(() => CreatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureWhereInputSchema),z.lazy(() => CreatureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isBoss: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTypeFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentFilterSchema),z.lazy(() => AlignmentSchema) ]).optional(),
  size: z.union([ z.lazy(() => EnumCreatureSizeFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attackBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  defenseBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  ranged: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rangedBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  health: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  perceptionBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  glory: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCompositeFilterSchema),z.lazy(() => StatProfilObjectEqualityInputSchema) ]).optional(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCompositeFilterSchema),z.lazy(() => ActionListObjectEqualityInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  attributes: z.lazy(() => AttributeListRelationFilterSchema).optional(),
  actions: z.lazy(() => ActionListRelationFilterSchema).optional()
}).strict();

export const CreatureOrderByWithRelationInputSchema: z.ZodType<Prisma.CreatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  isBoss: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional(),
  stats: z.lazy(() => StatProfilOrderByInputSchema).optional(),
  loot: z.lazy(() => SortOrderSchema).optional(),
  objects: z.lazy(() => SortOrderSchema).optional(),
  actionList: z.lazy(() => ActionListOrderByInputSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  attributes: z.lazy(() => AttributeOrderByRelationAggregateInputSchema).optional(),
  actions: z.lazy(() => ActionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CreatureWhereUniqueInputSchema: z.ZodType<Prisma.CreatureWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    fullname: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    fullname: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  fullname: z.string().optional(),
  AND: z.union([ z.lazy(() => CreatureWhereInputSchema),z.lazy(() => CreatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureWhereInputSchema),z.lazy(() => CreatureWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isBoss: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTypeFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentFilterSchema),z.lazy(() => AlignmentSchema) ]).optional(),
  size: z.union([ z.lazy(() => EnumCreatureSizeFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  attackBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  defenseBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  ranged: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  rangedBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  health: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  perceptionBonus: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  glory: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCompositeFilterSchema),z.lazy(() => StatProfilObjectEqualityInputSchema) ]).optional(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCompositeFilterSchema),z.lazy(() => ActionListObjectEqualityInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  attributes: z.lazy(() => AttributeListRelationFilterSchema).optional(),
  actions: z.lazy(() => ActionListRelationFilterSchema).optional()
}).strict());

export const CreatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.CreatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  isBoss: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional(),
  loot: z.lazy(() => SortOrderSchema).optional(),
  objects: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CreatureCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CreatureAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CreatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CreatureMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CreatureSumOrderByAggregateInputSchema).optional()
}).strict();

export const CreatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CreatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isBoss: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTypeWithAggregatesFilterSchema),z.lazy(() => TypeSchema) ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentWithAggregatesFilterSchema),z.lazy(() => AlignmentSchema) ]).optional(),
  size: z.union([ z.lazy(() => EnumCreatureSizeWithAggregatesFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  attackBonus: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  defense: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  defenseBonus: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ranged: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rangedBonus: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  health: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  perceptionBonus: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  glory: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AttributeWhereInputSchema: z.ZodType<Prisma.AttributeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AttributeWhereInputSchema),z.lazy(() => AttributeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttributeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttributeWhereInputSchema),z.lazy(() => AttributeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeOrderByWithRelationInputSchema: z.ZodType<Prisma.AttributeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  Creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const AttributeWhereUniqueInputSchema: z.ZodType<Prisma.AttributeWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => AttributeWhereInputSchema),z.lazy(() => AttributeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttributeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttributeWhereInputSchema),z.lazy(() => AttributeWhereInputSchema).array() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AttributeOrderByWithAggregationInputSchema: z.ZodType<Prisma.AttributeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AttributeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AttributeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AttributeMinOrderByAggregateInputSchema).optional()
}).strict();

export const AttributeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AttributeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AttributeScalarWhereWithAggregatesInputSchema),z.lazy(() => AttributeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttributeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttributeScalarWhereWithAggregatesInputSchema),z.lazy(() => AttributeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ActionWhereInputSchema: z.ZodType<Prisma.ActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ActionOrderByWithRelationInputSchema: z.ZodType<Prisma.ActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  Creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const ActionWhereUniqueInputSchema: z.ZodType<Prisma.ActionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeWithAggregatesFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SpellWhereInputSchema: z.ZodType<Prisma.SpellWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  titleGlaise: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  titleCommon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellTypeFilterSchema),z.lazy(() => SpellTypeSchema) ]).optional(),
  cost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  difficulty: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  casting: z.union([ z.lazy(() => EnumSpellCastingNullableFilterSchema),z.lazy(() => SpellCastingSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => EnumSpellTargetNullableFilterSchema),z.lazy(() => SpellTargetSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumSpellActionNullableFilterSchema),z.lazy(() => SpellActionSchema) ]).optional().nullable(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  components: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SpellOrderByWithRelationInputSchema: z.ZodType<Prisma.SpellOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  casting: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellWhereUniqueInputSchema: z.ZodType<Prisma.SpellWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    number: z.number().int()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    number: z.number().int(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  number: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellWhereInputSchema),z.lazy(() => SpellWhereInputSchema).array() ]).optional(),
  titleGlaise: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  titleCommon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellTypeFilterSchema),z.lazy(() => SpellTypeSchema) ]).optional(),
  cost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  difficulty: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  casting: z.union([ z.lazy(() => EnumSpellCastingNullableFilterSchema),z.lazy(() => SpellCastingSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => EnumSpellTargetNullableFilterSchema),z.lazy(() => SpellTargetSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumSpellActionNullableFilterSchema),z.lazy(() => SpellActionSchema) ]).optional().nullable(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  components: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const SpellOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpellOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  casting: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpellCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpellAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpellMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpellMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpellSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpellScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpellScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpellScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpellScalarWhereWithAggregatesInputSchema),z.lazy(() => SpellScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  titleGlaise: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  titleCommon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellTypeWithAggregatesFilterSchema),z.lazy(() => SpellTypeSchema) ]).optional(),
  cost: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  difficulty: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  casting: z.union([ z.lazy(() => EnumSpellCastingNullableWithAggregatesFilterSchema),z.lazy(() => SpellCastingSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => EnumSpellTargetNullableWithAggregatesFilterSchema),z.lazy(() => SpellTargetSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumSpellActionNullableWithAggregatesFilterSchema),z.lazy(() => SpellActionSchema) ]).optional().nullable(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  components: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ComponentWhereInputSchema: z.ZodType<Prisma.ComponentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spells: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const ComponentOrderByWithRelationInputSchema: z.ZodType<Prisma.ComponentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentWhereUniqueInputSchema: z.ZodType<Prisma.ComponentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  spells: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict());

export const ComponentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ComponentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ComponentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ComponentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ComponentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ComponentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ComponentSumOrderByAggregateInputSchema).optional()
}).strict();

export const ComponentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ComponentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ComponentScalarWhereWithAggregatesInputSchema),z.lazy(() => ComponentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentScalarWhereWithAggregatesInputSchema),z.lazy(() => ComponentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  spells: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isOwner: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isOwner: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOwner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOwner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isOwner: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOwner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOwner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CreatureCreateInputSchema: z.ZodType<Prisma.CreatureCreateInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  attributes: z.lazy(() => AttributeCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => ActionCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  attributes: z.lazy(() => AttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => ActionUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUpdateInputSchema: z.ZodType<Prisma.CreatureUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => AttributeUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => ActionUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => AttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => ActionUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateManyInputSchema: z.ZodType<Prisma.CreatureCreateManyInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const CreatureUpdateManyMutationInputSchema: z.ZodType<Prisma.CreatureUpdateManyMutationInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateManyInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeCreateInputSchema: z.ZodType<Prisma.AttributeCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  Creature: z.lazy(() => CreatureCreateNestedOneWithoutAttributesInputSchema).optional()
}).strict();

export const AttributeUncheckedCreateInputSchema: z.ZodType<Prisma.AttributeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const AttributeUpdateInputSchema: z.ZodType<Prisma.AttributeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Creature: z.lazy(() => CreatureUpdateOneWithoutAttributesNestedInputSchema).optional()
}).strict();

export const AttributeUncheckedUpdateInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeCreateManyInputSchema: z.ZodType<Prisma.AttributeCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const AttributeUpdateManyMutationInputSchema: z.ZodType<Prisma.AttributeUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionCreateInputSchema: z.ZodType<Prisma.ActionCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  Creature: z.lazy(() => CreatureCreateNestedOneWithoutActionsInputSchema).optional()
}).strict();

export const ActionUncheckedCreateInputSchema: z.ZodType<Prisma.ActionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const ActionUpdateInputSchema: z.ZodType<Prisma.ActionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Creature: z.lazy(() => CreatureUpdateOneWithoutActionsNestedInputSchema).optional()
}).strict();

export const ActionUncheckedUpdateInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionCreateManyInputSchema: z.ZodType<Prisma.ActionCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const ActionUpdateManyMutationInputSchema: z.ZodType<Prisma.ActionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellCreateInputSchema: z.ZodType<Prisma.SpellCreateInput> = z.object({
  id: z.string().optional(),
  number: z.number().int(),
  titleGlaise: z.string().optional().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  type: z.lazy(() => SpellTypeSchema),
  cost: z.number().int(),
  difficulty: z.number().int(),
  casting: z.lazy(() => SpellCastingSchema).optional().nullable(),
  targetType: z.lazy(() => SpellTargetSchema).optional().nullable(),
  action: z.lazy(() => SpellActionSchema).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  components: z.string().optional().nullable()
}).strict();

export const SpellUncheckedCreateInputSchema: z.ZodType<Prisma.SpellUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  number: z.number().int(),
  titleGlaise: z.string().optional().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  type: z.lazy(() => SpellTypeSchema),
  cost: z.number().int(),
  difficulty: z.number().int(),
  casting: z.lazy(() => SpellCastingSchema).optional().nullable(),
  targetType: z.lazy(() => SpellTargetSchema).optional().nullable(),
  action: z.lazy(() => SpellActionSchema).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  components: z.string().optional().nullable()
}).strict();

export const SpellUpdateInputSchema: z.ZodType<Prisma.SpellUpdateInput> = z.object({
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  titleGlaise: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  titleCommon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => EnumSpellTypeFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  casting: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NullableEnumSpellCastingFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NullableEnumSpellTargetFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NullableEnumSpellActionFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  components: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellUncheckedUpdateInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateInput> = z.object({
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  titleGlaise: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  titleCommon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => EnumSpellTypeFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  casting: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NullableEnumSpellCastingFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NullableEnumSpellTargetFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NullableEnumSpellActionFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  components: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellCreateManyInputSchema: z.ZodType<Prisma.SpellCreateManyInput> = z.object({
  id: z.string().optional(),
  number: z.number().int(),
  titleGlaise: z.string().optional().nullable(),
  titleCommon: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  type: z.lazy(() => SpellTypeSchema),
  cost: z.number().int(),
  difficulty: z.number().int(),
  casting: z.lazy(() => SpellCastingSchema).optional().nullable(),
  targetType: z.lazy(() => SpellTargetSchema).optional().nullable(),
  action: z.lazy(() => SpellActionSchema).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  components: z.string().optional().nullable()
}).strict();

export const SpellUpdateManyMutationInputSchema: z.ZodType<Prisma.SpellUpdateManyMutationInput> = z.object({
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  titleGlaise: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  titleCommon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => EnumSpellTypeFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  casting: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NullableEnumSpellCastingFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NullableEnumSpellTargetFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NullableEnumSpellActionFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  components: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpellUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpellUncheckedUpdateManyInput> = z.object({
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  titleGlaise: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  titleCommon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => EnumSpellTypeFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  casting: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NullableEnumSpellCastingFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetType: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NullableEnumSpellTargetFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NullableEnumSpellActionFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  components: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ComponentCreateInputSchema: z.ZodType<Prisma.ComponentCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentCreatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentUncheckedCreateInputSchema: z.ZodType<Prisma.ComponentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentCreatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentUpdateInputSchema: z.ZodType<Prisma.ComponentUpdateInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentUpdatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentUncheckedUpdateInputSchema: z.ZodType<Prisma.ComponentUncheckedUpdateInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentUpdatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentCreateManyInputSchema: z.ZodType<Prisma.ComponentCreateManyInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentCreatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentUpdateManyMutationInputSchema: z.ZodType<Prisma.ComponentUpdateManyMutationInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentUpdatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ComponentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ComponentUncheckedUpdateManyInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spells: z.union([ z.lazy(() => ComponentUpdatespellsInputSchema),z.string().array() ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserNamePasswordCompoundUniqueInputSchema: z.ZodType<Prisma.UserNamePasswordCompoundUniqueInput> = z.object({
  name: z.string(),
  password: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isOwner: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isOwner: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isOwner: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumTypeFilterSchema: z.ZodType<Prisma.EnumTypeFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeFilterSchema) ]).optional(),
}).strict();

export const EnumAlignmentFilterSchema: z.ZodType<Prisma.EnumAlignmentFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional(),
  in: z.lazy(() => AlignmentSchema).array().optional(),
  notIn: z.lazy(() => AlignmentSchema).array().optional(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentFilterSchema) ]).optional(),
}).strict();

export const EnumCreatureSizeFilterSchema: z.ZodType<Prisma.EnumCreatureSizeFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional(),
  in: z.lazy(() => CreatureSizeSchema).array().optional(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const StatProfilCompositeFilterSchema: z.ZodType<Prisma.StatProfilCompositeFilter> = z.object({
  equals: z.lazy(() => StatProfilObjectEqualityInputSchema).optional(),
  is: z.lazy(() => StatProfilWhereInputSchema).optional(),
  isNot: z.lazy(() => StatProfilWhereInputSchema).optional()
}).strict();

export const StatProfilObjectEqualityInputSchema: z.ZodType<Prisma.StatProfilObjectEqualityInput> = z.object({
  CEL: z.number(),
  AGI: z.number(),
  DEX: z.number(),
  STR: z.number(),
  END: z.number(),
  VIT: z.number(),
  COU: z.number(),
  INS: z.number(),
  SEN: z.number(),
  CHA: z.number(),
  SOC: z.number(),
  ERU: z.number()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const ActionListNullableCompositeFilterSchema: z.ZodType<Prisma.ActionListNullableCompositeFilter> = z.object({
  equals: z.lazy(() => ActionListObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => ActionListWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ActionListWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const ActionListObjectEqualityInputSchema: z.ZodType<Prisma.ActionListObjectEqualityInput> = z.object({
  main: z.number(),
  limited: z.number().optional().nullable(),
  free: z.number().optional().nullable(),
  travel: z.number().optional().nullable(),
  epic: z.number()
}).strict();

export const AttributeListRelationFilterSchema: z.ZodType<Prisma.AttributeListRelationFilter> = z.object({
  every: z.lazy(() => AttributeWhereInputSchema).optional(),
  some: z.lazy(() => AttributeWhereInputSchema).optional(),
  none: z.lazy(() => AttributeWhereInputSchema).optional()
}).strict();

export const ActionListRelationFilterSchema: z.ZodType<Prisma.ActionListRelationFilter> = z.object({
  every: z.lazy(() => ActionWhereInputSchema).optional(),
  some: z.lazy(() => ActionWhereInputSchema).optional(),
  none: z.lazy(() => ActionWhereInputSchema).optional()
}).strict();

export const StatProfilOrderByInputSchema: z.ZodType<Prisma.StatProfilOrderByInput> = z.object({
  CEL: z.lazy(() => SortOrderSchema).optional(),
  AGI: z.lazy(() => SortOrderSchema).optional(),
  DEX: z.lazy(() => SortOrderSchema).optional(),
  STR: z.lazy(() => SortOrderSchema).optional(),
  END: z.lazy(() => SortOrderSchema).optional(),
  VIT: z.lazy(() => SortOrderSchema).optional(),
  COU: z.lazy(() => SortOrderSchema).optional(),
  INS: z.lazy(() => SortOrderSchema).optional(),
  SEN: z.lazy(() => SortOrderSchema).optional(),
  CHA: z.lazy(() => SortOrderSchema).optional(),
  SOC: z.lazy(() => SortOrderSchema).optional(),
  ERU: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListOrderByInputSchema: z.ZodType<Prisma.ActionListOrderByInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  epic: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttributeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AttributeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  isBoss: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional(),
  loot: z.lazy(() => SortOrderSchema).optional(),
  objects: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureAvgOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  isBoss: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  isBoss: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  alignment: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureSumOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureSumOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  attackBonus: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  defenseBonus: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  rangedBonus: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  perceptionBonus: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  glory: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTypeFilterSchema).optional()
}).strict();

export const EnumAlignmentWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAlignmentWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional(),
  in: z.lazy(() => AlignmentSchema).array().optional(),
  notIn: z.lazy(() => AlignmentSchema).array().optional(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlignmentFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlignmentFilterSchema).optional()
}).strict();

export const EnumCreatureSizeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCreatureSizeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional(),
  in: z.lazy(() => CreatureSizeSchema).array().optional(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCreatureSizeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCreatureSizeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const CreatureNullableScalarRelationFilterSchema: z.ZodType<Prisma.CreatureNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CreatureWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CreatureWhereInputSchema).optional().nullable()
}).strict();

export const AttributeCountOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttributeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttributeMinOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumActionTypeFilterSchema: z.ZodType<Prisma.EnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export const ActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActionTypeFilterSchema).optional()
}).strict();

export const EnumSpellTypeFilterSchema: z.ZodType<Prisma.EnumSpellTypeFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeFilterSchema) ]).optional(),
}).strict();

export const EnumSpellCastingNullableFilterSchema: z.ZodType<Prisma.EnumSpellCastingNullableFilter> = z.object({
  equals: z.lazy(() => SpellCastingSchema).optional().nullable(),
  in: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NestedEnumSpellCastingNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumSpellTargetNullableFilterSchema: z.ZodType<Prisma.EnumSpellTargetNullableFilter> = z.object({
  equals: z.lazy(() => SpellTargetSchema).optional().nullable(),
  in: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NestedEnumSpellTargetNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumSpellActionNullableFilterSchema: z.ZodType<Prisma.EnumSpellActionNullableFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional().nullable(),
  in: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const SpellCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpellCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  casting: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpellAvgOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpellMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  casting: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpellMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  titleGlaise: z.lazy(() => SortOrderSchema).optional(),
  titleCommon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  casting: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  components: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpellSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpellSumOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSpellTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpellTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional()
}).strict();

export const EnumSpellCastingNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpellCastingNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellCastingSchema).optional().nullable(),
  in: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NestedEnumSpellCastingNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellCastingNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellCastingNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumSpellTargetNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpellTargetNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTargetSchema).optional().nullable(),
  in: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NestedEnumSpellTargetNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTargetNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTargetNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumSpellActionNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSpellActionNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional().nullable(),
  in: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellActionNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellActionNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const ComponentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  spells: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StatProfilCreateEnvelopeInputSchema: z.ZodType<Prisma.StatProfilCreateEnvelopeInput> = z.object({
  set: z.lazy(() => StatProfilCreateInputSchema).optional()
}).strict();

export const StatProfilCreateInputSchema: z.ZodType<Prisma.StatProfilCreateInput> = z.object({
  CEL: z.number(),
  AGI: z.number(),
  DEX: z.number(),
  STR: z.number(),
  END: z.number(),
  VIT: z.number(),
  COU: z.number(),
  INS: z.number(),
  SEN: z.number(),
  CHA: z.number(),
  SOC: z.number(),
  ERU: z.number()
}).strict();

export const CreatureCreatelootInputSchema: z.ZodType<Prisma.CreatureCreatelootInput> = z.object({
  set: z.string().array()
}).strict();

export const CreatureCreateobjectsInputSchema: z.ZodType<Prisma.CreatureCreateobjectsInput> = z.object({
  set: z.string().array()
}).strict();

export const ActionListNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.ActionListNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => ActionListCreateInputSchema).optional().nullable()
}).strict();

export const ActionListCreateInputSchema: z.ZodType<Prisma.ActionListCreateInput> = z.object({
  main: z.number().optional(),
  limited: z.number().optional().nullable(),
  free: z.number().optional().nullable(),
  travel: z.number().optional().nullable(),
  epic: z.number().optional()
}).strict();

export const AttributeCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ActionCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.ActionCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionCreateWithoutCreatureInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AttributeUncheckedCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUncheckedCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ActionUncheckedCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUncheckedCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionCreateWithoutCreatureInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const EnumTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TypeSchema).optional()
}).strict();

export const EnumAlignmentFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAlignmentFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AlignmentSchema).optional()
}).strict();

export const EnumCreatureSizeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCreatureSizeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CreatureSizeSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
}).strict();

export const StatProfilUpdateEnvelopeInputSchema: z.ZodType<Prisma.StatProfilUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => StatProfilCreateInputSchema).optional(),
  update: z.lazy(() => StatProfilUpdateInputSchema).optional()
}).strict();

export const CreatureUpdatelootInputSchema: z.ZodType<Prisma.CreatureUpdatelootInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const CreatureUpdateobjectsInputSchema: z.ZodType<Prisma.CreatureUpdateobjectsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ActionListNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.ActionListNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => ActionListCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => ActionListUpsertInputSchema).optional(),
  unset: z.boolean().optional()
}).strict();

export const AttributeUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.AttributeUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AttributeUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => AttributeUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AttributeUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => AttributeUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AttributeUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => AttributeUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AttributeScalarWhereInputSchema),z.lazy(() => AttributeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ActionUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.ActionUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionCreateWithoutCreatureInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ActionUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => ActionUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ActionUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => ActionUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ActionUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => ActionUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => AttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AttributeUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => AttributeUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AttributeWhereUniqueInputSchema),z.lazy(() => AttributeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AttributeUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => AttributeUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AttributeUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => AttributeUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AttributeScalarWhereInputSchema),z.lazy(() => AttributeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ActionUncheckedUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionCreateWithoutCreatureInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => ActionCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ActionUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => ActionUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ActionUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => ActionUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ActionUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => ActionUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CreatureCreateNestedOneWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureCreateNestedOneWithoutAttributesInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutAttributesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutAttributesInputSchema).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional()
}).strict();

export const CreatureUpdateOneWithoutAttributesNestedInputSchema: z.ZodType<Prisma.CreatureUpdateOneWithoutAttributesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutAttributesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutAttributesInputSchema).optional(),
  upsert: z.lazy(() => CreatureUpsertWithoutAttributesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CreatureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CreatureUpdateToOneWithWhereWithoutAttributesInputSchema),z.lazy(() => CreatureUpdateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutAttributesInputSchema) ]).optional(),
}).strict();

export const CreatureCreateNestedOneWithoutActionsInputSchema: z.ZodType<Prisma.CreatureCreateNestedOneWithoutActionsInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional()
}).strict();

export const EnumActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActionTypeSchema).optional()
}).strict();

export const CreatureUpdateOneWithoutActionsNestedInputSchema: z.ZodType<Prisma.CreatureUpdateOneWithoutActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutActionsInputSchema).optional(),
  upsert: z.lazy(() => CreatureUpsertWithoutActionsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CreatureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CreatureUpdateToOneWithWhereWithoutActionsInputSchema),z.lazy(() => CreatureUpdateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionsInputSchema) ]).optional(),
}).strict();

export const EnumSpellTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSpellTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellTypeSchema).optional()
}).strict();

export const NullableEnumSpellCastingFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumSpellCastingFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellCastingSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableEnumSpellTargetFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumSpellTargetFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellTargetSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableEnumSpellActionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumSpellActionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellActionSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const ComponentCreatespellsInputSchema: z.ZodType<Prisma.ComponentCreatespellsInput> = z.object({
  set: z.string().array()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
}).strict();

export const ComponentUpdatespellsInputSchema: z.ZodType<Prisma.ComponentUpdatespellsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumTypeFilterSchema: z.ZodType<Prisma.NestedEnumTypeFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAlignmentFilterSchema: z.ZodType<Prisma.NestedEnumAlignmentFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional(),
  in: z.lazy(() => AlignmentSchema).array().optional(),
  notIn: z.lazy(() => AlignmentSchema).array().optional(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCreatureSizeFilterSchema: z.ZodType<Prisma.NestedEnumCreatureSizeFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional(),
  in: z.lazy(() => CreatureSizeSchema).array().optional(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const StatProfilWhereInputSchema: z.ZodType<Prisma.StatProfilWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatProfilWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  CEL: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AGI: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DEX: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  STR: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  END: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  VIT: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  COU: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  INS: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  SEN: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CHA: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  SOC: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ERU: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ActionListWhereInputSchema: z.ZodType<Prisma.ActionListWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  limited: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  free: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  travel: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  epic: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional(),
  in: z.lazy(() => TypeSchema).array().optional(),
  notIn: z.lazy(() => TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTypeFilterSchema).optional()
}).strict();

export const NestedEnumAlignmentWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAlignmentWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional(),
  in: z.lazy(() => AlignmentSchema).array().optional(),
  notIn: z.lazy(() => AlignmentSchema).array().optional(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlignmentFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlignmentFilterSchema).optional()
}).strict();

export const NestedEnumCreatureSizeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCreatureSizeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional(),
  in: z.lazy(() => CreatureSizeSchema).array().optional(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCreatureSizeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCreatureSizeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumActionTypeFilterSchema: z.ZodType<Prisma.NestedEnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActionTypeFilterSchema).optional()
}).strict();

export const NestedEnumSpellTypeFilterSchema: z.ZodType<Prisma.NestedEnumSpellTypeFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSpellCastingNullableFilterSchema: z.ZodType<Prisma.NestedEnumSpellCastingNullableFilter> = z.object({
  equals: z.lazy(() => SpellCastingSchema).optional().nullable(),
  in: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NestedEnumSpellCastingNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumSpellTargetNullableFilterSchema: z.ZodType<Prisma.NestedEnumSpellTargetNullableFilter> = z.object({
  equals: z.lazy(() => SpellTargetSchema).optional().nullable(),
  in: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NestedEnumSpellTargetNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumSpellActionNullableFilterSchema: z.ZodType<Prisma.NestedEnumSpellActionNullableFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional().nullable(),
  in: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumSpellTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpellTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTypeSchema).optional(),
  in: z.lazy(() => SpellTypeSchema).array().optional(),
  notIn: z.lazy(() => SpellTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellTypeSchema),z.lazy(() => NestedEnumSpellTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTypeFilterSchema).optional()
}).strict();

export const NestedEnumSpellCastingNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpellCastingNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellCastingSchema).optional().nullable(),
  in: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellCastingSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellCastingSchema),z.lazy(() => NestedEnumSpellCastingNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellCastingNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellCastingNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumSpellTargetNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpellTargetNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellTargetSchema).optional().nullable(),
  in: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellTargetSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellTargetSchema),z.lazy(() => NestedEnumSpellTargetNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellTargetNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellTargetNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumSpellActionNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSpellActionNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional().nullable(),
  in: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  notIn: z.lazy(() => SpellActionSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSpellActionNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSpellActionNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const AttributeCreateWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const AttributeUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const AttributeCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => AttributeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const AttributeCreateManyCreatureInputEnvelopeSchema: z.ZodType<Prisma.AttributeCreateManyCreatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AttributeCreateManyCreatureInputSchema),z.lazy(() => AttributeCreateManyCreatureInputSchema).array() ]),
}).strict();

export const ActionCreateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.ActionCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const ActionCreateManyCreatureInputEnvelopeSchema: z.ZodType<Prisma.ActionCreateManyCreatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ActionCreateManyCreatureInputSchema),z.lazy(() => ActionCreateManyCreatureInputSchema).array() ]),
}).strict();

export const StatProfilUpdateInputSchema: z.ZodType<Prisma.StatProfilUpdateInput> = z.object({
  CEL: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionListUpsertInputSchema: z.ZodType<Prisma.ActionListUpsertInput> = z.object({
  set: z.lazy(() => ActionListCreateInputSchema).nullable(),
  update: z.lazy(() => ActionListUpdateInputSchema)
}).strict();

export const AttributeUpsertWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUpsertWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => AttributeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AttributeUpdateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => AttributeCreateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const AttributeUpdateWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUpdateWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => AttributeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AttributeUpdateWithoutCreatureInputSchema),z.lazy(() => AttributeUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const AttributeUpdateManyWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUpdateManyWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => AttributeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AttributeUpdateManyMutationInputSchema),z.lazy(() => AttributeUncheckedUpdateManyWithoutCreatureInputSchema) ]),
}).strict();

export const AttributeScalarWhereInputSchema: z.ZodType<Prisma.AttributeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AttributeScalarWhereInputSchema),z.lazy(() => AttributeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttributeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttributeScalarWhereInputSchema),z.lazy(() => AttributeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ActionUpsertWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUpsertWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ActionUpdateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => ActionCreateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const ActionUpdateWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUpdateWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ActionUpdateWithoutCreatureInputSchema),z.lazy(() => ActionUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const ActionUpdateManyWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUpdateManyWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ActionUpdateManyMutationInputSchema),z.lazy(() => ActionUncheckedUpdateManyWithoutCreatureInputSchema) ]),
}).strict();

export const ActionScalarWhereInputSchema: z.ZodType<Prisma.ActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CreatureCreateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureCreateWithoutAttributesInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actions: z.lazy(() => ActionCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutAttributesInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actions: z.lazy(() => ActionUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureCreateOrConnectWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureCreateOrConnectWithoutAttributesInput> = z.object({
  where: z.lazy(() => CreatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureCreateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutAttributesInputSchema) ]),
}).strict();

export const CreatureUpsertWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUpsertWithoutAttributesInput> = z.object({
  update: z.union([ z.lazy(() => CreatureUpdateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutAttributesInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureCreateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutAttributesInputSchema) ]),
  where: z.lazy(() => CreatureWhereInputSchema).optional()
}).strict();

export const CreatureUpdateToOneWithWhereWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUpdateToOneWithWhereWithoutAttributesInput> = z.object({
  where: z.lazy(() => CreatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CreatureUpdateWithoutAttributesInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutAttributesInputSchema) ]),
}).strict();

export const CreatureUpdateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUpdateWithoutAttributesInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.lazy(() => ActionUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutAttributesInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.lazy(() => ActionUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  attributes: z.lazy(() => AttributeCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema),
  size: z.lazy(() => CreatureSizeSchema),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  attackBonus: z.number().int().optional().nullable(),
  defense: z.number().int(),
  defenseBonus: z.number().int().optional().nullable(),
  ranged: z.number().int(),
  rangedBonus: z.number().int().optional().nullable(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int(),
  perceptionBonus: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  glory: z.number().int().optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilCreateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  attributes: z.lazy(() => AttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureCreateOrConnectWithoutActionsInputSchema: z.ZodType<Prisma.CreatureCreateOrConnectWithoutActionsInput> = z.object({
  where: z.lazy(() => CreatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionsInputSchema) ]),
}).strict();

export const CreatureUpsertWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUpsertWithoutActionsInput> = z.object({
  update: z.union([ z.lazy(() => CreatureUpdateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionsInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionsInputSchema) ]),
  where: z.lazy(() => CreatureWhereInputSchema).optional()
}).strict();

export const CreatureUpdateToOneWithWhereWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUpdateToOneWithWhereWithoutActionsInput> = z.object({
  where: z.lazy(() => CreatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CreatureUpdateWithoutActionsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionsInputSchema) ]),
}).strict();

export const CreatureUpdateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUpdateWithoutActionsInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => AttributeUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutActionsInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => EnumTypeFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => EnumAlignmentFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attackBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defenseBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rangedBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  perceptionBonus: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  glory: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilUpdateEnvelopeInputSchema),z.lazy(() => StatProfilCreateInputSchema) ]).optional(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListNullableUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional().nullable(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => AttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const AttributeCreateManyCreatureInputSchema: z.ZodType<Prisma.AttributeCreateManyCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const ActionCreateManyCreatureInputSchema: z.ZodType<Prisma.ActionCreateManyCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionListUpdateInputSchema: z.ZodType<Prisma.ActionListUpdateInput> = z.object({
  main: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  free: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  travel: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  epic: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttributeUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeUncheckedUpdateManyWithoutCreatureInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateManyWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUncheckedUpdateManyWithoutCreatureInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CreatureFindFirstArgsSchema: z.ZodType<Prisma.CreatureFindFirstArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereInputSchema.optional(),
  orderBy: z.union([ CreatureOrderByWithRelationInputSchema.array(),CreatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureScalarFieldEnumSchema,CreatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CreatureFindFirstOrThrowArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereInputSchema.optional(),
  orderBy: z.union([ CreatureOrderByWithRelationInputSchema.array(),CreatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureScalarFieldEnumSchema,CreatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureFindManyArgsSchema: z.ZodType<Prisma.CreatureFindManyArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereInputSchema.optional(),
  orderBy: z.union([ CreatureOrderByWithRelationInputSchema.array(),CreatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureScalarFieldEnumSchema,CreatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureAggregateArgsSchema: z.ZodType<Prisma.CreatureAggregateArgs> = z.object({
  where: CreatureWhereInputSchema.optional(),
  orderBy: z.union([ CreatureOrderByWithRelationInputSchema.array(),CreatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureGroupByArgsSchema: z.ZodType<Prisma.CreatureGroupByArgs> = z.object({
  where: CreatureWhereInputSchema.optional(),
  orderBy: z.union([ CreatureOrderByWithAggregationInputSchema.array(),CreatureOrderByWithAggregationInputSchema ]).optional(),
  by: CreatureScalarFieldEnumSchema.array(),
  having: CreatureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureFindUniqueArgsSchema: z.ZodType<Prisma.CreatureFindUniqueArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereUniqueInputSchema,
}).strict() ;

export const CreatureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CreatureFindUniqueOrThrowArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereUniqueInputSchema,
}).strict() ;

export const AttributeFindFirstArgsSchema: z.ZodType<Prisma.AttributeFindFirstArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttributeScalarFieldEnumSchema,AttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttributeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AttributeFindFirstOrThrowArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttributeScalarFieldEnumSchema,AttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttributeFindManyArgsSchema: z.ZodType<Prisma.AttributeFindManyArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttributeScalarFieldEnumSchema,AttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttributeAggregateArgsSchema: z.ZodType<Prisma.AttributeAggregateArgs> = z.object({
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AttributeGroupByArgsSchema: z.ZodType<Prisma.AttributeGroupByArgs> = z.object({
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithAggregationInputSchema.array(),AttributeOrderByWithAggregationInputSchema ]).optional(),
  by: AttributeScalarFieldEnumSchema.array(),
  having: AttributeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AttributeFindUniqueArgsSchema: z.ZodType<Prisma.AttributeFindUniqueArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const AttributeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AttributeFindUniqueOrThrowArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const ActionFindFirstArgsSchema: z.ZodType<Prisma.ActionFindFirstArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActionFindFirstOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindManyArgsSchema: z.ZodType<Prisma.ActionFindManyArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionAggregateArgsSchema: z.ZodType<Prisma.ActionAggregateArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionGroupByArgsSchema: z.ZodType<Prisma.ActionGroupByArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithAggregationInputSchema.array(),ActionOrderByWithAggregationInputSchema ]).optional(),
  by: ActionScalarFieldEnumSchema.array(),
  having: ActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionFindUniqueArgsSchema: z.ZodType<Prisma.ActionFindUniqueArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActionFindUniqueOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const SpellFindFirstArgsSchema: z.ZodType<Prisma.SpellFindFirstArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpellFindFirstOrThrowArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellFindManyArgsSchema: z.ZodType<Prisma.SpellFindManyArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpellScalarFieldEnumSchema,SpellScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpellAggregateArgsSchema: z.ZodType<Prisma.SpellAggregateArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithRelationInputSchema.array(),SpellOrderByWithRelationInputSchema ]).optional(),
  cursor: SpellWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellGroupByArgsSchema: z.ZodType<Prisma.SpellGroupByArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
  orderBy: z.union([ SpellOrderByWithAggregationInputSchema.array(),SpellOrderByWithAggregationInputSchema ]).optional(),
  by: SpellScalarFieldEnumSchema.array(),
  having: SpellScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpellFindUniqueArgsSchema: z.ZodType<Prisma.SpellFindUniqueArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpellFindUniqueOrThrowArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const ComponentFindFirstArgsSchema: z.ZodType<Prisma.ComponentFindFirstArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ComponentScalarFieldEnumSchema,ComponentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ComponentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ComponentFindFirstOrThrowArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ComponentScalarFieldEnumSchema,ComponentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ComponentFindManyArgsSchema: z.ZodType<Prisma.ComponentFindManyArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ComponentScalarFieldEnumSchema,ComponentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ComponentAggregateArgsSchema: z.ZodType<Prisma.ComponentAggregateArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithRelationInputSchema.array(),ComponentOrderByWithRelationInputSchema ]).optional(),
  cursor: ComponentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ComponentGroupByArgsSchema: z.ZodType<Prisma.ComponentGroupByArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
  orderBy: z.union([ ComponentOrderByWithAggregationInputSchema.array(),ComponentOrderByWithAggregationInputSchema ]).optional(),
  by: ComponentScalarFieldEnumSchema.array(),
  having: ComponentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ComponentFindUniqueArgsSchema: z.ZodType<Prisma.ComponentFindUniqueArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export const ComponentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ComponentFindUniqueOrThrowArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const CreatureCreateArgsSchema: z.ZodType<Prisma.CreatureCreateArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  data: z.union([ CreatureCreateInputSchema,CreatureUncheckedCreateInputSchema ]),
}).strict() ;

export const CreatureUpsertArgsSchema: z.ZodType<Prisma.CreatureUpsertArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereUniqueInputSchema,
  create: z.union([ CreatureCreateInputSchema,CreatureUncheckedCreateInputSchema ]),
  update: z.union([ CreatureUpdateInputSchema,CreatureUncheckedUpdateInputSchema ]),
}).strict() ;

export const CreatureCreateManyArgsSchema: z.ZodType<Prisma.CreatureCreateManyArgs> = z.object({
  data: z.union([ CreatureCreateManyInputSchema,CreatureCreateManyInputSchema.array() ]),
}).strict() ;

export const CreatureDeleteArgsSchema: z.ZodType<Prisma.CreatureDeleteArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  where: CreatureWhereUniqueInputSchema,
}).strict() ;

export const CreatureUpdateArgsSchema: z.ZodType<Prisma.CreatureUpdateArgs> = z.object({
  select: CreatureSelectSchema.optional(),
  include: CreatureIncludeSchema.optional(),
  data: z.union([ CreatureUpdateInputSchema,CreatureUncheckedUpdateInputSchema ]),
  where: CreatureWhereUniqueInputSchema,
}).strict() ;

export const CreatureUpdateManyArgsSchema: z.ZodType<Prisma.CreatureUpdateManyArgs> = z.object({
  data: z.union([ CreatureUpdateManyMutationInputSchema,CreatureUncheckedUpdateManyInputSchema ]),
  where: CreatureWhereInputSchema.optional(),
}).strict() ;

export const CreatureDeleteManyArgsSchema: z.ZodType<Prisma.CreatureDeleteManyArgs> = z.object({
  where: CreatureWhereInputSchema.optional(),
}).strict() ;

export const AttributeCreateArgsSchema: z.ZodType<Prisma.AttributeCreateArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  data: z.union([ AttributeCreateInputSchema,AttributeUncheckedCreateInputSchema ]),
}).strict() ;

export const AttributeUpsertArgsSchema: z.ZodType<Prisma.AttributeUpsertArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
  create: z.union([ AttributeCreateInputSchema,AttributeUncheckedCreateInputSchema ]),
  update: z.union([ AttributeUpdateInputSchema,AttributeUncheckedUpdateInputSchema ]),
}).strict() ;

export const AttributeCreateManyArgsSchema: z.ZodType<Prisma.AttributeCreateManyArgs> = z.object({
  data: z.union([ AttributeCreateManyInputSchema,AttributeCreateManyInputSchema.array() ]),
}).strict() ;

export const AttributeDeleteArgsSchema: z.ZodType<Prisma.AttributeDeleteArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const AttributeUpdateArgsSchema: z.ZodType<Prisma.AttributeUpdateArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  include: AttributeIncludeSchema.optional(),
  data: z.union([ AttributeUpdateInputSchema,AttributeUncheckedUpdateInputSchema ]),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const AttributeUpdateManyArgsSchema: z.ZodType<Prisma.AttributeUpdateManyArgs> = z.object({
  data: z.union([ AttributeUpdateManyMutationInputSchema,AttributeUncheckedUpdateManyInputSchema ]),
  where: AttributeWhereInputSchema.optional(),
}).strict() ;

export const AttributeDeleteManyArgsSchema: z.ZodType<Prisma.AttributeDeleteManyArgs> = z.object({
  where: AttributeWhereInputSchema.optional(),
}).strict() ;

export const ActionCreateArgsSchema: z.ZodType<Prisma.ActionCreateArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  data: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
}).strict() ;

export const ActionUpsertArgsSchema: z.ZodType<Prisma.ActionUpsertArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
  create: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
  update: z.union([ ActionUpdateInputSchema,ActionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ActionCreateManyArgsSchema: z.ZodType<Prisma.ActionCreateManyArgs> = z.object({
  data: z.union([ ActionCreateManyInputSchema,ActionCreateManyInputSchema.array() ]),
}).strict() ;

export const ActionDeleteArgsSchema: z.ZodType<Prisma.ActionDeleteArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionUpdateArgsSchema: z.ZodType<Prisma.ActionUpdateArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  data: z.union([ ActionUpdateInputSchema,ActionUncheckedUpdateInputSchema ]),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionUpdateManyArgsSchema: z.ZodType<Prisma.ActionUpdateManyArgs> = z.object({
  data: z.union([ ActionUpdateManyMutationInputSchema,ActionUncheckedUpdateManyInputSchema ]),
  where: ActionWhereInputSchema.optional(),
}).strict() ;

export const ActionDeleteManyArgsSchema: z.ZodType<Prisma.ActionDeleteManyArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
}).strict() ;

export const SpellCreateArgsSchema: z.ZodType<Prisma.SpellCreateArgs> = z.object({
  select: SpellSelectSchema.optional(),
  data: z.union([ SpellCreateInputSchema,SpellUncheckedCreateInputSchema ]),
}).strict() ;

export const SpellUpsertArgsSchema: z.ZodType<Prisma.SpellUpsertArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
  create: z.union([ SpellCreateInputSchema,SpellUncheckedCreateInputSchema ]),
  update: z.union([ SpellUpdateInputSchema,SpellUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpellCreateManyArgsSchema: z.ZodType<Prisma.SpellCreateManyArgs> = z.object({
  data: z.union([ SpellCreateManyInputSchema,SpellCreateManyInputSchema.array() ]),
}).strict() ;

export const SpellDeleteArgsSchema: z.ZodType<Prisma.SpellDeleteArgs> = z.object({
  select: SpellSelectSchema.optional(),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellUpdateArgsSchema: z.ZodType<Prisma.SpellUpdateArgs> = z.object({
  select: SpellSelectSchema.optional(),
  data: z.union([ SpellUpdateInputSchema,SpellUncheckedUpdateInputSchema ]),
  where: SpellWhereUniqueInputSchema,
}).strict() ;

export const SpellUpdateManyArgsSchema: z.ZodType<Prisma.SpellUpdateManyArgs> = z.object({
  data: z.union([ SpellUpdateManyMutationInputSchema,SpellUncheckedUpdateManyInputSchema ]),
  where: SpellWhereInputSchema.optional(),
}).strict() ;

export const SpellDeleteManyArgsSchema: z.ZodType<Prisma.SpellDeleteManyArgs> = z.object({
  where: SpellWhereInputSchema.optional(),
}).strict() ;

export const ComponentCreateArgsSchema: z.ZodType<Prisma.ComponentCreateArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  data: z.union([ ComponentCreateInputSchema,ComponentUncheckedCreateInputSchema ]),
}).strict() ;

export const ComponentUpsertArgsSchema: z.ZodType<Prisma.ComponentUpsertArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
  create: z.union([ ComponentCreateInputSchema,ComponentUncheckedCreateInputSchema ]),
  update: z.union([ ComponentUpdateInputSchema,ComponentUncheckedUpdateInputSchema ]),
}).strict() ;

export const ComponentCreateManyArgsSchema: z.ZodType<Prisma.ComponentCreateManyArgs> = z.object({
  data: z.union([ ComponentCreateManyInputSchema,ComponentCreateManyInputSchema.array() ]),
}).strict() ;

export const ComponentDeleteArgsSchema: z.ZodType<Prisma.ComponentDeleteArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export const ComponentUpdateArgsSchema: z.ZodType<Prisma.ComponentUpdateArgs> = z.object({
  select: ComponentSelectSchema.optional(),
  data: z.union([ ComponentUpdateInputSchema,ComponentUncheckedUpdateInputSchema ]),
  where: ComponentWhereUniqueInputSchema,
}).strict() ;

export const ComponentUpdateManyArgsSchema: z.ZodType<Prisma.ComponentUpdateManyArgs> = z.object({
  data: z.union([ ComponentUpdateManyMutationInputSchema,ComponentUncheckedUpdateManyInputSchema ]),
  where: ComponentWhereInputSchema.optional(),
}).strict() ;

export const ComponentDeleteManyArgsSchema: z.ZodType<Prisma.ComponentDeleteManyArgs> = z.object({
  where: ComponentWhereInputSchema.optional(),
}).strict() ;