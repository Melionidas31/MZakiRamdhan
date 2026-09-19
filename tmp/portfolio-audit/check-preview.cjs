// Run from any directory: node tmp/portfolio-audit/check-preview.cjs
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const preview = path.join(root, 'concepts/artificer-workshop');
const read = name => readFileSync(path.join(preview, name), 'utf8');
const context = vm.createContext({ window: {} });
vm.runInContext(read('project-data.js'), context);
vm.runInContext(read('workshop.js').split('featured.forEach')[0], context);
const ids = vm.runInContext('[...featured, ...gallery, "finflow-ai", "sekitar-kita"]', context);
assert.equal(ids.length, 15);
assert.equal(new Set(ids).size, 15);
let checked = 0;
function localReference(ref, base) {
  if (!ref || /^(?:https?:|mailto:|data:|#)/.test(ref)) return;
  const file = path.resolve(base, decodeURIComponent(ref.split(/[?#]/)[0]));
  assert.ok(existsSync(file), `Missing local reference: ${ref}`);
  checked++;
}
for (const id of ids) {
  const project = context.window.portfolioProjects[id];
  assert.ok(project?.title && project.description && project.images.length, id);
  project.images.forEach(ref => localReference(ref, root));
}
const html = read('index.html');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) localReference(match[1], preview);
for (const match of read('workshop.css').matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) localReference(match[1], preview);
for (const id of ['about','work','side','experience','skills','publications','credentials','contact']) {
  assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
}
assert.ok(html.includes('lang="en"') && html.includes('3.88/4.00'));
assert.ok(read('workshop.css').includes('.paused dialog[open]{animation:none!important}'), 'Paused motion must not freeze the modal entrance');
assert.ok(html.includes('ElevenLabs_image_seedream-5-pro_Dark%20ultra-real_2026-08-17T06_30_23.png'), 'Requested Seedream portrait is not wired into the builder output');
assert.equal((read('workshop.js').match(/'Drag the /g)||[]).length,5,'Expected five draggable charms');
assert.ok(read('fonts/fonts.css').includes("font-family:'Cormorant Garamond'")&&read('fonts/fonts.css').includes("font-family:'Alegreya Sans'"),'Local typography pair is missing');
console.log(`PASS: 15 project records, 8 content sections, ${checked} local references, requested portrait, local fonts, 5 draggable charms.`);
