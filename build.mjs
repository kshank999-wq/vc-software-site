/**
 * Builds vc-software.com into dist/: the home page (each product line, with
 * its add-ons), support, privacy and terms, from src/products.mjs. No
 * dependencies; Vercel runs `node build.mjs` and serves dist/.
 *
 * Also writes dist/related/<product>.json: what each product's own site shows
 * under "More from VC Software".
 */
import { copyFileSync, cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPANY, PRODUCTS, productByKey } from './src/products.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

const esc = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const year = new Date().getFullYear();

const page = ({ title, description, path, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${COMPANY.site}${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${COMPANY.site}${path}">
<meta property="og:type" content="website">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="/">VC Software</a>
  <nav class="site"><a href="/#products">Products</a><a href="/support">Support</a></nav>
</div></header>
<main>
${body}
</main>
<footer class="site"><div class="wrap">
  <span>VC Software · ${esc(COMPANY.catchphrase)} © ${year} ${esc(COMPANY.legal)}</span>
  <span><a href="/support">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span>
  <p class="slogan">${esc(COMPANY.slogans[1])}</p>
</div></footer>
</body>
</html>
`;

/** Where a product's card goes: its site, its App Store page, or its parent's site. */
const hrefOf = (p, parent) => p.url || p.appStore || (p.partOfParent && parent ? parent.url : '') || '';

/** "vc-writer.com" from "https://vc-writer.com/notes": what the card says it opens. */
const shortUrl = (url) => url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');

/**
 * A product's card. **The whole card is the link** to its site (Ken: *when
 * you select each product and its small promotional blurb, it'll take you to
 * the website*). A product with nowhere to go yet is the same card, not a
 * link, marked coming soon.
 */
const card = (p, { parent, size }) => {
  const href = hrefOf(p, parent);
  const goes = href
    ? `<span class="go">${p.partOfParent ? `Part of ${esc(parent.name)}` : esc(shortUrl(href))}&nbsp;<span aria-hidden="true">→</span></span>`
    : `<span class="go soon">${p.partOfParent && parent ? `Coming soon with ${esc(parent.name)}` : p.appStore !== undefined ? 'Coming soon to the App Store' : 'Coming soon'}</span>`;
  const inner = `<img class="logo" src="/logos/${esc(p.logo)}" alt="" width="${size === 'main' ? 160 : 72}" height="${size === 'main' ? 160 : 72}" loading="lazy">
  <div class="words">
    <h${size === 'main' ? 2 : 3}>${esc(p.name)}</h${size === 'main' ? 2 : 3}>
    ${p.platform ? `<p class="platform">${esc(p.platform)}</p>` : ''}
    ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ''}
    <p class="about">${esc(p.about)}</p>
    ${goes}
  </div>`;
  const cls = `card ${size}${href ? '' : ' is-soon'}`;
  return href ? `<a class="${cls}" href="${esc(href)}">${inner}</a>` : `<div class="${cls}">${inner}</div>`;
};

/**
 * A coming-soon feature under a line: the words, the picture full width (it
 * is a detailed sheet, unreadable any smaller; it opens full size), and the
 * points beneath it.
 */
const promo = (f) => `<div class="promo">
  <p class="eyebrow">${esc(f.eyebrow)}</p>
  <h3>${esc(f.title)}</h3>
  <p class="lede">${esc(f.lede)}</p>
  <figure class="promo-shot">
    <a href="/promo/${esc(f.image)}"><img src="/promo/${esc(f.image)}" alt="${esc(f.alt)}" width="1536" height="1024" loading="lazy"></a>
    <figcaption>${esc(f.caption)}</figcaption>
  </figure>
  <dl>${f.points.map(([term, text]) => `<div><dt>${esc(term)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl>
</div>`;

/** One product line: the product, its add-ons beneath it, and any feature. */
const line = (p) => `<section class="line" id="${p.key}" aria-label="${esc(p.name)}">
  ${card(p, { size: 'main' })}
  ${p.addOns.length ? `<div class="addons">${p.addOns.map((a) => card(a, { parent: p, size: 'addon' })).join('\n')}</div>` : ''}
  ${p.promo ? promo(p.promo) : ''}
</section>`;

const home = page({
  title: `VC Software: ${COMPANY.catchphrase.replace(/\.$/, '').toLowerCase()}`,
  description: 'VC Writer, VC Composer, VC Game Studio and VC Film Studio: software for writers, composers, game designers and filmmakers, from VC Entertainment.',
  path: '/',
  body: `<section class="hero wrap">
  <h1>${esc(COMPANY.catchphrase)}</h1>
  <p class="strap">${esc(COMPANY.strapline)}</p>
  <p class="lede">Write it, score it, play it, shoot it. Each VC app is its own product, made for the people who tell stories for a living.</p>
  <ul class="marks" aria-label="Products">${PRODUCTS.map((p) => `<li><a href="#${p.key}"><img src="/logos/${esc(p.logo)}" alt="" width="56" height="56"><span>${esc(p.name)}</span></a></li>`).join('')}</ul>
</section>
<div class="wrap lines" id="products">
${PRODUCTS.map(line).join('\n')}
</div>
<section class="band"><div class="wrap">
  <h2>One account for every VC app</h2>
  <p>Sign in to any VC app with the same account. Each app is its own subscription: you only pay for the ones you use.</p>
</div></section>`,
});

const support = page({
  title: 'Support · VC Software',
  description: 'Help with VC Writer, VC Composer, VC Game Studio and VC Film Studio: your account, subscription, license and installs.',
  path: '/support',
  body: `<section class="wrap page">
  <h1>Support</h1>
  <p>Write to <a href="mailto:${COMPANY.support}">${COMPANY.support}</a> with the app you use and what happened, and we will get back to you.</p>
  <h2>Your account</h2>
  <p>One account signs you in to every VC app. You sign in with an emailed link or code; there is no password to forget.</p>
  <h2>Your subscription</h2>
  <p>Each app is its own subscription. Change your plan, update your card, see your invoices or cancel from the account page on that app's own website.</p>
  <h2>Moving to a new computer</h2>
  <p>Each license runs on a set number of computers. Sign out of the app on the old computer, or free its seat from your account page, then sign in on the new one.</p>
  <h2>Product help</h2>
  <ul>${PRODUCTS.map((p) => `<li>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</li>`).join('')}</ul>
</section>`,
});

const privacy = page({
  title: 'Privacy · VC Software',
  description: 'How VC Software apps handle your information.',
  path: '/privacy',
  body: `<section class="wrap page">
  <h1>Privacy</h1>
  <p class="updated">${esc(COMPANY.legal)} · last updated ${new Date().toISOString().slice(0, 10)}</p>
  <p>This is how the VC Software apps (VC Writer, VC Composer, VC Game Studio, VC Film Studio and their add-ons) and their websites handle your information.</p>
  <h2>What we keep</h2>
  <ul>
    <li><strong>Your account:</strong> your email address and, if you give one, your name.</li>
    <li><strong>Your subscriptions and licenses:</strong> which apps you subscribe to, your plan, and the computers your license is active on (each computer's name, system and app version).</li>
    <li><strong>Messages we send you:</strong> a record that an email (a sign-in link, a receipt, a license) was sent.</li>
  </ul>
  <h2>What we don't keep</h2>
  <ul>
    <li><strong>Your card details.</strong> Payments are handled by Stripe; we never see or store your card number.</li>
    <li><strong>Your work,</strong> unless you use a feature that sends it to us. Your projects stay on your own devices.</li>
  </ul>
  <h2>Who helps us</h2>
  <p>Supabase (accounts and records), Stripe (payments), Resend (email) and Vercel (the websites). They handle your information only to provide their service to us.</p>
  <h2>Your choices</h2>
  <p>You can see your account, subscriptions and computers on each app's account page. To have your account deleted, or to ask what we hold about you, write to <a href="mailto:${COMPANY.support}">${COMPANY.support}</a>.</p>
</section>`,
});

const terms = page({
  title: 'Terms · VC Software',
  description: 'The terms for using VC Software apps.',
  path: '/terms',
  body: `<section class="wrap page">
  <h1>Terms</h1>
  <p class="updated">${esc(COMPANY.legal)} · last updated ${new Date().toISOString().slice(0, 10)}</p>
  <p>These terms cover the VC Software apps and their websites, offered by ${esc(COMPANY.legal)}.</p>
  <h2>Subscriptions</h2>
  <p>Each app is its own subscription, billed monthly or yearly as you choose, and renews until you cancel. You can cancel any time from that app's account page; you keep access until the end of the period you paid for.</p>
  <h2>Your license</h2>
  <p>While your subscription is active, you may use the app on the number of computers its website states. Your license is for you; please don't share it or try to get around it.</p>
  <h2>Your work</h2>
  <p>What you make with the apps is yours.</p>
  <h2>Getting help</h2>
  <p>If something isn't right with an app or a charge, write to <a href="mailto:${COMPANY.support}">${COMPANY.support}</a> and we will sort it out.</p>
</section>`,
});

const notFound = page({
  title: 'Not found · VC Software',
  description: 'This page does not exist.',
  path: '/404',
  body: `<section class="wrap page"><h1>Not found</h1><p>That page doesn't exist. <a href="/">Back to VC Software</a>.</p></section>`,
});

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'related'), { recursive: true });
const pages = { 'index.html': home, 'support.html': support, 'privacy.html': privacy, 'terms.html': terms, '404.html': notFound };
for (const [name, html] of Object.entries(pages)) writeFileSync(join(out, name), html);
copyFileSync(join(root, 'src/styles.css'), join(out, 'styles.css'));
copyFileSync(join(root, 'src/favicon.svg'), join(out, 'favicon.svg'));
cpSync(join(root, 'src/logos'), join(out, 'logos'), { recursive: true });
cpSync(join(root, 'src/promo'), join(out, 'promo'), { recursive: true });
for (const p of PRODUCTS) {
  const related = p.related.map(productByKey).map((r) => ({ name: r.name, tagline: r.tagline, url: r.url || null }));
  writeFileSync(join(out, 'related', `${p.key}.json`), `${JSON.stringify({ product: p.name, related }, null, 2)}\n`);
}
console.log(`Built ${Object.keys(pages).length} pages and ${PRODUCTS.length} related lists into dist/.`);
