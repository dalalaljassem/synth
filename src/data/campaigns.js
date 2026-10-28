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

/** A client's campaigns: [{ slug, number, title, text, palette, slides, cover }] */
export function campaignsFor(project) {
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
      cover: group.slides[0].image,
    };
  });
}

/** Every published client, in project order */
export function formedClients() {
  return projects
    .filter((project) => project.status === 'published' && !NOT_CLIENTS.includes(project.slug))
    .map((project) => ({ ...project, campaigns: campaignsFor(project) }));
}
