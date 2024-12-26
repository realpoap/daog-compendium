import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','isOwner','role','createdAt']);

export const CreatureScalarFieldEnumSchema = z.enum(['id','fullname','name','rank','type','subtype','size','createdAd','updatedAt','level','attack','defense','ranged','health','armor','perception','magic','spirit','loot','objects','flavor','description']);

export const CreatureAttributeScalarFieldEnumSchema = z.enum(['id','name','flavor','Description','creatureId']);

export const ActionListScalarFieldEnumSchema = z.enum(['id','main','limited','free','travel','creatureId']);

export const CreatureActionsScalarFieldEnumSchema = z.enum(['id','title','action','type','flavor','description','damages','effects','heal','target','range','creatureId']);

export const StatProfilScalarFieldEnumSchema = z.enum(['id','CEL','AGI','DEX','STR','END','VIT','COU','INS','SEN','CHA','SOC','ERU','creatureId']);

export const SpellScalarFieldEnumSchema = z.enum(['id','number','titleGlaise','titleCommon','createdAt','updatedAt','level','type','cost','difficulty','casting','targetType','action','flavor','description','damages','heal','effects','range','duration','target','components']);

export const ComponentScalarFieldEnumSchema = z.enum(['id','quantity','name','description','weight','value','rarity','spells']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RoleSchema = z.enum(['VIEWER','EDITOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const ActionTypeSchema = z.enum(['main','limited','free']);

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
  size: CreatureSizeSchema,
  id: z.string(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().nullable(),
  type: z.string(),
  subtype: z.string().nullable(),
  createdAd: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().nullable(),
  perception: z.number().int().nullable(),
  magic: z.number().int().nullable(),
  spirit: z.number().int().nullable(),
  loot: z.string().array(),
  objects: z.string().array(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
})

export type Creature = z.infer<typeof CreatureSchema>

/////////////////////////////////////////
// CREATURE ATTRIBUTE SCHEMA
/////////////////////////////////////////

export const CreatureAttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  flavor: z.string().nullable(),
  Description: z.string().nullable(),
  creatureId: z.string().nullable(),
})

export type CreatureAttribute = z.infer<typeof CreatureAttributeSchema>

/////////////////////////////////////////
// ACTION LIST SCHEMA
/////////////////////////////////////////

export const ActionListSchema = z.object({
  id: z.string(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int(),
  creatureId: z.string().nullable(),
})

export type ActionList = z.infer<typeof ActionListSchema>

/////////////////////////////////////////
// CREATURE ACTIONS SCHEMA
/////////////////////////////////////////

export const CreatureActionsSchema = z.object({
  action: ActionTypeSchema,
  id: z.string(),
  title: z.string(),
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

export type CreatureActions = z.infer<typeof CreatureActionsSchema>

/////////////////////////////////////////
// STAT PROFIL SCHEMA
/////////////////////////////////////////

export const StatProfilSchema = z.object({
  id: z.string(),
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
  creatureId: z.string().nullable(),
})

export type StatProfil = z.infer<typeof StatProfilSchema>

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
  type: z.boolean().optional(),
  subtype: z.boolean().optional(),
  size: z.boolean().optional(),
  createdAd: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  level: z.boolean().optional(),
  attack: z.boolean().optional(),
  defense: z.boolean().optional(),
  ranged: z.boolean().optional(),
  health: z.boolean().optional(),
  armor: z.boolean().optional(),
  perception: z.boolean().optional(),
  magic: z.boolean().optional(),
  spirit: z.boolean().optional(),
  loot: z.boolean().optional(),
  objects: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  stats: z.union([z.boolean(),z.lazy(() => StatProfilArgsSchema)]).optional(),
  actionList: z.union([z.boolean(),z.lazy(() => ActionListArgsSchema)]).optional(),
  attributes: z.union([z.boolean(),z.lazy(() => CreatureAttributeArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => CreatureActionsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CreatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CREATURE ATTRIBUTE
//------------------------------------------------------

export const CreatureAttributeIncludeSchema: z.ZodType<Prisma.CreatureAttributeInclude> = z.object({
}).strict()

export const CreatureAttributeArgsSchema: z.ZodType<Prisma.CreatureAttributeDefaultArgs> = z.object({
  select: z.lazy(() => CreatureAttributeSelectSchema).optional(),
  include: z.lazy(() => CreatureAttributeIncludeSchema).optional(),
}).strict();

export const CreatureAttributeSelectSchema: z.ZodType<Prisma.CreatureAttributeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  flavor: z.boolean().optional(),
  Description: z.boolean().optional(),
  creatureId: z.boolean().optional(),
  Creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
}).strict()

// ACTION LIST
//------------------------------------------------------

export const ActionListIncludeSchema: z.ZodType<Prisma.ActionListInclude> = z.object({
}).strict()

export const ActionListArgsSchema: z.ZodType<Prisma.ActionListDefaultArgs> = z.object({
  select: z.lazy(() => ActionListSelectSchema).optional(),
  include: z.lazy(() => ActionListIncludeSchema).optional(),
}).strict();

export const ActionListSelectSchema: z.ZodType<Prisma.ActionListSelect> = z.object({
  id: z.boolean().optional(),
  main: z.boolean().optional(),
  limited: z.boolean().optional(),
  free: z.boolean().optional(),
  travel: z.boolean().optional(),
  creatureId: z.boolean().optional(),
  creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
}).strict()

// CREATURE ACTIONS
//------------------------------------------------------

export const CreatureActionsIncludeSchema: z.ZodType<Prisma.CreatureActionsInclude> = z.object({
}).strict()

export const CreatureActionsArgsSchema: z.ZodType<Prisma.CreatureActionsDefaultArgs> = z.object({
  select: z.lazy(() => CreatureActionsSelectSchema).optional(),
  include: z.lazy(() => CreatureActionsIncludeSchema).optional(),
}).strict();

export const CreatureActionsSelectSchema: z.ZodType<Prisma.CreatureActionsSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
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
  creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
}).strict()

// STAT PROFIL
//------------------------------------------------------

export const StatProfilIncludeSchema: z.ZodType<Prisma.StatProfilInclude> = z.object({
}).strict()

export const StatProfilArgsSchema: z.ZodType<Prisma.StatProfilDefaultArgs> = z.object({
  select: z.lazy(() => StatProfilSelectSchema).optional(),
  include: z.lazy(() => StatProfilIncludeSchema).optional(),
}).strict();

export const StatProfilSelectSchema: z.ZodType<Prisma.StatProfilSelect> = z.object({
  id: z.boolean().optional(),
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
  creatureId: z.boolean().optional(),
  creature: z.union([z.boolean(),z.lazy(() => CreatureArgsSchema)]).optional(),
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
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ranged: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  health: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilNullableScalarRelationFilterSchema),z.lazy(() => StatProfilWhereInputSchema) ]).optional().nullable(),
  actionList: z.union([ z.lazy(() => ActionListNullableScalarRelationFilterSchema),z.lazy(() => ActionListWhereInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => CreatureAttributeListRelationFilterSchema).optional(),
  actions: z.lazy(() => CreatureActionsListRelationFilterSchema).optional()
}).strict();

export const CreatureOrderByWithRelationInputSchema: z.ZodType<Prisma.CreatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAd: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  loot: z.lazy(() => SortOrderSchema).optional(),
  objects: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  stats: z.lazy(() => StatProfilOrderByWithRelationInputSchema).optional(),
  actionList: z.lazy(() => ActionListOrderByWithRelationInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeOrderByRelationAggregateInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsOrderByRelationAggregateInputSchema).optional()
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
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ranged: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  health: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stats: z.union([ z.lazy(() => StatProfilNullableScalarRelationFilterSchema),z.lazy(() => StatProfilWhereInputSchema) ]).optional().nullable(),
  actionList: z.union([ z.lazy(() => ActionListNullableScalarRelationFilterSchema),z.lazy(() => ActionListWhereInputSchema) ]).optional().nullable(),
  attributes: z.lazy(() => CreatureAttributeListRelationFilterSchema).optional(),
  actions: z.lazy(() => CreatureActionsListRelationFilterSchema).optional()
}).strict());

