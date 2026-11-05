import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;

/*
 * A guide goes live on its `published` date, not on the commit that adds it.
 * The deploy workflow rebuilds every day at 03:00 UTC, so a guide dated
 * ahead appears on that morning's build with nobody pushing anything. This is
 * how the product guides are released a few at a time instead of in one drop.
 */
/* GUIDES_NOW=2026-12-31 npm run build previews the site as of that date. */
const NOW = process.env.GUIDES_NOW ? new Date(process.env.GUIDES_NOW) : new Date();

export function isLive(g: Guide, now = NOW): boolean {
  return !g.data.draft && g.data.published.getTime() <= now.getTime();
}

export async function getLiveGuides(): Promise<Guide[]> {
  return (await getCollection('guides')).filter(g => isLive(g));
}

/* The chapters of a series, hub first, in reading order. */
export function seriesOf(series: string, all: Guide[]): Guide[] {
  return all
    .filter(g => g.data.series === series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}
