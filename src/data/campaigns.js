/**
 * synth.formed hierarchy: Client → Campaigns → Campaign (text + images).
 *
 * Campaigns are derived from each project's slides: consecutive slides that
 * share a caption form one campaign, and that caption is its text.
 * Titles below are DRAFT working names — rename freely; order = slide order.
 */
import { projects } from '@/data/projects';

/** Projects that are not synth.formed clients */
const NOT_CLIENTS = ['synth', 'project-test'];

const CAMPAIGN_TITLES = {
  marzook: ['Snow', 'Everyday Kuwait', 'Fawazeer', 'Marbella', 'Riyadh Debut', 'Fall', 'Crescent', 'Morning Ritual', 'Summer', 'Holiday', 'Pearl'],
  thuna: ['Eid'],
  'maison-du-chocolatier': ['Nocturne'],
  neighbourhood: ['City Takeover', 'Football'],
  principale: ['Ombra di Limone'],
  'nice-bun': ['World Cup', 'Summer'],
  'atyab-al-marshoud': ['Century', 'Marbella Edition'],
  bocado: ['Bold Red'],
  'better-from-scratch': ['Pink World'],
  runch: ['Inside Out'],
  bunboy: ['Toast & Buns'],
  sprei: ['Still Life'],
  'garys-matcha': ['Matcha Cat'],
  'studio-sweat': ['Stay Spicy', 'The Sculpt Formula', 'House of Cards'],
  'gallerie-by-gigis': ['Precious Objects'],
  'the-pastry-studio': ['Golden Table', 'Pastry Stand'],
  'while-im-baked': ['Diner Spread'],
  'posture-boutique': ['Everyday Comfort'],
  'oh-g': ['Full Colour'],
  'e-studio': ['Deck of Cards'],
};

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* ---------- Explicit campaigns ----------
   For clients whose images were sorted into named campaign folders, the
   campaigns are listed here instead of being guessed from captions.
   slides: a number = that project slide (slide-NN.jpg, keeping its palette
   and caption); a string = a new image in /images/projects/<slug>/<name>.jpg;
   { video: name } = a muted loop from /videos/projects/<slug>/<name>.mp4.
   text: omitted = the caption of the campaign's first numbered slide.
   cover: a wide landscape image for the campaign card (default: first image).
   Texts marked DRAFT are placeholders until the final copy is in. */
const CAMPAIGNS = {
  marzook: [
    { title: 'Snow', slides: [1, 2, 3] },
    { title: 'Everyday Kuwait', slides: [4, 5, 6] },
    { title: 'Fawazeer Collection', slides: [7, 8, 9], cover: 'cover-fawazeer' },
    { title: 'Day Off at Marbella', slides: [10, 'marbella-1', 'marbella-2', 'marbella-3', 'marbella-4'] },
    {
      title: 'Riyadh Drop',
      slides: [11, 12, 13, 14, 'riyadh-1', { video: 'riyadh-video-1' }, { video: 'riyadh-video-2' }, { video: 'riyadh-video-3' }, { video: 'riyadh-video-4' }, { video: 'riyadh-video-5' }],
    },
    { title: 'Silver Riot', slides: [15, 16, 17, 'silver-riot-1', { video: 'silver-riot-video-1' }, { video: 'silver-riot-video-2' }] },
    { title: 'Crescent', slides: [18, 19, 20, { video: 'crescent-video' }] },
    { title: 'Breakfast at Marzook', slides: [21, 22, 23], cover: 'cover-breakfast' },
    { title: 'Summer Campaign', slides: [24, 25, 26, 'summer-1', 'summer-2', 'summer-3', 'summer-4', { video: 'summer-video' }] },
    { title: 'Holiday Edit', slides: [27, 28, 29, 'holiday-1', 'holiday-2', 'holiday-3'] },
    { title: 'Pearl Collection', slides: [30, 31, 'pearl-1', 'pearl-2', { video: 'pearl-video-1' }, { video: 'pearl-video-2' }] },
  ],
  'gallerie-by-gigis': [
    { title: 'Valentine', slides: [1, 2, 3, 4, 5, 10, 'valentine-1', 'valentine-2'], cover: 'cover-valentine' },
    {
      title: 'September Bloom',
      slides: ['september-1', 'september-2', 'september-3', 'september-4', { video: 'september-video' }],
      // DRAFT copy, replace with the final description
      text: 'An autumn edit for Gallerie by Gigis: a fawn-print pouch beside a real fawn, cherry pies tied with satin and claw clips among berries and pastry. A soft, storybook take on the season.',
    },
    {
      title: 'JetSetter',
      slides: [7, 'jetsetter-1', 'jetsetter-2'],
      cover: 'cover-jetsetter',
      // DRAFT copy, replace with the final description
      text: 'Travel sets laid out like luggage on an airport conveyor belt, in navy, powder blue and grey: everything a jetsetter packs, from headphones to claw clips.',
    },
    {
      title: 'Grocery Edit',
      slides: [8, 'grocery-1', 'grocery-2'],
      cover: 'cover-grocery',
      // DRAFT copy, replace with the final description
      text: 'Gigis essentials dropped into supermarket baskets with lemons, greens and snacks: an everyday grocery run turned into a styled still life.',
    },
    {
      title: 'Branding',
      slides: [6, 'branding-1', 'branding-2', 'branding-3', 'branding-4', 'branding-5'],
      cover: 'cover-branding',
      // DRAFT copy, replace with the final description
      text: 'The Gallerie by Gigis identity: a scripted monogram, scrapbook logo studies, stitched labels and thread, built around craft and keepsakes.',
    },
    {
      title: 'Eid',
      slides: ['eid-1', 'eid-2', 'eid-3', 'eid-4', 'eid-5'],
      // DRAFT copy, replace with the final description
      text: 'An Eid gift box for Gallerie by Gigis: striped blue packaging, a sleep set and a little theatre of folded pieces, made to be given and unwrapped.',
    },
  ],
  'studio-sweat': [
    { title: 'Stay Spicy', slides: [1, 2, 3, 4, 5, 6, { video: 'stay-spicy-video' }], cover: 'cover-stay-spicy' },
    { title: 'The Sculpt Formula', slides: [7, 8, 9, 10, 11] },
    { title: 'House of Cards', slides: [12, 13, 14, 15], cover: 'cover-house-of-cards' },
  ],
  principale: [{ title: 'Ombra di Limone', slides: [1, 2, 3, 4, 'ombra-1', 'ombra-2', 'ombra-3', 'ombra-4'] }],
};

