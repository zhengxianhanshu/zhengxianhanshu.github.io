---
title: Hello World
date: 2026-09-11 20:00:00
tags:
  - hexo
categories:
  - 随笔
description: |
  博客的第一篇文章，演示 Markdown、代码块、数学公式与 Mermaid 图。
comments: true
toc: true
---

欢迎来到我的博客！这篇文章演示本站支持的常用 Markdown 功能。

## 文本与格式

**加粗**、*斜体*、~~删除线~~、`行内代码`，以及[链接](https://hexo.io/)。

> 引用块：这是一个提示。

{% note tip %}
这是一个标注框，支持 **Markdown**。
{% endnote %}

## 代码块

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("World");
```

## 数学公式

行内公式 $E = mc^2$，块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

## Mermaid 图

<div class="mermaid">
graph LR
  A[写作] --> B[git push]
  B --> C[CI 构建]
  C --> D[发布上线]
</div>

## 列表与表格

- 无序列表项
1. 有序列表项

| 功能 | 状态 |
| ---- | ---- |
| 深色模式 | 支持 |
| 评论 | giscus |
| 全文搜索 | 本站搜索页 |
