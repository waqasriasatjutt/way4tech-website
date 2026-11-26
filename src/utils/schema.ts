/*
 * Shared schema.org builders.
 *
 * The detail templates each wrote their own BreadcrumbList inline, so the
 * section landing pages that have no detail template under them - /services/,
 * /suites/, /modules/, /countries/, /blog/, /learn/, /software/, /solutions/,
 * /odoo-guides/, /pricing/, /resources/, /careers/, /about/ - carried none at
 * all. Google needs the trail on the hub as much as on the leaf: without it
 * the hub shows a bare URL in the result where its siblings show a path.
 */
import { SITE } from '~/data/site';

const abs = (path: string) => new URL(path, SITE.url).toString();

export interface Crumb {
  name: string;
  /** Site-absolute path with a trailing slash, e.g. '/services/'. */
  path: string;
}

/**
 * A BreadcrumbList rooted at the homepage.
 *
 * Pass only the trail below Home: breadcrumb([{ name: 'Services', path: '/services/' }])
 * yields Home > Services. The last item still carries its item URL, which is
 * what Google's own examples do and what lets the trail render on the page it
 * describes.
 */
export function breadcrumb(trail: Crumb[]) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/**
 * A CollectionPage with the section's children as an ItemList.
 *
 * This is what a hub actually is, and it states the relationship between the
 * hub and its children in machine-readable form instead of leaving it to be
 * inferred from the links. Order matters to ItemList, so the list is emitted
 * in the order the page renders it.
 */
export function collectionPage(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${abs(opts.path)}#collection`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    isPartOf: { '@id': abs('/#website') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: abs(it.path),
      })),
    },
  };
}
