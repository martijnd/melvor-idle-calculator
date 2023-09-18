import { Monster } from "../data";
import { Attack, AttackStyle, CalculatedAttack, Data } from "../types";

export function getCombatMultiplier(
  mode: "Normal" | "Adventure",
  attackStyle1: AttackStyle,
  attackStyle2: AttackStyle
) {
  if (mode === "Normal") {
    return {
      Melee: {
        Melee: 1,
        Ranged: 1.25,
        Magic: 0.75,
      },
      Ranged: {
        Melee: 0.95,
        Ranged: 1,
        Magic: 1.25,
      },
      Magic: {
        Melee: 1.25,
        Ranged: 0.85,
        Magic: 1,
      },
    }[attackStyle1][attackStyle2];
  }

  return {
    Melee: { Melee: 1, Ranged: 1.25, Magic: 0.5 },
    Ranged: { Melee: 0.75, Ranged: 1, Magic: 1.25 },
    Magic: { Melee: 1.25, Ranged: 0.75, Magic: 1 },
  }[attackStyle1][attackStyle2];
}

export function getMaximumNormalAttack(
  monster: Monster,
  numberMultiplier: number
) {
  if (monster.attackStyle === "Melee") {
    const effectiveAttackLevel = monster.attackLevel + 9;
    return Math.floor(
      numberMultiplier *
        (1.3 +
          effectiveAttackLevel / 10 +
          monster.attackBonus / 80 +
          (effectiveAttackLevel * monster.attackBonus) / 640)
    );
  }
  if (monster.attackStyle === "Ranged") {
    const effectiveAttackLevel = monster.attackLevel + 9;
    return Math.floor(
      numberMultiplier *
        (1.3 +
          effectiveAttackLevel / 10 +
          monster.attackBonus / 80 +
          (effectiveAttackLevel * monster.attackBonus) / 640)
    );
  }
  if (monster.attackStyle === "Magic") {
    return Math.floor(
      numberMultiplier *
        monster.spellMaxHit *
        (1 + monster.attackBonus / 100) *
        (1 + (monster.attackLevel + 1) / 200)
    );
  }

  return 0;
}

export function getMultiplier(monster: Monster, data: Data) {
  if (data.stunDamage === "No") {
    return 1;
  }

  if (monster.canStun) {
    return 1.3;
  }

  if (!monster.canSleep) {
    return 1;
  }

  if (monster.areas[0] === "Foggy Lake") {
    return 1.2 + 1.5 - Math.min(150, data.slayerAreaNegation) / 100;
  }
  return 1.2;
}

export function calculateNormalAttackDamage(
  monster: Monster,
  numberMultiplier: number,
  data: Data
) {
  const maximumNormalAttack = getMaximumNormalAttack(monster, numberMultiplier);

  const multiplier = getMultiplier(monster, data);

  return Math.floor(maximumNormalAttack * multiplier);
}

export function calculateSpecialAttackDamage(
  monster: Monster,
  specialAttack: number,
  numberMultiplier: number,
  data: Data
) {
  let baseDamage = specialAttack * numberMultiplier;
  const multiplier = getMultiplier(monster, data);

  return Math.floor(baseDamage * multiplier);
}

export function calculateMonsterSpecialAttackDamage(
  monster: Monster,
  numberMultiplier: number,
  data: Data
) {
  return monster.specialAttack.reduce((maxSpecialAttack, specialAttack) => {
    if ("maxHit" in specialAttack) {
      const currentSpecialAttack = calculateSpecialAttackDamage(
        monster,
        specialAttack.maxHit + (specialAttack.name === "Savage Spike" ? 18 : 0),
        numberMultiplier,
        data
      );

      if (currentSpecialAttack > maxSpecialAttack) {
        return currentSpecialAttack;
      }
    }
    return maxSpecialAttack;
  }, 0);
}

export function calculateMonsterMaxAttack(
  monster: Monster,
  numberMultiplier: number,
  data: Data
) {
  const maxNormalAttack = calculateNormalAttackDamage(
    monster,
    numberMultiplier,
    data
  );

  const maxSpecialAttack = calculateMonsterSpecialAttackDamage(
    monster,
    numberMultiplier,
    data
  );

  return Math.max(maxNormalAttack, maxSpecialAttack);
}

