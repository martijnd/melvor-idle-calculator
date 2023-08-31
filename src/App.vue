<template>
  <div class="flex flex-col min-h-screen text-white bg-dark">
    <div class="relative flex-1 max-w-screen-lg px-4 py-4 mx-auto">
      <h1 class="text-2xl font-bold text-center">Melvor Idle calculator</h1>
      <hr class="my-4" />
      <div class="sticky top-0 mb-1 bg-dark">
        <div v-if="data.inputsVisible"
          class="flex flex-col justify-center py-4 mt-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div class="flex space-x-4 md:w-1/2">
            <label for="totalHealth" class="w-1/2">
              <div class="mb-1 font-semibold">Total health</div>
              <input id="totalHealth" class="w-full px-4 py-2 text-white rounded bg-dark-light" type="number" step="10"
                min="0" v-model="data.totalHealth" />
            </label>
            <label for="currentDR" class="w-1/2">
              <div class="mb-1 font-semibold">Current DR (%)</div>
              <input id="currentDR" class="w-full px-4 py-2 text-white rounded bg-dark-light" type="number" step="1"
                min="0" max="100" v-model="data.currentDR" />
            </label>
          </div>
          <div class="flex space-x-4 md:w-1/2">
            <label for="autoEatLevel" class="w-1/2">
              <div class="mb-1 font-semibold">Auto Eat</div>
              <select id="autoEatLevel" class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.autoEatLevel">
                <option v-for="value of [1, 2, 3]" :value="value">
                  Level {{ value }}
                </option>
              </select>
            </label>
            <label for="combatStyle" class="w-1/2">
              <div class="mb-1 font-semibold">Combat style</div>
              <select id="combatStyle" class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.combatStyle">
                <option v-for="value of ['Melee', 'Ranged', 'Magic']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
          </div>
          <div class="flex space-x-4 md:w-1/2">
            <label for="autoEatLevel" class="w-1/2">
              <div class="mb-1 font-semibold">Wasteful ring</div>
              <select id="wastefulRing" class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.wastefulRing">
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label for="combatStyle" class="w-1/2">
              <div class="mb-1 font-semibold">Guardian am.</div>
              <select id="guardianAmulet" class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.guardianAmulet">
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 text-sm italic text-center text-gray-300">
          <span>Auto Eat Threshold is {{ Math.floor(autoEatTreshold) }} HP</span>
          <button :class="`bottom-2 right-0 transform ${data.inputsVisible ? 'rotate-180' : ''
            }`" @click="data.inputsVisible = !data.inputsVisible">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15.25 10.75L12 14.25L8.75 10.75"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="rounded bg-dark-light">
        <div id="tabs" class="flex">
          <button :class="`tab border border-r-0 px-4 py-2 rounded-tl flex-1 hover:bg-dark-lighter ${data.activeTab === 'monsters'
            ? 'font-bold bg-dark'
            : 'bg-dark-light'
            }`" @click="data.activeTab = 'monsters'">
            Monsters
          </button>
          <button :class="`tab border px-4 py-2 border-r-0 flex-1 hover:bg-dark-lighter ${data.activeTab === 'dungeons'
            ? 'font-bold bg-dark'
            : 'bg-dark-light'
            }`" @click="data.activeTab = 'dungeons'">
            Dungeons
          </button>
          <button :class="`tab border px-4 py-2 rounded-tr flex-1 hover:bg-dark-lighter ${data.activeTab === 'slayer'
            ? 'font-bold bg-dark'
            : 'bg-dark-light'
            }`" @click="data.activeTab = 'slayer'">
            Slayer
          </button>
        </div>
        <div class="p-4" v-if="data.activeTab === 'monsters'">
          <div class="flex items-center justify-between my-4">
            <h2 class="text-xl font-semibold">Monsters</h2>
          </div>
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="hidden px-4 py-2 text-left md:table-cell">
                  Attack style
                </th>
                <th class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="monster of monsters"
                :class="calculateIdleability(getMaxHit(getAttacks(monster, false))) ? `bg-[#1a7c43]` : `bg-[#6b2727]`">
                <td class="px-4 py-2">
                  <a class="hover:underline" :href="`https://wiki.melvoridle.com/w/${monster.name}`" target="_blank">
                    {{ monster.name }}</a>
                </td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle ?? 'N/A' }}
                </td>
                <td class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  {{ calculateMonsterMaxAttack(monster) }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(getAttacks(monster, false)) }})
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  {{ getDRNeeded(monster) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4" v-if="data.activeTab === 'dungeons'">
          <div class="flex items-center justify-between my-4">
            <h2 class="text-xl font-semibold">
              Dungeons
              <svg v-if="canIdleDungeon" class="inline text-[#1a7c43]" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75" />
              </svg>
              <svg v-else class="inline text-[#6b2727]" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M17.25 6.75L6.75 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6.75 6.75L17.25 17.25"></path>
              </svg>
            </h2>
            <select id="dungeon" class="text-white px-4 py-2 rounded bg-[#474747]" v-model="data.dungeonChoice">
              <option v-for="dungeon of dungeons" :value="dungeon.name">
                {{ dungeon.name }}
              </option>
            </select>
          </div>
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="hidden px-4 py-2 text-left md:table-cell">
                  Attack style
                </th>
                <th class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="monster of dungeonChoiceMonsters"
                :class="calculateIdleability(getMaxHit(getAttacks(monster, false))) ? `bg-[#1a7c43]` : `bg-[#6b2727]`">
                <td class="px-4 py-2">
                  <a class="hover:underline" :href="`https://wiki.melvoridle.com/w/${monster.name}`" target="_blank">{{
                    monster.name }}</a>
                </td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle }}
                </td>
                <td class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  {{ getMaxHit(getAttacks(monster, false)) }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(getAttacks(monster, false)) }})
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  {{ calculateMinimumDR(monster.attackStyle, getMaxHit(getAttacks(monster, false)), monster.intimidation)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4" v-if="data.activeTab === 'slayer'">
          <div class="flex items-center justify-between my-4">
            <h2 class="text-xl font-semibold">
              Slayer
              <svg v-if="canIdleSlayerTier" class="inline text-[#1a7c43]" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75" />
              </svg>
              <svg v-else class="inline text-[#6b2727]" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M17.25 6.75L6.75 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6.75 6.75L17.25 17.25"></path>
              </svg>
            </h2>
            <select id="slayer" class="text-white px-4 py-2 rounded bg-[#474747]" v-model="data.slayerTier">
              <option v-for="tier of slayerTiers" :value="tier.name">
                {{ tier.name }}
              </option>
            </select>
          </div>
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="hidden px-4 py-2 text-left md:table-cell">
                  Attack style
                </th>
                <th class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="monster of slayerTierMonsters"
                :class="calculateIdleability(getMaxHit(getAttacks(monster, true))) ? `bg-[#1a7c43]` : `bg-[#6b2727]`">
                <td class="px-4 py-2">
                  <a class="hover:underline" :href="`https://wiki.melvoridle.com/w/${monster.name}`" target="_blank">{{
                    monster.name }}</a>
                </td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle }}
                </td>
                <td class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
                  {{ getMaxHit(getAttacks(monster, true)) }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(getAttacks(monster, true)) }})
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  {{ getDRNeeded(monster) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer class="text-center py-4 border-t border-[#272727] text-[#686868]">
      Made by
      <a class="hover:underline" href="https://www.martijndorsman.nl">Martijn Dorsman</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue";
import { Monster, dungeons, monsters, slayerTiers } from "./data";

onMounted(() => {
  if (localStorage['data']) {
    data = JSON.parse(localStorage["data"]);
  }
});

interface Data {
  mode: string;
  slayerTier: 'Easy' | 'Normal' | 'Hard' | 'Elite' | 'Master' | 'Legendary' | 'Mythical';
  totalHealth: number;
  currentDR: number;
  autoEatLevel: 1 | 2 | 3;
  combatStyle: 'Melee' | 'Ranged' | 'Magic';
  wastefulRing: 'Yes' | 'No';
  guardianAmulet: 'Yes' | 'No';
  yakSynergy: "None" | "Minotaur" | "Centaur" | "Witch" | "Cyclops";
  stunDamage: 'Yes' | 'No';
  slayerAreaNegation: number;
  dungeonChoice: typeof dungeons[number]['name'];
  activeTab: 'monsters' | 'dungeons' | 'slayer';
  inputsVisible: boolean;

}

let data = reactive<Data>({
  mode: 'Normal',
  slayerTier: "Easy",
  totalHealth: 600,
  currentDR: 20,
  autoEatLevel: 1,
  combatStyle: "Melee",
  wastefulRing: "No",
  guardianAmulet: "No",
  yakSynergy: "None",
  stunDamage: "No",
  slayerAreaNegation: 0,
  dungeonChoice: "Chicken Coop",
  activeTab: "monsters",
  inputsVisible: true,
});

const dungeonChoiceMonsters = computed(() =>
  dungeons
    .find((dungeon) => dungeon.name === data.dungeonChoice)
    ?.monsters.map(getMonster)
);

const slayerTierMonsters = computed(() =>
  slayerTiers
    .find((dungeon) => dungeon.name === data.slayerTier)
    ?.monsters.map(getMonster)
);

function getMonster(monsterString: string) {
  return (
    monsters.find(
      (monster) => monster.name === monsterString
    ) ?? monsters[0]
  );
}

const tresholds = [0.2, 0.3, 0.4];

const autoEatTreshold = computed(() => {
  return (
    (tresholds[data.autoEatLevel - 1] +
      (data.wastefulRing === "Yes" ? 0.05 : 0)) *
    data.totalHealth
  );
});

function getMultiplier(monsterAttackStyle: Monster["attackStyle"]) {
  if (monsterAttackStyle === null) return 1;
  const multipliers = {
    Melee: {
      Ranged: 1.25,
      Magic: 0.5,
      Melee: 1,
    },
    Ranged: {
      Melee: 0.95,
      Magic: 1.25,
      Ranged: 1,
    },
    Magic: {
      Melee: 1.25,
      Ranged: 0.85,
      Magic: 1,
    },
  } as const;

  return multipliers[data.combatStyle][
    monsterAttackStyle
  ];
}

function getNettoDR(monsterAttackStyle: Monster["attackStyle"]) {
  return Math.floor(
    getMultiplier(monsterAttackStyle) *
    (Number(data.currentDR) + (data.guardianAmulet === "Yes" ? 5 : 0))
  );
}

const canIdleDungeon = computed(() => {
  if (dungeonChoiceMonsters.value) {
    return dungeonChoiceMonsters.value.every(monster => calculateIdleability(getMaxHit(getAttacks(monster, false))));
  }

  return false;
});

const canIdleSlayerTier = computed(() => {
  if (slayerTierMonsters.value) {
    return slayerTierMonsters.value.every(monster => calculateIdleability(getMaxHit(getAttacks(monster, false))));
  }

  return false;
});

function getDRNeeded(monster: Monster) {
  return Math.max(
    0,
    Math.ceil(
      Math.ceil(
        100 -
        (data.totalHealth / calculateMonsterMaxAttack(monster)) *
        (100 * tresholds[data.autoEatLevel - 1])
      ) / getMultiplier(monster.attackStyle)
    )
  );
}

const numberMultiplier = computed(() => {
  if (data.mode === "Adventure") {
    return 100;
  }
  return 10;
});

function calculateNormalAttack(monster: Monster) {
  let maximumNormalAttack = 0;
  if (monster.attackStyle === "Melee") {
    let effectiveAttackLevel = monster.attackLevel + 9;
    maximumNormalAttack = Math.floor(numberMultiplier.value * (1.3 + effectiveAttackLevel / 10 + monster.attackBonus / 80 + effectiveAttackLevel * monster.attackBonus / 640));
  }
  else if (monster.attackStyle === "Ranged") {
    let effectiveAttackLevel = monster.attackLevel + 9;
    maximumNormalAttack = Math.floor(numberMultiplier.value * (1.3 + effectiveAttackLevel / 10 + monster.attackBonus / 80 + effectiveAttackLevel * monster.attackBonus / 640));
  }
  else if (monster.attackStyle === "Magic") {
    maximumNormalAttack = Math.floor(numberMultiplier.value * monster.spellMaxHit * (1 + monster.attackBonus / 100) * (1 + (monster.attackLevel + 1) / 200));
  }

  let multiplier = 1;
  if (data.stunDamage === "Yes") {
    if (monster.canStun) {
      multiplier = 1.3;
    }
    else if (monster.canSleep) {
      multiplier = 1.2
      if (monster.areas[0] === "Foggy Lake")
        multiplier += 1.5 - Math.min(150, data.slayerAreaNegation) / 100
    }
  }

  return Math.floor(maximumNormalAttack * multiplier);
}

function calculateSpecialAttackDamage(specialAttack: number, canStun: boolean, canSleep: boolean, areas: ReadonlyArray<string>) {
  let baseDamage = specialAttack * numberMultiplier.value;

  let multiplier = 1;
  if (data.stunDamage === "Yes") {
    if (canStun) {
      multiplier = 1.3;
    }
    else if (canSleep) {
      multiplier = 1.2;
      if (areas.includes("Foggy Lake"))
        multiplier += 1.5 - Math.min(150, data.slayerAreaNegation) / 100
    }
  }

  return Math.floor(baseDamage * multiplier);
}

function calculateMonsterMaxAttack(monster: Monster) {
  let maxNormalAttack = calculateNormalAttack(monster);
  let maxSpecialAttack = 0;

  monster.specialAttack.forEach(specialAttack => {
    let currentSpecialAttack = 0;
    if (specialAttack.name === "Savage Spike") {
      currentSpecialAttack = calculateSpecialAttackDamage((specialAttack.maxHit + 18), monster.canStun, monster.canSleep, monster.areas);
    } else if ('maxHit' in specialAttack) {
      currentSpecialAttack = calculateSpecialAttackDamage(specialAttack.maxHit, monster.canStun, monster.canSleep, monster.areas);
    }
    if (currentSpecialAttack > maxSpecialAttack) {
      maxSpecialAttack = currentSpecialAttack;
    }
  });

  return Math.max(maxNormalAttack, maxSpecialAttack);
}

function getAttacks(monster: Monster, isSlayer: boolean): CalculatedAttack[] {
  const attacks: CalculatedAttack[] = [];

  if (monster.usesNormalHit) {
    attacks.push(getNormalAttack(monster, isSlayer));
  }

  if (monster.specialAttack?.length) {
    monster.specialAttack.forEach((specialAttack) => {
      attacks.push(getSpecialAttack(specialAttack, monster, isSlayer));
    });
  }

  return attacks;
}

function getIsIdleable(maxHit: number) {
  return maxHit <= (data.totalHealth * autoEatThreshold.value);
}

function getMinimumDR(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue.minimumDR);
  }, 0);
}