/* Landscape covers for clients whose campaigns are still derived from captions */
const COVERS = {
  'atyab-al-marshoud': { century: 'cover-century', 'marbella-edition': 'cover-marbella-edition' },
  sprei: { 'still-life': 'cover-still-life' },
  neighbourhood: { 'city-takeover': 'cover-city-takeover', football: 'cover-football' },
  'oh-g': { 'full-colour': 'cover-full-colour' },
  'e-studio': { 'deck-of-cards': 'cover-deck-of-cards' },
  'better-from-scratch': { 'pink-world': 'cover-pink-world' },
  'nice-bun': { summer: 'cover-summer' },
};

const imagePath = (slug, name) => `/images/projects/${slug}/${name}.jpg`;

function explicitCampaigns(project, list) {
  return list.map((item, index) => {
    const slides = item.slides.map((ref, i) => {
      if (typeof ref === 'number') return project.slides[ref - 1];
      if (typeof ref === 'string') {
        return { id: `${project.slug}-${ref}`, image: imagePath(project.slug, ref), alt: '', focus: '50% 50%' };
      }
      return {
        id: `${project.slug}-${ref.video}`,
        video: `/videos/projects/${project.slug}/${ref.video}.mp4`,
        image: imagePath(project.slug, `${ref.video}-poster`),
        alt: '',
        focus: '50% 50%',
        key: i,
      };
    }).filter(Boolean);
    const firstNumbered = item.slides.find((ref) => typeof ref === 'number');
    const source = firstNumbered ? project.slides[firstNumbered - 1] : null;
    return {
      slug: toSlug(item.title),
      number: String(index + 1).padStart(2, '0'),
      title: item.title,
      text: item.text ?? source?.caption ?? project.description,
      palette: source?.palette ?? (firstNumbered ? project.palette : []),
      slides,
      cover: item.cover ? imagePath(project.slug, item.cover) : slides[0].image,
    };
  });
}

/** A client's campaigns: [{ slug, number, title, text, palette, slides, cover }] */
export function campaignsFor(project) {
  if (CAMPAIGNS[project.slug]) return explicitCampaigns(project, CAMPAIGNS[project.slug]);
  const groups = [];
  project.slides.forEach((slide) => {
    const text = slide.caption ?? project.description;
    const last = groups[groups.length - 1];
    if (last && last.text === text) last.slides.push(slide);
    else groups.push({ text, slides: [slide] });
  });
  const titles = CAMPAIGN_TITLES[project.slug] ?? [];
  return groups.map((group, index) => {
    const title = titles[index] ?? `Campaign ${index + 1}`;
    return {
      slug: toSlug(title),
      number: String(index + 1).padStart(2, '0'),
      title,
      text: group.text,
      palette: group.slides[0].palette ?? project.palette,
      slides: group.slides,
      cover: COVERS[project.slug]?.[toSlug(title)]
        ? imagePath(project.slug, COVERS[project.slug][toSlug(title)])
        : group.slides[0].image,
    };
  });
}

/** Every published client, in project order */
export function formedClients() {
  return projects
    .filter((project) => project.status === 'published' && !NOT_CLIENTS.includes(project.slug))
    .map((project) => ({ ...project, campaigns: campaignsFor(project) }));
}
