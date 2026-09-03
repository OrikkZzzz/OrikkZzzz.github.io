---
title: '给博客加上评论、贡献图与部署'
description: '一篇记录搭建流程的文章,也在你配置好 Waline 之后变成一篇真正的示例。'
pubDate: 2025-01-05
tags: ['教程', 'Astro']
updatedDate: 2025-01-05
---

这篇记录一下这个站的几个功能是怎么来的。

## GitHub 小绿点

主页上显示你每天的提交情况。它读取的是 GitHub **公开数据**,所以**不需要任何 token**,部署后浏览器自动加载。

开始前记得把 `src/config.ts` 里的 `githubUsername` 改成你自己的 GitHub 用户名。

## Waline 评论

评论区用的是 Waline。等你在 Vercel 部署好服务端、拿到 `serverURL` 后,填进 `src/config.ts` 的 `WALINE.serverURL` 即可,文章页会自动出现评论框。

## 部署

推送 GitHub 后,仓库里的 GitHub Actions 工作流会自动构建并发布到 GitHub Pages。

---

这就是当前站点的整体结构了。
