<template>
  <tr v-for="monster of monsters" :class="getIsIdleable(getReducedMaxHit(getAttacks(monster, false, numberMultiplier, data)), data)
    ? `bg-[#1a7c43]`
    : `bg-[#6b2727]`
    ">
    <td class="px-4 py-2">
      <a class="hover:underline" :href="`https://wiki.melvoridle.com/w/${monster.name}`" target="_blank">{{
        monster.name }}</a>
    </td>
    <td class="hidden px-4 py-2 md:table-cell">
      {{ monster.attackStyle }}
    </td>
    <td class="hidden px-4 py-2 text-right tabular-nums md:table-cell">
      {{ getMaxHit(getAttacks(monster, false, numberMultiplier, data)) }}
    </td>
    <td class="px-4 py-2 text-right tabular-nums">
      ({{ getReducedMaxHit(getAttacks(monster, false, numberMultiplier, data)) }})
    </td>
    <td class="px-4 py-2 text-right tabular-nums">
      {{
        getMinimumDR(
          monster.attackStyle,
          getMaxHit(getAttacks(monster, false, numberMultiplier, data)),
          monster.intimidation,
          data
        )
      }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Monster } from '../data'
import { getMinimumDR, getAttacks, getMaxHit, getReducedMaxHit, getIsIdleable } from '../utils';
import { Data } from '../types'

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
})
</script>
