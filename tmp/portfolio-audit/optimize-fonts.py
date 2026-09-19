"""Create WOFF2 subsets for the current English portfolio (fonttools + brotli)."""
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent / 'font-runtime'))
from fontTools import subset

source = ROOT / 'concepts/artificer-workshop'
text = ''.join(p.read_text(encoding='utf-8') for p in source.glob('*.js'))
text += (source / 'index.html').read_text(encoding='utf-8')
chars = set(range(32, 256)) | set(map(ord, text))
before = after = 0
for file in (source / 'fonts').glob('*.ttf'):
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    font = subset.load_font(str(file), options)
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=chars)
    worker.subset(font)
    target = file.with_suffix('.woff2')
    subset.save_font(font, str(target), options)
    before += file.stat().st_size
    after += target.stat().st_size
css_file = source / 'fonts/fonts.css'
css_file.write_text(css_file.read_text().replace('.ttf', '.woff2').replace("format('truetype')", "format('woff2')"), encoding='utf-8')
print(f'Fonts: {before:,} -> {after:,} bytes')
