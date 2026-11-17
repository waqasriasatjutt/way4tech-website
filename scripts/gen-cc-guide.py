# -*- coding: utf-8 -*-
"""Generate the Construction Cloud user guide pages from the guide source.

Source: the guide folder (chapters/*.md, shots/*.png, the built PDF).
Output:
  src/data/cc-guide/guide.json           parts, chapters, sections, descriptions
  src/data/cc-guide/chapters/<slug>.html one HTML fragment per chapter
  public/software/construction-cloud/guide/img/<name>.webp
  public/downloads/guides/construction-cloud-user-guide-N-of-M.pdf  (--pdf <file>)

Run from the repo root:
  python scripts/gen-cc-guide.py [--src <guide folder>] [--pdf <built guide PDF>]

The PDF passed to --pdf must be built from screenshots that already carry the
redactions below (copy the guide folder, apply redact() to its shots, run its
build.py), or the downloads would show what the web images hide. Without
--pdf the download list in guide.json is kept as it is.

Pages that render this: src/pages/software/construction-cloud/guide/.
Needs: markdown, Pillow, pypdf (and pymupdf for --pdf).
"""
import argparse
import html
import json
import math
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_SRC = pathlib.Path(r'C:/Users/waqas/Documents/guides/chand_construction')
DATA = ROOT / 'src' / 'data' / 'cc-guide'
IMG_URL = '/software/construction-cloud/guide/img'
IMG_DIR = ROOT / 'public' / 'software' / 'construction-cloud' / 'guide' / 'img'
PDF_DIR = ROOT / 'public' / 'downloads' / 'guides'
GUIDE_URL = '/software/construction-cloud/guide'
# Words painted over in the screenshots before they are published (platform
# names in the chatter, another brand in a settings list). Boxes are in the
# original PNG's pixels: [x, y, w, h, replacement text, optional font px]. Found with OCR.
REDACT_FILE = ROOT / 'scripts' / 'cc-guide-redact.json'
REDACT = json.loads(REDACT_FILE.read_text(encoding='utf-8')) if REDACT_FILE.exists() else {}

PARTS = [
    (0, 9, 'Getting started', 'Log in, find your way round the screens and learn the ten ideas the whole system rests on.'),
    (10, 29, 'Your role, day by day', 'What each person sees on login, what their dashboard means and the jobs they do every day, week and month.'),
    (30, 49, 'Menu by menu', 'Every menu and screen, what it is for and who uses it.'),
    (50, 69, 'Business flows from start to finish', 'The main processes followed end to end, record by record.'),
    (70, 79, 'How everything connects', 'Which record leads to which, and where every key number comes from.'),
    (80, 89, 'Expert setup and control', 'Setup, users and roles, approvals, period close, alerts, imports and exports.'),
    (90, 99, 'Reference', 'Glossary, questions and answers, and the menu map.'),
]

CALLOUTS = {
    'tip': ('tip', 'Tip'),
    'note': ('note', 'Note'),
    'watch out': ('warn', 'Watch out'),
    'why it matters': ('why', 'Why it matters'),
    'example': ('example', 'Example'),
}

# Text that must never reach a public page. Checked on every output file.
FORBIDDEN = re.compile(r'odoo|devcynx|cynx|\bchand\b|chand group|al bayan|\u2014|\u2013', re.I)

# Neutralised in the source text before conversion.
REPLACE = [
    ('https://construction.way4tech.com', 'https://construction-cloud.way4tech.com'),
    ('\u2014', ', '),
    ('\u2013', '-'),
]


def part_of(num):
    for i, (lo, hi, *_rest) in enumerate(PARTS):
        if lo <= num <= hi:
            return i
    return len(PARTS) - 1


def slugify(s, limit=70):
    s = html.unescape(re.sub(r'<[^>]+>', '', s)).lower().replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    if len(s) > limit:
        s = s[:limit].rsplit('-', 1)[0]
    return s or 'section'


