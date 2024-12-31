import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','isOwner','role','createdAt']);

export const CreatureScalarFieldEnumSchema = z.enum(['id','fullname','name','rank','isBoss','type','subtype','alignment','size','createdAt','updatedAt','level','attack','attackBonus','defense','defenseBonus','ranged','rangedBonus','health','armor','perception','perceptionBonus','magic','spirit','glory','flavor','description']);

export const AttributeScalarFieldEnumSchema = z.enum(['id','name','flavor','description']);

export const ActionScalarFieldEnumSchema = z.enum(['id','searchName','name','action','type','flavor','description','damages','effects','heal','target','range']);

export const SpellScalarFieldEnumSchema = z.enum(['id','number','titleGlaise','titleCommon','createdAt','updatedAt','level','type','cost','difficulty','casting','targetType','action','flavor','description','damages','heal','effects','range','duration','target','components']);

export const ComponentScalarFieldEnumSchema = z.enum(['id','searchName','name','quantity','description','weight','value','valueWeight','rarity','uses']);

export const ItemScalarFieldEnumSchema = z.enum(['id','quantity','searchName','name','description','weight','value','valueWeight','rarity','damages','armor','properties','isRelic','magicWeight']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RoleSchema = z.enum(['VIEWER','EDITOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const TypeSchema = z.enum(['oddity','plant','demon','fae','insect','person','beast','monster','undead','wyrm','golem']);

export type TypeType = `${z.infer<typeof TypeSchema>}`

export const AlignmentSchema = z.enum(['saint','good','neutral','bad','evil']);

export type AlignmentType = `${z.infer<typeof AlignmentSchema>}`

export const ActionTargetSchema = z.enum(['single','multiple','random','self','terrain','none']);

export type ActionTargetType = `${z.infer<typeof ActionTargetSchema>}`

export const ActionTypeSchema = z.enum(['main','limited','free','travel','epic']);

export type ActionTypeType = `${z.infer<typeof ActionTypeSchema>}`

export const CreatureSizeSchema = z.enum(['tiny','small','average','large','huge','gigantic']);

export type CreatureSizeType = `${z.infer<typeof CreatureSizeSchema>}`

export const SpellTypeSchema = z.enum(['mouflette','beast','nature','scourge','spirit','death','life','earth','fire','water','air','blood']);

export type SpellTypeType = `${z.infer<typeof SpellTypeSchema>}`

export const SpellActionSchema = z.enum(['charm','damage','heal','protect','enhance','link','create','transform','move','remove','restrain','puzzle']);

export type SpellActionType = `${z.infer<typeof SpellActionSchema>}`

export const SpellCastingSchema = z.enum(['instant','delayed','ritual','concentration','upkeep']);

export type SpellCastingType = `${z.infer<typeof SpellCastingSchema>}`

export const SpellTargetSchema = z.enum(['single','multiple','random','self','terrain','none']);

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
  type: TypeSchema.nullable(),
  alignment: AlignmentSchema.nullable(),
  size: CreatureSizeSchema.nullable(),
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
})

export type Attribute = z.infer<typeof AttributeSchema>

/////////////////////////////////////////
// ACTION SCHEMA
/////////////////////////////////////////

export const ActionSchema = z.object({
  action: ActionTypeSchema,
  id: z.string(),
  searchName: z.string(),
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
  searchName: z.string(),
  name: z.string(),
  quantity: z.number().nullable(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  uses: z.string().nullable(),
})

export type Component = z.infer<typeof ComponentSchema>

/////////////////////////////////////////
// ITEM SCHEMA
/////////////////////////////////////////

export const ItemSchema = z.object({
  id: z.string(),
  quantity: z.number().nullable(),
  searchName: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  damages: z.string().nullable(),
  armor: z.number().int().nullable(),
  properties: z.string().nullable(),
  isRelic: z.boolean().nullable(),
  magicWeight: z.number().int().nullable(),
})

export type Item = z.infer<typeof ItemSchema>

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
  description: z.string().nullable(),
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
// CREATURE ACTION
//------------------------------------------------------


/////////////////////////////////////////
// CREATURE ACTION SCHEMA
/////////////////////////////////////////

export const CreatureActionSchema = z.object({
  action: ActionTypeSchema,
  type: SpellActionSchema,
  target: ActionTargetSchema,
  name: z.string(),
  flavor: z.string().nullable(),
  description: z.string().nullable(),
  damages: z.string().nullable(),
  effects: z.string().nullable(),
  heal: z.string().nullable(),
  range: z.string().nullable(),
})

export type CreatureAction = z.infer<typeof CreatureActionSchema>
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
  WIL: z.number().int(),
  INS: z.number().int(),
  SEN: z.number().int(),
  CHA: z.number().int(),
  SOC: z.number().int(),
  ERU: z.number().int(),
})

export type StatProfil = z.infer<typeof StatProfilSchema>
// CREATURE COMPONENT
//------------------------------------------------------


/////////////////////////////////////////
// CREATURE COMPONENT SCHEMA
/////////////////////////////////////////

