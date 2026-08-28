# Build web logo assets from the supplied brand JPEG.
#
# The source is a stacked lockup on a solid white background: fine on the white
# header, a white rectangle on the dark footer. This lifts the background to
# transparent and writes the sizes the site actually renders.
#
# Deliberately NOT traced to SVG. The mark has a folded W, a pixel trail and an
# integrated 4/T in a gradient; hand authoring paths for that would produce an
# approximation of someone's brand, and a wrong logo is worse than a heavier one.
# A real SVG has to come from the original vector artwork.

from PIL import Image
import sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else "public/logo-w4t.jpg"
OUT_DIR = "public"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

# The background is near-white and the artwork is dark navy through purple, so a
# whiteness test separates them cleanly. The ramp between the two thresholds is
# what keeps anti-aliased edges smooth instead of jagged.
SOLID = 232   # at or below this, keep the pixel fully
CLEAR = 250   # at or above this, drop it entirely

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        m = min(r, g, b)
        if m >= CLEAR:
            px[x, y] = (r, g, b, 0)
        elif m > SOLID:
            # Linear ramp so edge pixels fade rather than stair-step.
            alpha = int(255 * (CLEAR - m) / (CLEAR - SOLID))
            px[x, y] = (r, g, b, alpha)

# Trim the transparent margin so the logo fills its box and can be sized by
# height alone in CSS.
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(os.path.join(OUT_DIR, "logo-w4t.png"))
print("full lockup :", img.size, "-> public/logo-w4t.png")

# The header renders at 44px tall. The tagline is illegible far above that, so
# the header gets the mark and wordmark only: everything above the tagline rule.
# Found by scanning up from the bottom for the first row with artwork in it,
# then cutting above the horizontal rule that sits under the wordmark.
W, H = img.size
p2 = img.load()
rows = []
for y in range(H):
    ink = sum(1 for x in range(0, W, 4) if p2[x, y][3] > 40)
    rows.append(ink)

# The tagline band is the last cluster of ink; the rule above it is a long thin
# run. Walk up from the bottom past the tagline, then past the gap.
y = H - 1
while y > 0 and rows[y] == 0:
    y -= 1
while y > 0 and rows[y] > 0:      # tagline
    y -= 1
while y > 0 and rows[y] == 0:     # gap above tagline
    y -= 1

crop_h = max(1, y + 1)
head = img.crop((0, 0, W, crop_h))
head = head.crop(head.getbbox())
head.save(os.path.join(OUT_DIR, "logo-w4t-mark.png"))
print("header lockup:", head.size, "-> public/logo-w4t-mark.png")
