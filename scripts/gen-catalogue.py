"""Regenerate src/data/modules-catalog.ts from the store repos.

Reads every __manifest__.py on the odoostore 19.0 and 20.0 branches (from git,
not the working tree), checks which listings are live on apps.odoo.com, and
writes one entry per module with its versions, price and suite.

    python scripts/gen-catalogue.py [path/to/odoostore-19] [path/to/odoostore-20]

Entries already in the catalogue that are no longer on either branch are kept
as they are, so no live URL disappears. Modules that are on neither store
listing and were never on the site are skipped.
"""
import ast
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'data' / 'modules-catalog.ts'
REPOS = {
    '19.0': Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'odoostore-19',
    '20.0': Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT.parent / 'odoostore-20',
}
# Built but not for sale yet. Never list these.
SKIP = {'wt_org_collections', 'w4t_auto_parts_wholesale'}
SKIP_PREFIX = ('wt_real_estate_feeds', 'wt_real_estate_ai', 'wt_real_estate_whatsapp',
               'wt_real_estate_api', 'wt_real_estate_es', 'wt_real_estate_vendor',
               'wt_real_estate_leasing', 'wt_real_estate_finance')

# Suite grouping for /products/. First match wins.
SUITES = [
    ('Construction', r'^wt_construction_'),
    ('Real Estate', r'^wt_real_estate'),
    ('Restaurant', r'^(w4_resto_|wt_restaurant_management|wt_pos_kitchen_display|wt_odoo_pos_delivery|wt_pos_table_reservation)'),
    ('Retail', r'^w4_retail_'),
    ('Garage and Automotive', r'^(w4t_garage_|wt_carwash_management|wt_car_wash_pos)'),
    ('HR and HRMS', r'^(wt_hrms_|wt_hr_referral|wt_salary_package|wt_face_attendance|wt_zkteco_)'),
    ('Facility', r'^wt_facility_'),
    ('Labour Camp', r'^wt_labour_camp'),
    ('Jewelry', r'^wt_jewelry_'),
    ('Transport and Logistics', r'^(wt_transport_|wt_freight_forwarding|wt_delivery_carrier)'),
    ('Distribution and Van Sales', r'^wt_sale_distributor'),
    ('Project and Work Tracker', r'^(wt_project_|wt_work_tracker|wt_gantt_view|wt_grid_view|wt_map_view)'),
    ('Healthcare', r'^(wt_hospital_|w4t_pharmacy|wt_dental_|wt_veterinary|wt_medical_billing)'),
    ('Turkish Localization', r'^wt_tr_'),
    ('Hardware and Desktop Apps', r'^(wt_weighbridge|wt_queue_system|wt_caller_id|wt_doc_capture|wt_pos_bridge|wt_tally_connector|wt_migration_|wt_label_designer|w4_direct_print|wt_direct_print|w4_pos_print|wt_print_suite|wt_backup_agent)'),
    ('Accounting and Finance', r'^(wt_account_asset|wt_budget_control|wt_dynamic_financial|wt_bank_statement|wt_late_payment|wt_fbr_)'),
    ('Dashboards', r'(_dashboard$|^wt_dashboard_builder)'),
    ('Themes and Branding', r'(^wt_theme_|_theme$|^wt_custom_backend_theme|^wt_debrand)'),
    ('Industry Apps', r'^(wt_salon|wt_enterprise_salon|wt_spa_pos|wt_pos_saloon|wt_gym|wt_school|wt_enterprise_school|wt_hotel|wt_event|wt_legal|wt_laundry|wt_printing_press|wt_solar|wt_fuel|wt_water|wt_coworking|wt_insurance|wt_agriculture|wt_equipment_rental|wt_rental_|wt_travel|wt_helpdesk|wt_shop_floor|wt_plm_|wt_appointment)'),
    ('Sales, CRM and Messaging', r'^(wt_sales_commission|wt_quotation_followup|wt_auto_cancel|wt_auto_confirm|wt_whatsapp|wt_marketing|wt_ai_assistant|wt_shopify|wt_n8n|wt_duplicate_partner|wt_pwa_push)'),
]


def git(repo, *args):
    return subprocess.run(['git', '-C', str(repo), *args], capture_output=True, text=True,
                          encoding='utf-8', check=True).stdout


def manifests(series):
    repo, branch = REPOS[series], f'origin/{series}'
    out = {}
    for name in git(repo, 'ls-tree', '-d', '--name-only', branch).split():
        if name.startswith('.') or name in SKIP or name.startswith(SKIP_PREFIX):
            continue
        try:
            raw = git(repo, 'show', f'{branch}:{name}/__manifest__.py')
        except subprocess.CalledProcessError:
            continue
        try:
            data = ast.literal_eval(raw[raw.index('{'):])
        except Exception:
            print('cannot parse', series, name, file=sys.stderr)
            continue
        if data.get('installable', True) is False:
            continue
        out[name] = data
    return out


def listed(series, tech):
    for kind in ('modules', 'themes'):
        ok, url = _listed(f'https://apps.odoo.com/apps/{kind}/{series}/{tech}')
        if ok:
            return ok, url
    return False, ''