export const CreatureComponentSchema = z.object({
  name: z.string(),
  quantity: z.number().nullable(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  uses: z.string().nullable(),
})

export type CreatureComponent = z.infer<typeof CreatureComponentSchema>
// CREATURE ITEM
//------------------------------------------------------


/////////////////////////////////////////
// CREATURE ITEM SCHEMA
/////////////////////////////////////////

export const CreatureItemSchema = z.object({
  name: z.string(),
  quantity: z.number().nullable(),
  description: z.string().nullable(),
  weight: z.number().nullable(),
  value: z.number().nullable(),
  valueWeight: z.number().nullable(),
  rarity: z.string().nullable(),
  damages: z.string().nullable(),
  armor: z.number().int().nullable(),
  properties: z.string().nullable(),
  isRelic: z.boolean().nullable(),
  magicWeight: z.number().int().nullable(),
})

export type CreatureItem = z.infer<typeof CreatureItemSchema>

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
  loot: z.union([z.boolean(),z.lazy(() => CreatureItemArgsSchema)]).optional(),
  scavenge: z.union([z.boolean(),z.lazy(() => CreatureComponentArgsSchema)]).optional(),
  actionList: z.union([z.boolean(),z.lazy(() => ActionListArgsSchema)]).optional(),
  attributes: z.union([z.boolean(),z.lazy(() => CreatureAttributeArgsSchema)]).optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
  actions: z.union([z.boolean(),z.lazy(() => CreatureActionArgsSchema)]).optional(),
}).strict()

// ATTRIBUTE
//------------------------------------------------------

export const AttributeArgsSchema: z.ZodType<Prisma.AttributeDefaultArgs> = z.object({
  select: z.lazy(() => AttributeSelectSchema).optional(),
}).strict();

export const AttributeSelectSchema: z.ZodType<Prisma.AttributeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
}).strict()

// ACTION
//------------------------------------------------------

export const ActionArgsSchema: z.ZodType<Prisma.ActionDefaultArgs> = z.object({
  select: z.lazy(() => ActionSelectSchema).optional(),
}).strict();

export const ActionSelectSchema: z.ZodType<Prisma.ActionSelect> = z.object({
  id: z.boolean().optional(),
  searchName: z.boolean().optional(),
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
  searchName: z.boolean().optional(),
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  valueWeight: z.boolean().optional(),
  rarity: z.boolean().optional(),
  uses: z.boolean().optional(),
}).strict()

// ITEM
//------------------------------------------------------

export const ItemArgsSchema: z.ZodType<Prisma.ItemDefaultArgs> = z.object({
  select: z.lazy(() => ItemSelectSchema).optional(),
}).strict();

export const ItemSelectSchema: z.ZodType<Prisma.ItemSelect> = z.object({
  id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  searchName: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  valueWeight: z.boolean().optional(),
  rarity: z.boolean().optional(),
  damages: z.boolean().optional(),
  armor: z.boolean().optional(),
  properties: z.boolean().optional(),
  isRelic: z.boolean().optional(),
  magicWeight: z.boolean().optional(),
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
  WIL: z.boolean().optional(),
  INS: z.boolean().optional(),
  SEN: z.boolean().optional(),
  CHA: z.boolean().optional(),
  SOC: z.boolean().optional(),
  ERU: z.boolean().optional(),
}).strict()

// CREATURE ITEM
//------------------------------------------------------

export const CreatureItemArgsSchema: z.ZodType<Prisma.CreatureItemDefaultArgs> = z.object({
  select: z.lazy(() => CreatureItemSelectSchema).optional(),
}).strict();

export const CreatureItemSelectSchema: z.ZodType<Prisma.CreatureItemSelect> = z.object({
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  valueWeight: z.boolean().optional(),
  rarity: z.boolean().optional(),
  damages: z.boolean().optional(),
  armor: z.boolean().optional(),
  properties: z.boolean().optional(),
  isRelic: z.boolean().optional(),
  magicWeight: z.boolean().optional(),
}).strict()

// CREATURE COMPONENT
//------------------------------------------------------

export const CreatureComponentArgsSchema: z.ZodType<Prisma.CreatureComponentDefaultArgs> = z.object({
  select: z.lazy(() => CreatureComponentSelectSchema).optional(),
}).strict();

