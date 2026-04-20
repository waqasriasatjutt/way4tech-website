export const SITE = {
  name: 'Way4Tech',
  tagline: 'Odoo ERP that fits your business — not the other way around.',
  description: 'Global Odoo Gold Partner. 9+ years of Odoo delivery, 500+ deployments, 1000+ custom modules. Implementation, customization, SaaS, and support across 18 countries.',
  url: 'https://way4tech.com',
  email: 'info@way4tech.com',
  alt_email: 'waqasriasatjutt@gmail.com',
  phone: '+92 315 411 4748',
  whatsapp: 'https://wa.me/923154114748',
  locations: ['Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany'],
  social: {
    linkedin: 'https://linkedin.com/in/waqasriasatjutt',
    github: 'https://github.com/waqasriasatjutt',
  },
};

export const STATS = [
  { value: '9+',     label: 'Years in Odoo' },
  { value: '500+',   label: 'Deployments' },
  { value: '1000+',  label: 'Custom Modules' },
  { value: '18',     label: 'Countries Served' },
];

export const HIGHLIGHTS = [
  { icon: '🏆', title: 'Odoo Gold Partner', desc: 'Certified partner with deep v12 → v19 expertise.' },
  { icon: '🌍', title: '18 Countries', desc: 'Localized compliance for MENA, EU, North America, APAC.' },
  { icon: '🚀', title: '500+ Go-Lives', desc: 'From 10-seat shops to 2000-user enterprises.' },
  { icon: '🔧', title: '1000+ Modules', desc: 'Library of battle-tested OCA & custom modules.' },
  { icon: '🛡️', title: 'SLA-backed Support', desc: '24/7 monitoring, backups, security patching.' },
  { icon: '💬', title: 'Arabic · English · Urdu', desc: 'Multilingual project teams end-to-end.' },
];

/* ─────────────────────────────────────────────────────────────
 * SERVICES (15) — every major Odoo service you can sell
 * ───────────────────────────────────────────────────────────── */
export const SERVICES = [
  { slug: 'odoo-implementation', title: 'Odoo Implementation', tagline: 'End-to-end Odoo deployment — from discovery to go-live.', icon: '🚀', category: 'Core',
    short: 'Full-stack Odoo implementation — discovery, configuration, data migration, training, and go-live support with defined milestones and fixed deliverables.',
    details: ['Business process analysis & gap assessment','Module selection and configuration','Data migration from legacy systems (SAP, Oracle, QuickBooks, Tally)','User training and documentation','Go-live support and hypercare','Multi-company and multi-currency setup','Phased rollout strategy','Change management planning'] },
  { slug: 'odoo-customization', title: 'Odoo Customization', tagline: 'Custom modules built to match your exact workflow.', icon: '⚙️', category: 'Core',
    short: 'Custom modules, workflows, reports, and OWL components engineered so Odoo fits your business — not the other way around.',
    details: ['Custom Python modules and business logic','Workflow automation with server actions','Custom reports (QWeb, XLSX, PDF)','OWL component development','Industry-specific workflows','UX and branding customization','Automated tests (pytest, tours)','Code review and handover'] },
  { slug: 'odoo-support', title: 'Odoo Support & Maintenance', tagline: '24/7 monitoring, bug fixes, performance tuning.', icon: '🛟', category: 'Core',
    short: 'SLA-backed support with priority ticketing, health monitoring, bug fixes, backup verification, and routine performance tuning.',
    details: ['Priority ticket response (2h/4h/8h tiers)','Bug fixes and emergency patches','Performance tuning and index optimization','Daily backup verification','Odoo version upgrades','User refresher training','Security patching','Monthly health reports'] },
  { slug: 'hire-odoo-developer', title: 'Hire Odoo Developer', tagline: 'Dedicated developers by the week or month.', icon: '👨‍💻', category: 'Talent',
    short: 'Senior Odoo developers, functional consultants, and project managers — available on dedicated or part-time engagements with NDA and transparent tracking.',
    details: ['Senior Python + OWL developers','Functional consultants with 5+ years','Part-time, full-time, or sprint-based','Daily stand-ups and weekly reports','Direct Slack/WhatsApp access','NDA-protected engagements','Timezone overlap (GMT to GMT+11)','Replacement guarantee within 7 days'] },
  { slug: 'odoo-integration', title: 'Odoo Integration', tagline: 'Connect Odoo with your stack and third-party APIs.', icon: '🔗', category: 'Core',
    short: 'Integrate Odoo with payment gateways, shipping carriers, e-commerce platforms, banking APIs, WhatsApp, and any custom REST/GraphQL service.',
    details: ['Payment gateways (Stripe, HyperPay, PayTabs, Mada, Razorpay)','Shipping carriers (Aramex, DHL, FedEx, local couriers)','E-commerce (Shopify, WooCommerce, Magento, Amazon)','WhatsApp Business API','Banking, ERP-to-ERP, EDI','Power BI / Metabase / Tableau connectors','Real-time webhook pipelines','Retry, idempotency, and audit logging'] },
  { slug: 'odoo-migration', title: 'Odoo Migration & Upgrade', tagline: 'Upgrade safely from older Odoo versions.', icon: '🔄', category: 'Core',
    short: 'Safe database + code migration from Odoo 10 through 18 to the latest version, including custom modules, historical transactions, and user-uploaded attachments.',
    details: ['Database migration with zero data loss','Custom module code migration','Historical transaction validation','Test environment for sign-off','Cutover plan with rollback','User retraining on new version','Post-upgrade patch support','Community → Enterprise migration'] },
  { slug: 'odoo-consultancy', title: 'Odoo Consultancy', tagline: 'Expert advice on architecture, licensing, and strategy.', icon: '💡', category: 'Strategy',
    short: 'Strategic consulting for CTOs and founders — architecture reviews, licensing optimization, multi-tenant strategy, and 3-year ERP roadmaps.',
    details: ['Community vs Enterprise decision','On-premise vs cloud hosting','Multi-company and multi-tenant architecture','SaaS deployment planning','License & cost optimization','3-5 year ERP roadmap','Vendor evaluation (Odoo vs SAP vs NetSuite)','Data governance & compliance review'] },
  { slug: 'odoo-training', title: 'Odoo Training', tagline: 'Role-based training for users, admins, developers.', icon: '🎓', category: 'Talent',
    short: 'Structured training programs — end-user, administrator, and developer bootcamps — delivered on-site or remotely with hands-on labs and certification.',
    details: ['End-user training (sales, purchase, inventory, HR)','Admin training (security, users, backups)','Developer bootcamp (Python, OWL, XML)','Role-based curriculum','Hands-on lab exercises','Certification on completion','Video recordings of sessions','Post-training support channel'] },
  { slug: 'odoo-saas-hosting', title: 'Odoo SaaS & Hosting', tagline: 'Multi-tenant Odoo hosting with 99.9% SLA.', icon: '☁️', category: 'Cloud',
    short: 'Run your own Odoo SaaS platform or consume ours — multi-tenant, auto-scaling, automated backups, Cloudflare-proxied, 99.9% uptime SLA.',
    details: ['Multi-tenant or single-tenant deployments','Auto-scaling infrastructure','Automated encrypted backups','Cloudflare DNS & DDoS protection','SSL auto-renewal (Let\'s Encrypt)','Disk/CPU/uptime monitoring','99.9% uptime SLA','Disaster recovery & geo-redundancy'] },
  { slug: 'odoo-audit', title: 'Odoo Health Audit', tagline: 'Deep technical + functional audit of your instance.', icon: '🔍', category: 'Strategy',
    short: 'Comprehensive 2-week audit covering code quality, database health, security, workflow efficiency, and license compliance — with a 50-page written report.',
    details: ['Code quality & security review','Database performance analysis','Unused/legacy modules audit','Workflow efficiency review','License compliance check','Security hardening checklist','50+ page written report','Executive briefing session'] },
  { slug: 'odoo-localization', title: 'Odoo Localization', tagline: 'Country-specific compliance out of the box.', icon: '🌍', category: 'Compliance',
    short: 'Tax, invoicing, e-invoicing, payroll, and accounting localization for 18 countries — ZATCA, FBR, GSTIN, VIES, EU VAT, and more.',
    details: ['ZATCA Phase 2 e-invoicing (KSA)','FBR FBR POS integration (Pakistan)','UAE VAT 5% & FTA reporting','India GST + GSTIN + e-Way Bill','EU VAT MOSS / OSS','US Sales Tax / Avalara','Arabic RTL + English bilingual layouts','Country-specific CoA and payroll'] },
  { slug: 'odoo-e-invoicing', title: 'E-invoicing & ZATCA', tagline: 'ZATCA Phase 2, UBL, PEPPOL certification.', icon: '📋', category: 'Compliance',
    short: 'End-to-end e-invoicing enablement — ZATCA Phase 2 (KSA), UBL 2.1, PEPPOL, Italy SDI, India IRN — with QR codes, XML generation, and clearance workflows.',
    details: ['ZATCA Phase 2 (KSA) clearance','UBL 2.1 XML generation','PEPPOL network integration','Italy SDI, India IRN, Egypt ETA','QR code signing (ECDSA)','Clearance & reporting workflows','Archive-ready long-term storage','Audit trail & re-submission'] },
  { slug: 'odoo-payroll-setup', title: 'Payroll Setup', tagline: 'Country-specific payroll configuration.', icon: '💰', category: 'HR',
    short: 'Design and configure payroll rule books for any country — tax slabs, social security, overtime, allowances — with audit trail from rule to payslip line.',
    details: ['Country-specific tax slabs & social security','Salary structures & grade mapping','Overtime, shift allowance, encashment','Loan, advance, arrears rules','Bank file generation (SAMA, SIF, SEPA)','Auditable rule → payslip line trace','End-of-service gratuity calculation','Year-end tax slips & Form 16/EPS'] },
  { slug: 'odoo-pos-deployment', title: 'POS Deployment', tagline: 'Retail / F&B / salon / clinic POS end-to-end.', icon: '🛒', category: 'Retail',
    short: 'Industry-specific POS rollout — retail, restaurant, salon, clinic, car wash — with hardware integration (scanner, scale, printer, IoT box) and offline mode.',
    details: ['Industry-specific POS configuration','Hardware integration (scanner, scale, printer)','IoT box & direct-USB devices','Offline-first operation','Multi-store & multi-currency','Loyalty, gift card, membership','Kitchen display system (KDS)','ZATCA / FBR POS compliance'] },
  { slug: 'odoo-ecommerce', title: 'Odoo E-Commerce', tagline: 'High-conversion Odoo websites & shops.', icon: '🛍️', category: 'Digital',
    short: 'Odoo Website + eCommerce builds with SEO, payment gateways, shipping, multi-language, multi-currency, abandoned cart, and headless front-ends.',
    details: ['Odoo Website theme customization','Multi-language & multi-currency','Payment gateways & BNPL','Shipping carrier integrations','Abandoned cart recovery','SEO metadata, sitemaps, schema','Headless Odoo + Next.js/Astro','PWA & mobile-first layouts'] },
];

