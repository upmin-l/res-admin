<template>
  <div>
    <PageHeader
      title="列表示例"
      description="使用 Vue 和 Tailwind CSS 实现的基础 CRUD 列表。"
      breadcrumb="列表示例"
    />

    <AppCard content-class="p-0">
      <div class="flex flex-col gap-3 border-b border-gray-100 p-5 dark:border-gray-800 lg:flex-row">
        <form class="flex flex-1 flex-col gap-3 sm:flex-row" @submit.prevent="applySearch">
          <div class="relative max-w-md flex-1">
            <Search
              class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="keyword"
              type="search"
              placeholder="按姓名或邮箱搜索"
              class="h-11 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-brand-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white"
            />
          </div>
          <AppButton type="submit">
            <Search class="size-4" />
            查询
          </AppButton>
          <AppButton type="reset" variant="secondary" @click="resetSearch">
            <RotateCcw class="size-4" />
            重置
          </AppButton>
        </form>
        <AppButton @click="addRow">
          <Plus class="size-4" />
          新增
        </AppButton>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
            <tr>
              <th class="px-5 py-3 font-medium">姓名</th>
              <th class="px-5 py-3 font-medium">邮箱</th>
              <th class="px-5 py-3 font-medium">角色</th>
              <th class="px-5 py-3 font-medium">状态</th>
              <th class="px-5 py-3 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr
              v-for="row in paginatedRows"
              :key="row.id"
              class="text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/[0.02]"
            >
              <td class="px-5 py-4 font-medium text-gray-900 dark:text-white">{{ row.name }}</td>
              <td class="px-5 py-4">{{ row.email }}</td>
              <td class="px-5 py-4">{{ row.role }}</td>
              <td class="px-5 py-4">
                <AppBadge :variant="row.status === '已启用' ? 'success' : 'warning'">
                  {{ row.status }}
                </AppBadge>
              </td>
              <td class="px-5 py-4">
                <div class="flex justify-end gap-1">
                  <AppButton variant="ghost" aria-label="编辑记录" @click="editRow(row)">
                    <Pencil class="size-4" />
                    编辑
                  </AppButton>
                  <AppButton variant="danger" aria-label="删除记录" @click="deleteRow(row.id)">
                    <Trash2 class="size-4" />
                    删除
                  </AppButton>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedRows.length === 0">
              <td colspan="5" class="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                暂无匹配记录。
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-gray-100 p-5 dark:border-gray-800">
        <AppPagination
          v-model:page="page"
          :page-size="pageSize"
          :total="filteredRows.length"
        />
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pencil, Plus, RotateCcw, Search, Trash2 } from 'lucide-vue-next'
import AppBadge from '@/components/common/AppBadge.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppPagination from '@/components/common/AppPagination.vue'
import PageHeader from '@/components/common/PageHeader.vue'

type Status = '已启用' | '待处理'

interface ExampleRow {
  id: number
  name: string
  email: string
  role: string
  status: Status
}

const rows = ref<ExampleRow[]>([
  { id: 1, name: '陈晨', email: 'chen@example.com', role: '管理员', status: '已启用' },
  { id: 2, name: '李明', email: 'liming@example.com', role: '编辑', status: '已启用' },
  { id: 3, name: '王芳', email: 'wangfang@example.com', role: '客服', status: '待处理' },
  { id: 4, name: '赵磊', email: 'zhaolei@example.com', role: '访客', status: '已启用' },
  { id: 5, name: '周雪', email: 'zhouxue@example.com', role: '编辑', status: '待处理' },
])

const keyword = ref('')
const appliedKeyword = ref('')
const page = ref(1)
const pageSize = 3

const filteredRows = computed(() => {
  const query = appliedKeyword.value.trim().toLowerCase()
  if (!query) return rows.value

  return rows.value.filter(
    (row) => row.name.toLowerCase().includes(query) || row.email.toLowerCase().includes(query),
  )
})

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

function applySearch() {
  appliedKeyword.value = keyword.value
  page.value = 1
}

function resetSearch() {
  keyword.value = ''
  appliedKeyword.value = ''
  page.value = 1
}

function addRow() {
  const id = Math.max(0, ...rows.value.map((row) => row.id)) + 1
  rows.value.unshift({
    id,
    name: `新用户 ${id}`,
    email: `user${id}@example.com`,
    role: '访客',
    status: '待处理',
  })
  resetSearch()
}

function editRow(row: ExampleRow) {
  row.status = row.status === '已启用' ? '待处理' : '已启用'
}

function deleteRow(id: number) {
  rows.value = rows.value.filter((row) => row.id !== id)
  const lastPage = Math.max(1, Math.ceil(filteredRows.value.length / pageSize))
  page.value = Math.min(page.value, lastPage)
}
</script>
