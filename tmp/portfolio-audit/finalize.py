"""Build the approved workshop preview into the public site. Requires Pillow and Node."""
from pathlib import Path
from urllib.parse import unquote
import hashlib, json, re, shutil, subprocess
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'concepts/artificer-workshop'
OUT = ROOT / 'assets/workshop'
OUT.mkdir(parents=True, exist_ok=True)
archive = ROOT / 'tmp/portfolio-audit/legacy-index.html'
if not archive.exists():
    shutil.copy2(ROOT / 'index.html', archive)

# Resolve the same authored catalogue and overrides that the browser uses.
catalogue = subprocess.check_output(['node', '-e', "const fs=require('fs'),vm=require('vm');const c=vm.createContext({window:{}});for(const f of ['project-data.js','workshop.js'])vm.runInContext(fs.readFileSync('concepts/artificer-workshop/'+f,'utf8').split('featured.forEach')[0],c);process.stdout.write(JSON.stringify(c.window.portfolioProjects));"], cwd=ROOT, text=True, encoding='utf-8')
projects = json.loads(catalogue)
mapping, sizes = {}, []

def optimize(file):
    file = file.resolve()
    key = file.relative_to(ROOT).as_posix()
    if key in mapping:
        return mapping[key]
    target = OUT / 'media' / (file.stem[:45] + '-' + hashlib.sha256(key.encode()).hexdigest()[:10] + '.webp')
    target.parent.mkdir(exist_ok=True)
    if not target.exists() or target.stat().st_mtime < file.stat().st_mtime:
        with Image.open(file) as img:
            # Keep source dimensions and composition. Only change web encoding.
            img.save(target, 'WEBP', quality=86, method=6)
    mapping[key] = target.relative_to(ROOT).as_posix()
    sizes.append((file.stat().st_size, target.stat().st_size))
    return mapping[key]

for project in projects.values():
    for ref in project.get('images', []):
        file = ROOT / unquote(ref)
        if file.suffix.lower() in ('.png', '.jpg', '.jpeg') and file.exists():
            optimize(file)

page = (SOURCE / 'index.html').read_text(encoding='utf-8')
def relocate(match):
    attr, ref = match.groups()
    if re.match(r'^(https?:|mailto:|tel:|#)', ref):
        return match.group()
    raw, *query = ref.split('?', 1)
    file = (SOURCE / unquote(raw)).resolve()
    if file.suffix.lower() in ('.png', '.jpg', '.jpeg'):
        new = optimize(file)
    elif file.is_relative_to(SOURCE):
        new = 'assets/workshop/' + file.relative_to(SOURCE).as_posix()
    else:
        new = file.relative_to(ROOT).as_posix()
    return f'{attr}="{new}' + ('?' + query[0] if query else '') + '"'
page = re.sub(r'(src|href)="([^"]+)"', relocate, page)
page = page.replace('<meta name="robots" content="noindex">', '<meta name="robots" content="index,follow">')
base = 'https://melionidas31.github.io/MZakiRamdhan/'
hero = mapping['concepts/artificer-workshop/zaki-workshop.png']
metadata = f'''<link rel="canonical" href="{base}">
<link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
<meta name="author" content="M. Zaki Ramdhan">
<meta name="google-site-verification" content="bYRb6FwGZghifKfFv3SnJ7q5v4LbWVfI4gbsMY1JTwg">
<meta property="og:type" content="website"><meta property="og:url" content="{base}">
<meta property="og:title" content="M. Zaki Ramdhan | The Artificer's Workshop">
<meta property="og:description" content="Mechanical engineering, process safety, research, and AI applications by M. Zaki Ramdhan.">
<meta property="og:image" content="{base}{hero}"><meta property="og:image:alt" content="Zaki's illustrated inventor's workshop">
<meta property="og:image:width" content="1536"><meta property="og:image:height" content="1024">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="M. Zaki Ramdhan | The Artificer's Workshop">
<meta name="twitter:description" content="Mechanical engineering, process safety, research, and AI applications.">
<meta name="twitter:image" content="{base}{hero}">
<script type="application/ld+json">{json.dumps({'@context':'https://schema.org','@type':'Person','name':'M. Zaki Ramdhan','url':base,'description':'Mechanical Engineering graduate exploring process safety, research, and AI applications.'})}</script>
'''
page = page.replace('</head>', metadata + '</head>')
page = page.replace('<script src="assets/workshop/project-data.js"', '<script src="assets/workshop/media-map.js" defer></script><script src="assets/workshop/project-data.js"')
page = page.replace('<main id="main">', '<main id="main"><noscript><p class="container">Enable JavaScript to explore the interactive project galleries. You can still read my background and <a href="assets/docs/CV_M_Zaki_Ramdhan.pdf">download my CV</a>.</p></noscript>')
(ROOT / 'index.html').write_text(page, encoding='utf-8')

