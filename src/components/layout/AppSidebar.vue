<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white px-5 transition-all duration-300 dark:border-gray-800 dark:bg-gray-900"
    :class="sidebarClasses"
    @mouseenter="layout.isSidebarHovered = true"
    @mouseleave="layout.isSidebarHovered = false"
  >
    <div class="flex h-20 items-center" :class="showLabels ? 'justify-start' : 'justify-center'">
      <RouterLink to="/dashboard" @click="layout.closeMobileSidebar">
        <img
          v-if="showLabels"
          src="/images/logo/logo.svg"
          alt="TailAdmin"
          class="h-9 w-auto dark:hidden"
        />
        <img
          v-if="showLabels"
          src="/images/logo/logo-dark.svg"
          alt="TailAdmin"
          class="hidden h-9 w-auto dark:block"
        />
        <img v-else src="/images/logo/logo-icon.svg" alt="TailAdmin" class="size-9" />
      </RouterLink>
    </div>

    <nav class="flex-1 overflow-y-auto py-5" aria-label="主导航">
      <p v-if="showLabels" class="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
        菜单
      </p>
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.key">
          <RouterLink
            v-if="item.to"
            :to="item.to"
            class="menu-item"
            :class="isActive(item.to) ? 'menu-item-active' : 'menu-item-inactive'"
            :title="showLabels ? undefined : item.label"
            @click="layout.closeMobileSidebar"
          >
            <component :is="item.icon" class="size-5 shrink-0" />
            <span v-if="showLabels">{{ item.label }}</span>
          </RouterLink>

          <template v-else>
            <button
              type="button"
              class="menu-item"
              :class="hasActiveChild(item) ? 'menu-item-active' : 'menu-item-inactive'"
              :title="showLabels ? undefined : item.label"
              @click="layout.toggleMenu(item.key)"
            >
              <component :is="item.icon" class="size-5 shrink-0" />
              <span v-if="showLabels">{{ item.label }}</span>
              <ChevronDown
                v-if="showLabels"
                class="ml-auto size-4 transition-transform"
                :class="{ 'rotate-180': isMenuOpen(item.key) }"
              />
            </button>
            <ul v-if="showLabels && isMenuOpen(item.key)" class="mt-2 space-y-1 pl-10">
              <li v-for="child in item.children" :key="child.to">
                <RouterLink
                  :to="child.to"
                  class="block rounded-lg px-3 py-2 text-sm font-medium"
                  :class="
                    isActive(child.to)
                      ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
                  "
                  @click="layout.closeMobileSidebar"
                >
                  {{ child.label }}
                </RouterLink>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import { menuItems, type MenuItem } from '@/config/menu'
import { useLayoutStore } from '@/stores/layout'

const route = useRoute()
const layout = useLayoutStore()

const showLabels = computed(
  () =>
    layout.isSidebarExpanded || layout.isSidebarHovered || layout.isMobileSidebarOpen,
)

const sidebarClasses = computed(() => [
  showLabels.value ? 'w-[290px]' : 'w-[90px]',
  layout.isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
])

function isActive(path: string) {
  return route.path === path
}

function hasActiveChild(item: MenuItem) {
  return item.children?.some((child) => isActive(child.to)) ?? false
}

function isMenuOpen(key: string) {
  return (
    layout.openMenu === key ||
    menuItems.some((item) => item.key === key && hasActiveChild(item))
  )
}
</script>
