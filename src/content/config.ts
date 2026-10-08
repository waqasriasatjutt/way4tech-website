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

/*
 * The OWL course. Lessons are ordered by `part` then `order`, never by date, so
 * the reading order is editorial and does not shift when a lesson is corrected.
 * Each lesson is its own URL because each answers a question someone types.
 */
const course = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    /* The H1 can carry the full teaching headline; the SERP gets this. */
    metaTitle: z.string().optional(),
    description: z.string(),
    part: z.number(),
    partTitle: z.string(),
    order: z.number(),
    /* What the reader can do after this lesson, shown above the fold. */
    outcome: z.string(),
    /* Odoo versions the code in this lesson was written against. */
    versions: z.array(z.string()).default(['19.0', '18.0']),
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, course };
