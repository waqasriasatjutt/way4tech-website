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

/*
 * Odoo guides at /odoo-guides/<slug>/. One page per question somebody types,
 * written from the modules and the regulations rather than from a template.
 * (/guides/ is taken: it holds client handover guides kept out of search.)
 *
 * The limits are enforced so a guide cannot ship with a <title> or a meta
 * description a results page would cut: the layout appends " | Way4Tech"
 * (11 characters) to metaTitle.
 */
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().max(48),
    description: z.string().min(80).max(155),
    /* The search the page is written to answer. Editorial, not rendered. */
    targetQuery: z.string(),
    category: z.enum(['Payroll and HR', 'Tax and compliance', 'Industry', 'Integration', 'Upgrades']),
    region: z.string().optional(),
    /* One or two sentences for the hub card. */
    summary: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /* Store modules the guide describes. technical is the module's directory
       name; the listing URL is built from it. */
    modules: z.array(z.object({
      name: z.string(),
      technical: z.string().regex(/^[a-z0-9_]+$/),
      note: z.string().optional(),
    })).default([]),
    /* A live demo that answered 200 when the guide was written. */
    demo: z.object({ url: z.string().url(), label: z.string() }).optional(),
    /* Other guide slugs shown under "Related guides". */
    related: z.array(z.string()).default([]),
    /* Site paths (with trailing slash) that should list this guide. */
    linkFrom: z.array(z.string().regex(/^\/.*\/$/)).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, course, guides };
