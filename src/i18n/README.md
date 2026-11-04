# Valodas

Latviešu teksts paliek avotā (`src/*`, `scripts/generate-pages.mjs`, `public/app.js`). Citas valodas ir vārdnīcas `src/i18n/<kods>.json`:
atslēga = latviešu teksta fragments, vērtība = tulkojums. Tukša vērtība `""` = vēl netulkots (lapā paliek latviešu teksts).

## Kā pievienot valodu
1. `npm run i18n:extract` ģenerē lapas un papildina visas vārdnīcas ar jaunajiem fragmentiem (`""`).
2. Aizpilda `src/i18n/<kods>.json` (piem. `en.json`).
3. Ieslēdz valodu `src/i18n/config.json` laukā `enabled` (piem. `["lv","en"]`).
4. `npm run build`. Lapas parādās `public/<kods>/...`, parādās valodu pārslēdzējs un `hreflang`.

## Ko tulko
- Visi lapu teksti, `alt`, `title`, `aria-label`, `placeholder`, meta apraksti.
- Projektu virsraksti un apraksti (`projects.js`), kalkulatora izvēles (`calc-config.json`).
- `public/app.js` virknes ar `T('...')`.

## Svarīgi
- Ja latviešu teksts mainās, vecā atslēga paliek "neizmantota"; palaid `npm run i18n:extract` un pārtulko jauno fragmentu.
- Adreses (slugi) paliek latviešu valodā, tikai pievieno prefiksu `/en/`, `/ru/`, `/no/`.
- Frāzes ar iekšējo formatējumu (piem. `<em>`) tiek dalītas fragmentos; tulko katru fragmentu atsevišķi.
