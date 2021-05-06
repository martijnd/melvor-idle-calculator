<template>
  <div class="bg-gray-900 min-h-screen text-white">
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
          <div>Current DR</div>
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
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="monster of monsterData.monsters"
              :class="
                monster.maxHit * (1 - data.currentDR / 100) >= autoEatTreshhold
                  ? `bg-red-900`
                  : `bg-green-900`
              "
            >
              <td class="px-4 py-2">{{ monster.name }}</td>
              <td class="px-4 py-2">{{ monster.attackStyle }}</td>
              <td class="px-4 py-2">{{ monster.maxHit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4" v-if="activeTab === 'dungeons'">
        <h2 class="font-semibold text-xl">Dungeons</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { monsterData } from "./data";

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

    const treshholds = [0.2, 0.3, 0.4];

    const autoEatTreshhold = computed(
      () => treshholds[data.autoEatLevel - 1] * data.totalHealth
    );

    const activeTab = ref("monsters");

    return {
      data,
      monsterData,
      autoEatTreshhold,
      activeTab,
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
