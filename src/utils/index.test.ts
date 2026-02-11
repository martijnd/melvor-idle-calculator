import { describe, it, expect } from "vitest";
import {
  getCombatMultiplier,
  getMaximumNormalAttack,
  getMultiplier,
  calculateNormalAttackDamage,
  calculateSpecialAttackDamage,
  calculateMonsterSpecialAttackDamage,
  calculateMonsterMaxAttack,
  getAttacks,
  getAutoEatThreshold,
  calculateYakDRModifier,
  getMaxHit,
  getReducedMaxHit,
  getIsIdleable,
  getMinimumDR,
  getMinimumHP,
  calculateReducedMaxHit,
} from "./index";
import type { Data, CalculatedAttack } from "../types";
import type { Monster } from "../data";
import { slayerAreas, dungeons } from "../data";

function createBaseData(overrides: Partial<Data> = {}): Data {
  return {
    mode: "Normal",
    slayerArea: slayerAreas[0].name,
    slayerTier: "Normal",
    totalHealth: 1000,
    currentDR: 0,
    autoEatLevel: 2,
    combatStyle: "Melee",
    wastefulRing: "No",
    guardianAmulet: "No",
    yakSynergy: "None",
    stunDamage: "No",
    slayerAreaNegation: 0,
    dungeonChoice: dungeons[0].name,
    activeTab: "monsters",
    inputsVisible: true,
    ownedExpansions: { totH: true, aoD: true },
    ...overrides,
  };
}

function createMeleeMonster(overrides: Record<string, unknown> = {}): Monster {
  return {
    name: "Test Melee",
    attackStyle: "Melee",
    canStun: false,
    canSleep: false,
    usesNormalHit: true,
    attackLevel: 50,
    attackBonus: 0,
    specialAttack: [],
    intimidation: 0,
    id: "test:melee",
    areas: ["Farmlands"],
    ...overrides,
  } as unknown as Monster;
}

function createMagicMonster(overrides: Record<string, unknown> = {}): Monster {
  return {
    name: "Test Magic",
    attackStyle: "Magic",
    canStun: false,
    canSleep: false,
    usesNormalHit: true,
    attackLevel: 50,
    attackBonus: 0,
    spellMaxHit: 10,
    specialAttack: [],
    intimidation: 0,
    id: "test:magic",
    areas: ["Farmlands"],
    ...overrides,
  } as unknown as Monster;
}

describe("getCombatMultiplier", () => {
  it("returns 1 for same attack styles in Normal mode", () => {
    expect(getCombatMultiplier("Normal", "Melee", "Melee")).toBe(1);
    expect(getCombatMultiplier("Normal", "Ranged", "Ranged")).toBe(1);
    expect(getCombatMultiplier("Normal", "Magic", "Magic")).toBe(1);
  });

  it("returns correct multipliers for Melee vs others in Normal mode", () => {
    expect(getCombatMultiplier("Normal", "Melee", "Ranged")).toBe(1.25);
    expect(getCombatMultiplier("Normal", "Melee", "Magic")).toBe(0.75);
  });

  it("returns correct multipliers for Ranged vs others in Normal mode", () => {
    expect(getCombatMultiplier("Normal", "Ranged", "Melee")).toBe(0.95);
    expect(getCombatMultiplier("Normal", "Ranged", "Magic")).toBe(1.25);
  });

  it("returns correct multipliers for Magic vs others in Normal mode", () => {
    expect(getCombatMultiplier("Normal", "Magic", "Melee")).toBe(1.25);
    expect(getCombatMultiplier("Normal", "Magic", "Ranged")).toBe(0.85);
  });

  it("returns correct multipliers in Adventure mode", () => {
    expect(getCombatMultiplier("Adventure", "Melee", "Melee")).toBe(1);
    expect(getCombatMultiplier("Adventure", "Melee", "Magic")).toBe(0.5);
    expect(getCombatMultiplier("Adventure", "Ranged", "Melee")).toBe(0.75);
    expect(getCombatMultiplier("Adventure", "Magic", "Ranged")).toBe(0.75);
  });
});

