export const SITE = {
  name: 'Way4Tech',
  tagline: 'Odoo ERP that fits your business — not the other way around.',
  description: 'Odoo customization, implementation, and support for growing businesses across the Middle East and Pakistan. 20+ industry-ready modules, 6 years of delivery, one team.',
  url: 'https://way4tech.com',
  email: 'info@way4tech.com',
  alt_email: 'waqasriasatjutt@gmail.com',
  phone: '+92 315 411 4748',
  whatsapp: 'https://wa.me/923154114748',
  locations: ['Pakistan', 'United Arab Emirates', 'Saudi Arabia'],
  social: {
    linkedin: 'https://linkedin.com/in/waqasriasatjutt',
    github: 'https://github.com/waqasriasatjutt',
  },
};

export const SERVICES = [
  {
    slug: 'odoo-implementation',
    title: 'Odoo Implementation',
    tagline: 'End-to-end Odoo deployment — from discovery to go-live.',
    icon: '🚀',
    short: 'Full implementation services including discovery, configuration, data migration, training, and go-live support.',
    details: [
      'Business process analysis & gap assessment',
      'Module selection and configuration',
      'Data migration from legacy systems',
      'User training and documentation',
      'Go-live support and post-launch optimization',
      'Multi-company and multi-currency setup',
    ],
  },
  {
    slug: 'odoo-customization',
    title: 'Odoo Customization',
    tagline: 'Custom modules built to match your exact workflow.',
    icon: '⚙️',
    short: 'Custom modules, integrations, and workflow automation that make Odoo work exactly how your business operates.',
    details: [
      'Custom modules and fields',
      'Business logic automation',
      'Custom reports and dashboards',
      'OWL component development',
      'Industry-specific workflows',
      'UX and branding customization',
    ],
  },
  {
    slug: 'odoo-support',
    title: 'Odoo Support',
    tagline: '24/7 monitoring, bug fixes, and performance tuning.',
    icon: '🛟',
    short: 'Reliable support contracts with defined SLAs. We handle upgrades, bugs, performance issues, and emergency fixes.',
    details: [
      'Priority ticket response with defined SLAs',
      'Bug fixes and emergency patches',
      'Performance tuning and optimization',
      'Regular backup verification',
      'Odoo version upgrades',
      'User support and training refreshers',
    ],
  },
  {
    slug: 'hire-odoo-developer',
    title: 'Hire Odoo Developer',
    tagline: 'Dedicated developers by the week or month.',
    icon: '👨‍💻',
    short: 'Senior Odoo developers, project managers, and functional consultants available on a dedicated or part-time basis.',
    details: [
      'Senior-level Odoo Python + OWL developers',
      'Functional consultants with 5+ years experience',
      'Part-time or full-time engagement models',
      'Daily stand-ups and weekly reports',
      'Direct communication, no middlemen',
      'NDA-protected engagements',
    ],
  },
  {
    slug: 'odoo-integration',
    title: 'Odoo Integration',
    tagline: 'Connect Odoo with your existing tools and APIs.',
    icon: '🔗',
    short: 'Seamless integration with payment gateways, shipping carriers, e-commerce platforms, banks, WhatsApp, and custom APIs.',
    details: [
      'Payment gateways (Stripe, HyperPay, PayTabs, Mada)',
      'Shipping carriers (Aramex, DHL, FedEx, local couriers)',
      'E-commerce (Shopify, WooCommerce, Magento)',
      'WhatsApp Business API integration',
      'Custom REST/GraphQL API integrations',
      'Bank statement and accounting integration',
    ],
  },
  {
    slug: 'odoo-migration',
    title: 'Odoo Migration',
    tagline: 'Upgrade safely from older Odoo versions.',
    icon: '🔄',
    short: 'Safe migration from Odoo 13, 14, 15, 16, 17 to the latest version including custom modules and historical data.',
    details: [
      'Database migration with zero data loss',
      'Custom module code migration',
      'Data verification and reconciliation',
      'Test environment for validation',
      'Planned cutover with rollback plan',
      'User retraining on new version',
    ],
  },
  {
    slug: 'odoo-consultancy',
    title: 'Odoo Consultancy',
    tagline: 'Expert advice on architecture, licensing, and strategy.',
    icon: '💡',
    short: 'Strategic consulting for CTOs and business owners. Architecture review, licensing optimization, multi-tenant strategy.',
    details: [
      'Odoo Community vs Enterprise decision',
      'On-premise vs cloud hosting strategy',
      'Multi-company and multi-tenant architecture',
      'SaaS deployment planning',
      'License and cost optimization',
      'Technology roadmap for 3-5 years',
    ],
  },
  {
    slug: 'odoo-training',
    title: 'Odoo Training',
    tagline: 'Onboard your team with structured training programs.',
    icon: '🎓',
    short: 'Role-based training programs for end users, admins, and developers — on-site or remote, with hands-on labs.',
    details: [
      'End-user training (sales, purchase, inventory, HR)',
      'Admin training (security, users, backups)',
      'Developer bootcamp (Python, OWL, XML)',
      'Role-based curriculum',
      'Hands-on lab exercises',
      'Certification on completion',
    ],
  },
];