def _listed(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) Chrome/130'})
    for _ in range(3):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                body = r.read().decode('utf-8', 'replace')
                return ('Waqas Riasat' in body or 'Way4Tech' in body), url + '/'
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return False, ''
        except Exception:
            pass
    return False, ''


def short_name(full):
    name = full.split(' | ')[0].strip()
    name = re.sub(r'^Odoo\s*\d+\s+', '', name)
    name = name.split(' - ')[0].strip()
    name = re.sub(r'\s*[-|]\s*Odoo\s*\d+.*$', '', name)
    name = re.sub(r'\s+for Odoo\s*\d+(\s+Community)?$', '', name)
    return name.strip()


def parse_description(text):
    """RST-ish description to intro paragraphs + titled bullet sections."""
    if not text or '<' in text[:200]:
        return [], []
    lines = text.strip('\n').split('\n')
    intro, sections, cur, para, bullet = [], [], None, [], None
    i = 0

    def flush_para():
        nonlocal para
        if para:
            t = ' '.join(x.strip() for x in para).strip()
            if t and cur is None:
                intro.append(t)
            para = []

    def flush_bullet():
        nonlocal bullet
        if bullet is not None and cur is not None:
            cur['bullets'].append(' '.join(bullet).strip())
        bullet = None

    first_title_done = False
    while i < len(lines):
        line = lines[i]
        nxt = lines[i + 1] if i + 1 < len(lines) else ''
        if line.strip() and re.fullmatch(r'[=\-~^*#]{3,}', nxt.strip() or 'x'):
            flush_para(); flush_bullet()
            if nxt.strip()[0] == '=' and not first_title_done:
                first_title_done = True
            else:
                cur = {'heading': line.strip(), 'bullets': []}
                sections.append(cur)
            i += 2
            continue
        m = re.match(r'^\s*[-*•]\s+(.*)$', line)
        if m:
            flush_para(); flush_bullet()
            bullet = [m.group(1).strip()]
        elif line.strip() == '':
            flush_para(); flush_bullet()
        elif bullet is not None and line.startswith((' ', '\t')):
            bullet.append(line.strip())
        else:
            flush_bullet()
            if cur is None:
                para.append(line)
        i += 1
    flush_para(); flush_bullet()
    sections = [s for s in sections if s['bullets']]
    return intro[:3], sections


SKIP_HEAD = re.compile(r'(help|support|inside the app|screenshot|what you need|requirement|contact|install|free support|faq|why choose|about|built on|other apps|related|compatib|changelog|get started|our industries|our services|industries we)', re.I)
DROP_TEXT = re.compile(r'(@|https?://|support|devcynx)', re.I)


class _Blocks(HTMLParser):
    """Flatten an index.html into (tag, text) blocks for h2-h5, p and li."""
    KEEP = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li'}

    def __init__(self):
        super().__init__()
        self.out, self.stack = [], []

    def handle_starttag(self, tag, attrs):
        if tag in self.KEEP:
            self.stack.append([tag, []])

    def handle_endtag(self, tag):
        if tag in self.KEEP and self.stack and self.stack[-1][0] == tag:
            t, parts = self.stack.pop()
            text = re.sub(r'\s+', ' ', ''.join(parts)).strip()
            if text:
                self.out.append((t, text))

    def handle_data(self, data):
        for item in self.stack:
            item[1].append(data)


def parse_index_html(html):
    p = _Blocks()
    p.feed(html)
    sections, cur, title = [], None, None
    for tag, text in p.out:
        if tag in ('h1', 'h2'):
            cur = None if SKIP_HEAD.search(text) else {'heading': text, 'bullets': []}
            if cur:
                sections.append(cur)
            title = None
        elif cur is None:
            continue
        elif tag in ('h3', 'h4', 'h5', 'h6'):
            title = text
        elif tag in ('p', 'li'):
            if DROP_TEXT.search(text) or len(text) < 25:
                continue
            if title:
                cur['bullets'].append(f'{title}: {text}' if not title.endswith(('.', ':')) else f'{title} {text}')
                title = None
            elif tag == 'li':
                cur['bullets'].append(text)
    out = []
    for s in sections:
        bullets = [re.sub(r'^[✓✔•*\-\s]+', '', b) for b in s['bullets']]
        bullets = list(dict.fromkeys(b for b in bullets if b))[:8]
        if len(bullets) >= 2:
            out.append({'heading': s['heading'], 'bullets': bullets})
    return out[:6]


def clean(text):
    """Plain copy: no markdown marks, no em or en dashes."""
    t = re.sub(r'\*\*([^*]+)\*\*\s*[\u2014\u2013]\s*', r'\1: ', text)
    t = t.replace('**', '').replace('``', '')
    t = re.sub(r'(?<![\w*])\*([^*\s][^*]*?)\*(?![\w*])', r'\1', t)
    t = re.sub(r'\s*[\u2014\u2013]\s*', ', ', t)
    return re.sub(r'\s+', ' ', t).strip()


def scrub(value):
    if isinstance(value, str):
        return clean(value)
    if isinstance(value, list):
        return [scrub(v) for v in value]
    if isinstance(value, dict):
        return {k: (scrub(v) if k not in ('storeUrl', 'storeUrls', 'technical') else v) for k, v in value.items()}
    return value


