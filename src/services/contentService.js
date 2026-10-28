/**
 * Content service — the ONLY place components get content from.
 *
 * Phase 1 (now): resolves static data from /src/data.
 * Phase 2 (admin): swap these bodies for fetch() calls to the API, e.g.
 *   const response = await fetch(`${API_URL}/projects/${slug}`);
 * Components and hooks stay untouched because the return shapes match.
 */

import { siteContent } from '@/data/siteContent';
import { projects } from '@/data/projects';
import { formedClients } from '@/data/campaigns';

const isPublished = (project) => project.status === 'published';

export async function getSiteContent() {
  return siteContent;
}

/** Lightweight list for navigation (menu, archive links). */
export async function getProjectSummaries() {
  return projects.filter(isPublished).map(({ slug, name }) => ({ slug, name }));
}

/** Full project by slug, or null when missing / unpublished. */
export async function getProjectBySlug(slug) {
  const project = projects.find((item) => item.slug === slug);
  return project && isPublished(project) ? project : null;
}

/** synth.formed: every client with its campaigns (client → campaigns → campaign). */
export async function getFormedClients() {
  return formedClients();
}

/** One client (with campaigns) by slug, or null. */
export async function getFormedClient(slug) {
  return formedClients().find((client) => client.slug === slug) ?? null;
}