export const CreatureComponentSelectSchema: z.ZodType<Prisma.CreatureComponentSelect> = z.object({
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  description: z.boolean().optional(),
  weight: z.boolean().optional(),
  value: z.boolean().optional(),
  valueWeight: z.boolean().optional(),
  rarity: z.boolean().optional(),
  uses: z.boolean().optional(),
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

// CREATURE ATTRIBUTE
//------------------------------------------------------

export const CreatureAttributeArgsSchema: z.ZodType<Prisma.CreatureAttributeDefaultArgs> = z.object({
  select: z.lazy(() => CreatureAttributeSelectSchema).optional(),
}).strict();

export const CreatureAttributeSelectSchema: z.ZodType<Prisma.CreatureAttributeSelect> = z.object({
  name: z.boolean().optional(),
  flavor: z.boolean().optional(),
  description: z.boolean().optional(),
}).strict()

// CREATURE ACTION
//------------------------------------------------------

export const CreatureActionArgsSchema: z.ZodType<Prisma.CreatureActionDefaultArgs> = z.object({
  select: z.lazy(() => CreatureActionSelectSchema).optional(),
}).strict();

export const CreatureActionSelectSchema: z.ZodType<Prisma.CreatureActionSelect> = z.object({
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
  type: z.union([ z.lazy(() => EnumTypeNullableFilterSchema),z.lazy(() => TypeSchema) ]).optional().nullable(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentNullableFilterSchema),z.lazy(() => AlignmentSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeNullableFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemCompositeListFilterSchema),z.lazy(() => CreatureItemObjectEqualityInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentCompositeListFilterSchema),z.lazy(() => CreatureComponentObjectEqualityInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListCompositeFilterSchema),z.lazy(() => ActionListObjectEqualityInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeCompositeListFilterSchema),z.lazy(() => CreatureAttributeObjectEqualityInputSchema).array() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionCompositeListFilterSchema),z.lazy(() => CreatureActionObjectEqualityInputSchema).array() ]).optional(),
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
  loot: z.lazy(() => CreatureItemOrderByCompositeAggregateInputSchema).optional(),
  scavenge: z.lazy(() => CreatureComponentOrderByCompositeAggregateInputSchema).optional(),
  actionList: z.lazy(() => ActionListOrderByInputSchema).optional(),
  attributes: z.lazy(() => CreatureAttributeOrderByCompositeAggregateInputSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  actions: z.lazy(() => CreatureActionOrderByCompositeAggregateInputSchema).optional()
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
  type: z.union([ z.lazy(() => EnumTypeNullableFilterSchema),z.lazy(() => TypeSchema) ]).optional().nullable(),
  subtype: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentNullableFilterSchema),z.lazy(() => AlignmentSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeNullableFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemCompositeListFilterSchema),z.lazy(() => CreatureItemObjectEqualityInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentCompositeListFilterSchema),z.lazy(() => CreatureComponentObjectEqualityInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListCompositeFilterSchema),z.lazy(() => ActionListObjectEqualityInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeCompositeListFilterSchema),z.lazy(() => CreatureAttributeObjectEqualityInputSchema).array() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionCompositeListFilterSchema),z.lazy(() => CreatureActionObjectEqualityInputSchema).array() ]).optional(),
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
  type: z.union([ z.lazy(() => EnumTypeNullableWithAggregatesFilterSchema),z.lazy(() => TypeSchema) ]).optional().nullable(),
  subtype: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => EnumAlignmentNullableWithAggregatesFilterSchema),z.lazy(() => AlignmentSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => EnumCreatureSizeNullableWithAggregatesFilterSchema),z.lazy(() => CreatureSizeSchema) ]).optional().nullable(),
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
}).strict();

export const AttributeOrderByWithRelationInputSchema: z.ZodType<Prisma.AttributeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
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
}).strict());

export const AttributeOrderByWithAggregationInputSchema: z.ZodType<Prisma.AttributeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const ActionWhereInputSchema: z.ZodType<Prisma.ActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  searchName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ActionOrderByWithRelationInputSchema: z.ZodType<Prisma.ActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionWhereUniqueInputSchema: z.ZodType<Prisma.ActionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    searchName: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    searchName: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  searchName: z.string().optional(),
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const ActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
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
  _count: z.lazy(() => ActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  searchName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeWithAggregatesFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  range: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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
  searchName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  uses: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ComponentOrderByWithRelationInputSchema: z.ZodType<Prisma.ComponentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  uses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentWhereUniqueInputSchema: z.ZodType<Prisma.ComponentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    searchName: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    searchName: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  searchName: z.string().optional(),
  AND: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ComponentWhereInputSchema),z.lazy(() => ComponentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  uses: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const ComponentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ComponentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  uses: z.lazy(() => SortOrderSchema).optional(),
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
  searchName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  uses: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ItemWhereInputSchema: z.ZodType<Prisma.ItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  searchName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  properties: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRelic: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  magicWeight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  isRelic: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemWhereUniqueInputSchema: z.ZodType<Prisma.ItemWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    searchName: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    searchName: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  searchName: z.string().optional(),
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  properties: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRelic: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  magicWeight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
}).strict());

