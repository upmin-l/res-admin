# TailAdmin Vue 启动模板

一个基于 TailAdmin Vue 社区模板精简而来的轻量后台管理启动模板。项目删除了图表、电商、
CRM、日历、地图、复杂表单和大量展示页面，只保留通用后台开发需要的基础布局、登录、
路由、主题和少量基础组件。

这不是 TailAdmin 官方轻量版本，而是便于长期复用的社区精简版本。项目保留 TailAdmin 的
视觉基础和品牌归属，感谢 [TailAdmin](https://tailadmin.com/) 与
[TailAdmin Vue](https://github.com/TailAdmin/vue-tailwind-admin-dashboard) 原项目。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Tailwind CSS 4
- Vue Router
- Pinia
- Lucide Vue Next（按需图标）
- ESLint 与 Prettier

项目使用 Pinia 管理认证、布局和主题状态，不包含 Axios 或完整 UI 组件库。

## 保留功能

- 响应式后台布局、桌面端侧边栏收起和移动端抽屉
- 集中配置的一、二级菜单及路由高亮
- 明暗主题切换、系统主题读取和本地持久化
- 最小模拟登录、路由守卫和退出登录
- 仪表盘欢迎页与四个静态统计卡片
- 带查询、重置、新增、编辑、删除和分页 UI 的示例列表
- 简洁 404 页面
- Button、Card、Badge、Breadcrumb、Pagination、Input、Checkbox 等基础组件

## 开始使用

要求 Node.js 18 或更高版本，推荐 Node.js 20 或更高版本。本仓库使用 npm，请不要混用其他
包管理器。

```bash
npm install
npm run dev
```

默认开发地址由 Vite 输出，通常为 `http://localhost:5173`。

生产构建和本地预览：

```bash
npm run build
npm run preview
```

代码检查：

```bash
npm run lint
npm run type-check
npm run format
```

## 环境变量

复制 `.env.example` 为本地 `.env`，按项目需要修改：

```env
VITE_APP_TITLE=TailAdmin Vue 启动模板
VITE_API_BASE_URL=http://localhost:3000
```

`.env` 已被 Git 忽略。不要提交密钥或真实生产配置。

## 核心目录

```text
src/
├─ assets/
│  └─ main.css
├─ components/
│  ├─ common/
│  ├─ form/
│  └─ layout/
├─ config/
│  └─ menu.ts
├─ layouts/
│  └─ AppLayout.vue
├─ router/
│  └─ index.ts
├─ stores/
│  ├─ auth.ts
│  ├─ index.ts
│  ├─ layout.ts
│  └─ theme.ts
├─ views/
│  ├─ auth/
│  ├─ dashboard/
│  ├─ errors/
│  └─ examples/
├─ App.vue
└─ main.ts
```

## 新增页面

1. 在 `src/views/` 对应业务目录创建 Vue 页面。
2. 在 `src/router/index.ts` 的 `AppLayout` 子路由中添加路由。
3. 为路由设置简短的 `meta.title`；后台页面设置 `requiresAuth: true`。
4. 如需菜单入口，再更新 `src/config/menu.ts`。

后台页面由 `AppLayout` 统一提供侧边栏、顶部栏和内容容器；登录或公开错误页应作为顶级路由。

## 新增菜单

编辑 `src/config/menu.ts` 中的 `menuItems`。一级链接设置 `to`；需要二级菜单时设置
`children`。当前实现仅支持清晰的一、二级结构，不包含权限过滤或后端动态菜单。

## 替换登录接口

模拟认证集中在 `src/stores/auth.ts`：

1. 将 `login()` 中的模拟令牌写入替换为真实接口调用。
2. 根据接口结果保存 token，并按业务需要扩展用户信息。
3. 保留 `logout()` 作为清理认证状态的唯一入口。
4. 如需统一请求处理，再在真实需求明确后引入请求客户端。

当前 token 键为 `admin_token`，演示登录接受任意非空用户名和密码。

## 修改主题色

编辑 `src/assets/main.css` 的 `--color-brand-*` 颜色标记即可。明暗模式逻辑位于
`src/stores/theme.ts`，本地存储键为 `theme`。项目没有主题编辑器或运行时主色配置。

## 许可证与归属

此代码来自 TailAdmin Vue 的精简改造，TailAdmin 名称、Logo 与原设计的相关权利归原权利人。
本地来源副本未包含独立 LICENSE 文件，且 TailAdmin 对不同版本和使用场景提供不同许可条款，
因此本仓库不会擅自声明一个可能不适用于来源代码的开源许可证。

在公开发布、商业使用或再分发前，请根据你实际取得的 TailAdmin 版本核对并遵守
[TailAdmin 官方许可说明](https://tailadmin.com/license)，并补充适用于该来源版本的原始
LICENSE/授权文件。若来源确定为 MIT 社区版本，应原样保留其 MIT 许可证和版权声明。
