/* ─────────────────────────────────────────────────────────────
 * SERVICE DETAIL
 * Depth for each entry in SERVICES (src/data/site.ts), keyed by
 * the existing service slug. All 15 slugs are covered.
 *
 * This file carries DELIVERY and PROCESS knowledge only: how an
 * engagement runs, what the client has to supply, what goes wrong,
 * what is out of scope. It deliberately contains NO regulatory
 * content. No tax rate, mandate name, scheme, threshold, deadline
 * or provider name appears here. Those facts live in
 * src/data/country-detail.ts and are printed from there.
 *
 * Odoo module names are not asserted here either. Where a page
 * links a module, it links a key of MODULE_CATALOG
 * (src/data/modules-catalog.ts) and the name and summary are
 * printed from that catalogue verbatim.
 *
 * Prices and durations are only ever referenced against PRICING
 * and FAQS in src/data/site.ts. Nothing new is invented.
 * ───────────────────────────────────────────────────────────── */

export interface ServicePhase {
  /** Phase name as a buyer would recognise it. */
  name: string;
  /** One line: what this phase is for. */
  goal: string;
  /** What actually happens, in order. */
  work: string[];
  /** What you hold at the end of the phase. */
  deliverable: string;
}

export interface ServiceDecision {
  title: string;
  body: string;
}