export const CreatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.CreatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAd: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
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
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subtype: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeWithAggregatesFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional(),
  createdAd: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  defense: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ranged: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  health: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  armor: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  perception: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  magic: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  spirit: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  loot: z.lazy(() => StringNullableListFilterSchema).optional(),
  objects: z.lazy(() => StringNullableListFilterSchema).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CreatureAttributeWhereInputSchema: z.ZodType<Prisma.CreatureAttributeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureAttributeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeOrderByWithRelationInputSchema: z.ZodType<Prisma.CreatureAttributeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  Creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const CreatureAttributeWhereUniqueInputSchema: z.ZodType<Prisma.CreatureAttributeWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureAttributeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const CreatureAttributeOrderByWithAggregationInputSchema: z.ZodType<Prisma.CreatureAttributeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CreatureAttributeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CreatureAttributeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CreatureAttributeMinOrderByAggregateInputSchema).optional()
}).strict();

export const CreatureAttributeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CreatureAttributeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureAttributeScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureAttributeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureAttributeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureAttributeScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureAttributeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ActionListWhereInputSchema: z.ZodType<Prisma.ActionListWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  limited: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  free: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  travel: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ActionListOrderByWithRelationInputSchema: z.ZodType<Prisma.ActionListOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const ActionListWhereUniqueInputSchema: z.ZodType<Prisma.ActionListWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    creatureId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    creatureId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  creatureId: z.string().optional(),
  AND: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionListWhereInputSchema),z.lazy(() => ActionListWhereInputSchema).array() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  limited: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  free: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  travel: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ActionListOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActionListOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ActionListCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ActionListAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActionListMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActionListMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ActionListSumOrderByAggregateInputSchema).optional()
}).strict();

export const ActionListScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActionListScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ActionListScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionListScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionListScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  main: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  limited: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  free: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  travel: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  creatureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CreatureActionsWhereInputSchema: z.ZodType<Prisma.CreatureActionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureActionsWhereInputSchema),z.lazy(() => CreatureActionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureActionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureActionsWhereInputSchema),z.lazy(() => CreatureActionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureActionsOrderByWithRelationInputSchema: z.ZodType<Prisma.CreatureActionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
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
  creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const CreatureActionsWhereUniqueInputSchema: z.ZodType<Prisma.CreatureActionsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CreatureActionsWhereInputSchema),z.lazy(() => CreatureActionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureActionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureActionsWhereInputSchema),z.lazy(() => CreatureActionsWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const CreatureActionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.CreatureActionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
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
  _count: z.lazy(() => CreatureActionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CreatureActionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CreatureActionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const CreatureActionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CreatureActionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureActionsScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureActionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureActionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureActionsScalarWhereWithAggregatesInputSchema),z.lazy(() => CreatureActionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const StatProfilWhereInputSchema: z.ZodType<Prisma.StatProfilWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatProfilWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict();

export const StatProfilOrderByWithRelationInputSchema: z.ZodType<Prisma.StatProfilOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  ERU: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  creature: z.lazy(() => CreatureOrderByWithRelationInputSchema).optional()
}).strict();

export const StatProfilWhereUniqueInputSchema: z.ZodType<Prisma.StatProfilWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    creatureId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    creatureId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  creatureId: z.string().optional(),
  AND: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatProfilWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatProfilWhereInputSchema),z.lazy(() => StatProfilWhereInputSchema).array() ]).optional(),
  CEL: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  AGI: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  DEX: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  STR: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  END: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  VIT: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  COU: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  INS: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  SEN: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  CHA: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  SOC: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ERU: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  creature: z.union([ z.lazy(() => CreatureNullableScalarRelationFilterSchema),z.lazy(() => CreatureWhereInputSchema) ]).optional().nullable(),
}).strict());

export const StatProfilOrderByWithAggregationInputSchema: z.ZodType<Prisma.StatProfilOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  ERU: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StatProfilCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StatProfilAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StatProfilMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StatProfilMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StatProfilSumOrderByAggregateInputSchema).optional()
}).strict();

export const StatProfilScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StatProfilScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StatProfilScalarWhereWithAggregatesInputSchema),z.lazy(() => StatProfilScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatProfilScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatProfilScalarWhereWithAggregatesInputSchema),z.lazy(() => StatProfilScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CEL: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  AGI: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  DEX: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  STR: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  END: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  VIT: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  COU: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  INS: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  SEN: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  CHA: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  SOC: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ERU: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUpdateInputSchema: z.ZodType<Prisma.CreatureUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateManyInputSchema: z.ZodType<Prisma.CreatureCreateManyInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const CreatureUpdateManyMutationInputSchema: z.ZodType<Prisma.CreatureUpdateManyMutationInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateManyInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeCreateInputSchema: z.ZodType<Prisma.CreatureAttributeCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable(),
  Creature: z.lazy(() => CreatureCreateNestedOneWithoutAttributesInputSchema).optional()
}).strict();

export const CreatureAttributeUncheckedCreateInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const CreatureAttributeUpdateInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Creature: z.lazy(() => CreatureUpdateOneWithoutAttributesNestedInputSchema).optional()
}).strict();

export const CreatureAttributeUncheckedUpdateInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeCreateManyInputSchema: z.ZodType<Prisma.CreatureAttributeCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable(),
  creatureId: z.string().optional().nullable()
}).strict();

export const CreatureAttributeUpdateManyMutationInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionListCreateInputSchema: z.ZodType<Prisma.ActionListCreateInput> = z.object({
  id: z.string().optional(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int(),
  creature: z.lazy(() => CreatureCreateNestedOneWithoutActionListInputSchema).optional()
}).strict();

export const ActionListUncheckedCreateInputSchema: z.ZodType<Prisma.ActionListUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int(),
  creatureId: z.string().optional().nullable()
}).strict();

export const ActionListUpdateInputSchema: z.ZodType<Prisma.ActionListUpdateInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creature: z.lazy(() => CreatureUpdateOneWithoutActionListNestedInputSchema).optional()
}).strict();

export const ActionListUncheckedUpdateInputSchema: z.ZodType<Prisma.ActionListUncheckedUpdateInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionListCreateManyInputSchema: z.ZodType<Prisma.ActionListCreateManyInput> = z.object({
  id: z.string().optional(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int(),
  creatureId: z.string().optional().nullable()
}).strict();

export const ActionListUpdateManyMutationInputSchema: z.ZodType<Prisma.ActionListUpdateManyMutationInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionListUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActionListUncheckedUpdateManyInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureActionsCreateInputSchema: z.ZodType<Prisma.CreatureActionsCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable(),
  creature: z.lazy(() => CreatureCreateNestedOneWithoutActionsInputSchema).optional()
}).strict();

export const CreatureActionsUncheckedCreateInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
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

export const CreatureActionsUpdateInputSchema: z.ZodType<Prisma.CreatureActionsUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creature: z.lazy(() => CreatureUpdateOneWithoutActionsNestedInputSchema).optional()
}).strict();

export const CreatureActionsUncheckedUpdateInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CreatureActionsCreateManyInputSchema: z.ZodType<Prisma.CreatureActionsCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
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

export const CreatureActionsUpdateManyMutationInputSchema: z.ZodType<Prisma.CreatureActionsUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CreatureActionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const StatProfilCreateInputSchema: z.ZodType<Prisma.StatProfilCreateInput> = z.object({
  id: z.string().optional(),
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
  creature: z.lazy(() => CreatureCreateNestedOneWithoutStatsInputSchema).optional()
}).strict();

export const StatProfilUncheckedCreateInputSchema: z.ZodType<Prisma.StatProfilUncheckedCreateInput> = z.object({
  id: z.string().optional(),
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
  creatureId: z.string().optional().nullable()
}).strict();

export const StatProfilUpdateInputSchema: z.ZodType<Prisma.StatProfilUpdateInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creature: z.lazy(() => CreatureUpdateOneWithoutStatsNestedInputSchema).optional()
}).strict();

export const StatProfilUncheckedUpdateInputSchema: z.ZodType<Prisma.StatProfilUncheckedUpdateInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creatureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StatProfilCreateManyInputSchema: z.ZodType<Prisma.StatProfilCreateManyInput> = z.object({
  id: z.string().optional(),
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
  creatureId: z.string().optional().nullable()
}).strict();

export const StatProfilUpdateManyMutationInputSchema: z.ZodType<Prisma.StatProfilUpdateManyMutationInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatProfilUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StatProfilUncheckedUpdateManyInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const StatProfilNullableScalarRelationFilterSchema: z.ZodType<Prisma.StatProfilNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => StatProfilWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StatProfilWhereInputSchema).optional().nullable()
}).strict();

export const ActionListNullableScalarRelationFilterSchema: z.ZodType<Prisma.ActionListNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ActionListWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ActionListWhereInputSchema).optional().nullable()
}).strict();

export const CreatureAttributeListRelationFilterSchema: z.ZodType<Prisma.CreatureAttributeListRelationFilter> = z.object({
  every: z.lazy(() => CreatureAttributeWhereInputSchema).optional(),
  some: z.lazy(() => CreatureAttributeWhereInputSchema).optional(),
  none: z.lazy(() => CreatureAttributeWhereInputSchema).optional()
}).strict();

export const CreatureActionsListRelationFilterSchema: z.ZodType<Prisma.CreatureActionsListRelationFilter> = z.object({
  every: z.lazy(() => CreatureActionsWhereInputSchema).optional(),
  some: z.lazy(() => CreatureActionsWhereInputSchema).optional(),
  none: z.lazy(() => CreatureActionsWhereInputSchema).optional()
}).strict();

export const CreatureAttributeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CreatureAttributeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureActionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CreatureActionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAd: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  loot: z.lazy(() => SortOrderSchema).optional(),
  objects: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureAvgOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAd: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  subtype: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAd: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureSumOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureSumOrderByAggregateInput> = z.object({
  level: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  ranged: z.lazy(() => SortOrderSchema).optional(),
  health: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  perception: z.lazy(() => SortOrderSchema).optional(),
  magic: z.lazy(() => SortOrderSchema).optional(),
  spirit: z.lazy(() => SortOrderSchema).optional()
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

export const CreatureAttributeCountOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureAttributeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureAttributeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureAttributeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureAttributeMinOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureAttributeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActionListCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ActionListAvgOrderByAggregateInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActionListMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActionListMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListSumOrderByAggregateInputSchema: z.ZodType<Prisma.ActionListSumOrderByAggregateInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumActionTypeFilterSchema: z.ZodType<Prisma.EnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export const CreatureActionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureActionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
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

export const CreatureActionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureActionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
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

export const CreatureActionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.CreatureActionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
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

export const StatProfilCountOrderByAggregateInputSchema: z.ZodType<Prisma.StatProfilCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  ERU: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatProfilAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StatProfilAvgOrderByAggregateInput> = z.object({
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

export const StatProfilMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StatProfilMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  ERU: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatProfilMinOrderByAggregateInputSchema: z.ZodType<Prisma.StatProfilMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  ERU: z.lazy(() => SortOrderSchema).optional(),
  creatureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatProfilSumOrderByAggregateInputSchema: z.ZodType<Prisma.StatProfilSumOrderByAggregateInput> = z.object({
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

export const CreatureCreatelootInputSchema: z.ZodType<Prisma.CreatureCreatelootInput> = z.object({
  set: z.string().array()
}).strict();

export const CreatureCreateobjectsInputSchema: z.ZodType<Prisma.CreatureCreateobjectsInput> = z.object({
  set: z.string().array()
}).strict();

export const StatProfilCreateNestedOneWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilCreateNestedOneWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatProfilCreateOrConnectWithoutCreatureInputSchema).optional(),
  connect: z.lazy(() => StatProfilWhereUniqueInputSchema).optional()
}).strict();

export const ActionListCreateNestedOneWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListCreateNestedOneWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActionListCreateOrConnectWithoutCreatureInputSchema).optional(),
  connect: z.lazy(() => ActionListWhereUniqueInputSchema).optional()
}).strict();

