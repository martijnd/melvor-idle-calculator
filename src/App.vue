<template>
  <div class="bg-gray-900 min-h-screen text-white p-4">
    <div class="py-4 mx-auto max-w-screen-lg">
      <h1>Idle calculator</h1>
      <div class="my-4 flex space-x-4">
        <label for="totalHealth">
          <div>Total health</div>
          <input
            id="totalHealth"
            class="text-black px-4 py-2"
            type="number"
            step="10"
            min="0"
            v-model="data.totalHealth"
          />
        </label>
        <label for="currentDR">
          <div>Current DR ({{ autoEatTreshhold }} HP)</div>
          <input
            id="currentDR"
            class="text-black px-4 py-2"
            type="number"
            step="1"
            min="0"
            v-model="data.currentDR"
          />
        </label>
        <label for="autoEatLevel">
          <div>Auto Eat Level</div>
          <select
            id="autoEatLevel"
            class="text-black px-4 py-2"
            v-model="data.autoEatLevel"
          >
            <option v-for="value of [1, 2, 3]" :value="value">
              {{ value }}
            </option>
          </select>
        </label>
        <label for="combatStyle">
          <div>Combat style</div>
          <select
            id="combatStyle"
            class="text-black px-4 py-2"
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
      <div id="tabs" class="flex">
        <div
          class="tab border px-4 py-2 rounded"
          @click="activeTab = 'monsters'"
        >
          Monsters
        </div>
        <div
          class="tab border px-4 py-2 rounded"
          @click="activeTab = 'dungeons'"
        >
          Dungeons
        </div>
      </div>
      <div class="p-4" v-if="activeTab === 'monsters'">
        <h2 class="font-semibold text-xl">Monsters</h2>
        <table>
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Attack style</th>
              <th class="px-4 py-2 text-left">Max hit</th>
              <th class="px-4 py-2 text-left">Reduced Max hit</th>
              <th class="px-4 py-2 text-left">DR needed</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="monster of monsterData.monsters"
              :class="canIdle(monster) ? `bg-red-900` : `bg-green-900`"
            >
              <td class="px-4 py-2">{{ monster.name }}</td>
              <td class="px-4 py-2">{{ monster.attackStyle }}</td>
              <td class="px-4 py-2">{{ monster.maxHit }}</td>
              <td class="px-4 py-2">({{ getReducedMaxHit(monster) }})</td>
              <td class="px-4 py-2">{{ getDRNeeded(monster) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4" v-if="activeTab === 'dungeons'">
        <h2 class="font-semibold text-xl">Dungeons</h2>
        <select
          id="dungeon"
          class="text-black px-4 py-2"
          v-model="data.dungeonChoice"
        >
          <option v-for="dungeon of monsterData.dungeons" :value="dungeon.name">
            {{ dungeon.name }}
          </option>
        </select>

        <table class="w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Attack style</th>
              <th class="px-4 py-2 text-left">Max hit</th>
              <th class="px-4 py-2 text-left">Reduced Max hit</th> 
              <th class="px-4 py-2 text-left">DR needed</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="monster of dungeonChoiceMonsters"
              :class="canIdle(getMonster(monster)) ? `bg-red-900` : `bg-green-900`"
            >
              <td class="px-4 py-2">{{ getMonster(monster).name }}</td>
              <td class="px-4 py-2">{{ getMonster(monster).attackStyle }}</td>
              <td class="px-4 py-2">{{ getMonster(monster).maxHit }}</td>
              <td class="px-4 py-2">({{ getReducedMaxHit(getMonster(monster)) }})</td>
              <td class="px-4 py-2">{{ getDRNeeded(getMonster(monster)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { Monster, monsterData } from "./data";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
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
    });

    const dungeonChoiceMonsters = computed(
      () =>
        monsterData.dungeons.find(
          (dungeon) => dungeon.name === data.dungeonChoice
        )?.monsters
    );

    function getMonster(monsterString: string) {
      return monsterData.monsters.find(monster => monster.name === monsterString);
    } 

    const treshholds = [0.2, 0.3, 0.4];

    const autoEatTreshhold = computed(
      () => treshholds[data.autoEatLevel - 1] * data.totalHealth
    );

    const activeTab = ref("dungeons");

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

    function canIdle(monster: Monster) {
      return getReducedMaxHit(monster) >= autoEatTreshhold.value;
    }

    /**
     * max hit (100) * i
     * 100 * 0.8
     */
    function getDRNeeded(monster: Monster) {
      for (let i = 0; i < 100; i++) {
        if (
          autoEatTreshhold.value > Math.floor(monster.maxHit * (1 - i / 100))
        ) {
          return Math.floor(i / getMultiplier(monster.attackStyle));
        }
      }

      return 0;
    }

    watch(data, ({totalHealth, currentDR, autoEatLevel, combatStyle, dungeonChoice}) => {
      localStorage.totalHealth = totalHealth; 
      localStorage.currentDR = currentDR;
      localStorage.autoEatLevel = autoEatLevel;
      localStorage.combatStyle = combatStyle;
      localStorage.dungeonChoice = dungeonChoice;
    })

    return {
      data,
      canIdle,
      monsterData,
      autoEatTreshhold,
      activeTab,
      getDRNeeded,
      getReducedMaxHit,
      dungeonChoiceMonsters,
      getMonster
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
