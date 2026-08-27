import type { IndustryDetail } from '~/data/industries-detail';

/* ─────────────────────────────────────────────────────────────
 * PROFESSIONAL & PROJECT SERVICES industry detail.
 *
 * Spread into INDUSTRY_DETAIL. Read the header comment of
 * industries-detail.ts before editing this file. Two rules carry
 * over and are not negotiable here:
 *
 *   1. /industries/<slug>/ answers HOW a firm in this sector gets
 *      Odoo running. The feature checklist lives on the matching
 *      /solutions/<slug>/ page, reached via solutionSlug. Never
 *      restate it here.
 *   2. No tax rate, tax name, percentage, scheme name, threshold,
 *      deadline, mandate or government portal appears in this
 *      file. These six sectors are full of tempting examples:
 *      client account rules, premium taxes, margin taxation,
 *      import duty, export approvals, statutory inspections.
 *      All of them are deferred to /services/odoo-localization/
 *      and confirmed with the client, not stated here.
 * ───────────────────────────────────────────────────────────── */

export const PROFESSIONAL_INDUSTRIES: Record<string, IndustryDetail> = {
  /* ───────────── LEGAL PRACTICE ───────────── */
  'legal-practice': {
    h1: 'Odoo rollouts for law firms and legal practices',
    noun: 'legal practice',
    metaTitle: 'Odoo for Law Firms: rollout plan, modules, and what to prepare',
    metaDescription:
      'How a law firm actually rolls out Odoo: conflict checks and matter opening, time recording that fee earners will use, client money kept apart from office money, and the sequence that gets there.',
    summary:
      'Solicitors, chambers and in-house teams. Matter opening and conflict checks, time that gets recorded, client money kept separate, and bills that stand up to assessment.',
    intro:
      'A law firm rarely buys software because the screens are wrong. It buys because the hours are recorded from memory on a Friday, the client account is reconciled in a spreadsheet, and nobody can say how much unbilled work is sitting on the files. An Odoo rollout for a practice is therefore two projects: getting the matter and money structure right, and getting fee earners to record time on the day they do the work. The first is our problem. The second decides whether the project pays for itself.',
    pains: [
      {
        title: 'Time is written up from memory',
        body: 'Work happens on the phone, in the corridor and on the train, then gets typed up days later. What survives is the hour somebody remembered, not the six minutes they actually spent. The gap never appears on a report because it was never recorded to begin with.',
      },
      {
        title: 'The conflict check leaves no trace',
        body: 'Someone searches the files they happen to know about and says it looks clear. Two years later the only questions anyone asks are who ran the search, when, and what came back. None of the three has an answer.',
      },
      {
        title: 'Client money lives outside the ledger',
        body: 'Money on account, payments made for the client and transfers to office are tracked on a spreadsheet next to a bank statement. A file that has gone below nothing is found at the next reconciliation rather than refused at the moment somebody tried to post it.',
      },
      {
        title: 'Disbursements are reported as income',
        body: 'Court fees, counsel, experts and searches are money laid out for the client and recovered at cost. Booked to the same revenue account as fees, they inflate turnover and destroy any honest view of what the firm earns per hour.',
      },
      {
        title: 'Key dates sit in one person’s diary',
        body: 'Hearings, filing dates and the limitation date that ends the claim live in an individual calendar. When that person is on holiday or leaves, the file does not stop running. This is the risk that closes firms, and it is the one most often managed informally.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Enquiries as a pipeline with the opening checks attached, so a new instruction cannot become a matter before the conflict search and the engagement letter exist.' },
      { slug: 'project', why: 'The matter itself: practice area, responsible fee earner, supervising partner, parties, and the key dates that raise activities ahead of time rather than on the morning they fall due.' },
      { slug: 'timesheets', why: 'Time recorded against the matter as it happens, timer or typed, rounded to the firm’s charging unit and carrying a narrative the client can read.' },
      { slug: 'accounting', why: 'Fees, disbursements and client money each posted to their own accounts, so recovered outlay is never reported as turnover and the client ledger is not a spreadsheet.' },
      { slug: 'documents', why: 'A file index per matter: what the firm holds, which originals are in the strongroom, and who signed them out.' },
      { slug: 'sign', why: 'Engagement letters, retainers and settlement paperwork signed with an audit trail, which is what removes days of courier time from every file opening.' },
      { slug: 'knowledge', why: 'Precedents, checklists and the firm’s own way of running a file type, held where a new joiner will actually find it.' },
    ],
    rollout: [
      { phase: 'Clients, matters and the opening checks', body: 'Client master, matter numbering, practice areas, the conflict search and the due diligence a file cannot open without. Everything else attaches to the matter record, so this phase decides how good every later report is.' },
      { phase: 'Time recording and the diary', body: 'Rate cards in the order they apply, charging unit, narratives, non-billable reasons, and the key date reminders. This is the adoption phase. It needs a partner visibly recording their own time in the first week, not a memo.' },
      { phase: 'Disbursements, client money and bills', body: 'Opening balances loaded at a single stated cutover date and reconciled to the bank before anything is posted, then bills of costs assembled from real time and outlay rather than typed up.' },
      { phase: 'Work in progress and realisation reporting', body: 'Unbilled value, write-offs, lock-up and recovery per fee earner and per practice area. Last, because a realisation figure is only honest once the write-offs behind it are being recorded properly.' },
    ],
    prepare: [
      'The matter list with responsible fee earner and current status, including the files that should have been closed years ago.',
      'Rate cards as they actually apply: rates agreed with a client, department rates, individual rates, and the date each one started.',
      'Unbilled time and unrecovered disbursements per matter at a single stated cutover date.',
      'The client account balance per client at that same date, reconciled to the bank by your cashier before anyone signs it off.',
      'Every key date already in the diary, particularly limitation dates. Assume the list you are handed is incomplete and check it against the files.',
      'A decision on the charging unit, and on who may write off work and above what value.',
    ],
    integrations: ['Stripe', 'PayTabs', 'WhatsApp Business', 'QuickBooks', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-training', 'odoo-support'],
    solutionSlug: 'legal-practice',
    solutionNote: 'For the feature view of conflict checks, matters, time recording, client account and bills of costs, read the solution page.',
    alsoSee: ['professional-services', 'real-estate'],
    products: ['wt-crm-dashboard', 'wt-project-dashboard'],
    faqs: [
      {
        q: 'Can client money be kept genuinely separate from the firm’s own accounts?',
        a: 'Yes. Client funds are held on their own ledger per client, apart from the office accounts, with transfers to office only permitted against a bill that has already been delivered. Exactly which rules your practice has to satisfy is a jurisdiction question that we confirm with whoever owns compliance in your firm before configuring it, rather than assuming.',
      },
      {
        q: 'How do you get fee earners to actually record time?',
        a: 'By making it faster than not doing it: a timer on the matter, a narrative that autofills from the activity, and a daily figure each person can see. The rest is management. We build the reporting that shows recorded hours per fee earner per day from week one, because the firms that fix this fix it in the first month or never.',
      },
      {
        q: 'Can we run hourly, fixed fee and capped matters in the same firm?',
        a: 'Yes, and most firms do. The billing basis sits on the matter, and a cap is enforced at the point a bill would take the file past it rather than discovered afterwards. Time is still recorded on fixed fee work, because that is the only way to know whether the fixed fee was right.',
      },
      {
        q: 'Does the conflict check have to be a manual search?',
        a: 'No. The names on both sides are searched against every file the firm holds, not only the ones the person searching has rights to see, and the search is stored as a record with its date, its searcher and its results. Going ahead despite a match requires a written reason. That record is the point of the exercise.',
      },
      {
        q: 'How long does a law firm rollout take?',
        a: 'A practice of ten to forty fee earners typically runs in the 8 to 12 week band for matters, time recording and billing, with reporting following once a full billing cycle has run. Firms whose client account has never been reconciled to the ledger spend the extra time there, not on the software.',
      },
    ],
  },

  /* ───────────── INSURANCE BROKERAGE ───────────── */
  'insurance-brokerage': {
    h1: 'Odoo rollouts for insurance brokers and agencies',
    noun: 'insurance brokerage',
    metaTitle: 'Odoo for Insurance Brokers: rollout plan, modules, and book migration',
    metaDescription:
      'What an Odoo rollout looks like for a broker, agency or MGA: migrating the in-force book, quote to policy, commission reconciled against carrier statements, renewals and retention.',
    summary:
      'Retail brokers, commercial agencies and MGAs. Migrating the in-force book, placing risks across carriers, and reconciling commission against what the carrier actually paid.',
    intro:
      'Broking software projects are won or lost on the book migration. Everything a broker cares about, renewal retention, commission accuracy, loss ratio per client, is a function of whether the in-force policies came across with correct dates, premiums and commission terms. Get that right and the rest of the rollout is configuration. Get it wrong and the firm spends a year arguing with its own reports.',
    pains: [
      {
        title: 'The market exercise lives in an email thread',
        body: 'Five carriers were approached, three quoted, one was placed. A year later nobody can say why the winner won or which carriers declined and for what reason, so the same insurers get asked again and the same ones say no again.',
      },
      {
        title: 'Commission is assumed rather than reconciled',
        body: 'Statements arrive as PDFs and get checked when someone has an afternoon. A shortfall inside a few percent is absorbed because proving it costs more than it is worth. Across a book, that absorbed difference is a salary.',
      },
      {
        title: 'Renewals surface too late to work',
        body: 'The renewal diary is a calendar reminder. A month is not enough to remarket a commercial risk properly, so the incumbent gets renewed by default and the client eventually shops it themselves.',
      },
      {
        title: 'Mid-term changes are done on paper',
        body: 'An endorsement changes cover halfway through the year. The premium adjustment is worked out on a calculator, the commission on that adjustment is forgotten entirely, and the policy record still shows the old sum insured.',
      },
      {
        title: 'Claims history is not attached to the book',
        body: 'Claims are tracked wherever the claims handler prefers. At renewal the broker cannot produce a loss ratio per client without rebuilding it by hand, so the negotiation with the market happens without the one number that decides it.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'New enquiries and the renewal pipeline in one place, with next year’s opportunity created from this year’s expiry date instead of a reminder somebody sets manually.' },
      { slug: 'sales', why: 'The quotation that holds several carrier options side by side, each with its own premium, excess, terms and commission, converted into the policy that was actually bought.' },
      { slug: 'subscriptions', why: 'Instalment plans and renewal cycles run on recurring billing, so the money and the renewal date come from one record rather than two systems that drift apart.' },
      { slug: 'accounting', why: 'Premium, the tax charged on it and commission each posted to their own accounts, then reconciled line by line against what the carrier actually paid and when.' },
      { slug: 'documents', why: 'Policy wordings, schedules, proposal forms and the record of what was disclosed to the client and on what date, held against the policy rather than a shared drive.' },
      { slug: 'sign', why: 'Proposal forms, terms of business and confirmation of cover signed with an audit trail, which is what makes the file defensible when a claim is disputed.' },
      { slug: 'helpdesk', why: 'Claim notifications as tickets with a clock, because the gap between the loss and the notification is the thing that gets a claim argued down.' },
    ],
    rollout: [
      { phase: 'The book, migrated', body: 'Clients, in-force policies, carriers and commission terms per class. This is the project. We reconcile the migrated book against your last commission statement before anything goes live, and we do not skip that step to hit a date.' },
      { phase: 'Quote to policy', body: 'The quotation with carrier options, reasons won and lost, decline reasons, the policy record, the documents issued and the disclosures your firm requires before cover incepts.' },
      { phase: 'Money and reconciliation', body: 'Invoicing, instalment plans, commission expected per policy and per endorsement, and the report that flags a shortfall outside tolerance instead of absorbing it.' },
      { phase: 'Renewals, claims and reporting', body: 'The renewal window and retention reporting, claims with reserves and adjusters, and loss ratio per client available before the remarketing conversation rather than after it.' },
    ],
    prepare: [
      'The in-force book at a stated date: client, carrier, class, inception, expiry, premium and commission rate, one row per policy.',
      'Carrier commission terms per class, including the lower rate some carriers pay on renewed business.',
      'Three months of carrier statements. They are what the reconciliation will be tested against, and they are usually the first thing that exposes a migration error.',
      'The disclosures your firm insists on before a policy goes on risk, agreed by whoever owns compliance, not assumed by the project team.',
      'Open claims with reserve, adjuster, insurer claim number and the date of loss next to the date it was notified.',
      'A decision on who owns a renewal: the executive who placed it, or a renewals desk that works the whole expiry list.',
    ],
    integrations: ['Stripe', 'HyperPay', 'PayTabs', 'WhatsApp Business', 'Salesforce', 'HubSpot', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-support'],
    solutionSlug: 'insurance-brokerage',
    solutionNote: 'For the feature view of quotes, policies, endorsements, claims and commission, read the solution page.',
    alsoSee: ['professional-services'],
    products: ['wt-crm-dashboard', 'wt-sale-dashboard'],
    faqs: [
      {
        q: 'Can one enquiry hold quotes from several carriers?',
        a: 'Yes. The risk is captured once and each insurer quote sits against it with its own premium, excess, cover level, terms and commission. Winning asks which quote was taken and why, and losing asks the same question the other way round. Those two answers are what make next year’s market exercise faster.',
      },
      {
        q: 'Does it handle instalments and mid-term changes?',
        a: 'Yes. Instalment plans split the premium with the rounding remainder placed on the first instalment rather than left unallocated. An endorsement records what changed and when it took effect, pro rates the annual cost over the days remaining, and works out the commission on the adjustment, including a clawback when cover reduces.',
      },
      {
        q: 'Can commission be reconciled against carrier statements automatically?',
        a: 'Partly, and honestly it depends on the carrier. Where an insurer sends a structured file we import it and match line by line. Where it sends a PDF, someone still keys it, but the matching and the shortfall flagging are automatic after that. We confirm which of your carriers are which during discovery, because it changes the effort estimate materially.',
      },
      {
        q: 'We run Salesforce or HubSpot today. Do we have to replace it?',
        a: 'Not necessarily. Either the existing CRM stays for prospecting and we sync contacts and opportunities into Odoo, or the pipeline moves onto Odoo so the renewal opportunity and the policy record are the same object. The second is usually better for brokers, because a renewal is not really a new lead.',
      },
      {
        q: 'What about the compliance requirements in our market?',
        a: 'They are configuration, not code, and we do not guess them. Which disclosures must exist before cover incepts, what has to appear on a policy document and what returns you have to produce are agreed with your compliance lead during discovery. Country-specific accounting and invoicing requirements are handled through our localization work.',
      },
    ],
  },

  /* ───────────── TRAVEL AGENCY & TOUR OPERATOR ───────────── */
  'travel-agency': {
    h1: 'Odoo rollouts for travel agencies and tour operators',
    noun: 'travel agency',
    metaTitle: 'Odoo for Travel Agencies: rollout plan, modules, and margin control',
    metaDescription:
      'How a travel agency or tour operator rolls out Odoo: the booking file, supplier net cost against sell price, deposits and balances, fixed departures with seat control, and what to prepare.',
    summary:
      'Retail agencies and the tour operators behind them. Booking files, supplier cost against sell price, deposit and balance control, and seats on fixed departures.',
    intro:
      'Travel agencies do not usually have a booking problem. They have a margin visibility problem: the sell price is agreed on the phone and the supplier net cost arrives weeks later, so the consultant discounts against a number nobody has yet. An Odoo rollout in travel puts cost and sell on the same line at the moment of sale, then builds the money controls around it. The operator side, fixed departures and seat inventory, follows once the file structure is proven.',
    pains: [
      {
        title: 'Margin is only known at month end',
        body: 'The consultant sells, the supplier invoices later, and the true margin on a file appears when the accounts are done. By then the discount has been given and the same consultant has done it four more times.',
      },
      {
        title: 'Confirmation numbers live in inboxes',
        body: 'The locator that proves a room or a seat is held sits in one person’s email. When they are off, nobody can confirm the booking to a worried client, and nobody can prove it to the supplier either.',
      },
      {
        title: 'Passport detail is retyped for every segment',
        body: 'Names, numbers and expiry dates are keyed once per supplier, differently each time. The expiry that should have stopped the booking is found at check-in, and the agency pays for the mistake.',
      },
      {
        title: 'Seats on a departure are counted on a whiteboard',
        body: 'A fixed departure has a maximum and a minimum, and both matter. Overselling means somebody gets moved and compensated. Missing the minimum means the coach goes out at a loss, and it is usually noticed too late to fix.',
      },
      {
        title: 'Balances are chased from memory',
        body: 'Deposit taken, balance due sixty days out, supplier wants paying before that. When the chasing depends on somebody remembering, the agency ends up funding the supplier or cancelling a booking it had already sold.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Enquiries per consultant with follow-up dates that turn a quote into a booking, and last year’s travellers as this year’s pipeline rather than a mailing list.' },
      { slug: 'sales', why: 'The quotation and the booking file, with supplier net cost and sell price on the same line so margin is visible while the consultant is still on the call.' },
      { slug: 'accounting', why: 'Deposits, balances, supplier bills and multiple currencies, with margin reported per file, per product type and per consultant against their target.' },
      { slug: 'documents', why: 'Passports, visas, insurance certificates and supplier confirmations held against the traveller and the file, which is what makes a booking transferable between consultants.' },
      { slug: 'sign', why: 'Booking conditions and cancellation terms signed before the deposit is taken, because that is the only point at which the client will actually read them.' },
      { slug: 'helpdesk', why: 'Amendments, in-resort problems and complaints as tickets with an owner and a clock, since these arrive out of hours and are where reputational damage happens.' },
      { slug: 'website', why: 'Packages and departures published from the same records the consultants sell from, so a departure that has filled up stops showing as available.' },
    ],
    rollout: [
      { phase: 'The booking file and the suppliers', body: 'File structure, traveller records, segment types, and the supplier list with net rates and payment terms. Configured around how your consultants already sell, because a shop that fights the file will keep selling from a spreadsheet.' },
      { phase: 'Money on the file', body: 'Deposit and balance rules, receipts, supplier bills, currency handling and margin roll-up. The tax treatment of your sales is confirmed with your accountant in this phase, before the first invoice is raised.' },
      { phase: 'Packages and fixed departures', body: 'For the operator side: per person costing, seat allocation, the minimum that guarantees a departure, and the load factor. A retail-only agency can skip this phase entirely.' },
      { phase: 'Amendments, visas and consultant reporting', body: 'Fee bands by days before departure, visa checklists per destination, and margin per consultant next to target. Last, because the fee bands only work once the file dates are reliable.' },
    ],
    prepare: [
      'The supplier list with net rates, payment terms, and how long each one will hold a booking before releasing it.',
      'Your markup and commission rules per product type, written down, including who may discount and by how much.',
      'The amendment and cancellation fee bands as you actually charge them, not as the brochure prints them.',
      'Live bookings at a stated cutover date with deposits received, balances due and supplier payment dates.',
      'The traveller fields you need per destination, agreed with whoever handles visas, since that person knows which ones actually get asked for.',
      'Confirmation from your accountant on how tax is calculated on your sales, because it changes how the invoice is built and it is expensive to change later.',
    ],
    integrations: ['Stripe', 'PayTabs', 'HyperPay', 'Razorpay', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-integration', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'travel-agency',
    solutionNote: 'For the feature view of booking files, itinerary segments, departures, visas and margin, read the solution page.',
    alsoSee: ['hotel-hospitality', 'professional-services'],
    products: ['wt-crm-dashboard', 'wt-sale-dashboard'],
    faqs: [
      {
        q: 'Can it connect to a global distribution system or a bed bank?',
        a: 'Where the supplier or consolidator publishes an API, yes, and we build it as an integration with the cost and confirmation coming back onto the segment. Where it does not, the segment is keyed and reconciled against the supplier invoice. We confirm which of your suppliers fall into which group before scoping, because it is the single biggest variable in a travel project.',
      },
      {
        q: 'Can we run retail bookings and our own fixed departures on one system?',
        a: 'Yes, and that is the usual reason an agency outgrows spreadsheets. A retail file books onto a departure, the seats come off the departure count, and the departure is guaranteed once it passes its minimum. The operator margin and the retail margin stay reportable separately.',
      },
      {
        q: 'Will it stop a booking going out on a passport that expires too soon?',
        a: 'Yes. A file will not confirm when a traveller’s passport expires inside the window you set against the departure date, and the warning names the traveller rather than the file, so the consultant knows who to ring. The window is a setting, because destinations differ.',
      },
      {
        q: 'How is margin reported per consultant?',
        a: 'Every segment carries net cost, sell price, markup and supplier commission, so gross margin rolls up from the segment to the file to the consultant, next to their target and their earned commission. Nothing is retyped, which is why the number is trusted.',
      },
      {
        q: 'How long does a travel rollout take?',
        a: 'A retail agency with a clean supplier list is usually trading on the file and the money controls inside 6 to 10 weeks. Adding fixed departures, visa handling and supplier integrations extends it, and integration effort should be scoped only after each supplier interface has been confirmed to exist.',
      },
    ],
  },

  /* ───────────── SOLAR EPC & RENEWABLES ───────────── */
  'solar-epc': {
    h1: 'Odoo rollouts for solar EPC and renewable energy contractors',
    noun: 'solar EPC',
    metaTitle: 'Odoo for Solar EPC: rollout plan, modules, and project margin control',
    metaDescription:
      'How a solar installer or EPC contractor rolls out Odoo: design to bill of materials, milestone billing, grid connection tracking, commissioning records, and margin measured per job.',
    summary:
      'Installers, EPC contractors and O&M businesses. Design into a purchase list, milestone billing, commissioning records that survive a warranty claim, and margin per job.',
    intro:
      'Solar contractors grow faster than their paperwork. The estimating spreadsheet that worked at four jobs a month produces the wrong purchase list at twenty, and the crew finds out on the roof. An Odoo rollout here starts at the design, because the design is what generates the quote, the bill of materials, the purchase orders and the commissioning checklist. Everything else in the business is downstream of getting that one record right.',
    pains: [
      {
        title: 'The quote is a spreadsheet nobody else can rebuild',
        body: 'Yield, savings and payback come out of a file on one estimator’s laptop with assumptions buried in it. When the customer asks why the number changed between versions, the honest answer is that nobody knows.',
      },
      {
        title: 'The design and the purchase list disagree',
        body: 'Materials are counted by hand from the layout. Mounting rails, DC cable, jumpers and protection are the items always got wrong, and the crew discovers it on site with the scaffold already up.',
      },
      {
        title: 'The grid connection is the long pole and nobody owns it',
        body: 'The application goes to the utility and then sits. Follow-up dates live in someone’s head, the job sits in a stage called waiting, and the customer assumes the delay is the installer’s fault because nobody can show them otherwise.',
      },
      {
        title: 'Commissioning readings go on a clipboard',
        body: 'String voltages, insulation resistance and earth continuity are measured, written on paper and filed. When a string underperforms two years later, there is nothing to compare against, so the warranty conversation becomes an argument.',
      },
      {
        title: 'Job margin is estimated, never measured',
        body: 'Labour, access equipment, return visits and variations land in the general ledger rather than against the project. The business knows its overall margin and has no idea which jobs earn it and which quietly destroy it.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Referrals, bill-based enquiries and tender lists as a pipeline, with the site survey booked as a scheduled activity rather than promised on the phone.' },
      { slug: 'sales', why: 'A quotation carrying cost, overhead and price per watt peak, so a discount is measured against margin at the moment it is offered, not at the year end.' },
      { slug: 'project', why: 'The job as stages from survey through permitting, procurement and installation to handover, each stage naming the document that has to exist before it can move.' },
      { slug: 'inventory', why: 'Modules, inverters and mounting called off the warehouse to a named site, with serial numbers captured so a warranty claim can identify the exact unit.' },
      { slug: 'purchase', why: 'Long lead items ordered against the design, with landed cost visible before the contract is signed rather than discovered when the container is invoiced.' },
      { slug: 'accounting', why: 'Milestone invoices raised against what actually happened on site, and cost booked to the project as it is spent, which is what turns margin into a measurement.' },
      { slug: 'field-service', why: 'Commissioning visits, planned maintenance rounds and callbacks scheduled with parts and hours booked against the site, so O&M is a contract rather than a favour.' },
    ],
    rollout: [
      { phase: 'Products, design data and the estimate', body: 'Modules and inverters loaded as real products with their electrical data, plus the estimating basis: labour rates, access costs, overhead recovery and expected margin per watt. A wrong estimate makes every later phase decorative.' },
      { phase: 'Quote to signed project', body: 'The quotation, the payment schedule that has to add up before a contract can be signed, the stage gates, and the documents each gate demands.' },
      { phase: 'Materials and site execution', body: 'Bill of materials into purchase orders into deliveries to site, then the daily site diary, variations and cost against budget. This is where the money is either made or lost, and where crews need the most training.' },
      { phase: 'Commissioning, handover and O&M', body: 'String test records against calculated figures, safety certificates, the warranty register, maintenance contracts and generation logging with a flag on sites drifting below expectation.' },
    ],
    prepare: [
      'Your product list with real electrical data: module power and temperature coefficients, inverter DC window and AC rating. Marketing datasheets are not enough.',
      'The estimating basis you use today, written down: labour rate, access and plant costs, overhead recovery and the margin you expect per watt.',
      'A stage list with the document that gates each stage, because every installer draws this differently and yours is the one that matters.',
      'Open jobs at a stated cutover date with their stage, value invoiced to date and remaining milestones.',
      'Reference numbers and dates for any grid connection applications already sitting with a utility, so nothing is lost in the switch.',
      'Sites already under maintenance contract, with visit frequency, response commitment and what the contract is worth per year.',
    ],
    integrations: ['Stripe', 'WhatsApp Business', 'QuickBooks', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-consultancy', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'solar-epc',
    solutionNote: 'For the feature view of surveys, system design, string sizing, milestone billing and commissioning, read the solution page.',
    alsoSee: ['construction', 'manufacturing-industry'],
    products: ['wt-project-dashboard', 'wt-inventory-dashboard'],
    faqs: [
      {
        q: 'Can Odoo hold the system design, or only the commercial side?',
        a: 'It holds the design. Modules and inverters are real products with their electrical data, so strings can be sized against the inverter DC window at the coldest condition the site sees, and the yield and payback come out of stated assumptions rather than a hidden spreadsheet. A customer can check the arithmetic, which is the point.',
      },
      {
        q: 'How does milestone billing work in practice?',
        a: 'The payment schedule is tied to events that actually happen on site, and the shares have to total exactly one hundred percent before the contract can be signed. Each milestone raises an invoice into Accounting when the event is recorded, so billing follows the job rather than following whoever remembers to chase it.',
      },
      {
        q: 'Can we track panels and inverters by serial number for warranty?',
        a: 'Yes. Serials are captured when stock is delivered to site and stay against the installation, alongside a warranty register with one entry per component, since a module, an inverter and the workmanship run for different terms and are honoured by different parties.',
      },
      {
        q: 'Do you cover operations and maintenance as well as installation?',
        a: 'Yes, and for most established installers it is the more valuable half. Contracts carry their own visit schedule, response time and performance commitment. Generation is logged per site against what the design predicted, with a flag on any site falling further behind than the threshold you set.',
      },
      {
        q: 'How long does a solar EPC rollout take?',
        a: 'Design, quoting and project execution typically run in the 8 to 12 week band, with commissioning records and O&M added after the first jobs have gone through end to end. Contractors without clean product data spend the extra time building the product list, which is unavoidable and worth doing properly.',
      },
    ],
  },

  /* ───────────── FREIGHT FORWARDING ───────────── */
  'freight-forwarding': {
    h1: 'Odoo rollouts for freight forwarders and customs brokers',
    noun: 'freight forwarding',
    metaTitle: 'Odoo for Freight Forwarders: rollout plan, modules, and gross profit per file',
    metaDescription:
      'How a freight forwarder or customs broker rolls out Odoo: the job file across air, sea and road, cost and sell on every charge line, disbursements kept out of profit, and lane margin reporting.',
    summary:
      'Forwarders, NVOCCs and customs brokers. One job file across modes, two-sided charge lines, disbursements kept out of gross profit, and margin by lane and salesperson.',
    intro:
      'A forwarder’s margin does not disappear in one large event. It leaks a hundred at a time: a chargeable weight typed differently on the invoice than on the carrier bill, a supplier cost that arrives after the file was closed, a disbursement recharged at cost but reported as revenue. An Odoo rollout here is about making the job file the only place a number is entered, so the invoice, the vendor bill and the profit report cannot disagree with each other.',
    pains: [
      {
        title: 'The job file is really an email folder',
        body: 'Quote, booking, bill of lading, arrival notice and invoice each live somewhere different. Answering where the cargo is takes three people, and the answer is assembled rather than looked up.',
      },
      {
        title: 'Chargeable weight is calculated differently by everyone',
        body: 'Volume converted on a calculator, rounded to taste, keyed twice. The customer invoice and the carrier bill are rated on two different figures, and the difference is only found when somebody queries it.',
      },
      {
        title: 'Disbursements make lane profitability fiction',
        body: 'Duty and taxes paid on the client’s behalf are recharged at cost, but booked to the same revenue account as freight. Turnover looks impressive, gross profit per lane means nothing, and pricing decisions are made on the wrong number.',
      },
      {
        title: 'Cost accrued, never billed',
        body: 'A supplier invoice lands six weeks after the file is closed. The sell line for it was never raised. Nobody notices because the file is already off the desk, and this is where a forwarder’s money quietly goes.',
      },
      {
        title: 'Agent profit shares are settled from memory',
        body: 'Business nominated by an overseas agent gets reconciled quarterly from two spreadsheets that never match. The relationship survives on goodwill, and the settlement takes a week of someone’s time every quarter.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Named accounts and trade lanes as a pipeline, with the overseas agent network held as real partner records carrying their profit share terms rather than as an address book.' },
      { slug: 'sales', why: 'Rate quotations with validity dates, transit times and the same two-sided lines the file uses, so a won quotation opens a file and the invoice cannot contradict what was quoted.' },
      { slug: 'accounting', why: 'Customer invoices and vendor bills raised from one set of charge lines, each side in its own currency, with disbursed items flagged so they never reach gross profit.' },
      { slug: 'documents', why: 'Bills of lading, waybills, packing lists, certificates and customs paperwork held against the file with the version that was actually issued, not the draft.' },
      { slug: 'inventory', why: 'For groupage, cross-dock and bonded storage: cargo sitting in your own shed becomes stock with a location, rather than a note on a whiteboard.' },
      { slug: 'fleet', why: 'Own trucks and trailers for pre-carriage and delivery, with running cost per vehicle sitting next to what that leg was sold for.' },
      { slug: 'helpdesk', why: 'Status enquiries and exceptions as tickets against the file, so a delayed vessel produces one conversation with a named owner instead of five people forwarding the same email.' },
    ],
    rollout: [
      { phase: 'One mode, end to end', body: 'Pick the busiest mode, usually sea full container or air, and configure numbering, parties, charge codes, the file and the documents. Every other mode is then a variation of a proven pattern rather than a fresh argument.' },
      { phase: 'Charges, invoicing and the ledger', body: 'Cost and sell on every line, rating bases, billing party rules, multiple currencies, and disbursements separated from income. This is the phase that changes what management can see.' },
      { phase: 'Remaining modes and customs', body: 'Groupage, road and the customs declaration with tariff lines, apportioned freight and insurance in the customs value, and the recharge kept out of profit.' },
      { phase: 'Margin and the exception reports', body: 'Gross profit per file, lane, agent and salesperson, plus the two reports that pay for the project: cost accrued but not billed, and files closed without being invoiced.' },
    ],
    prepare: [
      'Your charge code list with the basis each one is rated on: per shipment, per container, per chargeable kilo, per cubic metre, per bill, per declaration.',
      'Buying rates per lane and carrier with validity dates, and the selling tariff you actually apply rather than the published one.',
      'The volumetric divisors your tariffs use per mode, confirmed with your operations manager rather than assumed from habit.',
      'Open files at cutover with what has been billed, what has been accrued and what is still expected from suppliers.',
      'The agent list with profit share terms, including the arrangements agreed verbally years ago that only one director remembers.',
      'A named person who signs a file as closed. That single control is what the entire margin report depends on.',
    ],
    integrations: ['Aramex', 'DHL', 'FedEx', 'WhatsApp Business', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-integration', 'odoo-customization', 'odoo-support'],
    solutionSlug: 'freight-forwarding',
    solutionNote: 'For the feature view of job files, bills of lading, containers, customs entries and lane profitability, read the solution page.',
    alsoSee: ['logistics-transport', 'distribution-fmcg'],
    products: ['way4tech-logistics', 'wt-accounting-dashboard'],
    faqs: [
      {
        q: 'Can air, sea and road run on one system?',
        a: 'Yes, on one file structure with a separate numbering series per mode, so anybody reading a reference knows what they are looking at. The differences that matter, the volumetric divisor and the rating basis, are settings rather than separate builds, because tariffs vary by forwarder and by market.',
      },
      {
        q: 'Does it produce bills of lading and air waybills?',
        a: 'Yes, master and house, with as many houses as a consolidation needs and a refusal to issue a house bill with no master behind it. Container numbers are validated at the desk rather than at the gate, and a box loaded over the payload for its type is rejected before it becomes somebody else’s problem.',
      },
      {
        q: 'Can we file customs declarations directly from Odoo?',
        a: 'The declaration is prepared in the system with tariff lines, apportioned freight and insurance in the value, and duty and taxes disbursed onto the file. Whether it can be transmitted electronically depends entirely on your country and on whether an interface is published. We confirm that per country before scoping it, and we never assume it exists.',
      },
      {
        q: 'How do you keep disbursements out of gross profit?',
        a: 'Duty and taxes paid for the client are flagged as disbursed lines, recharged at cost and posted to their own accounts. They appear on the invoice and never in the profit calculation. It sounds small until you see what it does to lane margin reporting the first month after go-live.',
      },
      {
        q: 'How long does a forwarder rollout take?',
        a: 'The first mode with charges and invoicing usually runs in the 8 to 12 week band. Additional modes are faster because they copy the pattern. Customs adds time in proportion to how many tariff codes and regimes you actually handle, which is worth counting honestly before the estimate is built.',
      },
    ],
  },

  /* ───────────── FACILITY MANAGEMENT & CAFM ───────────── */
  'facility-management': {
    h1: 'Odoo rollouts for facility management and maintenance teams',
    noun: 'facility management',
    metaTitle: 'Odoo for Facility Management: CAFM rollout plan, modules, and asset data',
    metaDescription:
      'How a facilities team or maintenance contractor rolls out Odoo as a CAFM system: the space and asset register, SLA clocks that survive a client review, planned maintenance, permits and cost per asset.',
    summary:
      'In-house teams, managing agents and TFM contractors. The space and asset register, response and resolution clocks that hold up in a client review, permits, and lifetime cost per asset.',
    intro:
      'Every CAFM project is decided by the asset register. A system built on a vague estate list produces work orders against places nobody can find and cost reports nobody believes, and no amount of configuration afterwards fixes it. So the survey comes first, the help desk second, and the clocks are agreed with the client in writing before go-live rather than argued about in the first monthly review.',
    pains: [
      {
        title: 'Faults are reported against a description of a place',
        body: 'The unit on the second floor means three different machines to three different technicians. Without a space and asset register the same fault is attended twice, invoiced twice, and fixed neither time.',
      },
      {
        title: 'The SLA is measured two ways',
        body: 'The client counts from the call, the contractor counts from acceptance, and cover hours are applied differently by each side. Every monthly review opens with an argument about the numbers instead of a conversation about the estate.',
      },
      {
        title: 'Planned maintenance always loses to reactive work',
        body: 'The schedule is a spreadsheet. The week the desk gets busy, planned visits slip, and they are never caught up because nothing tracks the backlog. It stays invisible until plant fails on the hottest day of the year.',
      },
      {
        title: 'Contractor control is a folder, not a control',
        body: 'A liability certificate that expired eighteen months ago sits in a drive, and the person who would notice is the one assigning the job. Permits get issued verbally because the paperwork lives somewhere else and the job is urgent.',
      },
      {
        title: 'Repair or replace cannot be answered',
        body: 'Three years of spend on one chiller is scattered across parts issues, subcontractor invoices and internal hours. The capital case cannot be built, so the plant keeps being patched at a cost nobody adds up.',
      },
    ],
    modules: [
      { slug: 'maintenance', why: 'The asset register with its parent and child tree, so spend on a compressor shows against the chiller it sits inside, plus planned schedules on calendar interval, meter reading, or whichever falls first.' },
      { slug: 'helpdesk', why: 'Fault intake from tenants, staff and email with a priority that picks up the response and resolution targets, rather than an urgency written in a subject line.' },
      { slug: 'field-service', why: 'Dispatch to a technician or a contractor with the job sheet, and hours and parts booked on site instead of typed up on Friday afternoon from memory.' },
      { slug: 'inventory', why: 'Spares issued from a real store to the job, so a critical part being out of stock is known before the callout is promised rather than during it.' },
      { slug: 'purchase', why: 'Subcontractor orders and parts raised against the job, with the vendor bill checked against what the job actually consumed.' },
      { slug: 'accounting', why: 'Contract billing, additional works billed separately from the contract, and cost carried per site and per asset in the ledger rather than in a spreadsheet.' },
      { slug: 'documents', why: 'Inspection certificates, insurance, warranties, drawings and permits held against the asset and the contractor, with expiry dates that raise work before they lapse.' },
    ],
    rollout: [
      { phase: 'The estate and the asset register', body: 'Sites, buildings, floors and spaces, then assets with make, model, serial, criticality and warranty expiry. This phase is the project. Where the data does not exist, a walk round is scoped as work, not wished away.' },
      { phase: 'The help desk and the clocks', body: 'Priorities, response and resolution targets, cover hours, escalation and the breach report. Agreed in writing with the client or the estate owner before go-live, which is the single cheapest dispute you will ever avoid.' },
      { phase: 'Planned maintenance, permits and competence', body: 'Schedules per asset class, meter readings, inspection intervals and certificates, plus permit types, who may issue them, and the insurance and competence blocks that stop an assignment before it happens.' },
      { phase: 'Cost, contract billing and performance', body: 'Spares, labour rates, out of hours premiums, subcontractor cost, lifetime cost per asset against replacement value, and the planned to reactive ratio per site.' },
    ],
    prepare: [
      'A space list to the level a fault will actually be reported at. Room level beats floor level, and getting there is the real cost of the project.',
      'The asset register with make, model, serial number, install date and criticality. Where it does not exist, budget a survey before you budget software.',
      'Maintenance intervals per asset class and the certificate each inspection produces.',
      'The SLA table as contracted: priorities, response and resolution targets, cover hours, and what is allowed to stop the clock.',
      'Contractor records with trades, agreed rates, insurance expiry and the sites each one is approved to work on.',
      'The permit types your safety policy requires and the named people authorised to issue each one, because that authority has to be enforced on the record, not on a button.',
    ],
    integrations: ['WhatsApp Business', 'ZKTeco Biometric', 'Stripe', 'Power BI', 'Metabase'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-training', 'odoo-support'],
    solutionSlug: 'facility-management',
    solutionNote: 'For the feature view of the asset register, planned maintenance, work orders, permits and SLA reporting, read the solution page.',
    alsoSee: ['real-estate', 'construction'],
    products: ['wt-project-dashboard', 'wt-inventory-dashboard'],
    faqs: [
      {
        q: 'Can response and resolution be measured separately, with cover hours applied?',
        a: 'Yes, and it matters more than most buyers expect. Two clocks run on every job, each with its own target and breach flag, and a four hour target on a nine to five contract does not run overnight. That last detail is the usual reason a client SLA report disagrees with the contractor’s own report.',
      },
      {
        q: 'We do not have an asset register. Can we still start?',
        a: 'Yes, but plan for the survey rather than pretending it will happen alongside. The practical route is to start with the spaces and the critical plant, go live on reactive work, and add the rest of the register site by site. Starting with a bad register is worse than starting with a small one.',
      },
      {
        q: 'Can we manage subcontractors as well as our own technicians?',
        a: 'Yes. Contractors carry the trades they are approved for, the sites they cover, agreed rates and an insurance expiry that blocks assignment before the certificate runs out. Approving a firm is the facility manager’s decision, and it is enforced so the help desk cannot lift the block itself.',
      },
      {
        q: 'Does planned maintenance work on running hours as well as dates?',
        a: 'Yes, on a calendar interval, on a meter reading, or on whichever comes first, which is what most manufacturers actually require. Meter readings are recorded per asset and the movement between them turns a run hour interval into a date you can plan labour and parts against.',
      },
      {
        q: 'How long does a CAFM rollout take?',
        a: 'Help desk, work orders and the SLA clocks typically go live in the 8 to 12 week band once the asset register exists. The register itself is the variable: an estate that has been surveyed recently adds nothing, and one that has never been surveyed can add more time than the software work does.',
      },
    ],
  },
};
