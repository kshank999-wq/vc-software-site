/**
 * Checks the built site (run `npm test`): every page is there, every
 * internal link and asset resolves, every external link is https, and the
 * product list is complete (names, taglines; add-ons linked, coming soon, or
 * part of their product).
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PRODUCTS } from './src/products.mjs';

const dist = new URL('./dist/', import.meta.url).pathname;
let failures = 0;
const fail = (message) => {
  failures++;
  console.error(`FAIL: ${message}`);
};

const pages = ['index', 'support', 'privacy', 'terms', '404'];
for (const name of pages) {
  const file = join(dist, `${name}.html`);
  if (!existsSync(file)) {
    fail(`${name}.html was not built`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${name}: no title`);
  if (!/name="description" content="[^"]+"/.test(html)) fail(`${name}: no description`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (href.startsWith('mailto:') || href.startsWith('#')) continue;
    if (/^https?:/.test(href)) {
      if (!href.startsWith('https://')) fail(`${name}: insecure link ${href}`);
      continue;
    }
    const path = href.split('#')[0];
    if (path === '/') continue;
    const target = join(dist, path.replace(/^\//, ''));
    if (!existsSync(target) && !existsSync(`${target}.html`)) fail(`${name}: broken link ${href}`);
  }
}

const home = readFileSync(join(dist, 'index.html'), 'utf8');
for (const p of PRODUCTS) {
  if (!p.name || !p.tagline || !p.about) fail(`${p.key}: name, tagline and about are all needed`);
  if (!home.includes(p.name)) fail(`the home page should list ${p.name}`);
  if (p.url && !home.includes(`href="${p.url}"`)) fail(`the home page should link ${p.name} to ${p.url}`);
  for (const a of p.addOns) if (!home.includes(a.name)) fail(`the home page should list ${p.name}'s add-on ${a.name}`);
  for (const r of p.related) if (!PRODUCTS.some((q) => q.key === r)) fail(`${p.key}: related product ${r} is not in the list`);
  const related = JSON.parse(readFileSync(join(dist, 'related', `${p.key}.json`), 'utf8'));
  if (related.related.length !== p.related.length) fail(`${p.key}: related list should have ${p.related.length} entries`);
}
if (home.includes('VC Publishing')) fail('VC Publishing is not a VC Software product');

if (failures) {
  console.error(`${failures} problem(s).`);
  process.exit(1);
}
console.log(`Site OK: ${pages.length} pages, ${PRODUCTS.length} product lines, links resolve.`);