/* ─────────────────────────────────────────────────────────────
 * ODOO CORE MODULES (25) — every Odoo app with a dedicated page
 * ───────────────────────────────────────────────────────────── */
export const MODULES = [
  { slug: 'sales', title: 'Odoo Sales', icon: '📈', category: 'Sales', tagline: 'Quotes, orders, pricelists, subscriptions.', short: 'Streamline the quote-to-order process with templates, pricelists, discounts, electronic signatures, and order confirmation workflows.', features: ['Configurable quote templates','Customer-specific pricelists','Upsell, cross-sell, subscription','Electronic signature on quote','Commission tracking','Real-time margin analysis'] },
  { slug: 'crm', title: 'Odoo CRM', icon: '🎯', category: 'Sales', tagline: 'Leads, opportunities, pipeline, activities.', short: 'End-to-end lead-to-opportunity pipeline with kanban, activities, predictive lead scoring, and VoIP/WhatsApp integration.', features: ['Lead capture from any source','Kanban pipeline by stage','Activity & task scheduling','Predictive lead scoring','VoIP & WhatsApp integration','Automated nurture sequences'] },
  { slug: 'inventory', title: 'Odoo Inventory', icon: '📦', category: 'Operations', tagline: 'Stock moves, warehouses, barcode, lots.', short: 'Multi-warehouse inventory with double-entry stock moves, barcode operations, lot/serial tracking, and fully integrated landed costs.', features: ['Multi-warehouse & multi-location','Barcode operations (wave, cluster, batch)','Lot, serial, expiry tracking','Putaway & removal strategies','Landed costs & AVCO/FIFO','Real-time valuation'] },
  { slug: 'purchase', title: 'Odoo Purchase', icon: '🛒', category: 'Operations', tagline: 'RFQ, PO, vendor bills, drop-shipping.', short: 'Automate procurement — vendor portal, RFQ, PO approvals, three-way match, and vendor performance analytics.', features: ['RFQ with multi-vendor comparison','PO approval workflows','Vendor portal self-service','Three-way match (PO/GR/Bill)','Vendor performance KPIs','Drop-shipping & consignment'] },
  { slug: 'accounting', title: 'Odoo Accounting', icon: '💼', category: 'Finance', tagline: 'General ledger, AR/AP, tax, e-invoicing.', short: 'Full double-entry accounting with multi-currency, automated reconciliation, tax localization, e-invoicing, and IFRS/GAAP-ready reports.', features: ['Multi-company, multi-currency','Automated bank reconciliation','Tax localization (50+ countries)','E-invoicing (ZATCA, PEPPOL, SDI)','Fixed assets & depreciation','IFRS/GAAP reports'] },
  { slug: 'hr', title: 'Odoo HR', icon: '👥', category: 'HR', tagline: 'Employees, contracts, departments, onboarding.', short: 'Central employee directory with contracts, departments, org chart, skills, documents, and full onboarding/offboarding workflows.', features: ['Employee master data','Org chart & departments','Contracts & grade mapping','Onboarding & offboarding checklists','Skills & certifications','Document vault'] },
  { slug: 'payroll', title: 'Odoo Payroll', icon: '💰', category: 'HR', tagline: 'Salary rules, payslips, bank files.', short: 'Country-agnostic payroll engine with versioned rule books, batch processing, and audit trail from rule → payslip line.', features: ['Versioned salary rules','Batch payroll processing','Bank file generation','Loan & advance management','Year-end tax slips','Audit-ready payslip trace'] },
  { slug: 'attendance', title: 'Odoo Attendance', icon: '🕒', category: 'HR', tagline: 'Check-in/out, biometric, ZKTeco.', short: 'Attendance tracking via biometric devices, mobile app, kiosk, or PIN — with late/early/OT auto-detection and shift awareness.', features: ['ZKTeco biometric integration','Mobile/kiosk check-in','Shift & roster management','Late/early/OT detection','Geo-fenced check-in','Monthly summary reports'] },
  { slug: 'timesheets', title: 'Odoo Timesheets', icon: '⏱️', category: 'HR', tagline: 'Project time tracking and approvals.', short: 'Log time against projects and tasks with mobile entry, manager approvals, client invoicing, and profitability reports.', features: ['Mobile & desktop entry','Manager approval workflows','Client invoicing from timesheets','Billable vs non-billable','Project profitability','Utilization KPIs'] },
  { slug: 'leaves', title: 'Odoo Leaves', icon: '🏖️', category: 'HR', tagline: 'Time-off requests, balances, carry-forward.', short: 'Leave policies, balances, carry-forward, encashment, comp-off, and multi-level approvals — with team calendar and conflict detection.', features: ['Multi-policy leave types','Carry-forward & encashment','Comp-off requests','Multi-level approvals','Team calendar','Balance history & forecasting'] },
  { slug: 'recruitment', title: 'Odoo Recruitment', icon: '🧲', category: 'HR', tagline: 'Job postings, pipeline, interviews.', short: 'Applicant tracking with kanban pipeline, resume parsing, interview scheduling, and integrations to LinkedIn, Indeed, and Bayt.', features: ['Job postings to multi-boards','Resume parsing','Interview scheduling','Feedback & scorecards','Offer letter & contracts','Referral program'] },
  { slug: 'appraisals', title: 'Odoo Appraisals', icon: '🏅', category: 'HR', tagline: '360° reviews, goals, KPIs.', short: '360-degree performance reviews with configurable forms, goal tracking, manager/peer feedback, and calibration meetings.', features: ['Configurable review forms','360° feedback','Goal & KPI tracking','Calibration meetings','Development plans','Review history'] },
  { slug: 'project', title: 'Odoo Project', icon: '📋', category: 'Services', tagline: 'Tasks, milestones, gantt, kanban.', short: 'Manage projects with kanban, gantt, milestones, subtasks, client portals, and analytic accounting integration.', features: ['Kanban & gantt views','Tasks, subtasks, milestones','Customer portal access','Time & material billing','Analytic accounting','Burn-down charts'] },
  { slug: 'helpdesk', title: 'Odoo Helpdesk', icon: '🎟️', category: 'Services', tagline: 'Tickets, SLA, escalations, knowledge.', short: 'Multichannel helpdesk with SLA policies, escalations, team rotations, knowledge base, and customer portal.', features: ['SLA policies & escalations','Team rotations','Knowledge base','Customer portal','Email-to-ticket','CSAT surveys'] },
  { slug: 'manufacturing', title: 'Odoo Manufacturing (MRP)', icon: '🏭', category: 'Operations', tagline: 'BOMs, work orders, MRP, quality.', short: 'Full MRP — BOMs, routings, work orders, MRP planning, shop floor terminals, and quality checkpoints.', features: ['Multi-level BOMs','Work centers & routings','MRP planning & procurement','Shop floor terminal','Quality control points','Maintenance integration'] },
  { slug: 'maintenance', title: 'Odoo Maintenance', icon: '🔧', category: 'Operations', tagline: 'Preventive + corrective maintenance.', short: 'Plan preventive maintenance, track breakdowns, measure MTBF/MTTR, and integrate with MRP and fleet.', features: ['Preventive & corrective','MTBF / MTTR tracking','Work orders & parts','MRP & fleet integration','Meter-based triggers','Cost tracking per asset'] },
  { slug: 'quality', title: 'Odoo Quality', icon: '✅', category: 'Operations', tagline: 'Control points, checks, alerts.', short: 'Define quality control points across receipt, production, and delivery — with pass/fail, measures, and alert workflows.', features: ['Control points & tests','Pass/fail & measure','Quality alerts','Non-conformance workflow','ISO 9001 ready','SPC charts'] },
  { slug: 'website', title: 'Odoo Website', icon: '🌐', category: 'Digital', tagline: 'Drag-and-drop site builder with SEO.', short: 'Website builder with blocks, multi-lingual, SEO, blog, forum, and deep integration to CRM, eCommerce, events.', features: ['Drag-and-drop blocks','Multi-lingual & RTL','SEO & sitemap','Blog & forum','CRM form integration','A/B test snippets'] },
  { slug: 'ecommerce', title: 'Odoo eCommerce', icon: '🛍️', category: 'Digital', tagline: 'Online shop with payment + shipping.', short: 'Full-stack eCommerce with product variants, pricelists, payment gateways, shipping rules, abandoned cart, and loyalty.', features: ['Product variants & configurator','Multi-currency & multi-language','Payment gateways & BNPL','Shipping carriers','Abandoned cart recovery','Coupon & gift card'] },
  { slug: 'pos', title: 'Odoo POS', icon: '🧾', category: 'Retail', tagline: 'Retail & restaurant POS with offline.', short: 'Fast, offline-ready POS for retail and restaurants with hardware support, multi-store, loyalty, and tax compliance (ZATCA / FBR).', features: ['Offline-first operation','Hardware support (scanner, scale, printer)','Multi-store & multi-currency','Loyalty, gift card, membership','Kitchen display system','ZATCA/FBR compliance'] },
  { slug: 'marketing-automation', title: 'Marketing Automation', icon: '📣', category: 'Digital', tagline: 'Drip campaigns, lead scoring, segmentation.', short: 'Visual flow builder for drip campaigns, lead nurturing, segmentation, and triggered journeys across email, SMS, and WhatsApp.', features: ['Visual journey builder','Email + SMS + WhatsApp','Lead scoring','Segmentation','A/B test','Attribution reporting'] },
  { slug: 'email-marketing', title: 'Email Marketing', icon: '📧', category: 'Digital', tagline: 'Newsletters, A/B test, deliverability.', short: 'Responsive email builder with A/B testing, deliverability monitoring, bounce handling, and unsubscribe management.', features: ['Responsive template builder','A/B testing','Deliverability monitoring','Bounce & unsubscribe','Mailing list management','Analytics dashboard'] },
  { slug: 'sign', title: 'Odoo Sign', icon: '✍️', category: 'Services', tagline: 'Electronic signatures, legal-grade.', short: 'Legal-grade electronic signatures — templates, role-based fields, audit trail, and integration to contracts, offers, and HR docs.', features: ['Templated documents','Role-based fields','Audit trail (IP, timestamp)','Bulk send','Integration with CRM/HR','Compliance: eIDAS, ESIGN'] },
  { slug: 'documents', title: 'Odoo Documents', icon: '📂', category: 'Services', tagline: 'Document management + workflows.', short: 'Central document hub with workspaces, versioning, OCR, and workflow automation (share, request signature, create bill).', features: ['Workspaces & tagging','Versioning','OCR on PDFs & images','Workflow actions','Integration with all modules','GDPR-ready retention'] },
  { slug: 'knowledge', title: 'Odoo Knowledge', icon: '📚', category: 'Services', tagline: 'Wiki + procedures + runbooks.', short: 'Internal wiki with rich articles, property-based structured data, template library, and full-text search — your team\'s single source of truth.', features: ['Rich article editor','Property-based data','Template library','Full-text search','Favorites & sharing','Versioning & history'] },
];

