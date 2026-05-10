# LuckErr Blog

基于 Astro 构建的现代化个人博客，记录技术笔记与生活感悟。

## 内容体系

| 类型   | 路由            | 说明                      |
| ---- | ------------- | ----------------------- |
| 长篇文章 | `/blog`       | 技术分享                    |
| 月记   | `/monthly`    | 月度生活记录                  |
| TIL  | `/til`        | Today I Learned，碎片化技术笔记 |
| 分类索引 | `/categories` | 按分类聚合文章，快速检索            |
| 文章加密 | —             | 支持密码保护私密文章              |

## 功能特性

### 阅读体验

- **双主题** — 浅色 / 夜间模式，支持跟随系统自动切换
- **中文优化** — 使用 HarmonyOS Sans Medium 字体，17px 基准字号，Apple HIG 排版规范
- **目录导航** — 长篇文章自动生成可折叠 TOC，悬浮按钮快速跳转
- **阅读进度** — 顶部进度条实时显示当前位置
- **相关文章** — 基于标签智能推荐关联内容
- **图片灯箱** — 点击放大查看，支持左右切换
- **代码高亮** — Shiki 双主题语法着色，一键复制代码
- **LaTeX 公式** — 数学公式渲染支持
- **图表支持** — Mermaid 流程图 / 甘特图 / 时序图，ECharts 数据可视化
- **Markdown 增强** — 原生 Alert 区块（Note / Tip / Warning / Caution）

### 交互功能

- **站内搜索** — Pagefind 全文检索，`Cmd+K` 快捷唤起，跨集合搜索
- **评论系统** — 基于 Twikoo + Netlify 部署，支持登录、点赞、回复
- **文章分享** — 社交分享侧边栏，一键复制链接
- **音乐播放器** — 内嵌 Meting API 播放器，支持在文章中插入音乐
- **国际化** — 中文 / English 双语支持，URL 前缀区分语言

### 开发者工具

- **文章上传后台** — `/editor` 路径，仅 dev 环境可用
  - 拖拽上传 .md / .mdx 文件
  - 自动解析 Frontmatter
  - 可视化编辑标题 / 标签 / 分类 / 加密等元信息
  - Vditor 实时 Markdown 预览
  - 一键写入 `src/content/` 对应文件夹

### SEO 与性能

- **静态站点** — Astro SSG 构建，零 JavaScript 首屏加载
- **RSS 订阅** — `/rss.xml` 自动生成聚合 RSS
- **Sitemap** — `@astrojs/sitemap` 自动生成站点地图
- **Pagefind 索引** — 构建时预计算搜索索引
- **图片优化** — Astro 编译时图片压缩

## 技术栈

[Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/) + [Netlify](https://www.netlify.com/)

评论系统基于 Twikoo + Netlify 搭建。

## 开发

```bash
pnpm install    # 安装依赖
pnpm dev        # 本地开发 (localhost:4321)
pnpm build      # 构建
pnpm preview    # 预览构建结果
```

## 项目结构

```text
src/
├── content/        # 内容（blog, monthly, til）
├── pages/          # 路由
│   ├── api/        # API 端点
│   ├── categories/ # 分类页面（中/英）
│   ├── editor/     # 文章上传后台
│   └── en/         # 英文路由
├── layouts/        # 页面布局
├── components/     # UI 组件
├── scripts/        # 客户端脚本
├── styles/         # 样式（tokens + global）
├── utils/          # 工具函数
└── i18n/           # 国际化配置
public/
├── editor/         # 编辑器静态资源
└── ...             # 静态资源
```

## 设计系统

博客采用日系文具风格的暖色调设计，陶土色主色调。设计系统规范详见：

| 文件                      | 说明                          |
| ----------------------- | --------------------------- |
| `.trae/rules/DESIGN.md` | Agent 可读设计规（9 大章节）          |
| `src/styles/tokens.css` | CSS 变量定义（颜色 / 间距 / 字体 / 阴影） |
| `src/styles/global.css` | 全局样式层（组件变体 / 排版规则）          |

## 部署

- **平台**: Netlify
- **构建命令**: `pnpm build`
- **输出目录**: `dist/`
- **环境变量**: `PUBLIC_TURNSTILE_SITE_KEY`、`TURNSTILE_SECRET_KEY`、`ADMIN_TOKEN`

