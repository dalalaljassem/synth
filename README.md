# SYNTH — website

Public site for SYNTH, a transdisciplinary creative practice based in Kuwait City.
Phase 1 is a **static React site**. All content comes from one data layer, so the admin panel and database in phase 2 can take it over without touching any components.

## Stack

- React 18 + Vite 5
- React Router 6 (`/`, `/projects/:slug`, 404)
- Plain CSS: one stylesheet per component, BEM class names, design tokens in CSS variables
- Brand fonts self-hosted via `@fontsource` (Urbanist, DM Mono)

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build → dist/
npm run preview        # serve the build
npm run check:assets   # list images the content expects but /public doesn't have yet
```

## Project structure

```
src/
├── main.jsx                 # entry: router + global styles
├── App.jsx                  # routes, menu provider, skip link
├── styles/
│   ├── tokens.css           # colours, type scale, spacing, motion (brand guidelines)
│   ├── fonts.css            # @fontsource imports
│   └── base.css             # reset, element defaults, .container, .visually-hidden
├── data/                    # ← content lives here (becomes the API in phase 2)
│   ├── siteContent.js       # home page copy, services, process, archive, contact
│   └── projects.js          # projects, slides, palettes, captions
├── services/
│   └── contentService.js    # the ONLY way components read content (swap for fetch later)
├── context/MenuContext.jsx  # open/close state for the project menu
├── hooks/                   # useAsyncData, useActiveSlide, useScrollLock, useDocumentTitle
├── utils/format.js
├── components/
│   ├── ui/                  # BrandLogo, SmartImage, MorseDivider, CornerFrame, Icon
│   ├── layout/              # SiteHeader, StatusBar, ProjectMenu, ScrollToTop
│   └── project/             # ProjectSlide, SlideIndicator, ColorPalette, ProjectInfo, ProjectBrand
├── sections/home/           # HeroSection, StatementSection, IndexListSection, ArchiveSection, ContactSection
└── pages/                   # HomePage, ProjectPage, NotFoundPage
public/
├── images/brand/            # official wordmark (from the brand guidelines PDF)
├── images/icons/            # 25 brand icons (from the brand guidelines PDF)
├── images/archive/          # home archive strip thumbnails
└── images/projects/<slug>/  # logo.png + slide-01.jpg … per project
```

Each component lives in its own folder: `Component.jsx`, `Component.css` and `index.js`.

## Conventions

- **Components:** PascalCase. **Hooks:** `useSomething`. **Data and service functions:** camelCase.
- **CSS classes:** BEM, with the block named after the component (`.site-header`, `.site-header__logo`, `.site-header--overlay`). State classes use an `is-` prefix (`is-open`, `is-active`).
- **No hard-coded design values in components.** Use `var(--token)` from `tokens.css`.
- **Markup, styles and logic stay separate.** JSX holds structure only, CSS lives in the paired `.css` file, and data and behaviour live in `data/`, `services/` and `hooks/`.

## Content model

See the JSDoc at the top of `src/data/projects.js`. Short version:

- A project is a vertical stack of full-screen slides.
- Each slide has an `image`, an optional `focus` (CSS `object-position`), and optionally its own `palette` and `showCaption`.
- `textTone: 'light' | 'dark'` sets the overlay colour (white text on dark photos, black text on light ones).
- `status: 'draft'` hides a project from the menu and from its URL.

## Phase 2 (admin + database)

Replace the function bodies in `src/services/contentService.js` with API calls that return the same shapes. The pages and components don't need to change.

## Brand

Tokens follow the SYNTH Brand Guidelines (Oct 2026):

- **Colours:** black, greys and white, with acid lime `#CDF408` as the single accent (one lime moment per layout).
- **Type:** Urbanist for words, DM Mono for information and labels.
- **Logo:** always the supplied artwork, never retyped.
