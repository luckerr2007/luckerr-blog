# Tasks

- [x] Task 1: 重构编辑器文件夹结构
  - [x] 创建 `public/editor/editor.js` 脚本文件（从 `src/scripts/editor.js` 迁移逻辑）
  - [x] 创建 `public/editor/editor.css` 样式文件（从 `index.astro` 中提取样式）
  - [x] 删除旧的 `src/scripts/editor.js`
  - [x] 重写 `src/pages/editor/index.astro`，引用 `/editor/editor.js` 和 `/editor/editor.css`

- [x] Task 2: 完善 Frontmatter 编辑面板
  - [x] 添加文章集合选择（blog/monthly/til）下拉框
  - [x] 修复加密文章开关与密码字段的联动（显示/隐藏、清空）
  - [x] 确保标签输入功能正常（Enter 添加、Backspace 删除、点击 × 移除）
  - [x] 日期字段默认填充当天日期

- [x] Task 3: 实现文章导出功能
  - [x] 导出完整 .md 文件（Frontmatter + 正文），文件名 slug 化
  - [x] 复制到剪贴板功能，显示 Toast 提示
  - [x] 根据集合类型调整导出路径提示

- [x] Task 4: 实现草稿自动保存与恢复
  - [x] 5 秒防抖自动保存到 localStorage
  - [x] 页面加载时检测草稿并显示恢复提示
  - [x] 恢复草稿时填充所有 Frontmatter 字段和正文内容

- [x] Task 5: UI 样式严格适配设计规范
  - [x] 所有颜色使用 `var(--color-*)` CSS 变量
  - [x] 所有间距使用 `var(--space-*)` CSS 变量
  - [x] 所有圆角使用 `var(--radius-*)` CSS 变量
  - [x] 所有字体使用 `var(--font-size-*)` CSS 变量
  - [x] 所有过渡使用 `var(--transition-*)` CSS 变量
  - [x] 暗黑模式支持（Vditor 跟随主题切换）
  - [x] 响应式布局（移动端单栏、Frontmatter 可折叠）
  - [x] Toast 提示使用 surface-card 样式

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1, Task 2
- Task 4 depends on Task 1, Task 2
- Task 5 depends on Task 1
