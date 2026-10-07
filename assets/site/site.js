const projects = window.portfolioProjects;
const asset = path => (window.portfolioMedia || {})[path] || path;
const pimg = (folder, names) => names.map(name => `assets/images/projects/${folder}/${name}`);

// Current overrides on top of the authored records in project-data.js, aligned with the CV.
Object.assign(projects['analisis-aja'], {
  title: 'AntiDeadline.ai',
  role: 'HSSE root cause analysis platform · closed beta · 2025 – present',
  description: '<p>Turns HSSE and K3 documents into root cause analysis reports (5 Why, Fishbone, full RCA) that separate verified facts from assumptions, as drafts for authorised personnel to validate.</p><ul><li>Also summarizes documents and helps draft reports.</li><li>Built with Next.js, TypeScript, and LLM APIs, with auth, history, and credits.</li></ul>',
  images: pimg('antideadline-ai', ['01-landing.png', '03-dashboard.png', '04-analysis-input.png', '05-analysis-category.png', '06-analysis-methods.png', '07-summary-result.png'])
});
Object.assign(projects['n-hexane-hazard-zone'], {
  title: 'Hazard Zone Prediction for Fuel Vapour Dispersion',
  role: 'Undergraduate thesis · 2025 – 2026',
  description: '<p>ALOHA has to be run scenario by scenario, which is too slow in an emergency. This thesis turns those simulations into instant hazard-zone estimates for n-Hexane tank overfill.</p><ul><li>1,215 ALOHA scenarios from a full-factorial design across six atmospheric and operational variables.</li><li>Surrogate models predict Red, Orange, and Yellow zone radii at once. Red Zone error fell to 1.82 m vs 22.25 m for the linear baseline, a twelvefold improvement on 243 test scenarios.</li><li>A robustness study maps where the model stops being valid: inputs outside the training space must be re-verified in ALOHA before informing any evacuation decision.</li><li>Delivered as a Flask + Leaflet web app with map view, batch input, and export.</li></ul><p>Supervisors: Adhitya Ryan Ramadhani, S.T., M.Sc., Ph.D. and Waskito Pranowo, M.T. Preprint: <a href="https://doi.org/10.2139/ssrn.7455051" target="_blank" rel="noopener noreferrer">SSRN, under review ↗</a></p>'
});
Object.assign(projects['hero-helmets'], {
  title: 'HERO Helmets: Bio-Composite Safety Helmet for Mining',
  role: 'Team leader · funded by Kemdikbudristek (PKM-KC) · 2025',
  description: '<p>Safety helmet prototype for the mining industry, made from water hyacinth fibre bio-composite treated with NaOH.</p><ul><li>Led the team from funding proposal through design, fabrication, and testing.</li><li>Tensile and impact tests across fibre volume fractions of 0, 5, and 10 percent.</li><li>The revised treatment lifted the 5 percent specimen by 76.13 percent to 21.03 MPa, still below the 31.93 MPa unreinforced resin baseline, so the material was reported as promising rather than proven.</li></ul>'
});
Object.assign(projects['autonomous-trash-bin'], {
  title: 'Autonomous Trash Bin',
  role: 'Project manager, three-person team · Mechanical Engineering capstone · Mar – Jul 2025',
  description: '<p>Line-follower waste collection robot.</p><ul><li>Owned coordination, schedule, and the frame and structure design. Structural analysis of the aluminium frame gave a maximum design load of 173.1 kg at a peak bending moment of 46.3 Nm.</li><li>Safety by design: the drive is interlocked on two independent measurements, ultrasonic fill height and load-cell weight, which must both agree before it moves, so one failed sensor cannot start it.</li><li>Halts on an obstructed path until the path clears.</li></ul>',
  images: pimg('autonomous-trash-bin', ['1.jpg', '2.jpg', 'video.mp4'])
});
Object.assign(projects['mwt-rekap-bot'], {
  title: 'MWT Inspection Reporting Bot',
  role: 'AI field safety walkthrough reporting · MVP · 2025',
  description: '<p>AI bot designed for Management Walkthrough (MWT) reporting in Pertamina field operations. Findings sent as free text, photos, or voice notes become a structured follow-up record.</p><ul><li>Extracts inspector, finding, recommendation, PIC, target date, and status.</li><li>Asks up to three clarifying questions when information is missing.</li><li>Archives photo evidence to Drive, removing manual transcription.</li></ul>',
  images: pimg('mwt-rekap-bot', ['telegram-report.png', 'flowchart.jpg', 'telegram-report-2.png', 'sheet-rekap.png', 'sheet-rekap-2.png'])
});
projects['energy-transition-indonesia'].role = 'First author · Sustinere 10(2), 160–175, 2026 · Scopus, SINTA 2';
projects['energy-transition-indonesia'].link = { href: 'https://doi.org/10.22515/8h4rm359', label: 'Read the published article ↗' };
projects['heart-vs-slim'].role = 'First author · Motivection 7(1), 61–74, 2025';
projects['heart-vs-slim'].images = pimg('heart-vs-slim', ['2.png', '3.png', '4.png', '1.jpg']);
projects['perovskite-halide'].role = 'Co-author · Universitas Pertamina Press, 2026';
projects['finflow-ai'] = {
  title: 'FinFlow AI',
  role: 'Personal project',
  description: '<p>A personal finance dashboard with budgets, transaction search, and an automation hub. Screenshots use demo data.</p>',
  images: pimg('finflow-ai', ['01-dashboard-demo.png', '02-automation-hub.png', '03-budgets-demo.png', '05-transactions-demo.png'])
};

const featured = {
  'n-hexane-hazard-zone': ['Thesis · 2025 – 2026', 'Turning slow ALOHA simulations into instant hazard-zone estimates for emergency response, with clear limits on where the model is valid.'],
  'hero-helmets': ['Team leader · PKM-KC funded', 'Water hyacinth bio-composite safety helmet for mining, from proposal to tensile and impact testing.'],
  'autonomous-trash-bin': ['Capstone · Project manager', 'Waste collection robot whose drive is interlocked on two independent sensors.'],
  'mwt-rekap-bot': ['AI tool · MVP', 'Turns field safety walkthrough findings from text, photos, or voice into structured records.'],
  'analisis-aja': ['HSSE platform · Closed beta', 'Root cause analysis reports (5 Why, Fishbone, RCA) from HSSE documents.']
};
const more = {
  'energy-transition-indonesia': 'Published research · Sustinere',
  'heart-vs-slim': 'Published research · Motivection',
  'perovskite-halide': 'Feasibility study · co-author',
  'cnc-failure-identification': 'ML for machine failure',
  'excel-engineering-templates': 'Explosion & fire calculators',
  'hvac-design': 'HVAC design & LCA',
  'electric-oven': 'Low-cost oven prototype',
  'prompt-aja': 'AI image & video SaaS',
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
