/*
 * Per-country Odoo localization detail: e-invoicing, tax, payroll, accounting, the
 * payment rails and couriers that actually matter in that market, and what Odoo
 * covers out of the box.
 *
 * Every claim was checked against a primary source, then audited: the e-invoicing
 * schemes, every number and date, the Odoo support classifications, and whether each
 * provider still trades under that name in that market. Corrections from those audits
 * are already applied. Dead brands were removed, not softened.
 *
 * "verified: false" means sources agreed but no primary confirmation was found. Those
 * render without a support badge and must not be tightened up without re-checking.
 *
 * Anything unsourceable was left out rather than guessed. Do not add a rate, threshold
 * or deadline to this file without a source.
 */

export const COUNTRY_DETAIL_REVIEWED = '2026-08-22';

export type OdooSupport = 'native' | 'oca_or_community' | 'third_party_paid' | 'custom_build';

export const SUPPORT_LABEL: Record<OdooSupport, string> = {
  native: 'In Odoo',
  oca_or_community: 'Community module',
  third_party_paid: 'Paid connector',
  custom_build: 'Custom build',
};

export interface CountryFact { claim: string; verified: boolean }
export interface CountryProvider {
  name: string;
  kind: string;
  note: string;
  support: OdooSupport;
  verified: boolean;
}

export interface CountryDetail {
  einvoicing: {
    scheme: string;
    /* The branded name buyers actually search, when the market has one.
       `scheme` is prose ("Fatoora (فاتورة) - ZATCA E-Invoicing", "None. Kuwait
       has no e-invoicing scheme.") and cannot go in a title. Left undefined for
       the markets with no branded regime, so those titles are unchanged. */
    seoToken?: string;
    authority: string;
    status: string;
    appliesTo: string;
    requirements: string[];
    verified: boolean;
  };
  tax: CountryFact[];
  payroll: CountryFact[];
  accounting: CountryFact[];
  payments: CountryProvider[];
  shipping: CountryProvider[];
  odoo: { modules: string[]; native: string[]; custom: string[] };
  openQuestions: number;
}

