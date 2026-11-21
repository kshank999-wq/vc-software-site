# vc-software-site

**vc-software.com**: VC Software's company site. Each VC app is advertised
and sold on its own site (vc-writer.com, vc-gamestudio.com, …); this site is
the quiet company page above them: one card per product line with its add-ons,
and the support, privacy and terms pages every product links to.

## Focus and slogans

- **Organizing creative minds.** The catchphrase; the home page leads with it.
- **Don’t cheat yourself out of being great.**

Both are kept in `COMPANY.slogans` in [`src/products.mjs`](src/products.mjs).

## Changing what it says

Everything about the products is in [`src/products.mjs`](src/products.mjs):
names, taglines, links, add-ons, and which products each one shows under
"More from VC Software". Leave a `url` (or `appStore`) empty and the product
shows as coming soon; fill it in when it launches.

Each product's logo is a file in `src/logos/`, named by its `logo` field. The
VC Writers Room's full-size master is `brand/vc-writers-room-1024.png`: VC
Writer's app icon with VC WRITERS ROOM set on the plaque in Josefin Sans.

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
