<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-header)] px-4 md:px-6"
  >
    <div class="flex min-w-0 items-center gap-3">
      <button
        type="button"
        class="icon-button"
        :aria-label="layout.isMobileSidebarOpen ? '关闭侧边栏' : '切换侧边栏'"
        @click="handleSidebarToggle"
      >
        <X v-if="layout.isMobileSidebarOpen" class="size-5 lg:hidden" />
        <Menu v-else class="size-5 lg:hidden" />
        <PanelLeftClose v-if="layout.isSidebarExpanded" class="hidden size-4 lg:block" />
        <PanelLeftOpen v-else class="hidden size-4 lg:block" />
      </button>
      <nav class="flex min-w-0 items-center gap-3 text-sm" aria-label="当前位置">
        <RouterLink
          to="/dashboard"
          class="hidden items-center gap-2 text-[var(--text-secondary)] hover:text-brand-400 sm:flex"
        >
          <House class="size-4" /> 控制台
        </RouterLink>
        <span class="hidden text-[var(--text-secondary)] sm:block">/</span>
        <span class="truncate font-medium">{{ route.meta.title }}</span>
      </nav>
    </div>
    <div class="flex shrink-0 items-center gap-2 sm:gap-3">
      <span class="mr-2 hidden text-xs tracking-wide text-[var(--text-secondary)] xl:block"
        >CATTLE CONSOLE</span
      >
      <button
        type="button"
        class="icon-button"
        aria-label="刷新页面"
        title="刷新页面"
        @click="reloadPage"
      >
        <RotateCw class="size-[18px]" />
      </button>
      <button
        type="button"
        class="icon-button"
        :aria-label="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
        :title="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
        @click="theme.toggleTheme"
      >
        <Sun v-if="theme.isDark" class="size-[18px]" />
        <Moon v-else class="size-[18px]" />
      </button>
      <div class="ml-1 border-l border-[var(--border-subtle)] pl-3 sm:pl-4"><UserMenu /></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { House, Menu, Moon, PanelLeftClose, PanelLeftOpen, RotateCw, Sun, X } from 'lucide-vue-next'
import UserMenu from './UserMenu.vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const layout = useLayoutStore()
const theme = useThemeStore()

function reloadPage() {
  window.location.reload()
}
function handleSidebarToggle() {
  if (window.innerWidth >= 1024) layout.toggleSidebar()
  else layout.toggleMobileSidebar()
}
</script>
