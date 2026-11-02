#!/usr/bin/env python3
"""B soļa sagatave: kontaktlapas (12 bildes lapā ar numuriem) no triage/report.csv kandidātiem."""
import csv, json, os
from PIL import Image, ImageOps, ImageDraw, ImageFont
Image.MAX_IMAGE_PIXELS = None
SRC='source-photos'; OUT='triage/sheets'; os.makedirs(OUT, exist_ok=True)
rows=[r for r in csv.DictReader(open('triage/report.csv',encoding='utf-8')) if r['tier'] in ('A','B')]
rows.sort(key=lambda r:r['file'])
COLS,ROWS,CW,CH=4,3,460,345
try: font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26)
except: font=ImageFont.load_default()
idx={}
per=COLS*ROWS
for s in range(0,len(rows),per):
    chunk=rows[s:s+per]; sheet=Image.new('RGB',(COLS*CW,ROWS*CH),(30,30,30))
    for i,r in enumerate(chunk):
        n=s+i+1; idx[n]=r['file']
        im=Image.open(os.path.join(SRC,r['file']))
        if im.format=='JPEG': im.draft('RGB',(CW*2,CH*2))
        im=ImageOps.exif_transpose(im).convert('RGB'); im.thumbnail((CW-6,CH-6))
        x=(i%COLS)*CW+(CW-im.width)//2; y=(i//COLS)*CH+(CH-im.height)//2
        sheet.paste(im,(x,y)); d=ImageDraw.Draw(sheet)
        cx,cy=(i%COLS)*CW+6,(i//COLS)*CH+6
        d.rectangle([cx,cy,cx+62,cy+34],fill=(0,0,0)); d.text((cx+6,cy+3),f'{n}',fill=(255,255,0),font=font)
    sheet.save(f'{OUT}/sheet_{s//per+1:02d}.jpg',quality=82)
json.dump(idx,open('triage/index.json','w'),ensure_ascii=False)
print(len(rows),'bildes,',(len(rows)+per-1)//per,'lapas')