css = (SOURCE / 'workshop.css').read_text(encoding='utf-8')
def css_url(match):
    target = optimize(SOURCE / match.group(1))
    return "url('" + Path(target).relative_to('assets/workshop').as_posix() + "')"
css = re.sub(r"url\(['\"]?([^)'\"\s]+)['\"]?\)", css_url, css)
(OUT / 'workshop.css').write_text(css, encoding='utf-8')
js = (SOURCE / 'workshop.js').read_text(encoding='utf-8').replace("const asset = path => '../../' + path;", "const asset = path => window.portfolioMedia[path] || path;")
(OUT / 'workshop.js').write_text(js, encoding='utf-8')
shutil.copy2(SOURCE / 'project-data.js', OUT / 'project-data.js')
shutil.copytree(SOURCE / 'fonts', OUT / 'fonts', dirs_exist_ok=True, ignore=shutil.ignore_patterns('*.ttf'))
(OUT / 'media-map.js').write_text('window.portfolioMedia = ' + json.dumps(mapping, ensure_ascii=False) + ';\n', encoding='utf-8')

# Supply smaller delivery variants for decorative artwork without altering originals.
def variant(name, width):
    target = OUT / 'media' / f'{Path(name).stem}-{width}.webp'
    with Image.open(SOURCE / name) as img:
        img.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
        img.save(target, 'WEBP', quality=80, method=6)
    return target.relative_to(ROOT).as_posix()

hero_mobile = variant('zaki-workshop.png', 960)
owl_small = variant('owl.png', 480)
map_small = variant('journey-map.png', 1024)
page = page.replace('class="hero-scene"', f'class="hero-scene" srcset="{hero_mobile} 960w, {hero} 1536w" sizes="(max-width: 680px) 150vw, 100vw"')
page = page.replace(mapping['concepts/artificer-workshop/owl.png'], owl_small)
css = css.replace(Path(mapping['concepts/artificer-workshop/journey-map.png']).name, Path(map_small).name)
(OUT / 'workshop.css').write_text(css, encoding='utf-8')
# Inline the small stylesheet to avoid a render-blocking request on slow connections.
inline_css = css.replace("url('media/", "url('assets/workshop/media/")
font_css = (OUT / 'fonts/fonts.css').read_text(encoding='utf-8').replace("url('", "url('assets/workshop/fonts/")
page = re.sub(r'<link rel="stylesheet" href="assets/workshop/fonts/fonts.css">', '<style>' + font_css + '</style>', page)
page = re.sub(r'<link rel="stylesheet" href="assets/workshop/workshop.css[^\"]*">', '<style>' + inline_css + '</style>', page)
page = '\n'.join(line.rstrip() for line in page.splitlines()) + '\n'
(ROOT / 'index.html').write_text(page, encoding='utf-8')
sitemap = (ROOT / 'sitemap.xml').read_text(encoding='utf-8')
(ROOT / 'sitemap.xml').write_text(re.sub(r'<lastmod>.*?</lastmod>', '<lastmod>2026-09-19</lastmod>', sitemap), encoding='utf-8')
(ROOT / '.nojekyll').touch()
print(json.dumps({'images':len(sizes),'source_bytes':sum(x[0] for x in sizes),'web_bytes':sum(x[1] for x in sizes)}, indent=2))
