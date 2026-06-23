import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // Default IDs drop the directory, so en/foo.md and pt/foo.md would collide.
    // Keep the full relative path (minus extension) as the unique ID.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'pt']),
    slug: z.string(),
    cover: z.string().optional(),
    originalUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
