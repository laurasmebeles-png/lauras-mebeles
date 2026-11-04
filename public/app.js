// Valodu palīgs: LV teksts ir atslēga; citās valodās lapa ievieto window.LAURAS_I18N (skat. scripts/generate-pages.mjs)
const T = s => (window.LAURAS_I18N && window.LAURAS_I18N[s]) || s;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Preview-only diagnostics. No external analytics request or personal data.
const allowedEvents = new Set(['cta_click','phone_click','email_click','category_select','gallery_filter','project_view','project_select','configurator_start','configurator_complete','form_start','form_preview_complete','faq_open','review_filter']);
const allowedKeys = new Set(['location','category','project_id','question','source']);
const allowedValues = new Set(['header','hero','price','topbar','contact','footer','gallery','all','virtuve','skapis','prieksnams','vannasistaba','viesistaba','citas','peleka','kompakta','1','2','3','4','5','google','facebook','website', ...(window.LAURAS_PROJECTS || []).map(p => p.id)]);
window.dataLayer = window.dataLayer || [];
function track(event, parameters = {}) {
  if (!allowedEvents.has(event)) return;
  const record = { event, preview: true };
  for (const [key, value] of Object.entries(parameters)) {
    if (allowedKeys.has(key) && allowedValues.has(value)) record[key] = value;
  }
  window.dataLayer.push(record);
  if (window.dataLayer.length > 100) window.dataLayer.shift();
  const item = document.createElement('li');
  item.textContent = `${event} ${JSON.stringify(Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'event')))}`;
  const log = $('#event-log');
  if (log) { log.prepend(item); if (log.children.length > 30) log.lastElementChild.remove(); }
}

const menuButton = $('.menu-toggle');
function closeMenu() {
  $('#navigation').classList.remove('open');
  const services = $('.service-menu');
  if (services) services.open = false;
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label',T('Atvērt izvēlni'));
}
menuButton.addEventListener('click', () => {
  const open = $('#navigation').classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? T('Aizvērt izvēlni') : T('Atvērt izvēlni'));
});
$$('#navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const services = $('.service-menu');
    if (services?.open) { services.open = false; services.querySelector('summary').focus(); }
    if (menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  }
});
$$('[data-event]').forEach(link => link.addEventListener('click', () => track(link.dataset.event, { location: link.dataset.location, category: link.dataset.category })));

function moveToForm(category, context) {
  if (category) $('#furniture').value = category;
  if (context) {
    $('#context-text').textContent = context;
    $('#project-context').hidden = false;
  }
  $('#form-status').textContent = '';
  $('#pieteikums').scrollIntoView({ behavior: 'instant', block: 'start' });
  $('#name').focus({ preventScroll: true });
}
$$('[data-select]').forEach(button => button.addEventListener('click', () => {
  track('category_select', { category: button.dataset.select });
  // Category changes invalidate an earlier project's category-specific context.
  $('#project-context').hidden = true;
  $('#context-text').textContent = '';
  moveToForm(button.dataset.select);
}));
$('#clear-context')?.addEventListener('click', () => { $('#project-context').hidden = true; $('#context-text').textContent = ''; $('#furniture').focus(); });
$('#furniture')?.addEventListener('change', () => { $('#project-context').hidden = true; $('#context-text').textContent = ''; });
const filters = $$('[data-filter]');
function applyProjectFilter(filter, updateUrl = true) {
  if (!filters.some(button => button.dataset.filter === filter)) filter = 'all';
  filters.forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
  $$('.project, .gphoto').forEach(project => { project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter); });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.project:not([hidden]), .gphoto:not([hidden])').forEach(project => project.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'}));
  const count = $$('.project:not([hidden]), .gphoto:not([hidden])').length;
  $('#gallery-count').textContent = T('Foto: {n}').replace('{n}', count);
  if (updateUrl) { const url = new URL(location.href); if (filter === 'all') url.searchParams.delete('kategorija'); else url.searchParams.set('kategorija',filter); history.replaceState(null,'',url); }
}
filters.forEach(button => button.addEventListener('click',()=> { applyProjectFilter(button.dataset.filter); track('gallery_filter',{category:button.dataset.filter}); }));
if (filters.length) applyProjectFilter(new URLSearchParams(location.search).get('kategorija') || 'all',false);


