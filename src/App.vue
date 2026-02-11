<template>
  <div class="min-h-screen text-white bg-[radial-gradient(ellipse_at_top,var(--color-dark-light)_0%,var(--color-dark)_70%)]">
    <div class="relative flex-1 max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl bg-linear-to-r from-white to-muted-light bg-clip-text text-transparent">
          Melvor Idle Calculator
        </h1>
        <p class="mt-2 text-sm text-muted">Damage reduction & idle threshold calculator</p>
      </header>

      <!-- Sticky controls panel -->
      <div class="sticky top-0 z-10 mb-6 -mx-4 px-4 py-3 sm:-mx-6 sm:px-6 bg-dark/80 backdrop-blur-xl border-b border-border/50">
        <div v-if="data.inputsVisible">
          <div class="grid grid-cols-2 gap-4 py-4 sm:grid-cols-5 sm:grid-rows-2">
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Total Health</span>
              <input
                id="totalHealth"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                :step="data.mode === 'Normal' ? 10 : 100"
                min="0"
                v-model="data.totalHealth"
              />
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Current DR (%)</span>
              <input
                id="currentDR"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                step="1"
                min="0"
                max="100"
                v-model="data.currentDR"
              />
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Auto Eat</span>
              <select
                id="autoEatLevel"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.autoEatLevel"
              >
                <option v-for="value of [1, 2, 3]" :value="value">Level {{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Combat Style</span>
              <select
                id="combatStyle"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.combatStyle"
              >
                <option v-for="value of ['Melee', 'Ranged', 'Magic']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Wasteful Ring</span>
              <select
                id="wastefulRing"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.wastefulRing"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Guardian Am.</span>
              <select
                id="guardianAmulet"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.guardianAmulet"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Mode</span>
              <select
                id="mode"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.mode"
              >
                <option v-for="value of ['Normal', 'Adventure']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Yak Synergy</span>
              <select
                id="yakSynergy"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.yakSynergy"
              >
                <option v-for="value of ['None', 'Minotaur', 'Centaur', 'Witch']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Stun Damage</span>
              <select
                id="stunDamage"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="data.stunDamage"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">{{ value }}</option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light">Slayer Negation (%)</span>
              <input
                id="slayerAreaNegation"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                step="1"
                min="0"
                max="150"
                v-model="data.slayerAreaNegation"
              />
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 border-t border-border/50">
          <span class="text-sm text-muted">
            Auto Eat Threshold: <span class="font-semibold text-success">{{ Math.floor(getAutoEatThreshold(data) * data.totalHealth) }} HP</span>
          </span>
          <button
            :class="`p-2 rounded-lg transition-all hover:bg-dark-lighter ${data.inputsVisible ? 'rotate-180' : ''}`"
            @click="data.inputsVisible = !data.inputsVisible"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" class="text-muted hover:text-white transition-colors">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.25 10.75L12 14.25L8.75 10.75" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main content card -->
      <div class="overflow-hidden rounded-2xl border border-border/50 bg-dark-light/50 backdrop-blur-sm shadow-xl shadow-black/20">
        <!-- Tabs -->
        <div class="flex border-b border-border/50 bg-dark-lighter/30">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'flex-1 px-4 py-3.5 text-sm font-medium transition-all',
              data.activeTab === tab.id
                ? 'text-accent border-b-2 border-accent bg-dark-light/50'
                : 'text-muted hover:text-white hover:bg-dark-lighter/50'
            ]"
            @click="data.activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab panels -->
        <div class="p-4 sm:p-6">
          <div v-if="data.activeTab === 'monsters'" class="space-y-4">
            <h2 class="text-lg font-semibold">Monsters</h2>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th class="px-4 py-3 text-left text-sm font-medium text-muted">Name</th>
                    <th class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell">Attack style</th>
                    <th class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell">Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">Reduced Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">DR needed</th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent :monsters="monsters" :data="data" :number-multiplier="numberMultiplier" />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="data.activeTab === 'dungeons'" class="space-y-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="flex items-center gap-2 text-lg font-semibold">
                Dungeons
                <IdleStatusIcon :idleable="canIdleDungeon" />
              </h2>
              <select
                id="dungeon"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="data.dungeonChoice"
              >
                <option v-for="dungeon of dungeons" :value="dungeon.name">{{ dungeon.name }}</option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th class="px-4 py-3 text-left text-sm font-medium text-muted">Name</th>
                    <th class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell">Attack style</th>
                    <th class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell">Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">Reduced Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">DR needed (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent :monsters="dungeonChoiceMonsters" :data="data" :number-multiplier="numberMultiplier" />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="data.activeTab === 'slayer'" class="space-y-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="flex items-center gap-2 text-lg font-semibold">
                Slayer
                <IdleStatusIcon :idleable="canIdleSlayerTier" />
              </h2>
              <select
                id="slayer"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="data.slayerTier"
              >
                <option v-for="tier of slayerTiers" :value="tier.name">{{ tier.name }}</option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th class="px-4 py-3 text-left text-sm font-medium text-muted">Name</th>
                    <th class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell">Attack style</th>
                    <th class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell">Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">Reduced Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">DR needed (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent :monsters="slayerTierMonsters" :data="data" :number-multiplier="numberMultiplier" />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="data.activeTab === 'slayerAreas'" class="space-y-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="text-lg font-semibold">Slayer Areas</h2>
              <select
                id="slayerAreas"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="data.slayerArea"
              >
                <option v-for="area of slayerAreas" :value="area.name">{{ area.name }}</option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th class="px-4 py-3 text-left text-sm font-medium text-muted">Name</th>
                    <th class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell">Attack style</th>
                    <th class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell">Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">Reduced Max hit</th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums">DR needed (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent :monsters="slayerAreaMonsters" :data="data" :number-multiplier="numberMultiplier" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue";
import { dungeons, monsters, slayerTiers, slayerAreas } from "./data";
import {
  getAttacks,
  getIsIdleable,
  getMaxHit,
  getMinimumDR,
  getReducedMaxHit,
  getAutoEatThreshold,
} from "./utils";
import { Data } from "./types";
import TableContent from "./components/TableContent.vue";
import IdleStatusIcon from "./components/IdleStatusIcon.vue";

const tabs = [
  { id: "monsters" as const, label: "Monsters" },
  { id: "dungeons" as const, label: "Dungeons" },
  { id: "slayerAreas" as const, label: "Slayer Areas" },
  { id: "slayer" as const, label: "Slayer" },
];

onMounted(() => {
  if (localStorage["data"]) {
    Object.assign(data, JSON.parse(localStorage["data"]));
  }
});

const data = reactive<Data>({
  mode: "Normal",
  slayerArea: "Penumbra",
  slayerTier: "Easy",
  totalHealth: 600,
  currentDR: 20,
  autoEatLevel: 1,
  combatStyle: "Melee",
  wastefulRing: "No",
  guardianAmulet: "No",
  yakSynergy: "None",
  stunDamage: "Yes",
  slayerAreaNegation: 0,
  dungeonChoice: "Chicken Coop",
  activeTab: "monsters",
  inputsVisible: true,
});

const dungeonChoiceMonsters = computed(
  () =>
    dungeons
      .find((dungeon) => dungeon.name === data.dungeonChoice)
      ?.monsters.map(getMonster) ?? [],
);

const slayerTierMonsters = computed(
  () =>
    slayerTiers
      .find((dungeon) => dungeon.name === data.slayerTier)
      ?.monsters.map(getMonster) ?? [],
);

const slayerAreaMonsters = computed(
  () =>
    slayerAreas
      .find((dungeon) => dungeon.name === data.slayerArea)
      ?.monsters.map(getMonster) ?? [],
);

function getMonster(monsterString: string) {
  return (
    monsters.find((monster) => monster.name === monsterString) ?? monsters[0]
  );
}

const canIdleDungeon = computed(() => {
  if (!dungeonChoiceMonsters.value) return false;
  return dungeonChoiceMonsters.value.every((monster) =>
    getIsIdleable(
      getReducedMaxHit(getAttacks(monster, false, numberMultiplier.value, data)),
      data,
    ),
  );
});

const canIdleSlayerTier = computed(() => {
  if (!slayerTierMonsters.value) return false;
  return slayerTierMonsters.value.every((monster) =>
    getIsIdleable(
      getReducedMaxHit(getAttacks(monster, false, numberMultiplier.value, data)),
      data,
    ),
  );
});

const numberMultiplier = computed(() =>
  data.mode === "Adventure" ? 100 : 10,
);

watch(data, (data) => {
  localStorage["data"] = JSON.stringify(data);
});
</script>
