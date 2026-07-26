import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const isSidebarExpanded = ref(true)
  const isSidebarHovered = ref(false)
  const isMobileSidebarOpen = ref(false)
  const openMenu = ref<string | null>('examples')

  function toggleSidebar() {
    isSidebarExpanded.value = !isSidebarExpanded.value
  }

  function toggleMobileSidebar() {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  function closeMobileSidebar() {
    isMobileSidebarOpen.value = false
  }

  function toggleMenu(key: string) {
    openMenu.value = openMenu.value === key ? null : key
  }

  return {
    isSidebarExpanded,
    isSidebarHovered,
    isMobileSidebarOpen,
    openMenu,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    toggleMenu,
  }
})
