/* ─────────────────────────────────────────────────────────────
 * INDUSTRY DETAIL (8): keyed by INDUSTRIES[].slug in site.ts
 *
 * POSITIONING NOTE (read before editing):
 * Every INDUSTRIES slug also exists as a SOLUTIONS slug, so
 * /industries/<slug>/ and /solutions/<slug>/ would compete for the
 * same queries unless they answer different questions.
 *
 *   /solutions/<slug>/   = WHAT Odoo does for this sector.
 *                          Feature checklist. Product answer.
 *   /industries/<slug>/  = HOW a business in this sector actually
 *                          gets Odoo running. Operational failure
 *                          modes, the module map and the reason for
 *                          each module, rollout sequence, what to
 *                          prepare before kickoff. Buyer answer.
 *
 * Rule: industry pages must NEVER restate the solution feature list.
 * They link to it via `solutionSlug`. Keep it that way.
 *
 * COMPLIANCE GAP (deliberate, do not fill by guessing):
 * No tax rate, VAT percentage, e-invoicing mandate, threshold,
 * deadline, scheme name or government portal is stated anywhere in
 * this file. Country-specific requirements are deferred to
 * /services/odoo-localization/ and /services/odoo-e-invoicing/.
 * If a sector genuinely needs a named requirement on the page, get
 * it confirmed by a human before adding it here.
 * ───────────────────────────────────────────────────────────── */

export type IndustryPain = { title: string; body: string };
export type IndustryModule = { slug: string; why: string };
export type IndustryPhase = { phase: string; body: string };
export type IndustryFaq = { q: string; a: string };

export type IndustryDetail = {
  /** Page H1. Deliberately different from the solution page H1 pattern ("Odoo for X"). */
  h1: string;
  /** Lower-case sector noun used mid-sentence. Written out because
      lower-casing the title mangles acronyms such as POS and F&B. */
  noun: string;
  /** <title>. Targets implementation intent, not feature intent. */
  metaTitle: string;
  metaDescription: string;
  /** Card blurb on /industries/. Written here so the index does not reuse solution taglines. */
  summary: string;
  /** Opening paragraph. Operational framing, no feature pitch. */
  intro: string;
  /** What actually goes wrong in this sector before ERP. */
  pains: IndustryPain[];
  /** MODULES slugs from site.ts plus the reason this sector needs each one. */
  modules: IndustryModule[];
  /** The rollout sequence a buyer should expect. */
  rollout: IndustryPhase[];
  /** What the client has to have ready. This is the pre-sales conversation. */
  prepare: string[];
  /** Plain-text integration names, all present in INTEGRATIONS in site.ts. */
  integrations: string[];
  /** SERVICES slugs from site.ts. */
  services: string[];
  /** The matching SOLUTIONS slug. The feature detail lives there, not here. */
  solutionSlug: string;
  /** One line telling the reader why to click through to the solution page. */
  solutionNote: string;
  /** Extra SOLUTIONS slugs worth reading next. */
  alsoSee?: string[];
  /** PRODUCTS slugs from site.ts. */
  products?: string[];
  /** CASE_STUDIES slugs from site.ts. Only where a real match exists. */
  caseStudies?: string[];
  faqs: IndustryFaq[];
};