function getMinimumHP(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue.minimumHP);
  }, 0);
}

function getMaxHit(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue.maxHit);
  }, 0);
}

function getReducedMaxHit(attacks: ReadonlyArray<CalculatedAttack>) {
  return attacks.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue.reducedMaxHit);
  }, 0);
}

type Attack = {
  name: string;
} & ({
  fixedAttack: true;
  maxHit: number;
} | {
  fixedAttack: false;
  maxHitMultiplier: number;
})

type CalculatedAttack = {
  minimumDR: number;
  minimumHP: number;
  isIdleable: boolean;
  maxHit: number;
  reducedMaxHit: number;
} & Attack;

function getNormalAttack(monster: Monster, isSlayer: boolean): CalculatedAttack {
  let attack = {
    name: "Normal Attack",
    minimumDR: 0,
    minimumHP: 0,
    isIdleable: true,
    maxHit: 0,
    reducedMaxHit: 0,
    fixedAttack: true as const,
  };

  const maxHit = calculateNormalAttack(monster);
  const reducedMaxHit = calculateReducedMaxHit(monster.attackStyle, attack.maxHit, isSlayer, monster.intimidation);
  const minimumDR = calculateMinimumDR(monster.attackStyle, attack.maxHit, monster.intimidation);
  const minimumHP = calculateMinimumHP(monster.attackStyle, attack.maxHit, isSlayer, monster.intimidation);
  const isIdleable = getIsIdleable(attack.reducedMaxHit);

  return {
    name: "Normal Attack",
    minimumDR,
    minimumHP,
    isIdleable,
    maxHit,
    reducedMaxHit,
    fixedAttack: attack.fixedAttack,
  }
}