export const PRODUCTS = [
  // HRMS Suite
  { slug: 'wt-hrms-core',         title: 'WT HRMS Core',         category: 'HRMS', tagline: 'Employee dashboard, approval engine, HR foundation.', short: 'Role-based OWL dashboard, multi-level approval chains, and enhanced employee profiles. Foundation of the 20-module HRMS suite.' },
  { slug: 'wt-hrms-payroll',      title: 'WT HRMS Payroll',      category: 'HRMS', tagline: 'Country-agnostic payroll engine with rule versioning.', short: 'Salary structures, Python rule engine with safe_eval, batch processing, and audit trail linking every payslip line to the rule that fired.' },
  { slug: 'wt-hrms-payroll-pk',   title: 'WT HRMS Payroll — Pakistan', category: 'HRMS', tagline: 'Pakistan tax slabs, EOBI, PF, SESSI out of the box.', short: 'FBR Finance Act 2024 tax slabs, EOBI, Provident Fund, SESSI contributions, and default Pakistan Standard salary structure.' },
  { slug: 'wt-hrms-attendance',   title: 'WT HRMS Attendance',   category: 'HRMS', tagline: 'Late, early, overtime detection with shift awareness.', short: 'Automatic late/early/overtime computation based on shift schedule. Monthly summary reports per employee.' },
  { slug: 'wt-hrms-leave',        title: 'WT HRMS Leave Management', category: 'HRMS', tagline: 'Policies, carry-forward, encashment, comp-off.', short: 'Leave policies with carry-forward rules, leave encashment with approval, compensatory off requests, balance tracking.' },
  { slug: 'wt-hrms-loans',        title: 'WT HRMS Loans',        category: 'HRMS', tagline: 'Employee loans with amortization schedule.', short: 'Loan requests with approval workflow, auto-generated amortization schedule, installment tracking, payroll deduction.' },
  { slug: 'wt-hrms-documents',    title: 'WT HRMS Documents',    category: 'HRMS', tagline: 'Document vault with expiry tracking and alerts.', short: 'Employee document storage with automatic expiry detection, daily cron alerts, 8 pre-loaded document types.' },
  { slug: 'wt-hrms-assets',       title: 'WT HRMS Assets',       category: 'HRMS', tagline: 'Asset allocation to employees with return tracking.', short: 'Laptop, phone, SIM, vehicle allocation with issue/return workflow, condition tracking, full history per asset.' },

  // SaaS + Dashboards
  { slug: 'wt-saas-odoo-kit',     title: 'WT SaaS Odoo Kit',     category: 'SaaS', tagline: 'Turn your server into a multi-tenant Odoo SaaS.', short: 'Control plane for deploying Odoo tenants across servers. NPM proxy integration, Cloudflare DNS, backup & restore, tenant lifecycle.' },
  { slug: 'wt-sale-dashboard',    title: 'WT Sale Dashboard',    category: 'Dashboards', tagline: 'OWL dashboard for Sales with 10 KPI tiles and charts.', short: 'Real-time sales KPIs, period filters, Chart.js analytics for revenue, orders, customers, salespersons.' },
  { slug: 'wt-purchase-dashboard',title: 'WT Purchase Dashboard',category: 'Dashboards', tagline: 'Vendor spend, RFQ, and PO analytics.', short: 'Purchase KPI dashboard with vendor analytics, spend trends, RFQ pipeline, bill status.' },
  { slug: 'wt-inventory-dashboard',title:'WT Inventory Dashboard',category: 'Dashboards', tagline: 'Stock value, low stock alerts, movement trends.', short: 'Inventory KPI dashboard with stock valuation, low stock alerts, pending receipts/deliveries, stock movement charts.' },
  { slug: 'wt-accounting-dashboard',title:'WT Accounting Dashboard',category: 'Dashboards', tagline: 'Revenue, AR/AP, cash flow in one view.', short: 'Accounting KPI dashboard with revenue/expense trends, accounts receivable/payable, invoice aging, cash flow.' },
  { slug: 'wt-crm-dashboard',     title: 'WT CRM Dashboard',     category: 'Dashboards', tagline: 'Pipeline, win rate, activity tracking.', short: 'CRM KPI dashboard with pipeline value, win rate, lead source analytics, salesperson performance.' },
  { slug: 'wt-project-dashboard', title: 'WT Project Dashboard', category: 'Dashboards', tagline: 'Task progress, overdue, team workload.', short: 'Project KPI dashboard with task progress, overdue tasks, team workload, project completion percentage.' },

  // POS
  { slug: 'wt-pos-saloon',        title: 'WT POS Saloon',        category: 'POS', tagline: 'Salon POS with stylist booking and service tracking.', short: 'Point of Sale customized for hair salons and beauty parlors with stylist selection, service booking, loyalty.' },
  { slug: 'wt-pos-dashboard',     title: 'WT POS Dashboard',     category: 'POS', tagline: 'POS analytics: session revenue, cashier performance.', short: 'POS analytics dashboard showing session revenue, cashier performance, top products, daily/weekly trends.' },
  { slug: 'wt-odoo-pos-delivery', title: 'WT POS Delivery',      category: 'POS', tagline: 'Delivery mode, driver assignment, tracking.', short: 'POS extension for delivery orders with driver assignment, delivery tracking, printable delivery slips.' },

  // Industry
  { slug: 'wt-salon-management',  title: 'WT Salon Management',  category: 'Industry', tagline: 'Complete salon ERP with bookings and inventory.', short: 'Back-office salon management with appointments, services, stylists, commissions, inventory of salon products.' },
  { slug: 'wt-dental-management', title: 'WT Dental Management', category: 'Industry', tagline: 'Dental clinic management with patient records.', short: 'Patient records, treatments, dental procedures, appointments, billing — everything a dental clinic needs in Odoo.' },
  { slug: 'wt-dental-clinic-pos', title: 'WT Dental Clinic POS', category: 'Industry', tagline: 'POS for dental clinics with procedure billing.', short: 'Point of Sale for dental clinics — procedure-based billing, patient treatment plans, insurance tracking.' },
  { slug: 'wt-car-wash-pos',      title: 'WT Car Wash POS',      category: 'Industry', tagline: 'Car wash POS with package tracking.', short: 'POS for car wash businesses — service packages, membership cards, vehicle tracking.' },
  { slug: 'wt-real-estate',       title: 'WT Real Estate',       category: 'Industry', tagline: 'Property listings, leases, tenant management.', short: 'Real estate management — property listings, leases, rent collection, tenant management, maintenance.' },
  { slug: 'wt-school-management', title: 'WT School Management', category: 'Industry', tagline: 'School ERP with students, fees, attendance.', short: 'Complete school ERP — students, enrollment, fees, attendance, timetables, transport, exams, reports.' },

  // Specialty
  { slug: 'way4tech-logistics',   title: 'Way4Tech Logistics',   category: 'Specialty', tagline: 'Trucking, dispatch, and freight management.', short: 'Logistics module for trucking companies — trip management, driver assignment, fuel tracking, maintenance, freight billing.' },
  { slug: 'wt-sale-distributor',  title: 'WT Sale Distributor',  category: 'Specialty', tagline: 'Distributor sales with territory and commissions.', short: 'Distributor management — territories, sales reps, commissions, multi-tier pricing, route planning.' },
  { slug: 'wt-whatsapp-otp',      title: 'WT WhatsApp OTP',      category: 'Specialty', tagline: 'Login, signup, verification via WhatsApp OTP.', short: 'WhatsApp OTP authentication for Odoo — login, signup, order verification via WhatsApp Business API.' },
  { slug: 'odoo-barcode-scanner', title: 'Offline Barcode Scanner', category: 'Specialty', tagline: 'Full-screen barcode scanner with offline cache.', short: 'Standalone barcode scanner app — loads products into IndexedDB for fully offline price checking. Works without internet.' },
  { slug: 'wt-enterprise-theme',  title: 'WT Enterprise Theme',  category: 'Specialty', tagline: 'Enterprise-style theme for Odoo Community.', short: 'Modern enterprise theme for Odoo Community edition — side menu, home menu, color presets, responsive design.' },
];

