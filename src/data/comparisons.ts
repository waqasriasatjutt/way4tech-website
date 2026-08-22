/*
 * Evaluation-stage comparison pages: /compare/<slug>/.
 *
 * Rules this file was written under, and must keep being written under:
 *
 *  1. No pricing. Not for Odoo, not for anyone else. No figures, no ranges, no
 *     "cheaper". Licensing MODEL only (open source, subscription, proprietary),
 *     and only where it is certain. Every vendor prices by region, edition and
 *     contract, so a number here would be wrong for most readers.
 *  2. Only structural, checkable facts about the other product: deployment
 *     options, source availability, how it is extended, who implements it, how
 *     it upgrades. No benchmarks, no market share, no user counts, no studies.
 *  3. Every entry must name the situation where the reader should NOT pick
 *     Odoo, in plain language. A comparison that concedes nothing reads as a
 *     sales sheet and converts worse.
 *  4. Neutral tone. State the difference, do not disparage the product.
 *  5. If a fact about a competitor is not certain, leave it out. An
 *     unverifiable claim is the fastest way to lose a serious buyer.
 *
 * Country slugs must exist in COUNTRIES in site.ts. They are looked up
 * defensively at render time, so a bad slug drops the link rather than
 * breaking the page.
 */

export interface CompareRow {
  /** Dimension label. Identical across every comparison so the set reads as one. */
  dimension: string;
  odoo: string;
  other: string;
}

export interface MigrationStep {
  name: string;
  body: string;
}

