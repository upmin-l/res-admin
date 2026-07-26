import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  document.documentElement.classList.toggle('dark', value === 'dark')
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')
  const isDark = computed(() => theme.value === 'dark')

  function initializeTheme() {
    theme.value = getInitialTheme()
    applyTheme(theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(THEME_KEY, theme.value)
    applyTheme(theme.value)
  }

  return {
    theme,
    isDark,
    initializeTheme,
    toggleTheme,
  }
})
