from pathlib import Path
import re, html

root = Path(__file__).resolve().parents[2]
out = root / 'concepts/artificer-workshop'
legacy = root / 'tmp/portfolio-audit/legacy-index.html'
source = (legacy if legacy.exists() else root / 'index.html').read_text(encoding='utf-8')

def section(name):
    block = re.search(r'<section\b[^>]*id="' + name + r'".*?</section>', source, re.S).group()
    block = re.sub(r'<span class="sec-index.*?</span>', '', block, flags=re.S)
    block = block.replace('src="assets/', 'src="../../assets/').replace('href="assets/', 'href="../../assets/')
    block = html.unescape(block).replace(' — ', ' · ').replace('&mdash;', ' · ').replace('—', '-').replace('–', '-')
    block = re.sub(r'(\d{4}) · (\d{4}|present)', r'\1-\2', block).replace('Aug · Sep', 'Aug-Sep')
    block = re.sub(r'(<h3 class="mono">)[A-E] · ', r'\1', block)
    return block

experience, skills, credentials, contact = [section(x) for x in ['experience', 'skills', 'credentials', 'contact']]
experience = experience.replace('Engineering judgment applied in maintenance, laboratories, and classrooms.', 'A journey through workshops, laboratories, classrooms, and communities.')
skills = re.sub(r'Every cluster is tied.*?without evidence\.', 'The tools and methods I use to turn questions into working solutions.', skills, flags=re.S).replace('Analisis.Aja', 'AntiDeadline.ai')
credentials = credentials.replace('scheme, 27 April 2026.', 'scheme. Competency assessment: 27 April 2026; certificate issued: 25 May 2026.')
credentials = credentials.replace('Declared Kompeten', 'Assessed as competent').replace('Surat Pencatatan Ciptaan No.', 'Copyright Registration No.')
contact = contact.replace('Internships, research collaborations, and data-driven engineering projects.', 'Engineering opportunities, research collaborations, and useful things worth building.').replace('Let’s build safer<br>engineering decisions.', 'Every good project<br>starts with a conversation.')
contact = re.sub(r'If you are working on process safety.*?hear about it\.', 'If you are working on process safety, reliability, or engineering data problems, or hiring for them, I would like to hear about it.', contact, flags=re.S)
for name, value in [('experience', experience), ('skills', skills), ('credentials', credentials), ('contact', contact)]:
    ornament = '<div class="chapter-art" aria-hidden="true"><span class="sigil">✧</span><span class="chapter-line"></span></div>'
    value = value.replace('<div class="container">', '<div class="container">' + ornament, 1)
    if name == 'experience':
        value = value.replace('<ol class="xp-list">', '<div class="journey-layout"><aside class="map-window" aria-label="Fantasy map illustration"><div class="map-label">The journey so far</div><span class="compass" aria-hidden="true">✥</span></aside><ol class="xp-list">').replace('</ol>', '</ol></div>', 1)
    if name == 'contact':
        value = value.replace('<div class="contact-block"', '<img class="contact-owl float" src="owl.png" alt="" loading="lazy"><div class="contact-block"', 1)
    locals()[name] = value

header = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><meta name="theme-color" content="#f4eddd">
<title>M. Zaki Ramdhan | The Artificer's Workshop</title>
<meta name="description" content="Mechanical engineering, process safety, research, and AI applications by M. Zaki Ramdhan.">
<link rel="stylesheet" href="fonts/fonts.css"><link rel="stylesheet" href="workshop.css?rev=20260919-motion2"><script src="project-data.js" defer></script><script src="workshop.js?rev=20260919-motion2" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a>
<header class="topbar"><nav class="navbar" aria-label="Primary"><a class="brand" href="#top"><span class="brand-seal" aria-hidden="true">Z</span><span>M. Zaki Ramdhan</span></a><button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu">Menu</button><div id="nav-menu"><a href="#about">Profile</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#credentials">Credentials</a><a href="#contact">Contact</a></div><button id="motion-toggle" aria-pressed="false">Pause motion</button></nav></header>
<main id="main">
<section class="hero" id="top"><img class="hero-scene" src="zaki-workshop.png" alt="Fantasy illustration of Zaki in an inventor's workshop, based on his supplied photograph" fetchpriority="high" width="1536" height="1024"><div class="hero-copy"><p class="eyebrow">An engineer's curiosity. An artificer's spirit.</p><h1>Engineering ideas.<br>Building possibilities.</h1><p>I’m Zaki, a Mechanical Engineering graduate exploring process safety, research, and AI-powered tools.</p><div class="hero-actions"><a class="btn btn-solid" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a class="btn btn-line" href="../../assets/docs/CV_M_Zaki_Ramdhan.pdf" download>Download CV ↓</a></div></div><div class="hero-caption">A little fantasy. A real person behind the work.</div><div class="motes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></section>
<div class="stat-ribbon"><div><strong>3.88<span>/4.00</span></strong><span>GPA · Cum Laude</span></div><div><strong>Mechanical Engineering</strong><span>Universitas Pertamina · Class of 2026</span></div><div><strong>2 publications</strong><span>Human reliability & energy transition</span></div><div><strong>BNSP certified</strong><span>Data Analyst</span></div></div>
<section id="about" class="section profile-section"><div class="container"><div class="chapter-art" aria-hidden="true"><span class="sigil">✧</span><span class="chapter-line"></span></div><header class="section-head"><p class="eyebrow">The person behind the workshop</p><h2>Profile</h2></header><div class="profile-layout"><figure class="portrait-frame"><img src="../../foto%20zaki/ElevenLabs_image_seedream-5-pro_Dark%20ultra-real_2026-08-17T06_30_23.png" alt="Studio portrait of M. Zaki Ramdhan wearing glasses, a black suit, and a black turtleneck" width="896" height="1152" loading="lazy"><figcaption>M. Zaki Ramdhan<br><span>Mechanical Engineering · Research · AI</span></figcaption><span class="wax-seal" aria-hidden="true">Z</span></figure><div class="profile-copy"><h3>Curiosity is where it starts.<br>Useful work is where it leads.</h3><p>I am a Mechanical Engineering graduate from Universitas Pertamina, with a focus on process safety, reliability, and practical data-driven decision support.</p><p>My work connects engineering analysis with software: from machine-learning models for n-Hexane hazard zones to AI applications that help people analyze documents and automate reporting.</p><p>That curiosity has taken me into a drilling-equipment workshop, university laboratories, published research, and independent software projects. I enjoy making complex questions easier to understand, test, and act on.</p><dl class="profile-facts"><div><dt>Based in</dt><dd>Bekasi, West Java, Indonesia</dd></div><div><dt>Focus</dt><dd>Process safety · Reliability · Data & AI</dd></div><div><dt>Beyond work</dt><dd>Fantasy worlds, D&D, and creative experiments</dd></div></dl></div></div>
<div class="education"><h3>Education</h3><div><h4>Universitas Pertamina</h4><p class="meta">2022-2026 · Mechanical Engineering</p><p>Graduated 20 August 2026. GPA 3.88/4.00, Cum Laude. SUN UP Scholarship recipient.</p><p>Coursework: Fluid Mechanics, Thermodynamics, Turbomachinery, Probability & Statistics, K3/HSE, Maintenance Management, Mechanics of Materials, Mechatronics, and Engineering Design.</p></div><div><h4>MAN 1 Yogyakarta</h4><p class="meta">2019-2022 · Boarding School Science Program</p><p>Outstanding Student Distinction, 2022.</p></div></div></div></section>
<section class="section work-section" id="work"><div class="container"><div class="chapter-art" aria-hidden="true"><span class="sigil">✧</span><span class="chapter-line"></span></div><header class="section-head"><p class="eyebrow">From the workshop</p><h2>Selected work</h2><p>Research, engineering, and software brought to life. Open an image to explore the story behind it.</p></header><div class="featured-grid" id="featured"></div><div class="gallery-heading"><h3>More projects & research</h3><p>More things I have designed, built, and investigated.</p></div><div class="filters" aria-label="Filter projects"><button aria-pressed="true" data-filter="all">All projects</button><button aria-pressed="false" data-filter="engineering">Engineering & research</button><button aria-pressed="false" data-filter="ai">AI & software</button></div><div class="gallery-grid" id="gallery"></div></div></section>
<section class="section side-section" id="side"><div class="container"><div class="side-intro"><div><h2>Side projects &<br>creative explorations</h2><p>Built for the joy of figuring things out. A home for my personal tools, interests, and experiments.</p></div><img class="side-owl float" src="owl.png" width="1024" height="1536" alt="A brass owl familiar perched on a book" loading="lazy"></div><div id="side-projects"></div></div></section>
'''
publications = '''<section class="section publications" id="publications"><div class="container"><div class="chapter-art" aria-hidden="true"><span class="sigil">✧</span><span class="chapter-line"></span></div><header class="section-head"><h2>Publications</h2><p>Research shared beyond the workshop.</p></header><div class="publication-grid"><article class="publication"><span class="book-spine" aria-hidden="true">HRA</span><div><p class="meta">Motivection · Published</p><h3>Comparative analysis of HEART and SLIM</h3><p>Human reliability assessment in the Boeing 737 MAX accident case study. Project leader.</p><a href="https://doi.org/10.46574/motivection.v7i1.431" target="_blank" rel="noopener noreferrer">Read the publication ↗</a></div></article><article class="publication"><span class="book-spine" aria-hidden="true">ENERGY</span><div><p class="meta">SUSTINERE · Published 11 September 2026</p><h3>Indonesia's energy transition under uncertainty</h3><p>First-author research combining forecasting, regression, Monte Carlo simulation, and sensitivity analysis.</p><a href="https://sustinerejes.com/index.php/a/article/view/634" target="_blank" rel="noopener noreferrer">Read the publication ↗</a></div></article></div></div></section>'''
footer = '''</main><footer><p>© 2026 M. Zaki Ramdhan</p><a href="#top">Back to the workshop ↑</a></footer>
<dialog id="project-modal" aria-labelledby="modal-title"><div class="modal-bar"><span>Project journal</span><button class="modal-close" autofocus>Close ×</button></div><div class="modal-content"><p id="modal-role" class="meta"></p><h2 id="modal-title"></h2><div class="media-stage"></div><div class="media-controls"><button id="previous" aria-label="Previous image">←</button><span id="media-count" aria-live="polite"></span><button id="next" aria-label="Next image">→</button><a id="full-image" target="_blank" rel="noopener noreferrer">Open full image ↗</a></div><p id="media-caption" class="meta"></p><div id="modal-description"></div><p id="modal-link"></p></div></dialog>
</body></html>'''
(out / 'index.html').write_text(header+experience+skills+publications+credentials+contact+footer, encoding='utf-8')
# ponytail: reuse the existing authored project data; native dialog handles focus trapping.
js = (root/'assets/js/script.js').read_text(encoding='utf-8')
data = js[js.index('    const projects = {'):js.index('    /* ---------- Reveal on scroll')].strip()
data = data.replace('const projects =', 'window.portfolioProjects =',1).replace(' — ', ' · ').replace('—', '-').replace('–','-')
(out/'project-data.js').write_text(data, encoding='utf-8')
print('Built complete English preview; reused experience, skills, credentials, contact, and project details.')
