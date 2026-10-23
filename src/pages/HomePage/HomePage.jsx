import { SiteHeader } from '@/components/layout/SiteHeader';
import { StatusBar } from '@/components/layout/StatusBar';
import { MorseDivider } from '@/components/ui/MorseDivider';
import { HeroSection } from '@/sections/home/HeroSection';
import { StatementSection } from '@/sections/home/StatementSection';
import { IndexListSection } from '@/sections/home/IndexListSection';
import { ArchiveSection } from '@/sections/home/ArchiveSection';
import { ContactSection } from '@/sections/home/ContactSection';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getSiteContent } from '@/services/contentService';
import './HomePage.css';

export function HomePage() {
  const { data: content, status } = useAsyncData(getSiteContent);
  useDocumentTitle(null);

  if (status !== 'success') return null;

  const { brand, statusBar, headerTags, morseCode, hero, location, statement, services, process, archive, contact } =
    content;

  return (
    <div className="home-page">
      <SiteHeader logo={brand.logo} tags={headerTags} variant="page" />

      <main id="main" className="home-page__main">
        <div className="container home-page__intro">
          <StatusBar {...statusBar} />
          <MorseDivider code={morseCode} />
          <HeroSection wordmark={hero.wordmark} tagline={hero.tagline} location={location} />
          <MorseDivider code={morseCode} />
          <StatementSection {...statement} />
        </div>

        <div className="container home-page__capabilities">
          <IndexListSection id="services" morseCode={morseCode} {...services} />
          <IndexListSection id="process" morseCode={morseCode} {...process} />
        </div>

        <ArchiveSection morseCode={morseCode} {...archive} />

        <div className="container">
          <ContactSection morseCode={morseCode} {...contact} />
        </div>
      </main>
    </div>
  );
}
