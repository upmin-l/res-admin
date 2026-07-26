<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="variantClasses"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeVariant = 'success' | 'warning' | 'neutral'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
  }>(),
  {
    variant: 'neutral',
  },
)

const variantClasses = computed<string>(
  () =>
    ({
      success:
        'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400',
      warning:
        'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400',
      neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    })[props.variant],
)
</script>
