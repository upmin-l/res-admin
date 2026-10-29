<template>
  <span class="inline-flex items-center gap-3 whitespace-nowrap">
    <svg class="size-9 shrink-0" viewBox="0 0 36 42" fill="none" aria-hidden="true">
      <path d="M18 1 35 11 26 16 18 11 9 16v10l9 5 8-5 9 5-17 10L1 31V11Z" fill="#2864f5" />
      <path d="m18 1 9 5-18 10-8-5Z" fill="#78b5ff" />
      <path d="m9 16 9 5v10l-9-5Z" fill="#4c8dff" />
    </svg>
    <span v-if="!compact" class="text-left">
      <span
        class="block text-xl font-semibold tracking-tight"
        :class="inverse ? 'text-white' : 'text-gray-900 dark:text-white'"
        >Cattle Admin</span
      >
      <span
        class="mt-0.5 block text-xs tracking-wider"
        :class="inverse ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'"
        >后台管理平台</span
      >
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{ compact?: boolean; inverse?: boolean }>()
</script>
