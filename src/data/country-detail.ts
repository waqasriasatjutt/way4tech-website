/*
 * Per-country Odoo localization detail: e-invoicing, tax, payroll, accounting,
 * payment gateways and couriers, plus what Odoo covers out of the box.
 *
 * Every claim here was checked against a primary source on the date below and
 * then re-audited by three separate passes: one on the e-invoicing schemes, one
 * on every number and date, one on the Odoo support classifications.
 *
 * "verified: false" means the sources agreed but no primary confirmation was
 * found. Those render without a support badge and must not be tightened up
 * without re-checking.
 *
 * Anything that could not be sourced was left out rather than guessed. Do not
 * add a rate, threshold or deadline to this file without a source.
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
export interface CountryProvider { name: string; note: string; support: OdooSupport; verified: boolean }

export interface CountryDetail {
  einvoicing: {
    scheme: string;
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
        "name": "Amazon Payment Services",
        "note": "Dubai-based acquirer live in nine MENA markets including Saudi Arabia. One of two MENA gateways that ship as payment providers inside Odoo 19, alongside Paymob.",
        "support": "native",
        "verified": true
      },
      {
        "name": "mada",
        "note": "The Saudi domestic card scheme. It is not a standalone Odoo payment provider, so you reach it through an acquirer: Moyasar's Odoo 19 connector lists mada alongside Visa, Mastercard and Amex.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Moyasar",
        "note": "Saudi payment gateway covering cards plus the local wallets. Odoo 19 connector on the apps store at around USD 99, one-off licence.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "STC Pay",
        "note": "The main Saudi mobile wallet. No Odoo provider ships for it; it comes bundled in acquirer connectors such as Moyasar's, alongside Apple Pay and Samsung Pay.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Tamara",
        "note": "Buy now pay later, which carries real basket share in Saudi retail. There is a paid Odoo 19 POS connector at around USD 149. Nothing native.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Paymob",
        "note": "Ships as a payment provider inside Odoo 19. Odoo documents its supported countries as Egypt, Oman, Saudi Arabia and the United Arab Emirates.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "SMSA Express",
        "note": "Saudi domestic express carrier. Not in Odoo's native carrier list. A paid Odoo 19 connector exists at around USD 100 covering rating, B2C shipments, return pickups, waybills and tracking, and it writes the AWB into Odoo's standard carrier_tracking_ref.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Naqel Express",
        "note": "Saudi and GCC courier. Not native to Odoo. A paid Odoo 19 connector exists at around USD 199 for waybills, live rates, PDF labels and tracking.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Aramex",
        "note": "The regional network most Saudi e-commerce sellers already use. Odoo ships no Aramex connector. Paid apps-store modules cover it, including an Odoo 19 logistics module with live Aramex, SMSA, FedEx and DHL Express APIs at around USD 1,100.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "Cross-border out of the Kingdom. Ships with Odoo as a native carrier connector, worldwide. Only DHL Express is integrated, not DHL's other services.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Cross-border. Native Odoo carrier connector, worldwide coverage.",
        "support": "native",
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
    "openQuestions": 11
  },
  "uae": {
    "einvoicing": {
      "scheme": "UAE Electronic Invoicing System (EIS)",
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
        "name": "Stripe",
        "note": "Stripe is available in the UAE, unlike Saudi Arabia, and ships as a payment provider in Odoo 19. For a UAE entity it is usually the fastest route to a live checkout.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Amazon Payment Services",
        "note": "Dubai-based acquirer covering nine MENA markets. Ships as a payment provider in Odoo 19, which makes it the practical choice for a group trading across the UAE and Saudi Arabia on one instance.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Jaywan",
        "note": "The UAE domestic card scheme, run by Al Etihad Payments, a Central Bank subsidiary. Online acceptance arrived through gateways rather than direct integration: Network International put it in its e-commerce gateway and Telr enabled it across its UAE merchant network. There is no Jaywan payment provider in Odoo.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Network International (N-Genius)",
        "note": "One of the two gateways that carry Jaywan for online UAE merchants, and it charges no extra fee on Jaywan transactions through its gateway. Not among the payment providers shipped with Odoo 19.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Telr",
        "note": "The other gateway that has enabled Jaywan across its UAE merchant network. Not among the payment providers shipped with Odoo 19.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Tamara",
        "note": "Buy now pay later across Saudi Arabia, the UAE and Kuwait. Nothing native in Odoo. A paid Odoo 19 POS connector exists at around USD 149.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Paymob",
        "note": "Ships as a payment provider inside Odoo 19. Odoo documents its supported countries as Egypt, Oman, Saudi Arabia and the United Arab Emirates.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Aramex",
        "note": "The regional network most UAE e-commerce sellers already ship on. Odoo ships no Aramex connector. A paid Odoo 19 logistics module carries live Aramex, SMSA, FedEx and DHL Express APIs, with real AWB creation, tracking and void, at around USD 1,100.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "Cross-border out of the UAE. Native Odoo carrier connector, worldwide. Only DHL Express is integrated, not DHL's other services.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Cross-border. Native Odoo carrier connector, worldwide coverage.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Cross-border. Native Odoo carrier connector, worldwide coverage.",
        "support": "native",
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
        "The connection to an Accredited Service Provider is a third-party module or a build. As a price anchor, a paid Odoo 19 module that generates PINT AE UBL 2.1 and submits to one provider's Peppol access point lists at around USD 1,855, before your own mapping and testing work.",
        "VAT filing stays manual. The FTA report exports to Excel and PDF; there is no EmaraTax submission in the localization.",
        "Payments. Stripe, Amazon Payment Services and Paymob are the providers shipped with Odoo 19 that cover the UAE.",
        "Couriers. Only DHL Express, FedEx and UPS are native for this market. Aramex and the UAE last-mile operators need paid connectors or a build."
      ]
    },
    "openQuestions": 9
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
        "name": "Himyan (national debit card) and NAPS",
        "note": "Himyan is Qatar Central Bank's own national debit card brand, launched March 2024. It clears through NAPS, the National ATM and POS Switch, and reaches online merchants through the QPAY gateway. Qatari cardholders use it in preference to international schemes for domestic spend. There is no direct Odoo connector: you reach it through a QCB-licensed gateway, so the integration you actually build is the gateway, not the scheme.",
        "support": "custom_build",
        "verified": true
      },
      {
        "name": "SkipCash",
        "note": "Qatar-based, QCB-licensed gateway with QR and NFC acceptance, common with Qatari SMEs. Not in Odoo's native provider list. Three paid Odoo 19 modules are on the apps store, including a POS terminal integration, priced roughly USD 115 to USD 230.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Tap Payments",
        "note": "Regional GCC gateway used across Qatar for card, Apple Pay and local scheme acceptance. Not native to Odoo. The apps store carries around 17 Tap connectors for Odoo 16 to 19, all paid, roughly USD 16 to USD 182. Quality varies, so pick one and test refunds and webhooks before committing.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Amazon Payment Services (APS)",
        "note": "APS is a Dubai-based MENA acquirer and is one of the payment providers Odoo ships natively, so it needs no third-party module. It is the shortest native path to card acceptance in the region. Confirm APS acquiring is available for a Qatar-domiciled merchant before you design around it.",
        "support": "native",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "DHL Express",
        "note": "Named among the top five operators in Qatar's courier, express and parcel market. Odoo ships a DHL Express connector available in all regions. Only DHL Express is supported: other DHL services are not.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "A top-five operator in Qatar. Odoo ships a FedEx connector available in all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "A top-five operator in Qatar. Odoo ships a UPS connector available in all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Aramex",
        "note": "Regional operator ranked in Qatar's top five and the default for GCC cross-border and domestic parcels. Not in Odoo's native carrier list. The apps store has roughly ten paid Aramex connectors for Odoo 19, from about USD 72 to USD 507, and no free one.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Qatar Post (Q-Post)",
        "note": "The national postal operator and a top-five player in the Qatar parcel market. It is not in Odoo's native carrier list and we found no maintained apps store connector, so rating labels and tracking against Q-Post is a custom API build.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Snoonu",
        "note": "Doha-based app platform doing same-day and last-mile delivery, acquired by Jahez in 2025. Relevant if you sell to consumers in Doha. No Odoo connector exists, so it is a custom API build or a manual handover.",
        "support": "custom_build",
        "verified": false
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
    "openQuestions": 11
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
        "note": "KNET is Kuwait's national debit card and payment network, and it carries the large majority of domestic card payments. A Kuwaiti checkout without KNET loses sales. It is not in Odoo's native provider list. The apps store has paid Odoo connectors, including one for Odoo 19 at about USD 58 and a POS terminal integration at USD 399, plus at least one free multi-gateway module that includes KNET.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Amazon Payment Services (APS)",
        "note": "APS supports KNET on its own platform, but Odoo's APS documentation names no countries and no payment methods. Confirm KNET actually surfaces through Odoo's APS integration before relying on it.",
        "support": "native",
        "verified": false
      },
      {
        "name": "MyFatoorah",
        "note": "Kuwait-origin aggregator, licensed by the Central Bank of Kuwait, widely used to bundle KNET, cards and wallets behind one integration. Not native to Odoo, but MyFatoorah publishes its own free apps store module and Cybrosys publishes a free Odoo 19 one, alongside around 20 paid options. Free does not mean maintained, so test settlement and refunds before you rely on one.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "Tap Payments",
        "note": "Regional GCC gateway with strong Kuwaiti presence, CBK cleared. Not native to Odoo. Around 17 paid connectors on the apps store across Odoo 16 to 19, no free option.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "UPayments and Hesabe",
        "note": "Both hold Central Bank of Kuwait electronic payment licences and are common with Kuwaiti merchants. Neither is native to Odoo and we did not find a maintained apps store connector for either, so budget a custom gateway integration if the client is already contracted with one.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "DHL Express",
        "note": "One of the leading operators in the Kuwait courier and parcel market. Odoo ships a DHL Express connector available in all regions. Other DHL services are not supported.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Active in Kuwait and one of the named market operators. Odoo ships a FedEx connector available in all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Active in Kuwait. Odoo ships a UPS connector available in all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Aramex",
        "note": "One of the main operators for Kuwaiti domestic and GCC cross-border parcels. Not in Odoo's native carrier list. The apps store has roughly ten paid Aramex connectors for Odoo 19, from about USD 72 to USD 507, and no free one.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Posta Plus",
        "note": "Kuwait-headquartered courier and freight operator, named among the leading companies in the Kuwait courier market. No native Odoo connector and no apps store module found, so rating and tracking is a custom API build.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "SMSA Express",
        "note": "Regional express operator named among the leading companies serving Kuwait. Not in Odoo's native carrier list, so it is a paid app or a custom build depending on what is current on the apps store at the time.",
        "support": "custom_build",
        "verified": false
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
        "Payroll. Kuwait is not in Odoo's payroll localization list. PIFSS contributions with their two separate ceilings, the wage protection salary file with Civil ID and Kuwaiti IBAN validation, and end of service indemnity accrual all need paid apps store modules or a custom build. Paid Odoo 19 modules for PIFSS and the wage file exist at roughly USD 117 and USD 127.",
        "Three-decimal discipline beyond the currency record: product prices, unit prices, tax computation and rounding, and any import or price list mapping.",
        "DMTT reporting for in-scope multinational groups. Nothing in Odoo produces GloBE-ready data."
      ]
    },
    "openQuestions": 10
  },
  "oman": {
    "einvoicing": {
      "scheme": "Fawtara (فوترة), the Oman Tax Authority e-invoicing system",
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
        "name": "Thawani",
        "note": "Muscat-based fintech, the first Omani non-bank to get a Central Bank of Oman licence. Runs a PCI DSS certified gateway plus the Thawani Pay consumer wallet and the Tajer merchant app. It is the gateway most Omani online merchants ask for by name.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "OmanNet payment gateway (Central Bank of Oman)",
        "note": "The national debit card switch. Merchants enrol through an acquiring bank such as Bank Muscat or National Bank of Oman to process locally issued OmanNet debit cards. Most Omani consumers hold an OmanNet debit card rather than a credit card.",
        "support": "custom_build",
        "verified": true
      },
      {
        "name": "PayTabs",
        "note": "Regional GCC gateway used by Omani merchants who want one acquirer across Oman, Saudi Arabia and the UAE.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Cash on delivery",
        "note": "Still a real share of Omani e-commerce, especially outside Muscat and for first-time buyers. It has to be a first-class payment method in the checkout, not an afterthought.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Wire transfer",
        "note": "Standard for B2B invoicing in Oman, where card acceptance cost is avoided on large tickets.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Paymob",
        "note": "Ships as a payment provider inside Odoo 19. Odoo documents its supported countries as Egypt, Oman, Saudi Arabia and the United Arab Emirates.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Asyad Express",
        "note": "Part of Asyad Group, the state logistics group. Leads domestic last mile with 11 distribution centres, same-day inside Muscat and nationwide inside 72 hours. The default domestic carrier for Omani e-commerce.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Aramex Oman",
        "note": "Named among the leading logistics players in Oman. Strong on GCC cross-border and returns, widely used for regional B2C.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "Main international express carrier for outbound documents and parcels from Oman.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Second international express option, common on US and Asia lanes.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Used for international express where DHL and FedEx rates do not work on a given lane.",
        "support": "native",
        "verified": true
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
    "openQuestions": 13
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
        "name": "BENEFIT and BenefitPay",
        "note": "BENEFIT is Bahrain's national payment network. Its gateway accepts locally issued Bahraini debit cards, and BenefitPay is the national mobile wallet with QR payments. A Bahraini checkout that does not take Benefit loses a large share of local buyers.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Tap Payments",
        "note": "The gateway most new Bahraini e-commerce stores pick. One integration covers BenefitPay, Apple Pay, Samsung Pay and cards, and it settles in BHD.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "CrediMax",
        "note": "Bahrain's main card issuer and acquirer, owned by Bank of Bahrain and Kuwait. Common where the merchant already banks with BBK, and it supports BenefitPay through its own gateway.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Arab Financial Services (AFS)",
        "note": "Bahrain-headquartered card processor used by several regional banks for acquiring and issuing.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "PayTabs",
        "note": "Regional GCC gateway used where a merchant sells into Bahrain, Saudi Arabia and the UAE from one account.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "MyFatoorah",
        "note": "Kuwait-based aggregator that settles in BHD and covers the smaller GCC currencies through one integration.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Wire transfer and cash on delivery",
        "note": "Wire transfer stays the default for B2B invoicing. Cash on delivery still matters for consumer retail.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Aramex Bahrain",
        "note": "One of the largest couriers in Bahrain by revenue. Handles domestic and GCC cross-border, and is the usual choice for returns.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "Main international express carrier operating in Bahrain.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx Express Bahrain",
        "note": "Among the largest couriers in Bahrain by revenue, with an e-commerce fulfilment offer aimed at local merchants.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Third international express option where DHL or FedEx rates do not work on a lane.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Domestic last mile operators (TAM Express, Oreem, Delybell and similar)",
        "note": "Bahrain is small enough that same-day domestic delivery is normal, and local operators carry most of it with cash on delivery and easy returns. None is a global carrier, so none has a shipped Odoo connector.",
        "support": "custom_build",
        "verified": false
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
    "openQuestions": 10
  },
  "pakistan": {
    "einvoicing": {
      "scheme": "FBR Digital Invoicing (electronic sales tax invoicing under section 23 of the Sales Tax Act 1990, Chapter XIV of the Sales Tax Rules 2006)",
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
        "name": "Raast",
        "note": "The State Bank of Pakistan instant payment rail. It is now a standard checkout option alongside cards and wallets, and it is the cheap route for account-to-account collection.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "JazzCash",
        "note": "The largest mobile wallet in the market. Most Pakistani ecommerce checkouts carry it.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Easypaisa",
        "note": "The other mass-market mobile wallet. Usually offered next to JazzCash rather than instead of it.",
        "support": "custom_build",
        "verified": true
      },
      {
        "name": "Safepay",
        "note": "A locally licensed fintech gateway used by direct-to-consumer brands, with a developer-facing API.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Bank Alfalah (Alfa)",
        "note": "Bank-operated gateway on MPGS. Common for merchants who already bank with Alfalah.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Bank-operated gateways: HBL, UBL, MCB eGate, Meezan",
        "note": "Several banks run their own ecommerce checkouts. Merchants often land on one because of an existing banking relationship rather than by choosing it.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Leopards Courier",
        "note": "One of the two default domestic ecommerce couriers, with heavy cash on delivery volume.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "TCS",
        "note": "The oldest national courier network, strong on B2B and documents as well as parcels.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "PostEx",
        "note": "Cash on delivery focused ecommerce courier that also settles merchant payouts, which matters for how the cash side is booked.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Daewoo",
        "note": "Bus-network based cargo and parcel service, used for intercity freight rather than last mile.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "None of Odoo's native carriers",
        "note": "Odoo 19 ships connectors for DHL Express, Envia.com, FedEx, UPS, US Postal Service, Sendcloud, Bpost, EasyPost, Shiprocket and Starshipit. None of them serves the Pakistani domestic market, so every domestic courier is an app or a build.",
        "support": "custom_build",
        "verified": true
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
        "FBR digital invoicing. Nothing in core Odoo talks to the FBR or PRAL API. Pakistan is listed among Odoo's countries but has no fiscal localization documentation page, unlike India, Saudi Arabia and the UAE. In practice you buy one of the apps-store FBR modules, from a free one by Zalino Tech to paid ones between roughly 25 and 450 US dollars, or you build the integration.",
        "Unique FBR invoice number, the 7x7 mm QR code, the digital signature, the software registration number on the invoice layout, and the 72-hour edit window with Commissioner approval after that.",
        "Provincial sales tax on services. Separate registration, rate set and return per provincial authority, and the input tax split between the federal and provincial regimes.",
        "Section 153 withholding driven by vendor ATL status, with the ATL and non-ATL rate pair per payment type, plus the quarterly withholding statement.",
        "Sales tax return annexures and the STR-7 output.",
        "Payroll. There is no Pakistan payroll localization, so EOBI, provincial social security and salary tax slabs are all custom."
      ]
    },
    "openQuestions": 11
  },
  "india": {
    "einvoicing": {
      "scheme": "GST e-invoicing (e-invoice under rule 48(4) of the CGST Rules), with the e-way bill as a separate mandate for movement of goods",
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
        "name": "Razorpay",
        "note": "The default Indian gateway for online business, fronting cards, UPI, netbanking and wallets behind one integration.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayU",
        "note": "Long-established Indian gateway, still common with larger merchants and marketplaces.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPI",
        "note": "The rail behind most Indian consumer payments. Odoo ships no UPI provider of its own, so online UPI comes through Razorpay or PayU, and in-store UPI QR comes from apps-store POS modules.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "PhonePe",
        "note": "One of the largest UPI apps and a merchant gateway in its own right.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "CCAvenue",
        "note": "An older gateway still entrenched with established retailers and with bank-branded checkouts such as HDFC's.",
        "support": "third_party_paid",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Shiprocket",
        "note": "An aggregator rather than a carrier, and the usual first stop for Indian ecommerce because it fronts several couriers on one contract.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Delhivery",
        "note": "The largest domestic parcel network, and the direct contract most mid-size shippers move to once volume justifies leaving an aggregator.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Blue Dart",
        "note": "Premium express and the default for time-definite B2B and high-value shipments.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DTDC",
        "note": "Wide franchise-based network with reach into smaller towns where the express carriers thin out.",
        "support": "third_party_paid",
        "verified": true
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
    "openQuestions": 11
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
        "note": "The largest mobile financial services wallet in Bangladesh and the default consumer payment rail. The last published market share split, December 2022, put bKash at 39.9%.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Nagad",
        "note": "Second largest MFS wallet, state-backed through the postal department. Same December 2022 split put Nagad at 18.1%.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "SSLCOMMERZ",
        "note": "The main aggregator gateway for card and wallet acceptance on Bangladeshi websites. It fronts Visa, Mastercard, local bank rails and the MFS wallets in one integration.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "aamarPay",
        "note": "Widely used local gateway for smaller merchants, covering cards, internet banking and MFS wallets.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Rocket (Dutch-Bangla Mobile Banking)",
        "note": "Third largest MFS operator, at 11.7% in the December 2022 split, still common for salary disbursement and bill collection.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Pathao Courier",
        "note": "Tech-first courier with nationwide district coverage, the usual first choice for Dhaka and Chattogram next-day e-commerce delivery.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Steadfast Courier",
        "note": "High-volume e-commerce courier with cash on delivery remittance, heavily used by Facebook and marketplace sellers.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "RedX",
        "note": "Third of the tech couriers used for domestic e-commerce parcels and COD collection.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Sundarban Courier Service and SA Paribahan",
        "note": "The deep-network traditional couriers that reach rural unions the tech couriers do not. Branch pickup rather than home delivery.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "DHL Express and FedEx",
        "note": "The export lane for garments samples and documents. Both are shipped as native Odoo connectors.",
        "support": "native",
        "verified": true
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
    "openQuestions": 8
  },
  "egypt": {
    "einvoicing": {
      "scheme": "منظومة الفاتورة الإلكترونية and منظومة الإيصال الإلكتروني, the Egyptian e-invoice system and e-receipt system",
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
        "note": "Cairo-headquartered gateway and the widest local acceptance stack for cards and wallets in Egypt. Odoo ships it as a native payment provider, with Egypt listed among the four supported countries alongside Oman, Saudi Arabia and the UAE.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Fawry",
        "note": "The reference-code and agent-network rail. Customers pay a Fawry code in cash at a kiosk or shop, which matters because a large share of Egyptian buyers are not paying by card. Nothing native in Odoo.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Meeza",
        "note": "The domestic card scheme run by the Central Bank of Egypt, launched in 2017, issued on national ID without a full bank account. It is a scheme rather than a gateway, so acceptance comes through whichever local acquirer or gateway you sign with, not through an Odoo connector.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "InstaPay (Instant Payment Network)",
        "note": "Bank-to-bank instant transfer app built by the Egyptian Banks Company on the CBE's Instant Payment Network, with roughly twelve million active users and EGP 2.9 trillion moved across 1.5 billion transactions to end 2024. Common for B2B settlement. There is no Odoo connector, so reconciliation is bank statement work or a custom build.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Mobile wallets (Vodafone Cash, Orange Cash, CIB Smart Wallet, QNB Alahli Wallet)",
        "note": "Over 50 million Egyptians were using mobile wallets as of May 2025. For checkout you normally take them through Paymob or Fawry, but a free community module for Egyptian wallet payment methods exists.",
        "support": "oca_or_community",
        "verified": false
      },
      {
        "name": "PayTabs",
        "note": "Regional gateway used by Egyptian merchants alongside Paymob. Only a free community module for Odoo 17 was found, so an upgrade to 18 or 19 needs porting.",
        "support": "oca_or_community",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Bosta",
        "note": "The e-commerce courier most Egyptian online sellers start with, strongest in Cairo and Alexandria, with cash on delivery collection. It opened a large automated sorting hub in Cairo in January 2026.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Aramex",
        "note": "Broader national coverage than the pure e-commerce couriers, including Upper Egypt and the Delta, plus regional export. Many paid Odoo connectors exist for Odoo 19, none official.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Mylerz",
        "note": "Built specifically for e-commerce, with same-day delivery in selected urban corridors and fulfilment services. No dedicated Odoo module was found; it appears only inside one multi-carrier app.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Egypt Post",
        "note": "The state postal operator, still the cheapest way to reach governorates the private couriers price badly. No Odoo connector found.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "DHL Express and FedEx",
        "note": "The international lane out of Cairo and Alexandria. Both are native Odoo shipping connectors, so no third-party app is needed.",
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
    "openQuestions": 7
  },
  "jordan": {
    "einvoicing": {
      "scheme": "JoFotara, the National Electronic Invoicing System (نظام الفوترة الوطني)",
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
        "name": "eFAWATEERcom",
        "note": "Jordan's national bill payment system, owned by JoPACC and supervised by the Central Bank of Jordan, operated with MadfoatCom. It is how Jordanians pay bills, and it processed JOD 6.51 billion across 33.93 million transactions in the first months of 2026. If you invoice consumers or utilities in Jordan you will be asked for it.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "MEPS (Middle East Payment Services)",
        "note": "Central Bank of Jordan licensed processor and acquirer based in Amman. Much of the local card acquiring runs through it, and it launched Click to Pay via Mastercard Gateway for its e-commerce merchants in January 2026.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "CliQ",
        "note": "Jordan's instant payment rail, run by JoPACC since June 2020. Account-to-account transfers addressed by mobile number or alias instead of IBAN. Increasingly used for merchant collection, which makes bank reconciliation the real ERP problem rather than checkout.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "HyperPay",
        "note": "Riyadh-headquartered gateway that operates in Jordan and is one of the gateways local merchants actually shortlist alongside MEPS.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Amazon Payment Services (APS)",
        "note": "Dubai-based MENA gateway. Worth checking first on any Jordan project because it is the only regionally relevant provider that Odoo ships in the box, which removes an app purchase and a maintenance liability.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Mobile wallets on JoMoPay (Zain Cash, Orange Money, Dinarak, UWallet)",
        "note": "JoPACC operates JoMoPay as the national mobile wallet switch. Wallets matter for the unbanked and for last-mile collection, and they settle outside the card rails, so they land in Odoo as a separate journal and a reconciliation process.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Aramex",
        "note": "Founded in Amman and still the default express and e-commerce courier for Jordan and the wider Levant. Almost every Jordanian retail or distribution project asks for it.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "The usual choice for outbound international express from Jordan.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "International express, used for inbound spares and outbound documents. Native connector, so rating and label printing come free.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "International express with a Jordan presence. Native connector.",
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
    "openQuestions": 14
  },
  "turkey": {
    "einvoicing": {
      "scheme": "e-Fatura (e-Invoice) and e-Arşiv (e-Archive), part of GİB's e-Belge (e-Document) family",
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
        "name": "Iyzico",
        "note": "The main domestic online payment provider in Türkiye. It is also the one piece of good news on a Turkish Odoo project: Odoo ships it as a native payment provider, described in the documentation as covering Turkey. Setup is API Key, Secret Key, merchant notifications and a webhook URL.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayTR",
        "note": "Widely used Turkish gateway, common on local e-commerce. Not native in Odoo, but there is a free community provider module for Odoo 19 (payment_paytr_kt) and cheap paid alternatives, so it is a small job rather than a build.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "Troy",
        "note": "Türkiye's domestic card scheme, launched by BKM in 2016. It reached 67 million cards and around 20% of card transactions, so a Turkish checkout that silently declines Troy cards is a visible problem. It is a scheme, not a gateway: there is nothing to integrate in Odoo, but you must confirm your acquirer and gateway route Troy before go-live.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Yurtiçi Kargo",
        "note": "One of the largest Turkish domestic parcel carriers and a default on local e-commerce. No native Odoo connector, but free community multi-carrier modules cover it (Sentos Connector for 18.0, Tüm Kargolar for 19.0). Test them before you rely on them.",
        "support": "oca_or_community",
        "verified": false
      },
      {
        "name": "Aras Kargo",
        "note": "Major Turkish domestic carrier. Paid third-party Odoo connector available for 19.0 at around USD 99.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "MNG Kargo",
        "note": "Major Turkish domestic carrier. Paid third-party Odoo connectors exist for 18.0 and 19.0.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "PTT Kargo",
        "note": "The postal operator's parcel arm, still used for wide domestic coverage and for rural addresses the private carriers price badly. Paid third-party Odoo connectors for 19.0.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Sürat Kargo",
        "note": "Turkish domestic carrier. Paid third-party Odoo connector for 19.0.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "HepsiJET",
        "note": "E-commerce-led last mile operator, relevant if the client sells on Turkish marketplaces. Paid third-party Odoo connectors for 16.0 and 19.0.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express and UPS",
        "note": "International express out of Türkiye. Both have native Odoo connectors, so rating and labels work without buying an app. Note that only DHL Express is supported; other DHL services are not.",
        "support": "native",
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
    "openQuestions": 12
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
        "note": "Mainstream card gateway for UK online sellers, covering Visa and Mastercard.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "Standard alternative checkout button on UK ecommerce sites.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Adyen",
        "note": "Used by larger UK merchants that want online and card-present on one platform. Also a shipped Odoo POS terminal integration.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Mollie",
        "note": "European gateway that trades in the UK, common on mid-market shops.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Bacs Direct Debit and Direct Credit",
        "note": "The domestic UK bank rail for collecting subscriptions and paying suppliers and staff.",
        "support": "native",
        "verified": true
      },
      {
        "name": "GoCardless",
        "note": "The usual way UK businesses collect Bacs Direct Debit without running their own service user number.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Worldpay",
        "note": "Long-established UK acquirer, often already in place on legacy merchant accounts.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Klarna",
        "note": "Buy now pay later option UK retailers are asked for at checkout.",
        "support": "third_party_paid",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Royal Mail",
        "note": "Still the largest UK parcel and letter network and the default for lightweight ecommerce.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Evri (now including DHL eCommerce UK)",
        "note": "High-volume ecommerce network. The CMA cleared the Evri and DHL eCommerce UK merger unconditionally on 4 September 2025, and DHL eCommerce UK is being rebranded as Evri Premium in 2026.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "DPD UK (DPD Local)",
        "note": "Widely used for next-day B2B and higher-value parcels.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Export and international B2B parcels.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Export and international express.",
        "support": "native",
        "verified": true
      },
      {
        "name": "DHL",
        "note": "International express out of the UK.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Sendcloud",
        "note": "Multi-carrier aggregator. Practical route to UK carriers that have no direct Odoo connector.",
        "support": "native",
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
        "Making Tax Digital for Income Tax. No official module. A paid third-party bridge exists (l10n_uk_mtd_itsa, Pokutsoft, 244.80 USD).",
        "iXBRL statutory accounts. Odoo does not tag accounts for HMRC or Companies House. That stays with the accountant's software, which matters more now that HMRC's free filing service closed on 31 March 2026 and Companies House goes software-only in April 2028.",
        "Multi-company HMRC submissions. Only one company and one user can be connected to HMRC at a time, so group filings have to be run in sequence.",
        "The 2029 e-invoicing build cannot be scoped yet. Peppol is confirmed as the network but the format, phasing and legacy EDI treatment come with the Budget 2026 roadmap."
      ]
    },
    "openQuestions": 7
  },
  "germany": {
    "einvoicing": {
      "scheme": "E-Rechnung. B2B sits in section 14 UStG; federal B2G runs on XRechnung under the E-Rechnungsverordnung (ERechV)",
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
      },
      {
        "claim": "Odoo has no official German payroll localization. The payroll localizations documented for v19 are Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Turkiye, the UAE and the US. Third-party paid modules exist, for example Pokutsoft's Germany Payroll Lohn at 239 USD.",
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
        "name": "SEPA Direct Debit (Lastschrift)",
        "note": "The standard German rail for recurring collection and a normal checkout option.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "The default alternative checkout button in German online retail.",
        "support": "native",
        "verified": false
      },
      {
        "name": "Stripe",
        "note": "Card acceptance and wallet methods for German online sellers.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Mollie",
        "note": "European gateway that bundles the German methods buyers expect on one contract.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Adyen",
        "note": "Used by larger German merchants for online and card-present on one platform. Also a shipped Odoo POS terminal integration.",
        "support": "native",
        "verified": true
      },
      {
        "name": "girocard",
        "note": "The domestic debit scheme and still the most used card in Germany. It is a scheme, not a gateway, and Odoo ships no girocard integration. Acceptance depends on the POS terminal and acquirer you contract.",
        "support": "custom_build",
        "verified": false
      },
      {
        "name": "Klarna (Rechnung and Ratenkauf)",
        "note": "Buy now pay later and pay on invoice, which German shoppers ask for at checkout.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Wero",
        "note": "The European Payments Initiative wallet. Ecommerce payments went live in Germany in November 2025 with merchants including Lidl, Rossmann, Decathlon and Eventim, and in-store acceptance is planned from 2026.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "DHL Express",
        "note": "Odoo's carrier connector covers DHL Express only, and Odoo states other DHL services are not supported. DHL Paket, the dominant German domestic parcel network, is not covered and needs a paid connector or a build.",
        "support": "native",
        "verified": false
      },
      {
        "name": "DPD Germany",
        "note": "Second network for German B2B and ecommerce parcels. Several Odoo 19 modules target myDPD Business Customers specifically, priced from about 56 to 149 USD, plus one free community module.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Export and international B2B parcels out of Germany.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "International express.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Sendcloud",
        "note": "Multi-carrier aggregator. Usual route to German carriers that have no direct Odoo connector.",
        "support": "native",
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
        "German payroll. No official localization exists. Lohnsteuer-Anmeldung, DEUEV notifications and health fund reporting are not in the standard product. A paid third-party module (Germany Payroll Lohn, 239 USD) is the only shipped option found.",
        "ELSTER filing. Odoo produces the Umsatzsteuervoranmeldung report but does not transmit it to ELSTER. Third-party export modules exist.",
        "Leitweg-ID for federal B2G invoices. Handled by a third-party module rather than the standard localization.",
        "E-Bilanz under section 5b EStG. Not in Odoo. It stays with the tax adviser's software.",
        "ZUGFeRD profile coverage and inbound reading of supplier e-invoices into vendor bills. Confirm per project rather than assuming."
      ]
    },
    "openQuestions": 12
  },
  "france": {
    "einvoicing": {
      "scheme": "Facturation electronique (mandatory B2B e-invoicing and e-reporting reform)",
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
        "note": "CB is a scheme, not a gateway. There is nothing to integrate in Odoo, but you must confirm your acquirer routes CB and that the checkout offers the network choice French rules require.",
        "support": "custom_build",
        "verified": true
      },
      {
        "name": "Stripe",
        "note": "Shipped in Odoo with full integration including tokenisation and refunds, and it accepts Cartes Bancaires from a French account. Fastest route to a compliant French checkout.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Worldline",
        "note": "French-headquartered acquirer, common with mid-market and larger French merchants and with CB acceptance built in. Shipped in Odoo as a provider-hosted payment flow.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Adyen",
        "note": "Used by larger French and pan-European merchants. Shipped in Odoo with full integration, tokenisation and refunds.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Mollie",
        "note": "Strong in France and the Benelux for SME ecommerce. Shipped in Odoo as a provider-hosted flow with tokenisation.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "Still a checkout expectation for French consumers. Shipped in Odoo.",
        "support": "native",
        "verified": true
      },
      {
        "name": "SEPA Direct Debit",
        "note": "The default collection method for French subscriptions, utilities and recurring B2B billing. Shipped in Odoo as a bank payment method.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Wero (EPI)",
        "note": "European instant account-to-account wallet run by EPI Company SE, live in France, Belgium and Germany, with online merchant payment recently launched and the Netherlands planned for 2026. Banks are pushing it as the domestic alternative to card rails.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Lyra / PayZen / Systempay",
        "note": "French gateway family behind Systempay and many bank-issued checkout pages, very common with French banks' merchant offers. There is no listing for it on the Odoo apps store, so an Odoo project that inherits a Systempay contract has a build, not a config.",
        "support": "custom_build",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Colissimo (La Poste)",
        "note": "The default French home-delivery parcel product for ecommerce. Volume leader for B2C home delivery.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "Chronopost",
        "note": "The domestic express arm of La Poste and the usual choice for next-day France. ChronoFresh covers temperature-controlled goods.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "Mondial Relay (InPost)",
        "note": "Owns the cheap point-relais and locker segment, which is where a large share of French ecommerce parcels actually go. No free or OCA connector on the apps store, only paid apps, and prices range widely.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Sendcloud",
        "note": "Multi-carrier aggregator that is the pragmatic answer for a French shop wanting Colissimo, Mondial Relay and DPD behind one integration. France is a supported shipping origin.",
        "support": "native",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "International express out of France. Odoo integrates DHL Express only; other DHL services are not supported.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "International and B2B express. Shipped connector, all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "International express and heavier B2B freight. Shipped connector, all regions.",
        "support": "native",
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
    "openQuestions": 9
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
        "note": "Default card acquirer for US ecommerce and SaaS. Shipped in Odoo with full integration, tokenisation and full or partial refunds.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Authorize.Net",
        "note": "Long-established US gateway, still the incumbent for many US merchants who already hold a separate merchant account and do not want to move acquirers. Shipped in Odoo.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "Still a checkout expectation for US consumers and small-business B2B. Shipped in Odoo.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Adyen",
        "note": "Used by larger US merchants running multi-region card acceptance. Shipped in Odoo with full integration, tokenisation and refunds.",
        "support": "native",
        "verified": true
      },
      {
        "name": "ACH via NACHA file",
        "note": "ACH is the US bank rail for B2B settlement, supplier payments and payroll, and it is where most US invoice value actually moves. Odoo ships l10n_us_payment_nacha to export payments as NACHA files for the bank.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Square",
        "note": "Dominant with US small retail, food service and services businesses, and usually already the client's card reader before Odoo arrives. Not shipped in Odoo. There is a free community payment provider module on the apps store and a spread of paid ones, including POS terminal integrations.",
        "support": "oca_or_community",
        "verified": true
      },
      {
        "name": "Wire Transfer",
        "note": "Still the settlement method for large US B2B invoices. Shipped in Odoo as a bank payment method.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "UPS",
        "note": "One of the two US parcel majors and the revenue leader. Shipped connector, all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "The other US parcel major, and the usual choice for time-definite and heavier B2B. Shipped connector, all regions.",
        "support": "native",
        "verified": true
      },
      {
        "name": "US Postal Service (USPS)",
        "note": "Cheapest route for light residential parcels and the last-mile carrier for a lot of consolidated ecommerce volume. Odoo's connector is United States only.",
        "support": "native",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "International outbound from the US. Odoo integrates DHL Express only; other DHL services are not supported.",
        "support": "native",
        "verified": true
      },
      {
        "name": "EasyPost",
        "note": "Multi-carrier aggregator. The sensible answer when a US shipper wants rate shopping across UPS, FedEx, USPS and regional carriers behind one integration. Odoo's connector is North America only.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Envia.com",
        "note": "Multi-carrier aggregator with strong US to Mexico and Latin America coverage, useful for cross-border shippers. Shipped connector, all regions.",
        "support": "native",
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
        "1099 e-filing transmission. l10n_us_1099 prepares data for a third-party filer, it does not transmit to the IRS. The new 2,000 dollar 1099-NEC threshold for 2026 also means the vendor flagging logic needs revisiting.",
        "Federal government invoicing. There is no IPP connector and no DBNAlliance connector in Odoo, and Odoo's Peppol support does not list the United States as an eligible country. Federal vendors submit into IPP separately."
      ]
    },
    "openQuestions": 9
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
        "name": "Moneris",
        "note": "A leading Canadian card acquirer. The Odoo connectors for it state they support Canadian merchants only, and it is the processor most Canadian merchants are quoted by their bank.",
        "support": "third_party_paid",
        "verified": false
      },
      {
        "name": "Interac (Interac Debit and Interac e-Transfer)",
        "note": "The domestic rails Canadians actually use. Interac Online was shut down, and on 10 February 2026 Interac Debit became available to Stripe's Canadian merchants for online and in-app purchases through participating digital wallets. Interac e-Transfer for Business handles account-to-account settlement. No Odoo payment provider ships for Interac.",
        "support": "custom_build",
        "verified": true
      },
      {
        "name": "Nuvei",
        "note": "Odoo's own documentation describes Nuvei as a Canadian-based payment solution provider covering several Latin American countries, the US and Canada. It is one of the few Canada-headquartered acquirers you get without a third-party app.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Stripe",
        "note": "Standard card acquiring for Canadian e-commerce, and the acquirer Interac picked for online and in-app Interac Debit. Also available as a native Odoo Point of Sale terminal.",
        "support": "native",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "Common consumer checkout option on Canadian storefronts, and a native Odoo provider so it costs nothing to switch on.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Authorize.Net",
        "note": "Long-standing North American card gateway, still in place at many Canadian merchants sitting on an older merchant account. Shipped natively in Odoo 19.",
        "support": "native",
        "verified": true
      }
    ],
    "shipping": [
      {
        "name": "Canada Post",
        "note": "The national postal operator and the cheapest route for light domestic parcels. Odoo ships no connector for this carrier. It is reached through Odoo's native EasyPost connector, which needs an EasyPost account and its fees.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Purolator",
        "note": "Canadian domestic express carrier, heavily used for B2B parcels. Odoo ships no connector for this carrier. It is reached through Odoo's native EasyPost connector, which needs an EasyPost account and its fees.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Canpar Express",
        "note": "Canadian ground parcel carrier, common for regional distribution. Odoo ships no connector for this carrier. It is reached through Odoo's native EasyPost connector, which needs an EasyPost account and its fees.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "Loomis Express",
        "note": "Canadian domestic carrier listed among EasyPost's supported carriers, so it is reachable from Odoo through the native EasyPost connector. Odoo ships no connector for this carrier. It is reached through Odoo's native EasyPost connector, which needs an EasyPost account and its fees.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "Direct Odoo connector, availability listed as All, so it works for Canadian domestic and cross-border US shipping without an aggregator in between.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "Direct Odoo connector, availability listed as All. The usual choice alongside UPS for Canada to US cross-border volume.",
        "support": "native",
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
    "openQuestions": 10
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
        "name": "Stripe",
        "note": "The default card acquirer for most Australian online stores, and it doubles as a native Odoo Point of Sale terminal, so web and counter run on one provider.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Tyro",
        "note": "Australian EFTPOS acquirer for in-store card payments, common in hospitality and retail. Odoo's documentation states plainly that Tyro payment terminals are only supported in Australia, so it is the one genuinely Australian provider Odoo ships out of the box.",
        "support": "native",
        "verified": true
      },
      {
        "name": "eWAY",
        "note": "Established Australian gateway, still in place at a lot of AU and NZ merchants. Odoo 19 support is a paid apps store module, Eway Payment Gateway Integration (payment_eway_scs) by Serpent Consulting Services, listed at $154.19 and described as built for the Australia and New Zealand market.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "PayPal",
        "note": "Still a normal consumer checkout option on Australian storefronts, and native in Odoo 19 so there is no integration cost.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Adyen",
        "note": "Used by larger Australian retailers running unified online and in-store payments. Native in Odoo both as an online payment provider and as a Point of Sale terminal.",
        "support": "native",
        "verified": true
      },
      {
        "name": "BPAY",
        "note": "The bank bill payment scheme Australian businesses use to settle invoices from their own banking app. No BPAY payment provider ships in Odoo 19, so biller code and CRN handling plus reconciliation of the bank return file is a build.",
        "support": "custom_build",
        "verified": false
      }
    ],
    "shipping": [
      {
        "name": "Starshipit",
        "note": "The aggregator Odoo ships for this market. Odoo's carrier table lists Starshipit availability as Australia and New Zealand, and it is the only native route to Australasian couriers. It handles rating, label generation, returns and pickup address configuration inside Odoo.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Australia Post",
        "note": "Odoo ships no Australia Post connector. It is reached through the native Starshipit connector, a paid aggregator needing its own account and subscription.",
        "support": "third_party_paid",
        "verified": true
      },
      {
        "name": "DHL Express",
        "note": "The main international express option out of Australia. Odoo has a direct connector with availability listed as All, and DHL is also named in the Starshipit integration documentation.",
        "support": "native",
        "verified": true
      },
      {
        "name": "FedEx",
        "note": "International and cross-border express from Australia. Direct Odoo connector, availability listed as All, so no aggregator is needed.",
        "support": "native",
        "verified": true
      },
      {
        "name": "UPS",
        "note": "International express from Australia. Direct Odoo connector, availability listed as All.",
        "support": "native",
        "verified": true
      },
      {
        "name": "Sendle",
        "note": "Australian parcel service aimed at small e-commerce, sending domestically within Australia and internationally out of it. Not a native Odoo connector: third-party apps store modules exist, and the ones found were built for earlier Odoo versions.",
        "support": "third_party_paid",
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
    "openQuestions": 9
  }
};
