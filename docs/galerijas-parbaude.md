# Virtuvju galerijas pārbaude

Šī ir klienta apskates versija. Pirmās 119 vecās galerijas bildes ir sakārtotas 57 projektos, saglabājot klienta izvēlēto secību pēc projekta pirmā foto. Jaunākie, vietnē jau esošie projekti galerijā seko pēc šīs atlases. Pakalpojuma lapā turpina parādīties atlasītie piemēri.

- [Projektu saraksts](galerijas-virtuves-projekti.csv): viena rinda katram projektam, tā numurs, vecās galerijas bilžu numuri un jaunā saite.
- [Bilžu atbilstība](galerijas-virtuves-atbilstiba.csv): viena rinda katram no 119 avota failiem; norādīts, vai kadrs jau bija jaunajā vietnē.
- Grupēšanas dati vietnei: `src/gallery-kitchens.json`. Oriģinālie faili paliek atsevišķi mapē `2026-11-05/papildus virtuves`; vietnei pievienoti optimizēti WebP attēli.

Pārbaudot pilna izmēra attēlus, sākotnējā tabulā precizētas vairākas grupas: 45.–46. un 49.–50. foto ir viens projekts; 54. un 113. foto ir viens projekts; 112., 114. un 115. foto ir cits projekts; 116.–118. foto ir viens projekts. 35. un 36. attēls ir izmantojams, un 35. faila bojātais JPEG kodējums pirms optimizācijas tika salabots. 62.–64. foto turēti vienā projektā, virtuves skatu liekot pirmo; gultas kadri ir tā paša nestandarta risinājuma konteksts.

Projekta lapas ir paredzētas apskatei un dalīšanai, bet šajā posmā tām ir `noindex`. Vecajiem projektiem pagaidām ir tikai pagaidu numuri, nevis izdomāti apraksti. Kad klients atlasīs paturamos projektus un būs zināmi precīzi fakti, atlasītajām lapām varēs pievienot unikālu saturu un lemt par to indeksēšanu. Numurus varēs paslēpt, saglabājot iekšējo atbilstības tabulu.
