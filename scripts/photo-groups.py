#!/usr/bin/env python3
"""Projektu grupēšanas priekšatlase: ORB pazīmju sakritības starp izvēlētajām bildēm -> triage/pairs.json, triage/clusters.json"""
import json, os, sys, time, itertools
import cv2, numpy as np
from multiprocessing import Pool
STOCK = {'bathroom-3529490_1920.jpg','be-1230271_1920.jpg','bed-1839184_1920-1.jpg','furniture-1840463_1920.jpg','interior-2591365_1920.jpg','living-room-2569325_1920.jpg'}
sel = [x for x in json.load(open('triage/selected.json', encoding='utf-8')) if x['file'] not in STOCK]
idx = {v: int(k) for k, v in json.load(open('triage/index.json', encoding='utf-8')).items()}
for x in sel: x['n'] = idx[x['file']]
orb = cv2.ORB_create(1200)
feats = {}
def comp(x):
    im = cv2.imread(f"triage/thumbs/{x['n']:03d}.jpg", cv2.IMREAD_GRAYSCALE)
    kp, des = orb.detectAndCompute(im, None)
    return x['n'], np.float32([k.pt for k in kp]) if kp else None, des
def match(pair):
    a, b = pair
    ka, da = feats[a]; kb, db = feats[b]
    if da is None or db is None or len(da) < 20 or len(db) < 20: return a, b, 0
    bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    m = bf.knnMatch(da, db, k=2)
    good = [p[0] for p in m if len(p) == 2 and p[0].distance < 0.7 * p[1].distance]
    if len(good) < 12: return a, b, len(good) * 0
    pa = ka_pts[a][[g.queryIdx for g in good]]; pb = ka_pts[b][[g.trainIdx for g in good]]
    F, mask = cv2.findFundamentalMat(pa, pb, cv2.FM_RANSAC, 3.0, 0.99)
    return a, b, int(mask.sum()) if mask is not None else 0
if __name__ == '__main__':
    with Pool(3) as p: res = p.map(comp, sel)
    ka_pts = {}
    for n, kp, des in res:
        feats[n] = (kp, des); ka_pts[n] = kp
    pairs = list(itertools.combinations(sorted(feats), 2))
    cache_f = 'triage/pairs.json'; cache = json.load(open(cache_f)) if os.path.exists(cache_f) else {}
    todo = [pr for pr in pairs if f'{pr[0]}-{pr[1]}' not in cache]
    t0 = time.time(); budget = float(os.environ.get('BUDGET', 100))
    import multiprocessing as mp
    ctx = mp.get_context('fork')
    with ctx.Pool(3) as pool:
        for a, b, s in pool.imap_unordered(match, todo, chunksize=40):
            cache[f'{a}-{b}'] = s
            if time.time() - t0 > budget: pool.terminate(); break
    json.dump(cache, open(cache_f, 'w'))
    left = len([pr for pr in pairs if f'{pr[0]}-{pr[1]}' not in cache])
    print(f'{len(sel)} bildes, pāri atlikuši: {left}')
