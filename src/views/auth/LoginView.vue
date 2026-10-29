<template>
  <main class="grid min-h-screen bg-white dark:bg-gray-950 lg:grid-cols-2">
    <section class="flex items-center justify-center p-6 sm:p-10">
      <div class="w-full max-w-md">
        <RouterLink to="/dashboard" class="mb-10 inline-block lg:hidden">
          <AppBrand />
        </RouterLink>

        <p class="text-sm font-medium text-brand-500">欢迎回来</p>
        <h1 class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">登录</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          输入任意非空用户名和密码即可进入管理后台。
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
          <BaseInput
            id="username"
            v-model="username"
            name="username"
            label="邮箱或用户名"
            placeholder="admin@example.com"
            required
          />
          <BaseInput
            id="password"
            v-model="password"
            name="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <BaseCheckbox id="remember" v-model="remember" label="记住我" />
          <AppButton type="submit" class="w-full">登录</AppButton>
        </form>
      </div>
    </section>

    <section
      class="relative hidden items-center justify-center overflow-hidden bg-brand-950 p-12 lg:flex dark:bg-gray-900"
    >
      <div class="absolute -left-20 -top-20 size-80 rounded-full bg-brand-500/20 blur-3xl" />
      <div class="absolute -bottom-24 -right-24 size-96 rounded-full bg-brand-400/15 blur-3xl" />
      <div class="relative text-center">
        <AppBrand inverse />
        <p class="mt-6 max-w-sm text-sm leading-6 text-gray-300">
          欢迎使用 Cattle 后台管理平台，让每一次管理都井然有序。
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import AppBrand from '@/components/common/AppBrand.vue'
import BaseCheckbox from '@/components/form/BaseCheckbox.vue'
import BaseInput from '@/components/form/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const username = ref('')
const password = ref('')
const remember = ref(true)

async function handleSubmit() {
  auth.login()
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
  await router.push(redirect)
}
</script>
