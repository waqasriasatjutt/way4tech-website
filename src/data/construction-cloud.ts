/*
 * Construction Cloud: the hosted construction management product.
 * Facts come from the product's own feature notes (construction-cloud repo,
 * cc_* modules, doc/FEATURES.md in each). Screenshots are from the generic demo company
 * (Kestrel Construction) on construction-cloud.way4tech.com.
 * No price until one is set. No contract clause text, ever: the standard
 * forms are named, their wording is not reproduced.
 */

export interface CcShot { src: string; alt: string; caption: string; w: number; h: number; phone?: boolean }
export interface CcSection { heading: string; body?: string; bullets?: string[] }
export interface CcFeature {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  lede: string;
  card: string;
  sections: CcSection[];
  shots: CcShot[];
}

const DIR = '/software/construction-cloud';
const desk = (name: string, alt: string, caption: string): CcShot => ({ src: `${DIR}/${name}.webp`, alt, caption, w: 1400, h: 875 });
const phone = (name: string, alt: string, caption: string): CcShot => ({ src: `${DIR}/${name}.webp`, alt, caption, w: 390, h: 844, phone: true });

export const CC = {
  name: 'Construction Cloud',
  demoUrl: 'https://construction-cloud.way4tech.com/',
  requestUrl: '/contact/?product=construction-cloud&source=software/construction-cloud',
  seoTitle: 'Construction ERP Software | Construction Cloud',
  description: 'Construction Cloud is hosted construction management software for contractors: estimating, BoQ and billing, contracts and claims, site app, quality, HSE and dashboards.',
  lede: 'Construction management software for contractors, hosted and run by us. One system from the tender to the final account: estimating, the bill of quantities, measurement and valuations, contracts and notices, the site diary on a phone, quality, safety and the numbers a director asks for.',
  intro: [
    'Construction Cloud is a complete construction system that we host, set up and support for you. You do not install modules or manage a server. Each contractor gets its own database with its own brand, users and roles.',
    'Every role starts on its own home screen: a director sees the portfolio, a commercial manager sees valuations and notices falling due, a site engineer sees today\'s inspections, a worker sees the check-in button. Every figure on a dashboard opens the records behind it.',
  ],
  whoFor: [
    'Main contractors and subcontractors on measured or lump sum work who value, certify and carry retention.',
    'Civils, building, MEP and fit-out firms running several sites at once and losing track of committed cost.',
    'Contractors who want one system for the office and the site, without a separate estimating tool, document tool and safety tool.',
  ],
  shots: [
    desk('home', 'Construction Cloud home screen for a director with approvals waiting, a personal dashboard and quick actions', 'Each role lands on its own home screen, with the approvals waiting on that person.'),
    desk('executive-dashboard', 'Executive dashboard with portfolio contract value, certified to date, cash received, retention held, forecast margin and an S-curve', 'The executive dashboard: value, cost, cash and retention across every job, with planned, earned and actual on one S-curve.'),
  ],
  lifecycle: [
    'Tender and estimate', 'Award and budget', 'Procure and subcontract', 'Build and record on site',
    'Measure, value and certify', 'Notices, variations and claims', 'Handover and defects', 'Final account',
  ],
  extras: [
    'Plant and equipment: daily logs, transfers between sites, fuel, hire accruals and certificates.',
    'Supplier and subcontractor compliance: approved vendor lists, prequalification, insurance certificates and document expiry.',
    'Commissioning, handover packages, completion certificates and the defects liability period.',
    'Labour cost from time records, with cost rates per trade feeding estimates and job cost.',
    'Your own brand on the screens, the letters, the reports and the site app.',
    'Built-in help: a "How it works" process map, next-step banners on each record and a "?" on every screen.',
  ],
  faqs: [
    { q: 'Is Construction Cloud an app I install on my own Odoo?', a: 'No. Construction Cloud is hosted by us as a complete service. If you already run Odoo and want modules for your own server, look at Construction Management and Construction Management Enterprise on the Odoo Apps Store instead.' },
    { q: 'Can I try it before a call?', a: 'Yes. The demo company, Kestrel Construction, has live jobs, valuations, notices and site records. Ask us for a login, or use the shared demo login we send with the link.' },
    { q: 'Does it print our contract clauses?', a: 'No. The notice register knows the clause numbers and time periods of the common standard forms, so it can count down the deadlines, but it holds no clause wording. Your contract documents stay your own.' },
    { q: 'Does the site app work without signal?', a: 'Yes. The site app installs on the phone, opens offline and keeps the diary, photos, checks and requests in a queue until the connection comes back. Check-in is the one action that needs a connection, because the time has to come from the server.' },
    { q: 'How is it priced?', a: 'Per company, as a hosted subscription with setup and data migration quoted for your jobs. Tell us how many users and live jobs you have and we will send a quote.' },
  ],
};