const projects = Object.fromEntries((window.LAURAS_PROJECTS || []).map(project=>[project.id,project]));
let currentProject;
let photoIndex = 0;
function showProjectPhoto() {
  const project = projects[currentProject];
  $('#dialog-image').src = `/images/${project.photos[photoIndex]}`;
  $('#dialog-image').alt = `${project.title}, foto ${photoIndex + 1}`;
  const label = project.labels?.[photoIndex]; $('#photo-count').textContent = `${label ? label + ' · ' : ''}${photoIndex + 1} / ${project.photos.length}`;
  $('#photo-prev').hidden = project.photos.length < 2;
  $('#photo-next').hidden = project.photos.length < 2;
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  currentProject = button.dataset.project;
  const project = projects[currentProject];
  if (!project) return;
  photoIndex = Number(button.dataset.photo || 0);
  $('#dialog-title').textContent = project.title;
  $('#dialog-description').textContent = project.description;
  showProjectPhoto();
  $('#project-dialog').showModal();
  track('project_view', { project_id: currentProject });
}));
function changePhoto(direction) { const length=projects[currentProject]?.photos.length; if (!length) return; photoIndex=(photoIndex+direction+length)%length; showProjectPhoto(); }
$('#photo-prev')?.addEventListener('click',()=>changePhoto(-1));
$('#photo-next')?.addEventListener('click',()=>changePhoto(1));
$('#project-dialog')?.addEventListener('keydown',event=> { if (event.key==='ArrowRight') {event.preventDefault();changePhoto(1);} if (event.key==='ArrowLeft') {event.preventDefault();changePhoto(-1);} });
$('.dialog-close')?.addEventListener('click', () => $('#project-dialog').close());
$('#project-dialog')?.addEventListener('click', event => { if (event.target === $('#project-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
$$('[data-review-filter]').forEach(button=>button.addEventListener('click',()=>{
  const source=button.dataset.reviewFilter;
  $$('[data-review-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
  $$('.review-card').forEach(card=>{card.hidden=source!=='all' && card.dataset.reviewSource!==source;});
  const count=$$('.review-card:not([hidden])').length;
  $('#review-count').textContent=count ? T('{n} atsauksmes no esošās mājaslapas.').replace('{n}', count) : T('Šim avotam uzmetumā vēl nav pievienotu atsauksmju.');
  $('#review-empty').hidden=count>0;
  $('#review-empty-title').textContent=source==='google'?'Google atsauksmes':source==='facebook'?'Facebook atsauksmes':'';
  track('review_filter',{source});
}));


let configuratorStarted = false;
$('#configurator')?.addEventListener('input', () => {
  $('#width-output').value = `${Number($('#width').value).toLocaleString('lv-LV', { minimumFractionDigits: 1 })} m`;
  if (!configuratorStarted) { track('configurator_start'); configuratorStarted = true; }
});
$('#configurator')?.addEventListener('submit', event => {
  event.preventDefault();
  const product = $('#configurator input[name=product]:checked').value;
  const labels = { virtuve:T('Virtuve'), skapis:T('Skapis'), citas:T('Citas mēbeles') };
  const priority = $('#priority').selectedOptions[0].textContent;
  const summary = `${labels[product]} · aptuvenais garums ${$('#width-output').value}. ${priority}.`;
  track('configurator_complete', { category: product });
  moveToForm(product, summary);
});

$$('input[name=contactMethod]').forEach(radio => radio.addEventListener('change', () => {
  const phone = radio.value === 'phone';
  $('#email-field').hidden = phone;
  $('#phone-field').hidden = !phone;
  $('#email').required = !phone;
  $('#email').disabled = phone;
  $('#phone').required = phone;
  $('#phone').disabled = !phone;
}));
let formStarted = false;
$('#lead-form')?.addEventListener('input', () => {
  $('#form-status').textContent = '';
  if (!formStarted) { track('form_start'); formStarted = true; }
});
$('#lead-form')?.addEventListener('submit', event => {
  event.preventDefault();
  $('#name').setCustomValidity($('#name').value.trim() ? '' : T('Lūdzu, norādiet vārdu.'));
  if (!$('#lead-form').reportValidity()) return;
  // Never emit generate_lead without a confirmed server-side delivery.
  track('form_preview_complete', { category: $('#furniture').value });
  $('#form-status').textContent = T('Uzmetuma pārbaude pabeigta. Pieteikums nav nosūtīts. Īstajā lapā šeit būs apstiprinājums pēc veiksmīgas nosūtīšanas.');
  $('#form-status').focus();
});
$('#name')?.addEventListener('input', () => $('#name').setCustomValidity(''));
$$('.faq-list details').forEach((details, index) => details.addEventListener('toggle', () => { if (details.open) track('faq_open', { question: String(index + 1) }); }));

// Start the one-time photo reveal once the actual image is ready, including a cached load.
const heroPhoto = $('.hero-image > img');
function revealHero() { heroPhoto.classList.add('is-ready'); }
if (heroPhoto?.complete && heroPhoto.naturalWidth) revealHero();
else heroPhoto?.addEventListener('load', revealHero, { once: true });

// "Par mums": aktīvais vērtību punkts maina bildi (redzams platā ekrānā; mobilajā katram punktam sava bilde).
const valueItems = $$('.value');
if (valueItems.length && 'IntersectionObserver' in window) {
  const frames = $$('.values-frame [data-value]');
  const setActiveValue = n => {
    valueItems.forEach(v => v.classList.toggle('active', v.dataset.value === n));
    frames.forEach(f => f.classList.toggle('active', f.dataset.value === n));
  };
  const valueObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveValue(e.target.dataset.value); }), { rootMargin: '-45% 0px -45% 0px' });
  valueItems.forEach(v => valueObserver.observe(v));
}

(() => {
  const hero = document.querySelector('[data-hero]'); if (!hero) return;
  const slides = [...hero.querySelectorAll('.nk-hero-slides img')]; const btn = hero.querySelector('[data-hero-pause]');
  if (slides.length < 2) { btn?.remove(); return; }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0, timer = null;
  const show = n => { slides[i].classList.remove('is-active'); i = n; slides[i].classList.add('is-active'); };
  const start = () => { timer = setInterval(() => show((i + 1) % slides.length), 6500); btn.textContent = T('Pauze'); btn.setAttribute('aria-label', T('Apturēt bilžu maiņu')); };
  const stop = () => { clearInterval(timer); timer = null; btn.textContent = T('Turpināt'); btn.setAttribute('aria-label', T('Turpināt bilžu maiņu')); };
  slides.forEach(s => s.loading = 'eager');
  btn.addEventListener('click', () => timer ? stop() : start());
  reduce ? stop() : start();
})();

// Pirms/Pēc salīdzinājums: josla velkama, datorā seko kursoram
document.querySelectorAll('[data-ba]').forEach(frame => {
  const range = frame.querySelector('.ba-range');
  const set = value => frame.style.setProperty('--pos', value + '%');
  range.addEventListener('input', () => set(range.value));
  frame.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const box = frame.getBoundingClientRect();
    const value = Math.max(0, Math.min(100, ((event.clientX - box.left) / box.width) * 100));
    range.value = value; set(value);
  });
});

