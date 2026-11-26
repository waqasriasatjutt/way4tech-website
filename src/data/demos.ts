/*
 * Live demo directory, shared by /demos/ and the home page demo count, so the
 * figures cannot drift apart. Every Odoo demo uses one non-admin login.
 * Never put an admin login, a server IP or a client's own trial host here.
 */
export const DEMO_USER = 'w4demo';
export const DEMO_PASS = 'Demo2026';

export type DemoItem = { name: string; host: string; path?: string; tag: string; line: string; cred: 'std' | 'open' | string };
export type DemoGroup = { title: string; blurb: string; items: DemoItem[] };

export const DEMO_GROUPS: DemoGroup[] = [
  {
    title: 'Flagship product demos',
    blurb: 'Our store apps, polished and ready to walk a buyer through.',
    items: [
      { name: 'Way4Tech ERP', host: 'erp-demo.way4tech.com', tag: 'ERP', line: 'Full ERP showcase across sales, inventory and accounting.', cred: 'std' },
      { name: 'Jewellery & Gold', host: 'jewelry-demo.way4tech.com', tag: 'Jewellery', line: 'Daily gold rate per gram, making and wastage, old-gold buy-back, hallmark and HUID, and stock by weight.', cred: 'std' },
      { name: 'Auto Parts Wholesale', host: 'autoparts-demo.way4tech.com', tag: 'Distribution', line: 'Trade-only dealer portal: approved dealers only, vehicle fitment search, dealer pricing, hot products and one-click reorder.', cred: 'dealer / Dealer2026' },
      { name: 'Real Estate Enterprise', host: 'realestate-pro.way4tech.com', tag: 'Property', line: 'Property management for a letting agency: post-dated cheque books with bounce handling, owner statements and payouts, maintenance, lease renewals with escalation, and a portfolio dashboard.', cred: 'std' },
      { name: 'Distribution & Van Sales', host: 'distributor-demo.way4tech.com', tag: 'Distribution', line: 'Van Sales Enterprise on Odoo 20: salesman routes, orders at the shop, van stock, collections, live team tracking and the field phone app (field logins aisha or bilal, password demo).', cred: 'daniel / demo' },
      { name: 'Garage Management + Enterprise', host: 'garage-guide.way4tech.com', tag: 'Automotive', line: 'A sample auto workshop: job cards from estimate to invoice, inspections, bays and technician time, plus service plans and insurance claims from the Enterprise add-on.', cred: 'std' },
      { name: 'Facility / CAFM', host: 'facility-demo.way4tech.com', tag: 'Facility', line: 'Assets, planned maintenance, work orders and SLAs.', cred: 'std' },
      { name: 'Facility Enterprise', host: 'facility-pro.way4tech.com', tag: 'Facility', line: 'CAFM with contracts, analytics and technician mobile.', cred: 'std' },
      { name: 'Transport Management', host: 'transport-demo.way4tech.com', tag: 'Logistics', line: 'Fleet, trips, drivers and freight operations.', cred: 'std' },
      { name: 'Transport Enterprise', host: 'transport-pro.way4tech.com', tag: 'Logistics', line: 'Transport with costing, settlements and dashboards.', cred: 'std' },
      { name: 'Gym & Fitness', host: 'gym-demo.way4tech.com', tag: 'Fitness', line: 'Memberships, plans, check-in and classes.', cred: 'std' },
      { name: 'Kitchen Display (KDS)', host: 'kds-demo.way4tech.com', tag: 'Restaurant', line: 'Kitchen display system for POS restaurants.', cred: 'std' },
      { name: 'Legal Practice', host: 'legal-demo.way4tech.com', tag: 'Legal', line: 'Matters, time entries, documents and billing.', cred: 'std' },
      { name: 'HRMS & Payroll', host: 'hr19.way4tech.com', tag: 'HR', line: 'HR, leave, attendance, shifts, payroll and employee self service for a 55-person sample company.', cred: 'std' },
      { name: 'Labour Camp Management', host: 'labourcamp-demo.way4tech.com', tag: 'Facility', line: 'Worker accommodation bed by bed: allocation, visa and ID expiry, permits, inspections, mess, buses and monthly contractor billing.', cred: 'std' },
      { name: 'Business Dashboards', host: 'dashboards-demo.way4tech.com', tag: 'Analytics', line: 'Sales, CRM, purchase, inventory, POS, accounting and project dashboards on a year of trading data, plus the dashboard builder.', cred: 'std' },
      { name: 'Insurance Broker', host: 'insurance-demo.way4tech.com', tag: 'Insurance', line: 'Broker desk for policies, market quotes and placement, renewals and endorsements, claims and commission reconciliation.', cred: 'std' },
      { name: 'Solar Project Management', host: 'solar-demo.way4tech.com', tag: 'Energy', line: 'Solar EPC from site survey and string sizing to grid approval, commissioning, warranties, O&M and monthly generation.', cred: 'std' },
      { name: 'Water Delivery Management', host: 'waterdelivery-demo.way4tech.com', tag: 'Water Delivery', line: 'Bottled water rounds with a container ledger, deposits, coupons, subscriptions, batch tests and cooler rentals.', cred: 'std' },
      { name: 'WT Weighbridge', host: 'weighbridge-demo.way4tech.com', tag: 'Scrap and Recycling', line: 'A scrap yard weighbridge with captured gross and tare, stored tares, deductions, camera snapshots and manager-only manual weights.', cred: 'std' },
      { name: 'Coworking Space Management', host: 'coworking-demo.way4tech.com', tag: 'Coworking', line: 'Hot desks, offices and meeting rooms with a clash check, plans with credits, check-in, day passes, registered addresses and monthly invoicing.', cred: 'std' },
      { name: 'WT Work Tracker', host: 'tracker-demo.way4tech.com', tag: 'HR', line: 'Desktop activity tracking for a 13-person studio: focus, effort, attendance gap, task effort and suggested timesheets.', cred: 'std' },
      { name: 'Veterinary Clinic Management', host: 'vet-demo.way4tech.com', tag: 'Healthcare', line: 'Mixed practice with pet records, a SOAP consultation diary, vaccination courses, withdrawal periods, boarding and pet insurance claims.', cred: 'std' },
      { name: 'Shop Floor Control and PLM', host: 'manufacturing-demo.way4tech.com', tag: 'Manufacturing', line: 'A sheet metal shop with a touch terminal per machine, stop reasons, blocking quality checks, OEE and engineering change orders with BoM versions.', cred: 'std' },
      { name: 'Helpdesk', host: 'helpdesk-demo.way4tech.com', tag: 'Support', line: 'Appliance after-sales desk with four teams, SLA policies and breaches, email tickets, a customer portal and ratings.', cred: 'std' },
      { name: 'Community Accounting Tools', host: 'accounting-demo.way4tech.com', tag: 'Accounting', line: 'Trading company books with fixed assets, budgets and PO block, nine financial reports, bank file import and payment reminders.', cred: 'std' },
      { name: 'Farm Management', host: 'farm-demo.way4tech.com', tag: 'Agriculture', line: 'A mixed farm with costed crop cycles, spray records with pre-harvest intervals, harvest lots, dairy and beef herds, a flock and paddock grazing.', cred: 'std' },
      { name: 'Productivity Pack', host: 'productivity-demo.way4tech.com', tag: 'Productivity', line: 'A Manchester design agency with Gantt plans and dependencies, customer maps and routes, a timesheet grid, document folders, approvals and an audit log.', cred: 'std' },
      { name: 'POS and Retail Add-ons', host: 'pos-demo.way4tech.com', tag: 'Cafe and Retail', line: 'Cafe and pantry with printers through the bridge, delivery drivers, website table booking, a price checker, barcode scans and stock aging.', cred: 'std' },
      { name: 'Sales and Messaging Tools', host: 'sales-demo.way4tech.com', tag: 'Sales', line: 'B2B distributor with WhatsApp from quotes and invoices, email drip campaigns, commission plans, quotation follow-ups and an AI assistant.', cred: 'std' },
      { name: 'Turkish Localization Suite', host: 'tr-demo.way4tech.com', tag: 'Accounting', line: 'VKN and TCKN, KDV tevkifat and stopaj, e-Fatura and e-Arşiv chosen per customer, e-İrsaliye and Mizan, on a mock GİB integrator.', cred: 'std' },
      { name: 'Queue & Token System', host: 'queue-demo.way4tech.com', tag: 'Clinics', line: 'Clinic group with a touch kiosk, TV calls, counters, live waiting times and appointment check in.', cred: 'std' },
      { name: 'Pharmacy Management', host: 'pharmacy-demo.way4tech.com', tag: 'Healthcare', line: 'Two-branch pharmacy with prescriptions, a safety check against the patient file, a controlled drug register and insurance claims.', cred: 'std' },
      { name: 'Equipment Rental Management', host: 'equipmentrental-demo.way4tech.com', tag: 'Plant and Tool Hire', line: 'Plant, tool and machinery hire unit by unit: rate cards, availability, off-hire meters, damage, deposits and LOLER certificates.', cred: 'std' },
      { name: 'Petrol Pump Management', host: 'fuelstation-demo.way4tech.com', tag: 'Fuel Station', line: 'Two forecourts with tank dips, nozzle meters, shift cash reconciliation, tanker deliveries and fleet accounts.', cred: 'std' },
      { name: 'Laundry Management', host: 'laundry-demo.way4tech.com', tag: 'Laundry', line: 'Dry cleaner with a tag per garment, plant board, racks, hotel contracts, van routes and claims.', cred: 'std' },
      { name: 'Print Shop', host: 'printing-demo.way4tech.com', tag: 'Printing', line: 'Print jobs, estimates and production tracking.', cred: 'std' },
      { name: 'Rental Management', host: 'rental-demo.way4tech.com', tag: 'Rental', line: 'Rental orders, availability, pickup and return.', cred: 'std' },
      { name: 'Travel Agency', host: 'travel-demo.way4tech.com', tag: 'Travel', line: 'Bookings, itineraries and travel invoicing.', cred: 'std' },
      { name: 'Restaurant Suite', host: 'restro.way4tech.com', tag: 'Restaurant', line: 'Multi-branch restaurant POS, KDS, delivery, call centre and reports, with website orders landing in the same inbox.', cred: 'std' },
      { name: 'Restaurant Online Ordering', host: 'restro.way4tech.com', path: 'order', tag: 'Restaurant', line: 'The customer side: menu, half and half and nested choices, pickup, delivery or table QR, card payment, points and gift cards, live tracking, English and French.', cred: 'open' },
      { name: 'Real Estate Property Portal', host: 'property-demo.way4tech.com', tag: 'Property', line: 'Property search with map and filters, projects, agents, saved searches and post-your-property, plus developer sales with towers, units and payment plans.', cred: 'std' },
      { name: 'Retail Online Ordering', host: 'retail-demo.way4tech.com', path: 'shop/order', tag: 'Retail', line: 'Odoo 20 storefront with a store picker, live stock per branch, variants, checkout for pickup or delivery and orders into the branch POS.', cred: 'open' },
      { name: 'Construction Cloud', host: 'construction-cloud.way4tech.com', tag: 'Construction', line: 'Hosted construction management: estimating and tenders, BoQ and billing, contracts and claims, site diary, quality, HSE and role dashboards.', cred: 'std' },
      { name: 'Freight / Logistics', host: 'freight-demo.way4tech.com', tag: 'Logistics', line: 'Freight operations on Odoo 20.', cred: 'std' },
    ],
  },
  {
    title: 'Industry demos',
    blurb: 'Whole-business demos, one per industry.',
    items: [
      { name: 'Clinic / Medical', host: 'clinic.way4tech.com', tag: 'Healthcare', line: 'Patients, appointments and clinic billing.', cred: 'std' },
      { name: 'Hotel', host: 'hotel.way4tech.com', tag: 'Hospitality', line: 'Rooms, reservations and front desk.', cred: 'std' },
      { name: 'Salon & Spa', host: 'salon.way4tech.com', tag: 'Beauty', line: 'Appointments, stylists and salon POS.', cred: 'std' },
      { name: 'Restaurant', host: 'restaurant.way4tech.com', tag: 'Restaurant', line: 'Dine-in, menu and restaurant operations.', cred: 'std' },
      { name: 'School / Education', host: 'education.way4tech.com', tag: 'Education', line: 'Students, classes, fees and attendance.', cred: 'std' },
      { name: 'Events', host: 'event.way4tech.com', tag: 'Events', line: 'Event planning, tickets and attendees.', cred: 'std' },
      { name: 'E-commerce', host: 'ecommerce.way4tech.com', tag: 'Retail', line: 'Online store with catalogue and orders.', cred: 'std' },
      { name: 'Law Firm', host: 'lawfirm.way4tech.com', tag: 'Legal', line: 'Cases, clients and legal billing.', cred: 'std' },
      { name: 'NGO / Non-profit', host: 'ngo.way4tech.com', tag: 'Non-profit', line: 'Donors, projects and grant tracking.', cred: 'std' },
      { name: 'Photography Studio', host: 'photography.way4tech.com', tag: 'Creative', line: 'Shoots, packages and client galleries.', cred: 'std' },
      { name: 'Real Estate', host: 'realestate.way4tech.com', tag: 'Property', line: 'Listings, leads and property deals.', cred: 'std' },
      { name: 'Travel', host: 'travel.way4tech.com', tag: 'Travel', line: 'Travel packages and agency workflow.', cred: 'std' },
      { name: 'Consulting', host: 'consulting.way4tech.com', tag: 'Services', line: 'Projects, timesheets and consulting invoicing.', cred: 'std' },
      { name: 'Gym', host: 'gym.way4tech.com', tag: 'Fitness', line: 'Membership and fitness-centre management.', cred: 'std' },
      { name: 'Construction Management (store, Odoo 19)', host: 'construction.way4tech.com', tag: 'Construction', line: 'The store module: projects, BoQ, material requests and construction job costing.', cred: 'std' },
      { name: 'Car Wash', host: 'carwash-app.way4tech.com', tag: 'Automotive', line: 'Car wash bookings, packages and POS.', cred: 'std' },
      { name: 'Dental Clinic', host: 'dental-app.way4tech.com', tag: 'Healthcare', line: 'Dental charts, appointments and billing.', cred: 'std' },
      { name: 'Spa & Wellness', host: 'spa-app.way4tech.com', tag: 'Beauty', line: 'Spa bookings, therapists and packages.', cred: 'std' },
    ],
  },
  {
    title: 'More demos',
    blurb: 'Additional live instances.',
    items: [
      { name: 'Salon App', host: 'salon-app.way4tech.com', tag: 'Beauty', line: 'Fast salon point of sale.', cred: 'std' },
      { name: 'Salon POS', host: 'salonpos.way4tech.com', tag: 'Beauty', line: 'Salon POS with appointments.', cred: 'std' },
    ],
  },
  {
    title: 'Storefronts & tools',
    blurb: 'Public storefronts (just browse) and standalone tools.',
    items: [
      { name: 'E-shop Storefront', host: 'eshop.way4tech.com', tag: 'Storefront', line: 'Headless e-commerce storefront. Browse, no login.', cred: 'open' },
      { name: 'Shop Demo', host: 'shop-demo.way4tech.com', tag: 'Storefront', line: 'Online shop demo. Browse, no login.', cred: 'open' },
      { name: 'Fashion Store', host: 'fashion.way4tech.com', tag: 'Storefront', line: 'Fashion storefront. Browse, no login.', cred: 'open' },
      { name: 'SEO Tools Platform', host: 'seotool.way4tech.com', tag: 'Tool', line: 'Multi-site SEO audit platform. Team login.', cred: 'Team login' },
    ],
  },
];

export const DEMO_COUNT = DEMO_GROUPS.reduce((n, g) => n + g.items.length, 0);
export const demoUrl = (it: DemoItem) => `https://${it.host}/${it.path ?? ''}`;
