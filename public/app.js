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
  menuButton.setAttribute('aria-label','Atvērt izvēlni');
}
menuButton.addEventListener('click', () => {
  const open = $('#navigation').classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Aizvērt izvēlni' : 'Atvērt izvēlni');
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
  $$('.project').forEach(project => { project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter); });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.project:not([hidden])').forEach(project => project.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'}));
  const count = $$('.project:not([hidden])').length;
  $('#gallery-count').textContent = `Atlasīti projekti: ${count}`;
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
  $('#review-count').textContent=count ? `${count} atsauksmes no esošās mājaslapas.` : 'Šim avotam uzmetumā vēl nav pievienotu atsauksmju.';
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
  const labels = { virtuve:'Virtuve', skapis:'Skapis', citas:'Citas mēbeles' };
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
  $('#name').setCustomValidity($('#name').value.trim() ? '' : 'Lūdzu, norādiet vārdu.');
  if (!$('#lead-form').reportValidity()) return;
  // Never emit generate_lead without a confirmed server-side delivery.
  track('form_preview_complete', { category: $('#furniture').value });
  $('#form-status').textContent = 'Uzmetuma pārbaude pabeigta. Pieteikums nav nosūtīts. Īstajā lapā šeit būs apstiprinājums pēc veiksmīgas nosūtīšanas.';
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
  const start = () => { timer = setInterval(() => show((i + 1) % slides.length), 6500); btn.textContent = 'Pauze'; btn.setAttribute('aria-label', 'Apturēt bilžu maiņu'); };
  const stop = () => { clearInterval(timer); timer = null; btn.textContent = 'Turpināt'; btn.setAttribute('aria-label', 'Turpināt bilžu maiņu'); };
  slides.forEach(s => s.loading = 'eager');
  btn.addEventListener('click', () => timer ? stop() : start());
  reduce ? stop() : start();
})();
