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
      src: '/images/brand/synth-wordmark.png',
      alt: 'synth.',
      width: 781,
      height: 271,
    },
  },

  statusBar: {
    descriptor: 'A transdisciplinary creative practice',
    location: 'Kuwait City, Kuwait',
    year: '2026',
    status: 'System active',
  },

  headerTags: ['extract', 'reframe'],

  // Morse for "SYNTH", set with middle dots and em dashes as in the Figma file.
  // Used by every <MorseDivider /> and the vertical rule in Contact.
  morseCode: '···—·—— —·—····',

  hero: {
    // Display wordmark from the Figma hero — vector traced from the supplied artwork.
    wordmark: {
      src: '/images/brand/synth-display.svg',
      alt: 'SYNTH',
      width: 3719,
      height: 927,
    },
    tagline: 'A transdisciplinary creative practice',
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
      { id: 'architecture', title: 'Architecture' },
      { id: 'brand-strategy', title: 'Brand Strategy' },
      { id: 'creative-direction', title: 'Creative Direction' },
      { id: 'content-campaign', title: 'Content & Campaign' },
      { id: 'objects', title: 'Objects' },
    ],
  },

  process: {
    label: 'Process',
    items: [
      { id: 'research', title: 'Research' },
      { id: 'question', title: 'Question' },
      { id: 'reframe', title: 'Reframe' },
      { id: 'create', title: 'Create' },
      { id: 'refine', title: 'Refine' },
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
      { id: 'phone', label: '+965 12345678', href: 'tel:+96512345678' },
    ],
  },
};
