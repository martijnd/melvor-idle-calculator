import { Attack, CalculatedAttack } from "../types";

type MonsterSpecs = {
  name: string;
  canStun: boolean;
  canSleep: boolean;
  usesNormalHit: boolean;
  attackLevel: number;
  attackBonus: number;
  specialAttack: ReadonlyArray<Attack>;
  intimidation: number;
  id: string;
  areas: ReadonlyArray<string>;
} & (
  | {
      attackStyle: "Melee" | "Ranged";
    }
  | {
      attackStyle: "Magic";
      spellMaxHit: number;
    }
);

export class Monster {
  specs: MonsterSpecs;

  constructor(specs: MonsterSpecs) {
    this.specs = specs;
  }

  getAttacks(monster: Monster, isSlayer: boolean): CalculatedAttack[] {
    const attacks: CalculatedAttack[] = [];

    if (monster.specs.usesNormalHit) {
      attacks.push(this.#getNormalAttack(monster, isSlayer));
    }

    if (monster.specs.specialAttack?.length) {
      monster.specs.specialAttack.forEach((specialAttack) => {
        attacks.push(this.#getSpecialAttack(specialAttack, monster, isSlayer));
      });
    }

    return attacks;
  }

  #getNormalAttack(monster: Monster, isSlayer: boolean): CalculatedAttack {
    const maxHit = calculateNormalAttack(monster);
    const reducedMaxHit = calculateReducedMaxHit(
      monster.specs.attackStyle,
      maxHit,
      isSlayer,
      monster.specs.intimidation
    );
    const minimumDR = getMinimumDR(
      monster.specs.attackStyle,
      maxHit,
      monster.specs.intimidation
    );
    const minimumHP = getMinimumHP(
      monster.specs.attackStyle,
      maxHit,
      isSlayer,
      monster.specs.intimidation
    );
    const isIdleable = getIsIdleable(reducedMaxHit);

    return {
      name: "Normal Attack",
      minimumDR,
      minimumHP,
      isIdleable,
      maxHit,
      reducedMaxHit,
      fixedAttack: true,
    };
  }

  #getSpecialAttack(
    attack: Attack,
    monster: Monster,
    isSlayer: boolean
  ): CalculatedAttack {
    let normalHitAttacks = [
      "Volley",
      "Burning Trail",
      "Infernal Volley",
      "Frostburn",
      "Venom",
      "Rapid Fire",
      "Elemental Impact (Stun)",
      "Elemental Impact (Freeze)",
      "Elemental Impact (Burn)",
      "Elemental Impact (Frostburn)",
      "Ram",
      "Fleetness",
    ];
    let maxHit = 0;
    if (normalHitAttacks.includes(attack.name)) {
      maxHit = this.calculateNormalAttack(
        attack.maxHitMultiplier,
        monster.specs.canStun ? "Yes" : "No",
        monster.specs.areas[0] === "Foggy Lake" ? 150 : 0
      );
    } else if (attack.name === "Lesser Sandstorm") {
      let normalAttack = this.calculateNormalAttack();
      let adjustedAttack = normalAttack + 120 * numberMultiplier * 0.05;
      maxHit = Math.ceil(adjustedAttack);
    } else if (attack.name === "Greater Sandstorm") {
      let adjustedAttack = 185 * numberMultiplier.value * 0.15;
      maxHit = Math.ceil(adjustedAttack);
    } else if (attack.name === "Confusion") {
      maxHit = 0;
    } else if (attack.name === "Savage Spike") {
      maxHit = this.calculateSpecialAttackDamage(
        maxHit + 18,
        monster.specs.canStun,
        monster.specs.canSleep,
        monster.specs.areas
      ); // Might need to change this if TotH enemies use Savage Spike
    } else if (attack.name === "Horn Shots") {
      maxHit = Math.floor(
        this.calculateNormalAttack(
          1.5,
          monster.specs.canStun ? "Yes" : "No",
          monster.specs.areas[0] === "Foggy Lake" ? 150 : 0
        ) * 0.6
      );
    } else {
      // Standard special attack
      if ("fixedAttack" in attack) {
        if (attack.fixedAttack) {
          maxHit = this.calculateSpecialAttackDamage(
            attack.maxHit,
            monster.specs.canStun,
            monster.specs.canSleep,
            monster.specs.areas
          ); // Damage is fixed
        } else {
          maxHit = Math.floor(
            (this.calculateNormalAttack() * attack.maxHitMultiplier) / 100
          ); // Damage is based off the base damage of the monster
        }
      }
    }
  }

  calculateNormalAttack(
    numberMultiplier: number,
    stunDamage: string,
    slayerAreaNegation: number
  ) {
    let maximumNormalAttack = 0;
    if (this.specs.attackStyle === "Melee") {
      let effectiveAttackLevel = this.specs.attackLevel + 9;
      maximumNormalAttack = Math.floor(
        numberMultiplier *
          (1.3 +
            effectiveAttackLevel / 10 +
            this.specs.attackBonus / 80 +
            (effectiveAttackLevel * this.specs.attackBonus) / 640)
      );
    } else if (this.specs.attackStyle === "Ranged") {
      let effectiveAttackLevel = this.specs.attackLevel + 9;
      maximumNormalAttack = Math.floor(
        numberMultiplier *
          (1.3 +
            effectiveAttackLevel / 10 +
            this.specs.attackBonus / 80 +
            (effectiveAttackLevel * this.specs.attackBonus) / 640)
      );
    } else if (this.specs.attackStyle === "Magic") {
      maximumNormalAttack = Math.floor(
        numberMultiplier *
          this.specs.spellMaxHit *
          (1 + this.specs.attackBonus / 100) *
          (1 + (this.specs.attackLevel + 1) / 200)
      );
    }

    let multiplier = 1;
    if (stunDamage === "Yes") {
      if (this.specs.canStun) {
        multiplier = 1.3;
      } else if (this.specs.canSleep) {
        multiplier = 1.2;
        if (this.specs.areas[0] === "Foggy Lake")
          multiplier += 1.5 - Math.min(150, slayerAreaNegation) / 100;
      }
    }

    return Math.floor(maximumNormalAttack * multiplier);
  }

  calculateSpecialAttackDamage(
    numberMultiplier: number,
    stunDamage: string,
    slayerAreaNegation: number,
    specialAttack: number,
    canStun: boolean,
    canSleep: boolean,
    areas: ReadonlyArray<string>
  ) {
    let baseDamage = specialAttack * numberMultiplier;
    let multiplier = 1;
    if (stunDamage === "Yes") {
      if (canStun) {
        multiplier = 1.3;
      } else if (canSleep) {
        multiplier = 1.2;
        if (areas.includes("Foggy Lake"))
          multiplier += 1.5 - Math.min(150, slayerAreaNegation) / 100;
      }
    }

    return Math.floor(baseDamage * multiplier);
  }
}
