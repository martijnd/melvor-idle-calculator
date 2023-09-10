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