export const CC_FEATURES: CcFeature[] = [
  {
    slug: 'estimating-and-tenders',
    title: 'Estimating and tenders',
    seoTitle: 'Construction Estimating Software with Takeoff',
    description: 'Estimate from a resource library and rate build-ups, take off quantities, compare subcontractor quotes, import P6 or MS Project programmes and turn the estimate into the budget on award.',
    lede: 'Price a tender from your own resources and rates, take off quantities from drawings, level the subcontractor quotes and turn the approved estimate into the job budget the day you win.',
    card: 'Resource library, rate build-ups, takeoff, quote levelling, markup sheet and P6 or MS Project import.',
    sections: [
      { heading: 'A tender pipeline you can manage', bullets: [
        'Tenders move through stages from identified to won or lost, with the submission deadline counting down on each one.',
        'Bid bonds, go or no-go scoring and win rate sit on the tender. A score below your company minimum needs a director to approve.',
        'The tender dashboard shows open and weighted pipeline value, submissions due, bonds expiring and the margin bid.',
      ] },
      { heading: 'Estimates with versions', bullets: [
        'Build the estimate by section and cost item, each priced from a rate build-up, a selected quote or a typed rate.',
        'New Version copies the structure, takeoff and markup into v2 or v3. Compare Versions shows every item that changed and the effect on price and margin.',
        'A markup sheet handles overheads, risk, profit, time-related preliminaries and bond costs, and the tender summary shows the margin and the spread factor.',
      ] },
      { heading: 'Rates from your own resources', bullets: [
        'A resource library for labour, crews, plant, materials and subcontract, with regional price books per city and currency.',
        'Labour can take its cost per hour from the payroll cost rates, so a pay rise reaches the next estimate.',
        'Rate build-ups work out the cost per unit from gang output and components, and can be applied to many items at once.',
      ] },
      { heading: 'Takeoff and quotes', bullets: [
        'Takeoff sheets per drawing and revision, with times, length, width and height, a formula for odd shapes and deductions for openings.',
        'Import takeoff rows from Excel with a downloadable template.',
        'Send enquiries to approved vendors, record their quotes and compare them side by side with the lowest rate per item highlighted.',
      ] },
      { heading: 'Programme import and award', bullets: [
        'Import Primavera P6 .xer or MS Project .xml programmes into the tender or the project, with activities, dates and links.',
        'On award the estimate becomes the project bill: quantities, cost rates as the approved budget, sell rates and cost codes.',
      ] },
    ],
    shots: [
      desk('estimate', 'An awarded tender estimate with cost items, rates from build-ups, versions and the approval trail', 'An estimate after award: cost items, rate sources, versions and the trail from approval to budget.'),
      desk('takeoff', 'A takeoff sheet for foundations with measurement rows, a formula row and a deducted void', 'A takeoff sheet: one row per measurement, a formula for round columns and a deduction for a lift pit.'),
      desk('tender-dashboard', 'Tender dashboard with pipeline value, weighted value, bonds held and pipeline by stage', 'The tender dashboard: pipeline by stage, bonds held and the average margin bid.'),
    ],
  },
  {
    slug: 'boq-measurement-and-billing',
    title: 'BoQ, measurement and billing',
    seoTitle: 'BoQ, Measurement and Progress Billing Software',
    description: 'Bills of quantities, a measurement book, interim valuations, payment certificates, retention with release moieties, subcontractor valuations and cost value reconciliation.',
    lede: 'Keep the bill of quantities, the measurement book, the valuations and the retention in one place, so the certified figure, the invoice and the cost all agree.',
    card: 'Measurement book, interim valuations, certificates, retention ledger, subcontract valuations and CVR.',
    sections: [
      { heading: 'From measured quantity to certificate', bullets: [
        'The measurement book records quantities built each period against bill items, with who measured and who witnessed, moving from draft to measured, agreed and certified.',
        'An interim valuation gathers measured work, variations, dayworks, materials on site and preliminaries into the gross value to date.',
        'The contract sets the valuation day, the days allowed to certify and the days to payment, so each valuation shows its payment due and final date for payment.',
        'A certificate raises a draft client invoice. The accountant still checks and posts it.',
      ] },
      { heading: 'Retention, done properly', bullets: [
        'Retention percentage and a limit as a percentage of the contract sum, deducted on every valuation.',
        'Release in two moieties, at practical completion and at the end of the defects period, with the date each one falls due.',
        'A retention ledger per contract shows what is held, what falls due and what is overdue.',
      ] },
      { heading: 'Subcontractors and cost', bullets: [
        'Subcontract packages with their own valuations, variations, contra charges and retention, so a subcontractor cannot be paid past the order without someone seeing it.',
        'Budget, committed, actual and remaining on every bill item, with a policy for what happens when a line goes over.',
        'Cost value reconciliation per job, and a WIP schedule showing over and under billing at period end.',
      ] },
    ],
    shots: [
      desk('valuation', 'Interim valuation with measured work, variations, dayworks, materials on site, retention and payment dates', 'An interim valuation waiting for the certificate, with retention worked out against its limit.'),
      desk('measurement', 'Measurement book entry with measured items, dimensions and measured value', 'A measurement book entry: the quantities built this period, measured and witnessed.'),
      desk('retention-ledger', 'Retention ledger listing amounts held per contract and a final moiety falling due', 'The retention ledger: every amount held, and the final moiety due for release.'),
    ],
  },
  {
    slug: 'contracts-notices-and-claims',
    title: 'Contracts, notices and claims',
    seoTitle: 'Construction Notices, Time Bars and Claims',
    description: 'A notices register with time bar countdowns, variations, claims with quantum and substantiation, bonds, insurances and advances, for contractors running standard or bespoke forms.',
    lede: 'Most claims are lost on a missed notice, not on the argument. Construction Cloud counts down every notice period and keeps the claim, its notices and its evidence together.',
    card: 'Notices register with time bar alerts, variations, claims with quantum, bonds and insurances.',
    sections: [
      { heading: 'Standard forms and time bars', bullets: [
        'A library of common standard forms (FIDIC, NEC4 and others) and a bespoke form, each with a notice catalogue: who gives the notice, what the period runs from, the number of days and how they are counted, and whether it is a strict time bar.',
        'No clause text is stored. The catalogue holds periods and a short note in plain words of what is lost if the date is missed.',
        'Change a period for your particular conditions and every notice raised after that uses it.',
      ] },
      { heading: 'The notices register', bullets: [
        'Raise a notice from the register or straight from a delay event, variation, site instruction or claim, with the trigger date filled in.',
        'Due By is counted from the trigger date. Print the letter on your letterhead, record when it was served, and a late notice is flagged.',
        'Incoming notices set your own response deadline.',
        'Every night open notices fall into 7 day, 3 day, 1 day or past due bands and the alerts get louder as the date gets closer.',
      ] },
      { heading: 'Variations and claims', bullets: [
        'A variation register with your estimate, their assessment, the agreed value and the carrying value, so the pending figure is always visible.',
        'Claims for time, money or both, linked to their notices, delay events, variations and the substantiation documents.',
        'Build the quantum by head, basis, quantity and rate. A money claim cannot be submitted without one.',
      ] },
      { heading: 'Bonds, insurances and advances', bullets: [
        'Bid, performance and advance payment bonds with expiry dates and bank facilities.',
        'Insurances and certificates of insurance, with reminders before they lapse.',
        'Advance payments recovered a slice at a time against each valuation.',
      ] },
    ],
    shots: [
      desk('notices', 'Notices register filtered to notices needing action, with days left and time bar bands', 'The notices register: each open notice with its clause, due date and time bar band.'),
      desk('claim', 'A claim for time and money with days claimed, amount claimed and tabs for quantum, notices and substantiation', 'A claim for time and money, with its notices and evidence on tabs.'),
      desk('variations', 'Variations register with our estimate, their assessment, agreed value and status', 'The variations register shows our estimate against their assessment for every change.'),
    ],
  },
  {
    slug: 'site-app-and-diary',
    title: 'Site app and diary',
    seoTitle: 'Construction Site Diary App That Works Offline',
    description: 'A phone app for site teams: daily diary, geotagged photos, inspections and snags, material requests, RFIs, incidents and geofenced check-in, with an offline queue.',
    lede: 'The site team works from a phone app that installs to the home screen and keeps working without signal. What they record lands on the right record in the office.',
    card: 'Diary, geotagged photos, checks and snags, requests, RFIs, incidents and geofenced check-in, offline.',
    sections: [
      { heading: 'What the phone does', bullets: [
        'Today: the site, the weather, who is checked in, and open inspections, hold points, snags, RFIs and NCRs.',
        'Diary: weather, manpower by trade, plant hours, work done, delays with cause, and notes. Posting the day creates the labour logs and delay events.',
        'Photos stamped with date, time, project and GPS position, tagged to a bill item and location.',
        'Checks: record pass, fail or not applicable against each inspection point. A fail raises a non-conformance report.',
        'Requests: material requisitions straight to procurement, RFIs for the document controller, and incident or near miss reports to the safety register.',
        'Check in with one button, using the geofence set for the site.',
      ] },
      { heading: 'Built for poor signal', bullets: [
        'Without signal every entry goes into a queue on the phone and is sent when the connection returns.',
        'Each entry carries its own key, so an entry sent twice is only recorded once.',
        'If the office has already closed the record, the entry stays in the queue with the reason, so nothing is lost silently.',
      ] },
      { heading: 'Each role sees its own projects', bullets: [
        'People only see the projects they are on. Workers get Today, Photos and Check in; site engineers add checklists, snags and requisitions; site managers also write the diary and raise RFIs.',
        'A sync log in the office shows every entry received, when it was written on the phone and what it became.',
      ] },
    ],
    shots: [
      phone('site-today', 'Site app Today screen with weather, people checked in and open items', 'Today on the phone: weather, headcount and open items for the site.'),
      phone('site-diary', 'Site app diary screen with weather, manpower, plant and work done', 'The daily diary, written on site.'),
      phone('site-checks', 'Site app checks screen listing inspections and hold points', 'Inspections waiting on site, with their hold points.'),
    ],
  },
  {
    slug: 'quality-and-documents',
    title: 'Quality and documents',
    seoTitle: 'Construction Quality: ITP, NCR and Documents',
    description: 'Inspection and test plans with hold points, non-conformance reports, a drawing register with revisions and status codes, transmittals, document reviews and an Excel register.',
    lede: 'Inspection and test plans drive the inspections, a hold point stops measurement until it is released, and every drawing revision has a status and a trail.',
    card: 'ITPs with hold points, NCRs, drawing register, revisions, transmittals and reviews.',
    sections: [
      { heading: 'Inspection and test plans', bullets: [
        'An ITP library of templates, copied into a plan per project and work package.',
        'Request an inspection from any point. Results come back from site, and the consultant signs off in the office or on the portal.',
        'An open hold point stops the bill items it covers from being measured until it is released.',
        'A failed point raises a non-conformance report with severity, disposition and the cost of rework.',
      ] },
      { heading: 'Document control', bullets: [
        'A drawing register with revisions, purpose of issue and status codes, and the current revision marked.',
        'A distribution matrix decides who receives what. Build transmittals from the selected revisions.',
        'Document reviews with internal and external reviewers, due dates and outcomes.',
        'Export the document register to Excel for one project or all of them.',
      ] },
    ],
    shots: [
      desk('itp', 'An active inspection and test plan with an open hold point, consultant and completion percentage', 'An inspection and test plan with one hold point still open.'),
      desk('drawing-revision', 'A current drawing revision with status code, purpose of issue and an external review', 'A drawing revision: status code, what changed and who is reviewing it.'),
      desk('ncrs', 'Non-conformance reports with severity, disposition and cost of rework', 'Open non-conformance reports with the cost of rework.'),
    ],
  },
  {
    slug: 'hse',
    title: 'Health, safety and environment',
    seoTitle: 'Construction HSE Software: RAMS and Incidents',
    description: 'HSE dashboard with LTIFR and TRIR, risk assessments and method statements, permits, observations, corrective actions, training matrix, audits and drills.',
    lede: 'Safety records live next to the jobs they belong to: the method statement next to the permit, the incident next to the diary, the training card next to the worker.',
    card: 'RAMS, permits, observations, incidents, corrective actions, training matrix and HSE statistics.',
    sections: [
      { heading: 'Plan the work safely', bullets: [
        'Risk assessments and method statements from templates, scored on your company risk matrix before and after controls.',
        'Work may not start on an unapproved RAMS. Print it with a sign-on sheet for the briefing.',
        'Permits to work on a board, linked to the RAMS and the workers signed on.',
      ] },
      { heading: 'Record and follow up', bullets: [
        'Anyone on site can report an observation or near miss in a few taps, with a photo.',
        'Corrective actions with an owner and a due date; overdue ones are chased every day.',
        'Incidents with the injury and illness classification, days away and restricted days.',
        'Audits and emergency drills from checklists, scored automatically.',
      ] },
      { heading: 'Numbers and competence', bullets: [
        'An HSE dashboard with man-hours, LTIFR, TRIR, days since the last lost-time injury, open actions and expiring training.',
        'Monthly statistics per job and for the company, with a printable report.',
        'A training matrix of workers against required training, with expiring cards chased to the manager.',
      ] },
    ],
    shots: [
      desk('hse-dashboard', 'HSE dashboard with man-hours worked, LTIFR, TRIR, days since last LTI and a 12 month trend', 'The HSE dashboard: frequency rates, open actions and training expiring.'),
      desk('rams', 'Risk assessment and method statement for hot works with hazards, controls and residual risk', 'A RAMS in review, with each hazard scored before and after controls.'),
    ],
  },
  {
    slug: 'dashboards-and-reports',
    title: 'Dashboards and reports',
    seoTitle: 'Construction Dashboards: Earned Value and WIP',
    description: 'Role dashboards, Project 360, earned value, 13 week cash flow, portfolio map, labour and plant reports, monthly report packs, WIP schedule and a report centre.',
    lede: 'Every role gets the figures it needs, live, and every figure opens the records behind it. Monthly packs go out by themselves.',
    card: 'Project 360, earned value, 13 week cash flow, WIP, monthly packs and personal dashboards.',
    sections: [
      { heading: 'Dashboards for each role', bullets: [
        'Executive, commercial, finance, procurement, site, QHSE and tender dashboards, each showing only what that role may see.',
        'Project 360 for one job: contract and revised value, budget, committed, actual, forecast margin, certified, invoiced, received, retention and open items.',
        'My Dashboard: each user picks their own tiles, charts and lists.',
      ] },
      { heading: 'The numbers behind the job', bullets: [
        'Earned value from weekly snapshots: SPI, CPI, EAC, ETC and VAC, with the trend over time.',
        'A 13 week cash flow from certificates due in and orders, bills and payroll going out.',
        'Portfolio map, labour productivity, plant utilisation and a subcontractor scorecard.',
      ] },
      { heading: 'Reports that go out on their own', bullets: [
        'A monthly project report pack in your brand colours, generated and emailed to the recipients on the day you set.',
        'A WIP schedule with over and under billing at period end, exported to Excel and finalised.',
        'A report centre listing every report, export and dashboard the user is allowed to open.',
        'A dashboard digest by email for people who do not log in every day.',
      ] },
    ],
    shots: [
      desk('project-360', 'Project 360 dashboard with value, cost, forecast margin, cash and open items for one job', 'Project 360: everything about one job on one screen.'),
      desk('earned-value', 'Earned value dashboard with SPI, CPI, EAC and charts of planned, earned and actual', 'Earned value from weekly snapshots, with SPI and CPI over time.'),
      desk('wip-schedule', 'WIP schedule with contract value, estimated cost, percent complete, earned revenue and billed to date', 'A WIP schedule at month end, with under billing worked out.'),
    ],
  },
  {
    slug: 'access-control-and-approvals',
    title: 'Access control and approvals',
    seoTitle: 'Construction Approvals and Access Control',
    description: 'Per-project roles, approval limits by amount, segregation of duties, auditor and consultant roles, two-factor sign-in and a quarterly access review.',
    lede: 'People see the jobs they work on, approve up to their own limit, and cannot approve what they raised themselves.',
    card: 'Per-project roles, approval limits by amount, segregation of duties and access reviews.',
    sections: [
      { heading: 'Who sees which job', bullets: [
        'One role per person per project. A site user on one job sees nothing of another.',
        'View only and external consultant roles for people outside the company, and an auditor role that reads everything and changes nothing.',
        'A "Who can see this project" button answers the question in one click.',
      ] },
      { heading: 'Approvals by amount', bullets: [
        'Approval limits per document type: material requisitions, purchase and RFQ awards, subcontract orders, variations, petty cash, site expenses and payment certificates.',
        'Routing by amount, for example a procurement lead up to one figure, the project manager above it and a director above that.',
        'Segregation of duties: whoever raised or recorded a document cannot approve it. An administrator override is logged.',
      ] },
      { heading: 'Sign-in and review', bullets: [
        'Two-factor sign-in, session timeout and sign-in networks per role.',
        'A quarterly access review that flags idle users, missing two-factor and duty conflicts, and records when the review was done.',
      ] },
    ],
    shots: [
      desk('approval-limits', 'Approval limits per document type with segregation of duties switched on and routing by amount', 'Approval limits: routing by amount for each document type, with segregation of duties on.'),
      desk('project-members', 'Project members tab with one project role per person and external consultant flag', 'One role per person on each job, including external consultants.'),
      desk('access-review', 'Quarterly access review with user count, missing two-factor, inactive users and duty conflicts', 'A quarterly access review with the flagged rows to settle.'),
    ],
  },
];