// Galerijas foto skats (lightbox)
(() => {
  const box = document.getElementById('lightbox'); if (!box) return;
  const img = document.getElementById('lb-img'), count = document.getElementById('lb-count');
  let list = [], idx = 0;
  const show = () => { const el = list[idx]; img.src = el.currentSrc || el.src; img.alt = el.alt; count.textContent = `${idx + 1} / ${list.length}`; };
  const step = d => { idx = (idx + d + list.length) % list.length; show(); };
  document.querySelectorAll('.gphoto-open').forEach(btn => btn.addEventListener('click', () => {
    list = [...document.querySelectorAll('.gphoto:not([hidden]) img')];
    idx = list.indexOf(btn.querySelector('img')); if (idx < 0) idx = 0;
    show(); box.showModal();
  }));
  box.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); step(-1); });
  box.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); step(1); });
  box.querySelector('.lb-close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box || e.target === img) box.close(); });
  box.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
  let x0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); x0 = null; });
})();

// Atsauksmju "Lasīt vairāk": teksts turpinās tajā pašā rindkopā
document.querySelectorAll('.rm-btn').forEach(btn => btn.addEventListener('click', () => {
  const p = btn.closest('.rm'); const tail = p.querySelector('.rm-tail'); const dots = p.querySelector('.rm-dots');
  const open = tail.hidden; tail.hidden = !open; dots.hidden = open;
  btn.textContent = open ? T('Rādīt mazāk') : T('Lasīt vairāk'); btn.setAttribute('aria-expanded', String(open));
}));