export const INDUSTRIES = [
  { slug: 'retail', title: 'Retail & POS', icon: '🏪', description: 'POS, inventory, multi-store, e-commerce integration for retail chains and single-store businesses.' },
  { slug: 'restaurant', title: 'Restaurant & F&B', icon: '🍽️', description: 'Restaurant POS with table management, kitchen display, menu engineering, and supplier management.' },
  { slug: 'healthcare', title: 'Healthcare', icon: '🏥', description: 'Dental clinics, medical centers, pharmacies — patient records, appointments, billing, insurance.' },
  { slug: 'education', title: 'Education', icon: '🎓', description: 'Schools, colleges, training institutes — students, fees, exams, timetables, transport.' },
  { slug: 'manufacturing', title: 'Manufacturing', icon: '🏭', description: 'MRP, BOMs, work orders, quality control, maintenance — for factories and workshops.' },
  { slug: 'services', title: 'Service Business', icon: '💼', description: 'Salons, car wash, cleaning, consulting — appointments, service tracking, technician dispatch.' },
  { slug: 'logistics', title: 'Logistics & Transport', icon: '🚚', description: 'Trucking, freight, dispatch, driver management, fuel tracking, fleet maintenance.' },
  { slug: 'real-estate', title: 'Real Estate', icon: '🏢', description: 'Property listings, leases, rent collection, tenant portal, maintenance tickets.' },
];

export const STATS = [
  { value: '6+',   label: 'Years in Odoo' },
  { value: '50+',  label: 'Deployments' },
  { value: '20+',  label: 'Custom Modules' },
  { value: '3',    label: 'Countries Served' },
];
