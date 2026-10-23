/**
 * Projects shown in the menu and on /projects/:slug.
 *
 * Static for now. In the admin phase this becomes `GET /api/projects` and
 * `GET /api/projects/:slug` — keep this shape:
 *
 * Project {
 *   slug         string   URL segment, unique
 *   name         string   display / menu name
 *   status       'published' | 'draft'
 *   textTone     'light' | 'dark'   overlay text colour (light = white text on dark imagery)
 *   background   string   colour shown behind / before images load
 *   logo         { src, srcLight?, alt, width, height } | null   client wordmark (falls back to name);
 *                srcLight = white version, used on slides with logoVariant: 'light'
 *   description  string   campaign caption
 *   palette      string[] default palette for every slide (empty = hidden)
 *   slides       Slide[]
 * }
 *
 * Slide {
 *   id           string
 *   image        string   path under /public
 *   alt          string
 *   focus        string   CSS object-position, e.g. '50% 50%'
 *   palette      string[] optional — overrides project palette
 *   caption      string   optional — overrides project description (series with their own copy)
 *   showCaption  boolean  optional — defaults to true
 *   textTone     'light' | 'dark'  optional — overrides project textTone for this slide
 *   logoVariant  'light'  optional — show logo.srcLight on this slide
 * }
 *
 * Image convention: /public/images/projects/<slug>/slide-01.jpg … and logo.png
 */

const PROJECT_IMAGE_ROOT = '/images/projects';

/**
 * Build `count` slides following the file naming convention.
 * Any number of override sets ({ [slideNumber]: props }) can be passed; they merge in order.
 */
function buildSlides(slug, count, ...overrideSets) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const overrides = Object.assign({}, ...overrideSets.map((set) => set[index + 1] ?? {}));
    return {
      id: `${slug}-slide-${number}`,
      image: `${PROJECT_IMAGE_ROOT}/${slug}/slide-${number}.jpg`,
      alt: '',
      focus: '50% 50%',
      ...overrides,
    };
  });
}

/** Slides whose Figma frame uses the white version of the client logo. */
function lightLogoOn(numbers) {
  return Object.fromEntries(numbers.map((number) => [number, { logoVariant: 'light' }]));
}

/** Per-slide text tone, measured from how light each photo is behind the caption. */
function tones(list, offset = 0) {
  return Object.fromEntries(list.map((textTone, index) => [index + 1 + offset, { textTone }]));
}

function logoFor(slug, alt, width, height) {
  return { src: `${PROJECT_IMAGE_ROOT}/${slug}/logo.png`, alt, width, height };
}

/** Apply the same slide overrides to slides `from`…`to` (1-based, inclusive). */
function series(from, to, props) {
  const overrides = {};
  for (let number = from; number <= to; number += 1) overrides[number] = props;
  return overrides;
}

/*
 * Palettes and captions are copied from the Figma frames, left to right.
 * Frames that still carry another project's copy, the "football" filler text,
 * or a palette duplicated from another project are left empty here.
 */

