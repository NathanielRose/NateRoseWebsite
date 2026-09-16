import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The posts keep their original Jekyll filenames (YYYY-MM-DD-slug.md) so the
// date prefix can be stripped to rebuild the old `/:title/` permalink.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    // Jekyll wrote this as `tag`, sometimes a single value, sometimes a list.
    tag: z.union([z.string(), z.array(z.string())]).optional(),
    layout: z.string().optional(),
    comments: z.boolean().optional(),
  }),
});

export const collections = { posts };
