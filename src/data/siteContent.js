/**
 * Home page + global site content.
 *
 * Static for now. In the admin phase this object becomes the response of
 * `GET /api/site` — keep the shape stable so components don't change.
 * Image paths are relative to /public.
 */

export const siteContent = {
  brand: {
    name: 'SYNTH',
    tagline: 'A transdisciplinary creative practice',
    logo: {
      src: '/images/brand/synth-logo.svg', // official vector logo
      alt: 'synth.',
      width: 234,
      height: 81,
    },
  },

  // Animated logo shown once per session when the home page first opens.
  intro: {
    mp4: '/videos/synth-intro.mp4',
    webm: '/videos/synth-intro.webm',
  },

  statusBar: {
    descriptor: 'A transdisciplinary creative practice',
    location: 'Kuwait City, Kuwait',
    year: '2026',
    status: 'System active',
  },

  headerTags: [], // e.g. ['extract', 'reframe'] — shown at the top right of the header

  // Morse for "SYNTH", set with middle dots and em dashes as in the Figma file.
  // Used by every <MorseDivider /> and the vertical rule in Contact.
  morseCode: '···—·—— —·—····',

  hero: {
    // Official SYNTH logo (vector)
    wordmark: {
      src: '/images/brand/synth-logo.svg',
      alt: 'synth.',
      width: 234,
      height: 81,
    },
    tagline: 'A transdisciplinary creative practice',
    // Spline 3D scene (self-hosted copy of the Spline export) shown behind the wordmark
    blobScene: '/spline/synth-blob.splinecode',
    // How far the droplets chase the cursor (0–1). Lower keeps them inside the
    // scene's blend bounds, which otherwise slice them with a hard edge.
    blobReach: 0.5,
  },

  // Option A — looping object videos drifting under the hero.
  objectReel: {
    label: 'synth. objects',
    items: [
      { id: 'typewriter', title: 'Typewriter', video: '/videos/world/typewriter.mp4', poster: '/videos/world/typewriter.jpg' },
      { id: 'rubiks-cube', title: 'Rubik’s cube', video: '/videos/world/rubiks-cube.mp4', poster: '/videos/world/rubiks-cube.jpg' },
      { id: 'fortune-teller', title: 'Fortune teller', video: '/videos/world/fortune-teller.mp4', poster: '/videos/world/fortune-teller.jpg' },
      { id: 'clock', title: 'Clock', video: '/videos/world/clock.mp4', poster: '/videos/world/clock.jpg' },
      { id: 'record-player', title: 'Record player', video: '/videos/world/record-player.mp4', poster: '/videos/world/record-player.jpg' },
      { id: 'pen', title: 'Pen', video: '/videos/world/pen.mp4', poster: '/videos/world/pen.jpg' },
      { id: 'moss-tablet', title: 'Moss tablet', video: '/videos/world/moss-tablet.mp4', poster: '/videos/world/moss-tablet.jpg' },
      { id: 'concrete-speaker', title: 'Concrete speaker', video: '/videos/world/concrete-speaker.mp4', poster: '/videos/world/concrete-speaker.jpg' },
      { id: 'breakfast-tray', title: 'Breakfast tray', video: '/videos/world/breakfast-tray.mp4', poster: '/videos/world/breakfast-tray.jpg' },
    ],
  },

  // Option B — "synth. world": every brand object in one gapless grid.
  // Each inner array is a desktop column; ratio = height / width of the tile.
  world: {
    label: 'synth. world',
    intro: 'Familiar objects, pressed by synth.',
    columns: [
      [
        { id: 'typewriter-v', title: 'Typewriter', ratio: 1.78, video: '/videos/world/typewriter.mp4', poster: '/videos/world/typewriter.jpg' },
        { id: 'visitor-pass-i', title: 'Visitor pass', ratio: 1.24, image: '/images/world/visitor-pass.jpg' },
        { id: 'jenga-i', title: 'Jenga', ratio: 1.24, image: '/images/world/jenga.jpg' },
        { id: 'clock-v', title: 'Clock', ratio: 1.78, video: '/videos/world/clock.mp4', poster: '/videos/world/clock.jpg' },
      ],
      [
        { id: 'tie-i', title: 'Tie', ratio: 1.24, image: '/images/world/tie.jpg' },
        { id: 'rubiks-cube-v', title: 'Rubik’s cube', ratio: 1.78, video: '/videos/world/rubiks-cube.mp4', poster: '/videos/world/rubiks-cube.jpg' },
        { id: 'container-i', title: 'Container', ratio: 1.24, image: '/images/world/container.jpg' },
        { id: 'record-player-v', title: 'Record player', ratio: 1.33, video: '/videos/world/record-player.mp4', poster: '/videos/world/record-player.jpg' },
      ],
      [
        { id: 'fortune-teller-v', title: 'Fortune teller', ratio: 1.78, video: '/videos/world/fortune-teller.mp4', poster: '/videos/world/fortune-teller.jpg' },
        { id: 'tote-bag-i', title: 'Tote bag', ratio: 1.24, image: '/images/world/tote-bag.jpg' },
        { id: 'toaster-i', title: 'Toaster', ratio: 1.62, image: '/images/world/toaster.jpg' },
        { id: 'receipt-printer-i', title: 'Receipt printer', ratio: 1.24, image: '/images/world/receipt-printer.jpg' },
      ],
      [
        { id: 'creative-fuel-i', title: 'Creative fuel', ratio: 1.24, image: '/images/world/creative-fuel.jpg' },
        { id: 'moss-tablet-v', title: 'Moss tablet', ratio: 1.78, video: '/videos/world/moss-tablet.mp4', poster: '/videos/world/moss-tablet.jpg' },
        { id: 'folder-stack-i', title: 'Folder stack', ratio: 1.24, image: '/images/world/folder-stack.jpg' },
        { id: 'concrete-speaker-v', title: 'Concrete speaker', ratio: 1.33, video: '/videos/world/concrete-speaker.mp4', poster: '/videos/world/concrete-speaker.jpg' },
      ],
      [
        { id: 'record-player-i', title: 'Record player', ratio: 1.24, image: '/images/world/record-player.jpg' },
        { id: 'pen-v', title: 'Pen', ratio: 1.78, video: '/videos/world/pen.mp4', poster: '/videos/world/pen.jpg' },
        { id: 'breakfast-tray-i', title: 'Breakfast tray', ratio: 1.24, image: '/images/world/breakfast-tray.jpg' },
        { id: 'breakfast-tray-v', title: 'Breakfast tray', ratio: 1.78, video: '/videos/world/breakfast-tray.mp4', poster: '/videos/world/breakfast-tray.jpg' },
      ],
    ],
  },

  location: {
    based: { label: 'Based in', value: 'Kuwait City' },
    working: { label: 'Working', value: 'Worldwide' },
  },

  statement: {
    heading: 'We question convention to uncover new possibilities',
    body:
      'Through research, experimentation, technology, and design, we reconstruct new perspectives that reveal possibilities previously unseen. We reconstruct perspectives, reframe perception, and shape visual culture through thoughtful design.',
  },

  services: {
    label: 'Services',
    items: [
      // Descriptions are DRAFT copy — replace with SYNTH's own wording.
      { id: 'architecture', title: 'Architecture', description: 'Spaces and structures built from research: interiors, retail and installations that make a brand physical.' },
      { id: 'brand-strategy', title: 'Brand Strategy', description: 'Positioning, naming and voice, built by questioning what the category takes for granted.' },
      { id: 'creative-direction', title: 'Creative Direction', description: 'One clear point of view across every touchpoint, from concept and art direction to the system that holds it together.' },
      { id: 'content-campaign', title: 'Content & Campaign', description: 'Campaigns, CGI and editorial imagery that reframe familiar products into scenes people stop for.' },
      { id: 'objects', title: 'Objects', description: 'Products and merchandise pressed with the brand: familiar things, reframed into objects worth keeping.' },
    ],
  },

  process: {
    label: 'Process',
    // Heading and descriptions are DRAFT copy — replace with SYNTH's own wording.
    heading: ['From research', 'to refined.'],
    items: [
      { id: 'research', title: 'Research', description: 'We study the brand, its audience and the category around it, until we know what everyone else takes for granted.' },
      { id: 'question', title: 'Question', description: 'Every assumption gets challenged: what the product is, who it is for, and what it could be instead.' },
      { id: 'reframe', title: 'Reframe', description: 'We shift the angle on the familiar and find the idea that makes people look twice.' },
      { id: 'create', title: 'Create', description: 'The idea is built out across campaigns, objects, spaces and identities, with one point of view throughout.' },
      { id: 'refine', title: 'Refine', description: 'Every detail is tested and tightened until the work feels inevitable.' },
    ],
  },

  // Sub-brands, shown as a record "track list" on the home page.
  // status: 'live' | 'wip'. href = the sub-brand page. Records are pure CSS.
  categories: {
    label: 'Categories',
    title: 'Track List',
    items: [
      { id: 'formed', name: 'synth.formed', meta: '21', color: '#cdf408', status: 'live', href: '/formed', note: 'This record is under right of synth. Kuwait City, Kuwait' },
      { id: 'objects', name: 'synth.objects', meta: '01', color: '#e8502a', status: 'live', href: '/objects', note: 'Objects pressed by synth. Now playing: Studio Sweat' },
      { id: 'build', name: 'synth.build', meta: 'WIP', color: '#028985', status: 'wip', note: 'Currently in the studio. Release date to be announced' },
      { id: 'systems', name: 'synth.systems', meta: 'WIP', color: '#744dc8', status: 'wip', note: 'Currently in the studio. Release date to be announced' },
    ],
  },

  // What each sub-brand does — shown as a '//' list on its page.
  disciplines: {
    formed: ['visual culture', 'experimental media', 'digital storytelling', 'ai-generated imagery', 'visual production', 'creative experimentation', 'motion design', 'art direction', 'editorial campaigns', 'digital experiences', 'visual narratives', '3d visualization', 'conceptual imagery', 'moving images', 'emerging technologies'],
    build: ['spatial design', 'immersive environments', 'installations', 'interior design', 'experiential spaces', 'exhibition design', 'temporary structures', 'spatial storytelling', 'set design', 'pop-up experiences', 'retail environments', 'conceptual spaces', 'material exploration', 'environmental graphics', 'spatial interventions'],
    systems: ['brand strategy', 'identity systems', 'creative direction', 'brand positioning', 'visual identity', 'strategic thinking', 'brand architecture', 'research & development', 'conceptual frameworks', 'communication design', 'brand narratives', 'design systems', 'cultural research', 'creative consultancy', 'brand development'],
    objects: ['product design', 'furniture design', 'material exploration', 'collectible objects', 'functional art', 'object experimentation', 'industrial design', 'conceptual products', 'sculptural forms', 'everyday objects', 'physical artifacts', 'form development', 'object visualization', 'material innovation', 'experimental fabrication'],
  },

  // Sub-brand pages (/formed, /objects). Descriptions are DRAFT copy.
  // `showcase: 'home'` reuses the Selected work columns below.
  subBrands: {
    formed: {
      name: 'synth.formed',
      accent: '#cdf408',
      art: 'formed',
      meta: '(21) Projects',
      description:
        'Campaigns, identities and imagery. Familiar brands and products, formed into scenes and stories people stop for.',
      showcase: 'home',
    },
    objects: {
      name: 'synth.objects',
      accent: '#e8502a',
      art: 'objects',
      meta: '(01) Project',
      description:
        'Physical products and merchandise pressed with an idea. Everyday objects, reframed into things worth keeping.',
      // Floating object table (replaces the bento). Images: transparent WebP cut-outs.
      // `thumb` is the small version scattered on the table, `image` the large one in the panel.
      field: {
        label: 'Objects',
        items: [
          {
            id: 'ramadan-hamper-pouf',
            name: 'Ramadan Hamper Pouf',
            meta: '01 / Nagwa',
            image: '/images/objects/ramadan-hamper-pouf.webp',
            thumb: '/images/objects/ramadan-hamper-pouf-sm.webp',
            description: 'A sculptural pouf inspired by Nagwa’s Ramadan hamper collection, translating festive embroidery and ornamental textiles into ivory upholstery, green velvet panels, and a glossy pedestal base.',
          },
          {
            id: 'solitaire-playing-cards',
            name: 'Solitaire Playing Cards',
            meta: '02 / Studio Sweat',
            image: '/images/objects/solitaire-playing-cards.webp',
            thumb: '/images/objects/solitaire-playing-cards-sm.webp',
            description: 'A sculptural house of cards inspired by Studio Sweat’s fitness identity, reimagining playing card graphics through workout-inspired motifs, rich red surfaces, and metallic detailing.',
          },
          {
            id: 'chocolate-stools',
            name: 'Chocolate Stools',
            meta: '03 / Pick',
            image: '/images/objects/chocolate-stools.webp',
            thumb: '/images/objects/chocolate-stools-sm.webp',
            description: 'A pair of playful stools inspired by Pick’s chocolate-coated treats, combining porous dessert-like textures, creamy layers, glossy chocolate drips, and wooden stick details.',
          },
          {
            id: 'granola-stool',
            name: 'Granola Stool',
            meta: '04 / JS Bakery',
            image: '/images/objects/granola-stool.webp',
            thumb: '/images/objects/granola-stool-sm.webp',
            description: 'A geometric stool inspired by JS Bakery’s granola bars, pairing a toasted, textured seat with contrasting speckled green supports and warm natural wood.',
          },
          {
            id: 'buckle-chair',
            name: 'Buckle Chair',
            meta: '05 / Thuna',
            image: '/images/objects/buckle-chair.webp',
            thumb: '/images/objects/buckle-chair-sm.webp',
            description: 'An angular chair inspired by Thuna’s footwear, translating shoe construction into folded sculptural panels, smooth leather-like finishes, strap detailing, and patterned upholstery.',
          },
          {
            id: 'embroidered-pouf',
            name: 'Embroidered Pouf',
            meta: '06 / Nagwa',
            image: '/images/objects/embroidered-pouf.webp',
            thumb: '/images/objects/embroidered-pouf-sm.webp',
            description: 'A rounded pouf inspired by Nagwa’s Ramadan collection, combining gathered ivory upholstery, intricately embroidered bands, and a polished cream pedestal to evoke festive craftsmanship.',
          },
          {
            id: 'sculptural-lounger',
            name: 'Sculptural Lounger',
            meta: '07 / Thuna',
            image: '/images/objects/sculptural-lounger.webp',
            thumb: '/images/objects/sculptural-lounger-sm.webp',
            description: 'A low-profile lounger inspired by Thuna’s footwear silhouettes, translating curved soles, layered construction, and contrasting textures into a flowing upholstered seat with black supports.',
          },
          {
            id: 'bistro-chair',
            name: 'Bistro Chair',
            meta: '08 / Go Greek',
            image: '/images/objects/bistro-chair.webp',
            thumb: '/images/objects/bistro-chair-sm.webp',
            description: 'A bistro chair inspired by Go Greek’s visual identity, combining signature blue-and-white striped upholstery, yellow honeycomb mesh, and a curved ivory frame.',
          },
          {
            id: 'oat-cookie-chair',
            name: 'Oat Cookie Chair',
            meta: '09 / BFS',
            image: '/images/objects/oat-cookie-chair.webp',
            thumb: '/images/objects/oat-cookie-chair-sm.webp',
            description: 'A playful low chair inspired by BFS’ oat cookie, combining biscuit-toned textured upholstery, a checkerboard back support, sculptural chocolate-like detailing, and timber legs.',
          },
        ],
      },
      showcase: {
        label: 'Selected work',
        intro: 'Studio Sweat: cards, merchandise and printed matter.',
        columns: [
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-01.jpg', shape: 'portrait' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-02.jpg', shape: 'landscape' },
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-03.jpg', shape: 'square' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-04.jpg', shape: 'hero' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-05.jpg', shape: 'short' },
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-06.jpg', shape: 'tall' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-07.jpg', shape: 'narrow' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-08.jpg', shape: 'large' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-09.jpg', shape: 'square' },
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-10.jpg', shape: 'landscape' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-11.jpg', shape: 'hero' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-12.jpg', shape: 'short' },
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-13.jpg', shape: 'tall' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-14.jpg', shape: 'narrow' },
          ],
          [
            { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/projects/studio-sweat/slide-15.jpg', shape: 'large' },
          ],
        ],
      },
    },
  },

  showcase: {
    label: 'Selected work',
    intro: 'Campaigns, objects and identities — familiar things, reframed.',
    // Each inner array is one column of the collage, top to bottom.
    // shape: portrait | landscape | square | short | tall | narrow | hero | large
    columns: [
      [
        { projectSlug: 'nice-bun', title: 'Nice Bun', image: '/images/showcase/nice-bun-04.jpg', shape: 'portrait' },
      ],
      [
        { projectSlug: 'maison-du-chocolatier', title: 'Maison du Chocolatier', image: '/images/showcase/maison-du-chocolatier-01.jpg', shape: 'landscape' },
        { projectSlug: 'synth', title: 'Synth Objects', image: '/images/showcase/synth-01.jpg', shape: 'square' },
      ],
      [
        { projectSlug: 'e-studio', title: 'E Studio', image: '/images/showcase/e-studio-01.jpg', shape: 'hero' },
      ],
      [
        { projectSlug: 'principale', title: 'Principale', image: '/images/showcase/principale-01.jpg', shape: 'short' },
        { projectSlug: 'oh-g', title: 'Oh G!', image: '/images/showcase/oh-g-02.jpg', shape: 'tall' },
      ],
      [
        { projectSlug: 'studio-sweat', title: 'Studio Sweat', image: '/images/showcase/studio-sweat-02.jpg', shape: 'narrow' },
      ],
      [
        { projectSlug: 'marzook', title: 'Marzook', image: '/images/showcase/marzook-15.jpg', shape: 'large' },
      ],
      [
        { projectSlug: 'runch', title: 'Runch!', image: '/images/showcase/runch-01.jpg', shape: 'square' },
        { projectSlug: 'garys-matcha', title: 'Gary’s Matcha', image: '/images/showcase/garys-matcha-01.jpg', shape: 'landscape' },
      ],
      [
        { projectSlug: 'gallerie-by-gigis', title: 'Gallerie by Gigis', image: '/images/showcase/gallerie-by-gigis-02.jpg', shape: 'hero' },
      ],
      [
        { projectSlug: 'marzook', title: 'Marzook', image: '/images/showcase/marzook-01.jpg', shape: 'short' },
        { projectSlug: 'sprei', title: 'Spréi', image: '/images/showcase/sprei-01.jpg', shape: 'tall' },
      ],
      [
        { projectSlug: 'atyab-al-marshoud', title: 'Atyab Al Marshoud', image: '/images/showcase/atyab-al-marshoud-01.jpg', shape: 'narrow' },
      ],
      [
        { projectSlug: 'bocado', title: 'Bocado', image: '/images/showcase/bocado-01.jpg', shape: 'large' },
      ],
      [
        { projectSlug: 'neighbourhood', title: 'Neighbourhood', image: '/images/showcase/neighbourhood-01.jpg', shape: 'square' },
        { projectSlug: 'the-pastry-studio', title: 'The Pastry Studio', image: '/images/showcase/the-pastry-studio-06.jpg', shape: 'landscape' },
      ],
    ],
  },

  archive: {
    label: 'Archive',
    // `projectSlug` links the thumbnail to a project page; null = image only.
    items: [
      { id: 'archive-01', image: '/images/archive/archive-01.jpg', alt: 'Nice Bun campaign', projectSlug: 'nice-bun' },
      { id: 'archive-02', image: '/images/archive/archive-02.jpg', alt: 'Principale campaign', projectSlug: 'principale' },
      { id: 'archive-03', image: '/images/archive/archive-03.jpg', alt: 'Studio Sweat campaign', projectSlug: 'studio-sweat' },
      { id: 'archive-04', image: '/images/archive/archive-04.jpg', alt: 'Studio Sweat campaign', projectSlug: 'studio-sweat' },
      { id: 'archive-05', image: '/images/archive/archive-05.jpg', alt: 'Runch! campaign', projectSlug: 'runch' },
      { id: 'archive-06', image: '/images/archive/archive-06.jpg', alt: 'Oh G! campaign', projectSlug: 'oh-g' },
      { id: 'archive-07', image: '/images/archive/archive-07.jpg', alt: 'Thuna campaign', projectSlug: 'thuna' },
      { id: 'archive-08', image: '/images/archive/archive-08.jpg', alt: 'Gallerie by Gigis campaign', projectSlug: 'gallerie-by-gigis' },
      { id: 'archive-09', image: '/images/archive/archive-09.jpg', alt: 'Marzook campaign', projectSlug: 'marzook' },
      { id: 'archive-10', image: '/images/archive/archive-10.jpg', alt: 'Bocado campaign', projectSlug: 'bocado' },
      { id: 'archive-11', image: '/images/archive/archive-11.jpg', alt: 'Maison du Chocolatier campaign', projectSlug: 'maison-du-chocolatier' },
      { id: 'archive-12', image: '/images/archive/archive-12.jpg', alt: '', projectSlug: null },
      { id: 'archive-13', image: '/images/archive/archive-13.jpg', alt: 'While I’m Baked campaign', projectSlug: 'while-im-baked' },
    ],
  },

  contact: {
    label: 'Contact',
    heading: 'Let’s make something unexpected',
    audiences: ['New business', 'Collaborators', 'General inquiries'],
    channels: [
      { id: 'email', label: 'info@thisissynth.com', href: 'mailto:info@thisissynth.com' },
      { id: 'instagram', label: '@synth.formed', href: 'https://www.instagram.com/synth.formed/' },
      // TODO: replace placeholder number from the prototype.
      { id: 'phone', label: '+965 99980709', href: 'tel:+96599980709' },
    ],
  },
};
