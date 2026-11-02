# Projekta pamats

Atjaunots: 30.10.2026.

## Mērķis un auditorija

Mūsdienīga, uzticama mājaslapa, kas palīdz atrast piemērotu pasūtījuma mēbeļu risinājumu un pieteikt pasūtījumu vai sarunu. Galvenais biznesa virziens ir virtuves. Saglabājam skapjus, garderobes un citas iebūvējamās mēbeles.

Sākotnējais tirgus ir visa Latvija. Angļu versija paredzēta arī nākotnes eksporta vajadzībām; konkrēti ārvalstu tirgi šobrīd nav noteikti. Esošās krievu versijas turpmākā loma jānoskaidro pirms migrācijas.

## Norunātais virziens

- Saglabājam veco logo un atpazīstamu zīmolu.
- 30.10. precizētais dizains: gaišs, vēsi bēšs pamats, tumši pelēks teksts un sarkani akcenti. Mēreni noapaļojumi, izteiksmīgāka tipogrāfija un pilna platuma hero foto ar maigu attālināšanās efektu. Izvairāmies no izteikti apaļām formām un pārāk silta bēšā. Iepriekšējais pelēkzaļais virziens noraidīts.
- [Leadframe paraugs](https://leadframe.dev/web/laurasmebeles/) kalpo sadaļu, stila un kopējās sajūtas izvērtēšanai. Nekopējam to 1:1.
- Reāli projektu foto ir būtiska satura daļa. Galerijas papildinām ar risinājumu aprakstiem un pieteikšanās iespējām.
- Skaidri CTA, kontaktforma un sarunas pieteikšana.
- Cenu kalkulators dažādām mēbeļu kategorijām ir izvēlētais tālāk izstrādājamais virziens. Formulas un cenas vēl nav apstiprinātas.
- Reālu projektu cenu piemēri paliek eksperimenta iespēja. Sarunā minētie 6000 EUR nav klienta apstiprināta projekta cena.
- Esošās atsauksmes saglabājam; vajadzīga arī Google atsauksmju atspoguļošana ar pārbaudāmu avotu.
- Analytics un notikumu plāns jāparedz izstrādes sākumā. Jāatšķir CTA klikšķis, formas sākšana un veiksmīgi saņemts pieteikums.
- Search Console izmantojam klienta domēnam; pirms palaišanas jāiegūst sākuma dati un jāpārbauda piekļuves.
- Lietotāja kopumā piekritusi izpētē ieteiktajai lapu struktūrai. Precīzi teksti, sadaļas un jaunās adreses vēl ir darba priekšlikumi.

## Tehniskais un nodošanas virziens

Kods GitHub, hostings Vercel Pro, kontaktformas e-pasti Resend. Sarunā apspriests Vercel budžets no 20 USD mēnesī un Resend bezmaksas sākuma plāns; cenas un limiti jāpārbauda kontu izveides brīdī. Cloudflare Turnstile ir apspriestais formas botu aizsardzības risinājums.

Konti un apmaksa gala rezultātā pieder klientam. Kodam paredzēta nodošana klientam. Domēns jau pieder klientam; pārslēgšana uz jauno hostingu ir atsevišķs palaišanas solis pēc pārbaudēm. Jāsaglabā e-pastam nepieciešamie DNS ieraksti.

Šobrīd izveidots lokāls sākumlapas prototips ar HTML/CSS/JavaScript un vienkāršu Node serveri. Nav izveidots GitHub attālais repozitorijs, hostings, e-pastu sūtīšana, ārējais analytics vai botu aizsardzība. Notikumu struktūru pārbaudām lokāli bez kontaktinformācijas. Gala koda ietvars vēl nav izvēlēts.

## Atvērtie jautājumi

| Jautājums | Kas jānoskaidro |
|---|---|
| Satura uzturēšana | Pēc 30.10. piezīmēm uztur izstrādātāja; klienta administrēšanas panelis nav pirmā uzmetuma prasība. |
| Cenas | Kalkulatora produktu grupas, formula, PVN, tehnika, piegāde, montāža, atjaunošanas atbildīgais. |
| Pieteikumi | Uzņēmuma e-pasts, vienkārša vispārīga forma. Vietnē failu augšupielāde nav plānota; jāprecizē saņēmējs, atbildes process un datu glabāšana. |
| Atsauksmes | Google profila saite, integrācijas metode un nosacījumi. |
| Materiāli | Logo oriģināls, atļautie foto, projektu apraksti un foto publicēšanas tiesības. |
| Solījumi | Apstiprināti izgatavošanas termiņi, garantija, uzmērīšana un izbraukumu nosacījumi. |
| Valodas | Angļu versijas apjoms un esošā krievu satura saglabāšana. |
| Migrācija | Domēna/DNS un esošā hostinga piekļuve, URL inventārs, rezerves kopija un pāradresācijas. |
| Mērīšana | GA4/GTM/GSC īpašumtiesības, piekrišanas risinājums un pieteikumu kvalitātes uzskaite. |

## 30.10. papildinājumi

Piezīmju avots: dizaina-un-projektu-piezimes-2026-10-30.md. Dokumentā skaidri atšķirti lēmumi, vizuālie kandidāti un darba priekšlikumi. Lapa uzrunā dažādus budžetus. Galvenās CTA darba variants: “Saņemt cenas piedāvājumu”. Projektu skatīšanās nav obligāts solis pirms formas.

Demonstrācijas kalkulatoram piezīmēs paredzētas skaidri marķētas testa cenas; tās nav Lauras mēbeļu cenrādis. Šāds demo vēl nav realizēts — pašreizējais konfigurators tikai apkopo parametrus. Google/Facebook atsauksmes, partneri un darbu valstis vēl jāpārbauda; tās nedrīkst izgudrot no atsauces dizaina.

Saņemts WordPress XML. Inventārs: migration/wordpress-inventory.md. Lietotāja norāda, ka visi attēli jau lejupielādēti, taču pilna attēlu mape šim projektam vēl nav piesaistīta. Jaunie Facebook hero kandidāti un komandas foto vēl nav iegūti.

## Izpētes izmantošana

Izpēte atrodas `research/`. 516 unikālas idejas, 70 atlasītās frāzes. Apjomi ir intervāli. Reklāmu konkurence nav SEO grūtība. AI jautājumu apjomi nav mērīti. GEO saturu balstām reālā pieredzē, precīzos uzņēmuma datos un atbildēs uz pircēju jautājumiem.