def plain(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()


def describe(text, limit=155):
    """Meta description: the first real sentences of the chapter, cut on a sentence or word."""
    text = plain(text)
    if len(text) <= limit:
        return text
    head = text[:limit]
    stop = head.rfind('. ')
    if stop >= 90:
        return head[:stop + 1]
    cut = text[:limit - 3].rsplit(' ', 1)[0].rstrip(',;:. ')
    return cut + '...'


# --------------------------------------------------------------------------- images
def prepare_image(src_dir, name, cache):
    """shots/<name> -> public/.../img/<stem>.webp. Returns (url, w, h, phone) or None."""
    if name in cache:
        return cache[name]
    from PIL import Image, ImageChops
    src = src_dir / 'shots' / name
    if not src.exists():
        cache[name] = None
        return None
    dst = IMG_DIR / (src.stem.lower().replace('_', '-') + '.webp')
    fresh = dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime
    if name in REDACT and fresh:
        fresh = dst.stat().st_mtime >= REDACT_FILE.stat().st_mtime
    if fresh:
        with Image.open(src) as im0:
            phone0 = im0.width <= 900 and im0.height > im0.width * 1.5
        with Image.open(dst) as im:
            res = (f'{IMG_URL}/{dst.name}', im.width, im.height, phone0)
        cache[name] = res
        return res
    im = Image.open(src).convert('RGB')
    if name in REDACT:
        redact(im, REDACT[name])
    phone = im.width <= 900 and im.height > im.width * 1.5
    if not phone:
        # cut the empty band under the content of a desktop screenshot
        bg = Image.new(im.mode, im.size, im.getpixel((im.width - 4, im.height - 4)))
        box = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 16 else 0).getbbox()
        if box and box[3] < im.height - 60:
            im = im.crop((0, 0, im.width, min(im.height, box[3] + 28)))
    maxw = 520 if phone else 1200
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=68, method=6)
    res = (f'{IMG_URL}/{dst.name}', im.width, im.height, phone)
    cache[name] = res
    return res


def redact(im, boxes):
    """Paint over each box with the surrounding background and write the replacement text."""
    from collections import Counter
    from PIL import ImageDraw, ImageFont
    draw = ImageDraw.Draw(im)
    for x, y, w, h, text, *opt in boxes:
        ring = [im.getpixel((xx, yy)) for xx in range(max(0, x - 3), min(im.width, x + w + 3))
                for yy in (max(0, y - 2), min(im.height - 1, y + h + 1))]
        bg = Counter(ring).most_common(1)[0][0]
        inside = [im.getpixel((xx, yy)) for xx in range(x, x + w) for yy in range(y, y + h)]
        ink = min(inside, key=sum)
        draw.rectangle([x, y, x + w, y + h], fill=bg)
        if text:
            size = opt[0] if opt else round((h - 4) * 1.42)
            try:
                font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', size)
            except OSError:
                font = ImageFont.load_default()
            draw.text((x + 1, y + h - 2), text, fill=ink, font=font, anchor='ls')


# --------------------------------------------------------------------------- chapters
class Chapter:
    def __init__(self, path):
        self.path = path
        self.key = path.stem
        self.num = int(re.match(r'(\d+)', self.key).group(1))
        raw = path.read_text(encoding='utf-8')
        for a, b in REPLACE:
            raw = raw.replace(a, b)
        raw = raw.lstrip()
        first = raw.splitlines()[0]
        self.title = re.sub(r'^#\s*', '', first).strip()
        self.body_md = raw[len(first):]
        self.part = part_of(self.num)
        self.slug = slugify(self.title.split(' (')[0], 60)
        if self.key == '00_welcome':
            self.slug = 'welcome'
        self.sections = []
        self.figs = 0
        self.images = []


