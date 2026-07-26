<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <AppSidebar />
    <AppBackdrop />

    <div
      class="min-h-screen transition-[margin] duration-300"
      :class="sidebarOffsetClass"
    >
      <AppHeader />
      <main class="mx-auto w-full max-w-7xl p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppBackdrop from '@/components/layout/AppBackdrop.vue'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

const sidebarOffsetClass = computed(() =>
  layout.isSidebarExpanded || layout.isSidebarHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]',
)
</script>
