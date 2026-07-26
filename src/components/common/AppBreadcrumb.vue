<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <li>
        <RouterLink to="/dashboard" class="hover:text-brand-500">仪表盘</RouterLink>
      </li>
      <li v-if="current" class="flex items-center gap-2">
        <ChevronRight class="size-4" />
        <span class="text-gray-700 dark:text-gray-300">{{ current }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  current?: string
}>()
</script>