/* ─────────────────────────────────────────────────────────────
 * INDUSTRY SOLUTIONS (20)
 * ───────────────────────────────────────────────────────────── */
export const SOLUTIONS = [
  { slug: 'hospital-management', title: 'Hospital Management', icon: '🏥', tagline: 'Patient records, OPD/IPD, pharmacy, billing, insurance.', short: 'Complete HMIS on Odoo — patient registration, OPD/IPD, pharmacy, lab, radiology, billing, insurance claims, and electronic medical records.', features: ['Patient registration & EMR','OPD, IPD, ward management','Pharmacy with batch & expiry','Lab & radiology orders','Insurance claims & TPA','Doctor rosters & appointments','Billing & ZATCA e-invoicing','HL7/FHIR integrations'] },
  { slug: 'clinic-management', title: 'Clinic Management', icon: '🩺', tagline: 'Appointments, prescriptions, billing for clinics.', short: 'Single or multi-branch clinic management — appointments, prescriptions, billing, SMS reminders, and patient portal.', features: ['Appointment scheduling','Prescription templates','SMS / WhatsApp reminders','Patient portal','Insurance & TPA billing','Doctor commission','Walk-in queue management','Waiting room display'] },
  { slug: 'pharmacy', title: 'Pharmacy Management', icon: '💊', tagline: 'Batch, expiry, narcotic control, POS.', short: 'Retail & hospital pharmacy — batch/expiry tracking, narcotic register, prescription-linked POS, and automated reorder.', features: ['Batch & expiry tracking','Narcotic register','Prescription POS','Automated reorder','Supplier & distributor portals','Loyalty & membership','Insurance billing','Cold chain monitoring'] },
  { slug: 'dental-clinic', title: 'Dental Clinic', icon: '🦷', tagline: 'Treatment plans, procedures, imaging.', short: 'Dental-specific workflows — treatment plans, procedure billing, tooth chart, imaging archive, and recall reminders.', features: ['Treatment plans','Procedure catalog','Dental tooth chart','Imaging archive (DICOM lite)','Recall reminders','Insurance claims','Multi-dentist scheduling','Patient consent forms'] },
  { slug: 'hotel-hospitality', title: 'Hotel & Hospitality', icon: '🏨', tagline: 'Front desk, housekeeping, F&B, revenue.', short: 'Hotel PMS on Odoo — reservations, front desk, housekeeping, F&B POS, night audit, and OTA channel manager.', features: ['Reservation & front desk','Housekeeping management','F&B POS + room charging','Night audit','Channel manager (Booking, Expedia)','Revenue management','City/tourism tax','Group & corporate rates'] },
  { slug: 'restaurant-fnb', title: 'Restaurant & F&B', icon: '🍽️', tagline: 'Table POS, KDS, menu engineering.', short: 'Restaurant POS with table plan, kitchen display, menu engineering, split bills, tips, and central-kitchen BOM.', features: ['Table plan & floor','Kitchen display system','Split bills & tips','Menu engineering','Recipe BOMs','Central kitchen planning','Delivery app integrations','ZATCA Phase 2'] },
  { slug: 'retail-stores', title: 'Retail & Multi-Store', icon: '🏪', tagline: 'Multi-store POS, loyalty, eCommerce.', short: 'Retail chain operations — multi-store POS, central purchasing, loyalty, gift cards, and unified online+offline inventory.', features: ['Multi-store POS','Central purchasing','Loyalty & gift cards','Unified inventory','Online + offline sync','Store manager dashboards','Return & exchange','Employee discount control'] },
  { slug: 'supermarket', title: 'Supermarket & Grocery', icon: '🛒', tagline: 'Scale integration, weighted items, promos.', short: 'Supermarket chain operations — scale integration, weighted items, promotions, private-label, and fresh food traceability.', features: ['Scale & weighing integration','Weighted & loose items','Multi-buy promotions','Private-label management','Fresh traceability','Shelf-edge labels','Cashier performance','Shrinkage tracking'] },
  { slug: 'construction', title: 'Construction & Real Estate Dev', icon: '🏗️', tagline: 'Project costing, subcontractors, progress billing.', short: 'Construction project management with BOQs, subcontractor ledgers, progress billing, retention, and site equipment tracking.', features: ['Project BOQ & costing','Subcontractor ledgers','Progress billing & retention','Site equipment tracking','Material reconciliation','Safety & HSE','Drawings & RFIs','Subcontractor payroll'] },
  { slug: 'real-estate', title: 'Real Estate & Leasing', icon: '🏢', tagline: 'Listings, leases, rent roll, maintenance.', short: 'Property management — listings, leases, rent schedules, maintenance tickets, tenant portal, and utilities re-billing.', features: ['Property & unit master','Leases & renewals','Rent schedules & PDC','Tenant portal','Maintenance tickets','Utilities re-billing','Broker commissions','Eviction workflow'] },
  { slug: 'school-management', title: 'School Management', icon: '🎓', tagline: 'Students, fees, attendance, transport.', short: 'K-12 school ERP — admissions, students, fees, attendance, timetables, exams, transport, and parent portal.', features: ['Admissions & enrollment','Fee structure & collection','Daily attendance','Timetable & exams','Transport & routes','Parent portal & SMS','Library & hostel','Report cards & transcripts'] },
  { slug: 'university-college', title: 'University & College', icon: '🎓', tagline: 'Admissions, programs, credits, alumni.', short: 'Higher-education ERP with admissions, program/course management, credit hours, exams, alumni, and research grants.', features: ['Admissions funnel','Programs & courses','Credit hours & GPA','LMS integration','Alumni database','Research grants','Hostel & mess','Scholarship workflows'] },
  { slug: 'logistics-transport', title: 'Logistics & Transport', icon: '🚚', tagline: 'Trucking, dispatch, driver, freight billing.', short: 'Logistics ERP — trip planning, driver assignment, fuel tracking, freight invoicing, and fleet maintenance.', features: ['Trip planning & dispatch','Driver & truck assignment','Fuel & toll tracking','Freight invoicing','Vehicle maintenance','GPS integration','Subcontract trips','Customs paperwork'] },
  { slug: 'distribution-fmcg', title: 'Distribution & FMCG', icon: '📦', tagline: 'Van sales, route, promotions, returns.', short: 'FMCG distribution — van sales, route planning, dealer schemes, returns, and secondary-sales dashboards.', features: ['Van sales mobile app','Route planning','Dealer schemes','Returns & expiry','Secondary-sales reporting','Credit limits','Gift-pack & combos','KPI per van/rep'] },
  { slug: 'manufacturing-industry', title: 'Manufacturing (Discrete & Process)', icon: '🏭', tagline: 'MRP, shop floor, quality, traceability.', short: 'Discrete & process manufacturing — multi-level BOMs, routings, shop floor, quality, lot traceability, and subcontracting.', features: ['Multi-level BOMs','Work centers & routings','Shop floor terminal','Quality & SPC','Lot traceability','Subcontract workflows','OEE dashboards','Planning & scheduling'] },
  { slug: 'automotive-workshop', title: 'Automotive Workshop', icon: '🔧', tagline: 'Vehicle service, parts, labor.', short: 'Car workshop ERP — vehicle history, job cards, labor costing, spare-parts inventory, insurance claims.', features: ['Vehicle master & history','Job cards','Labor + parts costing','Spare-parts inventory','Insurance claim workflow','Service reminders','Warranty tracking','Technician KPI'] },
  { slug: 'agriculture', title: 'Agriculture & Farm', icon: '🌾', tagline: 'Crops, farms, harvest, cold-chain.', short: 'Farm management — crop plans, field operations, harvest, post-harvest, cold chain, and export compliance.', features: ['Crop & field planning','Activity tracking','Harvest & yield','Cold-chain monitoring','Export compliance','Subsidy tracking','Farmer contracts','Weather integrations'] },
  { slug: 'professional-services', title: 'Professional Services', icon: '💼', tagline: 'Time, billing, retainers, CAPEX.', short: 'Consulting, legal, engineering firms — time tracking, retainers, milestone billing, resource utilization, and CAPEX projects.', features: ['Retainer management','Milestone billing','Time & expense','Utilization dashboards','Billable vs non-billable','Engagement lifecycle','CAPEX project tracking','Client portal'] },
  { slug: 'ngo-nonprofit', title: 'NGO & Non-Profit', icon: '🤝', tagline: 'Donors, grants, beneficiaries, M&E.', short: 'NGO operations — donor management, grant accounting, beneficiary tracking, program monitoring & evaluation.', features: ['Donor management','Grant accounting','Beneficiary database','Program M&E','Restricted funds','Reporting to donors','Field data collection','Volunteer scheduling'] },
  { slug: 'salon-spa', title: 'Salon & Spa', icon: '💇', tagline: 'Bookings, stylists, commissions, POS.', short: 'Salon & spa ERP — appointment booking, stylist commissions, service + retail POS, loyalty, memberships.', features: ['Online booking','Stylist commissions','Service + retail POS','Loyalty & memberships','SMS/WhatsApp reminders','Chair/room utilization','Inventory (retail + back-bar)','Multi-branch'] },
];

