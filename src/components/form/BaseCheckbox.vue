<template>
  <label :for="id" class="flex cursor-pointer items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      class="size-4 rounded border-gray-300 accent-brand-500"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  modelValue: boolean
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