def chapter_links(body, by_num):
    """Turn "Chapter 12" and "Chapters 10 and 11" in running text into links."""
    out, depth = [], 0
    for tok in re.split(r'(<[^>]+>)', body):
        if tok.startswith('<'):
            t = tok.lower()
            if re.match(r'<(a|h[1-6])[\s>]', t):
                depth += 1
            elif re.match(r'</(a|h[1-6])>', t):
                depth -= 1
            out.append(tok)
            continue
        if depth > 0:
            out.append(tok)
            continue

        def one(m):
            word, nums = m.group(1), m.group(2)

            def num(n):
                n = n.group(0)
                c = by_num.get(int(n))
                return f'<a href="{GUIDE_URL}/{c.slug}/">{n}</a>' if c else n
            return word + ' ' + re.sub(r'\d+', num, nums)
        out.append(re.sub(r'\b(Chapters?) (\d+(?:(?:, | and | or | to )\d+)*)', one, tok))
    return ''.join(out)


def dress(ch, body, src_dir, cache, by_num):
    used = {}

    def anchor(text):
        base = slugify(text, 60)
        n = used.get(base, 0)
        used[base] = n + 1
        return base if n == 0 else f'{base}-{n + 1}'

    def head(m):
        lvl, inner = m.group(1), m.group(2)
        a = anchor(inner)
        if lvl == '2':
            ch.sections.append({'id': a, 'title': plain(inner)})
        return f'<h{lvl} id="{a}">{inner}</h{lvl}>'
    body = re.sub(r'<h([234])>(.*?)</h\1>', head, body, flags=re.S)

    def callout(m):
        inner = m.group(1).strip()
        mm = re.match(r'<p><strong>([^<:]+):?</strong>:?\s*(.*)', inner, flags=re.S)
        if mm and mm.group(1).strip().rstrip(':').lower() in CALLOUTS:
            cls, label = CALLOUTS[mm.group(1).strip().rstrip(':').lower()]
            return (f'<aside class="callout {cls}"><p class="clabel">{label}</p>'
                    f'<div class="cbody"><p>{mm.group(2)}</div></aside>')
        return f'<blockquote>{inner}</blockquote>'
    body = re.sub(r'<blockquote>(.*?)</blockquote>', callout, body, flags=re.S)

    def figure(alt, src):
        name = pathlib.Path(src).name
        info = prepare_image(src_dir, name, cache)
        if not info:
            print(f'  missing screenshot: {name} ({ch.key})')
            return '', False
        url, w, h, phone = info
        ch.figs += 1
        ch.images.append(url)
        alt_text = alt or f'{ch.title} screen'
        cap = f'<figcaption><b>Figure {ch.num}.{ch.figs}</b> {html.escape(alt)}</figcaption>' if alt else ''
        cls = 'phone' if phone else 'desk'
        return (f'<figure class="{cls}"><img src="{url}" alt="{html.escape(alt_text, quote=True)}" '
                f'width="{w}" height="{h}" loading="lazy" decoding="async">{cap}</figure>'), phone

    img_re = re.compile(r'<img alt="([^"]*)" src="([^"]+)"\s*/?>')

    def para_imgs(m):
        inner = m.group(1)
        imgs = img_re.findall(inner)
        if not imgs or img_re.sub('', inner).replace('<br />', '').strip():
            return m.group(0)
        figs = [figure(html.unescape(a), s) for a, s in imgs]
        figs = [f for f in figs if f[0]]
        if len(figs) > 1:
            cls = 'phones' if all(p for _, p in figs) else 'pair'
            return f'<div class="figrow {cls}">' + ''.join(f for f, _ in figs) + '</div>'
        return figs[0][0] if figs else ''
    body = re.sub(r'<p>(.*?)</p>', para_imgs, body, flags=re.S)
    body = img_re.sub(lambda m: figure(html.unescape(m.group(1)), m.group(2))[0], body)

    body = re.sub(r'<ol start="(\d+)">',
                  lambda m: f'<ol class="steps" start="{m.group(1)}" style="counter-reset: step {int(m.group(1)) - 1}">', body)
    body = body.replace('<ol>', '<ol class="steps">')
    body = re.sub(r'<strong>([^<]*?&gt;[^<]*?)</strong>',
                  lambda m: '<strong class="menu">' + m.group(1).replace(' &gt; ', '<i> &rsaquo; </i>') + '</strong>', body)
    body = body.replace('<dl>', '<dl class="gloss">')
    body = re.sub(r'<table>(.*?)</table>', r'<div class="tablewrap"><table>\1</table></div>', body, flags=re.S)
    # SVG marker ids must stay unique if two diagrams ever share a page
    body = chapter_links(body, by_num)
    return body


