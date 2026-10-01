import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    /* Shown as the <title>. The authored title doubles as the H1 and runs to
       130 characters on the country posts, which a SERP cuts off long before
       the part that identifies the country. Optional: without it the H1 is
       used, which is correct for the posts that already fit. */
    metaTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Waqas Riasat'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
