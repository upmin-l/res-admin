<template>
  <section class="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)]">
    <div v-if="$slots.header" class="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <slot name="header" />
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    contentClass?: string
  }>(),
  {
    contentClass: 'p-5',
  },
)
</script>
