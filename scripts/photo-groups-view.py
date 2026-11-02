#!/usr/bin/env python3
"""Izveido triage/groups.html: projektu grupu pārlūks ar labojamiem nosaukumiem/aprakstiem un eksportu."""
import json
groups = json.load(open('triage/groups.json', encoding='utf-8'))
idx = {int(k): v for k, v in json.load(open('triage/index.json', encoding='utf-8')).items()}
for i, g in enumerate(groups):
    g['id'] = i; g['files'] = {str(n): idx[n] for n in g['images']}
tpl = open('scripts/photo-groups.tpl.html', encoding='utf-8').read()
open('triage/groups.html', 'w', encoding='utf-8').write(tpl.replace('__DATA__', json.dumps(groups, ensure_ascii=False)))
print(len(groups), 'grupas -> triage/groups.html')