function getSpecialAttack(attack: Attack, monster: Monster, isSlayer: boolean): CalculatedAttack {
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
    maxHit = calculateNormalAttack(monster);
  }
  else if (attack.name === "Lesser Sandstorm") {
    let normalAttack = calculateNormalAttack(monster);
    let adjustedAttack = normalAttack + ((120 * numberMultiplier.value) * .05);
    maxHit = Math.ceil(adjustedAttack);
  }
  else if (attack.name === "Greater Sandstorm") {
    let adjustedAttack = ((185 * numberMultiplier.value) * .15);
    maxHit = Math.ceil(adjustedAttack);
  }
  else if (attack.name === "Confusion") {
    maxHit = 0;
  }
  else if (attack.name === "Savage Spike") {
    maxHit = calculateSpecialAttackDamage((maxHit + 18), monster.canStun, monster.canSleep, monster.areas); // Might need to change this if TotH enemies use Savage Spike
  }
  else if (attack.name === "Horn Shots") {
    maxHit = Math.floor(calculateNormalAttack(monster) * .6);
  }
  else { // Standard special attack
    if ('fixedAttack' in attack) {
      if (attack.fixedAttack) {
        maxHit = calculateSpecialAttackDamage(maxHit, monster.canStun, monster.canSleep, monster.areas);  // Damage is fixed 
      }
      else {
        maxHit = Math.floor(calculateNormalAttack(monster) * attack.maxHitMultiplier / 100) // Damage is based off the base damage of the monster
      }
    }
  }

  const reducedMaxHit = calculateReducedMaxHit(monster.attackStyle, maxHit, isSlayer, monster.intimidation);
  const minimumDR = calculateMinimumDR(monster.attackStyle, maxHit, monster.intimidation);
  const minimumHP = calculateMinimumHP(monster.attackStyle, maxHit, isSlayer, monster.intimidation);
  const isIdleable = calculateIdleability(reducedMaxHit);

  if (attack.fixedAttack) {
    return {
      name: attack.name,
      minimumDR,
      minimumHP,
      isIdleable,
      maxHit,
      reducedMaxHit,
      fixedAttack: attack.fixedAttack,
    }
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
  }
}