const MARZOOK = {
  snow: {
    caption:
      'A conceptual spin-off placing coin purses within surreal snow-covered landscapes, transforming them into sculptural objects suspended in cinematic, winter-driven editorial scenes.',
    palette: ['#b82d3a', '#f3f2ea', '#93aed1', '#ceaa7d', '#577da9'],
  },
  kuwait: {
    caption:
      'A campaign that places Marzook’s signature purses within the familiar visual language of everyday Kuwait, creating a playful dialogue between luxury and local culture.',
    palette: ['#ae687d', '#eaf2f6', '#962746', '#ab9d7a', '#8990ae'],
  },
  fawazeer: {
    caption:
      'A campaign inspired by Ramadan fawazeer, drawing on elements from Sherihan and Nelly’s performances and wardrobe.',
    palette: ['#403b45', '#e9dcf2', '#b69054', '#951502', '#7e4f57'],
  },
  marbella: {
    caption:
      'Set in Marbella’s sunlit coastlines, this campaign reimagines Marzook’s summer bags in editorial beach scenes. Raffia textures, pearl finishes, and coastal styling create sculptural moments of quiet luxury.',
    palette: ['#7f5057', '#f3f2ea', '#ae712c', '#7d4427'],
  },
  riyadh: {
    caption:
      'A cinematic prelude. Glimpses of the journey—bags packed, doors flung open, and a rooftop view—build anticipation for Marzook’s Riyadh debut. A visual countdown steeped in mystery, motion, and destination glam.',
    palette: ['#e6dbf0', '#f3f2ea', '#9e595c', '#4ea8f3', '#397cf9'],
  },
  fall: {
    caption:
      'A fall campaign showcasing Marzook’s bedazzled coin purses, and fan bags, styled with caviar and luxury elements in rich, editorial, high-fashion compositions.',
    palette: ['#000100', '#f3f2ea', '#404c2e', '#8c010f', '#7d4427'],
  },
  ramadan: {
    caption:
      'A Ramadan campaign featuring Marzook’s crescent bag, reimagined through cinematic, moonlit visuals inspired by tradition, ritual, and elevated storytelling.',
    palette: ['#000100', '#f3f2ea', '#bc924e', '#f1ddaf', '#9a9b92'],
  },
  morning: {
    caption:
      'A surreal morning ritual unfolds through luxurious, chaotic still-lifes featuring Marzook bags styled with breakfast props—croissants, lipstick, and glam clutter—redefining everyday indulgence as a high-fashion editorial.',
    palette: ['#493346', '#a2232c', '#cc8135', '#b9934f', '#1d1507'],
  },
  summer: {
    caption:
      'This campaign reimagines Marzook’s summer bags in editorial beach scenes. Raffia textures, leather clutch finishes, and coastal styling create playful, intimate moments.',
    palette: ['#7a522a', '#891014', '#77adc9', '#083250', '#cee0e8'],
  },
  holiday: {
    caption:
      'A holiday campaign showcasing Marzook’s statement pieces through festive, cinematic scenes, blending rich textures, sparkle, and elevated luxury with a refined, celebratory editorial aesthetic.',
    palette: ['#000100', '#f3f2ea', '#300605', '#8c010f', '#8b8884'],
  },
  pearl: {
    caption:
      'A poetic campaign positioning pearl clutch bags as sculptural treasures. Inspired by Kuwait’s pearl-diving past, visuals combine sea, sand, and editorial stillness—no humans, only timeless objects unearthed from coastal memory.',
    palette: ['#7c130f', '#c0a995', '#dccec7', '#877975', '#e6e3d8'],
  },
};

const MARZOOK_KUWAIT_PALETTES = {
  5: ['#261816', '#f3f2ea', '#b9392a', '#9e7b6a', '#d0aaa8'],
  6: ['#1667aa', '#f3f2ea', '#74d0fa', '#1d2126', '#7d3332'],
};
const MARZOOK_RIYADH_PALETTE_B = ['#8aaabc', '#f3f2ea', '#7d5d39', '#8c010f', '#4b3543'];

const THUNA_PALETTE_A = ['#5c2d34', '#f3f2ea', '#362427', '#844842', '#381926'];
const THUNA_PALETTE_B = ['#21271b', '#f3f2ea', '#89787b', '#c7c5b3', '#12191d'];
const PRINCIPALE_PALETTE = ['#000100', '#f3f2ea', '#404c2e', '#8c010f', '#7d4427'];
const MAISON_PALETTE = ['#d8b768', '#59392d', '#8f1c07', '#ae9781', '#ebe9db'];
const NEIGHBOURHOOD_PALETTE = ['#f5ecdd', '#f7dd4e', '#c68f33', '#548c3c', '#523b13', '#589ea3'];
const RUNCH_PALETTE = ['#fdd1c6', '#ff9999', '#fd585f', '#fea2b6', '#f0efef'];
const GARYS_MATCHA_PALETTE = ['#11212c', '#54b366', '#dcd5c2', '#c8dbe5', '#511102'];
const STUDIO_SWEAT_SCULPT_PALETTE = ['#aeaeaf', '#111117', '#c7c0ac', '#424144', '#d5d2c3'];
const STUDIO_SWEAT_CARDS_PALETTE = ['#350d12', '#6f2427', '#5d5e35', '#d1c3ac', '#c82c35'];
const NICE_BUN_WORLD_CUP_PALETTE = ['#133340', '#3bab52', '#dcd5c2', '#c8dbe5', '#524e8b'];
const NICE_BUN_SUMMER_PALETTE = ['#1b2a4a', '#87ceeb', '#f4c2c2', '#ef8e5a', '#f5e6a3'];

