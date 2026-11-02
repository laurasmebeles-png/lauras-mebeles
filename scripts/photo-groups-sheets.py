#!/usr/bin/env python3
"""Kontaktlapas grupēšanai: pa veidiem, kārtotas pēc faila nosaukuma; mājieni no ORB."""
import json, os
from PIL import Image, ImageOps, ImageDraw, ImageFont
Image.MAX_IMAGE_PIXELS = None
STOCK = {'bathroom-3529490_1920.jpg','be-1230271_1920.jpg','bed-1839184_1920-1.jpg','furniture-1840463_1920.jpg','interior-2591365_1920.jpg','living-room-2569325_1920.jpg'}
idx = {v: int(k) for k, v in json.load(open('triage/index.json', encoding='utf-8')).items()}
sel = [x for x in json.load(open('triage/selected.json', encoding='utf-8')) if x['file'] not in STOCK]
for x in sel: x['n'] = idx[x['file']]
OUT = 'triage/gsheets'; os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT): os.remove(os.path.join(OUT, f))
COLS, ROWS, CW, CH = 4, 3, 460, 345
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
groups = {'virtuve': ['virtuve'], 'skapis': ['skapis'], 'citi': ['vannasistaba', 'viesistaba', 'prieksnams', 'cita']}
manifest = {}
for g, types in groups.items():
    items = sorted([x for x in sel if x['type'] in types], key=lambda x: (types.index(x['type']), x['file'].lower()))
    manifest[g] = [{'n': x['n'], 'type': x['type'], 'file': x['file']} for x in items]
    per = COLS * ROWS
    for s in range(0, len(items), per):
        sheet = Image.new('RGB', (COLS * CW, ROWS * CH), (30, 30, 30)); d = ImageDraw.Draw(sheet)
        for i, x in enumerate(items[s:s + per]):
            im = Image.open(f"triage/thumbs/{x['n']:03d}.jpg").convert('RGB'); im.thumbnail((CW - 6, CH - 6))
            cx, cy = (i % COLS) * CW, (i // COLS) * CH
            sheet.paste(im, (cx + (CW - im.width) // 2, cy + (CH - im.height) // 2))
            d.rectangle([cx + 6, cy + 6, cx + 68, cy + 40], fill=(0, 0, 0)); d.text((cx + 12, cy + 9), str(x['n']), fill=(255, 255, 0), font=font)
        sheet.save(f'{OUT}/{g}_{s // per + 1:02d}.jpg', quality=82)
json.dump(manifest, open('triage/gmanifest.json', 'w'), ensure_ascii=False)
pairs = json.load(open('triage/pairs.json'))
hints = {}
for k, v in pairs.items():
    if v >= 15:
        a, b = k.split('-'); hints.setdefault(a, []).append(b)
open('triage/hints.txt', 'w').write('\n'.join(f"{a}~{','.join(bs)}" for a, bs in hints.items()))
for g, it in manifest.items(): print(g, len(it), (len(it) + 11) // 12, 'lapas')
