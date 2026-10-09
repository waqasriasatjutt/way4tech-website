/*
 * Way4Tech Windows apps: the small programs that run on a PC in the office
 * and feed Odoo with what only a local machine can reach (LAN devices, serial
 * ports, scanners, Tally, a webcam, the phone line).
 *
 * Copy lives here. Version, file name, size, sha256, hosting and screenshot
 * sizes live in windows-apps-release.json, written by the release script from
 * the signed latest.json of each product, so the page cannot drift from the
 * file that is actually served at /<slug>/download.
 */
import RELEASE from './windows-apps-release.json';

export interface WindowsApp {
  slug: string;
  name: string;
  /** Short line for cards and the hero. */
  tagline: string;
  /** Meta title (the layout adds " | Way4Tech"). */
  metaTitle: string;
  /** Meta description, kept under 160 characters. */
  metaDescription: string;
  /** Who it is for and what it solves, one paragraph each. */
  intro: string[];
  features: string[];
  requirements: string[];
  /** Technical name on apps.odoo.com, or null when the app is sold on its own. */
  module: string | null;
  moduleName: string | null;
  /** Other store modules worth naming next to the main one. */
  extraModules?: { module: string; name: string }[];
  /** Caption per screenshot key (the source file name). */
  captions: Record<string, string>;
  category: string;
}

export interface WindowsAppRelease {
  version: string;
  file: string;
  size: number;
  sha256: string;
  released: string;
  hosting: 'pages' | 'release';
  assetUrl: string | null;
  shots: { src: string; w: number; h: number; key: string }[];
}

export const WINDOWS_APP_RELEASES = RELEASE as Record<string, WindowsAppRelease>;

const WIN = 'Windows 10 or 11, 64-bit';