export const CreatureAttributeCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureAttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CreatureActionsCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureActionsCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StatProfilUncheckedCreateNestedOneWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUncheckedCreateNestedOneWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatProfilCreateOrConnectWithoutCreatureInputSchema).optional(),
  connect: z.lazy(() => StatProfilWhereUniqueInputSchema).optional()
}).strict();

export const ActionListUncheckedCreateNestedOneWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUncheckedCreateNestedOneWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActionListCreateOrConnectWithoutCreatureInputSchema).optional(),
  connect: z.lazy(() => ActionListWhereUniqueInputSchema).optional()
}).strict();

export const CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureAttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CreatureActionsUncheckedCreateNestedManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedCreateNestedManyWithoutCreatureInput> = z.object({
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureActionsCreateManyCreatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
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

export const CreatureUpdatelootInputSchema: z.ZodType<Prisma.CreatureUpdatelootInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const CreatureUpdateobjectsInputSchema: z.ZodType<Prisma.CreatureUpdateobjectsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const StatProfilUpdateOneWithoutCreatureNestedInputSchema: z.ZodType<Prisma.StatProfilUpdateOneWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatProfilCreateOrConnectWithoutCreatureInputSchema).optional(),
  upsert: z.lazy(() => StatProfilUpsertWithoutCreatureInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StatProfilWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StatProfilWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StatProfilWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StatProfilUpdateToOneWithWhereWithoutCreatureInputSchema),z.lazy(() => StatProfilUpdateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedUpdateWithoutCreatureInputSchema) ]).optional(),
}).strict();

export const ActionListUpdateOneWithoutCreatureNestedInputSchema: z.ZodType<Prisma.ActionListUpdateOneWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActionListCreateOrConnectWithoutCreatureInputSchema).optional(),
  upsert: z.lazy(() => ActionListUpsertWithoutCreatureInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ActionListWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ActionListWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ActionListWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ActionListUpdateToOneWithWhereWithoutCreatureInputSchema),z.lazy(() => ActionListUpdateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedUpdateWithoutCreatureInputSchema) ]).optional(),
}).strict();

export const CreatureAttributeUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureAttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CreatureAttributeUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CreatureAttributeScalarWhereInputSchema),z.lazy(() => CreatureAttributeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CreatureActionsUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.CreatureActionsUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CreatureActionsUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureActionsCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CreatureActionsUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CreatureActionsUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CreatureActionsScalarWhereInputSchema),z.lazy(() => CreatureActionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StatProfilUncheckedUpdateOneWithoutCreatureNestedInputSchema: z.ZodType<Prisma.StatProfilUncheckedUpdateOneWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatProfilCreateOrConnectWithoutCreatureInputSchema).optional(),
  upsert: z.lazy(() => StatProfilUpsertWithoutCreatureInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StatProfilWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StatProfilWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StatProfilWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StatProfilUpdateToOneWithWhereWithoutCreatureInputSchema),z.lazy(() => StatProfilUpdateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedUpdateWithoutCreatureInputSchema) ]).optional(),
}).strict();

export const ActionListUncheckedUpdateOneWithoutCreatureNestedInputSchema: z.ZodType<Prisma.ActionListUncheckedUpdateOneWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActionListCreateOrConnectWithoutCreatureInputSchema).optional(),
  upsert: z.lazy(() => ActionListUpsertWithoutCreatureInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ActionListWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ActionListWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ActionListWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ActionListUpdateToOneWithWhereWithoutCreatureInputSchema),z.lazy(() => ActionListUpdateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedUpdateWithoutCreatureInputSchema) ]).optional(),
}).strict();

export const CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureAttributeCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CreatureAttributeWhereUniqueInputSchema),z.lazy(() => CreatureAttributeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CreatureAttributeUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CreatureAttributeScalarWhereInputSchema),z.lazy(() => CreatureAttributeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema).array(),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema),z.lazy(() => CreatureActionsCreateOrConnectWithoutCreatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CreatureActionsUpsertWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpsertWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CreatureActionsCreateManyCreatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CreatureActionsWhereUniqueInputSchema),z.lazy(() => CreatureActionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CreatureActionsUpdateWithWhereUniqueWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpdateWithWhereUniqueWithoutCreatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CreatureActionsUpdateManyWithWhereWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUpdateManyWithWhereWithoutCreatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CreatureActionsScalarWhereInputSchema),z.lazy(() => CreatureActionsScalarWhereInputSchema).array() ]).optional(),
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

export const CreatureCreateNestedOneWithoutActionListInputSchema: z.ZodType<Prisma.CreatureCreateNestedOneWithoutActionListInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionListInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutActionListInputSchema).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional()
}).strict();

export const CreatureUpdateOneWithoutActionListNestedInputSchema: z.ZodType<Prisma.CreatureUpdateOneWithoutActionListNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionListInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutActionListInputSchema).optional(),
  upsert: z.lazy(() => CreatureUpsertWithoutActionListInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CreatureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CreatureUpdateToOneWithWhereWithoutActionListInputSchema),z.lazy(() => CreatureUpdateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionListInputSchema) ]).optional(),
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

export const CreatureCreateNestedOneWithoutStatsInputSchema: z.ZodType<Prisma.CreatureCreateNestedOneWithoutStatsInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutStatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutStatsInputSchema).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional()
}).strict();