function calculateIdleability(maxHit: number) {
  return maxHit <= (data.totalHealth * autoEatThreshold.value);
}

type AttackStyle = "Melee" | "Ranged" | "Magic";

function calculateYakDRModifier(monsterAttackStyle: AttackStyle, isSlayer: boolean) {
  if ((data.yakSynergy === "Minotaur" && monsterAttackStyle === "Ranged")
    || (data.yakSynergy === "Centaur" && monsterAttackStyle === "Magic")
    || (data.yakSynergy === "Witch" && monsterAttackStyle === "Melee")) {
    return 2;
  }
  else if (data.yakSynergy === "Cyclops" && isSlayer) {
    return 3;
  }

  return 0;
}

function getCombatStyle(style: AttackStyle) {
  switch (style) {
    case "Melee":
      return 0;
    case "Ranged":
      return 1;
    case "Magic":
      return 2;
  }
}

function calculateMinimumDR(attackStyle: AttackStyle, maxHit: number, intimidation: number) {
  return Math.max(0, Math.min(100, Math.ceil(Math.ceil(100 - data.totalHealth / maxHit * (100 * autoEatThreshold.value)) / combatTriangle.value[getCombatStyle(data.combatStyle)][getCombatStyle(attackStyle)])) + intimidation);
}

function calculateMinimumHP(attackStyle: AttackStyle, maxHit: number, isSlayer: boolean, intimidation: number) {
  let intimidatedDR = data.currentDR - intimidation;
  let yakAdjustedDr = intimidatedDR + calculateYakDRModifier(attackStyle, isSlayer);
  return Math.max(100, Math.ceil((maxHit - Math.floor(maxHit * (Math.floor(yakAdjustedDr * combatTriangle.value[getCombatStyle(data.combatStyle)][getCombatStyle(attackStyle)])) / 100)) / autoEatThreshold.value / 10) * 10);
}

