const projects = window.portfolioProjects;
const asset = path => '../../' + path;
const pimg = (folder, names) => names.map(name => `assets/images/projects/${folder}/${name}`);

// Refresh the existing authored records rather than maintain a second project catalogue.
Object.assign(projects['analisis-aja'], {
  title: 'AntiDeadline.ai', role: 'AI application · Designed and built end-to-end',
  description: '<p>Formerly Analisis.Aja, AntiDeadline.ai brings document analysis, summarization, and drafting into one guided workspace.</p><ul><li>Analyze supports 5 Why, Fishbone, and RCA reports across problem categories.</li><li>Summarize produces structured summaries, key points, terminology, and references to source sections.</li><li>Document Draft helps organize and write documents through a guided workflow.</li><li>Built with Next.js, TypeScript, and AI integrations, with authentication, history, and a credit system.</li></ul><p>AI Coach, Slide Deck, and Plagiarism Check are marked as upcoming features in the current interface.</p>',
  images: pimg('antideadline-ai', ['01-landing.png','03-dashboard.png','04-analysis-input.png','05-analysis-category.png','06-analysis-methods.png','07-summary-result.png']),
  caption: 'Application screenshots. The saved summary example uses my own thesis; generated summaries should be checked against their source.'
});
Object.assign(projects['n-hexane-hazard-zone'], {
  role: 'Final-year thesis · Process safety & machine learning',
  description: '<p>My final-year thesis develops machine-learning surrogate models for rapid estimation of n-Hexane tank-overfill hazard zones using ALOHA simulations.</p><ul><li>Built a full-factorial simulation dataset across six environmental and spill parameters.</li><li>Compared regression and neural-network approaches for red, orange, and yellow LEL-based zone radii.</li><li>Examined model behavior within and beyond the training range.</li><li>Implemented a Flask and Leaflet application with map visualization, batch input, and export workflows.</li></ul><p>The tool supports scenario exploration. Model predictions depend on the simulation assumptions and training domain.</p>',
  caption: 'Original thesis application and research figures. Different experiments use different evaluation sets.'
});
projects['energy-transition-indonesia'].role = 'First author · Published in SUSTINERE, 11 September 2026';
projects['energy-transition-indonesia'].link = {href:'https://sustinerejes.com/index.php/a/article/view/634',label:'Read the published article'};
projects['heart-vs-slim'].images = pimg('heart-vs-slim',['2.png','3.png','4.png','1.jpg']);
projects['mwt-rekap-bot'].images = pimg('mwt-rekap-bot',['flowchart.jpg','telegram-report.png','telegram-report-2.png','sheet-rekap.png','sheet-rekap-2.png']);
projects['autonomous-trash-bin'].images = pimg('autonomous-trash-bin',['1.jpg','2.jpg','video.mp4']);
projects['finflow-ai'] = {
  title:'FinFlow AI', role:'Personal project · Finance & automation',
  description:'<p>A personal exploration of financial tracking, budget dashboards, and automated data entry.</p><ul><li>Dashboard views for income, expenses, transaction categories, and budgets.</li><li>Transaction search and category filtering.</li><li>An Automation Hub for exploring connected workflows.</li></ul><p>These screenshots use synthetic demonstration data. AI services and the Telegram listener were disabled during capture; the screenshots document the interface rather than verify live integrations.</p>',
  images:pimg('finflow-ai',['02-automation-hub.png','03-budgets-demo.png','05-transactions-demo.png','01-dashboard-demo.png']),
  caption:'Demonstration data only. The amounts shown are not personal financial information.'
};
const featured=['n-hexane-hazard-zone','analisis-aja','heart-vs-slim','energy-transition-indonesia','mwt-rekap-bot'];
const gallery=['prompt-aja','cnc-failure-identification','excel-engineering-templates','perovskite-halide','hero-helmets','hvac-design','autonomous-trash-bin','electric-oven'];
const summaries={
  'n-hexane-hazard-zone':'From dispersion simulations to an interactive map: exploring faster estimates of n-Hexane hazard zones.',
  'analisis-aja':'A guided AI workspace for analyzing problems, summarizing source material, and drafting documents.',
  'heart-vs-slim':'Comparing two human reliability methods through the Boeing 737 MAX accident case study.',
  'energy-transition-indonesia':'Forecasting and uncertainty analysis for Indonesia’s renewable-energy targets.',
  'mwt-rekap-bot':'Turning field reports from Telegram into structured Management Walkthrough records.',
  'prompt-aja':'An AI workspace for generating images and videos, with prompt enhancement and generation history.',
  'cnc-failure-identification':'Comparing machine-learning models for predictive maintenance and machine-condition classification.',
  'excel-engineering-templates':'Reusable worksheets for explosion, pool-fire, and source-emission calculations.',
  'perovskite-halide':'A feasibility study of fluorescent taggants for leak detection and pipeline monitoring.',
  'hero-helmets':'A water-hyacinth-fiber biocomposite safety helmet, from material selection to prototype testing.',
  'hvac-design':'Cooling-load analysis, system comparison, and life-cycle carbon assessment.',
  'autonomous-trash-bin':'A line-following waste-management robot integrating sensors, servos, and microcontroller logic.',
  'electric-oven':'A low-cost oven prototype exploring heat transfer, insulation, and thermal retention.',
  'finflow-ai':'A personal finance dashboard and a place to experiment with useful everyday automations.'
};
function card(id){
  const p=projects[id], article=document.createElement('article');article.className='project';
  article.dataset.category=['prompt-aja','cnc-failure-identification'].includes(id)?'ai':'engineering';
  const cover=document.createElement('button');cover.className='cover';cover.dataset.project=id;cover.setAttribute('aria-label',`Open ${p.title}`);
  const img=document.createElement('img');img.src=asset(p.images.find(x=>!x.endsWith('.mp4')));img.alt=p.title;img.loading='lazy';img.decoding='async';cover.append(img);
  const copy=document.createElement('div');copy.className='project-copy';
  const tag=document.createElement('p');tag.className='meta';tag.textContent=p.role;
  const title=document.createElement('h3');title.textContent=p.title;
  const summary=document.createElement('p');summary.textContent=summaries[id];
  const button=document.createElement('button');button.className='details';button.dataset.project=id;button.textContent='Explore project ↗';
  copy.append(tag,title,summary,button);article.append(cover,copy);return article;
}
featured.forEach(id=>document.querySelector('#featured').append(card(id)));
gallery.forEach(id=>document.querySelector('#gallery').append(card(id)));
document.querySelector('#side-projects').append(card('finflow-ai'));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelectorAll('#gallery .project').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);
}));