export const CreatureUpdateOneWithoutStatsNestedInputSchema: z.ZodType<Prisma.CreatureUpdateOneWithoutStatsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CreatureCreateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutStatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CreatureCreateOrConnectWithoutStatsInputSchema).optional(),
  upsert: z.lazy(() => CreatureUpsertWithoutStatsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CreatureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CreatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CreatureUpdateToOneWithWhereWithoutStatsInputSchema),z.lazy(() => CreatureUpdateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutStatsInputSchema) ]).optional(),
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

export const StatProfilCreateWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
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
  ERU: z.number().int()
}).strict();

export const StatProfilUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
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
  ERU: z.number().int()
}).strict();

export const StatProfilCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => StatProfilWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const ActionListCreateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int()
}).strict();

export const ActionListUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  main: z.number().int(),
  limited: z.number().int(),
  free: z.number().int(),
  travel: z.number().int()
}).strict();

export const ActionListCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionListWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureAttributeCreateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable()
}).strict();

export const CreatureAttributeUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable()
}).strict();

export const CreatureAttributeCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureAttributeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureAttributeCreateManyCreatureInputEnvelopeSchema: z.ZodType<Prisma.CreatureAttributeCreateManyCreatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CreatureAttributeCreateManyCreatureInputSchema),z.lazy(() => CreatureAttributeCreateManyCreatureInputSchema).array() ]),
}).strict();

export const CreatureActionsCreateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
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

export const CreatureActionsUncheckedCreateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedCreateWithoutCreatureInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
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

export const CreatureActionsCreateOrConnectWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsCreateOrConnectWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureActionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureActionsCreateManyCreatureInputEnvelopeSchema: z.ZodType<Prisma.CreatureActionsCreateManyCreatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CreatureActionsCreateManyCreatureInputSchema),z.lazy(() => CreatureActionsCreateManyCreatureInputSchema).array() ]),
}).strict();

export const StatProfilUpsertWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUpsertWithoutCreatureInput> = z.object({
  update: z.union([ z.lazy(() => StatProfilUpdateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => StatProfilCreateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedCreateWithoutCreatureInputSchema) ]),
  where: z.lazy(() => StatProfilWhereInputSchema).optional()
}).strict();

export const StatProfilUpdateToOneWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUpdateToOneWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => StatProfilWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StatProfilUpdateWithoutCreatureInputSchema),z.lazy(() => StatProfilUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const StatProfilUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUpdateWithoutCreatureInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatProfilUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.StatProfilUncheckedUpdateWithoutCreatureInput> = z.object({
  CEL: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  COU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionListUpsertWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUpsertWithoutCreatureInput> = z.object({
  update: z.union([ z.lazy(() => ActionListUpdateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => ActionListCreateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedCreateWithoutCreatureInputSchema) ]),
  where: z.lazy(() => ActionListWhereInputSchema).optional()
}).strict();

export const ActionListUpdateToOneWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUpdateToOneWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => ActionListWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ActionListUpdateWithoutCreatureInputSchema),z.lazy(() => ActionListUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const ActionListUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUpdateWithoutCreatureInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionListUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.ActionListUncheckedUpdateWithoutCreatureInput> = z.object({
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  free: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  travel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUpsertWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureAttributeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CreatureAttributeUpdateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureAttributeCreateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureAttributeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CreatureAttributeUpdateWithoutCreatureInputSchema),z.lazy(() => CreatureAttributeUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureAttributeUpdateManyWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateManyWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureAttributeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CreatureAttributeUpdateManyMutationInputSchema),z.lazy(() => CreatureAttributeUncheckedUpdateManyWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureAttributeScalarWhereInputSchema: z.ZodType<Prisma.CreatureAttributeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureAttributeScalarWhereInputSchema),z.lazy(() => CreatureAttributeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureAttributeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureAttributeScalarWhereInputSchema),z.lazy(() => CreatureAttributeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creatureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CreatureActionsUpsertWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUpsertWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureActionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CreatureActionsUpdateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedUpdateWithoutCreatureInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureActionsCreateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedCreateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureActionsUpdateWithWhereUniqueWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUpdateWithWhereUniqueWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureActionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CreatureActionsUpdateWithoutCreatureInputSchema),z.lazy(() => CreatureActionsUncheckedUpdateWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureActionsUpdateManyWithWhereWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUpdateManyWithWhereWithoutCreatureInput> = z.object({
  where: z.lazy(() => CreatureActionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CreatureActionsUpdateManyMutationInputSchema),z.lazy(() => CreatureActionsUncheckedUpdateManyWithoutCreatureInputSchema) ]),
}).strict();

export const CreatureActionsScalarWhereInputSchema: z.ZodType<Prisma.CreatureActionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureActionsScalarWhereInputSchema),z.lazy(() => CreatureActionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureActionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureActionsScalarWhereInputSchema),z.lazy(() => CreatureActionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListCreateNestedOneWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutAttributesInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
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
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutAttributesInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutAttributesInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateWithoutActionListInputSchema: z.ZodType<Prisma.CreatureCreateWithoutActionListInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutActionListInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutActionListInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureCreateOrConnectWithoutActionListInputSchema: z.ZodType<Prisma.CreatureCreateOrConnectWithoutActionListInput> = z.object({
  where: z.lazy(() => CreatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionListInputSchema) ]),
}).strict();

export const CreatureUpsertWithoutActionListInputSchema: z.ZodType<Prisma.CreatureUpsertWithoutActionListInput> = z.object({
  update: z.union([ z.lazy(() => CreatureUpdateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionListInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureCreateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutActionListInputSchema) ]),
  where: z.lazy(() => CreatureWhereInputSchema).optional()
}).strict();

export const CreatureUpdateToOneWithWhereWithoutActionListInputSchema: z.ZodType<Prisma.CreatureUpdateToOneWithWhereWithoutActionListInput> = z.object({
  where: z.lazy(() => CreatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CreatureUpdateWithoutActionListInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutActionListInputSchema) ]),
}).strict();

