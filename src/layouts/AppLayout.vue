<template>
  <div class="min-h-screen bg-[var(--surface-app)]">
    <AppSidebar />
    <AppBackdrop />

    <div class="min-h-screen transition-[margin] duration-300" :class="sidebarOffsetClass">
      <AppHeader />
      <AppTabs />
      <main id="main-content" class="w-full p-4 md:p-6 xl:p-7">
        <RouterView />
      </main>
      <footer class="px-6 pb-5 text-xs text-[var(--text-secondary)]">
        Cattle Admin · 后台管理平台
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppBackdrop from '@/components/layout/AppBackdrop.vue'
import AppTabs from '@/components/layout/AppTabs.vue'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

const sidebarOffsetClass = computed(() =>
  layout.isSidebarExpanded || layout.isSidebarHovered ? 'lg:ml-60' : 'lg:ml-20',
)
</script>
