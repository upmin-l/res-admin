import type { Component } from 'vue'
import { LayoutDashboard, List } from 'lucide-vue-next'

export interface MenuChild {
  label: string
  to: string
}

export interface MenuItem {
  key: string
  label: string
  icon: Component
  to?: string
  children?: MenuChild[]
}

export const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    key: 'examples',
    label: '示例',
    icon: List,
    children: [{ label: '列表示例', to: '/examples/list' }],
  },
]
