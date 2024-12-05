export interface MonsterEntry {
  name?: string | null;
  size?: string | null;
  type?: string | null;
  subtype?: string | null;
  alignment?: string | null;
  armor_class?: number | null;
  hit_points?: number | null;
  hit_dice?: string | null;
  speed?: string | null;
  strength?: number | null;
  dexterity?: number | null;
  constitution?: number | null;
  intelligence?: number | null;
  wisdom?: number | null;
  charisma?: number | null;
  constitution_save?: number | null;
  intelligence_save?: number | null;
  wisdom_save?: number | null;
  history?: number | null;
  perception?: number | null;
  damage_vulnerabilities?: string | null;
  damage_resistances?: string | null;
  damage_immunities?: string | null;
  condition_immunities?: string | null;
  senses?: string | null;
  languages?: string | null;
  challenge_rating?: string | null;
  special_abilities?: (SpecialAbilitiesEntityOrActionsEntityOrLegendaryActionsEntity)[] | null;
  actions?: (ActionsEntity)[] | null;
  legendary_actions?: (SpecialAbilitiesEntityOrActionsEntityOrLegendaryActionsEntity)[] | null;
  description?: string | null;
  medicine?: number | null;
  religion?: number | null;
  dexterity_save?: number | null;
  charisma_save?: number | null;
  stealth?: number | null;
  persuasion?: number | null;
  insight?: number | null;
  deception?: number | null;
  arcana?: number | null;
  athletics?: number | null;
  acrobatics?: number | null;
  strength_save?: number | null;
  reactions?: (SpecialAbilitiesEntityOrLegendaryActionsEntityOrReactionsEntityOrActionsEntity)[] | null;
  survival?: number | null;
  investigation?: number | null;
  nature?: number | null;
  intimidation?: number | null;
  performance?: number | null;
  license?: (string)[] | null;
}
export interface SpecialAbilitiesEntityOrActionsEntityOrLegendaryActionsEntity {
  name: string;
  desc: string;
  attack_bonus: number;
  damage_dice?: string | null;
}
export interface ActionsEntity {
  name: string;
  desc: string;
  attack_bonus: number;
  damage_dice?: string | null;
  damage_bonus?: number | null;
}
export interface SpecialAbilitiesEntityOrLegendaryActionsEntityOrReactionsEntityOrActionsEntity {
  name: string;
  desc: string;
  attack_bonus: number;
}
