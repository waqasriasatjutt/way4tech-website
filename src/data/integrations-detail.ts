/* ─────────────────────────────────────────────────────────────
 * INTEGRATION DETAIL
 * Extra depth for each entry in INTEGRATIONS (src/data/site.ts).
 * Keyed by the integration slug. Product/technical content only:
 * no tax, e-invoicing or compliance claims live in this file.
 * ───────────────────────────────────────────────────────────── */

export interface IntegrationStep {
  title: string;
  desc: string;
}

export interface IntegrationFaq {
  q: string;
  a: string;
}

export interface IntegrationDetail {
  /** Short meta description for the detail page. */
  meta: string;
  /** 60-90 word opening paragraph. */
  intro: string;
  /** What moves between the two systems, and in which direction. */
  syncs: string[];
  /** Typical implementation sequence. */
  steps: IntegrationStep[];
  /** 3-5 question/answer pairs, rendered and emitted as FAQPage JSON-LD. */
  faqs: IntegrationFaq[];
  /** Slugs from SERVICES in src/data/site.ts. */
  services: string[];
}

export const INTEGRATION_DETAIL: Record<string, IntegrationDetail> = {
  /* ── Payments ───────────────────────────────────────────── */
  stripe: {
    meta: 'Connect Stripe to Odoo: online card payments on quotes and invoices, webhook-driven refunds, saved cards, and settlement reconciliation.',
    intro: 'Stripe is the usual choice when an Odoo shop sells across borders and needs cards, wallets and recurring billing under one account. In Odoo it runs as a payment provider on the website and customer portal, so quotations, sale orders and invoices can all be paid online. The hard part is rarely the checkout. It is making sure every authorization, capture, failure and refund lands on the right journal entry, and that the settlement batch reconciles against the bank at month end.',
    syncs: [
      'Payments and captures: Stripe to Odoo, one-way. Each successful charge posts against the sale order or invoice that started it.',
      'Refunds: two-way. Refunds raised in Odoo call Stripe, and refunds raised in the Stripe dashboard come back over webhooks so the two never drift.',
      'Saved cards and tokens: Stripe to Odoo, one-way. Odoo holds a token reference only, which is what makes repeat and subscription billing possible without asking the buyer again.',
      'Customer records: Odoo to Stripe, one-way, so every Stripe customer carries your partner reference.',
      'Payouts and processing fees: Stripe to Odoo, one-way, posted so the bank statement line matches the ledger.',
      'Disputes: Stripe to Odoo, one-way, raised as an activity on the related invoice for someone to action.',
    ],
    steps: [
      { title: 'Keys and environments', desc: 'Separate test and live keys, a restricted key for the server, and a staging database that can never touch live money.' },
      { title: 'Provider setup in Odoo', desc: 'Enable the payment provider, pick automatic or manual capture, and point it at the right journal, payment method and company.' },
      { title: 'Webhook endpoint', desc: 'Register the endpoint, verify the signature on every call, and make the handler idempotent so a replayed event cannot double-post.' },
      { title: 'Accounting mapping', desc: 'Fee account, settlement journal, currency handling and rounding, agreed with whoever closes your books.' },
      { title: 'Test matrix', desc: 'Authentication challenge cards, declines, partial refunds, multi-currency orders, and a deliberately dropped webhook to prove recovery.' },
      { title: 'Go-live and first settlement', desc: 'Switch to live keys, run a small real transaction, then watch the first full settlement cycle reconcile before stepping back.' },
    ],
    faqs: [
      { q: 'Does Odoo store card numbers?', a: 'No. Odoo stores a token reference returned by Stripe. Card data is entered in Stripe-hosted fields, so the card number never reaches your database or your server logs.' },
      { q: 'Can we authorize now and capture later?', a: 'Yes. Manual capture holds the authorization when the order is placed and takes the money when you confirm or ship. It suits made-to-order and stock-checked workflows.' },
      { q: 'What happens if a webhook is missed?', a: 'The handler is idempotent and keyed on the Stripe event, so Stripe can retry safely. We also add a scheduled reconciliation job that pulls anything the webhook stream missed.' },
      { q: 'Can Stripe run alongside another gateway?', a: 'Yes. Odoo supports several payment providers at once. Routing by website, currency or customer country is a common setup, for example Stripe internationally and a local gateway domestically.' },
      { q: 'Does it work with Odoo Subscriptions?', a: 'Yes. Saved tokens let the subscription renewal charge the stored payment method automatically, with a dunning flow for failures.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  hyperpay: {
    meta: 'HyperPay and Odoo integration: hosted checkout, Mada and Apple Pay brands, tokenized repeat payments, refunds and reconciliation.',
    intro: 'HyperPay is a common gateway choice for merchants selling in the Gulf, because one account covers international card brands alongside regional ones such as Mada, plus Apple Pay. In Odoo it is configured as a payment provider on the website and portal. Each payment brand is a separate entity in HyperPay, so a large part of the build is routing the right checkout to the right brand and making the result post cleanly into the ledger.',
    syncs: [
      'Checkout sessions: Odoo to HyperPay, one-way. Odoo creates the checkout with the order amount, currency and reference.',
      'Payment results: HyperPay to Odoo, one-way, over the return URL and a server-to-server status call so the outcome is never trusted from the browser alone.',
      'Refunds: Odoo to HyperPay, one-way, with the gateway reference kept on the credit note for audit.',
      'Stored tokens: HyperPay to Odoo, one-way, for repeat and card-on-file payments where the customer has agreed to it.',
      'Order and customer reference: Odoo to HyperPay, one-way, so the gateway report can be matched back line by line.',
    ],
    steps: [
      { title: 'Account and brand entities', desc: 'Collect the access token and the entity for each payment brand you intend to accept. Brands are configured separately, not as one switch.' },
      { title: 'Odoo provider configuration', desc: 'Add the provider, map each brand, and set the journal, supported currencies and the websites or companies it serves.' },
      { title: 'Server-side verification', desc: 'Always confirm the payment status with a server-to-server call before the order is confirmed. Browser redirects can be replayed or abandoned.' },
      { title: 'Currency and rounding', desc: 'Agree the minor-unit handling per currency and test amounts that expose rounding, not just round numbers.' },
      { title: 'Test and go-live', desc: 'Run the gateway test set for each brand, including a decline and a partial refund, then repeat one low-value transaction on live credentials.' },
    ],
    faqs: [
      { q: 'Is Mada included or separate?', a: 'Mada is a card brand enabled on your HyperPay account, not a second integration. Once the brand is active, the Odoo side is configuration rather than new code.' },
      { q: 'Can we take Apple Pay from an Odoo website?', a: 'Yes, where it is enabled on your HyperPay account. It needs the domain verified for the wallet and served over HTTPS, which is standard on any live Odoo site.' },
      { q: 'How do we handle a customer closing the browser mid-payment?', a: 'The order stays in a pending state and a scheduled job queries the gateway for the final status. That is why the server-to-server check matters more than the redirect.' },
      { q: 'Does it support recurring charges?', a: 'Yes, where your account is enabled for stored credentials. Odoo keeps the token reference and the renewal charges against it, with a retry and dunning sequence on failure.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-consultancy'],
  },

  paytabs: {
    meta: 'PayTabs and Odoo integration: hosted payment pages for GCC cards, tokenization for repeat billing, refunds, callbacks and reconciliation.',
    intro: 'PayTabs is widely used across the Gulf for card acceptance, tokenized repeat billing and multi-currency checkout under one merchant profile. In Odoo it sits as a payment provider behind the website, portal and invoice payment links. Most of the integration effort goes into the callback path: making sure the payment result is confirmed server side, written once, and matched to the right sale order even when the buyer never returns to your site.',
    syncs: [
      'Payment requests: Odoo to PayTabs, one-way, carrying the amount, currency, cart reference and customer details.',
      'Transaction results: PayTabs to Odoo, one-way, through the return URL plus a server-side callback that is treated as the source of truth.',
      'Refunds: Odoo to PayTabs, one-way, linked to the original transaction reference and reflected on the credit note.',
      'Tokens for card on file: PayTabs to Odoo, one-way, so agreed repeat charges do not re-prompt the buyer.',
      'Settlement reports: PayTabs to Odoo, one-way, imported for reconciliation against the bank journal.',
    ],
    steps: [
      { title: 'Profile and keys', desc: 'Set up the merchant profile, server key and region endpoint, kept separate between test and live.' },
      { title: 'Provider and journal mapping', desc: 'Configure the Odoo payment provider, pick the accepting journal, and restrict it to the currencies and companies it should serve.' },
      { title: 'Callback and return handling', desc: 'Register the callback URL, validate the signature, and make the write idempotent so a duplicate callback cannot post twice.' },
      { title: 'Reconciliation model', desc: 'Decide how fees and settlement batches post, then import a real report and reconcile it before go-live.' },
      { title: 'Test pass and cutover', desc: 'Cover success, decline, abandoned session, partial refund and full refund, then run a live low-value transaction end to end.' },
    ],
    faqs: [
      { q: 'Do we need a separate integration per country?', a: 'Usually not. One profile can cover several currencies. Where you hold separate merchant profiles per market, Odoo can carry several provider records and route by website or currency.' },
      { q: 'Where does the payment status come from?', a: 'From the server-side callback, verified before anything is written. The browser return URL is used only to show the customer a result page.' },
      { q: 'Can we refund part of an order?', a: 'Yes. A partial refund is raised against the original transaction reference and posts a credit note in Odoo for the same amount, so the two systems agree.' },
      { q: 'Is tokenization required for subscriptions?', a: 'For unattended renewals, yes. The customer authorizes card storage once, PayTabs returns a token, and Odoo charges against that token on each renewal.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  razorpay: {
    meta: 'Razorpay and Odoo integration: UPI and card checkout, webhook-verified payment capture, refunds, payment links and settlement reconciliation.',
    intro: 'Razorpay covers cards, UPI, netbanking and wallets for merchants selling in India, which makes it the default gateway for Odoo websites in that market. In Odoo it runs as a payment provider on the website, portal and invoice payment links. Because UPI collect requests can complete long after the customer leaves the page, the integration is built around verified webhooks and a status poll rather than the browser redirect.',
    syncs: [
      'Orders and payment attempts: Odoo to Razorpay, one-way, with the Odoo reference attached to every attempt.',
      'Payment capture and failure: Razorpay to Odoo, one-way, over signed webhooks, then reflected on the sale order or invoice.',
      'Refunds: two-way. Odoo can raise them, and refunds started in the Razorpay dashboard flow back so the credit note is not missed.',
      'Payment links: Odoo to Razorpay, one-way, for collecting on an invoice without a website checkout.',
      'Settlements and fees: Razorpay to Odoo, one-way, imported for reconciliation against the bank statement.',
    ],
    steps: [
      { title: 'Keys per environment', desc: 'Test and live key pairs kept apart, with the secret stored outside the database where your hosting allows it.' },
      { title: 'Provider configuration', desc: 'Enable the provider in Odoo, set the journal and currency, and decide which payment methods are offered at checkout.' },
      { title: 'Webhook and signature checks', desc: 'Register the webhook, verify the signature on every event, and key the write on the payment id so retries are safe.' },
      { title: 'Pending payment handling', desc: 'Add a scheduled job that resolves attempts left pending, which is the normal case for UPI collect requests.' },
      { title: 'Reconciliation and go-live', desc: 'Map fees and settlement batches, test a full and a partial refund, then move to live keys and watch the first settlement.' },
    ],
    faqs: [
      { q: 'Does UPI work without the customer returning to the site?', a: 'Yes. The payment can complete in the customer app. Odoo relies on the webhook and a pending-payment job to confirm the order, so nothing depends on the browser coming back.' },
      { q: 'Can we send a payment link on an existing invoice?', a: 'Yes. The invoice can carry a payment link that settles the exact amount and posts back against that invoice, which suits collections chasing over email or WhatsApp.' },
      { q: 'What if a customer pays twice?', a: 'The second payment is captured as an overpayment and either refunded through the same reference or held as a credit on the customer account. The rule is agreed before go-live rather than handled ad hoc.' },
      { q: 'Do refunds appear automatically?', a: 'Yes, when webhooks are configured. A refund raised in the Razorpay dashboard reaches Odoo and prompts the matching credit note instead of being discovered at month end.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  mada: {
    meta: 'Mada acceptance in Odoo: enable the Saudi domestic card scheme through your gateway, route the brand correctly, and reconcile it in Odoo.',
    intro: 'Mada is the Saudi domestic card scheme, and it is the card most shoppers in the Kingdom actually hold. It is not a connector you install on its own. Acceptance is enabled through the gateway you already use, and the Odoo work is configuration plus routing: presenting the brand at checkout, sending the transaction down the right path, and labelling receipts and journal entries so finance can tell domestic card volume apart from international.',
    syncs: [
      'Brand selection at checkout: Odoo to gateway, one-way, so the buyer sees the domestic card option where it applies.',
      'Authorization and capture results: gateway to Odoo, one-way, posted against the originating order or invoice.',
      'Refunds: Odoo to gateway, one-way, against the original transaction reference.',
      'Scheme label on the transaction: gateway to Odoo, one-way, kept on the payment record so reporting can split domestic from international volume.',
      'Settlement batches: gateway to Odoo, one-way, imported for bank reconciliation.',
    ],
    steps: [
      { title: 'Confirm acceptance with your gateway', desc: 'Acceptance is arranged with your acquirer or gateway provider. Nothing in Odoo can enable it on its own.' },
      { title: 'Enable the brand in the provider record', desc: 'Add the brand to the Odoo payment provider so it appears at checkout for the right currency and country.' },
      { title: 'Routing and card-type logic', desc: 'Co-badged cards can be sent down more than one path. Agree the routing rule, then prove it with test cards rather than assuming.' },
      { title: 'Receipt and journal labelling', desc: 'Show the scheme on the customer receipt and keep it on the payment record so the finance team can report by scheme.' },
      { title: 'Live verification', desc: 'Run a low-value live transaction with a real domestic card and follow it through to the settlement report.' },
    ],
    faqs: [
      { q: 'Is there a Mada connector for Odoo?', a: 'No, and there does not need to be. Mada is accepted through a gateway such as HyperPay or PayTabs. Once the brand is live on your merchant account, Odoo needs configuration, not a new integration.' },
      { q: 'Why do some cards show as international?', a: 'Co-badged cards can route either domestically or through an international scheme depending on how the transaction is sent. Getting that routing right is the main technical decision here.' },
      { q: 'Can we accept it in the shop and on the POS?', a: 'Yes. The website uses the online gateway, while the shop counter normally uses a card terminal. Both can post into the same Odoo journals so the day-end figure is one number.' },
      { q: 'Does it change how refunds work?', a: 'No. Refunds go back through the original transaction reference at your gateway, and Odoo raises the matching credit note as it would for any card payment.' },
    ],
    services: ['odoo-integration', 'odoo-pos-deployment', 'odoo-localization'],
  },

  /* ── Shipping ───────────────────────────────────────────── */
  aramex: {
    meta: 'Aramex and Odoo integration: live rates at checkout, waybill and label generation from the delivery order, pickup booking, tracking and COD.',
    intro: 'Aramex is the default courier for a lot of Middle East retail, both for domestic delivery and for outbound international parcels. Integrated with Odoo, the warehouse stops rekeying addresses into a courier portal: the delivery order creates the waybill, prints the label, books the pickup and carries the tracking number back to the customer. Cash on delivery is the part most teams underestimate, because the collected cash has to reconcile against the sales ledger.',
    syncs: [
      'Rate requests: Odoo to Aramex, one-way, priced at checkout or when the delivery order is created.',
      'Shipment and waybill creation: Odoo to Aramex, one-way, from the confirmed delivery order.',
      'Labels and documents: Aramex to Odoo, one-way, attached to the delivery order so the warehouse prints from Odoo.',
      'Pickup requests: Odoo to Aramex, one-way, raised per collection window rather than per parcel.',
      'Tracking status: Aramex to Odoo, one-way, polled or pushed onto the delivery order and the customer portal.',
      'Cash on delivery amounts: Odoo to Aramex, one-way, with the collected value reconciled back against the order.',
    ],
    steps: [
      { title: 'Account credentials', desc: 'Account number, PIN, entity and country details for each shipping account, with test credentials kept separate.' },
      { title: 'Service and product mapping', desc: 'Map Aramex services to Odoo delivery methods, including domestic against international and document against parcel.' },
      { title: 'Address and weight quality', desc: 'Fix address fields, contact numbers and package weights before going live. Most courier API rejections are data problems, not integration problems.' },
      { title: 'Label printing', desc: 'Wire label output into the warehouse print flow, matched to the printer and label stock actually in use.' },
      { title: 'Cash on delivery reconciliation', desc: 'Agree how collected cash posts and reconciles, so a remittance file can be matched to orders instead of eyeballed.' },
      { title: 'Pilot then scale', desc: 'Run one warehouse and one service live, confirm labels scan and track, then roll out the rest.' },
    ],
    faqs: [
      { q: 'Can customers see live rates at checkout?', a: 'Yes. The delivery method can price against the live rate for the cart weight and destination. Many merchants cap or flatten that rate for a smoother checkout and keep the live call for internal costing.' },
      { q: 'Does the warehouse still use the courier portal?', a: 'It should not need to. The waybill, label and pickup all come from the Odoo delivery order, which is the point of integrating in the first place.' },
      { q: 'How is cash on delivery handled?', a: 'The COD amount goes on the shipment, and the collected cash is reconciled against the order when the remittance arrives. That mapping is agreed with finance during the build.' },
      { q: 'What happens when an address is rejected?', a: 'The error is shown on the delivery order with the reason, so the picker or customer service can correct it and retry rather than the shipment silently failing.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  dhl: {
    meta: 'DHL and Odoo integration: live express rates, shipment and label creation from delivery orders, pickup booking, tracking and cross-border data.',
    intro: 'DHL suits Odoo merchants shipping cross-border, where the parcel needs a rated service, a printed label and a paperwork set that will pass at the border. Integrated properly, the delivery order in Odoo becomes the shipment: it prices the service, creates the waybill, produces the label and returns a tracking number to the sales order and the customer portal. The data quality work on weights, dimensions and product descriptions is what decides whether it holds up.',
    syncs: [
      'Rate quotes: Odoo to DHL, one-way, by weight, dimensions, service and destination.',
      'Shipment creation: Odoo to DHL, one-way, from the confirmed delivery order.',
      'Labels and shipping documents: DHL to Odoo, one-way, stored on the delivery order for printing.',
      'Cross-border shipment data: Odoo to DHL, one-way, taken from the product and order records rather than typed again.',
      'Pickup booking: Odoo to DHL, one-way, per collection rather than per parcel.',
      'Tracking events: DHL to Odoo, one-way, onto the delivery order and visible to the customer.',
    ],
    steps: [
      { title: 'Account and service set', desc: 'Confirm which account numbers and services you ship on, and which are available for each origin country.' },
      { title: 'Product data readiness', desc: 'Weights, dimensions, origin and clear product descriptions on the product record. Cross-border shipments fail on missing product data more than on anything else.' },
      { title: 'Delivery method mapping', desc: 'Create an Odoo delivery method per service, with the rating rule and any surcharge handling agreed up front.' },
      { title: 'Label and document printing', desc: 'Match label format to the warehouse printer, and route generated documents into the picking flow.' },
      { title: 'Multi-piece and packaging', desc: 'Set up Odoo packages so a multi-box order produces one shipment with the right number of labels.' },
      { title: 'Pilot shipments', desc: 'Ship real low-value parcels on each service, confirm scanning and tracking, then open it to the full catalogue.' },
    ],
    faqs: [
      { q: 'Can we show a live DHL rate at checkout?', a: 'Yes, if products carry accurate weights and dimensions. Without those the quote will be wrong, so most merchants fix the product data first and switch on live rating afterwards.' },
      { q: 'Does it handle multi-box shipments?', a: 'Yes. Odoo packages map to pieces on the shipment, so a three-box order produces three labels under one tracking arrangement rather than three separate shipments.' },
      { q: 'Where does the cross-border paperwork data come from?', a: 'From the product and order records in Odoo, which is why product descriptions, values, weights and country of origin are set up before go-live rather than typed per shipment.' },
      { q: 'Can we ship on the customer account number?', a: 'Yes, where you have that arrangement. The account to bill is held on the customer or the delivery method and sent with the shipment request.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  fedex: {
    meta: 'FedEx and Odoo integration: rate shopping across express, ground and freight, label printing from delivery orders, pickups and tracking.',
    intro: 'FedEx covers express, ground and freight, which is useful when one Odoo warehouse ships small parcels and pallets from the same dock. The connector prices the shipment from the delivery order, creates the label in the format your printers expect, books the collection and returns tracking to the sales order. Where several services are live, Odoo can rate shop across them and pick by cost or by promised transit rather than by habit.',
    syncs: [
      'Rate requests across services: Odoo to FedEx, one-way, so express, ground and freight can be compared on the same order.',
      'Shipment creation: Odoo to FedEx, one-way, from the confirmed delivery order.',
      'Labels: FedEx to Odoo, one-way, in thermal or PDF form, stored on the picking.',
      'Address validation: Odoo to FedEx, one-way, before the shipment is created rather than after it fails.',
      'Pickup requests: Odoo to FedEx, one-way, per collection window.',
      'Tracking updates: FedEx to Odoo, one-way, onto the delivery order and the customer portal.',
    ],
    steps: [
      { title: 'Account and service enablement', desc: 'Confirm the account, the origin locations and which services are active on each.' },
      { title: 'Delivery methods in Odoo', desc: 'One method per service, with rating rules, packaging defaults and any handling charge agreed before build.' },
      { title: 'Label format and printers', desc: 'Choose thermal or PDF output, then test on the actual label stock in the warehouse. Getting this wrong costs more time than the API work.' },
      { title: 'Rate shopping rules', desc: 'Decide whether the cheapest or the fastest service wins, and which customers or order types override that.' },
      { title: 'Freight handling', desc: 'Set up pallet packaging and any freight-specific fields separately from parcel shipments.' },
      { title: 'Pilot and rollout', desc: 'Run live shipments per service, verify scanning and tracking, then open it to all warehouses.' },
    ],
    faqs: [
      { q: 'Can Odoo pick the cheapest service automatically?', a: 'Yes. Rate shopping compares the enabled services for that shipment and selects by your rule, whether that is lowest cost or earliest delivery. The chosen service stays visible on the delivery order.' },
      { q: 'Do we get thermal labels?', a: 'Yes. Label output can be produced for thermal printers or as PDF for a desktop printer. Both are tested against your actual hardware during rollout.' },
      { q: 'Does it cover freight as well as parcels?', a: 'Yes, where your account has freight services enabled. Freight uses different packaging and handling data, so it is configured as its own delivery method rather than sharing parcel settings.' },
      { q: 'Can we validate addresses before shipping?', a: 'Yes. Address validation runs before the shipment is created, so bad addresses are corrected on the order instead of producing a label that will not deliver.' },
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation'],
  },

  /* ── eCommerce ──────────────────────────────────────────── */
  shopify: {
    meta: 'Shopify and Odoo integration: two-way product, inventory and order sync, fulfilment and tracking write-back, refunds and payout reconciliation.',
    intro: 'Shopify runs the storefront well, and Odoo runs the business behind it: stock, purchasing, accounting and fulfilment. Connecting the two turns the store into a sales channel rather than a separate island of data. Orders land in Odoo as sale orders, stock levels flow the other way from the warehouse, and fulfilment with its tracking number is written back to Shopify so the buyer gets the shipping email without anyone touching the admin.',
    syncs: [
      'Products and variants: Odoo to Shopify, one-way in most builds, so the ERP owns the catalogue. Two-way is possible where merchandising is done in Shopify.',
      'Inventory levels: Odoo to Shopify, one-way, per Shopify location mapped to an Odoo warehouse.',
      'Orders: Shopify to Odoo, one-way, created as sale orders with customer, lines, discounts, shipping and payment status.',
      'Customers: Shopify to Odoo, one-way, matched on email so repeat buyers do not create duplicate contacts.',
      'Fulfilment and tracking: Odoo to Shopify, one-way, when the delivery is validated.',
      'Refunds and cancellations: Shopify to Odoo, one-way, producing the matching credit note or cancelled order.',
      'Payouts: Shopify to Odoo, one-way, imported so gateway settlements reconcile against the bank.',
    ],
    steps: [
      { title: 'Decide the system of record', desc: 'Which system owns products, prices and stock. Nearly every failed connector project skipped this conversation.' },
      { title: 'Key mapping', desc: 'Match on SKU, and clean the SKUs first. Fuzzy matching on names is where duplicate products come from.' },
      { title: 'Locations to warehouses', desc: 'Map every Shopify location to an Odoo warehouse, and decide what happens to stock you do not want the store to sell.' },
      { title: 'Order flow rules', desc: 'Paid against pending orders, discounts, gift cards, shipping lines and how each posts in Odoo.' },
      { title: 'Historical import', desc: 'Backfill open orders and customers, with a cutover date, so the ledger does not start half empty.' },
      { title: 'Go-live and monitoring', desc: 'A queue with retry and an error dashboard, because a store that quietly stops syncing at midnight is worse than one that shouts.' },
    ],
    faqs: [
      { q: 'Which system should own stock?', a: 'Odoo, in almost every case. It sees purchase orders, returns, transfers and manufacturing, so its number is the true one. Shopify then receives the available quantity per location.' },
      { q: 'How fast does stock update?', a: 'Near real time for changes triggered by orders, plus a periodic full reconciliation to catch anything missed. The reconciliation pass matters more than the speed of the fast path.' },
      { q: 'What about multiple Shopify stores?', a: 'Several stores can feed one Odoo database, each mapped to its own sales channel, price list, warehouse and journal, which keeps reporting per store intact.' },
      { q: 'Do refunds sync back?', a: 'Yes. A refund in Shopify creates the matching credit note in Odoo, and a return can restock the item if the flow is set up that way.' },
      { q: 'Will it work with Shopify POS as well?', a: 'Orders from Shopify POS arrive like any other order, mapped to the location they were sold at. Whether you keep Shopify POS or move to Odoo POS is a business decision, not a technical limit.' },
    ],
    services: ['odoo-ecommerce', 'odoo-integration', 'odoo-customization'],
  },

  woocommerce: {
    meta: 'WooCommerce and Odoo integration: catalogue and stock push, order and customer import, refunds, and reconciliation for WordPress shops.',
    intro: 'WooCommerce gives you a WordPress storefront with full control over the front end, while Odoo carries stock, purchasing and accounts. The connector uses the WooCommerce REST API with a key pair, pushing catalogue and stock out and pulling orders and customers in. The detail that decides quality is variable products: Woo variations must line up with Odoo variants on SKU, or the two catalogues drift apart within weeks.',
    syncs: [
      'Products and variations: Odoo to WooCommerce, one-way, including price, description, images and variant attributes.',
      'Stock quantities: Odoo to WooCommerce, one-way, from the warehouse that serves the store.',
      'Orders: WooCommerce to Odoo, one-way, as sale orders with lines, shipping, discounts and payment state.',
      'Customers: WooCommerce to Odoo, one-way, matched on email with billing and shipping addresses.',
      'Order status and tracking: Odoo to WooCommerce, one-way, when the delivery is validated.',
      'Refunds: WooCommerce to Odoo, one-way, creating the matching credit note.',
    ],
    steps: [
      { title: 'API credentials', desc: 'Generate a read/write key pair on the WooCommerce side and confirm the site is served over HTTPS with permalinks that expose the REST route.' },
      { title: 'Catalogue alignment', desc: 'Reconcile SKUs between the two systems before the first sync. Fixing duplicates afterwards is far more expensive.' },
      { title: 'Variant mapping', desc: 'Map Woo attributes and variations to Odoo attributes and variants, one to one, so options do not multiply.' },
      { title: 'Tax and shipping lines', desc: 'Map the order tax and shipping lines onto the taxes and delivery products already configured in Odoo.' },
      { title: 'Sync scheduling', desc: 'Webhooks for orders, scheduled jobs for catalogue and stock, plus a nightly reconciliation to close gaps.' },
      { title: 'Cutover', desc: 'Import open orders, switch the store to the live connector, and monitor the error queue through the first busy day.' },
    ],
    faqs: [
      { q: 'Does it work with a custom WooCommerce theme?', a: 'Yes. The connector talks to the REST API, not the theme. Front-end customization has no effect on the sync, which is one reason merchants keep WooCommerce for design freedom.' },
      { q: 'What about plugins that add order fields?', a: 'Extra fields exposed through the API can be mapped into Odoo. Fields stored only in a plugin table need a small extension on the WordPress side before they can be read.' },
      { q: 'Can Odoo push prices to the store?', a: 'Yes. A price list in Odoo can drive store prices, including sale prices with start and end dates, so promotions are managed in one place.' },
      { q: 'How are stock conflicts handled?', a: 'Odoo is the source of truth and overwrites the store quantity. Overselling during a spike is managed with a buffer quantity and a shorter sync interval on fast-moving lines.' },
    ],
    services: ['odoo-ecommerce', 'odoo-integration', 'odoo-customization'],
  },

  magento: {
    meta: 'Magento and Adobe Commerce integration with Odoo: catalogue and stock sync across multiple sources, order import, store views and warehouses.',
    intro: 'Magento and Adobe Commerce carry large catalogues, multiple store views and multiple stock sources, so an Odoo connector here is more than orders in and stock out. Attribute sets, configurable products and store-view specific content all have to map onto Odoo variants, price lists and languages. Get that model right and the store scales. Get it wrong and every catalogue change turns into manual work in two systems.',
    syncs: [
      'Products, attribute sets and configurables: Odoo to Magento, one-way in most builds, mapped onto Odoo variants.',
      'Stock by source: Odoo to Magento, one-way, with each Magento inventory source mapped to an Odoo warehouse.',
      'Prices per store view or customer group: Odoo to Magento, one-way, driven by Odoo price lists.',
      'Orders: Magento to Odoo, one-way, tagged with the store view they came from so reporting stays split.',
      'Customers and addresses: Magento to Odoo, one-way, matched on email.',
      'Shipments and tracking: Odoo to Magento, one-way, on delivery validation.',
      'Credit memos: Magento to Odoo, one-way, as credit notes.',
    ],
    steps: [
      { title: 'Model review', desc: 'Walk through attribute sets, configurable products, websites, store views and inventory sources before writing a line of mapping.' },
      { title: 'Catalogue mapping', desc: 'Attributes to Odoo attributes, configurables to variants, media to Odoo images, with SKU as the key.' },
      { title: 'Multi-source inventory', desc: 'Map each source to a warehouse, and decide the stock rule per source rather than pushing one global number.' },
      { title: 'Order and channel rules', desc: 'Store view to sales team, price list, journal and warehouse, so each channel reports separately.' },
      { title: 'Bulk and async processing', desc: 'Use asynchronous endpoints for large catalogue pushes and keep a queue with retry, because a big catalogue will time out on synchronous calls.' },
      { title: 'Load test then cutover', desc: 'Sync the full catalogue on staging, measure it, tune it, then cut over with open orders imported.' },
    ],
    faqs: [
      { q: 'Does it support multi-source inventory?', a: 'Yes. Each Magento source maps to an Odoo warehouse or location, so a store fulfilling from several sites gets the right availability per source instead of one blended number.' },
      { q: 'How are configurable products handled?', a: 'A configurable product with its simple products maps to an Odoo product template with variants. The attribute mapping is agreed up front, since this is where most catalogue drift starts.' },
      { q: 'Can different store views have different prices?', a: 'Yes. Odoo price lists can be mapped per store view or customer group, which keeps regional pricing in the ERP rather than duplicated in the store admin.' },
      { q: 'Is the sync fast enough for a large catalogue?', a: 'For tens of thousands of SKUs, yes, using asynchronous bulk endpoints and delta syncs rather than full pushes. Full catalogue runs are scheduled off peak.' },
    ],
    services: ['odoo-ecommerce', 'odoo-integration', 'odoo-customization'],
  },

  amazon: {
    meta: 'Amazon Seller Central and Odoo integration: order import across marketplaces, FBA and merchant stock, shipment confirmation and settlement reconciliation.',
    intro: 'Selling on Amazon splits your operation in two: Amazon holds the customer and, under fulfilment by Amazon, the stock as well. Connecting Seller Central to Odoo puts the orders, the fees and the inventory picture back in one place. Orders import as sale orders per marketplace, merchant-fulfilled shipments are confirmed from Odoo, and settlement reports are reconciled so the margin you report is the margin after Amazon has taken its cut.',
    syncs: [
      'Orders: Amazon to Odoo, one-way, per marketplace, with fulfilment channel preserved.',
      'Merchant-fulfilled shipments and tracking: Odoo to Amazon, one-way, on delivery validation.',
      'Listing quantities for merchant-fulfilled stock: Odoo to Amazon, one-way.',
      'Fulfilment by Amazon inventory: Amazon to Odoo, one-way, held in a dedicated location so it is visible without being sellable elsewhere.',
      'Refunds and returns: Amazon to Odoo, one-way, as credit notes and return moves.',
      'Settlement reports and fees: Amazon to Odoo, one-way, posted so payouts reconcile against the bank.',
    ],
    steps: [
      { title: 'Seller account access', desc: 'Authorize the Odoo application against the seller account and confirm which marketplaces are in scope.' },
      { title: 'SKU and ASIN mapping', desc: 'Match seller SKUs to Odoo products. Anything unmatched must fail loudly rather than create a stray product.' },
      { title: 'Fulfilment model split', desc: 'Separate merchant-fulfilled from fulfilment by Amazon, with different locations, routes and stock rules for each.' },
      { title: 'Marketplace configuration', desc: 'A sales team, price list, journal and currency per marketplace so country reporting stays clean.' },
      { title: 'Fee and settlement mapping', desc: 'Map commission, fulfilment and storage fees to expense accounts so gross and net margin are both real numbers.' },
      { title: 'Pilot marketplace', desc: 'Go live on one marketplace, prove the settlement reconciles, then add the rest.' },
    ],
    faqs: [
      { q: 'Does it handle both FBA and merchant-fulfilled orders?', a: 'Yes, and they are treated differently on purpose. Merchant-fulfilled orders create a delivery in Odoo. FBA orders record the sale and consume stock from the Amazon location without asking your warehouse to pick anything.' },
      { q: 'Can we sell on several marketplaces from one database?', a: 'Yes. Each marketplace is configured with its own currency, price list and journal, so reporting by country works without separate databases.' },
      { q: 'How do Amazon fees reach the accounts?', a: 'Through the settlement report. Fees post to the accounts you map, so the payout that lands in the bank reconciles line for line instead of being booked as one lump.' },
      { q: 'What happens to a SKU that does not exist in Odoo?', a: 'The order is flagged rather than guessed. Auto-creating products from marketplace data is how catalogues fill with duplicates, so we make the mismatch visible instead.' },
    ],
    services: ['odoo-ecommerce', 'odoo-integration', 'odoo-implementation'],
  },

  /* ── Messaging ──────────────────────────────────────────── */
  whatsapp: {
    meta: 'WhatsApp Business API and Odoo: order and delivery notifications, OTP, approved templates, and inbound replies routed to CRM and helpdesk.',
    intro: 'WhatsApp is where customers in much of the Middle East, South Asia and Africa actually reply, so pushing order confirmations, delivery updates and payment reminders there beats email on response rate. Connected to Odoo through the Business API, messages are sent from the record they belong to, and inbound replies are routed back onto the lead, order or ticket. Outside an open conversation, only pre-approved message templates can be sent, which shapes the whole design.',
    syncs: [
      'Outbound template messages: Odoo to WhatsApp, one-way, triggered by order confirmation, delivery, invoice or a scheduled reminder.',
      'Inbound messages: WhatsApp to Odoo, one-way, matched on phone number and posted onto the related lead, order or ticket.',
      'Delivery and read receipts: WhatsApp to Odoo, one-way, so failed sends are visible rather than assumed.',
      'One-time passcodes: Odoo to WhatsApp, one-way, for login or order verification flows.',
      'Contact numbers: Odoo to WhatsApp, one-way, normalized to international format before any send.',
      'Conversation history: stored against the Odoo record so the next agent sees what was said.',
    ],
    steps: [
      { title: 'Business account setup', desc: 'A WhatsApp Business account with a verified number that is not already tied to the consumer app.' },
      { title: 'Template design and approval', desc: 'Draft the templates you need, submit them for approval, and design around the fact that free-text sending is limited outside an open conversation.' },
      { title: 'Number normalization', desc: 'Clean the contact numbers in Odoo to international format first. This is the single most common cause of failed sends.' },
      { title: 'Trigger mapping', desc: 'Decide which Odoo events send which template, to whom, and in which language.' },
      { title: 'Inbound routing', desc: 'Route replies to the right team, with a fallback queue so nothing lands in an unwatched inbox.' },
      { title: 'Monitoring', desc: 'Track delivery failures and template rejections so a broken template is caught the same day, not at month end.' },
    ],
    faqs: [
      { q: 'Can we send any message we like?', a: 'No. Outside an open conversation with the customer, sends are limited to templates approved in advance. Once the customer replies, free-text conversation is possible for a period, which is why templates are designed to invite a reply.' },
      { q: 'Do replies reach the right person?', a: 'Yes. Inbound messages are matched on phone number and posted to the related record, then routed to a team. An unmatched number goes to a fallback queue rather than nowhere.' },
      { q: 'Can we send in Arabic and English?', a: 'Yes. Templates are approved per language, and Odoo picks the language from the customer record so each contact gets their own.' },
      { q: 'Is this the same as WhatsApp Web on a shared phone?', a: 'No, and that difference matters. The Business API gives you per-record history, delivery receipts, automation and multiple agents on one number, none of which a shared handset can do.' },
      { q: 'Can it send one-time passcodes?', a: 'Yes, using a template built for verification. It is a common pattern for portal login and order confirmation where email deliverability is poor.' },
    ],
    services: ['odoo-integration', 'odoo-customization', 'odoo-ecommerce'],
  },

  /* ── Hardware ───────────────────────────────────────────── */
  zkteco: {
    meta: 'ZKTeco biometric devices with Odoo: fingerprint and face punches pulled into attendance, employee enrolment mapping, and payroll-ready records.',
    intro: 'ZKTeco fingerprint and face terminals are the standard clock-in hardware across much of the region, and they are only useful to HR once the punches reach the system that calculates pay. Connected to Odoo, device logs become attendance records against the right employee, late and overtime rules run on them, and payroll reads a number nobody typed. The awkward parts are device-to-employee mapping, duplicate punches and devices that go offline mid-shift.',
    syncs: [
      'Punch logs: device to Odoo, one-way, pulled on a schedule or pushed by the device where the model supports it.',
      'Employee enrolment: Odoo to device, one-way, so a new joiner is registered without someone walking to every terminal.',
      'Device user id mapping: held in Odoo against the employee, which is what stops punches landing on the wrong person.',
      'Attendance records: built in Odoo from paired in and out punches, with unpaired punches raised rather than silently dropped.',
      'Worked hours, late and overtime: computed in Odoo against the assigned shift.',
      'Device health: device to Odoo, one-way, so a terminal that stopped reporting is noticed the same day.',
    ],
    steps: [
      { title: 'Device inventory', desc: 'List every terminal, its model, firmware and location, and confirm which are reachable from the server.' },
      { title: 'Network path', desc: 'Devices sit on the local network, so a site connector or a controlled route to the Odoo server is agreed before anything else.' },
      { title: 'Employee mapping', desc: 'Map device user ids to Odoo employees and clear out the enrolments left behind by leavers.' },
      { title: 'Punch pairing rules', desc: 'Define how in and out are paired, how duplicate punches within a short window are handled, and what happens to a missing out punch.' },
      { title: 'Shift and rule configuration', desc: 'Set shift schedules, grace periods and overtime rules so attendance feeds payroll without manual editing.' },
      { title: 'Parallel run', desc: 'Run device attendance next to the existing method for one full pay period, compare, then retire the old one.' },
    ],
    faqs: [
      { q: 'Do the devices need internet access?', a: 'They need a network path to the Odoo server. On a single site that is the local network. Across several sites we usually place a small connector on site that forwards logs, rather than exposing terminals to the internet.' },
      { q: 'What happens if a device goes offline?', a: 'The terminal keeps its punches in local memory and they are collected on the next successful pull. The gap is also flagged so nobody discovers it at payroll run.' },
      { q: 'Can one employee use several devices?', a: 'Yes. An employee can punch at any enrolled terminal and the logs merge into one attendance record, which is normal for multi-gate sites and staff who move between branches.' },
      { q: 'Does the attendance data reach payroll?', a: 'Yes. Worked hours, late marks and overtime are computed in Odoo and read by the payroll rules, so the payslip traces back to a punch instead of a spreadsheet.' },
      { q: 'What about a missed punch?', a: 'The record is raised as an exception for a manager to approve or correct, and the correction is logged. Silently inventing a time is the one thing an attendance system must never do.' },
    ],
    services: ['odoo-integration', 'odoo-payroll-setup', 'odoo-customization'],
  },

  /* ── Finance ────────────────────────────────────────────── */
  quickbooks: {
    meta: 'QuickBooks to Odoo migration: chart of accounts, customers, vendors, open balances and history moved with a clean cutover and a reconciled trial balance.',
    intro: 'Most teams reach Odoo from QuickBooks because the books were fine but nothing else was: no stock, no manufacturing, no proper order flow. The work is a migration rather than an ongoing sync. Master data, open receivables and payables and enough history to run comparisons move across, then a cutover date closes QuickBooks for new entries. The measure of success is simple: the opening trial balance in Odoo matches the closing one in QuickBooks.',
    syncs: [
      'Chart of accounts: QuickBooks to Odoo, one-way, reviewed and often reshaped rather than copied line for line.',
      'Customers and vendors: QuickBooks to Odoo, one-way, deduplicated on the way in.',
      'Products and services: QuickBooks to Odoo, one-way, with stock items given proper product types.',
      'Open invoices and bills: QuickBooks to Odoo, one-way, with their remaining balances so collections continue uninterrupted.',
      'Opening balances and historical journals: QuickBooks to Odoo, one-way, at the depth you agree to carry.',
      'Bank accounts and reconciled statements: QuickBooks to Odoo, one-way, up to the cutover date.',
    ],
    steps: [
      { title: 'Extract and review', desc: 'Pull the full data set out of QuickBooks and review it with your accountant before importing anything.' },
      { title: 'Chart of accounts design', desc: 'Decide what carries over and what is restructured. A migration is the cheapest chance you will ever get to fix the account structure.' },
      { title: 'Master data cleanup', desc: 'Deduplicate customers, vendors and items. Importing duplicates costs far more to unpick later.' },
      { title: 'History depth decision', desc: 'Agree how many closed periods to bring across. Open items are essential, deep history is a choice.' },
      { title: 'Trial run and comparison', desc: 'Import into a test database and compare the trial balance, aged receivable and aged payable against QuickBooks line by line.' },
      { title: 'Cutover', desc: 'Freeze QuickBooks, import final balances, and start posting in Odoo with the old system kept read-only for reference.' },
    ],
    faqs: [
      { q: 'Is this a live two-way sync?', a: 'No. It is a one-way migration to Odoo with a cutover date. Running two accounting systems in parallel indefinitely creates reconciliation work that nobody has time for.' },
      { q: 'How much history can we bring?', a: 'Open receivables and payables always come across. Closed history is a decision: a couple of years of journals is common for comparison reporting, more than that is rarely worth the effort.' },
      { q: 'Will the numbers match?', a: 'That is the acceptance test. We compare the trial balance, aged receivable and aged payable between the two systems and do not go live until they agree.' },
      { q: 'What about attachments and old documents?', a: 'Exported documents can be attached to the migrated records, or the QuickBooks file can be kept read-only for lookups. Which route you take depends on how often you actually need them.' },
    ],
    services: ['odoo-migration', 'odoo-implementation', 'odoo-consultancy'],
  },

  /* ── ERP ────────────────────────────────────────────────── */
  sap: {
    meta: 'SAP and Odoo integration: master data and transaction sync between a group SAP core and Odoo running a plant, subsidiary or sales channel.',
    intro: 'Odoo next to SAP is usually a two-speed setup: the group runs SAP as the financial core while a plant, subsidiary or new market runs Odoo because it can be changed quickly. The integration keeps them agreed on master data and on the transactions that cross between them. Direction matters more than volume here. Deciding which system owns a customer, a material and a price, and where the exceptions sit, is the whole project.',
    syncs: [
      'Material master: SAP to Odoo, one-way in most designs, with local-only items allowed in a reserved number range.',
      'Business partners: SAP to Odoo for group accounts, one-way, while locally acquired customers can flow the other way once approved.',
      'Sales orders: Odoo to SAP, one-way, where SAP holds group revenue reporting.',
      'Deliveries and goods movements: two-way, depending on which system runs the warehouse for each site.',
      'Invoices and journal postings: Odoo to SAP, one-way, summarized or line by line as your finance team requires.',
      'Prices and discount conditions: SAP to Odoo, one-way, mapped onto price lists.',
    ],
    steps: [
      { title: 'Ownership matrix', desc: 'Write down, per object, which system owns it, which consumes it and what happens on conflict. Everything else follows from this document.' },
      { title: 'Interface choice', desc: 'Agree the transport with the SAP team: message-based, service-based or file-based, and whether it is near real time or batched.' },
      { title: 'Key mapping', desc: 'Cross-reference tables between SAP and Odoo identifiers, held in Odoo and never guessed at runtime.' },
      { title: 'Middleware and queue', desc: 'A queue with retry, dead-letter handling and full message logging. Direct point-to-point calls with no queue fail badly on the first outage.' },
      { title: 'Error handling and ownership', desc: 'Failed messages need a named owner and a screen to work from, otherwise they accumulate unseen.' },
      { title: 'Phased cutover', desc: 'Start with master data one way, then one transaction type, then the rest. Big-bang integration between two ERPs rarely survives contact with month end.' },
    ],
    faqs: [
      { q: 'Which system should be the master?', a: 'Usually SAP for group financial and material master, Odoo for the local operation it runs. What matters is that the answer is written down per object before build, not decided per incident afterwards.' },
      { q: 'Real time or batch?', a: 'Both, by object. Master data typically moves in scheduled batches, transactions that block an operation move as soon as they occur. Making everything real time adds cost without adding value.' },
      { q: 'What happens during an outage?', a: 'Messages queue and retry, with a dead-letter queue for anything that keeps failing. Nothing is dropped, and the backlog is visible with an owner attached.' },
      { q: 'Can Odoo post journals into SAP?', a: 'Yes, either summarized per period or line by line. Your finance team decides the level of detail, which then drives how much reconciliation work each close involves.' },
    ],
    services: ['odoo-integration', 'odoo-consultancy', 'odoo-migration'],
  },

  /* ── CRM ────────────────────────────────────────────────── */
  salesforce: {
    meta: 'Salesforce and Odoo integration: two-way accounts, contacts and opportunity sync, closed-won to sale order, and invoice status back to the CRM.',
    intro: 'Sales teams that have lived in Salesforce for years rarely want to move, and they should not have to just because the back office runs Odoo. The integration keeps accounts, contacts and opportunities agreed between the two, turns a closed-won opportunity into a sale order in Odoo, and sends invoice and payment status back so a rep can see whether the deal they closed has actually been paid.',
    syncs: [
      'Accounts and contacts: two-way, with one system nominated as owner per field so a blank does not overwrite a value.',
      'Opportunities: Salesforce to Odoo, one-way, mapped onto CRM stages.',
      'Closed-won deals: Salesforce to Odoo, one-way, creating the quotation or sale order with its lines.',
      'Products and price books: Odoo to Salesforce, one-way, so reps quote from real catalogue prices.',
      'Invoice and payment status: Odoo to Salesforce, one-way, written onto the account or opportunity.',
      'Owners and teams: mapped between the two so records land with a real, active user on both sides.',
    ],
    steps: [
      { title: 'Field-level mapping', desc: 'Map every field in scope with a direction and an owner. Two-way on every field with no owner is how data quietly corrupts itself.' },
      { title: 'External id strategy', desc: 'Store each system id on the other record so matching never falls back to name or email similarity.' },
      { title: 'Deduplicate first', desc: 'Clean both databases before the first sync. Merging duplicates after they have been replicated is a much larger job.' },
      { title: 'Historical backfill', desc: 'Load existing accounts and open opportunities in bulk, with a reconciliation report at the end.' },
      { title: 'Change capture', desc: 'Use event or change-based updates where possible and a scheduled sweep as the safety net.' },
      { title: 'Conflict rules and go-live', desc: 'Decide who wins on simultaneous edits, log every conflict, then go live with a monitored error queue.' },
    ],
    faqs: [
      { q: 'Do we have to give up Salesforce?', a: 'No. Plenty of clients keep Salesforce for sales and run Odoo for delivery, stock and finance. The integration exists precisely so that decision does not have to be made.' },
      { q: 'How are duplicate contacts avoided?', a: 'Each record carries the other system id, so matching is on an id rather than on a name. Both databases are also deduplicated before the first sync, which is where most duplicates come from.' },
      { q: 'What triggers an order in Odoo?', a: 'Normally the opportunity reaching closed-won, which creates the quotation or sale order with its lines. The exact stage is your choice and is agreed before build.' },
      { q: 'Can reps see whether an invoice was paid?', a: 'Yes. Invoice and payment status is written back onto the account or opportunity, which is usually the first thing a sales director asks for after go-live.' },
    ],
    services: ['odoo-integration', 'odoo-customization', 'odoo-consultancy'],
  },

  hubspot: {
    meta: 'HubSpot and Odoo integration: two-way contact and company sync, deal to sale order, and payment status back to HubSpot for lifecycle marketing.',
    intro: 'HubSpot earns its place on the marketing side: forms, sequences, attribution and lifecycle stages. Odoo earns its place once the deal is signed. Connecting them stops the handover being a copied spreadsheet. Contacts and companies stay agreed, a won deal creates the sale order in Odoo, and the invoice and payment state goes back to HubSpot so marketing can segment on what customers actually bought, not on what they enquired about.',
    syncs: [
      'Contacts: two-way, matched on email, with an agreed owner per field.',
      'Companies: two-way, matched on domain or an external id rather than on name.',
      'Deals: HubSpot to Odoo, one-way, mapped to CRM stages.',
      'Won deals: HubSpot to Odoo, one-way, creating the quotation or sale order.',
      'Invoice and payment status: Odoo to HubSpot, one-way, written to properties so lists and workflows can use it.',
      'Lifecycle stage: Odoo to HubSpot, one-way, so a paying customer stops receiving prospect campaigns.',
      'Marketing engagement: HubSpot to Odoo, one-way, summarized on the lead so the rep sees what was opened and clicked.',
    ],
    steps: [
      { title: 'Private app and scopes', desc: 'Create the app in HubSpot with only the scopes the integration needs, and keep the token out of source control.' },
      { title: 'Property and field mapping', desc: 'Map HubSpot properties to Odoo fields with an explicit direction. Custom properties are included, but each one needs an owner.' },
      { title: 'Pipeline alignment', desc: 'Map HubSpot deal stages to Odoo CRM stages, and agree which stage creates a sale order.' },
      { title: 'Deduplication', desc: 'Clean both sides first and match on email or domain so the sync does not multiply contacts.' },
      { title: 'Webhooks and sweeps', desc: 'Webhooks for prompt changes, plus a scheduled reconciliation to catch anything the event stream missed.' },
      { title: 'Go-live with monitoring', desc: 'Start with contacts one way, add deals, then switch on the write-back once the first two are stable.' },
    ],
    faqs: [
      { q: 'Can marketing segment on purchase history?', a: 'Yes, and it is usually the main reason to build this. Order value, product bought and payment status are written to HubSpot properties, so lists and workflows can target real customers rather than form fills.' },
      { q: 'Which system owns the contact?', a: 'Set per field rather than per record. HubSpot commonly owns marketing attributes, Odoo owns billing details. A blank on one side never overwrites a value on the other.' },
      { q: 'Do we need HubSpot Sales as well as Marketing?', a: 'Only if you want deals to sync. Contact and company sync with order data written back works with the marketing side alone.' },
      { q: 'How quickly do changes appear?', a: 'Near real time through webhooks for the common changes, with a scheduled reconciliation as backup. The reconciliation is what keeps the two from drifting over months.' },
    ],
    services: ['odoo-integration', 'odoo-customization', 'odoo-ecommerce'],
  },

  /* ── Analytics ──────────────────────────────────────────── */
  'power-bi': {
    meta: 'Odoo to Power BI: a reporting pipeline with a read replica or extract layer, a modelled star schema, scheduled refresh and row-level security.',
    intro: 'Odoo reporting is good for operators and thin for executives who want to combine ERP data with sales, marketing and finance data from elsewhere. Power BI fills that gap, but pointing it straight at a live Odoo database is a mistake that shows up as slow reports and a slow ERP. The pipeline that works reads from a replica or an extract layer, reshapes the ERP schema into something a report can model, and refreshes on a schedule.',
    syncs: [
      'Transactional tables: Odoo to Power BI, one-way. Reporting never writes back into the ERP.',
      'Dimensions: customers, products, employees, warehouses and analytic accounts, published as clean lookup tables.',
      'Facts: sale orders, invoices, stock moves, timesheets and manufacturing orders, at the grain your reports need.',
      'Incremental loads: only changed rows after the first full load, keyed on write date.',
      'Currency and calendar tables: generated so multi-currency and fiscal period reporting works without report-level workarounds.',
    ],
    steps: [
      { title: 'Define the questions first', desc: 'List the decisions the reports must support. Building a warehouse before knowing that produces a lot of tables nobody opens.' },
      { title: 'Read path', desc: 'A read replica or an extract layer, never a direct connection to the production database that users are working in.' },
      { title: 'Model the schema', desc: 'Reshape Odoo tables into facts and dimensions. Reporting directly against the raw ERP schema is where slow, fragile dashboards come from.' },
      { title: 'Refresh strategy', desc: 'Incremental refresh on the large facts, full refresh on small dimensions, scheduled outside business hours.' },
      { title: 'Security model', desc: 'Row-level security so a country manager sees their own country. Access rules are designed with the data, not bolted on later.' },
      { title: 'Publish and hand over', desc: 'Ship the workspace with documented measures and a short training session, so the reports get maintained rather than abandoned.' },
    ],
    faqs: [
      { q: 'Can Power BI connect straight to the Odoo database?', a: 'Technically yes, and it is a bad idea. Report queries compete with live users for the same database. A replica or extract layer keeps the ERP responsive and the reports fast.' },
      { q: 'Import or DirectQuery?', a: 'Import for nearly all Odoo reporting, because the model performs and the schema needs reshaping anyway. DirectQuery only where genuinely current numbers are required and the source is tuned for it.' },
      { q: 'How current is the data?', a: 'As current as the refresh you schedule. Several refreshes a day is typical, hourly on smaller models. Truly live figures belong in Odoo dashboards, not in a BI tool.' },
      { q: 'Can we combine Odoo with other sources?', a: 'Yes, and that is usually the point. Odoo facts sit alongside marketing, web and spreadsheet sources in one model with shared date and customer dimensions.' },
      { q: 'Does it work on-premise?', a: 'Yes, with a gateway between the on-premise source and the service. Fully on-premise reporting is also possible where data cannot leave your network.' },
    ],
    services: ['odoo-integration', 'odoo-consultancy', 'odoo-customization'],
  },

  metabase: {
    meta: 'Metabase on Odoo: open-source BI with a read replica, curated models, dashboards and subscriptions, without slowing the production database.',
    intro: 'Metabase is the pragmatic choice when you want dashboards and self-service questions on Odoo data without a licence per viewer. It sits on the Postgres database, which is exactly why it should point at a read replica rather than at production. The value comes from curating models first: a handful of clean, documented queries that people build on, instead of forty raw tables that only a developer can interpret.',
    syncs: [
      'Read-only access to Odoo tables: Odoo to Metabase, one-way. Nothing is ever written back.',
      'Curated models: saved queries that hide the ERP schema and expose business-shaped tables.',
      'Dashboards and questions: built on those models rather than on raw tables.',
      'Scheduled subscriptions: dashboards sent by email on a schedule so numbers reach people who never log in.',
      'Alerts: triggered when a metric crosses a threshold you define.',
      'Permission groups: mapped so each team sees only its own data.',
    ],
    steps: [
      { title: 'Read replica', desc: 'Stand up a replica and point Metabase at it. Analysts running unbounded queries against production is a well-known way to slow an ERP.' },
      { title: 'Schema orientation', desc: 'Document the tables that matter and the traps: archived records, company scoping, state fields and relation tables that surprise newcomers.' },
      { title: 'Curated models', desc: 'Build the core models first: sales, invoices, stock, projects. Everyone else builds on those instead of writing the same joins again.' },
      { title: 'Dashboards per audience', desc: 'One dashboard per role, answering the questions that role actually asks, rather than one dashboard with forty cards.' },
      { title: 'Permissions', desc: 'Group-level access so data is scoped by company, country or team, matching the access people have in Odoo.' },
      { title: 'Subscriptions and handover', desc: 'Schedule the email subscriptions, then train two or three internal people so the tool survives without us.' },
    ],
    faqs: [
      { q: 'Will it slow down Odoo?', a: 'Not if it reads a replica, which is how we set it up. Pointing BI at the production database is the usual cause of the reports and the ERP both getting slower at month end.' },
      { q: 'Do users need SQL?', a: 'No. Once curated models exist, most questions are built by clicking. SQL stays available for analysts who want it, which keeps both audiences served.' },
      { q: 'How does it compare with Odoo reporting?', a: 'Odoo reporting is better inside a workflow, where you act on the record. Metabase is better for cross-module dashboards, trends and anything that needs data from outside Odoo.' },
      { q: 'Can numbers be emailed automatically?', a: 'Yes. Dashboard subscriptions go out on a schedule, and alerts fire when a metric crosses a threshold. That is how the people who never log in still get the figures.' },
      { q: 'What about archived records?', a: 'Odoo hides archived records in the interface but they remain in the tables, so models filter on the active flag explicitly. Missing that is the most common source of BI figures that disagree with Odoo.' },
    ],
    services: ['odoo-integration', 'odoo-consultancy', 'odoo-customization'],
  },
};
