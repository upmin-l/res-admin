<template>
  <div ref="menuRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full p-1 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span
        class="flex size-9 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
      >
        A
      </span>
      <span class="hidden sm:block">管理员</span>
      <ChevronDown class="size-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      role="menu"
      class="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="border-b border-gray-100 px-3 pb-3 dark:border-gray-800">
        <p class="text-sm font-medium text-gray-800 dark:text-white">系统管理员</p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
      </div>
      <button
        type="button"
        role="menuitem"
        class="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
        @click="handleLogout"
      >
        <LogOut class="size-4" />
        退出登录
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDown, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function handleOutsideClick(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

async function handleLogout() {
  auth.logout()
  isOpen.value = false
  await router.push('/login')
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))
</script>