def suite_of(tech):
    for label, rx in SUITES:
        if re.search(rx, tech):
            return label
    return 'Tools and Utilities'


def load_existing():
    src = OUT.read_text(encoding='utf-8')
    body = src[src.index('export const MODULE_CATALOG'):]
    body = body[body.index('{'):body.rindex('}') + 1]
    return json.loads(body)


def main():
    old = load_existing()
    m = {s: manifests(s) for s in REPOS}
    techs = sorted(set(m['19.0']) | set(m['20.0']))
    jobs = [(s, t) for t in techs for s in REPOS if t in m[s]]
    with ThreadPoolExecutor(16) as ex:
        res = dict(zip(jobs, ex.map(lambda j: listed(*j), jobs)))

    cat, skipped = {}, []
    for t in techs:
        key = t.replace('_', '-')
        series = [s for s in REPOS if t in m[s]]
        live = [s for s in series if res[(s, t)][0]]
        if not live and key not in old:
            skipped.append(t)
            continue
        base = m['19.0'].get(t) or m['20.0'][t]
        newest = m['20.0'].get(t) or base
        intro, sections = parse_description(base.get('description', ''))
        prev = old.get(key, {})
        if not sections:
            intro, sections = prev.get('intro', intro), prev.get('sections', [])
        if not sections:
            s0 = '19.0' if t in m['19.0'] else '20.0'
            try:
                sections = parse_index_html(git(REPOS[s0], 'show', f'origin/{s0}:{t}/static/description/index.html'))
            except subprocess.CalledProcessError:
                sections = []
        if not intro:
            intro = prev.get('intro', [])
        price = base.get('price')
        store_urls = {s: res[(s, t)][1] for s in live}
        cat[key] = {
            'technical': t,
            'name': short_name(base.get('name', '')) or prev.get('name', t),
            'summary': re.sub(r'\s+', ' ', (base.get('summary') or prev.get('summary', ''))).strip(),
            'intro': intro,
            'sections': sections,
            'category': base.get('category', '') or prev.get('category', ''),
            'suite': suite_of(t),
            'version': base.get('version', ''),
            'versions': live or series,
            'latestVersion': newest.get('version', ''),
            'price': float(price) if isinstance(price, (int, float)) and price > 0 else None,
            'currency': base.get('currency', 'USD'),
            'storeUrl': store_urls.get('19.0') or store_urls.get('20.0', ''),
            'storeUrls': store_urls,
            'published': bool(live),
        }
    for key, prev in old.items():
        if key not in cat:
            prev = dict(prev)
            prev['name'] = short_name(prev.get('name', '')) or key
            prev.setdefault('suite', suite_of(prev.get('technical', key.replace('-', '_'))))
            prev.setdefault('versions', [prev.get('version', '19.0')[:4]])
            prev.setdefault('latestVersion', prev.get('version', ''))
            prev.setdefault('storeUrls', {'19.0': prev['storeUrl']} if prev.get('storeUrl') else {})
            cat[key] = prev
            print('kept old entry', key, file=sys.stderr)

    head = OUT.read_text(encoding='utf-8')
    head = head[:head.index('export const MODULE_CATALOG')]
    head = re.sub(r'export interface StoreModule \{.*?\n\}\n', '''export interface StoreModule {
  technical: string;
  name: string;
  summary: string;
  intro: string[];
  sections: ModuleSection[];
  category: string;
  /** Suite heading on /products/. */
  suite: string;
  /** Version on the 19.0 branch (or 20.0 where there is no 19.0 build). */
  version: string;
  /** Odoo series the module is listed for, e.g. ['19.0', '20.0']. */
  versions: string[];
  latestVersion: string;
  price: number | null;
  currency: string;
  storeUrl: string;
  storeUrls: Record<string, string>;
  published: boolean;
}
''', head, flags=re.S)
    head = re.sub(r'^/\*.*?\*/', '''/*
 * Way4Tech module catalogue, generated by scripts/gen-catalogue.py from the
 * __manifest__.py of every module on the odoostore 19.0 and 20.0 branches.
 * Name, summary, feature sections, category, version and price all come from
 * the manifest, so the site and the module cannot drift apart.
 *
 * storeUrls holds only listings confirmed live on apps.odoo.com when the script
 * ran. Modules that are built but not listed carry published: false and must not
 * be linked to the store.
 *
 * Regenerate rather than hand-edit.
 */''', head, count=1, flags=re.S)
    cat = {k: scrub(v) for k, v in cat.items()}
    body = json.dumps(dict(sorted(cat.items())), indent=1, ensure_ascii=False)
    OUT.write_text(head + 'export const MODULE_CATALOG: Record<string, StoreModule> = ' + body + ';\n', encoding='utf-8')
    print(f'{len(cat)} entries, {sum(1 for v in cat.values() if v["published"])} published, '
          f'{sum(1 for v in cat.values() if len(v["versions"]) > 1)} on both versions; skipped {skipped}', file=sys.stderr)


if __name__ == '__main__':
    main()