const autoEatThreshold = computed(() => {
  let aethreshold = 0;
  switch (data.autoEatLevel) {
    case 1:
      aethreshold = 0.2;
      break;
    case 2:
      aethreshold = 0.3;
      break;
    case 3:
      aethreshold = 0.4;
      break;
  }

  if (data.wastefulRing === "Yes") {
    aethreshold = aethreshold + 0.05;
  }

  return aethreshold;
});

const combatTriangle = computed(() => {
  if (data.mode === "Normal") {
    return [[1, 1.25, 0.75], [0.95, 1, 1.25], [1.25, 0.85, 1]];
  }
  return [[1, 1.25, 0.5], [0.75, 1, 1.25], [1.25, 0.75, 1]];
});

function calculateReducedMaxHit(attackStyle: AttackStyle, maxHit: number, isSlayer: boolean, intimidation: number) {
  const intimidatedDR = data.currentDR - intimidation;
  const yakAdjustedDr = intimidatedDR + calculateYakDRModifier(attackStyle, isSlayer);
  const combatAdjustedDr = Math.floor(yakAdjustedDr * combatTriangle.value[getCombatStyle(data.combatStyle)][getCombatStyle(attackStyle)]);
  const attackReduction = maxHit * (Math.min(100, combatAdjustedDr) / 100);
  let reducedHit = Math.floor(maxHit - attackReduction);
  if (data.guardianAmulet === "Yes" && reducedHit <= data.totalHealth * .5 && reducedHit >= data.totalHealth * autoEatThreshold.value) {
    reducedHit = Math.floor(maxHit - maxHit * (Math.floor((yakAdjustedDr + 5) * combatTriangle.value[getCombatStyle(data.combatStyle)][getCombatStyle(attackStyle)])) / 100);
  }
  return reducedHit;
}


watch(data, (data) => {
  localStorage["data"] = JSON.stringify(data);
});


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