export const CreatureUpdateWithoutActionListInputSchema: z.ZodType<Prisma.CreatureUpdateWithoutActionListInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutActionListInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutActionListInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
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
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutActionsInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutActionsInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stats: z.lazy(() => StatProfilUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  actionList: z.lazy(() => ActionListUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureCreateWithoutStatsInputSchema: z.ZodType<Prisma.CreatureCreateWithoutStatsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actionList: z.lazy(() => ActionListCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureUncheckedCreateWithoutStatsInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateWithoutStatsInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  type: z.string(),
  subtype: z.string().optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema),
  createdAd: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  ranged: z.number().int(),
  health: z.number().int(),
  armor: z.number().int().optional().nullable(),
  perception: z.number().int().optional().nullable(),
  magic: z.number().int().optional().nullable(),
  spirit: z.number().int().optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureCreatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureCreateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actionList: z.lazy(() => ActionListUncheckedCreateNestedOneWithoutCreatureInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedCreateNestedManyWithoutCreatureInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedCreateNestedManyWithoutCreatureInputSchema).optional()
}).strict();

export const CreatureCreateOrConnectWithoutStatsInputSchema: z.ZodType<Prisma.CreatureCreateOrConnectWithoutStatsInput> = z.object({
  where: z.lazy(() => CreatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CreatureCreateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutStatsInputSchema) ]),
}).strict();

export const CreatureUpsertWithoutStatsInputSchema: z.ZodType<Prisma.CreatureUpsertWithoutStatsInput> = z.object({
  update: z.union([ z.lazy(() => CreatureUpdateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutStatsInputSchema) ]),
  create: z.union([ z.lazy(() => CreatureCreateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedCreateWithoutStatsInputSchema) ]),
  where: z.lazy(() => CreatureWhereInputSchema).optional()
}).strict();

export const CreatureUpdateToOneWithWhereWithoutStatsInputSchema: z.ZodType<Prisma.CreatureUpdateToOneWithWhereWithoutStatsInput> = z.object({
  where: z.lazy(() => CreatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CreatureUpdateWithoutStatsInputSchema),z.lazy(() => CreatureUncheckedUpdateWithoutStatsInputSchema) ]),
}).strict();

export const CreatureUpdateWithoutStatsInputSchema: z.ZodType<Prisma.CreatureUpdateWithoutStatsInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionList: z.lazy(() => ActionListUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureUncheckedUpdateWithoutStatsInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateWithoutStatsInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => EnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ranged: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  health: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  perception: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magic: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  spirit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loot: z.union([ z.lazy(() => CreatureUpdatelootInputSchema),z.string().array() ]).optional(),
  objects: z.union([ z.lazy(() => CreatureUpdateobjectsInputSchema),z.string().array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionList: z.lazy(() => ActionListUncheckedUpdateOneWithoutCreatureNestedInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional(),
  actions: z.lazy(() => CreatureActionsUncheckedUpdateManyWithoutCreatureNestedInputSchema).optional()
}).strict();

export const CreatureAttributeCreateManyCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeCreateManyCreatureInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  Description: z.string().optional().nullable()
}).strict();

export const CreatureActionsCreateManyCreatureInputSchema: z.ZodType<Prisma.CreatureActionsCreateManyCreatureInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
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