/* ─────────────────────────────────────────────────────────────
 * COUNTRY LANDING PAGES (18) — localized SEO
 * ───────────────────────────────────────────────────────────── */
export const COUNTRIES = [
  { slug: 'saudi-arabia', title: 'Saudi Arabia (KSA)', flag: '🇸🇦', currency: 'SAR', lang: 'ar-SA', cities: ['Riyadh','Jeddah','Dammam','Khobar','Makkah','Madinah'],
    tagline: 'Odoo partner in Riyadh, Jeddah, Dammam — ZATCA Phase 2 certified.',
    highlights: ['ZATCA Phase 2 e-invoicing (Fatoorah)','Arabic RTL & bilingual interfaces','Saudi labor law & GOSI payroll','VAT 15%','Saudization (Nitaqat) tracking'] },
  { slug: 'uae', title: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', lang: 'en-AE', cities: ['Dubai','Abu Dhabi','Sharjah','Ajman','RAK'],
    tagline: 'Odoo partner in Dubai, Abu Dhabi, Sharjah — UAE VAT & FTA ready.',
    highlights: ['UAE VAT 5% & FTA reporting','Free-zone vs mainland setup','WPS payroll file generation','End-of-service gratuity','Corporate Tax 9% compliance'] },
  { slug: 'qatar', title: 'Qatar', flag: '🇶🇦', currency: 'QAR', lang: 'en-QA', cities: ['Doha','Al Rayyan','Lusail'],
    tagline: 'Odoo partner in Doha — Qatar tax & payroll localization.',
    highlights: ['Qatar tax authority (GTA) compliance','QNB, CB bank files (WPS)','Qatarization tracking','Arabic + English bilingual'] },
  { slug: 'kuwait', title: 'Kuwait', flag: '🇰🇼', currency: 'KWD', lang: 'en-KW', cities: ['Kuwait City','Hawalli'],
    tagline: 'Odoo partner in Kuwait — PIFSS & WPS payroll.',
    highlights: ['PIFSS social security','WPS payroll files','Arabic-first templates','Ministry of Commerce filings'] },
  { slug: 'oman', title: 'Oman', flag: '🇴🇲', currency: 'OMR', lang: 'en-OM', cities: ['Muscat','Salalah','Sohar'],
    tagline: 'Odoo partner in Muscat — VAT 5% & Omanization compliance.',
    highlights: ['Oman VAT 5%','Omanization tracking','PASI social security','Arabic + English layouts'] },
  { slug: 'bahrain', title: 'Bahrain', flag: '🇧🇭', currency: 'BHD', lang: 'en-BH', cities: ['Manama','Muharraq'],
    tagline: 'Odoo partner in Manama — NBR VAT & SIO payroll.',
    highlights: ['NBR VAT 10%','SIO social security','WPS payroll','English-first templates'] },
  { slug: 'pakistan', title: 'Pakistan', flag: '🇵🇰', currency: 'PKR', lang: 'en-PK', cities: ['Karachi','Lahore','Islamabad','Rawalpindi','Faisalabad'],
    tagline: 'Odoo partner in Karachi, Lahore, Islamabad — FBR & SECP compliant.',
    highlights: ['FBR Finance Act 2024 tax slabs','EOBI + Provident Fund + SESSI','FBR POS real-time integration','GST + Provincial Sales Tax (SRB, PRA, KPRA)','Urdu + English bilingual'] },
  { slug: 'india', title: 'India', flag: '🇮🇳', currency: 'INR', lang: 'en-IN', cities: ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Pune'],
    tagline: 'Odoo partner in Mumbai, Bangalore, Delhi — GST & IRN ready.',
    highlights: ['GST + GSTR-1 / GSTR-3B','e-Invoicing IRN + e-Way Bill','TDS / TCS auto-computation','PF, ESI, Professional Tax','Form 16 / EPS / ESIC filing'] },
  { slug: 'bangladesh', title: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', lang: 'en-BD', cities: ['Dhaka','Chattogram','Sylhet'],
    tagline: 'Odoo partner in Dhaka, Chattogram — NBR VAT compliance.',
    highlights: ['NBR VAT 15%','Mushak-6.3 e-invoicing','Bangladesh labor law','Bangla + English layouts'] },
  { slug: 'egypt', title: 'Egypt', flag: '🇪🇬', currency: 'EGP', lang: 'ar-EG', cities: ['Cairo','Alexandria','Giza'],
    tagline: 'Odoo partner in Cairo, Alexandria — ETA e-invoicing ready.',
    highlights: ['ETA e-invoicing','VAT 14% & Schedule Tax','Social insurance (NOSI)','Arabic-first Odoo'] },
  { slug: 'jordan', title: 'Jordan', flag: '🇯🇴', currency: 'JOD', lang: 'ar-JO', cities: ['Amman','Zarqa','Irbid'],
    tagline: 'Odoo partner in Amman — ISTD e-invoicing & SSC payroll.',
    highlights: ['ISTD e-invoicing','VAT 16%','Social Security (SSC)','Bilingual Arabic + English'] },
  { slug: 'turkey', title: 'Turkey', flag: '🇹🇷', currency: 'TRY', lang: 'tr-TR', cities: ['Istanbul','Ankara','Izmir'],
    tagline: 'Odoo partner in Istanbul, Ankara — GIB e-Fatura integration.',
    highlights: ['GIB e-Fatura & e-Arşiv','KDV (VAT) 20%','SGK payroll','Turkish uniform CoA'] },
  { slug: 'united-kingdom', title: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', lang: 'en-GB', cities: ['London','Manchester','Birmingham'],
    tagline: 'Odoo partner in London, Manchester — MTD VAT & RTI payroll.',
    highlights: ['HMRC MTD VAT','RTI payroll & P45/P60','Pensions auto-enrolment','CIS subcontractor scheme'] },
  { slug: 'germany', title: 'Germany', flag: '🇩🇪', currency: 'EUR', lang: 'de-DE', cities: ['Berlin','Munich','Frankfurt','Hamburg'],
    tagline: 'Odoo partner in Berlin, Munich — GoBD & SKR03/SKR04.',
    highlights: ['GoBD compliance','SKR03 / SKR04 chart of accounts','ELSTER tax filings','DATEV export','German payroll (Lohn+Gehalt)'] },
  { slug: 'france', title: 'France', flag: '🇫🇷', currency: 'EUR', lang: 'fr-FR', cities: ['Paris','Lyon','Marseille'],
    tagline: 'Odoo partner in Paris, Lyon — FEC & PEPPOL compliant.',
    highlights: ['FEC file export','PEPPOL e-invoicing','French Chart of Accounts (PCG)','DSN social declaration'] },
  { slug: 'united-states', title: 'United States', flag: '🇺🇸', currency: 'USD', lang: 'en-US', cities: ['New York','Los Angeles','Chicago','Houston','Miami'],
    tagline: 'Odoo partner in New York, LA, Chicago — Sales Tax & 1099 ready.',
    highlights: ['Avalara / TaxJar integration','Multi-state sales tax nexus','1099 reporting','ACH & check-run','US GAAP reporting'] },
  { slug: 'canada', title: 'Canada', flag: '🇨🇦', currency: 'CAD', lang: 'en-CA', cities: ['Toronto','Vancouver','Montreal'],
    tagline: 'Odoo partner in Toronto, Vancouver — GST/HST/PST localized.',
    highlights: ['GST + HST + PST handling','T4, T4A, ROE forms','CPP & EI payroll','Bilingual EN + FR'] },
  { slug: 'australia', title: 'Australia', flag: '🇦🇺', currency: 'AUD', lang: 'en-AU', cities: ['Sydney','Melbourne','Brisbane'],
    tagline: 'Odoo partner in Sydney, Melbourne — GST & STP Phase 2.',
    highlights: ['GST 10%','Single Touch Payroll (STP) Phase 2','Superannuation SuperStream','BAS reporting','Australian CoA'] },
];