/* Extracted from the campaign photography (dark → light) where Figma has no palette yet */
const BOCADO_PALETTE = ['#310502', '#5c0b0b', '#a40e0f', '#cb5451', '#e58481'];
const BETTER_FROM_SCRATCH_PALETTE = ['#8a4e29', '#ab6e32', '#bd8773', '#cd972a', '#ddafaa'];
const BUNBOY_PALETTE = ['#54271d', '#763d1f', '#a06335', '#c68c54', '#d3b795'];
const SYNTH_OBJECTS_PALETTE = ['#34120d', '#811b1f', '#d4a642', '#e1ddd6', '#f5e89d'];
const SPREI_PALETTE = ['#0c0403', '#370a06', '#571b0d', '#79260e', '#ce7510'];
const STUDIO_SWEAT_SPICY_PALETTE = ['#4d1616', '#841717', '#c22930', '#b98474', '#efeee6'];
const GALLERIE_PALETTE = ['#4e1c15', '#962422', '#8f675f', '#cc9e92', '#dbd1d0'];
const PASTRY_TABLE_PALETTE = ['#975b23', '#b7783f', '#b8977a', '#cb9b49', '#e7d9a4'];
const PASTRY_STAND_PALETTE = ['#853931', '#cb5e50', '#938f50', '#b98987', '#cca7a4'];
const OH_G_PALETTE = ['#4d271f', '#863630', '#b2724d', '#e09c29', '#e3c8c5'];
const ATYAB_CENTURY_PALETTE = ['#131210', '#3b3b39', '#7e848a', '#a4a5a9', '#c5c2c3'];
const ATYAB_MARBELLA_PALETTE = ['#7d220f', '#c82a22', '#925b0a', '#a7a5a2', '#f1b721'];
const E_STUDIO_PALETTE = ['#030502', '#7e1313', '#c02622', '#cab3a0', '#d3d1cd'];
const POSTURE_BOUTIQUE_PALETTE = ['#1c0608', '#6f171b', '#911c08', '#b68969', '#d1a581'];
const WHILE_IM_BAKED_PALETTE = ['#743624', '#a95e33', '#d0935e', '#e0b41a', '#e5e4dc'];

/* Draft captions — written from the imagery; replace with final copy when ready */
const STUDIO_SWEAT_SPICY_CAPTION =
  'Stay Spicy. Studio Sweat’s athleisure identity turned up with red chillies, copper weights, branded tees and signature drinks — a cheeky take on heat, effort and studio culture.';
const STUDIO_SWEAT_SCULPT_CAPTION =
  'The Sculpt Formula: a clean, monochrome series built around the studio’s signature programme. Chrome cans, laptops and quiet movement on the mat frame training as a precise, considered ritual.';
const STUDIO_SWEAT_CARDS_CAPTION =
  'Studio Sweat’s membership cards reimagined as a house of cards — deep red, gold-foiled and carefully balanced, a playful nod to the commitment behind every session.';
const PASTRY_TABLE_CAPTION =
  'The Pastry Studio’s signature loaves and cakes styled across golden tables, with flowing tea, pearls, roses and polished silverware for an indulgent afternoon spread.';
const PASTRY_STAND_CAPTION =
  'A pink pastry stand drops into the city, rolling out a striped carpet past towers and olive groves — turning a dessert counter into a destination.';
const ATYAB_CENTURY_CAPTION =
  'Century by Atyab Al Marshoud, a fragrance celebrating 100 years, captured in chrome and light. Liquid metal, mirrored surfaces and sculptural reflections frame the bottle as a modern heirloom.';
const ATYAB_MARBELLA_CAPTION =
  '4 Marshoud, Marbella Edition: a bright yellow bottle balanced among raspberries, vanilla pods and driftwood, translating sweet, fruity notes into a sunlit still life.';

const NICE_BUN_WORLD_CUP_CAPTION =
  'Nice Bun meets World Cup energy. The burger spot’s identity fused with football culture, merch, food items, and stickers showcased with a World Cup aesthetic. A playful collision of burger branding, football hype, and street style.';
