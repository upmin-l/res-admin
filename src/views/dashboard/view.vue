<template>
  <div class="dashboard">
    <div class="dashboard-heading">
      <div>
        <h1>仪表盘</h1>
        <p>欢迎回来，在这里开启高效的一天。</p>
      </div>
      <span class="date-chip"><CalendarDays class="size-4" />{{ today }}</span>
    </div>

    <div class="welcome-grid">
      <AppCard content-class="welcome-content" class="welcome-card">
        <div class="welcome-icon"><Sun class="size-8" :stroke-width="1.5" /></div>
        <div class="welcome-copy">
          <span class="eyebrow">CATTLE WORKSPACE</span>
          <h2>{{ greeting }}，管理员</h2>
          <p>欢迎回到 Cattle，让每一次管理都井然有序。</p>
          <RouterLink to="/examples/list" class="welcome-link"
            >查看列表示例 <ArrowRight class="size-3.5"
          /></RouterLink>
        </div>
        <WelcomeIllustration class="welcome-art" />
      </AppCard>
      <AppCard content-class="workspace-content">
        <div class="section-title">
          <h2>工作空间</h2>
          <span class="subtle-label">管理控制台</span>
        </div>
        <div class="workspace-details">
          <span class="feature-icon"><PanelsTopLeft class="size-6" /></span>
          <div>
            <p>当前页面</p>
            <strong>仪表盘</strong>
          </div>
          <span class="workspace-divider" />
          <div>
            <p>主题模式</p>
            <strong>{{ theme.isDark ? '深色模式' : '浅色模式' }}</strong>
          </div>
        </div>
      </AppCard>
    </div>

    <div class="stats-grid">
      <AppCard v-for="(stat, index) in stats" :key="stat.label" content-class="stat-content">
        <div class="stat-top">
          <span>{{ stat.label }}</span
          ><component :is="stat.icon" class="size-4" />
        </div>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-footer">
          <span class="stat-indicator" :class="{ 'is-pending': index === 3 }" />{{
            index === 3 ? '待办概览' : '数据概览'
          }}<span class="stat-decoration" aria-hidden="true"
            ><i /><i /><i /><i /><i /><i /><i
          /></span>
        </div>
      </AppCard>
    </div>

    <div class="content-grid">
      <AppCard content-class="p-0" class="main-panel">
        <div class="panel-heading">
          <h2>内容区域</h2>
          <span class="subtle-label">工作台</span>
        </div>
        <div class="empty-workspace">
          <div class="empty-illustration" aria-hidden="true">
            <div class="empty-window">
              <span /><span /><span />
              <div><i /><i /><i /></div>
            </div>
            <span class="empty-tile"><LayoutPanelTop class="size-7" :stroke-width="1.5" /></span>
          </div>
          <h3>从这里开始你的工作</h3>
          <p>可在此处开始开发第一个业务功能。<br />响应式布局、导航、主题和认证外壳均已就绪。</p>
          <RouterLink to="/examples/list" class="primary-link"
            >查看列表示例<ArrowRight class="size-4"
          /></RouterLink>
        </div>
        <div class="panel-note"><PanelsTopLeft class="size-4" />为你的业务，留出更多可能</div>
      </AppCard>

      <div class="side-panels">
        <AppCard content-class="p-0">
          <div class="panel-heading">
            <h2>快捷入口</h2>
            <ArrowUpRight class="size-4 text-[var(--text-secondary)]" />
          </div>
          <div class="shortcut-list">
            <RouterLink to="/dashboard" class="shortcut"
              ><span class="feature-icon"><LayoutDashboard class="size-5" /></span
              ><span><strong>仪表盘</strong><small>查看平台数据概览</small></span
              ><ChevronRight class="shortcut-arrow"
            /></RouterLink>
            <RouterLink to="/examples/list" class="shortcut"
              ><span class="feature-icon"><List class="size-5" /></span
              ><span><strong>列表示例</strong><small>查看和管理列表记录</small></span
              ><ChevronRight class="shortcut-arrow"
            /></RouterLink>
          </div>
        </AppCard>
        <AppCard content-class="p-0">
          <div class="panel-heading">
            <h2>显示设置</h2>
            <Palette class="size-4 text-[var(--text-secondary)]" />
          </div>
          <div class="appearance-setting">
            <span class="feature-icon"
              ><Moon v-if="theme.isDark" class="size-5" /><Sun v-else class="size-5" /></span
            ><span><strong>深色模式</strong><small>选择适合你的界面外观</small></span
            ><button
              type="button"
              class="theme-switch"
              role="switch"
              :aria-checked="theme.isDark"
              aria-label="深色模式"
              @click="theme.toggleTheme"
            >
              <span />
            </button>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  LayoutPanelTop,
  List,
  Moon,
  Palette,
  PanelsTopLeft,
  ShoppingBag,
  Sun,
  Users,
} from 'lucide-vue-next'
import AppCard from '@/components/common/AppCard.vue'
import { useThemeStore } from '@/stores/theme'
import WelcomeIllustration from './widgets/WelcomeIllustration.vue'

