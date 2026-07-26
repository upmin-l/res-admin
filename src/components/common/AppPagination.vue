<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      第 {{ page }} 页，共 {{ pageCount }} 页
    </p>
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="pagination-button"
        :disabled="page <= 1"
        aria-label="上一页"
        @click="emit('update:page', page - 1)"
      >
        <ChevronLeft class="size-4" />
      </button>
      <button
        v-for="pageNumber in pageCount"
        :key="pageNumber"
        type="button"
        class="pagination-button"
        :class="{ 'border-brand-500 bg-brand-500 text-white': pageNumber === page }"
        @click="emit('update:page', pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button
        type="button"
        class="pagination-button"
        :disabled="page >= pageCount"
        aria-label="下一页"
        @click="emit('update:page', page + 1)"
      >
        <ChevronRight class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
</script>