export const INDUSTRY_DETAIL: Record<string, IndustryDetail> = {
  /* ───────────── RETAIL & POS ───────────── */
  'retail-stores': {
    h1: 'Odoo rollouts for retail chains',
    noun: 'retail',
    metaTitle: 'Odoo for Retail: rollout plan, modules, and what to prepare',
    metaDescription:
      'How a multi-store retail chain actually rolls out Odoo: the operational problems it fixes, which modules matter, the store-by-store sequence, and what to prepare before kickoff.',
    summary:
      'Multi-store chains, cash offices and online. How the rollout is sequenced store by store, and what has to be true about your stock data first.',
    intro:
      'Retail chains rarely stall on features. They stall on the gap between what the till reports and what the stockroom holds, and on a month-end that waits for store managers to email cash sheets. An Odoo rollout in retail is mostly a data and sequencing exercise: get one store right, make stock trustworthy, then repeat.',
    pains: [
      {
        title: 'Stock numbers nobody trusts',
        body: 'Counts happen quarterly, shrinkage surfaces at the annual audit, and buyers reorder against figures they already know are wrong. Every downstream decision inherits the error.',
      },
      {
        title: 'Promotions run per store',
        body: 'Each branch keeps its own spreadsheet of offers and staff discounts. Margin per product cannot be compared across the chain because no two stores price the same way.',
      },
      {
        title: 'The till is cut off from the back office',
        body: 'Sales export overnight, returns and exchanges get keyed twice, and cash variance is argued rather than traced to a session and a cashier.',
      },
      {
        title: 'Online and in-store are two businesses',
        body: 'Two catalogues, two stock pools, two price lists. Click-and-collect breaks both, so it never launches properly.',
      },
      {
        title: 'Close takes as long as the month',
        body: 'Finance rebuilds store performance by hand. By the time the numbers land, the trading decision they were meant to inform has already been made.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'The till itself: sessions, cashiers, cash control, and offline operation so a dropped line does not stop trade.' },
      { slug: 'inventory', why: 'One stock pool per store with barcodes, transfers and reorder rules, so buying stops being guesswork.' },
      { slug: 'purchase', why: 'Supplier ordering against real reorder points, with cost changes visible before they hit the shelf price.' },
      { slug: 'accounting', why: 'Cash sessions, card settlement and stock valuation post automatically instead of arriving as a spreadsheet.' },
      { slug: 'ecommerce', why: 'The online shop reads the same catalogue and the same stock as the stores, which is what makes collect-in-store work.' },
      { slug: 'marketing-automation', why: 'Loyalty and win-back campaigns driven by what customers actually bought, not by a separate mailing list.' },
    ],
    rollout: [
      { phase: 'Reference store', body: 'One branch is configured end to end: products, prices, hardware, cashier flow, opening and closing. Everything later is a copy of this, so it is worth over-investing here.' },
      { phase: 'Make stock true', body: 'Barcodes, opening counts, transfer rules and reorder points. Stock accuracy is the gate for every other phase, and skipping it is the single most common reason a retail rollout drags.' },
      { phase: 'Chain rollout', body: 'Stores go live in batches on a fixed weekly cadence: hardware in, count done, staff trained, session opened. Batches beat a big-bang weekend.' },
      { phase: 'Finance and online', body: 'Bank feeds, the close cycle and store reporting first. The online shop comes last, on the stock pool that is already trustworthy.' },
    ],
    prepare: [
      'A clean product master: one row per sellable variant, with barcode and supplier code.',
      'A decision on who owns pricing: head office, region, or the store manager.',
      'A hardware list per till: printer, scanner, cash drawer, and how each one connects.',
      'Counting weekends booked, store by store, before the cutover date is announced.',
      'The promotions actually running today, not the ones on the marketing plan.',
      'Named cashier supervisors per store who will own the till after go-live.',
    ],
    integrations: ['Shopify', 'WooCommerce', 'Magento / Adobe Commerce', 'Amazon Seller', 'Stripe', 'WhatsApp Business', 'Power BI'],
    services: ['odoo-pos-deployment', 'odoo-implementation', 'odoo-ecommerce', 'odoo-support'],
    solutionSlug: 'retail-stores',
    solutionNote: 'For the feature-by-feature view of retail POS, loyalty and multi-store, read the solution page.',
    alsoSee: ['supermarket', 'distribution-fmcg'],
    products: ['odoo-barcode-scanner', 'wt-pos-dashboard', 'wt-inventory-dashboard'],
    caseStudies: ['uk-retail', 'pk-distributor'],
    faqs: [
      {
        q: 'Can Odoo POS run in stores with unreliable internet?',
        a: 'Yes. Odoo POS is offline-first: a session keeps selling while the connection is down and syncs when it returns. We deliberately test the offline path during the pilot store rather than discovering it on a busy Saturday.',
      },
      {
        q: 'Do all our stores have to go live at the same time?',
        a: 'No, and they should not. One reference store is configured and traded for a few weeks, then the rest go in batches. A batched rollout costs slightly more calendar time and dramatically less risk.',
      },
      {
        q: 'Can head office set prices while stores keep some local control?',
        a: 'Yes. Pricelists can be layered by chain, region and store, with discount limits by user role, so a store manager can act within a boundary you set rather than inventing offers in a spreadsheet.',
      },
      {
        q: 'We already have a Shopify or WooCommerce shop. Do we have to replace it?',
        a: 'No. We either keep the existing storefront and sync products, stock and orders both ways, or move the shop onto Odoo eCommerce if you want one system. The deciding factor is usually how much custom front-end work is already invested in the current shop.',
      },
      {
        q: 'How long does a multi-store rollout take?',
        a: 'Typical multi-module retail projects run in the 8 to 12 week band for the pilot store and core finance, with additional stores added in batches after that. Chains with dirty product data spend most of the extra time on the product master, not on the software.',
      },
    ],
  },

  /* ───────────── RESTAURANT & F&B ───────────── */
  'restaurant-fnb': {
    h1: 'Odoo rollouts for restaurant and F&B groups',
    noun: 'restaurant and F&B',
    metaTitle: 'Odoo for Restaurants: rollout plan, modules, and food cost control',
    metaDescription:
      'What an Odoo rollout looks like for a restaurant or F&B group: recipe costing, kitchen flow, outlet stock, the modules involved, and the sequence that keeps service running.',
    summary:
      'Single sites and multi-outlet groups. Recipe costing, outlet stock, kitchen flow, and how to go live without disrupting service.',
    intro:
      'Restaurants buy a POS and get a till. What they usually needed was the number underneath it: what each dish costs to make this week, and which outlet is losing money on which item. An Odoo rollout in F&B works front of house first, then back of house costing, because the recipe data is where the value and the effort both sit.',
    pains: [
      {
        title: 'Dish cost is a guess',
        body: 'Menu prices are set on instinct and food cost percentage is worked out monthly from total purchases. A loss-making dish can run for a full quarter before anyone notices.',
      },
      {
        title: 'The kitchen has no timing data',
        body: 'Tickets are paper or shouted. Nobody can say which station is the bottleneck at eight in the evening, so the fix is always more staff rather than a different flow.',
      },
      {
        title: 'Every delivery channel has its own tablet',
        body: 'Separate menus, separate commission rates, separate reports, all reconciled by hand at the end of the month against a bank line that does not break down.',
      },
      {
        title: 'Outlet stock exists only as a weekly count',
        body: 'Waste, staff meals and over-portioning are invisible. The variance is real but there is nothing to attribute it to.',
      },
      {
        title: 'Outlets cannot be compared',
        body: 'Covers, average ticket and labour cost per outlet are each defined slightly differently, so group-level comparison turns into an argument about definitions.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'Table plan, order flow, split bills and kitchen display, with offline operation so service never depends on the router.' },
      { slug: 'inventory', why: 'Outlet-level stock that depletes as dishes are sold, which is what turns waste from a feeling into a number.' },
      { slug: 'manufacturing', why: 'Recipes as bills of material for prep items and central kitchen production, so a sub-recipe is costed once and reused.' },
      { slug: 'purchase', why: 'Supplier ordering against par levels, with price movement visible per ingredient before it quietly eats the margin.' },
      { slug: 'accounting', why: 'Daily takings, supplier bills and stock movements land in the ledger without a spreadsheet in the middle.' },
      { slug: 'attendance', why: 'Shift-level labour cost against covers, which is the other half of the profitability picture most groups never see.' },
    ],
    rollout: [
      { phase: 'Front of house pilot', body: 'One outlet: menu, modifiers, table plan, kitchen display, payment methods and closing procedure. Trained on a quiet shift, traded live on a busy one before anything else starts.' },
      { phase: 'Back of house costing', body: 'Recipes, yields, portion sizes and prep items. This is the phase that pays for the project and the phase clients consistently underestimate.' },
      { phase: 'Group rollout and labour', body: 'Remaining outlets copy the pilot configuration. Rosters and attendance come in here so labour cost per shift can be reported next to sales.' },
      { phase: 'Channels and reporting', body: 'Delivery channels, promotions and group reporting once the base numbers are trusted. Reporting on unreliable recipe data is worse than no reporting.' },
    ],
    prepare: [
      'The current menu with recipes and portion yields, even if they are rough. Rough and written down beats exact and remembered.',
      'A supplier price list per ingredient with pack sizes and units.',
      'The table plan and service zones as the floor actually uses them.',
      'Till, printer and kitchen screen hardware confirmed per outlet.',
      'A written rule for who can void, discount or comp, and up to what value.',
      'Opening stock counts for the pilot outlet on the night before cutover.',
    ],
    integrations: ['Stripe', 'HyperPay', 'PayTabs', 'Mada', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-pos-deployment', 'odoo-implementation', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'restaurant-fnb',
    solutionNote: 'For the feature view of table POS, kitchen display and menu engineering, read the solution page.',
    alsoSee: ['hotel-hospitality', 'supermarket'],
    products: ['wt-odoo-pos-delivery', 'wt-pos-dashboard'],
    faqs: [
      {
        q: 'Can Odoo cost our recipes properly, including prep items?',
        a: 'Yes. Prep items such as sauces and marinades are modelled as their own recipes and consumed by the dishes that use them, so a change in one ingredient price flows through to every dish that touches it.',
      },
      {
        q: 'Can we connect delivery aggregator platforms?',
        a: 'It depends on the platform. Where an aggregator publishes an ordering API we build the connector so orders land in the POS and the menu stays in one place. Where it does not, orders are entered at the till and we reconcile the payout separately. We confirm which case applies before scoping, not after.',
      },
      {
        q: 'Will the kitchen keep working if the internet drops mid-service?',
        a: 'The POS keeps taking orders offline and syncs afterwards. We test this during the pilot with the network deliberately pulled, because a mid-service failure is the one thing a restaurant will not forgive.',
      },
      {
        q: 'We run a central kitchen supplying several outlets. Does that fit?',
        a: 'Yes. The central kitchen is treated as a production site with its own stock, producing to outlet demand and issuing internal transfers, so outlet cost of sales reflects what was actually delivered.',
      },
      {
        q: 'How disruptive is go-live for a running restaurant?',
        a: 'Go-live is scheduled around a service break, usually after close, with the previous system available as a fallback for the first days. Staff training happens on the real menu in a test session before the switch, not on go-live morning.',
      },
    ],
  },

  /* ───────────── HEALTHCARE ───────────── */
  'hospital-management': {
    h1: 'Odoo rollouts for hospitals and healthcare groups',
    noun: 'healthcare',
    metaTitle: 'Odoo for Healthcare: rollout plan, modules, and data preparation',
    metaDescription:
      'How hospitals, clinic groups and pharmacies plan an Odoo rollout: patient identity, pharmacy stock, payer billing, the modules involved, and the phased sequence that protects clinical operations.',
    summary:
      'Hospitals, clinic groups and pharmacies. Patient identity, pharmacy stock, payer billing, and a phased sequence that keeps clinical work running.',
    intro:
      'Healthcare rollouts fail on identity and on stock, not on screens. If the same patient exists three times, every clinical and financial report downstream is wrong. If pharmacy and ward stock are counted separately, expiry gets caught at the shelf instead of at the reorder. Both are fixed before anything clinical is switched over.',
    pains: [
      {
        title: 'The same patient exists several times',
        body: 'Reception, lab and pharmacy each create records. The history is split across duplicates, so the clinician sees part of the picture and the finance report double counts.',
      },
      {
        title: 'Claims are built after the fact',
        body: 'Billing is assembled from paper notes after discharge. Rejections come back weeks later with nothing linking them to the encounter that caused them, so the same mistake repeats.',
      },
      {
        title: 'Pharmacy and ward stock are separate worlds',
        body: 'Batches and expiry are tracked in the pharmacy but not on the ward. Expired stock is discovered on the shelf rather than flagged at reorder.',
      },
      {
        title: 'Three calendars, one hospital',
        body: 'Doctor rosters, theatre slots and bed availability live in different places. Scheduling conflicts are resolved by phone call.',
      },
      {
        title: 'Consumables leak revenue',
        body: 'Items used in a procedure are not always billed, and with paper records nobody can prove it either way. The loss is real and permanently invisible.',
      },
    ],
    modules: [
      { slug: 'inventory', why: 'Batch, lot and expiry tracking across pharmacy, ward and stores, with reorder rules that see expiry before the shelf does.' },
      { slug: 'purchase', why: 'Supplier ordering and three-way match on high-value consumables, which is where healthcare procurement leaks most.' },
      { slug: 'accounting', why: 'Encounter-level billing posting to the ledger, so patient balances and payer receivables are one set of numbers.' },
      { slug: 'hr', why: 'Clinician records, contracts, credentials and department structure, which is also what drives roster and duty reporting.' },
      { slug: 'attendance', why: 'Duty rosters and shift coverage for nursing and support staff, including biometric capture where devices already exist.' },
      { slug: 'documents', why: 'Consents, referrals and scanned records held against the patient rather than in a shared drive nobody audits.' },
      { slug: 'sign', why: 'Consent and admission paperwork signed electronically with an audit trail, which removes a large paper handling cost.' },
    ],
    rollout: [
      { phase: 'Identity and encounter spine', body: 'Patient master, de-duplication rules, departments, and the encounter record everything else attaches to. Nothing clinical moves until this is stable.' },
      { phase: 'Pharmacy and stores', body: 'Formulary, pack sizes, batch and expiry, ward issue and return. Pharmacy is usually the fastest visible win and it proves the data model.' },
      { phase: 'Billing and payers', body: 'Service catalogue, payer contracts, claim preparation and receivables. Built after the encounter spine exists, so claims reference real encounters.' },
      { phase: 'Clinical add-ons and interfaces', body: 'Scheduling, department-specific workflows and interfaces to lab and imaging systems. Sequenced last because each one depends on identity being clean.' },
    ],
    prepare: [
      'A written de-duplication rule for the patient master: what makes two records the same person.',
      'The service and procedure catalogue with current prices, agreed by finance rather than assumed.',
      'The payer list with contract terms and the fields each payer expects on a claim.',
      'The drug formulary with pack sizes, units of issue and current stock by batch.',
      'Ward, department and bed structure as it operates today, not as the org chart draws it.',
      'A named person who signs off a bill and a named person who signs off the formulary.',
    ],
    integrations: ['HL7/FHIR interfaces to lab and imaging systems', 'WhatsApp Business', 'ZKTeco Biometric', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-localization', 'odoo-support'],
    solutionSlug: 'hospital-management',
    solutionNote: 'For the feature view of HMIS, OPD and IPD, pharmacy, lab and insurance claims, read the solution page.',
    alsoSee: ['clinic-management', 'pharmacy', 'dental-clinic'],
    products: ['wt-hrms-core', 'wt-hrms-attendance'],
    caseStudies: ['uae-hospital', 'ksa-pharmacy-chain'],
    faqs: [
      {
        q: 'Does this cover clinics and pharmacies, or only hospitals?',
        a: 'All three, with different scopes. A single clinic needs appointments, prescriptions and billing. A retail pharmacy needs batch, expiry and prescription-linked selling. A hospital needs both plus wards, theatres and payers. The solution pages for clinics, pharmacy and dental cover the feature detail for each.',
      },
      {
        q: 'Can Odoo exchange data with our existing lab and imaging systems?',
        a: 'Yes, through HL7 and FHIR interfaces. The practical constraint is usually what the other vendor exposes and on what terms, so we confirm the interface specification during discovery before it becomes a delivery commitment.',
      },
      {
        q: 'How do you handle tax and e-invoicing requirements for our country?',
        a: 'Country requirements are scoped as a separate localization workstream rather than assumed, because they differ by country and change over time. See the localization and e-invoicing service pages, and we confirm the specifics for your jurisdiction in writing during discovery.',
      },
      {
        q: 'Should a hospital run Odoo Community or Enterprise?',
        a: 'Both are viable. We recommend Community for cost-sensitive teams with technical maturity, and Enterprise for teams that want Studio, IoT and full vendor support. For hospitals the deciding factor is usually the number of interfaces and the internal IT capacity to maintain them.',
      },
      {
        q: 'Can we go live department by department?',
        a: 'Yes, and we usually do. Pharmacy and stores first, then outpatient billing, then inpatient. A single big-bang cutover in a working hospital carries clinical risk that phasing removes for very little extra cost.',
      },
    ],
  },

  /* ───────────── EDUCATION ───────────── */
  'school-management': {
    h1: 'Odoo rollouts for schools and education groups',
    noun: 'education',
    metaTitle: 'Odoo for Education: rollout plan, modules, and fee data preparation',
    metaDescription:
      'How schools and education groups roll out Odoo: fee collection and arrears, student and staff records, the modules involved, and why the academic calendar decides the go-live date.',
    summary:
      'Schools, institutes and campuses. Fee collection, arrears that reconcile, staff payroll, and why the academic calendar sets the go-live date.',
    intro:
      'A school does not buy ERP for the software. It buys it because arrears are tracked in a spreadsheet per class and the total never agrees with the ledger. The rollout is therefore built around the fee cycle, and the go-live date is decided by the academic calendar rather than by the project plan.',
    pains: [
      {
        title: 'Arrears never reconcile',
        body: 'Fee collection is tracked class by class in spreadsheets and rebuilt by hand each month. The arrears report and the accounts never quite agree, and reconciling them is somebody’s permanent part-time job.',
      },
      {
        title: 'No shared student identity',
        body: 'Admissions, attendance and examinations sit in different tools with no common student ID, so a single view of a child requires three logins and manual matching.',
      },
      {
        title: 'Transport changes never reach billing',
        body: 'Routes are managed by the transport supervisor alone. A student changes stop or drops the service and the fee keeps billing, or stops billing, with nobody the wiser.',
      },
      {
        title: 'Payroll drifts from HR',
        body: 'Contract changes, increments and leave are recorded in HR but applied to payroll late, so corrections are handled as ad hoc adjustments that are hard to audit.',
      },
      {
        title: 'The office is the information desk',
        body: 'Parents phone to ask for balances, receipts and results the school already holds. Front-office time is consumed answering questions a portal would answer.',
      },
    ],
    modules: [
      { slug: 'accounting', why: 'Fee invoicing, receipts, part payments and arrears ageing in the ledger itself, which is what makes the arrears report defensible.' },
      { slug: 'sales', why: 'Fee heads, sibling and scholarship discounts and term billing modelled as pricelists, so the rules are configured rather than remembered.' },
      { slug: 'hr', why: 'Teaching and support staff records, contracts and departments as the single source for both roster and payroll.' },
      { slug: 'payroll', why: 'Versioned salary rules so a mid-term change is applied on a date and traceable afterwards, not patched as an adjustment line.' },
      { slug: 'attendance', why: 'Staff attendance and leave coverage, and where devices exist, biometric capture rather than a signing sheet.' },
      { slug: 'website', why: 'Admission enquiries landing directly as records, plus the parent-facing pages that take routine questions off the front desk.' },
      { slug: 'documents', why: 'Certificates, admission files and staff documents held against the record with retention rules.' },
    ],
    rollout: [
      { phase: 'Student and fee spine', body: 'Student master with class, section and guardian contacts, then fee heads and discount rules. The fee structure has to be written down before it can be configured.' },
      { phase: 'Collections and ledger', body: 'Opening arrears loaded as at a stated cutover date, then invoicing, receipts and reconciliation. Arrears cutover is the single most sensitive step in an education rollout.' },
      { phase: 'Staff, HR and payroll', body: 'Contracts, salary rules and leave. Run in parallel with the old payroll for one cycle before the old one is retired.' },
      { phase: 'Portal and transport', body: 'Parent-facing access, online payment and transport routes and fees once the core figures are trusted.' },
    ],
    prepare: [
      'A student master with class, section and guardian contact details, deduplicated before it is loaded.',
      'Fee heads, instalment plan and every discount rule written down, including the informal ones.',
      'Opening arrears per student as at a single stated cutover date, signed off by the accountant.',
      'The staff contract list with current salary components.',
      'The academic calendar, so the cutover lands at a term boundary rather than mid-cycle.',
      'A named owner for transport routes who will maintain them after go-live.',
    ],
    integrations: ['Stripe', 'Razorpay', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'ZKTeco Biometric', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-payroll-setup', 'odoo-training'],
    solutionSlug: 'school-management',
    solutionNote: 'For the feature view of students, fees, examinations and transport, read the solution page.',
    alsoSee: ['university-college'],
    products: ['wt-school-management', 'wt-hrms-core'],
    faqs: [
      {
        q: 'When in the academic year should we go live?',
        a: 'At a term or fee-cycle boundary. Loading opening arrears mid-cycle means reconciling part-paid instalments across two systems, which doubles the effort and the risk of disputes with parents.',
      },
      {
        q: 'Can it handle sibling discounts, scholarships and staff concessions?',
        a: 'Yes, as configured rules rather than manual edits on each invoice. The work is not the configuration, it is getting the school to write down the rules it currently applies by judgement.',
      },
      {
        q: 'Can parents pay online?',
        a: 'Yes, through the payment gateways we already integrate, including Stripe, Razorpay, PayTabs and HyperPay. Which one fits depends on your country and your bank, and we confirm that before scoping.',
      },
      {
        q: 'Does this work for a university or only for schools?',
        a: 'Both, with different scopes. Universities add programmes, credit structures and semester registration, which are covered on the university and college solution page.',
      },
      {
        q: 'What happens to our historic fee records?',
        a: 'We normally load opening balances plus a defined window of transaction history, and keep the old system available read-only for anything older. Migrating years of detailed history costs more than it usually returns.',
      },
    ],
  },

  /* ───────────── MANUFACTURING ───────────── */
  'manufacturing-industry': {
    h1: 'Odoo rollouts for manufacturers',
    noun: 'manufacturing',
    metaTitle: 'Odoo for Manufacturing: rollout plan, modules, and BOM preparation',
    metaDescription:
      'What an Odoo MRP rollout involves for a manufacturer: bills of material and routings, shop floor execution, costing, the modules involved, and the sequence that avoids stopping production.',
    summary:
      'Discrete and process plants. Bills of material that match the line, shop floor execution, real cost per unit, and a sequence that does not stop production.',
    intro:
      'Manufacturing rollouts are decided by data quality, not by module choice. If the bill of material in the system does not match what the line actually builds, every plan, every cost and every stock figure derived from it is wrong. So the work starts with one product family, verified against the shop floor, and expands from there.',
    pains: [
      {
        title: 'BOMs drift from reality',
        body: 'Bills of material live in engineering spreadsheets while the line has quietly substituted components for months. Planning against the documented BOM produces shortages nobody predicted.',
      },
      {
        title: 'Planning happens in a weekly meeting',
        body: 'A missing component is discovered on the line rather than in the plan. Rescheduling is manual, and the cost of the disruption is never captured.',
      },
      {
        title: 'Work in progress has no value',
        body: 'Cost per finished unit is reconstructed after the fact and rarely matches the price that was quoted. Loss-making product lines survive because nobody can prove they are loss-making.',
      },
      {
        title: 'Scrap and rework are opinions',
        body: 'Both are recorded on paper if at all, so yield per work centre cannot be compared and the worst station is identified by reputation rather than data.',
      },
      {
        title: 'Maintenance is purely reactive',
        body: 'A machine stops, the job list is reshuffled by hand, and parts are bought at short notice at the worst price available.',
      },
    ],
    modules: [
      { slug: 'manufacturing', why: 'Multi-level bills of material, routings and work orders, plus the planning run that turns demand into procurement and production.' },
      { slug: 'inventory', why: 'Component stock with lots and serials, which is what makes traceability from finished unit back to supplier batch possible at all.' },
      { slug: 'purchase', why: 'Procurement driven by the planning run rather than by a buyer reacting to a shortage on the line.' },
      { slug: 'quality', why: 'Control points at receipt, in process and at delivery, so non-conformance is a record with a cost rather than a conversation.' },
      { slug: 'maintenance', why: 'Preventive schedules and meter-based triggers on the same equipment the routings depend on, so downtime is planned around production.' },
      { slug: 'accounting', why: 'Standard or average costing with variance visible per order, which is the number that tells you whether the quote was right.' },
    ],
    rollout: [
      { phase: 'One product family', body: 'Item master, units of measure, bill of material and routing for a single family, verified line-side with the operators who build it. This is a walk of the floor, not a workshop.' },
      { phase: 'Stock and procurement truth', body: 'Opening stock, work in progress, reorder logic and supplier lead times. Planning output is only as good as the lead times behind it.' },
      { phase: 'Shop floor execution and quality', body: 'Work orders at the station, scrap and rework capture, quality checks. Operators are trained on the real product before this goes live.' },
      { phase: 'Costing, maintenance and scale-up', body: 'Cost variance reporting, preventive maintenance, then the remaining product families copied from the proven pattern.' },
    ],
    prepare: [
      'An item master with units of measure decided: purchase unit, stock unit and sales unit, per item.',
      'The bill of material for the lead product family, checked against what the line actually consumes.',
      'A work centre list with capacity and an hourly cost rate finance will stand behind.',
      'Routing steps described the way operators describe them, not the way the process document does.',
      'Opening stock and work in progress valued at a stated cutover date.',
      'A scrap reason list, because reporting yield without reasons is not actionable.',
    ],
    integrations: ['SAP', 'QuickBooks', 'ZKTeco Biometric', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-consultancy', 'odoo-customization', 'odoo-integration'],
    solutionSlug: 'manufacturing-industry',
    solutionNote: 'For the feature view of MRP, shop floor, quality and traceability, read the solution page.',
    alsoSee: ['distribution-fmcg', 'automotive-workshop'],
    products: ['wt-inventory-dashboard', 'wt-purchase-dashboard', 'odoo-barcode-scanner'],
    faqs: [
      {
        q: 'Does Odoo suit process manufacturing as well as discrete?',
        a: 'Both, with different modelling. Discrete work uses multi-level bills of material and serials. Process work leans on batch sizes, yields and by-products. The modelling decision is made in discovery because retrofitting it later is expensive.',
      },
      {
        q: 'Do we need Odoo Enterprise for manufacturing?',
        a: 'Not always. Community covers core MRP for many plants. Enterprise adds Studio, IoT and MRP II capability that matters most when you have shop floor terminals, connected equipment or complex planning. We size this against the licence cost rather than defaulting to Enterprise.',
      },
      {
        q: 'How do operators use the system if there are no PCs on the floor?',
        a: 'Shop floor terminals, tablets or barcode scanners at the work centre. The interaction is deliberately small: start, pause, finish, record quantity and scrap. Anything more elaborate does not survive contact with a production shift.',
      },
      {
        q: 'Can we handle subcontracted operations?',
        a: 'Yes. Components issued to a subcontractor stay visible as your stock at their location, and the returned quantity is received against the operation, so the value is not lost from the books while it is off site.',
      },
      {
        q: 'Will the rollout stop production?',
        a: 'No, if it is phased. One product family runs in the new system while the rest continue as they are, and the cutover for each family happens at a stock count boundary. Big-bang cutovers in manufacturing are where the horror stories come from.',
      },
    ],
  },

  /* ───────────── SALON & SPA ───────────── */
  'salon-spa': {
    h1: 'Odoo rollouts for salons and spas',
    noun: 'salon and spa',
    metaTitle: 'Odoo for Salon and Spa: rollout plan, modules, and commission setup',
    metaDescription:
      'How a salon or spa group rolls out Odoo: bookings tied to stock, back bar consumption, stylist commission that stops being disputed, the modules involved, and the branch-by-branch sequence.',
    summary:
      'Salons, spas and multi-branch groups. Bookings linked to stock, back bar consumption, and commission that stops being argued about every month.',
    intro:
      'Salons usually run a booking app, a till and a commission spreadsheet that do not know about each other. The result is a business where the diary is full, the products run out, and payroll is a monthly negotiation. An Odoo rollout here is about connecting those three things in one branch, then copying it.',
    pains: [
      {
        title: 'Bookings do not know about stock',
        body: 'A treatment is sold that the room has no product for. The client arrives, the stylist improvises, and the substitution never reaches costing.',
      },
      {
        title: 'Commission is calculated by hand',
        body: 'A spreadsheet at month end, disputed by the team, corrected, then paid late. It is the single fastest way to lose good stylists.',
      },
      {
        title: 'Retail and service revenue are mixed',
        body: 'The till reports one total, so retail attachment rate cannot be measured and product sales are never actively managed.',
      },
      {
        title: 'Chair utilisation is invisible',
        body: 'No-shows and gaps are noticed on the day and never counted. Nobody can say what an empty Tuesday afternoon costs.',
      },
      {
        title: 'Client history walks out with the stylist',
        body: 'Colour formulas, allergies and preferences live in one person’s memory. When they leave, the client relationship often leaves too.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'One till for services and retail, with the sale linked to the stylist who performed it, which is what makes commission calculable.' },
      { slug: 'inventory', why: 'Back bar consumption per service plus retail stock, so product usage is deducted as work happens rather than counted monthly.' },
      { slug: 'hr', why: 'Staff records, skills and the contract terms that commission rules read from.' },
      { slug: 'payroll', why: 'Commission and tips flowing into the payslip as rules, which removes the monthly spreadsheet argument entirely.' },
      { slug: 'marketing-automation', why: 'Rebooking reminders and win-back campaigns triggered by the last visit date, which is the highest-return automation in this sector.' },
      { slug: 'accounting', why: 'Daily takings, memberships and package liability posted properly rather than treated as cash in and cash out.' },
    ],
    rollout: [
      { phase: 'One branch, bookings and till', body: 'Service menu with durations, resources, staff, payment methods and closing. Traded live for a few weeks before anything is copied.' },
      { phase: 'Back bar and retail stock', body: 'Consumption per service and retail lines separated at the till. This is what turns the till total into a margin figure.' },
      { phase: 'Commission and payroll', body: 'Commission rules configured and run in parallel with the existing spreadsheet for one cycle, so the team sees the numbers agree before they trust it.' },
      { phase: 'Multi-branch and client marketing', body: 'Remaining branches copy the proven configuration, then memberships, packages and automated rebooking go on top.' },
    ],
    prepare: [
      'The service menu with duration, price and the staff level that performs each service.',
      'A staff list with commission basis written down, including the exceptions people have negotiated.',
      'Approximate back bar consumption per service. Approximate is fine, absent is not.',
      'Room, chair and equipment resources as bookable capacity.',
      'Membership and package terms, including what happens to unused sessions.',
      'A client list with contact details and consent to be contacted.',
    ],
    integrations: ['WhatsApp Business', 'Stripe', 'PayTabs', 'Mada', 'HyperPay', 'Power BI'],
    services: ['odoo-pos-deployment', 'odoo-implementation', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'salon-spa',
    solutionNote: 'For the feature view of bookings, stylists, commissions and POS, read the solution page.',
    alsoSee: ['hotel-hospitality'],
    products: ['wt-salon-management', 'wt-pos-saloon', 'wt-pos-dashboard'],
    faqs: [
      {
        q: 'Can clients book online themselves?',
        a: 'Yes, against real staff and room availability rather than a separate diary that has to be reconciled. Online and walk-in bookings compete for the same slots, which is the whole point.',
      },
      {
        q: 'How are stylist commissions handled?',
        a: 'As rules on the service and retail lines, resolved per stylist and carried into the payslip. We run one cycle in parallel with your existing spreadsheet so the team can see the two agree before the spreadsheet is retired.',
      },
      {
        q: 'Can we sell memberships and prepaid packages?',
        a: 'Yes, with the remaining balance tracked per client and redeemed at the till. The accounting treatment of unused sessions is agreed with your accountant during setup rather than assumed.',
      },
      {
        q: 'Do we need one system per branch?',
        a: 'No. One system, with each branch as its own location, staff roster and stock. Group-level reporting then works without consolidating exports.',
      },
      {
        q: 'What happens to our existing client list?',
        a: 'We import it with visit history where the current system can export it. Colour formulas and treatment notes usually have to be re-entered, so we plan that as a task with a named owner rather than hoping it happens.',
      },
    ],
  },

  /* ───────────── LOGISTICS ───────────── */
  'logistics-transport': {
    h1: 'Odoo rollouts for transport and logistics operators',
    noun: 'transport and logistics',
    metaTitle: 'Odoo for Logistics: rollout plan, modules, and trip cost capture',
    metaDescription:
      'How a transport or logistics operator rolls out Odoo: trip costing, dispatch, freight billing rules, fleet maintenance and document expiry, with the modules involved and the phase order.',
    summary:
      'Trucking, freight and fleet operators. Trip costs captured as they happen, billing rules that stop being manual, and documents that do not expire quietly.',
    intro:
      'Transport operators know their revenue and guess their cost. Fuel slips, driver advances and repairs arrive weeks after the invoice has gone out, so profit per trip is a year-end discovery. The rollout is built around capturing cost at the moment it is incurred, then making billing rules automatic.',
    pains: [
      {
        title: 'Trip cost arrives too late to matter',
        body: 'Fuel receipts, driver advances and repair bills land weeks after the trip is invoiced. Loss-making routes and customers stay in the book because the loss is never visible in time.',
      },
      {
        title: 'Dispatch lives on a whiteboard',
        body: 'Allocation is done by phone and memory. Nobody can say which vehicles are committed next week, so the fleet is either overbooked or idle.',
      },
      {
        title: 'Every customer bills differently',
        body: 'Per kilometre, per tonne, per trip, plus waiting time and detention. The rules are known but not encoded, so invoices are built by hand and disputed line by line.',
      },
      {
        title: 'Documents expire without warning',
        body: 'Vehicle registrations, permits, insurance and driver licences are tracked in a folder. Expiry is discovered at a checkpoint, with the load on board.',
      },
      {
        title: 'Maintenance is bought under pressure',
        body: 'Work happens when something breaks. Parts are sourced urgently at retail prices, and the vehicle is off the road on the day it was most needed.',
      },
    ],
    modules: [
      { slug: 'sales', why: 'Customer rate cards as pricelists, so the contracted rate is applied automatically instead of being looked up per invoice.' },
      { slug: 'accounting', why: 'Cost and revenue posted against the trip through analytic accounting, which is what turns profit per trip into a standing report.' },
      { slug: 'purchase', why: 'Fuel, parts, tolls and subcontracted trips captured as they are incurred, against the vehicle and the trip.' },
      { slug: 'maintenance', why: 'Preventive schedules by distance or hours per vehicle, so downtime is planned into the dispatch rather than sprung on it.' },
      { slug: 'hr', why: 'Driver records, licences and contract terms, including the allowance rules that feed pay.' },
      { slug: 'attendance', why: 'Duty hours and trip allowances captured at the point they happen rather than reconstructed at month end.' },
      { slug: 'documents', why: 'Registrations, permits and licences with expiry dates that raise activities in advance instead of surfacing at a checkpoint.' },
    ],
    rollout: [
      { phase: 'Fleet and trip record', body: 'Vehicle master with meter readings, routes, customers and the trip record everything else attaches to. Get the trip record right and the rest is reporting.' },
      { phase: 'Cost capture at source', body: 'Fuel, advances, tolls and repairs entered against the trip as they happen, usually by the person who already handles the paperwork.' },
      { phase: 'Rate cards and billing', body: 'Customer rate rules encoded, then invoicing from completed trips. Run alongside manual invoicing for one cycle to prove the rules match the contracts.' },
      { phase: 'Maintenance and compliance dates', body: 'Preventive schedules and document expiry alerts, once the vehicle master is trustworthy and meter readings are being captured.' },
    ],
    prepare: [
      'A vehicle list with current meter readings and ownership or lease status.',
      'The rate card per customer, including waiting time and detention rules, written down.',
      'A driver list with allowance rules and licence expiry dates.',
      'How fuel is currently bought and who holds the receipts, because that decides where capture happens.',
      'Document expiry dates for registrations, permits and insurance as at the cutover date.',
      'A named dispatcher who will own allocation in the system after go-live.',
    ],
    integrations: ['Aramex', 'DHL', 'FedEx', 'WhatsApp Business', 'ZKTeco Biometric', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-support'],
    solutionSlug: 'logistics-transport',
    solutionNote: 'For the feature view of trucking, dispatch, driver management and freight billing, read the solution page.',
    alsoSee: ['distribution-fmcg'],
    products: ['way4tech-logistics', 'wt-hrms-attendance'],
    faqs: [
      {
        q: 'Can we see profit per trip rather than only per month?',
        a: 'Yes, provided cost is captured against the trip when it is incurred. The software side is straightforward. The change that takes effort is moving fuel and advance capture to the day it happens, and we plan the rollout around that.',
      },
      {
        q: 'Our billing rules differ per customer. Can that be automated?',
        a: 'Mostly. Per kilometre, per tonne, per trip and waiting time rules are configurable. Genuinely unusual contract terms are handled as a small customization, and we identify which is which during discovery rather than after signing.',
      },
      {
        q: 'Do drivers need to use the system?',
        a: 'Not necessarily at the start. Many operators keep entry with the office in phase one and add driver-facing capture later, once the trip record is proven. Pushing an app to drivers on day one is a common way to lose the rollout.',
      },
      {
        q: 'Can we track vehicle document expiry?',
        a: 'Yes, as dated records that raise a reminder ahead of expiry with a named owner. This is usually one of the fastest returns in a transport rollout because the cost of a missed expiry is immediate.',
      },
      {
        q: 'What about subcontracted trips?',
        a: 'They are recorded against the same trip as a purchased cost, so margin on subcontracted work is visible next to margin on your own fleet. Operators are frequently surprised by that comparison.',
      },
    ],
  },

  /* ───────────── REAL ESTATE ───────────── */
  'real-estate': {
    h1: 'Odoo rollouts for property and leasing companies',
    noun: 'property',
    metaTitle: 'Odoo for Real Estate: rollout plan, modules, and rent roll migration',
    metaDescription:
      'How property and leasing companies roll out Odoo: rent roll migration, deposits and tenant balances, maintenance tickets, owner reporting, with the modules involved and the phase order.',
    summary:
      'Landlords, leasing and property management. Rent roll migration, tenant balances that hold up, maintenance with a ticket, and owner reporting that is not assembled by hand.',
    intro:
      'Property companies run on a rent roll spreadsheet that one person understands. Escalations get missed, deposits sit outside the ledger, and maintenance arrives by phone. The rollout is driven by the lease: get units, leases and opening balances loaded accurately, and most of the recurring pain disappears with them.',
    pains: [
      {
        title: 'The rent roll is one spreadsheet and one person',
        body: 'Escalations, renewal dates and break clauses are tracked manually. A missed renewal is money that cannot be recovered, and the risk sits with whoever maintains the file.',
      },
      {
        title: 'Deposits and part payments sit outside accounting',
        body: 'Cheques, advances and partial settlements are recorded on the side, so a tenant balance dispute becomes an archaeology exercise across two records.',
      },
      {
        title: 'Maintenance has no ticket',
        body: 'Requests arrive by phone and messaging app. There is no record, no cost against the unit, and no way to show a tenant or an owner what was done and when.',
      },
      {
        title: 'Listing data is re-keyed per portal',
        body: 'Photos, prices and descriptions are entered separately on each channel, so they drift apart and the cheapest listing wins the enquiry.',
      },
      {
        title: 'Owner statements are built by hand',
        body: 'Each month, income and expenses per owner are assembled in a spreadsheet. It is slow, it is error prone, and it is the report owners judge you on.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Enquiry to viewing to offer as a pipeline with activities, so leads stop dying in an agent’s inbox.' },
      { slug: 'accounting', why: 'Recurring rent invoicing, deposits, part payments and owner payouts in the ledger, which is what makes tenant balances defensible.' },
      { slug: 'helpdesk', why: 'Maintenance requests as tickets with response targets, assigned to a vendor and costed against the unit.' },
      { slug: 'maintenance', why: 'Planned building and equipment maintenance on schedule, separate from tenant-raised faults, so both are visible.' },
      { slug: 'documents', why: 'Leases, identity documents and handover reports held against the unit and the tenant with retention rules.' },
      { slug: 'sign', why: 'Lease and renewal signing with an audit trail, which removes the courier cycle from every renewal.' },
      { slug: 'website', why: 'Listings published from the same unit records the leasing team works in, so the site cannot drift from availability.' },
    ],
    rollout: [
      { phase: 'Units and leases', body: 'Property, unit and lease master with start dates, escalations and renewal terms. This is the whole project in one phase, and it deserves the time.' },
      { phase: 'Rent invoicing and collections', body: 'Opening tenant balances and deposits loaded at a stated cutover date, then recurring invoicing, receipts and arrears reporting.' },
      { phase: 'Maintenance and vendors', body: 'Ticket intake, vendor assignment and cost per unit. Usually the phase tenants notice first, which helps adoption.' },
      { phase: 'Listings and owner reporting', body: 'Publishing to the website and portals, then owner statements generated from the ledger rather than assembled by hand.' },
    ],
    prepare: [
      'A unit list with area, type and current occupancy status.',
      'Active leases with start date, end date, rent, escalation basis and renewal terms.',
      'Opening tenant balances and held deposits as at a single stated cutover date.',
      'The maintenance vendor list with trades and agreed rates.',
      'Portal accounts and a usable photo library, because listing quality is limited by the photos you have.',
      'A named owner for the rent roll after go-live, ideally not the person who maintained the spreadsheet alone.',
    ],
    integrations: ['Stripe', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-support'],
    solutionSlug: 'real-estate',
    solutionNote: 'For the feature view of listings, leases, rent roll and tenant portal, read the solution page.',
    alsoSee: ['construction', 'professional-services'],
    products: ['wt-real-estate', 'wt-crm-dashboard'],
    faqs: [
      {
        q: 'Can Odoo handle rent escalations and renewal dates automatically?',
        a: 'Yes. Escalation basis and renewal dates are held on the lease and raise activities ahead of time with a named owner. The migration effort is in getting the existing terms accurately into the system, not in running them afterwards.',
      },
      {
        q: 'How do you migrate an existing rent roll?',
        a: 'Units, leases, opening balances and held deposits are loaded at a single stated cutover date and reconciled against your last statement before go-live. We do not start invoicing until that reconciliation is signed off.',
      },
      {
        q: 'Can tenants raise maintenance requests themselves?',
        a: 'Yes, through a portal or an email address that creates a ticket. The value is not the channel, it is that every request now has a record, an owner, a response target and a cost against the unit.',
      },
      {
        q: 'Do you also cover property development, not just leasing?',
        a: 'Yes, but it is a different scope: budgets, bills of quantity, subcontractors and progress billing. That is covered on the construction and real estate development solution page.',
      },
      {
        q: 'Can we publish listings to external property portals?',
        a: 'Where the portal offers a feed or an API, yes, published from the same unit records your team works in. Portals without an interface still need manual entry, and we confirm which of your channels are which before scoping.',
      },
    ],
  },
};
