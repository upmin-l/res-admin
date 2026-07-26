import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'admin_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const isAuthenticated = computed(() => Boolean(token.value))

  function login() {
    // TODO: Replace mock authentication with the real API.
    token.value = 'starter-token'
    localStorage.setItem(TOKEN_KEY, token.value)
  }

  function logout() {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
})