/* ─────────────────────────────────────────────────────────────
 * INTEGRATIONS (20)
 * ───────────────────────────────────────────────────────────── */
export const INTEGRATIONS = [
  { slug: 'stripe', title: 'Stripe', category: 'Payments', tagline: 'Global card payments with radar fraud.' },
  { slug: 'hyperpay', title: 'HyperPay', category: 'Payments', tagline: 'MENA payment gateway with Mada, Apple Pay.' },
  { slug: 'paytabs', title: 'PayTabs', category: 'Payments', tagline: 'GCC cards, tokenization, recurring.' },
  { slug: 'razorpay', title: 'Razorpay', category: 'Payments', tagline: 'India UPI, cards, subscriptions.' },
  { slug: 'mada', title: 'Mada', category: 'Payments', tagline: 'Saudi domestic card scheme.' },
  { slug: 'aramex', title: 'Aramex', category: 'Shipping', tagline: 'Middle East courier & international shipping.' },
  { slug: 'dhl', title: 'DHL', category: 'Shipping', tagline: 'Global express and eCommerce shipping.' },
  { slug: 'fedex', title: 'FedEx', category: 'Shipping', tagline: 'Express, ground, and freight.' },
  { slug: 'shopify', title: 'Shopify', category: 'eCommerce', tagline: 'Two-way Shopify ↔ Odoo sync.' },
  { slug: 'woocommerce', title: 'WooCommerce', category: 'eCommerce', tagline: 'WooCommerce ↔ Odoo catalog + orders.' },
  { slug: 'magento', title: 'Magento / Adobe Commerce', category: 'eCommerce', tagline: 'Magento ↔ Odoo sync with warehouses.' },
  { slug: 'amazon', title: 'Amazon Seller', category: 'eCommerce', tagline: 'Amazon Seller Central orders & inventory.' },
  { slug: 'whatsapp', title: 'WhatsApp Business', category: 'Messaging', tagline: 'WhatsApp OTP, templates, conversations.' },
  { slug: 'zkteco', title: 'ZKTeco Biometric', category: 'Hardware', tagline: 'Fingerprint & face attendance devices.' },
  { slug: 'quickbooks', title: 'QuickBooks', category: 'Finance', tagline: 'Import from QuickBooks to Odoo.' },
  { slug: 'sap', title: 'SAP', category: 'ERP', tagline: 'SAP master & transaction sync.' },
  { slug: 'salesforce', title: 'Salesforce', category: 'CRM', tagline: 'Salesforce ↔ Odoo leads & opportunities.' },
  { slug: 'hubspot', title: 'HubSpot', category: 'CRM', tagline: 'HubSpot ↔ Odoo two-way contact sync.' },
  { slug: 'power-bi', title: 'Power BI', category: 'Analytics', tagline: 'Odoo → Power BI data pipeline.' },
  { slug: 'metabase', title: 'Metabase', category: 'Analytics', tagline: 'Open-source BI on top of Odoo.' },
];

