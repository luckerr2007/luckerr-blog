# 文章制作后台 Spec

## Why
当前博客文章编辑器已存在基础实现，但存在以下问题：页面使用内联脚本而非模块化引用 `editor.js`、加密 UI 未完全集成、编辑器代码分散在 `src/scripts/` 而非独立文件夹中。需要重构为独立的文章制作系统，代码组织清晰，UI 严格遵循设计规范。

## What Changes
- 重构编辑器代码到独立文件夹 `src/pages/editor/`，包含页面、脚本、样式
- 删除旧的 `src/scripts/editor.js`，将其逻辑整合到编辑器独立文件夹中
- 修复加密文章 UI（加密开关和密码字段未正常联动）
- 统一使用 CDN 引入 Vditor 编辑器
- 所有 UI 严格使用 `tokens.css` CSS 变量，支持明暗主题
- 完善文章集合选择功能（blog/monthly/til）
- 完善草稿自动保存与恢复提示

## Impact
- Affected specs: 无破坏性变更，纯重构和功能完善
- Affected code: `src/pages/editor/`, `src/scripts/editor.js`（删除）

## ADDED Requirements

### Requirement: 独立编辑器文件夹结构
系统 SHALL 将文章制作后台的所有代码组织在 `src/pages/editor/` 独立文件夹中。

#### Scenario: 文件夹结构
- **WHEN** 查看编辑器代码目录
- **THEN** 包含 `index.astro`（页面）、`editor.js`（脚本逻辑）、`editor.css`（编辑器专用样式），不依赖 `src/scripts/editor.js`

### Requirement: Vditor CDN 集成
系统 SHALL 通过 CDN 引入 Vditor 编辑器，不安装 npm 包。

#### Scenario: CDN 加载
- **WHEN** 用户访问 `/editor` 页面
- **THEN** Vditor 的 CSS 和 JS 通过 `cdn.jsdelivr.net` 加载，编辑器正常渲染

#### Scenario: 编辑模式
- **WHEN** 用户在编辑器中输入 Markdown
- **THEN** Vditor 以即时渲染（ir）模式工作，支持 LaTeX 公式、代码高亮、表格等

### Requirement: Frontmatter 可视化编辑
系统 SHALL 提供可视化的 Frontmatter 编辑面板，包含所有必要字段。

#### Scenario: 基础字段
- **WHEN** 用户在 Frontmatter 面板中填写标题、Slug、日期、分类、语言、标签、摘要
- **THEN** 系统自动生成对应的 YAML Frontmatter 代码

#### Scenario: 加密文章设置
- **WHEN** 用户启用加密开关
- **THEN** 显示密码和密码提示输入框
- **AND** Frontmatter 中自动添加 `encrypted: true`、`password`、`passwordHint` 字段

#### Scenario: 取消加密
- **WHEN** 用户取消加密开关
- **THEN** 密码和密码提示输入框隐藏，Frontmatter 中移除加密相关字段

#### Scenario: 文章集合选择
- **WHEN** 用户在集合下拉框中选择 blog/monthly/til
- **THEN** 导出文件名和路径提示根据集合类型更新

### Requirement: 文章导出
系统 SHALL 支持将编辑完成的文章导出为 `.md` 文件。

#### Scenario: 导出完整文章
- **WHEN** 用户点击"导出"按钮
- **THEN** 浏览器下载包含完整 Frontmatter + 正文的 `.md` 文件，文件名为 slug 化的标题

#### Scenario: 复制到剪贴板
- **WHEN** 用户点击"复制"按钮
- **THEN** 文章完整内容（Frontmatter + 正文）复制到系统剪贴板，显示 Toast 提示

### Requirement: 本地草稿自动保存
系统 SHALL 使用 localStorage 自动保存编辑中的草稿。

#### Scenario: 自动保存
- **WHEN** 用户编辑内容超过 5 秒无操作
- **THEN** 系统自动将当前内容保存到 localStorage

#### Scenario: 恢复草稿
- **WHEN** 用户重新打开编辑器页面且 localStorage 中存在草稿
- **THEN** 系统显示恢复提示对话框，用户可选择恢复或丢弃

### Requirement: UI 设计规范
编辑器界面 SHALL 严格遵循 Bokushi 设计规范。

#### Scenario: 配色和排版
- **WHEN** 编辑器页面渲染
- **THEN** 所有颜色使用 `var(--color-*)`、间距使用 `var(--space-*)`、圆角使用 `var(--radius-*)`、字体使用 `var(--font-size-*)`、过渡使用 `var(--transition-*)`

#### Scenario: 暗黑模式
- **WHEN** 用户切换明暗主题
- **THEN** 编辑器界面（包括 Vditor）跟随博客主题切换

#### Scenario: 响应式布局
- **WHEN** 在移动端访问编辑器
- **THEN** 编辑器布局从双栏切换为单栏，Frontmatter 面板可折叠

#### Scenario: Toast 提示
- **WHEN** 操作完成（保存、复制等）
- **THEN** 显示符合设计规范的 Toast 提示，使用 `surface-card` 样式

## MODIFIED Requirements

### Requirement: 编辑器脚本模块化
编辑器脚本 SHALL 从 `src/scripts/editor.js` 迁移到 `src/pages/editor/editor.js`，作为页面专用脚本，不再作为全局模块导出。

## REMOVED Requirements

### Requirement: 旧编辑器脚本
**Reason**: 代码重构，将编辑器逻辑整合到独立文件夹
**Migration**: 删除 `src/scripts/editor.js`，所有逻辑迁移到 `src/pages/editor/editor.js`
