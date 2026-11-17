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
  {
    slug: 'real-estate',
    name: 'Real Estate',
    catalogueSuite: 'Real Estate',
    seoTitle: 'Real Estate Software on Odoo: Portal and Leasing',
    description: 'Five real estate modules for Odoo 19 and 20: property management, Enterprise leasing and maintenance, a property portal website, developer sales with payment plans, and a listings marketplace.',
    h1: 'Real estate software on Odoo: portal, developer sales and property management',
    lede: 'Five modules that build on each other, from a property and lease register to a full property portal website with developer sales and a paid listings marketplace.',
    intro: [
      'Start with Real Estate Management for properties, owners, tenants, leases, rent invoices, viewings, offers and agents. Add Real Estate Management Enterprise for service charges and utilities, late fees, inspections and deposit deductions, vendor work orders, planned maintenance, owner payouts and rent roll, vacancy and aging reports.',
      'For the public side, the Property Portal puts a search-led property website on your Odoo site: search with map and filters, projects, agents, favourites and saved searches, post-your-property and calculators. Developer Sales handles towers, floors and units through booking, allotment, sale agreement and possession with payment plans. The Marketplace adds listing packages, featured ads, verified listings and agent reviews.',
    ],
    modules: [
      { key: 'wt-real-estate', role: 'Properties, owners, tenants, leases, rent invoices, viewings, offers, agents and listing feeds.' },
      { key: 'wt-real-estate-enterprise', role: 'Service charges and utilities, late fees, inspections, maintenance, owner payouts and portfolio reports.' },
      { key: 'wt-real-estate-portal', role: 'The public property website: search, map, projects, agents, saved searches and post-your-property.' },
      { key: 'wt-real-estate-developer', role: 'Towers, floors and units, availability grid, booking to possession, payment plans, transfers and dealer and buyer portals.' },
      { key: 'wt-real-estate-marketplace', role: 'Listing packages, featured and premium ads, verified listings, agent reviews, valuation estimate and map search.' },
    ],
    highlights: [
      { title: 'Pakistan ready', body: 'Marla and kanal area units, prices in lakh and crore, instalment calculators and a location tree of cities, areas and societies.' },
      { title: 'Gulf ready', body: 'Post-dated cheque books with bounce handling, permit numbers on listings, owner statements and lease renewals with escalation.' },
      { title: 'One database', body: 'The website, the agents, the developer sales team and accounts work on the same records, so a booking on the portal is a booking in the back office.' },
      { title: 'Portals for everyone', body: 'Tenants, owners, buyers and dealers each get their own portal pages for invoices, units, statements and documents.' },
    ],
    demos: [
      { label: 'Property portal and developer sales', url: 'https://property-demo.way4tech.com/', note: 'Sample agency Crescent Estates, Pakistan listings.' },
      { label: 'Property management (Enterprise)', url: 'https://realestate-pro.way4tech.com/', note: 'A letting agency in the Gulf.' },
    ],
    guides: [
      { label: 'Odoo real estate management guide', href: '/odoo-guides/odoo-real-estate-management/' },
      { label: 'Lease renewal and rent escalation', href: '/odoo-guides/odoo-lease-renewal-rent-escalation/' },
      { label: 'Owner statements and property maintenance', href: '/odoo-guides/odoo-owner-statements-property-maintenance/' },
    ],
    pdf: { label: 'Real estate guide (PDF, 47 pages)', href: '/downloads/guides/odoo-real-estate-management.pdf' },
    shots: [
      shot('/suites/real-estate/portal-home.webp', 'Property portal home page with natural language search, filters and listing counts', 'The property portal home: type a search in plain words or use the filters.'),
      shot('/suites/real-estate/portal-search.webp', 'Property search results with premium, featured and verified listing badges and a filter panel', 'Search results with grid, list and map views, saved searches and listing badges.'),
    ],
    related: [{ label: 'Odoo for real estate', href: '/solutions/real-estate/' }],
    faqs: [
      { q: 'Do I need all five modules?', a: 'No. A letting agency needs the core and Enterprise. A developer selling off-plan needs the core, the portal and Developer Sales. A listings business needs the core, the portal and the Marketplace.' },
      { q: 'Does it run on Odoo Community?', a: 'Yes, all five run on Odoo 19 and Odoo 20, Community or Enterprise.' },
      { q: 'Can it publish to property portals?', a: 'The core module produces listing feeds in the formats the main Gulf portals read. Each portal still needs your own account with them.' },
    ],
    solution: 'real-estate',
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    catalogueSuite: 'Restaurant',
    seoTitle: 'Restaurant Online Ordering and POS for Odoo',
    description: 'Restaurant suite for Odoo 19 and 20: POS for waiters, kitchen display, delivery riders, call centre, reservations, fiscal compliance, plus a commission-free ordering website on Odoo 20.',
    h1: 'Restaurant suite and online ordering for Odoo',
    lede: 'A complete restaurant system on Odoo POS, and an ordering website on your own Odoo site that sends orders into the same inbox, till and kitchen. No commission per order.',
    intro: [
      'The Restaurant Suite installs every module in one go: waiter tablets and mobile POS, table operations, kitchen display stations, silent printing, menus with modifiers and time-based menus, branch transfers, delivery zones and riders, a call centre console, online orders from your channels, reservations and a waitlist, recipes and stock, loyalty, wallet payments, fiscal compliance and owner reports. Each module is also sold on its own.',
      'Restaurant Website Ordering (Odoo 20) is the customer side: a menu with photos and dietary badges, an item customiser for sizes and extras, a cart, pickup or delivery with delivery zones, tips and tax at checkout, orders scheduled for later, card or cash payment, and a live status page for the customer.',
    ],
    modules: [
      { key: 'w4-resto-suite', role: 'Every restaurant module below in one install, with a setup wizard.' },
      { key: 'w4-resto-website', role: 'Your own ordering website: menu, item options, cart, checkout and live order tracking. Odoo 20.' },
      { key: 'w4-resto-kds', role: 'Kitchen display stations with timers, expo and dark mode.' },
      { key: 'w4-resto-delivery', role: 'Delivery zones, riders, a live board and a rider phone screen.' },
      { key: 'w4-resto-call-center', role: 'Agent console with routing to branches and complaints.' },
      { key: 'w4-resto-online-orders', role: 'Orders from your website, app and aggregators in one inbox.' },
      { key: 'w4-resto-tax-compliance', role: 'Fiscal reporting for FBR, PRA, SRB and ZATCA.' },
      { key: 'w4-resto-reservations', role: 'Table bookings and a waitlist.' },
      { key: 'w4-resto-loyalty', role: 'Points and tiers for regulars.' },
      { key: 'w4-resto-reports', role: 'Owner reports by branch, channel and hour.' },
    ],
    highlights: [
      { title: 'Commission-free ordering', body: 'Customers order on your own site. Each order lands in the Online Orders inbox, becomes a POS order in the branch and raises a kitchen ticket.' },
      { title: 'Delivery zones', body: 'Zones with their own fee, minimum order and ETA, and riders managed from the delivery board in the back office.' },
      { title: 'Multi-branch', body: 'Branch isolation, transfers between branches, a customer branch picker and revenue by branch.' },
      { title: 'Fiscal compliance', body: 'Pakistan FBR, PRA and SRB, and Saudi ZATCA, reported from the order. Registration with the authority is still yours.' },
    ],
    demos: [
      { label: 'Restaurant Suite back office', url: 'https://restro.way4tech.com/', note: 'Two branches, POS, KDS, delivery and reports.' },
      { label: 'Ordering website', url: 'https://restro.way4tech.com/order', note: 'Open to anyone, no login needed.' },
    ],
    guides: [
      { label: 'Odoo restaurant management guide', href: '/odoo-guides/odoo-restaurant-management/' },
      { label: 'Delivery and online orders', href: '/odoo-guides/odoo-restaurant-delivery-online-orders/' },
      { label: 'Kitchen stations and order flow', href: '/odoo-guides/odoo-restaurant-kitchen-stations-order-flow/' },
      { label: 'Reservations and waitlist', href: '/odoo-guides/odoo-restaurant-reservations-waitlist/' },
      { label: 'Recipes and food cost', href: '/odoo-guides/odoo-restaurant-recipe-food-cost/' },
    ],
    pdf: { label: 'Restaurant guide (PDF, 62 pages)', href: '/downloads/guides/odoo-restaurant-management.pdf' },
    shots: [
      shot('/suites/restaurant/ordering-phone.webp', 'Restaurant ordering website on a phone with branch, pickup choice, menu categories, dietary filters and popular items', 'The ordering website on a phone.', 390, 844, true),
      shot('/odoo-guides/odoo-restaurant-delivery-online-orders/delivery-zones.webp', 'Delivery zones in Odoo with fee, minimum order and ETA per zone', 'Delivery zones: fee, minimum order and ETA per area.', 1600, 316),
      shot('/odoo-guides/odoo-restaurant-management/suite-dashboard-menu.webp', 'Restaurant suite dashboard and menu in Odoo', 'The suite dashboard in the back office.', 1600, 1000),
    ],
    related: [{ label: 'Odoo for restaurants', href: '/solutions/restaurant-fnb/' }],
    faqs: [
      { q: 'Is the ordering website available for Odoo 19?', a: 'Restaurant Website Ordering is on the store for Odoo 20. The rest of the suite is on both Odoo 19 and Odoo 20.' },
      { q: 'Do I pay a fee per order?', a: 'No. You buy the modules once and the orders come through your own website and payment provider.' },
      { q: 'Can it take card payments?', a: 'Yes, through any payment provider enabled in Odoo, or cash on delivery.' },
    ],
    solution: 'restaurant-fnb',
  },
  {
    slug: 'retail',
    name: 'Retail',
    catalogueSuite: 'Retail',
    badge: 'Early access',
    seoTitle: 'Retail Online Ordering for Odoo 20',
    description: 'Retail online ordering for Odoo 20, in early access: store picker, live stock per branch, product variants and a cart for click and collect. Checkout is still being built.',
    h1: 'Retail online ordering for Odoo 20 (early access)',
    lede: 'A storefront where the customer picks a branch and sees what that branch has in stock right now. Built on Odoo 20, multi-branch from the start.',
    intro: [
      'Retail Stores Base sets up your branches with their warehouse and opening hours. Retail Website Ordering adds the storefront: a store picker, the catalogue by category with photos and prices, live stock per branch, a picker for size, colour and quantity, and a cart with pickup or delivery.',
      'This is early access. Checkout and posting the order into the branch POS are being built next, so the demo stops at the cart. Talk to us if you want to be one of the first stores on it.',
    ],
    modules: [
      { key: 'w4-retail-base', role: 'Branches with their warehouse and opening hours.' },
      { key: 'w4-retail-website', role: 'Storefront with store picker, live stock per branch, variants and a cart.' },
    ],
    highlights: [
      { title: 'Stock per branch', body: 'The customer sees the stock of the branch they picked, and sold out items cannot be added.' },
      { title: 'Multi-branch', body: 'Each branch has its own warehouse and hours, and the customer can switch branch at any time.' },
      { title: 'Odoo 20', body: 'Built for Odoo 20 from the start.' },
    ],
    demos: [{ label: 'Retail storefront', url: 'https://retail-demo.way4tech.com/shop/order', note: 'Two branches, open to anyone, no login needed.' }],
    guides: [],
    shots: [
      shot('/suites/retail/storefront.webp', 'Retail storefront with a store picker, featured products with photos and a pickup or delivery choice', 'The storefront on a desktop.'),
      shot('/suites/retail/storefront-phone.webp', 'Retail storefront on a phone with the branch, pickup choice and featured products', 'The same storefront on a phone.', 390, 844, true),
    ],
    related: [{ label: 'Odoo for retail stores', href: '/solutions/retail-stores/' }],
    faqs: [
      { q: 'Can customers pay online yet?', a: 'Not yet. Checkout is the next release. Today the storefront shows live stock per branch and builds the cart.' },
      { q: 'Will it run on Odoo 19?', a: 'It is built for Odoo 20 only.' },
    ],
    solution: 'retail-stores',
  },
  {
    slug: 'garage',
    name: 'Garage and Automotive',
    catalogueSuite: 'Garage and Automotive',
    seoTitle: 'Garage Management Software on Odoo',
    description: 'Garage Management for Odoo 19 and 20: job cards from estimate to invoice, vehicle history, inspections, bays and technician time, plus service plans and insurance claims in the Enterprise add-on.',
    h1: 'Garage management software on Odoo',
    lede: 'Run an auto workshop on Odoo: job cards from estimate to invoice, the vehicle and its history, red amber green inspections, bays and technician time, and the money side.',
    intro: [
      'Garage Management covers the workshop: job cards with customer authority, vehicles with VIN and odometer history, inspection sheets that turn advisories into work, flat rate labour against clocked time, parts from stock, roadworthiness tests, service reminders and courtesy cars.',
      'Garage Management Enterprise adds service plans and maintenance contracts, insurance and warranty claims, rate cards, sublet work, commission rules and workshop boards. Both run on Odoo 19 and Odoo 20, Community or Enterprise.',
    ],
    modules: [
      { key: 'w4t-garage-management', role: 'Job cards, vehicles, inspections, labour, parts, reminders and invoicing.' },
      { key: 'w4t-garage-enterprise', role: 'Service plans, insurance and warranty claims, rate cards, sublet work and boards. Needs Garage Management.' },
    ],
    highlights: [
      { title: 'Authority before work', body: 'The customer approves an amount. Work cannot start on a job card worth more than they signed for.' },
      { title: 'Inspections that sell', body: 'Red and amber items carry the operation and its price, and accepted items become labour lines in one click.' },
      { title: 'Labour recovery', body: 'Sold hours against clocked hours per technician, per job and per operation.' },
      { title: 'Claims desk', body: 'Insurance and warranty claims with the insurer share, excess and approvals, in the Enterprise add-on.' },
    ],
    demos: [{ label: 'Garage demo', url: 'https://garage-guide.way4tech.com/', note: 'Sample workshop Falcon Auto Works, base plus Enterprise.' }],
    guides: [
      { label: 'Odoo garage management guide', href: '/odoo-guides/odoo-garage-management/' },
      { label: 'Job card from estimate to approval', href: '/odoo-guides/odoo-garage-job-card-estimate-approval/' },
      { label: 'Vehicle health checks and reminders', href: '/odoo-guides/odoo-vehicle-health-check-service-reminders/' },
      { label: 'Labour recovery and technician efficiency', href: '/odoo-guides/odoo-garage-labour-recovery-technician-efficiency/' },
      { label: 'Service plans and insurance claims', href: '/odoo-guides/odoo-garage-service-plans-insurance-claims/' },
    ],
    pdf: { label: 'Garage Management complete user guide (PDF, 346 pages)', href: '/downloads/guides/odoo-garage-management.pdf' },
    shots: [
      shot('/odoo-guides/odoo-garage-management/job-card-form.webp', 'Garage job card with customer, vehicle, bay, technician, progress and the estimate email', 'A job card in progress, with the estimate the customer approved.', 1280, 800),
    ],
    related: [{ label: 'Odoo for automotive workshops', href: '/solutions/automotive-workshop/' }],
    faqs: [
      { q: 'Is the Odoo Repairs app enough for a garage?', a: 'For a small shop repairing products it can be. It has no vehicle record with odometer history, no inspection sheet, no bays and no technician time against flat rate hours.' },
      { q: 'What does the complete guide cover?', a: 'All of it, by role: service advisor, workshop manager, technician, parts, accounts, owner and claims desk, then every menu and setting.' },
    ],
    solution: 'automotive-workshop',
  },
  {
    slug: 'labour-camp',
    name: 'Labour Camp',
    catalogueSuite: 'Labour Camp',
    seoTitle: 'Labour Camp Management Software for Odoo',
    description: 'Labour camp management for Odoo 19 and 20: rooms and beds, allocation, visa and ID expiry, permits, inspections, complaints, mess and buses, and monthly contractor billing.',
    h1: 'Labour camp management software',
    lede: 'Worker accommodation run bed by bed: who sleeps where, whose papers expire next, which contractor owes what this month. Built for camps in the UAE, Saudi Arabia and Qatar.',
    intro: [
      'Labour Camp Management keeps camps, blocks, rooms and beds, and allocates workers to beds with check-in and check-out. It watches visa, ID and permit expiry, records inspections, complaints, incidents and gate entries, and tracks meals, bus runs and utilities.',
      'At month end it works out what each contractor owes for its men from the agreement rates and raises the invoices. It runs on Odoo 19 and Odoo 20.',
    ],
    modules: [{ key: 'wt-labour-camp', role: 'Camps, rooms and beds, allocation, papers, inspections, complaints, mess, buses and contractor billing.' }],
    highlights: [
      { title: 'Bed by bed', body: 'Occupancy per camp, room and bed, with reservations and rooms under maintenance kept out of allocation.' },
      { title: 'Papers falling due', body: 'Visa, ID and permit expiry dates in one list, so nobody is found expired at the gate.' },
      { title: 'Contractor billing', body: 'Monthly charges per contractor from the agreement, ready to invoice.' },
    ],
    demos: [{ label: 'Labour camp demo', url: 'https://labourcamp-demo.way4tech.com/', note: 'Two camps, 171 beds, sample company Desert Star Accommodation.' }],
    guides: [
      { label: 'Odoo labour camp management guide', href: '/odoo-guides/odoo-labour-camp-management/' },
      { label: 'Bed allocation', href: '/odoo-guides/odoo-labour-camp-bed-allocation/' },
      { label: 'Contractor billing', href: '/odoo-guides/odoo-labour-camp-contractor-billing/' },
      { label: 'Inspections and complaints', href: '/odoo-guides/odoo-labour-camp-inspections-complaints/' },
    ],
    pdf: { label: 'Labour camp guide (PDF, 46 pages)', href: '/downloads/guides/odoo-labour-camp-management.pdf' },
    shots: [
      shot('/odoo-guides/odoo-labour-camp-management/camp-board.webp', 'Labour camp board with occupancy by camp and room', 'The camp board.', 1440, 900),
    ],
    faqs: [
      { q: 'Does it handle more than one camp?', a: 'Yes. Each camp has its own blocks, rooms and beds, and the board shows occupancy across all of them.' },
      { q: 'Can contractors be billed for their workers?', a: 'Yes. The agreement sets the rate per bed or per head, and the monthly charges are worked out from who actually stayed.' },
    ],
  },
  {
    slug: 'auto-parts',
    name: 'Auto Parts Wholesale',
    seoTitle: 'Auto Parts Dealer Portal for Odoo',
    description: 'Auto parts wholesale on Odoo: a trade-only dealer portal with vehicle fitment search, OEM and cross-reference part numbers, dealer pricing, pack quantities and one-click reorder.',
    h1: 'Auto parts wholesale and dealer portal for Odoo',
    lede: 'A trade-only shop for parts wholesalers: approved dealers log in, find parts by vehicle or part number, see their own prices and reorder in a click.',
    intro: [
      'The public sees a dealer landing page and no prices. Approved dealers reach the shop, filter by make and model, search by OEM or cross-reference number, and buy at their own price list, in pack quantities with a minimum order.',
      'A "what is moving" wall shows hot products from recent sales. The module is built on Odoo eCommerce and is not on the Odoo Apps Store yet; ask us for it.',
    ],
    modules: [],
    offer: { name: 'Auto Parts Wholesale and Dealer Portal', note: 'Odoo 19. Not on the Apps Store yet: price and installation on request.' },
    highlights: [
      { title: 'Trade only', body: 'Only approved dealers and staff see prices and reach the shop.' },
      { title: 'Vehicle fitment', body: 'Find parts by make and model, with fitment held on each product.' },
      { title: 'Part number search', body: 'Search by OEM number and by cross-reference numbers from other brands.' },
      { title: 'Dealer pricing and packs', body: 'A price list per dealer tier, pack quantities and minimum order, rounded up on the order.' },
    ],
    demos: [{ label: 'Auto parts dealer portal', url: 'https://autoparts-demo.way4tech.com/', note: 'Sample wholesaler with a dealer login on the demos page.' }],
    guides: [
      { label: 'Odoo auto parts wholesale guide', href: '/odoo-guides/odoo-auto-parts-wholesale/' },
      { label: 'Fitment and OEM search', href: '/odoo-guides/odoo-auto-parts-fitment-oem-search/' },
    ],
    pdf: { label: 'Auto parts wholesale guide (PDF, 19 pages)', href: '/downloads/guides/odoo-auto-parts-wholesale.pdf' },
    shots: [
      shot('/odoo-guides/odoo-auto-parts-wholesale/trade-shop.webp', 'Trade shop for approved dealers with vehicle fitment search and part cards', 'The trade shop an approved dealer sees.', 1440, 900),
    ],
    faqs: [
      { q: 'Can the public see our prices?', a: 'No. Visitors see the dealer landing page. Prices and the shop open only for approved dealers and staff.' },
      { q: 'Is it on the Odoo Apps Store?', a: 'Not yet. Ask us and we will install it on your Odoo 19 database.' },
    ],
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
