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
 * `logo` is a file in src/logos/, shown on the product's card. Each is the
 * product's own icon, taken from its website or its app. The Writers Room's is
 * VC Writer's app icon with VC WRITERS ROOM set on its plaque.
 *
 * VC Publishing (the book imprint) is VC Entertainment's too, but it is not
 * software: it has its own site and is not listed here. Neither is VC Command
 * Center: it is the company's in-house dashboard across every site and line
 * (software, books, clothing, sales), not a product.
 */

export const COMPANY = {
  name: 'VC Software',
  /**
   * VC Software's focus and slogans, in Ken's words. The first is the
   * catchphrase the site leads with; the second is the company's other slogan,
   * noted here for when a page or product site wants it.
   */
  catchphrase: 'Organizing creative minds.',
  slogans: ['Organizing creative minds.', 'Don’t cheat yourself out of being great.'],
  /** The line under the catchphrase on the home page. */
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
    logo: 'vc-writer.webp',
    tagline: 'Write anything, in one place.',
    about:
      'Screenplays, series and episodics, novels, short story collections, and institutional and instructional books, with a word processor that works with all of it. Research, outline, draft, edit and hear it read back. For Windows 10/11 and macOS.',
    addOns: [
      {
        key: 'vc-writer-notes',
        name: 'VC Writer Notes',
        about: 'The iPhone companion: catch an idea the moment it comes, by typing or by voice, and find it waiting in VC Writer.',
        platform: 'iPhone',
        logo: 'vc-writer-notes.png',
        /** Its page on VC Writer's site, until the App Store listing is live. */
        url: 'https://vc-writer.com/notes',
        /** The App Store listing, once it is live (https://apps.apple.com/app/…). */
        appStore: '',
      },
      {
        key: 'vc-writers-room',
        name: 'VC Writers Room',
        about:
          'Write as a team: invite your co-writers in the roles you give them, hand out tasks on the room’s board, and submit pages from VC Writer for the room to read.',
        /** VC Writer's mark with the room's name on the plaque (brand/vc-writers-room-1024.png). */
        logo: 'vc-writers-room.webp',
        /** The room's door on VC Writer's site (sign in to see your rooms). */
        url: 'https://vc-writer.com/rooms',
      },
    ],
    related: ['vc-composer', 'vc-film-studio', 'vc-game-studio'],
  },
  {
    key: 'vc-composer',
    name: 'VC Composer',
    url: 'https://vc-composer.com',
    logo: 'vc-composer.webp',
    tagline: 'A notation-first scoring workstation.',
    about:
      'For film, TV and game composers: write on staves, hear your libraries, mix, score to picture and deliver. For Windows and macOS.',
    addOns: [],
    related: ['vc-writer', 'vc-film-studio', 'vc-game-studio'],
  },
  {
    key: 'vc-game-studio',
    name: 'VC Game Studio',
    url: 'https://vc-gamestudio.com',
    logo: 'vc-game-studio.png',
    tagline: 'Design the whole game, then send it straight into your engine.',
    about:
      'Story, characters, levels, puzzles and play-testing in one design tool, with a hand-off to Godot, Unity and Unreal Engine. For Windows and macOS.',
    addOns: [],
    related: ['vc-writer', 'vc-composer', 'vc-film-studio'],
  },
  {
    key: 'vc-film-studio',
    name: 'VC Film Studio',
    url: 'https://www.vcfilmstudio.com',
    logo: 'vc-film-studio.webp',
    tagline: 'Management software for small and large productions.',
    about:
      'The script, the breakdown, the schedule, the shot list, continuity, call sheets and the accounts, in one place, following the order a production actually happens in.',
    addOns: [
      {
        key: 'vc-smart-slate',
        name: 'VC Smart Slate',
        about:
          'The on-set digital slate and timecode hub, linking the camera and sound teams, the script supervisor, VC DIT, VC Film Studio and post-production.',
        platform: 'iPhone and iPad',
        logo: 'vc-smart-slate.webp',
        /** Sold on VC Film Studio's own site, as part of it: no site of its own. */
        partOfParent: true,
      },
      {
        key: 'vc-dit',
        name: 'VC DIT',
        logo: 'vc-dit.png',
        about:
          'On-set workflow for DITs: checksum-verified ingest, sync, dailies and looks, VFX mirroring and delivery to every destination. For Mac and Windows.',
        /** Its own website. */
        url: 'https://vc-dit.com',
      },
      {
        key: 'vc-vfx',
        name: 'VC VFX',
        logo: 'vc-vfx.svg',
        about:
          'From the DIT hand-off to the VFX house: a shot queue, a printable prep list, verified image-sequence plates and documented shot packages for your artist. Works with VC Film Studio or on its own. For Windows and macOS.',
        /** Its own website: sold on its own as well as part of VC Film Studio. */
        url: 'https://vc-vfx.com',
      },
      {
        key: 'vc-sound-design',
        name: 'VC Sound Design',
        logo: 'vc-sound-design.webp',
        about:
          'Sound for picture: spot sounds against the edited scene, build the cue chart, perform or record Foley, rough-mix, and hand off sample-aligned stems to DaVinci Resolve or a finishing studio. For Windows, macOS and Linux.',
        /** No site yet: shows as coming soon until `url` is filled in. */
        url: '',
      },
      {
        key: 'vc-director',
        name: 'VC Director',
        about:
          'The script-first app for directors and directors of photography: mark a line, note it by typing or dictating, add photos, sketches and viewfinder frames, and find it in VC Film Studio.',
        platform: 'iPhone, iPad and Android',
        logo: 'vc-director.webp',
        /** The App Store listing, once it is live. */
        appStore: '',
      },
    ],
    related: ['vc-writer', 'vc-composer', 'vc-game-studio'],
  },
];

export const productByKey = (key) => PRODUCTS.find((product) => product.key === key);
