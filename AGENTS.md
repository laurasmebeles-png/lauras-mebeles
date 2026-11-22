# Project context

Read README.md, docs/project-brief.md and docs/site-map.md before implementation. Communicate with Signe in Latvian.

This is the replacement site for laurasmebeles.lv. Kitchens are the primary business focus, but wardrobes and other made-to-measure furniture remain first-class categories. Preserve the existing logo and brand recognition. Use red for accents and a calmer modern base; the precise palette is still to be chosen. The Leadframe reference informs layout and atmosphere, not a one-to-one copy.

Current scope is a local 13-page prototype using plain HTML/CSS/JavaScript and a dependency-free Node server (npm run dev). Edit src/home.html, src/catalog.mjs, src/reviews.json and scripts/generate-pages.mjs for content/templates, then npm run generate. public HTML and public/projects.js are generated; do not edit those directly. CSS and app behavior remain in public/styles.css and public/app.js. Read docs/prototype-notes.md for verified behavior and limitations. Latest requirements and proposals are in docs/dizaina-un-projektu-piezimes-2026-10-30.md. Design v2 uses cool light beige, charcoal and red; green was rejected. No client CMS is required initially. WordPress migration evidence is in docs/migration/. Framework, CMS and external integrations are not implemented yet. Do not describe placeholder functionality as working. Keep confirmed decisions separate from proposals.

Use the research in docs/research/. Keyword Planner export numbers 50/500/5000 represent UI ranges, not exact search volumes. Do not sum overlapping variants or present Ads competition as SEO difficulty. No measured ChatGPT/Claude query volumes are available.

Use real client imagery and approved facts. Do not invent real project prices, reviews, review counts, warranties, response times or free consultations. A future calculator demo may use clearly labeled sample rates per the 30 October notes; never present these as the client’s actual prices. The current configurator has no monetary estimate. Keep unresolved content visibly marked in drafts and out of production pages.

Preserve existing URLs where appropriate. Maintain a redirect map for approved changes. Plan analytics, accessible forms, spam protection and server-side validation as part of implementation. Report an event as implemented only once it has been connected and verified.

Keep secrets outside version control. The agreed delivery direction is a client-owned GitHub/Vercel/Resend setup with a handover. Do not change the live domain or publish a replacement as part of local scaffolding.

Copy style (Signe, 01.11.2026): use natural, idiomatic Latvian with concrete meaning. Do not use long dashes in site copy or decorative dash strokes before headings. Rephrase sentences with full stops or commas; page-title separators may use |. Preserve original review source data; display typography may be normalized.

Shared English terminology (22.11.2026): use clear English for readers who may not be native speakers. Keep “custom kitchens”, “custom furniture” and “made-to-measure” as the shared vocabulary. Do not introduce “bespoke” into this EN version, including About us, just to cover a UK keyword. Keep established category terms such as “fitted wardrobes” where they describe the furniture. Research synonym lists are references, not requirements to insert every phrase. Preserve the approved structure, facts and customer review fidelity.

Darbu secība un nākamie soļi: PLAN.md (02.11.2026). Pāradresāciju projekts: docs/migration/redirect-map.md.

Signe's reminder request (22.11.2026): during subsequent project work, consult PLAN.md's multilingual launch checklist and remind her of relevant unfinished dependencies when starting forms, DNS, analytics or launch work. These are contextual reminders in project conversations, not scheduled notifications. The approved EN content is complete; future form, privacy, consent and error-page copy must be localized when those features are implemented. Do not treat the historical proposal to drop RU as current: LV, EN, RU and Norwegian Bokmål are planned.

Russian copy review (22.11.2026): Signe has approved starting RU and explicitly requests subagent support because she understands little Russian. Use independent language/style and facts/Keyword Planner reviews for RU drafts, then explain meaningful choices to her in Latvian. Do not rely on her to proofread Russian grammar. Homepage/kitchen drafts and the review record are in content/ru/. Draft preparation does not enable RU preview routes.

RU preview approval (22.11.2026): Signe approved enabling the homepage and kitchen page. /ru/ and /ru/virtuves/ now use the reviewed copy, shared UI and separate full review translations. Other RU pages remain unavailable and links to their LV versions are labeled. Keep the original approved contact invitation: “Для начала достаточно идеи. Расскажите нам о ней, и мы вместе продумаем, как её воплотить.” Signe rejected the more conversational “что вы задумали” variant.
