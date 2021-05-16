<template>
  <div class="flex flex-col min-h-screen text-white bg-dark">
    <div class="relative flex-1 max-w-screen-lg px-4 py-4 mx-auto">
      <h1 class="text-2xl font-bold text-center">Melvor Idle calculator</h1>
      <hr class="my-4" />
      <div class="sticky top-0 mb-1 bg-dark">
        <div
          v-if="data.inputsVisible"
          class="flex flex-col justify-center py-4 mt-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <div class="flex space-x-4 md:w-1/2">
            <label for="totalHealth" class="w-1/2">
              <div class="mb-1 font-semibold">Total health</div>
              <input
                id="totalHealth"
                class="w-full px-4 py-2 text-white rounded bg-dark-light"
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
                class="w-full px-4 py-2 text-white rounded bg-dark-light"
                type="number"
                step="1"
                min="0"
                max="100"
                v-model="data.currentDR"
              />
            </label>
          </div>
          <div class="flex space-x-4 md:w-1/2">
            <label for="autoEatLevel" class="w-1/2">
              <div class="mb-1 font-semibold">Auto Eat</div>
              <select
                id="autoEatLevel"
                class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
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
                class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
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
          <div class="flex space-x-4 md:w-1/2">
            <label for="autoEatLevel" class="w-1/2">
              <div class="mb-1 font-semibold">Wasteful ring</div>
              <select
                id="wastefulRing"
                class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.wastefulRing"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label for="combatStyle" class="w-1/2">
              <div class="mb-1 font-semibold">Guardian amulet</div>
              <select
                id="guardianAmulet"
                class="w-full h-10 px-4 py-2 text-white rounded bg-dark-light"
                v-model="data.guardianAmulet"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div
          class="flex items-center justify-between py-2 text-sm italic text-center text-gray-300"
        >
          <span
            >Auto Eat Threshold is {{ Math.floor(autoEatTreshold) }} HP</span
          >
          <button
            :class="`bottom-2 right-0 transform ${
              data.inputsVisible ? 'rotate-180' : ''
            }`"
            @click="data.inputsVisible = !data.inputsVisible"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="rounded bg-dark-light">
        <div id="tabs" class="flex">
          <button
            :class="`tab border border-r-0 px-4 py-2 rounded-tl flex-1 hover:bg-dark-lighter ${
              data.activeTab === 'monsters'
                ? 'font-bold bg-dark'
                : 'bg-dark-light'
            }`"
            @click="data.activeTab = 'monsters'"
          >
            Monsters
          </button>
          <button
            :class="`tab border px-4 py-2 border-r-0 flex-1 hover:bg-dark-lighter ${
              data.activeTab === 'dungeons'
                ? 'font-bold bg-dark'
                : 'bg-dark-light'
            }`"
            @click="data.activeTab = 'dungeons'"
          >
            Dungeons
          </button>
          <button
            :class="`tab border px-4 py-2 rounded-tr flex-1 hover:bg-dark-lighter ${
              data.activeTab === 'slayer'
                ? 'font-bold bg-dark'
                : 'bg-dark-light'
            }`"
            @click="data.activeTab = 'slayer'"
          >
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
                <th class="px-4 py-2 text-left hidden md:table-cell"></th>
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
                <td class="px-4 hidden md:table-cell">
                  <img
                    class="h-10 w-10"
                    :src="`https://cdn.melvor.net/core/v018/assets/media/monsters/${monster.image}`"
                    :alt="monster.name"
                  />
                </td>
                <td class="px-4 py-2">
                  <a
                    class="hover:underline"
                    :href="`https://wiki.melvoridle.com/w/${monster.name}`"
                    target="_blank"
                    >{{ monster.name }}</a
                  >
                </td>
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
          <div class="flex items-center justify-between my-4">
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
                <td class="px-4 py-2">
                  <a
                    class="hover:underline"
                    :href="`https://wiki.melvoridle.com/w/${monster.name}`"
                    target="_blank"
                    >{{ monster.name }}</a
                  >
                </td>
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
        <div class="p-4" v-if="data.activeTab === 'slayer'">
          <div class="flex items-center justify-between my-4">
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
                <td class="px-4 py-2">
                  <a
                    class="hover:underline"
                    :href="`https://wiki.melvoridle.com/w/${monster.name}`"
                    target="_blank"
                    >{{ monster.name }}</a
                  >
                </td>
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
      </div>
    </div>
    <footer class="text-center py-4 border-t border-[#272727] text-[#686868]">
      Made by
      <a class="hover:underline" href="https://www.martijndorsman.nl"
        >Martijn Dorsman</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import { Monster, monsterData } from "./data";

export default defineComponent({
  name: "Melvor Idle Calculator",
  components: {},
  setup() {
    onMounted(() => {
      Object.keys(data).forEach((attr) => {
        if (localStorage[attr]) {
          data[attr] = localStorage[attr];
        }
      });
    });

    const data = reactive<{ [key: string]: any }>({
      slayerTier: "Easy",
      totalHealth: 600,
      currentDR: 20,
      autoEatLevel: 1,
      combatStyle: "Melee",
      wastefulRing: "No",
      guardianAmulet: "No",
      dungeonChoice: "Chicken Coop",
      activeTab: "monsters",
      inputsVisible: true,
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

    const tresholds = [0.2, 0.3, 0.4];

    const autoEatTreshold = computed(() => {
      return (
        (tresholds[data.autoEatLevel - 1] +
          (data.wastefulRing === "Yes" ? 0.05 : 0)) *
        data.totalHealth
      );
    });

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
      return Math.floor((
        getMultiplier(monsterAttackStyle) *
        (Number(data.currentDR) + (data.guardianAmulet === "Yes" ? 5 : 0))
      ));
    }

    function getReducedMaxHit({ maxHit, attackStyle }: Monster) {
      return Math.floor(maxHit * (1 - getNettoDR(attackStyle) / 100));
    }

    function canIdle(monster: Monster | string) {
      if (typeof monster === "string") {
        monster = getMonster(monster);
      }

      return getReducedMaxHit(monster) < autoEatTreshold.value;
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

    function getDRNeeded(monster: Monster) {
      return Math.max(
        0,
        Math.ceil(
          Math.ceil(
            100 -
              (data.totalHealth / monster.maxHit) *
                (100 * tresholds[data.autoEatLevel - 1])
          ) / getMultiplier(monster.attackStyle)
        )
      );
    }

    watch(data, (data) => {
      Object.keys(data).forEach((attr) => (localStorage[attr] = data[attr]));
    });

    return {
      data,
      canIdle,
      monsterData,
      autoEatTreshold,
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
