const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'assets/workshop');
const read = file => fs.readFileSync(file, 'utf8');
const context = vm.createContext({window: {}});
for (const file of ['media-map.js', 'project-data.js', 'workshop.js']) {
  vm.runInContext(read(path.join(out, file)).split('featured.forEach')[0], context);
}
const html = read(path.join(root, 'index.html'));
let count = 0;
function check(ref, base = root) {
  if (/^(?:https?:|mailto:|tel:|data:|#)/.test(ref)) return;
  const file = path.resolve(base, decodeURIComponent(ref.split(/[?#]/)[0]));
  assert.ok(file.startsWith(root + path.sep), `Escapes root: ${ref}`);
  assert.ok(fs.statSync(file).isFile(), `Missing file: ${ref}`);
  count++;
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) check(match[1]);
for (const match of html.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) check(match[1]);
for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
  for (const candidate of match[1].split(',')) check(candidate.trim().split(/\s+/)[0]);
}
for (const css of ['workshop.css', 'fonts/fonts.css']) {
  for (const match of read(path.join(out, css)).matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) check(match[1], path.dirname(path.join(out, css)));
}
const ids = vm.runInContext('[...featured,...gallery,"finflow-ai","sekitar-kita"]', context);
assert.equal(new Set(ids).size, 15);
for (const id of ids) {
  for (const ref of context.window.portfolioProjects[id].images) {
    check(context.window.portfolioMedia[ref] || ref);
  }
}
assert.ok(!html.includes('noindex'));
assert.ok(!html.includes('../../'));
assert.ok(html.includes('rel="canonical"') && html.includes('google-site-verification'));
assert.ok(html.includes('og:image') && html.includes('application/ld+json'));
for (const id of ['about','work','side','experience','skills','publications','credentials','contact']) assert.ok(html.includes(`id="${id}"`));
assert.ok(html.includes('3.88/4.00') && html.includes('lang="en"'));
console.log(`PASS: production paths, ${count} local references, 15 projects, 8 content sections, SEO metadata.`);
