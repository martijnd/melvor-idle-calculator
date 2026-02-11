<template>
  <svg
    v-if="idleable"
    class="w-5 h-5 text-success"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5.75 12.8665L8.34 16.414C9.15 17.526 10.82 17.504 11.6 16.372L18.25 6.75"
    />
  </svg>
  <svg
    v-else
    class="w-5 h-5 text-danger"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17.25 6.75L6.75 17.25M6.75 6.75L17.25 17.25"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps<{ idleable: boolean }>();
</script>
