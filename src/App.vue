<template>
  <div class="bg-blue-900 min-h-screen text-white">
    <div class="pb-4 mx-auto max-w-screen-lg">
      <h1>Idle calculator</h1>
      <input
        class="text-black"
        type="number"
        step="10"
        min="0"
        v-model="data.totalHealth"
      />
      <input
        class="text-black"
        type="number"
        step="1"
        min="0"
        v-model="data.currentDR"
      />
      <select class="text-black" v-model="data.autoEatLevel">
        <option v-for="value of [1, 2, 3]" :value="value">{{ value }}</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attack style</th>
            <th>Max hit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="monster of monsterData.monsters" :class="(monster.maxHit * (1 - data.currentDR / 100)) >= autoEatTreshhold ? `bg-red-600` : `bg-green-600`">
            <td>{{ monster.name }}</td>
            <td>{{ monster.attackStyle }}</td>
            <td>{{ monster.maxHit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { monsterData } from "./data";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const data = reactive({
      slayerTier: "Easy",
      totalHealth: 100,
      currentDR: 0,
      autoEatLevel: 1,
      combatStyle: "Melee",
      gameMode: "Normal",
      wastefulRing: "No",
      guardianAmulet: "No",
      dungeonChoice: "Chicken Coop",
    });

    const treshholds = [0.2, 0.3, 0.4];

    const autoEatTreshhold = computed(() => treshholds[data.autoEatLevel - 1] * data.totalHealth);

    return {
      data,
      monsterData,
      autoEatTreshhold,
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
