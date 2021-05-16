<template>
  <div class="bg-[#121212] min-h-screen text-white flex flex-col">
    <div class="relative max-w-screen-lg py-4 mx-auto px-4 flex-1">
      <h1 class="text-2xl font-bold text-center">Idle calculator</h1>
      <hr class="my-4" />
      <div class="sticky top-0 bg-[#121212] mb-1">
        <div
          class="flex flex-col justify-center py-4 mt-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <div class="flex space-x-4">
            <label for="totalHealth" class="w-1/2">
              <div class="mb-1 font-semibold">Total health</div>
              <input
                id="totalHealth"
                class="text-white px-4 py-2 rounded bg-[#272727] w-full"
                type="number"
                step="10"
                min="0"
                v-model="data.totalHealth"
              />
            </label>
            <label for="currentDR" class="w-1/2">
              <div class="mb-1 font-semibold">Current DR (%)</div>
              <input
                id="currentDR"
                class="text-white px-4 py-2 rounded bg-[#272727] w-full"
                type="number"
                step="1"
                min="0"
                v-model="data.currentDR"
              />
            </label>
          </div>
          <div class="flex space-x-4">
            <label for="autoEatLevel" class="w-1/2">
              <div class="mb-1 font-semibold">Auto Eat</div>
              <select
                id="autoEatLevel"
                class="text-white px-4 py-2 rounded bg-[#272727] h-10 w-full"
                v-model="data.autoEatLevel"
              >
                <option v-for="value of [1, 2, 3]" :value="value">
                  Level {{ value }}
                </option>
              </select>
            </label>
            <label for="combatStyle" class="w-1/2">
              <div class="mb-1 font-semibold">Combat style</div>
              <select
                id="combatStyle"
                class="text-white px-4 py-2 rounded bg-[#272727] h-10 w-full"
                v-model="data.combatStyle"
              >
                <option
                  v-for="value of ['Melee', 'Ranged', 'Magic']"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div class="pb-4 text-sm italic text-center text-gray-300">
          Auto Eat Threshhold is {{ Math.floor(autoEatTreshhold) }} HP
        </div>
      </div>
      <div class="bg-[#272727]">
        <div id="tabs" class="flex">
          <button
            :class="`tab border border-r-0 px-4 py-2 rounded-tl flex-1 hover:bg-[#444] ${
              data.activeTab === 'monsters'
                ? 'font-bold bg-[#121212]'
                : 'bg-[#272727]'
            }`"
            @click="data.activeTab = 'monsters'"
          >
            Monsters
          </button>
          <button
            :class="`tab border px-4 py-2 rounded-tr flex-1 hover:bg-[#444] ${
              data.activeTab === 'dungeons'
                ? 'font-bold bg-[#121212]'
                : 'bg-[#272727]'
            }`"
            @click="data.activeTab = 'dungeons'"
          >
            Dungeons
          </button>
          <button
            :class="`tab border px-4 py-2 rounded-tr flex-1 hover:bg-[#444] ${
              data.activeTab === 'slayer'
                ? 'font-bold bg-[#121212]'
                : 'bg-[#272727]'
            }`"
            @click="data.activeTab = 'slayer'"
          >
            Slayer
          </button>
        </div>
        <div class="p-4" v-if="data.activeTab === 'monsters'">
          <h2 class="text-xl font-semibold">Monsters</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="hidden px-4 py-2 text-left md:table-cell">
                  Attack style
                </th>
                <th
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="monster of monsterData.monsters"
                :class="canIdle(monster) ? `bg-[#1a7c43]` : `bg-[#6b2727]`"
              >
                <td class="px-4 py-2">{{ monster.name }}</td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle }}
                </td>
                <td
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  {{ monster.maxHit }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(monster) }})
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  {{ getDRNeeded(monster) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4" v-if="data.activeTab === 'dungeons'">
          <div class="flex justify-between my-4 items-center">
            <h2 class="text-xl font-semibold">
              Dungeons
              <svg
                v-if="canIdleDungeon"
                class="inline text-[#1a7c43]"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
                />
              </svg>
              <svg
                v-else
                class="inline text-[#6b2727]"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.25 6.75L6.75 17.25"
                ></path>
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6.75 6.75L17.25 17.25"
                ></path>
              </svg>
            </h2>
            <select
              id="dungeon"
              class="text-white px-4 py-2 rounded bg-[#474747]"
              v-model="data.dungeonChoice"
            >
              <option
                v-for="dungeon of monsterData.dungeons"
                :value="dungeon.name"
              >
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
                <th
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="monster of dungeonChoiceMonsters"
                :class="canIdle(monster) ? `bg-[#1a7c43]` : `bg-[#6b2727]`"
              >
                <td class="px-4 py-2">{{ monster.name }}</td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle }}
                </td>
                <td
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  {{ monster.maxHit }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(monster) }})
                </td>
                <td class="px-4 py-2">
                  {{ getDRNeeded(monster) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4" v-if="data.activeTab === 'slayer'">
          <div class="flex justify-between my-4 items-center">
            <h2 class="text-xl font-semibold">
              Slayer
              <svg
                v-if="canIdleSlayerTier"
                class="inline text-[#1a7c43]"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
                />
              </svg>
              <svg
                v-else
                class="inline text-[#6b2727]"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.25 6.75L6.75 17.25"
                ></path>
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6.75 6.75L17.25 17.25"
                ></path>
              </svg>
            </h2>
            <select
              id="slayer"
              class="text-white px-4 py-2 rounded bg-[#474747]"
              v-model="data.slayerTier"
            >
              <option
                v-for="tier of monsterData.slayerTiers"
                :value="tier.name"
              >
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
                <th
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">
                  Reduced Max hit
                </th>
                <th class="px-4 py-2 text-right tabular-nums">DR needed (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="monster of slayerTierMonsters"
                :class="canIdle(monster) ? `bg-[#1a7c43]` : `bg-[#6b2727]`"
              >
                <td class="px-4 py-2">{{ monster.name }}</td>
                <td class="hidden px-4 py-2 md:table-cell">
                  {{ monster.attackStyle }}
                </td>
                <td
                  class="hidden px-4 py-2 text-right tabular-nums md:table-cell"
                >
                  {{ monster.maxHit }}
                </td>
                <td class="px-4 py-2 text-right tabular-nums">
                  ({{ getReducedMaxHit(monster) }})
                </td>
                <td class="px-4 py-2">
                  {{ getDRNeeded(monster) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer class="text-center py-4 border-t border-[#272727] text-[#686868]">
      Made by <a class="hover:underline" href="https://www.martijndorsman.nl">Martijn Dorsman</a>
    </footer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  watch,
} from "vue";
import { Monster, monsterData } from "./data";

export default defineComponent({
  name: "Melvor Idle Calculator",
  components: {},
  setup() {
    onMounted(() => {
      if (localStorage.totalHealth) {
        data.totalHealth = localStorage.totalHealth;
      }

      if (localStorage.currentDR) {
        data.currentDR = localStorage.currentDR;
      }

      if (localStorage.autoEatLevel) {
        data.autoEatLevel = localStorage.autoEatLevel;
      }

      if (localStorage.combatStyle) {
        data.combatStyle = localStorage.combatStyle;
      }

      if (localStorage.dungeonChoice) {
        data.dungeonChoice = localStorage.dungeonChoice;
      }

      if (localStorage.activeTab) {
        data.activeTab = localStorage.activeTab;
      }
    });

    const data = reactive({
      slayerTier: "Easy",
      totalHealth: 600,
      currentDR: 20,
      autoEatLevel: 1,
      combatStyle: "Melee",
      gameMode: "Normal",
      wastefulRing: "No",
      guardianAmulet: "No",
      dungeonChoice: "Chicken Coop",
      activeTab: "monsters",
    });

    const dungeonChoiceMonsters = computed(() =>
      monsterData.dungeons
        .find((dungeon) => dungeon.name === data.dungeonChoice)
        ?.monsters.map(getMonster)
    );

    const slayerTierMonsters = computed(() =>
      monsterData.slayerTiers
        .find((dungeon) => dungeon.name === data.slayerTier)
        ?.monsters.map(getMonster)
    );

    function getMonster(monsterString: string) {
      return (
        monsterData.monsters.find(
          (monster) => monster.name === monsterString
        ) ?? monsterData.monsters[0]
      );
    }

    const treshholds = [0.2, 0.3, 0.4];

    const autoEatTreshhold = computed(
      () => treshholds[data.autoEatLevel - 1] * data.totalHealth
    );

    function getMultiplier(monsterAttackStyle: Monster["attackStyle"]) {
      const multipliers: any = {
        melee: {
          ranged: 1.25,
          magic: 0.5,
          melee: 1,
        },
        ranged: {
          melee: 0.95,
          magic: 1.25,
          ranged: 1,
        },
        magic: {
          melee: 1.25,
          ranged: 0.85,
          magic: 1,
        },
      };

      return multipliers[data.combatStyle.toLowerCase()][
        monsterAttackStyle.toLowerCase()
      ];
    }

    function getNettoDR(monsterAttackStyle: Monster["attackStyle"]) {
      return getMultiplier(monsterAttackStyle) * data.currentDR;
    }

    function getReducedMaxHit({ maxHit, attackStyle }: Monster) {
      return Math.floor(maxHit * (1 - getNettoDR(attackStyle) / 100));
    }

    function canIdle(monster: Monster | string) {
      if (typeof monster === "string") {
        monster = getMonster(monster);
      }

      return getReducedMaxHit(monster) < autoEatTreshhold.value;
    }

    const canIdleDungeon = computed(() => {
      if (dungeonChoiceMonsters.value) {
        return dungeonChoiceMonsters.value.every(canIdle);
      }

      return false;
    });

    const canIdleSlayerTier = computed(() => {
      if (slayerTierMonsters.value) {
        return slayerTierMonsters.value.every(canIdle);
      }

      return false;
    });

    function getDRNeeded(monster: Monster | string) {
      if (typeof monster === "string") {
        monster = getMonster(monster);
      }

      for (let i = 0; i < 100; i++) {
        if (
          autoEatTreshhold.value > Math.floor(monster.maxHit * (1 - i / 100))
        ) {
          return Math.floor(i / getMultiplier(monster.attackStyle));
        }
      }

      return 0;
    }

    watch(
      data,
      ({
        totalHealth,
        currentDR,
        autoEatLevel,
        combatStyle,
        dungeonChoice,
        activeTab,
      }) => {
        localStorage.totalHealth = totalHealth;
        localStorage.currentDR = currentDR;
        localStorage.autoEatLevel = autoEatLevel;
        localStorage.combatStyle = combatStyle;
        localStorage.dungeonChoice = dungeonChoice;
        localStorage.activeTab = activeTab;
      }
    );

    return {
      data,
      canIdle,
      monsterData,
      autoEatTreshhold,
      getDRNeeded,
      getReducedMaxHit,
      dungeonChoiceMonsters,
      slayerTierMonsters,
      getMonster,
      canIdleSlayerTier,
      canIdleDungeon,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
