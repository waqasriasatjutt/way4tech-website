/* ─────────────────────────────────────────────────────────────
 * SERVICE INDUSTRIES (6): gym-fitness, veterinary-clinic,
 * laundry-dry-cleaning, car-wash, coworking-space, event-management.
 *
 * Spread into INDUSTRY_DETAIL in industries-detail.ts. Read that
 * file header before editing. The two rules that matter here:
 *
 *   1. /industries/<slug>/ answers HOW a business in this sector
 *      gets Odoo running: failure modes, module map, rollout
 *      sequence, what to prepare. It never restates the feature
 *      checklist that lives on /solutions/<slug>/.
 *   2. No tax rate, percentage, mandate, scheme name, threshold,
 *      deadline or government portal appears in this file. Country
 *      requirements are deferred to /services/odoo-localization/
 *      and /services/odoo-e-invoicing/.
 *
 * Every slug used in modules, services, integrations, products,
 * caseStudies and alsoSee is checked against site.ts. A slug that
 * does not resolve is dropped by the page template, so a typo
 * shows up as a missing card rather than a broken link.
 * ───────────────────────────────────────────────────────────── */

import type { IndustryDetail } from '~/data/industries-detail';

export const SERVICES_INDUSTRIES: Record<string, IndustryDetail> = {
  /* ───────────── GYM & FITNESS ───────────── */
  'gym-fitness': {
    h1: 'Odoo rollouts for gyms and fitness clubs',
    noun: 'gym and fitness',
    metaTitle: 'Odoo for Gyms: rollout plan, modules, and membership data preparation',
    metaDescription:
      'How a gym, studio or multi-site fitness chain rolls out Odoo: recurring membership billing, contract freezes, door access, class capacity, the modules involved, and what to clean up before kickoff.',
    summary:
      'Health clubs, boutique studios and multi-site chains. Recurring billing, contract freezes, door access, and the member data that has to be true before go-live.',
    intro:
      'Gyms rarely stall on screens. They stall on the membership book: freezes granted at the desk and never reversed, members who stopped paying months ago still training, and a class timetable living in an app the finance team cannot see. An Odoo rollout in fitness is a billing and access project first. Get the plan rules and the member balances right and everything after that is configuration.',
    pains: [
      {
        title: 'Freezes are granted at the desk',
        body: 'Travel, injury and exam season are handled by whoever is on reception. The end date never moves out, the allowance per plan is written down nowhere, and the club gives away weeks it never agreed to sell.',
      },
      {
        title: 'The door does not know the contract',
        body: 'A turnstile that only checks a card lets in expired, frozen and unpaid members. Reception is left to enforce arrears in front of a queue, so in practice nobody enforces anything.',
      },
      {
        title: 'Members leave without leaving',
        body: 'Minimum term and notice period are in the signed form and nowhere in the system. Cancellations surface as a failed collection weeks later, and the club argues about a notice period it cannot evidence.',
      },
      {
        title: 'Classes run on a whiteboard and a separate app',
        body: 'Capacity is sold twice, the waitlist is promoted by message, and no-shows cost a paid slot that could have gone to somebody else. None of it reaches the member record.',
      },
      {
        title: 'PT packages are a running argument',
        body: 'Sessions are sold as a block and ticked off on paper. Balances get disputed around the tenth session, and trainer commission is rebuilt from a notebook on the last day of the month.',
      },
    ],
    modules: [
      { slug: 'subscriptions', why: 'The membership itself: recurring invoicing, minimum term, notice period and renewal, so dues are raised by the system rather than remembered by a person.' },
      { slug: 'pos', why: 'Front desk sales that are not memberships: joining fees, day passes, supplements and kit, on the same customer record as the contract.' },
      { slug: 'accounting', why: 'Dues, failed collections, and annual plans that have to be recognised across the term instead of banked in month one.' },
      { slug: 'crm', why: 'Trials, walk-ins and enquiries as a pipeline with a follow-up, which is where most clubs lose the sale they already paid to attract.' },
      { slug: 'attendance', why: 'Trainer and instructor shifts against the timetable, which is what makes cover gaps and class pay calculable rather than negotiable.' },
      { slug: 'website', why: 'Online join-up, the public timetable and class booking, all reading the same plans and capacities sold at the desk.' },
      { slug: 'marketing-automation', why: 'Win-back on lapsed attendance and renewal reminders before expiry, driven by visit data rather than a mailing list.' },
    ],
    rollout: [
      { phase: 'Plans and the member book', body: 'Plan catalogue, joining fees, minimum terms, notice periods and freeze allowances written as rules. Then active members are migrated with true start dates, next due dates and balances. This phase decides whether the rest of the project is worth doing.' },
      { phase: 'Billing that runs without help', body: 'Recurring invoicing, payment collection, retry handling for failed payments, and a written arrears ladder. Run it in parallel with the old billing for one full cycle before the old one is switched off.' },
      { phase: 'Door, classes and personal training', body: 'Check-in validated against the contract, the timetable with capacity and waitlist, and PT packages with session balances and trainer pay. Access hardware is wired up here, once the contract data behind it is trustworthy.' },
      { phase: 'Retention and online', body: 'Online join-up, lapsed-member campaigns and churn reporting. Retention work on unreliable attendance data produces confident nonsense, so it goes last.' },
    ],
    prepare: [
      'The plan list as it is actually sold, including joining fee, minimum term, notice period, and how many freeze weeks each plan allows.',
      'An export of active members with start date, next due date, amount, payment method and anything outstanding.',
      'A written answer to one question: what happens at the door when a member is in arrears.',
      'The class timetable per studio with capacity, instructor, and the late-cancellation rule you intend to enforce.',
      'PT package balances per member and per trainer, agreed by both sides before migration rather than after.',
      'The make and model of the turnstile or access controller, and whether the vendor exposes an API or only a card file.',
    ],
    integrations: ['Stripe', 'HyperPay', 'PayTabs', 'WhatsApp Business', 'ZKTeco Biometric', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-pos-deployment', 'odoo-support'],
    solutionSlug: 'gym-fitness',
    solutionNote: 'For the feature view of memberships, class booking, check-in and trainer commission, read the solution page.',
    alsoSee: ['salon-spa', 'professional-services'],
    faqs: [
      {
        q: 'Can Odoo bill memberships automatically, including annual and family plans?',
        a: 'Yes. A plan carries its own term, price and billing frequency, and the invoice is raised on schedule without anyone opening the system. Family and corporate memberships bill one payer for several members, and annual plans can be recognised across the term so a January signup does not distort January.',
      },
      {
        q: 'Will the turnstile actually stop an unpaid member?',
        a: 'That depends on the hardware. Controllers with an open API can be checked live against the contract, so an expired, frozen or unpaid member is refused with a reason on the screen. Controllers that only accept a card list get updated on a schedule instead, which is slower but still automatic. We confirm which case applies during discovery, before it becomes a delivery commitment.',
      },
      {
        q: 'How do freezes work once they are rules instead of favours?',
        a: 'Each plan gets an allowance, a minimum and maximum freeze length, and a rule for whether billing pauses or continues. The contract end date moves out on its own when a freeze is approved, so the club stops losing weeks it never agreed to give away.',
      },
      {
        q: 'We use a separate class booking app that members like. Do we have to drop it?',
        a: 'Not necessarily. If it exposes an API we sync bookings and attendance so the member record stays complete. If it does not, keeping it means the club permanently owns two versions of who attended what, and we would rather move the timetable into Odoo than pretend that gap can be reconciled by hand.',
      },
      {
        q: 'How long does a single-club rollout take?',
        a: 'A single club with clean member data typically runs in a 6 to 10 week band, including one parallel billing cycle. Chains add time per site for hardware and staff training rather than for configuration, because the second club is a copy of the first.',
      },
    ],
  },

  /* ───────────── VETERINARY ───────────── */
  'veterinary-clinic': {
    h1: 'Odoo rollouts for veterinary practices',
    noun: 'veterinary',
    metaTitle: 'Odoo for Veterinary Clinics: rollout plan, modules, and patient data preparation',
    metaDescription:
      'How a small animal clinic, mixed practice or pet resort rolls out Odoo: pet and owner identity, dispensing that moves stock, vaccination recalls, insurance claims, and a sequence that protects the consulting room.',
    summary:
      'Small animal clinics, mixed practices and pet resorts. Pet and owner identity, dispensing that moves stock, vaccination recalls, and claims that actually get paid.',
    intro:
      'A veterinary rollout lives or dies on one modelling decision: the patient is the animal, the payer is the owner, and the two change independently. Practices that get it wrong spend the next two years with split clinical histories and a recall list nobody trusts. The second decision is dispensing. Until product handed over in the consulting room leaves stock as it is handed over, neither the batch trail nor the margin on a treatment is real.',
    pains: [
      {
        title: 'The record is filed under the owner',
        body: 'A household with four animals ends up with one history. A pet that changes hands loses its past. The vet opens a screen that is missing the thing they most needed to see.',
      },
      {
        title: 'Recalls depend on somebody remembering',
        body: 'Booster dates sit in a diary or a card box. Nobody can produce a due and overdue list on demand, so the practice loses visits it has already earned and the owner assumes nothing was needed.',
      },
      {
        title: 'Dispensing never reaches stock',
        body: 'Product given at the consult is written on the notes and taken off the shelf. Batch and expiry go unrecorded, reorder points mean nothing, and a wholesaler recall turns into a search through paper.',
      },
      {
        title: 'What was used is not what was billed',
        body: 'Consumables, sutures, sedation and the second syringe are charged from memory when the invoice is raised later. The leak is small per visit, permanent, and impossible to size after the fact.',
      },
      {
        title: 'Boarding, grooming and lab are three separate books',
        body: 'Kennel occupancy is a wall chart, grooming is a different diary, outside lab results arrive by email. Nothing joins back to the animal, so both the clinical picture and the bill get assembled by hand.',
      },
    ],
    modules: [
      { slug: 'appointments', why: 'The diary per vet, per consulting room and per groomer, with double booking refused rather than resolved by phone call.' },
      { slug: 'inventory', why: 'Batch, expiry and unit of issue on everything dispensed, so stock moves at the moment of dispensing and a recall becomes a query rather than a search.' },
      { slug: 'purchase', why: 'Wholesaler ordering against real reorder points, with pack size and price movement visible before they quietly change the margin on a treatment.' },
      { slug: 'accounting', why: 'Owner invoices raised from the visit, with insurance receivables tracked apart from what the owner personally owes.' },
      { slug: 'documents', why: 'Consent forms, referral letters, imaging and outside lab reports held against the animal instead of in a shared drive.' },
      { slug: 'sign', why: 'Consent for anaesthesia and procedures signed and stored against the visit with an audit trail, which removes the paper file and the argument that comes with it.' },
      { slug: 'marketing-automation', why: 'Vaccination and parasite reminders sent from the due list itself, so the recall runs whether or not reception has time this week.' },
    ],
    rollout: [
      { phase: 'Owner and patient spine', body: 'Owners, animals, species and breed lists, and the link between them that survives a change of ownership. Deduplication rules are agreed here in writing. Nothing clinical moves until this is settled.' },
      { phase: 'Consulting room and dispensing', body: 'Visit notes, vitals, prescriptions, and the products that leave stock as they are handed over. The practice sees the value of the project in this phase, and it is also where working habits actually have to change.' },
      { phase: 'Money and the other services', body: 'Invoicing from the visit, insurance claims tracked through to settlement, then boarding, grooming and lab requests joined back to the same animal record.' },
      { phase: 'Recalls and reporting', body: 'Vaccination protocols per species, due and overdue lists, owner reminders, and reporting on revenue per vet and per service once the underlying data is trusted.' },
    ],
    prepare: [
      'An export of owners and animals with microchip number, species, breed, date of birth, and which owner pays.',
      'A written deduplication rule: what makes two owner records the same household.',
      'The current price list for consults, procedures and boarding nights, agreed by whoever actually sets prices.',
      'The dispensing list with pack size, unit of issue, and current stock by batch and expiry.',
      'Vaccination protocols per species as the practice runs them, including the interval between doses.',
      'Open insurance claims with what has been submitted and what is still outstanding.',
    ],
    integrations: ['Stripe', 'PayTabs', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-training', 'odoo-support'],
    solutionSlug: 'veterinary-clinic',
    solutionNote: 'For the feature view of patient records, consultations, vaccination schedules, prescriptions and claims, read the solution page.',
    alsoSee: ['clinic-management', 'pharmacy'],
    faqs: [
      {
        q: 'Can the system treat the animal as the patient and the owner as the payer?',
        a: 'Yes, and it should. The animal carries the clinical history, the weight trend, the allergies and the microchip. The owner carries the invoices and the contact details. They are linked but separate, so a change of ownership moves the payer without splitting the history.',
      },
      {
        q: 'Does dispensing come out of stock automatically?',
        a: 'Yes. A prescription records dose, route, frequency, duration and total quantity, and that quantity leaves stock with its batch and expiry. Reorder points then mean something, and a supplier recall can be answered with a list instead of a search.',
      },
      {
        q: 'How are vaccination reminders handled?',
        a: 'Protocols per species schedule the next due date when a dose is given, and reminders go out from the due list on a schedule. That list doubles as a workload plan, because overdue animals are visits the practice has already earned and not yet booked.',
      },
      {
        q: 'We run boarding and grooming as well as the clinic. Does that fit in one system?',
        a: 'Yes. Boarding runs as occupancy with feeding and medication plans, grooming runs on the same diary as consults, and both invoice to the same owner account. The gain is that a stay and a treatment appear on one animal record, which is exactly what a separate boarding book prevents.',
      },
      {
        q: 'How long does a practice rollout take?',
        a: 'A single site typically runs in a 6 to 10 week band. Multi-site practices add time for the shared owner and animal master rather than for configuration, and practices with paper-only histories spend the extra weeks on data entry decisions, not on software.',
      },
    ],
  },

  /* ───────────── LAUNDRY & DRY CLEANING ───────────── */
  'laundry-dry-cleaning': {
    h1: 'Odoo rollouts for laundries and dry cleaners',
    noun: 'laundry and dry cleaning',
    metaTitle: 'Odoo for Laundry and Dry Cleaning: rollout plan, modules, and piece-level tracking',
    metaDescription:
      'How a dry cleaner, wash and fold shop or hotel linen plant rolls out Odoo: piece-level tagging, plant stages, collection routes, contract billing, the modules involved, and what to prepare before kickoff.',
    summary:
      'High street shops, wash and fold, linen plants and collection routes. Piece-level tagging, plant stages, rack locations, and contract billing that stops being rebuilt by hand.',
    intro:
      'Almost every problem in a laundry traces back to the same shortcut: the ticket records five shirts instead of five garments. Once a piece has no identity, it cannot be traced past sorting, its condition cannot be evidenced, and rework cannot be counted. An Odoo rollout here starts at the counter with tagging, moves through the plant stage by stage, and only then touches routes and contract invoicing.',
    pains: [
      {
        title: 'A ticket is not a garment',
        body: 'The order says five shirts. When four come back, nothing tells you where the fifth stopped moving. The shop pays out on a claim it cannot investigate and writes it off as a cost of trading.',
      },
      {
        title: 'Condition is remembered, not recorded',
        body: 'Existing stains, missing buttons and worn seams are noticed at intake and never written down. Every claim then becomes the word of the customer against the word of whoever was on the counter that Tuesday.',
      },
      {
        title: 'The order is somewhere on the rack',
        body: 'At six in the evening staff walk the rails while a queue builds. Nothing records which rack and slot a packed order went to, so the fastest part of the job is the part that takes longest.',
      },
      {
        title: 'Rework and late orders are never counted',
        body: 'A rewash costs the plant twice and is recorded nowhere. Turnaround is measured against the promise only when a customer complains, so nobody can say which service, branch or shift is actually losing money.',
      },
      {
        title: 'Contract accounts are billed from a folder',
        body: 'Hotel and corporate work is invoiced monthly by adding up delivery notes. Disputed lines get credited to keep the account, and the margin on the biggest customers is the least understood number in the business.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'The counter: intake, payment, deposits and collection, with the tag printed at the moment the customer is still standing there to confirm condition.' },
      { slug: 'barcode', why: 'Scanning a piece or a whole order between plant stages, which is what turns a paper docket process into a location history per garment.' },
      { slug: 'inventory', why: 'Consumables, packaging, hangers and solvent, plus owned linen stock for hire contracts, so plant cost per piece is a real number.' },
      { slug: 'sales', why: 'Contract accounts for hotels and corporates with their own agreed rates, quoted and renewed rather than remembered.' },
      { slug: 'accounting', why: 'Consolidated monthly invoicing per account and per branch, raised from the work recorded rather than assembled from delivery notes.' },
      { slug: 'field-service', why: 'Collection and delivery visits with a driver, a run of stops, time windows and proof of collection at the door.' },
      { slug: 'website', why: 'Online pickup requests and order status for retail customers, feeding the same route plan the driver already works from.' },
    ],
    rollout: [
      { phase: 'Counter and tagging', body: 'Service and garment price list, intake screen, condition capture, tag printing and rack naming. Piloted in one shop for a full week including a Saturday, because the counter is where the process either sticks or quietly reverts to paper.' },
      { phase: 'Plant stages', body: 'Sorting, cleaning, pressing, quality check and packing as scan points, with workload per stage and turnaround measured against the promised date. Rework gets a reason code here, which is usually the first honest cost number the business has ever had.' },
      { phase: 'Routes and contract accounts', body: 'Drivers, vehicles, stops and time windows, then hotel and corporate rates with consolidated invoicing. Contract billing goes live one account at a time, in parallel with the folder, until the numbers agree.' },
      { phase: 'Online and branch reporting', body: 'Customer pickup requests, order status, and reporting per branch, per service and per shift. Left until the plant data is trustworthy, because a status page that lies is worse than none.' },
    ],
    prepare: [
      'The price list per garment type and service, including express and same-day surcharges as you actually charge them.',
      'A decision on how a piece is tagged: printed barcode tag, heat seal or permanent label, and who applies it.',
      'Rack and slot naming for each branch, physically labelled before go-live rather than agreed in a meeting.',
      'Contract rates per hotel and corporate account, with what the current monthly invoice is built from.',
      'The promised turnaround per service, as advertised to customers, not the one the plant achieves on a good day.',
      'A written rule for who authorises a damage or loss claim and up to what value.',
    ],
    integrations: ['Stripe', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'Power BI'],
    services: ['odoo-pos-deployment', 'odoo-implementation', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'laundry-dry-cleaning',
    solutionNote: 'For the feature view of garment tagging, plant stages, express pricing and route delivery, read the solution page.',
    alsoSee: ['hotel-hospitality', 'retail-stores'],
    products: ['wt-pos-dashboard'],
    faqs: [
      {
        q: 'Do we really have to tag every single piece?',
        a: 'For dry cleaning and shirt service, yes. Piece-level identity is the whole point: it is what makes a lost garment traceable, a claim answerable, and a rack location findable. Wash and fold by weight is different and can stay at order level, and most shops run both models side by side.',
      },
      {
        q: 'Can we price per piece, per kilo and per square metre at the same counter?',
        a: 'Yes. The unit belongs to the service, so shirts price per piece, wash and fold per kilo, and curtains and rugs per square metre, with the counter picking the service rather than doing the arithmetic.',
      },
      {
        q: 'How do hotel and corporate contracts get billed?',
        a: 'Each account carries its own rates, and the month accumulates against it as work is recorded. One consolidated invoice is raised at the period end with the detail behind it, so a disputed line points back to a specific order and date instead of a delivery note somebody has to find.',
      },
      {
        q: 'Will drivers and counter staff actually use it?',
        a: 'Only if the scan is faster than the paper it replaces. That is a hardware and screen-layout question, so we pilot the counter flow with the real queue in one branch and fix what slows it down before any other branch is touched.',
      },
      {
        q: 'How long does a rollout take for a chain of shops?',
        a: 'A first branch plus the plant typically runs in a 6 to 10 week band. Remaining branches go in batches after that, and the cost per branch is mostly tagging hardware and two days of counter training rather than configuration.',
      },
    ],
  },

  /* ───────────── CAR WASH ───────────── */
  'car-wash': {
    h1: 'Odoo rollouts for car wash and detailing operators',
    noun: 'car wash',
    metaTitle: 'Odoo for Car Wash Operators: rollout plan, modules, and forecourt setup',
    metaDescription:
      'How a car wash or detailing operator rolls out Odoo: bay allocation, wash packages and monthly plans, staff commission, fleet accounts, the modules involved, and what to prepare before kickoff.',
    summary:
      'Single sites, forecourt washes and detailing chains. Bay allocation, monthly wash plans, staff commission, and fleet accounts billed from real jobs.',
    intro:
      'A car wash is a queue with a price list attached. Everything that goes wrong is a sequencing or an evidence problem: which bay takes the next car, whether the plan in the glovebox is still valid, who did the work, and what the vehicle looked like before it went in. An Odoo rollout here starts on the forecourt with the job and the payment, then adds plans, accounts and commission once the job record is reliable.',
    pains: [
      {
        title: 'Bays are allocated by whoever shouts loudest',
        body: 'At peak nobody knows which bay frees up next or how long the job in it takes. Cars are washed out of order, the customer who booked waits behind a walk-in, and the site looks busier than it is earning.',
      },
      {
        title: 'The monthly plan lives in the glovebox',
        body: 'Unlimited and multi-wash plans are sold on a card with no way to check validity at the entrance. Staff wave people through rather than argue, so the plan gets used past expiry and shared between vehicles.',
      },
      {
        title: 'Damage claims have no before record',
        body: 'A scratch is reported after collection and nothing captured at arrival can prove it was already there. The site pays out or loses the customer, and the same argument recurs a few times a month.',
      },
      {
        title: 'Commission is rebuilt from a notebook',
        body: 'Who washed which car, and which extras were upsold, is reconstructed on a Sunday night. Payroll is late, staff dispute the figures, and the incentive stops driving behaviour because nobody trusts it.',
      },
      {
        title: 'Fleet accounts pay against a pile of job slips',
        body: 'Taxi firms, dealerships and corporate fleets settle monthly. The invoice is typed from slips, the customer queries half of it, and the discount that was agreed verbally reappears in every negotiation.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'Payment at the desk or on the forecourt, with the service, the vehicle and the operator captured on the same ticket instead of on a slip.' },
      { slug: 'appointments', why: 'Booked slots against bay capacity and real service durations, so the queue is planned rather than negotiated at the entrance.' },
      { slug: 'subscriptions', why: 'Monthly and unlimited wash plans that renew, expire and can be validated on arrival instead of taken on trust.' },
      { slug: 'sales', why: 'Fleet and dealership accounts with agreed rates and terms, quoted once and applied to every job that account brings in.' },
      { slug: 'inventory', why: 'Chemicals, foam, wax and consumables drawn against wash volume, which is the only way to see cost per wash rather than a monthly chemicals bill.' },
      { slug: 'accounting', why: 'Daily takings, plan billing and monthly account invoicing landing in one ledger, with the job detail still attached when a customer queries a line.' },
      { slug: 'attendance', why: 'Shifts and hours per operator, which is the base the commission rules are calculated against instead of a notebook.' },
    ],
    rollout: [
      { phase: 'The forecourt', body: 'Service menu with a realistic duration per service, bays, operators, the payment flow and the receipt. Traded live for a week including a weekend peak, because a car wash system that slows the entrance will be abandoned by Saturday.' },
      { phase: 'Plans and accounts', body: 'Wash plans with terms and renewal, validation at arrival, then fleet and dealership accounts with their rates. Existing plan holders are migrated with true expiry dates, which is usually the first time the site learns how many are running past them.' },
      { phase: 'Staff, consumables and commission', body: 'Operator assignment per job, commission rules written down and calculated from job data, and chemical usage against wash volume. Run one month in parallel with the notebook before anyone is paid from the system.' },
      { phase: 'Booking and reporting', body: 'Online booking, reminders, and reporting on revenue per bay, per service and per hour of the day. This is what tells the operator whether to add a bay or reprice the peak.' },
    ],
    prepare: [
      'The service menu with the time each service actually takes in a bay, measured rather than estimated.',
      'Plan terms as sold: price, duration, what counts as unlimited, and whether the plan is tied to one vehicle.',
      'A list of current plan holders with expiry dates, including the ones you suspect have run out.',
      'Fleet and dealership accounts with the rates agreed and who signed off on them.',
      'Commission rules in writing: per wash, per upsell, or a percentage, and what happens when two operators share a job.',
      'Hardware per lane: terminal, receipt printer, and whether the site takes card at the bay or only at the desk.',
    ],
    integrations: ['Stripe', 'Mada', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'Power BI'],
    services: ['odoo-pos-deployment', 'odoo-implementation', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'car-wash',
    solutionNote: 'For the feature view of bookings, wash packages, bay allocation and staff commission, read the solution page.',
    alsoSee: ['automotive-workshop', 'retail-stores'],
    products: ['wt-car-wash-pos', 'wt-pos-dashboard'],
    faqs: [
      {
        q: 'Can monthly wash plans be checked at the entrance?',
        a: 'Yes. A plan is held against the customer and the vehicle, so scanning or searching the plate at arrival shows whether it is live, expired or already used today, and what the plan includes. That single check is usually what pays for the project on a busy site.',
      },
      {
        q: 'How is staff commission calculated?',
        a: 'From the job record: which operator was assigned, what service was sold, and which extras were added. Rules can pay per wash, per upsell or as a percentage, and a shared job can be split. Because it comes from the same data as the invoice, the figure is arguable in one direction only.',
      },
      {
        q: 'Can we capture vehicle condition before the wash?',
        a: 'Yes. Photos and noted damage are attached to the job at arrival, against the plate. It takes seconds at the entrance and it ends the claim argument, which for most sites is the difference between paying out and not.',
      },
      {
        q: 'We wash for taxi fleets and a dealership on account. How does that bill?',
        a: 'The account carries its rates, jobs accumulate against it during the month, and one invoice is raised with the vehicle, date and service behind every line. Queries are answered from the job, not from a slip somebody has to find in a drawer.',
      },
      {
        q: 'How long does a single-site rollout take?',
        a: 'A single site typically runs in a 4 to 8 week band. Multi-site operators add roughly a week per site for hardware and training, since the second site copies the configuration of the first rather than repeating the design work.',
      },
    ],
  },

  /* ───────────── COWORKING & FLEXIBLE WORKSPACE ───────────── */
  'coworking-space': {
    h1: 'Odoo rollouts for coworking and serviced office operators',
    noun: 'coworking',
    metaTitle: 'Odoo for Coworking Operators: rollout plan, modules, and the monthly billing run',
    metaDescription:
      'How a coworking or serviced office operator rolls out Odoo: desk and room inventory, membership plans with credits, company accounts, one monthly invoice per payer, occupancy, and what to prepare first.',
    summary:
      'Coworking floors, serviced offices and managed workspace. Desk and room inventory, plans with credits, company accounts, and one monthly invoice per payer.',
    intro:
      'Coworking operators run a property business with a subscription business bolted on, and the two are usually kept in different files. The desk list is a spreadsheet, the rooms are in a shared calendar, and the month end is a person rebuilding invoices from both. An Odoo rollout here is about making the space itself a set of records with rates on them, and then letting the billing run read from what actually happened in the building.',
    pains: [
      {
        title: 'The desk list is a spreadsheet',
        body: 'Who sits where, on which plan, at what price, and when their notice period starts. It is maintained by one person, it is wrong within a fortnight, and renewals are missed because nothing prompts anybody.',
      },
      {
        title: 'Meeting rooms clash',
        body: 'A shared calendar has no concept of turnaround between bookings, no seat limit and no member credits. Two bookings land on one room, a member walks into a room being reset, and the operator apologises rather than charges.',
      },
      {
        title: 'Credits and allowances are settled by argument',
        body: 'Meeting room hours, printing and guest passes are included up to a point that nobody can evidence at month end. The overage is either waived to keep the peace or invoiced and then credited.',
      },
      {
        title: 'The monthly invoice is rebuilt by hand',
        body: 'Plan fees, room overage, printing, parking, lockers, mail handling and day passes are keyed per account. Company accounts covering several members are the worst of it, and something is always billed twice or not at all.',
      },
      {
        title: 'Nobody can say who is in the building',
        body: 'Access cards are issued and rarely revoked, the head count at the front desk is a guess, and mail and address clients are logged in a notebook. There is no record of which identity document was seen for which company, or when it expires.',
      },
    ],
    modules: [
      { slug: 'subscriptions', why: 'Plans as recurring contracts with a term and a notice period, so renewals and price changes happen on schedule rather than when somebody remembers.' },
      { slug: 'appointments', why: 'Room and desk booking with capacity, opening hours and a turnaround gap, which is what a shared calendar cannot enforce.' },
      { slug: 'pos', why: 'Day passes, coffee, printing top-ups and walk-in sales at the front desk, on the member or company account where they belong.' },
      { slug: 'accounting', why: 'One invoice per payer at period end, gathering plan fees, overage and add-ons, with every source record stamped so nothing is billed twice.' },
      { slug: 'sign', why: 'Membership agreements and address service paperwork signed and stored against the account, with the identity documents held in the same place.' },
      { slug: 'helpdesk', why: 'Member requests and building faults as tickets with an owner and a response time, instead of a message to the community manager phone.' },
      { slug: 'website', why: 'Self-serve booking, credit balances and day pass purchase, so the front desk stops being the booking system.' },
    ],
    rollout: [
      { phase: 'Inventory the space', body: 'Every desk bank, private office, phone booth, meeting room and event space as a record with seats, rate, minimum booking, opening hours and turnaround. Tedious, unavoidable, and the phase that makes every later phase possible.' },
      { phase: 'Members, plans and company accounts', body: 'Plans with their credits and allowances, then members migrated with start dates, notice periods, payer and card numbers. Company accounts are modelled here so one payer can carry several members from day one.' },
      { phase: 'The billing run', body: 'Credits consumed before money, overage priced at the plan rate, add-ons and day passes gathered, one invoice per payer, allowances reset. Run in parallel with the manual invoice for one month, line by line, until they match.' },
      { phase: 'Access, occupancy and the address service', body: 'Check-in and check-out for live occupancy, access card issue and revocation, mail logging, and the registered address records with their identity documents and expiry dates.' },
    ],
    prepare: [
      'A floor plan with every seat and room named as staff refer to them, plus the rate and capacity of each.',
      'The plan list with what each one includes: meeting room credits, printing allowance, guest passes and access hours.',
      'The current member list with payer, start date, notice period, desk assigned and access card number.',
      'The add-on price list: parking, lockers, mail handling, printing overage and event space hire.',
      'The access control system make and model, and whether cards can be issued and revoked through an API.',
      'The mail and registered address client list, with which identity documents are on file and when each expires.',
    ],
    integrations: ['Stripe', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-saas-hosting', 'odoo-support'],
    solutionSlug: 'coworking-space',
    solutionNote: 'For the feature view of desks, rooms, membership plans, credits and occupancy, read the solution page.',
    alsoSee: ['real-estate', 'professional-services'],
    faqs: [
      {
        q: 'Can one company pay for several members on a single invoice?',
        a: 'Yes, and it is the normal case once an operator has any corporate clients. Members sit under a company account, each keeps their own record, credits and access, and the billing run raises one invoice to the company with the member detail behind it.',
      },
      {
        q: 'How are meeting room credits and overage handled?',
        a: 'Credits are consumed first and only then does a booking start costing money, at the overage rate on the plan. Cancellations inside the window are charged at the percentage you set, because the room sat empty either way. All of it lands on the same monthly invoice.',
      },
      {
        q: 'Can it drive our access control system?',
        a: 'Where the vendor exposes an API, cards can be issued and revoked from the member record, and check-in gives a live head count per building. Where it does not, we sync a card list on a schedule instead. We confirm which one applies during discovery rather than assuming.',
      },
      {
        q: 'Does it cover mail handling and registered address clients?',
        a: 'Yes. The address service is its own record against a legal entity, with the identity documents seen, who saw them and when they expire, and every letter or parcel logged against the company it was addressed to with who collected it. Requirements for that service differ by country, so we scope those with you rather than assuming them.',
      },
      {
        q: 'How long does a rollout take for a single building?',
        a: 'A single building typically runs in a 6 to 10 week band, including one parallel billing month. Multi-building operators add configuration time per site but reuse the plan catalogue and the billing run, so the second building is materially faster than the first.',
      },
    ],
  },

  /* ───────────── EVENTS & WEDDINGS ───────────── */
  'event-management': {
    h1: 'Odoo rollouts for event and wedding planners',
    noun: 'events',
    metaTitle: 'Odoo for Event Planners: rollout plan, modules, and event data preparation',
    metaDescription:
      'How an events agency, wedding planner, caterer or venue rolls out Odoo: the booking diary, package margin, supplier paperwork, crew rosters, payment milestones, and the sequence to follow.',
    summary:
      'Agencies, wedding planners, caterers and venues. A diary that refuses clashes, package margin you can see before you sell, and milestones that get chased.',
    intro:
      'Event businesses are usually well run and badly recorded. The team knows what is happening this weekend and nobody can tell you what last quarter earned, because the enquiry was in an inbox, the budget in a spreadsheet, and the supplier costs in a folder. An Odoo rollout in events puts the event file at the centre: one record that carries the diary slot, the package, the budget, the crew and the money, so margin per event stops being an annual guess.',
    pains: [
      {
        title: 'The diary is a wall planner',
        body: 'A provisional enquiry holds a room for weeks and blocks a paying booking. Two events land in the same suite because nobody counted the turnaround between a strip-down and the next set-up. The clash is discovered at the worst possible moment.',
      },
      {
        title: 'Package margin is known only afterwards',
        body: 'Inclusions are priced against what the market pays and never against what they cost. A package can be sold forty times before anyone works out it loses money on the drinks or the crew hours.',
      },
      {
        title: 'Supplier paperwork expires quietly',
        body: 'Public liability cover and trade licences are checked at onboarding and never again. The lapse surfaces on the morning of the job, when the only options are all bad.',
      },
      {
        title: 'Final numbers arrive late and change twice',
        body: 'The kitchen orders and the crew is rostered against a headcount that moves after the deadline. Dietary requirements are reconciled over the phone, and the extra covers are absorbed rather than charged.',
      },
      {
        title: 'Deposits and stage payments are chased from a spreadsheet',
        body: 'A date gets held without the deposit, an event runs with the balance unpaid, and the conversation about money happens after the last guest leaves, which is the worst time to have it.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Enquiries as a pipeline with a value, a date and a follow-up, so a provisional hold is a stage rather than a pencil mark on a planner.' },
      { slug: 'sales', why: 'Packages quoted per head or as a flat fee, with the inclusions and the payment schedule on the document the client actually signs.' },
      { slug: 'project', why: 'One file per event carrying the run sheet, the tasks, the owners and the deadlines, which is where a planner already works mentally.' },
      { slug: 'purchase', why: 'Supplier quotes requested and accepted against a budget heading, so committed cost is visible while it can still be changed.' },
      { slug: 'planning', why: 'Crew rosters built from guest numbers with call times per role, and no-shows recorded against the shift rather than remembered.' },
      { slug: 'rental', why: 'Hire stock allocated across the whole event window, loaded out and booked back in, with anything missing landing on the event cost.' },
      { slug: 'accounting', why: 'Deposits, stage invoices and the chase on overdue milestones, plus gross margin per event once supplier and crew cost are attached to it.' },
    ],
    rollout: [
      { phase: 'Enquiry to signed contract', body: 'Venues and function suites with capacities and turnaround, packages with the cost of every inclusion, the quote document, and the deposit rule that holds a date. Get this right and the diary stops lying.' },
      { phase: 'The event file', body: 'Budget by heading, supplier quotes and accepted costs, run sheet, and the documents the client and the crew both work from. This is the phase that turns a planner memory into a record somebody else can pick up.' },
      { phase: 'Delivery', body: 'Crew rosters and call times from guest numbers, hire stock out and back, final numbers deadline with dietary totals for the kitchen. Tested on a real event with the old process still running alongside.' },
      { phase: 'Money and margin', body: 'Payment milestones, automated chasing, and gross margin reported per event type, per venue and per package. Reporting comes last because margin built on incomplete supplier cost is worse than no number at all.' },
    ],
    prepare: [
      'Every venue and function suite with capacity, layouts, access time, curfew and the turnaround needed between events.',
      'The package list with each inclusion and what that inclusion costs you, not just what it sells for.',
      'The supplier list with insurance and licence expiry dates, and who is authorised to accept a quote.',
      'Crew roles with the ratio to guest numbers and the pay rate for each, as the business actually staffs an event.',
      'Hire stock with replacement values, so loss and breakage land somewhere instead of disappearing.',
      'Payment terms in writing: deposit to hold a date, stage percentages, and when the final balance is due.',
      'Open and confirmed events with what has been invoiced and what has been paid, before any cutover date is set.',
    ],
    integrations: ['Stripe', 'PayTabs', 'HyperPay', 'WhatsApp Business', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-training', 'odoo-support'],
    solutionSlug: 'event-management',
    solutionNote: 'For the feature view of the booking diary, packages, run sheets, guest lists and event budgets, read the solution page.',
    alsoSee: ['hotel-hospitality', 'restaurant-fnb'],
    faqs: [
      {
        q: 'Can the diary stop us double booking a venue?',
        a: 'Yes, and it counts the turnaround rather than the calendar day. A suite that needs four hours to strip and reset is not free the moment the last guest leaves, so the check runs against the whole occupied window including set-up and break-down.',
      },
      {
        q: 'How do we see whether a package makes money before we sell it?',
        a: 'By costing the inclusions. Each item in a package carries what it costs you, so the quote shows margin at the point of sale and the event budget starts populated. Once supplier quotes are accepted against budget headings, committed cost is visible while there is still time to act on it.',
      },
      {
        q: 'Can it track supplier insurance and licence expiry?',
        a: 'Yes. Expiry dates sit on the supplier record with a job that flags them before they lapse, and a supplier whose cover has run out cannot be accepted onto a job. That check is worth more than most of the reporting.',
      },
      {
        q: 'We also run ticketed conferences, not just private functions. Does that fit?',
        a: 'Yes. Ticketed events use the Odoo Events app for registration and attendee lists, while private functions run on the event file with packages and run sheets. Both bill through the same ledger, so the business sees one revenue picture rather than two.',
      },
      {
        q: 'How long does a rollout take for an events business?',
        a: 'A single agency or venue typically runs in a 6 to 10 week band, with the package costing work being the part most teams underestimate. Businesses that already know what their inclusions cost move faster than ones discovering it during the project.',
      },
    ],
  },
};