/* ─────────────────────────────────────────────────────────────
 * WT PRODUCTS (our own modules)
 * ───────────────────────────────────────────────────────────── */
export const PRODUCTS = [
  { slug: 'wt-hrms-core',         title: 'WT HRMS Core',         category: 'HRMS', tagline: 'Employee dashboard, approval engine, HR foundation.', short: 'Role-based OWL dashboard, multi-level approval chains, and enhanced employee profiles. Foundation of the 20-module HRMS suite.' },
  { slug: 'wt-hrms-payroll',      title: 'WT HRMS Payroll',      category: 'HRMS', tagline: 'Country-agnostic payroll engine with rule versioning.', short: 'Salary structures, Python rule engine with safe_eval, batch processing, and audit trail linking every payslip line to the rule that fired.' },
  { slug: 'wt-hrms-payroll-pk',   title: 'WT HRMS Payroll — Pakistan', category: 'HRMS', tagline: 'Pakistan tax slabs, EOBI, PF, SESSI out of the box.', short: 'FBR Finance Act 2024 tax slabs, EOBI, Provident Fund, SESSI contributions, and default Pakistan Standard salary structure.' },
  { slug: 'wt-hrms-attendance',   title: 'WT HRMS Attendance',   category: 'HRMS', tagline: 'Late, early, overtime detection with shift awareness.', short: 'Automatic late/early/overtime computation based on shift schedule. Monthly summary reports per employee.' },
  { slug: 'wt-hrms-leave',        title: 'WT HRMS Leave Management', category: 'HRMS', tagline: 'Policies, carry-forward, encashment, comp-off.', short: 'Leave policies with carry-forward rules, leave encashment with approval, compensatory off requests, balance tracking.' },
  { slug: 'wt-hrms-loans',        title: 'WT HRMS Loans',        category: 'HRMS', tagline: 'Employee loans with amortization schedule.', short: 'Loan requests with approval workflow, auto-generated amortization schedule, installment tracking, payroll deduction.' },
  { slug: 'wt-hrms-documents',    title: 'WT HRMS Documents',    category: 'HRMS', tagline: 'Document vault with expiry tracking and alerts.', short: 'Employee document storage with automatic expiry detection, daily cron alerts, 8 pre-loaded document types.' },
  { slug: 'wt-hrms-assets',       title: 'WT HRMS Assets',       category: 'HRMS', tagline: 'Asset allocation to employees with return tracking.', short: 'Laptop, phone, SIM, vehicle allocation with issue/return workflow, condition tracking, full history per asset.' },
  { slug: 'wt-saas-odoo-kit',     title: 'WT SaaS Odoo Kit',     category: 'SaaS', tagline: 'Turn your server into a multi-tenant Odoo SaaS.', short: 'Control plane for deploying Odoo tenants across servers. NPM proxy integration, Cloudflare DNS, backup & restore, tenant lifecycle.' },
  { slug: 'wt-sale-dashboard',    title: 'WT Sale Dashboard',    category: 'Dashboards', tagline: 'OWL dashboard for Sales with 10 KPI tiles and charts.', short: 'Real-time sales KPIs, period filters, Chart.js analytics for revenue, orders, customers, salespersons.' },
  { slug: 'wt-purchase-dashboard',title: 'WT Purchase Dashboard',category: 'Dashboards', tagline: 'Vendor spend, RFQ, and PO analytics.', short: 'Purchase KPI dashboard with vendor analytics, spend trends, RFQ pipeline, bill status.' },
  { slug: 'wt-inventory-dashboard',title:'WT Inventory Dashboard',category: 'Dashboards', tagline: 'Stock value, low stock alerts, movement trends.', short: 'Inventory KPI dashboard with stock valuation, low stock alerts, pending receipts/deliveries, stock movement charts.' },
  { slug: 'wt-accounting-dashboard',title:'WT Accounting Dashboard',category: 'Dashboards', tagline: 'Revenue, AR/AP, cash flow in one view.', short: 'Accounting KPI dashboard with revenue/expense trends, accounts receivable/payable, invoice aging, cash flow.' },
  { slug: 'wt-crm-dashboard',     title: 'WT CRM Dashboard',     category: 'Dashboards', tagline: 'Pipeline, win rate, activity tracking.', short: 'CRM KPI dashboard with pipeline value, win rate, lead source analytics, salesperson performance.' },
  { slug: 'wt-project-dashboard', title: 'WT Project Dashboard', category: 'Dashboards', tagline: 'Task progress, overdue, team workload.', short: 'Project KPI dashboard with task progress, overdue tasks, team workload, project completion percentage.' },
  { slug: 'wt-pos-saloon',        title: 'WT POS Saloon',        category: 'POS', tagline: 'Salon POS with stylist booking and service tracking.', short: 'Point of Sale customized for hair salons and beauty parlors with stylist selection, service booking, loyalty.' },
  { slug: 'wt-pos-dashboard',     title: 'WT POS Dashboard',     category: 'POS', tagline: 'POS analytics: session revenue, cashier performance.', short: 'POS analytics dashboard showing session revenue, cashier performance, top products, daily/weekly trends.' },
  { slug: 'wt-odoo-pos-delivery', title: 'WT POS Delivery',      category: 'POS', tagline: 'Delivery mode, driver assignment, tracking.', short: 'POS extension for delivery orders with driver assignment, delivery tracking, printable delivery slips.' },
  { slug: 'wt-salon-management',  title: 'WT Salon Management',  category: 'Industry', tagline: 'Complete salon ERP with bookings and inventory.', short: 'Back-office salon management with appointments, services, stylists, commissions, inventory of salon products.' },
  { slug: 'wt-dental-management', title: 'WT Dental Management', category: 'Industry', tagline: 'Dental clinic management with patient records.', short: 'Patient records, treatments, dental procedures, appointments, billing — everything a dental clinic needs in Odoo.' },
  { slug: 'wt-dental-clinic-pos', title: 'WT Dental Clinic POS', category: 'Industry', tagline: 'POS for dental clinics with procedure billing.', short: 'Point of Sale for dental clinics — procedure-based billing, patient treatment plans, insurance tracking.' },
  { slug: 'wt-car-wash-pos',      title: 'WT Car Wash POS',      category: 'Industry', tagline: 'Car wash POS with package tracking.', short: 'POS for car wash businesses — service packages, membership cards, vehicle tracking.' },
  { slug: 'wt-real-estate',       title: 'WT Real Estate',       category: 'Industry', tagline: 'Property listings, leases, tenant management.', short: 'Real estate management — property listings, leases, rent collection, tenant management, maintenance.' },
  { slug: 'wt-school-management', title: 'WT School Management', category: 'Industry', tagline: 'School ERP with students, fees, attendance.', short: 'Complete school ERP — students, enrollment, fees, attendance, timetables, transport, exams, reports.' },
  { slug: 'way4tech-logistics',   title: 'Way4Tech Logistics',   category: 'Specialty', tagline: 'Trucking, dispatch, and freight management.', short: 'Logistics module for trucking companies — trip management, driver assignment, fuel tracking, maintenance, freight billing.' },
  { slug: 'wt-sale-distributor',  title: 'WT Sale Distributor',  category: 'Specialty', tagline: 'Distributor sales with territory and commissions.', short: 'Distributor management — territories, sales reps, commissions, multi-tier pricing, route planning.' },
  { slug: 'wt-whatsapp-otp',      title: 'WT WhatsApp OTP',      category: 'Specialty', tagline: 'Login, signup, verification via WhatsApp OTP.', short: 'WhatsApp OTP authentication for Odoo — login, signup, order verification via WhatsApp Business API.' },
  { slug: 'odoo-barcode-scanner', title: 'Offline Barcode Scanner', category: 'Specialty', tagline: 'Full-screen barcode scanner with offline cache.', short: 'Standalone barcode scanner app — loads products into IndexedDB for fully offline price checking. Works without internet.' },
  { slug: 'wt-enterprise-theme',  title: 'WT Enterprise Theme',  category: 'Specialty', tagline: 'Enterprise-style theme for Odoo Community.', short: 'Modern enterprise theme for Odoo Community edition — side menu, home menu, color presets, responsive design.' },
];

