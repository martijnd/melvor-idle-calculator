import { dungeons, slayerAreas } from "../data";

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
}
