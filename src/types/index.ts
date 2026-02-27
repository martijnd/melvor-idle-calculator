import { dungeons, slayerAreas } from "../data";

export type ExpansionId = "totH" | "aoD";

export type OwnedExpansions = {
  totH: boolean;
  aoD: boolean;
};

export type CalculatedAttack = {
  minimumDR: number;
  minimumHP: number;
  isIdleable: boolean;
  maxHit: number;
  reducedMaxHit: number;
} & Attack;

export type Attack = {
  name: string;
} & (
  | {
      fixedAttack: true;
      maxHit: number;
    }
  | {
      fixedAttack: false;
      maxHitMultiplier: number;
    }
);

export type AttackStyle = "Melee" | "Ranged" | "Magic";

export interface Character {
  id: string;
  name: string;
  mode: "Normal" | "Adventure";
  totalHealth: number;
  currentDR: number;
  autoEatLevel: 1 | 2 | 3;
  combatStyle: "Melee" | "Ranged" | "Magic";
  wastefulRing: "Yes" | "No";
  guardianAmulet: "Yes" | "No";
  yakSynergy: "None" | "Minotaur" | "Centaur" | "Witch" | "Cyclops";
  stunDamage: "Yes" | "No";
  slayerAreaNegation: number;
}

export function createDefaultCharacter(name = "Character 1"): Character {
  return {
    id: crypto.randomUUID(),
    name,
    mode: "Normal",
    totalHealth: 600,
    currentDR: 20,
    autoEatLevel: 1,
    combatStyle: "Melee",
    wastefulRing: "No",
    guardianAmulet: "No",
    yakSynergy: "None",
    stunDamage: "Yes",
    slayerAreaNegation: 0,
  };
}

export interface Data {
  mode: "Normal" | "Adventure";
  slayerArea: (typeof slayerAreas)[number]["name"];
  slayerTier:
    | "Easy"
    | "Normal"
    | "Hard"
    | "Elite"
    | "Master"
    | "Legendary"
    | "Mythical";
  totalHealth: number;
  currentDR: number;
  autoEatLevel: 1 | 2 | 3;
  combatStyle: "Melee" | "Ranged" | "Magic";
  wastefulRing: "Yes" | "No";
  guardianAmulet: "Yes" | "No";
  yakSynergy: "None" | "Minotaur" | "Centaur" | "Witch" | "Cyclops";
  stunDamage: "Yes" | "No";
  slayerAreaNegation: number;
  dungeonChoice: (typeof dungeons)[number]["name"];
  activeTab: "monsters" | "dungeons" | "slayer" | "slayerAreas";
  inputsVisible: boolean;
  ownedExpansions: OwnedExpansions;
}

export interface AppState {
  characters: Character[];
  activeCharacterId: string;
  charactersSectionVisible: boolean;
  slayerArea: (typeof slayerAreas)[number]["name"];
  slayerTier: Data["slayerTier"];
  dungeonChoice: (typeof dungeons)[number]["name"];
  activeTab: Data["activeTab"];
  inputsVisible: boolean;
  ownedExpansions: OwnedExpansions;
}