export const WINDOWS_APPS: WindowsApp[] = [
  {
    slug: 'bridge',
    name: 'WT Attendance Bridge',
    category: 'HR and attendance',
    tagline: 'Pull punches from ZKTeco and Hikvision devices on your office LAN into Odoo Attendances.',
    metaTitle: 'ZKTeco and Hikvision to Odoo: Attendance Bridge',
    metaDescription: 'Free Windows service that reads ZKTeco and Hikvision attendance devices on your LAN and posts the punches to Odoo 19. Read-only, set up from Odoo.',
    intro: [
      'For companies whose fingerprint or face terminals sit on the office network and cannot push to Odoo themselves: pull-only ZKTeco models, devices with no internet access, or an Odoo in the cloud that has no way to reach the office LAN.',
      'The bridge runs as a Windows service on one office PC. It finds the devices on the network, reads users and punches, and posts them to Odoo, where they go through the same attendance pipeline as ADMS devices. It only ever reads: it never clears logs, sets the clock, changes users or opens doors.',
    ],
    features: [
      'Finds ZKTeco and Hikvision devices on its own subnet and lists them in Odoo with an Add button.',
      'Follows a device by serial number when DHCP gives it a new address, so punches never land on the wrong record.',
      'Hikvision face, card and fingerprint terminals over ISAPI, ZKTeco over the standard ZK protocol.',
      'Matches device users to employees by badge number or name in one review screen.',
      'All settings live in Odoo: which devices, poll interval, employee mapping. The PC only needs pairing.',
      'Runs with nobody logged in, restarts itself after a crash, and queues punches while Odoo is unreachable.',
    ],
    requirements: [
      `${WIN}, or Windows Server 2016 or later, switched on during working hours`,
      'Local administrator rights to install (it installs a Windows service)',
      'Network access to the devices: TCP/UDP 4370 for ZKTeco, TCP 80 or 443 for Hikvision',
      'Outbound HTTPS to your Odoo; no inbound ports',
      'Odoo 19 with the WT Attendance Bridge module',
    ],
    module: 'wt_zkteco_bridge',
    moduleName: 'WT Attendance Bridge (LAN): ZKTeco and Hikvision',
    captions: {
      manager_found: 'The Bridge Manager on the PC listing the devices it found on the network',
      bridge_form_found: 'The bridge record in Odoo with its setup checklist and status',
      match_review: 'Matching device users to Odoo employees in one review screen',
      bridge_checklist_done: 'Setup checklist complete: devices added, employees matched, first punch received',
      attendances: 'Punches from the devices turned into Odoo attendances',
    },
  },
  {
    slug: 'posbridge',
    name: 'WT POS Bridge',
    category: 'Point of Sale',
    tagline: 'Receipt printers, cash drawer, scale and pole display for Odoo Community POS, without an IoT Box.',
    metaTitle: 'Odoo Community POS Printer and Scale Bridge',
    metaDescription: 'Free Windows agent that connects receipt printers, cash drawers, scales and pole displays to Odoo 19 Community POS. No IoT Box needed.',
    intro: [
      'For shops and restaurants running Odoo Point of Sale on Community, where the IoT Box is not available and the browser cannot talk to a USB printer, a serial scale or a cash drawer on its own.',
      'WT POS Bridge sits in the tray of each till PC and drives the hardware plugged into it. The Odoo module makes the POS print, open the drawer, read the scale and update the customer display through it. If the bridge is not running, the receipt prints from the browser and the cashier sees a notice.',
    ],
    features: [
      'ESC/POS receipt printers, 58 or 80 mm, over USB, a serial port or the network (port 9100).',
      'Receipts print as an image, so Arabic, Urdu and every other script come out exactly as on screen.',
      'Cash drawer through the printer or on its own serial port, opened on cash payments.',
      'Scales (Mettler-Toledo 8217 and continuous indicators) for weighed products.',
      'Kitchen and bar printers routed by POS category, and a 2 x 20 customer pole display.',
      'A setup wizard that looks for printers, COM ports and network printers by itself, and virtual devices to try everything first.',
    ],
    requirements: [
      `${WIN}, with Chrome or Edge`,
      'No administrator rights needed (installs per user)',
      'USB printers installed in Windows (maker driver or Generic / Text Only)',
      'Odoo 19 (Community or Enterprise) with Point of Sale and the WT POS Hardware Bridge module',
    ],
    module: 'wt_pos_bridge',
    moduleName: 'WT POS Hardware Bridge',
    captions: {
      agent_setup_find: 'The setup wizard looking for printers, COM ports and network printers',
      agent_setup_devices: 'Checking what was found: receipt printer, kitchen printer, drawer, scale and display',
      agent_settings_printers: 'Printer settings on the till PC',
      screenshot_pos_bridge_dialog: 'The POS showing the bridge connection and each device',
      screenshot_kitchen_printer: 'A kitchen printer in Odoo that prints through the bridge',
    },
  },
  {
    slug: 'weighbridge',
    name: 'WT Weighbridge',
    category: 'Inventory and logistics',
    tagline: 'Live truck scale weight in Odoo, captured only when stable, with tickets and camera snapshots.',
    metaTitle: 'Odoo Weighbridge Software: Truck Scale Connector',
    metaDescription: 'Free Windows agent that reads truck scale indicators and IP cameras and feeds live weight into Odoo 19 weighbridge tickets. Stable-only capture.',
    intro: [
      'For quarries, mills, recyclers, warehouses and any site that weighs trucks in and out and still writes the weights on paper or retypes them into the system.',
      'The agent runs on the weighbridge office PC, reads the indicator over a serial port or a serial-to-Ethernet converter, and sends the live weight to the Odoo ticket screen. The operator can only capture a reading once it is stable, and a camera snapshot is stored with each weighing.',
    ],
    features: [
      'Reads common indicator formats in continuous mode, over a COM port or a Moxa, Lantronix or USR converter.',
      'Setup wizard that listens on every port and baud rate and recognises the indicator by itself.',
      'Finds IP cameras with ONVIF and fills in the snapshot address for Hikvision, Dahua and Axis.',
      'First and second weighing on one ticket, net weight calculated, printed ticket from Odoo.',
      'Manual weights are allowed only where you permit them, and each override is recorded.',
      'Pairs with the operator browser in one click, and has a simulator for trying tickets before the indicator is wired.',
    ],
    requirements: [
      `${WIN} in the weighbridge office`,
      'No administrator rights needed (installs per user)',
      'Indicator serial output set to continuous, on a COM port or a serial-to-Ethernet converter',
      'Odoo 19 with Inventory and the WT Weighbridge module',
    ],
    module: 'wt_weighbridge',
    moduleName: 'WT Weighbridge',
    captions: {
      agent_setup_found: 'The setup wizard showing the indicator it found and the weight it read',
      screenshot_ticket_live: 'A weighbridge ticket in Odoo with the live weight from the indicator',
      screenshot_ticket_done: 'A completed ticket with first and second weight and the net',
      screenshot_ticket_print: 'The printed weighbridge ticket',
      agent_settings_indicator: 'Indicator settings with the raw frames and the parsed weight',
    },
  },
  {
    slug: 'backup',
    name: 'WT Local Backup Agent',
    category: 'Administration',
    tagline: 'A checked copy of your Odoo on your own PC or NAS, every night.',
    metaTitle: 'Odoo Backup to Your Own PC or NAS',
    metaDescription: 'Free Windows service that copies your Odoo database and files to a PC or NAS every night, checks each copy and keeps daily, weekly and monthly ones.',
    intro: [
      'For companies whose Odoo runs on someone else\'s server (a partner VPS, a SaaS platform, Odoo.sh or Odoo Online) and who hold no copy of their own data.',
      'The agent fetches a backup on a schedule, checks that it is complete and readable, and keeps a sensible number of old copies on a local disk, a USB drive or a NAS. It runs as a Windows service, so it works at night with nobody logged in, and the tray icon turns red when something is wrong.',
    ],
    features: [
      'Full database and attachments through the companion module, with no passwords stored on the PC.',
      'Full backup through the Odoo database manager for self-hosted servers without the module.',
      'Data export (JSON and Excel) for Odoo Online, clearly labelled as an export rather than a restorable database.',
      'Every copy checked: sha256, zip contents, manifest and database dump header.',
      'Keeps 7 daily, 4 weekly and 12 monthly copies by default, and never deletes the newest good one.',
      'Optional encryption at rest and email alerts; a PC that was off at backup time catches up when it is back on.',
    ],
    requirements: [
      `${WIN}, or Windows Server 2016 or later`,
      'Local administrator rights to install (it installs a Windows service)',
      'A local disk, USB drive or NAS share with enough space',
      'For full backups with pairing: the Local Backup Agent Link module (on top of Cloud Backup Pro)',
    ],
    module: 'wt_backup_agent_link',
    moduleName: 'Local Backup Agent Link',
    captions: {
      agent_setup_destination: 'Choosing where to keep the copies: local disks, USB drives and NAS shares',
      agent_setup_schedule: 'When to back up and how many daily, weekly and monthly copies to keep',
      agent_status: 'The status window with the last good backup and the next run',
      agent_setup_odoo: 'Connecting the agent to your Odoo',
      agent_restore: 'The restore helper showing what each copy holds and which checks it passed',
    },
  },
  {
    slug: 'callerid',
    name: 'WT Caller ID',
    category: 'Sales and CRM',
    tagline: 'See the Odoo contact before you pick up, and log every call, including the missed ones.',
    metaTitle: 'Caller ID for Odoo: Popup and Call Logger',
    metaDescription: 'Free Windows tray app that shows the Odoo contact when the phone rings and logs every call. Works with Asterisk, FreePBX, MicroSIP, Zoiper and modems.',
    intro: [
      'For sales teams, clinics, service desks and front offices that answer the phone all day and want to know who is calling, and to stop losing missed calls on a sticky note.',
      'The agent listens to your phone system and pops up a card with the Odoo contact when the phone rings. The Odoo module logs every call against the contact, matches numbers in any format, and gives missed calls an owner and a follow-up.',
    ],
    features: [
      'Works with Asterisk, FreePBX and Issabel over AMI, with MicroSIP and Zoiper softphones, and with a USB caller ID modem on a landline.',
      'Caller card with the contact, company, open items and a VIP flag, or a quick way to create the contact.',
      'Every call logged in Odoo with direction, extension, user and talk time.',
      'Missed calls list with follow-up, so nobody forgets to call back.',
      'Extensions mapped to users; reception sees every call.',
      'Simulate a call from the tray to test the whole chain without a real phone.',
    ],
    requirements: [
      `${WIN} on each PC that answers the phone`,
      'No administrator rights needed (installs per user)',
      'One of: an Asterisk based PBX with an AMI user, MicroSIP, Zoiper 5, or a USB caller ID modem',
      'Odoo 19 (Community or Enterprise) with the WT Caller ID & Call Logger module',
    ],
    module: 'wt_caller_id',
    moduleName: 'WT Caller ID & Call Logger',
    captions: {
      agent_card_known: 'The caller card for a known Odoo contact',
      agent_card_unknown_missed: 'A missed call from an unknown number',
      screenshot_call_log: 'The call log in Odoo',
      screenshot_missed_calls: 'Missed calls waiting for a follow-up',
      agent_settings: 'Phone system settings on the PC',
    },
  },
  {
    slug: 'tally',
    name: 'WT Tally Connector',
    category: 'Accounting',
    tagline: 'Posted Odoo invoices, bills and payments become Tally vouchers, and the Tally number comes back.',
    metaTitle: 'Odoo to Tally Prime Live Connector',
    metaDescription: 'Free Windows agent that posts Odoo invoices, bills, credit notes and payments into Tally Prime or ERP 9 as vouchers. Tested on TallyPrime 7.1.',
    intro: [
      'For businesses that run sales, purchasing or operations in Odoo but whose accountant still closes the books in Tally, and who are tired of keying every invoice twice.',
      'The agent runs on the Tally PC and talks to Tally through its XML server. Posted documents in Odoo reach Tally within about 30 seconds as vouchers, and the Tally voucher number is written back onto the Odoo document. Edits and cancellations follow.',
    ],
    features: [
      'Customer invoices, credit notes, vendor bills, debit notes, payments and, optionally, journal entries.',
      'Accounting or item invoice mode, your own voucher type names, and the company you choose.',
      'Ledger mapping with suggestions, and a check that every ledger name really exists in Tally.',
      'A sync queue in Odoo that says in plain words what to fix, with Push again.',
      'Editing and reposting updates the same voucher; cancelling removes it.',
      'An Odoo against Tally comparison, and a built-in Tally simulator for a demo.',
    ],
    requirements: [
      `${WIN}, normally the Tally PC`,
      'No administrator rights needed (installs per user)',
      'TallyPrime or Tally.ERP 9 with the company loaded and the XML server on (port 9000)',
      'Odoo 19 with Invoicing or Accounting and the Odoo to Tally Live Connector module',
    ],
    module: 'wt_tally_connector',
    moduleName: 'Odoo to Tally Live Connector',
    captions: {
      screenshot_agent_find: 'The agent finding Tally on this PC and the network',
      screenshot_agent_status: 'Every document sent, with its Tally voucher number',
      screenshot_dashboard: 'The Tally dashboard in Odoo',
      screenshot_queue: 'The sync queue with anything that needs fixing',
      screenshot_reconcile: 'Comparing Odoo with Tally',
    },
  },
  {
    slug: 'capture',
    name: 'WT Document Capture',
    category: 'Documents and accounting',
    tagline: 'Scanner, copier folder and drag and drop into Odoo, read on the PC and routed to the right place.',
    metaTitle: 'Scan to Odoo: Scanner, Hot Folder and OCR',
    metaDescription: 'Free Windows app that scans paper, watches copier folders, reads the text on the PC and files each document in Odoo, including draft vendor bills.',
    intro: [
      'For offices that still receive paper: vendor bills, delivery notes, signed contracts. Someone scans them, renames the files and uploads them by hand, one at a time.',
      'WT Document Capture scans from the office scanner, picks up what the copier saves into a folder, splits a stack on separator sheets, reads the text on the PC, and sends each document to the right place in Odoo: a draft vendor bill, an attachment on a purchase order or contact, or the Document Inbox for someone to sort.',
    ],
    features: [
      'Scans through Windows (WIA) with feeder, duplex, resolution and colour settings.',
      'Hot folders, including network shares, picked up only once the copier has finished writing the file.',
      'Separator sheets split one stack into several documents and can send each one somewhere specific.',
      'Text recognition in English and Arabic on the PC, with Tesseract included in the installer.',
      'Drag and drop of PDFs, images, Office files and Outlook e-mails with their attachments.',
      'Draft vendor bills from the scanned page when Odoo Invoicing is installed.',
    ],
    requirements: [
      `${WIN}`,
      'No administrator rights needed (installs per user)',
      'A scanner with a Windows (WIA) driver, a copier that saves to a folder, or neither (a virtual scanner is included)',
      'Odoo 19 Community or Enterprise with the WT Document Capture module',
    ],
    module: 'wt_doc_capture',
    moduleName: 'WT Document Capture: Scanner & Hot Folder to Odoo',
    captions: {
      agent_main: 'The capture window: scan settings and recent documents with where each one went',
      agent_wizard_scanner: 'The setup wizard choosing the scanner',
      inbox_kanban: 'The Document Inbox in Odoo',
      document_form: 'A captured document with the text read from the page',
      vendor_bill: 'A draft vendor bill created from a scanned invoice',
    },
  },
  {
    slug: 'queue',
    name: 'WT Queue',
    category: 'Customer service',
    tagline: 'Touch kiosk, TV display with voice calls and counter screen, linked to Odoo, working through internet outages.',
    metaTitle: 'Queue Management System for Odoo: Kiosk and TV',
    metaDescription: 'Queue and token system for clinics, banks and service centres: touch kiosk, TV display with voice calls, counter screen. Linked to Odoo 19, works offline.',
    intro: [
      'For clinics, banks, exchange houses, government offices and service centres that want an orderly waiting room without buying a dedicated queue system with its own server.',
      'One installer turns ordinary Windows PCs, a thermal printer and a TV into a kiosk, a display and counter screens. Services and counters are set up in Odoo, customers who type their mobile number are matched to their Odoo contact, and every ticket reaches Odoo with its full timeline for the dashboard and reports.',
    ],
    features: [
      'Touch kiosk in English, Arabic or Urdu, printing a ticket with a QR code to follow the turn on a phone.',
      'TV display with the number being called, every counter, next in line, a media loop and a spoken call with a chime.',
      'Counter bar for staff: call next, recall, start, done, no show and transfer, with keyboard shortcuts.',
      'Keeps working when the internet drops; tickets reach Odoo when the connection is back.',
      'Live dashboard, waiting and service times, and visit history on each contact in Odoo.',
      'Tickets print as a picture, so Arabic and Urdu come out right on any ESC/POS printer.',
    ],
    requirements: [
      `${WIN} on each PC (one PC can drive several screens)`,
      'Local administrator rights to install (it opens the firewall for the branch network)',
      'All PCs of a branch on the same local network',
      'An ESC/POS thermal printer, 58 or 80 mm, USB or network (a virtual printer is the default)',
      'Odoo 19 (Community or Enterprise) with the WT Queue & Token System module',
    ],
    module: 'wt_queue_system',
    moduleName: 'WT Queue & Token System',
    captions: {
      kiosk_home_en: 'The touch kiosk where customers choose a service',
      display: 'The TV display calling the next number',
      odoo_token_timeline: 'A ticket in Odoo with its full timeline',
      printed_ticket: 'The printed ticket with a QR code to follow the turn',
      odoo_dashboard: 'The branch dashboard in Odoo',
      kiosk_home_ar: 'The kiosk in Arabic',
    },
  },
  {
    slug: 'migrator',
    name: 'WT Migrator',
    category: 'Accounting',
    tagline: 'Move a company from Tally or QuickBooks Desktop into Odoo, reconciled against the source trial balance.',
    metaTitle: 'Tally and QuickBooks to Odoo Migration Tool',
    metaDescription: 'Free Windows app that moves accounts, contacts, products, open items and balances from Tally or QuickBooks Desktop into Odoo and reconciles the trial balance.',
    intro: [
      'For accountants and implementers moving a company off Tally Prime, Tally.ERP 9 or QuickBooks Desktop, who need the opening position in Odoo to match the old books to the paisa.',
      'The desktop app reads Tally over the network or QuickBooks on the same PC, walks through mapping and a dry run, writes to Odoo, and finishes with a reconciliation of the source trial balance against Odoo, per account and per customer and vendor. A second run updates instead of duplicating.',
    ],
    features: [
      'Chart of accounts mapped to existing Odoo accounts or created, journals for bank and cash ledgers, cost centres as analytic accounts.',
      'Customers, vendors, products, units of measure, categories and warehouses.',
      'Taxes mapped and confirmed by you, never guessed.',
      'Opening balances, open invoices and bills as real open documents, or the full voucher history.',
      'Dry run that writes nothing and shows exactly what the run will do.',
      'Reconciliation report as PDF and Excel. Works with Odoo 16 to 19, including Odoo Online.',
    ],
    requirements: [
      `${WIN}`,
      'No administrator rights needed (installs per user)',
      'Tally Prime or ERP 9 with the XML server on (port 9000), QuickBooks Desktop on the same PC, or their export files',
      'An Odoo database, with the Accounting Data Migration modules or an API key',
    ],
    module: 'wt_migration_base',
    moduleName: 'Accounting Data Migration (Engine)',
    extraModules: [
      { module: 'wt_migration_tally', name: 'Tally files' },
      { module: 'wt_migration_quickbooks', name: 'QuickBooks files' },
    ],
    captions: {
      screenshot_desktop_app: 'A migration project in Odoo, paired with the desktop app',
      screenshot_mapping: 'Mapping the chart of accounts',
      screenshot_dry_run: 'The dry run: exactly what will be created, updated or skipped',
      screenshot_running_progress: 'The migration running in the background',
      screenshot_reconciliation: 'Reconciliation against the source trial balance',
    },
  },
  {
    slug: 'face',
    name: 'WT Face Kiosk',
    category: 'HR and attendance',
    tagline: 'A Windows PC or tablet with a webcam becomes a face recognition time clock for Odoo.',
    metaTitle: 'Face Recognition Attendance Kiosk for Odoo',
    metaDescription: 'Free Windows kiosk app: employees look at the webcam and the punch lands in Odoo Attendances. Recognition runs on the PC, works offline, consent built in.',
    intro: [
      'For offices, shops, sites and branches that want a time clock without buying biometric terminals, and without sending face data to a cloud service.',
      'Staff look at the screen, the kiosk recognises them, greets them by name and the punch lands in Odoo Attendances. Recognition runs on the kiosk itself. It keeps working offline and catches up when the connection is back. Consent is recorded in Odoo before anyone can be enrolled.',
    ],
    features: [
      'Recognition on the PC with OpenCV (YuNet detector and SFace recogniser); no cloud service.',
      'Basic liveness check, and a PIN fallback for anyone the camera does not recognise.',
      'Enrol at the kiosk with the admin PIN, or from photos uploaded in Odoo (the photos are then deleted).',
      'Face templates stored encrypted; consent and deletion handled from the employee form.',
      'Pairs by holding a QR code from Odoo up to the camera.',
      'Works offline, restarts itself if it closes, and speaks a greeting with a Windows voice.',
    ],
    requirements: [
      `${WIN}; a small tablet or mini PC is enough (4 GB RAM)`,
      'No administrator rights needed (installs per user)',
      'A USB or built-in webcam, 640 x 480 or better, at face height',
      'Odoo 19 (Community or Enterprise) with the WT Face Attendance Kiosk module',
    ],
    module: 'wt_face_attendance',
    moduleName: 'WT Face Attendance Kiosk',
    captions: {
      kiosk_home: 'The kiosk waiting for someone to look at the camera',
      kiosk_checked_in: 'Recognised and checked in',
      wizard_camera: 'The setup wizard testing the camera',
      odoo_employee_face_tab: 'Consent and enrolment on the employee form in Odoo',
      odoo_attendances: 'Kiosk punches as Odoo attendances',
    },
  },
  {
    slug: 'recorder',
    name: 'WT Recorder',
    category: 'Productivity',
    tagline: 'Screen and meeting recorder with transcripts on your PC, live captions, notes, a compressor and an editor.',
    metaTitle: 'WT Recorder: Screen and Meeting Recorder',
    metaDescription: 'Record your screen and calls on Windows, get transcripts in English, Urdu, Hindi or Arabic on your own PC, live captions, notes and smaller videos.',
    intro: [
      'For anyone who records calls, demos and training on Windows and wants a transcript and notes afterwards, without inviting a bot into the meeting or uploading the recording to someone else\'s server.',
      'WT Recorder records any app, writes the transcript on the PC in English, Urdu, Hindi or Arabic, shows live captions during the call, and can write meeting notes with your own Anthropic API key. It also shrinks videos without losing resolution, edits them, and takes screenshots. WT Recorder is sold on its own and does not need Odoo.',
    ],
    features: [
      'Record the full screen, a window, an area or audio only, with a camera bubble and separate mic and system audio tracks.',
      'Hardware encoding (Quick Sync, NVENC, AMF) and crash-safe recording with recovery.',
      'Transcripts on the PC with faster-whisper, Me and Others from the tracks, export to SRT, VTT, Word or PDF.',
      'Live captions a few seconds behind speech, with a notes window and bookmarks.',
      'Compressor with before and after comparison; editor with trim, cut, blur, text, subtitles and cut by transcript.',
      'Free edition: recordings up to 30 minutes, the small transcription models, compressor, screenshots and basic editing. Pro removes the limit and adds the larger models, AI notes, auto-zoom and batch compression.',
    ],
    requirements: [
      'Windows 10 (version 1809 or later) or 11, 64-bit',
      'No administrator rights needed (installs per user)',
      'A recent CPU; a graphics card helps with encoding but is not required',
      'For AI notes: your own Anthropic API key (Pro)',
    ],
    module: null,
    moduleName: null,
    captions: {
      library: 'The library of recordings with transcripts and notes',
      recording_toolbar_on_screen: 'The recording toolbar while recording',
      recording_transcript: 'A recording with its transcript, speakers and timestamps',
      live_captions: 'Live captions during a call',
      compress_compare: 'Before and after comparison in the compressor',
      editor: 'The editor, with cut by transcript',
    },
  },
];

export const WINDOWS_APPS_BY_SLUG = new Map(WINDOWS_APPS.map(a => [a.slug, a] as const));

export function storeUrlOf(module: string): string {
  return `https://apps.odoo.com/apps/modules/19.0/${module}/`;
}

export function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
