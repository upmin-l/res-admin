<template>
  <main
    class="flex min-h-screen items-center justify-center bg-gray-50 px-6 text-center dark:bg-gray-950"
  >
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">错误 404</p>
      <h1 class="mt-4 text-5xl font-semibold text-gray-900 dark:text-white sm:text-7xl">
        页面未找到
      </h1>
      <p class="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500 dark:text-gray-400">
        你访问的页面不存在或已被移动。
      </p>
      <RouterLink
        to="/dashboard"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
      >
        <ArrowLeft class="size-4" />
        返回仪表盘
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>