describe("getMaximumNormalAttack", () => {
  it("returns positive value for Melee monster", () => {
    const monster = createMeleeMonster({ attackLevel: 50, attackBonus: 0 });
    const result = getMaximumNormalAttack(monster, 1);
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns higher value for higher attack level", () => {
    const lowLevel = createMeleeMonster({ attackLevel: 1, attackBonus: 0 });
    const highLevel = createMeleeMonster({ attackLevel: 100, attackBonus: 0 });
    expect(getMaximumNormalAttack(highLevel, 1)).toBeGreaterThan(
      getMaximumNormalAttack(lowLevel, 1),
    );
  });

  it("scales with numberMultiplier", () => {
    const monster = createMeleeMonster();
    const single = getMaximumNormalAttack(monster, 1);
    const double = getMaximumNormalAttack(monster, 2);
    expect(double).toBe(single * 2);
  });

  it("returns positive value for Magic monster with spellMaxHit", () => {
    const monster = createMagicMonster({ spellMaxHit: 10, attackLevel: 50 });
    const result = getMaximumNormalAttack(monster, 1);
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("getMultiplier", () => {
  it("returns 1 when stunDamage is No", () => {
    const monster = createMeleeMonster({ canStun: true, canSleep: true });
    const data = createBaseData({ stunDamage: "No" });
    expect(getMultiplier(monster, data)).toBe(1);
  });

  it("returns 1.3 when monster can stun and stunDamage is Yes", () => {
    const monster = createMeleeMonster({ canStun: true });
    const data = createBaseData({ stunDamage: "Yes" });
    expect(getMultiplier(monster, data)).toBe(1.3);
  });

  it("returns 1 when monster cannot stun or sleep and stunDamage is Yes", () => {
    const monster = createMeleeMonster({ canStun: false, canSleep: false });
    const data = createBaseData({ stunDamage: "Yes" });
    expect(getMultiplier(monster, data)).toBe(1);
  });

  it("returns 1.2 for sleepable monster in non-Foggy Lake area", () => {
    const monster = createMeleeMonster({
      canStun: false,
      canSleep: true,
      areas: ["Miolite Caves"],
    });
    const data = createBaseData({ stunDamage: "Yes" });
    expect(getMultiplier(monster, data)).toBe(1.2);
  });

  it("returns correct value for Foggy Lake area with slayer negation", () => {
    const monster = createMeleeMonster({
      canStun: false,
      canSleep: true,
      areas: ["Foggy Lake"],
    });
    const data = createBaseData({ stunDamage: "Yes", slayerAreaNegation: 100 });
    const result = getMultiplier(monster, data);
    expect(result).toBeGreaterThan(1);
    expect(result).toBeLessThanOrEqual(2.7);
  });
});

describe("calculateNormalAttackDamage", () => {
  it("returns integer value", () => {
    const monster = createMeleeMonster();
    const data = createBaseData();
    const result = calculateNormalAttackDamage(monster, 1, data);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("applies multiplier when stunDamage is Yes and monster can stun", () => {
    const monster = createMeleeMonster({ canStun: true });
    const dataNoStun = createBaseData({ stunDamage: "No" });
    const dataWithStun = createBaseData({ stunDamage: "Yes" });
    const withoutStun = calculateNormalAttackDamage(monster, 1, dataNoStun);
    const withStun = calculateNormalAttackDamage(monster, 1, dataWithStun);
    expect(withStun).toBe(Math.floor(withoutStun * 1.3));
  });
});

describe("calculateSpecialAttackDamage", () => {
  it("returns integer value", () => {
    const monster = createMeleeMonster();
    const data = createBaseData();
    const result = calculateSpecialAttackDamage(monster, 50, 1, data);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("scales with numberMultiplier", () => {
    const monster = createMeleeMonster();
    const data = createBaseData({ stunDamage: "No" });
    const single = calculateSpecialAttackDamage(monster, 100, 1, data);
    const double = calculateSpecialAttackDamage(monster, 100, 2, data);
    expect(double).toBe(single * 2);
  });
});

describe("getAutoEatThreshold", () => {
  it("returns 0.2 for autoEatLevel 1 without wasteful ring", () => {
    const data = createBaseData({ autoEatLevel: 1, wastefulRing: "No" });
    expect(getAutoEatThreshold(data)).toBe(0.2);
  });

  it("returns 0.3 for autoEatLevel 2 without wasteful ring", () => {
    const data = createBaseData({ autoEatLevel: 2, wastefulRing: "No" });
    expect(getAutoEatThreshold(data)).toBe(0.3);
  });

  it("returns 0.4 for autoEatLevel 3 without wasteful ring", () => {
    const data = createBaseData({ autoEatLevel: 3, wastefulRing: "No" });
    expect(getAutoEatThreshold(data)).toBe(0.4);
  });

  it("adds 0.05 when wasteful ring is Yes", () => {
    const data = createBaseData({ autoEatLevel: 2, wastefulRing: "Yes" });
    expect(getAutoEatThreshold(data)).toBe(0.35);
  });
});

describe("calculateYakDRModifier", () => {
  it("returns 0 when yakSynergy is None", () => {
    const data = createBaseData({ yakSynergy: "None" });
    expect(calculateYakDRModifier("Melee", false, data)).toBe(0);
  });

  it("returns 2 for Minotaur synergy vs Ranged attack style", () => {
    const data = createBaseData({ yakSynergy: "Minotaur" });
    expect(calculateYakDRModifier("Ranged", false, data)).toBe(2);
  });

  it("returns 2 for Centaur synergy vs Magic attack style", () => {
    const data = createBaseData({ yakSynergy: "Centaur" });
    expect(calculateYakDRModifier("Magic", false, data)).toBe(2);
  });

  it("returns 2 for Witch synergy vs Melee attack style", () => {
    const data = createBaseData({ yakSynergy: "Witch" });
    expect(calculateYakDRModifier("Melee", false, data)).toBe(2);
  });

  it("returns 3 for Cyclops synergy in slayer area", () => {
    const data = createBaseData({ yakSynergy: "Cyclops" });
    expect(calculateYakDRModifier("Melee", true, data)).toBe(3);
  });
});

describe("getMaxHit", () => {
  it("returns 0 for empty attacks", () => {
    expect(getMaxHit([])).toBe(0);
  });

  it("returns max hit from attacks", () => {
    const createAttack = (
      maxHit: number,
      reducedMaxHit: number,
    ): CalculatedAttack =>
      ({
        name: "Test",
        maxHit,
        reducedMaxHit,
        minimumDR: 0,
        minimumHP: 100,
        isIdleable: true,
        fixedAttack: true,
      }) as CalculatedAttack;
    const attacks = [
      createAttack(10, 8),
      createAttack(25, 20),
      createAttack(15, 12),
    ];
    expect(getMaxHit(attacks)).toBe(25);
  });
});

describe("getReducedMaxHit", () => {
  it("returns 0 for empty attacks", () => {
    expect(getReducedMaxHit([])).toBe(0);
  });

  it("returns max reducedMaxHit from attacks", () => {
    const createAttack = (
      maxHit: number,
      reducedMaxHit: number,
    ): CalculatedAttack =>
      ({
        name: "Test",
        maxHit,
        reducedMaxHit,
        minimumDR: 0,
        minimumHP: 100,
        isIdleable: true,
        fixedAttack: true,
      }) as CalculatedAttack;
    const attacks = [
      createAttack(10, 8),
      createAttack(25, 20),
      createAttack(15, 15),
    ];
    expect(getReducedMaxHit(attacks)).toBe(20);
  });
});

describe("getIsIdleable", () => {
  it("returns true when maxHit is below threshold", () => {
    const data = createBaseData({ totalHealth: 1000, autoEatLevel: 2 }); // threshold 0.3 = 300
    expect(getIsIdleable(250, data)).toBe(true);
  });

  it("returns false when maxHit exceeds threshold", () => {
    const data = createBaseData({ totalHealth: 1000, autoEatLevel: 2 });
    expect(getIsIdleable(350, data)).toBe(false);
  });

  it("returns true when maxHit equals threshold", () => {
    const data = createBaseData({ totalHealth: 1000, autoEatLevel: 2 });
    expect(getIsIdleable(300, data)).toBe(true);
  });
});

describe("calculateReducedMaxHit", () => {
  it("reduces damage based on DR", () => {
    const data = createBaseData({ currentDR: 50, stunDamage: "No" });
    const result = calculateReducedMaxHit("Melee", 200, false, 0, data);
    expect(result).toBeLessThan(200);
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("accounts for combat multiplier when player uses different style", () => {
    const data = createBaseData({
      currentDR: 50,
      combatStyle: "Magic",
      stunDamage: "No",
    });
    const meleeResult = calculateReducedMaxHit("Melee", 200, false, 0, data);
    const magicResult = calculateReducedMaxHit("Magic", 200, false, 0, data);
    expect(meleeResult).not.toBe(magicResult);
  });
});

describe("getMinimumDR", () => {
  it("returns non-negative value", () => {
    const data = createBaseData({ totalHealth: 1000, currentDR: 0 });
    const result = getMinimumDR("Melee", 100, 0, data);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("adds intimidation to result", () => {
    const data = createBaseData();
    const withoutIntimidation = getMinimumDR("Melee", 500, 0, data);
    const withIntimidation = getMinimumDR("Melee", 500, 5, data);
    expect(withIntimidation).toBe(withoutIntimidation + 5);
  });
});

describe("getMinimumHP", () => {
  it("returns at least 100", () => {
    const data = createBaseData();
    const result = getMinimumHP("Melee", 100, false, 0, data);
    expect(result).toBeGreaterThanOrEqual(100);
  });

  it("returns value divisible by 10", () => {
    const data = createBaseData();
    const result = getMinimumHP("Melee", 500, false, 0, data);
    expect(result % 10).toBe(0);
  });
});

describe("getAttacks", () => {
  it("returns normal attack for monster with usesNormalHit", () => {
    const monster = createMeleeMonster({
      usesNormalHit: true,
      specialAttack: [],
    });
    const data = createBaseData();
    const attacks = getAttacks(monster, false, 1, data);
    expect(attacks.length).toBeGreaterThanOrEqual(1);
    expect(attacks.some((a) => a.name === "Normal Attack")).toBe(true);
  });

  it("includes special attacks when present", () => {
    const monster = createMeleeMonster({
      usesNormalHit: true,
      specialAttack: [{ name: "Spores", maxHit: 15, fixedAttack: true }],
    });
    const data = createBaseData();
    const attacks = getAttacks(monster, false, 1, data);
    expect(attacks.length).toBe(2);
    expect(attacks.some((a) => a.name === "Spores")).toBe(true);
  });
});

describe("calculateMonsterSpecialAttackDamage", () => {
  it("returns 0 for monster with no special attacks", () => {
    const monster = createMeleeMonster({ specialAttack: [] });
    const data = createBaseData();
    expect(calculateMonsterSpecialAttackDamage(monster, 1, data)).toBe(0);
  });

  it("returns max special attack damage when monster has special attacks", () => {
    const monster = createMeleeMonster({
      specialAttack: [
        { name: "Spores", maxHit: 15, fixedAttack: true },
        { name: "Venom", maxHitMultiplier: 100, fixedAttack: false },
      ],
    });
    const data = createBaseData();
    const result = calculateMonsterSpecialAttackDamage(monster, 1, data);
    expect(result).toBeGreaterThan(0);
  });
});

describe("calculateMonsterMaxAttack", () => {
  it("returns at least normal attack damage", () => {
    const monster = createMeleeMonster({ specialAttack: [] });
    const data = createBaseData();
    const normalDamage = calculateNormalAttackDamage(monster, 1, data);
    const maxAttack = calculateMonsterMaxAttack(monster, 1, data);
    expect(maxAttack).toBeGreaterThanOrEqual(normalDamage);
  });

  it("returns higher of normal and special attack damage", () => {
    const monster = createMeleeMonster({
      specialAttack: [{ name: "Spores", maxHit: 500, fixedAttack: true }],
    });
    const data = createBaseData();
    const maxAttack = calculateMonsterMaxAttack(monster, 1, data);
    expect(maxAttack).toBeGreaterThanOrEqual(500);
  });
});
