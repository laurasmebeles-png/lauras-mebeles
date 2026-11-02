#!/usr/bin/env python3
"""A solis: automātiskā foto atlase (bez modeļa). Raksta triage/report.csv un triage/dupes.txt."""
import csv, hashlib, os, re, sys, json, time
from multiprocessing import Pool
from PIL import Image, ImageOps
import numpy as np, cv2
Image.MAX_IMAGE_PIXELS = None
SRC = sys.argv[1] if len(sys.argv) > 1 else 'source-photos'
OUT = 'triage'
WP_THUMB = re.compile(r'-\d{2,4}x\d{2,4}(\.\w+)$')

def dhash(img, n=8):
    g = np.asarray(img.convert('L').resize((n+1, n), Image.LANCZOS), dtype=np.int16)
    return int(''.join('1' if b else '0' for b in (g[:, 1:] > g[:, :-1]).flatten()), 2)

def analyse(name):
    p = os.path.join(SRC, name)
    r = {'file': name, 'bytes': os.path.getsize(p), 'ext': name.rsplit('.', 1)[-1].lower()}
    r['wp_thumb'] = bool(WP_THUMB.search(name))
    if r['ext'] == 'svg':
        r.update(w=0, h=0, reason='svg'); return r
    try:
        im = Image.open(p); w, h = im.size
        if r['ext'] in ('jpg', 'jpeg'): im.draft('RGB', (1000, 1000))
        small = ImageOps.exif_transpose(im).convert('RGB'); small.thumbnail((900, 900))
        if getattr(im, 'getexif', None) and im.getexif().get(274, 1) in (5, 6, 7, 8): w, h = h, w
        r.update(w=w, h=h)
        a = np.asarray(small); gray = cv2.cvtColor(a, cv2.COLOR_RGB2GRAY)
        r['sharp'] = round(float(cv2.Laplacian(gray, cv2.CV_64F).var()), 1)
        r['bright'] = round(float(gray.mean()), 1)
        r['colors'] = len(np.unique((a // 32).reshape(-1, 3), axis=0))
        r['dhash'] = dhash(small)
        r['sha'] = hashlib.md5(small.tobytes()).hexdigest()
    except Exception as e:
        r.update(w=0, h=0, reason='unreadable'); 
    return r

if __name__ == '__main__':
    files = sorted(f for f in os.listdir(SRC) if os.path.isfile(os.path.join(SRC, f)) and not f.startswith('.'))
    CACHE = f'{OUT}/cache.json'; os.makedirs(OUT, exist_ok=True)
    cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
    todo = [f for f in files if f not in cache]
    t0 = time.time()
    with Pool(os.cpu_count()) as pool:
        for r in pool.imap_unordered(analyse, todo, chunksize=2):
            cache[r['file']] = r
            if time.time() - t0 > float(os.environ.get('BUDGET', 90)):
                pool.terminate(); break
    json.dump(cache, open(CACHE, 'w'))
    left = [f for f in files if f not in cache]
    print(f'apstradats {len(cache)}/{len(files)}, atlicis {len(left)}')
    if left: sys.exit(0)
    rows = [cache[f] for f in files]
    # dublikāti: identisks fails vai ļoti līdzīgs dhash
    ok = [r for r in rows if 'dhash' in r]
    ok.sort(key=lambda r: -(r['w'] * r['h']))
    kept = []
    for r in ok:
        dup = next((k for k in kept if r['sha'] == k['sha'] or bin(r['dhash'] ^ k['dhash']).count('1') <= 4), None)
        r['dup_of'] = dup['file'] if dup else ''
        if not dup: kept.append(r)
    for r in rows:
        if r.get('reason'): continue
        reasons = []
        long_side = max(r['w'], r['h'])
        if r['wp_thumb']: reasons.append('wp-samazinata-kopija')
        if long_side < 1000: reasons.append('par-mazs(<1000px)')
        if r.get('dup_of'): reasons.append('dublikats')
        if r.get('sharp', 99) < 60: reasons.append('izpludusi')
        if r.get('bright', 128) < 40 or r.get('bright', 128) > 225: reasons.append('tumsa/parlieku-gaisa')
        if r['ext'] == 'png' and r.get('colors', 99) < 40: reasons.append('grafika/logo?')
        if max(r['w'], r['h']) / max(1, min(r['w'], r['h'])) > 3: reasons.append('dīvaina-proporcija')
        r['reason'] = ';'.join(reasons)
        r['tier'] = ('A' if long_side >= 1600 else 'B') if not reasons else 'X'
    cols = ['file', 'ext', 'w', 'h', 'bytes', 'sharp', 'bright', 'colors', 'tier', 'reason', 'dup_of']
    os.makedirs(OUT, exist_ok=True)
    with open(f'{OUT}/report.csv', 'w', newline='', encoding='utf-8') as f:
        wr = csv.DictWriter(f, fieldnames=cols, extrasaction='ignore'); wr.writeheader()
        for r in rows: wr.writerow(r)
    from collections import Counter
    t = Counter(r.get('tier', 'X') for r in rows); print('tier', dict(t))
    rc = Counter(x for r in rows for x in r.get('reason', '').split(';') if x); print(rc)
