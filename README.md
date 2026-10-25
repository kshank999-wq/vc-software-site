# vc-software-site

**www.vc-software.com**: VC Software's company site. Each VC app is advertised
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
add `www.vc-software.com` and `vc-software.com` (the bare domain redirects to
www).

## For each product's site

`dist/related/<product>.json` (for example
`https://www.vc-software.com/related/vc-game-studio.json`) lists the related
products that product's site shows under "More from VC Software".
