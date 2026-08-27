/*
 * Way4Tech module catalogue, generated from the __manifest__.py of every module in
 * the odoostore-19 repo. Name, summary, feature sections, category and price all come
 * straight from the manifest, so the site and the module cannot drift apart.
 *
 * storeUrl is only set where the listing was confirmed live on apps.odoo.com. Modules
 * that are built but not yet published carry published: false and an empty storeUrl,
 * and must not be linked to the store.
 *
 * Regenerate rather than hand-edit.
 */

export interface ModuleSection { heading: string; bullets: string[] }

export interface StoreModule {
  technical: string;
  name: string;
  summary: string;
  intro: string[];
  sections: ModuleSection[];
  category: string;
  version: string;
  price: number | null;
  currency: string;
  storeUrl: string;
  published: boolean;
}

export const MODULE_CATALOG: Record<string, StoreModule> = {
 "w4t-garage-management": {
  "technical": "w4t_garage_management",
  "name": "Auto Repair Garage & Workshop Management",
  "summary": "Garage and workshop ERP - job cards from estimate to invoice, vehicle records with VIN and odometer history, red amber green inspection sheets, flat rate labour against clocked time, parts off stock, roadworthiness tests, service reminders on mileage or months, courtesy cars and gross profit split between labour and parts.",
  "intro": [
   "Written for an independent garage, a franchise workshop or a fleet workshop. Runs on Odoo Community with Accounting and Inventory."
  ],
  "sections": [
   {
    "heading": "The job card is the spine",
    "bullets": [
     "Estimate, customer approval, work in progress, quality check, ready, invoiced. Nothing skips a step and the illegal moves are refused with a message that says what to do instead",
     "The customer authorises an amount, not just a job. Work cannot start on a job card worth more than the figure they signed for, so the awkward call happens before the spanner comes out, not after",
     "A printed job card with the authorisation wording and a signature box, which is what you hand across the counter before the vehicle goes on the ramp",
     "Complaint, diagnosis and work done kept as three separate pieces of text, because that is how a warranty claim and a comeback are argued"
    ]
   },
   {
    "heading": "The vehicle, not just the customer",
    "bullets": [
     "VIN, plate, make, model, year, engine code and size, fuel, transmission, drive, colour, kerb weight and tyre size",
     "Odometer history as its own record, one reading per visit, and a reading that goes backwards is refused unless somebody marks it a correction",
     "One customer, several vehicles. One vehicle, a full history of every job, every inspection and every certificate",
     "Key and immobiliser codes are held on the vehicle behind a group, not written on the job sheet"
    ]
   },
   {
    "heading": "The inspection sheet is what sells the work",
    "bullets": [
     "A check sheet per template: service, pre test, vehicle health check, sale preparation",
     "Red, amber or green per item, with a measurement and a note. A red or amber item is refused without one, because \"brakes: amber\" on its own sells nothing",
     "Each advisory carries the operation it needs and what that operation costs at your labour rate",
     "The customer accepts the items they want and those become labour lines on the open job in one click",
     "Upsell value, accepted value and conversion rate per inspection, per technician and per month"
    ]
   },
   {
    "heading": "Labour, time and recovery",
    "bullets": [
     "Labour is priced at flat rate hours from your own operation list, times the workshop hourly rate, with a discount and tax per line",
     "Technicians clock on and clock off against the job and, where it matters, against the individual operation",
     "Efficiency is sold hours over clocked hours, per operation, per job and per technician. Recovery is sold hours against attended hours",
     "A technician can only be clocked on to one thing at a time, which is what makes the numbers mean anything"
    ]
   },
   {
    "heading": "Parts off the shelf",
    "bullets": [
     "Parts come off the job card as a delivery from the workshop stock location, so the shelf and the accounts agree",
     "Availability shown per line before the job starts, so nobody strips a car for a part that is on back order",
     "Supplier reference and parts warranty months held on the line, and the warranty end date is what tells you whether a comeback is a claim"
    ]
   },
   {
    "heading": "Warranty and comebacks",
    "bullets": [
     "A warranty job carries its reason: manufacturer, parts supplier, our own workmanship, goodwill or a policy",
     "A comeback is raised from the original job, keeps the link, and carries its own reason code",
     "Rework is therefore visible as a number rather than as a feeling, split by reason and by technician"
    ]
   },
   {
    "heading": "Reminders that fire on whichever comes first",
    "bullets": [
     "A reminder carries a due date and a due odometer. It fires on whichever arrives first, which is how servicing actually works",
     "Intervals come from the operation where the operation has one, for example a cambelt every five years or one hundred thousand kilometres, and from the company default otherwise",
     "Passing the quality check rolls the reminder forward from the reading taken on the day"
    ]
   },
   {
    "heading": "Roadworthiness and the regulator",
    "bullets": [
     "A test record per certificate: MOT, ITV, Fahes, TUV, contro tecnico and the rest, with the scheme named on the record",
     "Test date, expiry, result, certificate number, tester and the odometer at test, with advisories and defects kept apart",
     "Only a tester with a licence number on file can be named on a certificate",
     "A daily job emails the owners whose certificate expires inside the window you set"
    ]
   }
  ],
  "category": "Services/Automotive",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/w4t_garage_management/",
  "published": true
 },
 "w4t-pharmacy-management": {
  "technical": "w4t_pharmacy_management",
  "name": "Pharmacy & Drug Store Management",
  "summary": "Retail pharmacy ERP - batch and expiry tracking on stock lots, FEFO dispensing, allergy and interaction checking, controlled drug register, generic substitution, insurance claims with co-pay split, near-expiry write-offs and margin per dispense.",
  "intro": [
   "Written for a retail chemist, a chain of drug stores, a clinic dispensary or a hospital outpatient pharmacy. Runs on Odoo Community with Inventory and Accounting."
  ],
  "sections": [
   {
    "heading": "The medicine master",
    "bullets": [
     "A medicine is a product with the things a pharmacist actually needs on it: generic name, strength, dosage form, the active molecules it contains, its therapeutic class with an ATC code, its controlled schedule, whether it is prescription only, and how it has to be stored. Reorder minimum and maximum sit on the same record, so the suggested purchase list writes itself."
    ]
   },
   {
    "heading": "Batches and expiry",
    "bullets": [
     "Every intake is a batch: batch number, expiry date, quantity, unit cost and the branch holding it. A confirmed batch is backed by a stock lot, so the batch number a regulator asks about resolves to a real traceable record in Inventory rather than a note in a spreadsheet.",
     "Dispensing pulls first expiry first out. If one batch cannot cover the quantity, the line splits across batches and each split keeps its own batch number on the label and in the register. A batch with less shelf life left than the branch allows is not offered at all."
    ]
   },
   {
    "heading": "The safety check",
    "bullets": [
     "Before anything leaves the counter the dispense is checked against the patient record and refused with the reason written out:",
     "The patient's recorded allergies, matched on the active molecule rather than the brand name, so a penicillin allergy stops a co-amoxiclav as well",
     "Interactions between everything on this dispense and everything the patient is already taking as chronic medication, graded minor through contraindicated. Major and contraindicated stop the dispense. Moderate and minor have to be acknowledged with a reason that is kept on the record",
     "Pregnancy category D and X against a patient recorded as pregnant",
     "Prescription-only medicine with no prescriber on the record, if the company has turned that requirement on",
     "Controlled medicine with no prescription at all, which is refused whatever the settings say",
     "A pharmacist whose licence has expired, or a branch whose controlled licence has expired",
     "More than the prescription authorised, and more than the counter limit for an over the counter sale"
    ]
   },
   {
    "heading": "Controlled drugs",
    "bullets": [
     "Narcotics, psychotropics, controlled medicines and precursors each have their own schedule on the medicine. Every controlled line lands in the controlled drug register: date, patient, prescriber, medicine, schedule, quantity, batch number, the pharmacist who dispensed it, the second pharmacist who witnessed it, and the balance left in that batch afterwards. The register is a searchable list you can group by schedule, medicine, pharmacist or month, and it is the screen an inspector asks to see."
    ]
   },
   {
    "heading": "Generic substitution",
    "bullets": [
     "Suggest a cheaper generic with the same molecules, the same strength and the same form, in stock now, and show what the swap saves. Molecules flagged as narrow therapeutic index are never suggested, and a prescription line marked no substitution is left alone. When a swap happens the record keeps what was prescribed as well as what was handed over."
    ]
   },
   {
    "heading": "Insurance",
    "bullets": [
     "A policy per patient with the insurer, member number, plan category, validity dates, co-pay percentage and annual limit. Dispensing splits the money between the insurer and the patient, applies the insurer's tariff discount, and leaves uninsurable items entirely on the patient. Claims carry an e-claim reference built from the company prefix, an approval code, the approved amount and, when the payer refuses, a rejection reason from the list a Gulf pharmacy sees most: not covered, policy expired, limit exceeded, no pre-approval, duplicate, invalid member, missing prescription, price above tariff.",
     "Approving a claim writes the settled split back onto the dispense and draws the approved amount down against the policy's annual limit, so the next claim knows what is left."
    ]
   },
   {
    "heading": "Expiry and write-off",
    "bullets": [
     "Two lists that a pharmacy has to work every week: stock expiring inside the warning window, and stock already expired. Both carry the money, not just the count, because the number that matters is the value sitting on the shelf that will not sell. Expired stock goes onto a write-off with a reason, an approver and a witness, and prints as a destruction certificate with every batch number on it."
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Cost is taken from the batch, not from an average, so the margin on a dispense is the margin on those specific boxes. The insurer's tariff discount comes off before the margin is worked out, which is the number that tells you whether an insurance contract is worth having. Branch level figures show the value expiring inside ninety days alongside the month's margin.",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Pharmacy",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/w4t_pharmacy_management/",
  "published": true
 },
 "way4tech-enterprise-theme": {
  "technical": "way4tech_enterprise_theme",
  "name": "Enterprise Theme (Community)",
  "summary": "Brings the full Odoo 19 Enterprise look & feel to Community Edition.",
  "intro": [
   "A faithful 1:1 port of the Odoo 19 Enterprise web theme for Community Edition. Includes: full-page home menu with the Apps grid, Enterprise navbar, command-palette deep search (menus + records), per-user Light/Dark/System color scheme with full dark-mode SCSS bundle, desktop list renderer, and all webclient SCSS overrides. No subscription required."
  ],
  "sections": [],
  "category": "Themes/Backend",
  "version": "19.0.1.0.6",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-account-asset": {
  "technical": "wt_account_asset",
  "name": "Assets & Depreciation",
  "summary": "Fixed asset register with automatic depreciation boards, posting to the ledger, revaluation, disposal and sale, for Odoo Community.",
  "intro": [
   "A fixed asset register that keeps its own books. Odoo Community has no asset management at all, so depreciation is usually kept in a spreadsheet and typed into the ledger by hand. This puts it back in Odoo."
  ],
  "sections": [
   {
    "heading": "The register",
    "bullets": [
     "An asset carries its gross value, salvage value, acquisition date and the accounts it posts to",
     "Asset types hold the defaults, so a new asset needs three fields and nothing more",
     "Book value, depreciated value and remaining value are always current",
     "Assets can be created straight from a vendor bill line, in one click"
    ]
   },
   {
    "heading": "Depreciation",
    "bullets": [
     "Three methods: straight line, declining balance, and declining balance that switches to straight line when that becomes the better figure",
     "Monthly, quarterly or yearly periods",
     "Prorata temporis, so an asset bought mid-period depreciates from the day it was bought rather than the whole period",
     "The board is recomputed whenever the asset changes, and never touches a line that has already been posted"
    ]
   },
   {
    "heading": "Posting",
    "bullets": [
     "Each depreciation line becomes a real journal entry",
     "Post by hand, or let the scheduled action post each line as it falls due",
     "The entry is linked back to the line, and the line back to the entry"
    ]
   },
   {
    "heading": "Over the asset's life",
    "bullets": [
     "Revalue upwards or downwards, with the remaining board rebuilt from the new value",
     "Pause and resume, for an asset that is out of service for a while",
     "Dispose of an asset, or sell it, and the gain or loss is worked out and posted for you",
     "A full depreciation schedule you can print for any asset or for the register",
     "Requires nothing but Odoo Accounting."
    ]
   }
  ],
  "category": "Accounting/Accounting",
  "version": "19.0.1.0.0",
  "price": 89.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_account_asset/",
  "published": true
 },
 "wt-accounting-dashboard": {
  "technical": "wt_accounting_dashboard",
  "name": "WT Accounting Analytics Dashboard",
  "summary": "Enterprise Accounting Analytics Dashboard - KPIs, P&L, AR/AP Aging, Invoices & Comparison for Odoo 19",
  "intro": [
   "WT Accounting Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive Accounting analytics dashboard with real-time KPIs, P&L overview, accounts receivable/payable aging, invoice tracking and period comparison."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "9 KPI cards: Total Revenue, Total Expenses, Net Profit, Accounts Receivable, Accounts Payable, Outstanding Invoices, Overdue Invoices, Avg Invoice Value, Tax Collected",
     "5 Tabs: Overview, P&L, AR/AP, Invoices, Comparison",
     "Smart Filters: Period, Custom Date Range",
     "Charts: Revenue vs Expenses trend, P&L waterfall, AR Aging buckets, AP Aging buckets, Invoice status breakdown, Monthly cash flow, Top customers by AR, Period Comparison",
     "Recent invoices list with status indicators",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Accounting",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_accounting_dashboard/",
  "published": true
 },
 "wt-agriculture-farm": {
  "technical": "wt_agriculture_farm",
  "name": "Agriculture & Farm Management",
  "summary": "Farm ERP - fields with land parcel references, crop cycles with gross margin per hectare, field work with labour and machinery costs, input applications with pre-harvest intervals that block an early harvest, herds, breeding, milk records and paddock rotation.",
  "intro": [
   "Built for a mixed farm: combinable crops on one side, a herd and a flock on the other, and one set of books underneath both. Runs on Odoo Community with Inventory and Accounting."
  ],
  "sections": [
   {
    "heading": "The field is the unit",
    "bullets": [
     "Every field carries its cropped area in hectares, its soil type and pH, its drainage, and the land parcel reference the subsidy scheme knows it by. The holding reference sits on the company and the parcel reference on the field, and the two together are what an inspector writes down.",
     "A crop cycle ties one crop to one field for one season. Everything booked against it lands in the same place, which is the only way a gross margin per hectare means anything."
    ]
   },
   {
    "heading": "Field work, costed as it happens",
    "bullets": [
     "A field activity is one pass over a field: the plough, the drill, the sprayer, the crop walk. It records the hours each person was on it, how many of them there were, the machine hours, and what went on the ground. Labour and machinery are costed at the rates set on the settings page, so the cost of a pass is known the day it is booked, not the following spring.",
     "Inputs come out of the store. Seed, fertiliser and sprays are drawn from a stock location when the pass is booked as done, so the tonnage on the farm records and the tonnage in the store agree."
    ]
   },
   {
    "heading": "Pre-harvest intervals that actually hold",
    "bullets": [
     "Every input line is also the statutory application record. It carries the product, the active substance, the batch number off the container, the rate per hectare and the pre-harvest interval off the label.",
     "The system works out the date the field is clear again and refuses to confirm a harvest before it. That is the rule that keeps a load saleable. A nightly job lets yesterday's intervals expire, so a field that was blocked this morning is available this afternoon without anybody editing anything.",
     "Two more label rules are enforced the same way. An application above the maximum dose per hectare is refused, because an over-dose is a rejected load. A spray booked as done on a day the weather log says was too windy is refused, because drift lands on somebody else's crop."
    ]
   },
   {
    "heading": "Traceability from the lot back to the ground",
    "bullets": [
     "Every harvest gets a lot reference built from the farm, the land parcel and the record number. The harvest passport lists every product that went on that ground from drilling to the day it was cut, with dates, rates and batch numbers. After a residue query comes in, that sheet is the answer."
    ]
   },
   {
    "heading": "The money",
    "bullets": [
     "Costs are gathered per cycle: seed, inputs, labour, machinery and anything else booked against the crop. Output is gathered the same way: tonnage as weighed, tonnage shrunk back to the moisture the contract pays on, and the value.",
     "The value follows the shrunk tonnage, not the weighbridge ticket, because that is the weight a contract settles on. Wet grain weighs more and is worth the same.",
     "From that you get gross margin per hectare and cost per tonne, per crop, per field and per season. The cost per tonne is the number to take into a conversation with a merchant.",
     "Harvests invoice straight out to the buyer with the right tax and the lot reference on the line, at the shrunk tonnage and in the company currency."
    ]
   },
   {
    "heading": "Livestock",
    "bullets": [
     "Herds and flocks, and individual animals under them with the official ear tag, the breed, the dam and the sire. Weight records give a daily gain figure, which is what tells you whether the ration is working.",
     "Breeding records work out the expected calving from the service date and the gestation for the species. Recording the calving creates the calves in the herd with the dam already filled in. Milk, eggs and wool go into a production log, per herd or per animal, with butterfat, protein and cell count."
    ]
   },
   {
    "heading": "Grass",
    "bullets": [
     "Paddocks with an area, a sward type and a stocking limit. Grazing blocks move a herd on and off, and the rest days since the last herd came off are refreshed nightly. Turning stock back onto ground that has not had its rest is refused, and so is putting more head on a paddock than it will carry."
    ]
   },
   {
    "heading": "Weather",
    "bullets": [
     "A line a day per field: rainfall, minimum and maximum temperature, wind and humidity. The wind reading is read back by the spray check, and the rainfall is what explains a yield twelve months later when nobody remembers the summer."
    ]
   }
  ],
  "category": "Services/Agriculture",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_agriculture_farm/",
  "published": true
 },
 "wt-ai-assistant": {
  "technical": "wt_ai_assistant",
  "name": "AI Assistant for Odoo",
  "summary": "Claude inside Odoo - summarise records, draft replies, write product descriptions and qualify leads, with reusable prompts and full token logging.",
  "intro": [
   "Puts Anthropic's Claude behind an Ask Claude button on your leads, quotations, products and contacts. Built on the official Anthropic SDK, using your own API key, so nothing is resold and no data passes through a middleman."
  ],
  "sections": [
   {
    "heading": "What ships with it",
    "bullets": [
     "Summarise this record, for a long thread you have to pick up",
     "Draft a reply to the last customer message, using the chatter as context",
     "Write a product description from the product's own data",
     "Qualify a lead, with a score out of 100 and the reasoning behind it",
     "Translate a text into another language",
     "Extract the action points from a conversation"
    ]
   },
   {
    "heading": "Prompts are records",
    "bullets": [
     "Every prompt is editable, with {{field}} placeholders pulled from the record",
     "Bind a prompt to a model so it only appears where it makes sense",
     "Optionally write the answer straight into a field, or post it in the chatter",
     "Add your own prompts without writing code"
    ]
   },
   {
    "heading": "Kept honest",
    "bullets": [
     "Every call is logged with its prompt, answer and token count, so you can see what the assistant costs",
     "Answers are shown for review first; nothing is written to a record until you accept it",
     "Simulation Mode returns a canned answer, so you can build and demo prompts before spending anything",
     "A declined request is reported as such rather than silently returning nothing"
    ]
   },
   {
    "heading": "What you need",
    "bullets": [
     "An Anthropic API key from console.anthropic.com, and the Python package \"anthropic\" on the Odoo server::",
     "pip install anthropic",
     "Without it the module still installs and runs in Simulation Mode."
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 199.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_ai_assistant/",
  "published": true
 },
 "wt-appointment-booking": {
  "technical": "wt_appointment_booking",
  "name": "Online Appointment Booking",
  "summary": "Publish bookable appointment types on your website. Timezone correct slots, staff and resource assignment, confirmation and reminder emails, cancel and reschedule.",
  "intro": [
   "Let people book time with you from your website, and have it land in Odoo as a real calendar meeting. Odoo Community has no appointment scheduling at all, so booking usually happens by email, by phone, or through a separate service that never quite syncs back."
  ],
  "sections": [
   {
    "heading": "Appointment types",
    "bullets": [
     "Duration, and a buffer before and after so nothing is booked back to back",
     "A notice period, so nobody books you for ten minutes from now",
     "A booking window, so nobody books you eighteen months out",
     "Weekly availability, set as ranges per weekday",
     "Published or unpublished, each with its own web address"
    ]
   },
   {
    "heading": "Who the booking is with",
    "bullets": [
     "Staff, taken from your Odoo users",
     "Or resources: rooms, chairs, bays, tables, each with a capacity",
     "Let the visitor choose, assign at random, or require everyone to be free"
    ]
   },
   {
    "heading": "Slots that are actually free",
    "bullets": [
     "Availability is worked out against the real calendar, so a slot disappears the moment the meeting that would clash is created",
     "Existing bookings, buffers and the notice period are all taken into account",
     "Everything is computed in the appointment's own timezone and shown to the visitor in theirs, so a booking made from another country lands correctly"
    ]
   },
   {
    "heading": "After the booking",
    "bullets": [
     "A calendar meeting with the customer as an attendee",
     "A confirmation email, and a reminder before the appointment",
     "The customer can cancel or reschedule from a link in the email, within the limits you set",
     "Questions you set per appointment type, answered at booking time and kept on the record",
     "Requires nothing but the Website and Calendar apps."
    ]
   }
  ],
  "category": "Services/Appointment",
  "version": "19.0.1.0.0",
  "price": 79.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_appointment_booking/",
  "published": true
 },
 "wt-approval-workflow": {
  "technical": "wt_approval_workflow",
  "name": "Approval Workflow",
  "summary": "Multi-level approval for sales orders, purchase orders and invoices, driven by amount bands and conditions.",
  "intro": [
   "Stop documents leaving the building without a signature. Sales orders, purchase orders and invoices can each be held until the right people have approved them."
  ],
  "sections": [
   {
    "heading": "Rules",
    "bullets": [
     "One rule per document type, narrowed by an Odoo domain and an amount band",
     "Rules are ordered; the first one that matches owns the document",
     "Several rules can coexist, for example a light rule under 5,000 and a stricter one above it"
    ]
   },
   {
    "heading": "Levels",
    "bullets": [
     "As many approval steps as you need, in order",
     "Each step is either a list of named users or anyone in a group",
     "A step can be skipped below a threshold, so only large documents reach the director",
     "Approvers get a to-do activity when their turn arrives"
    ]
   },
   {
    "heading": "In use",
    "bullets": [
     "Confirming or posting a document that needs approval sends it for sign-off instead of letting it through",
     "Approve or reject from the document itself, or from the request",
     "A rejection can be sent round again once the document is corrected",
     "Every step is stamped with who approved it and when, in the chatter",
     "Nothing is enforced until you create a rule, so installing the module changes no existing behaviour."
    ]
   }
  ],
  "category": "Extra Tools",
  "version": "19.0.1.0.0",
  "price": 89.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_approval_workflow/",
  "published": true
 },
 "wt-audit-log": {
  "technical": "wt_audit_log",
  "name": "Audit Log & Access Tracking",
  "summary": "Track who created, changed or deleted records - full audit trail with field-level history and access-rights tracking.",
  "intro": [
   "Know exactly who changed what, and when - across any Odoo model."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Define audit rules per model - track creations, updates and deletions",
     "Field-level history - see the old value and the new value of every change",
     "Track access-rights changes - users, groups and permissions out of the box",
     "Immutable log - entries cannot be edited, only reviewed",
     "Powerful analysis - filter and pivot by user, model, operation and date",
     "OWL audit dashboard - activity at a glance",
     "Automatic retention - old entries are purged on a configurable schedule",
     "Zero impact when idle - non-audited models run at full speed"
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_audit_log/",
  "published": true
 },
 "wt-auto-cancel-quotation": {
  "technical": "wt_auto_cancel_quotation",
  "name": "Auto-Cancel Expired Quotations",
  "summary": "Scheduled action that cancels quotations whose validity date has passed.",
  "intro": [
   "A daily scheduled action cancels every quotation (draft / sent) whose expiration date is in the past - keeping the quotations list clean and the pipeline honest."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Uses the standard quotation *Expiration* date - no extra fields.",
     "Each cancellation is isolated: one failing quotation never blocks the rest of the run.",
     "The scheduled action is enabled by default; disable it under Settings > Technical > Scheduled Actions if not wanted."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_auto_cancel_quotation/",
  "published": true
 },
 "wt-auto-confirm-so": {
  "technical": "wt_auto_confirm_so",
  "name": "Auto-Confirm Aged Quotations",
  "summary": "Scheduled action that confirms quotations older than a configurable number of days.",
  "intro": [
   "A daily scheduled action confirms quotations that have been sitting in draft / sent state for longer than a set number of days."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Threshold is a system parameter ``wt_auto_confirm_so.days`` (default 7) - change it under Settings > Technical > System Parameters.",
     "The scheduled action ships **disabled** - enable it under Settings > Technical > Scheduled Actions when you are ready.",
     "Each confirmation is isolated: one failing quotation never blocks the rest of the run."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_auto_confirm_so/",
  "published": true
 },
 "wt-auto-delivery": {
  "technical": "wt_auto_delivery",
  "name": "Auto-Validate Delivery on Sale Confirm",
  "summary": "Automatically validate the delivery transfer when a sale order is confirmed - no manual delivery step.",
  "intro": [
   "When a sale order is confirmed, its outgoing delivery transfer is validated automatically: every move quantity is set to the ordered quantity and the picking is marked done."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Saves the manual \"Validate\" click on every delivery.",
     "Safe: if a transfer cannot be auto-validated (e.g. it needs a backorder decision) the sale order still confirms normally.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Inventory/Inventory",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_auto_delivery/",
  "published": true
 },
 "wt-auto-receipt": {
  "technical": "wt_auto_receipt",
  "name": "Auto-Validate Receipt on Purchase Confirm",
  "summary": "Automatically validate the receipt transfer when a purchase order is confirmed - no manual receiving step.",
  "intro": [
   "When a purchase order is confirmed, its incoming receipt transfer is validated automatically: every move quantity is set to the ordered quantity and the picking is marked done."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Saves the manual \"Validate\" click on every receipt.",
     "Safe: if a transfer cannot be auto-validated the purchase order still confirms normally.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Inventory/Purchase",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_auto_receipt/",
  "published": true
 },
 "wt-bank-statement-import": {
  "technical": "wt_bank_statement_import",
  "name": "Bank Statement Import (OFX, QIF, CAMT.053, CSV)",
  "summary": "Import bank statements from OFX, QIF, CAMT.053 and CSV files, with duplicate protection, journal matching and partner matching, for Odoo Community.",
  "intro": [
   "Odoo Community can create a bank statement but it cannot read one. This adds the file import: pick the file the bank gave you, and the statement and its lines are created for you."
  ],
  "sections": [
   {
    "heading": "Four formats",
    "bullets": [
     "OFX, in both the SGML flavour that most banks still export and the XML flavour of OFX 2. Parsed here, with no external library to install",
     "QIF, the line prefix format Quicken made and half the smaller banks copied",
     "CAMT.053, the ISO 20022 end of day statement, read without caring which version of the schema the bank used",
     "CSV, driven by a column mapping you set up once per bank"
    ]
   },
   {
    "heading": "Nothing is imported twice",
    "bullets": [
     "Every line keeps the reference it was imported under, and that reference is checked against the journal before anything is written",
     "Files that overlap are the normal case, not the exception: a download of \"the last 30 days\" run weekly repeats three weeks every time",
     "Formats that carry no reference of their own, such as QIF and most CSV exports, get a fingerprint derived from the transaction itself, so the same file loaded twice still imports nothing the second time",
     "The wizard says how many lines were imported and how many were skipped, and the skipped ones are listed by name"
    ]
   },
   {
    "heading": "The right journal, the right currency",
    "bullets": [
     "The account number in the file is matched against the bank account on the journal, including files that print only the last digits",
     "A file issued in a currency the journal does not keep is refused before anything is written, rather than producing a statement that cannot be reconciled"
    ]
   },
   {
    "heading": "Partners",
    "bullets": [
     "Matched on the counterparty account number first, because a name on a bank line can be anything but an account number belongs to one person",
     "Then on the name, and only when exactly one partner has it"
    ]
   },
   {
    "heading": "An audit trail",
    "bullets": [
     "Every import is recorded: the file, the journal, what was created, what was skipped and who ran it",
     "Searchable by the bank's reference, so \"why is this payment not in Odoo\" has an answer",
     "Printable as a PDF"
    ]
   },
   {
    "heading": "The CSV mapping",
    "bullets": [
     "Separator, quote character, encoding, header row and lines to skip",
     "Columns matched by heading or by position",
     "Date format, decimal separator and thousands separator",
     "One signed amount column, or a debit column and a credit column",
     "Save one mapping per bank and attach it to the journals it belongs to",
     "Unrecognised files are reported in plain language. A PDF statement, a spreadsheet, a camt.052 intraday report: each gets told what it is and what to ask the bank for instead.",
     "Requires nothing but Odoo Accounting."
    ]
   }
  ],
  "category": "Accounting/Accounting",
  "version": "19.0.1.0.0",
  "price": 79.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_bank_statement_import/",
  "published": true
 },
 "wt-barcode-scanner-offline": {
  "technical": "wt_barcode_scanner_offline",
  "name": "Barcode Price Checker Kiosk - Self-Service & Offline",
  "summary": "Self-service barcode price checker kiosk for retail & supermarket stores - customers scan any item and instantly see its price & stock. Full-screen, works 100% offline with any USB/Bluetooth scanner; self-healing cache, auto-refresh.",
  "intro": [
   "Turn every \"how much is this?\" into a self-service scan. Mount a tablet or touchscreen on a shelf edge or wall and let **customers check any product's price themselves** - they scan the barcode and instantly see the product name, code, **live stock and price**, then the screen resets for the next shopper. No staff interruptions, no queues at the counter."
  ],
  "sections": [
   {
    "heading": "Built for real shop floors",
    "bullets": [
     "The catch with a normal web price page is that it dies the moment the Wi-Fi blinks. This one doesn't. It caches your whole catalog in the browser on first open and keeps working **100% offline**, so the kiosk never shows a customer a spinning loader or an error."
    ]
   },
   {
    "heading": "Key features",
    "bullets": [
     "**Self-service price checking** - shoppers scan and see the price on their own; staff stop answering \"what's the price of this?\" all day.",
     "**Works completely offline** - every active product is cached locally (IndexedDB), so lookups are instant and survive a dropped connection.",
     "**Self-healing cache** - a corrupted or locked local store is detected and rebuilt automatically. No more \"please clear your cache\" support calls.",
     "**Always fresh** - re-syncs quietly in the background the moment connectivity returns, so prices and new products stay current.",
     "**Any barcode scanner** - works out of the box with any USB or Bluetooth keyboard-wedge scanner; a hidden input stays focused so nobody clicks first.",
     "**Online fallback** - scan a brand-new product that isn't cached yet and it looks it up on the server and caches it on the fly.",
     "**Branded & multi-currency** - shows your company name, logo and the right currency symbol and position automatically.",
     "**Secure** - the kiosk page and its data require a logged-in internal user."
    ]
   },
   {
    "heading": "Perfect for",
    "bullets": [
     "Supermarkets, grocery and convenience stores, retail chains, hardware and DIY shops, pharmacies, bookshops, marketplace / multi-vendor stores, warehouses and receiving docks - anywhere a fast, reliable **barcode-to-price lookup** saves staff time and keeps customers moving.",
     "Launch it from the **Offline Scanner** app menu (opens full-screen in its own tab)."
    ]
   }
  ],
  "category": "Inventory/Inventory",
  "version": "19.0.1.0.1",
  "price": 15.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_barcode_scanner_offline/",
  "published": true
 },
 "wt-barcode-warehouse": {
  "technical": "wt_barcode_warehouse",
  "name": "Warehouse Barcode Operator",
  "summary": "Scanner-driven picking, receiving and stock counting, with every scan applied once even when the handset retries.",
  "intro": [
   "Barcode scanning for transfers and stock counts, built so that a handset on a bad connection cannot adjust stock twice."
  ],
  "sections": [
   {
    "heading": "The problem it solves",
    "bullets": [
     "A scanner in a warehouse is not a browser on a desk. It loses signal in the racking, the operator presses send again, and the request that looked lost arrives after all. Anything that adds a quantity on the way in will add it twice. That is how a warehouse ends up with a count nobody can explain.",
     "Every command this module accepts carries a reference generated on the handset before the request is sent. Those references are held behind a unique database index. A repeat lands on its own earlier row and does nothing, and the answer the first request got is handed back instead. It is the same guarantee whether the repeat comes a second later or a day later."
    ]
   },
   {
    "heading": "Resolving a barcode",
    "bullets": [
     "One server call turns a barcode into a typed answer: a transfer, a location, a package, a product, a packaging unit, or a lot",
     "The company barcode nomenclature is walked first, so weight-embedded and aliased barcodes are read the way the warehouse has already set them up",
     "Matching runs narrowest first: transfer, then location, then package, then product and packaging, then lot",
     "A lot number is only ever matched against the product being scanned, since lot numbers are not unique between products and guessing is how the wrong item gets booked",
     "Nothing about what a barcode means is decided in the browser"
    ]
   },
   {
    "heading": "Picking, receiving and internal moves",
    "bullets": [
     "A queue of scans is applied in one transaction, so a batch either lands whole or not at all",
     "Operations are created or added to correctly, with the unit of measure converted once so the checks compare like with like",
     "The operation type decides whether over-picking is allowed and whether a product nobody ordered can be added",
     "Lots and serial numbers follow the operation type: an unknown number is created only where the type allows it, and refused with a plain sentence where it does not",
     "A serial number is one unit and cannot be scanned twice onto the same transfer",
     "A scanned source or destination is checked against the transfer, so stock cannot be booked out of an aisle that never held it",
     "Validation from the handset decides the backorder up front rather than stopping to ask"
    ]
   },
   {
    "heading": "Stock counts that survive a shift change",
    "bullets": [
     "A count is a record: it is started, scanned against, put down, picked up by somebody else and applied when it is ready",
     "Blind counting keeps the expected figure off the handset",
     "Counting never invents a lot number, because a number that is not in the system is a question, not a data entry",
     "Applying writes each counted figure onto its stock record and posts the adjustment, once. A line that has been applied is never written again, so a second press of the button changes nothing",
     "Applying needs its own group. Counting is a floor job; changing stock is not",
     "A printable count sheet with the difference on every line"
    ]
   },
   {
    "heading": "The handset screen",
    "bullets": [
     "A mobile-first screen with a permanently focused hidden input, so a keyboard-wedge scanner has somewhere to type without anybody tapping a field. Scans queue on the device and are sent as a batch. The screen draws what the server sends it and nothing else, which means the same rules apply to a script, a controller or a different front end later.",
     "Requires Inventory. Works with Odoo 19 Community and Enterprise."
    ]
   }
  ],
  "category": "Inventory/Inventory",
  "version": "19.0.1.0.0",
  "price": 149.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_barcode_warehouse/",
  "published": true
 },
 "wt-budget-control": {
  "technical": "wt_budget_control",
  "name": "Budgets and Commitment Control",
  "summary": "Budgets by analytic account and account group, with committed spend from confirmed purchase orders and an optional block on orders that would go over budget.",
  "intro": [
   "A budget that counts money already promised, not only money already spent. Once a purchase order is confirmed the money is gone, even though no bill has arrived yet. A budget built on posted entries alone cannot see that, which is why budgets look healthy right up to the week the invoices land."
  ],
  "sections": [
   {
    "heading": "What a budget line watches",
    "bullets": [
     "An analytic account, an account group, or both together",
     "Planned amount, for the period the budget covers",
     "Actual, from posted journal items in that period",
     "Committed, from confirmed purchase orders that have not been billed yet",
     "Available, which is planned less actual less committed",
     "Achievement and consumption, as percentages"
    ]
   },
   {
    "heading": "Commitment control",
    "bullets": [
     "Committed spend is read from confirmed purchase orders, taking only the part that has not been invoiced, so nothing is counted twice",
     "Analytic distributions are honoured, so a line split 60/40 across two analytic accounts adds 60 percent to one budget and 40 percent to the other",
     "Purchase order currencies are converted to the company currency",
     "The purchase module is optional. Without it the module still installs and runs, and committed simply reads zero"
    ]
   },
   {
    "heading": "The hard block",
    "bullets": [
     "Turn on Block Over Budget on a budget and any purchase order that would push one of its lines past the planned amount is refused at confirmation",
     "The message names the budget line, the planned figure, what is already spent and committed, what the order adds and the resulting overspend",
     "A tolerance percentage lets small overruns through when that is the policy",
     "Only confirmed budgets block, so a draft budget never gets in anyone's way"
    ]
   },
   {
    "heading": "Reporting",
    "bullets": [
     "Budget lines grouped by analytic account, with planned, actual, committed and available side by side",
     "Pivot and graph views over the same figures",
     "A printable PDF for one budget or for a selection of budgets",
     "The available column is coloured once a line passes its warning threshold, and turns red when it goes negative",
     "Figures are stored, so they can be grouped and pivoted. A daily scheduled action refreshes them, and a Refresh button on the budget does the same on demand. Requires nothing but Odoo Accounting."
    ]
   }
  ],
  "category": "Accounting/Accounting",
  "version": "19.0.1.0.0",
  "price": 99.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_budget_control/",
  "published": true
 },
 "wt-car-wash-pos": {
  "technical": "wt_car_wash_pos",
  "name": "WT POS Car Wash",
  "summary": "Car wash appointments and services in POS - integrates with Car Wash Management",
  "intro": [],
  "sections": [],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_car_wash_pos/",
  "published": true
 },
 "wt-carwash-management": {
  "technical": "wt_carwash_management",
  "name": "WT Car Wash Management",
  "summary": "Complete Car Wash ERP - Bookings, Wash Packages, Service Bays, Staff, Commissions, Portal Booking & Invoicing",
  "intro": [
   "Way4Tech Car Wash Management is a complete Car Wash ERP for Odoo 19. Manage wash bookings, service packages, bay allocation, staff scheduling, online portal booking, staff commissions, invoicing integration, thermal receipt printing, multi-stage workflow and role-based access control."
  ],
  "sections": [],
  "category": "Services/Car Wash",
  "version": "19.0.1.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_carwash_management/",
  "published": true
 },
 "wt-construction-management": {
  "technical": "wt_construction_management",
  "name": "Construction & Material Management",
  "summary": "Complete construction project, BoQ, materials, labour, equipment, subcontracts, costing & analytics for Odoo 19.",
  "intro": [
   "An end-to-end construction-management suite for contractors, builders and real-estate developers - built for Odoo 19 Community."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Construction projects - extends the Odoo Project app with contract value, site address, project code, phases and progress",
     "Phases - schedule, budget and progress per construction stage",
     "Bill of Quantities (BoQ) - work items with unit, quantity, rate and amount",
     "Material management - site material requisitions, issue and consumption with cost tracking (materials are standard Odoo products)",
     "Labour - daily labour deployment logs with wage costing by trade",
     "Equipment - machinery register, owned or rented, with usage costing",
     "Subcontracts - subcontractor work orders, contract value and billing",
     "Site expenses - transport, utilities, permits, safety and more",
     "Costing - live budget vs actual, project margin and cost breakdown",
     "Analytics - OWL Construction Control dashboard, pivots and graphs",
     "Reporting - Bill of Quantities, material requisition and progress reports",
     "Security - Site Engineer / Project Manager / Administrator roles"
    ]
   }
  ],
  "category": "Services/Construction",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_construction_management/",
  "published": true
 },
 "wt-coworking-space": {
  "technical": "wt_coworking_space",
  "name": "Coworking & Flexible Workspace Management",
  "summary": "Coworking and serviced office ERP - hot desks, dedicated desks, private offices and meeting rooms with a clash check, membership plans with meeting room credits, company accounts, day passes, check in and check out with live occupancy, registered address and mail handling, and one monthly invoice per account.",
  "intro": [
   "Built for an operator running one building or ten: a coworking space, a serviced office, a managed workspace floor inside somebody else's building. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "What there is to sell",
    "bullets": [
     "Every seat and every room is a record with a rate on it. A hot desk bank is one record with as many seats as it has chairs, so twenty four people can book it at once and the twenty fifth is refused. A meeting room is one record with the seats round the table, and nobody else gets it while it is booked. Phone booths, private offices and the event space work the same way, with their own hourly and daily rates, their own minimum booking, and a turnaround gap between meetings so the room can be reset.",
     "Amenities are recorded per room and printed on the booking confirmation. A room advertised as having video conferencing and then not having it is the fastest way to lose a renewal."
    ]
   },
   {
    "heading": "Membership plans and who pays",
    "bullets": [
     "A plan is a monthly fee and what comes with it: meeting room credits, a printing allowance, guest day passes, and the hours the member can get in. Members sit on a plan at a building. They either pay for themselves or sit under a company account, where one company pays for several people and gets one invoice a month.",
     "The member record carries the access card number, the emergency contact, the desk they have been given and the credits they have left this month. Card numbers and next of kin are limited to the people who need them, because a name and a card number together is all anybody needs to walk in."
    ]
   },
   {
    "heading": "Bookings that behave",
    "bullets": [
     "A booking checks that the space is free, honours the turnaround between meetings, refuses more people than there are seats, refuses a room outside the hours the building is open unless the member is on a 24/7 plan, and refuses a booking further ahead than the diary is open.",
     "Credits are spent before any money is charged. When they run out the booking is priced at the plan's overage rate, and that overage is what lands on the monthly invoice. Cancel in good time and the credits come back. Cancel inside the window, or fail to turn up at all, and the slot is charged at the percentage the operator sets, because the room sat empty either way.",
     "Spaces can be marked as needing approval. Worth switching on for an event space, where a Saturday booking means somebody has to open the building."
    ]
   },
   {
    "heading": "Who is in the building",
    "bullets": [
     "Members badge in and out. The open visits are the live head count per building, which is the occupancy figure at the front desk and the fire roll call at the same time. An hourly job closes visits nobody badged out of, so the number still means something in the morning.",
     "Day passes cover the rest: a walk-in paying at the desk, a member's guest coming off the plan's guest passes, or a company's visitor going on the monthly bill."
    ]
   },
   {
    "heading": "Registered address and the post",
    "bullets": [
     "A registered office or trading address is a service in its own right, with the exact legal name and company number of the entity using the address. In most countries the operator carries a statutory duty to know, and to be able to show, who is using its address. The service records which identity document was seen, by whom and when, and refuses to go live until it has been. A document that expires suspends the service, because the duty is continuous rather than a formality at sign-up.",
     "Every letter and parcel is logged against the company it was addressed to, with who collected it and when. On court papers and tax letters that record is the whole service."
    ]
   },
   {
    "heading": "One invoice a month",
    "bullets": [
     "The billing run gathers the month: plan fees, meeting room time past the credits, printing over the allowance, add-ons such as parking, lockers and mail handling, day passes put on account, and any late cancellation or no show charges. It raises one invoice per payer, stamps every source record so nothing is billed twice, and resets the monthly allowances."
    ]
   },
   {
    "heading": "The figures an operator is judged on",
    "bullets": [
     "Desk occupancy against desk capacity, per building and against a target. Revenue per square metre against the property cost per square metre, so a busy building can be told apart from a profitable one. Average revenue per member. Room utilisation over the last thirty days, which is what tells you whether to build another meeting room or sell the one you have harder. And a revenue analysis that splits the money into membership, rooms, add-ons and day passes, which is the split most operators never measure.",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Workspace",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_coworking_space/",
  "published": true
 },
 "wt-crm-dashboard": {
  "technical": "wt_crm_dashboard",
  "name": "WT CRM Analytics Dashboard",
  "summary": "Enterprise CRM Analytics Dashboard - KPIs, Pipeline, Leads, Team Performance & Comparison for Odoo 19",
  "intro": [
   "WT CRM Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive CRM analytics dashboard with real-time KPIs, pipeline tracking, lead analytics, team performance and period comparison."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "12 KPI cards: New Leads, Opportunities, Won Count, Won Revenue, Lost, Pipeline Count, Pipeline Value, Expected Revenue, Win Rate, Avg Deal Value, Team Members, Overdue Activities",
     "5 Tabs: Overview, Pipeline, Leads, Team, Comparison",
     "Smart Filters: Period, Custom Date Range, Salesperson",
     "Charts: Pipeline by Stage, Won vs Lost trend, Lead Sources, Top Salespeople, Revenue by Month, Activity breakdown, Period Comparison",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "CRM",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_crm_dashboard/",
  "published": true
 },
 "wt-custom-backend-theme": {
  "technical": "wt_custom_backend_theme",
  "name": "WT Custom Backend Theme",
  "summary": "Customizable backend theme - color presets, side menu, fully responsive, Odoo 19 Community",
  "intro": [
   "Way4Tech custom backend theme with color picker, side navigation, enterprise-style home menu."
  ],
  "sections": [],
  "category": "Theme/Backend",
  "version": "19.0.1.0.0",
  "price": 15.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-dashboard-builder": {
  "technical": "wt_dashboard_builder",
  "name": "Dashboard Builder - Drag & Drop KPI Dashboards",
  "summary": "Build live KPI dashboards on any Odoo model - numbers, bar charts, ranked lists & progress, with drag-and-drop tiles.",
  "intro": [
   "Create unlimited live dashboards on any Odoo model - no code required."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Point a tile at any model, pick a measure (count, sum, average, min, max) and an optional filter domain",
     "Four tile types - KPI number, bar chart, ranked list and progress gauge",
     "Group bar charts and lists by any field (links, selections, dates…)",
     "Drag-and-drop tiles to arrange each dashboard exactly how you want",
     "Restrict dashboards to specific user groups",
     "A modern OWL interface with one-click refresh",
     "Works with every Odoo app - Sales, CRM, Inventory, Accounting and your own custom modules"
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_dashboard_builder/",
  "published": true
 },
 "wt-db-backup-cloud": {
  "technical": "wt_db_backup_cloud",
  "name": "Cloud Backup Pro - Multi-Destination Encrypted Database & Filestore Backup",
  "summary": "Encrypted, scheduled Odoo database + filestore backup to S3, SFTP, Local NAS, Google Drive, Dropbox and OneDrive. GFS retention, integrity verification, one-click restore, health dashboard, email/webhook alerts.",
  "intro": [
   "The serious backup solution for Odoo Community and Enterprise."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Multi-destination - same backup to S3 + Google Drive + Dropbox + OneDrive + SFTP + Local NAS in one run.",
     "Encryption at source - AES-256-GCM streaming so the cloud provider never sees your data.",
     "Smart GFS retention - keep last 7 daily, 4 weekly, 12 monthly automatically.",
     "Multi-database - back up every database on the server with one config.",
     "Backup health dashboard - graph of last 30 days, success rate per destination.",
     "Integrity verification - SHA-256 manifest signed for every backup.",
     "One-click restore - pick any backup, restore to a new database for drill testing.",
     "Pre-backup hooks - run VACUUM ANALYZE or custom Python before dump.",
     "Bandwidth throttle - cap upload speed during business hours.",
     "Email + webhook alerts - Slack, Telegram, Discord, generic webhook.",
     "Manifest signing - tamper-evident metadata sidecar per backup.",
     "Detailed transcript per run - what was backed up, sizes, durations, errors."
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "odoo backup s3, automatic database backup, cloud backup, disaster recovery, off-site backup, encrypted backup, gdrive backup, dropbox backup, onedrive backup, sftp backup, retention policy, gfs grandfather father son, restore wizard, multi-database backup, postgres dump cloud, filestore backup, odoo community backup, backup health dashboard, backup verification, backup encryption, aes-256, key rotation, backup manifest, off-site disaster recovery, ransomware protection, multi-cloud backup"
    ]
   }
  ],
  "category": "Tools",
  "version": "19.0.1.0.1",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_db_backup_cloud/",
  "published": true
 },
 "wt-debrand-odoo": {
  "technical": "wt_debrand_odoo",
  "name": "Odoo Debranding / White Label",
  "summary": "White-label Odoo completely - replace the Odoo name, logo, favicon and \"Powered by Odoo\" everywhere with your own brand, driven from the Company form.",
  "intro": [
   "Turn Odoo into *your* product. One module, one switch - every visible trace of the Odoo brand is replaced with your company name, logo and favicon, and it all stays dynamic from the Company settings form."
  ],
  "sections": [
   {
    "heading": "What gets debranded",
    "bullets": [
     "Browser tab title - every backend, portal and website page",
     "Favicon - served live from your Company favicon",
     "Login / sign-in page - logo and the \"Powered by Odoo\" credit",
     "\"Powered by Odoo\" - backend, portal and website footers",
     "Notification emails - both email layouts, footer credit",
     "The user menu - removes the \"My Odoo.com Account\" and \"Support\" links",
     "OdooBot - renamed to your own brand bot in chatter messages",
     "All of it is multi-company aware"
    ]
   },
   {
    "heading": "How it works",
    "bullets": [
     "Open *Settings -> Companies -> your company -> White Label* tab. Set a system / brand name (or leave blank to use the Company Name), upload a favicon and logo, and you are done. Nothing is hard-coded - change the company name and the whole system follows."
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "debrand odoo, white label odoo, remove powered by odoo, custom branding, rebrand odoo, hide odoo, custom favicon, custom logo, white-label erp, odoo branding, remove odoo name, custom title"
    ]
   }
  ],
  "category": "Tools",
  "version": "19.0.1.0.0",
  "price": 24.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_debrand_odoo/",
  "published": true
 },
 "wt-default-filters": {
  "technical": "wt_default_filters",
  "name": "Default List Filters",
  "summary": "Ship ready \"My Orders / My Invoices\" default filters for Sales, Purchase and Invoicing lists.",
  "intro": [
   "Adds shared, ready-to-use default filters so the busiest lists open already focused on the current user's own records:",
   "Each filter is a normal saved favourite - users can switch it off, or managers can tweak / remove it under Settings > Technical > User-defined Filters. Pure data module, nothing to configure."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "**Sales Orders** → My Orders",
     "**Purchase Orders** → My Orders",
     "**Invoices & Bills** → My Documents"
    ]
   }
  ],
  "category": "Tools",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_default_filters/",
  "published": true
 },
 "wt-delivery-carrier-connector": {
  "technical": "wt_delivery_carrier_connector",
  "name": "Gulf and South Asia Shipping Carriers",
  "summary": "Aramex, SMSA, Naqel, Leopards and TCS shipping connector: rates, waybills, labels, cancellation and tracking, with a simulation mode and a full call log.",
  "intro": [
   "Odoo ships connectors for FedEx, UPS and DHL. If your warehouse is in Riyadh, Jeddah, Dubai, Karachi or Lahore, those are not the carriers on your loading bay. This connects the five that are: Aramex, SMSA Express, Naqel Express, Leopards Courier and TCS."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Adds each carrier as a delivery method, with its own account details",
     "Quotes a price on the sale order, on the carrier's own tariff",
     "Books the shipment from the transfer, and gets the waybill number back",
     "Stores the label as an attachment on the transfer, PDF or ZPL",
     "Cancels a booked shipment at the carrier and clears the waybill",
     "Puts a tracking link on the transfer that opens the carrier's own page",
     "Books a whole afternoon of transfers in one go, and reports what failed"
    ]
   },
   {
    "heading": "Cash on delivery",
    "bullets": [
     "Most traffic on the Pakistani networks is collected on the doorstep, so the amount to collect is part of the booking rather than an afterthought. The tariff carries a flat COD fee and a percentage, and both end up in the quote."
    ]
   },
   {
    "heading": "Errors a warehouse worker can act on",
    "bullets": [
     "Every call goes through one place that owns the timeout, the retries and the error handling. A carrier failure is narrowed to one of twelve kinds, and each one has a sentence that says what happened and what to do about it. Nobody is ever shown raw JSON, a stack trace or an HTML error page from a load balancer.",
     "Retries only happen where a retry can help. A timeout, a 503 or a rate limit is tried again with a growing wait. A rejected address is not, because it will be rejected identically the second time."
    ]
   },
   {
    "heading": "The call log",
    "bullets": [
     "Every attempt is recorded: the request, the answer, the status, how long it took and which attempt it was. Credentials are masked on the way in, so the log can be read by the people who ship without handing them the account password. It is written on its own database cursor, so the record of a failed booking survives the rollback that failure causes. A scheduled action clears entries older than ninety days."
    ]
   },
   {
    "heading": "Simulation mode",
    "bullets": [
     "Every carrier can answer without being called. The simulator prices the shipment from the service tariff and returns an answer in that carrier's own format, including a real label file and a stable waybill number. It also reproduces failures on demand: rejected credentials, a rejected address, a destination outside the network, a rate limit, a timeout, an unreachable host and an unreadable answer.",
     "That is how you set the shipping flow up and train the warehouse on it before the carrier has issued a single credential, and how you reproduce a failure without breaking a live account."
    ]
   },
   {
    "heading": "Services and tariffs",
    "bullets": [
     "A service holds the code that goes on the wire and the tariff behind it: a base charge, a rate per chargeable kilo, a minimum, fuel as a percentage, COD fees and insurance. Chargeable weight is the greater of the scale weight and the volumetric weight, which is how these carriers bill."
    ]
   },
   {
    "heading": "Adding a carrier",
    "bullets": [
     "Each carrier is one class of about two hundred lines. It says where its endpoints are, how it wants the request shaped, and how to read its answer. Validation, pricing, weights, retries, logging, the simulator and the error taxonomy are shared, so a sixth carrier does not touch any of them.",
     "Requires Delivery and Inventory. No external service and no subscription."
    ]
   }
  ],
  "category": "Inventory/Delivery",
  "version": "19.0.1.0.0",
  "price": 129.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_delivery_carrier_connector/",
  "published": true
 },
 "wt-dental-clinic-pos": {
  "technical": "wt_dental_clinic_pos",
  "name": "WT POS Dental Clinic",
  "summary": "Dental clinic appointments and services in POS - integrates with Dental Clinic Management",
  "intro": [],
  "sections": [],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_dental_clinic_pos/",
  "published": true
 },
 "wt-dental-management": {
  "technical": "wt_dental_management",
  "name": "WT Dental Clinic Management",
  "summary": "Complete Dental Clinic ERP - Appointments, Treatments, Dentists, Rooms, Commissions, Portal Booking & Invoicing",
  "intro": [
   "Way4Tech Dental Clinic Management is a complete Dental Clinic ERP for Odoo 19. Manage patient appointments, treatment catalog, dentist scheduling, room allocation, online portal booking, staff commissions, invoicing integration, thermal receipt printing, multi-stage workflow and role-based access control."
  ],
  "sections": [],
  "category": "Services/Dental Clinic",
  "version": "19.0.1.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_dental_management/",
  "published": true
 },
 "wt-documents-dms": {
  "technical": "wt_documents_dms",
  "name": "Documents DMS with Folder Permissions and Versioning",
  "summary": "Document manager on top of attachments: folder level access rights, file versions with restore, tokenised upload requests, PDF split and merge.",
  "intro": [
   "A document manager built on ir.attachment rather than beside it. Files stay attachments, so the filestore, the download route and everything else in Odoo that already knows about attachments keeps working. What this adds is the part Odoo Community has never had: folders that carry real access rights, and a version history."
  ],
  "sections": [
   {
    "heading": "Folder permissions that hold",
    "bullets": [
     "Every folder carries three group lists: who may read, who may add and change, and who may configure the folder",
     "Those lists are enforced by global record rules on the documents, on the versions and on the folder itself, not by hiding buttons",
     "The stored file points back at its document, so the download url answers to the same rules as the form. A user outside the folder gets nothing, whichever way they ask",
     "Manage includes write, write includes read, and the Documents administrator group is kept on every restricted folder, so a folder can never be left with nobody able to open it",
     "A child folder can take its parent access, so a tree can be secured at the top"
    ]
   },
   {
    "heading": "Versions",
    "bullets": [
     "Uploading over a file keeps the old one as a numbered version, with who did it and why",
     "Restore puts an old version back and pushes the file that was live into a new version, so a restore can itself be undone",
     "Every version owns its own copy of the file, so history cannot be rewritten by replacing the live one",
     "Documents can be locked while somebody works on them, and an administrator can force a lock open"
    ]
   },
   {
    "heading": "Upload requests",
    "bullets": [
     "Ask a customer, a supplier or a candidate for a file. They get a link with a token in it and need no account, no password and no portal invitation",
     "What they upload lands in the folder and with the tags named on the request, already filed",
     "Size limit and accepted file types are set per request, and executable file types are refused whatever the request says",
     "A scheduled action chases them on a schedule you set, and closes the link when the deadline passes"
    ]
   },
   {
    "heading": "PDF split and merge",
    "bullets": [
     "Split a scanned batch into separate documents by page range. The range reads the way you would write it: 1-3,7,9- takes pages one to three, page seven, and everything from page nine on",
     "Merge several documents into one, in the order you drag them, with a bookmark at the start of each source file",
     "Uses pypdf, which Odoo already installs"
    ]
   },
   {
    "heading": "Everyday things",
    "bullets": [
     "Tags in categories, expiry dates with a daily check, ownership, contact links and a link back to any record in Odoo",
     "Existing attachments anywhere in the database can be filed into a folder in bulk, keeping the original where it is",
     "A printable folder index",
     "Standard list, form, kanban, calendar and pivot views. No JavaScript, so nothing to break on upgrade",
     "Needs only mail and portal."
    ]
   }
  ],
  "category": "Productivity/Documents",
  "version": "19.0.1.0.0",
  "price": 69.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_documents_dms/",
  "published": true
 },
 "wt-duplicate-partner": {
  "technical": "wt_duplicate_partner",
  "name": "Duplicate Customer Warning",
  "summary": "Warn when a new contact has the same name or email as an existing one.",
  "intro": [
   "While typing a contact's name or email, a non-blocking warning appears if another contact already uses the same value."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Catches duplicate customers / vendors before they are saved.",
     "Warning only - it never blocks saving, so genuine namesakes are still allowed.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Contacts",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_duplicate_partner/",
  "published": true
 },
 "wt-dynamic-financial-reports": {
  "technical": "wt_dynamic_financial_reports",
  "name": "Dynamic Financial Reports",
  "summary": "Dynamic Balance Sheet, Profit & Loss, Trial Balance, General Ledger, Partner Ledger, Aged Receivable / Payable, Cash Flow and Tax Report with comparison, PDF and Excel.",
  "intro": [
   "The financial reporting pack Odoo Community is missing. Nine reports on one engine, every one of them filtered, compared, drilled into and exported."
  ],
  "sections": [
   {
    "heading": "Reports",
    "bullets": [
     "Balance Sheet, built from an editable line structure",
     "Profit and Loss, built from an editable line structure",
     "Cash Flow Statement, indirect method",
     "Trial Balance with opening balances",
     "General Ledger with a running cumulative balance",
     "Partner Ledger",
     "Aged Receivable",
     "Aged Payable",
     "Tax Report"
    ]
   },
   {
    "heading": "Every report supports",
    "bullets": [
     "A date range, with All Entries or Posted Entries only",
     "Comparison against the previous period, the previous year, or a custom range",
     "Filters by journal, account, partner and analytic account",
     "One click from the filter panel to the journal items behind the report",
     "Export to PDF and to a real xlsx workbook",
     "Multi-company databases",
     "The Balance Sheet, Profit and Loss and Cash Flow structures are edited from the interface, so a chart of accounts of any localisation can be mapped without touching code.",
     "Requires nothing but Odoo Accounting (community)."
    ]
   }
  ],
  "category": "Accounting/Accounting",
  "version": "19.0.1.0.0",
  "price": 149.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_dynamic_financial_reports/",
  "published": true
 },
 "wt-enterprise-salon": {
  "technical": "wt_enterprise_salon",
  "name": "WT Enterprise Salon",
  "summary": "Enterprise features for WT Salon Management: loyalty, packages, memberships, gift cards, reviews, KPI dashboard, consent forms, and more",
  "intro": [
   "Enterprise-grade extension for WT Salon Management."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Loyalty Program with Bronze/Silver/Gold/Platinum tiers + QR Code loyalty card",
     "Service Packages (pre-paid session bundles)",
     "Membership Subscriptions (monthly/annual plans with discounts)",
     "Gift Cards (issue, redeem, track balance)",
     "Customer Reviews (1-5 stars, publish/reject workflow)",
     "Appointment Waitlist with email notifications",
     "Before/After Photo Gallery per appointment",
     "Service Notes & Colour Formulas (persistent per-customer history)",
     "Break/Blocked Time Management for stylists",
     "Retail Product Usage Tracking per appointment",
     "Digital Consent Forms with signature support",
     "Deposit at Booking (configurable %)",
     "Live KPI Dashboard (revenue, occupancy, top stylist, ratings)",
     "Stylist \"My Day\" Dashboard with service timer"
    ]
   }
  ],
  "category": "Services/Salon",
  "version": "19.0.2.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_enterprise_salon/",
  "published": true
 },
 "wt-enterprise-school": {
  "technical": "wt_enterprise_school",
  "name": "WT Enterprise School",
  "summary": "Advanced School Enterprise Features - Exams, Library, Hostel, Medical, Canteen, Sports, HR & More",
  "intro": [
   "Way4Tech Enterprise School extends the base School Management module with premium features:"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Online Exam Management (MCQ/Subjective, auto-grading, submissions)",
     "Library Management (books, categories, issue/return)",
     "Hostel Management (hostels, rooms, student allocations)",
     "Health & Medical (visits, vaccinations)",
     "Canteen Management (menu items, orders, digital wallets)",
     "Sports & Activities (clubs, tournaments, achievements)",
     "Staff Management (teacher evaluations, trainings)",
     "Communication (parent meetings, bulk messaging)",
     "Finance Enterprise (installment plans, budgets, expenses)",
     "Operations (visitor management, lost & found, student documents)",
     "Counseling Sessions",
     "Alumni Management",
     "Multi-Campus Support",
     "School Events & RSVP"
    ]
   }
  ],
  "category": "Education",
  "version": "19.0.1.1.0",
  "price": 800.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_enterprise_school/",
  "published": true
 },
 "wt-enterprise-theme": {
  "technical": "wt_enterprise_theme",
  "name": "WT Odoo Enterprise Theme",
  "summary": "Enterprise look & feel for Odoo 19 Community - white navbar, full-page home menu, purple brand. No subscription required.",
  "intro": [
   "Way4Tech WT Odoo Enterprise Theme for Odoo 19 Community Edition."
  ],
  "sections": [],
  "category": "Themes/Backend",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/16.0/wt_enterprise_theme/",
  "published": true
 },
 "wt-equipment-rental": {
  "technical": "wt_equipment_rental",
  "name": "Equipment & Machinery Rental Management",
  "summary": "Plant, tool and machinery hire - unit level fleet with hour and kilometre meters, rate cards where the cheapest rate wins, availability across a date range, off-hire with meter overuse, damage against the hand-over condition, deposits, late return penalties, statutory inspection certificates and utilisation.",
  "intro": [
   "Built for a plant hire yard, a tool hire shop, an access platform fleet or a site services depot. Every machine is a unit with a serial number, a meter and a history, not a stock quantity. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The fleet",
    "bullets": [
     "One record per physical unit, with its serial number, make, model, year and registration where the machine goes on the road",
     "An hour meter or a kilometre meter per unit, whichever the category uses, with the reading carried from one hire to the next",
     "Purchase date and purchase value held against the unit, so the yard can see what a machine has earned against what it cost",
     "Depots with their own yard location, so you know which site a machine is standing on",
     "Status that means something: available, reserved, out on hire, in the workshop, quarantined, retired"
    ]
   },
   {
    "heading": "Rates the way the trade quotes them",
    "bullets": [
     "Hourly, daily, weekly and four weekly rates on one card",
     "The cheapest applicable rate wins for the period hired. Five days on a hundred and twenty a day is not six hundred, it is the week rate, and the system works that out for you rather than leaving it to whoever is on the desk",
     "Minimum hire period per rate card, because nobody hires a breaker for an hour",
     "A card per category, an override per unit, and a negotiated card per customer",
     "Seasonal validity dates, so next season's card can sit ready without disturbing this season's quotes"
    ]
   },
   {
    "heading": "Hiring a machine out",
    "bullets": [
     "A contract with a hire period, a delivery and a collection",
     "Availability checked across the whole date range before a unit is reserved, including the workshop bookings, so a machine cannot be promised twice",
     "Double booking is refused outright, not warned about",
     "Condition recorded at hand-over, with the meter reading and the note that settles the argument on return",
     "Delivery and collection charged separately from the hire"
    ]
   },
   {
    "heading": "Off-hire, overuse and damage",
    "bullets": [
     "Off-hire records the meter on return. Anything beyond the included allowance for the days hired is charged at the overuse rate",
     "Damage assessed against the condition written down at hand-over, with the repair cost, whether it is chargeable and where the photographs are filed",
     "The security deposit is taken on hand-over and released on off-hire, in full or in part, and a partial retention will not go through without a reason",
     "Late return penalty on the days past the agreed return, after whatever grace the company allows"
    ]
   },
   {
    "heading": "Workshop and certificates",
    "bullets": [
     "Servicing, repairs and inspections between hires, each taking the unit out of availability for its window",
     "Service due by meter reading, not by guesswork",
     "A statutory inspection certificate per unit: LOLER thorough examination at six or twelve months, PUWER, PAT, pressure vessel and the local equivalents",
     "An expired certificate blocks the machine going out, and the yard sees what is expiring before the inspector is due"
    ]
   },
   {
    "heading": "What the fleet is earning",
    "bullets": [
     "Utilisation per unit: days on hire against days owned",
     "Revenue per unit against its purchase value, so you know what has paid for itself",
     "The units earning nothing, on one screen, which is the list that pays for the system",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Rental",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_equipment_rental/",
  "published": true
 },
 "wt-event-management": {
  "technical": "wt_event_management",
  "name": "Event & Wedding Planning Management",
  "summary": "Events and wedding planning ERP - venues with double booking refused, packages priced per head or flat, supplier quotes with insurance and licence checks, timed run sheets, staffing roster, guest list with RSVP and seating, budget variance and payment milestones held by a deposit.",
  "intro": [
   "Built for an events agency, a wedding planner, a caterer who sells packages, or a venue that runs its own functions. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The diary is the system",
    "bullets": [
     "An event with a type, a venue, a layout, a date, a guest number and a status that moves from enquiry through to a closed file",
     "Two events cannot be booked into the same room inside the venue turnaround, because a hall that has to be stripped and reset is not free the minute the last guest leaves",
     "A venue with more than one function suite says so, and the check counts against that",
     "Venue access time worked back from the layout set up hours, so the crew call is a real time rather than a guess",
     "A curfew held against the finish time, with an extension flag for the nights the venue has agreed in writing"
    ]
   },
   {
    "heading": "Packages priced the way the trade sells them",
    "bullets": [
     "Per head, or a flat fee for a marquee job",
     "A contracted minimum headcount, so a party that shrinks still pays for what was booked",
     "Inclusions listed under the package with what each one costs us, which is what tells you whether the package makes money before you sell it forty times",
     "Quoting an event turns those inclusions into an estimated budget, grouped by heading"
    ]
   },
   {
    "heading": "Suppliers, and the paperwork they have to hold",
    "bullets": [
     "Quotes requested and quotes accepted, one accepted supplier per heading",
     "Public liability insurance and trade licence expiry dates on the supplier record, with a job that flags them before they lapse",
     "A quote cannot be accepted from a supplier whose cover has run out, and a suspended supplier cannot take new work",
     "Notice period per supplier, so a booking made inside it is flagged as late",
     "An accepted quote lands on the event budget as the committed cost against what was budgeted for that heading"
    ]
   },
   {
    "heading": "The day itself",
    "bullets": [
     "A run sheet of timed cues, each with an owner and a place, and the cues that cannot slip marked as such",
     "Actual start times recorded against the plan, so the debrief has a number on it instead of an argument",
     "A staffing roster drawn up from the guest numbers using the ratio on each role: one waiter per twelve, one head waiter per sixty, one event manager whatever the numbers",
     "Call times per role, check in on arrival, and no shows recorded",
     "Somebody whose personal licence or certificate has expired cannot be put on a shift that needs one"
    ]
   },
   {
    "heading": "Guests, seating and the kitchen",
    "bullets": [
     "A guest list with RSVP, seats per line, age group and dietary requirement",
     "Tables with a capacity that refuses to seat more than it holds",
     "Dietary totals added up for the kitchen and printed on the run sheet and the seating plan",
     "A final numbers deadline worked back from the event date, with a job that asks the client for the headcount when it passes"
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Payment milestones with due dates, a deposit that holds the date, and a refusal to confirm an event until that deposit is in",
     "Stage invoices raised into Accounting against the package product, with the event tax",
     "A chase job for milestones past their due date and their grace period, and a list of which events are behind",
     "Budget lines with estimated against actual and the variance",
     "Gross margin per event after supplier cost and crew cost, reported by event type and by venue"
    ]
   },
   {
    "heading": "Equipment",
    "bullets": [
     "Hire stock allocated to an event, with availability checked across the whole window rather than a single day",
     "Loaded out on the morning, booked back in afterwards, and an event that will not close with anything still on the van",
     "Anything that comes back broken or missing lands on the event budget at its replacement value"
    ]
   },
   {
    "heading": "Documents",
    "bullets": [
     "Run sheet, landscape, with the crew call and the suppliers on site",
     "Client proposal with the inclusions and the payment schedule",
     "Seating and dietary plan for the caterer and the head waiter",
     "Payment schedule showing what is behind and by how many days",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Events",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_event_management/",
  "published": true
 },
 "wt-facility-management": {
  "technical": "wt_facility_management",
  "name": "Facility Management & Maintenance (CAFM)",
  "summary": "CAFM and hard services - site, building, floor and space register, asset hierarchy with warranty and criticality, planned maintenance on interval or meter, reactive work orders with response and resolution clocks, permit to work, spares off stock and lifetime cost per asset.",
  "intro": [
   "Written for a facilities team that runs hard services on an estate: an in house maintenance department, a managing agent, or a contractor holding a total facilities management contract. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The estate and what is in it",
    "bullets": [
     "Site, building, floor and space, so a fault is reported against a room rather than a description of a room",
     "An asset register with a parent and child tree: a compressor sits under a chiller, the chiller sits under the plant room package, and money spent on the compressor shows against the chiller",
     "Manufacturer, model, serial number, install and commissioning dates, warranty expiry, criticality and condition on every record",
     "Warranty expiry on the form, because a surprising amount of money is spent repairing plant that somebody else is still liable for"
    ]
   },
   {
    "heading": "Planned maintenance that actually gets raised",
    "bullets": [
     "A schedule per asset on a calendar interval, on a meter reading, or on whichever comes first, which is what most manufacturers' warranties say",
     "Meter readings per asset with the movement between them, so a run hour service interval turns into a date you can plan labour against",
     "Jobs raised a set number of days ahead of the due date, so there is time to order the parts and book the access",
     "Statutory inspection intervals held on the asset class, the certificate reference recorded on completion, and the next examination date falling out of it automatically"
    ]
   },
   {
    "heading": "Reactive work and the clocks",
    "bullets": [
     "A fault report becomes a work order with a priority, and the priority picks up the service level agreement",
     "Two clocks on every job, one for response and one for resolution, each with its own breach flag and each reported separately, because they are separately contracted",
     "Cover hours honoured: a four hour target on a nine to five contract does not run overnight, which is the usual reason an SLA report argues with the contractor's own report",
     "Time spent waiting for a part or for access is banked, and whether it comes off the resolution clock is a setting"
    ]
   },
   {
    "heading": "People, permits and paperwork",
    "bullets": [
     "Technicians with skills and a competence card that has to be in date",
     "Contractors with the trades they are on the books for, the sites they are contracted to cover, and an insurance expiry that blocks assignment before the certificate runs out rather than after",
     "Approving a firm and recording its public liability cover is the facility manager's job, not the help desk's, so the people the block stops cannot lift it themselves",
     "Only an authorised person can issue a permit, and that is enforced on the record rather than on the button, so it holds against a direct write too",
     "Permit to work for hot work, confined space, electrical isolation, working at height and excavation, each demanding the controls its own type needs: a fire watch period, an atmosphere test and a standby person, an isolation point with lock and tag",
     "No permit, no start. Two live permits of the same type on one asset are refused outright"
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Spares issued from stock onto the job, with the movement recorded against the warehouse",
     "Labour booked in hours at the technician's rate or the contractor's, with an out of hours premium",
     "Lifetime cost per asset next to its replacement value, which is the number that decides repair against replace",
     "SLA performance per contractor, and the planned against reactive ratio per site, which is the number a facilities manager is judged on",
     "A vendor bill raised from what the job actually used",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Facility",
  "version": "19.0.1.0.0",
  "price": 349.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_facility_management/",
  "published": true
 },
 "wt-fbr-digital-invoicing": {
  "technical": "wt_fbr_digital_invoicing",
  "name": "FBR Digital Invoicing Pakistan | FBR E-Invoicing Integration | Sales Tax Invoice, QR Code & IRN | Odoo 19 Community",
  "summary": "Send sales tax invoices to the FBR Digital Invoicing system in real time, get the FBR invoice number and QR code back, and print them on the invoice. Sandbox and production.",
  "intro": [
   "Posts your sales tax invoices to the Federal Board of Revenue Digital Invoicing system as you validate them, stores the FBR invoice number that comes back, and prints it on the invoice with the required QR code.",
   "Built against PRAL's published specification for the DI API."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Posts an invoice to FBR the moment it is validated, or on a schedule, or by hand, whichever you prefer",
     "Stores the FBR invoice number and the timestamp FBR returns",
     "Prints the FBR invoice number and a QR code on the invoice, at the size the specification requires",
     "Keeps every request and every reply, so you can show an auditor exactly what was sent and when",
     "Translates FBR error codes into plain instructions, rather than showing a code and leaving you to look it up"
    ]
   },
   {
    "heading": "Sandbox first",
    "bullets": [
     "Switch between sandbox and production with one setting",
     "The sandbox scenario is selectable per invoice, so you can work through the test cases FBR requires before going live",
     "A connection test tells you whether your token works before you post anything real"
    ]
   },
   {
    "heading": "Set-up in one place",
    "bullets": [
     "Your seller registration, business name, province and address",
     "The security token PRAL issued you",
     "Reference data pulled straight from FBR: provinces, units of measure, HS codes, sale types and their rates, SRO schedules and items",
     "HS code, unit and sale type on the product, so an invoice is complete without anyone thinking about it"
    ]
   },
   {
    "heading": "When something goes wrong",
    "bullets": [
     "A failed post is queued and retried rather than lost",
     "The invoice tells you plainly whether it is not sent, queued, accepted or rejected",
     "Rejections show the FBR error code, what it means, and what to change",
     "Requires the Accounting app. Works on Odoo 19 Community and Enterprise."
    ]
   }
  ],
  "category": "Accounting/Localizations",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_fbr_digital_invoicing/",
  "published": true
 },
 "wt-freight-forwarding": {
  "technical": "wt_freight_forwarding",
  "name": "Freight Forwarding & Customs Clearance",
  "summary": "Freight forwarding, NVOCC and customs broking - air, sea FCL, sea LCL and road job files, master and house bills, containers with VGM, chargeable weight, cost and sell per charge, agent profit share, customs entries with duty and VAT, and gross profit by lane and salesperson.",
  "intro": [
   "Built for a freight forwarder, an NVOCC or a customs broker. Air, sea full container, sea groupage and road all run through the same file, each with its own numbering. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The job file",
    "bullets": [
     "One file per shipment, opened from a quotation or from scratch. It carries the customer, the shipper, the consignee and the notify party, the incoterm, the loading and discharge points, the trade lane and the salesperson it belongs to. The file number is drawn from a different series for each mode, so anybody reading a reference on a booking knows what they are looking at.",
     "Cargo goes on as lines with a tariff code, gross and net weight, dimensions and value. The file works out the volume from the case sizes, converts it to kilos using the divisor for the mode, and rates on the greater of the actual and the volumetric weight. Air uses six thousand cubic centimetres to the kilo, road three thousand, sea groupage a tonne to the cubic metre, and all three are settings rather than hard code because tariffs differ."
    ]
   },
   {
    "heading": "Bills, boxes and routing",
    "bullets": [
     "Master and house bills of lading, air waybills and CMR notes. One master per file and as many houses as the consolidation needs. Prepaid or collect, originals or a waybill, and a release that has to be recorded against something before the cargo moves. Issuing a house bill with no master behind it is refused.",
     "Containers carry the number, the seal, the type, the tare and the cargo weight, and the verified gross mass that follows from them. The container number is checked against its ISO 6346 check digit at the desk rather than at the gate at three in the morning. A box loaded over the payload for its type is refused, and a reefer without a set point will not load.",
     "Routing goes on as legs: pre-carriage, main carriage, transhipment and on-carriage, each with a carrier, a vessel and voyage or a flight number, an ETD and an ETA. Report the actual arrival and the file carries the delay, which is the number the customer asks about and the number a carrier review is built on."
    ]
   },
   {
    "heading": "Charges with two sides",
    "bullets": [
     "Every charge line has a cost side and a sell side, each in its own currency, and therefore a profit. Quantities come off the file by the basis on the charge code: per shipment, per container, per TEU, per chargeable kilo, per cubic metre, per bill or per declaration. Nobody retypes a tonnage onto a rate line.",
     "Sell lines become customer invoices, grouped by billing party and currency. Cost lines with a named supplier become vendor bills, grouped the same way. A charge behind a posted invoice cannot be edited, and a file cannot be closed while a sell line has never been billed or a supplier cost has never been booked."
    ]
   },
   {
    "heading": "Customs",
    "bullets": [
     "A declaration per file with the entry number, the customs office, the regime and the importer of record. Tariff lines are pulled from the cargo, one per HS code, and the freight and insurance actually charged on the file are brought into the customs value and apportioned across the lines by value. Duty comes off the tariff code, excise on top of it, and import VAT on the value plus the duty and the excise. An entry carrying restricted goods will not clear without a licence reference on it.",
     "Duty and import VAT are then disbursed onto the file as flagged lines, recharged pound for pound. They never touch the gross profit, which is the whole point of keeping them separate."
    ]
   },
   {
    "heading": "The money",
    "bullets": [
     "Gross profit per file, per trade lane and per salesperson, off the same charge lines the invoices are raised from. A file where cost has been accrued and nothing has been billed is flagged and chased, because that is where a forwarder's money quietly disappears. Files under the lane target margin are flagged as well. Business nominated by an overseas agent carries their profit share, calculated from the rate on the agent record."
    ]
   },
   {
    "heading": "Quotations",
    "bullets": [
     "Rates with a validity date, a transit time and the same two-sided lines the file uses. Won quotations open a file and carry the rates across, so the invoice and the quotation cannot disagree. Lost quotations need a reason. Rates past their validity are closed off by a scheduled job.",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Logistics",
  "version": "19.0.1.0.0",
  "price": 399.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_freight_forwarding/",
  "published": true
 },
 "wt-fuel-station": {
  "technical": "wt_fuel_station",
  "name": "Fuel Station & Petrol Pump Management",
  "summary": "Forecourt ERP - underground tanks and dip readings, pump and nozzle meters, shift reconciliation to cash over or short, tanker deliveries with density and temperature correction, wet stock variance, fleet credit accounts and forecourt shop stock.",
  "intro": [
   "Built for a filling station, a group of forecourts, a haulage yard pump or a bunkering site. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "What is in the ground",
    "bullets": [
     "Every underground tank carries its capacity, its dead stock and the safe fill line the driver is told about before the tanker turns up. Dip readings are records in their own right: the millimetres off the stick, the litres off the chart, the water depth and who took the reading. Each dip is frozen against the book stock at the moment it was taken, so a reading can still be argued about a month later. Water above the depth you set raises a warning, because water left in a tank rusts it and stalls cars on the forecourt."
    ]
   },
   {
    "heading": "Pumps, nozzles and the shift",
    "bullets": [
     "A pump carries its nozzles and each nozzle says which tank it draws from. Get that one field wrong and every wet stock figure on the site is wrong with it. Opening a shift pulls every nozzle and its current totaliser. At the end you put in the closing readings, the test litres that went into a measure and came back, and the shift works out litres sold per nozzle, per attendant and per grade.",
     "The reconciliation is the point of the whole thing. Fuel sold, plus the shop, less what went out on account, less card and wallet settlement, gives the cash that should be in the drawer. Against the cash actually counted that lands on an over or short figure. Past the tolerance the company sets, the supervisor cannot sign the shift off without writing down what happened."
    ]
   },
   {
    "heading": "Deliveries and wet stock",
    "bullets": [
     "A tanker delivery records the bill of lading, the tanker, the driver and the compartment seals. Observed litres are corrected for temperature using the density off the loading ticket, so warm fuel is not booked in as litres nobody paid for. Dip before the hose goes on and again once it comes off; the tank gain against the corrected litres is the only evidence a short delivery claim ever rests on. Posting the delivery puts the standard litres on the books and raises the bill against the terminal.",
     "Wet stock variance is opening dip, plus deliveries, less metered sales, against the closing dip. What is left over is what the site has lost or gained. It is reported in litres, as a percentage of throughput and in money at the pump price net of VAT. A period outside tolerance cannot be signed off without a cause: meter drift, a short delivery, water ingress, a dip error, a line leak or theft. That record is what an oil company audit or a regulator reads."
    ]
   },
   {
    "heading": "The price on the board",
    "bullets": [
     "Pump prices are a log, not a field. Each change carries the minute it takes effect, so a shift that spans a rise can still be valued line by line, and a mid shift change can be pushed onto the open shifts with one button. Duty is held as a flat amount per litre and VAT as a rate on top, which is the only way to read the real margin: pump price, less VAT, less duty, less landed cost. Cost and margin are visible to site managers and to nobody else."
    ]
   },
   {
    "heading": "Fleet and credit customers",
    "bullets": [
     "A haulier or a taxi firm fuels on account. Their vehicles are listed with the grade each one may take, the size of its tank and a monthly litre cap. A fill bigger than the tank holds is refused, and so is petrol into a diesel vehicle. Odometer readings come in with every fill and cannot run backwards. Discounts are quoted where the trade quotes them, in pence a litre. Accounts run to a credit limit the pumps hold you to, and the month closes with one statement invoice per account rather than a ticket at a time."
    ]
   },
   {
    "heading": "The forecourt shop",
    "bullets": [
     "Dry stock on the shelf is counted by the shop and compared against what Odoo says is in the warehouse. The gap is the shrinkage, and on small high value lines it is worth looking at. Shop sales go on the shift alongside the fuel, so the till reconciles against everything that was sold, not just the pumps."
    ]
   },
   {
    "heading": "Reports and jobs",
    "bullets": [
     "A shift reconciliation slip on 80mm paper, a goods received note with the temperature correction shown line by line, and a wet stock variance report laid out the way an oil company asks for it. Scheduled jobs build yesterday's variance per tank, chase shifts left open, flag water in a tank, flag a pump that has run past its calibration seal, chase card takings that have not settled, warn on shop lines running low and raise the monthly statements. All of them ship switched off; turn on the ones the site actually needs.",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Fuel",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_fuel_station/",
  "published": true
 },
 "wt-gantt-view": {
  "technical": "wt_gantt_view",
  "name": "Gantt View for Odoo 19 Community",
  "summary": "Gantt planning board with a real scheduling engine: dependencies, automatic rescheduling, critical path, resource conflicts and a printable planning sheet.",
  "intro": [
   "A planning board and, behind it, the scheduling engine that makes a Gantt chart worth having. The chart draws what the engine works out: links between tasks, dates that move when something slips, the chain that decides the finish date, and the moments a resource is booked twice."
  ],
  "sections": [
   {
    "heading": "The engine",
    "bullets": [
     "Four link types: finish to start, start to start, finish to finish and start to finish, each with a lag in working days that may be negative",
     "Move a task and everything that depends on it follows, in one pass, in dependency order. Work on a parallel branch does not budge",
     "Weekends carry no duration, so a two day task starting on Friday finishes on Tuesday. Turn that off per plan",
     "Tasks can be pinned, or held to a constraint (start no earlier than, must start on). The engine reports the fixed dates the network cannot honour rather than moving them behind your back",
     "A link that would close a loop is refused when it is saved, and the error names the tasks that form the circle",
     "Critical path: early and late dates, total float per task, and the tasks with none of it",
     "Resource conflicts: every window where a resource is booked past its capacity, with the tasks involved and the hours of overlap"
    ]
   },
   {
    "heading": "The board",
    "bullets": [
     "One row per resource, or per any other field you nominate",
     "Bars carry their progress, their colour and a mark when they sit on the critical path",
     "Drag a bar to a new date. The drop goes through the ordinary write, so the cascade and every constraint apply exactly as they do on the form",
     "Day, week and month scales, and a window you can pan"
    ]
   },
   {
    "heading": "Any model, not just ours",
    "bullets": [
     "A board is a configuration record: name a model, the field that starts a bar and the field that ends it, then optionally a field to group the rows by, a progress field and a colour field. Deliveries by carrier, subscriptions by customer, hires by department: anything with two date fields can be drawn. The rows, the sorting and the position and width of every bar are worked out on the server, so the browser only places what it is handed."
    ]
   },
   {
    "heading": "Printing",
    "bullets": [
     "A planning sheet for any plan: the schedule as a table with the bars drawn next to it, the critical path in bold, the float on every task and the total length of the chain."
    ]
   },
   {
    "heading": "Included",
    "bullets": [
     "Plans, tasks, dependencies and resources, with list, form, kanban, calendar, pivot and graph views",
     "A wizard to shift a block of work by a number of days, cascade included",
     "A conflict report you can act on from the row",
     "A scheduled action to reschedule the plans you mark for it",
     "Two user groups and company record rules on every model",
     "Requires nothing but Odoo itself."
    ]
   }
  ],
  "category": "Project",
  "version": "19.0.1.0.0",
  "price": 199.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_gantt_view/",
  "published": true
 },
 "wt-grid-view": {
  "technical": "wt_grid_view",
  "name": "Grid View for Timesheets and Resource Planning",
  "summary": "Spreadsheet style grid for any model: rows are records, columns are days, weeks or months, cells are editable totals written straight back to the database.",
  "intro": [
   "The one view Odoo Community does not have. Rows down the side, periods across the top, a number in every cell, and you type into it. Hours against a project, units against a warehouse, budget against a cost centre: the shape is always the same and the spreadsheet always wins because Odoo has nowhere to put it."
  ],
  "sections": [
   {
    "heading": "How a grid is set up",
    "bullets": [
     "Name a model, the date field that decides which column a record falls in, and the number that fills a cell. A datetime works as well as a date, and its column is the day it is in the reader's own timezone",
     "Add the fields the rows are grouped by, in the order they should read, for example employee then project",
     "Choose daily, weekly or monthly columns and how many of them to show",
     "Add a filter if only part of the model belongs on the sheet",
     "Nothing else. No view to write, no field to add."
    ]
   },
   {
    "heading": "The cell is a total",
    "bullets": [
     "A cell adds up every record behind it, so editing one is a difference, not a value. That difference has to land somewhere sensible, and this is where grids usually go wrong:",
     "An empty cell creates the record it needs, carrying the row values, the date and whatever else you set as defaults",
     "A cell with one record behind it hands that record the difference, so it ends on the figure you typed",
     "A cell with several records either gives the difference to the newest of them or adds a balancing record and leaves history alone, per grid",
     "Typing zero clears every record behind the cell rather than pushing one of them negative to make the arithmetic work",
     "Negative values can be allowed or refused, on the cell and on the record",
     "All of it happens on the server, inside the ordinary create and write, so record rules, required fields, constraints and the chatter all apply. There is no back door."
    ]
   },
   {
    "heading": "Closing a period",
    "bullets": [
     "A lock closes every column up to a date. Locked cells are drawn greyed with a padlock, and a write to one is refused on the server rather than merely hidden in the browser. A rolling lock keeps the last few days open and closes everything older by itself, on a daily scheduled action."
    ]
   },
   {
    "heading": "Copy a period",
    "bullets": [
     "Next week looks like this week. The copy wizard reads one column and writes it into another, either replacing what is there or adding to it, cell by cell through the same write back, so a closed period still refuses it."
    ]
   },
   {
    "heading": "Timesheets out of the box",
    "bullets": [
     "Install this next to the timesheet app and a timesheet grid is configured for you: employee and project down the side, days across the top, hours in the cell. Install it on its own and it still works, on its own planning entries, with categories and a printable sheet."
    ]
   },
   {
    "heading": "What is included",
    "bullets": [
     "Grids, row fields, period locks, planning entries and categories",
     "An editable grid as a client action, with day, week and month columns",
     "A printable grid sheet showing the same figures as the screen",
     "A wizard to copy one period onto another",
     "A scheduled action for rolling locks",
     "Two user groups and company record rules on every model",
     "Requires nothing but Odoo itself."
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 69.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_grid_view/",
  "published": true
 },
 "wt-gym-management": {
  "technical": "wt_gym_management",
  "name": "Gym & Fitness Club Management",
  "summary": "Complete health club ERP - memberships and recurring billing, contract freeze, door access check-in, class timetable with waitlist, personal training packages, trainer commission, body measurements, retention and churn analysis.",
  "intro": [
   "Everything a health club, boutique studio, martial arts academy or wellness centre needs to sell memberships, fill classes and keep people coming back. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "Memberships",
    "bullets": [
     "Plans by duration, by session credit, or open-ended, with a joining fee, a contract minimum term and a notice period",
     "Recurring billing: the club invoices monthly, quarterly or annually on its own, and a member who does not pay is stopped at the door",
     "Freeze and hold with an allowance per plan, so travel and injury are handled by the rules rather than by argument, and the end date moves out on its own",
     "Renewal reminders before expiry, and a nightly job that expires what has run out",
     "Family and corporate memberships that bill one payer for several members"
    ]
   },
   {
    "heading": "At the door",
    "bullets": [
     "Check-in by member code, card or the front desk, validated against the contract: expired, frozen or in arrears is refused with the reason",
     "Capacity and live occupancy per club",
     "Full visit history, and a lapsed-member list built from it"
    ]
   },
   {
    "heading": "Classes",
    "bullets": [
     "Class types, studios, and a weekly timetable generated from recurring slots",
     "Booking with capacity, a waitlist that promotes automatically when somebody cancels, and a late-cancellation rule",
     "Attendance marked from the class list, no-shows counted against the member",
     "Trainer roster and pay: per class, per head, or a percentage"
    ]
   },
   {
    "heading": "Personal training",
    "bullets": [
     "PT packages sold as a block of sessions, with expiry and a running balance",
     "Every session logged against the package and against the trainer",
     "Trainer commission on packages and on sessions delivered"
    ]
   },
   {
    "heading": "The member",
    "bullets": [
     "Health declaration, medical notes, emergency contact and consent flags kept on the record",
     "Body measurements and progress over time",
     "Lifetime value, visit frequency and a churn risk built from attendance",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Fitness",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_gym_management/",
  "published": true
 },
 "wt-helpdesk": {
  "technical": "wt_helpdesk",
  "name": "Helpdesk and Support Tickets",
  "summary": "Support desk for Odoo Community: teams, stages, SLA policies, tickets by email or portal form, and a customer portal.",
  "intro": [
   "A support desk that lives inside Odoo. Tickets arrive by email or from the customer portal, land in a team, move through stages on a kanban board, and are measured against an SLA policy you write yourself."
  ],
  "sections": [
   {
    "heading": "Teams",
    "bullets": [
     "A team owns its members, its stages and its SLA policies",
     "Three ways to hand a ticket out: manual, balanced (the member with the fewest open tickets) or random",
     "Give the team an email alias and every message sent to it raises a ticket, with the sender recorded as the customer",
     "Optional auto-close, so tickets nobody has touched for a set number of days stop cluttering the board"
    ]
   },
   {
    "heading": "Tickets",
    "bullets": [
     "Subject, description, customer, contact email and phone, priority, tags",
     "Kanban grouped by stage with a progress bar over the ticket state, plus list, calendar of deadlines, pivot and graph for volumes",
     "The full mail thread is on the ticket, so replies to the customer and internal notes sit side by side",
     "Closing a ticket records who closed it and at what time, and the close reason is written to the thread"
    ]
   },
   {
    "heading": "Service level agreements",
    "bullets": [
     "A policy matches on team, minimum priority and tags",
     "It carries a target in hours and the stage that stops the clock",
     "The strictest matching policy wins, and the deadline is put on the ticket",
     "A scheduled action flags tickets that have run past their deadline, so a breach is visible without anyone opening the record"
    ]
   },
   {
    "heading": "Customer portal",
    "bullets": [
     "Customers see their own tickets at /my/tickets, search and sort them",
     "A detail page with the history, where they can reply through the chatter",
     "A form to raise a new ticket without phoning anyone",
     "Once a ticket is closed the customer can rate the service, and the rating is stored on the ticket for reporting",
     "Requires nothing but the Discuss and Portal apps, both of which ship with Odoo Community."
    ]
   }
  ],
  "category": "Services/Helpdesk",
  "version": "19.0.1.0.0",
  "price": 49.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_helpdesk/",
  "published": true
 },
 "wt-hospital-management": {
  "technical": "wt_hospital_management",
  "name": "Hospital Management",
  "summary": "Hospital / clinic management - patients, appointments, OPD, IPD admissions, wards & beds, prescriptions, billing & dashboard.",
  "intro": [
   "A clinical core for hospitals, clinics and diagnostic centres, built for Odoo 19."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Patients: medical record number, demographics, allergies, history, documents.",
     "Physicians: specialty, department, consultation fee, availability.",
     "Appointments and OPD visits: token queue, vitals with BMI, diagnosis, prescription, lab and radiology requests, follow-up.",
     "IPD admissions: bed assignment, services, discharge summary.",
     "Wards, rooms and beds with a colour-coded bed board.",
     "One-click invoicing of a visit or admission through native Accounting.",
     "A front-desk dashboard, PDF printouts and role-based security."
    ]
   }
  ],
  "category": "Services/Hospital",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hospital_management/",
  "published": true
 },
 "wt-hospital-management-enterprise": {
  "technical": "wt_hospital_management_enterprise",
  "name": "Hospital Management Enterprise",
  "summary": "Enterprise add-on for Hospital Management - laboratory & radiology (LIS), insurance & claims, operation theatre, blood bank, ambulance and analytics.",
  "intro": [
   "A premium add-on that extends WT Hospital Management with the departments a larger hospital needs.",
   "Requires WT Hospital Management."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Laboratory & Radiology (LIS): test catalog with parameters and normal ranges, orders, sample and result workflow with automatic abnormal flags, and a lab report.",
     "Insurance & Claims: providers, patient policies with coverage, and a claim workflow raised from invoices.",
     "Operation Theatre: theatre rooms, surgery scheduling, surgical team, consumables and operative notes.",
     "Blood Bank: donors and a blood-unit inventory with group, expiry and status.",
     "Ambulance: fleet and a dispatch / trip log.",
     "Analytics: pivot and graph reporting across appointments, admissions, revenue, lab orders and claims."
    ]
   }
  ],
  "category": "Services/Hospital",
  "version": "19.0.1.0.0",
  "price": 200.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hospital_management_enterprise/",
  "published": true
 },
 "wt-hospital-management-premium": {
  "technical": "wt_hospital_management_premium",
  "name": "Hospital Management Premium",
  "summary": "Engagement, intelligence & integration tier - patient portal, online booking, waiting screen, QR check-in, video consult, SMS & WhatsApp, executive BI, REST API and AI assistant.",
  "intro": [
   "The flagship tier of the WT Hospital suite. Builds on WT Hospital Management Ultimate.",
   "Requires WT Hospital Management Ultimate."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Patient Portal: patients see their visits, prescriptions, lab results and invoices, and pay online.",
     "Online Appointment booking from a public website page.",
     "Next-Patient Waiting Screen for the waiting room, plus OPD QR check-in and walk-in self-registration.",
     "Video Consultation appointments with a join link, and recurring appointment subscriptions.",
     "SMS and WhatsApp notifications (Meta WhatsApp Cloud API) with automatic reminders.",
     "Patient documents, medical certificates and electronic consent forms; vital signs and a body chart; a patient barcode.",
     "An executive analytics dashboard, a REST / JSON API for integrations, and an AI assistant."
    ]
   }
  ],
  "category": "Services/Hospital",
  "version": "19.0.1.0.0",
  "price": 900.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hospital_management_premium/",
  "published": true
 },
 "wt-hospital-management-ultimate": {
  "technical": "wt_hospital_management_ultimate",
  "name": "Hospital Management Ultimate",
  "summary": "Operations & revenue add-on for Hospital Management - pharmacy & inventory, doctor commission, cashier, insurance revenue cycle, emergency, ICU, vaccination, ICD-10 and facility.",
  "intro": [
   "The operations and revenue tier of the WT Hospital suite. Builds on WT Hospital Management Enterprise.",
   "Requires WT Hospital Management Enterprise."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Pharmacy & Inventory: medicine catalog with batch / expiry, dispensing from a prescription with automatic stock deduction, and reorder points.",
     "Doctor Commission: per-physician commission rules and statements.",
     "Cashier: collection desk with sessions, daily cash-up and receipts.",
     "Insurance Revenue Cycle: pre-authorization, per-insurer tariffs, package pricing, co-pay and batch claim export.",
     "Emergency & Triage, ICU charting, Recurring Procedures, Clinical Waiting List.",
     "Vaccination register, an ICD-10 catalog and Facility Management."
    ]
   }
  ],
  "category": "Services/Hospital",
  "version": "19.0.1.0.0",
  "price": 500.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hospital_management_ultimate/",
  "published": true
 },
 "wt-hotel-management": {
  "technical": "wt_hotel_management",
  "name": "Hotel Management",
  "summary": "Complete hotel / resort management - rooms, reservations, front desk, folio billing, housekeeping, services & dashboard.",
  "intro": [
   "An end-to-end property-management suite (PMS) for hotels, resorts and guest houses, built for Odoo 19 Community."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Property setup: floors, room types, rooms, amenities and services.",
     "Reservations: full booking lifecycle with availability checking and multi-room group bookings.",
     "Front desk: one-click check-in / check-out and room assignment.",
     "Folio billing: automatic nightly room charges, extra services, taxes and one-click invoicing.",
     "Housekeeping: a room-status board with auto-generated cleaning tasks.",
     "Automation: scheduled actions for nightly charge posting, no-show detection and reminders.",
     "Reporting: an occupancy / ADR / RevPAR dashboard, pivots, graphs and branded PDF printouts.",
     "Security: Receptionist, Housekeeping and Manager roles with multi-company record rules."
    ]
   }
  ],
  "category": "Services/Hotel",
  "version": "19.0.1.0.0",
  "price": 2000.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hotel_management/",
  "published": true
 },
 "wt-hr-referral-program": {
  "technical": "wt_hr_referral_program",
  "name": "Employee Referral Program",
  "summary": "Employees refer candidates through a personal link, earn points as the candidate moves through recruitment, and spend them in a reward catalogue from the portal.",
  "intro": [
   "Your own people know the best candidates. This turns that into a programme with rules, a ledger and a catalogue, rather than a spreadsheet and a promise."
  ],
  "sections": [
   {
    "heading": "How a referral works",
    "bullets": [
     "An employee puts a name forward, from the backend or from the portal, and an applicant is raised in Recruitment straight away",
     "Or they share a personal link for a job position. Anyone who applies through that link is credited to them without either of them typing a reference number",
     "The applicant carries the referral, so recruiters see who put the candidate forward and can filter and group on it"
    ]
   },
   {
    "heading": "Points",
    "bullets": [
     "Four events can be worth points: the referral being submitted, the candidate being interviewed, the candidate being hired, and the candidate passing probation",
     "Interviewed and hired are read off the recruitment stages, so the programme follows whatever pipeline you already use",
     "A rule can be pinned to particular job positions, which is how a hard-to-fill role is worth more than the rest",
     "Points are paid automatically as the applicant moves, and an event is only ever paid once. Skipping stages does not lose the earlier awards, and moving a candidate back and forth does not pay twice",
     "Every point is a line in a ledger. Balances are worked out from that ledger and nowhere else, so any figure can be explained"
    ]
   },
   {
    "heading": "Rewards",
    "bullets": [
     "A catalogue with a picture, a cost in points and a stock figure, or marked unlimited for things that cannot run out",
     "An employee claims a reward from the portal if they can afford it",
     "HR approves, refuses or marks it delivered. Approving commits the points and takes one off the shelf; refusing an approved claim puts both back",
     "The cost is frozen on the claim, so repricing a reward later never rewrites what somebody was charged"
    ]
   },
   {
    "heading": "The portal",
    "bullets": [
     "Employees see their referrals and where each candidate has got to",
     "Their balance, what they earned and what they have spent",
     "The reward catalogue, with a claim button that only appears when they can afford it",
     "A leaderboard ranking colleagues by the points they have earned"
    ]
   },
   {
    "heading": "Reporting and control",
    "bullets": [
     "Point history with pivot and graph views, by employee, event and job",
     "A printable point statement per employee and a voucher per claim",
     "Company-scoped record rules on every model, and referring employees see their own referrals and nothing else",
     "A scheduled action settles anything a data import moved behind the programme's back",
     "Requires Recruitment and the Portal. Nothing else."
    ]
   }
  ],
  "category": "Human Resources/Recruitment",
  "version": "19.0.1.0.0",
  "price": 129.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hr_referral_program/",
  "published": true
 },
 "wt-hrms-advances": {
  "technical": "wt_hrms_advances",
  "name": "WT HRMS Salary Advances",
  "summary": "Salary advance requests with multi-level approval, configurable limits, and payroll deduction tracking.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_advances/",
  "published": true
 },
 "wt-hrms-appraisal": {
  "technical": "wt_hrms_appraisal",
  "name": "WT HRMS Appraisal",
  "summary": "Employee performance appraisals with KRA-based scoring, goal tracking, and approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_appraisal/",
  "published": true
 },
 "wt-hrms-assets": {
  "technical": "wt_hrms_assets",
  "name": "WT HRMS Assets",
  "summary": "Asset allocation to employees - laptops, phones, SIMs, vehicles, keys - with issue/return workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_assets/",
  "published": true
 },
 "wt-hrms-attendance": {
  "technical": "wt_hrms_attendance",
  "name": "WT HRMS Attendance",
  "summary": "Advanced attendance tracking - late arrivals, early departures, overtime calculation, daily summary, and monthly reports.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_attendance/",
  "published": true
 },
 "wt-hrms-core": {
  "technical": "wt_hrms_core",
  "name": "WT HRMS Core",
  "summary": "Core HRMS features: enhanced employee form, dashboard, approval chains, notifications, and the foundation for payroll, loans, letters, documents, and asset allocation.",
  "intro": [
   "Foundation module for the WT HRMS suite - a clean, opinionated, community-first HR and payroll solution for Odoo.",
   "Other modules in the suite build on this: wt_hrms_documents - document vault with expiry tracking wt_hrms_assets - asset allocation to employees wt_hrms_letters - letter template engine wt_hrms_lifecycle - onboarding / offboarding workflows wt_hrms_loans - employee loans and advances wt_hrms_shift_roster - shift roster editor wt_hrms_payroll - country-agnostic payroll engine wt_hrms_payroll_* - country rule packs"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Extend Odoo's built-in hr.* models, never replace them",
     "One focused capability per module - install what you need",
     "Country-agnostic engine, localisations ship as separate data modules",
     "Every business rule is auditable, versioned, and replayable",
     "Built on community Odoo - no enterprise dependencies",
     "Enhanced employee form (emergency contacts, dependents, education history, work experience, references, medical info)",
     "Enhanced contract form (probation, confirmation, notice period, reporting manager history)",
     "Unified HR dashboard (headcount, on-leave, pending approvals, birthdays, contract expiries)",
     "Generic multi-level approval chain engine (used by loans, expense advances, salary advances, etc.)"
    ]
   }
  ],
  "category": "Human Resources",
  "version": "19.0.4.0.1",
  "price": 0.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_core/",
  "published": true
 },
 "wt-hrms-documents": {
  "technical": "wt_hrms_documents",
  "name": "WT HRMS Documents",
  "summary": "Employee document vault with expiry tracking and cron alerts.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_documents/",
  "published": true
 },
 "wt-hrms-expense": {
  "technical": "wt_hrms_expense",
  "name": "WT HRMS Expense",
  "summary": "Employee expense management with categories, expense sheets, and approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_expense/",
  "published": true
 },
 "wt-hrms-leave": {
  "technical": "wt_hrms_leave",
  "name": "WT HRMS Leave Management",
  "summary": "Advanced leave management - leave policies, carry-forward, encashment, comp-off, leave balance reports.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_leave/",
  "published": true
 },
 "wt-hrms-letters": {
  "technical": "wt_hrms_letters",
  "name": "WT HRMS Letters",
  "summary": "Generate HR letters - offer, experience, salary certificate, NOC, warning, termination - from QWeb templates.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_letters/",
  "published": true
 },
 "wt-hrms-lifecycle": {
  "technical": "wt_hrms_lifecycle",
  "name": "WT HRMS Lifecycle",
  "summary": "Onboarding checklists, offboarding workflows, and employee resignation management with approval.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_lifecycle/",
  "published": true
 },
 "wt-hrms-loans": {
  "technical": "wt_hrms_loans",
  "name": "WT HRMS Loans",
  "summary": "Employee loan management with amortization schedule, approval workflow, and payroll deduction integration.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.4.0.1",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_loans/",
  "published": true
 },
 "wt-hrms-overtime": {
  "technical": "wt_hrms_overtime",
  "name": "WT HRMS Overtime",
  "summary": "Employee overtime requests with policy-based rate multipliers and approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_overtime/",
  "published": true
 },
 "wt-hrms-payroll": {
  "technical": "wt_hrms_payroll",
  "name": "WT HRMS Payroll",
  "summary": "Country-agnostic payroll engine - salary structures, rule engine with safe_eval, batch processing, payslip generation, dry-run preview, and full audit trail.",
  "intro": [],
  "sections": [],
  "category": "Human Resources/Payroll",
  "version": "19.0.3.0.1",
  "price": 45.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_payroll/",
  "published": true
 },
 "wt-hrms-payroll-accounting": {
  "technical": "wt_hrms_payroll_accounting",
  "name": "WT HRMS Payroll - Accounting Integration",
  "summary": "Post confirmed payslips to Odoo accounting. Per-rule debit/credit account config, salary journal selection, batch-post button, auto-reverse on cancel. Closes the gap between WT HRMS Payroll and your books.",
  "intro": [
   "The bridge between `wt_hrms_payroll` and standard Odoo accounting."
  ],
  "sections": [
   {
    "heading": "Features",
    "bullets": [
     "Per-rule **Debit Account** + **Credit Account** + per-rule journal override",
     "Salary journal default in Settings",
     "Per-payslip \"Post to Journal\" creates an `account.move` with one line per rule",
     "Per-batch \"Post All Confirmed\" - bulk-post a whole period in one click",
     "Auto-reverse move when payslip is cancelled",
     "Smart-button on payslip linking to the posted `account.move`",
     "Skips zero lines automatically - clean books, no noise"
    ]
   }
  ],
  "category": "Human Resources/Payroll",
  "version": "19.0.1.0.1",
  "price": 35.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_payroll_accounting/",
  "published": true
 },
 "wt-hrms-payroll-bank-files": {
  "technical": "wt_hrms_payroll_bank_files",
  "name": "WT HRMS Payroll - Bank Disbursement Files",
  "summary": "One-click salary disbursement files for Pakistani banks. HBL, MCB, UBL, Meezan + generic CSV. Pulls confirmed/paid payslips from a batch, formats per-bank columns, downloads ready to upload.",
  "intro": [
   "Tired of hand-formatting CSVs for each bank's portal? This module ships ready-to-upload templates for the four biggest Pakistani banks plus a generic CSV format you can clone for any other bank."
  ],
  "sections": [
   {
    "heading": "Features",
    "bullets": [
     "**4 ready-made bank formats:** HBL, MCB, UBL, Meezan",
     "**Generic CSV** baseline - clone and adjust columns for any other bank",
     "Wizard: pick a payslip batch → pick a format → click Generate",
     "Downloadable file (CSV / TXT) attached to a `wt.hrms.bank.disbursement` run",
     "Run history per batch - see what was generated, when, by whom",
     "Per-employee bank account picked from `hr.employee.bank_account_id`",
     "Skips employees missing bank account info (with a clear warning)"
    ]
   }
  ],
  "category": "Human Resources/Payroll",
  "version": "19.0.1.0.1",
  "price": 40.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_payroll_bank_files/",
  "published": true
 },
 "wt-hrms-payroll-pk": {
  "technical": "wt_hrms_payroll_pk",
  "name": "WT HRMS Payroll - Pakistan",
  "summary": "Pakistan payroll localization - FBR income tax slabs (Finance Act 2024), EOBI, SESSI/PESSI, provident fund, gratuity rules, and default salary structure.",
  "intro": [],
  "sections": [],
  "category": "Human Resources/Payroll",
  "version": "19.0.1.0.1",
  "price": 30.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_payroll_pk/",
  "published": true
 },
 "wt-hrms-payroll-portal": {
  "technical": "wt_hrms_payroll_portal",
  "name": "WT HRMS Payroll - Employee Portal",
  "summary": "Self-service portal: my payslips, my loans, my advances, year-to-date totals. Each employee sees only their own data, downloads their own PDFs, no admin needed.",
  "intro": [
   "Adds a self-service portal so every employee can:",
   "All filtered to the current portal user via their linked `hr.employee.user_id`. No admin can ever see another user's portal page; row-level rules enforce it.",
   "Requires `wt_hrms_payroll`. Optional integration with `wt_hrms_loans` and `wt_hrms_advances` - those tabs only appear if the modules are installed."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "See **My Payslips** with bucket totals (gross, deductions, net)",
     "Open any payslip in detail with line breakdown",
     "See **My Loans** with current balance + amortization schedule",
     "See **My Advances** with status",
     "See a **Year-to-Date** summary (total earned, total deducted, total net)"
    ]
   }
  ],
  "category": "Human Resources/Payroll",
  "version": "19.0.1.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_payroll_portal/",
  "published": true
 },
 "wt-hrms-rewards": {
  "technical": "wt_hrms_rewards",
  "name": "WT HRMS Rewards & Disciplinary",
  "summary": "Employee rewards, warnings, disciplinary actions with severity levels, escalation tracking, and history.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.1.0.1",
  "price": 15.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_rewards/",
  "published": true
 },
 "wt-hrms-service-requests": {
  "technical": "wt_hrms_service_requests",
  "name": "WT HRMS Service Requests",
  "summary": "Employee service requests for IT, admin, maintenance, facilities - with approval workflow and SLA tracking.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_service_requests/",
  "published": true
 },
 "wt-hrms-shifts": {
  "technical": "wt_hrms_shifts",
  "name": "WT HRMS Shifts",
  "summary": "Shift roster management with shift types, employee scheduling, swap requests, and rotation tracking.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.1.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_shifts/",
  "published": true
 },
 "wt-hrms-training": {
  "technical": "wt_hrms_training",
  "name": "WT HRMS Training",
  "summary": "Employee skills tracking, training programs, and training request management with approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_training/",
  "published": true
 },
 "wt-hrms-travel": {
  "technical": "wt_hrms_travel",
  "name": "WT HRMS Travel",
  "summary": "Employee travel request management with advance, visa, and hotel tracking plus approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.2.0.1",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_travel/",
  "published": true
 },
 "wt-hrms-wfh": {
  "technical": "wt_hrms_wfh",
  "name": "WT HRMS Work From Home",
  "summary": "Employee work-from-home request management with approval workflow.",
  "intro": [],
  "sections": [],
  "category": "Human Resources",
  "version": "19.0.3.0.1",
  "price": 15.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_hrms_wfh/",
  "published": true
 },
 "wt-import-export": {
  "technical": "wt_import_export",
  "name": "Import / Export Power Tools",
  "summary": "Powerful data import & export for any model - CSV / XLSX / JSON, upsert, scheduled exports, templates and error logs.",
  "intro": [
   "A faster, smarter data import & export engine for any Odoo model."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Reusable import / export profiles - save the model, mapping and filters",
     "Three formats - CSV, Excel (XLSX) and JSON",
     "Import modes - Create, Update and Upsert (match existing records by ANY field, not just the external ID)",
     "Find-or-create related records on import",
     "Per-row error isolation - one bad row never aborts the run",
     "Import history with a downloadable error report",
     "Dry-run preview - validate a file before committing anything",
     "One-click blank template generator for any model",
     "Scheduled exports, delivered automatically by e-mail",
     "Works with every Odoo app and your own custom models"
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_import_export/",
  "published": true
 },
 "wt-insurance-broker": {
  "technical": "wt_insurance_broker",
  "name": "Insurance Brokerage Management",
  "summary": "Broker, agency and MGA system - insurer commission terms, side by side market quotes, policies with instalments and insurance premium tax, mid-term endorsements pro rated over the remaining term, a renewal pipeline with retention, claims with reserves and adjusters, and commission expected against commission actually received.",
  "intro": [
   "Written for a retail broker, a commercial agency or a managing general agent placing risks with several carriers. It follows a piece of business from the first enquiry to the commission landing in the bank, and keeps the paper trail the regulator asks for. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "Placing the risk",
    "bullets": [
     "A quotation captures the risk once: sum insured, excess, cover dates, the vehicle, the address, the vessel, the turnover, the prior claims",
     "Several insurer quotes sit side by side on the same record, each with its own premium, excess, cover level, terms and commission",
     "A carrier that will not quote is recorded as a decline with the reason, so next year you know who to stop asking",
     "Winning a quote asks which quote was taken and why. Price, wider cover, claims service, the only carrier with capacity: the reason is part of the file, not somebody's memory",
     "Losing one asks the same question the other way round, including whether it went to another broker and which one"
    ]
   },
   {
    "heading": "The policy",
    "bullets": [
     "Inception, expiry, sum insured, premium, and the insurance premium tax held separately from the premium, because it is a tax, not income",
     "A regulatory reference on every policy, built from the class code, so a return can be run off the book",
     "Commission calculated from the carrier's own terms for that class, with a separate renewal rate where the carrier pays less for renewed business",
     "Instalment plans: single premium, half yearly, quarterly or monthly, with the rounding remainder put on the first instalment rather than left hanging",
     "Cancellation returns the unused premium pro rated over the days left to run"
    ]
   },
   {
    "heading": "Mid-term changes",
    "bullets": [
     "An endorsement records what changed, when it takes effect and what it would cost for a whole year",
     "The system pro rates that figure over the days remaining, works out the tax on it and the commission on it, and writes the change back onto the policy when it is applied",
     "A reduction in cover produces a return premium and a commission clawback, with the same arithmetic in reverse"
    ]
   },
   {
    "heading": "Renewals",
    "bullets": [
     "Policies expiring inside the renewal window are flagged every night and the client is invited to renew",
     "Each expiry is marked retained, lapsed or lost to another broker, so the retention rate is a number off the book rather than a guess",
     "A renewal carries the previous policy forward, which is how the renewal commission rate gets picked up"
    ]
   },
   {
    "heading": "Claims",
    "bullets": [
     "Notification date recorded next to the date of loss, and the gap between them measured, because late notification is what prejudices a claim",
     "Reserve, excess, adjuster and adjuster reference, insurer claim number",
     "Settlement, or repudiation with the reason written down",
     "Every claim feeds the client's loss ratio, which is what the market asks for at renewal"
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Commission expected on every policy and every endorsement, reconciled line by line against what the carrier actually paid and when",
     "A shortfall outside tolerance is flagged rather than absorbed",
     "Commission by class and by carrier, and a commission invoice raised to the carrier where the account works on invoicing rather than statements"
    ]
   },
   {
    "heading": "Compliance",
    "bullets": [
     "A disclosure record for each thing said to the client and when it was said: terms of business, demands and needs, the product information document, how the firm is paid, cancellation rights, the renewal notice",
     "Policy documents issued is one of those records, with the date and the method",
     "A policy will not go on risk until the disclosures the firm insists on are on file, and that rule is a setting rather than a code change",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Insurance",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_insurance_broker/",
  "published": true
 },
 "wt-inventory-dashboard": {
  "technical": "wt_inventory_dashboard",
  "name": "WT Inventory Analytics Dashboard",
  "summary": "Enterprise Inventory Analytics Dashboard - KPIs, Stock Levels, Valuation, Movements & Alerts for Odoo 19",
  "intro": [
   "WT Inventory Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive Inventory analytics dashboard with real-time KPIs, stock level monitoring, low-stock alerts, valuation and movement tracking."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "9 KPI cards: Products in Stock, Stock Value, Low Stock Alerts, Out of Stock, Pending Receipts, Pending Deliveries, Stock Moves, Avg Product Value, Locations with Stock",
     "5 Tabs: Overview, Stock Levels, Movements, Valuation, Comparison",
     "Smart Filters: Period, Custom Date Range, Warehouse/Location",
     "Charts: Stock Value by Category, Stock Movement Trend, Top Products by Quantity, Low Stock Items list, Receipts vs Deliveries, Valuation by Location, Period Comparison",
     "Real-time low-stock alert list with reorder recommendations",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Inventory",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_inventory_dashboard/",
  "published": true
 },
 "wt-jewelry-management": {
  "technical": "wt_jewelry_management",
  "name": "Jewellery Retail & Gold Management",
  "summary": "Jewellery retail ERP - dated metal rate per gram and purity, counter sales priced from the rate plus making and wastage, old gold buy-back with a purity test, repair and custom order job cards, hallmark and HUID register, stone certificates, approval memo issue and weight reconciliation.",
  "intro": [
   "Written for a retail jeweller, a goldsmith's bench and a bullion counter. Everything in the shop is priced off one number, the rate per gram for the day, so that is where the module starts. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The rate table",
    "bullets": [
     "One rate per metal, per purity, per day, with the source it came from",
     "A rate entered at 24K or 999 fine feeds every other purity by fineness, so a 22K price exists the moment the fine rate is entered",
     "A rate can still be entered directly for a purity when the shop quotes a different number for 22K than the fineness ratio would give",
     "The rate is stamped onto a sale line when the line is written, so an old ticket still shows the price it was actually sold at",
     "An optional job copies the last rate forward at the start of the day, so the counter never opens on a blank rate"
    ]
   },
   {
    "heading": "Jewellery items",
    "bullets": [
     "Products carry the attributes the trade works with: metal, purity in karat, gross weight, stone weight, net metal weight, making charge either per gram or as a percentage of the metal value, wastage percentage, design code, and the hallmark unique identification number stamped on the piece. Stones set into an item are listed individually with carat, colour, clarity and the certificate that came with them."
    ]
   },
   {
    "heading": "Pricing at the counter",
    "bullets": [
     "A sale line works out its own price:",
     "Net metal weight times the rate for that purity on the day of the sale",
     "Making charge, per gram or as a percentage of the metal value, or a fixed amount for a piece bought in finished",
     "Wastage as a percentage of the metal weight, priced at the same rate",
     "Stone value taken from the stones set in the item",
     "A margin split that shows how much of the ticket is metal, how much is making and how much is stones, because those three behave completely differently"
    ]
   },
   {
    "heading": "VAT and hallmarking",
    "bullets": [
     "VAT can be charged on the whole ticket or on the making charge and wastage only, which is how the Gulf treats a jewellery sale",
     "When VAT is on the making charge only, the invoice is split into a metal and stone line and a making charge line, so the tax base on the invoice is the number the tax authority expects to see",
     "Items at or above a set weight refuse to be sold without a hallmark unique identification number recorded",
     "Hallmark centre and date sit on the item, and the assay standard is checked against the purity"
    ]
   },
   {
    "heading": "Old gold and buy-back",
    "bullets": [
     "An exchange records what the customer brought in: gross weight, stone weight, the purity they claim and the purity the test actually gave, with the test method written down. Impurity and solder come off as a deduction, the pure weight is what the credit is worked out from, and the shop's buy-back margin comes off the fine rate. A gap between the claimed purity and the tested purity beyond the tolerance has to be explained before the exchange is accepted. The credit lands against a purchase or is settled on its own."
    ]
   },
   {
    "heading": "Repairs and custom orders",
    "bullets": [
     "A job card carries the expected date, the goldsmith it went to, the customer's own metal in, the metal that came back in the finished piece, and the scrap and filings returned. What does not add up is the variance, and a job will not be handed over until somebody has written down where the difference went. Labour and materials are charged and invoiced from the same card."
    ]
   },
   {
    "heading": "Approval and memo issue",
    "bullets": [
     "Goods leave the shop with a customer on approval, with a salesman on a memo, or to an exhibition. Every piece that goes out is listed with its weight and its value at the rate on the day it left. What has come back, what has been sold and what is still out is on the front of the memo. A memo above the value limit needs a manager. Anything past its due date is chased."
    ]
   },
   {
    "heading": "Stock by weight",
    "bullets": [
     "Stock is counted in pieces and in grams. A count sheet takes the book quantity and the book weight, records what was actually on the tray, and prices the difference at today's rate. Any line outside the weight tolerance needs a reason before the count can be closed. That reconciliation is the record that proves nothing has walked out of the shop.",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Jewellery",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_jewelry_management/",
  "published": true
 },
 "wt-late-payment-reminder": {
  "technical": "wt_late_payment_reminder",
  "name": "Late Payment Reminder - Auto Follow-Up for Community",
  "summary": "Automatic late-payment reminder emails for overdue invoices in Odoo Community. Configurable rules + email templates + daily cron. The free alternative to Enterprise account_followup.",
  "intro": [
   "Odoo Community has no built-in automatic dunning / late-payment follow-up. Enterprise's `account_followup` module costs hundreds per user/year.",
   "This module fills that gap with a simple, configurable cron:"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Define follow-up rules: \"+3 days overdue\", \"+7 days\", \"+14 days\", \"+30 days\" (4 sensible defaults shipped).",
     "Each rule points to a customizable email template.",
     "Daily cron at 09:00 sweeps every overdue posted invoice and sends the right reminder.",
     "Per-invoice \"Send reminder now\" button on the invoice form.",
     "Per-invoice \"Disable follow-up\" toggle for sensitive customers.",
     "Skip threshold: minimum amount due (skip tiny invoices).",
     "Full audit trail in chatter - every reminder is logged.",
     "Master switch in Settings to pause everything during testing or month-end."
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "late payment reminder, dunning, follow-up, overdue invoice, account followup, auto email customer, payment chase, accounts receivable, AR, community followup, invoice reminder, automatic dunning letter, payment reminder cron, auto invoice email, debt collection email, customer payment chase, odoo 18 late payment, free followup module"
    ]
   }
  ],
  "category": "Accounting/Accounting",
  "version": "19.0.1.0.1",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_late_payment_reminder/",
  "published": true
 },
 "wt-laundry-management": {
  "technical": "wt_laundry_management",
  "name": "Laundry & Dry Cleaning Management",
  "summary": "Laundry and dry cleaning ERP - piece level garment tagging and barcodes, plant stages from sorting to packing, express surcharges, pickup and delivery routes with drivers, hotel and corporate contract rates, damage claims and rack locations.",
  "intro": [
   "Built for a high street dry cleaner, a wash and fold shop, a hotel linen plant or a laundry chain running collection routes. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "Every piece is tracked",
    "bullets": [
     "A garment record per physical item, with its own tag number and barcode, not just a line saying \"5 shirts\"",
     "Colour, fabric, brand, existing damage and stains recorded at the counter, which is what stops the argument at collection",
     "Stage by stage through the plant: received, sorted, cleaning, drying, pressing, quality check, packed, ready and collected",
     "Rack and slot recorded on packing, so the counter finds the order in seconds",
     "Scan a tag to move a piece, or move a whole order in one click"
    ]
   },
   {
    "heading": "Pricing that matches how the trade actually sells",
    "bullets": [
     "Per piece, per kilo, or per square metre for curtains and rugs",
     "A price list per garment type and service, so a silk blouse is not priced like a cotton shirt",
     "Express and same-day surcharges as a percentage or a fixed amount",
     "Contract rates for hotels and corporate accounts, with monthly consolidated invoicing instead of a ticket at a time",
     "Deposits, discounts with a reason, and loyalty for regulars"
    ]
   },
   {
    "heading": "Collection and delivery",
    "bullets": [
     "Routes with a driver, a vehicle and a run of stops",
     "Pickup and delivery requests, time windows and proof of collection",
     "A route sheet the driver can work from, and a run that closes with the pieces it brought back"
    ]
   },
   {
    "heading": "Running the plant",
    "bullets": [
     "Workload per stage, so a supervisor sees where the bottleneck is today",
     "Turnaround measured against the promised date, per order and per branch",
     "Reprocessing tracked as its own reason code, because rework is the real cost",
     "Damage and loss claims from report through to settlement",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Laundry",
  "version": "19.0.1.0.0",
  "price": 199.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_laundry_management/",
  "published": true
 },
 "wt-legal-practice": {
  "technical": "wt_legal_practice",
  "name": "Law Firm & Legal Practice Management",
  "summary": "Legal practice management - conflict of interest checks, matters with limitation diary, time recording against a rate card, disbursements kept apart from fees, a segregated client account that cannot go overdrawn, bills of costs, and WIP, realisation and lock-up reporting.",
  "intro": [
   "Built for a solicitors' practice, a set of chambers or an in-house legal team. It runs the file from the first phone call to the day the bill is paid, and it keeps the client's money in a place the firm's money never touches. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "Nothing opens without a conflict check",
    "bullets": [
     "Type the names on both sides and search them against every file the firm holds, not just the ones the person searching happens to have rights over",
     "A match against an existing client is treated as serious, and so is the other side's name turning up as a client",
     "Every serious match has to be opened, decided and marked reviewed, and going ahead anyway needs a written reason",
     "The check is a record with a date, a searcher and its results, because two years later the only question asked is who ran it and what it found",
     "Client due diligence is enforced too: no identity evidence and no signed engagement letter, no matter number"
    ]
   },
   {
    "heading": "The matter",
    "bullets": [
     "Practice area, responsible fee earner, supervising partner, court, claim number and the reference the other side quotes back at you",
     "Every party on the file with their role, the firm acting for them and their reference, which is what the next conflict search reads",
     "A document index per matter: what is on the file, which original the firm is holding and where it physically is, signed out and back in",
     "Hourly, fixed fee, capped, retainer or conditional, with the cap enforced at the point a bill would take the file past it",
     "A file will not close while there is unbilled work, an unpaid bill, an open key date or a penny of client money still held"
    ]
   },
   {
    "heading": "The diary, and the date that ends the claim",
    "bullets": [
     "Hearings, filing deadlines, court directions, completions and file reviews",
     "One limitation date per file, proposed from the practice area's limitation period and then corrected by the fee earner",
     "A limitation date cannot be vacated and cannot be deleted while it is live",
     "A scheduled job raises an activity on the responsible fee earner months before the date runs out, and says how many days are left"
    ]
   },
   {
    "heading": "Time recording",
    "bullets": [
     "Start and stop a timer, or type the hours in",
     "The rate comes off a rate card that works most specific first: a rate agreed with the client, then the department rate, then the fee earner's own. Old lines are kept, so a bill raised today for last year's work still comes out at last year's rate",
     "Rounded up to the firm's charging unit, normally six minutes",
     "A narrative the client can read, refused if it is too short to survive an assessment",
     "Non-billable time needs a reason, so the practice can see where the hours go",
     "A timer left running overnight is closed by a job and put back to draft"
    ]
   },
   {
    "heading": "Write-offs and write-downs",
    "bullets": [
     "Take the whole entry off, or reduce what will be billed and keep what was recorded",
     "Every one needs a reason from a fixed list",
     "A write-off over the firm's limit needs a partner, and the entry says who approved it",
     "Written-off value stays visible, because realisation is only honest if the write-offs are"
    ]
   },
   {
    "heading": "Disbursements, which are not income",
    "bullets": [
     "Recorded apart from fees, with their own types, taxes and recovery account",
     "Court fees, counsel, experts, searches and registry fees",
     "Paid out of office or out of the client account, and paying out of client money is refused if the client has not put enough on account",
     "Shown separately on the printed bill, because they are money laid out for the client and recovered pound for pound"
    ]
   },
   {
    "heading": "Client money",
    "bullets": [
     "A ledger per client, kept entirely apart from the office accounts",
     "Money on account, payments out on the client's behalf, transfers to office and returns of balance",
     "The balance cannot go below nothing. A payment that would overdraw the account is refused at the point somebody tries to post it, and the rule is enforced again as a database constraint",
     "Money may only be transferred to office against a bill that has already been delivered, and only by the cashier or a partner",
     "A printed statement with the balance carried down, ready for a file review"
    ]
   },
   {
    "heading": "Bills of costs",
    "bullets": [
     "Gather the unbilled time and disbursements off a file for a period",
     "Approve, then deliver, which raises and posts the invoice in Odoo accounting",
     "Fees post to the practice area's income account, disbursements to their own recovery account, so recovered outlay is never reported as turnover",
     "Money on account is drawn down against the delivered bill and shown on the face of it",
     "A posted invoice cannot be cancelled from behind: you are told to raise a credit note instead",
     "The printed bill shows professional fees, disbursements and tax apart from one another, with what is now payable after money on account"
    ]
   }
  ],
  "category": "Services/Legal",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_legal_practice/",
  "published": true
 },
 "wt-map-view": {
  "technical": "wt_map_view",
  "name": "Map View for Odoo 19 Community",
  "summary": "Put any model on a map, geocode addresses once and cache them, and plan a visiting route with distances, for Odoo Community.",
  "intro": [
   "Odoo Community has no map view. This adds one, and it adds the two things that make a map worth having in the first place: addresses that get geocoded once instead of on every screen refresh, and a route that puts the calls in a sensible order."
  ],
  "sections": [
   {
    "heading": "Any model on a map",
    "bullets": [
     "Point a map at any model in the database",
     "Position the pins from a linked contact's address, or from latitude and longitude fields the model already carries",
     "Colour the pins by the value of a field, with a legend",
     "Choose what appears when a pin is clicked",
     "Filter with a domain, so one model can carry several maps"
    ]
   },
   {
    "heading": "Geocoding that only happens once",
    "bullets": [
     "Every address that goes to the geocoder is cached against its normalised form, so two hundred contacts in the same office block are one lookup",
     "Addresses that come back empty are cached too, which is what stops a bad address being retried on every run",
     "A contact whose address is edited is put back in the queue automatically",
     "A scheduled action works through the backlog, shipped switched off so nothing calls out until you say so",
     "Uses the provider already configured in Odoo through base_geolocalize"
    ]
   },
   {
    "heading": "Route planning",
    "bullets": [
     "Turn a map, or a selection of records, into a visiting order",
     "Nearest neighbour from a starting point, then a 2-opt pass that untangles the crossings a greedy walk leaves behind",
     "Start from the company address, from a contact, or from typed coordinates",
     "Distance for each leg, a running total, and an estimated arrival time",
     "Kilometres or miles, switched at any time without recomputing",
     "A printable route sheet for the driver"
    ]
   },
   {
    "heading": "Works without the browser",
    "bullets": [
     "The pins, the colours and the bounding box are all worked out on the server and returned as ordinary data. There is a server-drawn preview of every map, so the module is still useful on a locked-down desktop, in a PDF, or from a script. No CDN is ever contacted, and there is no map tile subscription to buy: with no tile server configured the pins are drawn on a plain background.",
     "Requires base_geolocalize, which ships with Odoo."
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 89.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_map_view/",
  "published": true
 },
 "wt-marketing-automation": {
  "technical": "wt_marketing_automation",
  "name": "Marketing Automation Campaigns",
  "summary": "Drip campaigns over any Odoo model: an audience filter, a tree of timed steps, e-mails with open and click tracking, activities, server actions and tags.",
  "intro": [
   "Pick a model, write a filter, draw a flow. Records that match the filter join the campaign and are walked through the flow one step at a time, on the clock, by a scheduled action."
  ],
  "sections": [
   {
    "heading": "The audience",
    "bullets": [
     "A campaign targets any model in the database, not only leads or contacts. Contacts, leads, sale orders, subscriptions, event registrations, helpdesk tickets, your own custom model.",
     "The audience is an ordinary Odoo filter, edited with the domain widget.",
     "Records are re-checked on every run, so a record that starts matching later still joins.",
     "A record is never added twice. Turn the unique flag off and a record may join again, but only once its previous run has finished."
    ]
   },
   {
    "heading": "The flow",
    "bullets": [
     "Steps form a tree. Each step hangs off its parent and fires a set time after it.",
     "Five triggers: at the start, after the previous step, after the previous e-mail was opened, after it was clicked, and after it was not opened.",
     "The delay is a number and a unit: hours, days, weeks or months.",
     "Four actions: send an e-mail from a template, raise a scheduled activity on the record, run a server action, or add and remove a tag.",
     "A step can be given a validity window, so a message that is late because the server was down is dropped rather than sent at the wrong moment."
    ]
   },
   {
    "heading": "Open and click tracking",
    "bullets": [
     "Outgoing e-mail carries a tracking pixel and its links are rewritten to come back through Odoo first.",
     "Opens, clicks and click counts are recorded against the trace that sent the message, and roll up per step and per campaign.",
     "Delivery state is read back from the outgoing mail, so a failure shows on the trace."
    ]
   },
   {
    "heading": "What you can see",
    "bullets": [
     "The campaign form shows the flow as a tree with sent, opened and clicked counts on every step.",
     "Participants list what joined, when, and where each one has got to.",
     "Traces list every step that is scheduled, was processed, was rejected or was cancelled, with a calendar of what is coming and a pivot for reporting.",
     "A printable campaign summary."
    ]
   },
   {
    "heading": "Built to not run away",
    "bullets": [
     "The step tree cannot contain a cycle and cannot be nested past ten levels.",
     "One step produces at most one trace per participant, ever.",
     "A trace is claimed before it is executed, so a second cron pass cannot send the same message twice.",
     "Every run is capped, and a failing campaign is rolled back on its own without stopping the others.",
     "Needs Discuss and UTM, both of which ship with Odoo. The open and click tracking is done by this module itself, so there is nothing else to install."
    ]
   }
  ],
  "category": "Marketing/Marketing Automation",
  "version": "19.0.1.0.0",
  "price": 129.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_marketing_automation/",
  "published": true
 },
 "wt-odoo-pos-delivery": {
  "technical": "wt_odoo_pos_delivery",
  "name": "WT POS Delivery Driver",
  "summary": "Delivery driver management in POS - assign drivers, auto fee, validation, PDF report",
  "intro": [
   "Delivery driver management built directly into Odoo 19 Point of Sale."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers all supported versions (Odoo 18 and Odoo 19).",
     "Key Features:",
     "Delivery toggle button on POS product screen (auto adds fee line)",
     "Driver selection popup on payment screen",
     "Require driver validation before payment (configurable)",
     "Driver details printed on receipt (name, phone, vehicle, plate)",
     "Per-terminal driver assignment with one-click bulk-assign",
     "PDF driver report with order history",
     "Auto-computed order count and total sales per driver",
     "Advanced filtering, grouping, and search in driver list",
     "Full OWL reactivity - instant UI updates on toggle"
    ]
   }
  ],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 60.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_odoo_pos_delivery/",
  "published": true
 },
 "wt-order-line-numbers": {
  "technical": "wt_order_line_numbers",
  "name": "Order Line Numbers",
  "summary": "Show a sequential line number (1, 2, 3 …) on sale and purchase order lines.",
  "intro": [
   "Adds a small ``#`` column showing a sequential line number on the lines of every sale order and purchase order."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Section and note lines are skipped - only real product lines are numbered.",
     "Numbering follows the line order; reordering the lines re-numbers them automatically.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_order_line_numbers/",
  "published": true
 },
 "wt-partner-auto-ref": {
  "technical": "wt_partner_auto_ref",
  "name": "Partner Auto Reference",
  "summary": "Automatically fill a contact's Reference code from a sequence when it is left blank.",
  "intro": [
   "Give every customer and vendor a unique reference code automatically.",
   "When a top-level contact (a company or an individual, not a child address) is created without a Reference, one is generated from a dedicated sequence (``C00001`` …). Contacts that already have a reference are left untouched."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Sequence is editable under Settings > Technical > Sequences.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Contacts",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_partner_auto_ref/",
  "published": true
 },
 "wt-plm-eco": {
  "technical": "wt_plm_eco",
  "name": "PLM and Engineering Change Orders",
  "summary": "Engineering change orders over bills of materials, with BoM revisions, an automatic difference, staged approvals and versioned history, for Odoo Community.",
  "intro": [
   "Controlled changes to bills of materials. The live bill is never edited while a change is being discussed. The change order takes an archived copy, the engineer edits the copy, and the difference between the two is what gets reviewed, approved and applied."
  ],
  "sections": [
   {
    "heading": "The revision",
    "bullets": [
     "Starting a change order copies the current bill of materials, components and operations included",
     "The copy is archived, so no manufacturing order can pick up a half-finished revision",
     "The live bill of materials carries on as normal until the change is applied"
    ]
   },
   {
    "heading": "The difference",
    "bullets": [
     "Components added, components removed and quantities changed, worked out line by line",
     "Operations added, removed, and operations whose duration moved",
     "Changes to the bill of materials itself: the quantity produced, the unit of measure and the BoM type",
     "The difference is stored, so an applied change order still shows what it changed years later",
     "A warning on the form when the revision has been edited since the difference was worked out"
    ]
   },
   {
    "heading": "Approvals",
    "bullets": [
     "Approvers are set on the stage, so the rule is written once instead of on every change order",
     "Each approver gets their own line, with a status, a date and a comment",
     "A change order cannot reach the effective stage while a required approval is outstanding",
     "Rejecting asks for a reason and posts it back to the engineer",
     "A My Approvals list, and one button that sends the request to everyone still owing an answer"
    ]
   },
   {
    "heading": "Applying",
    "bullets": [
     "The revision becomes the live bill of materials with the version number put up by one",
     "The version it replaces is archived, never deleted",
     "The effective date is stamped on the new bill of materials",
     "Dropping the card in the effective column does the same thing as pressing Apply, and is refused for the same reasons",
     "Two change orders on the same version cannot both be applied: the second is refused rather than quietly putting the first one's change back out again",
     "A change order that has not opened its revision yet moves on to the version that has just gone live"
    ]
   },
   {
    "heading": "Traceability",
    "bullets": [
     "Every bill of materials knows its version, its effective date, the change order that produced it and the version it replaced",
     "Every bill of materials lists the change orders raised against it",
     "A version history button walks the whole chain, archived versions included",
     "A printable change order with the difference and the approvals"
    ]
   },
   {
    "heading": "Boards",
    "bullets": [
     "One board per change type, so a quick correction does not queue behind a design change",
     "Kanban by stage, plus list, calendar on the effective date, pivot and graph",
     "Multi-company record rules on every model",
     "Requires nothing but Odoo Manufacturing."
    ]
   }
  ],
  "category": "Manufacturing/Manufacturing",
  "version": "19.0.1.0.0",
  "price": 149.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_plm_eco/",
  "published": true
 },
 "wt-pos-dashboard": {
  "technical": "wt_pos_dashboard",
  "name": "WT POS Analytics Dashboard",
  "summary": "Enterprise POS Analytics Dashboard - KPIs, Charts, Filters, Comparison & Export for Odoo 19",
  "intro": [
   "WT POS Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive POS analytics dashboard with real-time KPIs, 9 metric cards, 7 charts, 6 analytical tabs and smart filters including cashier, terminal and custom date range. Includes CSV export."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "9 KPI cards: Revenue, Orders, Avg Order, Items Sold, Refunds, Sessions, Gross Margin, Discounts, Tax",
     "6 Tabs: Overview, Financial, Products, Customers, Sessions, Comparison",
     "Smart Filters: Period, Custom Dates, Terminal, Cashier",
     "Export: Download all order lines as CSV",
     "Charts: Sales trend, Payment breakdown, Revenue vs Refunds, Hourly heatmap, Top Products (qty & revenue), Top Categories, Top Customers, New vs Returning customers, Discounts by Cashier, Gross Margin by Category, Average Revenue by Hour, Period Comparison",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_pos_dashboard/",
  "published": true
 },
 "wt-pos-kitchen-display": {
  "technical": "wt_pos_kitchen_display",
  "name": "POS Kitchen Display System",
  "summary": "Preparation screens for kitchens and bars, split by product category, with preparation time measured per ticket and per product.",
  "intro": [
   "Dockets printed on a thermal roll tell a kitchen what to cook and nothing else. They cannot say how long an order has been waiting, they cannot be split between the grill and the bar, and once the paper is in the bin the service is impossible to measure. This replaces them with screens."
  ],
  "sections": [
   {
    "heading": "Screens",
    "bullets": [
     "A screen says which tills it listens to and which POS categories belong to it. The bar screen never shows a burger and the grill never shows a gin and tonic",
     "One till order becomes one ticket per screen that has work to do, each with its own items and its own clock, so the bar being slow does not make the grill look slow",
     "A screen with no till of its own listens to every till in the company, which is what a single-kitchen site wants",
     "Amber and red thresholds are set per screen, because a bar and a grill do not work to the same clock",
     "Served tickets clear themselves after a delay, so nobody has to tidy the screen during a service"
    ]
   },
   {
    "heading": "Tickets",
    "bullets": [
     "Four states: new, preparing, ready, served, each stamped on the server the moment it happens",
     "Stages let a kitchen name its own columns while still mapping onto those four states, so figures from two sites stay comparable",
     "Items are ticked off one at a time, and ticking the first one marks the ticket as started, because nobody in a kitchen presses a start button",
     "A ticket already called ready that gains a new item goes back in the queue, so the addition is actually cooked",
     "An item a chef has already ticked off is never rewritten or removed when the till re-sends the order. The food has been cooked whatever the till now says",
     "Rush marks a ticket and sorts it to the top"
    ]
   },
   {
    "heading": "Preparation time",
    "bullets": [
     "Preparation time is measured from the order reaching the kitchen to the ticket being called ready",
     "Time spent on the pass waiting for a waiter is reported separately, so a slow front of house does not read as a slow kitchen",
     "Every item carries its own time, so the average can be read per product. That is what tells you which dish holds a service up, rather than which order was unlucky",
     "Products carry a target preparation time, and anything over it is flagged",
     "Pivot and graph views on tickets and on items, plus a report screen with a date range, a breakdown by screen, product or hour, and the slowest ticket in the period"
    ]
   },
   {
    "heading": "The display",
    "bullets": [
     "A full screen display that polls the server, colour-coded by how long each ticket has been waiting",
     "Every state change and every timestamp is decided in Python, so a tablet with a wrong clock cannot change a figure a manager later reports on",
     "Tap an item to tick it off, tap again to put it back",
     "A printable docket for sites that still want paper as a backup",
     "Requires the Point of Sale app and nothing else."
    ]
   }
  ],
  "category": "Sales/Point of Sale",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_pos_kitchen_display/",
  "published": true
 },
 "wt-pos-saloon": {
  "technical": "wt_pos_saloon",
  "name": "WT POS Salon",
  "summary": "Salon appointments and services in POS - integrates with Salon Management",
  "intro": [],
  "sections": [],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 949.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_pos_saloon/",
  "published": true
 },
 "wt-pos-table-reservation": {
  "technical": "wt_pos_table_reservation",
  "name": "Restaurant Table Reservation",
  "summary": "Take table bookings from your website, with an engine that combines small tables for big parties, paces the kitchen and never double-books.",
  "intro": [
   "Guests book a table on your own website and the table is held for them. The booking engine decides what is free, what can be pushed together and how many covers the kitchen will take at once, so the floor plan is worked out before the guest has finished typing their name."
  ],
  "sections": [
   {
    "heading": "The dining room",
    "bullets": [
     "Zones for the main floor, the terrace, a private room, the bar",
     "Tables with seats, shape and a smallest-party setting",
     "Tables that can be pushed together, and tables that cannot, such as a booth or a bar counter",
     "Zones can be tied to the till that rings up the bills for that part of the room"
    ]
   },
   {
    "heading": "Sittings",
    "bullets": [
     "A sitting is lunch, or early dinner, or late dinner",
     "Opening hours, the days of the week it runs, and the restaurant's own timezone, so a booking made from abroad lands at the right time on the floor",
     "How far apart the times offered are, how long a table is held, and the turnaround between two parties on the same table",
     "A cap on covers per slot, which paces the kitchen rather than the room",
     "Notice period, how far ahead bookings open, and whether they confirm themselves"
    ]
   },
   {
    "heading": "The engine",
    "bullets": [
     "Works out which tables are free for the whole sitting, not just at the moment the guest arrives",
     "Takes the smallest table that fits, so the large tables stay open for the parties that need them",
     "Combines two or more small tables for a large party, always inside one zone, and always the set that wastes the fewest seats",
     "Counts the covers already arriving in the same slot against the kitchen cap",
     "Holds the sitting for the length of the write, so two guests clicking the last table at the same instant cannot both be told yes",
     "Backs all of it with a record-level check that no table is ever held by two live parties at once, whether the booking comes from the website, the wizard, an import or the shell"
    ]
   },
   {
    "heading": "The website",
    "bullets": [
     "Server-rendered booking pages: a date strip, a party size, and the times that are actually free",
     "A plain form post. No javascript to fail on a phone in a car park",
     "A confirmation email with the booking reference",
     "A reminder email before the table is due, on a schedule you set per sitting",
     "A tokenised page where the guest can look at their booking and give the table back, without an account"
    ]
   },
   {
    "heading": "On the floor",
    "bullets": [
     "List, kanban, calendar, pivot and graph views of the book",
     "A today view that opens on tonight's parties in the order they are due",
     "Availability check for the host on the phone, which takes the booking without leaving the dialog",
     "Confirm, seat, no show and cancel with a reason, all tracked in the chatter",
     "A printable service sheet for the pass",
     "Requires the Point of Sale and Website apps."
    ]
   }
  ],
  "category": "Sales/Point of Sale",
  "version": "19.0.1.0.0",
  "price": 49.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_pos_table_reservation/",
  "published": true
 },
 "wt-printing-press": {
  "technical": "wt_printing_press",
  "name": "Printing Press & Print Shop Management",
  "summary": "Commercial print ERP - imposition and sheet calculation, litho and digital estimating, plates ink make-ready and run time costed separately, job tickets through prepress proofing printing finishing and despatch, customer proof approval with a timestamp, spoilage and reprints by reason, quantity tolerance invoicing.",
  "intro": [
   "Built for a commercial printer running litho, digital or both. It does the arithmetic an estimator does on paper, keeps the job ticket the pressroom works from, and tells you at the end of the week what the work actually cost against what it was quoted at. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The estimate does the imposition",
    "bullets": [
     "Type in the finished size, the page count, the quantity, the colours front and back, the stock and the press. The estimate works out how many finished pieces fit on a press sheet, both ways round, with the gripper margin taken off and the bleed added on. From that it gets the number of forms, the net sheets, the running spoilage, the make-ready waste per plate, and the gross sheets you actually have to buy.",
     "It also checks the things that catch people out. A sheet that will not feed through the press is refused. A four colour job on a two unit press is refused. A saddle stitched book with a page count that is not a multiple of four is refused. And if the grain runs across the spine, it says so, because the fold will crack and the customer will send the whole delivery back."
    ]
   },
   {
    "heading": "Costing that separates the parts",
    "bullets": [
     "Paper, plates, ink, make-ready, run time and finishing are costed separately, so you can see which one is eating the job. Paper converts from a sheet price, a ream price or a tonne price. Plates are counted per form per colour, and a digital press has none. Ink is per colour per thousand sheets on litho and a click charge per printed side on toner. Make-ready is time on the press multiplied by the press hour rate, once per plate change. Run time is gross sheets divided by the real running speed, doubled when a non-perfecting press has to turn the stack.",
     "Finishing operations each carry a setup charge, a run rate and a material cost, on a per sheet, per copy or per job basis. Bought in work carries the trade finisher and their lead time, which moves the delivery date.",
     "Overhead comes on at a house percentage, and the sell price falls out of a target margin. Type over the price when the market says otherwise and the record tells you what margin you actually got."
    ]
   },
   {
    "heading": "The job ticket",
    "bullets": [
     "An approved estimate opens a ticket. It carries the specification onto the shop floor and walks through prepress, proofing, printing, finishing and despatch. The finishing operations come across with it and get booked off with the time they really took.",
     "Nothing goes on the press without an approved proof. The proof record holds the version, the file that went out, the method, the name of the person who approved it and the timestamp when they did. That record, and nothing else, is what settles an argument over a misprint six weeks later. Proofs that sit with the customer get chased automatically, and after two chases the account handler gets a call scheduled."
    ]
   },
   {
    "heading": "Spoilage and reprints",
    "bullets": [
     "Every sheet that goes in the bin is booked against a reason and a stage: prepress, make-ready, on press, finishing, material fault or a customer change. The cost is worked out properly, paper plus ink plus the press time it took to make the sheets, because spoilage costs far more than the paper and that is exactly why it gets under-reported.",
     "Reasons can be marked as forcing a reprint. A reprint opens as its own job against the original, so the second run is never buried in the first one's numbers, and a reprint cannot be raised until the spoilage that caused it has been written down."
    ]
   },
   {
    "heading": "Quantity tolerance",
    "bullets": [
     "A press run does not stop on the number. Set the tolerance the customer agreed to, and an over or under delivery inside that band is accepted and invoiced at what was actually delivered. Outside the band, despatch is refused with the figures in front of you, so somebody makes a decision rather than a delivery note making it for them."
    ]
   },
   {
    "heading": "What it tells you afterwards",
    "bullets": [
     "Estimated cost against actual cost, per job, with the variance",
     "Press utilisation: hours booked against hours the site says are available",
     "Spoilage by reason, by stage and by press",
     "Reprints, what they cost and what caused them",
     "Estimates won, lost and expired, with the reason they were lost",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Printing",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_printing_press/",
  "published": true
 },
 "wt-product-auto-sku": {
  "technical": "wt_product_auto_sku",
  "name": "Product Auto SKU",
  "summary": "Automatically fill a product's Internal Reference from a sequence when it is left blank.",
  "intro": [
   "Never ship a product with an empty Internal Reference again.",
   "When a product is created without an Internal Reference (SKU), one is generated automatically from a dedicated sequence (``SKU00001`` …). Products that already have a reference are left untouched."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Sequence is editable under Settings > Technical > Sequences.",
     "Zero configuration - install and it works."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_product_auto_sku/",
  "published": true
 },
 "wt-project-dashboard": {
  "technical": "wt_project_dashboard",
  "name": "WT Project Analytics Dashboard",
  "summary": "Enterprise Project Analytics Dashboard - KPIs, Tasks, Team Performance, Timeline & Comparison for Odoo 19",
  "intro": [
   "WT Project Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive Project analytics dashboard with real-time KPIs, task tracking, team workload, deadline monitoring and project-level filtering."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "10 KPI cards: Active Projects, Total Tasks, Done Tasks, Overdue Tasks, Due Today, Team Members, No Deadline, High Priority, Created in Period, Completion %",
     "5 Tabs: Overview, Tasks, Team, Timeline, Comparison",
     "Smart Filters: Period, Custom Date Range, Project selector",
     "Charts: Task Status breakdown, Tasks by Assignee, Overdue vs On-time trend, Completion rate over time, Priority distribution, Team workload, Period Comparison",
     "Overdue task list with assignee and deadline",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Project",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_project_dashboard/",
  "published": true
 },
 "wt-purchase-dashboard": {
  "technical": "wt_purchase_dashboard",
  "name": "WT Purchase Analytics Dashboard",
  "summary": "Enterprise Purchase Analytics Dashboard - KPIs, Vendors, Products, Payables & Comparison for Odoo 19",
  "intro": [
   "WT Purchase Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive Purchase analytics dashboard with real-time KPIs, vendor performance, spend analysis, bill tracking and period comparison."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "9 KPI cards: Total Spend, Purchase Orders, Avg PO Value, RFQs, Vendors, Items Ordered, Bills to Process, Overdue Bills, Tax Amount",
     "5 Tabs: Overview, Financial, Vendors, Products, Comparison",
     "Smart Filters: Period, Custom Date Range, Vendor",
     "Charts: Spend Trend, Top Vendors by spend, Top Products by quantity, PO Status breakdown, Bills Aging, Monthly spend vs budget, Period Comparison",
     "Recent PO list with status indicators",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Purchase",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_purchase_dashboard/",
  "published": true
 },
 "wt-pwa-push": {
  "technical": "wt_pwa_push",
  "name": "PWA Mobile App + Real-Time Push Notifications",
  "summary": "Install Odoo as a mobile app (PWA) and send real-time web push notifications to phones & desktops - branded app icon, one-click setup, reusable push API. No Enterprise, no app store.",
  "intro": [
   "Make your Odoo backend installable as a **Progressive Web App** (Add to Home Screen → full-screen, native-like mobile app) and send **real-time push notifications** to phones and desktops - all on Odoo **Community**, with no Enterprise subscription and no native app-store build."
  ],
  "sections": [
   {
    "heading": "Features",
    "bullets": [
     "**Branded PWA** - app name, short name, theme colour and icon are configurable from Settings; icons are rendered automatically at every required size (192 / 512 / maskable) from your company logo or an uploaded image.",
     "**One-click web push** - VAPID keys are generated automatically on install, so browser push works out of the box. A *\"Send me a test notification\"* button lets you verify it in one click.",
     "**Reusable API** - call ``env['pwa.push']._pwa_send_push(users, title, body, record=...)`` from any module, server action or automation rule to notify users. Perfect for \"record assigned to you\", \"approval needed\", SLA alerts…",
     "**Zero extra dependencies** - built entirely on Odoo's Community ``mail`` web-push stack (VAPID + service worker), which sends via the standard ``cryptography`` library that already ships with Odoo. Nothing to pip install; it works out of the box."
    ]
   },
   {
    "heading": "Requirements",
    "bullets": [
     "Odoo 19 Community with the ``mail`` module (standard) and an **HTTPS** site (any valid certificate) - that's it."
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.1",
  "price": 500.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_pwa_push/",
  "published": true
 },
 "wt-quotation-followup": {
  "technical": "wt_quotation_followup",
  "name": "Quotation Follow-Up - Auto Reminders for Sales",
  "summary": "Automatic follow-up reminder emails for open quotations in Odoo. Configurable rules + email templates + daily cron - chase your quotes and win more deals.",
  "intro": [
   "Most quotations are lost simply because nobody followed up. Odoo will happily let a quotation sit untouched for weeks.",
   "This module fixes that with a simple, configurable cron:"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Define follow-up rules: \"+2 days\", \"+5 days\", \"+10 days\", \"+15 days\" (4 sensible defaults shipped).",
     "Each rule points to a customizable email template.",
     "Daily cron sweeps every open quotation and sends the right reminder.",
     "Per-quotation \"Send reminder now\" button on the quotation form.",
     "Per-quotation \"Disable follow-up\" toggle for sensitive customers.",
     "Skip threshold: minimum quotation total (ignore tiny quotes).",
     "Optional CC to the salesperson / sales manager.",
     "Full audit trail in chatter - every reminder is logged.",
     "Master switch in Settings to pause everything during testing."
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "quotation follow up, sale order reminder, quote chasing, follow up email, auto email customer, sales reminder cron, quotation reminder, win more deals, sales follow-up, automatic quote reminder, lost quotation, quote expiry reminder, sales order followup, odoo sales reminder"
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_quotation_followup/",
  "published": true
 },
 "wt-real-estate": {
  "technical": "wt_real_estate",
  "name": "WT Real Estate",
  "summary": "Complete Real Estate & Property Management System - Listings, CRM, Transactions, Contracts & Payments",
  "intro": [
   "Full-featured Property Management System for Odoo 19."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Property listings (sale, rent, lease) with rich detail fields",
     "Property types: House, Flat, Plot, Commercial, Farmhouse, Hall, Warehouse, Land",
     "Multi-image gallery per property + floor plan upload",
     "Area units: Marla, Kanal, Sqft, Sqm (with auto-conversion)",
     "CRM: inquiry tracking, lead assignment, follow-up reminders",
     "Transaction management: sale / rent / lease deals with status workflow",
     "Payment schedule: installments, rent collection, token tracking",
     "Contract generation (sale/rent agreements)",
     "Commission rules per agent (percentage or fixed)",
     "Customer profiling: buyer, seller, tenant, landlord + CNIC field",
     "Role-based access: Manager, Agent, Receptionist",
     "Email notifications: inquiry received, transaction status",
     "Google Maps coordinates (lat/lng) per property",
     "Featured / Hot Deal / Urgent Sale tag system"
    ]
   }
  ],
  "category": "Real Estate",
  "version": "19.0.1.0.0",
  "price": 35.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_real_estate/",
  "published": true
 },
 "wt-recent-records": {
  "technical": "wt_recent_records",
  "name": "Recently Viewed Records + Pinned Favorites",
  "summary": "Floating navbar widget that lists the last 20 records each user opened plus their pinned favorites. Click any item to jump straight back. The fast-access shortcut Odoo Community is missing.",
  "intro": [
   "Power users open the same 10-20 records dozens of times a day: the current sale order, the customer's contact, the active project. Odoo has no built-in \"recent\" sidebar or \"pin to favorites\" feature, so every visit costs a full menu navigation.",
   "This module adds a small clock-icon widget in the navbar that opens a dropdown listing:",
   "A daily cron prunes unpinned records older than 30 days so the table stays tiny."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Pinned favorites at the top (manually starred records, persist forever)",
     "The last 20 records the user opened, newest first",
     "Click any line to jump straight to the record",
     "Pin / unpin button on every entry",
     "Per-user, no cross-contamination between users"
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "recent records, recently viewed, bookmarks, favorites, pinned records, quick access, navigation, history, frequent records, productivity, shortcuts, jump to record, navbar widget, last opened, recently opened, fast switching"
    ]
   }
  ],
  "category": "Productivity",
  "version": "19.0.1.0.0",
  "price": 15.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_recent_records/",
  "published": true
 },
 "wt-rental-management": {
  "technical": "wt_rental_management",
  "name": "Rental Management",
  "summary": "Rent products out by the hour, day, week or month, with a rental price table, availability checking that refuses to oversell, pickup and return recording, late fees and security deposits.",
  "intro": [
   "Hire equipment out on a sales order. The order carries a pickup date and a return date, each line is priced from the product's own rental table, and the order will not confirm if the units are already promised to somebody else."
  ],
  "sections": [
   {
    "heading": "The price table",
    "bullets": [
     "Every rentable product carries its own rates: so many hours, days, weeks or months for so much money",
     "The rate that covers the requested duration for the least money wins, so a ten day hire is charged as two weeks when that is cheaper than ten days",
     "Part periods round up to a whole block, which is how hire is quoted",
     "A rate priced at zero is ignored, so a half finished price list cannot give the goods away"
    ]
   },
   {
    "heading": "Availability",
    "bullets": [
     "Units already promised to other confirmed rentals are counted for the exact window requested, not for the day",
     "Back to back hires do not clash: a return at ten o'clock frees the unit for a pickup at ten o'clock",
     "Confirming an order that oversells is refused, and the message names the product, the free quantity and the orders holding the rest",
     "The pool of units is either a fixed figure you set on the product or the quantity on hand",
     "A separate availability screen answers \"have we got four of these next Tuesday\" without touching an order"
    ]
   },
   {
    "heading": "Out and back",
    "bullets": [
     "Pickup and return are recorded with the actual date, time and quantity, and each one leaves a movement record behind",
     "Partial pickups and partial returns are allowed and the line keeps track of what is still out",
     "A late return is charged from the same price table, with an optional penalty percentage on top, and the charge is added to the order as a line",
     "A schedule shows what goes out and what comes back, as a list or a calendar"
    ]
   },
   {
    "heading": "Deposits",
    "bullets": [
     "A security deposit per unit, totalled on the order",
     "The deposit is invoiced on its own, then refunded by credit note with any late charge deducted"
    ]
   },
   {
    "heading": "Overdue",
    "bullets": [
     "A scheduled action flags orders whose return date has passed and puts an activity on the order for whoever is following it, once, not every night",
     "Requires the Sales and Inventory apps."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": 99.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_rental_management/",
  "published": true
 },
 "wt-rental-website": {
  "technical": "wt_rental_website",
  "name": "Online Rental Store",
  "summary": "Sell rentals through the website shop: a date range picker on the product page, availability checked on the server against bookings and against other visitors carts, period pricing, deposits and pickup and return dates in the portal.",
  "intro": [
   "Hire goods out through the ordinary website shop. A rentable product carries a date range picker instead of a plain Add to cart, the period is priced from a rate card, and the units are held the moment the hire goes in the cart so the last one cannot be sold to two people at once."
  ],
  "sections": [
   {
    "heading": "The booking panel",
    "bullets": [
     "A pickup and a return field on the product page, with the rate card shown next to them so a visitor can see what a day and a week cost before picking anything",
     "Check dates and price gives a full breakdown: the period, the rate that applies, the charge per unit, the total and the deposit",
     "The shop says how much is free for the exact window asked for, not for the day",
     "Server rendered pages and plain form posts throughout, with JavaScript limited to the date picker"
    ]
   },
   {
    "heading": "Availability that holds up",
    "bullets": [
     "The figure is worked out on the server every time, and it is the only figure anything is allowed to trust",
     "Units sitting in somebody else's cart are counted, so two visitors racing for the last one cannot both check out",
     "A cart hold lapses after a configurable number of minutes and the units go back on the market on their own",
     "Back to back hires do not clash: a return at ten o'clock frees the unit for a pickup at ten o'clock",
     "The order is checked again at confirmation, so an order that can no longer be honoured never reaches the confirmed state",
     "Blackout periods take units out of the pool for servicing or a shutdown week, with no order behind them",
     "The pool is either a fixed number of units per product or the quantity on hand"
    ]
   },
   {
    "heading": "Pricing the period",
    "bullets": [
     "A rate card per product: so many hours, days, weeks or months for so much money",
     "The rate covering the requested period for the least money wins, so ten days are charged as two weeks when that is cheaper",
     "Part periods round up to a whole block, which is how hire is quoted",
     "A rate priced at zero is skipped, so a half typed rate card cannot give the goods away",
     "A product with no rate at all falls back to the sales price per started day, or can be left unbookable",
     "Where the Rental Management module is installed its rate cards are read too, and where it is not this module works on its own"
    ]
   },
   {
    "heading": "Through the checkout and afterwards",
    "bullets": [
     "Every rental line carries its period in its own description, so the dates show in the cart, at checkout, on the order confirmation, on the invoice and in the portal",
     "The cart carries a hire summary listing each period and its charge",
     "A security deposit rides on a line of its own and is never mixed into the hire charge",
     "My Rentals in the customer portal lists what is out, when it was collected and when it is due back",
     "A booking sheet to print for the yard, with a place for both signatures"
    ]
   },
   {
    "heading": "In the back office",
    "bullets": [
     "A rental diary as a calendar, a list and a pivot",
     "Every hold with its order, its window and whether it still counts",
     "A wizard to release, extend or confirm a pile of holds at once",
     "Store settings per website: default times, notice required, shortest and longest hire, booking horizon, how long a cart holds stock and whether a visitor has to sign in",
     "Company scoped record rules on every model",
     "Requires the eCommerce app."
    ]
   }
  ],
  "category": "Website/Website",
  "version": "19.0.1.0.0",
  "price": 99.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_rental_website/",
  "published": true
 },
 "wt-restaurant-management": {
  "technical": "wt_restaurant_management",
  "name": "Restaurant & Cloud Kitchen Management",
  "summary": "Multi-outlet restaurant ERP - menu engineering with recipe food cost, QR table ordering, kitchen display, dine-in, takeaway, delivery and aggregator orders, riders, reservations, wastage and fiscal receipts (ZATCA / GST / EU ready).",
  "intro": [
   "One application for a single cafe, a multi-brand cloud kitchen or a chain of outlets. Built on Odoo Community: no Enterprise subscription and no external service required."
  ],
  "sections": [
   {
    "heading": "Operations",
    "bullets": [
     "Outlets, floors and tables, each table with its own QR code for guest ordering",
     "Order types out of the box: dine-in, takeaway, delivery and third-party aggregator (Talabat, Deliveroo, Uber Eats, Careem and any channel you add)",
     "Kitchen Display System - tickets routed to the station that cooks them, with queued / preparing / ready per line and a live board per station",
     "Riders, dispatch, promised time and on-time delivery tracking",
     "Table reservations with deposits, auto no-show release and waitlist"
    ]
   },
   {
    "heading": "Menu engineering",
    "bullets": [
     "Menu categories, items, combos and modifier groups with min / max selection",
     "Recipes per item: ingredient, quantity and unit of measure",
     "Live food cost, margin and food-cost percentage per item, recomputed from the actual purchase price of every ingredient",
     "Allergens, calories, spice level, prep time and availability windows",
     "Stock consumed from the recipe when an order is confirmed, so inventory is correct without anybody counting"
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Service charge, tip, per-line and per-order discount with a reason",
     "Bills posted straight into Odoo Accounting as customer invoices",
     "Multi-company, multi-currency and per-outlet journals",
     "Fiscal receipt QR: ZATCA Phase 2 TLV for Saudi Arabia, GSTIN block for India, and a plain compliant receipt everywhere else",
     "Wastage log that scraps stock and prices the loss"
    ]
   },
   {
    "heading": "Analysis",
    "bullets": [
     "Sales by outlet, channel, category, item, waiter and hour of day",
     "Menu engineering quadrant: stars, plough-horses, puzzles and dogs",
     "Average ticket, table turn time and kitchen preparation time",
     "Requires Odoo 19 Community with Sales, Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Restaurant",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_restaurant_management/",
  "published": true
 },
 "wt-salary-package-configurator": {
  "technical": "wt_salary_package_configurator",
  "name": "Salary Package Configurator and Digital Job Offers",
  "summary": "Build salary packages, send tokenised offers candidates can configure themselves, and see net pay and cost to company recompute as they choose.",
  "intro": [
   "Offers usually leave the building as a PDF and come back as an email that says \"can we talk about the car allowance\". This turns the offer into a page the candidate can actually use: they open a private link, move the parts of the package you allow them to move, watch the net pay and the cost to company change, and accept or decline on the spot."
  ],
  "sections": [
   {
    "heading": "Packages and benefits",
    "bullets": [
     "A benefit is described once: a fixed amount, a percentage of gross, or a choice from a list of options you maintain",
     "Each benefit says whether it is taxable, whether it counts in cost to company, whether the figure is monthly or yearly, and what extra it costs the employer",
     "A package pulls benefits together with their starting values, and decides which ones the candidate may move and between what limits",
     "Offers copy the package, so tightening a package next month never changes an offer already with a candidate"
    ]
   },
   {
    "heading": "Gross to net that works anywhere",
    "bullets": [
     "The calculation is a rule set: an ordered list of rules, each with a condition and an amount",
     "Rules read named values such as taxable_gross, and each other, so a second tax band can be written on top of the first",
     "Expressions are read by this module's own evaluator, never by Python's eval, so an HR user writing a tax band cannot reach the database",
     "A rule that cannot be worked out is reported on the offer and treated as zero, rather than breaking the page a candidate is looking at"
    ]
   },
   {
    "heading": "The candidate's page",
    "bullets": [
     "A private link with a long random token, no login and no account",
     "Plain server-rendered HTML and ordinary form posts, so it works with no JavaScript and on any device",
     "Every figure is recomputed on the server, so a hand-edited form cannot buy a bigger car",
     "Accepting stamps the time and the address it came from, and freezes the figures that were agreed",
     "Declining asks why, and records the answer against the offer"
    ]
   },
   {
    "heading": "Around the offer",
    "bullets": [
     "Offer references from a sequence, kanban, calendar of deadlines, pivot and a printable offer letter",
     "A scheduled action closes offers whose date has passed",
     "An accepted offer becomes an employee through a short wizard",
     "Two security groups, company record rules on every model, and the link can be replaced if it is forwarded by mistake",
     "Requires nothing but the Employees app."
    ]
   }
  ],
  "category": "Human Resources/Employees",
  "version": "19.0.1.0.0",
  "price": 199.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_salary_package_configurator/",
  "published": true
 },
 "wt-sale-dashboard": {
  "technical": "wt_sale_dashboard",
  "name": "WT Sales Analytics Dashboard",
  "summary": "Enterprise Sales Analytics Dashboard - KPIs, Products, Customers, Salespersons & Comparison for Odoo 19",
  "intro": [
   "WT Sales Analytics Dashboard - Enterprise Edition for Odoo 19",
   "A professional, fully responsive Sales analytics dashboard with real-time KPIs, order tracking, product performance, customer insights and salesperson leaderboards."
  ],
  "sections": [
   {
    "heading": "PRICING",
    "bullets": [
     "One-time purchase. No subscription, no recurring fees. A single purchase covers Odoo 19.",
     "Key Features:",
     "9 KPI cards: Total Revenue, Confirmed Orders, Avg Order Value, Quotations, Customers, Items Sold, Conversion Rate, Tax Collected, Pending Deliveries",
     "6 Tabs: Overview, Financial, Products, Customers, Salespersons, Comparison",
     "Smart Filters: Period, Custom Date Range, Salesperson",
     "Charts: Revenue Trend, Order Status breakdown, Top Products, Top Customers, Salesperson Leaderboard, Monthly Revenue vs Target, Period Comparison",
     "Auto-refresh every 5 minutes",
     "Fully responsive - works on desktop, tablet and mobile"
    ]
   }
  ],
  "category": "Sales",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_sale_dashboard/",
  "published": true
 },
 "wt-sale-distributor": {
  "technical": "wt_sale_distributor",
  "name": "WT Sale Distributor",
  "summary": "Mobile-first field distribution system - Order Taker + Delivery Man apps for Odoo 19",
  "intro": [
   "A complete mobile-first distribution management system with two dedicated apps:",
   "TERRITORY & ROUTE MANAGEMENT"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Route & Stop Navigation - visit stops in sequence, search by name/phone/code",
     "Smart Product Picker - browse by category, search, add to cart with quantity controls",
     "Customer Profiles - credit limit, outstanding balance, shop type, last order",
     "Order History - filter by status (All/Draft/Confirmed/Done) and date range",
     "Edit, Submit, Cancel Orders - full order lifecycle from mobile",
     "Reorder - pre-fill cart from any previous order in one tap",
     "Cross-route Customer Search",
     "Today's Deliveries by Route - with progress bar and status filters",
     "Full Delivery Validation - confirm all items delivered",
     "Partial Delivery + Back Orders - enter actual quantities, auto-creates back order",
     "Skip / Not Delivered - log reason (customer not available, refused, etc.)",
     "Cancelled Orders Visibility - see all cancelled orders for the day",
     "Payment Collection - cash/bank, auto-reconciled against invoice",
     "Day Summary Dashboard - deliveries, order value, cash collected"
    ]
   }
  ],
  "category": "Sales/Distribution",
  "version": "19.0.3.0.0",
  "price": 500.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_sale_distributor/",
  "published": true
 },
 "wt-sales-commission": {
  "technical": "wt_sales_commission",
  "name": "Sales Commission",
  "summary": "Commission plans for salespeople, resellers and introducers - percentage, margin, fixed or tiered, settled into vendor bills.",
  "intro": [
   "Work out what your salespeople, resellers and introducers are owed, and pay them, without a spreadsheet."
  ],
  "sections": [
   {
    "heading": "Plans and rules",
    "bullets": [
     "A plan holds an ordered list of rules; the first rule that matches a line decides what it pays",
     "Rules can be restricted by product, product category, customer or a minimum line amount",
     "Five ways to calculate: percentage of the sale, percentage of the margin, a fixed amount per unit, a fixed amount per line, or a tiered rate",
     "Pay when the invoice is posted, or only once the customer has actually paid"
    ]
   },
   {
    "heading": "Agents",
    "bullets": [
     "Any contact can be flagged as a commission agent and given a plan",
     "Several agents can share one sales order, each on their own plan",
     "A customer can carry a default agent, for orders nobody else claims",
     "Credit notes reverse the commission automatically"
    ]
   },
   {
    "heading": "Settlement",
    "bullets": [
     "Collect a period of confirmed commission per agent into one settlement",
     "Confirm it, then raise the vendor bill in one click",
     "Print the settlement statement for the agent",
     "Every figure traces back to the invoice line that produced it."
    ]
   }
  ],
  "category": "Sales/Sales",
  "version": "19.0.1.0.0",
  "price": 79.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_sales_commission/",
  "published": true
 },
 "wt-salon-management": {
  "technical": "wt_salon_management",
  "name": "WT Salon Management",
  "summary": "Complete Salon & Beauty Parlour ERP - Appointments, Commissions, Portal Booking, Invoicing & More",
  "intro": [
   "Way4Tech Salon Management is a complete Salon & Beauty Parlour ERP for Odoo 19. Manage appointments, service catalog, online portal booking, staff commissions, sales targets, customer history, inventory BOM consumption, invoicing integration, thermal receipt printing, multi-stage workflow and role-based access control."
  ],
  "sections": [],
  "category": "Services/Salon",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_salon_management/",
  "published": true
 },
 "wt-school-management": {
  "technical": "wt_school_management",
  "name": "WT School Management",
  "summary": "Complete School ERP - Students, Grades, Fees, Attendance, Timetable, Transport & More",
  "intro": [
   "Way4Tech School Management is a complete School ERP for Odoo 19. Manage student admissions, enrollment, grades, academic sessions, fee structures, attendance, class timetables, assignments, lesson plans, transport routes, scholarships, discipline records, notice board, term reports, and HR extensions for school staff."
  ],
  "sections": [],
  "category": "Education",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_school_management/",
  "published": true
 },
 "wt-shop-floor": {
  "technical": "wt_shop_floor",
  "name": "Shop Floor Operator Terminal",
  "summary": "Touch terminal for machine operators: start, pause with a reason, record production and scrap, answer quality checks, and get real OEE per work centre.",
  "intro": [
   "A touch screen an operator can actually use with a glove on, backed by a server that does not trust it. Every rule lives in Python. The browser only draws buttons."
  ],
  "sections": [
   {
    "heading": "The terminal",
    "bullets": [
     "One operator logs in at one work centre and gets a session. Two operators cannot open the same machine at once, because that would count the same minutes twice",
     "Big touch targets, one screen per machine, work orders on the left and the job on the right",
     "Start, pause, resume, record what came off the machine, answer the quality checks, finish",
     "A session left running overnight is closed by a scheduled action rather than blocking the next shift"
    ]
   },
   {
    "heading": "Stops that mean something",
    "bullets": [
     "Pause reasons are ordinary records you configure: rename them, add your own, switch off the ones you do not use",
     "Each reason belongs to a loss category, so its minutes land in the right part of OEE instead of disappearing",
     "A reason can demand a written explanation, and a blocking reason stops the machine until it is cleared",
     "Every pause writes a real mrp.workcenter.productivity record, so the figures Odoo already keeps stay correct"
    ]
   },
   {
    "heading": "Quality checks per operation",
    "bullets": [
     "Define checks once against a routing operation. Every work order for that operation gets its own copy to answer",
     "Three kinds: pass or fail, a measure compared against a tolerance range, or free text such as a batch number",
     "A blocking check has to be answered, and answered without a failure, before the operation can be finished. The refusal names what is still open",
     "The rule that decides pass or fail runs on the server, so the touch screen cannot talk it into accepting a part that is out of tolerance",
     "A shop floor manager can release an operation with checks still open, and the override is written to the log rather than hidden"
    ]
   },
   {
    "heading": "Production that cannot be counted twice",
    "bullets": [
     "A tablet on a factory floor loses its network and the browser retries. The terminal generates a uuid before it sends anything and keeps sending the same one until the server answers",
     "Every request token is stored with a unique database index. A token that has already been recorded is a replay: the stored answer is handed back and not one quantity, duration or state is touched",
     "The retry counter is visible in the analysis, so a shift with a bad network is obvious instead of silently doubling its output"
    ]
   },
   {
    "heading": "OEE worked out, not guessed",
    "bullets": [
     "Availability, performance and quality per work centre for any period, each figure kept on the record so a number anybody disagrees with can be taken apart",
     "Time logs are clipped to the period, so a night shift that crosses midnight is not counted twice in a daily report",
     "Three honest ways to set planned time: what the terminal logged, the whole period, or a figure you type",
     "Performance is capped at 100 percent, with the uncapped figure kept as well, because a machine that beats its ideal cycle time means the cycle time is wrong"
    ]
   },
   {
    "heading": "Reporting",
    "bullets": [
     "A printable shift report listing everything a session recorded, in order",
     "Pivot and graph views on OEE and on terminal events",
     "Stops by reason, by machine, by day",
     "Requires nothing but Manufacturing."
    ]
   }
  ],
  "category": "Manufacturing/Manufacturing",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_shop_floor/",
  "published": true
 },
 "wt-shopify-connector": {
  "technical": "wt_shopify_connector",
  "name": "WT Shopify Connector",
  "summary": "Production-grade Odoo ↔ Shopify connector. Multi-store, two-way sync of orders/customers/products/inventory, webhook + scheduled updates, queue with retry/error visibility, fulfillment + tracking, returns/refunds, payouts, metafield mapping, abandoned-checkout recovery, KPI dashboard.",
  "intro": [
   "A serious operational connector built around how commerce teams actually work, not just a thin REST wrapper around Shopify endpoints."
  ],
  "sections": [
   {
    "heading": "Architecture",
    "bullets": [
     "Multi-store first - every record carries `store_id`; one Odoo can run N shops",
     "Queue-driven: every external call is an `shopify.queue.job` with retry/error visibility, so failures are surfaced and reprocessable, not silent",
     "Webhook-based real-time updates AND scheduled fallback sync",
     "HMAC-verified webhook receiver",
     "Rate-limit aware API client with exponential backoff",
     "SKU-based product alignment with explicit mapping records",
     "Two-way: import (Shopify → Odoo) and export (Odoo → Shopify) for orders, customers, products, inventory"
    ]
   },
   {
    "heading": "Phase 1 (this release)",
    "bullets": [
     "Working flows:",
     "Multi-store configuration with API credentials + connection test",
     "Product import from Shopify (variants, images, pricing, tags, SKU)",
     "Product export from Odoo to Shopify (create/update)",
     "Order import with customer + line items + payment + shipping",
     "Order workflow: draft → confirmed → shipped → invoiced",
     "Customer two-way sync",
     "Inventory push from Odoo to Shopify (per-warehouse → per-location)",
     "Webhook receiver (orders/create, orders/updated, orders/cancelled, products/create, products/update, inventory_levels/update, customers/create, customers/update, refunds/create, fulfillments/create)",
     "Queue dashboard with retry, reprocess, drop, requeue actions",
     "Logs (success + error)",
     "KPI dashboard (orders today/week/month, revenue, queue health)",
     "Cron schedulers (configurable per-store + per-flow timing)"
    ]
   },
   {
    "heading": "Phase 2 (next release)",
    "bullets": [
     "Planned:",
     "Full returns + refunds flow with restocking-aware stock moves",
     "Payout report ingestion + automatic reconciliation",
     "Metafield mapping wizard with 2-way sync per product",
     "Abandoned checkout → CRM lead conversion",
     "Bulk product publishing controls",
     "Per-store accounting (tax mapping, journal selection)",
     "Shopify GraphQL bulk-operation imports for >50K products"
    ]
   },
   {
    "heading": "Phase 3 (polish)",
    "bullets": [
     "Per-store branded dashboard",
     "Multi-warehouse inventory weights (split a single Shopify location across multiple Odoo warehouses by stock-rule)",
     "Order line discount / shipping-tax line itemisation",
     "Shopify Markets multi-currency"
    ]
   }
  ],
  "category": "Sales/Commerce",
  "version": "19.0.5.4.1",
  "price": 98.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_shopify_connector/",
  "published": true
 },
 "wt-show-record-id": {
  "technical": "wt_show_record_id",
  "name": "Show Database ID",
  "summary": "Add an optional Database ID column to the Contacts, Users and Products list views.",
  "intro": [
   "Adds an optional **ID** column (the technical database id) to the list views of Contacts, Users and Products."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Shown as an optional column - toggle it on/off from the list's column selector.",
     "Handy for admins, support and integrations that need the record id without opening developer mode.",
     "Pure view module - no models, no data changes."
    ]
   }
  ],
  "category": "Tools",
  "version": "19.0.1.0.0",
  "price": null,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_show_record_id/",
  "published": true
 },
 "wt-solar-epc": {
  "technical": "wt_solar_epc",
  "name": "Solar EPC & Renewable Energy Projects",
  "summary": "Solar EPC and O&M system - site surveys, system design with string sizing and payback, bill of materials, milestone billing, grid connection and net metering applications, commissioning readings, warranty register and generation monitoring.",
  "intro": [
   "Built for a solar installer, an EPC contractor or a renewables operations and maintenance business. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The design is where the sale is made",
    "bullets": [
     "A site survey with the roof or ground area, the obstructions taken off it, orientation, tilt, measured shading, roof type and a structural note",
     "Consumption off the last twelve bills and the import tariff, because without them there is no honest savings figure",
     "A system design carrying the module and the inverter as real products with their electrical data, so the strings can be sized against the inverter DC window at the coldest morning the site sees",
     "Annual yield from irradiation, performance ratio and shading, stated plainly enough that a customer can check it",
     "Payback walked year by year with module degradation and tariff escalation applied, not a flat divide, because both move",
     "Lifetime saving and avoided carbon, which is what public sector tenders ask for"
    ]
   },
   {
    "heading": "From design to purchase list",
    "bullets": [
     "A bill of materials generated from the design: modules, inverters, one mounting set per module, DC cable there and back plus the module jumpers, protection per inverter and the metering",
     "Anything added by hand survives a rebuild",
     "Materials called off the warehouse to the site as a delivery, so the store knows which roof the pallet is going to",
     "Cost, overhead and quoted price on the same screen, with the price per watt peak the customer will compare against the quote next door"
    ]
   },
   {
    "heading": "The job itself",
    "bullets": [
     "Nine stages: survey, design, permit application, grid connection, procurement, installation, inspection, commissioning and handover",
     "Each stage names the one document it will not let go without, so an installation cannot start on a roof nobody signed off structurally",
     "A payment schedule tied to what has actually happened, with shares that have to add up to exactly 100 percent before the contract can be signed",
     "Milestone invoices raised into Accounting on the service product you choose",
     "A daily site diary per crew: who was there, what went up, what stopped them and whether anybody got hurt"
    ]
   },
   {
    "heading": "Grid connection and compliance",
    "bullets": [
     "Net metering and connection applications with the utility reference, the export applied for, the fee, the inspection and the approval number",
     "A follow-up date worked out from how long that utility usually takes, because the connection is the longest pole on most jobs",
     "An export cap per utility that refuses an application above it",
     "An electrical safety certificate recorded at commissioning, and a handover that will not complete without it"
    ]
   },
   {
    "heading": "Commissioning that means something",
    "bullets": [
     "One row per string: open circuit voltage against the calculated figure, short circuit current, insulation resistance, polarity and earth continuity",
     "Tolerance and the insulation floor come from Settings, so the office can follow its own wiring rules without a developer",
     "AC voltage, frequency, earth resistance and the yield on the day of energising",
     "Nothing is handed over until every string passes"
    ]
   },
   {
    "heading": "After the handover",
    "bullets": [
     "A warranty register with one entry per component, because a module, an inverter and the installation itself run for different terms and are honoured by different people",
     "An operations and maintenance contract that lays out its own visit schedule, carries a response time and a performance guarantee, and tells you what the book is worth per kilowatt under contract",
     "Visits that close with what was found, because a visit with no findings is indistinguishable from one that never happened",
     "A generation log per site with the metered units against what the design said, a performance ratio measured against irradiation where it is available, and a flag on any site that falls further behind than the threshold you set"
    ]
   },
   {
    "heading": "The money",
    "bullets": [
     "Margin per project against the estimate, with costs booked as they are spent",
     "Maintenance revenue against the sites under contract",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Energy",
  "version": "19.0.1.0.0",
  "price": 349.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_solar_epc/",
  "published": true
 },
 "wt-spa-pos": {
  "technical": "wt_spa_pos",
  "name": "WT Spa & Salon POS Management",
  "summary": "Complete Spa & Salon POS - Appointments, Specialists, Amenities, Commissions & Walk-ins for Odoo 19",
  "intro": [
   "WT Spa & Salon POS Management - Enterprise Edition for Odoo 19",
   "A full-featured spa and salon management system integrated directly into Odoo 19 POS. Manage appointments, specialists, amenities (chairs/rooms), walk-ins, advance payments, commissions, and customer reviews - all from the POS interface."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Backend: Services, Specialists, Amenities, Commissions, Reviews, Brands",
     "POS Home Screen: Amenity grid with live status (Available / Reserved / In Service)",
     "Book Appointments: Step-by-step wizard with slots, customer, specialist & advance payment",
     "Walk-In: Instant service selection with order auto-creation",
     "Advance Payment: Book now, pay partial upfront",
     "Running Appointments: Monitor active services in real time",
     "Track All: List view of all appointments with status filter",
     "Commissions: Automatic calculation on order completion",
     "Reviews: Optional or mandatory after service"
    ]
   }
  ],
  "category": "Point of Sale",
  "version": "19.0.1.0.0",
  "price": 1299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_spa_pos/",
  "published": true
 },
 "wt-stock-aging": {
  "technical": "wt_stock_aging",
  "name": "Stock Aging Pro - Slow-Moving, Dead Stock & Carrying Cost",
  "summary": "Inventory aging analysis with bucketed report (0-30/31-60/61-90/91-180/181-365/365+), carrying-cost estimate, slow-mover & dead-stock detection, monthly snapshots with trend, write-off wizard, weekly email digest, PDF report. Both Community and Enterprise miss this - your inventory team will thank you.",
  "intro": [
   "The aging analysis Odoo never shipped. Stock that quietly sits and bleeds money should never be a mystery. This module turns \"what's slow?\" into a one-click answer."
  ],
  "sections": [
   {
    "heading": "Core features",
    "bullets": [
     "**Bucketed aging report** - 0-30 / 31-60 / 61-90 / 91-180 / 181-365 / 365+ days (buckets fully configurable). Filter by warehouse, location, category, vendor, product, or any combination.",
     "**Carrying-cost estimate** - applies your annual cost-of-capital % per bucket so you see the real money trapped in slow stock, not just quantities.",
     "**Slow-mover & dead-stock detection** - auto-classifies every product as Fast / Normal / Slow / Dead based on configurable thresholds. Tags appear on the product form and on every quant.",
     "**Monthly snapshots** - automatic 1st-of-month snapshot with trend comparison so you can prove month-over-month improvement.",
     "**Write-off / liquidation wizard** - multi-select dead stock and create the inventory adjustment + journal entry in one action.",
     "**Weekly email digest** - Monday 09:00 cron emails the inventory manager HTML summary + PDF attachment with this week's aging hotspots.",
     "**Branded PDF report** - print-ready aging report with bucket distribution chart, top offenders, and per-warehouse breakdown.",
     "**CSV / Excel export** from the wizard for ad-hoc analysis.",
     "**Smart filters on Inventory → Products** - \"Show: Slow Movers\" / \"Dead Stock\" / \"Aging > 180 days\" right from the standard product list."
    ]
   },
   {
    "heading": "Why both Community and Enterprise users buy this",
    "bullets": [
     "Vanilla Odoo only ever shows you *current* stock - never *aging*.",
     "No carrying-cost formula anywhere.",
     "No slow-mover or dead-stock classification.",
     "No month-over-month aging trend.",
     "No write-off wizard for dead stock.",
     "This is the gap. ~$1,000+ of trapped capital saved per warehouse per quarter is typical. The module pays itself back in the first month."
    ]
   },
   {
    "heading": "Search keywords",
    "bullets": [
     "stock aging, inventory aging, dead stock, slow movers, carrying cost, inventory turnover, obsolete inventory, FIFO aging, stock write-off, inventory dashboard, aging report, slow inventory, non-moving stock, warehouse analysis, stock optimization, inventory holding cost, abc analysis, days on hand, days in stock, stock report odoo, aging buckets, last movement date, slow stock alert, inventory health"
    ]
   }
  ],
  "category": "Inventory/Reporting",
  "version": "19.0.1.0.0",
  "price": 25.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_stock_aging/",
  "published": true
 },
 "wt-theme-clinic": {
  "technical": "wt_theme_clinic",
  "name": "WT Theme Clinic",
  "summary": "Healthcare theme: trust-first hero, services by speciality, doctor team, patient testimonials, online appointment CTA, contact + map. Built for clinics, hospitals, dental practices, vet clinics, physiotherapy centres and aesthetic medicine. Fully responsive, dynamic snippets, community-only.",
  "intro": [
   "Medical Clinic, Hospital, Dental, Pediatric, Cardiology, Dermatology, Veterinary, Aesthetic, Chiropractic, Physiotherapy"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-construction": {
  "technical": "wt_theme_construction",
  "name": "WT Theme Construction",
  "summary": "Construction company theme: bold hero, services grid, project showcase, team & testimonials, contact + map. Built for builders, contractors, engineers, architects, interior designers and renovation businesses. Fully responsive, dynamic snippets, community-only - no enterprise dependency.",
  "intro": [
   "Construction, Engineering, Architecture, Contractors, Builders, Civil Works, Renovation, Interior, Industrial Construction"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-consulting": {
  "technical": "wt_theme_consulting",
  "name": "WT Theme Consulting",
  "summary": "Consulting / agency theme: confident hero, services, case studies, methodology, team, testimonials, contact. Built for consulting firms, agencies, strategy practices and creative shops.",
  "intro": [
   "Consulting, Agency, Strategy, Business Consulting, Digital Agency, Creative Agency, Marketing"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-ecommerce": {
  "technical": "wt_theme_ecommerce",
  "name": "WT Theme eCommerce",
  "summary": "eCommerce theme: brand-forward hero, category cards, featured products, why-us, reviews, newsletter, contact. Built for online stores, boutiques, multi-brand shops and retail brands. Optional website_sale integration.",
  "intro": [
   "eCommerce, Online Shop, Online Store, Multi-Brand Store, Boutique, Marketplace, Retail"
  ],
  "sections": [],
  "category": "Theme/eCommerce",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-education": {
  "technical": "wt_theme_education",
  "name": "WT Theme Education",
  "summary": "Education theme: inspiring hero, programmes, faculty, campus stats, admissions CTA, testimonials, FAQ, contact. Built for schools, colleges, universities, online-course providers and training centres.",
  "intro": [
   "School, College, University, Academy, Online Course, Training Centre, Coaching, Tutoring"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-event": {
  "technical": "wt_theme_event",
  "name": "WT Theme Events",
  "summary": "Event theme: countdown hero, schedule, speakers, sponsors, tickets CTA, gallery, FAQ, contact. Built for conferences, festivals, summits, weddings and corporate events.",
  "intro": [
   "Event, Conference, Festival, Summit, Wedding, Corporate Event, Concert, Workshop"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-fashion": {
  "technical": "wt_theme_fashion",
  "name": "WT Theme Fashion",
  "summary": "Fashion theme: editorial hero, lookbook, collections, designer story, press, lookbook, contact. Built for fashion brands, boutiques, designers, ateliers and luxury labels.",
  "intro": [
   "Fashion, Boutique, Apparel Brand, Designer, Atelier, Streetwear, Luxury Fashion, Couture"
  ],
  "sections": [],
  "category": "Theme/eCommerce",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-gym": {
  "technical": "wt_theme_gym",
  "name": "WT Theme Gym & Fitness",
  "summary": "Gym / fitness theme: high-energy hero, classes, trainers, membership tiers, gallery, testimonials, FAQ, contact. Built for gyms, fitness studios, CrossFit boxes, yoga studios and personal trainers.",
  "intro": [
   "Gym, Fitness, Personal Training, CrossFit, Yoga Studio, Pilates, Boxing, Martial Arts"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-hotel": {
  "technical": "wt_theme_hotel",
  "name": "WT Theme Hotel",
  "summary": "Hotel theme: cinematic hero, room types, amenities, gallery, booking widget, reviews, location, contact. Built for hotels, resorts, boutique hotels, B&Bs, lodges and vacation rentals.",
  "intro": [
   "Hotel, Resort, Boutique Hotel, Bed & Breakfast, Lodge, Villa, Vacation Rental"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-lawfirm": {
  "technical": "wt_theme_lawfirm",
  "name": "WT Theme Law Firm",
  "summary": "Law firm theme: authoritative hero, practice areas, partners, case-results stats, free-consultation CTA, testimonials, FAQ, contact. Built for advocates, solicitors, notaries and corporate-law practices.",
  "intro": [
   "Law Firm, Legal Consultancy, Advocates, Solicitors, Notaries, Corporate Law, Litigation, Tax Law"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-ngo": {
  "technical": "wt_theme_ngo",
  "name": "WT Theme NGO & Nonprofit",
  "summary": "NGO / nonprofit theme: mission hero, programmes, impact stats, donation CTA, volunteers, testimonials, FAQ, contact. Built for charities, foundations, NGOs, social enterprises and volunteer organisations.",
  "intro": [
   "NGO, Nonprofit, Charity, Foundation, Social Enterprise, Volunteer Organization, Cause"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-photography": {
  "technical": "wt_theme_photography",
  "name": "WT Theme Photography",
  "summary": "Photography theme: minimalist hero, portfolio grid, services, about, packages, testimonials, contact. Built for photographers, studios, wedding/portrait photographers and visual artists.",
  "intro": [
   "Photography, Portfolio, Photographer, Studio, Wedding Photography, Portrait, Commercial Photography"
  ],
  "sections": [],
  "category": "Theme/Creative",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-realestate": {
  "technical": "wt_theme_realestate",
  "name": "WT Theme Real Estate",
  "summary": "Real estate theme: hero with property search, featured listings, agent grid, why-us, mortgage CTA, testimonials, contact. Built for real-estate agencies, brokers, developers and property managers.",
  "intro": [
   "Real Estate, Property, Real Estate Agency, Brokers, Listings, Apartments, Houses, Commercial Property"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-restaurant": {
  "technical": "wt_theme_restaurant",
  "name": "WT Theme Restaurant",
  "summary": "Restaurant theme: appetite-tickling hero, menu preview, chef story, reservation CTA, food gallery, testimonials, hours/location, contact. Built for restaurants, cafes, bistros, pizzerias and fine-dining brands.",
  "intro": [
   "Restaurant, Cafe, Bistro, Pizzeria, Steakhouse, Fine Dining, Casual Dining, Food Truck, Bakery"
  ],
  "sections": [],
  "category": "Theme/eCommerce",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-saas": {
  "technical": "wt_theme_saas",
  "name": "WT Theme SaaS Startup",
  "summary": "SaaS / startup theme: product-focused hero, features, pricing tiers, integrations, customer logos, testimonials, FAQ, contact. Built for SaaS companies, software products, tech startups and B2B tools.",
  "intro": [
   "SaaS, Software, Tech Startup, Product Landing, Cloud Platform, B2B Tool, Developer Tools"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-salon": {
  "technical": "wt_theme_salon",
  "name": "WT Theme Salon & Spa",
  "summary": "Salon / spa theme: aspirational hero, services menu, stylists, booking CTA, gallery, testimonials, FAQ, contact. Built for salons, spas, barbers, nail studios, wellness centres and aesthetic clinics.",
  "intro": [
   "Salon, Spa, Beauty, Hair Salon, Nail Salon, Barbershop, Aesthetic Studio, Wellness Centre"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-theme-travel": {
  "technical": "wt_theme_travel",
  "name": "WT Theme Travel & Tours",
  "summary": "Travel theme: wanderlust hero, destinations, packages, why-us, gallery, testimonials, contact. Built for travel agencies, tour operators, adventure-travel and honeymoon specialists.",
  "intro": [
   "Travel Agency, Tour Operator, Vacation, Holidays, Adventure Travel, Cruises, Honeymoon, Safari"
  ],
  "sections": [],
  "category": "Theme/Services",
  "version": "19.0.1.0.0",
  "price": 39.0,
  "currency": "USD",
  "storeUrl": "",
  "published": false
 },
 "wt-transport-management": {
  "technical": "wt_transport_management",
  "name": "Transport & Fleet Management",
  "summary": "Complete transport, fleet, trips, expenses, maintenance, drivers, payroll, assets & analytics - built for Odoo 19.",
  "intro": [
   "An end-to-end transport and fleet-management suite for logistics companies, transporters, rental fleets and any business that runs vehicles - built for Odoo 19 Community and ready for Asia, USA, Europe and the UK."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Fleet register - vehicles, categories, specs, ownership, photos",
     "Documents - registration, insurance, fitness, MOT, road tax, route permits with expiry tracking and reminder alerts (multi-region)",
     "Trips & dispatch - schedule journeys, odometer in/out, distance, revenue and per-trip profitability",
     "Expenses - fuel, maintenance, tolls, fines, tyres, salaries and more, with an approval workflow and vendor-bill creation",
     "Maintenance - preventive & corrective service orders, parts & labour, service scheduling by date and odometer",
     "Drivers & employees - licences, expiry alerts, assignments and experience",
     "Payroll - driver / staff settlements with allowances, bonuses, deductions and expense reimbursement",
     "Locations - depots, hubs, fuel stations, workshops with GPS",
     "Analytics - OWL fleet dashboard, cost per km, fuel efficiency, pivots",
     "Automation - crons for document, licence and service-due reminders",
     "Security - Driver / Fleet Officer / Fleet Manager roles with record rules"
    ]
   }
  ],
  "category": "Services/Fleet",
  "version": "19.0.1.0.0",
  "price": 10.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_transport_management/",
  "published": true
 },
 "wt-travel-agency": {
  "technical": "wt_travel_agency",
  "name": "Travel Agency & Tour Operator Management",
  "summary": "Retail travel agency and tour operator ERP - booking files with PNR, passports and visas, flight hotel transfer and cruise segments with supplier cost and sell price, markup and commission, fixed departures with seat inventory and load factor, amendment and cancellation fees, deposit and balance plans, margin scheme VAT.",
  "intro": [
   "Built for a retail travel shop that sells air, hotels and tours, and for the tour operator behind it running fixed departures. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The booking file",
    "bullets": [
     "Everything hangs off one file: its own reference, the airline PNR, the IATA agency code it was sold under, the consultant who sold it and the lead passenger. Travellers sit on the file with passport number, expiry, issuing country, nationality and date of birth, which is what the airline and the embassy will ask for.",
     "A file will not confirm when a traveller's passport expires inside six months of the departure date. Six months is the default and it is a setting, because some destinations want three and a few want none. The check names the person, not the file, so the consultant knows who to ring."
    ]
   },
   {
    "heading": "Itinerary segments",
    "bullets": [
     "Flight, hotel, transfer, activity, cruise, rail and insurance, each on its own segment with the supplier, the supplier's net cost, the sell price and the confirmation number the supplier gave you. Flights carry the carrier, flight number and class. Hotels carry the room type, the board basis and the nights, worked out from the dates.",
     "A segment cannot be confirmed without a confirmation number, because a segment with no locator is a segment nobody has actually booked."
    ]
   },
   {
    "heading": "Markup, commission and margin",
    "bullets": [
     "Markup is set per segment as a percentage or a fixed amount over net, or the consultant types the sell price straight in. Commission is the percentage the supplier pays you back on what you sold. Gross margin on a segment is the markup plus the commission, and the file rolls the segments up: total net, total sell, markup, commission, margin and margin percent.",
     "Margin also rolls up per consultant, next to their target and the commission they have earned on it."
    ]
   },
   {
    "heading": "Packages and fixed departures",
    "bullets": [
     "A package holds the itinerary, the inclusions, the nights and the per person cost and price. Departures hold the seats: how many the operator has, how many are minimum to guarantee the coach, how many are sold and the load factor. A file booked onto a departure cannot confirm more passengers than there are seats left, and a departure is guaranteed the moment it passes its minimum."
    ]
   },
   {
    "heading": "Visas",
    "bullets": [
     "A visa application per traveller per destination, with the document checklist copied from the country rule so nobody submits a file missing the bank statements. Appointment date, submission date, decision, visa number and the validity dates. The country rule carries the requirement type, the processing days, the fee and the standing note for that nationality."
    ]
   },
   {
    "heading": "Amendments and cancellations",
    "bullets": [
     "A fee schedule by how many days before departure the change comes in. The amendment picks the band, works out the agency fee and the supplier penalty, and shows the refund that is actually due back. Applying a cancellation cancels the segments, releases the seats on the departure and books the refund against the file."
    ]
   },
   {
    "heading": "Money",
    "bullets": [
     "Deposit and balance, with the balance date pulled back from the departure by the number of days the agency works to. What has been received sits against what is due, and a file with an unpaid balance will not be marked as travelled while the block is switched on. There is a nightly job that chases the ones that have gone past their balance date.",
     "Margin scheme VAT is supported for tour operators: the sale is invoiced without VAT lines, the VAT on the margin is worked out from the tax record you nominate, and it is written on the invoice for the accountant.",
     "Requires Odoo 19 Community with Accounting."
    ]
   }
  ],
  "category": "Services/Travel",
  "version": "19.0.1.0.0",
  "price": 299.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_travel_agency/",
  "published": true
 },
 "wt-veterinary-management": {
  "technical": "wt_veterinary_management",
  "name": "Veterinary Clinic & Pet Care Management",
  "summary": "Veterinary practice ERP - patient records by species and breed, consultations with SOAP notes, vaccination schedule with due reminders, prescriptions and drug withdrawal, lab requests, surgery, boarding and grooming, pet insurance claims.",
  "intro": [
   "A working practice management system for a small animal clinic, a mixed practice, a mobile vet or a pet resort. Built on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The patient",
    "bullets": [
     "Pets, not customers: species, breed, sex, neuter status, colour, date of birth, microchip and insurance policy, each linked to the owner who pays",
     "Weight history and a growth chart, so a trend is visible rather than remembered",
     "Allergies and chronic conditions surfaced on every screen the vet opens",
     "Full clinical history in one place: consultations, vaccinations, prescriptions, lab results, surgery and stays"
    ]
   },
   {
    "heading": "Consultations",
    "bullets": [
     "Appointment diary per vet and per consulting room, with double-booking refused",
     "SOAP notes - subjective, objective, assessment, plan - the format every vet school teaches",
     "Vitals recorded per visit: weight, temperature, heart rate, respiration, body condition score, pain score",
     "Diagnosis, treatment and follow-up date, and the invoice raised from the visit in one click"
    ]
   },
   {
    "heading": "Vaccination and preventive care",
    "bullets": [
     "Vaccination protocols per species, so a puppy course schedules itself",
     "Every dose recorded with product, batch, expiry and the site it was given",
     "Due and overdue lists, and a reminder email to the owner before the date",
     "Rabies certificate and vaccination card as printable documents"
    ]
   },
   {
    "heading": "Medicine",
    "bullets": [
     "Prescriptions with dose, route, frequency, duration and the total quantity dispensed, taken out of stock",
     "Controlled drug register kept separately, because the inspector will ask",
     "Withdrawal period on food-producing animals, with the date meat or milk becomes saleable again - the rule that keeps a farm practice legal"
    ]
   },
   {
    "heading": "Beyond the consult room",
    "bullets": [
     "Boarding and day care with kennel occupancy, feeding and medication plans",
     "Grooming appointments with the same diary",
     "Lab requests, in-house or sent out, with results attached to the patient",
     "Pet insurance claims tracked from submission to settlement",
     "Requires Odoo 19 Community with Accounting and Inventory."
    ]
   }
  ],
  "category": "Services/Veterinary",
  "version": "19.0.1.0.0",
  "price": 249.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_veterinary_management/",
  "published": true
 },
 "wt-water-delivery": {
  "technical": "wt_water_delivery",
  "name": "Bottled Water Delivery & Route Distribution",
  "summary": "Bottled water plant and home delivery ERP - returnable container ledger with deposits, coupon books, subscriptions, rounds with a load out and a reconciliation, dispenser rentals, and a water quality test log per production batch.",
  "intro": [
   "Built for a bottling plant, a water distributor or a home and office delivery round. Runs on Odoo Community."
  ],
  "sections": [
   {
    "heading": "The container ledger",
    "bullets": [
     "A water business does not sell bottles, it lends them. Every full container that leaves the truck is an asset sitting in somebody's kitchen, and a deposit sitting on your balance sheet.",
     "A ledger line per movement: opening balance, delivered, empties collected, written off, count adjustment, deposit only",
     "A running balance per customer, and a deposit held against it",
     "The shortfall figure: containers out with no deposit behind them, which is the number that quietly turns into written off stock",
     "A statement you can print and hand to a customer who argues about the count",
     "Containers written off per customer and per round, so you know which round is losing them"
    ]
   },
   {
    "heading": "Coupons and subscriptions",
    "bullets": [
     "Coupon books sold in advance, one coupon to one bottle, priced per customer segment",
     "Unredeemed coupons carried as a liability and sized, with an expiry date so it cannot grow forever",
     "Coupons redeemed at the door, oldest book first, by a driver who has no rights to edit a coupon book",
     "Monthly subscriptions with a bottle allowance, an overage price and a billing job that rolls the period and raises the invoice"
    ]
   },
   {
    "heading": "The round and the daily run",
    "bullets": [
     "A round with a driver, a vehicle and an ordered run of stops",
     "A standing order per customer: which days, which container, how many",
     "Runs built from the standing orders, one stop per customer per due day",
     "A load out counted onto the truck and checked against what the vehicle actually holds",
     "A reconciliation on return: loaded, less delivered, less brought back. If that is not zero the run does not close until somebody explains it",
     "Cash expected against cash counted in, per run and per driver",
     "Missed deliveries with a reason and a reschedule that builds the return visit for you"
    ]
   },
   {
    "heading": "Delivery at the door",
    "bullets": [
     "Bottles left, empties collected, coupons taken, deposit charged or refunded, cash counted, and who signed for it",
     "Cash, coupon, subscription or monthly account, chosen per customer and overridable on the day",
     "The container limit: the round stops leaving bottles at a customer who is already holding too many",
     "One invoice a month per account customer instead of one per drop"
    ]
   },
   {
    "heading": "Water quality and traceability",
    "bullets": [
     "This is the part a health inspector asks for.",
     "A production batch per fill: source, shift, operator, quantity, shelf life",
     "A test log per batch with pH, dissolved solids, turbidity, residual chlorine, coliform and the rest, each with its limits and a pass or fail",
     "A batch cannot be released onto the trucks with a failed or missing test",
     "Every delivery line names the batch the bottles came from",
     "Quarantine a batch and the system produces the recall list: which customers already have it and how many bottles they took",
     "A certificate of analysis you can print for one batch"
    ]
   },
   {
    "heading": "Dispenser and cooler rentals",
    "bullets": [
     "Units tracked from stock, out on rental, in for service, returned, scrapped",
     "A monthly rental fee billed by a scheduled job, skipped where the cooler is inside a subscription price",
     "A sanitisation cycle that raises the next service visit on its own",
     "Service visits with findings, parts and cost, closed off by the technician"
    ]
   },
   {
    "heading": "What the money looks like",
    "bullets": [
     "Revenue per round per day, from the deliveries themselves",
     "Bottle loss per customer and per round",
     "Deposit liability across every account, which is the figure the accountant needs at year end",
     "Unredeemed coupon liability, sized rather than guessed",
     "Requires Odoo 19 Community with Inventory and Accounting."
    ]
   }
  ],
  "category": "Services/Distribution",
  "version": "19.0.1.0.0",
  "price": 199.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_water_delivery/",
  "published": true
 },
 "wt-whatsapp-connector": {
  "technical": "wt_whatsapp_connector",
  "name": "WhatsApp Connector",
  "summary": "Send invoices, quotations and reminders on WhatsApp from Odoo Community, through the official Meta WhatsApp Cloud API, with templates, a two-way inbox and delivery receipts.",
  "intro": [
   "Odoo's own WhatsApp integration is Enterprise only. This one runs on Community, and talks to the official Meta WhatsApp Cloud API - no third-party gateway sits between you and your customers, and no per-message reseller fee."
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Send a WhatsApp message from any invoice, quotation or contact",
     "Meta-approved message templates, with placeholders mapped to Odoo fields",
     "Bulk send to many contacts at once from the composer",
     "Two-way inbox: replies arrive back in Odoo through the webhook",
     "Delivery receipts, so you see sent, delivered, read and failed per message",
     "Automatic overdue-invoice reminders on a scheduled action",
     "Every message is logged in the chatter of the record it came from",
     "Several numbers per database, one per company or per brand"
    ]
   },
   {
    "heading": "Safe by default",
    "bullets": [
     "A new account starts in Simulation Mode: messages are logged rather than sent, so you can build and test templates before a single real message goes out. Turn simulation off once your token is live."
    ]
   },
   {
    "heading": "What you need",
    "bullets": [
     "A Meta WhatsApp Business account, a phone number id and a permanent access token. The module tells you the callback URL and verify token to paste into Meta."
    ]
   }
  ],
  "category": "Marketing",
  "version": "19.0.1.0.0",
  "price": 149.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_whatsapp_connector/",
  "published": true
 },
 "wt-whatsapp-otp-odoo": {
  "technical": "wt_whatsapp_otp_odoo",
  "name": "WT WhatsApp OTP - Signup Verification",
  "summary": "Verify customer phone numbers via WhatsApp OTP during Odoo signup",
  "intro": [
   "Adds WhatsApp-based phone number verification to the standard Odoo signup page.",
   "Configuration: Settings → General Settings → WhatsApp OTP section"
  ],
  "sections": [
   {
    "heading": "What it does",
    "bullets": [
     "Injects phone + OTP fields into the standard /web/signup page",
     "Sends a 6-digit OTP via WhatsApp Cloud API (Meta) on request",
     "Verifies OTP before account is created",
     "Saves verified phone to partner on successful signup",
     "Auto-links new account to existing portal partner by email (no duplicates)",
     "OTP expiry configurable (default 10 minutes)",
     "Cron cleanup of expired OTP records",
     "Works with ANY Odoo module - completely standalone",
     "Enable WhatsApp OTP on Signup",
     "WhatsApp API Token (Meta Cloud API Bearer token)",
     "WhatsApp Phone Number ID",
     "OTP Template Name (Meta-approved template, default: phone_otp)",
     "OTP Expiry Minutes"
    ]
   }
  ],
  "category": "Tools",
  "version": "19.0.1.0.0",
  "price": 20.0,
  "currency": "USD",
  "storeUrl": "https://apps.odoo.com/apps/modules/19.0/wt_whatsapp_otp_odoo/",
  "published": true
 }
};
