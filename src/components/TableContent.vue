<template>
  <tr
    v-for="monster of monsters"
    :class="[
      'transition-colors border-b border-border/30 last:border-b-0',
      getIsIdleable(
        getReducedMaxHit(getAttacks(monster, false, numberMultiplier, data)),
        data,
      )
        ? 'bg-success-dim/50 hover:bg-success-dim'
        : 'bg-danger-dim/50 hover:bg-danger-dim'
    ]"
  >
    <td class="px-4 py-3">
      <a
        class="font-medium text-red-50 hover:text-accent/80 hover:underline transition-colors"
        :href="`https://wiki.melvoridle.com/w/${monster.name}`"
        target="_blank"
        rel="noopener noreferrer"
        >{{ monster.name }}</a
      >
    </td>
    <td class="hidden px-4 py-3 text-muted md:table-cell">
      {{ monster.attackStyle }}
    </td>
    <td class="hidden px-4 py-3 text-right tabular-nums text-muted-light md:table-cell">
      {{ getMaxHit(getAttacks(monster, false, numberMultiplier, data)) }}
    </td>
    <td class="px-4 py-3 text-right tabular-nums text-muted-light">
      ({{
        getReducedMaxHit(getAttacks(monster, false, numberMultiplier, data))
      }})
    </td>
    <td class="px-4 py-3 text-right tabular-nums font-medium">
      {{
        getMinimumDR(
          monster.attackStyle,
          getMaxHit(getAttacks(monster, false, numberMultiplier, data)),
          monster.intimidation,
          data,
        )
      }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Monster } from "../data";
import {
  getMinimumDR,
  getAttacks,
  getMaxHit,
  getReducedMaxHit,
  getIsIdleable,
} from "../utils";
import { Data } from "../types";

defineProps({
  monsters: {
    type: Array as PropType<ReadonlyArray<Monster>>,
    required: true,
  },
  numberMultiplier: {
    type: Number,
    required: true,
  },
  data: {
    type: Object as PropType<Data>,
    required: true,
  },
});
</script>