export const ItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  isRelic: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const ItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  searchName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  armor: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  properties: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isRelic: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  magicWeight: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
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
  type: z.lazy(() => TypeSchema).optional().nullable(),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema).optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListCreateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListCreateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]),
  attributes: z.union([ z.lazy(() => CreatureAttributeListCreateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListCreateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureUncheckedCreateInputSchema: z.ZodType<Prisma.CreatureUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema).optional().nullable(),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema).optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListCreateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListCreateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]),
  attributes: z.union([ z.lazy(() => CreatureAttributeListCreateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListCreateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureUpdateInputSchema: z.ZodType<Prisma.CreatureUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NullableEnumTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NullableEnumAlignmentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NullableEnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListUpdateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListUpdateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeListUpdateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListUpdateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureUncheckedUpdateInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NullableEnumTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NullableEnumAlignmentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NullableEnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListUpdateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListUpdateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeListUpdateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListUpdateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureCreateManyInputSchema: z.ZodType<Prisma.CreatureCreateManyInput> = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  name: z.string(),
  rank: z.string().optional().nullable(),
  isBoss: z.boolean().optional().nullable(),
  type: z.lazy(() => TypeSchema).optional().nullable(),
  subtype: z.string().optional().nullable(),
  alignment: z.lazy(() => AlignmentSchema).optional().nullable(),
  size: z.lazy(() => CreatureSizeSchema).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListCreateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListCreateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListCreateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]),
  attributes: z.union([ z.lazy(() => CreatureAttributeListCreateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListCreateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureUpdateManyMutationInputSchema: z.ZodType<Prisma.CreatureUpdateManyMutationInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NullableEnumTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NullableEnumAlignmentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NullableEnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListUpdateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListUpdateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeListUpdateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListUpdateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CreatureUncheckedUpdateManyInput> = z.object({
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isBoss: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NullableEnumTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subtype: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignment: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NullableEnumAlignmentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NullableEnumCreatureSizeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  loot: z.union([ z.lazy(() => CreatureItemListUpdateEnvelopeInputSchema),z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  scavenge: z.union([ z.lazy(() => CreatureComponentListUpdateEnvelopeInputSchema),z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  actionList: z.union([ z.lazy(() => ActionListUpdateEnvelopeInputSchema),z.lazy(() => ActionListCreateInputSchema) ]).optional(),
  attributes: z.union([ z.lazy(() => CreatureAttributeListUpdateEnvelopeInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actions: z.union([ z.lazy(() => CreatureActionListUpdateEnvelopeInputSchema),z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const AttributeCreateInputSchema: z.ZodType<Prisma.AttributeCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const AttributeUncheckedCreateInputSchema: z.ZodType<Prisma.AttributeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const AttributeUpdateInputSchema: z.ZodType<Prisma.AttributeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeUncheckedUpdateInputSchema: z.ZodType<Prisma.AttributeUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AttributeCreateManyInputSchema: z.ZodType<Prisma.AttributeCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
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
}).strict();

export const ActionCreateInputSchema: z.ZodType<Prisma.ActionCreateInput> = z.object({
  id: z.string().optional(),
  searchName: z.string(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionUncheckedCreateInputSchema: z.ZodType<Prisma.ActionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  searchName: z.string(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionUpdateInputSchema: z.ZodType<Prisma.ActionUpdateInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUncheckedUpdateInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionCreateManyInputSchema: z.ZodType<Prisma.ActionCreateManyInput> = z.object({
  id: z.string().optional(),
  searchName: z.string(),
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.string().optional().nullable(),
  range: z.string().optional().nullable()
}).strict();

export const ActionUpdateManyMutationInputSchema: z.ZodType<Prisma.ActionUpdateManyMutationInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  searchName: z.string(),
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  uses: z.string().optional().nullable()
}).strict();

export const ComponentUncheckedCreateInputSchema: z.ZodType<Prisma.ComponentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  searchName: z.string(),
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  uses: z.string().optional().nullable()
}).strict();

export const ComponentUpdateInputSchema: z.ZodType<Prisma.ComponentUpdateInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  uses: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ComponentUncheckedUpdateInputSchema: z.ZodType<Prisma.ComponentUncheckedUpdateInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  uses: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ComponentCreateManyInputSchema: z.ZodType<Prisma.ComponentCreateManyInput> = z.object({
  id: z.string().optional(),
  searchName: z.string(),
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  uses: z.string().optional().nullable()
}).strict();

export const ComponentUpdateManyMutationInputSchema: z.ZodType<Prisma.ComponentUpdateManyMutationInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  uses: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ComponentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ComponentUncheckedUpdateManyInput> = z.object({
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  uses: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemCreateInputSchema: z.ZodType<Prisma.ItemCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  searchName: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  armor: z.number().int().optional().nullable(),
  properties: z.string().optional().nullable(),
  isRelic: z.boolean().optional().nullable(),
  magicWeight: z.number().int().optional().nullable()
}).strict();

export const ItemUncheckedCreateInputSchema: z.ZodType<Prisma.ItemUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  searchName: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  armor: z.number().int().optional().nullable(),
  properties: z.string().optional().nullable(),
  isRelic: z.boolean().optional().nullable(),
  magicWeight: z.number().int().optional().nullable()
}).strict();

export const ItemUpdateInputSchema: z.ZodType<Prisma.ItemUpdateInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  properties: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRelic: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicWeight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  properties: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRelic: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicWeight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemCreateManyInputSchema: z.ZodType<Prisma.ItemCreateManyInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().optional().nullable(),
  searchName: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  armor: z.number().int().optional().nullable(),
  properties: z.string().optional().nullable(),
  isRelic: z.boolean().optional().nullable(),
  magicWeight: z.number().int().optional().nullable()
}).strict();

export const ItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemUpdateManyMutationInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  properties: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRelic: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicWeight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyInput> = z.object({
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  armor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  properties: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRelic: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicWeight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const EnumTypeNullableFilterSchema: z.ZodType<Prisma.EnumTypeNullableFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional().nullable(),
  in: z.lazy(() => TypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => TypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumAlignmentNullableFilterSchema: z.ZodType<Prisma.EnumAlignmentNullableFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional().nullable(),
  in: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  notIn: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumCreatureSizeNullableFilterSchema: z.ZodType<Prisma.EnumCreatureSizeNullableFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional().nullable(),
  in: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
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
  WIL: z.number(),
  INS: z.number(),
  SEN: z.number(),
  CHA: z.number(),
  SOC: z.number(),
  ERU: z.number()
}).strict();

export const CreatureItemCompositeListFilterSchema: z.ZodType<Prisma.CreatureItemCompositeListFilter> = z.object({
  equals: z.lazy(() => CreatureItemObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => CreatureItemWhereInputSchema).optional(),
  some: z.lazy(() => CreatureItemWhereInputSchema).optional(),
  none: z.lazy(() => CreatureItemWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const CreatureItemObjectEqualityInputSchema: z.ZodType<Prisma.CreatureItemObjectEqualityInput> = z.object({
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  armor: z.number().optional().nullable(),
  properties: z.string().optional().nullable(),
  isRelic: z.boolean().optional().nullable(),
  magicWeight: z.number().optional().nullable()
}).strict();

export const CreatureComponentCompositeListFilterSchema: z.ZodType<Prisma.CreatureComponentCompositeListFilter> = z.object({
  equals: z.lazy(() => CreatureComponentObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => CreatureComponentWhereInputSchema).optional(),
  some: z.lazy(() => CreatureComponentWhereInputSchema).optional(),
  none: z.lazy(() => CreatureComponentWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const CreatureComponentObjectEqualityInputSchema: z.ZodType<Prisma.CreatureComponentObjectEqualityInput> = z.object({
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  uses: z.string().optional().nullable()
}).strict();

export const ActionListCompositeFilterSchema: z.ZodType<Prisma.ActionListCompositeFilter> = z.object({
  equals: z.lazy(() => ActionListObjectEqualityInputSchema).optional(),
  is: z.lazy(() => ActionListWhereInputSchema).optional(),
  isNot: z.lazy(() => ActionListWhereInputSchema).optional()
}).strict();

export const ActionListObjectEqualityInputSchema: z.ZodType<Prisma.ActionListObjectEqualityInput> = z.object({
  main: z.number(),
  limited: z.number().optional().nullable(),
  free: z.number().optional().nullable(),
  travel: z.number().optional().nullable(),
  epic: z.number()
}).strict();

export const CreatureAttributeCompositeListFilterSchema: z.ZodType<Prisma.CreatureAttributeCompositeListFilter> = z.object({
  equals: z.lazy(() => CreatureAttributeObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => CreatureAttributeWhereInputSchema).optional(),
  some: z.lazy(() => CreatureAttributeWhereInputSchema).optional(),
  none: z.lazy(() => CreatureAttributeWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const CreatureAttributeObjectEqualityInputSchema: z.ZodType<Prisma.CreatureAttributeObjectEqualityInput> = z.object({
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const CreatureActionCompositeListFilterSchema: z.ZodType<Prisma.CreatureActionCompositeListFilter> = z.object({
  equals: z.lazy(() => CreatureActionObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => CreatureActionWhereInputSchema).optional(),
  some: z.lazy(() => CreatureActionWhereInputSchema).optional(),
  none: z.lazy(() => CreatureActionWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional()
}).strict();

export const CreatureActionObjectEqualityInputSchema: z.ZodType<Prisma.CreatureActionObjectEqualityInput> = z.object({
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.lazy(() => SpellActionSchema),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.lazy(() => ActionTargetSchema),
  range: z.string().optional().nullable()
}).strict();

export const StatProfilOrderByInputSchema: z.ZodType<Prisma.StatProfilOrderByInput> = z.object({
  CEL: z.lazy(() => SortOrderSchema).optional(),
  AGI: z.lazy(() => SortOrderSchema).optional(),
  DEX: z.lazy(() => SortOrderSchema).optional(),
  STR: z.lazy(() => SortOrderSchema).optional(),
  END: z.lazy(() => SortOrderSchema).optional(),
  VIT: z.lazy(() => SortOrderSchema).optional(),
  WIL: z.lazy(() => SortOrderSchema).optional(),
  INS: z.lazy(() => SortOrderSchema).optional(),
  SEN: z.lazy(() => SortOrderSchema).optional(),
  CHA: z.lazy(() => SortOrderSchema).optional(),
  SOC: z.lazy(() => SortOrderSchema).optional(),
  ERU: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureItemOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.CreatureItemOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureComponentOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.CreatureComponentOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionListOrderByInputSchema: z.ZodType<Prisma.ActionListOrderByInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  limited: z.lazy(() => SortOrderSchema).optional(),
  free: z.lazy(() => SortOrderSchema).optional(),
  travel: z.lazy(() => SortOrderSchema).optional(),
  epic: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureAttributeOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.CreatureAttributeOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CreatureActionOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.CreatureActionOrderByCompositeAggregateInput> = z.object({
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

export const EnumTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional().nullable(),
  in: z.lazy(() => TypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => TypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTypeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumAlignmentNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAlignmentNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional().nullable(),
  in: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  notIn: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlignmentNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlignmentNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumCreatureSizeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCreatureSizeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional().nullable(),
  in: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
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

export const AttributeCountOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttributeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttributeMinOrderByAggregateInputSchema: z.ZodType<Prisma.AttributeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumActionTypeFilterSchema: z.ZodType<Prisma.EnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export const ActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  flavor: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  effects: z.lazy(() => SortOrderSchema).optional(),
  heal: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  range: z.lazy(() => SortOrderSchema).optional()
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
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  uses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  uses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  uses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ComponentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ComponentSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional()
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

export const ItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  isRelic: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  isRelic: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  searchName: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  isRelic: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  valueWeight: z.lazy(() => SortOrderSchema).optional(),
  armor: z.lazy(() => SortOrderSchema).optional(),
  magicWeight: z.lazy(() => SortOrderSchema).optional()
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
  WIL: z.number(),
  INS: z.number(),
  SEN: z.number(),
  CHA: z.number(),
  SOC: z.number(),
  ERU: z.number()
}).strict();

export const CreatureItemListCreateEnvelopeInputSchema: z.ZodType<Prisma.CreatureItemListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureItemCreateInputSchema: z.ZodType<Prisma.CreatureItemCreateInput> = z.object({
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  armor: z.number().optional().nullable(),
  properties: z.string().optional().nullable(),
  isRelic: z.boolean().optional().nullable(),
  magicWeight: z.number().optional().nullable()
}).strict();

export const CreatureComponentListCreateEnvelopeInputSchema: z.ZodType<Prisma.CreatureComponentListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureComponentCreateInputSchema: z.ZodType<Prisma.CreatureComponentCreateInput> = z.object({
  name: z.string(),
  quantity: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
  valueWeight: z.number().optional().nullable(),
  rarity: z.string().optional().nullable(),
  uses: z.string().optional().nullable()
}).strict();

export const ActionListCreateEnvelopeInputSchema: z.ZodType<Prisma.ActionListCreateEnvelopeInput> = z.object({
  set: z.lazy(() => ActionListCreateInputSchema).optional()
}).strict();

export const ActionListCreateInputSchema: z.ZodType<Prisma.ActionListCreateInput> = z.object({
  main: z.number().optional(),
  limited: z.number().optional().nullable(),
  free: z.number().optional().nullable(),
  travel: z.number().optional().nullable(),
  epic: z.number().optional()
}).strict();

export const CreatureAttributeListCreateEnvelopeInputSchema: z.ZodType<Prisma.CreatureAttributeListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureAttributeCreateInputSchema: z.ZodType<Prisma.CreatureAttributeCreateInput> = z.object({
  name: z.string(),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const CreatureActionListCreateEnvelopeInputSchema: z.ZodType<Prisma.CreatureActionListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
}).strict();

export const CreatureActionCreateInputSchema: z.ZodType<Prisma.CreatureActionCreateInput> = z.object({
  name: z.string(),
  action: z.lazy(() => ActionTypeSchema),
  type: z.lazy(() => SpellActionSchema),
  flavor: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  damages: z.string().optional().nullable(),
  effects: z.string().optional().nullable(),
  heal: z.string().optional().nullable(),
  target: z.lazy(() => ActionTargetSchema),
  range: z.string().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableEnumTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TypeSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableEnumAlignmentFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumAlignmentFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AlignmentSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableEnumCreatureSizeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumCreatureSizeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CreatureSizeSchema).optional().nullable(),
  unset: z.boolean().optional()
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

export const CreatureItemListUpdateEnvelopeInputSchema: z.ZodType<Prisma.CreatureItemListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => CreatureItemCreateInputSchema),z.lazy(() => CreatureItemCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => CreatureItemUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => CreatureItemDeleteManyInputSchema).optional()
}).strict();

export const CreatureComponentListUpdateEnvelopeInputSchema: z.ZodType<Prisma.CreatureComponentListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => CreatureComponentCreateInputSchema),z.lazy(() => CreatureComponentCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => CreatureComponentUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => CreatureComponentDeleteManyInputSchema).optional()
}).strict();

export const ActionListUpdateEnvelopeInputSchema: z.ZodType<Prisma.ActionListUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => ActionListCreateInputSchema).optional(),
  update: z.lazy(() => ActionListUpdateInputSchema).optional()
}).strict();

export const CreatureAttributeListUpdateEnvelopeInputSchema: z.ZodType<Prisma.CreatureAttributeListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => CreatureAttributeCreateInputSchema),z.lazy(() => CreatureAttributeCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => CreatureAttributeUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => CreatureAttributeDeleteManyInputSchema).optional()
}).strict();

export const CreatureActionListUpdateEnvelopeInputSchema: z.ZodType<Prisma.CreatureActionListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => CreatureActionCreateInputSchema),z.lazy(() => CreatureActionCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => CreatureActionUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => CreatureActionDeleteManyInputSchema).optional()
}).strict();

export const EnumActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActionTypeSchema).optional()
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

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
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

export const NestedEnumTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumTypeNullableFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional().nullable(),
  in: z.lazy(() => TypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => TypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumAlignmentNullableFilterSchema: z.ZodType<Prisma.NestedEnumAlignmentNullableFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional().nullable(),
  in: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  notIn: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumCreatureSizeNullableFilterSchema: z.ZodType<Prisma.NestedEnumCreatureSizeNullableFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional().nullable(),
  in: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
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
  WIL: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  INS: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  SEN: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CHA: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  SOC: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ERU: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CreatureItemWhereInputSchema: z.ZodType<Prisma.CreatureItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureItemWhereInputSchema),z.lazy(() => CreatureItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureItemWhereInputSchema),z.lazy(() => CreatureItemWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  armor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  properties: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRelic: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  magicWeight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const CreatureComponentWhereInputSchema: z.ZodType<Prisma.CreatureComponentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureComponentWhereInputSchema),z.lazy(() => CreatureComponentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureComponentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureComponentWhereInputSchema),z.lazy(() => CreatureComponentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  valueWeight: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rarity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  uses: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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

export const CreatureAttributeWhereInputSchema: z.ZodType<Prisma.CreatureAttributeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureAttributeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureAttributeWhereInputSchema),z.lazy(() => CreatureAttributeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CreatureActionWhereInputSchema: z.ZodType<Prisma.CreatureActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CreatureActionWhereInputSchema),z.lazy(() => CreatureActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CreatureActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CreatureActionWhereInputSchema),z.lazy(() => CreatureActionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumSpellActionFilterSchema),z.lazy(() => SpellActionSchema) ]).optional(),
  flavor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  damages: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  effects: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  heal: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  target: z.union([ z.lazy(() => EnumActionTargetFilterSchema),z.lazy(() => ActionTargetSchema) ]).optional(),
  range: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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

export const NestedEnumTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TypeSchema).optional().nullable(),
  in: z.lazy(() => TypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => TypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TypeSchema),z.lazy(() => NestedEnumTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTypeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumAlignmentNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAlignmentNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlignmentSchema).optional().nullable(),
  in: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  notIn: z.lazy(() => AlignmentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => AlignmentSchema),z.lazy(() => NestedEnumAlignmentNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlignmentNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlignmentNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumCreatureSizeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCreatureSizeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CreatureSizeSchema).optional().nullable(),
  in: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  notIn: z.lazy(() => CreatureSizeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => CreatureSizeSchema),z.lazy(() => NestedEnumCreatureSizeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCreatureSizeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
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

export const StatProfilUpdateInputSchema: z.ZodType<Prisma.StatProfilUpdateInput> = z.object({
  CEL: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AGI: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DEX: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STR: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  END: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  VIT: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  WIL: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  INS: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SEN: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CHA: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  SOC: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ERU: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CreatureItemUpdateManyInputSchema: z.ZodType<Prisma.CreatureItemUpdateManyInput> = z.object({
  where: z.lazy(() => CreatureItemWhereInputSchema),
  data: z.lazy(() => CreatureItemUpdateInputSchema)
}).strict();

export const CreatureItemDeleteManyInputSchema: z.ZodType<Prisma.CreatureItemDeleteManyInput> = z.object({
  where: z.lazy(() => CreatureItemWhereInputSchema)
}).strict();

export const CreatureComponentUpdateManyInputSchema: z.ZodType<Prisma.CreatureComponentUpdateManyInput> = z.object({
  where: z.lazy(() => CreatureComponentWhereInputSchema),
  data: z.lazy(() => CreatureComponentUpdateInputSchema)
}).strict();

export const CreatureComponentDeleteManyInputSchema: z.ZodType<Prisma.CreatureComponentDeleteManyInput> = z.object({
  where: z.lazy(() => CreatureComponentWhereInputSchema)
}).strict();

export const ActionListUpdateInputSchema: z.ZodType<Prisma.ActionListUpdateInput> = z.object({
  main: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  free: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  travel: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  epic: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CreatureAttributeUpdateManyInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateManyInput> = z.object({
  where: z.lazy(() => CreatureAttributeWhereInputSchema),
  data: z.lazy(() => CreatureAttributeUpdateInputSchema)
}).strict();

export const CreatureAttributeDeleteManyInputSchema: z.ZodType<Prisma.CreatureAttributeDeleteManyInput> = z.object({
  where: z.lazy(() => CreatureAttributeWhereInputSchema)
}).strict();

export const CreatureActionUpdateManyInputSchema: z.ZodType<Prisma.CreatureActionUpdateManyInput> = z.object({
  where: z.lazy(() => CreatureActionWhereInputSchema),
  data: z.lazy(() => CreatureActionUpdateInputSchema)
}).strict();

export const CreatureActionDeleteManyInputSchema: z.ZodType<Prisma.CreatureActionDeleteManyInput> = z.object({
  where: z.lazy(() => CreatureActionWhereInputSchema)
}).strict();

export const EnumSpellActionFilterSchema: z.ZodType<Prisma.EnumSpellActionFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional(),
  in: z.lazy(() => SpellActionSchema).array().optional(),
  notIn: z.lazy(() => SpellActionSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionFilterSchema) ]).optional(),
}).strict();

export const EnumActionTargetFilterSchema: z.ZodType<Prisma.EnumActionTargetFilter> = z.object({
  equals: z.lazy(() => ActionTargetSchema).optional(),
  in: z.lazy(() => ActionTargetSchema).array().optional(),
  notIn: z.lazy(() => ActionTargetSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTargetSchema),z.lazy(() => NestedEnumActionTargetFilterSchema) ]).optional(),
}).strict();

export const CreatureItemUpdateInputSchema: z.ZodType<Prisma.CreatureItemUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  armor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  properties: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRelic: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicWeight: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureComponentUpdateInputSchema: z.ZodType<Prisma.CreatureComponentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valueWeight: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rarity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  uses: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureAttributeUpdateInputSchema: z.ZodType<Prisma.CreatureAttributeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CreatureActionUpdateInputSchema: z.ZodType<Prisma.CreatureActionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => EnumSpellActionFieldUpdateOperationsInputSchema) ]).optional(),
  flavor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  damages: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  effects: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  heal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.union([ z.lazy(() => ActionTargetSchema),z.lazy(() => EnumActionTargetFieldUpdateOperationsInputSchema) ]).optional(),
  range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSpellActionFilterSchema: z.ZodType<Prisma.NestedEnumSpellActionFilter> = z.object({
  equals: z.lazy(() => SpellActionSchema).optional(),
  in: z.lazy(() => SpellActionSchema).array().optional(),
  notIn: z.lazy(() => SpellActionSchema).array().optional(),
  not: z.union([ z.lazy(() => SpellActionSchema),z.lazy(() => NestedEnumSpellActionFilterSchema) ]).optional(),
}).strict();

export const NestedEnumActionTargetFilterSchema: z.ZodType<Prisma.NestedEnumActionTargetFilter> = z.object({
  equals: z.lazy(() => ActionTargetSchema).optional(),
  in: z.lazy(() => ActionTargetSchema).array().optional(),
  notIn: z.lazy(() => ActionTargetSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTargetSchema),z.lazy(() => NestedEnumActionTargetFilterSchema) ]).optional(),
}).strict();

export const EnumSpellActionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSpellActionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SpellActionSchema).optional()
}).strict();

