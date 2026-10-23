/**
 * Lists every image the content data expects that is not in /public yet.
 * Usage: npm run check:assets
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { siteContent } from '../src/data/siteContent.js';
import { projects } from '../src/data/projects.js';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');

const expected = [
  siteContent.brand.logo.src,
  ...siteContent.archive.items.map((item) => item.image),
  ...projects.flatMap((project) => [
    ...(project.logo ? [project.logo.src] : []),
    ...project.slides.map((slide) => slide.image),
  ]),
];

const missing = expected.filter((src) => !existsSync(path.join(publicDir, src)));

if (missing.length === 0) {
  console.log(`✓ All ${expected.length} images present.`);
} else {
  console.log(`${missing.length} of ${expected.length} images missing:\n`);
  const byFolder = missing.reduce((groups, src) => {
    const folder = path.dirname(src);
    (groups[folder] ||= []).push(path.basename(src));
    return groups;
  }, {});
  for (const [folder, files] of Object.entries(byFolder)) {
    console.log(`  public${folder}/  (${files.length})`);
    console.log(`    ${files.join(', ')}`);
  }
}
