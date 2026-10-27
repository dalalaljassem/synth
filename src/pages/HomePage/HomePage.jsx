import { SiteHeader } from '@/components/layout/SiteHeader';
import { StatusBar } from '@/components/layout/StatusBar';
import { SplineScene } from '@/components/ui/SplineScene';
import { IntroScreen } from '@/components/layout/IntroScreen';
import { HeroSection } from '@/sections/home/HeroSection';
import { WorldSection } from '@/sections/home/WorldSection';
import { StatementSection } from '@/sections/home/StatementSection';
import { ServicesFolder } from '@/sections/home/ServicesFolder';
import { ProcessGrid } from '@/sections/home/ProcessGrid';
import { CategorySection } from '@/sections/home/CategorySection';
import { ContactSection } from '@/sections/home/ContactSection';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getSiteContent } from '@/services/contentService';
import './HomePage.css';

export function HomePage() {
  const { data: content, status } = useAsyncData(getSiteContent);
  useDocumentTitle(null);

  if (status !== 'success') return null;

  const {
    brand,
    intro,
    statusBar,
    headerTags,
    morseCode,
    hero,
    world,
    location,
    statement,
    services,
    process,
    categories,
    contact,
  } = content;

  return (
    <div className="home-page">
      <IntroScreen video={intro} />
      <SiteHeader logo={brand.logo} tags={headerTags} variant="page" />

      <main id="main" className="home-page__main">
        <div className="container home-page__intro">
          {/* 3D lime blob: fills the whole first screen, behind everything */}
          {hero.blobScene && <SplineScene scene={hero.blobScene} reach={hero.blobReach} className="home-page__blob" />}
          <StatusBar {...statusBar} />
          <HeroSection
            wordmark={hero.wordmark}
            tagline={hero.tagline}
            location={location}
          />
        </div>

        {/* synth. world grid */}
        <WorldSection morseCode={morseCode} {...world} />

        <div className="container home-page__intro home-page__statement">
          <StatementSection {...statement} />
        </div>

        {/* Categories + Services + Process + Contact run together as one black band */}
        <div className="home-page__dark-band">
          <div className="container home-page__band-categories">
            <CategorySection morseCode={morseCode} tone="light" {...categories} />
          </div>
          <ServicesFolder id="services" morseCode={morseCode} logo={brand.logo} {...services} />
          <ProcessGrid id="process" morseCode={morseCode} label={process.label} items={process.items} />
          <div className="container home-page__band-contact">
            <ContactSection morseCode={morseCode} tone="light" {...contact} />
          </div>
        </div>
      </main>
    </div>
  );
}
