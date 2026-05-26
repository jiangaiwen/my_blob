# 个人博客网站 技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                        前端应用                              │
├─────────────────────────────────────────────────────────────┤
│  Vue3 + Vite                                                │
│  ├── Vue Router 4 (路由管理)                                │
│  ├── Pinia (状态管理)                                       │
│  ├── Naive UI (UI组件库)                                    │
│  ├── Tailwind CSS (样式方案)                                │
│  ├── Axios (网络请求)                                       │
│  ├── marked + highlight.js (Markdown渲染)                   │
│  └── wow.js + animate.css (滚动动画)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      外部服务                                │
├─────────────────────────────────────────────────────────────┤
│  必应壁纸接口: https://bing.biturl.top                      │
└─────────────────────────────────────────────────────────────┘
```

## 2. 技术选型

| 技术           | 版本   | 说明         |
| ------------ | ---- | ---------- |
| Vue          | 3.x  | 前端框架       |
| Vite         | 5.x  | 构建工具       |
| Naive UI     | 2.x  | UI组件库      |
| Vue Router   | 4.x  | 路由管理       |
| Pinia        | 2.x  | 状态管理       |
| Tailwind CSS | 3.x  | 样式方案       |
| Axios        | 1.x  | 网络请求       |
| marked       | 11.x | Markdown解析 |
| highlight.js | 11.x | 代码高亮       |
| wow\.js      | 1.x  | 滚动动画       |
| animate.css  | 4.x  | 动画样式       |

## 3. 路由定义

| 路由           | 页面                | 描述   |
| ------------ | ----------------- | ---- |
| /            | HomeView          | 首页   |
| /articles    | ArticleListView   | 文章列表 |
| /article/:id | ArticleDetailView | 文章详情 |
| /timeline    | TimelineView      | 时间线  |
| /gallery     | GalleryView       | 相册   |
| /guestbook   | GuestbookView     | 留言板  |
| /links       | LinksView         | 友情链接 |
| /about       | AboutView         | 关于本站 |

## 4. 状态管理

### 4.1 Theme Store

```javascript
{
  isDark: Boolean,        // 是否深色模式
  toggleTheme(): void,    // 切换主题
  initTheme(): void       // 初始化主题（从localStorage读取）
}
```

### 4.2 App Store

```javascript
{
  wallPaper: String,           // 当前壁纸URL
  siteStats: Object,           // 站点统计
  categories: Array,           // 文章分类
  tags: Array,                 // 文章标签
  fetchWallPaper(): void,      // 获取必应壁纸
}
```

## 5. 组件结构

```
components/
├── common/
│   ├── AppHeader.vue       // 顶部导航栏
│   ├── AppFooter.vue       // 底部footer
│   ├── Sidebar.vue         // 侧边栏（首页左侧信息卡）
│   ├── ArticleCard.vue     // 文章卡片组件
│   ├── BackToTop.vue       // 返回顶部按钮
│   ├── ImagePreview.vue    // 图片预览弹窗
│   ├── BreadCrumb.vue      // 面包屑导航
│   └── ThemeToggle.vue     // 主题切换按钮
└── home/
    └── (首页专用组件)
```

## 6. 页面结构

```
views/
├── HomeView.vue           // 首页
├── ArticleListView.vue    // 文章列表页
├── ArticleDetailView.vue  // 文章详情页
├── TimelineView.vue      // 时间线页
├── GalleryView.vue        // 相册页
├── GuestbookView.vue      // 留言板页
├── LinksView.vue          // 友链页
└── AboutView.vue          // 关于本站页
```

## 7. 模拟数据文件

`src/data/mockData.js` 包含：

| 数据项        | 说明           |
| ---------- | ------------ |
| articles   | 文章列表（10-15篇） |
| categories | 分类列表         |
| tags       | 标签列表         |
| siteStats  | 站点统计数据       |
| messages   | 留言列表         |
| photos     | 相册数据         |
| links      | 友链数据         |
| profile    | 个人简介         |

## 8. 全局样式规范

### 8.1 CSS变量

```css
:root {
  --primary-color: #6366f1;
  --bg-color: #f8fafc;
  --card-bg: rgba(255, 255, 255, 0.8);
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}

[data-theme="dark"] {
  --primary-color: #818cf8;
  --bg-color: #0f172a;
  --card-bg: rgba(30, 41, 59, 0.8);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}
```

### 8.2 动画类名

| 类名              | 动画效果 |
| --------------- | ---- |
| wow fadeIn      | 淡入   |
| wow fadeInUp    | 向上淡入 |
| wow fadeInLeft  | 向左淡入 |
| wow fadeInRight | 向右淡入 |
| wow zoomIn      | 缩放淡入 |

## 9. 依赖安装命令

```bash
npm create vite@latest my_blog -- --template vue
cd my_blog
npm install naive-ui vue-router@4 pinia axios marked highlight.js wow.js animate.css tailwindcss postcss autoprefixer
npm install -D vite-plugin-windicss windicss
```

## 10. 构建与部署

* 开发命令: `npm run dev`

* 构建命令: `npm run build`

* 预览命令: `npm run preview`

* 产物目录: `dist/`

* 部署平台: Netlify、GitHub Pages、Vercel 等静态托管服务