def first_text(body_html):
    for m in re.finditer(r'<p>(.*?)</p>', body_html, flags=re.S):
        t = plain(m.group(1))
        if len(t) > 40 and not t.startswith('Where:'):
            return t
    return ''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(DEFAULT_SRC))
    ap.add_argument('--pdf', help='a built, redacted guide PDF to split into downloads')
    args = ap.parse_args()
    src = pathlib.Path(args.src)
    import markdown

    files = sorted(p for p in (src / 'chapters').glob('*.md') if not p.name.startswith('_'))
    chapters = [Chapter(p) for p in files]
    slugs = set()
    for c in chapters:
        while c.slug in slugs:
            c.slug += '-2'
        slugs.add(c.slug)
    by_num = {c.num: c for c in chapters}

    IMG_DIR.mkdir(parents=True, exist_ok=True)
    out_dir = DATA / 'chapters'
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)

    cache = {}
    for c in chapters:
        md = markdown.markdown(c.body_md, extensions=['tables', 'attr_list', 'def_list', 'sane_lists', 'md_in_html', 'fenced_code'])
        c.html = dress(c, md, src, cache, by_num)
        lead = first_text(c.html)
        c.description = describe(lead) if lead else f'{c.title}: a chapter of the Construction Cloud user guide.'
        (out_dir / f'{c.slug}.html').write_text(c.html, encoding='utf-8')
        print(f'{c.key} -> {c.slug} ({c.figs} figures, {len(c.sections)} sections)')

    # drop images no chapter uses any more
    used = {pathlib.Path(u).name for c in chapters for u in c.images}
    for f in IMG_DIR.glob('*.webp'):
        if f.name not in used:
            f.unlink()

    pdf_parts = []
    if args.pdf:
        pdf_parts = split_pdf(pathlib.Path(args.pdf), chapters)
    elif (DATA / 'guide.json').exists():
        pdf_parts = json.loads((DATA / 'guide.json').read_text(encoding='utf-8')).get('pdf', [])

    data = {
        'parts': [{'index': i, 'label': f'Part {i + 1}', 'title': t, 'blurb': b} for i, (_lo, _hi, t, b) in enumerate(PARTS)],
        'chapters': [{
            'key': c.key, 'num': c.num, 'slug': c.slug, 'title': c.title, 'part': c.part,
            'description': c.description, 'sections': c.sections, 'figures': c.figs,
        } for c in chapters],
        'pdf': pdf_parts,
    }
    (DATA / 'guide.json').write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding='utf-8')

    # public text check
    bad = []
    for f in [DATA / 'guide.json', *out_dir.glob('*.html')]:
        for m in FORBIDDEN.finditer(f.read_text(encoding='utf-8')):
            bad.append(f'{f.name}: {m.group(0)!r}')
    if bad:
        print('FORBIDDEN TEXT:\n  ' + '\n  '.join(bad[:40]))
        sys.exit(1)
    total = sum(f.stat().st_size for f in IMG_DIR.glob('*.webp'))
    print(f'{len(chapters)} chapters, {sum(c.figs for c in chapters)} figures, '
          f'{len(used)} images, {total / 1024 / 1024:.1f} MB of images')


