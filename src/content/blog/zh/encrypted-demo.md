---
title: "加密文章示例"
description: "这是一篇加密文章的演示"
pubDate: 2026-05-09
tags: ["demo", "encrypted"]
encrypted: true
password: "admin"
passwordHint: "密码：admin"
---

这是一篇加密文章的内容。

只有输入正确的密码才能查看这篇文章的内容。

## 加密功能说明

在文章的 frontmatter 中添加以下字段即可启用加密：

```yaml
---
encrypted: true
password: "your-password"
passwordHint: "密码提示（可选）"
---
```

## 特点

- 密码验证后才显示内容
- 使用 sessionStorage 保存解锁状态（刷新页面后保持解锁）
- 支持密码提示
- 错误密码会有抖动提示
- 符合设计规范的 UI 样式