export function getAttacks(
  monster: Monster,
  isSlayer: boolean,
  numberMultiplier: number,
  data: Data
): CalculatedAttack[] {
  const attacks: CalculatedAttack[] = [];

  if (monster.usesNormalHit) {
    attacks.push(getNormalAttack(monster, isSlayer, numberMultiplier, data));
  }

  if (monster.specialAttack?.length) {
    monster.specialAttack.forEach((specialAttack) => {
      attacks.push(
        getSpecialAttack(
          specialAttack,
          monster,
          isSlayer,
          numberMultiplier,
          data
        )
      );
    });
  }

  return attacks;
}

export function getMaxHit(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((maxAttackDamage, attack) => {
    return Math.max(maxAttackDamage, attack.maxHit);
  }, 0);
}

export function getReducedMaxHit(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((maxAttackDamage, attack) => {
    return Math.max(maxAttackDamage, attack.reducedMaxHit);
  }, 0);
}

export function getNormalAttack(
  monster: Monster,
  isSlayer: boolean,
  numberMultiplier: number,
  data: Data
): CalculatedAttack {
  const maxHit = calculateNormalAttackDamage(monster, numberMultiplier, data);
  const reducedMaxHit = calculateReducedMaxHit(
    monster.attackStyle,
    maxHit,
    isSlayer,
    monster.intimidation,
    data
  );
  const minimumDR = getMinimumDR(
    monster.attackStyle,
    reducedMaxHit,
    monster.intimidation,
    data
  );
  const minimumHP = getMinimumHP(
    monster.attackStyle,
    reducedMaxHit,
    isSlayer,
    monster.intimidation,
    data
  );
  const isIdleable = getIsIdleable(reducedMaxHit, data);

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

export function getSpecialAttack(
  attack: Attack,
  monster: Monster,
  isSlayer: boolean,
  numberMultiplier: number,
  data: Data
): CalculatedAttack {
  let maxHit = getMaxHitForSpecialAttack(
    attack,
    monster,
    numberMultiplier,
    data
  );

  const reducedMaxHit = calculateReducedMaxHit(
    monster.attackStyle,
    maxHit,
    isSlayer,
    monster.intimidation,
    data
  );
  const minimumDR = getMinimumDR(
    monster.attackStyle,
    reducedMaxHit,
    monster.intimidation,
    data
  );
  const minimumHP = getMinimumHP(
    monster.attackStyle,
    reducedMaxHit,
    isSlayer,
    monster.intimidation,
    data
  );
  const isIdleable = getIsIdleable(reducedMaxHit, data);

  if (attack.fixedAttack) {
    return {
      name: attack.name,
      minimumDR,
      minimumHP,
      isIdleable,
      maxHit,
      reducedMaxHit,
      fixedAttack: attack.fixedAttack,
    };
  }
  return {
    name: attack.name,
    minimumDR,
    minimumHP,
    isIdleable,
    maxHit,
    reducedMaxHit,
    fixedAttack: attack.fixedAttack,
    maxHitMultiplier: attack.maxHitMultiplier,
  };
}

export function getMaxHitForSpecialAttack(
  attack: Attack,
  monster: Monster,
  numberMultiplier: number,
  data: Data
) {
  const normalHitAttacks = [
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
  if (normalHitAttacks.includes(attack.name)) {
    return calculateNormalAttackDamage(monster, numberMultiplier, data);
  }
  if (attack.name === "Lesser Sandstorm") {
    const normalAttack = calculateNormalAttackDamage(
      monster,
      numberMultiplier,
      data
    );
    return Math.ceil(normalAttack + 120 * numberMultiplier * 0.05);
  }

  if (attack.name === "Greater Sandstorm") {
    return Math.ceil(185 * numberMultiplier * 0.15);
  }

  if (attack.name === "Confusion") {
    return 0;
  }

  if (attack.name === "Savage Spike") {
    return calculateSpecialAttackDamage(monster, 18, numberMultiplier, data); // Might need to change this if TotH enemies use Savage Spike
  }

  if (attack.name === "Horn Shots") {
    return Math.floor(
      calculateNormalAttackDamage(monster, numberMultiplier, data) * 0.6
    );
  }

  // Standard special attack
  if ("fixedAttack" in attack) {
    if (attack.fixedAttack) {
      return calculateSpecialAttackDamage(
        monster,
        attack.maxHit,
        numberMultiplier,
        data
      ); // Damage is fixed
    }

    return Math.floor(
      (calculateNormalAttackDamage(monster, numberMultiplier, data) *
        attack.maxHitMultiplier) /
        100
    ); // Damage is based off the base damage of the monster
  }
  return 0;
}

export function getIsIdleable(maxHit: number, data: Data) {
  return maxHit <= data.totalHealth * getAutoEatThreshold(data);
}

export function calculateYakDRModifier(
  monsterAttackStyle: AttackStyle,
  isSlayer: boolean,
  data: Data
) {
  if (
    (data.yakSynergy === "Minotaur" && monsterAttackStyle === "Ranged") ||
    (data.yakSynergy === "Centaur" && monsterAttackStyle === "Magic") ||
    (data.yakSynergy === "Witch" && monsterAttackStyle === "Melee")
  ) {
    return 2;
  }

  if (data.yakSynergy === "Cyclops" && isSlayer) {
    return 3;
  }

  return 0;
}

export function getMinimumDR(
  attackStyle: AttackStyle,
  maxHit: number,
  intimidation: number,
  data: Data
) {
  const combatMultiplier = getCombatMultiplier(
    data.mode,
    data.combatStyle,
    attackStyle
  );

  const autoEatPercentage = 100 * getAutoEatThreshold(data);
  return Math.max(
    0,
    Math.min(
      100,
      Math.ceil(
        Math.ceil(100 - (data.totalHealth / maxHit) * autoEatPercentage) /
          combatMultiplier
      )
    ) + intimidation
  );
}

export function getMinimumHP(
  attackStyle: AttackStyle,
  maxHit: number,
  isSlayer: boolean,
  intimidation: number,
  data: Data
) {
  const intimidatedDR = data.currentDR - intimidation;
  const yakAdjustedDr =
    intimidatedDR + calculateYakDRModifier(attackStyle, isSlayer, data);
  return Math.max(
    100,
    Math.ceil(
      (maxHit -
        Math.floor(
          (maxHit *
            Math.floor(
              yakAdjustedDr *
                getCombatMultiplier(data.mode, data.combatStyle, attackStyle)
            )) /
            100
        )) /
        getAutoEatThreshold(data) /
        10
    ) * 10
  );
}

export function calculateReducedMaxHit(
  attackStyle: AttackStyle,
  maxHit: number,
  isSlayer: boolean,
  intimidation: number,
  data: Data
) {
  const intimidatedDR = data.currentDR - intimidation;
  const yakAdjustedDr =
    intimidatedDR + calculateYakDRModifier(attackStyle, isSlayer, data);
  const combatMultiplier = getCombatMultiplier(
    data.mode,
    data.combatStyle,
    attackStyle
  );
  const combatAdjustedDr = Math.floor(yakAdjustedDr * combatMultiplier);
  const attackReduction = maxHit * (Math.min(100, combatAdjustedDr) / 100);
  const reducedHit = Math.floor(maxHit - attackReduction);

  if (
    data.guardianAmulet === "No" ||
    (reducedHit > data.totalHealth * 0.5 &&
      reducedHit < data.totalHealth * getAutoEatThreshold(data))
  ) {
    return reducedHit;
  }

  return Math.floor(
    maxHit - (maxHit * Math.floor((yakAdjustedDr + 5) * combatMultiplier)) / 100
  );
}

export function getAutoEatThreshold(data: Data) {
  const baseTreshold = data.wastefulRing === "Yes" ? 0.05 : 0;

  return {
    1: baseTreshold + 0.2,
    2: baseTreshold + 0.3,
    3: baseTreshold + 0.4,
  }[data.autoEatLevel];
}
