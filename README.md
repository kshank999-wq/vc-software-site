# vc-software-site

**vc-software.com**: VC Software's company site. Each VC app is advertised
and sold on its own site (vc-writer.com, vc-gamestudio.com, …); this site is
the quiet company page above them: one card per product line with its add-ons,
and the support, privacy and terms pages every product links to.

## Changing what it says

Everything about the products is in [`src/products.mjs`](src/products.mjs):
names, taglines, links, add-ons, and which products each one shows under
"More from VC Software". Leave a `url` (or `appStore`) empty and the product
shows as coming soon; fill it in when it launches.

```bash
npm test     # builds dist/ and checks every page, link and product
```

No dependencies: `node build.mjs` writes plain HTML into `dist/`.

## Deploying

Vercel → Add New → Project → import this repository. `vercel.json` sets the
build (`node build.mjs`) and the output (`dist`). Then Settings → Domains →
add `vc-software.com` and `www.vc-software.com`, with www redirecting to the
bare domain. The bare domain is the site's address; the redirect lives in
Vercel's domain settings only. A second redirect in `vercel.json` pointing the
other way once sent every page but the home page round in a loop.

## For each product's site

`dist/related/<product>.json` (for example
`https://vc-software.com/related/vc-game-studio.json`) lists the related
products that product's site shows under "More from VC Software".
