<template>
  <div>
    <PageHeader
      title="仪表盘"
      description="欢迎使用轻量后台管理启动模板。"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {{ stat.value }}
            </p>
          </div>
          <div
            class="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400"
          >
            <component :is="stat.icon" class="size-5" />
          </div>
        </div>
      </AppCard>
    </div>

    <AppCard content-class="p-8" class="mt-6">
      <div
        class="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50 text-center dark:border-gray-700 dark:bg-gray-950/40"
      >
        <LayoutPanelTop class="size-10 text-brand-500" />
        <h2 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">内容区域</h2>
        <p class="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          可在此处开始开发第一个业务功能。响应式布局、导航、主题和认证外壳均已就绪。
        </p>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { CircleDollarSign, ClipboardList, LayoutPanelTop, ShoppingBag, Users } from 'lucide-vue-next'
import AppCard from '@/components/common/AppCard.vue'
import PageHeader from '@/components/common/PageHeader.vue'

const stats = [
  { label: '用户数量', value: '1,248', icon: Users },
  { label: '今日订单', value: '36', icon: ShoppingBag },
  { label: '今日收入', value: '¥8,420', icon: CircleDollarSign },
  { label: '待处理事项', value: '12', icon: ClipboardList },
]
</script>