defineOptions({ name: 'DashboardView' })

const theme = useThemeStore()
const now = new Date()
const today = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(now)
const greeting = now.getHours() < 12 ? '上午好' : now.getHours() < 18 ? '下午好' : '晚上好'
const stats = [
  { label: '用户数量', value: '1,248', icon: Users },
  { label: '今日订单', value: '36', icon: ShoppingBag },
  { label: '今日收入', value: '¥8,420', icon: CircleDollarSign },
  { label: '待处理事项', value: '12', icon: ClipboardList },
]
</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}
.dashboard-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 2px;
}
h1 {
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -0.5px;
}
.dashboard-heading p {
  margin-top: 5px;
  color: var(--text-secondary);
  font-size: 13px;
}
.date-chip {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 9px 12px;
  color: var(--text-secondary);
  font-size: 12px;
}
.welcome-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 18px;
}
.welcome-card {
  overflow: hidden;
  background: linear-gradient(110deg, var(--surface-panel) 45%, rgb(40 100 245 / 10%));
}
:deep(.welcome-content) {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 158px;
  padding: 24px;
}
.welcome-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 66px;
  height: 72px;
  border-radius: 16px;
  background: rgb(40 100 245 / 14%);
  color: var(--color-brand-500);
}
.welcome-copy {
  position: relative;
  z-index: 1;
}
.eyebrow {
  font-size: 9px;
  letter-spacing: 1.5px;
  color: var(--text-secondary);
}
.welcome-copy h2 {
  margin-top: 4px;
  font-size: 21px;
  font-weight: 650;
}
.welcome-copy p {
  margin-top: 7px;
  color: var(--text-secondary);
  font-size: 12px;
}
.welcome-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 12px;
  color: var(--color-brand-400);
}
.welcome-link:hover {
  color: var(--color-brand-500);
}
.welcome-art {
  position: absolute;
  right: 12px;
  bottom: 0;
  width: 195px;
  opacity: 0.8;
  pointer-events: none;
}
:deep(.workspace-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 22px 24px;
}
.section-title,
.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.section-title h2,
.panel-heading h2 {
  font-size: 14px;
  font-weight: 600;
}
.subtle-label {
  color: var(--text-secondary);
  font-size: 11px;
}
.workspace-details {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 25px;
}
.workspace-details p {
  color: var(--text-secondary);
  font-size: 11px;
  margin-bottom: 5px;
}
.workspace-details strong {
  font-size: 15px;
  font-weight: 600;
}
.workspace-divider {
  align-self: stretch;
  width: 1px;
  margin: 0 10px;
  background: var(--border-subtle);
}
.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 43px;
  height: 43px;
  border-radius: 12px;
  background: rgb(40 100 245 / 14%);
  color: var(--color-brand-500);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}