/* INDUSTRIES (legacy short list, used by home page strip) */
export const INDUSTRIES = [
  { slug: 'retail-stores', title: 'Retail & POS', icon: '🏪', description: 'POS, inventory, multi-store, e-commerce for retail chains.' },
  { slug: 'restaurant-fnb', title: 'Restaurant & F&B', icon: '🍽️', description: 'Table POS, KDS, menu engineering, delivery integrations.' },
  { slug: 'hospital-management', title: 'Healthcare', icon: '🏥', description: 'Hospitals, clinics, pharmacies — patient records, billing, insurance.' },
  { slug: 'school-management', title: 'Education', icon: '🎓', description: 'Schools, universities — students, fees, exams, transport.' },
  { slug: 'manufacturing-industry', title: 'Manufacturing', icon: '🏭', description: 'MRP, BOMs, work orders, quality, maintenance.' },
  { slug: 'salon-spa', title: 'Salon & Spa', icon: '💇', description: 'Appointments, stylists, commissions, loyalty.' },
  { slug: 'logistics-transport', title: 'Logistics', icon: '🚚', description: 'Trucking, dispatch, fuel tracking, fleet maintenance.' },
  { slug: 'real-estate', title: 'Real Estate', icon: '🏢', description: 'Property listings, leases, tenant portal, maintenance.' },
];

