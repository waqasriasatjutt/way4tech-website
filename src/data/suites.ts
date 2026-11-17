/*
 * Industry suite pages (/suites/<slug>/). Each suite groups our store modules
 * for one industry, with the demo, the guide and the questions buyers ask.
 * Module names, prices and versions are read from the catalogue at build time
 * (modules-catalog.ts), never typed here, so a repricing reaches these pages.
 * No demo logins on these pages: they are indexed. Logins live on /demos/.
 */

export interface SuiteModule { key: string; role: string }
export interface SuiteShot { src: string; alt: string; caption: string; w: number; h: number; phone?: boolean }
export interface Suite {
  slug: string;
  name: string;
  /** Suite name in the catalogue, for the /products/ heading link. */
  catalogueSuite?: string;
  badge?: string;
  seoTitle: string;
  description: string;
  h1: string;
  lede: string;
  intro: string[];
  modules: SuiteModule[];
  /** Offer that is not on the store yet: shown instead of a price. */
  offer?: { name: string; note: string };
  highlights: { title: string; body: string }[];
  demos: { label: string; url: string; note: string }[];
  guides: { label: string; href: string }[];
  pdf?: { label: string; href: string };
  shots?: SuiteShot[];
  related?: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
  solution?: string;
}

const shot = (src: string, alt: string, caption: string, w = 1400, h = 900, phone = false): SuiteShot => ({ src, alt, caption, w, h, phone });

export const SUITES: Suite[] = [
  {
    slug: 'construction',
    name: 'Construction',
    catalogueSuite: 'Construction',
    seoTitle: 'Odoo Construction Management: BoQ and Job Costing',
    description: 'Construction modules for Odoo 19 and 20: BoQ, job costing, material requisitions and RA billing in the base module, tenders, budget control and valuations in Enterprise, or Construction Cloud hosted.',
    h1: 'Construction software: Odoo modules or Construction Cloud',
    lede: 'Three ways to run a contracting business with us: the base Construction Management module, the Enterprise edition for a full commercial team, or Construction Cloud, the hosted system we run for you.',
    intro: [
      'Construction Management adds construction projects, phases, a bill of quantities, material requisitions, labour and job costing to Odoo. Construction Management Enterprise adds tenders and estimating, budget control on every bill item, measurement, valuations and payment certificates with retention, variations, subcontractor bills, QHSE, cost value reconciliation and role dashboards.',
      'Both are on the Odoo Apps Store for Odoo 19 and Odoo 20, and install on your own server or Odoo.sh. If you would rather not run Odoo yourself, Construction Cloud is the same depth of system, hosted, branded and supported by us, with a site app, contract notices and an estimating library on top.',
    ],
    modules: [
      { key: 'wt-construction-management', role: 'Projects, phases, BoQ, material requisitions, labour, equipment and job costing.' },
      { key: 'wt-construction-management-enterprise', role: 'Tenders, budget control, measurement, valuations, certificates, retention, variations, subcontractors, QHSE and dashboards.' },
    ],
    highlights: [
      { title: 'BoQ to budget', body: 'The bill of quantities carries quantity, unit and rate per item, and Enterprise tracks budget, committed, actual and remaining on every line.' },
      { title: 'Valuations and retention', body: 'Measured work, variations and materials on site build the valuation; retention is held to its limit and released in two moieties.' },
      { title: 'Tenders and estimating', body: 'A tender pipeline with bid bonds and go or no-go scoring, and an award that opens the project in one step.' },
      { title: 'Construction Cloud', body: 'Hosted, with a site app that works offline, a notices register with time bar alerts, estimating with takeoff, and role dashboards.' },
    ],
    demos: [
      { label: 'Construction Management (store module)', url: 'https://construction.way4tech.com/', note: 'Odoo 19, base module.' },
      { label: 'Construction Cloud (hosted)', url: 'https://construction-cloud.way4tech.com/', note: 'Demo company Kestrel Construction.' },
    ],
    guides: [
      { label: 'Odoo construction management guide', href: '/odoo-guides/odoo-construction-management/' },
      { label: 'BoQ and phases', href: '/odoo-guides/odoo-construction-boq-phases/' },
      { label: 'Material requisitions and labour', href: '/odoo-guides/odoo-construction-material-requisition-labour/' },
      { label: 'RA bills and job costing', href: '/odoo-guides/odoo-construction-ra-bill-job-costing/' },
    ],
    pdf: { label: 'Construction Management guide (PDF, 104 pages)', href: '/downloads/guides/odoo-construction-management.pdf' },
    shots: [
      shot('/odoo-guides/odoo-construction-management/dashboard.webp', 'Construction dashboard in Odoo with projects, contract value and progress', 'The construction dashboard from the store module.', 1440, 900),
      shot('/software/construction-cloud/executive-dashboard.webp', 'Construction Cloud executive dashboard with portfolio value, certified, cash, retention and an S-curve', 'Construction Cloud: the executive dashboard across every job.', 1400, 875),
    ],
    related: [
      { label: 'Construction Cloud product page', href: '/software/construction-cloud/' },
      { label: 'Odoo for construction (how the build works)', href: '/solutions/construction/' },
    ],
    faqs: [
      { q: 'Which one should I choose?', a: 'If you run Odoo already and have a small site team, start with the base module. If you value, certify and carry retention with a commercial team, take Enterprise. If you do not want to run Odoo at all, ask about Construction Cloud.' },
      { q: 'Do the modules need Odoo Enterprise?', a: 'No. Both modules run on Odoo Community and on Enterprise, for Odoo 19 and Odoo 20.' },
      { q: 'Can you move our open jobs across?', a: 'Yes. Open contracts are taken over at one cut-over date with contract value, approved variations, certified to date, retention held and cost to date.' },
    ],
    solution: 'construction',
  },
];

/** Catalogue suite name to suite page, for the /products/ headings. */
export const SUITE_LINKS: Record<string, string> = Object.fromEntries(
  SUITES.filter(s => s.catalogueSuite).map(s => [s.catalogueSuite as string, `/suites/${s.slug}/`]),
);

/** Solution slug to suite page, for the link block on /solutions/<slug>/. */
export const SOLUTION_SUITE: Record<string, { href: string; name: string }> = Object.fromEntries(
  SUITES.filter(s => s.solution).map(s => [s.solution as string, { href: `/suites/${s.slug}/`, name: s.name }]),
);