export interface CompareFaq {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  /** Product name as it appears in the H1, after "Odoo vs ". */
  product: string;
  /** Short form used in body copy where the full name is unwieldy. */
  shortName: string;
  category: string;
  /** One line for the /compare/ index. */
  framing: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  odooSuits: string[];
  otherSuits: string[];
  rows: CompareRow[];
  pickOdoo: string[];
  pickOther: string[];
  /** The concession, in one sentence. Rendered as a callout. */
  notOdoo: string;
  migration: MigrationStep[];
  migrationRisks: string[];
  /** Country slugs from COUNTRIES in site.ts. */
  countries: string[];
  faqs: CompareFaq[];
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "odoo-vs-sap",
    product: "SAP",
    shortName: "SAP",
    category: "Enterprise ERP",
    framing: "The large-enterprise suite against a mid-market platform. Where the SAP overhead is earned, and where it is not.",
    metaTitle: "Odoo vs SAP",
    metaDescription: "Odoo vs SAP compared on deployment, source access, customisation, ecosystem and implementation shape, including where SAP is the better choice and how a migration to Odoo runs.",
    intro: [
      "This page compares Odoo with SAP's enterprise line: S/4HANA, and the older ECC systems still in service. SAP Business One is a different product with a different implementation shape and it has its own page.",
      "Both are real ERP systems and both will run a business. What decides the purchase is not a feature list, it is the size and shape of organisation each one is built for, and how much of your process you are willing to replace with a template.",
      "There are no prices on this page. Both vendors price by region, edition, contract and partner, so any figure written here would be wrong for most of the people reading it.",
    ],
    odooSuits: [
      "Businesses in the tens to low hundreds of users that want sales, stock, production and finance in one system.",
      "Companies whose process is their own, and who want the system to follow it rather than the other way round.",
      "Teams that want the source code, the option to self-host, and the option to change supplier without changing system.",
    ],
    otherSuits: [
      "Large multinationals with many legal entities, many currencies, and statutory reporting in many jurisdictions.",
      "Industries with a deep SAP vertical solution already proven at scale in that sector.",
      "Groups with an existing SAP landscape, an internal ABAP team, or a decision that has already been taken above the project.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP and business application platform. One application, with modules switched on per function.", other: "An enterprise ERP suite. S/4HANA is the current generation, with older ECC systems still running in many organisations." },
      { dimension: "Deployment", odoo: "Self-hosted on your infrastructure, hosted by a partner, or on Odoo's own hosted products.", other: "On-premise and vendor cloud editions, private and public, plus partner-hosted arrangements." },
      { dimension: "Source code", odoo: "The Community core is open source and published. You can read it, fork it, and keep your own copy.", other: "Proprietary. Customers do not receive the source of the product itself." },
      { dimension: "Licensing model", odoo: "An open-source Community edition, and a paid Enterprise edition sold per user. Check current terms with the vendor.", other: "Proprietary licensing that varies by edition, deployment and contract. Check with SAP or the partner quoting you." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website and point of sale in one product.", other: "Very broad, with industry solutions and depth in areas such as complex supply chain and group consolidation that Odoo does not attempt." },
      { dimension: "How you change it", odoo: "Python modules that extend the existing models, XML for views, and a no-code editor in the Enterprise edition. Changes ship as installable modules.", other: "ABAP in classic on-premise systems. In the cloud editions the core is kept clean and extensions sit alongside it on SAP's platform." },
      { dimension: "Data model", odoo: "One PostgreSQL database. Modules extend the same records instead of syncing between systems.", other: "One suite on the SAP HANA database for S/4HANA, with extensions and side-by-side services around it." },
      { dimension: "Who implements it", odoo: "Partners, freelance developers, or your own team. The skills are Python, PostgreSQL and the Odoo framework.", other: "A large partner network, plus SAP's own consulting. SAP publishes its Activate implementation methodology." },
      { dimension: "Upgrades", odoo: "A major version each year. Moving between versions is a project, and the more you have customised the bigger it is.", other: "Long-lived releases with vendor-set maintenance timelines. Cloud editions are updated by the vendor." },
    ],
    pickOdoo: [
      "You need one system across departments and your headcount is in the tens or low hundreds.",
      "Your process is part of how you compete, and you are not willing to replace it with a template.",
      "You want the option to host it yourself, and to change the people who maintain it without replacing the system.",
      "You want to start with two or three functions and add the rest once those are live.",
    ],
    pickOther: [
      "You run many legal entities across many countries, and consolidation and statutory reporting are the hardest part of your finance function.",
      "Your industry has an SAP solution built for it, and the companies you compete with run their operations on it.",
      "A parent company, an auditor or a major customer requires it. That is a real requirement and no feature comparison changes it.",
      "You already have an SAP landscape and people who know it. Replacing that is a cost with no operational return.",
    ],
    notOdoo: "Do not pick Odoo if consolidation across many legal entities and jurisdictions is the centre of your finance function, or if a parent company mandates SAP. Odoo would be the simpler project and the wrong answer.",
    migration: [
      { name: "Decide what actually moves", body: "Master data moves: customers, vendors, products, bills of material, the chart of accounts, open orders, and balances at a cutover date. Years of posted transactions usually do not. The old system stays available read-only for the retention period your auditors require." },
      { name: "Get the extracts, and get them early", body: "Your team or your existing partner produces the extracts from the source system. We specify the columns and the format and review a sample in the first week, because the extract is where most of the elapsed time goes." },
      { name: "Map the chart of accounts and the tax codes", body: "This is the piece that decides whether the first month-end works. It is a finance decision rather than a technical one, and it needs your controller in the room." },
      { name: "Rebuild the process, do not copy the screens", body: "Anything written in ABAP over the years has to be re-decided rather than re-implemented. Some of it is load-bearing. Some of it exists because of a limitation that Odoo does not have." },
      { name: "Load, reconcile, then run in parallel", body: "Load into a staging database, reconcile balances line by line against the source, then run one full period in both systems before the old one is switched off." },
    ],
    migrationRisks: [
      "Chart of accounts remapping agreed during the load instead of before it.",
      "Inventory valuation at cutover. The quantity is the easy half, the value is the half that fails an audit.",
      "Partially paid invoices and open advances, which need a stated treatment before the cutover date.",
      "Custom logic nobody can explain any more. Budget time to find the person who knows why it is there.",
    ],
    countries: ["saudi-arabia", "uae", "germany", "united-kingdom", "united-states"],
    faqs: [
      { q: "Is Odoo a real alternative to SAP?", a: "For a business in the tens to low hundreds of users, yes: it covers the same functional ground in one product. For a multinational whose hardest problem is consolidating dozens of legal entities, it is not a like-for-like replacement, and we say so before a proposal is written." },
      { q: "Can Odoo handle multi-company and multi-currency?", a: "Yes. Multiple companies in one database, inter-company rules and multi-currency are part of the product. The thing to test is your specific statutory reporting per jurisdiction, because that is where the work usually turns out to be." },
      { q: "How long does a move from SAP to Odoo take?", a: "The build is weeks. The elapsed time is set by how fast the extracts arrive and how long the chart of accounts and tax mapping takes to agree. Plan around those two, not around the configuration." },
      { q: "Will we lose our transaction history?", a: "It moves out of the working system rather than disappearing. Standard practice is opening balances at a cutover date, with the old system kept read-only for the retention period. Loading years of posted history into a new ERP costs a lot and gets used rarely." },
      { q: "Why does this page not compare prices?", a: "Because both vendors price by region, edition and contract, and a number published here would be wrong for most readers. Get a written quote from each and compare the total, including implementation, hosting and the people who will run it." },
      { q: "Do you migrate from SAP?", a: "Yes. The honest version of that answer is that we migrate the data and rebuild the process. Anything written in ABAP is re-decided, not converted." },
    ],
  },

  {
    slug: "odoo-vs-netsuite",
    product: "NetSuite",
    shortName: "NetSuite",
    category: "Cloud ERP",
    framing: "Vendor-run cloud against a platform you can host yourself. The trade is control for accountability.",
    metaTitle: "Odoo vs NetSuite",
    metaDescription: "Odoo vs NetSuite compared on deployment, source access, customisation, upgrades and implementation shape, including where NetSuite is the better choice and how a migration to Odoo runs.",
    intro: [
      "NetSuite is a cloud ERP owned by Oracle. It is delivered as a service: Oracle runs it, Oracle upgrades it, and there is no version you install on your own server.",
      "That single fact drives most of the differences below. If you want one vendor accountable for the whole stack, it is an argument for NetSuite. If you want the code and the database, it is an argument for Odoo.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses that want to own the deployment: your server or your partner's, your database, your backups.",
      "Companies whose requirements need real code changes rather than configuration inside someone else's platform.",
      "Buyers who do not want to be tied to one hosting supplier for the life of the system.",
    ],
    otherSuits: [
      "Finance-led organisations with several subsidiaries, where consolidation is the core requirement.",
      "Companies with no appetite for infrastructure and no in-house technical people.",
      "Businesses heading into audit or investor scrutiny that value a widely recognised cloud finance system.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP and business application platform, delivered as software you can install.", other: "A cloud ERP delivered as a service by Oracle." },
      { dimension: "Deployment", odoo: "Your infrastructure, a partner's, or Odoo's hosted products. You choose, and you can change your mind later.", other: "Vendor cloud only. There is no self-hosted edition." },
      { dimension: "Source code", odoo: "The Community core is open source and published. The Enterprise applications on top are not.", other: "Proprietary. Customers work through the published platform and its APIs." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user. Check current terms with the vendor.", other: "Subscription, sold by Oracle and its partners. Check current terms with the vendor." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website and point of sale in one product.", other: "Financials first and strong there, with ERP, CRM and commerce modules around it." },
      { dimension: "How you change it", odoo: "Python modules and XML views running in the same process as the core. Anything in the product can be changed.", other: "The SuiteCloud platform: SuiteScript for logic, SuiteFlow for workflows, SuiteBuilder for custom records and fields, SuiteTalk for integration. You extend the platform rather than modify it." },
      { dimension: "Data model", odoo: "One PostgreSQL database you can query directly.", other: "A managed multi-tenant model reached through the platform and its APIs, not through direct database access." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team. The skills are Python, PostgreSQL and the Odoo framework.", other: "Oracle and its partner network. The skills are the SuiteCloud stack." },
      { dimension: "Upgrades", odoo: "A major version each year. You choose when to move, and the move is a project you carry.", other: "Oracle upgrades every account on its own schedule. You do not choose the version, and you do not carry the upgrade project." },
    ],
    pickOdoo: [
      "You want the database and the code, and the ability to move hosting.",
      "Your operation is manufacturing, field work or retail heavy, and the fit needs real code rather than configuration.",
      "You want to add functions over time without renegotiating a platform contract.",
      "You have technical people, or you are happy for a partner to hold that for you.",
    ],
    pickOther: [
      "Multi-subsidiary consolidation is the hardest thing your finance team does, and you want the product to handle it rather than a build.",
      "You have no technical staff and no intention of hiring any, and you would rather pay one vendor to be accountable for uptime, backups and upgrades.",
      "You are preparing for due diligence and want a system your auditors already know.",
      "You never want to run a version upgrade project again. That is a genuine benefit of vendor-run software, and Odoo does not offer it.",
    ],
    notOdoo: "Do not pick Odoo if you want one vendor accountable for hosting, backups and upgrades and you have nobody in-house to hold that. Odoo gives you control, and control is work.",
    migration: [
      { name: "Pull your data while you still have the account", body: "Export master data and open items before the subscription lapses. Saved searches and CSV exports cover most of it. Losing access part way through turns a migration into a salvage job." },
      { name: "Agree what comes over", body: "Master data, open receivables and payables, open orders, and stock on hand with values at the cutover date. Posted history stays in the old system for as long as your auditors need it." },
      { name: "Rebuild customisations as modules", body: "SuiteScript does not convert. Each customisation is re-decided: keep it, drop it, or rebuild it as an Odoo module. Most lists get shorter at this step, because some of them exist to work around a platform limit that does not exist here." },
      { name: "Map accounts, taxes and the subsidiary structure", body: "Subsidiaries become companies in one Odoo database. Decide that structure before the load, because changing it afterwards is expensive." },
      { name: "Reconcile, then run in parallel", body: "Reconcile balances against the source, then run one full period in both systems before the subscription is allowed to end." },
    ],
    migrationRisks: [
      "Access expiring mid-project. Time the subscription end after the cutover, not before.",
      "Saved searches and reports people use daily. List them early, because they are rebuilt rather than migrated.",
      "Subsidiary and elimination structure agreed after data has already been loaded.",
      "Inventory value at cutover, not just the quantity.",
    ],
    countries: ["united-states", "canada", "united-kingdom", "australia", "uae"],
    faqs: [
      { q: "Can Odoo replace NetSuite for multi-entity accounting?", a: "Multiple companies in one database, inter-company rules and multi-currency are in the product. Whether that covers your consolidation depends on your specific eliminations and statutory reports, so test it against your real trial balance before signing anything." },
      { q: "Do we have to host Odoo ourselves?", a: "No. You can host it yourself, have a partner host it, or use Odoo's own hosted products. The difference with NetSuite is that you have the choice, not that you are obliged to run servers." },
      { q: "What happens to our SuiteScript customisations?", a: "They are re-decided, not converted. In practice a good number exist to work around a platform limit and do not need to exist in Odoo at all. The rest become modules." },
      { q: "Which one upgrades more easily?", a: "NetSuite, plainly. Oracle upgrades every account and you carry no project. Odoo gives you a version choice, and that choice comes with a migration each time you take it." },
      { q: "Why is there no price comparison here?", a: "Because both are priced by region, edition and contract. Any figure published here would be wrong for most readers. Ask both for a written quote and compare implementation and running cost as well as the licence line." },
      { q: "How long does the move take?", a: "Weeks of build. The elapsed time is set by how quickly your exports arrive and how long the account and tax mapping takes to agree." },
    ],
  },

  {
    slug: "odoo-vs-microsoft-dynamics-365-business-central",
    product: "Microsoft Dynamics 365 Business Central",
    shortName: "Business Central",
    category: "Mid-market ERP",
    framing: "Two mid-market ERPs aimed at the same buyer. The tie-breaker is usually how deep you already are in Microsoft.",
    metaTitle: "Odoo vs Microsoft Dynamics 365 Business Central",
    metaDescription: "Odoo vs Microsoft Dynamics 365 Business Central compared on deployment, source access, extensions, ecosystem and upgrades, including where Business Central is the better choice.",
    intro: [
      "Business Central is Microsoft's ERP for small and mid-sized businesses, descended from Navision. It is sold and implemented through the Microsoft partner channel.",
      "Odoo and Business Central compete for the same buyer, and the honest tie-breaker is rarely a feature. It is whether your organisation already runs on Microsoft 365, Azure and the Power Platform, and whether your IT function is a Microsoft function.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses that want operations as well as finance in one system, including manufacturing, point of sale and a website.",
      "Buyers who want the source and the option to self-host.",
      "Companies that expect to keep changing the system as the business changes.",
    ],
    otherSuits: [
      "Organisations standardised on Microsoft 365, Teams, Azure and Power BI, where native fit with those tools is worth more than anything on a feature list.",
      "Finance teams who want an ERP that behaves like the rest of their Microsoft stack.",
      "Companies with an existing Microsoft partner relationship and a licensing agreement already in place.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP and business application platform with an open-source core.", other: "Microsoft's ERP for small and mid-sized businesses, part of the Dynamics 365 family." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "Microsoft's cloud, with an on-premise deployment option also available." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary. Partners and customers build extensions rather than modify the base application." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Subscription licensing through Microsoft and its partners, with different user types. Check current terms." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website and point of sale in one product.", other: "Finance, supply chain, projects, sales and service. CRM, business intelligence and portals usually come from other Microsoft products alongside it." },
      { dimension: "How you change it", odoo: "Python modules extending the core, XML views, and a no-code editor in the Enterprise edition.", other: "AL extensions developed in Visual Studio Code. The base application stays unmodified, which makes updates safer and deep changes harder." },
      { dimension: "Data model", odoo: "One PostgreSQL database across every module.", other: "Its own data model, with Dataverse and the Power Platform used to reach it from other Microsoft tools." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team.", other: "The Microsoft partner channel. You buy and implement through a partner." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose to take it.", other: "Frequent vendor updates in the cloud, with the extension model designed to survive them." },
    ],
    pickOdoo: [
      "Manufacturing, point of sale, e-commerce or field operations are central, and you want them in the same system as finance.",
      "You want the code, and the ability to move hosting or change supplier.",
      "Your process needs changes that go deeper than an extension model handles comfortably.",
      "You want to start with a few functions and add the rest without renegotiating licensing.",
    ],
    pickOther: [
      "Your company already runs on Microsoft 365, Azure and Power BI, and your users live in Teams and Excel. That integration is real, and Odoo does not match it.",
      "Power BI is your reporting standard and your analysts already build in it.",
      "You have a Microsoft partner and an agreement in place, and adding an ERP to it is a smaller organisational change than introducing a new vendor.",
      "Your IT team is a Microsoft team. Handing them a Python, PostgreSQL and Linux system is a real cost, not a detail.",
    ],
    notOdoo: "Do not pick Odoo if your organisation is standardised on Microsoft and your IT function is a Microsoft function. The integration and the skills you already have are worth more than any feature comparison.",
    migration: [
      { name: "List the extensions in use", body: "Every AL extension, whether it came from your partner, from AppSource, or was built for you. That list is the real scope of the migration, not the standard functionality." },
      { name: "Export master data and open items", body: "Customers, vendors, items, the chart of accounts, open orders, open receivables and payables, and stock with values at the cutover date." },
      { name: "Agree the chart of accounts and the dimensions", body: "Dimensions are the piece people forget. They map onto analytic accounting in Odoo, and that mapping has to be decided before the load rather than during it." },
      { name: "Rebuild the reports that are actually read", body: "Reports do not migrate. Make a list of the ones printed or read every month and rebuild those. The rest quietly disappear and nobody asks after them." },
      { name: "Reconcile, then run in parallel", body: "Reconcile against the last closed period, then run one full period in both systems before switching off." },
    ],
    migrationRisks: [
      "Dimensions mapped late. Decide the analytic structure before anything is loaded.",
      "AppSource extensions with no Odoo equivalent. Find the two or three that matter before committing to a date.",
      "Excel reports plumbed directly into the old system by people outside finance.",
      "Inventory costing method. Confirm the target method before the stock load.",
    ],
    countries: ["united-kingdom", "united-states", "canada", "germany", "australia"],
    faqs: [
      { q: "Does Odoo cover what Business Central covers?", a: "Across finance and supply chain the functional ground is similar. Odoo brings point of sale, website and e-commerce into the same product, where the Microsoft answer usually spans several products. Whether that matters depends on whether you need those functions at all." },
      { q: "We use Power BI. Can it read Odoo?", a: "Yes, over the database or the API. It is a connection you set up rather than one that is already there, and that difference is the honest version of the Microsoft integration argument." },
      { q: "Can Business Central customisations be converted?", a: "No. AL extensions are re-decided and rebuilt as Odoo modules. Most lists get shorter at that step, because some extensions exist to fill gaps that Odoo does not have." },
      { q: "Is Odoo harder for a Microsoft IT team to run?", a: "At first, yes. It is Python, PostgreSQL and Linux. If nobody in your IT function is comfortable there, either budget for a hosting partner or count that as a reason to stay where you are." },
      { q: "Why is there no price comparison?", a: "Because licensing for both depends on region, edition, user type and the partner agreement. A figure here would mislead more readers than it helped. Get a written quote for each and compare the running cost as well as the licence." },
      { q: "How long does the move take?", a: "Weeks of build. The elapsed time depends on the extension list and how quickly the chart of accounts and dimension mapping is agreed." },
    ],
  },

  {
    slug: "odoo-vs-zoho",
    product: "Zoho",
    shortName: "Zoho",
    category: "Business app suite",
    framing: "A suite of connected apps against one application with modules. It is a data model question, not a feature count.",
    metaTitle: "Odoo vs Zoho",
    metaDescription: "Odoo vs Zoho compared on data model, deployment, customisation and implementation shape, including when Zoho is the better choice and how a migration to Odoo runs.",
    intro: [
      "Zoho publishes a large set of business applications from one vendor: CRM, accounting, inventory, HR, help desk and more, sold individually and as a bundle.",
      "The structural difference is that Zoho is a set of applications that integrate with each other, while Odoo is one application whose modules share a single database. That shows up on the day one record has to be right in four places at the same moment.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses where stock, production or fulfilment is the operation rather than a side function.",
      "Companies that need one record to be true everywhere: the same product, the same customer, the same order.",
      "Buyers who want the code and the option to self-host.",
    ],
    otherSuits: [
      "Small teams whose main need is a CRM, with a few departmental tools around it.",
      "Companies that want to switch apps on themselves, this month, without an implementation project.",
      "Sales-led businesses with straightforward operations behind the sale.",
    ],
    rows: [
      { dimension: "What it is", odoo: "One application. Modules switched on per function, sharing one database.", other: "A family of separate applications from one vendor, sold individually and as a bundle." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "Vendor cloud. There is no self-hosted edition." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Subscription, per app or as a bundle, per user. Check current terms with the vendor." },
      { dimension: "Functional breadth", odoo: "Broad, in one product, including manufacturing and point of sale.", other: "Broad across the catalogue, with depth strongest in CRM and the sales and marketing tools around it." },
      { dimension: "How you change it", odoo: "Python modules extending the core, XML views, and a no-code editor in the Enterprise edition.", other: "Configuration in each app, the Deluge scripting language, custom apps built in Zoho Creator, and the APIs." },
      { dimension: "Data model", odoo: "One PostgreSQL database. A customer record is one record.", other: "Each application holds its own data and syncs with the others. The integration is the vendor's own, which helps, but it is still integration." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team, usually as a project.", other: "Often the customer directly, with partners available. Self-serve setup is a deliberate part of the product." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Vendor-updated. You carry no upgrade project." },
    ],
    pickOdoo: [
      "You make, store or ship things, and the stock figure has to be right.",
      "The same customer, product or order has to be correct in sales, stock and accounting at the same moment.",
      "You want the database and the source, and the option to host it yourself.",
      "You expect real customisation rather than configuration inside someone else's app.",
    ],
    pickOther: [
      "What you need is a good CRM and a few tools around it, and the operation behind the sale is simple.",
      "You want to be live this month, set up by your own team, with no implementation partner involved.",
      "You are small, intend to stay small, and the cost of a rollout would not come back.",
      "You already use several Zoho apps and they work. Replacing something that works is a project with no return.",
    ],
    notOdoo: "Do not pick Odoo if what you actually need is a CRM. A small sales team with simple operations behind it gets more from a CRM they configure themselves than from an ERP rollout.",
    migration: [
      { name: "Decide which apps are actually in use", body: "The bundle usually covers more than the team uses. Migrating what nobody opens is work with no result, so start by asking each team what they open first in the morning." },
      { name: "Export app by app", body: "Each application exports separately, so the extract is a set of files rather than one. The same contacts appear in more than one of them." },
      { name: "Merge the duplicates before loading", body: "This is the step people skip. A customer that exists three times across three apps becomes three customers in Odoo unless it is fixed in the staging file first, and your team are the only people who know which one is right." },
      { name: "Rebuild the automations that earn their place", body: "Deluge scripts, workflow rules and Creator apps do not convert. List them, keep the ones that matter, and rebuild those as Odoo automations or module code." },
      { name: "Load, check with the people who use it, then cut over", body: "Load into a staging database, have the sales and finance leads check their own records, then cut over on a fixed date." },
    ],
    migrationRisks: [
      "Duplicate contacts across apps. Deduplicate before loading, not after.",
      "Attachments and email history, which usually need their own export path.",
      "Custom fields that exist in one app and not in the others.",
      "Automations nobody documented, discovered when they stop firing.",
    ],
    countries: ["india", "uae", "saudi-arabia", "united-states", "united-kingdom"],
    faqs: [
      { q: "Is Odoo a CRM?", a: "It includes one, and it sits on the same database as quotations, orders, invoices and stock. If a CRM is genuinely all you need, that is more system than the job requires." },
      { q: "Can we run Odoo without an implementation partner?", a: "Some businesses do, for a small setup with standard processes. Once accounting, stock and a second country are involved, unassisted setups usually get redone. That rework is an honest cost to count up front." },
      { q: "What actually breaks when apps sync instead of sharing a database?", a: "Timing and truth. A stock figure that is right in one app and stale in another for a few minutes is fine for a small shop, and not fine when someone is promising a delivery date on the phone." },
      { q: "Do Zoho customisations move across?", a: "No. Deluge scripts and Creator apps are rebuilt rather than converted. The list usually gets shorter along the way, which is a good outcome." },
      { q: "Can we keep some Zoho apps and use Odoo for the rest?", a: "Yes, and it is a common landing point. It is also an integration to build and maintain. Decide which system owns each record before you build it, because otherwise both do and neither is right." },
      { q: "Why is there no price comparison?", a: "Because both are priced per user, by edition and by region, and the totals depend on which apps you switch on. A number here would be wrong for most readers, so compare written quotes instead." },
    ],
  },

  {
    slug: "odoo-vs-quickbooks",
    product: "QuickBooks",
    shortName: "QuickBooks",
    category: "Accounting software",
    framing: "Accounting software against an ERP. Most businesses asking this question do not need to move yet.",
    metaTitle: "Odoo vs QuickBooks",
    metaDescription: "Odoo vs QuickBooks compared honestly: what each is built for, when moving to an ERP is justified, when staying is the right call, and how a migration actually runs.",
    intro: [
      "QuickBooks is accounting software. Odoo is an ERP that includes accounting. Comparing them feature by feature is the wrong exercise, because they are built for different jobs.",
      "The real question is whether the business has outgrown bookkeeping. Plenty have not, and moving early costs money and slows things down.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses where stock, production, projects or a sales team matter as much as the books.",
      "Companies re-keying the same order into two or three different systems.",
      "Businesses that need operations and finance in one system, rather than two that meet at a bank feed.",
    ],
    otherSuits: [
      "Small businesses whose need is bookkeeping, tax filing and payroll.",
      "Companies with simple stock, or no stock at all.",
      "Owners whose accountant works in it and files from it.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP: sales, stock, production, projects and accounting in one system.", other: "Accounting software: bookkeeping, bank reconciliation, invoicing and reporting." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "QuickBooks Online is the cloud product. Desktop editions and their availability differ by market, so check what is offered where you are." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Subscription. Check current terms with the vendor." },
      { dimension: "Functional breadth", odoo: "Broad. Accounting is one module among many.", other: "Focused on accounting, with a large third-party marketplace supplying everything else." },
      { dimension: "How you change it", odoo: "Configuration, then Python modules for anything deeper, plus a no-code editor in the Enterprise edition.", other: "Settings, third-party apps and the API. The accounting behaviour itself is not open to change." },
      { dimension: "Data model", odoo: "One database covering operations and finance.", other: "An accounting data model. Operational data lives in whichever app you connect to it." },
      { dimension: "Who implements it", odoo: "A partner, a freelancer or your own team, as a project.", other: "Usually the owner or the bookkeeper, with an accountant advising. No project required." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Vendor-updated for the online product." },
    ],
    pickOdoo: [
      "Stock exists, and the count is wrong more often than anyone admits.",
      "The same order gets typed into more than one system.",
      "You manufacture, assemble or kit, and you need bills of material.",
      "You have a sales pipeline, projects to cost, or field staff to schedule, and none of it is in the accounting system.",
      "Month-end takes days because the numbers live in spreadsheets between systems.",
    ],
    pickOther: [
      "Bookkeeping and filing are genuinely all you need.",
      "Your accountant works in QuickBooks and prices their service accordingly. Moving to a system they do not know has a cost, and it appears on their invoice.",
      "You have no stock, or stock you could count in a minute.",
      "You are small and growing steadily. An ERP rollout at that stage buys very little and takes attention off the business.",
    ],
    notOdoo: "Do not move to Odoo because the business grew. Move when you can name the thing that breaks: stock that is wrong, orders typed twice, a month-end that eats a week. If you cannot name it, stay where you are.",
    migration: [
      { name: "Pick a cutover date, usually a period start", body: "The start of a financial year is easiest, the start of a quarter is workable, and mid-period is possible but costs more in reconciliation." },
      { name: "Export the lists", body: "Customers, vendors, products, the chart of accounts, and open invoices and bills as at the cutover date. These come out as files you can read and correct before anything is loaded." },
      { name: "Bring balances, not history", body: "Opening balances at the cutover date, plus open receivables and payables line by line. The old file stays available read-only for prior years. Loading years of transactions into an ERP costs real money and gets opened about twice." },
      { name: "Set tax up before the first invoice", body: "Tax codes, tax positions and the tax report layout come first, because fixing them after invoices are posted means corrections rather than settings." },
      { name: "Reconcile against the last filed return", body: "Balances in Odoo are checked against the last filed accounts or return. If they do not tie, the cause gets found before go-live rather than at the next filing." },
      { name: "Run one period in parallel", body: "One month with both systems live. It costs a few extra hours and it is the only test that finds what a checklist misses." },
    ],
    migrationRisks: [
      "Bank feeds connected before opening balances are agreed, which double-counts transactions.",
      "Undeposited funds and clearing accounts, which rarely map cleanly.",
      "Inventory value at cutover where the old system tracked it loosely or not at all.",
      "The accountant hearing about the change after it happened. Tell them first.",
    ],
    countries: ["united-states", "canada", "united-kingdom", "australia", "india"],
    faqs: [
      { q: "Should we move from QuickBooks to Odoo?", a: "Only if you can name what is breaking: stock that does not match, orders typed into two systems, a month-end that takes a week, a sales pipeline living in a spreadsheet. If none of those is true, staying is the right answer and we will tell you so." },
      { q: "Is Odoo accounting as good as QuickBooks for bookkeeping?", a: "For pure bookkeeping in a small business, QuickBooks is a tighter tool and your accountant already knows it. Odoo wins when the accounting has to be connected to stock, production, projects and a sales process, not when it stands on its own." },
      { q: "Will our accountant be able to work in Odoo?", a: "Most can, with a short handover. Ask them before you decide rather than after. If they charge more to work in a system they do not know, that cost belongs in the comparison." },
      { q: "Can we keep QuickBooks and use Odoo for operations?", a: "You can, with an interface between them. It is a real thing to build and maintain, and it makes most sense as a staged move rather than a permanent arrangement." },
      { q: "Do we lose our history?", a: "No. It moves out of the working system. Opening balances come across at a cutover date and the old file stays available read-only for the retention period your accountant requires." },
      { q: "Why is there no price comparison?", a: "Because the two are priced on different models in different markets, and the number that decides this is implementation and training, not the subscription line. Compare written quotes including the work, not the software alone." },
    ],
  },

  {
    slug: "odoo-vs-sage",
    product: "Sage",
    shortName: "Sage",
    category: "Finance and ERP portfolio",
    framing: "Sage is several products, not one. The comparison changes completely depending on which one you have been quoted.",
    metaTitle: "Odoo vs Sage",
    metaDescription: "Odoo vs Sage compared product by product: which Sage you are actually comparing, where each fits, when Sage is the better choice, and how a migration to Odoo runs.",
    intro: [
      "Sage is a portfolio rather than a single product. Sage 50 and Sage 200 sit at the accounting and small business end, Sage Intacct is cloud financial management, and Sage X3 targets larger operations with manufacturing and distribution.",
      "So the first question is which Sage product is on the table. Against Sage 50 the comparison is accounting software against an ERP. Against Sage X3 it is one ERP against another. Answering the wrong one of those wastes a month.",
      "No prices appear on this page for any product.",
    ],
    odooSuits: [
      "Businesses that want operations and finance in one system, rather than finance with operations bolted on.",
      "Companies that want the source, and the option to self-host or change supplier.",
      "Buyers who expect the system to keep changing as the business changes.",
    ],
    otherSuits: [
      "Finance-led organisations whose requirement is accounting depth and whose operations are simple.",
      "Businesses whose accountants and bookkeepers already work in Sage every day.",
      "Companies that want multi-entity financial management without an operational rollout attached to it.",
    ],
    rows: [
      { dimension: "What it is", odoo: "One ERP product with modules switched on per function.", other: "A portfolio: small business accounting, mid-market accounting, cloud financial management, and a larger ERP. Different products with different architectures." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "Varies by product. Some are installed, some are cloud only, some are both. Confirm it for the specific product you are quoted." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary across the portfolio." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Subscription, and for some installed products a licence purchase. Terms differ per product, so check with the vendor or reseller." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website and point of sale in one product.", other: "Depends entirely on the product. Accounting is the common core across the range, with operational coverage strongest in the larger products." },
      { dimension: "How you change it", odoo: "Python modules extending the core, XML views, and a no-code editor in the Enterprise edition.", other: "Varies by product: configuration, vendor tooling, third-party add-ons and integrations. Ask what customisation actually means for the product being quoted." },
      { dimension: "Data model", odoo: "One PostgreSQL database across every module.", other: "One data model per product. Where the answer spans two Sage products, the join between them is an integration." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team.", other: "A reseller and accountant channel, long established in the United Kingdom and Ireland." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Varies by product. Cloud products are vendor-updated, installed products are upgraded on your own schedule." },
    ],
    pickOdoo: [
      "You want stock, production, projects and a sales process in the same system as the ledger.",
      "You are being quoted two Sage products plus an integration to cover one requirement.",
      "You want the code, the database, and the freedom to change who maintains it.",
      "You want to start with the operational side and bring finance across later.",
    ],
    pickOther: [
      "Your requirement really is accounting, and your finance team and external accountant already work in Sage. Familiarity is worth more than features to the people using it daily.",
      "You want a supplier and accountant network that has been in your market a long time and knows the product well.",
      "You need multi-entity financial management and do not want an operational rollout attached to it.",
      "You have a Sage product that works and no operational problem to solve. Changing accounting systems is a project with a real cost and no benefit unless something is actually broken.",
    ],
    notOdoo: "Do not replace a working Sage accounting system unless the problem is operational. If the ledger is fine and the pain is in stock or production, the answer is an operations system, not a new set of books.",
    migration: [
      { name: "Confirm the product and the version", body: "The extract path, the data available and the effort all change between Sage products. Nothing sensible can be planned until this is written down." },
      { name: "Get a sample extract early", body: "Ask for one customer, one supplier, one product and one month of transactions in the format you will actually use. Sample first, full extract later, because the format problems surface in the sample." },
      { name: "Agree the chart of accounts and the cutover date", body: "The nominal structure gets decided rather than carried over untouched. A period start makes reconciliation straightforward, mid-period does not." },
      { name: "Bring balances and open items", body: "Opening balances, open receivables and payables, open orders, and stock with values at the cutover date. Prior years stay in the old system, available read-only." },
      { name: "Rebuild the reports people read", body: "The management reports someone prints every month are the ones to rebuild. Everything else can wait until somebody asks for it, and often nobody does." },
      { name: "Reconcile, then run in parallel", body: "Tie the balances back to the last filed accounts, then run one period in both systems before the old one is retired." },
    ],
    migrationRisks: [
      "Assuming one Sage product behaves like another. Confirm which one you actually have.",
      "Nominal code structure carried across unchanged because nobody wanted to decide it.",
      "Third-party add-ons sitting around the Sage system that nobody counted in scope.",
      "The external accountant finding out late.",
    ],
    countries: ["united-kingdom", "united-states", "canada", "australia", "france"],
    faqs: [
      { q: "Which Sage product should we compare Odoo with?", a: "Whichever one you have been quoted. Sage 50 and Sage 200 sit at the accounting end, Sage Intacct is cloud financial management, and Sage X3 is a larger ERP. Against the first two the comparison is accounting software against an ERP. Against X3 it is ERP against ERP." },
      { q: "Can Odoo replace Sage for accounting alone?", a: "It can, and it is often not worth doing on its own. Replacing a working ledger with an equivalent one buys nothing. The case for moving is operational: stock, production, projects or a sales process the finance system cannot see." },
      { q: "Will our accountant work in Odoo?", a: "Ask them first. Most adapt within a close or two. If they price a system they do not know differently, that difference belongs in your comparison rather than in a surprise invoice." },
      { q: "Can we run Odoo alongside Sage?", a: "Yes, with Odoo for operations and Sage kept for the ledger, connected by an interface. It works as a staged approach rather than an end state, and it needs a clear rule about which system owns which record." },
      { q: "What does a Sage migration actually involve?", a: "Confirming the product and version, a sample extract, agreeing the chart of accounts, loading balances and open items at a cutover date, rebuilding the reports people read, and one period run in parallel." },
      { q: "Why is there no price comparison?", a: "Because Sage prices differ by product, edition and reseller, and Odoo prices differ by edition and region. A figure here would be wrong for most readers. Compare written quotes that include implementation and support." },
    ],
  },

  {
    slug: "odoo-vs-tally",
    product: "Tally",
    shortName: "Tally",
    category: "Accounting software",
    framing: "The bookkeeping standard most Indian businesses already run, against one connected system. Entry speed against shared data.",
    metaTitle: "Odoo vs Tally",
    metaDescription: "Odoo vs Tally compared on what each is built for, when Tally is still the right answer, what an Odoo migration involves, and where the switching cost actually sits.",
    intro: [
      "Tally is the accounting system a very large number of Indian small and mid-sized businesses run on, and most Indian accountants know it. TallyPrime is the current product.",
      "Odoo is an ERP. The comparison is not accounting feature against accounting feature, it is whether your business needs the system that surrounds the ledger.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses where stock across locations, production, or a sales team matters as much as the books.",
      "Companies with branches or warehouses that need the same numbers at the same time.",
      "Businesses selling online, or running a point of sale, that are re-keying into the accounts.",
    ],
    otherSuits: [
      "Businesses whose need is books, statutory filing and straightforward inventory.",
      "Companies whose accounts staff and external accountant both work in Tally.",
      "Operations with high-volume voucher entry by trained staff, where keyboard speed is the productivity measure.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP covering sales, stock, production, HR and accounting in one system.", other: "Accounting and statutory compliance software with inventory." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products. Reached through a browser from anywhere.", other: "Installed on Windows, with data on a local machine or an office server. Remote access is arranged separately." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Proprietary licensing set by the vendor and its partners. Check the current terms." },
      { dimension: "Functional breadth", odoo: "Broad. Accounting is one module among many.", other: "Focused on accounting, statutory reporting and inventory." },
      { dimension: "How you change it", odoo: "Python modules extending the core, XML views, and a no-code editor in the Enterprise edition.", other: "Configuration, plus customisation in TDL, the vendor's own definition language, usually done by a Tally partner." },
      { dimension: "Data model", odoo: "One PostgreSQL database, reachable over an API.", other: "Its own data file. Data is exchanged mainly through import and export, including XML." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team.", other: "A large partner and reseller network, and a much larger pool of staff already trained on the product." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Vendor releases installed on your own schedule." },
    ],
    pickOdoo: [
      "More than one branch or warehouse, and everyone needs the same numbers now rather than at the end of the week.",
      "You manufacture or assemble, and you need bills of material and production planning.",
      "You sell online or run a point of sale, and the data is being re-keyed into the accounts.",
      "You have a sales pipeline, and it currently lives in a notebook or a spreadsheet.",
      "People need to work from different locations without a data file being copied around.",
    ],
    pickOther: [
      "Your requirement is books and statutory filing, and your stock is simple.",
      "Your accounts staff and your external accountant both work in Tally. That shared fluency is worth real money, and switching spends it.",
      "Your volume is thousands of vouchers a month entered by trained operators. Nothing beats a keyboard-driven screen that people already know cold.",
      "You do not want an implementation project, and there is nothing operationally broken to justify one.",
    ],
    notOdoo: "Do not move off Tally to fix the accounts. Move when the operation outgrows the accounts: several locations, production, online orders, a sales team. If the ledger is the only thing you use, Tally is doing that job and switching costs more than it returns.",
    migration: [
      { name: "Clean the masters before anything moves", body: "Ledger masters and stock items in a long-running Tally file usually carry duplicates and one-off entries. Cleaning them in the export file is far faster than cleaning them in Odoo afterwards." },
      { name: "Export through XML and read the sample", body: "Tally exports masters and vouchers in XML. Take one sample export first and check that the fields you actually need are in it, before anyone plans a date." },
      { name: "Map ledger groups to a chart of accounts", body: "Tally groups and ledgers do not map one to one onto an accounting chart. This mapping is a finance decision, and it is the step that decides whether the first close works." },
      { name: "Set the cutover date and bring balances", body: "Opening balances and open receivables and payables at the cutover date. The old data file stays available for prior years." },
      { name: "Configure tax before the first invoice", body: "Tax setup comes before any transaction is posted. Fixing it afterwards means corrections instead of settings." },
      { name: "Run one period in both systems", body: "Your accounts team will find in a week what a test plan misses in a month. Budget the extra hours and let them do it." },
    ],
    migrationRisks: [
      "Ledger masters carrying years of duplicates. Clean them in the export file.",
      "Stock item units and conversions that were never consistent.",
      "Godown structure that does not match how stock actually moves.",
      "Tax configuration done after the first invoices are posted.",
      "The external accountant hearing about it late.",
    ],
    countries: ["india", "uae", "saudi-arabia", "bangladesh", "oman"],
    faqs: [
      { q: "Is Odoo better than Tally?", a: "For books alone, no. Tally is faster to enter into and your accountant already knows it. Odoo is better once the business has outgrown books: several locations, production, online sales, a team that needs the same data at the same time." },
      { q: "Can Odoo handle our statutory requirements?", a: "India is one of the countries we publish localisation detail for. That page sets out what is covered and how it is handled. Read it and check it against your own filings before you decide anything." },
      { q: "Will our Tally data come across?", a: "Masters and balances, yes, through the XML export. Years of vouchers usually stay in the old file, available read-only. Loading full history into an ERP is expensive and rarely used afterwards." },
      { q: "Our staff only know Tally. Is that a problem?", a: "It is the main risk, and it is a training and change problem rather than a technical one. Budget the training properly and expect a slower first month. The businesses that skip this step are the ones that go back." },
      { q: "Can we run both for a while?", a: "For a period, yes: Odoo for operations, Tally kept for the accounts, with a summary posting between them. It is a staged move, not an end state, and one named person has to own the reconciliation." },
      { q: "Why is there no price comparison?", a: "Because licensing and support terms differ by vendor, region and reseller, and the deciding cost here is training and lost speed in the first month, not the software line." },
    ],
  },

  {
    slug: "odoo-vs-sap-business-one",
    product: "SAP Business One",
    shortName: "Business One",
    category: "Mid-market ERP",
    framing: "SAP's product for smaller companies, sold only through partners. Often a group decision rather than a product decision.",
    metaTitle: "Odoo vs SAP Business One",
    metaDescription: "Odoo vs SAP Business One compared on deployment, extension model, add-ons, partners and upgrades, including when Business One is the better choice and how a migration runs.",
    intro: [
      "SAP Business One is SAP's product for small and mid-sized businesses. It is a different product from S/4HANA, with a different architecture and a different implementation shape, and it is sold and implemented through SAP partners.",
      "It competes with Odoo directly. In practice the decision is often settled by something outside the feature list: a parent company already on SAP, or a partner with a proven add-on for your industry.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses that want the source, the database, and the option to self-host.",
      "Companies whose requirements need real code changes rather than an add-on.",
      "Buyers who want e-commerce, a website or point of sale in the same system as everything else.",
    ],
    otherSuits: [
      "Subsidiaries of a group already running SAP, where reporting up to the parent is a requirement.",
      "Industries where a proven Business One add-on already covers most of the requirement.",
      "Companies whose local SAP partner is strong and who value that relationship.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP and application platform with an open-source core.", other: "SAP's ERP for small and mid-sized businesses, separate from S/4HANA." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "On-premise, or hosted by a partner. It runs on either Microsoft SQL Server or SAP HANA." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Proprietary." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Proprietary licensing through SAP partners, with different user types. Check current terms with the partner quoting you." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website and point of sale in one product.", other: "Finance, sales, purchasing, stock and light manufacturing in the core, with vertical depth supplied by partner add-ons." },
      { dimension: "How you change it", odoo: "Python modules that extend the core. Anything in the product can be changed.", other: "User-defined fields and tables, the SDK, and partner add-ons. Extension around the core rather than modification of it." },
      { dimension: "Data model", odoo: "One PostgreSQL database.", other: "A company database per company, on SQL Server or HANA." },
      { dimension: "Who implements it", odoo: "Partners, freelancers, or your own team.", other: "SAP partners only. You do not buy it direct, so the partner matters as much as the product." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Vendor releases applied on your own schedule, with add-on compatibility to check first." },
    ],
    pickOdoo: [
      "You want the code and the database, and the freedom to change who maintains it.",
      "You need e-commerce, a website, point of sale or field operations in the same system.",
      "Your process needs deeper changes than an add-on model handles comfortably.",
      "You want to start with a few functions and grow into the rest.",
    ],
    pickOther: [
      "Your parent company runs SAP and wants you reporting into it. A subsidiary on Business One under a group SAP system is a well-established pattern, and it is a legitimate reason to stop reading here.",
      "There is a Business One add-on built for your industry that already does most of what you need, proven at companies like yours.",
      "Your local SAP partner is strong, present, and has references you can call. A good partner beats a better product with nobody behind it.",
      "Your buyers or auditors expect the SAP name. That is not a technical argument, and it is still a real one.",
    ],
    notOdoo: "Do not pick Odoo if your parent company runs SAP and expects you to report into that landscape, or if a proven industry add-on already covers your requirement. Rebuilding a vertical that already exists is a poor use of a budget.",
    migration: [
      { name: "List the add-ons first", body: "The core is the easy part. The add-ons carry the industry logic, and each one has to be re-decided: keep the requirement, drop it, or rebuild it. Do this list before agreeing any timeline." },
      { name: "Extract from the company database", body: "Data sits in a company database on SQL Server or HANA, so extraction is straightforward once someone with access is assigned. Getting that person assigned is usually where the delay is." },
      { name: "Agree the chart of accounts and the item master structure", body: "Item groups, units of measure and the account structure get decided before the load. Item master decisions are harder to reverse than account ones." },
      { name: "Bring balances and open documents", body: "Opening balances, open sales and purchase orders, open receivables and payables, and stock with values at the cutover date." },
      { name: "Rebuild the layouts customers see", body: "Invoice, delivery note and statement layouts go out to customers. Rebuild them early and get them approved before go-live rather than during it." },
      { name: "Reconcile, then run in parallel", body: "Reconcile against the last closed period, then run one full period in both systems." },
    ],
    migrationRisks: [
      "Add-ons holding undocumented industry logic.",
      "User-defined fields and tables carrying meaning nobody wrote down.",
      "Stock valuation method at cutover.",
      "Document numbering that customers or auditors expect to continue unbroken.",
    ],
    countries: ["uae", "saudi-arabia", "germany", "united-kingdom", "india"],
    faqs: [
      { q: "How is this different from comparing Odoo with SAP?", a: "SAP Business One is a different product from S/4HANA, built for smaller companies and sold only through partners. If you are being quoted S/4HANA, read the SAP comparison instead, because almost none of the detail carries across." },
      { q: "Is Odoo comparable to Business One on features?", a: "Across finance, sales, purchasing and stock, broadly yes, and Odoo adds website, e-commerce and point of sale in the same product. Business One's advantage is often a specific partner add-on, so compare against the quoted add-on list rather than against the core." },
      { q: "Can Business One add-ons be replaced?", a: "Rebuilt, not converted. Some are worth rebuilding, some exist to fill a gap Odoo does not have, and some cover a requirement nobody uses any more. Working through that list is the first real task." },
      { q: "We are a subsidiary of an SAP group. Should we still consider Odoo?", a: "Only if the group is comfortable with a different system reporting into it, usually by a periodic summary rather than a live link. If the parent requires the group system, that decision is already made and no feature comparison changes it." },
      { q: "Who implements each one?", a: "Business One is implemented by SAP partners only. Odoo can be implemented by a partner, a freelancer or your own team. That difference matters most when you want to change supplier in three years." },
      { q: "Why is there no price comparison?", a: "Because Business One is quoted per partner, per user type and per add-on, and Odoo is priced by edition and region. Any figure here would be wrong for most readers. Compare the two written quotes in full." },
    ],
  },

  {
    slug: "odoo-vs-erpnext",
    product: "ERPNext",
    shortName: "ERPNext",
    category: "Open-source ERP",
    framing: "Two open-source ERPs. ERPNext has no paid edition, and for some buyers that settles it.",
    metaTitle: "Odoo vs ERPNext",
    metaDescription: "Odoo vs ERPNext compared on licensing, architecture, ecosystem, hiring and upgrades, including the cases where ERPNext is the better choice and how a move between them runs.",
    intro: [
      "ERPNext is an open-source ERP built on the Frappe framework, in Python with MariaDB underneath. Odoo Community is open source too, with a paid Enterprise edition on top of it.",
      "That difference is the honest centre of this comparison. ERPNext has no edition split: what is in the product is in the product. Odoo has features that exist only in the paid edition, and buyers who find that out late are right to be annoyed about it.",
      "No prices appear on this page for either product.",
    ],
    odooSuits: [
      "Businesses that want a large third-party module catalogue and a wide choice of suppliers who know the system.",
      "Companies that need point of sale, website and e-commerce as part of the same product.",
      "Buyers who want a paid edition and vendor-backed hosting available as an option.",
    ],
    otherSuits: [
      "Organisations that want everything open source, with no paid edition and no feature gating.",
      "Teams with Python developers who will own and maintain the system themselves.",
      "Buyers who object to per-user licensing as a matter of policy or budget structure.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP with an open-source Community core and a paid Enterprise edition on top.", other: "An open-source ERP built on the Frappe framework. One edition." },
      { dimension: "Deployment", odoo: "Self-hosted, partner-hosted, or Odoo's hosted products.", other: "Self-hosted, partner-hosted, or hosted by the maintainer." },
      { dimension: "Source code", odoo: "The Community core is open source and published. The Enterprise applications are not.", other: "The whole product is open source, including everything in it." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise edition sold per user.", other: "Open source with no paid edition. What you pay for is hosting and support." },
      { dimension: "Functional breadth", odoo: "Sales, CRM, stock, manufacturing, accounting, HR, website, e-commerce and point of sale in one product, plus a large third-party catalogue.", other: "Sales, buying, stock, manufacturing, accounting, HR and projects in the core, with further apps from the Frappe ecosystem." },
      { dimension: "How you change it", odoo: "Python modules extending existing models, XML views, and a no-code editor in the Enterprise edition.", other: "Custom apps on the Frappe framework, with customisation of doctypes, scripts and workflows built into the platform." },
      { dimension: "Data model", odoo: "PostgreSQL. Several companies can share one database.", other: "MariaDB, with the Frappe doctype model on top of it." },
      { dimension: "Who implements it", odoo: "A large partner network, many freelancers, and a public app marketplace.", other: "A smaller but active partner and community ecosystem, with the maintainer offering services directly." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "Versioned releases, upgraded on your own schedule when you self-host." },
    ],
    pickOdoo: [
      "You want the widest choice of ready-built modules, and the widest choice of people who can maintain the system.",
      "Website, e-commerce or point of sale are part of the requirement.",
      "You want the option of a paid edition and support direct from the vendor.",
      "You need localisation for a country where the coverage is stronger. Check yours specifically rather than taking either vendor's word for it.",
    ],
    pickOther: [
      "You want the entire system open source, with no paid edition and nothing behind a licence. ERPNext is that, and Odoo is not.",
      "You have Python developers in-house who will own the system. The framework is approachable and the whole codebase is readable.",
      "Per-user licensing does not suit how you are growing, for example a lot of occasional users.",
      "You are committed to open source through the whole stack, by policy or by contract. That is a legitimate requirement and ERPNext meets it more completely.",
    ],
    notOdoo: "Do not pick Odoo if a fully open-source system with no paid edition is a hard requirement. Odoo Community is real and people run businesses on it, but some features exist only in the paid edition, and pretending otherwise wastes everyone's time.",
    migration: [
      { name: "Accept that neither direction is automatic", body: "The two systems have different data models and there is no converter. A move either way is an export, a mapping and a load, and anyone promising otherwise has not done one." },
      { name: "Export through the API or the database", body: "Everything is reachable through the framework's API or directly in MariaDB, so extraction is easier than with a closed product. That is a genuine advantage of open source, and it applies on both sides." },
      { name: "Map doctypes to Odoo models", body: "This is where the judgement sits. A customised doctype usually carries decisions that need re-deciding rather than re-creating, and the mapping exercise is what surfaces them." },
      { name: "Bring master data and balances at a cutover date", body: "Customers, suppliers, items, the chart of accounts, open documents, and balances at the cutover date. History stays in the old system, available read-only." },
      { name: "Reconcile, then run in parallel", body: "Reconcile balances against the source, then run one period in both systems before switching off." },
    ],
    migrationRisks: [
      "Custom doctypes carrying business rules that were never documented.",
      "Naming series and document numbering that have to continue unbroken.",
      "Server scripts and client scripts that have to be re-decided rather than ported.",
      "Stock valuation at cutover.",
    ],
    countries: ["india", "uae", "united-states", "united-kingdom", "australia"],
    faqs: [
      { q: "Which one is more open source?", a: "ERPNext, without qualification. The whole product is open source and there is no paid edition. Odoo Community is open source and the Enterprise edition is not. If that matters to you, it is the deciding fact and the rest of this page is detail." },
      { q: "Is Odoo Community usable on its own?", a: "Yes. It is the same core, the same models and the same framework. What it leaves out is a set of applications, the no-code editor, the official mobile apps, and vendor hosting. We publish a separate page that lists what Community does not include, so you can check before you commit." },
      { q: "Which has the bigger ecosystem?", a: "Odoo has more third-party modules and more people who can be hired to work on it. Check that yourself for the specific functions you need, on both marketplaces, rather than taking a claim from a vendor page, including this one." },
      { q: "Can we hire for either?", a: "For Odoo, more easily in most markets. For ERPNext the pool is smaller and tends to be more technical. If you are self-hosting and maintaining it yourself, that gap matters less than it looks." },
      { q: "Do you work on ERPNext?", a: "No. Our work is Odoo. We are telling you where ERPNext is the better fit because sending a business into the wrong system wastes a year for both of us." },
      { q: "Why is there no price comparison?", a: "Because the licence line is not where the money goes in either case. Hosting, implementation and the people who maintain the system decide the total, and those depend on your scope, not on a published rate." },
    ],
  },

  {
    slug: "odoo-vs-spreadsheets",
    product: "Spreadsheets",
    shortName: "spreadsheets",
    category: "No system yet",
    framing: "The most common system we replace, and still the right answer for more businesses than software vendors admit.",
    metaTitle: "Odoo vs Spreadsheets",
    metaDescription: "When spreadsheets are still the right answer and when they stop being one: the signs a business has outgrown them, what an Odoo rollout replaces, and how the move actually runs.",
    intro: [
      "Most businesses run on spreadsheets before they run on anything else, and for a while that is correct. They are fast, they impose no process, and everyone can already use one.",
      "This page is about the point where that stops being true, and about the point before it, where buying an ERP costs money and buys very little.",
      "There is no pricing here. What decides this is not the price of software, it is whether the work you are doing by hand has started costing more than the system would.",
    ],
    odooSuits: [
      "Businesses where more than one person needs to change the same numbers.",
      "Operations with stock, production or fulfilment, where an error turns into a physical problem.",
      "Companies facing audit, tax filing or investor scrutiny, where who changed what has to be answerable.",
    ],
    otherSuits: [
      "Businesses in their first phase, where the process changes every week.",
      "Teams of one or two, where the file has one clear owner.",
      "Analysis, modelling and one-off calculations, which spreadsheets do better than any ERP.",
    ],
    rows: [
      { dimension: "What it is", odoo: "An ERP: a shared system with a defined data model, roles, and a record of what happened.", other: "A general calculation tool. It will hold any shape of data you put into it, which is both the strength and the problem." },
      { dimension: "Deployment", odoo: "A server you or a partner runs, or a hosted product. Everyone works in the same instance.", other: "A file on a drive, or a cloud document. Copies spread, and copies diverge." },
      { dimension: "Source code", odoo: "The Community core is open source and published.", other: "Not applicable. Your formulas are yours, and they are usually the only written record of how the business works." },
      { dimension: "Licensing model", odoo: "Open-source Community edition, plus a paid Enterprise subscription per user.", other: "Part of the office suite you already have." },
      { dimension: "Functional breadth", odoo: "Sales, stock, production, accounting, HR and more, connected to each other.", other: "Anything you can build, with no limits and no guardrails." },
      { dimension: "How you change it", odoo: "Configuration, then Python modules for anything deeper. Changes are versioned and tested before they go live.", other: "Anyone with the file can change anything, immediately, including the formulas." },
      { dimension: "Data model", odoo: "One database. A customer is one record, referenced everywhere it is needed.", other: "Whatever each sheet happens to contain. The same customer is spelled three ways across four tabs." },
      { dimension: "Who implements it", odoo: "A partner, a freelancer or your own team, as a project.", other: "Whoever built it. Usually one person, usually still the only one who fully understands it." },
      { dimension: "Upgrades", odoo: "A major version each year, taken as a project when you choose.", other: "None. Nothing breaks on a schedule. It breaks when somebody drags a formula." },
    ],
    pickOdoo: [
      "Two people edit the same numbers and nobody is sure which copy is current.",
      "Stock on the sheet and stock on the shelf disagree, and the only fix is a physical count.",
      "Invoice numbers are maintained by hand.",
      "Month-end takes days of copying between files.",
      "Someone asks who changed a figure, and nobody can answer.",
      "The business depends on a file one person built, and only that person understands it.",
      "Every new hire needs a week of training on a spreadsheet before they can do the job.",
    ],
    pickOther: [
      "You are early and the process still changes weekly. Encoding a process into a system before it settles is expensive, and it slows you down.",
      "One or two people touch the data, and the file has one clear owner.",
      "You have no stock, or stock you could count in a minute.",
      "You have no audit or filing pressure beyond a simple annual return.",
      "The work is analysis or modelling. Spreadsheets stay the right tool for that even after an ERP arrives.",
    ],
    notOdoo: "Do not buy an ERP because the spreadsheets feel unprofessional. Buy one when you can name what they cost you: a wrong stock figure, a duplicate invoice, a week of month-end, a customer given the wrong delivery date. If you cannot name it, you are early.",
    migration: [
      { name: "Find the files people actually use", body: "Not the ones on the shared drive. The ones on a laptop with a date in the filename. Ask each person what they open first in the morning, and work from that list." },
      { name: "Separate master data from history", body: "Customers, suppliers, products and prices are master data and they come across. Two years of order lines usually stay in the file and get archived." },
      { name: "Clean before loading, not after", body: "Duplicate customers, inconsistent product codes, three spellings of one supplier. Fix these in the file, in a column your team can see, because they are the only people who know which version is right." },
      { name: "Load master data first and have it checked", body: "Load customers, suppliers and products, then have the people who use them look at their own records before anything else happens." },
      { name: "Bring opening balances at a cutover date", body: "Balances at a date, plus open invoices and open orders. Take the balances from whoever prepares your accounts, not from the sheet." },
      { name: "Go live on a quiet week and keep the files for one period", body: "Nobody deletes the spreadsheets on day one. They stay available, read-only, for one full period. That is what stops a bad first week turning into a retreat." },
    ],
    migrationRisks: [
      "Formulas holding business rules that nobody has ever written down.",
      "The person who owns the master file, who has not been asked and does not want this.",
      "Product codes that turn out not to be unique.",
      "Opening stock quantities taken from the sheet instead of from a count.",
      "Going live in the busiest week of the year.",
    ],
    countries: ["uae", "saudi-arabia", "united-kingdom", "united-states", "pakistan"],
    faqs: [
      { q: "Are we too small for Odoo?", a: "Possibly, and we will say so. If the process still changes every week, if one or two people touch the data, and if there is no stock to get wrong, a rollout will take more from you than it gives back. Come back when you can name what the spreadsheets are costing you." },
      { q: "Can we move the spreadsheets across as they are?", a: "The master data yes, the structure no. A sheet built around one person's way of working does not become a system by being imported. The cleaning step is where the value is, and your team has to do part of it because only they know which duplicate is right." },
      { q: "Will we still use spreadsheets afterwards?", a: "Yes, and you should. Analysis, modelling and one-off calculations stay in a spreadsheet. What changes is where the numbers come from: exported from one system rather than typed in from several." },
      { q: "What is the smallest sensible starting point?", a: "One or two functions that hurt today, usually sales and stock, or invoicing and stock. Everything at once is how small rollouts fail." },
      { q: "How long does it take?", a: "A small first phase is weeks rather than months, and most of the elapsed time is cleaning data and training people rather than configuring software." },
      { q: "What is the biggest risk?", a: "The person who owns the spreadsheets not being part of the decision. They know things nobody wrote down, and if the project happens to them rather than with them, it stalls." },
    ],
  },
];

/** Lookup by slug, for pages that hold a slug and need the record. */
export const COMPARISON_BY_SLUG: Record<string, Comparison | undefined> = Object.fromEntries(
  COMPARISONS.filter((c) => c && typeof c.slug === "string" && c.slug.trim()).map((c) => [c.slug, c]),
);