def split_pdf(pdf, chapters, limit=19.5 * 1024 * 1024):
    """Split the PDF by guide part, joining neighbouring parts while a file stays under the limit."""
    import pymupdf
    doc = pymupdf.open(str(pdf))
    # first page of each part: the divider page starts with "Part N" then the part title
    starts = []
    for i, (_lo, _hi, title, _b) in enumerate(PARTS):
        for pno in range((starts[-1] + 1) if starts else 3, len(doc)):
            # the label is letter-spaced ("PA R T 2") and is sometimes missing from the text layer
            t = ' '.join(doc[pno].get_text().split())
            t = re.sub(r'^P\s*A\s*R\s*T\s*\d+\s*', '', t, flags=re.I)
            if t.startswith(title + ' ') and t[len(title):].lstrip().startswith(_b.split(',')[0].split(' ')[0]):
                starts.append(pno)
                break
    if len(starts) != len(PARTS):
        raise SystemExit(f'could not find all part pages: {starts}')
    # front matter (cover, how to use, contents) goes with part 1
    starts[0] = 0
    bounds = [(starts[i], (starts[i + 1] - 1) if i + 1 < len(starts) else len(doc) - 1) for i in range(len(starts))]
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    for old in PDF_DIR.glob('construction-cloud-user-guide-*.pdf'):
        old.unlink()
    # a part too big for one file is cut into page ranges of about equal weight
    pieces = []
    for i, (a, b) in enumerate(bounds):
        size = part_size(doc, a, b)
        k = math.ceil(size / (limit * 0.92))
        if k <= 1:
            pieces.append({'parts': [i], 'a': a, 'b': b, 'size': size, 'label': f'Part {i + 1}'})
            continue
        weights = [page_weight(doc, p) for p in range(a, b + 1)]
        total, acc, cut = sum(weights), 0, a
        for n in range(1, k + 1):
            if n == k:
                end = b
            else:
                target = total * n / k
                end = cut
                while end < b and acc + weights[end - a] < target:
                    acc += weights[end - a]
                    end += 1
                end = max(cut, end - 1)
            pieces.append({'parts': [i], 'a': cut, 'b': end, 'size': part_size(doc, cut, end),
                           'label': f'Part {i + 1} ({n} of {k})'})
            cut = end + 1
    # then neighbouring pieces are joined while they fit, so there are few downloads
    groups = []
    for pc in pieces:
        g = groups[-1] if groups else None
        if g and '(' not in g['label'] and '(' not in pc['label'] and g['size'] + pc['size'] < limit:
            g['parts'] += pc['parts']
            g['b'] = pc['b']
            g['size'] += pc['size']
            g['label'] += f', Part {pc["parts"][0] + 1}'
        else:
            groups.append(dict(pc))
    out = []
    for n, g in enumerate(groups, start=1):
        sub = pymupdf.open()
        sub.insert_pdf(doc, from_page=g['a'], to_page=g['b'])
        name = f'construction-cloud-user-guide-{n}-of-{len(groups)}.pdf'
        path = PDF_DIR / name
        sub.save(str(path), garbage=4, deflate=True)
        sub.close()
        size = path.stat().st_size
        if size > 20 * 1024 * 1024:
            raise SystemExit(f'{name} is {size / 1024 / 1024:.1f} MB')
        out.append({
            'url': f'/downloads/guides/{name}',
            'title': nice_label(g),
            'covers': [PARTS[i][2] for i in dict.fromkeys(g['parts'])],
            'pages': g['b'] - g['a'] + 1,
            'mb': round(size / 1024 / 1024, 1),
        })
        print(f'{name}: pages {g["a"] + 1}-{g["b"] + 1}, {size / 1024 / 1024:.1f} MB')
    doc.close()
    return out


def nice_label(g):
    nums = [i + 1 for i in dict.fromkeys(g['parts'])]
    if '(' in g['label'] or len(nums) == 1:
        return g['label']
    if len(nums) == 2:
        return f'Parts {nums[0]} and {nums[1]}'
    return f'Parts {nums[0]} to {nums[-1]}'


def part_size(doc, a, b):
    import pymupdf
    sub = pymupdf.open()
    sub.insert_pdf(doc, from_page=a, to_page=b)
    data = sub.tobytes(garbage=4, deflate=True)
    sub.close()
    return len(data)


def page_weight(doc, pno):
    """Rough bytes a page adds: its pictures' streams plus a little for the text."""
    w = 4000
    for img in doc[pno].get_images(full=True):
        try:
            w += len(doc.xref_stream_raw(img[0]) or b'')
        except Exception:
            pass
    return w


if __name__ == '__main__':
    main()