// Cenu kalkulators (aprēķina likmes ir src/calc-config.json)
(() => {
  const form = document.getElementById('calc'); if (!form) return;
  const cfg = JSON.parse(document.getElementById('calc-config').textContent);
  const fieldsBox = document.getElementById('calc-fields'), resultBox = document.getElementById('calc-result');
  const fmt = n => (Math.round(n / 100) * 100).toLocaleString('lv-LV').replace(/ /g, ' ');
  const num = v => Number(v).toLocaleString('lv-LV', { maximumFractionDigits: 1 });
  let started = false, last = null;
  const type = () => form.elements.ctype.value;
  function build() {
    const t = cfg.types[type()]; fieldsBox.innerHTML = '';
    if (t.individual) { compute(); return; }
    let html = '';
    if (t.size.kind === 'range') {
      html += `<div class="calc-field"><label for="c-size">${t.size.label} <output id="c-out">${num(t.size.default)} ${t.size.unit}</output></label><input id="c-size" type="range" min="${t.size.min}" max="${t.size.max}" step="${t.size.step}" value="${t.size.default}"><div class="range-labels"><span>${t.size.min} ${t.size.unit}</span><span>${t.size.max} ${t.size.unit}</span></div>${t.size.note ? `<p class="calc-hint">${t.size.note}</p>` : ''}</div>`;
    } else {
      html += `<fieldset class="calc-field"><legend>${t.size.label}</legend><div class="calc-opts">${t.size.options.map((o, i) => `<label><input type="radio" name="c-size" value="${i}"${o.default ? ' checked' : ''}><span>${o.label}</span></label>`).join('')}</div></fieldset>`;
    }
    t.fields.forEach((f, n) => {
      html += `<fieldset class="calc-field"><legend>${n + 2}. ${f.label}</legend>${f.hint ? `<small class="calc-hint">${f.hint}</small>` : ''}<div class="calc-opts">${f.options.map((o, i) => `<label><input type="radio" name="f-${f.id}" value="${i}"${o.default ? ' checked' : ''}><span>${o.label}</span></label>`).join('')}</div></fieldset>`;
    });
    fieldsBox.innerHTML = html; compute();
  }
  function compute() {
    const key = type(), t = cfg.types[key];
    if (t.individual) {
      resultBox.innerHTML = `<span>${T('Cena')}</span><strong>${T('Individuāls piedāvājums')}</strong><p>${T('Nestandarta mēbelēm cenu aprēķinām pēc projekta. Atsūtiet ieceri, un atbildēsim.')}</p>`;
      last = { key, summary: t.label + '. ' + T('Nestandarta risinājums.') }; return;
    }
    let units = 1, base, sizeText;
    if (t.size.kind === 'range') {
      units = Number(document.getElementById('c-size').value); base = units * t.rate; sizeText = `${num(units)} ${t.size.unit}`;
      document.getElementById('c-out').textContent = sizeText;
    } else {
      const o = t.size.options[Number(form.elements['c-size'].value)]; base = o.base; sizeText = o.label;
    }
    let price = base, lo = base, hi = base; const parts = [sizeText];
    t.fields.forEach(f => {
      const o = f.options[Number(form.elements['f-' + f.id].value)];
      const cost = x => (x.add || 0) + (x.addPerUnit || 0) * units;
      const mult = x => x.mult || 1;
      if (o.unknown) {
        const others = f.options.filter(x => !x.unknown);
        const costs = others.map(x => cost(x) + (mult(x) - 1) * base);
        lo += Math.min(...costs); hi += Math.max(...costs); price += (Math.min(...costs) + Math.max(...costs)) / 2;
      } else { const d = cost(o) + (mult(o) - 1) * base; price += d; lo += d; hi += d; }
      parts.push(`${f.label.split(' (')[0].toLowerCase()}: ${o.label.toLowerCase()}`);
    });
    const low = Math.max(0, Math.min(lo, price * (1 - t.lo))), high = Math.max(hi, price * (1 + t.hi));
    resultBox.innerHTML = `<span>${T('Orientējošā cena')}</span><strong>${fmt(low)} – ${fmt(high)} €</strong><p>${cfg.includes}</p>${cfg.testMode ? `<p class="calc-test-inline">${T('Testa skaitļi')}</p>` : ''}`;
    last = { key, summary: `${t.label}. ${parts.join('; ')}. ${T('Orientējošā cena')} ${fmt(low)} – ${fmt(high)} € (${cfg.testMode ? T('testa režīms') + ', ' : ''}${T('bez piegādes un montāžas')}).` };
  }
  form.addEventListener('change', e => { if (!started) { track('configurator_start'); started = true; } if (e.target.name === 'ctype') build(); else compute(); });
  form.addEventListener('input', e => { if (e.target.id === 'c-size') compute(); });
  form.addEventListener('submit', e => { e.preventDefault(); compute(); track('configurator_complete', { category: last.key }); moveToForm(last.key, last.summary); });
  build();
})();