// Native dialog supplies focus trapping, inert background and Escape behavior.
const dialog=document.querySelector('#project-modal'),stage=document.querySelector('.media-stage');
let active, index=0, opener;
function showMedia(){
  const path=active.images[index],isVideo=path.endsWith('.mp4');
  const media=document.createElement(isVideo?'video':'img');media.src=asset(path);
  if(isVideo){media.controls=true;media.playsInline=true;media.preload='metadata'}else media.alt=`${active.title}, image ${index+1}`;
  media.addEventListener('error',()=>{const message=document.createElement('p');message.textContent='This media could not be loaded. Please try another image.';stage.replaceChildren(message)});
  stage.replaceChildren(media);document.querySelector('#media-count').textContent=`${index+1} / ${active.images.length}`;
  document.querySelector('#full-image').href=asset(path);document.querySelector('#full-image').textContent=isVideo?'Open video ↗':'Open full image ↗';
  document.querySelector('#previous').disabled=document.querySelector('#next').disabled=active.images.length===1;
}
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-project]');if(!trigger)return;
  active=projects[trigger.dataset.project];if(!active)return;
  opener=trigger;index=0;document.querySelector('#modal-title').textContent=active.title;document.querySelector('#modal-role').textContent=active.role;
  // Local, authored HTML only; no user or network content enters this field.
  document.querySelector('#modal-description').innerHTML=active.description;
  document.querySelector('#media-caption').textContent=active.caption||'Original project media and supporting material.';
  const linkWrap=document.querySelector('#modal-link');linkWrap.replaceChildren();
  if(active.link){const a=document.createElement('a');a.href=active.link.href;a.textContent=active.link.label;a.target='_blank';a.rel='noopener noreferrer';linkWrap.append(a)}
  showMedia();dialog.showModal();dialog.scrollTop=0;
});
document.querySelector('#previous').onclick=()=>{index=(index-1+active.images.length)%active.images.length;showMedia()};
document.querySelector('#next').onclick=()=>{index=(index+1)%active.images.length;showMedia()};
document.querySelector('.modal-close').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{stage.querySelector('video')?.pause();opener?.focus()});

