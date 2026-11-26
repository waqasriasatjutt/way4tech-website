/*
 * Hand-written additions to a few /products/<slug>/ pages, on top of what the
 * catalogue (modules-catalog.ts, generated from the store manifests) carries.
 * Used where a newer Odoo 20 build has moved ahead of the text the catalogue
 * takes from the 19.0 listing. Prices are never typed here.
 */

export interface ExtraShot { src: string; alt: string; caption: string; w: number; h: number; phone?: boolean }
export interface ProductExtra {
  /** "What is new" block, newest release first. */
  whatsNew?: { title: string; intro: string; items: { version: string; title: string; body: string[] }[] };
  /** A short pointer to another module, for example the edition that includes this one. */
  note?: { title: string; body: string; href: string; label: string };
  /** Live demo for this module. No logins here: those are on /demos/. */
  demo?: { url: string; note: string };
  shots?: ExtraShot[];
  /** Replaces the bullets of a catalogue section with the same heading. */
  sectionsReplace?: Record<string, string[]>;
}

const s = (src: string, alt: string, caption: string, w: number, h: number, phone = false): ExtraShot => ({ src, alt, caption, w, h, phone });

const VAN_SALES_DEMO = {
  url: 'https://distributor-demo.way4tech.com/',
  note: 'Van Sales Enterprise on Odoo 20 with sample routes, shops, vans and the industry features switched on in a second company.',
};

const ENTERPRISE_NOTE = {
  title: 'On Odoo 20? Van Sales Enterprise includes this module',
  body: 'Van Sales Enterprise 20.0.9 is one module at one price with the base app and Van Sales included. It adds the offline phone app, GPS tracking, multi-company, Arabic and the industry features, and runs on Odoo 20 Community.',
  href: '/products/wt-sale-distributor-enterprise/',
  label: 'See Van Sales Enterprise',
};

export const PRODUCT_EXTRAS: Record<string, ProductExtra> = {
  'wt-sale-distributor-enterprise': {
    whatsNew: {
      title: 'What is new in 20.0.9',
      intro: 'One price, everything included. The base app and Van Sales come with it, it runs on Odoo 20 Community, and Odoo Enterprise is not needed. Below is what changed in the Odoo 20 build since 20.0.5.',
      items: [
        { version: '20.0.9', title: 'Easy to set up and easy to use', body: [
          'Setup assistant: country, logo, products and shops from Excel, routes made from your areas, staff with their job, vans, cash and the receipt printer.',
          'Health check with one-click fixes, and sign-in on the phone by scanning a QR code.',
          'Settings a distribution manager can change without being an administrator.',
          'Help in plain words on every screen and every setting, a "?" on the phone, tips, read aloud, a big confirm button, undo and sounds.',
        ] },
        { version: '20.0.8', title: 'Industry features built in, each off until you switch it on', body: [
          'Returnable crates and bottles with deposits, and empties counted on the phone.',
          'Fresh goods with expiry dates: the oldest goes out first and the phone shows what to sell first.',
          'Shop equipment such as fridges, freezers and stands, with QR labels, technician checks and repairs.',
          'Tax receipts with a QR code for your country, for example Saudi ZATCA, with receipt numbers per van.',
        ] },
        { version: '20.0.7', title: 'A simpler phone and better visits', body: [
          'Phone home with at most six tiles and the next shop on top.',
          'Visit plan (weekly, every 2 or 4 weeks, monthly) and a call list for shops that were missed.',
          'Push messages, a trust score on each visit and short surveys in the shop.',
          'A self-order link for shops, standing orders, product variants with a size grid, credit risk per company and better offline work.',
          'Free Demand to Purchase bridge: draft purchase orders per vendor from what you sell.',
        ] },
        { version: '20.0.6', title: 'Many companies, regions and languages', body: [
          'Every setting per company, a company switch on the phone and money in each company\'s currency.',
          'A one-click region preset, and per company the weekend, km or miles, kg or lb, and prices with or without tax.',
          'Eight phone themes including dark, and Arabic with a right to left layout.',
        ] },
      ],
    },
    demo: VAN_SALES_DEMO,
    shots: [
      s('/suites/distribution/industry-settings.webp', 'Van Sales Enterprise settings in Odoo 20 with the four industry features', 'Industry features in Settings.', 1440, 900),
      s('/suites/distribution/phone-themes.webp', 'The field app home screen in four phone themes, one of them dark', 'Phone themes, light and dark.', 1600, 846),
      s('/suites/distribution/phone-next-shop.webp', 'Field app showing the next stop with a Start visit button', 'The next shop on top.', 390, 844, true),
      s('/suites/distribution/phone-arabic-home.webp', 'Field app home screen in Arabic with a right to left layout', 'Arabic, right to left.', 390, 844, true),
      s('/suites/distribution/phone-tax-receipt-qr.webp', 'Simplified tax invoice receipt with a QR code', 'A tax receipt with a QR code.', 390, 844, true),
      s('/suites/distribution/phone-returnables.webp', 'Empties screen on the phone with crates given out and taken back', 'Returnable crates.', 390, 844, true),
      s('/suites/distribution/phone-shop-app.webp', 'Shop self-order page with the usual order', 'The shop app.', 390, 844, true),
      s('/suites/distribution/phone-equipment-check.webp', 'Fridge check on the phone with the temperature', 'A fridge check.', 390, 844, true),
    ],
    sectionsReplace: {
      'Who It Is For': [
        'Good fit today: FMCG and consumer goods distributors, food and beverage, wholesale distribution, van sales and pre-sales companies, and cash and carry with a trade counter.',
        'Built in on Odoo 20, switch on when needed: dairy and fresh routes, beverages with returnable crates, water and gas delivery, ice cream with freezers at shops, and countries that need tax receipts with a QR code.',
        'Not a fit today: Pharma distribution and building materials such as cement. They need batch and licence controls or truck and weight planning that are not part of this product.',
        'Good to know: Buying from your suppliers is Odoo Purchase, and the free Demand to Purchase bridge drafts the purchase orders from what you sell. On Odoo 19 the module is at 19.0.5; the industry features and the other changes above are in the Odoo 20 build.',
      ],
    },
  },
  'wt-sale-distributor': { note: ENTERPRISE_NOTE, demo: VAN_SALES_DEMO },
  'wt-sale-distributor-van': { note: ENTERPRISE_NOTE, demo: VAN_SALES_DEMO },
  'wt-sale-distributor-purchase': {
    note: {
      title: 'Free with Van Sales Enterprise',
      body: 'This bridge installs by itself when Van Sales Enterprise and Odoo Purchase are both on the database.',
      href: '/products/wt-sale-distributor-enterprise/',
      label: 'See Van Sales Enterprise',
    },
  },
};