export interface ServiceRisk {
  /** The failure mode, named plainly. */
  title: string;
  /** How it shows up and how the engagement avoids it. */
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceModuleLink {
  /** A key of MODULE_CATALOG in src/data/modules-catalog.ts. */
  slug: string;
  /** Why this comes up in this kind of engagement. Delivery reasoning only. */
  why: string;
}

export interface ServiceDetail {
  /** <title>. Buying intent, not feature intent. */
  metaTitle: string;
  metaDescription: string;
  /** Hero paragraph. Replaces the short tagline where it exists. */
  lede: string;
  /** Opening body copy, 2 to 3 paragraphs. */
  intro: string[];
  /** How the engagement actually runs. */
  phases: ServicePhase[];
  /** What the client has to supply for the phases to work. */
  clientProvides: string[];
  /** Calls the client will be asked to make, and what turns on them. */
  decisions: ServiceDecision[];
  /** What goes wrong on this kind of work, and how it is avoided. */
  failureModes: ServiceRisk[];
  /** Explicitly not included, so the proposal has no soft edges. */
  outOfScope: string[];
  /** How this work is usually priced. Only references PRICING and FAQS in site.ts. */
  pricingNote: string;
  faqs: ServiceFaq[];
  /** MODULE_CATALOG keys that genuinely come up on this service. */
  modules: ServiceModuleLink[];
  /** COUNTRIES slugs from site.ts. */
  countries: string[];
  /** One line on why the country pages matter for this service. */
  countryNote: string;
  /** Other SERVICES slugs worth reading next. */
  related: string[];
}

export const SERVICE_DETAIL: Record<string, ServiceDetail> = {

  /* ───────────── CORE ───────────── */
  "odoo-implementation": {
    metaTitle: "Odoo Implementation Services: Discovery to Go-Live",
    metaDescription: "How an Odoo implementation actually runs: process mapping, gap decisions, a prototype on your own data, migration reconciliation, UAT, cutover and hypercare.",
    lede: "An Odoo implementation is a decision project with software attached. We run the decisions first, then build once.",
    intro: [
      "Configuring Odoo is finite work and well understood. What takes the time is agreeing how the business will actually run: which company owns which cost, what a confirmed order commits you to, who may change a price, and what happens to the years of history sitting in the system you are leaving. Those answers are not in the software. They come out of your team, and getting them on paper is most of the job.",
      "So the sequence matters. A module configured against an unsettled process gets rebuilt, and the rebuild always costs more than the meeting that would have prevented it. We map the process, price every gap, put a working prototype in front of you with a slice of your own data in it, and only then move to migration and cutover. You see the system early and often, not once at the end.",
      "Scope is fixed in writing before the build phase starts. Every gap found in discovery is dispositioned as configure, customise, change the process, or leave out, and each one carries a number. That list is the contract. New requests after sign-off are quoted as change requests rather than absorbed quietly into the timeline, which is the only honest way to keep a fixed price fixed.",
    ],
    phases: [
      {
        name: "Discovery and process mapping",
        goal: "Get the current process on paper and decide which parts of it deserve to survive.",
        work: [
          "Walkthrough sessions per function: sales, purchasing, warehouse, finance, HR, whichever are in scope",
          "Record the exceptions, not the happy path. The happy path is never what breaks a rollout",
          "List every report someone actually reads, and who reads it",
          "Identify the numbers the business is managed by, because those decide the chart of accounts and the analytic structure",
          "Walk the physical operation where there is one: the warehouse, the shop floor, the counter",
        ],
        deliverable: "A written process map, a numbered gap list, and the module list that follows from it.",
      },
      {
        name: "Solution design and gap resolution",
        goal: "Turn the gap list into priced decisions, so nothing is left to be discovered during the build.",
        work: [
          "Each gap gets one of four dispositions: configure, customise, change the process, or leave out of scope",
          "Custom items are estimated individually and can be cut individually",
          "Agree the chart of accounts, the numbering conventions and the product coding scheme, in that order",
          "Define user roles and record-level access before any user is created",
          "Fix the integration boundary: which system is master for customers, for stock, for prices",
        ],
        deliverable: "A signed scope where every gap has a disposition and a cost, plus the design notes behind each one.",
      },
      {
        name: "Configuration and prototype",
        goal: "A working system holding a real sample of your data, not a demo database.",
        work: [
          "Build the company, warehouse, journal and pricing structure",
          "Load a representative slice of masters: your awkward products, not your simple ones",
          "Run pilot transactions end to end, from order through to the ledger entry",
          "Weekly demo against the process map, with the gap list as the checklist",
          "Custom work starts here, against a system that already runs the standard flow",
        ],
        deliverable: "A prototype database your team can click through, plus a defect and change log.",
      },
      {
        name: "Data migration and reconciliation",
        goal: "Opening balances and master data you can prove, not hope about.",
        work: [
          "Extract from the legacy system, then clean and de-duplicate before loading, never after",
          "Map every legacy field to a target field in writing, including the ones you decide to drop",
          "Load in dependency order: partners, products, then balances, then open documents",
          "Reconcile control totals against the old system and sign them off with whoever closes your books",
          "Agree a cut-off date and freeze changes in the legacy system from that point",
        ],
        deliverable: "A signed reconciliation pack showing each control total in both systems.",
      },
      {
        name: "Training, UAT and cutover",
        goal: "Users who can run a full day of real work before you depend on them doing it.",
        work: [
          "Role-based training on your configured system with your data, not on a generic instance",
          "Scripted user acceptance testing run by the people who will use the system daily",
          "Defect triage split into blockers, fix-before-go-live, and phase two",
          "A written cutover runbook with timings, owners and a rollback point",
          "A go or no-go call against agreed criteria, not against the calendar",
        ],
        deliverable: "A completed UAT sign-off, the cutover runbook, and a live system.",
      },
      {
        name: "Hypercare and handover",
        goal: "Stabilise the system and move ownership to your side.",
        work: [
          "Daily triage in the first weeks, tapering as volume settles",
          "Fix the configuration issues that only appear under real load",
          "Tune the reports people actually opened, and retire the ones nobody did",
          "Administrator handover: users, access, backups, scheduled actions",
          "A written phase two backlog built from everything deferred during UAT",
        ],
        deliverable: "Documentation, a trained administrator, and either a support contract or a clean exit.",
      },
    ],
    clientProvides: [
      "A named decision maker per function with authority to change a process, not just describe it",
      "A project owner on your side who can free those people up when the schedule needs them",
      "An export of the legacy data, plus someone who can explain what the odd columns mean",
      "The chart of accounts and the opening balances, signed off by whoever closes your books",
      "Sample documents you want back out of the system: a quotation, an invoice, a purchase order, a delivery note",
      "Credentials and a technical contact for every system that has to stay connected",
      "Real user time for testing and training, blocked out in calendars in advance",
      "A go-live date that avoids your busiest weeks and your period close",
    ],
    decisions: [
      { title: "Big bang or phased", body: "One cutover across every function is faster and cheaper when the business is small enough to hold in one head. Phased is safer for multi-site or multi-company groups, but you pay for the bridge period where two systems are both partly true." },
      { title: "How much history to bring", body: "Masters and open items are not optional. Full transactional history is a cost decision, not a technical one. Many teams keep the legacy system readable for a year instead, and migrate only what they need to trade." },
      { title: "How far to bend the software", body: "Every customisation is a maintenance cost you pay again at each upgrade. Some are worth it because they are the actual business. Many are habits inherited from the last system. We ask you to defend each one." },
      { title: "Who owns master data after go-live", body: "If nobody owns the product file and the customer file, both rot within a quarter. Naming the owner during design costs nothing and prevents the duplicate-record problem most ERP projects grow into." },
      { title: "Which reports are conditions of go-live", body: "Reporting is where scope quietly doubles. We ask for the short list the business genuinely cannot close a month without, and treat the rest as phase two." },
    ],
    failureModes: [
      { title: "Scope written as a list of module names", body: "A scope that says sales, inventory and accounting prices nothing. We write scope as outcomes and gaps with a disposition against each, so both sides know what has been bought." },
      { title: "Data cleaned after loading", body: "Cleaning inside the new system is slow, and the mess lands in front of users during their first week. Cleaning happens in the extract, before it touches the target, and the reconciliation proves it." },
      { title: "No named decision maker", body: "Without authority in the room, every gap becomes another meeting and the timeline drifts by weeks with nobody doing anything wrong. Naming the decision maker per function is a condition of starting, not a nicety." },
      { title: "UAT run by the project team", body: "The project team knows the intended path and will not find the problems. Testing has to be scripted and run by the people who will use the system daily, including the ones who were sceptical about the change." },
      { title: "Go-live on a period close or a peak week", body: "Two hard things at once turns a normal defect into a crisis. The cutover date is chosen against your operating calendar in the first phase, while it is still cheap to move." },
      { title: "Customisation before anyone has used the standard flow", body: "Requests raised on day one are usually descriptions of the old system. We ask teams to run the standard behaviour first. A real share of the original custom list gets withdrawn without argument." },
      { title: "Training that ends at go-live", body: "People forget the parts they did not use in week one, which is most of month-end. Refresher sessions are scheduled after the first close, when the questions are real ones." },
    ],
    outOfScope: [
      "Hardware procurement: servers, scanners, printers and network work are quoted separately or bought by you",
      "Odoo subscription fees and any third-party application licences",
      "Writing your accounting policy or setting your approval limits: we implement your decisions, we do not make them",
      "Data your previous vendor will not or cannot export",
      "Process re-engineering beyond the map agreed in discovery",
      "Ongoing support once hypercare closes, unless a support agreement is signed",
      "Content work: product photography, translated marketing copy, catalogue authoring",
    ],
    pricingNote: "Well-scoped implementations are quoted fixed-price against milestones. Discovery-heavy or open-ended work runs on transparent time and materials. The published bands show what a single-module and a multi-module rollout start at, and what each band includes.",
    faqs: [
      { q: "How long does an Odoo implementation take?", a: "Single-module projects run three to four weeks. Multi-module rollouts run eight to twelve weeks. Multi-country and multi-company programmes run four to nine months with phased go-lives. The variable is almost never the configuration. It is how quickly decisions get made and how clean the legacy data is." },
      { q: "Can we start with one module and add more later?", a: "Yes, and for most teams it is the better call. Starting narrow gets you a live system with real numbers in it, and the second phase is scoped by people who now know the software. The one thing to settle early is the chart of accounts, because changing it after the ledger has entries in it is painful." },
      { q: "Do you work fixed-price or time and materials?", a: "Fixed-price where the scope is settled, with milestones and a change-request route for anything new. Time and materials for discovery work and for ongoing customisation where the backlog is expected to move. We do not quote fixed-price against a scope nobody has written down." },
      { q: "What happens if we find a gap during the build?", a: "It goes on the same gap list as everything from discovery, gets a disposition and a number, and you decide whether it enters this phase or the next one. Nothing is absorbed silently, because absorbed work is what turns a fixed price into a dispute." },
      { q: "Who does the data migration, us or you?", a: "We do the mapping, the load and the reconciliation. You supply the extract and someone who can explain what the legacy fields actually mean, because the meaning of a column is rarely written down anywhere. Cleaning is a shared job and it is the part teams underestimate most." },
      { q: "What does hypercare include?", a: "Daily triage and fixes for the issues that only surface under real volume, report tuning, and administrator handover. The published bands include one month on the smaller projects and three months on the larger ones. After that it moves to a support agreement, or to you." },
    ],
    modules: [
      { slug: "wt-import-export", why: "Every implementation is a data-loading project for a fortnight. A repeatable import that logs its errors beats hand-fixing a spreadsheet at midnight." },
      { slug: "wt-audit-log", why: "In the weeks after go-live the recurring question is who changed this record. Having the answer stops the blame loop." },
      { slug: "wt-db-backup-cloud", why: "Off-site backups have to exist and be provably restorable before cutover, not after." },
      { slug: "wt-dashboard-builder", why: "Adoption usually turns on a handful of numbers on one screen for managers who will not open a report." },
      { slug: "wt-approval-workflow", why: "Approval limits are one of the first policies a rollout has to encode, and the standard behaviour rarely matches the delegation a business already runs." },
      { slug: "wt-duplicate-partner", why: "Master data rots fastest at the customer file. Catching a duplicate at creation is cheaper than merging later." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "united-kingdom", "united-states", "australia"],
    countryNote: "Where you trade decides the accounting and payroll setup an implementation has to land. The country pages carry those specifics.",
    related: ["odoo-consultancy", "odoo-customization", "odoo-migration", "odoo-training", "odoo-support"],
  },

  "odoo-customization": {
    metaTitle: "Odoo Customization: Custom Modules, Reports and Workflows",
    metaDescription: "Custom Odoo development done so it survives the next upgrade: specification, separate modules, tests, code review and handover. What we build, what we refuse, and why.",
    lede: "Custom code is a liability you agree to carry. We keep it small, keep it in its own module, and write it so the next upgrade does not eat it.",
    intro: [
      "Most customisation requests are one of three things: a real difference in how your business works, a report nobody could find, or a habit carried over from the last system. Only the first is worth code. Part of this service is telling you which of the three you have, before anyone is billed for building it.",
      "When code is the right answer, the way it is written decides what it costs you over the next five years. Everything goes in its own module, never as edits to Odoo core or to a third-party app. Behaviour is added by extending existing models rather than replacing them, so a version upgrade has something to attach to. The parts that hold money or stock get tests, because those are the places where a silent regression is expensive.",
      "You get the source. It is your code, in your repository, with a readable commit history and a handover session. No obfuscation, no licence key that stops working when the relationship ends, and no dependency on us to make the next change.",
    ],
    phases: [
      {
        name: "Requirement capture",
        goal: "Understand the business rule, not the screen someone imagined.",
        work: [
          "Work backwards from the outcome: what should be true after the action, and who checks it",
          "Find where the rule already half-exists in standard behaviour",
          "Establish the edge cases now: returns, cancellations, partial quantities, multi-company, multi-currency",
          "Agree who is allowed to override the rule, because there is always someone",
        ],
        deliverable: "A written requirement with the edge cases listed and the override rules stated.",
      },
      {
        name: "Technical specification and estimate",
        goal: "Decide the smallest change that satisfies the requirement.",
        work: [
          "Choose the extension point: field, computed value, constraint, automated action, or new model",
          "Decide what is configuration data and what is code, so the client can change the first without us",
          "Write the acceptance criteria as statements that can be tested",
          "Estimate per item, so items can be cut individually rather than the whole request being deferred",
        ],
        deliverable: "A specification with acceptance criteria and a per-item estimate.",
      },
      {
        name: "Build in sprints",
        goal: "Working code in front of you every week, not a long silence and a launch.",
        work: [
          "One module per coherent feature, with its own manifest and dependency list",
          "Extend, do not overwrite. Core files are never edited",
          "Access rights and record rules written at the same time as the model, not after a security review",
          "Automated tests on the logic that touches money, stock or approvals",
          "A demo on a staging database at the end of each sprint",
        ],
        deliverable: "Reviewable code on a staging instance, sprint by sprint.",
      },
      {
        name: "Test and review",
        goal: "Prove it holds up against your data and your permissions.",
        work: [
          "Your team tests against the acceptance criteria, using their own logins and their own restrictions",
          "Performance checked against realistic record counts, not against ten demo rows",
          "Upgrade impact noted for anything that touches a heavily customised area",
          "Code review before anything reaches the live database",
        ],
        deliverable: "A signed test pass and a reviewed changeset.",
      },
      {
        name: "Deploy and hand over",
        goal: "Move it to live safely and leave you able to maintain it.",
        work: [
          "Deploy through staging first, with a rollback plan and a database backup taken immediately before",
          "Release notes written for users, not for developers",
          "Repository access, branch conventions and build instructions handed to your side",
          "A walkthrough of the code with your developer if you have one",
        ],
        deliverable: "Live code, tagged release, source in your repository, and written handover.",
      },
    ],
    clientProvides: [
      "A person who can describe the rule and has authority to confirm the edge cases",
      "Access to a staging database that mirrors live, including realistic data volume",
      "Sample records that break the rule, not just the ones that fit it",
      "Existing custom modules and their source, if the instance already carries any",
      "The exact document layouts you expect, where the work involves printed output",
      "Testers with the same access rights as the eventual users",
      "A decision on which Odoo version the work targets, if an upgrade is planned",
    ],
    decisions: [
      { title: "Configure, customise, or change the process", body: "Configuration is free to change later. Code is not. We show you the standard behaviour first and ask you to explain why it fails, and a fair share of requests stop at that point without anyone losing anything." },
      { title: "Build it, or buy something that already exists", body: "If a maintained module already covers most of the requirement, buying it is cheaper than building and keeps you off a private fork. We say so even where it means less work for us." },
      { title: "How much of it should be settings", body: "Anything a manager might reasonably want to change should be a setting, not a constant in code. Settings cost a little more up front and save a support ticket every time the number moves." },
      { title: "How far to take testing", body: "Tests are worth it on anything that posts to the ledger, moves stock or bypasses an approval. On a colour change they are not. We agree the line rather than applying a blanket rule." },
    ],
    failureModes: [
      { title: "Requirements captured as screenshots", body: "A picture of the intended screen hides the rule behind it, and the rule is the thing that has to survive an upgrade. We write the requirement as behaviour first, and the interface follows from it." },
      { title: "Core files edited directly", body: "It works until the first update, then it silently reverts or breaks the module that depends on it. Everything goes in a separate module that extends rather than replaces." },
      { title: "Access rights left until the end", body: "Custom models added without record rules are visible to everyone, which is usually discovered by the wrong person. Rights are written with the model." },
      { title: "Performance tested on demo data", body: "Logic that is fine on ten records can be unusable on a hundred thousand. Anything that loops over records or computes across a table is checked at real volume before it ships." },
      { title: "One giant module", body: "Bundling unrelated features into a single module means you cannot uninstall one without losing the others, and an upgrade fails as a whole rather than in one place. One module per coherent feature." },
      { title: "No handover", body: "Code you cannot read is code you have to keep paying the original author to touch. Source, repository access and a walkthrough are part of finishing, not an extra." },
    ],
    outOfScope: [
      "Changes to Odoo core, which we will not make on any instance we support",
      "Reverse-engineering or patching an encrypted third-party module without its author's licence",
      "Maintaining custom code written by someone else, without a paid review first",
      "Free rework of a requirement that changed after sign-off: it is quoted as a change request",
      "Guaranteed upgrade compatibility for code we did not write",
      "Graphic design and brand assets: we implement what your designer supplies",
    ],
    pricingNote: "Customisation is quoted per item so the list can be trimmed rather than postponed as a block. Small well-specified pieces run fixed-price. A moving backlog runs on time and materials with a monthly ceiling you set.",
    faqs: [
      { q: "Will customisation break our next Odoo upgrade?", a: "Well-written custom modules do not break, they need porting, and the effort depends on how deeply they reach into standard behaviour. Code that extends existing models ports quickly. Code that replaces standard logic is expensive at every version. That is the single biggest reason we push back on requests that duplicate what Odoo already does." },
      { q: "Do we own the code?", a: "Yes. Source goes to your repository with the commit history intact, plus build and deploy instructions. There is no licence key, no time bomb and no obfuscation. If you replace us, the next team can read what we wrote." },
      { q: "Can you work on custom modules another vendor built?", a: "Usually, after a paid review. We need to see what state the code is in before promising anything, because inherited modules occasionally turn out to be core edits in disguise, and that changes the answer completely." },
      { q: "How do you keep customisation from growing forever?", a: "Every request has to survive one question: what breaks in the business if the standard behaviour is used instead. Requests that cannot answer it go on a parked list. Teams that review that list a quarter later usually delete most of it." },
      { q: "Do you write tests?", a: "On logic that touches money, stock, approvals or anything customer-facing, yes. On cosmetic work, no, because the test costs more than the defect. We agree the line during specification rather than applying one rule to everything." },
      { q: "What is a realistic turnaround for a small change?", a: "A single well-specified field or report is usually a matter of days including review and deployment, and the review and deployment are most of it. The delay on small changes is almost always waiting for a decision, not waiting for code." },
    ],
    modules: [
      { slug: "wt-dashboard-builder", why: "A large share of customisation requests are really reporting requests. A configurable dashboard closes many of them with no code at all." },
      { slug: "wt-gantt-view", why: "Scheduling views are one of the most common gaps requested on Community, and building one from scratch is rarely worth it." },
      { slug: "wt-grid-view", why: "Spreadsheet-style entry is a frequent request from teams migrating off Excel, and an existing view saves a bespoke build." },
      { slug: "wt-map-view", why: "Field-service and route requests usually start as a map. Cheaper to install than to write." },
      { slug: "wt-custom-backend-theme", why: "Branding requests are better served by a configurable theme than by hand-edited stylesheets that break at the next upgrade." },
      { slug: "wt-debrand-odoo", why: "White-labelling comes up on almost every client-facing deployment, and doing it by hand leaves traces in places nobody remembers to check." },
    ],
    countries: ["saudi-arabia", "uae", "pakistan", "india", "united-kingdom", "germany", "united-states", "canada"],
    countryNote: "Custom work often has a local reason behind it. The country pages set out what is already handled without code.",
    related: ["odoo-implementation", "hire-odoo-developer", "odoo-integration", "odoo-migration", "odoo-audit"],
  },

  "odoo-support": {
    metaTitle: "Odoo Support and Maintenance with SLA Response Tiers",
    metaDescription: "What an Odoo support contract covers: triage and response tiers, monitoring, verified backups, patching, performance tuning and a monthly report you can read.",
    lede: "Support is worth paying for when it prevents the outage, not just when it answers the phone afterwards.",
    intro: [
      "Most Odoo support contracts are sold as a response time and delivered as an inbox. The response time matters, but it is the smaller half. The half that decides whether you have a bad year is the routine work nobody sees: checking that backups actually restore, watching disk and memory before they run out, applying security patches, and noticing the query that has been getting slower every month.",
      "We run support in two lanes. The reactive lane takes tickets, triages them by real business impact rather than by how the reporter phrased it, and works to the response tier you bought. The proactive lane runs on a schedule regardless of whether you raised anything: monitoring, backup verification, patching, log review and performance checks.",
      "Every month you get a report that says what broke, what was fixed, what was patched, whether a restore was tested, and what is trending in the wrong direction. It is written to be read by whoever signs the invoice, not only by an administrator.",
    ],
    phases: [
      {
        name: "Onboarding and baseline",
        goal: "Know the system before it is on fire.",
        work: [
          "Inventory the instance: version, edition, custom modules, third-party apps, integrations, scheduled actions",
          "Document the hosting, access paths and who else has credentials",
          "Verify the current backup actually restores into a clean environment",
          "Record baseline performance numbers so later degradation is measurable rather than felt",
        ],
        deliverable: "A written system profile, a tested restore, and a baseline you can be measured against.",
      },
      {
        name: "Monitoring and alerting",
        goal: "See problems before users report them.",
        work: [
          "Uptime, disk, memory, CPU and database size watched continuously",
          "Failed scheduled actions and stuck queues alerted, because these fail quietly",
          "Error rate and slow-request monitoring on the application layer",
          "Certificate and domain expiry tracked, since these cause outages that are entirely avoidable",
        ],
        deliverable: "Alerting that reaches a human, with an escalation path that does not end in a shared inbox.",
      },
      {
        name: "Ticket handling",
        goal: "Fix the right things first, at the response tier you bought.",
        work: [
          "Triage by business impact: stopped trading, degraded, or annoying",
          "Reproduce on staging before touching live wherever the issue allows it",
          "Root cause recorded on the ticket, not just the fix",
          "Recurring tickets flagged for a permanent fix rather than a repeated workaround",
        ],
        deliverable: "Resolved tickets with a written cause, and a list of the ones that keep coming back.",
      },
      {
        name: "Preventive maintenance",
        goal: "Do the boring work on a schedule so it never becomes urgent.",
        work: [
          "Security patching and version-level fixes applied through staging first",
          "Restore drills on a schedule, because an untested backup is a rumour",
          "Database maintenance: index review, table growth, attachment and log cleanup",
          "Review of scheduled actions and integration queues for silent failures",
        ],
        deliverable: "A maintenance log showing what was applied, when, and what it changed.",
      },
      {
        name: "Reporting and review",
        goal: "Keep the contract honest and the roadmap visible.",
        work: [
          "Monthly report on tickets, response times met, patches applied and backup tests passed",
          "Trend view of the numbers that predict trouble: database growth, slow requests, error rate",
          "A short list of recommendations with an effort estimate against each",
          "A quarterly review call on anything larger than routine",
        ],
        deliverable: "A monthly written report and an agreed action list.",
      },
    ],
    clientProvides: [
      "Administrative access to the Odoo instance and to the hosting it runs on",
      "A named contact who can approve a change to the live system out of hours",
      "The source of any custom modules already installed, or permission to obtain it",
      "A staging environment, or agreement for us to build one",
      "A defined maintenance window when restarts and patches are acceptable",
      "Your escalation contacts and what counts as a business-stopping issue to you",
    ],
    decisions: [
      { title: "Which response tier you actually need", body: "The published tiers run at two, four and eight hours. Buying the fastest tier for a back-office system is money spent on a number you will never test. Buying the slowest for a system that takes orders all day is a false economy. Pick by what an hour of downtime costs you." },
      { title: "Who may approve an emergency change", body: "The slowest part of most incidents is finding someone who can say yes to a restart. Naming that person in advance, with a deputy, removes it." },
      { title: "How much change is included", body: "Support covers fixing what broke. New fields, new reports and new behaviour are development. We set a monthly allowance for small changes so trivial requests do not need a quotation each time, and quote anything larger." },
      { title: "Whether we hold hosting as well", body: "Support is cleaner when the same team owns the application and the platform, because nothing falls between two vendors. Where you keep hosting elsewhere, we need a working relationship with that vendor and it has to be agreed rather than assumed." },
    ],
    failureModes: [
      { title: "Backups that have never been restored", body: "The most common serious finding on a new support client. A backup job with a green tick proves the job ran, not that the file is usable. Restore drills are scheduled and evidenced." },
      { title: "Scheduled actions failing silently", body: "Integrations and automated jobs fail without a user noticing, sometimes for months, and the damage is found at period close. Job outcomes are monitored, not just the server." },
      { title: "Patching deferred because it is risky", body: "The risk compounds. Patching through staging on a schedule keeps each step small, which is the only way it stays low-risk." },
      { title: "Fixes applied straight to live", body: "It works often enough to feel fine, until the one time it does not, on a production database, at month-end. Reproduce on staging first wherever the issue allows it." },
      { title: "Tickets closed without a root cause", body: "The same problem returns under a new description and is treated as new work. Recording the cause is what turns a repeated ticket into a permanent fix." },
      { title: "Growth that nobody watches", body: "Database size, attachment volume and log files grow quietly until a disk fills at the worst moment. These are on the monthly report precisely because they are dull." },
    ],
    outOfScope: [
      "New development and new reports beyond the agreed monthly change allowance",
      "Data entry, data cleanup and bulk corrections caused by user error, unless quoted",
      "Support for modules whose source we are not allowed to see",
      "Third-party vendor failures, which we chase but do not control",
      "Version upgrades, which are scoped and quoted as migration work",
      "End-user training beyond incidental guidance on a ticket",
      "Restoring data lost by a user acting outside their access rights",
    ],
    pricingNote: "Support is a monthly agreement priced on instance size, response tier and how much of the platform we hold. Larger projects arrive with hypercare included in the published bands, and roll into a support agreement when that period closes.",
    faqs: [
      { q: "What do the response tiers actually mean?", a: "They are the time to a human working the ticket, not the time to a fix. A two-hour tier means someone is on it within two hours of it being raised. Time to resolution depends on what broke, and we report both so the difference stays visible." },
      { q: "Do you support Odoo instances you did not build?", a: "Yes, after an onboarding review. We need to see the custom modules, the integrations and the hosting before we commit to a response tier, because promising two hours on a system nobody has read is not a promise worth much." },
      { q: "Is 24/7 monitoring the same as 24/7 support?", a: "No, and the difference matters. Monitoring runs continuously and alerts a human. Support hours and response tiers are what you contract for. Systems that trade around the clock should buy both." },
      { q: "What happens to unused hours?", a: "The change allowance is a monthly allocation, not a bank. It exists so small requests do not each need a quotation. Larger pieces of work are quoted separately and are not drawn from it." },
      { q: "Can you take over from our current provider?", a: "Yes. The transition needs access, the source of any custom code, and a short overlap if the outgoing team will cooperate. Where they will not, onboarding takes longer because we reconstruct the system profile ourselves." },
      { q: "How do you handle emergencies out of hours?", a: "An escalation path agreed at onboarding, with a named approver on your side for changes to the live system. The bottleneck in most out-of-hours incidents is authorisation, so that gets settled before it is needed." },
    ],
    modules: [
      { slug: "wt-db-backup-cloud", why: "The first thing a support engagement checks, and the most common thing found missing or unverified." },
      { slug: "wt-audit-log", why: "Half of all support tickets resolve the moment you can see who changed what and when." },
      { slug: "wt-dynamic-financial-reports", why: "Finance tickets often turn out to be reporting gaps rather than defects, and closing the gap ends the ticket stream." },
      { slug: "wt-stock-aging", why: "Recurring stock disputes are usually visibility problems. An aging view answers them without a support ticket each time." },
      { slug: "wt-recent-records", why: "Small daily friction generates a surprising share of tickets. Reducing it lowers ticket volume more than another training session." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "kuwait", "pakistan", "india", "united-kingdom", "united-states"],
    countryNote: "Support cover follows your working week and your reporting calendar. The country pages set out what a local instance has to keep current.",
    related: ["odoo-saas-hosting", "odoo-audit", "odoo-migration", "hire-odoo-developer", "odoo-customization"],
  },

  "hire-odoo-developer": {
    metaTitle: "Hire Odoo Developers: Dedicated or Part-Time Engagements",
    metaDescription: "How a dedicated Odoo developer engagement runs: role definition, trial period, working agreement, code standards, reporting and the exit plan. What you have to supply.",
    lede: "A dedicated developer is a capacity decision. It works when you have a backlog and someone to own it, and it fails when neither is true.",
    intro: [
      "Hiring through an agency solves a supply problem, not a management problem. The engagements that go well have three things in place: a backlog someone has already prioritised, a person on your side who answers questions the same day, and a definition of done that is not just the developer saying it is finished. Without those, you are paying for a full-time seat and using half of it.",
      "So the first conversation is not about rates. It is about what the person will do in their first month, who they report to, and what an acceptable week of output looks like. If the answer is a list of tasks that will be defined later, a project engagement is usually cheaper for you than a dedicated seat.",
      "Where the fit is right, this is the least wasteful way to buy Odoo work. You get continuity, someone who learns your codebase, and no re-scoping overhead for every small request. The published terms cover the practical side: overlap hours, direct access, an NDA, and a replacement window if the person is wrong for the role.",
    ],
    phases: [
      {
        name: "Role definition",
        goal: "Decide what you are actually hiring, before anyone is put forward.",
        work: [
          "Separate the roles: technical development, functional configuration and project management are three different people",
          "Write the first month as concrete work, not as a skills list",
          "Set the overlap hours you need with your own team, since this drives who can be offered",
          "Name the person on your side who unblocks questions, and agree their expected turnaround",
        ],
        deliverable: "A role brief with the first month of work and the working hours written down.",
      },
      {
        name: "Selection and trial",
        goal: "Test the fit on real work rather than on an interview performance.",
        work: [
          "Shortlisted profiles with the relevant Odoo versions and domains stated plainly",
          "A technical conversation with your own developer where you have one",
          "A short paid trial on a real backlog item, reviewed against your standards",
          "A written decision to continue, swap, or stop, at the end of the trial",
        ],
        deliverable: "A confirmed developer and a working agreement, or a clean stop.",
      },
      {
        name: "Onboarding",
        goal: "Get to useful output in the first fortnight instead of the second month.",
        work: [
          "Access to the repository, the staging environment and the ticket system on day one",
          "A walkthrough of the existing custom modules and the parts of them that are fragile",
          "Agreement on branch naming, commit conventions, review and deployment route",
          "Introduction to the functional people the developer will actually have to ask",
        ],
        deliverable: "A developer committing reviewed work to your repository.",
      },
      {
        name: "Steady state",
        goal: "Keep the work visible without adding management overhead on your side.",
        work: [
          "Daily stand-up notes, written, so the record survives holidays and handovers",
          "Direct messaging access rather than a ticket queue between you and the developer",
          "Weekly summary of shipped work, in-flight work and blockers, sent whether or not it is good news",
          "Code review by a second engineer on our side before anything reaches your main branch",
        ],
        deliverable: "A weekly report and a reviewable commit history.",
      },
      {
        name: "Review and exit",
        goal: "Make continuing or stopping an informed decision either way.",
        work: [
          "Monthly review against the output you expected when the role was defined",
          "Escalation route if the fit is wrong, with a replacement window",
          "Knowledge written down as it is learned, not reconstructed at the end",
          "Handover notes and repository access confirmed before the engagement closes",
        ],
        deliverable: "A documented codebase and no single point of failure when the engagement ends.",
      },
    ],
    clientProvides: [
      "A prioritised backlog, or someone with the authority to prioritise one weekly",
      "A named person who answers functional questions within a working day",
      "Repository, staging and ticket access on the first day, not the second week",
      "Your code standards and review expectations, if you have them",
      "Realistic access to the users who know how the business actually works",
      "A decision on working hours and the overlap you need with your timezone",
    ],
    decisions: [
      { title: "Developer, consultant, or both", body: "A technical developer builds what has been specified. A functional consultant works out what should be specified. Teams that hire a developer and expect requirement analysis are usually disappointed by month two, and the fix is a part-time consultant alongside." },
      { title: "Dedicated or part-time", body: "Dedicated makes sense when the backlog is deep enough to keep someone busy for a quarter. Part-time or sprint-based fits a backlog that arrives in bursts. Paying for a full seat and using half of it is the most common way this engagement wastes money." },
      { title: "Who reviews the work", body: "If nobody on your side reviews, review has to sit with us and be stated in the agreement. Unreviewed code accumulates quietly and the cost lands at your next upgrade." },
      { title: "Where the code lives", body: "Your repository, on your account, from day one. It sounds obvious and it is the thing most often left until later, at which point the history is somewhere else." },
    ],
    failureModes: [
      { title: "No backlog on day one", body: "The first fortnight is spent inventing work, and the engagement never recovers its rhythm. We ask for the first month of work in writing before a start date is agreed." },
      { title: "Questions that wait days for an answer", body: "A blocked developer is billed the same as a busy one. Naming the person who unblocks, and agreeing a turnaround, is the single highest-return thing a client does here." },
      { title: "Treating the developer as a functional consultant", body: "Handing over a vague outcome and expecting the process design to appear is the most common cause of a failed dedicated engagement. Two roles, or one role and a lower expectation." },
      { title: "No review on your side or ours", body: "Six months of unreviewed commits is a rewrite in waiting. Review is defined at the start and it is on someone regardless of whether you have a developer." },
      { title: "Knowledge held in one head", body: "Everything learned about your instance gets written down as it is learned. Otherwise the end of the engagement is also the end of the knowledge." },
      { title: "Scope creep by conversation", body: "Direct access is useful and it also lets work arrive without anyone tracking it. Requests still land on the backlog, so the weekly report reflects what really happened." },
    ],
    outOfScope: [
      "Recruitment, employment or payroll of the individual: they remain our staff under contract to you",
      "Hardware, software licences and third-party subscriptions used during the engagement",
      "Work outside the agreed overlap hours unless separately arranged",
      "Guaranteed outcomes on a backlog you own and prioritise: this is capacity, not fixed-scope delivery",
      "Support cover: an incident response commitment is a support agreement, not a developer seat",
      "Fixing production emergencies out of hours as an implied duty of the role",
    ],
    pricingNote: "Priced by seat and by month, on dedicated, part-time or sprint terms, with the working hours and overlap stated in the agreement. Where the work is a defined piece with an end state, a fixed-price project is usually cheaper than a seat and we will say so.",
    faqs: [
      { q: "What is the difference between hiring a developer and buying a project?", a: "A project buys a defined outcome at a fixed price and carries the delivery risk on our side. A developer buys capacity, and the prioritisation and the risk stay with you. If the work has a clear end state, buy the project. If it is a long backlog that keeps changing, buy the seat." },
      { q: "Can we interview the person first?", a: "Yes, and you should, including a technical conversation with your own developer if you have one. We also recommend a short paid trial on a real backlog item, because interviews test different skills from the job." },
      { q: "What if the person is not the right fit?", a: "There is a replacement window in the published terms. Raise it early rather than hoping it improves, because the cost of a poor fit is mostly the weeks spent waiting to say so." },
      { q: "Who owns the code they write?", a: "You do. It goes into your repository from the first commit, under an NDA, with the history intact. Nothing depends on us continuing after the engagement ends." },
      { q: "How much of our time will this take?", a: "Budget a few hours a week for prioritisation, questions and review. Engagements where the client cannot spare that are the ones that underperform, and it is worth being honest about it before starting rather than after." },
      { q: "Can the same person do configuration and development?", a: "Some can, and it is worth asking for during selection. But a person who is genuinely good at both is scarcer, so for larger backlogs a technical developer plus part-time functional support usually delivers more per month than one person stretched across both." },
    ],
    modules: [
      { slug: "wt-audit-log", why: "When more than one person is changing configuration, a change log is what keeps a shared instance sane." },
      { slug: "wt-show-record-id", why: "Small thing, but a developer working with a client team spends a lot of the day identifying which record is being discussed." },
      { slug: "wt-import-export", why: "Backlogs are full of bulk data jobs. Having a repeatable tool keeps them off the developer's week." },
      { slug: "wt-db-backup-cloud", why: "A shared staging environment gets broken regularly. Being able to restore it in minutes is what keeps that from costing a day." },
    ],
    countries: ["saudi-arabia", "uae", "pakistan", "united-kingdom", "united-states", "canada", "germany", "australia"],
    countryNote: "Overlap hours drive who can be offered. The country pages show where we already run delivery teams.",
    related: ["odoo-customization", "odoo-support", "odoo-implementation", "odoo-integration", "odoo-consultancy"],
  },

  "odoo-integration": {
    metaTitle: "Odoo Integration Services: APIs, Webhooks and Connectors",
    metaDescription: "Odoo integration done so failures are visible: field mapping, master-of-record decisions, idempotency, retry, reconciliation and a log you can search. Phases and pitfalls.",
    lede: "Integrations are easy to demonstrate and hard to run. The work is not the connection, it is what happens on the day one side is down.",
    intro: [
      "Any competent developer can move a record from one system to another. What separates an integration that lasts from one that quietly corrupts your data is everything around that: deciding which system is right when the two disagree, making sure a retried message cannot be applied twice, and knowing within minutes when the flow has stopped rather than at month end.",
      "So we design the failure behaviour before the happy path. Every flow gets a direction, a master of record, an idempotency key, a retry policy and a log entry that a support person can search without reading code. Anything that cannot be retried safely gets a queue and a human review step instead of an automatic one.",
      "There is a reconciliation step too, and it is the part clients most often skip. A scheduled comparison of both sides catches the slow drift that silent failures cause. Finding a two-record gap on a Tuesday is a ticket. Finding a two-thousand-record gap at year end is a project.",
    ],
    phases: [
      {
        name: "Data flow mapping",
        goal: "Agree what moves, in which direction, and who wins a disagreement.",
        work: [
          "List each object that crosses the boundary and give it one direction, or state clearly that it is two-way",
          "Name the master of record per field, not per object, because the answer is usually mixed",
          "Decide the matching key between systems, and what happens when it is missing",
          "Agree the update frequency each flow genuinely needs, since real-time is expensive and rarely required everywhere",
        ],
        deliverable: "A written flow map with direction, master, key and frequency per object.",
      },
      {
        name: "Interface and access setup",
        goal: "Get credentials, environments and limits settled before code.",
        work: [
          "Separate test and live credentials, with a staging instance that cannot touch live data",
          "Read the rate limits and pagination rules of the other system, and design inside them",
          "Confirm which events the other side can push and which have to be polled",
          "Establish the error format the other side returns, because that decides what can be retried",
        ],
        deliverable: "Working sandbox access on both sides, with limits and error behaviour documented.",
      },
      {
        name: "Build with failure handling",
        goal: "Write the flow so that the failure case is ordinary, not exceptional.",
        work: [
          "Idempotency on every inbound message so a replay cannot double-post",
          "Retry with backoff for transient errors, and a dead-letter queue for the rest",
          "Signature or token verification on every inbound webhook",
          "An audit log recording payload, outcome and reference, searchable by a support person",
          "Field-level mapping applied in one place, so a change to it is one change",
        ],
        deliverable: "A working connector with a visible queue, a retry policy and a searchable log.",
      },
      {
        name: "Testing the unhappy paths",
        goal: "Prove the behaviour when things go wrong, which is the only test that matters later.",
        work: [
          "Duplicate delivery, out-of-order delivery and partial payloads",
          "The other system offline for an extended period, then back",
          "Currency, rounding and unit mismatches, which are the quiet data-corruption cases",
          "Volume test at a realistic peak, not at an average day",
          "Cancellations, refunds and returns, which most integrations handle worse than creations",
        ],
        deliverable: "A test record covering each failure case with the observed behaviour.",
      },
      {
        name: "Go-live and reconciliation",
        goal: "Cut over without a backlog of half-synced records, then keep it honest.",
        work: [
          "Backfill historical records where needed, with the matching key applied first",
          "Run both systems in parallel briefly where the process allows it",
          "Schedule a recurring reconciliation that compares counts and totals on both sides",
          "Alerting on queue depth and on age of the oldest unprocessed message",
        ],
        deliverable: "A live integration with monitoring and a scheduled reconciliation report.",
      },
    ],
    clientProvides: [
      "API credentials for both systems, plus sandbox or test access on the third-party side",
      "A technical contact at the other vendor who will answer questions during the build",
      "The documentation for any in-house system, and someone who knows the parts the documentation gets wrong",
      "A decision on the master of record per object, which is a business call and not ours to make",
      "Sample payloads from real traffic, including the messy ones",
      "Agreement on what happens to records that fail validation and need a human",
    ],
    decisions: [
      { title: "Which system is master", body: "The most consequential decision in the whole engagement, and it is usually mixed: one system owns the price, another owns stock, a third owns the customer address. Deciding per field prevents the loop where two systems overwrite each other forever." },
      { title: "Real-time or scheduled", body: "Real-time costs more to build, more to run and more to debug. Orders usually justify it. Product descriptions almost never do. We ask for the business consequence of a delay before agreeing to push a flow to real-time." },
      { title: "How to handle records that fail validation", body: "Silently skipping is what produces the gap you find at year end. The options are a queue with a human review, an automatic hold, or a rejection back to the source, and the right answer differs per flow." },
      { title: "How much history to backfill", body: "Backfilling everything is slow and often unnecessary. Backfilling nothing leaves reports that start mid-year. This is a reporting decision, so we ask the person who runs the reports." },
    ],
    failureModes: [
      { title: "No idempotency", body: "The other side retries, the message applies twice, and you have a duplicate order or a doubled stock move. Every inbound message carries a key, and applying the same key twice is a no-op." },
      { title: "Errors that go nowhere", body: "A flow that logs failures to a file nobody reads is a flow that has stopped, and you will find out from a customer. Failures go to a queue with an owner and an alert." },
      { title: "Two-way sync with no owner", body: "Both systems write, both trigger the other, and the record ping-pongs until somebody turns the integration off. Ownership per field breaks the loop." },
      { title: "Ignoring rate limits until production", body: "It works at test volume and throttles on the first busy day. Limits and pagination are designed for at the start, not patched in after an incident." },
      { title: "No reconciliation", body: "Small silent gaps compound. A scheduled count-and-total comparison catches drift while it is still a ticket rather than a quarter of manual correction." },
      { title: "Mapping scattered through the code", body: "When the mapping lives in five places, one change is five edits and one of them gets missed. Mapping is defined once and applied everywhere from there." },
      { title: "Testing only the creation path", body: "Refunds, cancellations, partial shipments and returns are where integrations really break, because they are rarer and were never tested. They go on the test plan explicitly." },
    ],
    outOfScope: [
      "Fees, subscriptions and transaction charges of the third-party service",
      "Changes to the other system, unless we are engaged on that side too",
      "Guaranteed uptime of an external API, and outages caused by the other vendor",
      "Reworking a flow after the other vendor changes their API without notice, which is quoted when it happens",
      "Certification or partner approval processes run by the third party",
      "Historical data correction for records that were already wrong before the integration existed",
    ],
    pricingNote: "Integrations are quoted per flow, so a scope can be reduced by dropping a flow rather than by cutting quality on all of them. A first connector plus reconciliation is usually fixed-price. Continuing maintenance against a third-party API that changes belongs in a support agreement.",
    faqs: [
      { q: "How long does a typical integration take?", a: "A single well-documented flow with sandbox access on both sides is a short piece of work. What extends it is nearly always outside the code: waiting for credentials, discovering the other API is undocumented in the area you need, or finding that nobody has decided which system owns the customer record." },
      { q: "Can you integrate a system that has no API?", a: "Often, through file exchange, database access or scheduled exports, and the result works. It is less immediate and needs stricter reconciliation because there is no acknowledgement to rely on. We would rather do that properly than pretend a scraped interface is an integration." },
      { q: "What happens when the other system is down?", a: "Messages queue and retry with backoff, and after a defined number of attempts they go to a dead-letter queue with an alert. Nothing is dropped. When the other side returns, the queue drains in order and the reconciliation confirms nothing was lost." },
      { q: "Who fixes it when the third party changes their API?", a: "Under a support agreement, we do, and we watch for deprecation notices. Without one it is quoted when it happens. Third-party APIs change more often than most buyers expect, which is the main argument for holding integrations under support rather than treating them as finished." },
      { q: "Do we need real-time sync?", a: "Less often than people assume. Orders and payments usually do. Product data, customer records and reporting rarely justify the cost, and a scheduled flow every few minutes is easier to debug and cheaper to run. We ask what a delay actually costs before deciding." },
      { q: "How do we know it is still working?", a: "Queue depth and oldest-message age are monitored and alerted, and a scheduled reconciliation compares both sides and reports differences. Silence from an integration is not evidence that it is running." },
    ],
    modules: [
      { slug: "wt-shopify-connector", why: "Where the requirement is a storefront rather than a bespoke API, a maintained connector is cheaper than building and keeps you off a private fork." },
      { slug: "wt-whatsapp-connector", why: "Messaging requests usually arrive as an integration ticket, and this covers the common ones without a custom build." },
      { slug: "wt-delivery-carrier-connector", why: "Carrier work is repetitive and regional. Starting from an existing connector saves rebuilding label and tracking handling per carrier." },
      { slug: "wt-bank-statement-import", why: "Bank feeds are often the first integration a finance team asks for, and file-based import covers it without a banking API project." },
      { slug: "wt-audit-log", why: "When two systems disagree, the first question is which side wrote last. A change log answers it in seconds." },
      { slug: "wt-pwa-push", why: "Integration work often ends with a notification requirement, and a reusable push route beats another one-off email." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "united-kingdom", "united-states", "australia"],
    countryNote: "Payment and shipping options differ by market. The country pages set out what applies where you operate.",
    related: ["odoo-customization", "odoo-ecommerce", "odoo-support", "odoo-implementation", "hire-odoo-developer"],
  },

  "odoo-migration": {
    metaTitle: "Odoo Migration and Version Upgrade Services",
    metaDescription: "Upgrading Odoo without losing data or a week of trading: assessment, custom module porting, test conversions, parallel validation, a rehearsed cutover and a rollback point.",
    lede: "An upgrade is a rehearsal problem. The first conversion is never the one you go live on.",
    intro: [
      "Two things move in an upgrade and they move differently. The database has to be converted so that older records still mean what they meant. The custom code has to be ported so it still attaches to a version of Odoo that has changed underneath it. Doing both at once, once, on the live system, is how upgrades earn their reputation.",
      "We convert repeatedly instead. The first conversion exposes the data problems, the second proves the fixes, and by the final rehearsal the whole cutover is a script with known timings. Your team validates against a converted copy while the old system is still running, so sign-off happens before anything is at stake.",
      "The honest part of the conversation is the custom code. Modules that extend standard behaviour port quickly. Modules that replace it, or that were written as edits to core, cost real money at every version, and an upgrade is the moment to decide whether they are still worth carrying. We report that per module before you commit.",
    ],
    phases: [
      {
        name: "Assessment",
        goal: "Know what you are actually upgrading before quoting a date.",
        work: [
          "Inventory every installed module: standard, third-party and custom, with the source of each",
          "Check which third-party modules exist for the target version and which have no successor",
          "Read the custom modules and grade the porting effort per module",
          "Size the database, the attachments and the volume of open documents",
          "Identify features that changed behaviour between your version and the target",
        ],
        deliverable: "A written assessment with per-module effort, the modules with no path forward, and a recommended target version.",
      },
      {
        name: "First test conversion",
        goal: "Find the data problems while they are still cheap.",
        work: [
          "Convert a copy of production and record every error and warning",
          "Fix data issues at source in the live system wherever possible, so the next conversion is cleaner",
          "Port the custom modules against the target version",
          "Record the conversion duration, which is the number the cutover window is built from",
        ],
        deliverable: "A converted test database and a defect list split into data issues and code issues.",
      },
      {
        name: "Functional validation",
        goal: "Let your team prove the converted system does what the old one does.",
        work: [
          "Run your real processes end to end on the converted copy, not a demo script",
          "Compare key reports side by side against the old system for the same period",
          "Check the things upgrades break quietly: document layouts, access rights, scheduled actions, integrations",
          "Retrain on the behaviour that genuinely changed, rather than on everything",
        ],
        deliverable: "A validation sign-off from the people who use each area.",
      },
      {
        name: "Rehearsal",
        goal: "Turn the cutover into a script with known timings.",
        work: [
          "Repeat the conversion on a fresh copy with every fix applied",
          "Time each step so the maintenance window is based on measurement, not on hope",
          "Write the runbook: who does what, in what order, with the rollback point marked",
          "Agree the go and no-go criteria in advance, and who calls it",
        ],
        deliverable: "A rehearsed runbook with timings and a defined rollback point.",
      },
      {
        name: "Cutover and stabilisation",
        goal: "Go live in the planned window and hold the system steady afterwards.",
        work: [
          "Freeze the old system, take a full backup, run the conversion, verify against a checklist",
          "Smoke test the critical paths before users are let in",
          "Keep the old system readable but not writable for a defined period",
          "Daily triage for the first weeks, since some issues only surface with real volume",
        ],
        deliverable: "A live upgraded system, a retained pre-upgrade backup, and a post-upgrade defect log.",
      },
    ],
    clientProvides: [
      "A full backup of the production database and filestore, plus the source of every custom module",
      "The list of third-party modules you paid for, with licences, so successors can be obtained",
      "Someone from each functional area to validate the converted copy against real work",
      "A decision on the maintenance window, agreed against your operating calendar",
      "Credentials for every integration, since these need retesting after conversion",
      "Agreement on which unused modules can be dropped rather than ported",
    ],
    decisions: [
      { title: "Which version to land on", body: "The newest is not automatically right. What matters is whether your third-party modules exist there, and how long you want before the next upgrade. We give you the trade-off per module rather than a preference." },
      { title: "Which custom modules to retire", body: "Some custom code exists because the version you are on lacked a feature the target version now has as standard. An upgrade is the cheapest moment to delete it, and that decision belongs to the business, not to the developers." },
      { title: "Community or Enterprise on the target", body: "If you are considering a change of edition, doing it in the same project is usually cheaper than doing it later, but it enlarges the testing scope. That is a deliberate call, not a detail." },
      { title: "How long to keep the old system", body: "Read-only access to the previous system for a defined period settles most historical questions without migrating everything. Keeping it writable, on the other hand, guarantees somebody keeps working in it." },
    ],
    failureModes: [
      { title: "Upgrading straight from production", body: "One attempt, no rehearsal, and every surprise happens with users waiting. The conversion is repeated on copies until it is boring, and only then scheduled." },
      { title: "Custom modules ported without reading them", body: "Making code run on the new version is not the same as making it still do the right thing. Behaviour is validated against the process, not just against the absence of an error." },
      { title: "Data problems fixed in the converted copy", body: "The fix is lost at the next conversion and reappears at cutover. Data issues are corrected at source in the live system so every subsequent conversion is cleaner." },
      { title: "Reports assumed to be identical", body: "A report can run without error and still return a different number, and finance will find it at the first close. Key reports are compared side by side for the same period before sign-off." },
      { title: "Integrations tested last", body: "Credentials, endpoints and payload shapes all break on upgrade, and each one has an external party attached whose response time you do not control. They are retested during validation, not on go-live day." },
      { title: "No rollback point", body: "Cutovers occasionally have to be reversed. The pre-conversion backup, the exact freeze time and the decision maker are written into the runbook before it starts." },
      { title: "Training treated as unnecessary", body: "Users forgive a changed screen and do not forgive a changed workflow they were not told about. Retraining targets what genuinely changed, which is a much shorter list than a full course." },
    ],
    outOfScope: [
      "Third-party module licences for the target version, which are bought by you",
      "Rewriting a third-party module that has no successor version, unless separately quoted",
      "New features and process changes, which belong in an implementation phase and not in an upgrade",
      "Recovering data that was already missing or wrong before the upgrade began",
      "Guaranteed compatibility for modules whose source we are not permitted to see",
      "Hardware or hosting upgrades that the target version needs, quoted separately",
    ],
    pricingNote: "Migrations are quoted after the assessment, because a quote before anyone has read the custom modules is a guess. The assessment itself is a small fixed piece of work and its findings carry into the upgrade quote.",
    faqs: [
      { q: "Can you upgrade us from an old Odoo version?", a: "Yes. The migration service covers the database, the custom modules, attachments and historical transactions, with a test environment for sign-off before cutover. Older versions take longer because more standard behaviour changed on the way, and because third-party modules are less likely to have a successor." },
      { q: "Will we lose data?", a: "No. Conversions run on copies, the original is untouched until cutover, and a full pre-conversion backup is the rollback point. What does happen is that data which was already inconsistent becomes visible, because conversion is stricter than daily use." },
      { q: "How long does an upgrade take?", a: "The assessment is quick. The elapsed time is driven by how much custom code has to be ported and how long your team needs to validate. The cutover window itself is measured during rehearsal, so you get a real number rather than an estimate." },
      { q: "Do we have to upgrade every year?", a: "No, and most teams should not. The reasons to move are security support on your current version, a third-party module you need, or custom code that is getting expensive to maintain against an old base. Upgrading with no reason is cost with no return." },
      { q: "What about our customisations?", a: "They are graded per module in the assessment. Code that extends standard behaviour ports quickly. Code that replaces standard behaviour, or that was written as edits to core, is expensive at every version, and we tell you which of yours is which before you commit." },
      { q: "Can we move from Community to Enterprise during the upgrade?", a: "Yes, and doing both in one project is usually cheaper than sequencing them. It enlarges the testing scope, so it is planned deliberately rather than added mid-way." },
    ],
    modules: [
      { slug: "wt-db-backup-cloud", why: "The rollback point for a cutover is a backup you have already restored once. This is the machinery for that." },
      { slug: "wt-import-export", why: "Upgrades surface data that has to be corrected in bulk at source, and doing that by hand is where the schedule slips." },
      { slug: "wt-audit-log", why: "After cutover, the fastest way to settle a dispute about a converted record is to see what changed and when." },
      { slug: "wt-dynamic-financial-reports", why: "Validation depends on comparing the same financial reports on both versions for the same period." },
      { slug: "way4tech-enterprise-theme", why: "Where the driver for moving is the Enterprise interface rather than Enterprise features, this closes that gap without changing edition." },
    ],
    countries: ["saudi-arabia", "uae", "pakistan", "india", "united-kingdom", "germany", "united-states", "canada"],
    countryNote: "Accounting and payroll setup has to be re-validated after any version change. The country pages set out what applies in your market.",
    related: ["odoo-audit", "odoo-implementation", "odoo-customization", "odoo-support", "odoo-consultancy"],
  },

  /* ───────────── STRATEGY ───────────── */
  "odoo-consultancy": {
    metaTitle: "Odoo Consultancy: Architecture, Edition and Roadmap Advice",
    metaDescription: "Independent Odoo advice for founders and CTOs: edition choice, hosting model, multi-company structure, cost modelling and a phased roadmap with the trade-offs written down.",
    lede: "Advice you can act on, with the trade-offs stated. Including the times the answer is that Odoo is the wrong fit.",
    intro: [
      "Most ERP decisions are made once and lived with for years. Whether you run one company or five in the database, whether the group consolidates in the system or in a spreadsheet, which edition you buy, where it is hosted: each of these is cheap to decide and expensive to reverse after a year of transactions.",
      "This service exists to get those decisions made with the reasoning written down. Not a slide deck of options, but a recommendation with the argument behind it and the conditions under which it would change. Where we would gain from a bigger project, we say so in the document, because advice with an undisclosed interest is worth nothing.",
      "It also covers the answer nobody enjoys giving. Some requirements are a poor fit for Odoo, and hearing that early costs a consulting fee. Hearing it eighteen months in costs a rollout.",
    ],
    phases: [
      {
        name: "Framing",
        goal: "Establish what decision is actually being made, and by when.",
        work: [
          "Interview the sponsor: what triggered this, what happens if nothing changes, what is already decided",
          "Separate the real constraints from the preferences, because they get argued as though they are the same",
          "Fix the horizon: a three-year answer and a ten-year answer are different answers",
          "Agree what the deliverable has to enable, whether that is a board decision, a budget or a vendor choice",
        ],
        deliverable: "A written statement of the decision, the constraints and the deadline.",
      },
      {
        name: "Current state review",
        goal: "See what you have before recommending what you should have.",
        work: [
          "Review the systems in use, the integrations between them and the spreadsheets holding the gaps",
          "Assess the technical maturity on your side, since that decides which options are realistic",
          "Look at volume and growth: users, transactions, entities, countries",
          "Identify what is genuinely differentiating in your process and what is just habit",
        ],
        deliverable: "A current-state summary with the constraints that follow from it.",
      },
      {
        name: "Options and trade-offs",
        goal: "Put real alternatives side by side, priced and with the risks named.",
        work: [
          "Edition, hosting and architecture options set out with cost and consequence per option",
          "Multi-company and multi-entity structure modelled against how you actually report",
          "Total cost modelled over the horizon, including the internal effort, which is the line most models omit",
          "The do-nothing option costed as well, because sometimes it wins",
        ],
        deliverable: "An options paper with a recommendation and the reasoning that supports it.",
      },
      {
        name: "Roadmap",
        goal: "Sequence the work so each phase pays for itself before the next one starts.",
        work: [
          "Phase the rollout so the first go-live is small enough to succeed",
          "Identify the decisions that must be made early because they are expensive to reverse",
          "Set out the internal capability you need to build, and when",
          "Define what good looks like per phase, in numbers, so progress is arguable rather than felt",
        ],
        deliverable: "A phased roadmap with dependencies, effort ranges and success measures.",
      },
      {
        name: "Briefing and handover",
        goal: "Make sure the recommendation survives contact with the rest of your organisation.",
        work: [
          "Walk the leadership team through the reasoning, not just the conclusion",
          "Answer the challenge from whoever is sceptical, since they are usually the useful one",
          "Hand over the model and the assumptions so you can rerun it when something changes",
          "Agree what would trigger a review of the recommendation",
        ],
        deliverable: "A briefing session and a document your team can defend without us in the room.",
      },
    ],
    clientProvides: [
      "Access to the sponsor, and honest answers about what has already been decided politically",
      "Current system inventory, licence costs and the integrations between them",
      "Volume and growth numbers: users, transactions, entities, locations",
      "The reporting pack the business is actually run on, including the spreadsheets",
      "Any vendor proposals already received, so the comparison is against reality",
      "Willingness to hear that a preferred option has a problem",
    ],
    decisions: [
      { title: "Community or Enterprise", body: "Community suits cost-sensitive teams with technical maturity. Enterprise suits teams that want the vendor-supported apps and support behind them. The honest comparison includes the internal effort Community needs, which is the line most cost cases leave out." },
      { title: "Hosted by us, self-managed, or vendor cloud", body: "This is a control and capability question more than a price question. The right answer depends on whether you have someone who will patch a server at ten on a Friday night, and on what your data policy requires." },
      { title: "One database or several", body: "Multi-company in one database gives consolidated reporting and shared master data at the price of shared configuration. Separate databases give isolation at the price of every cross-entity report. Reversing either later is a migration." },
      { title: "How much to build in phase one", body: "The strongest predictor of a successful ERP programme is a first phase small enough to finish. Ambition is better spent on phase two, once the organisation has learned how it absorbs change." },
    ],
    failureModes: [
      { title: "Advice with an undisclosed interest", body: "A recommendation from someone who profits from the larger option is not advice. Where a recommendation would benefit us, it says so in the document, and you are free to have another party deliver it." },
      { title: "Comparing licence cost instead of total cost", body: "Editions get compared on subscription price while the internal effort, the hosting and the support are left out. The model includes them, because the cheaper licence often loses once they are in." },
      { title: "Deciding the structure late", body: "Company structure, chart of accounts and analytic design are cheap to choose and expensive to change once posted. They are settled in the roadmap phase, before implementation starts." },
      { title: "A roadmap with no measures", body: "Phases described as goals rather than numbers cannot be judged, so every phase is declared a success. Each phase gets a measure agreed before it starts." },
      { title: "Ignoring the internal capability gap", body: "A plan that assumes a team you do not have will fail on a schedule nobody predicted. The roadmap states what you need to hire or train, and when." },
      { title: "Skipping the sceptic", body: "The person who thinks the project is a mistake usually knows something the sponsor does not. We interview them deliberately." },
    ],
    outOfScope: [
      "Implementation delivery, which is a separate engagement and can go to another partner",
      "Legal, tax and audit advice, which belongs with your professional advisers",
      "Vendor negotiation on your behalf",
      "Guarantees about a third-party product roadmap",
      "Recruitment for the internal roles the roadmap identifies",
      "Rewriting the recommendation to reach a conclusion that was decided before we started",
    ],
    pricingNote: "Consultancy is priced as a fixed engagement with a defined deliverable and a briefing session, or as a retained advisory arrangement at a set number of days a month. Where it leads to delivery work, the fee is stated separately so the advice can be judged on its own.",
    faqs: [
      { q: "Should we use Odoo Community or Enterprise?", a: "Community fits cost-sensitive teams with the technical maturity to run it, Enterprise fits teams that want the vendor-supported apps and support behind them. We also move databases between the two. The comparison worth doing includes internal effort, not just the subscription line, because that is usually what decides it." },
      { q: "Will you tell us if Odoo is the wrong fit?", a: "Yes, and it happens. Some requirements are better served by a specialist system with Odoo behind it for finance and operations, and some businesses are not ready for ERP at all. Finding that out during a consulting engagement is much cheaper than finding it out during an implementation." },
      { q: "Can you review a proposal from another partner?", a: "Yes. A common request is a second opinion on a quote: whether the scope is realistic, whether the estimate is credible, and what is missing that will arrive as a change request later. We review it as written, not as we would have written it." },
      { q: "How long is a consulting engagement?", a: "Short. It is a small number of days of interviews and analysis, then a written recommendation and a briefing. If it is running long, it usually means the decision was never framed properly, which is worth stopping to fix." },
      { q: "Do we have to use you for the implementation?", a: "No, and the deliverable is written so another partner could execute it. Advice that only works if we deliver it is not advice." },
      { q: "What do we actually receive?", a: "A written options paper with a recommendation and the reasoning, a phased roadmap with effort ranges and success measures, the cost model with its assumptions exposed, and a session where your leadership team can argue with it." },
    ],
    modules: [
      { slug: "wt-dynamic-financial-reports", why: "Edition comparisons usually hinge on reporting. Knowing what Community can already produce changes the cost case." },
      { slug: "way4tech-enterprise-theme", why: "Where the pull towards Enterprise is the interface rather than the apps, this is worth costing into the comparison." },
      { slug: "wt-budget-control", why: "Budget and commitment control is a frequent driver of edition decisions, and it is worth checking before the decision is made on it." },
      { slug: "wt-audit-log", why: "Governance requirements are often assumed to force an edition. Knowing what change tracking is available either way keeps the decision honest." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "united-kingdom", "germany", "united-states"],
    countryNote: "Where you operate changes the architecture, particularly for multi-entity groups. The country pages carry the local detail.",
    related: ["odoo-audit", "odoo-implementation", "odoo-migration", "odoo-saas-hosting", "odoo-localization"],
  },

  "odoo-training": {
    metaTitle: "Odoo Training for Users, Administrators and Developers",
    metaDescription: "Role-based Odoo training on your own configured system: curriculum design, hands-on labs, assessment, recordings and a support channel afterwards. What makes training stick.",
    lede: "Training on a demo database teaches people a system they will never use. We train on yours, with your data.",
    intro: [
      "Adoption failures are usually described as training failures, and they usually are not. People do not resist the software, they resist not knowing what to do when the screen does not match what they were shown. That happens when training runs on a generic instance, when it is delivered as one long session a fortnight before go-live, and when the exceptions are left out because they complicate the slides.",
      "So we train on your configured system, with your data, split by role, close to the moment people need it. Every session is mostly hands-on. The exceptions get taught, because the exceptions are where users get stuck and where a workaround gets invented that finance discovers three months later.",
      "Sessions are recorded and the material stays with you. New joiners in six months get the same training as the original team, without booking us again.",
    ],
    phases: [
      {
        name: "Curriculum design",
        goal: "Decide who needs to know what, and cut everything else.",
        work: [
          "List the roles and the tasks each one actually performs, from the process map where one exists",
          "Write objectives as tasks a person can complete unaided, not as topics covered",
          "Set the depth per role: an approver does not need the same session as a daily entry user",
          "Identify the exceptions each role will hit, and build them into the exercises",
        ],
        deliverable: "A role-by-role curriculum with task-level objectives.",
      },
      {
        name: "Environment and material preparation",
        goal: "Make the training system look like the job.",
        work: [
          "A dedicated training database with your configuration and a realistic data set",
          "Individual logins with the same access rights people will have in production",
          "Exercises built on your real documents and your real product and customer names",
          "Quick-reference sheets per role, one page, written for the desk and not for a binder",
        ],
        deliverable: "A training environment and role-specific material in your own language and layout.",
      },
      {
        name: "Delivery",
        goal: "Get people doing the work, not watching someone else do it.",
        work: [
          "Short sessions by role, on site or remote, mostly hands-on",
          "Each participant completes the task themselves before the session moves on",
          "The exception cases practised deliberately: the return, the correction, the cancellation",
          "Sessions recorded, so the material outlives the day",
        ],
        deliverable: "Trained users, session recordings and a written list of the questions that came up.",
      },
      {
        name: "Assessment and gap closing",
        goal: "Find out who is not ready before go-live does it for you.",
        work: [
          "A short practical assessment per role, done on the system rather than on paper",
          "Results reviewed with managers, privately, so it is used for support and not for blame",
          "Extra sessions for the groups that need them, targeted at the specific gap",
          "Certification for those who pass, which matters more than it sounds for adoption",
        ],
        deliverable: "An assessment record per role and a targeted plan for the gaps.",
      },
      {
        name: "Follow-up",
        goal: "Support the questions that only appear once the work is real.",
        work: [
          "A support channel for the period after go-live, so questions do not become workarounds",
          "A refresher after the first period close, when the hard questions finally arrive",
          "Material handed over in editable form so your team can maintain it",
          "Train-the-trainer for the people who will onboard new joiners",
        ],
        deliverable: "Editable material, recordings, and an internal trainer who can run it again.",
      },
    ],
    clientProvides: [
      "A participant list by role, with managers committed to releasing people for the sessions",
      "A configured system, or agreement for us to prepare a training copy of it",
      "Realistic sample data, or permission to use a masked copy of production",
      "A room and reliable connectivity for on-site sessions, or a working remote setup",
      "Your document templates and terminology, so training uses the words your business uses",
      "A decision on the language of delivery and of the material",
    ],
    decisions: [
      { title: "Train everyone, or train trainers", body: "Direct training is faster to get right and does not scale past a certain headcount. Train-the-trainer scales and needs your internal people to have time and appetite for it. Large or dispersed teams usually need both." },
      { title: "When to train relative to go-live", body: "Too early and it is forgotten, too late and there is no time to fix the gaps the assessment finds. Close to go-live with a scheduled refresher after the first close is the pattern that holds up." },
      { title: "How much depth for administrators", body: "The administrator session decides how dependent you stay on outside support. Users, access rights, backups and scheduled actions are the difference between calling us for a password reset and not." },
      { title: "Whether developers need a bootcamp", body: "Only worth it if you intend to hold the code. If you do, it pays for itself quickly. If you do not, the money is better spent on deeper administrator training." },
    ],
    failureModes: [
      { title: "Training on a demo database", body: "People learn a product tour rather than their job, and the first unfamiliar screen sends them to a colleague. Training runs on your configuration with your data." },
      { title: "One long session for everybody", body: "Mixed-role sessions bore half the room and lose the other half. Short sessions per role, close to the work, hold attention and hold retention." },
      { title: "Exceptions left out", body: "Returns, corrections and cancellations are exactly where users invent workarounds. They are taught deliberately, even though they make the session longer." },
      { title: "No assessment", body: "Attendance is not competence, and without an assessment nobody knows who is not ready until go-live. A short practical test per role finds it while there is still time." },
      { title: "Material nobody can update", body: "Screenshots go stale, the configuration moves, and the document becomes misleading. Material is handed over in editable form with your internal owner named." },
      { title: "Training that stops at go-live", body: "The genuinely hard questions arrive at the first period close, weeks later. A refresher is scheduled for that point rather than offered if anyone asks." },
    ],
    outOfScope: [
      "Official Odoo certification exams and their fees, which are run by the vendor",
      "Travel and accommodation for on-site delivery, quoted separately",
      "Configuration changes discovered during a session, which are logged and quoted, not made live in the room",
      "Ongoing helpdesk cover, which is a support agreement",
      "Translating material into languages not agreed at the start",
      "Retraining after a later system change, unless a refresher is contracted",
    ],
    pricingNote: "Training is priced per session and per role, with a fixed price where the curriculum is set. Training delivered inside an implementation is included in the published bands. Standalone programmes and train-the-trainer are quoted on the participant count and the number of roles.",
    faqs: [
      { q: "Do you train on our system or a standard one?", a: "Yours. A training copy of your configured database with your data, and logins carrying the same access rights people will have in production. Generic training produces people who can use Odoo in general and not the system in front of them." },
      { q: "How long does training take?", a: "It depends on roles rather than headcount. A daily entry user needs a short focused session on their own tasks. An administrator needs considerably more. The efficient shape is several short role sessions rather than one long day for everybody." },
      { q: "Can you deliver in Arabic or Urdu?", a: "Yes. Our project teams work in Arabic, English and Urdu, and both delivery and material can be in the language your users actually work in. That gets decided at curriculum design, because it affects the material as well as the session." },
      { q: "What happens when new people join later?", a: "You keep the recordings and the material in editable form, and we recommend train-the-trainer so somebody internal can run the sessions. If your turnover is high, that is much cheaper than booking us for each intake." },
      { q: "Do you train developers?", a: "Yes, as a bootcamp for teams that intend to hold their own code. It is worth doing only if that is the plan. Where it is not, deeper administrator training returns more for the same money." },
      { q: "Is there an assessment?", a: "A short practical one per role, done on the system. It is reviewed with managers to target follow-up sessions, not to rank people. Its real job is to find out who is not ready while there is still time to do something about it." },
    ],
    modules: [
      { slug: "wt-recent-records", why: "New users lose time finding their way back to what they were working on, and that friction is what makes a system feel hard." },
      { slug: "wt-default-filters", why: "Trainees do better when the list they open already shows their own records rather than everything in the company." },
      { slug: "wt-documents-dms", why: "Training material and procedures need a home inside the system, with versions, or they end up as attachments in an inbox." },
      { slug: "wt-dashboard-builder", why: "Managers adopt a system when their numbers are on one screen. That is often the difference between sponsorship and indifference." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "egypt", "united-kingdom", "united-states"],
    countryNote: "Delivery language and working week follow your location. The country pages show where we already run teams.",
    related: ["odoo-implementation", "odoo-support", "odoo-consultancy", "hire-odoo-developer", "odoo-audit"],
  },

  /* ───────────── CLOUD ───────────── */
  "odoo-saas-hosting": {
    metaTitle: "Odoo Hosting and Multi-Tenant SaaS Platform Operations",
    metaDescription: "Managed Odoo hosting and multi-tenant SaaS operations: sizing, provisioning, backups with tested restores, patching, monitoring, isolation and a documented exit path.",
    lede: "Hosting is judged on the worst day, not the average one. The questions that matter are the restore, the patch and the exit.",
    intro: [
      "Two different jobs share this name. One is running your own Odoo instance properly: sized correctly, backed up in a way that has been tested, patched on a schedule and watched by something that wakes a human. The other is running a platform where you sell Odoo to your own customers, which adds tenant provisioning, isolation, per-tenant backup and a support model.",
      "We do both, and the discipline is the same. Backups are only real once restored. Isolation is only real once someone has tried to cross it. Capacity is only known once measured under your actual load rather than a benchmark.",
      "The exit path is part of the service, not a concession. You get a full database and filestore export whenever you ask, in a form another provider can take. A hosting arrangement you cannot leave is not a service, it is a hold.",
    ],
    phases: [
      {
        name: "Sizing and design",
        goal: "Fit the platform to your real load rather than to a package name.",
        work: [
          "Measure or estimate concurrent users, transaction volume, attachment growth and reporting peaks",
          "Decide single-tenant or multi-tenant, and where the isolation boundary sits",
          "Choose the region, which is driven by where your users are and by your data policy",
          "Plan the environments: production, staging and a place to test restores",
        ],
        deliverable: "A written architecture with sizing, environments and the growth assumptions behind them.",
      },
      {
        name: "Provisioning and hardening",
        goal: "Stand it up so it is defensible from day one.",
        work: [
          "Build the servers, database and application layer with access restricted to what is needed",
          "Certificates automated so expiry is not an outage waiting to happen",
          "A proxy layer for filtering and traffic protection, with sensible rate limits",
          "Least-privilege accounts, no shared logins, and key-based administrative access",
        ],
        deliverable: "A running environment with an access map showing who can reach what.",
      },
      {
        name: "Backup and recovery",
        goal: "Be able to prove recovery, not describe it.",
        work: [
          "Scheduled encrypted backups of database and filestore, held off the host",
          "Retention set against how far back you might genuinely need to reach",
          "Restore drills on a schedule, timed, with the result recorded",
          "Recovery objectives written down and matched by the design, not asserted in a brochure",
        ],
        deliverable: "A tested restore with a measured duration, repeated on a schedule.",
      },
      {
        name: "Operations",
        goal: "Keep it healthy without waiting for a user to notice.",
        work: [
          "Monitoring on uptime, disk, memory, CPU, database size and error rates",
          "Alerts that reach a person with an escalation path behind them",
          "Patching through staging on a schedule, in small steps",
          "Log rotation, attachment growth and database maintenance handled before they bite",
          "Capacity review as your numbers move, ahead of the problem rather than after it",
        ],
        deliverable: "A monthly operations report covering uptime, incidents, patches and restore tests.",
      },
      {
        name: "Tenant lifecycle",
        goal: "For platform operators: make onboarding and offboarding routine.",
        work: [
          "Repeatable provisioning of a new tenant with its own database, domain and certificate",
          "Per-tenant backup and restore that does not involve the others",
          "Version policy per tenant, so one customer cannot block everybody else",
          "Suspension, reactivation and deletion handled as defined operations with an audit trail",
        ],
        deliverable: "A provisioning and offboarding runbook that someone other than its author can follow.",
      },
    ],
    clientProvides: [
      "Domain control, or the ability to make the DNS changes we specify",
      "Your data residency requirements, and any restriction on where backups may be held",
      "Expected user count and growth, honestly, since undersizing is usually built on optimism",
      "A named technical contact for change approvals and incidents",
      "Your maintenance window and what an acceptable planned outage looks like",
      "The list of integrations that must keep working, so firewall and access rules cover them",
    ],
    decisions: [
      { title: "Single-tenant or multi-tenant", body: "Single-tenant is simpler to reason about, easier to isolate and to move. Multi-tenant is cheaper per customer and only makes sense if you are running a platform. Choosing multi-tenant for one business buys complexity with no return." },
      { title: "Where the data sits", body: "Region affects latency for your users and may be constrained by your own policy or your customers' contracts. It is easier to choose than to change, because moving a database means a maintenance window." },
      { title: "How much recovery you are buying", body: "How much data you can afford to lose and how long you can be down are two separate numbers, and they drive cost more than anything else in the design. Naming them turns hosting from a package into a specification." },
      { title: "Who holds the upgrade decision", body: "For a platform, a version policy per tenant keeps one slow customer from freezing the fleet. For a single instance, it is about aligning upgrades with your own calendar rather than ours." },
    ],
    failureModes: [
      { title: "Backups nobody has restored", body: "A green tick proves the job ran. It says nothing about whether the file opens. Restores are drilled on a schedule and the duration recorded, because that duration is your real recovery time." },
      { title: "Sizing based on a package name", body: "Plans are sold by tier rather than by load, and the mismatch surfaces at your busiest hour. Sizing follows measurement, and capacity is reviewed as your numbers move." },
      { title: "Certificates and domains expiring", body: "Entirely avoidable, and still one of the most common causes of a day of downtime. Renewal is automated and expiry is monitored anyway." },
      { title: "Shared administrative credentials", body: "When everyone uses the same login, nobody can be held to a change and revoking access means changing it for all. Named accounts with least privilege, from the start." },
      { title: "Isolation assumed rather than tested", body: "On a multi-tenant platform, the boundary between customers has to be verified rather than trusted, including in backups, in logs and in scheduled jobs." },
      { title: "No exit path", body: "A hosting arrangement you cannot leave is a commercial trap, and everyone knows it by the time it matters. Full export on request, in a portable form, is written into the agreement." },
      { title: "Patching left because it is risky", body: "Deferred patching accumulates until the upgrade is genuinely dangerous, which then justifies deferring it further. Small steps on a schedule through staging is the only way out." },
    ],
    outOfScope: [
      "Odoo subscription fees and third-party module licences",
      "Application-level defects and custom code fixes, which belong to support or development",
      "Data entry, cleanup and user error recovery",
      "Compliance certification of your business: we operate the platform, we do not certify your organisation",
      "Domain registration fees and third-party service subscriptions",
      "Network problems on your side, between your office and the internet",
    ],
    pricingNote: "Hosting is a monthly fee by environment size, with backup retention and the response tier stated. Platform operators are priced on the fleet rather than per tenant. Migration onto the platform from an existing host is a one-off piece of work, quoted after we have seen what is there.",
    faqs: [
      { q: "What does the uptime commitment actually cover?", a: "The platform we operate: servers, database, application service and network. It does not cover your internet connection, a third-party API being down, or an outage caused by custom code deployed against our advice. Planned maintenance inside the agreed window is excluded and announced ahead of time." },
      { q: "How often are backups taken and tested?", a: "Encrypted backups run on a schedule and are held off the host with a retention period you choose. Restore drills are scheduled separately, timed and recorded, because an untested backup tells you nothing. The measured restore time is your real recovery time and it appears in the monthly report." },
      { q: "Can we get our data out?", a: "Yes, on request, as a full database and filestore export in a form another provider can take. That is in the agreement rather than at our discretion." },
      { q: "Do you host Odoo Community and Enterprise?", a: "Both. The hosting work is the same. The difference is licensing and which apps are available, and that is a decision worth taking with the consultancy service rather than at the hosting stage." },
      { q: "What do I need to run my own Odoo SaaS platform?", a: "Repeatable tenant provisioning, per-tenant backup and restore, a version policy so one customer cannot block the rest, monitoring across the fleet rather than per box, and a support model with defined response times. The technical part is the smaller half. The operating discipline is what decides whether it scales." },
      { q: "Can you take over hosting we already have?", a: "Yes. It starts with a review of what is there, a tested restore before anything is moved, and a migration into a maintenance window. Where the current provider will not cooperate, it takes longer, because we reconstruct the picture ourselves rather than guess at it." },
    ],
    modules: [
      { slug: "wt-db-backup-cloud", why: "Scheduled encrypted backups held somewhere other than the host, with restores that have actually been run." },
      { slug: "wt-debrand-odoo", why: "Platform operators selling under their own name need the branding replaced everywhere, not just on the login page." },
      { slug: "wt-theme-saas", why: "A platform needs a front door: pricing, plans and sign-up, without a separate website build." },
      { slug: "wt-audit-log", why: "Multi-tenant operations need a record of who changed what, particularly where your support staff can enter customer databases." },
      { slug: "wt-pwa-push", why: "Where tenants expect a mobile app experience, this avoids a separate mobile build per customer." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "germany", "united-kingdom", "united-states"],
    countryNote: "Data residency and hosting region are often decided locally. The country pages carry what applies in each market.",
    related: ["odoo-support", "odoo-consultancy", "odoo-migration", "odoo-audit", "odoo-implementation"],
  },

  "odoo-audit": {
    metaTitle: "Odoo Health Audit: Code, Database, Security and Workflow Review",
    metaDescription: "An independent audit of a live Odoo instance: code quality, database performance, security posture, workflow efficiency and licence exposure, with a written report and a ranked fix list.",
    lede: "An audit is worth buying when you need an independent answer, especially about work that someone else did.",
    intro: [
      "Most audits get commissioned for one of three reasons: the system has become slow and nobody can say why, a vendor relationship is ending and you need to know what you are inheriting, or an upgrade is being considered and the custom code is an unknown. All three need the same thing, which is somebody reading what is actually installed rather than what the documentation claims.",
      "The audit covers code quality and security, database health and performance, module inventory including what was installed and abandoned, workflow efficiency, and licence exposure. It is a read-only exercise. Nothing is changed on your system during it, so the findings can be discussed without anyone worrying about what we already did.",
      "The output is the published written report and an executive session, plus the part people use most: a ranked list of fixes with effort against each, so you can act on it with any vendor, including your current one.",
    ],
    phases: [
      {
        name: "Access and scoping",
        goal: "Get read access and agree what is being judged and against what.",
        work: [
          "Read-only database and code access, and a copy of the instance to work on where possible",
          "Agree the scope: technical only, functional only, or both",
          "Establish what triggered the audit, since that decides where to dig first",
          "Confirm what may be looked at and what is off limits, particularly with sensitive data",
        ],
        deliverable: "An agreed scope and working access, with nothing writeable.",
      },
      {
        name: "Technical review",
        goal: "Find out what the system is really made of.",
        work: [
          "Inventory of every installed module: standard, third-party, custom, and their sources",
          "Read the custom code for core edits, missing access rules, injection and permission risks, and upgrade blockers",
          "Database review: size, growth, index health, the queries that dominate load, table bloat",
          "Infrastructure review: backups and whether they have been restored, patch level, access control, certificates",
          "Integration review: error handling, retries, and whether failures are visible",
        ],
        deliverable: "A technical findings list, each item rated by severity and effort.",
      },
      {
        name: "Functional review",
        goal: "See where the configuration is fighting the business.",
        work: [
          "Compare the configured process against how people actually work, including the spreadsheets",
          "Find the manual steps that exist only because the system was never configured to do them",
          "Identify unused modules and abandoned configuration that still costs performance and confusion",
          "Check the reporting: what people use, what they rebuild by hand, and why",
        ],
        deliverable: "A functional findings list tied to the process it affects.",
      },
      {
        name: "Reporting",
        goal: "Deliver something that can be acted on rather than filed.",
        work: [
          "Written report covering every area in scope, with evidence behind each finding",
          "Findings ranked by business risk, with effort against each so they can be budgeted",
          "A short list of quick wins, separated from the structural items",
          "Plain-language summary for people who will not read the technical section",
        ],
        deliverable: "The written report, the ranked fix list, and an executive briefing session.",
      },
      {
        name: "Optional remediation",
        goal: "Fix the ranked list, with you choosing who does it.",
        work: [
          "Quick wins delivered as a short piece of work if you want them cleared immediately",
          "Structural items scoped as separate projects with their own estimates",
          "A re-audit after remediation where evidence of improvement is needed",
          "Handover to your own team or to another vendor where you prefer",
        ],
        deliverable: "A remediation plan you can execute with anyone.",
      },
    ],
    clientProvides: [
      "Read access to the database, the code and the hosting, or a full copy of the instance",
      "The source of every custom module, or written permission to obtain it",
      "A contact who can explain why the odd configuration decisions were made",
      "Your list of current complaints, since those point at where to look first",
      "Access to the reporting people actually use, including the spreadsheets that shadow the system",
      "Clarity on any data that must be masked before we work on a copy",
    ],
    decisions: [
      { title: "Technical, functional, or both", body: "A slow system is a technical audit. A system people avoid is a functional one. Most instances that get audited turn out to have both, and buying only one half tends to produce a report that explains the symptom rather than the cause." },
      { title: "Who sees the report", body: "An audit that names problems will implicate decisions someone made. Deciding the audience before it is written keeps it direct rather than diplomatic to the point of uselessness." },
      { title: "Whether to remediate with the incumbent", body: "The ranked list is written so any competent vendor can execute it. Keeping the incumbent is often the right call, and the report gives you the specifics to hold them to." },
      { title: "How deep to go on the custom code", body: "A full line-by-line review of a large custom estate is a bigger piece of work than a survey. The survey is right for an upgrade decision. The full review is right when you are taking ownership of the code." },
    ],
    failureModes: [
      { title: "An audit that changes things while looking", body: "Fixes applied during the review contaminate the findings and leave you unable to tell what was wrong from what we did. The audit is read-only, and remediation is separate." },
      { title: "Findings with no effort attached", body: "A list of two hundred issues with no cost against them cannot be budgeted, so it gets filed. Every finding carries a severity and an effort so a real plan comes out of it." },
      { title: "Symptom hunting", body: "Slowness reported as a fact leads to guesses. Load is measured, the dominant queries are identified, and the finding names the cause rather than the feeling." },
      { title: "Ignoring what people do outside the system", body: "The spreadsheets are the map of where the configuration failed. An audit that only reads the database misses the most useful evidence in the building." },
      { title: "A report written to be diplomatic", body: "Softened findings get ignored, then quoted back later when the problem is worse. Findings are written plainly, with the evidence attached, and the tone is managed by choosing the audience rather than by blurring the content." },
      { title: "No re-check after remediation", body: "Work gets done and nobody verifies it closed the finding. A re-audit is offered specifically so improvement can be evidenced rather than claimed." },
    ],
    outOfScope: [
      "Fixing what is found: remediation is quoted separately and you choose who does it",
      "Legal opinion on licence compliance, which we flag as exposure for your advisers to judge",
      "Penetration testing and formal security certification, which are specialist engagements",
      "Judging the commercial conduct of a previous vendor",
      "Reviewing code we are not permitted to see, which is recorded as an unknown rather than passed",
      "Ongoing monitoring, which belongs in a support agreement",
    ],
    pricingNote: "The audit is a fixed-price two-week engagement producing the written report and an executive briefing. Remediation is quoted separately from the ranked list, item by item, so you can take part of it or none of it.",
    faqs: [
      { q: "What do we actually get?", a: "A written report covering every area in scope, with evidence behind each finding, a ranked fix list with effort against each item so it can be budgeted, a separate quick-wins list, and a briefing session for the people who will not read the technical section." },
      { q: "Will you change anything on our system?", a: "No. The audit is read-only, usually on a copy. That is deliberate: findings you can discuss without wondering what we already touched are worth more, and it keeps the remediation decision genuinely yours." },
      { q: "Can you audit work done by another partner?", a: "Yes, and it is one of the most common reasons the audit is bought. The report describes what is there and what it will cost to fix, not who to blame. It is written so you can hand it to the incumbent and hold them to specifics." },
      { q: "How long does it take?", a: "Two weeks for the standard engagement, driven mostly by how much custom code there is and how quickly access arrives. Access delays are the usual reason an audit runs long." },
      { q: "Is this useful before an upgrade?", a: "Very. The single biggest unknown in an upgrade quote is the state of the custom code, and the audit turns that into a per-module effort figure. That is why it is often bought as the first step of a migration decision rather than as a separate exercise." },
      { q: "What if the report says our system is fine?", a: "Then you have an independent answer and you stop guessing, which is worth the fee on its own. It happens. What is more common is that the system is sound and the problem is a handful of specific things, which is a much better position than a general unease about the whole thing." },
    ],
    modules: [
      { slug: "wt-audit-log", why: "A common finding is that nobody can tell who changed a record. This closes it directly." },
      { slug: "wt-db-backup-cloud", why: "Unverified backups are the single most frequent serious finding, and this is the usual remediation." },
      { slug: "wt-stock-aging", why: "Inventory findings often need aged stock visible before anyone can act on the recommendation." },
      { slug: "wt-dynamic-financial-reports", why: "Where finance rebuilds reports in spreadsheets, that is the finding, and closing it removes the shadow process." },
      { slug: "wt-dashboard-builder", why: "Audits routinely find that managers cannot see their own numbers, which is why the shadow reporting exists." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "pakistan", "india", "united-kingdom", "united-states", "australia"],
    countryNote: "An audit checks that local accounting and payroll setup is current. The country pages set out what that means where you are.",
    related: ["odoo-consultancy", "odoo-migration", "odoo-support", "odoo-customization", "odoo-saas-hosting"],
  },

  /* ───────────── COMPLIANCE ───────────── */
  "odoo-localization": {
    metaTitle: "Odoo Localization: Country Setup, Layouts and Local Reporting",
    metaDescription: "How an Odoo localization engagement runs: requirement confirmation with your adviser, chart of accounts, document layouts, bilingual output, testing and the maintenance that follows.",
    lede: "Localization is a delivery job with an adviser attached. Your accountant states the requirement, we configure it and prove it in the system.",
    intro: [
      "Every localization engagement has the same shape regardless of the country. Somebody who is professionally accountable, your accountant, auditor or in-house finance lead, states what the local requirement is. We configure the system to produce it, test it against documents they will recognise, and show them the trail from a transaction to the output. Then we agree who watches for changes, because local requirements move and a system that was correct last year is not automatically correct now.",
      "What we do not do is decide the requirement. Nobody should take a rate, a threshold or a filing obligation from a software vendor, and we will not put one in a proposal. Where the specifics matter, our country pages set out what applies in each market and those pages are sourced and reviewed separately. This page is about how the work runs.",
      "The parts that consume the time are rarely the tax settings themselves. They are the chart of accounts, the document layouts, the bilingual output where two languages have to sit on one page, and the reconciliation that proves the reports agree with the ledger.",
    ],
    phases: [
      {
        name: "Requirement confirmation",
        goal: "Get the local requirement stated by someone professionally accountable for it.",
        work: [
          "Work from your accountant, auditor or in-house finance lead, in writing",
          "Establish the reports and outputs that have to come out of the system, and who receives them",
          "Confirm the document formats your customers and authorities expect to see",
          "Record the source of each requirement, so a later change can be traced to it",
        ],
        deliverable: "A written requirement list, each item attributed to the person who confirmed it.",
      },
      {
        name: "Chart of accounts and structure",
        goal: "Land the accounting structure before anything posts into it.",
        work: [
          "Set up the local chart of accounts and map your existing codes onto it",
          "Configure the tax setup as confirmed by your adviser, and label each item to match their terminology",
          "Set fiscal positions so the right treatment applies by customer and by transaction type",
          "Agree the analytic structure, because local reporting often needs a cut the ledger alone will not give",
        ],
        deliverable: "A configured accounting structure, reviewed by your adviser before transactions begin.",
      },
      {
        name: "Documents and layouts",
        goal: "Produce documents your customers, auditors and authorities recognise.",
        work: [
          "Build the invoice, credit note and statement layouts against the format your adviser confirmed",
          "Set up bilingual output where two languages must appear on the same document",
          "Handle right-to-left layout properly, including totals blocks, tables and numerals",
          "Check sequence and numbering rules, since these are frequently prescribed locally",
        ],
        deliverable: "Approved document templates, signed off on printed and digital samples.",
      },
      {
        name: "Testing and reconciliation",
        goal: "Prove the output matches the ledger and matches expectations.",
        work: [
          "Run a full period of representative transactions through to the reports",
          "Reconcile each report against the underlying ledger, line by line for the awkward cases",
          "Test the exceptions: credit notes, foreign currency, exempt and out-of-scope items, corrections",
          "Have your adviser review the output before it is used in anger",
        ],
        deliverable: "A reconciliation pack and written sign-off from your adviser.",
      },
      {
        name: "Handover and maintenance",
        goal: "Keep it correct after the project ends.",
        work: [
          "Document what was configured and why, with the requirement source against each item",
          "Train the finance team on the periodic routine, not just on data entry",
          "Agree who watches for local changes and how a change reaches us",
          "Set the review point, so the setup is re-checked on a schedule rather than when something fails",
        ],
        deliverable: "Configuration documentation, a trained finance team and a named owner for changes.",
      },
    ],
    clientProvides: [
      "Your accountant, auditor or finance lead, available and willing to confirm requirements in writing",
      "Your registration details and the identifiers that have to appear on documents",
      "Samples of the documents you issue today, and any format your customers insist on",
      "Your existing chart of accounts and the mapping you want onto the local one",
      "Opening balances and the period from which the new setup applies",
      "A decision on which languages appear on customer-facing output",
    ],
    decisions: [
      { title: "Which entity the setup applies to", body: "Groups often need different setups per company in one database. Deciding that up front prevents a structure that has to be unpicked after posting has started." },
      { title: "How closely to follow the standard local chart", body: "Following it makes local reporting straightforward and your group reporting harder. Following your group chart does the reverse. Most groups need a mapping between the two, and that mapping is a decision to make early." },
      { title: "Which languages appear on documents", body: "Bilingual output is a layout problem as much as a translation problem, and adding the second language later means rebuilding templates. Decide before the templates are built." },
      { title: "Who owns changes after go-live", body: "Local requirements change. Somebody has to be watching, and it should be a named person on your side with a route to us, not an assumption that we monitor every market for every client." },
    ],
    failureModes: [
      { title: "Requirements taken from a software vendor", body: "Vendors are not accountable for your filings and should not be the source of your obligations. Every requirement is attributed to the adviser who confirmed it, in writing, before it is configured." },
      { title: "Configuring before the chart of accounts is settled", body: "Changing the chart after posting begins is one of the most expensive corrections in an ERP. It comes first, and your adviser signs it off." },
      { title: "Layouts built and approved from a screen", body: "A layout that looks right in a browser can break on a printed page or in a generated file, particularly with mixed scripts. Approval is on real output in the real format." },
      { title: "Right-to-left treated as a translation task", body: "Mirroring the interface is the easy part. Totals blocks, tables, mixed numerals and printed alignment all need testing on their own, and they are what a reviewer notices immediately." },
      { title: "Reports never reconciled to the ledger", body: "A report that runs without error can still disagree with the accounts, and that is discovered under the worst conditions. Reconciliation is a phase, not a spot check." },
      { title: "No owner for local changes", body: "The setup silently ages. A named owner and a scheduled review are the difference between an adjustment and a scramble." },
    ],
    outOfScope: [
      "Determining your tax obligations: that comes from your accountant, auditor or adviser, not from us",
      "Filing or submitting anything on your behalf",
      "Legal or tax opinions of any kind",
      "Fees charged by any authority, agent or certified provider",
      "Backdated correction of historical filings",
      "Monitoring every market for regulatory change unless that is contracted explicitly",
    ],
    pricingNote: "Localization is quoted per entity and per country, because a second company in the same country is much less work than a second country. Where it sits inside an implementation it is scoped as part of that project rather than billed separately.",
    faqs: [
      { q: "Do you decide what our tax setup should be?", a: "No. Your accountant, auditor or finance lead states the requirement and we configure and prove it in the system. Software vendors are not accountable for your filings, and any vendor who tells you what your obligations are is taking a position they cannot stand behind." },
      { q: "Where do I find what applies in my country?", a: "On our country pages. They are maintained separately, sourced and reviewed, and they set out what applies in each market. This page deliberately carries none of that detail, because process content and regulatory content should not be written by the same hand or updated on the same schedule." },
      { q: "How long does localization take?", a: "It depends far more on how quickly your adviser confirms requirements than on the configuration. Where someone is available and decisive it moves quickly. Where the requirement has to be chased, that becomes the schedule." },
      { q: "What happens when local requirements change?", a: "Somebody has to be watching, and we agree who at handover. Under a support agreement we act on the change once it reaches us. Without one it is quoted when it arises. What does not work is both sides assuming the other is monitoring." },
      { q: "Can one database handle several countries?", a: "Yes, with separate companies configured per country and a mapping between the local charts and your group chart. It needs designing at the start, because retrofitting a second country onto a structure built for one is significantly more work than doing it up front." },
      { q: "Do you handle Arabic and bilingual documents?", a: "Yes. Bilingual layout, right-to-left handling and mixed-script output are a normal part of this work. They are treated as a layout problem rather than a translation problem, and approval happens on real printed and generated output rather than on a screen." },
    ],
    modules: [
      { slug: "wt-dynamic-financial-reports", why: "Local reporting usually needs comparison periods and exports that the base reporting does not give, and building each report bespoke is the expensive path." },
      { slug: "wt-bank-statement-import", why: "Local bank formats are one of the first practical problems a newly localized finance team hits." },
      { slug: "wt-documents-dms", why: "Local record-keeping means a document has to be findable years later by someone who was not there, with its versions intact." },
      { slug: "wt-account-asset", why: "Asset registers are a common gap on Community and appear on most localized finance setups." },
      { slug: "wt-audit-log", why: "Reviewers ask who changed a posted document. Having the answer without a database query saves a lot of time." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "kuwait", "oman", "bahrain", "pakistan", "india", "bangladesh", "egypt", "jordan", "turkey", "united-kingdom", "germany", "france", "united-states", "canada", "australia"],
    countryNote: "Every specific rate, scheme and format lives on the country pages, which are sourced and reviewed separately from this one.",
    related: ["odoo-e-invoicing", "odoo-payroll-setup", "odoo-implementation", "odoo-consultancy", "odoo-audit"],
  },

  "odoo-e-invoicing": {
    metaTitle: "E-invoicing Enablement for Odoo: Build, Test and Go-Live",
    metaDescription: "How an e-invoicing project runs in Odoo: confirming the requirement with your adviser, data readiness, sandbox testing, failure handling, archiving and the monitoring that follows.",
    lede: "E-invoicing turns invoicing into an integration. The invoice is no longer finished when you print it, and the project has to be designed around that.",
    intro: [
      "The change that catches teams out is not the file format. It is that an external system now has an opinion about your invoice. Something can be rejected, held, or accepted only after a delay, which means invoicing acquires states it never had before, and somebody has to own the ones that go wrong.",
      "So the design work is mostly about failure handling and data readiness. Master data that was good enough for a printed invoice is often not good enough to pass validation, and that is discovered in bulk on the first day unless it is checked in advance. We check first, fix at source, then build.",
      "As with all compliance work, the requirement comes from your accountant, auditor or adviser and from the official documentation, not from us. The specifics for each market are on the country pages. This page is about how the project runs.",
    ],
    phases: [
      {
        name: "Requirement and readiness",
        goal: "Confirm what has to be produced and whether your data can produce it.",
        work: [
          "Requirement confirmed in writing by your adviser and against the official documentation",
          "Profile your master data against the fields the output needs, and count the gaps",
          "Establish which transaction types are in scope and which are handled differently",
          "Identify who on your side owns a rejected document, since that role usually does not exist yet",
        ],
        deliverable: "A confirmed requirement, a data gap report with counts, and a named owner for exceptions.",
      },
      {
        name: "Data remediation",
        goal: "Fix the master data before it fails validation in front of customers.",
        work: [
          "Bulk correction at source for the fields the output requires",
          "Validation added at entry so the same gaps do not reappear next month",
          "Historical records assessed: which have to be corrected and which can stay as they are",
          "A repeatable check that can be run again before go-live",
        ],
        deliverable: "Clean master data and an entry-time check that keeps it clean.",
      },
      {
        name: "Build and sandbox testing",
        goal: "Produce and submit real documents in a test environment before any of it counts.",
        work: [
          "Generate the output for each in-scope document type and validate it against the published schema",
          "Connect to the test environment and submit, then read what comes back carefully",
          "Handle the response states properly: accepted, accepted with warnings, rejected, and pending",
          "Store the identifiers and responses against the document, so status is visible where users work",
          "Test the awkward cases: credit notes, corrections, foreign currency, discounts, mixed treatments",
        ],
        deliverable: "Successful test submissions covering every in-scope document type, with evidence.",
      },
      {
        name: "Exception and archive design",
        goal: "Decide what happens on a bad day, before there is one.",
        work: [
          "Queue and retry for transient failures, with a dead-letter path and an alert for the rest",
          "A clear work list of documents needing human attention, owned by a named role",
          "Archiving of the submitted output and the responses in a form that survives system changes",
          "Reconciliation between what was issued in the ledger and what was submitted",
        ],
        deliverable: "A working exception process, an archive, and a scheduled reconciliation.",
      },
      {
        name: "Go-live and monitoring",
        goal: "Switch over with someone watching, then keep watching.",
        work: [
          "Phase by document type or by entity where the process allows it",
          "Daily review of the exception list during the first period",
          "Alerting on submission failures and on queue age, since these fail quietly",
          "Train the finance team on the exception handling, not just on issuing an invoice",
        ],
        deliverable: "Live submission with monitoring, an exception routine and a trained team.",
      },
    ],
    clientProvides: [
      "Your adviser, to confirm the requirement in writing and to review the output",
      "Registration details, credentials and any certificates the process needs, obtained by you",
      "Master data ownership on your side, to approve bulk corrections",
      "A named person who will own rejected and pending documents daily",
      "Sample documents your customers already accept, and any format they insist on",
      "A decision on how long submitted output and responses must be retained",
    ],
    decisions: [
      { title: "Who owns the exception list", body: "Rejections need a human every day. If that is nobody, the list grows until it is a project. This role has to be named before go-live, not discovered after it." },
      { title: "Phase or switch everything at once", body: "Phasing by document type or entity keeps the first week small enough to manage. It costs a longer period of running two routines, and that is a real cost worth weighing honestly." },
      { title: "How much historical data to correct", body: "Correcting everything is thorough and slow. Correcting only what will be issued going forward is faster and leaves older records inconsistent. This is a reporting and audit decision, so your adviser should make it." },
      { title: "Where the archive lives", body: "The archive has to outlive the current system and stay readable by someone who was not there when it was created. That is an infrastructure decision with a long horizon, and it belongs in the design rather than at the end." },
    ],
    failureModes: [
      { title: "Data quality discovered on go-live day", body: "Master data that was fine for a printed invoice fails validation in bulk, and it happens in front of customers. Data is profiled and corrected before the build, not after the first rejection." },
      { title: "No owner for rejections", body: "Rejected documents pile up because they belong to everybody. A named role with a daily routine is the difference between a work list and a backlog." },
      { title: "Only the simple invoice tested", body: "Credit notes, corrections, foreign currency and mixed treatments behave differently and are exactly what breaks in month two. Every in-scope document type is tested in the sandbox." },
      { title: "Submission failures that are invisible", body: "A failed submission with no alert becomes a compliance problem weeks later. Failures alert, and a reconciliation compares what was issued against what was submitted." },
      { title: "Archive as an afterthought", body: "Storing output only inside the live database ties your records to the life of that database. The archive is designed to be portable and readable independently." },
      { title: "Training that stops at issuing an invoice", body: "The new skill is handling the exception, not pressing send. Training targets the exception routine, because that is the part that is genuinely new." },
    ],
    outOfScope: [
      "Determining whether and when the requirement applies to you: that is your adviser's call",
      "Obtaining registrations, credentials or certificates on your behalf",
      "Fees charged by any authority, agent, certified provider or service",
      "Filing, submitting or correcting historical periods for you",
      "Legal or tax opinions",
      "Guaranteeing acceptance by a system whose validation rules are outside our control",
    ],
    pricingNote: "Quoted per entity and per document type in scope, after the data readiness check, because a quote written before anyone has looked at the master data is a guess. Ongoing monitoring and change handling belong in a support agreement.",
    faqs: [
      { q: "What is different about invoicing once this is live?", a: "The invoice is no longer finished when it is printed. It acquires states it never had before: submitted, accepted, rejected, pending. Those states need to be visible where your team works, and somebody has to own the ones that are not accepted. That role is the part most projects underestimate." },
      { q: "Which countries and formats do you support?", a: "Our country pages list what applies in each market and are maintained separately from this page. The delivery approach is the same regardless of destination: confirm the requirement with your adviser, profile the data, test in the sandbox, design the failure handling, then go live with monitoring." },
      { q: "What is the most common cause of delay?", a: "Master data, by a wide margin. Records that were perfectly adequate for a printed document turn out to be missing fields the output requires, and there are usually more of them than anyone expects. That is why readiness is profiled before the build starts." },
      { q: "What happens if a document is rejected?", a: "It goes on an exception list with the reason attached, and a named person works that list daily. Transient failures retry automatically with backoff. Anything needing a decision waits for a human rather than being silently dropped." },
      { q: "How long do we have to keep the output?", a: "Your adviser sets the retention period. What we handle is making sure the submitted output and the responses are archived in a portable form that stays readable independently of the current system, since retention periods usually outlast software." },
      { q: "Can this be added to an existing Odoo instance?", a: "Yes, and most of these projects are exactly that. It starts with the same data readiness check, which on an established instance with years of history typically finds more to fix than on a new one." },
    ],
    modules: [
      { slug: "wt-documents-dms", why: "Submitted output and responses have to be findable years later, with versions, by someone who was not there." },
      { slug: "wt-audit-log", why: "Reviewers ask who changed a document before it was submitted. Having the answer without a database query saves hours." },
      { slug: "wt-import-export", why: "The data remediation phase is a bulk correction job, and doing it by hand is where these projects lose weeks." },
      { slug: "wt-duplicate-partner", why: "Duplicate customer records are a frequent cause of validation problems, and catching them at creation is the cheap fix." },
      { slug: "wt-partner-auto-ref", why: "Consistent partner references make reconciliation between issued and submitted documents far easier to automate." },
    ],
    countries: ["saudi-arabia", "uae", "india", "egypt", "jordan", "turkey", "france", "germany", "bangladesh", "united-kingdom"],
    countryNote: "The scheme, format and timetable for each market are on the country pages, which are sourced and reviewed separately from this one.",
    related: ["odoo-localization", "odoo-implementation", "odoo-integration", "odoo-support", "odoo-audit"],
  },

  /* ───────────── HR ───────────── */
  "odoo-payroll-setup": {
    metaTitle: "Odoo Payroll Setup: Rule Books, Parallel Runs and Handover",
    metaDescription: "How a payroll configuration project runs: rule capture from your policy and adviser, structure build, parallel runs against known payslips, bank output, and handover to your team.",
    lede: "Payroll is the one system where being nearly right is the same as being wrong. It is proved by parallel running, not by demonstration.",
    intro: [
      "Payroll projects are judged on a single question: does it produce the same payslip your existing process produces, for every employee, including the awkward ones. Nothing else counts, and no amount of configuration review substitutes for running both systems side by side on the same period and reconciling to the last unit.",
      "The rule book comes from two places, and neither is us. Your employment policy supplies the company-specific rules: allowances, grades, overtime treatment, leave encashment, loans, notice arrangements. Your accountant or payroll adviser supplies the statutory side. We turn both into rules the system executes, and we make the trace from a rule to a payslip line visible so any figure can be explained.",
      "The part that decides whether it lasts is handover. Payroll that only we can change is a dependency you will resent within a year. Your team must be able to add an allowance, adjust a grade and run a period without calling anyone.",
    ],
    phases: [
      {
        name: "Rule capture",
        goal: "Get every rule written down, including the ones that live in somebody's head.",
        work: [
          "Work through the employment policy line by line for the company-specific rules",
          "Take the statutory rules from your accountant or payroll adviser, in writing",
          "Interview whoever runs payroll today about the exceptions, since those are never documented",
          "List every allowance, deduction, loan type and one-off that appears across a full year",
          "Establish the rounding, proration and sequencing rules, which is where most differences originate",
        ],
        deliverable: "A written rule book with each rule attributed to its source.",
      },
      {
        name: "Structure build",
        goal: "Build the salary structures so a figure can always be explained.",
        work: [
          "Salary structures per employee category, with the rule sequence made explicit",
          "Grades and bands mapped, with the inputs that drive each rule",
          "Loans, advances and recoveries configured with their schedules",
          "Leave and attendance inputs connected, since these are the usual source of monthly variance",
          "A dry run capability so a period can be previewed before anyone is paid",
        ],
        deliverable: "Configured structures with a documented rule sequence and a working preview.",
      },
      {
        name: "Parallel run",
        goal: "Prove it against payslips you already know are right.",
        work: [
          "Run a completed period in the new system and compare to the existing output, employee by employee",
          "Investigate every difference, including the small ones, because small differences hide rule errors",
          "Include the awkward cases deliberately: joiners, leavers, unpaid leave, mid-period changes, arrears",
          "Repeat until two consecutive periods reconcile with no unexplained differences",
        ],
        deliverable: "A reconciliation showing two clean consecutive periods.",
      },
      {
        name: "Outputs and integration",
        goal: "Make everything downstream of the payslip work.",
        work: [
          "Payslip layout approved by the people who will hand it to employees",
          "Bank output produced in the format your bank accepts, and tested with the bank before go-live",
          "Accounting posting configured, so payroll lands in the ledger without re-keying",
          "Access rights checked carefully, since payroll is the most sensitive data in the system",
          "Employee self-service enabled if you want payslip distribution handled by the system",
        ],
        deliverable: "Approved payslips, a bank file the bank has accepted, and posted accounting entries.",
      },
      {
        name: "Handover",
        goal: "Leave your team able to run and change it.",
        work: [
          "Train the payroll team on the monthly routine including the corrections",
          "Train someone to add an allowance and adjust a structure without calling us",
          "Document the rule book as configured, with the source of each rule",
          "Agree who watches for statutory change and how that reaches the system",
        ],
        deliverable: "A trained team, documented rules and a named owner for changes.",
      },
    ],
    clientProvides: [
      "The employment policy, including the parts that exist only as custom and practice",
      "Statutory rules confirmed in writing by your accountant or payroll adviser",
      "Completed payslips for at least two periods, for the parallel run",
      "Employee master data: grades, contracts, bank details, joining dates, entitlements",
      "The bank output format your bank actually accepts, obtained from them",
      "A decision on who may see payroll data, which is stricter than for any other module",
    ],
    decisions: [
      { title: "How many salary structures", body: "One per employee category keeps rules readable and the reconciliation explainable. One structure with many conditional rules is compact and becomes unmaintainable within a year, usually just after the person who built it moves on." },
      { title: "Where variable inputs come from", body: "Overtime, unpaid leave and attendance adjustments can be entered manually or driven from the attendance and leave records. Driving them from records removes the largest source of monthly error, and it means those records have to be trusted first." },
      { title: "How much history to load", body: "Year-to-date figures matter if you go live mid-year, and loading them is real work. Going live at the start of a cycle avoids it entirely, which is often worth waiting for." },
      { title: "Self-service or manual distribution", body: "Employee self-service removes a monthly task and adds an access-rights question. Both are fine, but it should be a decision rather than a default." },
    ],
    failureModes: [
      { title: "Going live without a parallel run", body: "Payroll errors are personal, visible and remembered. Two consecutive periods reconciling with no unexplained difference is the entry condition for go-live, and there is no substitute for it." },
      { title: "Rules taken from memory", body: "The person who runs payroll today knows exceptions that appear nowhere in the policy, and they surface in month three. The rule capture interview exists specifically to get those out." },
      { title: "Only the standard employee tested", body: "Joiners, leavers, unpaid leave, mid-period grade changes and arrears are where differences live. They go into the parallel run deliberately rather than being met live." },
      { title: "Rounding and sequence ignored", body: "Two systems can apply the same rules and disagree because they round differently or apply rules in a different order. That is captured explicitly, because it is the most common source of small differences that turn out to matter." },
      { title: "Bank output tested only against a specification", body: "Banks reject files for reasons that are not in their own documentation. The file is tested with the bank before go-live, not on the first pay run." },
      { title: "Access rights left loose", body: "Payroll is the fastest way to lose the trust of a workforce. Access is designed at the start and verified before real data is loaded." },
      { title: "Nobody able to change a rule", body: "If every allowance change is a support ticket, the system becomes a bottleneck and workarounds appear in spreadsheets. Handover includes making a change, not watching one." },
    ],
    outOfScope: [
      "Determining statutory rules: those come from your accountant or payroll adviser in writing",
      "Filing, submission or correspondence with any authority",
      "Legal or employment advice, including on contracts and entitlements",
      "Correcting historical payroll errors from the previous system",
      "Bank charges, service fees and any provider costs",
      "Ongoing monthly payroll processing, which is a service arrangement and not a configuration project",
    ],
    pricingNote: "Quoted per entity, driven by the number of salary structures and the complexity of the rule book rather than by headcount. The parallel run is part of the scope and not an optional extra, because a payroll build that has not been reconciled has not been finished.",
    faqs: [
      { q: "How do you know the payroll is correct?", a: "Parallel running. The new system produces a completed period, and it is compared employee by employee against the payslips you already issued. Every difference is investigated, including small ones, because a rounding difference on one employee usually means a rule is wrong for a category. Two consecutive clean periods is the entry condition for go-live." },
      { q: "Where do the statutory rules come from?", a: "Your accountant or payroll adviser, in writing. We configure and prove them in the system, we do not decide them. Statutory detail for each market is on the country pages, which are sourced and maintained separately from this page." },
      { q: "Can our team change salary rules afterwards?", a: "That is the point of the handover phase. Someone on your side should be able to add an allowance and adjust a structure without calling us. Payroll that only the vendor can change becomes a bottleneck within a year, and the workarounds always end up in a spreadsheet." },
      { q: "What about bank payment files?", a: "The file is produced in the format your bank accepts and tested with the bank before go-live. Testing against the written specification alone is not enough, because banks reject files for reasons their documentation does not mention." },
      { q: "When is the best time to go live?", a: "At the start of a cycle. Going live mid-year means loading year-to-date figures for every employee, which is real work and a real source of error. Waiting for the cycle boundary is usually cheaper than the alternative." },
      { q: "Does payroll post to accounting automatically?", a: "Yes, once configured, with each rule mapped to the accounts your finance team specifies. It is worth doing during the same project, because manual re-keying of payroll into the ledger is both slow and the point where reconciliation quietly breaks." },
    ],
    modules: [
      { slug: "wt-hrms-payroll", why: "The rule engine most of this work is configured in, with the dry-run preview a parallel run depends on." },
      { slug: "wt-hrms-payroll-accounting", why: "Posting payslips to the ledger without re-keying is what keeps payroll and finance reconciled." },
      { slug: "wt-hrms-payroll-bank-files", why: "Disbursement files are the last mile of every payroll go-live, and the part banks are fussiest about." },
      { slug: "wt-hrms-loans", why: "Loan and advance recovery is one of the most common company-specific rules, and it needs a schedule rather than a manual deduction." },
      { slug: "wt-hrms-overtime", why: "Overtime is the largest source of monthly variance, and driving it from approved requests removes most payroll disputes." },
      { slug: "wt-hrms-attendance", why: "Variable inputs are only as good as the attendance data behind them, which is why that gets settled before the first parallel run." },
      { slug: "wt-salary-package-configurator", why: "Where offers are made against a package rather than a basic figure, building the offer on the same rules avoids a mismatch at the first payslip." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "kuwait", "oman", "bahrain", "pakistan", "india", "united-kingdom", "canada", "australia"],
    countryNote: "Statutory rules differ by market and belong on the country pages, which are sourced and reviewed separately from this one.",
    related: ["odoo-localization", "odoo-implementation", "odoo-training", "odoo-support", "odoo-customization"],
  },

  /* ───────────── RETAIL ───────────── */
  "odoo-pos-deployment": {
    metaTitle: "Odoo POS Deployment for Retail, Restaurants and Services",
    metaDescription: "Rolling out Odoo POS across sites: hardware proving, menu and product setup, offline behaviour, staff training, a pilot store, and the multi-site rollout that follows.",
    lede: "A POS rollout is judged at the counter during the busiest hour. Everything in the plan works backwards from that.",
    intro: [
      "Back-office software gets a second chance. A till does not. If it is slow, if the receipt printer stalls, if the connection drops and the queue stops moving, the staff invent a workaround the same day and you spend the next month unpicking it. So the whole approach is built around what happens at the counter under pressure, not around a feature list.",
      "Two things decide the outcome more than anything else. Hardware has to be proved with the actual devices you will use, because printers, scanners, scales and payment terminals behave differently in the room than in a specification. And the offline behaviour has to be demonstrated to the staff, not just enabled, so nobody panics when the connection drops.",
      "We prove it in one pilot site first, run it through a full trading week including the busy periods, and only then roll out. A pilot that has survived a Saturday is worth more than any amount of testing on a quiet weekday.",
    ],
    phases: [
      {
        name: "Site and operations survey",
        goal: "Understand the counter before configuring anything.",
        work: [
          "Observe an actual shift: what happens at peak, what the exceptions are, where the queue forms",
          "Inventory the hardware in use and the connectivity at each site, including the wireless coverage",
          "Establish the payment methods actually taken, including the informal ones",
          "Identify the operations that must work offline, since these differ by business",
        ],
        deliverable: "A site profile per location with hardware, connectivity and peak-hour observations.",
      },
      {
        name: "Product, menu and pricing setup",
        goal: "Build a till layout the staff can work at speed.",
        work: [
          "Product or menu structure organised for speed of selection, not for the accountant's hierarchy",
          "Variants, modifiers, combos and options set up the way orders are actually taken",
          "Pricing, promotions and loyalty configured, and tested against real till scenarios",
          "Screen layout arranged so the top sellers are reachable without hunting",
        ],
        deliverable: "A configured till layout reviewed by the people who will use it.",
      },
      {
        name: "Hardware proving",
        goal: "Prove the physical setup with the actual devices, at the actual site.",
        work: [
          "Receipt printers, kitchen printers, scanners, scales and cash drawers tested end to end",
          "Payment terminal integration tested including the failure cases: declines, timeouts, partial payments",
          "Display and kitchen screens verified in position, under the real lighting and the real noise",
          "Connectivity tested at the counter, not at the office router",
        ],
        deliverable: "A signed hardware checklist per site, with model numbers recorded.",
      },
      {
        name: "Pilot store",
        goal: "Run a full trading week on one site before committing the estate.",
        work: [
          "Train the pilot staff and let them run real trading, with support present at peak",
          "Deliberately drop the connection during a quiet period so staff see offline behaviour working",
          "Reconcile the till against cash and against the ledger daily during the pilot",
          "Collect the changes the staff ask for, and apply the ones that survive a second look",
        ],
        deliverable: "A pilot site trading normally, with a punch list cleared and a reconciliation history.",
      },
      {
        name: "Multi-site rollout",
        goal: "Repeat the pilot as a routine, not as a fresh project per site.",
        work: [
          "A per-site checklist covering hardware, network, staff training and opening-day support",
          "Configuration held centrally so a change does not have to be repeated per till",
          "Store-level reporting and reconciliation set up as sites come on",
          "Support presence for the first trading day at each site, tapering as the pattern proves itself",
        ],
        deliverable: "Every site live on a repeatable checklist, with central reporting across the estate.",
      },
    ],
    clientProvides: [
      "Access to the sites during trading, so we can observe the real operation rather than a description of it",
      "The exact hardware models in use or planned, since compatibility is decided by model and not by category",
      "Product or menu data with prices, including the modifiers and options",
      "Staff availability for training, scheduled around trading rather than in the middle of it",
      "Merchant details for the payment terminals, obtained from your provider",
      "A decision on which site is the pilot, and a commitment not to skip it",
    ],
    decisions: [
      { title: "Which site pilots", body: "The instinct is the quietest site, and it is the wrong one. A moderately busy site with capable staff exposes the real problems while there is still time to fix them, which is what a pilot is for." },
      { title: "How much the till can do without a connection", body: "Full offline selling is achievable and it constrains what else the till can do live. What has to keep working when the line drops is a business decision, and it should be an explicit one." },
      { title: "One product structure or per-site variation", body: "Central control keeps the estate consistent and makes reporting comparable. Per-site freedom suits businesses whose sites genuinely differ. Choosing accidentally is the problem, not choosing either." },
      { title: "How payments are reconciled", body: "Terminal totals, cash counts and the ledger have to agree at the end of every day. Deciding who reconciles and how before go-live is what stops small differences becoming a monthly investigation." },
    ],
    failureModes: [
      { title: "Hardware assumed rather than proved", body: "Devices that meet a specification still misbehave in the room. Every printer, scanner, scale and terminal is tested at the site with the model you will actually use, and the model numbers go on the checklist." },
      { title: "Configuring for the accountant instead of the cashier", body: "A till organised by the reporting hierarchy is slow to use, and slow means a queue. The layout is built for speed of selection and reviewed by the staff who work it." },
      { title: "Offline mode enabled but never demonstrated", body: "Staff who have not seen the connection drop will assume the system is broken and start writing on paper. It is demonstrated deliberately during the pilot, in a quiet period." },
      { title: "Rolling out without a pilot", body: "Every problem gets multiplied by the number of sites, on the same day. The pilot runs a full trading week including the busy periods, and the rollout waits." },
      { title: "Training during a shift", body: "Nobody learns anything while serving customers. Training is scheduled outside trading, and someone is present at the counter on the first busy day." },
      { title: "Ignoring the exceptions at the counter", body: "Refunds, exchanges, voids, split bills and staff discounts are where the workarounds start. They are configured and taught rather than left for staff to work out themselves." },
      { title: "No daily reconciliation", body: "Small differences accumulate quietly until a month has to be investigated. Daily till reconciliation is set up as part of the rollout, not added when the first problem appears." },
    ],
    outOfScope: [
      "Hardware supply, cabling and network installation, which are quoted separately or bought by you",
      "Payment provider contracts, merchant onboarding and terminal fees",
      "Site works, furniture and counter layout",
      "Menu photography, product imagery and printed signage",
      "Trading losses during rollout: we manage risk with a pilot, we do not carry it",
      "Ongoing till support, which belongs in a support agreement",
    ],
    pricingNote: "Priced as a first-site build plus a per-site rollout figure, because the second site costs a fraction of the first once the checklist exists. Hardware, terminals and network work sit outside the software quote.",
    faqs: [
      { q: "Does Odoo POS work offline?", a: "Yes, and it should be demonstrated to staff before go-live rather than described to them. How much the till can still do without a connection is a design decision worth making explicitly, because it constrains other things the till can do while online." },
      { q: "Which hardware do you support?", a: "Compatibility is decided by exact model rather than by category, which is why hardware proving is its own phase. Tell us the models you have or plan to buy and we test them at the site. Devices that meet a written specification still behave differently in the room." },
      { q: "How long does a multi-site rollout take?", a: "The first site takes the longest because it produces the checklist. After that, sites go live on a repeatable routine and the pace is set by staff availability and by how many opening days you want covered, rather than by configuration." },
      { q: "Can we run different industries on one system?", a: "Yes. Retail, restaurant, salon, clinic and similar operations run on the same platform with different configuration, and a group with mixed formats can hold them in one database with shared reporting. The setup per format is genuinely different, so each needs its own pilot rather than a copy of another." },
      { q: "What about local fiscal requirements at the till?", a: "Those vary by market and are covered on our country pages, which are sourced and maintained separately. Where they apply, they are settled before the pilot rather than after, because retrofitting them across an estate is far more work than including them at the start." },
      { q: "Do you support kitchen displays and table service?", a: "Yes. Kitchen displays, preparation screens, table plans and reservations are normal parts of a restaurant rollout. They belong in the pilot, because the pacing between the counter and the kitchen is exactly the thing that only shows up under real service." },
    ],
    modules: [
      { slug: "wt-pos-dashboard", why: "Multi-site operators need comparable numbers per store, and that is usually the first thing asked for after go-live." },
      { slug: "wt-pos-kitchen-display", why: "Restaurant rollouts live or die on the pacing between counter and kitchen, which needs screens rather than printed tickets." },
      { slug: "wt-pos-table-reservation", why: "Table service sites need bookings and table combination handled before the pilot, not bolted on after." },
      { slug: "wt-restaurant-management", why: "Multi-outlet food operations need recipe costing and outlet-level control beyond what a till alone gives." },
      { slug: "wt-odoo-pos-delivery", why: "Delivery is a normal part of retail and food operations now, and driver handling has to be part of the till flow." },
      { slug: "wt-barcode-scanner-offline", why: "Price-check queries at the counter slow the queue, and moving them to a self-service point is the cheapest fix." },
      { slug: "wt-pos-saloon", why: "Appointment-led counters work differently from retail ones, and the till has to know about the booking." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "kuwait", "oman", "bahrain", "pakistan", "india", "egypt"],
    countryNote: "Fiscal requirements at the till differ by market and are covered on the country pages, which are sourced and reviewed separately.",
    related: ["odoo-implementation", "odoo-support", "odoo-integration", "odoo-training", "odoo-localization"],
  },

  /* ───────────── DIGITAL ───────────── */
  "odoo-ecommerce": {
    metaTitle: "Odoo eCommerce Development: Shop, Checkout and Fulfilment",
    metaDescription: "Building an Odoo shop that trades: catalogue structure, checkout and payment, shipping and fulfilment, performance, migration without losing rankings, and post-launch iteration.",
    lede: "A shop is not a website. It is an operations project with a storefront on the front of it.",
    intro: [
      "The design is the visible part and the smallest part of the risk. What decides whether an Odoo shop works is the catalogue structure, whether the checkout survives a real card failure, whether stock shown online is the stock you have, and whether a customer who ordered at midnight gets a parcel without anybody re-keying anything. Those are operations questions, and they belong in the plan before anyone chooses a colour.",
      "The advantage of running the shop inside Odoo is that the order, the stock, the invoice and the customer record are the same records the rest of the business already uses. There is no synchronisation to maintain and no argument about which system is right. That advantage disappears the moment the catalogue is structured for the warehouse rather than for the buyer, so the catalogue is where we start.",
      "Where you already have a shop, the migration is treated as its own workstream. Existing URLs are mapped and redirected before launch, because a shop that ranks today and loses that on launch day has traded a working asset for a nicer layout.",
    ],
    phases: [
      {
        name: "Catalogue and merchandising design",
        goal: "Structure the catalogue around how people buy, not how you store things.",
        work: [
          "Decide what is a product and what is a variant, which is the decision everything else inherits",
          "Design categories and filters from the way customers search, not from the warehouse layout",
          "Plan the product page: what has to be there to answer a buyer's question without a phone call",
          "Sort out product data quality early, since thin descriptions and missing images are the usual bottleneck",
        ],
        deliverable: "A catalogue structure and a product data specification your team can populate against.",
      },
      {
        name: "Storefront build",
        goal: "Build a shop that is quick and that works on a phone.",
        work: [
          "Theme and layout implemented against your brand, mobile first, since most traffic is",
          "Product, category, search and cart pages built with real data rather than placeholders",
          "Multi-language and multi-currency where the market needs it, including right-to-left handling",
          "Performance treated as a requirement: image handling, page weight and time to first render",
        ],
        deliverable: "A working storefront on staging, populated with your real catalogue.",
      },
      {
        name: "Checkout, payment and fulfilment",
        goal: "Make the money and the parcel work, including when they do not.",
        work: [
          "Checkout kept short, with guest checkout unless there is a real reason to force an account",
          "Payment methods configured for the market, tested through the failure cases and not just the successes",
          "Shipping rules, rates and carrier handover configured so nobody re-keys an address",
          "Order flow through to picking, delivery and invoice, tested end to end as one path",
          "Stock visibility rules agreed: what shows as available, and what happens on the last unit",
        ],
        deliverable: "A tested order path from a card payment to a picked parcel and a posted invoice.",
      },
      {
        name: "Search visibility and migration",
        goal: "Launch without losing the traffic you already have.",
        work: [
          "Metadata, structured data, sitemap and canonical handling set up properly",
          "Existing URLs mapped one by one and redirected, with the mapping reviewed before launch",
          "Redirects tested on staging, then verified again immediately after launch",
          "Analytics and conversion tracking working from the first hour, not added the following week",
        ],
        deliverable: "A verified redirect map and tracking live at launch.",
      },
      {
        name: "Launch and iteration",
        goal: "Trade, then improve on evidence.",
        work: [
          "Soft launch to a limited audience where the business allows it",
          "Watch checkout completion, search behaviour and site errors in the first days",
          "Abandoned cart recovery and follow-up messaging enabled once the basics are steady",
          "A prioritised improvement backlog driven by what customers actually did, not by opinions",
        ],
        deliverable: "A trading shop with tracking, a defect list cleared and an evidence-based backlog.",
      },
    ],
    clientProvides: [
      "Product data: descriptions, images, attributes and prices, or a decision to have that produced",
      "Brand assets and any design direction, since we implement design rather than invent a brand",
      "Merchant accounts with your payment provider and credentials for the carriers you use",
      "A decision on shipping rules and rates, which is a commercial call and not a technical one",
      "Access to the existing site and its analytics where you are replacing a shop",
      "Someone who will own the shop after launch: content, promotions and the order queue",
    ],
    decisions: [
      { title: "Odoo storefront or a headless front-end", body: "The Odoo storefront is faster to build and easier for your team to edit. A separate front-end gives more design freedom and better control of front-end performance, at the cost of a second codebase to maintain. Most businesses should start with the storefront and only move if there is a specific reason." },
      { title: "Product or variant", body: "The decision that everything downstream inherits: filtering, stock, pricing, reporting and the URL structure. Getting it wrong is a re-platforming exercise later, so it is settled first and deliberately." },
      { title: "How stock is shown", body: "Exact quantities, a simple in-stock indicator, or nothing at all. Each sets a different customer expectation and a different oversell risk. Decide it, and decide what happens to the last unit when two people want it." },
      { title: "Guest checkout or accounts", body: "Forcing account creation costs conversions and gives you a customer record. Unless there is a real operational need for the account, guest checkout wins on the numbers." },
      { title: "Who owns the shop after launch", body: "A shop needs weekly attention: content, prices, promotions, the order queue. Naming the owner before launch is what separates a shop that grows from one that is quietly abandoned in month four." },
    ],
    failureModes: [
      { title: "Launching without redirects", body: "The most expensive mistake in any replatform, and it is invisible until the traffic drops. Existing URLs are mapped one by one, tested on staging and verified again straight after launch." },
      { title: "Catalogue structured for the warehouse", body: "Categories that mirror your storage make products hard to find and filters useless. The structure follows how customers search, and the warehouse view is a separate concern." },
      { title: "Payment tested only on the success path", body: "Declines, timeouts, abandoned redirects and duplicate submissions are what actually happen. Each one is tested, because an order stuck between paid and confirmed is a support call and a refund." },
      { title: "Fulfilment left until after launch", body: "Orders arrive on day one. If picking, shipping and invoicing are not wired up, somebody re-keys everything by hand and the errors start immediately. The order path is tested end to end before launch." },
      { title: "Performance treated as a later optimisation", body: "Heavy images and a slow first render cost conversions on mobile from the first day, and the fix is much harder once the page is built. Page weight is a requirement during the build." },
      { title: "Thin product data", body: "Missing descriptions, single images and absent attributes hurt both conversion and search visibility. Data quality is scoped as a workstream with an owner, because it is a bigger job than anyone expects." },
      { title: "No owner after launch", body: "A shop with nobody looking after it stops earning. The owner is named before launch, and if there is not one, that is worth knowing before the build rather than after." },
    ],
    outOfScope: [
      "Product photography, copywriting and translated marketing content, unless separately scoped",
      "Advertising spend, campaign management and marketplace fees",
      "Payment provider and carrier account fees, and merchant onboarding",
      "Guaranteed search rankings or traffic outcomes",
      "Warehouse operations design beyond wiring the order path through the system",
      "Ongoing content and promotion management after launch, unless contracted",
    ],
    pricingNote: "Scoped as a build plus the operational wiring, with catalogue data treated as its own workstream because it is usually the largest and the most underestimated. Migration from an existing shop is quoted separately, since the redirect mapping depends on how many URLs you already have.",
    faqs: [
      { q: "Should we use Odoo eCommerce or a dedicated platform?", a: "If your stock, pricing, customers and invoicing already live in Odoo, running the shop there removes an integration and an argument about which system is right. A dedicated platform makes sense where the storefront experience is the product itself and the requirements go beyond what a built-in shop should be asked to do. It is a straight trade between one system and a better front end." },
      { q: "Can we keep our current design?", a: "Usually yes, implemented as an Odoo theme. What is worth checking first is whether the current design converts. Rebuilding a layout nobody wanted to buy from is a cost with no return, and a launch is the cheapest moment to change it." },
      { q: "Will we lose our search rankings?", a: "Not if the migration is done properly. Every existing URL is mapped and redirected, the mapping is reviewed before launch and verified again straight after. Skipping that step is the single most common reason a replatform loses traffic, and it is entirely avoidable." },
      { q: "Can we sell in multiple currencies and languages?", a: "Yes, including right-to-left layouts. The work is more than translation: prices, tax treatment, shipping rules and content all vary by market, and it is much cheaper to design for that at the start than to add a second market to a shop built for one." },
      { q: "How does stock stay accurate?", a: "It is the same stock record the rest of the business uses, so there is nothing to synchronise. What you decide is how it is presented: exact quantity, a simple availability indicator, or nothing. Each carries a different oversell risk, and the last-unit rule needs deciding either way." },
      { q: "What do you need from us to start?", a: "Product data is the honest answer, and it is the thing that delays these projects most. Descriptions, images, attributes and prices for the catalogue you intend to launch with. Everything else can run in parallel. A shop cannot launch with an empty catalogue, however good the build is." },
    ],
    modules: [
      { slug: "wt-theme-ecommerce", why: "Starting from a shop theme is cheaper than building layout structure from nothing, and it gives your team blocks they can edit later." },
      { slug: "wt-shopify-connector", why: "Where a storefront stays on Shopify and Odoo runs operations, a maintained connector avoids a bespoke sync." },
      { slug: "wt-delivery-carrier-connector", why: "Rates, labels and tracking are the last mile of every shop launch, and doing them per carrier by hand does not scale." },
      { slug: "wt-marketing-automation", why: "Abandoned cart and follow-up sequences are where a shop earns back its build cost, once the basics are steady." },
      { slug: "wt-pwa-push", why: "Repeat purchase businesses get more from push than from another email campaign, and it avoids a separate app build." },
      { slug: "wt-whatsapp-otp-odoo", why: "Where sign-up fraud or bad phone data is a problem, verifying at registration is cheaper than cleaning the list later." },
      { slug: "wt-rental-website", why: "Where the product is hired rather than sold, the shop needs date ranges and availability checks rather than a simple add to cart." },
    ],
    countries: ["saudi-arabia", "uae", "qatar", "kuwait", "pakistan", "india", "united-kingdom", "united-states", "germany"],
    countryNote: "Payment methods, carriers and buyer expectations differ by market. The country pages carry what applies where you sell.",
    related: ["odoo-integration", "odoo-implementation", "odoo-customization", "odoo-support", "odoo-pos-deployment"],
  },
};
