---
title: '你好，世界'
description: '这是你的第一篇文章，用来测试博客系统是否正常。'
pubDate: 2025-01-01
tags: ['开始', '测试']
cover: '/images/cover-hello.svg'
---

欢迎来到你的博客!这是一篇用 Markdown 写的示例文章。

## 为什么用 Markdown

- 纯文本,`git` 友好
- 支持标题、列表、**加粗**、`行内代码`、[链接](https://astro.build)
- 代码块带语法高亮:

```ts
// 一个示例代码块
export function hello(name: string) {
  return `Hello, ${name}!`;
}
```

## 如何发文章

1. 在 `src/content/blog/` 新建一个 `.md` 文件
2. 在开头用 `---` 写上 frontmatter(标题、日期等)
3. `git push`

> 提示:修改 `src/config.ts` 里的 `SITE` 就能改掉站点标题、你的名字和 GitHub 用户名。

图片可以直接放仓库,例如放到 `public/images/` 下:

![示例封面](/images/cover-hello.svg)

然后在你电脑上运行 `npm run dev` 看效果吧。