/* Case studies (curated) */
export const CASE_STUDIES = [
  { slug: 'gcc-hotel-chain', title: 'GCC Hotel Chain — 14 properties on one Odoo', industry: 'Hospitality', country: 'UAE', tagline: '14-property roll-out in 9 months with central reporting.', metrics: [{k:'Properties',v:'14'},{k:'Months',v:'9'},{k:'Users',v:'620'}] },
  { slug: 'ksa-pharmacy-chain', title: 'KSA Pharmacy Chain — 42 stores + ZATCA Phase 2', industry: 'Pharmacy', country: 'Saudi Arabia', tagline: '42 stores live with ZATCA Phase 2 clearance in 4 months.', metrics: [{k:'Stores',v:'42'},{k:'Months',v:'4'},{k:'ZATCA',v:'Phase 2'}] },
  { slug: 'pk-distributor', title: 'Pakistan FMCG Distributor — 180 vans automated', industry: 'Distribution', country: 'Pakistan', tagline: 'Van-sales app + route planner for 180 vans with FBR POS.', metrics: [{k:'Vans',v:'180'},{k:'SKUs',v:'4,200'},{k:'FBR POS',v:'Live'}] },
  { slug: 'uae-hospital', title: 'UAE 120-bed Hospital — Odoo HMIS go-live', industry: 'Healthcare', country: 'UAE', tagline: 'OPD + IPD + pharmacy + insurance on one Odoo instance.', metrics: [{k:'Beds',v:'120'},{k:'Doctors',v:'85'},{k:'Insurers',v:'32'}] },
  { slug: 'saudi-construction', title: 'Saudi Construction Group — 28 projects, 1200 users', industry: 'Construction', country: 'Saudi Arabia', tagline: 'Multi-project BOQ, subcontractors, progress billing at scale.', metrics: [{k:'Projects',v:'28'},{k:'Users',v:'1,200'},{k:'Subcontractors',v:'310'}] },
  { slug: 'uk-retail', title: 'UK Multi-Store Retail — MTD VAT + Shopify sync', industry: 'Retail', country: 'UK', tagline: '12 stores + online, unified inventory, HMRC MTD VAT.', metrics: [{k:'Stores',v:'12'},{k:'SKUs',v:'14,000'},{k:'MTD VAT',v:'Live'}] },
];

/* Pricing tiers */
export const PRICING = [
  { name: 'Starter', price: 'From $4,900', period: 'per project', desc: 'Single-module implementations for SMBs.', features: ['Up to 2 modules','10 users','Discovery + config + training','4 weeks','1 month hypercare'], cta: 'Start small', highlight: false },
  { name: 'Growth', price: 'From $14,900', period: 'per project', desc: 'Multi-module roll-outs with customization.', features: ['Up to 6 modules','50 users','Custom modules + reports','8 weeks','3 months hypercare'], cta: 'Most popular', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: 'scope-based', desc: 'Multi-company, multi-country, full-stack.', features: ['Unlimited modules','Unlimited users','Custom architecture','Phased rollout','SLA-backed support'], cta: 'Talk to us', highlight: false },
];

/* FAQs (SEO) */
export const FAQS = [
  { q: 'Are you an Odoo Partner?', a: 'Yes. Way4Tech is an Odoo Gold Partner with certified functional and technical consultants across Odoo v12 through v19.' },
  { q: 'How long does a typical Odoo implementation take?', a: 'Single-module Starter projects run 3-4 weeks. Multi-module Growth projects run 8-12 weeks. Enterprise multi-country rollouts run 4-9 months with phased go-lives.' },
  { q: 'Do you support Odoo Community or only Enterprise?', a: 'Both. We recommend Community for cost-sensitive teams with technical maturity, Enterprise for teams that want Studio, IoT, MRP II, and full vendor support. We also migrate Community ↔ Enterprise.' },
  { q: 'Do you handle ZATCA Phase 2 e-invoicing in Saudi Arabia?', a: 'Yes. We have production deployments across KSA with ZATCA Phase 2 clearance, QR signing, and archive-ready long-term storage.' },
  { q: 'Can you migrate us from Odoo 14/15/16/17 to the latest version?', a: 'Yes. Our migration service covers database, custom modules, attachments, and historical transactions — with a test environment for sign-off before cutover.' },
  { q: 'Do you provide 24/7 support?', a: 'Yes. SLA-backed support contracts with 2h/4h/8h response tiers, 24/7 monitoring, backups, and security patching.' },
  { q: 'Which countries do you serve?', a: 'We deliver across 18 countries including Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, Pakistan, India, Bangladesh, Egypt, Jordan, Turkey, UK, Germany, France, US, Canada, and Australia.' },
  { q: 'Do you offer fixed-price projects?', a: 'Yes. For well-scoped implementations we deliver fixed-price with milestones. For discovery-phase work or ongoing customization we offer transparent T&M.' },
];
