// 站点全局配置 —— 改这里的值即可改掉全站信息
export const SITE = {
  // 你的名字/昵称(显示在主页与顶栏)
  author: 'OrikkZzzz',

  // 顶栏左上角标题
  brand: "OrikkZzzz's Blog",

  // 站点名
  title: "OrikkZzzz's Blog",

  // 浏览器标签页标题模板
  titleTemplate: '%s · OrikkZzzz',

  // 站点描述(SEO)
  description: 'OrikkZzzz 的个人主页与博客。',

  // 你的邮箱
  email: 'orikkzzzz@gmail.com',

  // 你的 GitHub 用户名(用于头像与小绿点)
  githubUsername: 'OrikkZzzz',

  // 站点最终 URL
  siteUrl: 'https://OrikkZzzz.github.io',

  // 教育背景(主页展示;school 用大字,其余为小字)
  education: {
    school: '华中科技大学',
    major: '人工智能',
    degree: '本科',
    status: '在读',
    range: 'now',
  },

  // 社交链接
  socials: [
    { label: 'GitHub', href: 'https://github.com/OrikkZzzz' },
    { label: 'Email', href: 'mailto:orikkzzzz@gmail.com' },
  ],
};

// Waline 评论配置
export const WALINE = {
  serverURL: 'https://waline-2-wine.vercel.app',
  path: '/:pathname',
  enabled: true,
};