export const CreatureAttributeUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedUpdateWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeUncheckedUpdateManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureAttributeUncheckedUpdateManyWithoutCreatureInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureActionsUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUpdateWithoutCreatureInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CreatureActionsUncheckedUpdateWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedUpdateWithoutCreatureInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CreatureActionsUncheckedUpdateManyWithoutCreatureInputSchema: z.ZodType<Prisma.CreatureActionsUncheckedUpdateManyWithoutCreatureInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CreatureAttributeFindFirstArgsSchema: z.ZodType<Prisma.CreatureAttributeFindFirstArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereInputSchema.optional(),
  orderBy: z.union([ CreatureAttributeOrderByWithRelationInputSchema.array(),CreatureAttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureAttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureAttributeScalarFieldEnumSchema,CreatureAttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureAttributeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CreatureAttributeFindFirstOrThrowArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereInputSchema.optional(),
  orderBy: z.union([ CreatureAttributeOrderByWithRelationInputSchema.array(),CreatureAttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureAttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureAttributeScalarFieldEnumSchema,CreatureAttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureAttributeFindManyArgsSchema: z.ZodType<Prisma.CreatureAttributeFindManyArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereInputSchema.optional(),
  orderBy: z.union([ CreatureAttributeOrderByWithRelationInputSchema.array(),CreatureAttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureAttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureAttributeScalarFieldEnumSchema,CreatureAttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureAttributeAggregateArgsSchema: z.ZodType<Prisma.CreatureAttributeAggregateArgs> = z.object({
  where: CreatureAttributeWhereInputSchema.optional(),
  orderBy: z.union([ CreatureAttributeOrderByWithRelationInputSchema.array(),CreatureAttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureAttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureAttributeGroupByArgsSchema: z.ZodType<Prisma.CreatureAttributeGroupByArgs> = z.object({
  where: CreatureAttributeWhereInputSchema.optional(),
  orderBy: z.union([ CreatureAttributeOrderByWithAggregationInputSchema.array(),CreatureAttributeOrderByWithAggregationInputSchema ]).optional(),
  by: CreatureAttributeScalarFieldEnumSchema.array(),
  having: CreatureAttributeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureAttributeFindUniqueArgsSchema: z.ZodType<Prisma.CreatureAttributeFindUniqueArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereUniqueInputSchema,
}).strict() ;

export const CreatureAttributeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CreatureAttributeFindUniqueOrThrowArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereUniqueInputSchema,
}).strict() ;

export const ActionListFindFirstArgsSchema: z.ZodType<Prisma.ActionListFindFirstArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereInputSchema.optional(),
  orderBy: z.union([ ActionListOrderByWithRelationInputSchema.array(),ActionListOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionListScalarFieldEnumSchema,ActionListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionListFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActionListFindFirstOrThrowArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereInputSchema.optional(),
  orderBy: z.union([ ActionListOrderByWithRelationInputSchema.array(),ActionListOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionListScalarFieldEnumSchema,ActionListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionListFindManyArgsSchema: z.ZodType<Prisma.ActionListFindManyArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereInputSchema.optional(),
  orderBy: z.union([ ActionListOrderByWithRelationInputSchema.array(),ActionListOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionListScalarFieldEnumSchema,ActionListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionListAggregateArgsSchema: z.ZodType<Prisma.ActionListAggregateArgs> = z.object({
  where: ActionListWhereInputSchema.optional(),
  orderBy: z.union([ ActionListOrderByWithRelationInputSchema.array(),ActionListOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionListGroupByArgsSchema: z.ZodType<Prisma.ActionListGroupByArgs> = z.object({
  where: ActionListWhereInputSchema.optional(),
  orderBy: z.union([ ActionListOrderByWithAggregationInputSchema.array(),ActionListOrderByWithAggregationInputSchema ]).optional(),
  by: ActionListScalarFieldEnumSchema.array(),
  having: ActionListScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionListFindUniqueArgsSchema: z.ZodType<Prisma.ActionListFindUniqueArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereUniqueInputSchema,
}).strict() ;

export const ActionListFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActionListFindUniqueOrThrowArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereUniqueInputSchema,
}).strict() ;

export const CreatureActionsFindFirstArgsSchema: z.ZodType<Prisma.CreatureActionsFindFirstArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereInputSchema.optional(),
  orderBy: z.union([ CreatureActionsOrderByWithRelationInputSchema.array(),CreatureActionsOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureActionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureActionsScalarFieldEnumSchema,CreatureActionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureActionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CreatureActionsFindFirstOrThrowArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereInputSchema.optional(),
  orderBy: z.union([ CreatureActionsOrderByWithRelationInputSchema.array(),CreatureActionsOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureActionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureActionsScalarFieldEnumSchema,CreatureActionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureActionsFindManyArgsSchema: z.ZodType<Prisma.CreatureActionsFindManyArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereInputSchema.optional(),
  orderBy: z.union([ CreatureActionsOrderByWithRelationInputSchema.array(),CreatureActionsOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureActionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CreatureActionsScalarFieldEnumSchema,CreatureActionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CreatureActionsAggregateArgsSchema: z.ZodType<Prisma.CreatureActionsAggregateArgs> = z.object({
  where: CreatureActionsWhereInputSchema.optional(),
  orderBy: z.union([ CreatureActionsOrderByWithRelationInputSchema.array(),CreatureActionsOrderByWithRelationInputSchema ]).optional(),
  cursor: CreatureActionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureActionsGroupByArgsSchema: z.ZodType<Prisma.CreatureActionsGroupByArgs> = z.object({
  where: CreatureActionsWhereInputSchema.optional(),
  orderBy: z.union([ CreatureActionsOrderByWithAggregationInputSchema.array(),CreatureActionsOrderByWithAggregationInputSchema ]).optional(),
  by: CreatureActionsScalarFieldEnumSchema.array(),
  having: CreatureActionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CreatureActionsFindUniqueArgsSchema: z.ZodType<Prisma.CreatureActionsFindUniqueArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereUniqueInputSchema,
}).strict() ;

export const CreatureActionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CreatureActionsFindUniqueOrThrowArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereUniqueInputSchema,
}).strict() ;

export const StatProfilFindFirstArgsSchema: z.ZodType<Prisma.StatProfilFindFirstArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereInputSchema.optional(),
  orderBy: z.union([ StatProfilOrderByWithRelationInputSchema.array(),StatProfilOrderByWithRelationInputSchema ]).optional(),
  cursor: StatProfilWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatProfilScalarFieldEnumSchema,StatProfilScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatProfilFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StatProfilFindFirstOrThrowArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereInputSchema.optional(),
  orderBy: z.union([ StatProfilOrderByWithRelationInputSchema.array(),StatProfilOrderByWithRelationInputSchema ]).optional(),
  cursor: StatProfilWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatProfilScalarFieldEnumSchema,StatProfilScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatProfilFindManyArgsSchema: z.ZodType<Prisma.StatProfilFindManyArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereInputSchema.optional(),
  orderBy: z.union([ StatProfilOrderByWithRelationInputSchema.array(),StatProfilOrderByWithRelationInputSchema ]).optional(),
  cursor: StatProfilWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatProfilScalarFieldEnumSchema,StatProfilScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatProfilAggregateArgsSchema: z.ZodType<Prisma.StatProfilAggregateArgs> = z.object({
  where: StatProfilWhereInputSchema.optional(),
  orderBy: z.union([ StatProfilOrderByWithRelationInputSchema.array(),StatProfilOrderByWithRelationInputSchema ]).optional(),
  cursor: StatProfilWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StatProfilGroupByArgsSchema: z.ZodType<Prisma.StatProfilGroupByArgs> = z.object({
  where: StatProfilWhereInputSchema.optional(),
  orderBy: z.union([ StatProfilOrderByWithAggregationInputSchema.array(),StatProfilOrderByWithAggregationInputSchema ]).optional(),
  by: StatProfilScalarFieldEnumSchema.array(),
  having: StatProfilScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StatProfilFindUniqueArgsSchema: z.ZodType<Prisma.StatProfilFindUniqueArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereUniqueInputSchema,
}).strict() ;

export const StatProfilFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StatProfilFindUniqueOrThrowArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereUniqueInputSchema,
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

export const CreatureAttributeCreateArgsSchema: z.ZodType<Prisma.CreatureAttributeCreateArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  data: z.union([ CreatureAttributeCreateInputSchema,CreatureAttributeUncheckedCreateInputSchema ]),
}).strict() ;

export const CreatureAttributeUpsertArgsSchema: z.ZodType<Prisma.CreatureAttributeUpsertArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereUniqueInputSchema,
  create: z.union([ CreatureAttributeCreateInputSchema,CreatureAttributeUncheckedCreateInputSchema ]),
  update: z.union([ CreatureAttributeUpdateInputSchema,CreatureAttributeUncheckedUpdateInputSchema ]),
}).strict() ;

export const CreatureAttributeCreateManyArgsSchema: z.ZodType<Prisma.CreatureAttributeCreateManyArgs> = z.object({
  data: z.union([ CreatureAttributeCreateManyInputSchema,CreatureAttributeCreateManyInputSchema.array() ]),
}).strict() ;

export const CreatureAttributeDeleteArgsSchema: z.ZodType<Prisma.CreatureAttributeDeleteArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  where: CreatureAttributeWhereUniqueInputSchema,
}).strict() ;

export const CreatureAttributeUpdateArgsSchema: z.ZodType<Prisma.CreatureAttributeUpdateArgs> = z.object({
  select: CreatureAttributeSelectSchema.optional(),
  include: CreatureAttributeIncludeSchema.optional(),
  data: z.union([ CreatureAttributeUpdateInputSchema,CreatureAttributeUncheckedUpdateInputSchema ]),
  where: CreatureAttributeWhereUniqueInputSchema,
}).strict() ;

export const CreatureAttributeUpdateManyArgsSchema: z.ZodType<Prisma.CreatureAttributeUpdateManyArgs> = z.object({
  data: z.union([ CreatureAttributeUpdateManyMutationInputSchema,CreatureAttributeUncheckedUpdateManyInputSchema ]),
  where: CreatureAttributeWhereInputSchema.optional(),
}).strict() ;

export const CreatureAttributeDeleteManyArgsSchema: z.ZodType<Prisma.CreatureAttributeDeleteManyArgs> = z.object({
  where: CreatureAttributeWhereInputSchema.optional(),
}).strict() ;

export const ActionListCreateArgsSchema: z.ZodType<Prisma.ActionListCreateArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  data: z.union([ ActionListCreateInputSchema,ActionListUncheckedCreateInputSchema ]),
}).strict() ;

export const ActionListUpsertArgsSchema: z.ZodType<Prisma.ActionListUpsertArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereUniqueInputSchema,
  create: z.union([ ActionListCreateInputSchema,ActionListUncheckedCreateInputSchema ]),
  update: z.union([ ActionListUpdateInputSchema,ActionListUncheckedUpdateInputSchema ]),
}).strict() ;

export const ActionListCreateManyArgsSchema: z.ZodType<Prisma.ActionListCreateManyArgs> = z.object({
  data: z.union([ ActionListCreateManyInputSchema,ActionListCreateManyInputSchema.array() ]),
}).strict() ;

export const ActionListDeleteArgsSchema: z.ZodType<Prisma.ActionListDeleteArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  where: ActionListWhereUniqueInputSchema,
}).strict() ;

export const ActionListUpdateArgsSchema: z.ZodType<Prisma.ActionListUpdateArgs> = z.object({
  select: ActionListSelectSchema.optional(),
  include: ActionListIncludeSchema.optional(),
  data: z.union([ ActionListUpdateInputSchema,ActionListUncheckedUpdateInputSchema ]),
  where: ActionListWhereUniqueInputSchema,
}).strict() ;

export const ActionListUpdateManyArgsSchema: z.ZodType<Prisma.ActionListUpdateManyArgs> = z.object({
  data: z.union([ ActionListUpdateManyMutationInputSchema,ActionListUncheckedUpdateManyInputSchema ]),
  where: ActionListWhereInputSchema.optional(),
}).strict() ;

export const ActionListDeleteManyArgsSchema: z.ZodType<Prisma.ActionListDeleteManyArgs> = z.object({
  where: ActionListWhereInputSchema.optional(),
}).strict() ;

export const CreatureActionsCreateArgsSchema: z.ZodType<Prisma.CreatureActionsCreateArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  data: z.union([ CreatureActionsCreateInputSchema,CreatureActionsUncheckedCreateInputSchema ]),
}).strict() ;

export const CreatureActionsUpsertArgsSchema: z.ZodType<Prisma.CreatureActionsUpsertArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereUniqueInputSchema,
  create: z.union([ CreatureActionsCreateInputSchema,CreatureActionsUncheckedCreateInputSchema ]),
  update: z.union([ CreatureActionsUpdateInputSchema,CreatureActionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const CreatureActionsCreateManyArgsSchema: z.ZodType<Prisma.CreatureActionsCreateManyArgs> = z.object({
  data: z.union([ CreatureActionsCreateManyInputSchema,CreatureActionsCreateManyInputSchema.array() ]),
}).strict() ;

export const CreatureActionsDeleteArgsSchema: z.ZodType<Prisma.CreatureActionsDeleteArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  where: CreatureActionsWhereUniqueInputSchema,
}).strict() ;

export const CreatureActionsUpdateArgsSchema: z.ZodType<Prisma.CreatureActionsUpdateArgs> = z.object({
  select: CreatureActionsSelectSchema.optional(),
  include: CreatureActionsIncludeSchema.optional(),
  data: z.union([ CreatureActionsUpdateInputSchema,CreatureActionsUncheckedUpdateInputSchema ]),
  where: CreatureActionsWhereUniqueInputSchema,
}).strict() ;

export const CreatureActionsUpdateManyArgsSchema: z.ZodType<Prisma.CreatureActionsUpdateManyArgs> = z.object({
  data: z.union([ CreatureActionsUpdateManyMutationInputSchema,CreatureActionsUncheckedUpdateManyInputSchema ]),
  where: CreatureActionsWhereInputSchema.optional(),
}).strict() ;

export const CreatureActionsDeleteManyArgsSchema: z.ZodType<Prisma.CreatureActionsDeleteManyArgs> = z.object({
  where: CreatureActionsWhereInputSchema.optional(),
}).strict() ;

export const StatProfilCreateArgsSchema: z.ZodType<Prisma.StatProfilCreateArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  data: z.union([ StatProfilCreateInputSchema,StatProfilUncheckedCreateInputSchema ]),
}).strict() ;

export const StatProfilUpsertArgsSchema: z.ZodType<Prisma.StatProfilUpsertArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereUniqueInputSchema,
  create: z.union([ StatProfilCreateInputSchema,StatProfilUncheckedCreateInputSchema ]),
  update: z.union([ StatProfilUpdateInputSchema,StatProfilUncheckedUpdateInputSchema ]),
}).strict() ;

export const StatProfilCreateManyArgsSchema: z.ZodType<Prisma.StatProfilCreateManyArgs> = z.object({
  data: z.union([ StatProfilCreateManyInputSchema,StatProfilCreateManyInputSchema.array() ]),
}).strict() ;

export const StatProfilDeleteArgsSchema: z.ZodType<Prisma.StatProfilDeleteArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  where: StatProfilWhereUniqueInputSchema,
}).strict() ;

export const StatProfilUpdateArgsSchema: z.ZodType<Prisma.StatProfilUpdateArgs> = z.object({
  select: StatProfilSelectSchema.optional(),
  include: StatProfilIncludeSchema.optional(),
  data: z.union([ StatProfilUpdateInputSchema,StatProfilUncheckedUpdateInputSchema ]),
  where: StatProfilWhereUniqueInputSchema,
}).strict() ;

export const StatProfilUpdateManyArgsSchema: z.ZodType<Prisma.StatProfilUpdateManyArgs> = z.object({
  data: z.union([ StatProfilUpdateManyMutationInputSchema,StatProfilUncheckedUpdateManyInputSchema ]),
  where: StatProfilWhereInputSchema.optional(),
}).strict() ;

export const StatProfilDeleteManyArgsSchema: z.ZodType<Prisma.StatProfilDeleteManyArgs> = z.object({
  where: StatProfilWhereInputSchema.optional(),
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