export const EnumActionTargetFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActionTargetFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActionTargetSchema).optional()
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
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttributeScalarFieldEnumSchema,AttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttributeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AttributeFindFirstOrThrowArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  where: AttributeWhereInputSchema.optional(),
  orderBy: z.union([ AttributeOrderByWithRelationInputSchema.array(),AttributeOrderByWithRelationInputSchema ]).optional(),
  cursor: AttributeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttributeScalarFieldEnumSchema,AttributeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttributeFindManyArgsSchema: z.ZodType<Prisma.AttributeFindManyArgs> = z.object({
  select: AttributeSelectSchema.optional(),
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
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const AttributeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AttributeFindUniqueOrThrowArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const ActionFindFirstArgsSchema: z.ZodType<Prisma.ActionFindFirstArgs> = z.object({
  select: ActionSelectSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActionFindFirstOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindManyArgsSchema: z.ZodType<Prisma.ActionFindManyArgs> = z.object({
  select: ActionSelectSchema.optional(),
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
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActionFindUniqueOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
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

export const ItemFindFirstArgsSchema: z.ZodType<Prisma.ItemFindFirstArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemFindFirstOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindManyArgsSchema: z.ZodType<Prisma.ItemFindManyArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemAggregateArgsSchema: z.ZodType<Prisma.ItemAggregateArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemGroupByArgsSchema: z.ZodType<Prisma.ItemGroupByArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithAggregationInputSchema.array(),ItemOrderByWithAggregationInputSchema ]).optional(),
  by: ItemScalarFieldEnumSchema.array(),
  having: ItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemFindUniqueArgsSchema: z.ZodType<Prisma.ItemFindUniqueArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemFindUniqueOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereUniqueInputSchema,
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
  data: z.union([ AttributeCreateInputSchema,AttributeUncheckedCreateInputSchema ]),
}).strict() ;

export const AttributeUpsertArgsSchema: z.ZodType<Prisma.AttributeUpsertArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
  create: z.union([ AttributeCreateInputSchema,AttributeUncheckedCreateInputSchema ]),
  update: z.union([ AttributeUpdateInputSchema,AttributeUncheckedUpdateInputSchema ]),
}).strict() ;

