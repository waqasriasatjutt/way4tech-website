/* ─────────────────────────────────────────────────────────────
 * TRADE INDUSTRIES (5)
 * Spread into INDUSTRY_DETAIL in industries-detail.ts.
 *
 * Same positioning rule as the parent file:
 *   /solutions/<slug>/   = WHAT Odoo does for this sector.
 *   /industries/<slug>/  = HOW a business in this sector gets it
 *                          running. Failure modes, module map,
 *                          rollout order, what to prepare.
 * Never restate the solution feature list here.
 *
 * COMPLIANCE GAP (deliberate, do not fill by guessing):
 * No tax rate, VAT percentage, duty amount, e-invoicing mandate,
 * inspection scheme name, threshold, deadline or government portal
 * appears in this file. Fuel duty treatment, the jewellery tax base
 * and statutory inspection regimes are all country-specific and are
 * deferred to /services/odoo-localization/. Get any named
 * requirement confirmed by a human before adding it here.
 * ───────────────────────────────────────────────────────────── */

import type { IndustryDetail } from '~/data/industries-detail';

export const TRADE_INDUSTRIES: Record<string, IndustryDetail> = {
  /* ───────────── JEWELLERY RETAIL ───────────── */
  'jewellery-retail': {
    h1: 'Odoo rollouts for jewellers and gold retailers',
    noun: 'jewellery retail',
    metaTitle: 'Odoo for Jewellery Retail: rollout plan, modules, and rate setup',
    metaDescription:
      'How a jeweller rolls out Odoo: the daily metal rate, making and wastage on the counter price, old gold buy-back, goods out on memo, and stock counted in grams as well as pieces.',
    summary:
      'Showrooms, the goldsmith bench and the bullion counter. How the daily rate, making charges and weight reconciliation get agreed before the tills are switched on.',
    intro:
      'A jewellery rollout is unusual because almost nothing in the shop has a fixed price. The ticket is worked out from the rate for the day, the net metal weight, the making charge and the wastage, and every one of those is a field somebody has to agree on before a single item is loaded. Get the rate table and the weight master right and the rest is ordinary retail. Get them wrong and every price, every count and every buy-back is wrong with them.',
    pains: [
      {
        title: 'The price is worked out on a calculator',
        body: 'Counter staff price from the rate on the whiteboard plus a making charge from memory. Two customers get two prices for the same design on the same day, and nobody can rebuild either ticket a month later.',
      },
      {
        title: 'Stock is counted in pieces, not in grams',
        body: 'The system says forty rings and the tray holds forty rings, weighing less than the book. A piece count hides metal loss for exactly as long as the piece count keeps matching.',
      },
      {
        title: 'Old gold is taken on trust',
        body: 'The exchange is accepted at the purity the customer claims, no test result is written down, and the deduction for solder is argued at the counter. Whatever was lost turns up in the melt with nothing to attribute it to.',
      },
      {
        title: 'Memo and approval goods leave the books',
        body: 'Pieces go out with a salesman or on approval and live in a notebook. At close of day nobody can state what is out, at what weight, valued at whose rate.',
      },
      {
        title: 'The bench has no variance record',
        body: 'Customer metal in, finished piece out, scrap and filings back. There is a difference every single time and it is almost never written down, so the goldsmith is trusted rather than reconciled.',
      },
    ],
    modules: [
      { slug: 'pos', why: 'Counter sales priced from the rate for the day, with the rate stamped on the line so an old ticket still reads as it was actually sold.' },
      { slug: 'inventory', why: 'Stock held in pieces and in grams, by purity and design code, with a count sheet that prices the weight difference rather than hiding it.' },
      { slug: 'barcode', why: 'Tags scanned at the tray, on the memo and at the counter, because a showroom count done by hand takes a day and still misses lines.' },
      { slug: 'repairs', why: 'Repair and custom order job cards carrying metal in, metal out and scrap returned, which gives the bench a variance figure instead of a feeling.' },
      { slug: 'purchase', why: 'Bullion and finished stock buying, plus buy-back credits that need to reach the ledger rather than the till drawer.' },
      { slug: 'accounting', why: 'Metal, making and stones reported as three separate margins, with the invoice built the way your local tax treatment requires, settled during localization and not at the counter.' },
      { slug: 'crm', why: 'Customer history by design, purity and occasion, which is what a repeat jewellery sale is actually built on.' },
    ],
    rollout: [
      { phase: 'Rate table and item master', body: 'Metals, purities, fineness, who is allowed to enter the rate and what happens on a morning nobody does. Then gross weight, stone weight, net metal, making basis, wastage and design code per item. Nothing else starts until the same piece prices identically on paper and on screen.' },
      { phase: 'Counter and stock', body: 'Tills, tags, tray locations, and an opening count per showroom in pieces and in grams. The first count is slow and it is the one number the whole project gets measured against later.' },
      { phase: 'Buy-back, bench and memo', body: 'Old gold test method and deduction rules, job cards for repairs and custom orders, memo limits per salesman, and automatic chasing of anything past its due date.' },
      { phase: 'Finance and multi-showroom', body: 'Ledger, margin split, memo exposure and weight reconciliation reporting. Additional showrooms copy the first once the rate and item rules have survived a full month of trade.' },
    ],
    prepare: [
      'Where today\'s rate comes from, who is authorised to enter it, and what the counter does on a morning nobody has.',
      'An item master with gross weight, stone weight and net metal weight per piece, not a description and a price.',
      'Making charge rules written down: per gram, a percentage of metal value, or fixed for bought-in finished pieces.',
      'The wastage percentages actually charged by category, as opposed to the ones printed on the price list.',
      'Buy-back rules: test method, the deduction for solder and impurity, and the margin taken off the fine rate.',
      'Memo and approval limits per salesman, and the named manager who approves anything above them.',
    ],
    integrations: ['WhatsApp Business', 'Stripe', 'PayTabs', 'Mada', 'Power BI'],
    services: ['odoo-implementation', 'odoo-pos-deployment', 'odoo-customization', 'odoo-localization', 'odoo-support'],
    solutionSlug: 'jewellery-retail',
    solutionNote: 'For the feature view of rate cards, hallmark records, stone certificates and buy-back, read the solution page.',
    alsoSee: ['retail-stores', 'manufacturing-industry'],
    faqs: [
      {
        q: 'Can Odoo price a sale from the daily gold rate?',
        a: 'Yes. One rate per metal per purity per day drives the counter, and the line calculates net metal weight at that rate plus making, wastage and stone value. The rate is written onto the line at the moment of sale, so reprinting a six month old invoice gives the price that was charged rather than today\'s.',
      },
      {
        q: 'Do we really have to weigh the whole showroom to go live?',
        a: 'Yes, once. Opening weight per line is the baseline every later reconciliation is measured against, and a rollout that starts from an estimated weight can never prove anything afterwards. We schedule it as a closed day or a run of early mornings rather than pretending it fits around trade.',
      },
      {
        q: 'How is old gold handled on an exchange?',
        a: 'The exchange records gross weight, stone weight, the purity claimed and the purity the test gave, with the test method named. Deductions come off, the pure weight sets the credit, and a gap beyond your tolerance has to be explained before the exchange is accepted.',
      },
      {
        q: 'Can we control what goes out on memo or approval?',
        a: 'Yes. Every piece leaving is listed with its weight and its value at that day\'s rate, against a salesman or a customer, with a limit that needs manager approval above it. What is still out, what came back and what sold sits on the front of the memo, and overdue items get chased without anyone having to remember.',
      },
      {
        q: 'We run several showrooms. Do they all have to use the same rate?',
        a: 'No. A head office rate feeds every branch by default, with a per-showroom override where the local market genuinely quotes differently. Because the rate is stamped on each line, group reporting still compares like with like afterwards.',
      },
    ],
  },

  /* ───────────── FUEL STATION ───────────── */
  'fuel-station': {
    h1: 'Odoo rollouts for filling stations and forecourt groups',
    noun: 'fuel retail',
    metaTitle: 'Odoo for Fuel Stations: rollout plan, modules, and wet stock control',
    metaDescription:
      'How a filling station or forecourt group rolls out Odoo: tank and nozzle setup, shift reconciliation, tanker deliveries, wet stock variance, fleet credit accounts and the forecourt shop.',
    summary:
      'Single sites and forecourt groups. Tank and nozzle setup, shift reconciliation, wet stock variance and credit fleet accounts, in the order they have to be built.',
    intro:
      'A forecourt runs two businesses on one plot: a fuel business measured in litres nobody can see, and a shop measured in items on a shelf. Nearly every fuel rollout that goes badly goes badly on the first one, because a nozzle was mapped to the wrong tank or the site went live without an honest opening dip. Wet stock is the project. The shop is the easy half.',
    pains: [
      {
        title: 'Shift handover is a pad of paper',
        body: 'Closing readings written by hand, cash counted at the end of the night, over or short argued the next morning with no figure per nozzle, per grade or per attendant behind it.',
      },
      {
        title: 'Nobody knows what is actually in the tank',
        body: 'Book stock and dip drift apart quietly. The loss surfaces when the site runs dry earlier than the order plan said, or when an oil company audit asks for a variance history that was never kept.',
      },
      {
        title: 'Deliveries are booked from the ticket, not the tank',
        body: 'Bill of lading litres accepted at face value, no temperature correction, no dip either side of the hose. A short delivery cannot be claimed once the driver has left, so it never is.',
      },
      {
        title: 'Price changes fall inside a shift',
        body: 'The board changes mid afternoon and the shift spans it, so the whole day gets valued at one price. Margin per grade becomes a monthly estimate instead of a number.',
      },
      {
        title: 'Credit fleets run on trust',
        body: 'Haulier fills go on a duplicate book, odometers are not captured, the wrong grade goes into the wrong vehicle, and the credit limit is discovered only when the statement is disputed.',
      },
    ],
    modules: [
      { slug: 'inventory', why: 'Fuel held as stock by tank and grade alongside shop stock, so the site keeps one set of books instead of a wet one and a dry one.' },
      { slug: 'purchase', why: 'Tanker deliveries received against the terminal bill and matched to the tank gain, which is the only evidence a shortage claim ever rests on.' },
      { slug: 'pos', why: 'The forecourt shop till, cash sessions and card settlement, closing into the same shift the pumps close into.' },
      { slug: 'accounting', why: 'Credit account statements, card settlement and stock valuation posting straight through rather than arriving as a monthly workbook.' },
      { slug: 'maintenance', why: 'Pump calibration dates, tank equipment servicing and the periodic checks a site is expected to evidence rather than remember.' },
      { slug: 'attendance', why: 'Attendants against shifts, so an over or short figure carries a name and a time, using the biometric devices most sites already have on the wall.' },
      { slug: 'iot', why: 'Shop hardware on one connected box: receipt printer, scanner and payment terminal, so the till is not three separate cables and a prayer.' },
    ],
    rollout: [
      { phase: 'Site model and opening dip', body: 'Tanks with capacity, dead stock and safe fill, grades, pumps, nozzles, and which tank each nozzle draws from. Opening dip and opening totalisers taken on the night of cutover. A wrong nozzle to tank map produces a variance report that reads like theft, so this gets walked on the forecourt and checked twice.' },
      { phase: 'Shift and reconciliation', body: 'Open and close, test litres, cash counted against cash expected, the tolerance, and who signs off outside it. Run alongside the paper sheet for a fortnight before the paper goes, because that fortnight is what proves the two agree.' },
      { phase: 'Deliveries and wet stock', body: 'Receipts with temperature correction from the loading ticket, dips before and after, variance per tank per period, and a reason code on anything outside tolerance.' },
      { phase: 'Credit fleets, shop and group reporting', body: 'Accounts, vehicles, limits and monthly statements, then shop stock and shrinkage, then site against site comparison for a group.' },
    ],
    prepare: [
      'A tank list with capacity, dead stock, safe fill line and the current dip per grade.',
      'The nozzle to tank map confirmed on the forecourt itself, not copied off the site drawing.',
      'Current totaliser readings per nozzle, taken on the night of cutover rather than the week before.',
      'Pump prices in force per grade, and the route by which a site is told to change them.',
      'The credit account list with limits, vehicles, permitted grade per vehicle and the discount actually agreed.',
      'A written tolerance for cash over or short and for wet stock variance, plus the person who signs off past it.',
    ],
    integrations: ['Mada', 'HyperPay', 'PayTabs', 'Stripe', 'ZKTeco Biometric', 'Power BI'],
    services: ['odoo-implementation', 'odoo-pos-deployment', 'odoo-customization', 'odoo-integration', 'odoo-support'],
    solutionSlug: 'fuel-station',
    solutionNote: 'For the feature view of dip readings, shift reconciliation and wet stock reporting, read the solution page.',
    alsoSee: ['retail-stores', 'logistics-transport'],
    faqs: [
      {
        q: 'Can it read our pump controller or automatic tank gauge?',
        a: 'It depends on the equipment. Where the controller or gauge exposes a documented feed or a file export, we build the connector so readings arrive on their own. Where it does not, closing readings are keyed at shift end, which is what the site does today anyway. We confirm which case applies before scoping, not after.',
      },
      {
        q: 'How tight should our wet stock tolerance be?',
        a: 'Set it per grade, and set it from your own history rather than from an ambition. The value of a tolerance is not the number, it is that crossing it forces a named cause: meter drift, a short delivery, water ingress, a dip error, a line leak or theft. A site that records causes for three months can then tighten the number honestly.',
      },
      {
        q: 'Do we have to replace the tills in the shop?',
        a: 'Usually not. Odoo POS runs on the hardware most forecourt shops already have, and we reuse the printer, scanner and drawer where they are supported. The payment terminal is confirmed separately, because that is the one item that decides whether a swap is needed.',
      },
      {
        q: 'Can several sites run on one system?',
        a: 'Yes. One database, prices and shifts per site, variance calculated per tank per site, and group reporting that compares throughput, variance and shop margin across the estate. Sites go live in batches, not together.',
      },
      {
        q: 'What about fuel duty and tax on the pump price?',
        a: 'The treatment is country-specific, so it is configured during localization on your accountant\'s instruction rather than assumed by us. What you get either way is the margin chain: pump price, less tax, less duty, less landed cost, per grade and per site.',
      },
    ],
  },

  /* ───────────── PRINTING PRESS ───────────── */
  'printing-press': {
    h1: 'Odoo rollouts for commercial printers',
    noun: 'commercial print',
    metaTitle: 'Odoo for Printing Presses: rollout plan, modules, and job costing',
    metaDescription:
      'How a commercial printer rolls out Odoo: estimating and imposition, job tickets from prepress to despatch, spoilage booked by reason, press time on the job, and estimated against actual cost.',
    summary:
      'Litho, digital and mixed shops. Estimating, job tickets, spoilage and the estimated against actual number, sequenced so the pressroom is never left waiting.',
    intro:
      'Print is make to order with a different specification every time, so the estimate is the product. A printer who cannot set what a job was quoted at against what it cost is running on the estimator\'s instinct and the bank balance. An Odoo rollout in print starts at the estimate, because the ticket, the purchase, the spoilage and the invoice all inherit its structure.',
    pains: [
      {
        title: 'The estimate lives on one person\'s machine',
        body: 'A spreadsheet per estimator, each with its own rates and waste assumptions. When they are on leave the shop cannot quote properly, and when they leave the pricing logic leaves with them.',
      },
      {
        title: 'Nobody knows what a job actually cost',
        body: 'Paper, plates, press hours and bought-in finishing land in the ledger by month and never against the job. Estimated against actual is not a report anyone can run, so quoting never improves.',
      },
      {
        title: 'Spoilage is under-reported on purpose',
        body: 'Waste gets booked as paper, when it gets booked at all. The ink and the press time that produced those sheets stay invisible, which is exactly why a bad make-ready looks cheap.',
      },
      {
        title: 'Proof approval is an email somebody remembers',
        body: 'No version, no timestamp, no named approver. Six weeks later a misprint argument is settled by whoever sounds more certain, and the reprint comes out of the printer\'s margin.',
      },
      {
        title: 'The delivery date is set by the salesman',
        body: 'Press loading and trade finisher lead times are not visible at the moment the promise is made. A finisher\'s queue quietly becomes a late delivery that the customer hears about last.',
      },
    ],
    modules: [
      { slug: 'crm', why: 'Enquiry to estimate to won or lost with a reason, so the shop learns which work it prices wrong instead of only learning that it lost it.' },
      { slug: 'sales', why: 'The quotation the customer signs, carrying the specification and the quantity tolerance that despatch is later measured against.' },
      { slug: 'manufacturing', why: 'Presses and finishing lines as work centres with real running speeds and hour rates, so a job is loaded against capacity rather than optimism.' },
      { slug: 'inventory', why: 'Paper by size, grain and weight, reserved to the job when the estimate is won, which is what stops two jobs claiming the same pallet.' },
      { slug: 'purchase', why: 'Paper, plates, ink and trade finishing bought against the job, with the outworker lead time visible before a date is promised.' },
      { slug: 'timesheets', why: 'Make-ready and run time booked to the job by the operator, which is the half of the actual cost most shops never collect.' },
      { slug: 'accounting', why: 'Job level cost and margin through to the ledger, so estimated against actual is a screen rather than a fortnight of analysis.' },
    ],
    rollout: [
      { phase: 'Rates and materials first', body: 'Press hour rates, running speeds, make-ready allowances, waste percentages, paper prices in the unit you actually buy in, and finishing setup and run rates. Nothing downstream can be trusted until these are the shop\'s current numbers rather than the ones written for last year\'s tender.' },
      { phase: 'Estimating', body: 'Rebuild a set of jobs already quoted this year and compare the result against what was charged and what it cost. Every difference gets explained here, on work whose outcome is already known, instead of on live quotes.' },
      { phase: 'Job tickets on the floor', body: 'Won estimates release as tickets through prepress, proofing, printing, finishing and despatch. Time and spoilage are booked at the press, and proof approval carries a version, a name and a timestamp. Run alongside the existing docket for a few weeks.' },
      { phase: 'Costing and reporting', body: 'Purchases against the job, invoicing on delivered quantity inside the agreed tolerance, then estimated against actual, press utilisation, and spoilage by reason and by stage.' },
    ],
    prepare: [
      'A press list with speeds, units, maximum and minimum sheet size, and whether each one perfects.',
      'A costed hour rate per press and per finishing line that finance is willing to stand behind.',
      'The paper stock list with size, grain direction, weight and the unit the shop buys in.',
      'Make-ready allowances and running spoilage percentages the pressroom actually experiences, not the ones on the supplier sheet.',
      'Trade finishers with their lead times and price basis, because they set delivery dates you do not control.',
      'Spoilage reason codes written the way the pressroom would name them, agreed before anyone is asked to use them.',
    ],
    integrations: ['Stripe', 'WhatsApp Business', 'DHL', 'QuickBooks', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-consultancy', 'odoo-training', 'odoo-support'],
    solutionSlug: 'printing-press',
    solutionNote: 'For the feature view of imposition, estimating and job tickets, read the solution page.',
    alsoSee: ['manufacturing-industry', 'professional-services'],
    faqs: [
      {
        q: 'Can it estimate litho and digital in the same place?',
        a: 'Yes, and it should, because the same enquiry often needs both quoted before it can be answered honestly. The estimate changes what it costs by press: plates and make-ready on litho, a click charge per printed side on toner, and the sheet arithmetic underneath is identical.',
      },
      {
        q: 'Will our estimator lose the ability to price on judgement?',
        a: 'No. The calculation gives a cost and a target price. Typing over that price is expected, and the record then shows the margin actually taken. What changes is that the override is visible afterwards instead of invisible forever.',
      },
      {
        q: 'Do press operators have to work on a computer?',
        a: 'They work off a printed ticket with a barcode and book time and spoilage by scanning at a shared screen or tablet at the press. Asking a minder to log into a desktop mid run is how shop floor data collection dies in the first month.',
      },
      {
        q: 'Can we keep our existing prepress and RIP workflow?',
        a: 'Yes. Odoo does not replace prepress. It holds the job, the specification, the proof record and the cost, while artwork keeps flowing through the tools your studio already uses. Where the prepress system exposes a job number we link the two so files and tickets match.',
      },
      {
        q: 'How long does a print rollout take?',
        a: 'Typical shops land in the 8 to 12 week band for estimating, tickets and job costing. The long pole is almost never the software. It is agreeing hour rates and waste percentages, which is a management decision the project cannot make for you.',
      },
    ],
  },

  /* ───────────── EQUIPMENT RENTAL ───────────── */
  'equipment-rental': {
    h1: 'Odoo rollouts for plant and tool hire',
    noun: 'equipment rental',
    metaTitle: 'Odoo for Equipment Rental: rollout plan, modules, and fleet setup',
    metaDescription:
      'How a plant or tool hire business rolls out Odoo: unit level fleet records, rate cards, availability across a date range, off-hire and damage, workshop jobs and inspection certificates.',
    summary:
      'Plant yards, tool hire shops and access fleets. Unit level records, rate cards, availability and off-hire, in the sequence that stops a machine being promised twice.',
    intro:
      'Hire businesses run on two questions: is the machine free on those dates, and what did it come back like. Both are about individual units, so the first decision in a hire rollout is that a machine stops being a stock quantity and becomes a record with a serial number, a meter and a history. Every rate, certificate, damage charge and utilisation figure hangs off that one change.',
    pains: [
      {
        title: 'Availability lives in the desk diary',
        body: 'The yard promises a machine that is already out or sitting in the workshop. The double booking surfaces as an angry call at seven on the morning of delivery, and somebody drives to a site to apologise.',
      },
      {
        title: 'Every hire is priced by whoever answers the phone',
        body: 'Five days charged at the daily rate when the week rate was cheaper, or a negotiated rate honoured for a customer who never had one. The same machine leaves the yard at three prices in a month.',
      },
      {
        title: 'Nothing is written down at hand-over',
        body: 'No condition record, no meter reading, no photographs. Damage on return becomes a negotiation the yard loses, because the customer only has to say it was already like that.',
      },
      {
        title: 'Certificates expire in a folder',
        body: 'Inspection dates sit on a wall chart nobody updates. A machine goes out of test and either goes out anyway, which is the serious version, or gets pulled the morning it was due on site.',
      },
      {
        title: 'Nobody knows which machines earn',
        body: 'Utilisation is a feeling. The units that have sat in the back corner all year get found by walking the yard, usually while looking for something else.',
      },
    ],
    modules: [
      { slug: 'rental', why: 'Hire orders, hire period, delivery and collection, and late charges, with availability checked across the whole date range before a unit is committed.' },
      { slug: 'maintenance', why: 'Workshop jobs, service due by meter reading rather than calendar guesswork, and the inspection records a machine has to carry before it can go out.' },
      { slug: 'field-service', why: 'Delivery, collection and on-site breakdown visits scheduled with the machine, the driver and the paperwork on the same job.' },
      { slug: 'fleet', why: 'Road-registered units and the yard\'s own delivery vehicles, with running cost sitting against the same unit that earns the hire revenue.' },
      { slug: 'inventory', why: 'Parts, consumables and attachments in the workshop and on the vans, so a repair cost lands on the machine that needed it.' },
      { slug: 'sign', why: 'Hand-over and off-hire condition sheets signed on the spot with a timestamp, which is what turns a damage charge into an invoice instead of an argument.' },
      { slug: 'accounting', why: 'Deposits held and released, hire invoiced on cycle, and overuse and damage charged against the contract they came from.' },
    ],
    rollout: [
      { phase: 'Fleet as units', body: 'One record per physical machine: serial, make, model, year, meter type and current reading, depot, status and purchase value. The real unit count is nearly always higher than the office believes, and this is the phase where that gets settled honestly.' },
      { phase: 'Rate cards', body: 'Hourly, daily, weekly and longer rates per category, minimum hire periods, and overrides per unit and per customer. Re-price the last quarter of hires against the new cards and explain every difference before anything goes live.' },
      { phase: 'Contracts, hand-over and off-hire', body: 'Reservation with a real availability check, condition and meter at hand-over, off-hire with overuse, deposits and damage assessment. Run in parallel with the existing hire sheet for one full cycle.' },
      { phase: 'Workshop, certificates and utilisation', body: 'Servicing that takes a unit out of availability for its window, certificate expiry that blocks despatch, then utilisation and revenue per unit against what the unit cost.' },
    ],
    prepare: [
      'A full unit list with serial numbers and current meter readings, including the machines that are out on hire today.',
      'The rate card as it is actually quoted, including the discounts that have quietly become standard.',
      'Current inspection and certificate dates per unit with the next date due, since these are what block a despatch.',
      'A deposit and damage policy: what is taken, what is released, and who authorises a retention.',
      'Delivery and collection charges by distance or zone, separated from the hire rate.',
      'The hire terms and conditions your customers already sign, so the contract on screen matches the one on paper.',
    ],
    integrations: ['Stripe', 'PayTabs', 'WhatsApp Business', 'QuickBooks', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-training', 'odoo-support'],
    solutionSlug: 'equipment-rental',
    solutionNote: 'For the feature view of rate cards, off-hire, damage and utilisation, read the solution page.',
    alsoSee: ['construction', 'logistics-transport'],
    faqs: [
      {
        q: 'Can it actually stop a double booking?',
        a: 'Yes, and it refuses rather than warns. Availability is checked across the whole requested period against existing hires, reservations and workshop bookings. A warning that can be clicked through is the same as no check at all once the desk gets busy.',
      },
      {
        q: 'Will it apply the cheapest rate automatically?',
        a: 'Yes. Five days at a daily rate is compared against the week rate and the better one wins, with the minimum hire period respected. That single behaviour usually removes most of the pricing disputes a hire desk deals with.',
      },
      {
        q: 'What happens to machines that are already out when we go live?',
        a: 'Open contracts are loaded with their start date, agreed rate and the meter reading at cutover, so the first off-hire calculates correctly. It is a small job and skipping it produces a month of wrong invoices.',
      },
      {
        q: 'Does it handle statutory inspections?',
        a: 'It holds a certificate type, an issue date, an expiry and the inspecting body per unit, and it blocks a machine going out on an expired one. The regimes themselves are named differently by country and by machine type, so certificate types are set up from your own register rather than assumed by us.',
      },
      {
        q: 'Do drivers need a laptop for hand-over?',
        a: 'A phone or tablet is enough for the condition record, the meter reading, photographs and a signature. Where a site genuinely has no coverage the sheet is completed on paper and keyed at the depot the same day, which still gives you the record that settles a damage claim.',
      },
    ],
  },

  /* ───────────── WATER DELIVERY ───────────── */
  'water-delivery': {
    h1: 'Odoo rollouts for bottled water plants and delivery rounds',
    noun: 'bottled water delivery',
    metaTitle: 'Odoo for Water Delivery: rollout plan, modules, and container control',
    metaDescription:
      'How a bottling plant or home and office water business rolls out Odoo: the returnable container ledger, deposits, coupon books and subscriptions, round reconciliation, and batch testing.',
    summary:
      'Bottling plants, distributors and home and office rounds. The container ledger, deposits, coupons and the daily run reconciliation, built before anything else is switched on.',
    intro:
      'A water business lends its stock. Most of the containers it owns are standing in other people\'s kitchens and offices, and the deposits behind them are a real liability on the balance sheet. A rollout here is a container control project first and an invoicing project second, because until the ledger per customer balances, revenue, bottle loss and deposit exposure are all estimates.',
    pains: [
      {
        title: 'Nobody agrees how many bottles a customer holds',
        body: 'The driver\'s count, the office card and the customer\'s memory all differ. The argument at the door is won by whoever pushes hardest, and the difference is written off without ever being counted as a loss.',
      },
      {
        title: 'Deposits are collected and then forgotten',
        body: 'Taken in cash at the door, noted on a card, never reconciled to anything. At year end the liability has to be estimated, and the estimate is always the number that makes the accounts work.',
      },
      {
        title: 'Coupon books are cash with no ledger',
        body: 'Sold in advance, redeemed by hand, occasionally redeemed twice. The unredeemed value sitting against the business is unknown until a customer turns up with an old book and claims it.',
      },
      {
        title: 'The run does not balance',
        body: 'Loaded, delivered and returned never reconcile to zero, and there is no moment in the day when somebody is required to explain the gap. Across a year that gap is the margin.',
      },
      {
        title: 'Traceability stops at the plant gate',
        body: 'The batch is recorded on fill, but nothing links a batch to the customers who received it. A quality problem turns into a call to the entire customer list rather than to the forty households affected.',
      },
    ],
    modules: [
      { slug: 'inventory', why: 'Full and empty containers as tracked stock by lot, in the plant, on the truck and out with customers, which is what makes the ledger balance instead of approximate.' },
      { slug: 'manufacturing', why: 'Filling recorded as a production batch with source, shift, operator and shelf life, so every bottle on a truck traces back to a fill.' },
      { slug: 'quality', why: 'A test result per batch with its limits and a pass or fail, and a batch that cannot be released onto the trucks until it has one.' },
      { slug: 'sales', why: 'Standing orders per customer by day and container type, which is what the daily run is built from rather than a phone list and a driver\'s memory.' },
      { slug: 'subscriptions', why: 'Monthly plans with a bottle allowance and an overage price, billed on a cycle instead of a receipt at every drop.' },
      { slug: 'fleet', why: 'Trucks and rounds with running cost against the round that earns the revenue, and the vehicle capacity a load out gets checked against.' },
      { slug: 'accounting', why: 'Deposit liability, monthly account statements and cash brought in per driver, posted as they happen rather than reconstructed at month end.' },
    ],
    rollout: [
      { phase: 'Container ledger and opening balances', body: 'Customers, container types, deposits held, and an opening count per customer agreed with the driver who actually serves them. This phase is slow, unglamorous and the entire value of the project. A ledger opened on office figures inherits every dispute the office already has.' },
      { phase: 'Rounds and the daily run', body: 'Round structure, standing orders, a load out counted onto the truck, delivery capture at the door, return reconciliation and cash per driver. Two weeks in parallel with the existing run sheet before the sheet is dropped.' },
      { phase: 'Coupons, subscriptions and billing', body: 'Coupon books with redemption rules and an expiry, monthly plans with allowance and overage, account statements, and deposit charges and refunds flowing to the ledger.' },
      { phase: 'Plant, batches and testing', body: 'Production batches, the test log, release control and the recall list, then dispenser and cooler rentals with their sanitisation cycle and service visits.' },
    ],
    prepare: [
      'An opening container balance per customer, walked with the driver rather than lifted from the office card.',
      'Deposit amounts by container type, and what has actually been collected against them as opposed to what should have been.',
      'Coupon books outstanding, with what has been redeemed and what has not.',
      'The round structure: driver, vehicle, day, and the stops in the order they are genuinely driven.',
      'Standing orders as they run today, including the regular customers who are on nothing formal at all.',
      'The tests your plant runs per batch and the limit each one is measured against, from whoever signs the results.',
    ],
    integrations: ['WhatsApp Business', 'Stripe', 'PayTabs', 'Razorpay', 'Power BI'],
    services: ['odoo-implementation', 'odoo-customization', 'odoo-integration', 'odoo-training', 'odoo-support'],
    solutionSlug: 'water-delivery',
    solutionNote: 'For the feature view of the container ledger, coupons, rounds and batch testing, read the solution page.',
    alsoSee: ['distribution-fmcg', 'logistics-transport'],
    faqs: [
      {
        q: 'How do we get opening bottle balances right?',
        a: 'By counting, one round at a time, with the driver who serves it. We load the ledger round by round as each one is agreed rather than waiting for the whole customer base, so the first rounds start producing a real shortfall figure while the rest are still being walked.',
      },
      {
        q: 'Do drivers need a device on the round?',
        a: 'A phone is enough to capture bottles left, empties collected, coupons taken, cash and a signature. Where coverage on a round is unreliable the run is printed and keyed back at the depot on return, and the reconciliation is identical either way.',
      },
      {
        q: 'Can we run cash, coupon, subscription and account customers on the same round?',
        a: 'Yes. The payment method sits on the customer and can be overridden on the day. Account customers get one invoice a month instead of a receipt per drop, which is usually the change that cuts office work most.',
      },
      {
        q: 'What happens when a batch fails a test?',
        a: 'It cannot be released, so it never reaches a truck. If a problem is found after release, quarantining the batch produces the list of customers who received it and how many bottles each took, which is the difference between a targeted recall and a public one.',
      },
      {
        q: 'Do dispenser and cooler rentals fit in the same system?',
        a: 'Yes. Units are tracked from stock to out on rental, in for service, returned or scrapped, with the monthly fee billed automatically and skipped where a cooler is already inside a subscription price. The sanitisation cycle raises its own next visit.',
      },
    ],
  },
};