const nav=document.querySelector('#nav-menu'),navToggle=document.querySelector('.nav-toggle');
navToggle.onclick=()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open))};
nav.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.focus()}});
const motion=document.querySelector('#motion-toggle'),preference=matchMedia('(prefers-reduced-motion: reduce)');
function setPaused(paused){document.documentElement.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Motion paused':'Pause motion'}
setPaused(preference.matches);motion.onclick=()=>setPaused(!document.documentElement.classList.contains('paused'));preference.addEventListener('change',e=>setPaused(e.matches));

// CSS handles idle movement; this layer only supplies direct pointer feedback.
const motionAllowed=()=>!preference.matches&&!document.documentElement.classList.contains('paused');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
let tiltFrame;
document.addEventListener('pointermove',event=>{
  if(!finePointer.matches||!motionAllowed())return;
  const cover=event.target.closest('.cover');if(!cover)return;
  cancelAnimationFrame(tiltFrame);tiltFrame=requestAnimationFrame(()=>{
    const box=cover.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;
    cover.style.setProperty('--ry',`${x*3.2}deg`);cover.style.setProperty('--rx',`${y*-3.2}deg`);
  });
});
document.addEventListener('pointerout',event=>{
  const cover=event.target.closest('.cover');
  if(cover&&!cover.contains(event.relatedTarget)){cover.style.setProperty('--rx','0deg');cover.style.setProperty('--ry','0deg')}
});
const hero=document.querySelector('.hero'),heroScene=document.querySelector('.hero-scene');
hero.addEventListener('pointermove',event=>{
  if(!finePointer.matches||!motionAllowed())return;
  const box=hero.getBoundingClientRect();
  heroScene.style.setProperty('--scene-x',`${((event.clientX-box.left)/box.width-.5)*-10}px`);
  heroScene.style.setProperty('--scene-y',`${((event.clientY-box.top)/box.height-.5)*-7}px`);
});
hero.addEventListener('pointerleave',()=>{heroScene.style.setProperty('--scene-x','0px');heroScene.style.setProperty('--scene-y','0px')});

const charmSpecs=[
  ['#top','✦','Drag the floating star','charm-star'],
  ['#about','✧','Drag the floating spark','charm-spark'],
  ['#work','⚙︎','Drag the artificer gear','charm-gear'],
  ['#experience','✥','Drag the compass charm','charm-compass'],
  ['#skills','⌁','Drag the arcane flourish','charm-rune']
];
charmSpecs.forEach(([selector,glyph,label,kind])=>{
  const host=document.querySelector(selector);if(!host)return;
  const charm=document.createElement('button');charm.type='button';charm.className=`drag-charm ${kind}`;charm.dataset.dragX='0';charm.dataset.dragY='0';charm.setAttribute('aria-label',`${label}. Use arrow keys to move; press Home to reset.`);
  const inner=document.createElement('span');inner.className='charm-glyph';inner.setAttribute('aria-hidden','true');inner.textContent=glyph;charm.append(inner);host.append(charm);
  const move=(x,y)=>{x=Math.max(-120,Math.min(120,x));y=Math.max(-120,Math.min(120,y));charm.dataset.dragX=x;charm.dataset.dragY=y;charm.style.setProperty('--drag-x',`${x}px`);charm.style.setProperty('--drag-y',`${y}px`)};
  let startX,startY,originX,originY;
  charm.addEventListener('pointerdown',event=>{startX=event.clientX;startY=event.clientY;originX=+charm.dataset.dragX;originY=+charm.dataset.dragY;charm.classList.add('is-dragging');charm.setPointerCapture(event.pointerId)});
  charm.addEventListener('pointermove',event=>{if(!charm.hasPointerCapture(event.pointerId))return;move(originX+event.clientX-startX,originY+event.clientY-startY)});
  charm.addEventListener('pointerup',event=>{charm.classList.remove('is-dragging');charm.releasePointerCapture(event.pointerId)});
  charm.addEventListener('pointercancel',()=>charm.classList.remove('is-dragging'));
  charm.addEventListener('keydown',event=>{const step=event.shiftKey?24:8;if(event.key==='Home'){move(0,0);event.preventDefault();return}const delta={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[event.key];if(delta){move(+charm.dataset.dragX+delta[0],+charm.dataset.dragY+delta[1]);event.preventDefault()}});
});
if('IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');reveal.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.project,.section-head,.portrait-frame,.xp-row,.skill-cluster,.cred-card,.publication').forEach(el=>reveal.observe(el));
  const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('#nav-menu a').forEach(a=>{if(a.hash===`#${e.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('main>section[id]').forEach(el=>spy.observe(el));
}
