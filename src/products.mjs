/**
 * VC Software's product lines: everything the site says about each app, in
 * one place. Each product is advertised and sold on its own site; this list
 * is what vc-software.com shows, and `related` is what each product's site
 * offers under "More from VC Software".
 *
 * Leave `url` (or `appStore`) empty while a product is not out yet: it shows
 * as coming soon. Fill it in and rebuild when it launches. An add-on with
 * `partOfParent` is sold on its main product's site and links there.
 *
 * VC Publishing (the book imprint) is VC Entertainment's too, but it is not
 * software: it has its own site and is not listed here.
 */

export const COMPANY = {
  name: 'VC Software',
  /** The catchphrase, and the line that goes with it. */
  catchphrase: 'Organizing creative minds.',
  strapline: 'Tools for storytellers.',
  /** The company behind the apps (the name on invoices and signed installers). */
  legal: 'VC Entertainment LLC',
  site: 'https://vc-software.com',
  support: 'support@vc-software.com',
};

export const PRODUCTS = [
  {
    key: 'vc-writer',
    name: 'VC Writer',
    url: 'https://vc-writer.com',
    tagline: 'Write screenplays and novels in one place.',
    about:
      'Story development, research, outlining, drafting, editing and read-back for screenwriters and novelists. For Windows 10/11 and macOS.',
    addOns: [
      {
        key: 'vc-writer-notes',
        name: 'VC Writer Notes',
        about: 'The iPhone companion: catch an idea the moment it comes, by typing or by voice, and find it waiting in VC Writer.',
        platform: 'iPhone',
        /** The App Store listing, once it is live (https://apps.apple.com/app/…). */
        appStore: '',
      },
    ],
    related: ['vc-film-studio', 'vc-game-studio'],
  },
  {
    key: 'vc-film-studio',
    name: 'VC Film Studio',
    url: '',
    tagline: 'Run the whole production from one place.',
    about:
      'A production operating system for filmmakers: the creative intent of your film kept as structured, versioned data, with reports for every department and hand-offs to Unreal and DaVinci Resolve.',
    addOns: [
      {
        key: 'vc-dit',
        name: 'VC DIT',
        about:
          'On-set workflow for DITs: checksum-verified ingest, sync, dailies and looks, VFX mirroring and delivery to every destination. For Mac and Windows.',
        /** Its own website. */
        url: 'https://vc-dit.com',
      },
      {
        key: 'vc-vfx',
        name: 'VC VFX',
        about:
          'From the DIT hand-off to the VFX house: a shot queue, a printable prep list, verified image-sequence plates and documented shot packages for your artist. Works with VC Film Studio or on its own. For Windows and macOS.',
        /** Its own website: sold on its own as well as part of VC Film Studio. */
        url: 'https://vc-vfx.com',
      },
      {
        key: 'vc-smart-slate',
        name: 'VC Smart Slate',
        about: 'A live slate linked to the production, so every take is logged as it is shot.',
        /** Sold on VC Film Studio's own site, as part of it: no site of its own. */
        partOfParent: true,
      },
    ],
    related: ['vc-writer', 'vc-game-studio'],
  },
  {
    key: 'vc-game-studio',
    name: 'VC Game Studio',
    url: 'https://vc-gamestudio.com',
    tagline: 'Design the whole game, then send it straight into your engine.',
    about:
      'Story, characters, levels, puzzles and play-testing in one design tool, with a hand-off to Godot, Unity and Unreal Engine. For Windows and macOS.',
    addOns: [],
    related: ['vc-writer', 'vc-film-studio'],
  },
];

export const productByKey = (key) => PRODUCTS.find((product) => product.key === key);
