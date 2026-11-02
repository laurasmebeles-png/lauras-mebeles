import json,colorsys,os
import numpy as np
from PIL import Image
sel=json.load(open('selected.json'))
out=[]
for s in sel:
    f=f"thumbs/{s['n']:03d}.jpg"
    im=Image.open(f).convert('RGB'); im.thumbnail((120,120))
    a=np.asarray(im)/255.0
    h=np.array([colorsys.rgb_to_hsv(*p) for p in a.reshape(-1,3)])
    H,S,V=h[:,0]*360,h[:,1],h[:,2]
    L=V.mean(); sat=S.mean()
    m=S>0.18
    # dominant hue among saturated pixels (weighted)
    if m.sum()>len(S)*0.08:
        hist,_=np.histogram(H[m],bins=12,range=(0,360),weights=S[m]); dh=int(np.argmax(hist)*30+15)
    else: dh=-1
    warm=float(np.mean((H<70)|(H>330)))
    # group name
    if sat<0.12: g='neutral-gray' if L<0.7 else 'neutral-light'
    elif dh==-1: g='neutral-light' if L>0.6 else 'neutral-dark'
    elif dh<70 or dh>330: g='warm-dark' if L<0.45 else 'warm-light'
    elif dh<170: g='green'
    else: g='cool'
    out.append({**s,'bright':round(float(L),2),'sat':round(float(sat),2),'hue':dh,'group':g})
json.dump(out,open('colors.json','w'),ensure_ascii=False)
from collections import Counter
print(Counter(o['group'] for o in out))
