#!/usr/bin/env python3
"""Izveido triage/review.html: kandidātu skats ar filtriem un jā/nē atzīmēm (saglabā pārlūkā, eksports JSON)."""
import json, os
from PIL import Image, ImageOps
Image.MAX_IMAGE_PIXELS = None
idx = {int(k): v for k, v in json.load(open('triage/index.json', encoding='utf-8')).items()}
lab = {r['n']: r for r in json.load(open('triage/labels.json', encoding='utf-8'))}
os.makedirs('triage/thumbs', exist_ok=True)
items = []
for n in sorted(idx):
    f = idx[n]; t = f'triage/thumbs/{n:03d}.jpg'
    if not os.path.exists(t):
        im = Image.open(os.path.join('source-photos', f))
        if im.format == 'JPEG': im.draft('RGB', (1400, 1400))
        im = ImageOps.exif_transpose(im).convert('RGB'); im.thumbnail((700, 700)); im.save(t, quality=80)
    l = lab[n]; items.append({'n': n, 'file': f, 't': l['t'], 'q': l['q'], 'p': l['p'], 'w': l['w'], 'ok': l['ok']})
html = open('scripts/photo-review.tpl.html', encoding='utf-8').read().replace('__DATA__', json.dumps(items, ensure_ascii=False))
open('triage/review.html', 'w', encoding='utf-8').write(html)
print(len(items), 'bildes -> triage/review.html')
