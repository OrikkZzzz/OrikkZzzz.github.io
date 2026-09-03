// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 你的站点最终地址。如果是个人主页(用户名.github.io),保持根路径即可。
  // 如果是项目页(github.io/<repo>),需要同时把下面的 base 改掉。
  site: 'https://OrikkZzzz.github.io',

  // 如果你的仓库不是「用户名.github.io」(而是项目页),请取消注释并改成 /仓库名/ :
  // base: '/my-repo',

  integrations: [mdx(), sitemap()],

  markdown: {
    // 代码块语法高亮主题(可选 gitHub-light / one-dark-pro / dracula ...)
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // 让 Astro 把 .md 里的相对图片也走 images 优化(可选)
  vite: {},
});