const NICE_BUN_SUMMER_CAPTION =
  'A vibrant summer concept showcasing Nice Bun’s seasonal soft serves and signature slushies in elevated coastal settings. Playful compositions and contemporary resort aesthetics capture the refreshing energy of summer.';
const NEIGHBOURHOOD_CITY_CAPTION =
  'NBR’s newest branch has taken over & dropped into the heart of Mansouriya, impossible to ignore. Giant NBR products integrated into real city footage. A soft-serve dispenser the size of a building. The NBR cat roaming the streets. The entire city becomes NBR’s newest branch.';
const NEIGHBOURHOOD_FOOTBALL_CAPTION =
  'A football-inspired campaign for Neighbourhood, transforming the dessert shop’s treats into a playful world of sport. Football cues, formations, and objects are reimagined through desserts to bring the brand’s playful identity to life.';

export const projects = [
  {
    slug: 'marzook',
    name: 'Marzook',
    status: 'published',
    textTone: 'light',
    background: '#777f8a',
    logo: logoFor('marzook', 'Marzook', 1200, 183),
    description: MARZOOK.snow.caption,
    palette: MARZOOK.snow.palette,
    // Twelve campaigns, in the order of the Figma slide indicator.
    slides: buildSlides(
      'marzook',
      31,
      series(1, 3, MARZOOK.snow),
      series(4, 6, MARZOOK.kuwait),
      { 5: { palette: MARZOOK_KUWAIT_PALETTES[5] }, 6: { palette: MARZOOK_KUWAIT_PALETTES[6] } },
      series(7, 9, MARZOOK.fawazeer),
      series(10, 10, MARZOOK.marbella),
      series(11, 12, MARZOOK.riyadh),
      series(13, 14, { ...MARZOOK.riyadh, palette: MARZOOK_RIYADH_PALETTE_B }),
      series(15, 17, MARZOOK.fall),
      series(18, 20, MARZOOK.ramadan),
      series(21, 23, MARZOOK.morning),
      series(24, 26, MARZOOK.summer),
      series(27, 29, MARZOOK.holiday),
      series(30, 31, MARZOOK.pearl),
      tones(['dark', 'dark', 'dark', 'light', 'light', 'light', 'light', 'light', 'dark', 'light', 'dark', 'dark', 'light', 'light', 'light', 'light', 'dark', 'light', 'light', 'dark', 'dark', 'dark', 'light', 'light', 'dark', 'dark', 'dark', 'light', 'light', 'dark', 'dark']),
    ),
  },
  {
    slug: 'thuna',
    name: 'Thuna',
    status: 'published',
    textTone: 'light',
    background: '#988b89',
    logo: logoFor('thuna', 'Thuna', 1072, 194),
    description: 
      'An Eid campaign for Thuna featuring heels and a bag from their collection, styled through editorial, lifestyle, and in-studio photoshoot scenes capturing refined, modern moments. — An imagined campaign created for experimental and visual exploration purposes.',
    palette: THUNA_PALETTE_A,
    slides: buildSlides(
      'thuna',
      6,
      series(4, 6, { palette: THUNA_PALETTE_B, showCaption: false }),
      tones(['light', 'dark', 'dark', 'light', 'light', 'light']),
    ),
  },
  {
    slug: 'maison-du-chocolatier',
    name: 'Maison du Chocolatier',
    status: 'published',
    textTone: 'light',
    background: '#a48350',
    logo: logoFor('maison-du-chocolatier', 'Maison du Chocolatier', 1200, 512),
    description: 
      'A decadent nocturnal moodboard where chocolate becomes ceremonial, framed through red velvet tones, shadow, crystal reflections, and theatrical dessert styling.',
    palette: MAISON_PALETTE,
    slides: buildSlides(
      'maison-du-chocolatier',
      6,
      tones(['light', 'dark', 'dark', 'light', 'dark', 'dark']),
    ),
  },
  {
    slug: 'neighbourhood',
    name: 'Neighbourhood',
    status: 'published',
    textTone: 'light',
    background: '#9b846f',
    logo: logoFor('neighbourhood', 'Neighbourhood', 1200, 379),
    description: NEIGHBOURHOOD_CITY_CAPTION,
    palette: NEIGHBOURHOOD_PALETTE,
    // NBHOOD A 1–15 (city takeover), then NBHOOD B 1–5 (football).
    slides: buildSlides(
      'neighbourhood',
      20,
      series(16, 20, { caption: NEIGHBOURHOOD_FOOTBALL_CAPTION }),
      tones(['light', 'dark', 'light', 'dark', 'light', 'light', 'light', 'light', 'light', 'dark', 'light', 'light', 'light', 'light', 'light', 'light', 'light', 'light', 'dark', 'dark']),
    ),
  },
  {
    slug: 'principale',
    name: 'Principale',
    status: 'published',
    textTone: 'light',
    background: '#5b4833',
    logo: logoFor('principale', 'Principale', 1200, 356),
    description: 
      'Inspired by Italian chiaroscuro, Ombra di Limone transforms PRINCIPALE’s seasonal menu into intimate, painterly still lifes. Dramatic shadows, warm light, and citrus accents turn each dish into a work of art.',
    palette: PRINCIPALE_PALETTE,
    slides: buildSlides(
      'principale',
      4,
      tones(['light', 'light', 'dark', 'light']),
    ),
  },
  {
    slug: 'nice-bun',
    name: 'Nice Bun',
    status: 'published',
    textTone: 'light',
    background: '#133340',
    logo: logoFor('nice-bun', 'Nice Bun', 1200, 290),
    description: NICE_BUN_WORLD_CUP_CAPTION,
    palette: NICE_BUN_WORLD_CUP_PALETTE,
    // World Cup (1–3), then Summer (4–6).
    slides: buildSlides(
      'nice-bun',
      6,
      series(4, 6, { caption: NICE_BUN_SUMMER_CAPTION, palette: NICE_BUN_SUMMER_PALETTE }),
      tones(['light', 'dark', 'light', 'dark', 'light', 'light']),
    ),
  },
  {
    slug: 'atyab-al-marshoud',
    name: 'Atyab Al Marshoud',
    status: 'published',
    textTone: 'light',
    background: '#1a1a1a',
    logo: logoFor('atyab-al-marshoud', 'Atyab Al Marshoud', 1200, 475),
    description: ATYAB_CENTURY_CAPTION,
    palette: ATYAB_CENTURY_PALETTE,
    // Century (1–3), then 4 Marshoud Marbella Edition (4–5).
    slides: buildSlides(
      'atyab-al-marshoud',
      5,
      series(4, 5, { caption: ATYAB_MARBELLA_CAPTION, palette: ATYAB_MARBELLA_PALETTE }),
      tones(['dark', 'light', 'dark', 'light', 'dark']),
    ),
  },
  {
    slug: 'bocado',
    name: 'Bocado',
    status: 'published',
    textTone: 'light',
    background: '#93584e',
    logo: logoFor('bocado', 'Bocado', 1200, 186),
    description: 
      'A bold red campaign for Bocado, where matcha, crispy sides and branded packaging are staged in saturated, monochrome sets. Glossy surfaces, ice and tiled interiors turn a quick bite into a graphic, unmistakable moment.',
    palette: BOCADO_PALETTE,
    slides: buildSlides(
      'bocado',
      3,
      tones(['light', 'light', 'light']),
    ),
  },
  {
    slug: 'better-from-scratch',
    name: 'Better From Scratch',
    status: 'published',
    textTone: 'light',
    background: '#c19588',
    logo: logoFor('better-from-scratch', 'Better From Scratch', 1200, 319),
    description: 
      'A soft pink world for Better From Scratch. Branded cups, golden bakes and morning coffee move from hand to breakfast table to a dreamy garden, capturing comfort food made with care.',
    palette: BETTER_FROM_SCRATCH_PALETTE,
    slides: buildSlides(
      'better-from-scratch',
      3,
      tones(['light', 'dark', 'light']),
    ),
  },
  {
    slug: 'runch',
    name: 'Runch!',
    status: 'published',
    textTone: 'dark',
    background: '#f4c9bd',
    logo: logoFor('runch', 'Runch!', 1200, 365),
    description: 
      'INSIDE OUT is an editorial concept built around revealing what makes the product special. Through cross-sections, macro textures, broken shells, and indulgent fillings, each visual celebrates the satisfying moment the chocolate opens up to reveal its rich interior.',
    palette: RUNCH_PALETTE,
    // Figma RUNCH 1 and RUNCH 4 (RUNCH 2 duplicates 4; RUNCH 5 has no photo).
    slides: buildSlides(
      'runch',
      2,
      tones(['dark', 'dark']),
    ),
  },
  {
    slug: 'bunboy',
    name: 'Bunboy',
    status: 'published',
    textTone: 'light',
    background: '#b19e90',
    logo: logoFor('bunboy', 'Bunboy', 1200, 333),
    description: 
      'Bunboy’s playful identity comes to life through oversized toast lettering, glazed cinnamon buns and slow coffee mornings. Warm, crumbly textures and a cheeky mascot keep every frame full of character.',
    palette: BUNBOY_PALETTE,
    // Figma order runs BUN BOY 3 → 1.
    slides: buildSlides(
      'bunboy',
      3,
      tones(['light', 'light', 'dark']),
    ),
  },
  {
    slug: 'synth',
    name: 'Synth',
    status: 'published',
    textTone: 'light',
    background: '#c5b8ac',
    logo: { src: '/images/brand/synth-display.svg', alt: 'SYNTH', width: 3719, height: 927 },
    description: 
      'SYNTH Objects reimagines familiar furniture as sculptural forms. Chocolate-dipped stools, woven ottomans on red plinths and a striped café chair blur the line between product, dessert and design object.',
    palette: SYNTH_OBJECTS_PALETTE,
    // The "CHAIRS" frames (CHAIRS 3 → 1).
    slides: buildSlides(
      'synth',
      3,
      tones(['dark', 'light', 'dark']),
    ),
  },
  {
    slug: 'sprei',
    name: 'Sprei',
    status: 'published',
    textTone: 'light',
    background: '#22221a',
    logo: logoFor('sprei', 'Sprei', 1200, 483),
    description: 
      'A moody, painterly campaign for Spréi home fragrances. Each bottle is staged like an old-master still life — fruit, florals, smoke and velvet translating its scent into colour, texture and atmosphere.',
    palette: SPREI_PALETTE,
    slides: buildSlides(
      'sprei',
      3,
      tones(['light', 'light', 'light']),
    ),
  },
  {
    slug: 'garys-matcha',
    name: 'Gary’s Matcha',
    status: 'published',
    textTone: 'light',
    background: '#c9d4c7',
    logo: logoFor('garys-matcha', 'Gary’s Matcha', 1200, 695),
    description: 
      'Gary’s Matcha brings its playful cat mascot into everyday moments — iced matcha lattes held up close, carried in socks and paper trays, and toasted-marshmallow cups surrounded by branded lids.',
    palette: GARYS_MATCHA_PALETTE,
    slides: buildSlides(
      'garys-matcha',
      3,
      tones(['dark', 'dark', 'dark']),
    ),
  },
  {
    slug: 'studio-sweat',
    name: 'Studio Sweat',
    status: 'published',
    textTone: 'light',
    background: '#88534c',
    logo: { ...logoFor('studio-sweat', 'Studio Sweat', 1200, 289), srcLight: `${PROJECT_IMAGE_ROOT}/studio-sweat/logo-light.png` },
    description: STUDIO_SWEAT_SPICY_CAPTION,
    palette: STUDIO_SWEAT_SPICY_PALETTE,
    // STUDIO SWEAT 1–6 (Stay Spicy), A–E (The Sculpt Formula), cards 1–4.
    slides: buildSlides(
      'studio-sweat',
      15,
      series(7, 11, { caption: STUDIO_SWEAT_SCULPT_CAPTION, palette: STUDIO_SWEAT_SCULPT_PALETTE }),
      series(12, 15, { caption: STUDIO_SWEAT_CARDS_CAPTION, palette: STUDIO_SWEAT_CARDS_PALETTE }),
      lightLogoOn([1, 3, 5, 7, 9, 11]),
      tones(['light', 'light', 'light', 'dark', 'light', 'dark', 'light', 'dark', 'dark', 'dark', 'dark', 'light', 'light', 'light', 'dark']),
    ),
  },
  {
    slug: 'gallerie-by-gigis',
    name: 'Gallerie by Gigis',
    status: 'published',
    textTone: 'light',
    background: '#a38878',
    logo: logoFor('gallerie-by-gigis', 'Gallerie by Gigis', 1200, 840),
    description: 
      'Gallerie by Gigis presents its hair accessories as precious objects — claw clips nestled in chocolate boxes, satin hearts and candy jars — then carries them into everyday life through gym bags, shopping trolleys and ice.',
    palette: GALLERIE_PALETTE,
    slides: buildSlides(
      'gallerie-by-gigis',
      10,
      tones(['light', 'dark', 'light', 'light', 'dark', 'dark', 'light', 'light', 'dark', 'dark']),
    ),
  },
  {
    slug: 'the-pastry-studio',
    name: 'The Pastry Studio',
    status: 'published',
    textTone: 'light',
    background: '#caad86',
    logo: logoFor('the-pastry-studio', 'The Pastry Studio', 1066, 883),
    description: PASTRY_TABLE_CAPTION,
    palette: PASTRY_TABLE_PALETTE,
    // Table series (PASTRY 3 → 1), then the pink stand (PASTRY 4–6).
    slides: buildSlides(
      'the-pastry-studio',
      6,
      series(4, 6, { caption: PASTRY_STAND_CAPTION, palette: PASTRY_STAND_PALETTE }),
      tones(['light', 'dark', 'dark', 'light', 'dark', 'dark']),
    ),
  },
  {
    slug: 'while-im-baked',
    name: 'While I’m Baked',
    status: 'published',
    textTone: 'light',
    background: '#7a5a43',
    logo: logoFor('while-im-baked', 'While I’m Baked', 1200, 261),
    description: 
      'While I’m Baked serves a full diner-style spread — stacked pancakes, maple syrup, coffee and its own za’atar seasoning — styled from above as a generous, all-day breakfast table.',
    palette: WHILE_IM_BAKED_PALETTE,
    slides: buildSlides(
      'while-im-baked',
      1,
      tones(['light']),
    ),
  },
  {
    slug: 'posture-boutique',
    name: 'Posture Boutique',
    status: 'published',
    textTone: 'light',
    background: '#6f3a2c',
    logo: { ...logoFor('posture-boutique', 'Posture Boutique', 1200, 476), srcLight: `${PROJECT_IMAGE_ROOT}/posture-boutique/logo-light.png` },
    description: 
      'A tongue-in-cheek campaign for Posture Boutique — matching sets on a supermarket run, a popsicle melting into the sand and a toaster that’s burnt out — everyday moments that call for comfort, recovery and good posture.',
    palette: POSTURE_BOUTIQUE_PALETTE,
    slides: buildSlides(
      'posture-boutique',
      3,
      lightLogoOn([1, 3]),
      tones(['light', 'dark', 'light']),
    ),
  },
  {
    slug: 'oh-g',
    name: 'Oh G!',
    status: 'published',
    textTone: 'light',
    background: '#d2a79e',
    logo: logoFor('oh-g', 'Oh G!', 398, 131),
    description: 
      'Oh G!’s frozen treats in full colour: stacked ice-cream bars dripping with chocolate, melting popsicles on pastel pink and sundaes served by the pool. Playful, sticky and made for summer.',
    palette: OH_G_PALETTE,
    // Figma order: OHG 4, then 1–3.
    slides: buildSlides(
      'oh-g',
      4,
      tones(['light', 'dark', 'light', 'dark']),
    ),
  },
  {
    slug: 'e-studio',
    name: 'E Studio',
    status: 'published',
    textTone: 'light',
    background: '#1b1412',
    logo: logoFor('e-studio', 'E Studio', 1200, 1768),
    description: 
      'A deck of cards for E Studio’s online launch. Each suit blooms into flowers and sculptural paper forms, while red-manicured hands deal out the news: order online now — the official website is live.',
    palette: E_STUDIO_PALETTE,
    slides: buildSlides(
      'e-studio',
      7,
      tones(['light', 'light', 'light', 'dark', 'dark', 'dark', 'dark']),
    ),
  },
];
