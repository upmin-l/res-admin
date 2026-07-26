<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 md:px-6"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="icon-button"
        :aria-label="layout.isMobileSidebarOpen ? '关闭侧边栏' : '打开侧边栏'"
        @click="handleSidebarToggle"
      >
        <X v-if="layout.isMobileSidebarOpen" class="size-5 lg:hidden" />
        <Menu v-else class="size-5 lg:hidden" />
        <PanelLeftClose
          v-if="layout.isSidebarExpanded"
          class="hidden size-5 lg:block"
        />
        <PanelLeftOpen v-else class="hidden size-5 lg:block" />
      </button>
      <span class="hidden text-sm font-medium text-gray-500 sm:block dark:text-gray-400">
        {{ appTitle }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="icon-button rounded-full"
        :aria-label="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
        @click="theme.toggleTheme"
      >
        <Sun v-if="theme.isDark" class="size-5" />
        <Moon v-else class="size-5" />
      </button>
      <UserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Moon, PanelLeftClose, PanelLeftOpen, Sun, X } from 'lucide-vue-next'
import UserMenu from './UserMenu.vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeStore } from '@/stores/theme'

const appTitle = import.meta.env.VITE_APP_TITLE || 'TailAdmin Vue 启动模板'
const layout = useLayoutStore()
const theme = useThemeStore()

function handleSidebarToggle() {
  if (window.innerWidth >= 1024) {
    layout.toggleSidebar()
  } else {
    layout.toggleMobileSidebar()
  }
}
</script>
