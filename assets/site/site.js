const projects = window.portfolioProjects;
const asset = path => (window.portfolioMedia || {})[path] || path;
const pimg = (folder, names) => names.map(name => `assets/images/projects/${folder}/${name}`);

// Current overrides on top of the authored records in project-data.js.
Object.assign(projects['analisis-aja'], {
  title: 'AntiDeadline.ai',
  role: 'AI application · designed and built end-to-end',
  description: '<p>A workspace for analyzing problems, summarizing documents, and drafting reports. Formerly Analisis.Aja.</p><ul><li>Analysis with 5 Why, Fishbone, and RCA methods.</li><li>Structured summaries with key points and source references.</li><li>Built with Next.js, TypeScript, and LLM APIs, with auth, history, and credits.</li></ul>',
  images: pimg('antideadline-ai', ['01-landing.png', '03-dashboard.png', '04-analysis-input.png', '05-analysis-category.png', '06-analysis-methods.png', '07-summary-result.png'])
});
Object.assign(projects['n-hexane-hazard-zone'], {
  role: 'Final-year thesis · process safety & ML',
  description: '<p>Machine-learning surrogate models that estimate n-Hexane tank-overfill hazard zones in seconds instead of running ALOHA for every scenario.</p><ul><li>Full-factorial simulation dataset across six weather and spill parameters.</li><li>Compared regression, random forest, and neural networks for LEL-based zone radii.</li><li>Shipped as a Flask + Leaflet web app with map view, batch input, and export.</li></ul>'
});
projects['energy-transition-indonesia'].role = 'First author · SUSTINERE, 2026';
projects['energy-transition-indonesia'].link = { href: 'https://doi.org/10.22515/8h4rm359', label: 'Read the published article ↗' };
projects['heart-vs-slim'].images = pimg('heart-vs-slim', ['2.png', '3.png', '4.png', '1.jpg']);
projects['mwt-rekap-bot'].images = pimg('mwt-rekap-bot', ['telegram-report.png', 'flowchart.jpg', 'telegram-report-2.png', 'sheet-rekap.png', 'sheet-rekap-2.png']);
projects['autonomous-trash-bin'].images = pimg('autonomous-trash-bin', ['1.jpg', '2.jpg', 'video.mp4']);
projects['finflow-ai'] = {
  title: 'FinFlow AI',
  role: 'Personal project',
  description: '<p>A personal finance dashboard with budgets, transaction search, and an automation hub. Screenshots use demo data.</p>',
  images: pimg('finflow-ai', ['01-dashboard-demo.png', '02-automation-hub.png', '03-budgets-demo.png', '05-transactions-demo.png'])
};

const featured = {
  'n-hexane-hazard-zone': ['Thesis · Process safety + ML', 'Predicting hazard zones from tank-overfill scenarios, served as an interactive map app.'],
  'analisis-aja': ['AI product', 'Root-cause analysis, summaries, and document drafts in one tool.'],
  'mwt-rekap-bot': ['Client project · Pertamina', 'Telegram bot that turns field inspection reports into a Google Sheet.'],
  'energy-transition-indonesia': ['Published research', "Can Indonesia hit its renewable targets? Forecasting + Monte Carlo."],
  'heart-vs-slim': ['Published research', 'Two human-reliability methods compared on the Boeing 737 MAX case.']
};
const more = {
  'prompt-aja': 'AI image & video SaaS',
  'cnc-failure-identification': 'ML for machine failure',
  'excel-engineering-templates': 'Explosion & fire calculators',
  'perovskite-halide': 'Fluorescent taggant study',
  'hero-helmets': 'Bio-composite safety helmet',
  'hvac-design': 'HVAC design & LCA',
  'autonomous-trash-bin': 'Line-following robot',
  'electric-oven': 'Low-cost oven prototype',
  'finflow-ai': 'Personal finance app'
};
const cover = p => asset(p.images.find(x => !x.endsWith('.mp4')));
const shortTitle = t => t.split(' · ')[0].split(': ')[0];

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

Object.entries(featured).forEach(([id, [tag, sum]]) => {
  const p = projects[id];
  const b = el('button', 'card'); b.dataset.project = id;
  const img = el('img'); img.src = cover(p); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
  const body = el('div', 'card-body');
  body.append(el('p', 'tag', tag), el('h3', '', shortTitle(p.title)), el('p', 'sum', sum));
  b.append(img, body);
  document.querySelector('#featured').append(b);
});
Object.entries(more).forEach(([id, sub]) => {
  const p = projects[id];
  const b = el('button', 'mini'); b.dataset.project = id;
  const img = el('img'); img.src = cover(p); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
  const txt = el('div'); txt.append(el('strong', '', shortTitle(p.title)), el('span', '', sub));
  b.append(img, txt);
  document.querySelector('#more').append(b);
});

// Modal: native <dialog> handles focus trapping and Escape.
const dialog = document.querySelector('#modal');
const stage = dialog.querySelector('.stage');
const stageNav = dialog.querySelector('.stage-nav');
let active, index = 0, opener;

function showMedia() {
  const path = active.images[index], isVideo = path.endsWith('.mp4');
  const media = el(isVideo ? 'video' : 'img');
  media.src = asset(path);
  if (isVideo) { media.controls = true; media.playsInline = true; media.preload = 'metadata'; }
  else media.alt = `${active.title}, image ${index + 1}`;
  stage.replaceChildren(media);
  stageNav.hidden = active.images.length < 2;
  dialog.querySelector('#count').textContent = `${index + 1} / ${active.images.length}`;
}
function open(record, trigger) {
  active = record; index = 0; opener = trigger;
  dialog.querySelector('#modal-title').textContent = record.title;
  dialog.querySelector('#modal-role').textContent = record.role || '';
  // Local, authored HTML only.
  dialog.querySelector('#modal-body').innerHTML = record.description || '';
  const link = dialog.querySelector('#modal-link'); link.replaceChildren();
  if (record.link) {
    const a = el('a', '', record.link.label); a.href = record.link.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    link.append(a);
  }
  showMedia();
  dialog.showModal();
  dialog.scrollTop = 0;
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-project]');
  if (t && projects[t.dataset.project]) return open(projects[t.dataset.project], t);
  const c = e.target.closest('[data-cert]');
  if (c) open({ title: c.querySelector('strong').textContent, images: [c.dataset.cert] }, c);
});
dialog.querySelector('#prev').onclick = () => { index = (index - 1 + active.images.length) % active.images.length; showMedia(); };
dialog.querySelector('#next').onclick = () => { index = (index + 1) % active.images.length; showMedia(); };
dialog.querySelector('.modal-close').onclick = () => dialog.close();
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { stage.querySelector('video')?.pause(); opener?.focus(); });
document.addEventListener('keydown', e => {
  if (!dialog.open || active.images.length < 2) return;
  if (e.key === 'ArrowRight') dialog.querySelector('#next').click();
  if (e.key === 'ArrowLeft') dialog.querySelector('#prev').click();
});

// Mobile nav
const nav = document.querySelector('#nav-menu'), toggle = document.querySelector('.nav-toggle');
const setNav = state => { nav.classList.toggle('open', state); toggle.setAttribute('aria-expanded', String(state)); };
toggle.onclick = () => setNav(!nav.classList.contains('open'));
nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });

// Highlight the current section in the nav.
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    nav.querySelectorAll('a').forEach(a => a.hash === `#${e.target.id}` ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  }), { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('main > section[id]').forEach(s => spy.observe(s));
}