:deep(.stat-content) {
  padding: 20px 22px;
}
.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 12px;
}
.stat-top svg {
  color: var(--color-brand-400);
}
.stat-value {
  margin-top: 10px;
  font-size: 29px;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.6px;
  font-variant-numeric: tabular-nums;
}
.stat-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 17px;
  color: var(--text-secondary);
  font-size: 11px;
}
.stat-indicator {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-brand-400);
}
.is-pending {
  background: var(--color-warning-400);
}
.stat-decoration {
  display: flex;
  align-items: end;
  gap: 4px;
  height: 18px;
  margin-left: auto;
  opacity: 0.5;
}
.stat-decoration i {
  display: block;
  width: 5px;
  height: 40%;
  border-radius: 2px;
  background: var(--color-brand-500);
}
.stat-decoration i:nth-child(2n) {
  height: 65%;
}
.stat-decoration i:nth-child(3n) {
  height: 85%;
}
.stat-decoration i:last-child {
  height: 100%;
}
.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(300px, 1fr);
  gap: 18px;
}
.panel-heading {
  min-height: 58px;
  padding: 16px 22px;
  border-bottom: 1px solid var(--border-subtle);
}
.empty-workspace {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 330px;
  padding: 28px;
  text-align: center;
}
.empty-illustration {
  position: relative;
  width: 120px;
  height: 88px;
  margin-bottom: 18px;
}
.empty-window {
  position: absolute;
  left: 8px;
  top: 5px;
  width: 92px;
  height: 66px;
  border: 1px solid rgb(40 100 245 / 30%);
  border-radius: 8px;
  background: rgb(40 100 245 / 5%);
  text-align: left;
  padding: 0 7px;
}
.empty-window > span {
  display: inline-block;
  width: 3px;
  height: 3px;
  margin-right: 3px;
  border-radius: 50%;
  background: var(--color-brand-400);
  vertical-align: 7px;
}
.empty-window > div {
  display: flex;
  gap: 5px;
  padding: 2px 3px;
}
.empty-window i {
  width: 17px;
  height: 25px;
  border-radius: 3px;
  background: rgb(40 100 245 / 13%);
}
.empty-tile {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 48px;
  border: 1px solid rgb(40 100 245 / 25%);
  border-radius: 12px;
  color: var(--color-brand-400);
  background: var(--surface-panel);
}
.empty-workspace h3 {
  font-size: 17px;
  font-weight: 600;
}
.empty-workspace p {
  margin-top: 11px;
  font-size: 12px;
  line-height: 1.9;
  color: var(--text-secondary);
}
.primary-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 21px;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 12px;
  color: white;
  background: var(--color-brand-500);
  transition: background 0.2s;
}
.primary-link:hover {
  background: var(--color-brand-600);
}
.panel-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-top: 1px solid var(--border-subtle);
  font-size: 11px;
  color: var(--text-secondary);
}
.side-panels {
  display: grid;
  align-content: start;
  gap: 18px;
}
.shortcut-list {
  padding: 5px 18px;
}
.shortcut {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 17px 4px;
}
.shortcut + .shortcut {
  border-top: 1px solid var(--border-subtle);
}
.shortcut strong,
.appearance-setting strong {
  display: block;
  font-size: 13px;
  font-weight: 500;
}
.shortcut small,
.appearance-setting small {
  display: block;
  margin-top: 5px;
  font-size: 11px;
  color: var(--text-secondary);
}
.shortcut-arrow {
  width: 16px;
  height: 16px;
  margin-left: auto;
  color: var(--text-secondary);
  transition: transform 0.2s;
}
.shortcut:hover .shortcut-arrow {
  transform: translateX(3px);
  color: var(--color-brand-500);
}
.appearance-setting {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 23px 22px;
}
.theme-switch {
  width: 34px;
  height: 20px;
  flex-shrink: 0;
  padding: 3px;
  margin-left: auto;
  border-radius: 20px;
  background: var(--border-subtle);
  transition: background 0.2s;
}
.theme-switch[aria-checked='true'] {
  background: var(--color-brand-500);
}
.theme-switch span {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px #0002;
  transition: transform 0.2s;
}
.theme-switch[aria-checked='true'] span {
  transform: translateX(14px);
}
@media (max-width: 1535px) {
  .welcome-art {
    width: 150px;
    opacity: 0.25;
  }
  .welcome-copy p {
    max-width: 260px;
  }
}
@media (max-width: 1199px) {
  .welcome-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .welcome-art {
    width: 220px;
    opacity: 0.8;
  }
  .workspace-details {
    margin-top: 18px;
  }
  .content-grid {
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);
  }
}
@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .content-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .date-chip {
    display: none;
  }
  .welcome-art {
    width: 170px;
    opacity: 0.25;
  }
  .dashboard {
    gap: 16px;
  }
}
@media (max-width: 479px) {
  :deep(.welcome-content) {
    padding: 20px;
    gap: 12px;
  }
  .welcome-icon {
    width: 44px;
    height: 52px;
    border-radius: 12px;
  }
  .welcome-icon svg {
    width: 25px;
  }
  .welcome-copy h2 {
    font-size: 19px;
  }
  .welcome-copy p {
    font-size: 11px;
  }
  .welcome-art {
    display: none;
  }
  :deep(.stat-content) {
    padding: 17px;
  }
  .stat-value {
    font-size: 25px;
  }
  .workspace-details {
    gap: 12px;
  }
  .workspace-divider {
    margin: 0 4px;
  }
}
</style>