export const COUNTRY_DETAIL: Record<string, CountryDetail> = {
 "saudi-arabia": {
  "einvoicing": {
   "scheme": "Fatoora (فاتورة) - ZATCA E-Invoicing",
   "seoToken": "ZATCA",
   "authority": "Zakat, Tax and Customs Authority (ZATCA), هيئة الزكاة والضريبة والجمارك",
   "status": "Phase 1 (generation) has applied since 4 December 2021 and Phase 2 (integration with the Fatoora platform) since 1 January 2023, rolled out wave by wave. Wave 25 is the latest announced: taxpayers whose VAT-taxable revenue exceeded SAR 187,500 in 2022, 2023, 2024 or 2025 must integrate by 1 February 2027.",
   "appliesTo": "VAT-registered persons resident in Saudi Arabia. Phase 1 already applies to all of them. Phase 2 applies from the date in your wave notification, and ZATCA notifies each wave at least six months before its integration date. Wave 25 sets the revenue trigger at SAR 187,500, the lowest of any wave so far.",
   "requirements": [
    "Standard tax invoices (B2B and B2G): clearance. The invoice is sent to ZATCA's Fatoora platform and validated before it is a valid invoice.",
    "Simplified tax invoices (B2C): reporting. You issue to the customer, then report to Fatoora within 24 hours.",
    "UBL-based XML. The buyer copy can be XML, or PDF/A-3 with the XML embedded.",
    "QR code on the invoice from Phase 1 onward.",
    "A single invoice sequence. Multiple parallel sequences are not allowed.",
    "Phase 2 means a live API integration with Fatoora for clearance, reporting and validation responses, which your system has to store.",
    "ZATCA publishes the binding detail in separate versioned documents: the Electronic Invoice Data Dictionary, the Electronic Invoice XML Implementation Standard and the Security Features Implementation Standards. Read the current version before you build."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT is 15%. The rate was raised from 5% to 15% on 1 July 2020 and has not moved since.",
    "verified": true
   },
   {
    "claim": "VAT returns are quarterly if annual supplies do not exceed SAR 40 million and monthly above that. The return is due by the end of the month following the tax period: ZATCA set 30 April 2026 as the deadline for the Q1 2026 return.",
    "verified": true
   },
   {
    "claim": "Corporate income tax is 20% of net adjusted profits and falls on the non-Saudi, non-GCC ownership share. Zakat is 2.5% of the Zakat base and falls on the Saudi and GCC share. A mixed-ownership company is split between the two.",
    "verified": true
   },
   {
    "claim": "Withholding tax applies to payments from a resident or a permanent establishment to a non-resident: 5% on dividends, 5% on interest, 15% on royalties, and 5%, 15% or 20% on services depending on the type. It must be paid within the first ten days of the month following the month of payment, so it needs to come off the vendor payment run, not the year-end close.",
    "verified": true
   },
   {
    "claim": "The corporate income tax or Zakat return is due to ZATCA within 120 days of the taxpayer's year end.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "GOSI for Saudi employees totals 21.5% of covered wages: 9.75% from the employee and 11.75% from the employer. For non-Saudi employees it is 2%, paid by the employer.",
    "verified": true
   },
   {
    "claim": "Odoo's Saudi payroll localization (l10n_sa_hr_payroll) sets GOSI deduction rates by employee nationality, handles end of service, and produces WPS reports. Employee bank records must carry an IBAN in line with WPS rules, so bank data quality is a go-live blocker, not a nice-to-have.",
    "verified": true
   },
   {
    "claim": "Saudi Arabia is one of the twelve countries with an official Odoo payroll localization, so payroll does not have to be built from scratch. The others are Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Turkiye, the United Arab Emirates and the United States.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "IFRS Accounting Standards as endorsed by SOCPA are required for all publicly accountable entities. SOCPA runs a technical, Sharia and legal review before endorsing each standard, so the endorsed text can differ from the IASB text.",
    "verified": true
   },
   {
    "claim": "SMEs apply IFRS for SMEs as endorsed in Saudi Arabia, or full endorsed IFRS if they apply it in full rather than picking standards selectively.",
    "verified": true
   },
   {
    "claim": "Companies owned by Saudis, or by Saudis and non-Saudis, must file audited financial statements with the tax return.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "mada",
    "kind": "domestic card scheme",
    "note": "mada is the national debit scheme operated by Saudi Payments under the Saudi Central Bank and it is the card most Saudi shoppers carry. An Odoo shop that only offers Visa and Mastercard will lose orders, so mada has to be switched on at whichever gateway the store connects to.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Amazon Payment Services (formerly PayFort)",
    "kind": "regional gateway",
    "note": "APS is established in Dubai, processes for Saudi merchants and carries mada and STC Pay on a Saudi account. It ships as a payment provider in Odoo 19, so it is the shortest route to Saudi local methods without buying a connector.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Paymob",
    "kind": "regional gateway",
    "note": "Odoo's own documentation states Paymob operates in Egypt, Oman, Saudi Arabia and the United Arab Emirates, and Paymob ships as a provider in Odoo 19. Methods are enabled in the Paymob dashboard and then activated in Odoo, with no module purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "STC Pay (stc bank)",
    "kind": "mobile wallet",
    "note": "STC Pay is the phone wallet Saudi shoppers reach for and it settles in SAR only, with an OTP step at checkout. Amazon Payment Services carries it, and the Moyasar and HyperPay connectors on the Odoo apps store list it as a checkout method.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Apple Pay",
    "kind": "mobile wallet",
    "note": "Apple lists Saudi Arabia as an Apple Pay country and Saudi mada, Visa and Mastercard cards load into the wallet. In Odoo it arrives through the gateway, so choose one that already supports it such as Moyasar, HyperPay or Checkout.com.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Moyasar",
    "kind": "local gateway",
    "note": "Moyasar is a Saudi gateway under Saudi Central Bank supervision that carries mada, Visa, Mastercard, American Express, Apple Pay, Samsung Pay and STC Pay from one account. Nine paid Odoo 19 connectors are listed, so a Saudi store can go live without custom work.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "HyperPay",
    "kind": "local gateway",
    "note": "HyperPay is headquartered in Riyadh, holds a licence from the Saudi Central Bank and also serves the UAE, Jordan, Oman, Qatar, Iraq, Lebanon and Bahrain. The Odoo apps store carries both website and POS connectors for it, including one built specifically around mada.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Geidea",
    "kind": "local acquirer and gateway",
    "note": "Geidea Technology Company operates under the supervision of the Saudi Central Bank and is common both on Saudi shop counters and online. Odoo 19 modules cover the online gateway and the PAX terminals used in Saudi retail, which matters if the same company runs a shop and a website.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "regional gateway",
    "note": "PayTabs covers Saudi Arabia alongside the UAE, Egypt, Iraq, Jordan, Kuwait, Oman and Morocco, and lists mada, STC Pay, Apple Pay, Samsung Pay, Tabby and Tamara among the methods it carries. Seven paid Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Telr",
    "kind": "regional gateway",
    "note": "Telr operates in Saudi Arabia and the UAE and lists mada, Apple Pay, Samsung Pay and the international card brands. Telr does not publish its own Odoo plugin, so the link comes from a paid Odoo 19 module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "regional gateway",
    "note": "Tap operates across the GCC under SAMA and other regional regulators and carries mada in Saudi Arabia alongside KNET, Benefit, OmanNet and NAPS. That single account matters for a Saudi store that also sells into Kuwait, Bahrain, Oman and Qatar.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Checkout.com",
    "kind": "global gateway",
    "note": "Checkout.com states it brought mada and Apple Pay to merchants across the UAE and Saudi Arabia and also carries Tamara, Tabby and STC Pay. It is not in Odoo's shipped provider list, so a Saudi build has to budget a paid connector.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "regional gateway",
    "note": "MyFatoorah is a GCC gateway used by Saudi merchants who also invoice customers in Kuwait, Bahrain and Qatar. Cybrosys publishes a free MyFatoorah module for Odoo 19, with eleven paid alternatives if refunds or POS support are needed.",
    "support": "oca_or_community",
    "verified": false
   },
   {
    "name": "Tamara",
    "kind": "BNPL",
    "note": "Tamara Finance Company is a Saudi joint stock company under the supervision of the Saudi Central Bank, licence 95/A Sh/202502, and splits a basket into instalments with a Sharia compliant structure. Saudi shoppers look for it at checkout, and Odoo 19 connectors exist for both the website and the point of sale.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Tabby",
    "kind": "BNPL",
    "note": "Tabby is headquartered in Riyadh, graduated from the SAMA sandbox and took consumer and SME finance licences from the Saudi Central Bank in June 2026, so it now covers longer plans on larger baskets as well as four instalments. Twelve Odoo 19 connectors are listed, covering website, POS and auto fulfilment.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "sarie instant payments",
    "kind": "instant bank transfer",
    "note": "sarie is the Saudi Central Bank transfer rail between local banks, live since February 2021, running around the clock and accepting a mobile number in place of an IBAN. There is no sarie API connector for Odoo, so stores take it as a bank transfer and confirm the sales order once the money lands.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bank transfer (Odoo Wire Transfer)",
    "kind": "manual bank payment",
    "note": "Saudi B2B buyers routinely settle invoices by bank transfer rather than by card. Odoo 19 ships the Wire Transfer method out of the box, showing your IBAN and a payment reference and holding the order until you confirm receipt.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Paying the courier in cash is still a normal way to buy online in Saudi Arabia, and Odoo 19 ships cash on delivery as an in person payment method with nothing to buy. It changes the configuration though, because the order is confirmed unpaid and the courier collects and remits the money.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe ships with Odoo 19, but Stripe's own country list does not include Saudi Arabia, so a Saudi registered business cannot open a Stripe account to act as its acquirer. This is the most common surprise on a Saudi Odoo project, and the answer is a SAMA licensed gateway instead.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Saudi Post | SPL",
    "kind": "national post",
    "note": "SPL is the national postal and logistics operator with more than 450 branches, Express, Express Plus and Economy products, and the National Address system that Saudi delivery addresses are built on. No SPL connector exists on the Odoo 19 apps store, so rates, labels and the address lookup are a build against SPL's API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "SMSA Express",
    "kind": "domestic express",
    "note": "SMSA is a Saudi courier operating since 1994 with hundreds of retail points in the Kingdom, handling cash on delivery and e-commerce returns. Odoo does not ship a connector for it, so expect a paid apps store module, of which at least six exist for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel is a Riyadh headquartered operator running time definite domestic express plus e-fulfilment, order management and warehousing, and it publishes an API. Two paid Odoo 19 connectors are listed, so the licence cost belongs in the project budget.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "domestic and regional express",
    "note": "Aramex runs domestic and cross border delivery inside Saudi Arabia with cash on delivery and returns for e-commerce sellers. Odoo ships no Aramex connector and the OCA delivery-carrier repository does not contain one either, so it is always a paid apps store module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "AJEX Logistics Services",
    "kind": "domestic express",
    "note": "AJEX is a Riyadh based express operator formed by Ajlan Group and SF International, covering Saudi Arabia, the UAE and Bahrain with domestic, next day, same day and cash on delivery express. Two paid Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "iMile",
    "kind": "last mile",
    "note": "iMile started in Dubai in 2017 and built its Saudi and regional business around cash on delivery parcels for online stores, with tracking and returns. One paid Odoo 19 connector is listed.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "J&T Express",
    "kind": "domestic express",
    "note": "J&T runs last mile delivery in Saudi Arabia and is common on marketplace and social commerce orders. One paid Odoo 19 connector is listed, so it can be wired to delivery orders without a custom build.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Zajil Express",
    "kind": "domestic express",
    "note": "Zajil is a Riyadh based private courier operating since 1999 with a Dammam to Riyadh to Jeddah express route and outlets across the Kingdom. Nothing on the Odoo 19 apps store covers it, so rates and labels need a custom carrier.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Barq",
    "kind": "last mile",
    "note": "Barq is a Saudi last mile operator built for fast hyperlocal delivery inside cities, used where a store promises same day arrival. No Odoo 19 module exists for it, so the delivery carrier has to be written.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express ships as a delivery connector in Odoo 19 and runs express service into and out of Saudi Arabia, with coverage down to Dammam, Khobar, Dhahran, Najran and Al Jubail. It is the usual choice for outbound international parcels from a Saudi store.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx ships as a delivery connector in Odoo 19 and operates in Saudi Arabia, where shipments require the receiver's short address or national address code. That field has to be captured on the Odoo delivery address or labels will fail.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS ships as a delivery connector in Odoo 19 and covers all regions for rating and labels, though its street level address validation only applies to the United States and Puerto Rico. Use the current UPS provider in Odoo, not the archived UPS Legacy one.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Torod",
    "kind": "aggregator",
    "note": "Torod is a Saudi shipping aggregator that lets a store compare couriers, book shipments and handle returns from one account. A paid Odoo 19 module exists, and the Torod account plus its per shipment fees are a required dependency on top of that module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "OTO (tryoto)",
    "kind": "aggregator",
    "note": "OTO is a Riyadh based multi carrier shipping platform connected to a long carrier list including Saudi Post, Aramex, DHL, UPS and FedEx, with cash on delivery reconciliation. No Odoo 19 module is listed for it, so the connection is a build against the OTO API on top of an OTO subscription.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Carriyo",
    "kind": "aggregator",
    "note": "Carriyo is a delivery management platform that lists more than eighteen Saudi carriers behind one integration, including SMSA, Naqel, Saudi Post, Zajil, AJEX, Barq and SAB Express. There is no Odoo 19 module for it, so reaching those carriers through Carriyo means a custom connector plus the Carriyo subscription.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "AfterShip",
    "kind": "aggregator",
    "note": "AfterShip is a multi carrier shipping and tracking aggregator, and paid Odoo 19 connectors exist for it. Any carrier reached this way depends on an AfterShip account and its fees on top of the module licence, so check the carrier list covers your Saudi couriers before committing.",
    "support": "third_party_paid",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_sa",
    "l10n_sa_reports",
    "l10n_sa_edi",
    "l10n_sa_edi_pos",
    "l10n_sa_pos",
    "l10n_sa_withholding_tax",
    "l10n_sa_hr_payroll",
    "l10n_sa_hr_payroll_account"
   ],
   "native": [
    "Chart of accounts, VAT setup and Phase 1 QR code on invoices (l10n_sa).",
    "Local accounting reports (l10n_sa_reports).",
    "ZATCA Phase 2 API integration: clearance and reporting, ZATCA-compliant XML for tax invoices, simplified tax invoices, credit notes and debit notes, plus storage of the XML, QR codes and ZATCA responses (l10n_sa_edi).",
    "Simplified invoices raised through Point of Sale (l10n_sa_edi_pos and l10n_sa_pos).",
    "Down payments, retention and debit and credit notes through the e-invoicing flow.",
    "Withholding tax applied at payment (l10n_sa_withholding_tax)."
   ],
   "custom": [
    "Payments. Stripe, the default Odoo answer everywhere else, is not available for Saudi businesses. Amazon Payment Services and Paymob both ship with Odoo 19 and both cover Saudi Arabia; mada, STC Pay and BNPL come from paid apps-store connectors.",
    "Couriers. SMSA, Naqel and Aramex are all outside Odoo's native carrier list and need paid connectors or a build. Only DHL Express, FedEx and UPS are native for this market.",
    "ZATCA's specifications are versioned documents on the developer portal: the data dictionary, the XML implementation standard and the security features standard. Budget for re-testing against each ZATCA release, not just at go-live.",
    "Odoo's own e-invoicing documentation states it is an overview and not legal advice. Compliance sign-off stays with your tax adviser."
   ]
  },
  "openQuestions": 22
 },
 "uae": {
  "einvoicing": {
   "scheme": "UAE Electronic Invoicing System (EIS)",
   "seoToken": "EIS",
   "authority": "Ministry of Finance, with the Federal Tax Authority as the reporting endpoint",
   "status": "The pilot programme started on 1 July 2026 with a selected group of taxpayers. Businesses with annual revenue of AED 50 million or more must appoint an Accredited Service Provider by 30 October 2026, extended from 31 July 2026, and go live on 1 January 2027. That go-live date has not moved.",
   "appliesTo": "All persons conducting business in the UAE, for B2B and B2G transactions, except where a specific exclusion applies. Excluded businesses may still opt in voluntarily. Businesses under AED 50 million revenue appoint an ASP by 31 March 2027 and go live on 1 July 2027. Government entities appoint by 31 March 2027 and go live on 1 October 2027. B2C is not in the current scope.",
   "requirements": [
    "A Decentralised Continuous Transaction Control and Exchange (DCTCE) 5-corner model: supplier, supplier's ASP, buyer's ASP, buyer, and the Federal Tax Authority as corner 5.",
    "Structured XML in PINT AE format, converted to the UAE standard e-invoice XML. PDF, Word, images and scans are not e-invoices.",
    "You must appoint a UAE Accredited Service Provider. You do not connect to the FTA yourself.",
    "The supplier's ASP reports the Tax Data Document to the FTA in parallel with delivering the invoice through the buyer's ASP. This is continuous reporting, not the pre-clearance model Saudi Arabia uses, which is a different build.",
    "Exchange runs on OpenPeppol, so the same rails carry cross-border invoices.",
    "The legislation sits in Ministerial Decisions No. 64, No. 243 and No. 244 of 2025, with No. 244 amended in May 2026 to move the ASP appointment deadline."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT is 5%. Mandatory registration at AED 375,000 of taxable supplies, voluntary at AED 187,500.",
    "verified": true
   },
   {
    "claim": "The standard VAT period is quarterly below AED 150 million annual turnover and monthly at AED 150 million or above. The return and any payment must reach the FTA within 28 days of the end of the tax period, filed through EmaraTax.",
    "verified": true
   },
   {
    "claim": "Corporate tax is 9% on taxable income above AED 375,000 and 0% up to it, effective for financial years starting on or after 1 June 2023. A Qualifying Free Zone Person pays 0% on qualifying income and 9% on the rest.",
    "verified": true
   },
   {
    "claim": "A Domestic Minimum Top-up Tax of 15% applies to multinational groups with consolidated global revenue above EUR 750 million, for financial years starting on or after 1 January 2025.",
    "verified": true
   },
   {
    "claim": "The corporate tax return is filed electronically no later than nine months after the end of the tax period, and records must be kept for seven years after the end of the tax period.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Non-GCC nationals are not subject to UAE social security. Only UAE and GCC nationals generate pension contributions, so for most private-sector headcount the payroll obligation is end of service gratuity plus WPS, not social insurance.",
    "verified": true
   },
   {
    "claim": "For UAE nationals outside Abu Dhabi the long-standing split is 20% of gross remuneration: 5% employee, 12.5% employer and 2.5% government. Abu Dhabi is 26%, with 15% from the employer and 6% from the government.",
    "verified": true
   },
   {
    "claim": "Odoo's UAE payroll localization (l10n_ae_hr_payroll, l10n_ae_hr_payroll_account) covers end of service gratuity by tenure band, housing, transport, medical, overtime and annual passage allowances, annual leave encashment, unpaid leave, GPSSA and DIFC DEWS for UAE nationals, and WPS reports. Employee IDs and bank accounts drive the WPS extract, so that data has to be clean before the first run.",
    "verified": true
   },
   {
    "claim": "The Wage Protection System was tightened in 2026. Ministerial Resolution No. 340 of 2026, issued 12 May 2026 and effective 1 June 2026, moves the wage payment point to the first day of the following calendar month with at least 85% of total wages transferred, and removes the 15-day grace period that Resolution 598 of 2022 allowed. Non-payment escalates to suspension of work permit services and referral to public prosecution.",
    "verified": false
   }
  ],
  "accounting": [
   {
    "claim": "IFRS is the required accounting standard for corporate tax purposes under Ministerial Decision No. 114 of 2023. A taxable person with revenue not exceeding AED 50 million may apply IFRS for SMEs, and a person with revenue not exceeding AED 3 million may use cash basis accounting.",
    "verified": true
   },
   {
    "claim": "Under Ministerial Decision No. 84 of 2025, effective for financial years starting on or after 1 January 2025, all tax groups must prepare audited special purpose financial statements. The AED 50 million consolidated revenue exemption that tax groups had under Ministerial Decision No. 82 of 2023 is gone. Non-group taxable persons still need audited statements above AED 50 million revenue, and Qualifying Free Zone Persons need them regardless.",
    "verified": true
   },
   {
    "claim": "Odoo's UAE chart of accounts is aligned to IFRS and FTA requirements, and the VAT return report follows the official FTA structure. It exports to Excel and PDF for manual submission: there is no FTA filing API in the localization.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Jaywan",
    "kind": "domestic card scheme",
    "note": "Jaywan is the UAE domestic card scheme from Al Etihad Payments, a Central Bank of the UAE subsidiary, and Network International switched on Jaywan acceptance for online merchants in July 2026 with no extra merchant fee on its gateway. In Odoo it arrives through your acquirer, so the practical route is an N-Genius connector rather than a Jaywan specific module.",
    "support": "oca_or_community",
    "verified": false
   },
   {
    "name": "Aani",
    "kind": "instant bank transfer",
    "note": "Aani is the UAE instant payment service from Al Etihad Payments, moving up to AED 50,000 in under ten seconds using a mobile number, email or QR code, across 74 licensed institutions. Merchant acceptance by QR and request to pay is still rolling out and there is no Odoo connector, so today it is reconciled like a bank transfer.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Network International (N-Genius Online)",
    "kind": "local gateway and acquirer",
    "note": "Network International is the Dubai headquartered acquirer behind a large slice of UAE card acceptance, and N-Genius Online is the gateway that handles the website checkout. A free N-Genius payment provider module is published for Odoo 19, with a paid alternative if you want dashboard reporting.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Amazon Payment Services (formerly PayFort)",
    "kind": "regional gateway",
    "note": "APS is established in Dubai and processes online payments for merchants across the UAE and the wider region, with UAE partner banks including FAB, Mashreq and RAKBANK. It ships as a payment provider in Odoo 19, so there is no connector to buy.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Paymob",
    "kind": "regional gateway",
    "note": "Odoo's documentation states Paymob operates in Egypt, Oman, Saudi Arabia and the United Arab Emirates, and Paymob ships as a provider in Odoo 19. Methods are turned on in the Paymob dashboard first and then activated in Odoo.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe lists the United Arab Emirates among the countries where a business can open an account, unlike Saudi Arabia. Stripe ships with Odoo 19 with tokenisation, manual capture, partial refunds and express checkout, which is the fullest native feature set of any provider Odoo ships.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "Adyen has run payments in the UAE since 2020 for names such as Careem, noon and Ziina, and took a Retail Payment Services licence from the Central Bank of the UAE so it can settle locally. Adyen ships in Odoo 19 with tokenisation and partial capture and refunds.",
    "support": "native",
    "verified": false
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal ships with Odoo 19 and a UAE business can open a business account against a trade licence and withdraw to a UAE bank. Treat it as a secondary method beside a local gateway, since UAE accounts are receive oriented and convert to AED.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Checkout.com",
    "kind": "global gateway",
    "note": "Checkout.com was the first global payments platform to take an acquiring licence from the Central Bank of the UAE, in May 2023 under Checkout MENA FZ-LLC, and it carries mada, KNET, Tamara, Benefit and OmanNET alongside cards. It is not in Odoo's shipped list, so a paid connector is needed.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Telr",
    "kind": "regional gateway",
    "note": "Telr operates in the UAE and Saudi Arabia and lists more than fifteen payment methods including Visa, Mastercard, American Express, Apple Pay, Samsung Pay and PayPal, across many currencies. Telr publishes no Odoo plugin of its own, so the link is a paid Odoo 19 module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "regional gateway",
    "note": "PayTabs covers the UAE alongside Saudi Arabia, Egypt, Iraq, Jordan, Kuwait, Oman and Morocco, and carries Apple Pay, Samsung Pay, Tabby and Tamara plus the card brands. Useful for a UAE store that also sells into the wider region on one account, with a paid Odoo 19 connector.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "regional gateway",
    "note": "Tap holds a full Retail Payment Services licence from the Central Bank of the UAE and covers the GCC plus Egypt, Jordan and Lebanon, carrying KNET, mada, Benefit, OmanNet and NAPS on the same account. Four paid Odoo 19 connectors are listed.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Ziina",
    "kind": "local gateway",
    "note": "Ziina Payment LLC is licensed and regulated by the Central Bank of the UAE and sells a payment gateway, payment links and tap to pay aimed at UAE small businesses with fast onboarding. One paid Odoo 19 connector is listed.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "regional gateway",
    "note": "MyFatoorah is a GCC gateway used by UAE merchants who also bill customers in Kuwait, Bahrain and Qatar. Cybrosys publishes a free MyFatoorah module for Odoo 19, with eleven paid alternatives that add refunds or POS support.",
    "support": "oca_or_community",
    "verified": false
   },
   {
    "name": "noon payments",
    "kind": "local gateway",
    "note": "noon payments is a UAE gateway that enabled Jaywan across its merchant network in May 2026 and publishes UAE merchant plans. There is no Odoo 19 module for it, so acceptance means writing a payment provider against their API.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Tabby",
    "kind": "BNPL",
    "note": "Tabby splits a basket into four interest free payments or up to twelve monthly instalments, and Tabby Payments LLC is licensed by the Central Bank of the UAE. Twelve Odoo 19 connectors are listed, covering website checkout, point of sale and auto fulfilment on payment.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Tamara",
    "kind": "BNPL",
    "note": "Tamara operates in the UAE alongside Saudi Arabia, Kuwait and Bahrain, splitting payments over instalments under a Sharia compliant structure. Fourteen Odoo 19 connectors are listed, including POS and a direct refund module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Apple Pay",
    "kind": "mobile wallet",
    "note": "Apple lists the United Arab Emirates as an Apple Pay country and UAE bank cards load into the wallet. In Odoo it comes through the gateway, so pick one that already supports it such as Checkout.com, Network International or Tap.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Payit",
    "kind": "mobile wallet",
    "note": "Payit is First Abu Dhabi Bank's digital wallet, used in the UAE for merchant payments, bills and transfers, including by customers without a full bank account. There is no Odoo module for it, so accepting Payit directly is a custom build.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Bank transfer (Odoo Wire Transfer)",
    "kind": "manual bank payment",
    "note": "UAE B2B buyers commonly settle invoices by local bank transfer rather than by card. Odoo 19 ships the Wire Transfer method, which shows your IBAN and a payment reference and waits for you to confirm the funds arrived.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Emirates Post",
    "kind": "national post",
    "note": "Emirates Post is the UAE national postal operator, running post offices across the emirates and offering parcel, express and e-commerce delivery plus international products. There is no Emirates Post module on the Odoo 19 apps store, so rates, labels and tracking are a build against their API.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Aramex",
    "kind": "domestic and global express",
    "note": "Aramex is headquartered in Dubai and is the default courier for a great many UAE stores, with cash on delivery, returns and a published developer API. Odoo ships no Aramex connector and the OCA delivery-carrier repository has none either, so it is a paid apps store module every time.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express ships as a delivery connector in Odoo 19 and runs express service in and out of the UAE with business accounts for regular shippers. It is the standard choice for outbound international parcels from a Dubai or Abu Dhabi warehouse.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx ships as a delivery connector in Odoo 19 and operates in the UAE with International Priority and International Economy services. Rating and label printing work straight from the delivery order with no module purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS ships as a delivery connector in Odoo 19 and covers all regions for rating and labels, with Worldwide Express and Worldwide Saver used for UAE outbound. Configure against the current UPS provider in Odoo, not the archived UPS Legacy one.",
    "support": "native",
    "verified": true
   },
   {
    "name": "iMile",
    "kind": "last mile",
    "note": "iMile was founded in Dubai in 2017 and built its e-commerce business around cash on delivery parcels with tracking and customer initiated returns. One paid Odoo 19 connector is listed.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Quiqup",
    "kind": "last mile",
    "note": "Quiqup does same day and next day delivery in Dubai and across the UAE plus warehousing, pick and pack and two day returns, and it also ships UAE to Saudi Arabia. Two paid Odoo 19 connectors are listed.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Shipa Delivery",
    "kind": "last mile",
    "note": "Shipa Delivery handles UAE domestic parcels and regional cross border shipping for online stores. One paid Odoo 19 connector is listed, pulling live rates onto the sales order and creating the shipment from the delivery order.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Zajel",
    "kind": "domestic express",
    "note": "Zajel is a UAE courier founded in 2008 that delivers anywhere in the country within 24 hours, with cash on delivery, returns and a dedicated e-commerce service run from more than 100 vans and bikes. Nothing on the Odoo 19 apps store covers it, so it needs a custom carrier.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "AJEX Logistics Services",
    "kind": "regional express",
    "note": "AJEX is the Ajlan Group and SF International express venture and its network covers the UAE as well as Saudi Arabia and Bahrain, including cash on delivery express and China to Gulf lanes. Two paid Odoo 19 connectors are listed.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Carriyo",
    "kind": "aggregator",
    "note": "Carriyo is a delivery management platform listing more than fifteen UAE carriers behind a single integration, including Aramex, Emirates Post, Quiqup, iMile, Shipa, Jeebly and PostaPlus. There is no Odoo 19 module for it, so reaching those carriers this way means a custom connector plus the Carriyo subscription.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "AfterShip",
    "kind": "aggregator",
    "note": "AfterShip is a multi carrier shipping and tracking aggregator with paid Odoo 19 connectors on the apps store. Anything reached through it depends on an AfterShip account and its fees on top of the module licence, so confirm your UAE couriers are on its carrier list first.",
    "support": "third_party_paid",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_ae",
    "l10n_ae_reports",
    "l10n_ae_pos",
    "l10n_ae_hr_payroll",
    "l10n_ae_hr_payroll_account"
   ],
   "native": [
    "Chart of accounts aligned to IFRS and FTA requirements, with VAT at 5% plus zero-rated, exempt, import and reverse charge treatments (l10n_ae).",
    "VAT return in the official FTA structure and corporate tax reporting with exempt income and allowable deduction classification, exported to Excel or PDF (l10n_ae_reports).",
    "Automatic currency rate sync with the Central Bank of the UAE.",
    "Local compliance behaviour on Point of Sale receipts (l10n_ae_pos).",
    "Multi-language invoicing.",
    "Payroll: end of service gratuity by tenure, housing, transport, medical, conveyance, overtime and annual passage allowances, leave encashment, GPSSA, DIFC DEWS and WPS reports (l10n_ae_hr_payroll, l10n_ae_hr_payroll_account)."
   ],
   "custom": [
    "E-invoicing. There is no UAE e-invoicing module in the official Odoo localization and no UAE page in Odoo's e-invoicing documentation. Odoo's own Peppol support sends BIS Billing 3.0, XRechnung CIUS and NLCIUS. PINT AE is not among them.",
    "VAT filing stays manual. The FTA report exports to Excel and PDF; there is no EmaraTax submission in the localization.",
    "Payments. Stripe, Amazon Payment Services and Paymob are the providers shipped with Odoo 19 that cover the UAE.",
    "Couriers. Only DHL Express, FedEx and UPS are native for this market. Aramex and the UAE last-mile operators need paid connectors or a build."
   ]
  },
  "openQuestions": 21
 },
 "qatar": {
  "einvoicing": {
   "scheme": "Electronic invoicing law (draft). No branded scheme name has been published yet, unlike Saudi Fatoora or Egypt's e-invoice portal.",
   "authority": "General Tax Authority (GTA), with the Ministry of Finance. Existing tax filings already run through the GTA's Dhareeba portal.",
   "status": "Qatar's Cabinet approved a draft e-invoicing law and its executive regulations on 6 May 2026. Nothing is in force: no scope, no technical specification and no start date have been published as of 22 August 2026.",
   "appliesTo": "Nobody yet. The draft law gives the GTA power to require e-invoicing for named taxpayers and transaction types, but those categories have not been published. Do not plan a build against a scope that does not exist.",
   "requirements": [
    "Not yet defined. KPMG's read of the approved draft is that it will set rules for issuing, storing and transmitting e-invoices and related credit and debit notes, and create a database for GTA oversight.",
    "No format, no clearance-versus-reporting decision, no QR rule, no signature or seal rule, and no accredited service provider list have been published. Anyone quoting these today is guessing.",
    "What is real today: tax returns, withholding tax statements and contract notifications must be filed electronically in Dhareeba, and financial statements filed with the tax return must be in Arabic."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "Qatar has no VAT and no sales tax. PwC's Qatar summary, reviewed 26 February 2026, states plainly: \"Currently, Qatar imposes no VAT or sales tax on operations in Qatar.\" A GCC-framework VAT at 5% is anticipated but has not been enacted.",
    "verified": true
   },
   {
    "claim": "Excise tax has applied since 1 January 2019: tobacco products 100%, energy drinks 100%, special purpose goods including alcohol and pork 100%, carbonated drinks 50%.",
    "verified": true
   },
   {
    "claim": "Customs duty is 5% on goods originating outside the GCC, with higher rates on items such as tobacco.",
    "verified": true
   },
   {
    "claim": "Corporate income tax is 10% on the foreign-owned share of taxable income. Entities wholly owned by Qatari nationals and by GCC nationals resident in Qatar are exempt. Oil and gas operations are taxed at 35%.",
    "verified": true
   },
   {
    "claim": "Withholding tax is a single 5% rate on payments to non-residents without a permanent establishment in Qatar, covering interest, royalties, technical fees, commissions, brokerage and other service payments used or benefited from in Qatar. Tax withheld must be remitted to the GTA by the 16th day of the following month, and monthly WHT statements are filed in Dhareeba. Dividends are not subject to WHT.",
    "verified": true
   },
   {
    "claim": "The tax return is due within four months of the end of the accounting period. Since 1 November 2020 all returns and other submissions, including WHT and contract notifications, must be filed through Dhareeba.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Social insurance is payable only for Qatari nationals. Expatriate staff, who are the bulk of most private sector headcounts, carry no social insurance contribution.",
    "verified": true
   },
   {
    "claim": "Under Social Insurance Law No. 1 of 2022, contributions to the General Retirement and Social Insurance Authority (GRSIA) rose to 14% employer and 7% employee for Qatari nationals, from the previous 10% and 5%. The scheme covers Qatari nationals aged 18 and over in permanent employment.",
    "verified": false
   },
   {
    "claim": "The Wage Protection System requires private sector wages to be paid in Qatari riyals into employee accounts at financial institutions in Qatar, with a Salary Information File (SIF) submitted through the employer's bank to the Ministry of Labour. The SIF is a delimited text file with a fixed field order and a mandatory header carrying establishment number, pay month and year, total amount and transaction count. Odoo has no native SIF export, and paid apps store modules exist that generate it as RFC 4180 CSV.",
    "verified": false
   },
   {
    "claim": "Law No. 17 of 2020 sets a minimum basic wage of QAR 1,000 per month for private sector employees and domestic workers, plus QAR 500 accommodation allowance and QAR 300 food allowance, giving QAR 1,800 unless the employer provides accommodation or food directly.",
    "verified": true
   },
   {
    "claim": "The standard working week is 48 hours at a maximum of 8 hours per day, reduced by two hours during Ramadan. Employees are entitled to an end of service gratuity based on length of service and final basic salary.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "IFRS is required for listed companies. The basis is Commercial Law No. 5 of 2002, which requires internationally approved accounting principles, and the Qatar Financial Markets Authority rulebooks define that as IFRS.",
    "verified": true
   },
   {
    "claim": "Audited financial statements must be submitted with the tax return if any one of these applies: capital exceeds QAR 200,000, total income exceeds QAR 500,000, or the head office is outside Qatar.",
    "verified": true
   },
   {
    "claim": "For taxable years starting on or after 1 January 2020, financial statements must be submitted in Arabic. Plan for a bilingual chart of accounts and Arabic report layouts, not an English-only book that gets translated by hand each year.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "NAPS (via QPay)",
    "kind": "domestic card scheme",
    "note": "NAPS is the debit network Qatari banks issue on, and QPay is the national e-commerce gateway that processes it under Qatar Central Bank. Tap Payments states NAPS carries over 70 percent of online transactions in Qatar, so an Odoo shop taking only Visa and Mastercard turns away most local buyers.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Himyan",
    "kind": "domestic card scheme",
    "note": "Himyan is Qatar Central Bank's own debit card brand, accepted at POS over NAPS and online through QPay. Noqoody lists Himyan next to NAPS and GCCNET, so you get it by asking your acquirer to enable it, not by adding a separate provider in Odoo.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Fawran",
    "kind": "instant bank transfer",
    "note": "Fawran is Qatar Central Bank's instant payment service and it now reaches local e-commerce checkouts through QPay, where the buyer pays from a mobile number or alias instead of a card. Merchants have to register for Fawran separately, and Doha Bank was the participating bank when it went live on QPay.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Qatari shoppers still pay at the door, and Qatar Post supports collection on delivery. It changes the Odoo setup because the sale order confirms before any money exists, so you need the courier to remit and a reconciliation step against the carrier statement.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Amazon Payment Services",
    "kind": "global gateway",
    "note": "Amazon Payment Services signs up merchants in Qatar and switches NAPS as a local method alongside Visa and Mastercard. It is one of the payment providers that ships inside Odoo 19, so it is the shortest route from a Qatari merchant account to a working Odoo checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "local gateway",
    "note": "Tap processes NAPS and QPay in Qatari riyal and covers Saudi, UAE, Bahrain, Oman and Kuwait off the same account. Worth choosing when one Odoo database sells into several Gulf countries.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "local gateway",
    "note": "MyFatoorah names Qatar among the eight Middle East countries where it accepts payments and holds central bank licences across the Gulf. It is the only Gulf gateway on this list with a free Odoo 19 payment provider module, published by Cybrosys.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "SADAD Payment Solutions (Qatar)",
    "kind": "local gateway",
    "note": "SADAD is a QCB licensed Qatari payment company and the first fintech to integrate directly with NAPS and QPay, so Himyan and NAPS cards clear through it along with cards and Apple Pay. Several Odoo 19 connectors on the apps store are written for SADAD Qatar specifically.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Dibsy",
    "kind": "local gateway",
    "note": "Dibsy is licensed by Qatar Central Bank under the Payment Service Regulation and aims squarely at Qatari SMEs, taking NAPS, cards, Apple Pay and Google Pay. An Odoo 19 connector exists that lists exactly those methods.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "SkipCash",
    "kind": "local gateway",
    "note": "SkipCash is a Qatari provider regulated by Qatar Central Bank, built around QR and NFC payments plus a hosted checkout. Three separate Odoo 19 modules exist for it, including one that drives payment from the point of sale.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Noqoody",
    "kind": "local gateway",
    "note": "Noqoody holds a QCB payment service provider licence and accepts NAPS, Himyan and GCCNET beside Visa, Mastercard, Apple Pay, Google Pay and Samsung Pay, with payment links and subscription billing. Nothing on the Odoo apps store connects to it, so this one is an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Doha Bank Internet Payment Gateway",
    "kind": "local gateway",
    "note": "Doha Bank runs its own merchant gateway covering domestic card schemes and bank transfers, with its Doha Pay wallet and QR payments, and it is the bank named for Fawran acceptance through QPay. Relevant when the client already banks there and wants one relationship.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Apple Pay",
    "kind": "mobile wallet",
    "note": "Apple Pay is offered by the Qatari acquirers, including Dibsy, SADAD and Noqoody, and Qatari banks support it. You enable it at the gateway rather than as its own provider record in Odoo.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Google Pay",
    "kind": "mobile wallet",
    "note": "Google Pay sits next to Apple Pay in the Qatari acquirers' method lists, and the Odoo 19 Dibsy connector exposes it at checkout. Like Apple Pay it rides on your gateway contract.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Ooredoo Money",
    "kind": "mobile wallet",
    "note": "Ooredoo Money is one of the most used mobile wallets in Qatar and also sells a merchant gateway with QR and mobile payments. There is no Odoo payment connector for it, only an unrelated Ooredoo SMS module, so plan on an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Qatar Mobile Payment (QMP)",
    "kind": "mobile wallet",
    "note": "QMP is the mobile payment system regulated by Qatar Central Bank, used to send money, pay bills and pay merchants by QR code. Nothing links it to Odoo today, so it is a build if a client needs it at checkout.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "PayLater",
    "kind": "BNPL",
    "note": "PayLater holds the first buy now pay later licence Qatar Central Bank issued, and it works with Qatar Islamic Bank on a Sharia compliant instalment product. If a Qatari buyer expects instalments at checkout, this is the locally licensed name, and it needs a custom Odoo integration.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bank wire transfer",
    "kind": "bank transfer",
    "note": "Local transfer in Qatari riyal is normal for B2B invoices and larger baskets. Odoo 19 ships a Wire Transfer method that prints your account details on the order and holds it until you confirm the money arrived.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe (not available to Qatari businesses)",
    "kind": "global gateway not available locally",
    "note": "Stripe ships inside Odoo 19, but Qatar is not on Stripe's list of countries where a business can open an account, so a Qatar registered company cannot collect in riyal through it. Budget for Amazon Payment Services, Tap, MyFatoorah, SADAD or Dibsy instead.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Qatar Post",
    "kind": "national post",
    "note": "Qatar Post runs the domestic tiers Qatar Standard, Qatar Express and Qatar Post Premium, the outbound Global Standard, Global Express and Global Priority, plus e-commerce fulfilment and Makan-E. There is no Odoo connector, so rates and labels are manual or an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL is one of the main international operators in Qatar's courier and parcel market and the default for outbound documents and parcels from Doha. Odoo 19 ships a DHL Express connector, and only DHL Express, since other DHL divisions are not supported by it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx operates in Qatar and opened a logistics facility in the Qatar Free Zones in 2025. Its connector ships with Odoo 19, so rating and label printing work from the delivery order once account credentials are in.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS is named among the main companies in Qatar's courier and parcel market and ships with Odoo 19 as a delivery carrier. Usually the third quote next to DHL and FedEx on outbound lanes.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "regional express",
    "note": "Aramex is one of the main carriers in Qatar's parcel market and the name Gulf merchants reach for on regional and cash on delivery work. Odoo has no built in Aramex carrier, so you buy one of the Odoo 19 connectors from the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "SMSA Express",
    "kind": "domestic express",
    "note": "SMSA has direct operations in Qatar as part of its GCC network and is the exclusive FedEx licensee in Saudi Arabia, which matters for cross border Gulf lanes. Odoo 19 connectors are on the apps store and all of them are paid.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel lists Qatar in its operating countries and moves goods across the Gulf on its own road network, with cash on delivery built into its e-commerce product. Odoo 19 connectors exist on the apps store, all paid.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Posta Plus",
    "kind": "regional express",
    "note": "Posta Plus is a Kuwait headquartered courier whose GCC coverage includes Qatar, selling express, e-commerce fulfilment, last mile and customs clearance. No Odoo connector exists on the apps store, so this is an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Snoonu",
    "kind": "last mile",
    "note": "Snoonu is the Qatari delivery platform that runs its own last mile logistics across food, grocery, e-commerce and services, and it is named as a local specialist competing with the global integrators. Nothing connects it to Odoo, so a merchant handover would be an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Milaha",
    "kind": "freight forwarding",
    "note": "Milaha is the Qatari maritime and logistics group named among the operators in the local courier and parcel market, and it is who a Qatari distributor uses for inbound sea and land freight rather than parcels. Freight bookings sit outside Odoo's carrier connectors.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Qatar Airways Cargo",
    "kind": "air freight",
    "note": "Qatar Airways Cargo is part of the country's express and parcel picture, with cross border e-commerce tie ups including Cainiao and joint business with IAG Cargo and MASkargo. It matters for airfreight inbound, not for parcel rating inside Odoo.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_qa (Qatar - Accounting)",
    "l10n_gcc_invoice (Gulf Cooperation Council - Invoice)"
   ],
   "native": [
    "A Qatar chart of accounts. The l10n_qa manifest describes itself as the base module to manage the accounting chart for Qatar and lists exactly one activated feature: chart of accounts.",
    "l10n_qa auto-installs with the Accounting app when the company country is Qatar, and pulls in l10n_gcc_invoice.",
    "l10n_gcc_invoice adds Arabic as a secondary language on invoices, credit notes, debit notes, vendor bills and refund bills, which is what you need for bilingual documents.",
    "QAR is configured with 2 decimal places in Odoo core, so no currency rounding work is needed."
   ],
   "custom": [
    "Everything past the chart of accounts. There is no Qatar tax engine to configure because there is no VAT, but withholding tax at 5%, the 16th-of-month remittance and the monthly Dhareeba WHT statement are all custom.",
    "Contract notification tracking: catching every signed contract and reporting it in Dhareeba within 30 days, with a QAR 10,000 penalty for each miss.",
    "Payroll. Qatar is not in Odoo's payroll localization list. GRSIA contributions for Qatari nationals, end of service gratuity accrual and the WPS Salary Information File all need paid apps store modules or a custom build.",
    "E-invoicing. No Odoo module exists because no Qatar specification exists. Any vendor selling you a Qatar e-invoicing module today is selling you a guess.",
    "Arabic financial statements for the tax return, which means bilingual account names and Arabic report layouts, not a one-off translation.",
    "Dhareeba has no Odoo integration. Filing stays manual unless you build an export."
   ]
  },
  "openQuestions": 28
 },
 "kuwait": {
  "einvoicing": {
   "scheme": "None. Kuwait has no e-invoicing scheme.",
   "authority": "Not applicable. Tax administration sits with the Ministry of Finance Department of Inspection and Tax Claims.",
   "status": "Kuwait is one of two GCC states with nothing in force. Saudi Arabia, the UAE and Oman all have binding mandates or fixed dates, and Qatar has an approved draft law. Kuwait and Bahrain have neither.",
   "appliesTo": "Nobody. There is no Kuwaiti e-invoicing obligation today. Invoicing follows ordinary commercial and tax record-keeping rules.",
   "requirements": [
    "Nothing on the e-invoicing side. The obligations that do bite are the 5% contract retention and tax clearance certificate process, and the requirement to keep accounting records in Kuwait available for inspection.",
    "Watch item, not a deadline: Kuwait signed the GCC Unified VAT Agreement but has not enacted VAT. Across the GCC, e-invoicing has followed VAT rather than preceded it, so a Kuwaiti VAT law is the signal to watch.",
    "If a vendor quotes you a Kuwait e-invoicing deadline, ask them for the gazette reference. There is not one."
   ],
   "verified": false
  },
  "tax": [
   {
    "claim": "Kuwait has no VAT. PwC's Kuwait summary, reviewed 22 July 2026, states the GCC framework agreement is under discussion in Parliament while the draft law is under preparation by the government. Nothing is enacted.",
    "verified": true
   },
   {
    "claim": "Kuwait has no excise tax. PwC states plainly: \"There are no excise taxes in Kuwait.\" Proposals on tobacco, sweetened drinks and luxury goods have not been legislated.",
    "verified": true
   },
   {
    "claim": "Customs duty is the GCC common tariff at 5% on the CIF invoice price, with exceptions, and higher rates on tobacco.",
    "verified": true
   },
   {
    "claim": "Corporate income tax is a flat 15% and applies only to foreign corporate bodies carrying on business or trade in Kuwait. Companies wholly owned by Kuwaiti or other GCC nationals pay no corporate income tax.",
    "verified": true
   },
   {
    "claim": "Three separate profit-based levies sit on Kuwaiti shareholding companies: Zakat at 1% of net profits on all public and closed Kuwaiti shareholding companies, KFAS at 1% of net profits on Kuwaiti shareholding companies, and National Labour Support Tax at 2.5% of net annual profits on companies listed on the Kuwait Stock Exchange. Each has its own base, so they are three calculations, not one.",
    "verified": true
   },
   {
    "claim": "Kuwait imposes no withholding tax. Instead all public bodies and private entities must retain 5% of the contract, agreement or transaction value, or of each payment to any incorporated body, until a tax clearance certificate is produced. The final payment must be no less than 5% of the total contract value. This is a cash and AP process, not a tax code: your ERP has to hold, track and release retentions against certificates.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Social insurance with the Public Institution for Social Security applies to Kuwaiti nationals only. Employer contribution is 11.5% of monthly salary up to a KWD 2,750 per month ceiling. Employee contribution is 8% up to the same KWD 2,750 ceiling, plus a further 2.5% up to a KWD 1,500 ceiling. The two employee ceilings are different, which is where payroll configurations usually go wrong.",
    "verified": true
   },
   {
    "claim": "Employers with five or more employees, outside certain exempt industries, must pay salaries into employees' accounts with local financial institutions. This is the basis of Kuwait's wage protection reporting to the Public Authority for Manpower.",
    "verified": true
   },
   {
    "claim": "Regulations introduced in 2025 require employers to submit and keep updated their records of employees' daily working hours through an electronic platform. If you are running attendance in Odoo, that data now has a statutory destination.",
    "verified": true
   },
   {
    "claim": "End of service indemnity is a statutory entitlement under Private Sector Labour Law No. 6 of 2010, payable on termination in full without deducting employer social security contributions. The accrual rate differs between the first years of service and later years, so it needs a per-employee accrual, not a flat percentage.",
    "verified": false
   },
   {
    "claim": "Kuwaitization applies: the Public Authority for Manpower sets national employment quotas for the private sector by sector and enforces them through work permit renewals. Headcount by nationality is therefore a reportable figure, not just an HR field.",
    "verified": false
   }
  ],
  "accounting": [
   {
    "claim": "IFRS as issued by the IASB is required, and not only for listed companies. The IFRS Foundation jurisdiction profile states IFRS is required for all listed companies, financial institutions and other companies falling under the Kuwait Commercial Companies Law. The basis is Ministerial Decree No. 18 of 1990, amended by Decree No. 101 of 2008. Dual reporting with a local GAAP is not permitted.",
    "verified": true
   },
   {
    "claim": "Accounting records must be maintained in Kuwait and available for inspection. PwC notes records can be in English and may be held in a computerised system, which matters if you are deciding where to host the database and in what language to name accounts.",
    "verified": true
   },
   {
    "claim": "The Kuwaiti dinar has three decimal places. Odoo core already ships KWD with rounding 0.001, so the currency itself is right out of the box, but product prices, unit prices, tax rounding and any price list or import mapping must be set to three decimals or you will book rounding differences on every line.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "KNET",
    "kind": "domestic card scheme",
    "note": "KNET is the debit scheme every Kuwaiti bank issues on, processed in Kuwaiti dinar, and Checkout.com puts it at nearly 80 percent of online transactions in Kuwait. A Kuwaiti checkout without KNET is not really a Kuwaiti checkout.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "WAMD",
    "kind": "instant bank transfer",
    "note": "WAMD is Kuwait's real time payment scheme, run by KNET and available in the local bank apps, where the recipient registers the phone number linked to their account. There is no Odoo connector, so today it lands as a manually confirmed bank payment.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Paying the driver in cash is still normal in Kuwait, and carriers that deliver there such as iMile sell cash on delivery with tracking as a product. In Odoo it means confirming orders before money exists and reconciling remittances against the courier statement.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Amazon Payment Services",
    "kind": "global gateway",
    "note": "Amazon Payment Services onboards merchants in Kuwait and lets you enable KNET beside Visa and Mastercard on the same account. It is one of the payment providers built into Odoo 19, so it is the least work between a Kuwaiti merchant account and a live checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "local gateway",
    "note": "Tap holds an e-Payment Service Provider licence from the Central Bank of Kuwait as a Large EPSP and takes KNET, cards and wallets in one checkout, with the same account reaching Saudi, UAE, Bahrain, Oman and Qatar. It is also the rail Deema instalments run over.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "local gateway",
    "note": "MyFatoorah was founded in Kuwait and lists Kuwait first among the eight Middle East countries where it accepts payments. It is the only Gulf gateway here with a free Odoo 19 payment provider module, published by Cybrosys.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "UPayments",
    "kind": "local gateway",
    "note": "UPayments is licensed by the Central Bank of Kuwait as a Large e-Payment Service Provider and is one of the gateways Kuwaiti merchants shortlist for KNET and Apple Pay. A paid Odoo 19 connector exists on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Hesabe",
    "kind": "local gateway",
    "note": "Hesabe is licensed by the Central Bank of Kuwait as a Large e-Payment Service Provider and is a common pick for KNET plus MPGS card processing. There is a paid Odoo 19 payment provider module for it.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Ottu",
    "kind": "local gateway",
    "note": "Ottu is used in Kuwait to sit in front of a bank gateway and split KNET and credit card into separate acquirers, which matters because KNET and card settlement behave differently. An Odoo 19 module exists that creates both payment providers for you.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "NBK Online Payment Gateway",
    "kind": "local gateway",
    "note": "NBK's merchant gateway takes KNET, Visa, Mastercard, Diners Club, Apple Pay, Samsung Pay and Google Pay, and merchants apply through a branch or the NBK merchant acquiring team. Worth knowing because many Kuwaiti clients already bank with NBK and would rather add acquiring there.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "KNET Payment Gateway (direct)",
    "kind": "local gateway",
    "note": "KNET runs its own payment gateway that government and private entities use to collect online, which skips the PSP markup but needs a bank relationship and a separate arrangement for Visa and Mastercard. There is a paid KNET connector for Odoo 19 on the apps store.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Checkout.com",
    "kind": "global gateway",
    "note": "Checkout.com supports KNET for merchant entities in Kuwait, but on a gateway only basis, so you still need a direct contract with the local provider. Paid Odoo 19 connectors for Checkout.com are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Apple Pay",
    "kind": "mobile wallet",
    "note": "Apple Pay is carried by the Kuwaiti bank gateways, including NBK's, and by the local PSPs. It is turned on at the acquirer rather than added as its own provider in Odoo.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Google Pay",
    "kind": "mobile wallet",
    "note": "Google Pay sits alongside Apple Pay and Samsung Pay in NBK's list of supported methods for its merchant gateway. Like Apple Pay it comes from the acquirer contract, not a separate Odoo setting.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Tabby",
    "kind": "BNPL",
    "note": "Tabby serves a Kuwait localised site and is one of the two instalment names Gulf shoppers look for at checkout. Paid Odoo 19 connectors exist for both website and point of sale.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Tamara",
    "kind": "BNPL",
    "note": "Tamara's own country selector lists Kuwait alongside Saudi Arabia, UAE and Bahrain, offering pay in four with no late fees and a Sharia compliant structure. Paid Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Deema",
    "kind": "BNPL",
    "note": "Deema is Kuwait's first licensed BNPL, works only in Kuwaiti dinar, and is enabled through a Tap account by charging the src_deema source. No Odoo module names Deema, so it is a small build on top of a Tap integration.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bank wire transfer",
    "kind": "bank transfer",
    "note": "Transfer in Kuwaiti dinar remains normal for B2B invoices and high value orders. Odoo 19 ships a Wire Transfer method that shows your account details on the order and waits for manual confirmation.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe (not available to Kuwaiti businesses)",
    "kind": "global gateway not available locally",
    "note": "Stripe ships inside Odoo 19, but Kuwait is not on Stripe's list of countries where a business can open an account, so a Kuwait registered company cannot collect in dinar through it. Plan on Amazon Payment Services, Tap, MyFatoorah, UPayments or Hesabe instead.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Kuwait Post",
    "kind": "national post",
    "note": "Kuwait Post belongs to the Ministry of Communications and handles domestic mail, parcels and EMS express, with international reach to around 120 countries and tracking at tracking.moc.gov.kw. There is no Odoo connector, so rates and labels are manual or an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL is one of the top players in Kuwait's courier market and the usual choice for outbound express. Odoo 19 ships a DHL Express connector, and only DHL Express, since other DHL services are not covered by it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx is named among the leading courier companies in Kuwait and its connector ships with Odoo 19, so rate quotes and labels come straight off the delivery order. Note that SMSA is the FedEx licensee in Saudi Arabia if your lanes run that way.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS is one of the leading courier companies in Kuwait and is a built in delivery carrier in Odoo 19. Usually the third quote next to DHL and FedEx on outbound shipments.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "regional express",
    "note": "Aramex is one of the top five carriers in Kuwait's courier market and the name most Gulf merchants recognise for regional parcels and cash on delivery. Odoo has no built in Aramex carrier, so budget for one of the paid Odoo 19 connectors.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Posta Plus",
    "kind": "domestic express",
    "note": "Posta Plus is headquartered in Kuwait and is named among the top five players in the local courier market, selling express, freight, e-commerce fulfilment, last mile and customs clearance. No Odoo connector exists on the apps store, so it is an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "SMSA Express",
    "kind": "domestic express",
    "note": "SMSA has direct operations in Kuwait as part of its GCC network and is named among the leading couriers in the local market. Odoo 19 connectors are sold on the apps store, all paid.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel lists Kuwait in its operating countries and runs its own Gulf road network with cash on delivery in its e-commerce product, which suits Kuwait to Saudi movements. Odoo 19 connectors on the apps store are all paid.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Shipa Delivery",
    "kind": "last mile",
    "note": "Shipa runs same day, next day and on demand delivery in Kuwait with prepaid or cash on delivery, plus a Kuwait e-commerce fulfilment centre, and it publishes REST APIs for merchants. A paid Odoo 19 connector exists that pulls live rates onto sales and delivery orders.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "iMile",
    "kind": "last mile",
    "note": "iMile lists Kuwait among its markets and is built around e-commerce last mile with cash on delivery and live tracking. A paid Odoo 19 shipping integration exists on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "OCS Worldwide",
    "kind": "global express",
    "note": "OCS Worldwide is named among the leading courier companies operating in Kuwait, mostly on international document and parcel lanes. Nothing on the Odoo apps store connects to it, so rates and labels would be manual or a build.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_kw (Kuwait - Accounting)",
    "l10n_gcc_invoice (Gulf Cooperation Council - Invoice)"
   ],
   "native": [
    "A Kuwait chart of accounts. The l10n_kw manifest describes itself as the base module to manage the accounting chart for Kuwait and lists exactly one activated feature: chart of accounts.",
    "l10n_kw auto-installs with the Accounting app when the company country is Kuwait, and pulls in l10n_gcc_invoice.",
    "l10n_gcc_invoice adds Arabic as a secondary language on invoices, credit notes, debit notes, vendor bills and refund bills.",
    "KWD ships in Odoo core with rounding 0.001, so the three-decimal currency is correct by default."
   ],
   "custom": [
    "Almost all of it. l10n_kw is a chart of accounts and nothing more. There is no Kuwait tax engine to configure because there is no VAT and no excise.",
    "The 5% contract retention and tax clearance certificate cycle. Holding 5% of each payment, tracking it per contract and releasing it against a certificate is an AP and AR process build with its own reporting.",
    "The four-instalment tax payment schedule on the 15th of the fourth, sixth, ninth and twelfth months after year end, plus the three-months-and-15-days return deadline.",
    "Three-decimal discipline beyond the currency record: product prices, unit prices, tax computation and rounding, and any import or price list mapping.",
    "DMTT reporting for in-scope multinational groups. Nothing in Odoo produces GloBE-ready data."
   ]
  },
  "openQuestions": 23
 },
 "oman": {
  "einvoicing": {
   "scheme": "Fawtara (فوترة), the Oman Tax Authority e-invoicing system",
   "seoToken": "Fawtara",
   "authority": "Oman Tax Authority (OTA)",
   "status": "Nothing is mandatory yet. As of 22 August 2026 the OTA is running a voluntary pilot with about 100 selected large VAT-registered companies, and Decision 189/2026 (issued 9 August 2026) fixes the binding dates at 1 April 2027 and 1 October 2027.",
   "appliesTo": "VAT-registered taxable persons. Decision 189/2026 obliges those with annual supplies above OMR 5 million from 1 April 2027, and those at or below OMR 5 million from 1 October 2027. Before those dates participation is voluntary and in practice limited to the OTA's invited pilot group of about 100 large taxpayers.",
   "requirements": [
    "Structured XML invoices built to the PINT OM specification. Three documents are published: PINT OM Billing, PINT OM Self-Billing, and the Oman Tax Data Document (TDD) used to report invoice data to the OTA. Paper invoices, PDFs and emailed images stop counting as tax invoices once the obligation applies.",
    "Exchange over Peppol. The OTA was approved as a Peppol Authority on 7 January 2026 and publishes an Oman SMP API specification, so invoices move through an accredited service provider rather than being posted to the tax authority directly.",
    "A five-corner model: supplier, supplier's service provider, buyer's service provider, buyer, and the OTA. Invoice data reaches the OTA at the same time as the buyer. This is continuous reporting, not per-invoice pre-clearance where the invoice is held until the authority signs it.",
    "Amended Article 143 of the VAT Executive Regulations requires each invoice to be issued in an approved, secured electronic format that keeps it intact and stored, with a unique number per invoice.",
    "Accredited service provider registration opened in March 2026. The OTA portal publishes a Service Provider Registration User Manual alongside the SMP API specification.",
    "The draft data dictionary grew from 53 mandatory invoice fields in the November 2025 OTA draft to 73 in the PINT OM framework, so field-level mapping is real work and should not be underestimated."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT is 5%. Registration is mandatory once annual supplies reach OMR 38,500 and voluntary from OMR 19,250.",
    "verified": true
   },
   {
    "claim": "VAT returns are quarterly. The return and the payment are both due 30 days after the end of the quarter. Late payment carries additional tax of 1% per month, and late filing an administrative penalty of OMR 500 to OMR 5,000.",
    "verified": true
   },
   {
    "claim": "Withholding tax is 10% on royalties, research and development fees, software use rights, management fees and services paid to a foreign company with no permanent establishment in Oman. It must be withheld and remitted within 14 days from the end of the month in which the amount was paid or credited, whichever is earlier. Since 1 March 2018 service WHT applies whether the service is performed inside or outside Oman.",
    "verified": true
   },
   {
    "claim": "Withholding tax on dividends and interest paid to non-resident investors has been suspended since a Royal Directive of 11 January 2023. WHT on leasing ships, aircraft and aircraft engines has been suspended since 29 December 2022.",
    "verified": true
   },
   {
    "claim": "Corporate income tax is 15%. A 3% rate applies to a qualifying small Omani proprietorship or LLC with registered capital of OMR 60,000 or less at the start of the tax year, gross income of OMR 150,000 or less, and an average of 25 employees or fewer. Petroleum companies are taxed at 55%.",
    "verified": true
   },
   {
    "claim": "Personal income tax arrives on 1 January 2028 under Royal Decree 56/2025: 5% of taxable income for individuals whose total annual income exceeds OMR 42,000. Payroll withholding logic will be needed before that date.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Omani nationals contribute to the Social Protection Fund, set up by Royal Decree 52/2023. The employee share is 8% of salary. The employer pays a larger share covering old age, work injury and the job security scheme.",
    "verified": true
   },
   {
    "claim": "Expatriate employees do not join the Omani old age pension scheme. Their end of service is handled through the Labour Law gratuity rather than through the Social Protection Fund.",
    "verified": false
   },
   {
    "claim": "Article 61 of the Labour Law (Royal Decree 53/2023) gives a worker not covered by the Social Protection Law a gratuity of not less than the basic wage for each year of service, calculated on the final basic wage and pro-rated for part years. Allowances do not enter the calculation.",
    "verified": true
   },
   {
    "claim": "The Wage Protection System is mandatory for private sector employers under Ministerial Decision 729/2024, effective 16 December 2024, which replaced Decision 299/2023. Wages must be transferred through a bank or financial institution regulated by the Central Bank of Oman within three days of the end of the wage entitlement period. Fines are OMR 50 per worker and double on repeat, with preliminary work permits suspended until the breach is cleared.",
    "verified": true
   },
   {
    "claim": "WPS exemptions exist for workers in their first 30 days, workers on unpaid leave, labour disputes running 30 days or more, work suspensions not caused by the employer, and absconding reports approved 30 or more days earlier. Payroll needs to flag these cases rather than silently drop them from the file.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "IFRS as issued by the IASB is required, with no local modifications and no accounting policy options removed. For listed issuers the hook is Article 282 of the Executive Regulation of the Capital Market Law (Royal Decree 80/1998). The IFRS for SMEs standard has not been adopted in Oman.",
    "verified": true
   },
   {
    "claim": "The annual income tax return is due within four months of the financial year end and must be accompanied by audited accounts signed by an auditor registered in Oman. SME taxpayers on the 3% rate may instead file a simplified income statement within three months of year end.",
    "verified": true
   },
   {
    "claim": "Accounting records and supporting documents must be kept for ten years after the end of the accounting period they relate to. That drives archive and attachment retention design in Odoo, not just the ledger.",
    "verified": true
   },
   {
    "claim": "Invoices and related documents commonly need Arabic alongside English. Odoo covers this through l10n_gcc_invoice, which adds Arabic as a secondary language on invoices, credit notes, debit notes, vendor bills and refund bills.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "OmanNet",
    "kind": "domestic card scheme",
    "note": "OmanNet is the Central Bank of Oman national ATM and POS switch, and the debit cards issued by Omani banks run on it. An Omani checkout that only takes Visa and Mastercard credit cards turns away most local cardholders.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Maal card",
    "kind": "domestic card scheme",
    "note": "Maal is Oman's own national payment card, launched by the Central Bank of Oman in November 2025 and operated through the OmanNet switch, with no issuance or annual fee for cardholders. Omani banks began issuing it after the launch, so new cards in circulation will carry it.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Thawani Pay",
    "kind": "local gateway",
    "note": "Thawani was the first non-bank fintech licensed by the Central Bank of Oman, in 2020, and it settles in Omani rial straight to an Omani bank account. It is the name most Omani online shoppers recognise at checkout.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Amazon Payment Services",
    "kind": "regional gateway",
    "note": "Amazon Payment Services runs local acquiring in Oman and lists OmanNet as a supported local method, so it is the one route to Omani debit cards that needs no extra module. Odoo 19 ships the connector, so it is set up from Settings rather than bought.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Paymob",
    "kind": "regional gateway",
    "note": "Paymob holds a Central Bank of Oman payment service provider licence and integrates directly with OmanNet, so an Omani merchant can take local and cross border cards on one account. Odoo 19 ships a Paymob provider out of the box.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "regional gateway",
    "note": "Tap processes payouts to businesses in Oman and supports the GCC domestic networks including OmanNet, so a merchant selling into Oman, Kuwait and Bahrain can run one account. Common choice for Omani stores that also ship across the Gulf.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "regional gateway",
    "note": "MyFatoorah states it operates in Oman along with seven other Middle East markets, and it is widely used by smaller Omani stores and invoice based sellers. A free Odoo 19 connector exists alongside paid ones.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "regional gateway",
    "note": "PayTabs covers Oman and lists omannet among its local payment methods, so it reaches Omani debit cards as well as international schemes. Several Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "HyperPay",
    "kind": "regional gateway",
    "note": "HyperPay is a Riyadh based gateway whose stated MENA coverage includes Oman, so it turns up in tenders where the buyer also sells into Saudi Arabia. Odoo 19 connectors are sold on the apps store.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Amwal Pay",
    "kind": "local gateway",
    "note": "Amwal Pay is an Omani payments infrastructure provider aligned with Central Bank of Oman guidelines, offering hosted checkout, payment links and a merchant app. It publishes plugins for WooCommerce, Shopify and Magento but not for Odoo, so a connector has to be written.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bank Muscat e-commerce payment gateway",
    "kind": "local acquirer",
    "note": "Bank Muscat is the largest card acquirer in Oman and sells an e-commerce gateway to its merchant customers, processing through CCAvenue. Larger Omani merchants often already bank here and want the acquiring kept with them.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "pay+",
    "kind": "mobile wallet",
    "note": "pay+ is the mobile wallet from Ooredoo and National Bank of Oman, used for bill payments, transfers and paying at merchants by mobile number. It matters for the customers who do not hold a card.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "eFloos",
    "kind": "mobile wallet",
    "note": "eFloos is the Omantel and Sohar International mobile wallet, loaded from a debit card, ATM or bank app and then used to pay merchants by mobile number. The US government commercial guide names it alongside MpClear as the mobile rail in Oman.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "MpClear",
    "kind": "instant bank transfer",
    "note": "MpClear is the Central Bank of Oman mobile payment clearing and settlement system, letting bank customers pay by mobile number instead of account number across person to merchant and business to business flows. It is the interoperable rail the bank wallets sit on.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Apple Pay and Samsung Pay",
    "kind": "mobile wallet",
    "note": "Both launched in Oman in 2024 and are now a normal way to pay in app and on mobile web. They are switched on through whichever gateway you pick rather than integrated on their own.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Asyad Express, the national express operator, sells cash on delivery as a standard add on for online orders, and rural buyers still lean on it. It changes the Odoo setup because the order has to confirm unpaid and reconcile against a courier remittance file.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Bank transfer in Omani rial",
    "kind": "instant bank transfer",
    "note": "B2B buyers in Oman routinely settle by local bank transfer rather than card, and the trade.gov commercial guide lists bank transfers among the standard e-commerce payment routes. Odoo ships a Wire Transfer method that prints your OMR account details on the order.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway (not available in Oman)",
    "note": "Odoo ships a Stripe connector, but Stripe's own country list does not include Oman, so an Omani registered company cannot open an account to accept payments. Budget for a local acquirer instead of assuming the default Odoo provider will work.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Asyad Express",
    "kind": "domestic express",
    "note": "Asyad Express is the state owned express arm that Oman Post operates under, with 11 last mile centres and door to door delivery across Oman in 24 to 72 hours, plus cash on delivery and returns. It is the default domestic carrier for an Omani online store.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Oman Post",
    "kind": "national post",
    "note": "Oman Post handles registered mail, parcels up to 30 kg and domestic express, and runs the Matjar and Matjar+ cross border shopping service that gives Omani buyers a US address. Small sellers and document shippers still use it for the cheap tier.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "domestic express",
    "note": "Aramex has an Oman country operation based in Al Khuwair, Muscat, and runs the Shop and Ship forwarding service Omani consumers use for overseas purchases. It is the regional carrier most Gulf merchants already have an account with.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express runs an Oman country operation and is named in the US commercial guide as one of the couriers moving Omani e-commerce goods. Odoo 19 ships a DHL Express connector, so rating and label printing work with no purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx operates a station in the Ghala Industrial Area in Muscat and is named in the US commercial guide as a courier used for Omani e-commerce. The Odoo 19 FedEx connector is built in.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS serves Oman through an authorised service contractor in Al Mawaleh South, Muscat. Odoo 19 ships the UPS connector, so outbound international rating is available without buying a module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel runs operations in Oman as part of its GCC road network and offers same day and next day delivery for domestic e-retailers there. Useful when the same store also ships into Saudi Arabia by road.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "SMSA Express",
    "kind": "domestic express",
    "note": "SMSA has a registered Muscat operation and lists Oman among the GCC markets where it delivers directly. It is a common second carrier for Gulf merchants whose main volume is Saudi.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "iMile",
    "kind": "last mile",
    "note": "iMile runs an Oman locale site and specialises in e-commerce last mile with cash on delivery collection and tracking. It is the type of carrier used when COD reconciliation matters more than transit time.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Posta Plus",
    "kind": "domestic express",
    "note": "Posta Plus operates across the GCC including Oman, with cash on delivery, GCC warehousing and consolidated cross border delivery. It suits merchants shipping one catalogue into several Gulf states.",
    "support": "custom_build",
    "verified": false
   }
  ],
  "odoo": {
   "modules": [
    "l10n_om (Oman - Accounting, Odoo S.A., ships in Odoo 19 core, auto-installs with Accounting)",
    "l10n_om_reports (Oman - Accounting Reports)",
    "l10n_gcc_invoice (Gulf Cooperation Council - Invoice, a dependency of l10n_om)"
   ],
   "native": [
    "Chart of accounts based on Omani practice, with account groups and default account mappings",
    "VAT taxes: standard 5%, zero-rated domestic, exports, exempt, imports and reverse charge",
    "Fiscal positions that adjust tax automatically based on whether the customer or vendor is registered",
    "A tax report laid out to match the Oman VAT return",
    "Omani governorates loaded as res.country.state records",
    "Arabic as a secondary language on invoices, credit notes, debit notes, vendor bills and refund bills, via l10n_gcc_invoice"
   ],
   "custom": [
    "Fawtara e-invoicing. Odoo 19 has nothing for it. The Oman localization documentation makes no mention of e-invoicing, Odoo's Peppol access point service covers European countries plus Turkey and includes no GCC country, and a search of the Odoo apps store for Oman e-invoicing returns zero apps. PINT OM generation, the Tax Data Document, SMP connectivity and accredited service provider integration are all a build.",
    "Payroll. There is no Odoo payroll localization for Oman. The only GCC payroll localizations Odoo ships are the United Arab Emirates and Saudi Arabia. Social Protection Fund contribution rules and Article 61 end of service gratuity both need building.",
    "WPS Salary Information File generation. A search of the Odoo apps store for Oman payroll returns zero apps, and the WPS and SIF modules on the store target Saudi Arabia, the UAE and Qatar. Oman needs a custom generator against the employer's bank layout.",
    "Omanisation quota tracking and the annual workforce localisation plan filed with the Ministry of Labour.",
    "Withholding tax at 10% on payments to non-resident suppliers, including the 14-day remittance cycle. l10n_om does not model it.",
    "Personal income tax withholding ahead of the 1 January 2028 start."
   ]
  },
  "openQuestions": 24
 },
 "bahrain": {
  "einvoicing": {
   "scheme": "No named scheme yet. The National Bureau for Revenue has run tenders for an e-invoicing central platform but has not launched or named one.",
   "authority": "National Bureau for Revenue (NBR)",
   "status": "There is no e-invoicing mandate in Bahrain as of 22 August 2026, for B2G, B2B or B2C. No law, technical specification, platform or go-live date has been published.",
   "appliesTo": "Nobody. All VAT-registered businesses still issue conventional tax invoices under the VAT Law. Since 16 November 2023 an invoice may be issued in electronic form without prior NBR approval, but that is permission, not an obligation, and a PDF still counts as a valid invoice.",
   "requirements": [
    "Nothing is technically required today beyond the ordinary VAT tax invoice content rules.",
    "NBR groundwork so far: a taxpayer invoicing readiness survey in February 2022, an e-invoicing tender in July 2022, a request for proposal for an e-invoicing central platform in June 2023, and a further tender for a nationwide B2B system in February 2025.",
    "Market expectation is a Saudi ZATCA style centralised clearance model phased by turnover, with structured XML or JSON. That is expectation, not a published rule. An earlier January 2024 target lapsed without a mandate.",
    "Sensible ERP design today: keep invoice data structured and exportable, and avoid hard-coding numbering or archiving choices that would be painful to change when a specification lands."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT is 10%. The rate rose from 5% to 10% on 1 January 2022.",
    "verified": true
   },
   {
    "claim": "VAT registration is mandatory at BHD 37,500 of annual taxable revenue and voluntary at BHD 18,750.",
    "verified": true
   },
   {
    "claim": "VAT return frequency depends on size: monthly for taxpayers with annual taxable supplies above BHD 3 million, quarterly for those at or below BHD 3 million. Smaller taxpayers may ask the NBR to move to monthly filing.",
    "verified": false
   },
   {
    "claim": "There is no general corporate income tax in Bahrain. Oil and gas businesses are taxed at 46% of net profits.",
    "verified": true
   },
   {
    "claim": "A Domestic Minimum Top-up Tax of 15% applies to multinational groups with global consolidated revenue of at least EUR 750 million in at least two of the four preceding fiscal years, for financial years beginning on or after 1 January 2025. Purely domestic businesses are out of scope.",
    "verified": true
   },
   {
    "claim": "For in-scope DMTT groups: registration with the NBR within 120 days of the start of the transition year, advance payments within 60 days after each quarter end, the return within 15 months of the fiscal year end, and calculation documentation kept for five years after the fiscal year end.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Social insurance is administered by the Social Insurance Organisation (SIO). For Bahraini employees the total is 26%: 18% employer and 8% employee. For expatriate employees the total is 4%: 3% employer and 1% employee. The employer withholds and remits monthly.",
    "verified": true
   },
   {
    "claim": "Nationals of other GCC states working in Bahrain are covered under their home country's social insurance rules, so payroll needs a nationality-driven contribution rule, not a simple local or expatriate switch.",
    "verified": true
   },
   {
    "claim": "End of service for expatriate workers moved to a monthly SIO contribution from 1 March 2024 under Edict 109 of 2023. The employer pays 4.2% of monthly wage for the first three years of service and 8.4% thereafter, electronically through the SIO portal. The SIO issues separate monthly invoices for non-GCC workers. The employee claims the accrued benefit from the SIO at termination, not from the employer. Service before 1 March 2024 stays the employer's liability under the old rules.",
    "verified": true
   },
   {
    "claim": "The Enhanced Wage Protection System (WPS 2.0) became operational in early 2026 after an LMRA announcement on 21 October 2025. All private sector salaries must run through the LMRA WPS portal. Direct bank transfers and manual payments are no longer permitted. Domestic workers are out of scope.",
    "verified": true
   },
   {
    "claim": "Under WPS 2.0 each employer must appoint a Wages Responsible Person plus up to five authorised maker and checker roles, upload a monthly payroll file in the prescribed WPS format, and supply explanations and supporting documents for any non-payment or partial payment. Payments run through banks and payment service providers licensed by the Central Bank of Bahrain and integrated with the WPS platform.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "IFRS as issued by the IASB is required for all domestic public companies and is applied without modification. The legal basis is the Commercial Companies Law (Decree Law 21 of 2001), which requires financial statements prepared according to international accounting standards.",
    "verified": true
   },
   {
    "claim": "The IFRS for SMEs standard is permitted but not required. Most SMEs apply full IFRS because there is no local GAAP in Bahrain.",
    "verified": true
   },
   {
    "claim": "Odoo's Bahrain localization ships two tax report layouts, a full VAT report and a simplified one, so the return format is already modelled rather than needing to be built from the ledger.",
    "verified": true
   },
   {
    "claim": "Arabic alongside English on invoices is handled by l10n_gcc_invoice, which l10n_bh depends on.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "BENEFIT",
    "kind": "domestic card scheme",
    "note": "BENEFIT runs Bahrain's national ATM and POS switch and, since 2006, the national payments gateway that lets banks and their merchants take online transactions on locally issued debit cards. A Bahraini checkout that skips Benefit debit cards misses the cards most residents carry.",
    "support": "native",
    "verified": true
   },
   {
    "name": "BenefitPay",
    "kind": "mobile wallet",
    "note": "BenefitPay is the BENEFIT Company mobile app used for QR payments, person to person transfers and online shopping, connected to accounts at all the major Bahraini banks. Merchants reach it through a licensed gateway rather than integrating with BENEFIT directly.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Fawri+",
    "kind": "instant bank transfer",
    "note": "Fawri+ moves money between Bahraini bank accounts in seconds, 24 hours a day, and the Central Bank of Bahrain raised the daily limit to BD 3,000 with effect from 21 July 2025. B2B buyers use it to settle invoices the same day.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Fawateer",
    "kind": "instant bank transfer",
    "note": "Fawateer is Bahrain's electronic bill presentment and payment service, run on the BENEFIT EFTS rails, and is how recurring bills get paid from one dashboard. It matters for subscription and utility style billing in Odoo.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "CrediMax",
    "kind": "local acquirer",
    "note": "CrediMax has been Bahrain's card issuer and acquirer since 1991 and sells a payment gateway to online merchants who hold a valid CR and domain. Businesses banking with BBK are usually routed here.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "MaxWallet",
    "kind": "mobile wallet",
    "note": "MaxWallet is the CrediMax digital wallet, storing cards for in store QR and online payment plus cross border remittance. It shows up wherever CrediMax is the acquirer.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "EazyPay",
    "kind": "local acquirer",
    "note": "Eazy Financial Services is licensed and regulated by the Central Bank of Bahrain as a POS and online payment gateway acquirer, and it is the acquirer Tamara signed for Bahrain in 2025. A common choice for Bahraini retail.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Arab Financial Services",
    "kind": "local gateway",
    "note": "AFS is a Bahrain headquartered processor licensed by the Central Bank of Bahrain as an ancillary service provider, and it sells a merchant payment gateway alongside its BPay consumer product. Often the incumbent behind a Bahraini bank's card programme.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "SADAD Bahrain",
    "kind": "local gateway",
    "note": "SADAD has run payment services in Bahrain since 2010 across self service kiosks, POS and online, and is a familiar brand for bill style collections. Worth checking if the buyer already collects through SADAD kiosks.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Payment International Enterprise",
    "kind": "local acquirer",
    "note": "PIE is a Bahraini payment provider covering acquiring, mPOS, kiosks, bill collection and customs payments, and it carries MaxWallet QR on its terminals. Relevant where the buyer needs POS and web on one provider.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Amazon Payment Services",
    "kind": "regional gateway",
    "note": "Amazon Payment Services operates in Bahrain and lists Benefit as a supported local method, so it reaches Bahraini debit cards. Odoo 19 ships the connector, so no module purchase is needed.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Tap Payments",
    "kind": "regional gateway",
    "note": "Tap has a Bahrain operation, supports Benefit directly and processes payouts to Bahraini businesses. Bahraini e-commerce guides name it as the usual developer route to BenefitPay.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "regional gateway",
    "note": "MyFatoorah lists Bahrain among the eight markets it operates in, and it is common with smaller Bahraini sellers who invoice by payment link. A free Odoo 19 connector exists alongside paid ones.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "regional gateway",
    "note": "PayTabs covers Bahrain as one of its Middle East markets and is a normal pick for merchants selling into several Gulf states on one account. Multiple Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "HyperPay",
    "kind": "regional gateway",
    "note": "HyperPay names Bahrain in its MENA coverage and states it settles in local currency through local acquirers there. Comes up when the buyer's main market is Saudi Arabia and Bahrain is the second.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Tamara",
    "kind": "BNPL",
    "note": "Tamara lists Bahrain in its own country switcher and signed EazyPay as its Bahrain acquirer in July 2025, so split payments are available to Bahraini shoppers. Confirm live status with Tamara before promising it at checkout.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Beyon Money",
    "kind": "mobile wallet",
    "note": "Beyon Money is the Batelco fintech wallet with a Visa debit card and open banking links to Bahraini bank accounts, backed by a Central Bank of Bahrain open banking licence. Its business wallet now pays directly to EazyPay POS terminals.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "stc pay Bahrain",
    "kind": "mobile wallet",
    "note": "stc pay runs a Bahrain wallet with a prepaid Mastercard for online and in store payment, and in 2026 wired its onboarding to the national eKey 2.0 digital identity. Relevant for the telco customer base rather than the banked card holder.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Apple Pay",
    "kind": "mobile wallet",
    "note": "Apple Pay launched in Bahrain with NBB, BBK and ila, and Apple's own participating bank list for Bahrain now runs to most local issuers. It is enabled through whichever gateway you pick rather than integrated on its own.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Bahrain's licensed courier list includes local last mile firms that collect on delivery, and COD remains a normal option for first time buyers. In Odoo it means confirming the order unpaid and reconciling against the courier's remittance.",
    "support": "native",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "Bahrain Post",
    "kind": "national post",
    "note": "Bahrain Post is the national postal operator under the Ministry of Transportation and Telecommunications, handling domestic mail and parcels in roughly two to three working days. In October 2025 it launched the country's first electronic parcel locker network with Aramex.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Aramex Bahrain",
    "kind": "domestic express",
    "note": "Aramex Bahrain S.P.C is on the Ministry of Transport licensed operator register for both local and international courier work, and it powers the Bahrain Post parcel locker network. Most Bahraini merchants already hold an Aramex account.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL International (Bahrain) W.L.L. is licensed by the Ministry of Transport as both a local and international operator. Odoo 19 ships a DHL Express connector, so rating and labels work without buying a module, though other DHL divisions are not covered.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "Federal Express Int. Inc appears on the Bahrain Ministry of Transport licensed courier register for local and international work. The Odoo 19 FedEx connector is built in.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "United Parcel Service (Bahrain) W.L.L. is on the Ministry of Transport licensed international operator list. Odoo 19 ships the UPS connector, so outbound international rating needs no purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "SMSA Express",
    "kind": "domestic express",
    "note": "SMSA Express is licensed in Bahrain for both local and international courier work and runs direct operations across the GCC with cash on delivery support. A frequent second carrier for merchants whose main volume is Saudi.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel is licensed in Bahrain as a local and international operator and runs same day and next day delivery for Bahraini e-retailers, with its own crossing at the King Fahad Causeway for Saudi road freight. Useful when stock sits in Dammam or Riyadh.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Posta Plus",
    "kind": "domestic express",
    "note": "Global Courier Services W.L.L, trading as Posta Plus, is licensed in Bahrain for local and international courier work and has an office in Bahrain Garden Plaza. It offers GCC wide cash on delivery and consolidation.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "J&T Express Bahrain",
    "kind": "domestic express",
    "note": "J&T Express Bahrain W.L.L. holds a Ministry of Transport local operator licence. It is one of the newer e-commerce focused entrants competing on domestic parcel price.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Wasel Delivery",
    "kind": "last mile",
    "note": "Wasel Delivery Company W.L.L. is a licensed Bahraini on demand delivery service that picks up and delivers anything across the island with no minimum order. It is the kind of local last mile partner a Bahraini shop uses for same day.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Jahez",
    "kind": "last mile",
    "note": "Jahez International Co. W.L.L. is licensed in Bahrain and runs merchant integration plus last mile logistics beyond food, across Saudi Arabia, Bahrain and Kuwait. Relevant for hyperlocal and quick commerce catalogues.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Ninja",
    "kind": "last mile",
    "note": "Ninja runs a Bahrain operation with 24 hour delivery and is hiring last mile supervisors there. It is the quick commerce option when the customer expects delivery in under an hour.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "OCS Bahrain",
    "kind": "domestic express",
    "note": "Oversea Courier Service (Bah) W.L.L. is licensed in Bahrain for local and international courier work and is a long standing name for document and small parcel traffic. Worth naming because established Bahraini firms still use it.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "LBC Express Bahrain",
    "kind": "domestic express",
    "note": "LBC Express Bahrain W.L.L. is on the Ministry of Transport licensed operator list and serves the large Filipino community for parcels home. It matters for merchants selling into that customer base.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_bh (Bahrain - Accounting, Odoo S.A., ships in Odoo 19 core, auto-installs with Accounting)",
    "l10n_gcc_invoice (Gulf Cooperation Council - Invoice, a dependency of l10n_bh)"
   ],
   "native": [
    "Chart of accounts for Bahrain",
    "Taxes",
    "Two tax report layouts, a full VAT report and a simplified one",
    "Fiscal positions",
    "Bahraini governorates loaded as res.country.state records",
    "Arabic as a secondary language on invoices, credit notes, debit notes, vendor bills and refund bills, via l10n_gcc_invoice"
   ],
   "custom": [
    "Expect less polish than the better-documented localizations. Bahrain has no dedicated fiscal localization page in the Odoo 19 documentation, unlike Oman, Saudi Arabia and the UAE. The module manifest is the only official description of what it does.",
    "Payroll, entirely. There is no Odoo payroll localization for Bahrain. Of the GCC, only the United Arab Emirates and Saudi Arabia are covered. SIO contributions at the Bahraini and expatriate rates, the nationality-driven GCC rule, and the 4.2% / 8.4% expatriate end of service remittance all have to be built or bought.",
    "WPS 2.0 file generation for the LMRA portal. A paid third-party module exists on the apps store, but the Wages Responsible Person workflow, the maker and checker roles, and the non-payment explanation fields are process work around the file, not just a file export.",
    "Domestic Minimum Top-up Tax computation, the 120-day registration, quarterly advance payments and the 15-month return, for in-scope multinational groups.",
    "Bahrainisation quota tracking, and reconciling headcount against the WPS data the LMRA now uses.",
    "Monthly versus quarterly VAT return frequency and the switch between them as turnover crosses BHD 3 million."
   ]
  },
  "openQuestions": 22
 },
 "pakistan": {
  "einvoicing": {
   "scheme": "FBR Digital Invoicing (electronic sales tax invoicing under section 23 of the Sales Tax Act 1990, Chapter XIV of the Sales Tax Rules 2006)",
   "seoToken": "FBR Digital Invoicing",
   "authority": "Federal Board of Revenue (FBR), Inland Revenue. Integration runs through PRAL (Pakistan Revenue Automation Pvt Ltd) or an FBR licensed integrator.",
   "status": "Live and in force for every sales tax registered person. SRO 1413(I)/2025 of 1 August 2025 brought all registered persons into scope on a phased calendar that ran out during 2025, and FBR's Sales Tax General Order 01 of 2026, dated 30 March 2026, restates the obligation as applying to all sales tax registered persons.",
   "appliesTo": "All sales tax registered persons, corporate and non-corporate. Tier-1 retailers carry a separate standing obligation under the proviso to section 23(6) to integrate their retail outlets for real-time reporting of sales.",
   "requirements": [
    "Clearance model, not post-audit reporting. Invoice data goes to FBR's Computerized System in real time and the system returns a unique FBR invoice number before the invoice is issued to the buyer.",
    "JSON payload posted to the FBR / PRAL digital invoicing web API. There is no XML format in this scheme.",
    "Unique FBR invoice number printed on the invoice, in the format XXXXXX-DDMMYYHHMMSS-0001.",
    "Verifiable QR code of 7x7 mm, generated from the unique FBR invoice number and printed on the receipt.",
    "Digital signature created and recorded on the sales tax invoice.",
    "The invoice must also carry the registration number of the electronic invoicing or POS software, and the FBR digital invoicing logo.",
    "Integration through a licensed integrator or PRAL. STGO 01 of 2026 confirms a registered person may engage more than one licensed integrator."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "Federal sales tax on goods is 18%, set by section 3(1) of the Sales Tax Act 1990. Reduced rates and zero rating apply to specified goods.",
    "verified": true
   },
   {
    "claim": "Services are not federal. Each province, plus Islamabad Capital Territory and Azad Jammu and Kashmir, levies its own sales tax on services within its jurisdiction, at rates in the 15% to 16% band. A seller operating across provinces needs a separate registration, rate set and return per authority, which is the single most common reason a stock Odoo tax setup fails here.",
    "verified": true
   },
   {
    "claim": "Monthly sales tax return cycle: Annexure C by the 10th, payment by the 15th, and the return e-filed by the 18th of the month following the tax period.",
    "verified": true
   },
   {
    "claim": "Manufacturers file an annual sales tax return in addition to the monthly one, due 30 September following the financial year. CNG taxpayers file quarterly.",
    "verified": true
   },
   {
    "claim": "Section 153 of the Income Tax Ordinance 2001 makes prescribed persons withhold tax on payments for supplies, services and contracts. Rates for payees not on the Active Taxpayers List are double the ATL rate, so the ERP has to carry ATL status per vendor and pick the rate pair from it.",
    "verified": true
   },
   {
    "claim": "Withholding on IT and IT-enabled services under section 153(1)(b) is 4% for ATL and 8% for non-ATL, per FBR's withholding rate card updated to 30 June 2025 under the Finance Act 2025.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "EOBI old-age benefits contribution is 5% from the employer and 1% from the employee, calculated on the federal minimum wage rather than on actual salary. That fixed base is the detail most generic payroll builds get wrong.",
    "verified": false
   },
   {
    "claim": "Employers with six or more workers must register with the provincial social security institution for the province the employee works in, PESSI in Punjab and SESSI in Sindh. The contribution is employer only.",
    "verified": false
   },
   {
    "claim": "Salary tax withheld by the employer is deposited with FBR within seven days, and a withholding statement is filed quarterly by the 20th after quarter end. The tax year ends 30 June, and annual salary certificates follow it.",
    "verified": false
   },
   {
    "claim": "Odoo has no payroll localization for Pakistan. The Odoo 19 payroll localization list covers Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Turkiye, the UAE and the United States. Pakistan is not on it, so EOBI, provincial social security and the salary tax slabs are a build.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "Sales tax records and documents must be retained six years after the end of the tax period to which they relate, under section 24 of the Sales Tax Act 1990. FBR's own summary page still says five years and is out of date against the Act.",
    "verified": true
   },
   {
    "claim": "There is no SAF-T style audit file. The closest thing is Annexure C of the monthly sales tax return, which is now auto-populated from the electronic invoices cleared through the integrated system, so the invoice data model and the return draw on the same data.",
    "verified": true
   },
   {
    "claim": "Financial statement disclosure is driven by the schedules to the Companies Act 2017, administered by SECP: the Fourth Schedule for listed companies and the Fifth Schedule for non-listed companies, with the applicable reporting framework per class of company set in the Third Schedule. SECP amends these by SRO, so the disclosure set moves.",
    "verified": false
   },
   {
    "claim": "There is no statutory national chart of accounts. Odoo's Pakistan localization ships a basic chart, taxes, a tax report and a withholding tax report, and companies extend it themselves.",
    "verified": false
   }
  ],
  "payments": [
   {
    "name": "Cash on Delivery",
    "kind": "cash on delivery",
    "note": "Most Pakistani online orders are still paid in cash at the door, so the checkout has to place the order without taking money and the courier remits the cash back later. Odoo 19 covers this with its built in Cash on Delivery and Pay on Site setup, but COD surcharges and OTP confirmation need an apps store add on.",
    "support": "native",
    "verified": true
   },
   {
    "name": "JazzCash",
    "kind": "mobile wallet",
    "note": "JazzCash is one of the two wallets most Pakistani shoppers already have on their phone, so leaving it off checkout loses orders. Odoo ships no connector for it, so you buy the Expert IT Solutions module for Odoo 19 that routes JazzCash through the Alfa Payment Gateway redirect.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Easypaisa",
    "kind": "mobile wallet",
    "note": "Easypaisa is the other wallet Pakistani buyers expect to see next to JazzCash at checkout. A search of the Odoo apps store returns no Easypaisa connector at any version, so accepting it inside Odoo means building against the Easypaisa merchant API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Raast P2M",
    "kind": "instant bank transfer",
    "note": "Raast is the State Bank of Pakistan instant rail, and its person to merchant scheme covers QR, online checkout and request to pay with real time settlement straight to the merchant. No Odoo module exposes Raast directly, so you either reach it through a local PSP that has enabled it or build against a bank API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "PayPak",
    "kind": "domestic card scheme",
    "note": "PayPak is Pakistan's own card scheme, run by 1LINK, and a large number of locally issued debit cards carry it instead of Visa or Mastercard. Nothing in Odoo speaks to PayPak on its own, so whether a PayPak card works at your checkout depends entirely on which local acquirer you connect.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Safepay",
    "kind": "local gateway",
    "note": "Safepay is a State Bank regulated Pakistani gateway with a clean checkout that a lot of direct to consumer brands use. MountSol sells an Odoo 19 connector for it on the apps store under the technical name ms_safepay_payment.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayFast Pakistan (GoPayFast)",
    "kind": "local gateway",
    "note": "GoPayFast is the Pakistani PayFast and was the first local gateway to go live with Raast person to merchant. Be careful on the apps store: almost every module named PayFast there is the unrelated South African company, and the one genuine GoPayFast module is published for Odoo 18, so budget a port to 19.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Alfa Payment Gateway (Bank Alfalah)",
    "kind": "local gateway",
    "note": "Bank Alfalah's gateway is a common acquiring choice for Pakistani merchants and takes cards, the Alfa wallet and Bank Alfalah accounts. The Expert IT Solutions module for Odoo 19 wires it up and carries JazzCash in the same redirect with no extra setup.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayPro",
    "kind": "local gateway",
    "note": "PayPro is a Pakistani aggregator merchants use to collect across banks and wallets with automatic reconciliation. The apps store module by EBITDA Solutions targets Odoo 18, so plan a version bump before quoting it for a 19 project.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "1LINK interbank transfer (IBFT)",
    "kind": "instant bank transfer",
    "note": "Bank to bank transfer over the 1LINK switch is how most larger Pakistani B2B invoices actually get settled, well away from any card. Odoo 19's built in wire transfer provider shows your account details at checkout and you match the credit off in Accounting.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Keenu",
    "kind": "local gateway",
    "note": "Keenu is a Pakistani payments brand merchants meet mostly at the counter rather than online. The only Odoo 19 module on the store is Odolution's Keenu payment terminal integration, which drives a card terminal from Point of Sale and does not give you a website checkout.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Odoo 19 ships a Stripe connector, but Stripe's own country list does not include Pakistan, so a Pakistan registered business cannot open an account and switch it on. Any Pakistani project that assumed Stripe needs replanning around Safepay or Bank Alfalah.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "Odoo 19 ships a PayPal connector, but PayPal does not operate in Pakistan, so Pakistani merchants cannot open an account to receive into. Sellers with overseas buyers usually work around this with Payoneer rather than a PayPal button.",
    "support": "native",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "PostEx",
    "kind": "domestic express",
    "note": "PostEx is built around cash on delivery ecommerce in Pakistan and advances the cash back to merchants, which is why online sellers pick it over a traditional courier. Odolution sells a PostEx API connector for Odoo 19 on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "TCS",
    "kind": "domestic express",
    "note": "TCS is the courier name Pakistani customers recognise on a tracking page, and it covers domestic parcels plus outbound international. Odolution publishes a TCS Courier module for Odoo 19 that handles the booking side from the delivery order.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Leopards Courier (LCS)",
    "kind": "domestic express",
    "note": "Leopards has one of the widest domestic pickup and delivery footprints in Pakistan and handles cash on delivery for online sellers. There is an Odoo 19 module on the apps store with auto booking, label printing and tracking.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "M&P (Muller and Phipps)",
    "kind": "domestic express",
    "note": "M&P is the usual choice for heavier or bulkier Pakistani parcels and for merchants who want a cheaper alternative to TCS. No Odoo connector exists on the apps store at any version, so booking stays manual unless you build against their API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Trax (SLG Trax)",
    "kind": "last mile",
    "note": "E-commerce focused warehousing and last mile in Pakistan with cash on delivery settlement. trax.pk now redirects to slgtrax.com, so the business has moved under the SLG brand: confirm the contracting entity before integrating.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Daewoo Express",
    "kind": "domestic express",
    "note": "Daewoo moves parcels along its intercity coach network and is common for city to city shipments inside Pakistan. It is one of the five couriers covered by the Multi Courier CN module for Odoo 19, which prints and cancels consignment notes from the sale order.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "ZoomCOD",
    "kind": "last mile",
    "note": "ZoomCOD is a Pakistani delivery service built specifically around cash on delivery orders. The same Multi Courier CN module for Odoo 19 generates and cancels its consignment notes without leaving the sale order.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Pakistan Post",
    "kind": "national post",
    "note": "Pakistan Post reaches rural and remote addresses that the private couriers either skip or surcharge heavily. A search of the apps store returns nothing for Pakistan Post, so any Odoo integration is a custom build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bykea",
    "kind": "last mile",
    "note": "Bykea does same day intracity delivery on motorcycles in Karachi, Lahore and Islamabad, which suits food, pharmacy and quick commerce sellers. There is no Odoo connector, so orders go out through Bykea's own merchant tools or a custom build.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express is the default for Pakistani exporters sending documents and samples abroad. Odoo 19 ships the DHL Express connector, and you set your region and DHL product on the delivery method once your DHL developer credentials are in.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx is the other outbound international option Pakistani exporters use. Odoo does ship a FedEx connector, but Odoo's own documentation says new setups on the latest API have been blocked since 21 October 2025 and that legacy integrations stopped working on 1 June 2026, so confirm the current state before promising it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS runs shipping and tracking for both domestic and international deliveries out of Pakistan. The UPS connector ships with Odoo 19, so rates and labels come back onto the delivery order once the account is linked.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "global express",
    "note": "Aramex covers the Pakistan to Gulf lanes that Pakistani sellers ship most often. Odoo has no native Aramex carrier, but there are several Odoo 19 connectors on the apps store from different vendors.",
    "support": "third_party_paid",
    "verified": false
   }
  ],
  "odoo": {
   "modules": [
    "l10n_pk (Pakistan - Accounting)"
   ],
   "native": [
    "Basic Pakistani chart of accounts",
    "Sales tax taxes",
    "Tax report",
    "Withholding tax report",
    "PKR currency and standard Odoo accounting on top"
   ],
   "custom": [
    "Unique FBR invoice number, the 7x7 mm QR code, the digital signature, the software registration number on the invoice layout, and the 72-hour edit window with Commissioner approval after that.",
    "Provincial sales tax on services. Separate registration, rate set and return per provincial authority, and the input tax split between the federal and provincial regimes.",
    "Section 153 withholding driven by vendor ATL status, with the ATL and non-ATL rate pair per payment type, plus the quarterly withholding statement.",
    "Sales tax return annexures and the STR-7 output.",
    "Payroll. There is no Pakistan payroll localization, so EOBI, provincial social security and salary tax slabs are all custom."
   ]
  },
  "openQuestions": 20
 },
 "india": {
  "einvoicing": {
   "scheme": "GST e-invoicing (e-invoice under rule 48(4) of the CGST Rules), with the e-way bill as a separate mandate for movement of goods",
   "seoToken": "GST e-Invoicing",
   "authority": "Goods and Services Tax Network and the Invoice Registration Portals, principally the NIC portal, under the Central Board of Indirect Taxes and Customs",
   "status": "Fully live and stable. The threshold has sat at INR 50 million aggregate annual turnover since 1 August 2023 and has not moved since.",
   "appliesTo": "Registered persons whose aggregate annual turnover exceeded INR 50 million in any financial year from 2017-18 onwards, for B2B supplies, exports, credit notes and debit notes. B2C invoices are outside e-invoicing.",
   "requirements": [
    "Clearance model. The invoice JSON is sent to an Invoice Registration Portal, which validates it and returns an Invoice Reference Number and a digitally signed QR code. The document is not a valid tax invoice without them.",
    "The IRN and the signed QR code must be carried on the invoice issued to the buyer.",
    "Registration with an IRP and API credentials, normally obtained through a GST Suvidha Provider. Odoo's own integration uses BVM IT Consulting Services India as the GSP.",
    "A separate e-way bill for movement of goods, generated against the NIC e-way bill portal, with its own document and validity rules.",
    "A reporting window. Invoices, credit notes and debit notes older than 30 days are rejected by the IRP for larger taxpayers, so back-dated posting has to be blocked inside the ERP rather than discovered at submission.",
    "Cancellation is time-boxed at the IRP, so credit notes rather than cancellations become the normal correction path."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "GST is the indirect tax. Since 22 September 2025 the structure is essentially two slabs, 5% and 18%, with 18% as the standard rate. The 12% and 28% slabs were removed and a 40% demerit rate now applies to a defined list of luxury and sin supplies.",
    "verified": true
   },
   {
    "claim": "The change was given effect by notifications 9/2025 to 17/2025 Central Tax (Rate) and the matching Integrated Tax (Rate) notifications, all dated 17 September 2025 and effective 22 September 2025. Compensation cess on motor vehicles and caffeinated beverages was reduced to nil at the same time.",
    "verified": true
   },
   {
    "claim": "Filing runs on GSTR-1 for outward supplies and GSTR-3B to discharge the liability, with GSTR-2B as the input credit statement. Odoo's Indian accounting reports module produces GSTR-1, GSTR-2B and GSTR-3B.",
    "verified": true
   },
   {
    "claim": "From 1 October 2025 any GST return whose due date is more than three years old is permanently barred from filing. It covers GSTR-1, GSTR-1A, GSTR-3B, GSTR-4 through GSTR-8 and GSTR-9/9C, under the Finance Act 2023 and notification 28/2023 Central Tax. Old open periods can no longer be cleaned up after go-live.",
    "verified": false
   },
   {
    "claim": "TCS on sale of goods under section 206C(1H) was omitted with effect from 1 April 2025. TDS on purchase of goods under section 194Q, at 0.1%, still applies on the buyer side. An ERP still configured to collect 206C(1H) is now producing wrong documents.",
    "verified": false
   },
   {
    "claim": "The equalisation levy on online advertising and digital advertising space was abolished with effect from 1 April 2025.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Provident fund is 12% from the employee and 12% from the employer. Of the employer share, an amount equal to 8.33% of salary goes to the pension fund, on salary capped at INR 15,000 a month. It applies to establishments with 20 or more employees.",
    "verified": true
   },
   {
    "claim": "Employees State Insurance is a separate statutory contribution requiring an employer code and IP numbers. Professional tax is a state-level deduction with a registration number per state, and the Labour Welfare Fund needs an establishment number. Odoo's Indian payroll localization handles all four.",
    "verified": true
   },
   {
    "claim": "The four Labour Codes came into force on 21 November 2025 and the final Central Rules were notified on 8 May 2026. The codes are the Code on Wages 2019, the Code on Social Security 2020, the Occupational Safety, Health and Working Conditions Code 2020, and the Industrial Relations Code 2020. States are still notifying their own rules, so the operative position differs by state.",
    "verified": true
   },
   {
    "claim": "Two Labour Code changes land directly in payroll: fixed-term employees become eligible for gratuity after one year of service, and gig and platform workers get social security coverage through a government registration portal, with a 90-day engagement test per aggregator.",
    "verified": true
   },
   {
    "claim": "The Central Rules fix minimum wages on a daily basis, with a stated conversion to hourly and to a 26-day month, and overtime at twice the ordinary rate. Any payroll build that assumes a 30-day divisor should be checked against this.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "Every company registered under the Companies Act 2013 must keep its books in accounting software that records an audit trail and edit log for every transaction, under rule 3(1) of the Companies (Accounts) Rules 2014, effective from 1 April 2023. It covers small companies, one person companies, dormant companies, Section 8 not-for-profits and foreign companies. LLPs, partnerships and proprietorships are outside it.",
    "verified": true
   },
   {
    "claim": "The audit trail must stay enabled and cannot be switched off. The statutory auditor reports on it under rule 11(g) of the Companies (Audit and Auditors) Rules 2014, covering whether the feature ran all year, whether it was tampered with, and whether the trail was preserved. Records are held eight years under section 128(5) of the Companies Act 2013.",
    "verified": true
   },
   {
    "claim": "Odoo's Indian localization carries GSTIN verification of partners, TDS and TCS threshold alerts with account suggestions, and the ability to fetch vendor e-invoices already filed on the GST portal. That covers most of the routine statutory bookkeeping load.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "UPI",
    "kind": "instant bank transfer",
    "note": "UPI is how most Indian shoppers now pay online, by scanning a QR or approving a collect request in PhonePe, Google Pay or Paytm. In Odoo 19 you switch UPI on as a payment method inside the native Razorpay or PayU provider, so no extra module is needed once you hold that acquirer account.",
    "support": "native",
    "verified": true
   },
   {
    "name": "RuPay",
    "kind": "domestic card scheme",
    "note": "RuPay is India's domestic card network and a large share of Indian debit cards are issued on it rather than Visa or Mastercard. It is accepted through the native Razorpay and PayU providers in Odoo 19, so it needs no connector of its own.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Razorpay",
    "kind": "local gateway",
    "note": "Razorpay is the usual first choice for an Indian Odoo project because Odoo ships the connector and one account covers cards, UPI, net banking and EMI. Two things to plan for: recurring payments have to be enabled by Razorpay support on request, and transactions left uncaptured for more than five days are voided automatically.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayU",
    "kind": "local gateway",
    "note": "PayU is the second Indian acquirer Odoo ships natively, and Odoo's documentation describes it plainly as covering India. Worth adding as a fallback provider so one gateway outage does not take the whole checkout down.",
    "support": "native",
    "verified": true
   },
   {
    "name": "CCAvenue",
    "kind": "local gateway",
    "note": "CCAvenue is a long established Indian gateway that many older merchants are already contracted with and do not want to leave. Odoo's own India entity publishes a free Payment Provider: CCAvenue module for Odoo 19 on the apps store, and several paid alternatives exist including an HDFC branded build.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Paytm",
    "kind": "mobile wallet",
    "note": "Paytm is both a wallet Indian buyers keep topped up and one of the main UPI apps, so shoppers look for the name at checkout. Odoo IN Pvt Ltd publishes a free Payment Provider: Paytm module for Odoo 19.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "PhonePe",
    "kind": "mobile wallet",
    "note": "PhonePe is one of the UPI apps Indian shoppers pay from most, and it also sells a merchant payment gateway. There is a free Payment Provider: PhonePe module for Odoo 19 from Odoo IN Pvt Ltd plus a second free one from Silver Touch, and several paid builds.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Cashfree Payments",
    "kind": "local gateway",
    "note": "Cashfree is an RBI authorised Indian payment aggregator commonly used by mid sized online sellers for collections and payouts. Odoo IN Pvt Ltd publishes a free Payment Provider: CashFree module for Odoo 19.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "BillDesk",
    "kind": "local gateway",
    "note": "BillDesk is the rail behind a lot of Indian bill and bank led payment flows, which matters for utilities, insurance and education sellers. Odoo IN Pvt Ltd publishes a free Payment Provider: BillDesk module for Odoo 19.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Easebuzz",
    "kind": "local gateway",
    "note": "Easebuzz is an Indian gateway popular with SMEs and education and services businesses that want fast onboarding. Odoo IN Pvt Ltd publishes a free Payment Provider: Easebuzz module for Odoo 19.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Pine Labs",
    "kind": "local gateway",
    "note": "Pine Labs is the card terminal and now online payments provider a lot of Indian retail chains already run in store, so keeping one provider across shop and website is attractive. Odoo IN Pvt Ltd publishes a free Payment Provider: Pinelabs module for Odoo 19.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "HDFC Bank payment gateway",
    "kind": "local gateway",
    "note": "Indian companies that already bank with HDFC often want acquiring on the same relationship rather than opening a separate aggregator account. Odoo IN Pvt Ltd publishes a free Payment Provider: HDFC module for Odoo 19, and CandidRoot sells an HDFC build on CCAvenue.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Net banking",
    "kind": "instant bank transfer",
    "note": "Net banking is still how many Indian buyers pay for higher value baskets, choosing their bank and finishing in the bank's own screen. It arrives as a payment method inside the native Razorpay or PayU provider in Odoo 19, with a long list of banks behind it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "NEFT, IMPS and RTGS bank transfer",
    "kind": "bank transfer",
    "note": "Indian B2B invoices are overwhelmingly settled by direct bank transfer rather than card, often against a proforma. Odoo 19's built in wire transfer provider prints your account and IFSC details on the order and you reconcile the credit in Accounting.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Cash on Delivery",
    "kind": "cash on delivery",
    "note": "Cash on delivery is still a large part of Indian ecommerce, especially outside the metros, and it changes the order flow because the order confirms with no payment taken. Odoo 19 supports this natively, and paid apps store modules add COD charges, OTP confirmation and pincode limits.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "Adyen was authorised by the Reserve Bank of India as an online payment aggregator for domestic and cross border payments, so it can take INR, UPI, RuPay and global cards on one platform. Adyen ships as a native payment provider in Odoo 19, which suits an Indian arm of an international group already on Adyen elsewhere.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Odoo 19 ships a Stripe connector, but Stripe's own country page still lists India as Preview and it has been invite only for Indian businesses since May 2024, so signup is by sales contact and approval is not guaranteed. Treat Razorpay or PayU as the realistic default and Stripe as a maybe.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal shut its domestic India payments business on 1 April 2021 and now handles only cross border, so an Indian merchant cannot use it to collect from Indian customers. The native Odoo 19 PayPal connector is still worth having if you export, but not as your India checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "EMI and Pay Later",
    "kind": "BNPL",
    "note": "Card EMI and pay later options carry real basket share on higher value Indian purchases and buyers look for them on the product page, not just at checkout. They come through the native Razorpay provider in Odoo 19 as part of its payment method list, so no separate BNPL connector is needed.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Shiprocket",
    "kind": "aggregator",
    "note": "Shiprocket is the aggregator most Indian online sellers actually book through, and it is one of the few carriers Odoo ships a connector for out of the box. Odoo's docs describe it as an Indian service connecting to multiple carriers, shipping to over 220 countries, with courier priority you set yourself.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Delhivery",
    "kind": "domestic express",
    "note": "Delhivery is the largest home grown Indian parcel network and is one of the carriers sitting behind Shiprocket. You can reach it two ways: through the native Shiprocket connector, where the Shiprocket account and its fees are a required dependency, or with a direct Delhivery API module for Odoo 19 from BROWSEINFO or Vraja.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Blue Dart",
    "kind": "domestic express",
    "note": "Blue Dart is the premium domestic air express name Indian buyers trust for time sensitive parcels, and it is named in Odoo's own list of carriers reached through Shiprocket. Four separate direct Blue Dart connectors are sold for Odoo 19 on the apps store if you want to book on your own account instead.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DTDC",
    "kind": "domestic express",
    "note": "DTDC has deep franchise coverage into smaller Indian towns and is listed by Odoo as one of the carriers behind Shiprocket. Vraja Technologies also sells a direct DTDC connector for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Xpressbees",
    "kind": "domestic express",
    "note": "Xpressbees is a high volume ecommerce parcel carrier and is one of the couriers Odoo names as reachable through Shiprocket. Otopylot sells a direct Xpressbees module for Odoo 19 with rates, labels and webhook tracking.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "India Post (Speed Post)",
    "kind": "national post",
    "note": "India Post reaches pincodes the private carriers will not serve, which matters for tier 3 and rural orders. There is no direct India Post connector on the apps store, so in Odoo you reach it through the native Shiprocket connector, and the Shiprocket account and its fees are a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Shadowfax",
    "kind": "last mile",
    "note": "Shadowfax handles same day and next day last mile work for Indian sellers in the bigger cities. An apps store search returns no Shadowfax module at all, so inside Odoo it is reached through an aggregator account rather than directly.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express is the standard route out of India for exporters and for anyone shipping samples abroad. Odoo 19 ships the DHL Express connector, and you set region and DHL product on the delivery method after adding your DHL developer credentials.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx is widely used for Indian export shipments and inbound spares. Odoo ships a FedEx connector, but Odoo's docs warn that new setups on the latest API have been blocked since 21 October 2025 and legacy integrations stopped on 1 June 2026, and they suggest Sendcloud as a workaround, so verify before committing.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS runs domestic and international shipping and tracking in India. The UPS connector ships with Odoo 19, so once the account is linked you get rates and labels on the delivery order without buying a module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "global express",
    "note": "Aramex is a common choice for India to Gulf and Middle East lanes. Odoo has no native Aramex carrier, but there are around ten Odoo 19 connectors on the apps store from different vendors at a wide range of prices.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "AfterShip",
    "kind": "aggregator",
    "note": "AfterShip covers a long tail of Indian carriers in one place, including Delhivery, DTDC, Blue Dart, India Post, Xpressbees and Ecom Express. Odoo does not ship it, so you buy Webkul's Odoo 19 module, and any carrier reached this way depends on an AfterShip account and its fees.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Gati",
    "kind": "domestic express",
    "note": "Gati is built for heavy and B2B cargo across India and handles both full truckload and less than truckload, with reach into the Northeast and Jammu and Kashmir. No Gati module exists on the apps store, so an Odoo integration is a custom build.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Safexpress",
    "kind": "domestic express",
    "note": "Safexpress is the surface express network Indian manufacturers and distributors use for pallet and part load B2B freight. An apps store search for Safexpress returns nothing, so booking from Odoo means a custom build against their API.",
    "support": "custom_build",
    "verified": false
   }
  ],
  "odoo": {
   "modules": [
    "l10n_in (Indian - Accounting)",
    "l10n_in_reports (Indian - Accounting Reports)",
    "l10n_in_edi (Indian E-invoicing)",
    "l10n_in_ewaybill (Indian E-waybill)",
    "l10n_in_ewaybill_stock (Indian E-waybill Stock)",
    "l10n_in_hr_payroll (India - Payroll)",
    "l10n_in_hr_payroll_account (India - Payroll with Accounting)",
    "l10n_in_hr_holidays (India - Time Off)"
   ],
   "native": [
    "Indian chart of accounts and the GST tax structure",
    "GSTR-1, GSTR-2B and GSTR-3B reporting",
    "E-invoicing against the NIC IRP: IRN and QR generation, submission, and cancellation handling",
    "E-way bill generation against the NIC portal from sales and purchase documents, and from receipts and delivery orders in Inventory",
    "GSTIN verification of business partners",
    "TDS and TCS threshold alerts with account suggestions"
   ],
   "custom": [
    "GSP credentials and commercials. The e-invoicing and e-way bill integrations run through a GST Suvidha Provider, currently BVM IT Consulting Services India, so credential setup and the GSP relationship are a project task, not a config switch.",
    "The 30-day IRN reporting bar. Odoo will let you post a back-dated invoice that the IRP then refuses. Add the control, or you find out at submission.",
    "Annual returns. The localization documents GSTR-1, GSTR-2B and GSTR-3B. GSTR-9 and GSTR-9C are not among them.",
    "High-volume GSTR-2B matching and reconciliation against the Invoice Management System. Workable in Odoo at small scale, usually an add-on or an external tool above that.",
    "The rule 11(g) audit trail position. Odoo logs changes, but what the statutory auditor will accept as evidence of an always-on, untampered trail has to be agreed and demonstrated before go-live. This is the question Indian finance directors ask first.",
    "Labour Code follow-through. The Central Rules were notified in May 2026 and states are still notifying theirs, so the wage definition, the 26-day divisor and gratuity for fixed-term staff will need revisiting per state."
   ]
  },
  "openQuestions": 21
 },
 "bangladesh": {
  "einvoicing": {
   "scheme": "No national e-invoicing scheme. The live obligations are the Mushak 6.3 VAT challan (মূসক ৬.৩) and, in named sectors, EFD/SDC point-of-sale reporting",
   "authority": "National Board of Revenue (NBR), জাতীয় রাজস্ব বোর্ড",
   "status": "As of 22 August 2026 Bangladesh has no clearance or reporting e-invoicing mandate. A VAT-registered seller issues a Mushak 6.3 challan on paper or from its own software, and the only real-time reporting to NBR runs through EFD/SDC hardware in sectors NBR has named one by one.",
   "appliesTo": "Every VAT-registered business must issue Mushak 6.3 for taxable supplies. EFD/SDC installation is imposed sector by sector, most recently on VAT-eligible hotels and restaurants located on highways, announced by NBR in early March 2025.",
   "requirements": [
    "Mushak 6.3 challan showing buyer and seller details, description, quantity, unit price, total value and VAT.",
    "No XML or JSON schema, no digital signature or seal, no clearance step, no accredited intermediary, no NBR-assigned document ID.",
    "EFD/SDC devices in mandated sectors push point-of-sale data to NBR. This is device-level reporting, not ERP-to-authority integration, so an Odoo build does not replace the device.",
    "Mushak 9.1 VAT return is filed through the NBR VAT online portal. PwC states manual return filing is completely dispensed with from 1 July 2026.",
    "An NBR reform panel recommended e-invoicing for VAT in February 2025. Nothing has been enacted, so treat any e-invoicing roadmap as unfunded planning."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "The standard VAT rate is 15%. Reduced rates of 1.5%, 2%, 2.4%, 4.5%, 5%, 7.5% and 10% apply to specified goods and services under the Second Schedule of the VAT and SD Act 2012.",
    "verified": true
   },
   {
    "claim": "Supplementary Duty applies to Third Schedule goods and services from 10% to 67%, and in certain cases up to 500%. It is payable only at the first stage of supply, which means the ERP has to model it separately from VAT rather than as another tax line on every sale.",
    "verified": true
   },
   {
    "claim": "The VAT return is Mushak 9.1, filed monthly and due within 15 days of the end of the tax period. Government, semi-government and autonomous bodies, banks, insurers and anyone filing a nil return get up to 20 days.",
    "verified": false
   },
   {
    "claim": "Manual VAT return filing is completely dispensed with from 1 July 2026. Returns go through the NBR VAT online portal.",
    "verified": true
   },
   {
    "claim": "VAT deducted at source applies. Specified withholding entities deduct VAT on certain service procurements at 2% to 15% depending on the service. This has to be posted against the supplier bill, not netted off later.",
    "verified": true
   },
   {
    "claim": "Income tax withholding on local payments hits most supplier bills: 5% on manufacturing, process, conversion, construction and engineering work. Withholding on supplies of goods is not a single rate, it runs from 0.5% to 10% depending on the goods, so it has to be mapped per product category.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "There is no general contributory state social insurance for private sector employees. Employees, including foreign nationals, contribute 7% to 8% of salary to a provident fund and the employer matches it.",
    "verified": true
   },
   {
    "claim": "Gratuity is payable on termination of employment, so the payroll model needs an accrual, not just a period cost.",
    "verified": true
   },
   {
    "claim": "Companies in scope must pay 5% of net profit into the worker funds under section 232 of the Bangladesh Labour Act 2006, split 80:10:10 between the Workers Profit Participation Fund, the Welfare Fund and the Bangladesh Workers Welfare Foundation Fund. A company is in scope if it has paid-up capital of Taka 1 crore or permanent assets of Taka 2 crore on the last day of its accounting year. The contribution is due within nine months of the year end.",
    "verified": false
   },
   {
    "claim": "Employers deduct income tax at source from salaries under the NBR slab rates and report it through the quarterly withholding return, so payroll and the withholding return have to reconcile.",
    "verified": false
   }
  ],
  "accounting": [
   {
    "claim": "Companies whose securities trade in a public market, and other large publicly accountable entities, must use IFRS as adopted in Bangladesh, issued locally as Bangladesh Financial Reporting Standards (BFRS). The Financial Reporting Act 2015 gives the Financial Reporting Council the power to set and issue those standards in conformity with IASB standards.",
    "verified": true
   },
   {
    "claim": "Audit reports signed by ICAB practising members carry a Document Verification Code, a unique code issued by ICAB's Document Verification System that lets a regulator check the report online. BSEC-listed companies, microfinance institutions, NGOs taking donor funding and companies seeking investment registration all need DVC-carrying reports.",
    "verified": false
   },
   {
    "claim": "Odoo's Bangladesh localization ships a chart of accounts, taxes and a tax report only. There is no Mushak register, no Mushak 9.1 report and no audit file export in the official module.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "bKash",
    "kind": "mobile wallet",
    "note": "bKash is a Bangladesh Bank licensed mobile financial service operated by bKash Ltd, and it is the wallet most online shoppers already hold. A Bangladeshi Odoo webshop that cannot take bKash is missing the default way people pay online here.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Nagad",
    "kind": "mobile wallet",
    "note": "Nagad runs under the Bangladesh Post Office with interim Bangladesh Bank approval and sits next to bKash on almost every local checkout page. Buyers expect to see both names or they abandon the cart.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Rocket (Dutch-Bangla Bank)",
    "kind": "mobile wallet",
    "note": "Rocket is Dutch-Bangla Bank's licensed mobile financial service and the oldest MFS brand in the country. Every major Bangladeshi gateway carries it, so it appears in the wallet list customers scan before paying.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Upay (UCB Fintech)",
    "kind": "mobile wallet",
    "note": "Upay is UCB Fintech Company Ltd's licensed mobile wallet and is listed by SSLCommerz, aamarPay and shurjoPay. Naming it tells a Bangladeshi buyer you know the wallet list beyond the two biggest brands.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "tap (Trust Axiata Pay)",
    "kind": "mobile wallet",
    "note": "tap is Trust Axiata Digital Ltd's Bangladesh Bank licensed wallet and is offered by both aamarPay and shurjoPay at checkout. It matters to buyers banking with Trust Bank and to corporate disbursement flows.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Islami Bank mCash",
    "kind": "mobile wallet",
    "note": "mCash is Islami Bank Bangladesh Ltd's licensed mobile wallet and is carried by shurjoPay. It matters for buyers who bank on Islamic terms and will not use a conventional card.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Pathao Pay",
    "kind": "mobile wallet",
    "note": "Pathao Pay is the wallet from the company that also runs Pathao Courier, and both SSLCommerz and shurjoPay list it. Merchants who already ship with Pathao often want the wallet on the same checkout.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "SSLCommerz",
    "kind": "local gateway",
    "note": "SSLCommerz holds a Bangladesh Bank Payment System Operator licence and puts cards, ten mobile wallet brands, internet banking and bank EMI behind one integration. For most Bangladeshi Odoo webshops this is the single connection that covers the whole local wallet list.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "aamarPay",
    "kind": "local gateway",
    "note": "aamarPay is operated by Soft Tech Innovation Ltd under a Bangladesh Bank PSO licence and accepts Visa, Mastercard, UnionPay, Qcash, Nexus, bKash, Rocket, Nagad, tap, Upay, SureCash and OK Wallet. It is a common lower cost alternative to SSLCommerz for SMEs.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "shurjoPay",
    "kind": "local gateway",
    "note": "shurjoPay is run by shurjoMukhi and says it was the first company to receive a Bangladesh Bank PSO licence, in 2016. It carries eighteen or more channels including bKash, Nagad, Rocket, Upay, tap, mCash, Pathao Pay and bank EMI across 36 partner banks.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Cash on delivery is still a normal way to buy online in Bangladesh and every domestic courier collects it, with Pathao, Steadfast and RedX all publishing COD terms. It changes the Odoo configuration because the money arrives from the courier settlement, not from the checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "TakaPay (National Card Scheme)",
    "kind": "domestic card scheme",
    "note": "TakaPay is Bangladesh Bank's own card scheme, routed through the National Payment Switch Bangladesh and issued by local banks for ATM, POS and QR use. Odoo has no TakaPay integration of any kind, so a merchant who needs it is looking at custom work.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "NPSB domestic cards (Nexus, Q-Cash)",
    "kind": "domestic card scheme",
    "note": "The National Payment Switch Bangladesh links the banks for ATM, POS and internet banking transfers, and locally issued Nexus and Q-Cash cards ride on it. SSLCommerz and aamarPay both accept Nexus and Q-Cash, so these cards reach an Odoo checkout through a gateway rather than directly.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Bank transfer via BEFTN and BD-RTGS",
    "kind": "domestic bank transfer",
    "note": "BEFTN handles interbank electronic transfers and BD-RTGS settles larger amounts in real time, and both are how B2B invoices actually get paid in Bangladesh. Odoo's built in Wire Transfer provider shows the account details and reference, then you confirm the payment manually once the funds land.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Bank card EMI (instalments)",
    "kind": "installments",
    "note": "Card holders in Bangladesh routinely split larger purchases into monthly instalments through their issuing bank, and SSLCommerz offers this across 30 or more banks while shurjoPay covers 36. For electronics, furniture and appliance sellers this is what closes the higher value orders.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe's own country list does not include Bangladesh, so a Bangladeshi company cannot open a Stripe account even though Odoo ships the Stripe connector. Budget for SSLCommerz, aamarPay or shurjoPay instead of assuming the default option works.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Pathao Courier",
    "kind": "domestic express",
    "note": "Pathao Courier delivers to all 64 districts with full home delivery and settles cash on delivery back to the merchant, and it says it serves over 200,000 businesses. It is one of the three couriers a Bangladeshi online seller is most likely to already be using.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Steadfast Courier",
    "kind": "domestic express",
    "note": "Steadfast covers all 64 districts, 495 upazilas and 330 or more municipal areas, collects cash on delivery and offers a merchant API. Store connectors reach it through a paid multi carrier Bangladesh module, so that module is a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "RedX",
    "kind": "domestic express",
    "note": "RedX reaches all 64 districts and 490 or more upazilas with 24 hour delivery inside Dhaka, and it is integrated with Daraz. Odoo reaches it through the same paid multi carrier Bangladesh connector that covers Steadfast and Pathao.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "eCourier",
    "kind": "domestic express",
    "note": "eCourier has run tech enabled last mile delivery since 2014, covers all 64 districts and settles cash on delivery with OTP verification at handover. It also sells warehousing and fulfilment, which suits an Odoo merchant outsourcing the whole outbound flow.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Sundarban Courier Service",
    "kind": "domestic express",
    "note": "Sundarban runs one of the largest branch and agent networks in Bangladesh and reaches small towns and villages that the app based couriers do not cover well. Nothing exists for Odoo, so a merchant relying on rural reach needs a build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "SA Paribahan",
    "kind": "domestic express",
    "note": "SA Paribahan is one of the oldest private parcel networks in Bangladesh, carries heavy and bulky items and offers conditional cash on delivery. It is the usual answer when a shipment is too big for the e-commerce couriers.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Bangladesh Post Office and EMS",
    "kind": "national post",
    "note": "Bangladesh Post Office is the national operator under the Posts and Telecommunications Division, and its EMS product handles express domestic and international parcels. It is the cheapest route for low value international shipments out of Bangladesh.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express has operated in Bangladesh since 1979 and runs service points and service centres in Dhaka and Chittagong with customs brokerage included. Odoo 19 ships the DHL Express connector, so rates and labels work out of the box once you have an account number.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx serves Bangladesh with international express and handles customs brokerage on those shipments. Odoo 19 ships the FedEx connector, which is the usual outbound choice for a Bangladeshi exporter or garment supplier.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS runs international express and freight into and out of Bangladesh with customs brokerage on express shipments. Odoo 19 ships the UPS connector, so it is a drop in third option beside DHL and FedEx for cross border work.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Delivery Tiger",
    "kind": "domestic express",
    "note": "Delivery Tiger covers all 64 districts and 490 or more upazilas, does same day inside Dhaka and takes heavy items that the lighter parcel couriers refuse. There is no Odoo connector for it.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Karatoa Courier Service",
    "kind": "domestic express",
    "note": "Karatoa runs 130 or more branches across all 64 districts and is strong in northern Bangladesh where the Dhaka centred couriers thin out. Nothing exists for Odoo, so it would be a build.",
    "support": "custom_build",
    "verified": false
   }
  ],
  "odoo": {
   "modules": [
    "l10n_bd (Bangladesh - Accounting, Odoo S.A., LGPL-3, auto-installed with the Accounting app)"
   ],
   "native": [
    "Bangladesh chart of accounts",
    "Bangladesh taxes",
    "A Bangladesh tax report"
   ],
   "custom": [
    "Mushak 6.3 challan layout, numbering and the 6.1 and 6.2 registers. Third-party paid modules exist for Odoo 19 but nothing official.",
    "Mushak 9.1 VAT return preparation and the online portal submission.",
    "VAT deducted at source on supplier bills, and income tax withholding at the many rates that hit purchases.",
    "EFD/SDC device integration for mandated retail and hospitality sectors.",
    "Payroll in full: provident fund, gratuity accrual, WPPF, NBR income tax slabs and the quarterly withholding return.",
    "bKash, Nagad, SSLCOMMERZ and aamarPay payment acceptance."
   ]
  },
  "openQuestions": 18
 },
 "egypt": {
  "einvoicing": {
   "scheme": "منظومة الفاتورة الإلكترونية and منظومة الإيصال الإلكتروني, the Egyptian e-invoice system and e-receipt system",
   "seoToken": "ETA",
   "authority": "Egyptian Tax Authority (مصلحة الضرائب المصرية), ETA",
   "status": "Egypt runs a clearance model: a B2B or B2G invoice is submitted to the ETA portal and validated before it counts as a valid invoice. B2C is a separate e-receipt system that is still being switched on wave by wave, so two different builds are in play.",
   "appliesTo": "All companies registered for VAT selling taxable goods or services have had to issue e-invoices for B2B since April 2023, and a paper invoice issued after that date cannot support an input VAT deduction. The B2C e-receipt obligation is phased. The most recent wave confirmed by a Big Four or specialist source is the eighth sub-phase of stage two, under ETA Decision No. 281 of 2025, covering taxpayers named in the annex who are registered at the Sixth District and Fifth Settlement tax offices in Cairo, effective 15 September 2025.",
   "requirements": [
    "Documents generated as XML or JSON in the ETA schema.",
    "A CAdES-BES electronic signature applied with an eSeal certificate held on an HSM or a USB token, over a canonicalised serialisation of the document so formatting differences do not break the signature.",
    "A UUID assigned by the ETA, which credit notes and debit notes must reference back to.",
    "Real-time submission to the ETA portal and validation before delivery to the buyer. This is clearance, not post-audit reporting.",
    "ETA product coding on every line, plus an ETA activity code and branch ID on the issuing journal.",
    "Five-year archiving. Archiving abroad is permitted."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "The standard VAT rate is 14% and applies to all goods and services, with limited exceptions. Machinery and equipment carry 5%.",
    "verified": true
   },
   {
    "claim": "VAT returns are filed monthly and must be submitted within one month following the end of the reporting period. Payment falls due at the same time as the return.",
    "verified": true
   },
   {
    "claim": "Withholding tax applies to local payments above EGP 300: 1.0% on contracting and supplying, 3.0% on all types of services and 5.0% on commissions. These are advance corporate tax payments, not an extra cost, so the ERP must track them as recoverable against the CIT liability.",
    "verified": true
   },
   {
    "claim": "Payments to non-residents carry 20% withholding on royalties and on service payments. Dividends to non-resident corporate shareholders are 10% for unlisted shares and 5% for shares listed on the EGX, before treaty relief.",
    "verified": true
   },
   {
    "claim": "The corporate income tax return is due within four months of the financial year end.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Social insurance is charged on the social insurance salary at 18.75% for the employer and 11% for the employee.",
    "verified": true
   },
   {
    "claim": "The insurable wage band effective 1 January 2026 runs from EGP 2,700 to EGP 16,700 per month. The cap is reset annually, so payroll needs the band as a dated parameter, not a hard-coded number.",
    "verified": true
   },
   {
    "claim": "Health insurance subscription is charged at 4% employer and 1% employee for basic cover, on top of social insurance.",
    "verified": true
   },
   {
    "claim": "Labour Law No. 14 of 2025 took effect on 1 September 2025, with labour dispute provisions from 1 October 2025.",
    "verified": true
   },
   {
    "claim": "Under Labour Law No. 14 of 2025 employers must grant an annual salary increment of at least 3% of the social insured salary, with temporary exemptions available for eligible employers. That is a recurring payroll rule, not a one-off.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "Egypt has not adopted IFRS. Financial statements follow Egyptian Accounting Standards (EAS). Each standard or change is made by ministerial decree and published in the Egyptian Gazette, developed by a standard setting committee chaired by the chairman of the Financial Regulatory Authority.",
    "verified": true
   },
   {
    "claim": "EAS is close to IFRS but not identical and not as complete. Two differences bite in an ERP: employees' profit sharing is recognised as an equity distribution rather than an expense in profit or loss, and a different model applies to the effect of currency devaluation. EAS also does not allow some IFRS options, including presenting a single statement of comprehensive income.",
    "verified": true
   },
   {
    "claim": "The practical consequence for an Odoo build is that the default IFRS-shaped profit and loss and the employee profit share posting both need reworking. Odoo's l10n_eg gives a chart of accounts and taxes, not an EAS-compliant presentation.",
    "verified": false
   }
  ],
  "payments": [
   {
    "name": "Paymob",
    "kind": "local gateway",
    "note": "Paymob is an Egypt based payment service provider and it is one of the few local gateways Odoo ships in the box. The Odoo 19 module is scoped to Egypt with EGP, and it is the fastest route to a working Egyptian checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Meeza",
    "kind": "domestic card scheme",
    "note": "Meeza is Egypt's national card scheme, regulated by the Central Bank of Egypt and issued through the Egyptian Banks Company, and it is the card many financial inclusion and payroll customers hold. Odoo 19 ships Meeza as a card brand and PayTabs and Paymob both accept it, so it shows on the checkout as a real logo rather than a generic card box.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Mobile wallets (Vodafone Cash, Orange Cash, e& Cash, WE Pay)",
    "kind": "mobile wallet",
    "note": "Telco mobile wallets licensed by the Central Bank of Egypt are how a very large group of Egyptians pay without a card. Odoo 19 ships a Mobile Wallets Egypt payment method restricted to Egypt and EGP, and Paymob maps its wallet gateway straight onto it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Fawry",
    "kind": "local gateway",
    "note": "Fawry lets an Egyptian customer order online and then pay cash at a corner shop, pharmacy, kiosk, ATM or post office, and it runs a very large acceptance network across the country. For any merchant selling outside Cairo it is often the difference between an order and an abandoned cart.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "InstaPay (Instant Payment Network)",
    "kind": "instant bank transfer",
    "note": "InstaPay is the Central Bank of Egypt's instant rail, operated by the Egyptian Banks Company, moving money between bank accounts, wallets and cards using a mobile number or Instant Payment Address. Egyptians now treat it as the default way to send money, so buyers ask for it by name even though no Odoo connector exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Cash on delivery",
    "kind": "cash on delivery",
    "note": "Cash on delivery is still a large part of Egyptian e-commerce and every domestic courier here, Bosta, Mylerz, Aramex and ShipBlu included, is built around collecting and remitting it. It changes the Odoo setup because reconciliation happens against courier settlement files, not against the checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "valU",
    "kind": "BNPL",
    "note": "valU is an Egyptian instalment platform listed on the Egyptian Exchange and it appears at checkout across local retail. Odoo 19 ships a valU payment method locked to Egypt and EGP, and Paymob and PayTabs both route it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Sympl",
    "kind": "BNPL",
    "note": "Sympl is an Egyptian buy now pay later provider aimed at younger shoppers who do not hold a credit card. Odoo 19 ships a Sympl payment method restricted to Egypt and EGP and Paymob carries it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Halan (MNT-Halan)",
    "kind": "BNPL",
    "note": "MNT-Halan is one of Egypt's larger fintech lenders and its Halan instalment option turns up on local checkouts. Odoo 19 ships a Halan payment method scoped to Egypt and EGP and Paymob maps a dedicated Halan gateway to it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Souhoola",
    "kind": "BNPL",
    "note": "Souhoola is an Egyptian consumer instalment provider used for mid and high ticket retail purchases. Odoo 19 ships a Souhoola payment method restricted to Egypt and EGP and Paymob routes it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Contact",
    "kind": "BNPL",
    "note": "Contact is a long established Egyptian consumer finance name and its instalment plans are what many buyers reach for on furniture, appliances and electronics. Odoo 19 ships a Contact payment method locked to Egypt and EGP and Paymob carries it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Forsa",
    "kind": "BNPL",
    "note": "Forsa is an Egyptian buy now pay later provider offered through local gateways. Odoo 19 ships a Forsa payment method restricted to Egypt and EGP and Paymob maps it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Aman",
    "kind": "BNPL",
    "note": "Aman is an Egyptian payments and consumer finance brand offering both cash collection and instalments. Odoo 19 ships an Aman payment method scoped to Egypt and EGP and Paymob routes it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Premium Card",
    "kind": "installments",
    "note": "Premium Card is an Egyptian instalment card used for retail purchases spread over months. Odoo 19 ships a Premium Card payment method restricted to Egypt and EGP and Paymob carries it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Kiosk cash payment (Aman and Masary terminals)",
    "kind": "cash on delivery",
    "note": "Kiosk payment lets a customer place an order online and hand cash to an Aman or Masary terminal in their neighbourhood, which is how unbanked buyers pay for online orders. Odoo 19 ships a Kiosk payment method locked to Egypt and EGP and Paymob maps its cash aggregator gateway to it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Bank instalments (EMI)",
    "kind": "installments",
    "note": "Egyptian banks let card holders convert a purchase into monthly instalments at checkout, which is standard for higher value baskets. Odoo 19 ships a Bank Installments payment method restricted to Egypt and EGP, so it can be shown as its own option rather than hidden behind the card button.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "local gateway",
    "note": "PayTabs lists Egypt as a supported market with dedicated Arabic and English pages, and its Egyptian acceptance includes Visa, Mastercard, Meeza and valU. It is a common second gateway for merchants who also sell into Saudi Arabia, the UAE or Jordan.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Amazon Payment Services",
    "kind": "regional gateway",
    "note": "Amazon Payment Services is a MENA acquirer that names Egypt among the nine countries it serves, and Odoo 19 ships its connector. It suits an Egyptian merchant who also needs one contract across Gulf markets.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Wire transfer",
    "kind": "domestic bank transfer",
    "note": "Bank transfer is how Egyptian B2B invoices are usually settled, and with InstaPay behind it the money often arrives the same day. Odoo's built in Wire Transfer provider shows the account details and reference and you confirm the payment once the funds land.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe's own country list does not include Egypt, so an Egyptian company cannot open a Stripe account even though Odoo ships the Stripe connector. The good news is that Odoo ships Paymob instead, which is built for this market.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Bosta",
    "kind": "domestic express",
    "note": "Bosta runs over 50 hubs across Egypt, moved 37 million parcels in 2025 and opened a large automated sorting facility in Cairo in January 2026. It handles cash on delivery, returns and fulfilment, which is the full package an Egyptian online seller needs.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Mylerz",
    "kind": "domestic express",
    "note": "Mylerz is an Egyptian last mile and fulfilment operator offering cash on delivery, warehousing and merchant APIs across several countries. It is one of the names that shows up on every serious Egyptian e-commerce shortlist.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "regional express",
    "note": "Aramex is one of the main courier and parcel operators in Egypt and offers cash on delivery and returns for business customers. It is the usual pick when a merchant needs one carrier covering both Egypt and the Gulf.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Egypt Post",
    "kind": "national post",
    "note": "Egypt Post is the national postal operator with 4,238 post offices, and it runs EMS express plus an EasyBox product aimed at online merchants. Its branch density reaches places the private couriers price badly.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "ShipBlu",
    "kind": "last mile",
    "note": "ShipBlu does next day and same day delivery in Cairo, Giza and Alexandria, handles cash on delivery and returns, and publishes integrations for Shopify, WooCommerce and Magento. There is no Odoo connector, so it is an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "J&T Express Egypt",
    "kind": "domestic express",
    "note": "J&T Express runs a network in Egypt as part of its Middle East operation and is used by high volume sellers. There is a paid Odoo 19 connector for it, so it does not need a custom build.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Egypt Express (EGXPRESS)",
    "kind": "domestic express",
    "note": "Egypt Express runs domestic express with same day and next day options, cash on delivery, station to station service and its own cargo operation at Cairo International Airport. It also does customs clearance and freight forwarding for merchants importing stock.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Flextock",
    "kind": "aggregator",
    "note": "Flextock offers fulfilment plus a last mile aggregation layer called Flexship that dispatches across several Egyptian couriers from one account. Treat the Flextock account and its fees as a required dependency, because Odoo would integrate with Flextock and not with the couriers behind it.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL is one of the main international operators in the Egyptian courier and parcel market and handles customs on outbound shipments. Odoo 19 ships the DHL Express connector, so rating and labels work once you have an account number.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx is named among the major operators in the Egyptian courier and parcel market and is a standard outbound choice for exporters. Odoo 19 ships the FedEx connector.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS operates in the Egyptian courier and parcel market and covers international express and freight. Odoo 19 ships the UPS connector, so it is a drop in third option beside DHL and FedEx.",
    "support": "native",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_eg (Egypt - Accounting)",
    "l10n_eg_edi_eta (Egyptian E-invoice Integration)"
   ],
   "native": [
    "Egyptian chart of accounts and taxes through l10n_eg",
    "ETA e-invoice submission from a sales journal, with ETA activity code and branch ID set per journal",
    "ETA codes on customers and products",
    "ETA portal API credentials, Client ID and Client Secret 1 and 2, registered against your Odoo system",
    "USB key signing routed through the Windows virtual IoT, which generates the access token between the signing device and a cloud-hosted database"
   ],
   "custom": [
    "B2C e-receipts. The official modules cover invoices, not the e-receipt system. Point of sale e-receipt submission is a paid third-party app or a build, which is why several ETA e-receipt POS apps exist on the store.",
    "Signing infrastructure. Every person who signs needs a specific USB key obtained from the ETA or Egypt Trust, and a cloud database needs a Windows virtual IoT box in the loop. That is a hosting and operations design decision, not a configuration setting.",
    "EAS presentation. Employee profit share as an equity distribution, no single statement of comprehensive income, and the EAS foreign currency model all differ from Odoo's default IFRS-shaped reports.",
    "Arabic invoice and report layouts.",
    "Local withholding tax at 1%, 3% and 5% on supplier payments above EGP 300, tracked as advance corporate tax.",
    "Payroll. There is no official Egyptian payroll localization: social insurance at 18.75% and 11% within the annual wage band, health insurance, the Labour Law 14 of 2025 3% annual increment and training fund contribution, and salary tax all need building or buying."
   ]
  },
  "openQuestions": 21
 },
 "jordan": {
  "einvoicing": {
   "scheme": "JoFotara, the National Electronic Invoicing System (نظام الفوترة الوطني)",
   "seoToken": "JoFotara",
   "authority": "Income and Sales Tax Department (ISTD), Ministry of Finance, delivered with the Ministry of Digital Economy and Entrepreneurship",
   "status": "Phase 2 has been live since 1 April 2025 and covers B2B, B2C and B2G. As of August 2026 ISTD is still pulling smaller taxpayers in, and an invoice that did not go through JoFotara is not accepted as a deductible expense.",
   "appliesTo": "Taxpayers issuing invoices in Jordan. No sector or entity-type exemption has been published. The commercial trigger is simpler than the legal one: your customer cannot deduct the cost if the invoice did not clear JoFotara, so they will refuse it.",
   "requirements": [
    "Invoices are submitted to ISTD through the JoFotara API and the returned status comes back into Odoo. Build it as a clearance flow, not a periodic report file.",
    "UBL 2.1 XML as the invoice payload.",
    "ISTD returns a QR code that must be printed on the document the customer receives.",
    "Per-taxpayer API credentials from the JoFotara portal: Client ID, Secret Key and Activity Number.",
    "Taxpayer type must be set on the company: unregistered, registered under standard sales tax, or registered under special sales tax.",
    "Negative quantities and negative unit prices are rejected. Global or document-level discounts have to be re-expressed as a percentage on each line.",
    "Company name in the ERP must match the ISTD registration, invoice currency must be JOD, and customer country plus Tax ID are mandatory fields."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "General Sales Tax (GST) is the indirect tax. The standard rate is 16%.",
    "verified": true
   },
   {
    "claim": "Zero rating applies to exports of goods and services outside Jordan, to free zone areas and markets, to the Aqaba Special Economic Zone and to development areas. That is a fiscal position and tax-mapping job in Odoo, not a rate change.",
    "verified": true
   },
   {
    "claim": "A 5% withholding tax applies to services supplied by resident natural persons and civil companies, including doctors, lawyers, engineers, auditors, consultants, insurance agents, brokers, arbitrators, financial intermediaries and shipping agents. Non-resident service providers are withheld at 10% plus national contribution tax.",
    "verified": true
   },
   {
    "claim": "Interest and commissions paid by banks carry 5% withholding for individuals and 7% for legal entities, treated as a final tax for non-residents.",
    "verified": true
   },
   {
    "claim": "The corporate income tax return is due before the end of the fourth month following the end of the tax period, with the balance payable on the same date. Businesses with gross income above JOD 1 million make an advance payment of 40% of accrued income tax within 30 days of the fiscal half-year end. Late payment runs at 0.4% per week.",
    "verified": true
   },
   {
    "claim": "GST returns are filed every two months, due within one month of the end of the period.",
    "verified": false
   }
  ],
  "payroll": [
   {
    "claim": "Social Security Corporation contributions are levied on monthly salaries and certain allowances: 14.25% employer and 7.5% employee.",
    "verified": true
   },
   {
    "claim": "Odoo's Jordan payroll localization computes progressive income tax with exemptions for residents, non-residents, blind employees and dependants, social security on both sides, housing and transport allowances, leave logic, overtime and end of service benefit.",
    "verified": true
   },
   {
    "claim": "The 2026 SSC contribution ceiling is JOD 3,349 per month, and employers in high-risk occupations pay an extra 1% on top of the standard 14.25%.",
    "verified": false
   }
  ],
  "accounting": [
   {
    "claim": "Odoo's l10n_jo module ships a Jordanian chart of accounts, taxes, a tax report and fiscal positions, so the ledger structure is not a from-scratch build.",
    "verified": true
   },
   {
    "claim": "Tax audits usually happen within a year of filing, and an auditor may not audit a return more than four years after the filing date. Keep four years of supporting detail queryable in the system.",
    "verified": true
   },
   {
    "claim": "Returns are submitted through the tax authority's online portal rather than on paper.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Cash on Delivery",
    "kind": "cash on delivery",
    "note": "Paying the driver in cash is still the normal way to buy online in Jordan, and a checkout that only takes cards loses orders. Odoo 19 ships Cash on Delivery as an in person payment option, so the work is in reconciling what the courier hands back rather than in building anything.",
    "support": "native",
    "verified": true
   },
   {
    "name": "eFAWATEERcom",
    "kind": "instant bank transfer",
    "note": "Jordan's national bill presentment and payment system, owned by JoPACC, supervised by the Central Bank of Jordan and operated by MadfooatCom. A merchant with a biller code gets paid from inside any Jordanian bank app or wallet with no card involved. Odoo has no connector for it, so it is an API build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "CliQ",
    "kind": "instant bank transfer",
    "note": "Jordan's real time payment system, run by JoPACC, moving money 24/7 between every participating bank and mobile wallet using an alias such as a phone number or username instead of an IBAN. It supports person to merchant and QR payments, which is why Jordanian buyers ask for it at checkout. No Odoo connector exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "JoMoPay",
    "kind": "mobile wallet",
    "note": "The national mobile payment switch that makes every licensed Jordanian wallet interoperable with every bank account, upgraded to ISO 20022 so it settles instantly with CliQ. You do not integrate JoMoPay directly, you integrate a wallet that sits on it, but it is the reason wallet money reaches your bank account.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Zain Cash",
    "kind": "mobile wallet",
    "note": "One of the largest licensed mobile wallets in Jordan, run by Zain, used for person to person transfers, bill payment, merchant payment and QR acceptance, and reachable from CliQ. Odoo has no module for it, so accepting it means building against the wallet's merchant API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Orange Money Jordan",
    "kind": "mobile wallet",
    "note": "Orange Jordan's licensed wallet with a wide agent network for cash in and cash out, used for transfers, bills and merchant payment. It matters for customers who are paid in cash and top up a wallet rather than hold a card. There is no Odoo connector.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "UWallet",
    "kind": "mobile wallet",
    "note": "One of the eight licensed mobile payment providers in Jordan and one of the first to run on the upgraded JoMoPay release, so it settles instantly against banks and CliQ. Customers expect to see it alongside Zain Cash and Orange Money. No Odoo module exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Dinarak",
    "kind": "mobile wallet",
    "note": "A Jordanian mobile wallet licensed by the Central Bank of Jordan and running on JoMoPay, covering deposits, withdrawals, transfers, bill payment and e-commerce and point of sale purchases without a card. It reaches customers who have a phone but no bank account. No Odoo module exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "MEPS (Middle East Payment Services)",
    "kind": "local gateway",
    "note": "A Central Bank of Jordan licensed processor that supplies the e-commerce gateway, merchant acquiring, POS estate and the National Wallet for much of the Jordanian market, and has added Mastercard Click to Pay for its online merchants. Many Jordanian businesses are already on MEPS through their bank. Odoo has no MEPS connector, so it is a build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Network International Jordan (N-Genius)",
    "kind": "local gateway",
    "note": "Network International runs merchant acquiring, POS terminals and an e-commerce gateway across Jordan, and it is the acquirer Valu plugged into for BNPL at Jordanian merchants. There is a free N-Genius payment provider module on the Odoo 19 apps store, so this is one of the shorter integration paths in the market.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "HyperPay",
    "kind": "local gateway",
    "note": "HyperPay has an Amman office and settles Jordanian merchants in local currency through local acquirers, including a tie up with Capital Bank Jordan. Paid Odoo 19 connectors for HyperPay are on the apps store, so a Jordanian store can go live on cards without a bespoke build.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayTabs",
    "kind": "local gateway",
    "note": "A regional gateway with a Jordan offering, listed alongside MyFatoorah, Tap and HyperPay as the usual choices for a Jordanian online store. Several paid PayTabs connectors exist for Odoo 19, so the integration is off the shelf rather than custom.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MyFatoorah",
    "kind": "local gateway",
    "note": "MyFatoorah supports Jordan and settles in Jordanian dinar, and it is one of the gateways Jordanian merchants are routinely pointed at. There is a free MyFatoorah module from Cybrosys for Odoo 19 as well as several paid ones, so cost of integration is low.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Telr",
    "kind": "local gateway",
    "note": "Telr publishes Jordan specific pricing and onboards Jordanian merchants against a trade licence, taking Visa, Mastercard, American Express and Apple Pay. Paid Telr connectors are on the Odoo 19 apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Valu Jordan",
    "kind": "BNPL",
    "note": "Valu began operating in Jordan on 1 May 2026 under a specialised finance licence from the Central Bank of Jordan, and it reaches shoppers through Network International's merchant network in store and online. It is the clearest licensed instalment option in the market right now. There is no Odoo connector, so it is reached through the acquirer or built.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Visa, Mastercard and American Express",
    "kind": "domestic card scheme",
    "note": "Card acceptance in Jordan runs on Visa and Mastercard, with American Express far less common, acquired locally by banks and processors such as MEPS and Network International. Odoo does not talk to a card scheme directly, it talks to whichever gateway you sign with, so the gateway choice is the real decision.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Bank transfer (wire transfer)",
    "kind": "instant bank transfer",
    "note": "Jordanian B2B buyers often settle by bank transfer against an invoice rather than by card. Odoo 19 ships a Wire Transfer provider that shows your account details and a payment reference and waits for you to confirm receipt, so this works on day one with no integration.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal works in Jordan for sending, receiving and withdrawing, and Jordanian banks such as Cairo Amman Bank support the withdrawal leg, but PayPal's own country feature table puts Jordan in the group with no currency conversion, so it runs in US dollars rather than Jordanian dinar. Odoo 19 ships PayPal, so the connector is free, but check the currency before you promise dinar settlement.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe (not available in Jordan)",
    "kind": "global gateway",
    "note": "Odoo 19 ships a Stripe connector, but Stripe's own list of supported business locations does not include Jordan, so a company registered in Jordan cannot open a Stripe account to use it. Plan the build around a local acquirer instead of assuming the native connector solves it.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Jordan Post Company",
    "kind": "national post",
    "note": "The government owned national postal operator, running the domestic mail and parcel network across all twelve governorates plus EMS express and international parcels through the UPU network. It is the cheapest route to addresses the private couriers price up. Odoo has no Jordan Post connector, so rates and labels are manual or a build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Aramex",
    "kind": "domestic express",
    "note": "Founded in Amman in 1982 and still running a Jordanian operation covering domestic and international express, freight forwarding, warehousing and Shop and Ship. It is the default carrier most Jordanian online sellers already have an account with. Odoo does not ship an Aramex connector, but there are many paid Aramex modules for Odoo 19 covering rates, labels and tracking.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express runs a country office in Amman with its own Jordan rate guide and MyDHL booking, and it is the usual choice for outbound documents and urgent parcels. Odoo 19 ships a DHL Express connector, so live rates and labels work out of the box once you have an account number.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS serves Jordan through an authorised service contractor in Amman and publishes a Jordan site for quotes, tracking and pickups. Odoo 19 ships a UPS connector, so it is one of the few carriers a Jordanian merchant can wire up with no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Spex",
    "kind": "last mile",
    "note": "A Jordanian logistics company founded in 2015 and headquartered in Amman, doing last mile delivery for e-commerce, cash on delivery collection with remittance back to the merchant, and fulfilment. It is the kind of local partner that makes COD workable. There is no Odoo module, so the integration is a build against their API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Hala Delivery",
    "kind": "last mile",
    "note": "A Jordanian courier aimed at online sellers and small brands, with its own driver network and mobile apps for tracking deliveries inside the Kingdom. Useful as a second local carrier when Aramex pricing does not fit small parcels. No Odoo connector exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "iMile",
    "kind": "last mile",
    "note": "An e-commerce focused courier covering the GCC and Jordan, built around cash on delivery with OTP verification at the door and weekly COD remittance to the merchant's bank account. There is a paid iMile shipping module for Odoo 19, so it does not need a bespoke build. Confirm Jordan coverage on your own account before you commit.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Right Way Logistics",
    "kind": "freight forwarding",
    "note": "An Amman based freight forwarder handling air, sea and land freight, express door to door and customs clearance, with its own branches in Turkey, Iraq, Syria and Palestine. Relevant to Jordanian importers and distributors running purchasing in Odoo rather than to a small parcel shop. No Odoo connector.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Naqel Express",
    "kind": "domestic express",
    "note": "Naqel states it operates in Jordan alongside Saudi Arabia, the UAE, Bahrain, Oman, Egypt, Kuwait, Qatar, Lebanon, Morocco, Iraq and Turkey. Regional express with no native Odoo connector.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "International express out of Jordan. One of the few carriers with a connector shipped in Odoo 19, so rates, labels and tracking work without buying a module.",
    "support": "native",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_jo (Jordan - Accounting)",
    "l10n_jo_edi (Jordan E-Invoicing)",
    "l10n_jo_hr_payroll (Jordan - Payroll)",
    "l10n_jo_hr_payroll_account"
   ],
   "native": [
    "Jordanian chart of accounts, taxes, tax report and fiscal positions.",
    "JoFotara integration: compliant e-invoice generation, real-time submission for validation, and invoice status tracking inside Odoo.",
    "JoFotara credential and taxpayer-type configuration on the company record (Activity Number, Secret Key, Client ID; unregistered, registered standard, or registered special sales tax).",
    "Payroll: progressive income tax brackets with resident, non-resident, blind employee and dependant exemptions; employee and employer social security; housing and transport allowances; leave logic; overtime; end of service benefit.",
    "Payroll journal entries into the ledger through l10n_jo_hr_payroll_account."
   ],
   "custom": [
    "Discount policy. JoFotara rejects negative quantities and negative prices, so any global discount, rebate or promotion has to be redesigned as a per-line percentage. This bites hardest on distribution and retail clients and it is a pricing and process change, not a config toggle.",
    "Rounding tolerance between Odoo's 3 decimals and ISTD's 9. Agree the acceptable difference (under 0.001) with the client's auditor before go-live rather than after the first rejection.",
    "eFAWATEERcom, CliQ and MEPS acquiring have no Odoo module. Collection and bank reconciliation against those rails is a build.",
    "Aramex and any domestic last-mile courier need a paid third-party connector or a custom one. Nothing for Jordan ships in the box.",
    "Check that the l10n_jo tax report actually maps onto the ISTD GST return form and period before promising a one-click filing pack.",
    "Arabic invoice layouts and any bilingual print requirement are presentation work on top of the localization."
   ]
  },
  "openQuestions": 29
 },
 "turkey": {
  "einvoicing": {
   "scheme": "e-Fatura (e-Invoice) and e-Arşiv (e-Archive), part of GİB's e-Belge (e-Document) family",
   "seoToken": "e-Fatura",
   "authority": "Gelir İdaresi Başkanlığı (GİB), the Turkish Revenue Administration",
   "status": "Turkiye has run mandatory e-invoicing for years and the threshold rolls forward every year. Taxpayers with 2025 gross sales of TRY 3 million or more were required to be on e-Fatura by 1 July 2026, a deadline that has now passed. The rule is standing rather than one-off, so the next annual transition date applies to whoever crosses the threshold next.",
   "appliesTo": "Taxpayers above the gross sales thresholds plus named sectors including fuel and e-commerce. The split matters more than the threshold: e-Fatura applies when both parties are registered in the system, and everything else goes out as e-Arşiv. In practice a Turkish company of any size issues no paper invoices.",
   "requirements": [
    "Centralised continuous transaction control. e-Fatura documents route through GİB infrastructure, either the GİB portal or a licensed özel entegratör (private integrator). This is not a file you drop on a portal once a month.",
    "UBL-TR 2.1 XML.",
    "Mandatory electronic signature. Companies sign with a mali mühür (financial seal) certificate; documents from New Generation payment recording devices (YN ÖKC) are signed with the device's fiscal certificate.",
    "e-Arşiv covers everything outside the e-Fatura mailbox system, including B2C and export, and is reported to GİB rather than exchanged.",
    "Archiving: 5 years under tax law and 10 years under commercial law. Archiving outside Türkiye is not permitted, which constrains where the database and its attachments can be hosted.",
    "The same family includes e-İrsaliye (dispatch note), e-SMM (professional fee receipt), e-Müstahsil Makbuzu, e-Bilet and e-Defter for ledgers. Scope each one separately.",
    "GİB moved to the New Central Application on 14 December 2024, so any pre-2025 integration notes are out of date."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT (KDV) is the indirect tax. The standard rate is 20%. Reduced rates are 10% for List No. II items such as basic foodstuffs, textiles and books, and 1% for List No. I items such as raw cotton and dried hazelnuts.",
    "verified": true
   },
   {
    "claim": "VAT returns are filed monthly with the relevant tax office.",
    "verified": true
   },
   {
    "claim": "Stamp tax applies to documents at rates between 0.189% and 0.948%. Salary payments are taxed at 0.759% of the gross amount, which is why it shows up in payroll runs and not just in contract admin.",
    "verified": true
   },
   {
    "claim": "The corporate income tax return is due on the 30th day of the fourth month following the fiscal year end, 30 April for calendar-year filers, with payment on the same date. Advance corporate tax is quarterly, due on the 17th day of the second month following each quarter.",
    "verified": true
   },
   {
    "claim": "Returns stay open to inspection until the end of a five-year statute of limitations. Companies may have returns certified by a Sworn Fiscal Advisor; uncertified companies are prioritised for inspection.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "Social security is administered by SGK. As of 1 January 2026 the employee pays 14% social security plus 1% unemployment insurance. Contributions are calculated on monthly earnings between TRY 33,030.00 and a ceiling of TRY 297,270.00.",
    "verified": true
   },
   {
    "claim": "The employer pays 20.75% social security plus 2% unemployment insurance, with reductions available in some cases (16.75% under certain conditions, 5% for manufacturing). The state adds 1% to unemployment insurance.",
    "verified": false
   },
   {
    "claim": "Stamp tax of 0.759% is withheld on gross salary payments, so payroll has three statutory deductions to model, not two: income tax, social security and stamp tax.",
    "verified": true
   },
   {
    "claim": "Severance (kıdem tazminatı) is 30 days of the employee's last gross pay for each full year of service, payable once the employee has at least one full year of uninterrupted service, and capped by a statutory ceiling. Contract clauses that reduce or waive it are void.",
    "verified": false
   },
   {
    "claim": "Foreign nationals covered by their home country's social security can be exempt from Turkish contributions for up to three months, longer under a bilateral treaty. Anyone without foreign cover pays in full.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "e-Defter is GİB's electronic ledger system. It covers the yevmiye defteri (journal), büyük defter (general ledger) and envanter defteri (inventory ledger). Ledger files and their berat files are uploaded to GİB, either monthly or per provisional tax period, and GİB has extended deadlines by circular more than once.",
    "verified": true
   },
   {
    "claim": "Odoo ships the Turkish chart of accounts, taxes, financial reports and fiscal positions in l10n_tr, with Türkiye-specific tax and profit and loss reporting in l10n_tr_reports.",
    "verified": true
   },
   {
    "claim": "Books and records must stay retrievable for 5 years under tax law and 10 years under commercial law, and cannot be archived outside Türkiye.",
    "verified": true
   },
   {
    "claim": "The Tekdüzen Hesap Planı (Uniform Chart of Accounts) is the standard account structure used across Turkish businesses. The Public Oversight Authority (KGK) put a separate chart of accounts aligned to financial reporting standards into force on 30 July 2024, sitting alongside it.",
    "verified": false
   }
  ],
  "payments": [
   {
    "name": "Troy",
    "kind": "domestic card scheme",
    "note": "Turkey's own card scheme, run by BKM, with contactless cards, QR and its GO Secure Pay flow for online purchases. Turkish shoppers carry Troy cards issued by state banks and expect them to work at checkout. Odoo does not talk to Troy directly, you accept it through a Turkish acquirer such as iyzico or PayTR.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "iyzico",
    "kind": "local gateway",
    "note": "The gateway most Turkish online stores start with, owned by PayU since 2019 and itself the buyer of Paynet in February 2025. Odoo 19 ships an iyzico payment provider and describes it as covering Turkey, so this is the shortest path to live card payments in Turkish lira.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayTR",
    "kind": "local gateway",
    "note": "A Turkish payment and electronic money institution licensed under Law 6493 and regulated by the Central Bank of Turkey, with over 200,000 merchants, card acceptance, bank transfer collection, payment links, operator billing and wallet infrastructure. There is a free PayTR iFrame payment provider module for Odoo 19 as well as paid ones.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Craftgate",
    "kind": "local gateway",
    "note": "A Turkish payment orchestration platform operating since 2018 that routes one integration across many bank virtual POS accounts, handles instalments and adds Apple Pay and Google Pay. It suits merchants who need more than one acquirer. A paid Craftgate payment provider module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sipay",
    "kind": "local gateway",
    "note": "A Turkish online payment provider operating since 2018, aimed at smaller merchants, covering virtual POS, instalments, stored cards and recurring payments. A paid Sipay payment provider module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Param",
    "kind": "local gateway",
    "note": "A Turkish licensed electronic money and payment institution offering virtual POS, wallet and card issuing, used by merchants who want a single provider for collection and payout. It is bundled with PayTR and iyzico in a paid Turkish virtual POS module for Odoo 19.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Moka United",
    "kind": "local gateway",
    "note": "A licensed Turkish electronic money and payment institution formed by merging Moka, previously an Is Bankasi subsidiary, with OYAK's United Payment. It offers virtual POS, physical and soft POS, payment links, wallets and card programmes. No Odoo 19 module was found, so this is a build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Card instalments (taksit)",
    "kind": "card installments",
    "note": "Splitting a card payment over several monthly instalments is normal in Turkey, and shoppers compare stores by how many instalments each offers on which bank programme. Turkish gateways carry the bank instalment tables for Bonus, World, Maximum, Axess, CardFinans, Paraf, Advantage, Bankkart and Saglam Kart. Odoo core has no instalment concept at checkout, so it comes from the gateway module you install, not from Odoo.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "FAST (Fonlarin Anlik ve Surekli Transferi)",
    "kind": "instant bank transfer",
    "note": "The Central Bank of Turkey's instant payment system, moving money between banks in seconds around the clock including weekends, with Kolay Adres letting a customer pay a phone number, national ID, tax ID or email instead of an IBAN. Odoo has no FAST connector, so reconciliation is manual or a build against your bank.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Havale and EFT (bank transfer)",
    "kind": "instant bank transfer",
    "note": "Bank transfer is a real share of Turkish online payments, especially for larger baskets and B2B, and it runs over the Central Bank's EFT system with FAST behind the instant leg. Odoo 19 ships a Wire Transfer provider that displays your account details and a reference and waits for you to confirm receipt, so it works with no integration.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Hepsipay",
    "kind": "BNPL",
    "note": "Hepsiburada's payment arm, regulated in Turkey, offering one click checkout with stored cards, a shopping credit that acts as buy now pay later, and instalments across a partner network of more than 300 brands. Turkish shoppers already hold a Hepsipay balance. There is no Odoo connector, so it is a build or an acquirer route.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Paycell",
    "kind": "mobile wallet",
    "note": "Turkcell's payment arm, launched in 2016, combining a wallet, a prepaid card, QR payment and direct carrier billing so a customer can charge a purchase to their next Turkcell bill without a bank card. Merchants integrate its SDK. No Odoo module exists.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "ininal",
    "kind": "mobile wallet",
    "note": "A Turkish prepaid card and electronic money institution licensed by the Central Bank of Turkey, letting people shop online without a bank account by loading the card at ATMs, PTT branches, shops or by transfer. It also does QR payments and virtual cards. No Odoo module exists.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Cash on delivery (kapida odeme)",
    "kind": "cash on delivery",
    "note": "Turkish cargo companies including Yurtici Kargo and Aras Kargo run collect on delivery services, so a merchant can offer pay at the door even though most Turkish e-commerce is paid by card. Odoo 19 ships Cash on Delivery as an in person payment option, so the setup is configuration plus reconciling what the carrier remits.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Visa and Mastercard",
    "kind": "domestic card scheme",
    "note": "Visa and Mastercard sit alongside Troy on Turkish cards and carry the bulk of online card payments. Odoo does not connect to a scheme, it connects to the Turkish acquirer or virtual POS you contract with, so the gateway choice decides what you can accept and on what instalment terms.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Stripe (not available in Turkey)",
    "kind": "global gateway",
    "note": "Odoo 19 ships a Stripe connector, but Stripe's own list of supported business locations does not include Turkiye, so a Turkish registered company cannot open a Stripe account to use it. Treat any blog claiming a Turkish Stripe launch with caution and plan on iyzico or PayTR instead.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal (not available in Turkey)",
    "kind": "global gateway",
    "note": "PayPal's own Turkish page states it stopped operating in Turkey in June 2016, and that customers there cannot send or receive money, access accounts or withdraw to a linked bank account. Odoo 19 ships a PayPal connector, but a Turkish merchant cannot use it for domestic collection.",
    "support": "native",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "PTT Kargo",
    "kind": "national post",
    "note": "Posta ve Telgraf Teskilati is Turkey's national postal operator, owned by the Turkey Wealth Fund, and its branch and post office network reaches rural addresses the private carriers price up. It also runs the PttAVM marketplace. Odoo does not ship a PTT connector, but paid PTT Kargo modules exist for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Yurtici Kargo",
    "kind": "domestic express",
    "note": "Founded in 1982 and part of Arikanli Holding, with the largest private branch and agency network in Turkey, plus e-commerce tracking, easy returns and a collect on delivery service. It is the carrier most Turkish stores default to. Odoo does not ship it, but a paid Yurtici Kargo module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Aras Kargo",
    "kind": "domestic express",
    "note": "A national Turkish parcel carrier doing 24 to 48 hour domestic delivery, cash on delivery, reverse logistics and address or time changes after dispatch, with integration and routing tools for corporate senders. A paid Aras Kargo module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MNG Kargo",
    "kind": "domestic express",
    "note": "A leading Turkish parcel carrier delivering to around 600,000 addresses a day, fully acquired by DHL Group in October 2023 and now run inside DHL eCommerce. Useful when you want a domestic network with a global parent behind it. A paid MNG Kargo module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Surat Kargo",
    "kind": "domestic express",
    "note": "A Turkish domestic parcel carrier with its own branch network, routinely compared against Yurtici, Aras, MNG and PTT when a store negotiates e-commerce rates. A paid Surat Kargo module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "HepsiJET",
    "kind": "last mile",
    "note": "Hepsiburada's delivery arm, operated by D Fast Dagitim Hizmetleri ve Lojistik, built for marketplace last mile rather than a branch network, using distribution centres and parcel lockers. Sellers who list on Hepsiburada usually need it. A paid HepsiJET module exists for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Trendyol Express",
    "kind": "last mile",
    "note": "Trendyol's own last mile network, the delivery leg for anyone selling on Turkey's largest marketplace, again built on distribution centres and lockers rather than branches. A paid Trendyol Express connector exists for Odoo 19, which matters if you run marketplace and own site stock in one Odoo.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Kolay Gelsin",
    "kind": "domestic express",
    "note": "Founded in 2018 under Ekol Logistics as a technology led alternative to the missed delivery problem, and now merged with Koc Holding's Sendeo under the Kolay Gelsin name. Both brands still appear in integration lists, so check which account you are given. One paid Odoo 19 module covers Sendeo and Kolay Gelsin together.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sendeo",
    "kind": "domestic express",
    "note": "Founded in 2021 by the Koc group out of Aygaz's Aykargo initiative, and now merging with Kolay Gelsin under that brand. It is still named separately by Turkish e-commerce integrations, so a merchant may hold a Sendeo contract while the brand transitions. Covered by the same paid Odoo 19 module as Kolay Gelsin.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "The usual choice for urgent outbound parcels and documents from Turkey, with DHL eCommerce covering cheaper small packets and MNG Kargo now inside the same group. Odoo 19 ships a DHL Express connector, so live rates and labels work with an account number and no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "Used from Turkey mainly for United States and Asia lanes on export orders. Odoo 19 ships a FedEx connector, so a Turkish exporter selling cross border gets rating and label printing without buying a module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "Commonly used from Turkey for European lanes on export orders. Odoo 19 ships a UPS connector, so it is one of the three global carriers a Turkish merchant can enable without a paid module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "ShipEntegra",
    "kind": "aggregator",
    "note": "A shipping aggregator Turkish sellers use to compare carriers and get contracted rates in one place. Odoo does not ship a connector for it and none exists on the Odoo 19 apps store, so it is a custom build, and remember the carriers behind an aggregator are reached through the aggregator contract and its fees, not directly.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_tr (Türkiye - Accounting)",
    "l10n_tr_reports (Türkiye - Accounting Reports)",
    "l10n_tr_nilvera (base Nilvera integration)",
    "l10n_tr_nilvera_einvoice and its extension for additional invoice types",
    "l10n_tr_nilvera_edispatch (Türkiye - e-İrsaliye / e-Dispatch)",
    "l10n_tr_hr_payroll (Türkiye - Payroll)",
    "l10n_tr_hr_payroll_account"
   ],
   "native": [
    "Turkish chart of accounts, taxes, financial reports and fiscal positions.",
    "Türkiye-specific tax and profit and loss reporting.",
    "e-Fatura and e-Arşiv through Nilvera: GİB-compliant XML generation, transmission to Nilvera, and document plus status synchronisation back into Odoo.",
    "Invoice scenarios for basic, public sector (kamu) and export, covering sales, withholding (tevkifat), export-registered (ihraç kayıtlı) and tax-exempt (istisna) cases.",
    "e-İrsaliye dispatch note generation and upload.",
    "e-Defter (e-Ledger) output."
   ],
   "custom": [
    "The whole e-document path is tied to Nilvera as the özel entegratör. If the client is already contracted to Logo, Uyumsoft, QNB eFinans, İzibiz or Sovos, none of that is in Odoo. Either migrate them to Nilvera or budget a connector. This is the single biggest scoping question on a Turkish project and it is worth asking in the first call.",
    "Only e-Fatura, e-Arşiv, e-İrsaliye and e-Defter are covered. e-SMM, e-Müstahsil Makbuzu, e-Bilet and YN ÖKC device integration are not, so professional services firms, agricultural buyers and ticketing businesses need extra work.",
    "Hosting. Archiving outside Türkiye is not permitted, so check where the Odoo database, filestore and attachments physically sit before signing anything. This can rule out a default cloud region.",
    "Master data cleanup. VKN/TCKN, tax office and Mersis are mandatory on partners and are almost always incomplete in the data being migrated. Plan the cleanup as its own workstream.",
    "No Turkish courier ships natively. Budget a paid connector per carrier, or a free community multi-carrier module that you have actually tested.",
    "Domestic gateways beyond Iyzico. PayTR has a community module; anything else is a build."
   ]
  },
  "openQuestions": 24
 },
 "united-kingdom": {
  "einvoicing": {
   "scheme": "Mandatory e-invoicing for VAT invoices, run over Peppol (no local-language name, the UK operates in English)",
   "authority": "HM Revenue and Customs (HMRC), jointly with the Department for Business and Trade (DBT)",
   "status": "No B2B e-invoicing mandate is in force. Public-sector obligations already exist: UK contracting authorities must be able to receive and process EN 16931-compliant e-invoices, and NHS England requires Peppol.",
   "appliesTo": "Businesses are not obliged to issue e-invoices to each other. If you sell to the public sector, your buyer is already required to be able to receive a compliant e-invoice, so Peppol capability is a practical requirement on B2G contracts.",
   "requirements": [
    "Structured, machine-readable invoice data that the recipient's system can process, not a PDF.",
    "Peppol as the core interoperability network, so a four-corner exchange through an access point rather than a filing to a government portal.",
    "No real-time reporting to HMRC at launch. The consultation response says real-time reporting will not be implemented in 2029 and would only follow once e-invoicing use is well established.",
    "Format choice, phasing and the treatment of legacy EDI are still open. Nothing firm until the Budget 2026 roadmap."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "VAT standard rate is 20%. The reduced rate is 5% (for example children's car seats and home energy) and the zero rate is 0% (for example most food and children's clothes).",
    "verified": true
   },
   {
    "claim": "VAT registration is compulsory once total taxable turnover for the last 12 months goes over 90,000 pounds.",
    "verified": true
   },
   {
    "claim": "VAT returns are usually filed every 3 months. The deadline to file online and to pay is one calendar month and 7 days after the end of the accounting period.",
    "verified": true
   },
   {
    "claim": "Making Tax Digital for VAT covers all VAT-registered businesses. GOV.UK states they should all now be signed up. Returns are submitted from compatible software through HMRC's MTD VAT API, which is what Odoo's l10n_uk_reports module connects to.",
    "verified": true
   },
   {
    "claim": "Making Tax Digital for Income Tax started on 6 April 2026 for sole traders and landlords with qualifying income over 50,000 pounds in the 2024 to 2025 tax year. The 30,000 pound band (2025 to 2026 income) joins on 6 April 2027, and the 20,000 pound band (2026 to 2027 income) on 6 April 2028.",
    "verified": true
   },
   {
    "claim": "Construction Industry Scheme deductions are 20% for registered subcontractors and 30% for unregistered ones, with 0% for gross payment status. VAT, materials, plant hire, fuel and consumable stores come out of the payment before the percentage is applied.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "For 2026 to 2027 employer Class 1 National Insurance is 15% on earnings above the secondary threshold of 5,000 pounds a year (96 pounds a week, 417 pounds a month). Employment Allowance is 10,500 pounds.",
    "verified": true
   },
   {
    "claim": "Employee Class 1 National Insurance on the standard category A is 0% up to the primary threshold, 8% from the primary threshold to the upper earnings limit and 2% above it.",
    "verified": true
   },
   {
    "claim": "Employers must operate PAYE to collect income tax and National Insurance from pay.",
    "verified": true
   },
   {
    "claim": "Minimum automatic enrolment pension contributions are 8% of qualifying earnings, of which the employer must pay at least 3% and the employee 5%. Qualifying earnings run from 6,240 to 50,270 pounds a year.",
    "verified": true
   },
   {
    "claim": "Payrolling benefits in kind becomes mandatory from 6 April 2027, starting with company cars, car fuel, vans, van fuel and employer-provided medical benefits. Most remaining benefits follow from April 2028. The original start date was April 2026 and was put back.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "Company Tax Returns should be filed online. The return is due 12 months after the end of the accounting period, and Corporation Tax is due 9 months and one day after the end of the period.",
    "verified": true
   },
   {
    "claim": "HMRC's free service for filing company accounts and Company Tax Returns closed on 31 March 2026. From 1 April 2026 companies must use commercial software to file annual accounts and Company Tax Returns with HMRC.",
    "verified": true
   },
   {
    "claim": "Companies House accounts reform now starts in April 2028, not April 2027. From that date all companies must file accounts using commercial software in iXBRL, abridged accounts are removed, small companies and micro-entities must file a profit and loss account, and web and paper filing of accounts closes.",
    "verified": true
   },
   {
    "claim": "The FRS 102 periodic review amendments apply to accounting periods beginning on or after 1 January 2026, with early adoption allowed. They bring in a five-step revenue model based on IFRS 15 and on-balance-sheet lease accounting for lessees based on IFRS 16, with exemptions for short-term and low-value leases.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe is fully available to UK businesses and settles in GBP. From Odoo 19's bundled Stripe connector a UK shop can switch on cards, Bacs Direct Debit, Pay by Bank, Klarna and Clearpay under one account.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal is one of the checkout buttons UK shoppers look for, and it carries a pay in 3 option for consumers. Odoo 19 ships the PayPal provider and its GBP support with no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "Adyen is the acquirer behind many larger UK retailers and covers cards, Bacs Direct Debit and pay by bank on a single contract. Odoo 19's bundled Adyen connector maps Bacs to Adyen's directdebit_GB and open banking to its paybybank method.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Mollie",
    "kind": "global gateway",
    "note": "Mollie sells into the UK, settles in GBP and lists Bacs and Pay by Bank as UK specific methods next to cards and wallets. It is one of the providers Odoo 19 ships, so there is no connector to buy.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Worldpay (now part of Global Payments)",
    "kind": "local acquirer",
    "note": "Worldpay is one of the longest running UK card acquirers and is now part of Global Payments. SNS Software publishes free Odoo 19 modules for its ecommerce, virtual terminal and POS flows, so an existing Worldpay merchant account can be reused.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Bacs Direct Debit",
    "kind": "instant bank transfer",
    "note": "Bacs is how UK businesses collect subscriptions, memberships and invoice balances, and it changes how you model recurring revenue in Odoo. Odoo 19 ships BACS Direct Debit as a payment method locked to the United Kingdom and to GBP, and both the bundled Stripe and Adyen connectors carry it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "GoCardless",
    "kind": "local gateway",
    "note": "GoCardless is how most UK small and mid sized firms run Bacs Direct Debit mandates without going through their own bank's scheme membership. Free Odoo 19 modules exist from Jotnar Systems and Smart IT, with around nine paid alternatives on the apps store.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Pay by Bank (open banking)",
    "kind": "instant bank transfer",
    "note": "UK open banking passed one billion payments in July 2026, and the shopper approves the payment inside their banking app instead of typing a card number. Odoo 19 ships an Open banking payment method restricted to the United Kingdom, and Stripe Pay by Bank is live for GBP payments in the UK.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Klarna",
    "kind": "BNPL",
    "note": "Klarna carries real basket share at UK checkouts for pay later and pay in instalments, and UK shoppers expect to see it on higher value carts. Odoo 19 ships Klarna and Klarna Pay over time as payment methods with the United Kingdom in their country lists.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Clearpay",
    "kind": "BNPL",
    "note": "Clearpay is the UK brand of Afterpay and is the pay in four option British shoppers recognise by name. Odoo 19 ships a Clearpay payment method restricted to the United Kingdom, and the bundled Stripe connector maps it to Stripe's afterpay_clearpay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Revolut Pay",
    "kind": "mobile wallet",
    "note": "Revolut is an everyday account for a large slice of UK consumers, and Revolut Pay lets them check out straight from that balance. Odoo 19 ships Revolut Pay as a payment method restricted to the United Kingdom.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Amazon Pay",
    "kind": "mobile wallet",
    "note": "Amazon Pay lets a UK shopper pay with the card and address already stored in their Amazon account, which cuts guest checkout friction. Odoo 19 ships Amazon Pay as a payment method and Stripe lists Great Britain among its supported customer locations.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Trustly",
    "kind": "instant bank transfer",
    "note": "Trustly moves money account to account rather than over the card rails, which suits higher value UK baskets where card fees bite. Odoo 19 ships a Trustly payment method with the United Kingdom in its country list.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Checkout.com",
    "kind": "global gateway",
    "note": "Checkout.com is headquartered in London and is a frequent choice for UK merchants with cross border card volume. Odoo 19 has no bundled connector, so the integration comes from a paid apps store module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Barclaycard",
    "kind": "local acquirer",
    "note": "Barclaycard is the card acquirer UK small businesses are most often sold by their own bank, so an incoming client frequently already has the merchant account. A paid Odoo 19 connector for its ePDQ ecommerce gateway is listed on the apps store.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Square",
    "kind": "local gateway",
    "note": "Square is common with UK independent retail and hospitality that want the same account on the shop counter and on the website. A free Square payment provider module for Odoo 19 is published by Silver Touch Technologies.",
    "support": "oca_or_community",
    "verified": false
   },
   {
    "name": "SumUp",
    "kind": "local gateway",
    "note": "SumUp card readers are widespread among UK market traders, cafes and mobile services, and those clients want the same provider on their Odoo webshop. A free POS terminal module and a paid online payment provider module both exist for Odoo 19.",
    "support": "third_party_paid",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "Royal Mail",
    "kind": "national post",
    "note": "Royal Mail is the UK universal service provider and reaches 32 million addresses, so it is the default for letters and lighter parcels. Odoo 19 ships no Royal Mail connector, but six paid apps store modules cover it for Odoo 19, most of them built on Click and Drop.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Parcelforce Worldwide",
    "kind": "domestic express",
    "note": "Parcelforce is the express parcel arm of Royal Mail Group and is what UK senders use for heavier and time critical consignments. No direct Odoo 19 connector was found on the apps store, only reach through the AfterShip aggregator, which means an AfterShip account and its fees become a required dependency.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Evri",
    "kind": "last mile",
    "note": "The largest UK home-delivery parcel network. DHL's UK e-commerce arm merged into Evri in October 2025 and now trades as Evri Premium, so DHL domestic UK volume sits here. No native Odoo connector, reached through an aggregator.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DPD UK (DPD Local)",
    "kind": "domestic express",
    "note": "DPD is the UK next day service most often chosen when the customer wants a one hour delivery window and Pickup shop options. Odoo 19 has no bundled DPD connector, so it comes from a paid apps store module for DPD Local.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express is the usual choice for UK outbound international air freight and post Brexit EU shipments with customs paperwork. It is one of the ten delivery connectors Odoo 19 ships, so rates and labels work without buying anything.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS is widely used by UK manufacturers and B2B sellers for European and transatlantic lanes. Odoo 19 ships a UPS connector, and OCA also maintains delivery_ups_oca on the 18.0 branch as an alternative.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx covers UK international express and now also absorbs the former TNT UK business. Odoo 19 ships a FedEx connector out of the box.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Sendcloud",
    "kind": "aggregator",
    "note": "Sendcloud is the one aggregator Odoo 19 ships a connector for, and its documentation names the United Kingdom as a supported shipping from country. Note what this means in practice: Odoo talks to Sendcloud, not to Royal Mail or Evri, so a paid Sendcloud subscription and its own carrier contracts are a required dependency.",
    "support": "native",
    "verified": true
   },
   {
    "name": "APC Overnight",
    "kind": "domestic express",
    "note": "APC Overnight is a UK next day network built from independent regional depots and is common for B2B and trade counter deliveries. Three paid Odoo 19 connectors are on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Palletways",
    "kind": "freight",
    "note": "Palletways is the palletised freight network UK distributors and manufacturers use when a consignment is too big for a parcel carrier. A paid Odoo 19 connector covering UK and Europe is on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DX",
    "kind": "domestic express",
    "note": "DX runs over 110 depots across the UK and Ireland and specialises in irregular dimension and weight freight, secure document exchange and same day courier work that parcel carriers refuse. The apps store returned zero Odoo 19 modules for DX, so this one is a custom build against their API.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Whistl and Parcelhub",
    "kind": "aggregator",
    "note": "Whistl handles high volume UK business mail as a Royal Mail alternative and runs parcels through its Parcelhub brand. The apps store returned zero Odoo 19 modules for either name, so integration is a custom build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "AfterShip and ShipEngine",
    "kind": "aggregator",
    "note": "These are the two multi carrier platforms that fill the gaps in UK coverage, reaching Parcelforce, Evri, InPost and others from one connector. They are aggregators, so the carrier behind them is reached through their account and their fees, not through an Odoo carrier connector.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "InPost UK",
    "kind": "domestic express",
    "note": "Runs the UK locker estate and, since absorbing Yodel in July 2026, the former Yodel home delivery network too. That makes it one of the largest UK parcel carriers. No native Odoo connector, so it is reached through an aggregator or a build.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_uk (UK - Accounting)",
    "l10n_uk_reports (UK - Accounting Reports)",
    "l10n_uk_bacs (UK BACS Payment Files)",
    "l10n_uk_reports_cis (UK - Construction Industry Scheme)",
    "l10n_uk_hmrc (UK - HMRC API)"
   ],
   "native": [
    "CT600-ready chart of accounts and a VAT100-ready tax structure",
    "UK accounting reports and VAT return submission to HMRC through the MTD VAT API",
    "Bacs files for paying suppliers and collecting from customers",
    "CIS monthly returns to HMRC and CIS deduction reporting",
    "Peppol exchange: Odoo runs its own access point and SMP, and the UK is on Odoo's list of countries eligible for Peppol registration"
   ],
   "custom": [
    "UK payroll. Odoo ships no official UK payroll localization: the payroll localizations documented for v19 are Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Turkiye, UAE and the US. The documented UK route is the Employment Hero Payroll integration. RTI submissions, auto-enrolment assessment and statutory payments are not in the standard product.",
    "iXBRL statutory accounts. Odoo does not tag accounts for HMRC or Companies House. That stays with the accountant's software, which matters more now that HMRC's free filing service closed on 31 March 2026 and Companies House goes software-only in April 2028.",
    "Multi-company HMRC submissions. Only one company and one user can be connected to HMRC at a time, so group filings have to be run in sequence.",
    "The 2029 e-invoicing build cannot be scoped yet. Peppol is confirmed as the network but the format, phasing and legacy EDI treatment come with the Budget 2026 roadmap."
   ]
  },
  "openQuestions": 18
 },
 "germany": {
  "einvoicing": {
   "scheme": "E-Rechnung. B2B sits in section 14 UStG; federal B2G runs on XRechnung under the E-Rechnungsverordnung (ERechV)",
   "seoToken": "E-Rechnung",
   "authority": "Bundesministerium der Finanzen and the Land tax offices for B2B. For federal public contracts, the Bund's central invoice receipt platforms (ZRE and OZG-RE)",
   "status": "Every German business has had to be able to receive structured e-invoices since 1 January 2025. Issuing is still in transition: 2026 is the last full year in which paper or PDF is allowed with the buyer's agreement.",
   "appliesTo": "Domestic B2B supplies where both the supplier and the customer are established in Germany. Supplies exempt under section 4 nos. 8 to 29 UStG are out of scope and B2C is not covered. Separately, suppliers to federal contracting authorities have had to send e-invoices since 27 November 2020 for orders above 1,000 euro net.",
   "requirements": [
    "A structured electronic format that is issued, sent and received electronically and meets the European standard under Directive 2014/55/EU. XRechnung (pure XML) and ZUGFeRD (PDF with embedded XML) both qualify. Parties may also agree another format if the required data can be extracted correctly and interoperably.",
    "Post-audit, not clearance. There is no government platform and no real-time reporting for B2B. Transmission is free choice, for example email or Peppol.",
    "Transition under section 27 UStG: paper and other electronic formats stay allowed with the recipient's consent for supplies up to 31 December 2026, and up to 31 December 2027 if the issuer's total turnover in the previous calendar year was 800,000 euro or less. Legacy EDI that does not meet the standard also runs to 31 December 2027.",
    "Invoices must be kept for 8 years under section 14b UStG.",
    "Federal B2G: XRechnung as the standard, the Leitweg-ID as a mandatory field carried in the buyer reference, plus bank details, payment terms and an email or De-Mail address, submitted through the federal portal after registering a user account. Direct contracts up to 1,000 euro are exempt."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "The standard VAT rate is 19% and the reduced rate is 7% (section 12 UStG). A 0% rate applies to certain solar installations.",
    "verified": true
   },
   {
    "claim": "From 1 January 2026 food served in restaurants and catering moved from 19% to the 7% rate under the Steueraenderungsgesetz 2025. Drinks stay at 19%. It also covers bakeries, butchers, food retail, catering and canteens in schools, kindergartens and hospitals.",
    "verified": true
   },
   {
    "claim": "Preliminary VAT returns (Umsatzsteuer-Voranmeldung) are due by the 10th day after the end of each period and must be transmitted electronically in the officially prescribed dataset. The period is the calendar month if the previous year's tax was more than 9,000 euro, otherwise the calendar quarter. The tax office can waive preliminary returns if the previous year's tax was 2,000 euro or less.",
    "verified": true
   },
   {
    "claim": "Small business rule (section 19 UStG): no VAT is charged if total turnover did not exceed 25,000 euro in the previous calendar year and does not exceed 100,000 euro in the current year.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "2026 social insurance contribution rates: pension 18.6%, unemployment 2.6%, health 14.6% general rate plus the fund's own supplementary rate, long-term care 3.6%. Each is split evenly between employer and employee. Employees without children pay an extra 0.6% on care insurance, giving 4.2%. As an example of the supplementary rate, TK charges 2.69% in 2026, shared 1.345% each side.",
    "verified": true
   },
   {
    "claim": "2026 contribution ceilings (Sozialversicherungsrechengroessen-Verordnung 2026): general pension insurance 8,450 euro a month or 101,400 euro a year; miners' pension insurance 10,400 euro a month or 124,800 euro a year; health insurance earnings limits of 77,400 euro a year and 69,750 euro a year (5,812.50 a month); Bezugsgroesse 3,955 euro a month or 47,460 euro a year.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "E-Bilanz under section 5b EStG: the balance sheet and the profit and loss account, including uncondensed account listings and the fixed asset schedule, must be transmitted to the tax authority electronically in the officially prescribed dataset. Exemption is only possible on hardship grounds.",
    "verified": true
   },
   {
    "claim": "Invoices issued and received must be kept for 8 years, counted from the end of the calendar year in which the invoice was issued (section 14b UStG).",
    "verified": true
   },
   {
    "claim": "German bookkeeping runs on the DATEV charts SKR03 and SKR04. Odoo supports both, installs SKR03 by default, and only lets you switch package before the first accounting entry exists.",
    "verified": true
   },
   {
    "claim": "Odoo's German package ships the DATEV export in two parts, DATEV ATCH for documents and DATEV DATA for journal entries, which is how the books reach the Steuerberater. It also ships the Balance Sheet, Profit and Loss, Umsatzsteuervoranmeldung tax report, EC Sales List and Intrastat.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal is the button German shoppers expect first at online checkout, and leaving it off measurably costs conversions. Odoo 19 ships the PayPal provider with EUR support and no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "SEPA Lastschrift (SEPA Direct Debit)",
    "kind": "instant bank transfer",
    "note": "Lastschrift is the everyday German way to pay recurring and invoiced amounts, and EHI's 2026 retail study still counts it among the main methods. Odoo 19 ships SEPA Direct Debit both as an offline payment method and as a payment method record listing Germany, and the bundled Stripe, Adyen and Mollie connectors all carry it.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Vorkasse (bank transfer prepayment)",
    "kind": "instant bank transfer",
    "note": "German buyers, especially B2B, still pay a good share of orders by transferring first and receiving after the money lands, which changes how you set order confirmation and stock reservation in Odoo. Odoo 19 ships Wire Transfer as a built in method, and Novalnet's free Odoo 19 module exposes Prepayment explicitly.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Kauf auf Rechnung (open invoice)",
    "kind": "local gateway",
    "note": "Buying on invoice and paying afterwards is the German habit that most surprises foreign sellers, and it forces a real credit and dunning setup rather than a card only checkout. Novalnet's free LGPL-3 module for Odoo 19 exposes Invoice, Invoice with Payment Guarantee and instalments by invoice.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Ratepay",
    "kind": "local gateway",
    "note": "Ratepay is the German white label provider behind invoice, direct debit and pay in 3 on many DACH checkouts, is BaFin regulated and sits under the Nexi group. Odoo 19 ships a Ratepay payment method restricted to Germany, Austria, the Netherlands and Switzerland.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Riverty (AfterPay)",
    "kind": "BNPL",
    "note": "Riverty, formerly Arvato and AfterPay, is the other main German pay after delivery name and is offered through Mollie. Odoo 19 ships an AfterPay Riverty payment method restricted to the Netherlands, Belgium, Germany, Austria and Finland.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Klarna",
    "kind": "BNPL",
    "note": "Klarna covers the German trio of pay now, pay in 30 days and pay in instalments on one integration. Odoo 19 ships Klarna, Klarna Pay Now and Klarna Pay over time as payment methods, and Germany appears in all three country lists.",
    "support": "native",
    "verified": true
   },
   {
    "name": "girocard",
    "kind": "domestic card scheme",
    "note": "girocard is Germany's own debit scheme, run by EURO Kartensysteme, with roughly 100 million cards in circulation and around 80 percent of Germans holding one. It is a shop counter scheme, not an online one: since giropay closed there is no girocard ecommerce route, Odoo 19 ships no girocard method, and any online acceptance would be a custom build.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Novalnet",
    "kind": "local gateway",
    "note": "Novalnet is a German payment service provider that publishes its own free Odoo 19 module under LGPL-3, covering cards, SEPA direct debit, prepayment, invoice, invoice with payment guarantee and instalments. It is the cheapest route to a German method set without buying a connector.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe is available to German businesses and settles in EUR, and it carries Klarna and SEPA Direct Debit for German customers. Odoo 19 ships the Stripe connector, so it is the fastest path to a working German checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "Adyen is the acquirer behind many larger German retailers and covers cards, SEPA direct debit and pay by bank on one contract. Odoo 19's bundled Adyen connector maps SEPA direct debit and open banking directly.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Mollie",
    "kind": "global gateway",
    "note": "Mollie supports German language checkout, lists Klarna, Billie, Riverty, SEPA bank transfer and direct debit for the German market, and is one of the providers Odoo 19 ships. That makes it the usual single contract answer for a German webshop.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Worldline",
    "kind": "global gateway",
    "note": "Worldline is one of the large European acquirers active in the DACH region and is often already in place at established German merchants. Odoo 19 ships a Worldline payment provider, so an existing contract can be reused without buying a module.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Trustly",
    "kind": "instant bank transfer",
    "note": "Trustly moves money account to account and is one of the surviving German online banking options now that Sofort and giropay have both closed. Odoo 19 ships a Trustly payment method with Germany in its country list.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Amazon Pay",
    "kind": "mobile wallet",
    "note": "Amazon Pay is well established in Germany because it reuses the address and card already held in a shopper's Amazon account. Odoo 19 ships Amazon Pay as a payment method and Stripe lists Germany among its supported customer locations.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PAYONE",
    "kind": "local gateway",
    "note": "PAYONE is a German payment service provider frequently already installed at mid sized German retailers, so it comes up in almost every migration conversation. The Odoo apps store returns no PAYONE connector for Odoo 19, so budget a custom build or plan to move the merchant to a bundled provider.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Unzer",
    "kind": "local gateway",
    "note": "Unzer, formerly Heidelpay, is a Heidelberg based provider common with German mid market ecommerce. A search of the Odoo apps store returned zero Unzer modules for Odoo 19, so this is a custom build and should be priced as one.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Computop",
    "kind": "local gateway",
    "note": "Computop is a Bamberg based gateway used by German retail and travel businesses with multi channel card volume. The Odoo apps store returned zero Computop modules for Odoo 19, so integration means writing the connector.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Wero",
    "kind": "instant bank transfer",
    "note": "The European Payments Initiative wallet, now live for online payments in Germany, France and Belgium. It is account-to-account rather than card, so it matters for German shoppers who avoid cards. Reached through a gateway, not shipped in Odoo.",
    "support": "third_party_paid",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "DHL Paket",
    "kind": "national post",
    "note": "DHL Paket is the German domestic parcel arm of Deutsche Post DHL and is the default for consumer deliveries, with Packstation lockers, two person handling and returns. Odoo's own documentation says its native DHL connector covers DHL Express only and that other DHL services are not supported, so DHL Paket needs a paid apps store module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Deutsche Post",
    "kind": "national post",
    "note": "Deutsche Post carries letters, Warenpost and small light goods that would be overpriced as a parcel, which matters for German sellers of small items. There is no native Odoo connector, so it comes from a paid apps store module.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express handles German outbound international air freight and time definite deliveries, a separate business from DHL Paket. It is one of the ten delivery connectors Odoo 19 ships, so rating and labels work with no purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Hermes Germany",
    "kind": "last mile",
    "note": "Hermes Germany still trades under the Hermes brand in Germany, unlike its former UK sister which became Evri, and runs PaketShops, home delivery and bulky goods handling. Several paid Odoo 19 connectors exist, including one built on Hermes HSI credentials.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DPD Germany",
    "kind": "domestic express",
    "note": "DPD is a main German B2B and B2C parcel network with Predict delivery windows and Pickup shops. Odoo 19 has no bundled DPD connector, and note the free Cognisance module is only free at the module level: its carrier features require a paid Cognisance Bridge subscription.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "GLS Germany",
    "kind": "domestic express",
    "note": "GLS is widely used by German B2B senders and by shops that need flexible delivery and returns. Around thirteen Odoo 19 modules exist, and as with DPD the free Cognisance module still needs a paid Cognisance Bridge plan behind it.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS is a standard choice for German manufacturers and B2B exporters on European and transatlantic lanes. Odoo 19 ships a UPS connector, and OCA also maintains delivery_ups_oca on the 18.0 branch.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx covers German international express volume and has absorbed the former TNT business. Odoo 19 ships a FedEx connector out of the box.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Sendcloud",
    "kind": "aggregator",
    "note": "Sendcloud is the only aggregator Odoo 19 ships a connector for, and Odoo's documentation names Germany as a supported shipping from country. Be clear about what that buys: Odoo talks to Sendcloud, not to DHL or Hermes, so a paid Sendcloud plan and its carrier contracts are a required dependency.",
    "support": "native",
    "verified": true
   },
   {
    "name": "shipcloud",
    "kind": "aggregator",
    "note": "shipcloud is a German built multi carrier platform that reaches DHL, DPD, GLS, Hermes and UPS from one API, which suits shops that split volume by parcel size. Odoo 19 has no bundled connector, so it needs a paid apps store module on top of the shipcloud subscription.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Cognisance Bridge",
    "kind": "aggregator",
    "note": "Cognisance is a German vendor whose Odoo 19 DPD and GLS modules are listed at zero euros but route carrier calls through its own Bridge service. Treat the carrier as reached through a paid aggregator, because the Shipping Basic or Pro plan is what actually makes labels work.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DSV (formerly DB Schenker)",
    "kind": "freight",
    "note": "Freight and groupage across Germany. DSV completed its purchase of DB Schenker on 30 April 2025 and the network is being folded into DSV, so contracts and labels are moving to the DSV brand. No Odoo connector, so freight bookings stay manual or need a build.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Dachser",
    "kind": "freight",
    "note": "Dachser is a German headquartered groupage and contract logistics operator common with industrial and food clients. OCA maintains a free delivery_dachser module on the 18.0 branch, with no 19.0 version in the repository yet, so plan for the port.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "trans-o-flex",
    "kind": "domestic express",
    "note": "trans-o-flex runs express and temperature controlled networks across Germany for pharmaceutical, cosmetics and high value electronics shippers, with GDP compliant 2 to 8 and 15 to 25 degree services. One paid Odoo 19 connector is on the apps store.",
    "support": "third_party_paid",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "German fiscal localization package, with SKR03 and SKR04 charts of accounts (SKR03 installed by default)",
    "DATEV export (DATEV ATCH for documents, DATEV DATA for journal entries)",
    "Point of Sale technical security system with DSFinV-K export",
    "Third-party on the apps store: l10n_de_leitweg_id (Odoo DevHouse), l10n_de_xrechnung_generator and l10n_de_zugferd_generator (Pokutsoft), l10n_de_datev_export (Pokutsoft), l10n_de_ustva_report_basic (rivecon), l10n_de_lohn_payroll (Pokutsoft)"
   ],
   "native": [
    "SKR03 and SKR04 charts of accounts, SKR03 by default",
    "Balance Sheet, Profit and Loss, Umsatzsteuervoranmeldung tax report, EC Sales List and Intrastat",
    "DATEV export for the tax adviser, split into documents and journal entries",
    "GoBD traceability: creator, creation date, modification date and modifying user on every record",
    "Point of sale technical security system and DSFinV-K export",
    "XRechnung CIUS and Peppol BIS Billing 3.0 among the standard e-invoicing formats, with Odoo acting as its own Peppol access point and SMP and Germany on the eligible list"
   ],
   "custom": [
    "ELSTER filing. Odoo produces the Umsatzsteuervoranmeldung report but does not transmit it to ELSTER. Third-party export modules exist.",
    "Leitweg-ID for federal B2G invoices. Handled by a third-party module rather than the standard localization.",
    "E-Bilanz under section 5b EStG. Not in Odoo. It stays with the tax adviser's software.",
    "ZUGFeRD profile coverage and inbound reading of supplier e-invoices into vendor bills. Confirm per project rather than assuming."
   ]
  },
  "openQuestions": 24
 },
 "france": {
  "einvoicing": {
   "scheme": "Facturation electronique (mandatory B2B e-invoicing and e-reporting reform)",
   "seoToken": "Factur-X",
   "authority": "DGFiP (Direction generale des Finances publiques), Ministere de l'Economie et des Finances",
   "status": "Live from 1 September 2026. Every business subject to French VAT must be able to receive e-invoices from that date, and large companies and ETIs must also issue them and file e-reporting; PME, TPE and micro-enterprises follow on 1 September 2027.",
   "appliesTo": "Businesses established in France and subject to French VAT, including those under the franchise en base. Receiving e-invoices: all of them from 1 September 2026. Issuing e-invoices and transmitting e-reporting data: grandes entreprises and entreprises de taille intermediaire (ETI) from 1 September 2026, then PME, TPE and micro-enterprises from 1 September 2027.",
   "requirements": [
    "Invoices must be issued, transmitted and received through a Plateforme Agreee (PA, formerly called PDP), a private operator registered by the DGFiP for three renewable years. Article 289 bis of the Code general des impots. The list of registered platforms is published on impots.gouv.fr.",
    "The chosen PA passes the invoice data to the tax administration (article 289 E CGI). This is continuous transaction control by reporting through an accredited intermediary, not per-invoice clearance where the tax authority validates an invoice before it is legally valid.",
    "The public portal (PPF) no longer acts as a free exchange platform. Article 123 of the loi de finances pour 2026 formalised the simplification announced in August 2025, leaving the private platforms at the centre of the flow.",
    "A central annuaire (directory) routes invoices to the recipient's platform. It is made available to the PAs and holds the addressing data. SIREN, SIRET and recipient establishment on the customer record are what make routing work.",
    "Structured format built on the EN 16931 semantic model. DGFiP external specifications version 3.2 dated 30 April 2026, backed by AFNOR norms XP Z12-012 (invoice and lifecycle status formats and profiles), XP Z12-013 (APIs between business systems and approved platforms) and XP Z12-014 (B2B use cases). The three accepted syntaxes are Factur-X (hybrid PDF plus XML), UBL and CII.",
    "Four new mandatory invoice mentions: the buyer's SIREN, the delivery address when it differs from the billing address, the nature of the operation (goods, services or both), and the 'TVA sur les debits' option when the seller has elected it.",
    "E-reporting of transaction data, and in some cases payment data, covering what e-invoicing does not: B2C sales and cross-border transactions. Same channel, the PA. Articles 290 and 290 A CGI, CGI annexe II articles 242 nonies M to 242 nonies P. Applies to grandes entreprises and ETI from 1 September 2026."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "The standard TVA rate is 20 percent. Reduced rates of 10 percent, 5.5 percent and 2.1 percent apply only to categories expressly listed in the Code general des impots. Guadeloupe, Martinique and La Reunion run a separate 8.5 percent standard rate.",
    "verified": true
   },
   {
    "claim": "Three VAT regimes. Franchise en base (no VAT declaration) below 85,000 euros turnover for goods and hospitality or 37,500 euros for services. Regime reel simplifie between those thresholds and 945,000 euros (goods) or 286,000 euros (services), filed annually on form CA12, with advance payments in July (55 percent) and December (40 percent) and a May balance. Regime reel normal above those thresholds, filed monthly on form CA3, or quarterly if VAT due is under 4,000 euros a year.",
    "verified": true
   },
   {
    "claim": "A business on the regime simplifie whose annual VAT exceeds 15,000 euros has to switch to monthly filing. That threshold is the one that usually forces a mid-year change in how the ERP files.",
    "verified": true
   },
   {
    "claim": "All VAT returns and payments go online through the espace professionnel on impots.gouv.fr. Paper filing is not an option.",
    "verified": true
   },
   {
    "claim": "From 1 September 2026 the DGFiP receives invoice and transaction data through approved platforms with the stated aim of pre-filling VAT returns. Plan for the VAT return in the ERP to be reconciled against what the platform already sent, not just computed locally.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "The Declaration sociale nominative (DSN) is the single monthly electronic filing built from payroll data. It goes through net-entreprises.fr, which is the deposit point, and it replaced the separate social declarations for private-sector employers.",
    "verified": true
   },
   {
    "claim": "The DSN deadline splits by headcount: the 5th of the month following the pay period for employers with 50 or more employees, the 15th for employers under 50. Widely stated by secondary sources; confirm against URSSAF before quoting it to a client.",
    "verified": false
   },
   {
    "claim": "Odoo has no documented French payroll localization. France does not appear on Odoo's list of payroll localization countries, which covers Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Turkiye, UAE and the United States. Odoo ships l10n_fr_hr_payroll_account, which supplies the accounting side of French payroll rules only.",
    "verified": true
   },
   {
    "claim": "There is no DSN generator in standard Odoo. In practice French clients run payroll in a dedicated tool or with a cabinet comptable and post the resulting journal entries into Odoo.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "The Plan Comptable General is set by the Autorite des normes comptables (ANC), the French accounting standard setter. The base text is reglement ANC 2014-03, amended since, most recently by reglement ANC 2026-04 of 4 May 2026 on accounting for corporate income taxes and related contributions.",
    "verified": true
   },
   {
    "claim": "The reformed PCG from reglement ANC 2022-06 applies to financial years opened from 1 January 2025. Reported effects include cutting the account list from around 2,000 to around 1,600, a narrower definition of exceptional result, and removal of the transfer-of-charges accounts 791, 796 and 797. Secondary sources only; read the reglement text before quoting the numbers.",
    "verified": false
   },
   {
    "claim": "The Fichier des Ecritures Comptables (FEC) must be handed to the tax administration on a tax audit by any taxpayer keeping computerised accounts. Article L47 A-I of the Livre des procedures fiscales sets the obligation; article A47 A-1 sets the format. XML is accepted and the DGFiP publishes XSD schemas (A47A-I-VII-1, A47A-I-VIII-3, A47A-I-VIII-5, A47A-I-VIII-7) to validate against.",
    "verified": true
   },
   {
    "claim": "Odoo ships FEC import (l10n_fr_fec_import) for loading history. FEC export is not in the standard France localization; the OCA module l10n_fr_fec_oca covers it.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Cartes Bancaires (CB)",
    "kind": "domestic card scheme",
    "note": "France runs its own card network, and Stripe states that more than 95% of CB cards are co-badged with Visa or Mastercard. EEA rules make you offer the shopper a network choice at checkout, so a French Odoo store has to show CB as its own brand rather than hiding it behind a generic card button.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Worldline",
    "kind": "local gateway",
    "note": "Odoo's own module summary calls Worldline a French payment provider covering several European countries. Its Odoo 19 mapping reaches Cartes Bancaires, Cofidis, FLOA Bank, Klarna and PayPal from one French acquiring contract.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe does accept French businesses, and FR sits in the supported country list inside Odoo 19's Stripe module. From a French Stripe account you can switch on Cartes Bancaires, SEPA debit, Alma, Klarna and PayPal without leaving the native provider.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global wallet",
    "note": "Still a standard second button next to CB on French checkouts, particularly for cross border baskets. Odoo 19 ships the PayPal provider and it settles in EUR.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Mollie",
    "kind": "regional gateway",
    "note": "Dutch PSP with a French storefront that sells Cartes Bancaires, virement SEPA, PayPal and iDEAL with Wero to French merchants, and says it serves more than 250,000 businesses. It is a common pick for smaller French sellers who find bank acquiring paperwork heavy.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "The usual choice once a French retailer runs stores and a website on one acquiring contract. Its Odoo 19 mapping includes SEPA direct debit and Apple Pay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "SEPA Direct Debit (prelevement SEPA)",
    "kind": "bank direct debit",
    "note": "How French businesses collect subscriptions and instalments in euro. Odoo 19 ships it with a mandate flow, but invoices must be in euro, the payment journal needs a valid IBAN and you must hold a creditor identifier.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Virement bancaire (SEPA credit transfer)",
    "kind": "bank transfer",
    "note": "French B2B buyers routinely settle an invoice by virement rather than by card. Odoo 19's Wire Transfer provider prints your IBAN and a payment reference at checkout and holds the order unpaid until you reconcile the incoming transfer.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Apple Pay and Google Pay",
    "kind": "mobile wallet",
    "note": "In France these wallets ride on the shopper's CB card, so they inherit CB acceptance rather than replacing it. Odoo 19's Stripe provider ships express checkout, which Odoo's own field help describes as paying with Google Pay and Apple Pay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Alma",
    "kind": "BNPL",
    "note": "French pay in instalments provider, and Stripe lists it as EUR only with both the business and the customer in France. Odoo 19 ships an Alma payment method record that is restricted to France in the data file.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Klarna",
    "kind": "BNPL",
    "note": "Stripe lists France among the business locations that can accept Klarna, and Odoo's native Worldline module maps Klarna to Worldline code 3301. It shows up on French fashion and homeware baskets where Alma competes for the same slot.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FLOA",
    "kind": "BNPL",
    "note": "French instalment lender behind many 3x and 4x card offers. Odoo 19's Worldline module maps floa_bank to Worldline code 5139, so a French Worldline contract reaches it with no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Cofidis",
    "kind": "BNPL",
    "note": "Another French consumer credit name that appears at checkout as a split payment option. Odoo 19's Worldline module maps cofidis to code 5129 and treats it as a redirect method.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Wero",
    "kind": "instant bank transfer",
    "note": "The bank backed European wallet, live in France, Belgium and Germany, and now usable for paying online as well as sending money. Most French banks put it inside their own app, so there is no separate wallet for the shopper to install.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "PayPlug",
    "kind": "local gateway",
    "note": "French PSP owned by Groupe BPCE, which says it has a privileged connection to the Cartes Bancaires scheme and processed EUR 10.9 billion in 2025 for more than 18,000 merchants. Common with French SMB retailers who already bank with BPCE.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "HiPay",
    "kind": "local gateway",
    "note": "French gateway whose Odoo 19 connector carries the widest French method list on the store: CB, Alma, Oney, Wero, SEPA Direct Debit, Klarna, Illicado and Carte Cadeau. Worth naming when a French client already has a HiPay contract.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Oney",
    "kind": "BNPL",
    "note": "French lender behind a large share of the 3x and 4x offers French shoppers see at checkout. No dedicated Odoo module exists, so it arrives through the paid HiPay connector and a HiPay contract becomes a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Lyra",
    "kind": "local gateway",
    "note": "French PSP for online and point of sale payments that hosts merchant and cardholder data on servers in France, which matters to French buyers with data residency clauses. Its platform sits behind a number of French bank branded checkout products.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Monext (Payline)",
    "kind": "local gateway",
    "note": "French payment services provider handling Carte Bancaire, Visa, Mastercard, Apple Pay and PayPal for French merchants, plus card issuing. Widely used in French travel, events and retail.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "shipping": [
   {
    "name": "Colissimo (La Poste)",
    "kind": "national post",
    "note": "La Poste's parcel product and the default home delivery choice French shoppers expect to see, in signed and unsigned forms plus Point Relais drop off. Standard delivery is quoted at 48 hours across mainland France, Monaco and Andorra.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Mondial Relay",
    "kind": "pickup point",
    "note": "Pickup-point network used heavily by French shoppers. Odoo ships the pickup-point picker only: rates, labels and tracking are not covered and need a paid connector or a build.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Chronopost",
    "kind": "domestic express",
    "note": "The express option for timed next morning delivery in France, with Chrono 10, 13 and 18 covering more than 25,000 towns, plus Chrono Relais and Shop2Shop. Chronofresh handles the chilled version for food sellers.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Colis Prive",
    "kind": "last mile",
    "note": "Private last mile carrier built for French ecommerce home delivery, with 51 agencies, 5,500 Colis Prive Store pickup points and 6,300 lockers, now owned by CEVA Logistics. Sendcloud notes you must bring your own Colis Prive contract.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Relais Colis",
    "kind": "pickup point",
    "note": "Long running French pickup point network attached to supermarket and high street shops. GLS France acquired it in May 2026, adding nearly 7,000 relay points to the GLS network.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "DPD France",
    "kind": "domestic express",
    "note": "One of the main road parcel networks French merchants ship with for both B2B and B2C, and the first carrier Sendcloud lists for France after Colissimo. Four separate DPD France connectors exist for Odoo 19, while the free OCA module delivery_roulier_dpd_fr stops at 16.0.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "GLS France",
    "kind": "domestic express",
    "note": "96 agencies, 10 hubs and more than 10,000 Relais GLS points in France, with 24 hour standard domestic delivery and 92% of relay deliveries inside 24 hours. It serves more than 5,900 business customers and now owns Relais Colis.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "GEODIS",
    "kind": "freight",
    "note": "French logistics group that moves everything from a gram to a ton, so it is the name that comes up when an Odoo client outgrows parcel and starts shipping pallets. Sendcloud exposes Geodis Messagerie France, Geodis Express France and the European distribution services.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Amazon Shipping",
    "kind": "last mile",
    "note": "Amazon sells delivery for non Amazon orders in France and Sendcloud lists it among its French carriers. Merchants use it as a cheaper alternative to Colissimo on high volume home delivery.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sendcloud",
    "kind": "aggregator",
    "note": "The one shipped Odoo 19 connector that actually reaches French carriers, covering Colissimo, Chronopost, Mondial Relay, Colis Prive, Relais Colis, DPD, GLS, GEODIS and Amazon Shipping from a single integration. Odoo's own doc supports shipping from France and to any European country.",
    "support": "native",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "The default for French exporters sending outside the EU on a deadline. Odoo 19 ships a DHL Express connector, and its doc is explicit that other DHL services are not supported, so DHL Parcel and DHL eCommerce are a different problem.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "Used from France mainly for B2B export and heavier parcels where Colissimo weight limits stop. Odoo 19 ships a UPS connector for all regions.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "Present in France through its own network and through TNT, and used for time critical export. Odoo 19 ships a FedEx connector for all regions.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Boxtal",
    "kind": "aggregator",
    "note": "French shipping broker with around 30,000 active clients that resells pre negotiated rates across French carriers. Smaller French merchants use it because they cannot sign their own Colissimo or DPD contract yet.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Chronofresh",
    "kind": "cold chain",
    "note": "Chronopost's temperature controlled service, which is the one French food and wine sellers have to have before they can ship. A dedicated Odoo 19 connector exists on the store.",
    "support": "third_party_paid",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_fr_account (France - Accounting)",
    "l10n_fr_reports (France - Accounting Reports)",
    "l10n_fr_pos_cert (France - VAT Anti-Fraud Certification for Point of Sale)",
    "l10n_fr_pdp (France - E-Invoicing, Approved Platform)",
    "l10n_fr_pdp_pos (France - E-reporting for POS)",
    "l10n_fr_fec_import (France - FEC Import)",
    "l10n_fr_hr_payroll_account (France - Payroll with Accounting)",
    "l10n_fr_facturx_chorus_pro (France - Peppol integration with Chorus Pro)",
    "OCA l10n_fr_account_vat_return (CA3, 3310-A, 3519 VAT returns)",
    "OCA l10n_fr_fec_oca (FEC export)",
    "OCA l10n_fr_siret (SIREN/SIRET with checksum validation)",
    "OCA l10n_fr_das2 (DAS2 fee reporting)"
   ],
   "native": [
    "Chart of accounts, fiscal positions and tax configuration for companies based in mainland France (l10n_fr_account). The module is scoped to mainland France, so overseas departments need separate handling.",
    "French VAT report export that can be sent to the DGFiP, an OGA or an accountant (l10n_fr_reports).",
    "POS anti-fraud certification under CGI article 286 I-3 bis (l10n_fr_pos_cert).",
    "Mandatory e-invoicing. Odoo completed the DGFiP registration and is an approved platform, and ships l10n_fr_pdp to send and receive through it, plus l10n_fr_pdp_pos for POS e-reporting. Activation is in Accounting or Invoicing, Configuration, Settings, French Electronic Invoicing.",
    "Factur-X and UBL generation, and Chorus Pro submission for public-sector customers (l10n_fr_facturx_chorus_pro).",
    "FEC import for loading opening balances and prior-year history (l10n_fr_fec_import)."
   ],
   "custom": [
    "French payroll. France is not on Odoo's payroll localization list and l10n_fr_hr_payroll_account only carries the accounting postings. DSN generation, URSSAF contribution logic, conventions collectives and the bulletin de paie layout are not in the box. Budget for a separate payroll tool plus an interface, not an Odoo payroll build.",
    "Partner and product master data for the four new mandatory invoice mentions. Buyer SIREN on every B2B partner, delivery address when it differs, and operation nature per line. This is a data cleanup project across the customer master, and it is where go-lives slip.",
    "Annuaire routing. Wrong or stale SIREN and SIRET on customer records is the main cause of invoices that never reach the recipient's platform. Build validation and a monitoring view for undelivered invoices and returned lifecycle statuses before go-live.",
    "Lifecycle status handling. The platform sends statuses back and the business has to act on rejections. Standard Odoo screens will usually need extending into a proper exception queue.",
    "FEC export, CA3 and CA12 filing forms, and DAS2 all sit in OCA modules rather than the standard localization, so a Community or Enterprise stack needs those pulled in and version-matched.",
    "Anything beyond the VAT report: liasse fiscale, CVAE, and OGA-specific exports."
   ]
  },
  "openQuestions": 18
 },
 "united-states": {
  "einvoicing": {
   "scheme": "No national scheme. DBNAlliance Exchange Framework (voluntary industry network) plus the Invoice Processing Platform (IPP) for federal procurement.",
   "authority": "None at federal level for B2B. The DBNAlliance governs the voluntary exchange network. The US Department of the Treasury runs IPP, under OMB Memorandum M-15-19 issued 17 July 2015.",
   "status": "There is no US federal or nationwide B2B e-invoicing mandate as of 22 August 2026, and no VAT to drive one. The only compulsory piece is federal procurement: OMB M-15-19 directed agencies to move to electronic invoicing by the end of FY 2018, and many now require vendors to bill through Treasury's IPP.",
   "appliesTo": "No US business is obliged to e-invoice its private-sector customers. Suppliers selling to federal agencies must submit invoices through whatever electronic solution the agency adopted, commonly Treasury's IPP. DBNAlliance participation is by voluntary membership; current members include Microsoft, Chevron and Halliburton.",
   "requirements": [
    "Nothing for domestic B2B. Adoption is market-driven, not government-mandated, because the US has no VAT and no transaction-level tax reporting requirement.",
    "OMB M-15-19 directed agencies, by the end of FY 2018, to transition to electronic invoicing for appropriate federal procurements by one of three routes: migrating to a designated Federal Shared Service Provider and adopting its e-invoicing solution, using an OMB-approved e-invoicing solution, or ceasing investment in new e-invoicing solutions.",
    "The same memo defines electronic invoicing as payment requests managed as structured data elements exchanged through electronic workflow, with minimal manual interaction, and directs solution providers to integrate with the Integrated Award Environment including SAM, and to expose web services or APIs.",
    "In practice, a federal vendor keys or uploads invoices into IPP and matches on its SAM registration. There is no Odoo connector for this, so it is a parallel manual step.",
    "DBNAlliance runs a Peppol-style four-corner exchange network for B2B e-invoices and e-documents. Joining is an onboarding process, and it recently launched a mass adoption API. Treat it as a customer-driven requirement (a large buyer asks for it) rather than a legal one."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "There is no federal sales tax and no VAT. Forty-five states levy a state-level sales tax; Alaska, Delaware, Montana, New Hampshire and Oregon do not. California has the highest state-level rate at 7.25 percent. Thirty-eight states allow local sales taxes on top, including Alaska which has no statewide tax, and local rates can rival or exceed state rates.",
    "verified": true
   },
   {
    "claim": "Sales tax registration is driven by economic nexus after South Dakota v. Wayfair. The most common test is 100,000 dollars in sales or 200 separate transactions in the current or previous calendar year, but six different threshold patterns exist across states, including 250,000 and 500,000 dollar variants with different measurement periods.",
    "verified": true
   },
   {
    "claim": "States are dropping the 200-transaction test. As of 1 August 2026, 17 states had eliminated it, including Illinois effective 1 January 2026 and Kentucky effective 1 August 2026. Any nexus logic hard-coded in an ERP needs a review schedule, not a one-time setup.",
    "verified": true
   },
   {
    "claim": "Form 1099-K: the One Big Beautiful Bill retroactively reinstated the pre-American Rescue Plan threshold. Third party settlement organisations are not required to file unless gross reportable payments to a payee exceed 20,000 dollars and the number of transactions exceeds 200.",
    "verified": true
   },
   {
    "claim": "Forms 1099-NEC and 1099-MISC: the reporting threshold rises from 600 dollars to 2,000 dollars, effective for tax year 2026, and will be inflation-adjusted from 2027. This changes which vendors an ERP has to flag.",
    "verified": true
   },
   {
    "claim": "Filers of 10 or more information returns in a calendar year must file them electronically.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "FICA: Social Security is 6.2 percent on the employer and 6.2 percent on the employee, 12.4 percent combined. Medicare is 1.45 percent each side, 2.9 percent combined. An Additional Medicare Tax of 0.9 percent applies to employee wages above 200,000 dollars a year, withheld by the employer with no employer match.",
    "verified": true
   },
   {
    "claim": "The Social Security wage base limit is 184,500 dollars for 2026. There is no wage base limit for Medicare tax.",
    "verified": true
   },
   {
    "claim": "FUTA is 6.0 percent on the first 7,000 dollars of wages per employee, reduced by a credit of up to 5.4 percent when Form 940 is filed, giving a common net rate of 0.6 percent. Credit reduction states are announced by the Department of Labor after the 10 November deadline each year.",
    "verified": true
   },
   {
    "claim": "Federal tax deposits must be made by electronic funds transfer, on a monthly or semi-weekly schedule set annually by liability. FUTA deposits are only required when quarterly tax exceeds 500 dollars.",
    "verified": true
   },
   {
    "claim": "Reporting forms: Form 941 quarterly for most employers, Form 943 for agricultural employers, Form 944 annually if the IRS notifies you, Form 945 for nonpayroll withholding, Form 940 annually for FUTA, Form W-2 to employees and Form W-3 to the Social Security Administration by 31 January.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "The FASB sets GAAP for nongovernmental entities and the FASB Accounting Standards Codification has been the single official source of authoritative US GAAP since 15 September 2009. There is no statutory chart of accounts imposed by the government, no SAF-T equivalent and no mandated ledger export file.",
    "verified": true
   },
   {
    "claim": "Because no chart of accounts is imposed, the l10n_us module's GAAP-oriented chart is a starting template, not a legal requirement. Odoo structures it around seven categories: Receivable, Payable, Equity, Assets, Liability, Income and Expenses. You can and often should restructure it to match the client's reporting.",
    "verified": true
   },
   {
    "claim": "The audit-file question that dominates European Odoo projects does not exist here. The US compliance load sits in sales tax across up to 45 state regimes plus local jurisdictions, and in 1099 and payroll reporting, not in ledger format.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "The default gateway for US direct to consumer brands, and US sits in the supported country list inside Odoo 19's Stripe module. One US Stripe account covers cards, ACH Direct Debit, Cash App Pay, Affirm, Klarna, Afterpay, Link and Amazon Pay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Authorize.Net",
    "kind": "local gateway",
    "note": "One of the oldest US gateways and still the thing sitting in front of a lot of established US merchant accounts, so an Odoo migration usually has to keep it. Odoo 19's module turns on ACH Direct Debit alongside cards by default.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global wallet",
    "note": "Still an expected second button on US checkouts and the account many US shoppers pay from without re entering card details. Odoo 19 ships the PayPal provider and supports USD.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "The usual pick once a US retailer runs stores and a website on one contract, or is selling into Europe as well. Its Odoo 19 mapping includes ACH, Cash App Pay and Apple Pay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "ACH Direct Debit",
    "kind": "bank direct debit",
    "note": "The US bank to bank rail behind eCheck payments and the cheapest way to collect large B2B invoices instead of eating card interchange. Odoo 19 reaches it two native ways: Authorize.Net enables it by default, and Stripe maps it to us_bank_account for USD and US customers.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Cash App Pay",
    "kind": "mobile wallet",
    "note": "Block's Cash App at checkout, USD and US customers only, and a real conversion lever for younger US buyers who keep a balance there. Odoo 19's Stripe module maps cash_app_pay to Stripe's cashapp, so a US Stripe account reaches it with no extra module.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Apple Pay and Google Pay",
    "kind": "mobile wallet",
    "note": "Most US mobile checkout traffic expects one of these buttons before a card form. Odoo 19's Stripe provider ships express checkout, which Odoo's own field help describes as paying with Google Pay and Apple Pay.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Discover",
    "kind": "domestic card scheme",
    "note": "A US based card network that plenty of American shoppers carry and that plain international card setups sometimes decline. Odoo 19 turns Discover on by default with Stripe, Adyen, Authorize.Net, Worldline, Buckaroo and Nuvei.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Affirm",
    "kind": "BNPL",
    "note": "US instalment lender used on higher ticket items such as furniture, bikes and electronics, where it moves basket size. Stripe supports it for US and Canadian businesses in USD, and Odoo 19 ships an Affirm payment method record.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Klarna",
    "kind": "BNPL",
    "note": "Stripe lists the US among the business locations that can accept Klarna in USD. Odoo 19 ships Klarna plus the separate Klarna Pay Now and Klarna Pay over time methods so you can expose the right one.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Afterpay",
    "kind": "BNPL",
    "note": "Pay in four provider with real US apparel and beauty volume. Odoo 19's Stripe module maps both afterpay and clearpay to Stripe's afterpay_clearpay, and Stripe supports it for US businesses in USD.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Amazon Pay",
    "kind": "global wallet",
    "note": "Lets a US shopper check out with the address and card already on their Amazon account, which cuts form abandonment. Stripe supports amazon_pay for US businesses and Odoo 19 ships an Amazon Pay payment method record.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Wire transfer and check",
    "kind": "bank transfer",
    "note": "US B2B still settles a lot of invoices by paper check and by wire, so the order has to sit unpaid until the finance team reconciles it. Odoo 19 ships Wire Transfer as a bank payment method that prints your bank details and a payment reference at checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Venmo",
    "kind": "mobile wallet",
    "note": "PayPal owned and US only, and a habit for younger American buyers. Odoo 19's native PayPal module only switches on the PayPal method, so Venmo needs a Braintree connector from the store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Square",
    "kind": "local gateway",
    "note": "The stack under most US small retail, restaurants and services, so an Odoo project usually has to keep taking payments there and reconcile them. Odoo does not ship a Square provider, but eleven connectors cover 19.0, including a free one from Silver Touch.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Braintree",
    "kind": "local gateway",
    "note": "PayPal's US gateway and the single integration that gets you PayPal, Venmo, cards, Apple Pay and Google Pay at once. Sixteen connectors cover Odoo 19, several of them adding Braintree ACH.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Checkout.com",
    "kind": "global gateway",
    "note": "Turns up with larger US merchants who want their own acquiring relationships and cross border processing. Not native to Odoo, but seven connectors cover 19.0.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "NMI",
    "kind": "local gateway",
    "note": "A US gateway that sits behind a lot of ISO and reseller merchant accounts, so it appears when a client came in through a payments broker rather than direct. Paid Odoo 19 connectors exist for both card and eCheck ACH.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sezzle",
    "kind": "BNPL",
    "note": "US pay in four provider offering Pay in 4, Pay in 5 and monthly plans, plus a Sezzle Anywhere virtual card. The only Odoo module on the store stops at 14.0, so Odoo 19 needs a build or a route through an acquirer that already carries it.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "FedNow Service",
    "kind": "instant bank transfer",
    "note": "The Federal Reserve's instant payment service, live and used by US banks for round the clock account to account settlement. It shows up in US B2B collections rather than at web checkout, so in Odoo it lands as a bank transfer you reconcile.",
    "support": "custom_build",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "USPS",
    "kind": "national post",
    "note": "Reaches every US residential address and is the cheapest route for light parcels, which is why US ecommerce sellers rate shop against it constantly. Odoo 19 ships a direct USPS connector that needs a USPS business account through the Business Customer Onboarding Portal, and it offers USPS Domestic Service and USPS International Service.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "domestic express",
    "note": "One of the two national ground and air networks US shippers negotiate rates with, and the usual default for B2B pallets and heavier parcels. Odoo 19 ships a UPS connector.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "domestic express",
    "note": "The other national network, and the one most US merchants keep as a second contract so they can play rates off against UPS. Odoo 19 ships a FedEx connector.",
    "support": "native",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "Used from the US mainly for international air freight and express export rather than domestic ground. Odoo 19 ships a DHL Express connector and its doc says plainly that other DHL services are not supported.",
    "support": "native",
    "verified": true
   },
   {
    "name": "EasyPost",
    "kind": "aggregator",
    "note": "The one shipped Odoo 19 connector aimed at North America, and the practical way to reach US regional carriers that have no Odoo module of their own. Odoo's doc calls it a service that connects you to multiple carriers and requires an EasyPost business account with test and production API keys, so that account and its fees are a dependency.",
    "support": "native",
    "verified": true
   },
   {
    "name": "OnTrac",
    "kind": "last mile",
    "note": "Calls itself the largest alternative carrier network in the country, running coast to coast ecommerce ground seven days a week, and DTC brands use it to undercut UPS and FedEx ground. No OnTrac module exists on the Odoo store, so it comes in through EasyPost or ShipStation and that aggregator account plus its fees are a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "GLS US",
    "kind": "domestic express",
    "note": "Regional western US parcel carrier with more than 27 locations plus US to Canada cross border, strong with wine and spirits, perishables and healthcare shippers on the West Coast. Softhealer sells a GLS United States connector for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Veho",
    "kind": "last mile",
    "note": "US last mile carrier built for ecommerce brands, delivering next day and two day including weekends and holidays. There is no Odoo connector, but EasyPost lists Veho among its carriers, so it arrives through the native EasyPost integration and needs an EasyPost account.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Amazon Shipping",
    "kind": "last mile",
    "note": "Amazon sells delivery for orders that were not placed on Amazon, and US sellers use it as a cheaper residential option. No Odoo module exists for it, so it comes through EasyPost with an EasyPost account behind it.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "ShipStation",
    "kind": "aggregator",
    "note": "The shipping desk a large share of US ecommerce teams already work in every day, especially anyone who came from Shopify or Amazon. Odoo does not ship a ShipStation connector, so it is a paid store module plus a ShipStation subscription, and fourteen connectors cover 19.0 including a free multi instance one from Globalteckz.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Shippo",
    "kind": "aggregator",
    "note": "Multi carrier label buying that smaller US merchants use to get discounted USPS and UPS rates without their own contracts. Not native to Odoo, so it needs a paid store connector plus a Shippo account.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "ShipEngine",
    "kind": "aggregator",
    "note": "The API layer US developers reach for when they want rates and labels across USPS, UPS and FedEx from one place. Odoo does not ship it, so it is a paid store connector plus a ShipEngine account.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Estes Express Lines",
    "kind": "LTL freight",
    "note": "A major US less than truckload carrier, which is what wholesalers and manufacturers running Odoo actually ship once orders go on pallets. Odoo ships no LTL support at all, but a paid Odoo 19 connector handles freight booking, rating, bills of lading and tracking from the sales and delivery orders.",
    "support": "third_party_paid",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_us (United States - Accounting)",
    "l10n_us_reports (US accounting reports)",
    "l10n_us_check_printing (pre-printed check layouts)",
    "l10n_us_payment_nacha (NACHA ACH file export)",
    "l10n_us_1099 (1099 data for third-party e-filing)",
    "account_avatax (Avalara AvaTax integration)",
    "l10n_us_hr_payroll (US payroll rules)",
    "l10n_us_hr_payroll_account (payroll accounting)",
    "l10n_us_hr_payroll_adp (work entry export to ADP)"
   ],
   "native": [
    "GAAP-oriented chart of accounts across Receivable, Payable, Equity, Assets, Liability, Income and Expenses, plus US financial statement reports (l10n_us, l10n_us_reports).",
    "Check printing on the three common pre-printed positions, top, middle and bottom (l10n_us_check_printing). Still a live requirement for a lot of US AP.",
    "NACHA file export so vendor and payroll payments can be uploaded to the bank (l10n_us_payment_nacha).",
    "1099 data prepared for e-filing through a third party (l10n_us_1099).",
    "Avalara AvaTax for sales tax rate lookup, jurisdiction assignment and product taxability (account_avatax). This is the practical answer to 45 state regimes plus local add-ons.",
    "US payroll rules, contracts, allowances, deductions and payslips, with an ADP work-entry export (l10n_us_hr_payroll, l10n_us_hr_payroll_adp)."
   ],
   "custom": [
    "Sales tax without AvaTax. Odoo's native tax engine will not track economic nexus, jurisdiction boundaries or product taxability across 45 states with local add-ons. The decision is buy AvaTax or accept manual rate maintenance, and it should be made before the project starts, not during UAT.",
    "Nexus monitoring. Nothing in Odoo tells you that you crossed a state's threshold, and thresholds keep moving as states drop the 200-transaction test. That is a reporting build or a subscription to a nexus service.",
    "Sales tax return filing. Odoo prepares data; the return goes through Avalara or a filing service.",
    "Payroll tax filing and deposits. Odoo produces payslips and journal entries. Forms 941, 940, W-2 and W-3, EFTPS deposits, state withholding registrations and SUTA are not in the box. Most US Odoo clients keep ADP, Gusto or Paychex and use l10n_us_hr_payroll_account for the postings.",
    "Federal government invoicing. There is no IPP connector and no DBNAlliance connector in Odoo, and Odoo's Peppol support does not list the United States as an eligible country. Federal vendors submit into IPP separately."
   ]
  },
  "openQuestions": 19
 },
 "canada": {
  "einvoicing": {
   "scheme": "No national e-invoicing scheme. Federal B2G e-invoicing over Peppol using UBL, plus a Quebec sector fiscalisation regime (WEB-SRM)",
   "authority": "No Peppol Authority exists for Canada. The Canada Revenue Agency sets invoice and record-keeping rules; Revenu Quebec runs the Quebec sales recording regime",
   "status": "Canada has no B2B or B2C e-invoicing mandate as of 2026-08-22, and a PDF invoice is still legally fine. E-invoicing only bites in federal procurement and in two Quebec sectors.",
   "appliesTo": "Suppliers to the federal government, where the buying department requires electronic invoices. Separately, Quebec restaurants, bars, caterers and food trucks must run a certified sales recording system that reports to Revenu Quebec.",
   "requirements": [
    "Nothing structured for ordinary domestic B2B trade: no XML, no clearance, no real-time reporting, no QR code, no accredited intermediary.",
    "Federal government e-invoices are exchanged in UBL format, over the Peppol network, which was introduced in Canada in 2018.",
    "Records supporting a GST/HST position must be archived for 6 years from the end of the fiscal year, and the system must preserve confidentiality, integrity and availability. Archiving abroad is allowed with conditions.",
    "Quebec restaurants: a certified sales recording system feeding the WEB-SRM cloud. New businesses registered after 1 November 2023 had to use WEB-SRM immediately; established businesses had until 31 May 2025 to move off a physical SRM.",
    "Canada is not on the Peppol Authority list, so there is no domestic Peppol governance body or Canadian identifier scheme to register with."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "GST is 5%. In HST provinces a single combined tax applies instead: 13% in Ontario, 15% in New Brunswick, Newfoundland and Labrador and Prince Edward Island, and 14% in Nova Scotia.",
    "verified": true
   },
   {
    "claim": "Quebec charges QST at 9.975% on top of the 5% GST. British Columbia and Manitoba charge 7% PST, Saskatchewan 6%. Alberta and the three territories have no retail sales tax. An Odoo setup therefore needs province-driven fiscal positions, not one tax.",
    "verified": true
   },
   {
    "claim": "The GST/HST registration threshold is CAD 30,000 of sales to Canadian consumers annually.",
    "verified": true
   },
   {
    "claim": "Filing frequency follows annual taxable revenue: annual up to CAD 1.5 million, quarterly from CAD 1.5 million to CAD 6 million, monthly above CAD 6 million. Monthly and quarterly returns are due one month after period end; annual returns three months after fiscal year end.",
    "verified": true
   },
   {
    "claim": "Regulation 105 requires 15% withholding on fees, commissions and other service payments to a non-resident for work performed in Canada, unless a waiver is obtained beforehand. This has to be modelled on vendor bills.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "CPP for 2026: maximum employee contribution CAD 4,646.45. Quebec runs its own QPP, maximum CAD 4,895.30. Self-employed pay double, up to CAD 9,292.90 (CAD 9,790.60 in Quebec).",
    "verified": true
   },
   {
    "claim": "Employment Insurance for 2026: maximum employee premium CAD 1,123.07 outside Quebec and CAD 895.70 in Quebec, where the Quebec Parental Insurance Plan adds up to CAD 442.90 for employees.",
    "verified": true
   },
   {
    "claim": "CPP contributions comprise a base amount, an enhanced amount for all participants, and an additional amount for higher earners. A payroll engine needs two earnings ceilings, not one, and has to split the deductible and credit-eligible portions.",
    "verified": true
   },
   {
    "claim": "A Record of Employment must be issued within five calendar days of a qualifying interruption of earnings, normally filed through Service Canada's ROE Web.",
    "verified": false
   },
   {
    "claim": "Bulk payment and direct deposit files use the Payments Canada CPA005 record format, which Odoo's Canadian localisation generates.",
    "verified": false
   }
  ],
  "accounting": [
   {
    "claim": "Corporations file their balance sheet and income statement with the T2 return using CRA General Index of Financial Information (GIFI) codes, carried on schedules 100 (balance sheet) and 125 (income statement). Design the chart of accounts with a GIFI mapping from day one or the year-end becomes a manual re-coding exercise.",
    "verified": false
   },
   {
    "claim": "There is no government-mandated chart of accounts and no SAF-T style audit file export. Odoo ships its own Canadian chart of accounts with seven account groups: Receivable, Payable, Equity, Assets, Liability, Income, Expenses.",
    "verified": false
   },
   {
    "claim": "Accounting records supporting a GST/HST position must be kept for 6 years from the end of the fiscal year, with integrity and availability preserved.",
    "verified": true
   }
  ],
  "payments": [
   {
    "name": "Interac Debit",
    "kind": "domestic card scheme",
    "note": "Interac is Canada's own debit network and Interac Debit is what most Canadian shoppers reach for at checkout instead of a credit card. An Odoo store that only accepts Visa and Mastercard will lose baskets to it.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Interac e-Transfer",
    "kind": "instant bank transfer",
    "note": "Interac e-Transfer moves money between Canadian bank accounts using an email address or mobile number, and Canadian businesses use it for both invoices and customer payments. It has no Odoo provider, so most merchants take it as an offline method against Odoo's built in Wire Transfer and reconcile by hand.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Interac Direct (via Konek)",
    "kind": "instant bank transfer",
    "note": "Interac's newer card free option lets a shopper pay online straight from their bank account through the Konek platform. It is worth naming because it is the first real pay by bank checkout button in Canada and no Odoo connector exists for it yet.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Moneris",
    "kind": "local gateway",
    "note": "Moneris is one of the acquirers Canadian merchants sign with to take cards and Interac Debit online. The Odoo apps store carries several Moneris Checkout connectors built for Odoo 19, so this is a solved integration rather than a build.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Nuvei",
    "kind": "global gateway",
    "note": "Nuvei is headquartered in Montreal and offers Canada Bank Transfer with Interac alongside card acquiring. It is one of the few providers that ships with Odoo 19 out of the box and can still reach Interac, which makes it the shortest path for a Canadian Odoo store.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe lists Canada as a supported country for businesses, so a Canadian company can open an account directly. Odoo 19 ships the Stripe connector and Stripe is the only provider Odoo lists for express checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal is available in over 200 countries and regions and is a common second button on Canadian checkouts. Odoo 19 ships it natively and PayPal charges no subscription fee, which suits low volume stores.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Square",
    "kind": "local gateway",
    "note": "Square runs a Canadian operation with local pricing, GST and HST handling, and it accepts debit, contactless and Afterpay. It matters for Canadian retailers who already use Square in store and want the same account behind their Odoo website.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Helcim",
    "kind": "local gateway",
    "note": "Helcim is based in Calgary and sells card processing, online invoicing, payment links and recurring billing to Canadian and US small businesses, with faster deposits via Interac e-Transfer. It suits smaller Odoo buyers who want a Canadian counterparty rather than a global platform.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Affirm (formerly PayBright)",
    "kind": "BNPL",
    "note": "PayBright, the Canadian buy now pay later brand, is now Affirm, and Affirm runs a Canadian site in English and French. If a Canadian shopper expects instalments at checkout, this is the name they know.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Afterpay",
    "kind": "BNPL",
    "note": "Afterpay is accepted by Canadian merchants and Square lists it as one of the payment types it processes in Canada. The Odoo apps store carries Afterpay payment connectors built for Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sezzle",
    "kind": "BNPL",
    "note": "Sezzle offers pay in four and monthly instalments and maintains a Canadian store directory, so Canadian shoppers encounter it. There is no Odoo connector, so it needs building against Sezzle's API.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Bank transfer / EFT",
    "kind": "instant bank transfer",
    "note": "Canadian B2B buyers routinely settle invoices by electronic funds transfer rather than card, which avoids interchange on large orders. Odoo 19 ships a Wire Transfer method that handles this as an offline payment with manual confirmation.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Real-Time Rail (RTR)",
    "kind": "instant bank transfer",
    "note": "Payments Canada's Real-Time Rail is scheduled to launch in Q4 2026 and is in industry solution assurance testing with participants. It is not live yet, so plan Odoo checkouts around Interac and card rails today and treat RTR as a later phase.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Apple Pay and Google Pay",
    "kind": "mobile wallet",
    "note": "Canadian shoppers pay with wallets on phones both in store and online, and Square lists digital wallets among the payment types it takes in Canada. In Odoo 19 these are reached through the native Stripe connector, which is the only provider Odoo lists as supporting express checkout.",
    "support": "native",
    "verified": false
   },
   {
    "name": "Authorize.Net",
    "kind": "global gateway",
    "note": "Authorize.Net is a United States based provider that ships with Odoo 19, and Canadian merchants often inherit it from an existing US processing relationship. Note that its ACH support is USA only, so it does not solve Canadian bank debits.",
    "support": "native",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "Canada Post",
    "kind": "national post",
    "note": "Canada Post is the national postal operator and the default carrier for consumer parcels, including addresses no courier wants to serve. Odoo 19 does not ship a Canada Post connector, so you either buy one from the apps store or reach it through EasyPost.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Purolator",
    "kind": "domestic express",
    "note": "Purolator is one of the core Canadian courier options resold by Canadian shipping platforms such as FlagShip and Stallion Express. Several Odoo 19 connectors exist on the apps store covering rates, labels, tracking and returns.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Canpar Express",
    "kind": "domestic express",
    "note": "Canpar Express is a Canadian parcel specialist founded in 1976 and owned by TFI International, with SMARTSpots drop off points and return tag services. In Odoo it is reached through EasyPost, which lists Canpar ground, express and overnight services.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "GLS Canada (formerly Dicom)",
    "kind": "domestic express",
    "note": "GLS Canada runs parcel, LTL and full truckload freight from over 65 Canadian locations, which suits sellers who ship both small parcels and pallets. There is no Odoo connector, so it is normally reached through a Canadian reseller such as FlagShip.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Loomis Express",
    "kind": "domestic express",
    "note": "Loomis Express is a Canadian courier owned by TFI International, offering ground through to next day 9AM delivery plus CollectShip returns and export to over 220 countries. No Odoo connector exists, so integration is a build against its API.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "UniUni",
    "kind": "last mile",
    "note": "UniUni is an ecommerce focused last mile network claiming 80 percent Canadian coverage and cross border pickups from the US into Canada. EasyPost lists UniUni as an edge carrier, which is how an Odoo store reaches it.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS carries a large share of Canadian business express and cross border volume and is one of the carriers Canadian resellers front. It is one of the few carriers Odoo 19 ships a connector for, so rates and labels work without buying anything.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx is standard for Canadian express and US bound shipments and appears in every Canadian reseller's carrier list. Odoo 19 ships a FedEx connector natively.",
    "support": "native",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express handles international air freight out of Canada where Canada Post international is too slow. Odoo 19 ships the DHL Express connector, but note that Odoo's documentation says other DHL services are not supported.",
    "support": "native",
    "verified": true
   },
   {
    "name": "EasyPost",
    "kind": "aggregator",
    "note": "EasyPost is the only aggregator Odoo 19 ships for North America and it is how a Canadian Odoo store reaches Canada Post, Canpar and UniUni without buying a per carrier connector. The Odoo connector is free but the EasyPost account and its fees are a required dependency.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FlagShip",
    "kind": "aggregator",
    "note": "FlagShip is a Canadian authorised reseller giving smaller shippers discounted rates across Purolator, UPS, FedEx, Canpar, DHL and GLS from one account. A FlagShip connector for Odoo 19 is sold on the apps store, and the FlagShip account is a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Stallion Express",
    "kind": "aggregator",
    "note": "Stallion Express resells Canada Post, Purolator, USPS, UPS, FedEx, UniUni, ICS Courier, Fleet Optics, PostNL and APC to Canadian online sellers, with pickups in major Canadian cities. There is no Odoo connector, so it is an API build, and the Stallion account is a required dependency.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Chit Chats",
    "kind": "aggregator",
    "note": "Chit Chats is built for Canadian sellers shipping into the United States and internationally, including delivered duty paid, customs clearance and CUSMA certification. It publishes API documentation and store integrations but has no Odoo connector.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Intelcom / Dragonfly",
    "kind": "last mile",
    "note": "Close to 500,000 parcels a day across Canada and Amazon's main Canadian last-mile partner. Trades as Dragonfly outside Quebec and Intelcom within it. No native Odoo connector.",
    "support": "custom_build",
    "verified": true
   }
  ],
  "odoo": {
   "modules": [
    "l10n_ca",
    "l10n_ca_reports",
    "l10n_ca_check_printing"
   ],
   "native": [
    "Canadian chart of accounts with the standard account groups (Receivable, Payable, Equity, Assets, Liability, Income, Expenses).",
    "Sales and purchase taxes with provincial variation, plus 13 provincial and territorial fiscal positions (AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT) and an International one, so the right GST/HST/PST/QST combination is applied by customer province.",
    "Cheque printing in three North American pre-printed layouts: check on top (Quicken/QuickBooks standard), check in the middle (Peachtree standard), check on the bottom (ADP standard).",
    "CPA005 EFT file generation for electronic funds transfer payments.",
    "Balance sheet, profit and loss and cash flow statement reports via l10n_ca_reports."
   ],
   "custom": [
    "Payroll, all of it. Canada does not appear in Odoo 19's list of supported payroll localizations, so CPP and the second additional CPP tier, EI, federal and provincial tax tables, T4 and T4A slips and the ROE need a third-party app from the Odoo apps store or a custom build.",
    "GIFI. The Canadian localisation documentation does not mention GIFI codes, so the mapping from your chart of accounts to schedules 100 and 125 is your job.",
    "Interac. No Odoo payment provider ships for Interac Debit or Interac e-Transfer, so account-to-account collection and reconciliation is a build.",
    "Quebec WEB-SRM. No Odoo module is documented for the certified sales recording system, so a Quebec restaurant or bar POS deployment needs a certified integration built and attested."
   ]
  },
  "openQuestions": 24
 },
 "australia": {
  "einvoicing": {
   "scheme": "eInvoicing, on the Peppol network, using the PINT A-NZ Billing specification",
   "authority": "Australian Taxation Office, acting as the Australian Peppol Authority",
   "status": "Australia uses Peppol post-audit exchange, not clearance: the invoice goes supplier access point to buyer access point and the ATO never sees it. There is no B2B mandate; the obligations sit on Commonwealth government buyers.",
   "appliesTo": "Commonwealth government agencies. All federal agencies have had to be able to receive Peppol e-invoices since 1 July 2022. Non-corporate Commonwealth entities must be receiving at least 30% of invoices by e-invoicing from 1 July 2026 and must be able to process and send e-invoices automatically by December 2026. Private-sector B2B use stays voluntary: the proposed Business eInvoicing Right was never enforced.",
   "requirements": [
    "Peppol four-corner model. You connect to an accredited access point, not to the ATO. There is no clearance step, no government invoice approval, no QR code and no fiscal seal.",
    "PINT A-NZ Billing is the format, replacing the earlier A-NZ Peppol BIS 3.0 profile. PINT A-NZ Billing Process v1.1.2 carries a release date of 21 November 2025.",
    "An invoice that meets the A-NZ Invoice Specification counts as a valid Australian tax invoice even without the words 'tax invoice' or 'GST invoice', provided all mandatory data fields are present.",
    "Compliance sits with the government entity, not the supplier. Suppliers are legally free to keep sending PDFs, although the ATO encourages agencies to make e-invoicing a contractual requirement.",
    "Non-corporate Commonwealth entities report progress quarterly to the Australian Peppol Authority."
   ],
   "verified": true
  },
  "tax": [
   {
    "claim": "GST is 10% on most goods, services and other items sold or consumed in Australia. The federal government levies it and distributes the revenue to the states.",
    "verified": true
   },
   {
    "claim": "GST registration is compulsory at AUD 75,000 GST turnover, AUD 150,000 for non-profits, and from the first dollar for taxi, limousine and ride-sourcing operators and for anyone claiming fuel tax credits. You have 21 days to register once you know you will cross the threshold.",
    "verified": true
   },
   {
    "claim": "GST and PAYG withholding are reported on the Business Activity Statement. BAS due dates can be quarterly, monthly or yearly depending on the taxpayer, and the ATO assigns the cycle.",
    "verified": true
   },
   {
    "claim": "Payroll tax is a state tax, not federal, so an Australian Odoo build has to carry per-state rates and thresholds. New South Wales is 5.45% with an AUD 1,200,000 annual exemption threshold; Victoria is 4.85% general and 1.2125% for regional employers with an AUD 1 million threshold from 1 July 2025.",
    "verified": true
   },
   {
    "claim": "PAYG instalments: all companies with turnover of AUD 20 million or more pay monthly, most others monthly or quarterly. Companies with annual tax below AUD 8,000 that are not GST-registered are outside the instalment system. Small and medium businesses may opt into monthly reporting and payment from 1 July 2027.",
    "verified": true
   }
  ],
  "payroll": [
   {
    "claim": "The superannuation guarantee rate is 12% of an employee's ordinary time earnings for FY2026.",
    "verified": true
   },
   {
    "claim": "Payday super started on 1 July 2026. Employers must pay SG contributions on each payday and the money must be received by the fund within seven business days of that payday. The legislation received royal assent on 6 November 2025.",
    "verified": true
   },
   {
    "claim": "Payday super replaces ordinary time earnings with 'qualifying earnings' as the single base for both the SG amount and the SG charge. All commissions are now qualifying earnings, and salary-sacrificed amounts relating to qualifying earnings are included. STP and SuperStream reporting change with it.",
    "verified": true
   },
   {
    "claim": "Under the new SG charge, paying late no longer clears the liability: notional earnings and an administrative uplift remain payable, and the uplift starts at 60% of the shortfall with reductions available for voluntary disclosure depending on timing.",
    "verified": true
   },
   {
    "claim": "Single Touch Payroll: tax and super information is reported to the ATO from STP-enabled software every time employees are paid, and STP Phase 2 has extended what must be reported. An end-of-year finalisation declaration is due by 14 July.",
    "verified": true
   }
  ],
  "accounting": [
   {
    "claim": "Accounting standards are made by the Australian Accounting Standards Board, a government agency, under section 334 of the Corporations Act 2001.",
    "verified": true
   },
   {
    "claim": "Disclosing entities, registered schemes and registrable superannuation entities lodge complete financial reports with ASIC within three months after financial year end. All other entities have four months. Lodgement uses Form 388 unless the entity lodges with ASX, NSX, Cboe Australia or SSX instead.",
    "verified": true
   },
   {
    "claim": "Entities required to lodge include disclosing entities, public companies, companies limited by guarantee other than small ones, large proprietary companies, registered schemes, registrable superannuation entities, foreign-controlled small proprietary companies, and small proprietary companies with crowd-sourced funding shareholders.",
    "verified": true
   },
   {
    "claim": "There is no statutory chart of accounts and no SAF-T style audit file. Odoo's l10n_au ships its own Australian chart of accounts and GST tax set.",
    "verified": false
   }
  ],
  "payments": [
   {
    "name": "eftpos",
    "kind": "domestic card scheme",
    "note": "eftpos is Australia's own debit card network, running on over 70 million debit cards, and it now supports online payments through EMV 3DS authentication and tokenisation. Merchant Choice Routing means an Australian merchant can route eftpos transactions themselves, which is a live cost conversation for any Odoo store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "BPAY",
    "kind": "instant bank transfer",
    "note": "BPAY is how Australian customers pay bills from their online banking using a biller code and a Customer Reference Number, and over 25 financial institutions support it. For an Odoo buyer this means invoices need a CRN printed on them and a reconciliation process, which is a real configuration job.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "PayID (New Payments Platform / Osko)",
    "kind": "instant bank transfer",
    "note": "A PayID is a mobile number, email address, ABN or organisation identifier linked to a bank account, offered by over 100 Australian financial institutions, and the payer sees the account holder name before confirming. Australian businesses use it to get paid within minutes instead of waiting on a batch file.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "PayTo",
    "kind": "instant bank transfer",
    "note": "PayTo lets a customer authorise a business to take payments from their bank account under an agreement they manage in their own online banking, and Amazon Australia already offers it at checkout. It is the modern replacement for direct debit forms and matters for any Odoo subscription or recurring billing setup.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "BECS Direct Entry",
    "kind": "instant bank transfer",
    "note": "Direct Entry, run through the Bulk Electronic Clearing System, carries Australian direct credits such as payroll and supplier payments and direct debits collected from customers, up to 100 million dollars per payment. A free community Odoo 19 module for GoCardless lists BECS among its supported schemes.",
    "support": "oca_or_community",
    "verified": true
   },
   {
    "name": "Stripe",
    "kind": "global gateway",
    "note": "Stripe lists Australia as a supported country for businesses, so an Australian company can open an account directly. Odoo 19 ships the Stripe connector and Stripe is the only provider Odoo lists as supporting express checkout, which is how Apple Pay and Google Pay appear on the cart.",
    "support": "native",
    "verified": true
   },
   {
    "name": "PayPal",
    "kind": "global gateway",
    "note": "PayPal is available in over 200 countries and regions and remains a familiar second button for Australian shoppers. Odoo 19 ships it natively with no subscription fee, which suits lower volume stores.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Airwallex",
    "kind": "local gateway",
    "note": "Airwallex sells checkout, payment links and ecommerce plugins to Australian businesses, supports over 160 local payment methods and lets you hold local currency accounts including AUD. It suits Australian Odoo sellers who ship overseas and want to settle in the buyer's currency.",
    "support": "custom_build",
    "verified": false
   },
   {
    "name": "Fat Zebra and SecurePay",
    "kind": "local gateway",
    "note": "SecurePay is now wholly owned by Fat Zebra, which serves over 100,000 Australian merchants, and it accepts Visa, Mastercard, eftpos and American Express plus Apple Pay and Google Pay with 3DS2 and network tokenisation. This ownership change matters because older SecurePay documentation and connectors point at the previous owner.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Pin Payments",
    "kind": "local gateway",
    "note": "Pin Payments is based in Melbourne and is available only to businesses in Australia and New Zealand, combining gateway, processing and acquiring in one account. It accepts Visa, Mastercard, Amex, JCB, Discover, Diners Club, eftpos, Apple Pay and Google Pay.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "eWAY",
    "kind": "local gateway",
    "note": "eWAY is an Australian online payment gateway operating under ABN 32 086 209 403 and now part of Global Payments, also serving New Zealand, Singapore, Hong Kong and Macau. Many established Australian ecommerce businesses are already on it and will ask whether Odoo can keep it.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Windcave",
    "kind": "local gateway",
    "note": "Windcave, formerly Payment Express, runs offices in Melbourne and Sydney as well as Auckland and Christchurch, covering online, in store and unattended payments. It is a common choice for Australian retailers who need the same provider across web and terminal.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Zeller",
    "kind": "local gateway",
    "note": "Zeller is an Australian company operating under AFSL 534281, offering EFTPOS terminals, a virtual terminal, payment links, invoicing and business transaction accounts with no monthly fees or lock in contracts. It publishes a developer suite with APIs and SDKs, which is what an Odoo integration would target.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Tyro",
    "kind": "local gateway",
    "note": "Tyro is widely used by Australian hospitality and retail merchants for card acceptance. An Odoo 19 Tyro payment connector is sold on the Odoo apps store, so this is a purchase rather than a build.",
    "support": "third_party_paid",
    "verified": false
   },
   {
    "name": "Afterpay",
    "kind": "BNPL",
    "note": "Afterpay operates in Australia under Australian Credit Licence 527911 and splits a purchase into four interest free instalments over six weeks, charging the merchant a fee per transaction. Australian shoppers expect to see it, and Odoo 19 connectors for it are sold on the apps store.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Zip (Zip Pay and Zip Money)",
    "kind": "BNPL",
    "note": "Zip offers Zip Pay for everyday purchases and Zip Money for larger baskets with credit limits up to 50,000 dollars, and it takes on the customer credit and fraud risk. Usefully for Odoo, Zip can be switched on through Stripe or Adyen as a payment partner, both of which ship natively with Odoo 19.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Apple Pay and Google Pay",
    "kind": "mobile wallet",
    "note": "Australian wallet use is high and eftpos itself now supports mobile wallets with Merchant Choice Routing extended to mobile transactions. In Odoo 19 these reach the cart through the native Stripe connector, which is the only provider Odoo lists for express checkout.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Adyen",
    "kind": "global gateway",
    "note": "Adyen is a Dutch provider that ships natively with Odoo 19 and is one of the two named payment partners Zip lists for merchants. Odoo's own documentation warns it is aimed at enterprise customers and may require minimum transaction counts and volumes.",
    "support": "native",
    "verified": false
   }
  ],
  "shipping": [
   {
    "name": "Australia Post",
    "kind": "national post",
    "note": "Australia Post is the national postal operator, running Parcel Post and Express Post domestically and reaching over 220 international destinations, with MyPost Business for small senders and eParcel contracts from 2,000 parcels a year. Odoo 19 has no native Australia Post connector, so you either buy one from the apps store or go through Starshipit.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "StarTrack",
    "kind": "domestic express",
    "note": "StarTrack is a business of Australia Post aimed at B2B freight, with same day courier, next business day Premium, Road Express and stock distribution across 12.6 million locations. Australian wholesalers running Odoo usually sit on a StarTrack contract rather than retail parcel rates.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Sendle",
    "kind": "domestic express",
    "note": "Sendle sells simple flat priced parcel delivery aimed at Australian small business, which is the profile of most first time Odoo ecommerce buyers. Odoo 19 connectors for Sendle are sold on the apps store by several vendors.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "CouriersPlease",
    "kind": "domestic express",
    "note": "CouriersPlease runs domestic courier, ecommerce and eBay services with collection points for pickup and returns, and offers API integration on its custom solution tier. It is one of the carriers Shippit connects to, which is the usual Odoo route.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Aramex Australia",
    "kind": "domestic express",
    "note": "Aramex Australia, formerly Fastway, serves over 75,000 customers through a franchise depot network and provides the aramexConnect electronic labelling platform. It is reachable from Odoo through Shippit or MachShip rather than any native connector.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "Team Global Express",
    "kind": "domestic express",
    "note": "Team Global Express moves over 100 million items a year through more than 650 depots and 1,800 out of home collection points across Australia and New Zealand, including temperature controlled and dangerous goods. It suits Odoo buyers in manufacturing, food and healthcare who ship pallets as well as parcels.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Allied Express",
    "kind": "domestic express",
    "note": "Allied Express operates depots in every Australian capital plus a network of 50 agencies, offering courier, taxi truck and local and national distribution. Small Australian businesses often use it for same day and metro work that a parcel carrier will not take.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "Hunter Express",
    "kind": "domestic express",
    "note": "Hunter Express covers freight and courier work nationally and also runs third party logistics with warehousing and pick and pack, plus exhibition and event logistics. That combination matters to Odoo buyers who want inventory and outbound handled by one provider.",
    "support": "custom_build",
    "verified": true
   },
   {
    "name": "DHL Express",
    "kind": "global express",
    "note": "DHL Express carries international air freight out of Australia and is one of the carriers reachable through Starshipit, Shippit and MachShip. Odoo 19 ships a DHL Express connector natively, but Odoo's documentation states that other DHL services are not supported.",
    "support": "native",
    "verified": true
   },
   {
    "name": "FedEx",
    "kind": "global express",
    "note": "FedEx covers Australian international express and now carries the TNT network that Shippit still lists among its carriers. Odoo 19 ships a FedEx connector natively.",
    "support": "native",
    "verified": true
   },
   {
    "name": "UPS",
    "kind": "global express",
    "note": "UPS is used by Australian exporters for international express and Odoo 19 ships a UPS connector natively, so rates and labels work without a purchase.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Starshipit",
    "kind": "aggregator",
    "note": "Starshipit is the aggregator Odoo 19 ships for Australasian couriers, connecting to over 60 carriers including Australia Post, NZ Post and DHL. Note two things: it needs a paid Starshipit subscription, and shipping rules must be set up under Settings and Rules inside Starshipit before Odoo will pick the right service.",
    "support": "native",
    "verified": true
   },
   {
    "name": "Shippit",
    "kind": "aggregator",
    "note": "Shippit is an Australian shipping and fulfilment platform connecting to over 100 carriers including Australia Post, Aramex, CouriersPlease, TNT, DHL and Uber Direct. Odoo 19 connectors for it are sold on the apps store, and the Shippit account and its fees are a required dependency.",
    "support": "third_party_paid",
    "verified": true
   },
   {
    "name": "MachShip",
    "kind": "aggregator",
    "note": "MachShip is an Australia and New Zealand transport management platform covering over 500 carriers, with an API, webhooks and pre built connectors, and it is aimed at pallet and freight shippers rather than only parcels. No Odoo connector was confirmed, so plan an API build and a MachShip subscription.",
    "support": "custom_build",
    "verified": false
   }
  ],
  "odoo": {
   "modules": [
    "l10n_au",
    "l10n_au_reports",
    "l10n_au_hr_payroll",
    "l10n_au_hr_payroll_account",
    "l10n_au_hr_payroll_api",
    "l10n_employment_hero"
   ],
   "native": [
    "Australian chart of accounts and GST tax configuration at 10% standard, with variants for different transaction types including TPAR-specific taxes (l10n_au).",
    "Business Activity Statement covering GST, PAYG withholding and deferred GST, plus the Taxable Payments Annual Report (l10n_au_reports).",
    "ABA credit transfer file generation for bulk bank payments, installed automatically with the base localisation, plus remittance advice.",
    "Odoo can generate Peppol XML for a partner on the network, but its documented Peppol formats are BIS Billing 3.0, XRechnung CIUS and NLCIUS. PINT A-NZ Billing, the format the Australian mandate uses, is not listed. Confirm the format before committing.",
    "Payroll: an Australian Employee salary structure installed with l10n_au_hr_payroll, with accounting entries via l10n_au_hr_payroll_account.",
    "STP and SuperStream compliance through l10n_au_hr_payroll_api, which submits via the SuperChoice API with ATO-approved security controls including MFA, session timeouts and audit logging. STP finalisation is a report in the Payroll app, run by a designated STP Responsible user, with the annual declaration due 14 July."
   ],
   "custom": [
    "Deferred GST. The localisation does not fetch the DGST balance automatically from the ATO, so the figure goes into the BAS by hand each period.",
    "Payday super, live since 1 July 2026. The Odoo 19 Australian documentation reviewed does not describe the seven business day fund receipt window or the qualifying earnings base, so confirm your version handles both before go-live rather than assuming it does.",
    "State payroll tax. Rates and thresholds differ per state and no Odoo payroll tax module is documented, so this is configuration or a build.",
    "Peppol sending. Confirm whether your Odoo deployment transmits through an accredited access point or only produces the XML for upload, because that decides whether you need an access point contract."
   ]
  },
  "openQuestions": 23
 }
};