export const AttributeCreateManyArgsSchema: z.ZodType<Prisma.AttributeCreateManyArgs> = z.object({
  data: z.union([ AttributeCreateManyInputSchema,AttributeCreateManyInputSchema.array() ]),
}).strict() ;

export const AttributeDeleteArgsSchema: z.ZodType<Prisma.AttributeDeleteArgs> = z.object({
  select: AttributeSelectSchema.optional(),
  where: AttributeWhereUniqueInputSchema,
}).strict() ;

export const AttributeUpdateArgsSchema: z.ZodType<Prisma.AttributeUpdateArgs> = z.object({
  select: AttributeSelectSchema.optional(),
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
  data: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
}).strict() ;

export const ActionUpsertArgsSchema: z.ZodType<Prisma.ActionUpsertArgs> = z.object({
  select: ActionSelectSchema.optional(),
  where: ActionWhereUniqueInputSchema,
  create: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
  update: z.union([ ActionUpdateInputSchema,ActionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ActionCreateManyArgsSchema: z.ZodType<Prisma.ActionCreateManyArgs> = z.object({
  data: z.union([ ActionCreateManyInputSchema,ActionCreateManyInputSchema.array() ]),
}).strict() ;

export const ActionDeleteArgsSchema: z.ZodType<Prisma.ActionDeleteArgs> = z.object({
  select: ActionSelectSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionUpdateArgsSchema: z.ZodType<Prisma.ActionUpdateArgs> = z.object({
  select: ActionSelectSchema.optional(),
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

export const ItemCreateArgsSchema: z.ZodType<Prisma.ItemCreateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  data: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
}).strict() ;

export const ItemUpsertArgsSchema: z.ZodType<Prisma.ItemUpsertArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereUniqueInputSchema,
  create: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
  update: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItemCreateManyArgsSchema: z.ZodType<Prisma.ItemCreateManyArgs> = z.object({
  data: z.union([ ItemCreateManyInputSchema,ItemCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemDeleteArgsSchema: z.ZodType<Prisma.ItemDeleteArgs> = z.object({
  select: ItemSelectSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateArgsSchema: z.ZodType<Prisma.ItemUpdateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  data: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateManyArgsSchema: z.ZodType<Prisma.ItemUpdateManyArgs> = z.object({
  data: z.union([ ItemUpdateManyMutationInputSchema,ItemUncheckedUpdateManyInputSchema ]),
  where: ItemWhereInputSchema.optional(),
}).strict() ;

export const ItemDeleteManyArgsSchema: z.ZodType<Prisma.ItemDeleteManyArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
}).strict() ;