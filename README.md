# 个人站点(基于 Astro)

一个开箱即用的个人主页 + Markdown 博客。功能:

- 主页(Hero + GitHub 提交小绿点 + 最新文章)
- Markdown / MDX 博客(git 发布,代码高亮,标签,日期)
- GitHub 贡献热力图(读取公开数据,**不需要 token**)
- Waline 评论(需你自行部署服务端)
- GitHub Actions 自动构建并发布到 GitHub Pages
- RSS 订阅(`/feed.xml`)

## 目录结构

```
.
├── public/                 # 静态资源(图片、favicon 等原样发布)
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── GitHubContributions.astro   # 小绿点
│   │   └── WalineComments.astro        # 评论区
│   ├── content/blog/       # 你的文章(.md / .mdx)都放这里
│   │   ├── hello-world.md
│   │   └── second-post.md
│   ├── content.config.ts   # 文章集合与字段校验
│   ├── config.ts           # ⭐ 站点配置(名字/邮箱/GitHub 用户名/评论地址)
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     # 主页
│   │   ├── about.astro
│   │   ├── blog/index.astro
│   │   ├── blog/[...slug].astro  # 文章详情+评论
│   │   ├── 404.astro
│   │   └── feed.xml.ts     # RSS
│   └── styles/global.css
├── .github/workflows/deploy.yml  # 自动部署
├── astro.config.mjs
└── package.json
```

## 快速开始(在你自己的终端里跑)

> 下面所有用到 `npm`/`git`/`gh` 的命令,都在**你自己电脑的终端**里执行。我这个运行环境因网络受限无法代跑,但代码已全部写好。

### 1. 安装依赖

```bash
npm install
```

### 2. 本地预览

```bash
npm run dev
```

打开 `http://localhost:4321` 看效果。改文件会自动热更新。

### 3. 改配置(必做)

编辑 `src/config.ts`:

- `author` / `title` / `description` / `tagline` → 你的信息
- `avatar` → 你的头像(放 `public/` 下)
- `githubUsername` → **你的 GitHub 用户名**(小绿点靠它)
- `siteUrl` → 你的最终地址
- `socials` → 你的社交链接

### 4. 写文章

在 `src/content/blog/` 新建一个 `.md` 文件,开头写好 frontmatter:

```md
---
title: '我的第一篇'
description: '摘要'
pubDate: 2025-01-01
tags: ['随笔']
---
正文用 Markdown 写……
```

### 5. 图片怎么放(两种都支持)

- **放 `public/` 目录**(原样输出,最简单):`public/images/a.png` → 文章里写 `![图](/images/a.png)`
- **放 `src/assets/`**(走 Astro 图像优化,更省流量):参见 Astro 文档的 [`astro:assets`](https://docs.astro.build/en/guides/images/)。

> 前期图少直接放仓库即可;图多后强烈建议迁到 Cloudflare R2(图床),仓库只存 URL。

## 发布到 GitHub Pages

### 6. 建仓库并推送

```bash
# 若之前没装 GitHub CLI,先装并登录(浏览器授权)
gh auth login

# 在 D:\Blog 下初始化并推送
git init
git add .
git commit -m "feat: init personal site"
gh repo create <你的用户名>.github.io --public --source=. --push
```

> ⚠️ **仓库名要符合 GitHub Pages 规则**:如果你想得到 `https://<用户名>.github.io`,仓库名必须是 `<用户名>.github.io`(即"用户站点")。若用别的名字,则地址是 `<用户名>.github.io/<仓库名>`,此时需把 `astro.config.mjs` 里的 `base` 设成 `/仓库名/`。

### 7. 开启 Pages(只需一次)

推送完成后,到 GitHub 仓库页面:

- 进入 **Settings → Pages**
- 在 **Build and deployment** 的 **Source** 选 **GitHub Actions**
- 无需再手动上传;每次 `git push` 会自动构建部署

### 8. (可选)绑定自定义域名

买域名后,在 Pages 设置里添加自定义域名,并把 DNS 的 CNAME 指向 `<用户名>.github.io`。然后在 `astro.config.mjs` 把 `site` 改成你的域名。

## 配上 Waline 评论

评论需要你部署一个 Waline 服务端(Vercel)和一个数据存储(LeanCloud / CloudBase)。

### 9. 创建数据存储(LeanCloud)

1. 注册 [LeanCloud](https://console.leancloud.app/)(推荐国际版)
2. 创建一个应用,记下:
   - `AppID`
   - `AppKey`
   - 你的应用域名(或 `APP_ID` 对应的绑定域名)
3. 在控制台添加一个 **Web 安全域名**(填你部署后的站点地址,如 `https://<你>.github.io`)

### 10. 部署 Waline 到 Vercel

1. 打开 Waline 一键部署的[参考仓库](https://github.com/walinejs/waline) 或直接在 Vercel 里导入 `@waline/vercel` 的模板
2. 按要求填入上面的 `AppID`/`AppKey`(作为 Vercel 环境变量)
3. 部署完成后你会得到一个地址,形如 `https://xxx.vercel.app`
4. (可选)在 Vercel 项目 → Settings → Domains 里绑定一个你自己的域名

### 11. 回到站点配置

打开 `src/config.ts`,把 `WALINE.serverURL` 填成你第 10 步得到的地址:

```ts
export const WALINE = {
  serverURL: 'https://xxx.vercel.app',
  ...
};
```

提交并推送,文章页就会出现评论区。

> ⚠️ **安全提醒**:`AppID`/`AppKey`、GitHub 的 Personal Access Token 这类密钥,都在各自的控制台/环境变量里配置,`src/config.ts` 里只需要 `serverURL`。**不要把密钥写进代码或发到聊天里。**

## 常用命令

```bash
npm run dev      # 本地开发
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建结果
```

---

## 项目里哪些需要你自己做 / 我已经做好的

| 事项 | 状态 |
|---|---|
| 全套源码(主页/博客/MD 渲染/小绿点/Waline 组件/Actions 工作流) | ✅ 已写好 |
| 本地 `npm install` / `npm run dev` | ⚠️ 需你的终端运行 |
| 改 `src/config.ts` 为你的信息 | ⚠️ 需你填 |
| 建 GitHub 仓库并推送 | ⚠️ 需你执行(需登录 gh) |
| 开启 GitHub Pages(Source 选 GitHub Actions) | ⚠️ 需你一次性设置 |
| 注册 LeanCloud + 配置 | ⚠️ 需你建账号拿 AppID/AppKey |
| 部署 Waline 到 Vercel + 填 serverURL | ⚠️ 需你操作 |
| (可选)买域名 / 接 Cloudflare R2 | ⚠️ 后续再弄 |

需要我继续补充的话,随时说。
