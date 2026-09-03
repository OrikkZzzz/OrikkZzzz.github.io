import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Markdown / MDX 文章集合,放在 src/content/blog/ 下
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    // 文章标题
    title: z.string(),
    // 摘要(列表页与 SEO 用)
    description: z.string().optional(),
    // 发布日期
    pubDate: z.coerce.date(),
    // 更新日期(可选)
    updatedDate: z.coerce.date().optional(),
    // 标签
    tags: z.array(z.string()).default([]),
    // 封面图路径(可选)
    cover: z.string().optional(),
    // 置顶/草稿:设为 true 时不发布
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
