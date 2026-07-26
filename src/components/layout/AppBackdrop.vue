<template>
  <button
    v-if="layout.isMobileSidebarOpen"
    type="button"
    aria-label="关闭侧边栏"
    class="fixed inset-0 z-40 bg-gray-950/50 lg:hidden"
    @click="layout.closeMobileSidebar"
  />
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()
</script>
