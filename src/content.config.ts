import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/entries' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    source: z.string(),
    category: z.enum(['design', 'copy', 'code', 'images', 'meta']),
    tags: z.array(z.string()).default([]),
    last_checked: z.coerce.date(),
    slop_allow: z.string().optional(),
  }),
});

export const collections = { entries };
