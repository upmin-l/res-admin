<template>
  <nav class="page-tabs" aria-label="已打开的页面">
    <div
      v-for="tab in tabs"
      :key="tab.path"
      class="page-tab"
      :class="{ 'is-active': route.fullPath === tab.path }"
    >
      <RouterLink :to="tab.path" :aria-current="route.fullPath === tab.path ? 'page' : undefined">
        <LayoutDashboard v-if="tab.path === '/dashboard'" class="size-3.5" />
        <List v-else class="size-3.5" />
        {{ tab.title }}
      </RouterLink>
      <button
        v-if="tab.path !== '/dashboard'"
        type="button"
        :aria-label="`关闭${tab.title}标签`"
        @click="closeTab(tab.path)"
      >
        <X class="size-3" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, List, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const tabs = ref([{ path: '/dashboard', title: '仪表盘' }])

watch(
  () => route.fullPath,
  (path) => {
    if (!tabs.value.some((tab) => tab.path === path)) {
      tabs.value.push({ path, title: route.meta.title })
    }
  },
  { immediate: true },
)

function closeTab(path: string) {
  const index = tabs.value.findIndex((tab) => tab.path === path)
  tabs.value = tabs.value.filter((tab) => tab.path !== path)
  if (route.fullPath === path) {
    void router.push(tabs.value[Math.max(0, index - 1)]?.path ?? '/dashboard')
  }
}
</script>

<style scoped>
.page-tabs {
  display: flex;
  gap: 5px;
  min-height: 42px;
  padding: 5px 24px 0;
  overflow-x: auto;
  background: var(--surface-header);
  border-bottom: 1px solid var(--border-subtle);
}
.page-tab {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 7px 7px 0 0;
  background: var(--surface-inset);
  color: var(--text-secondary);
  font-size: 12px;
}
.page-tab a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
}
.page-tab button {
  margin-right: 10px;
  padding: 3px;
  border-radius: 4px;
}
.page-tab button:hover {
  background: rgb(128 128 128 / 20%);
}
.is-active {
  color: white;
  background: var(--color-brand-500);
}
@media (max-width: 639px) {
  .page-tabs {
    padding-left: 16px;
  }
}
</style>
