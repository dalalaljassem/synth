import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SynthMark } from '@/components/ui/SynthMark';
import { IsometricArt } from '@/components/art';
import { ShowcaseSection } from '@/sections/home/ShowcaseSection';
import { ObjectField } from '@/sections/objects/ObjectField';
import { ClientGrid } from '@/sections/formed/ClientGrid';
import { ContactSection } from '@/sections/home/ContactSection';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getSiteContent } from '@/services/contentService';
import './SubBrandPage.css';

/**
 * A sub-brand page (synth.formed, synth.objects): breadcrumb → logo +
 * description + isometric art → Selected work → black footer.
 * The page accent (and the cursor dot) take the sub-brand colour.
 */
export function SubBrandPage({ brand }) {
  const { data: content, status } = useAsyncData(getSiteContent);
  const sub = content?.subBrands?.[brand];
  useDocumentTitle(sub?.name ?? null);

  useEffect(() => {
    if (!sub) return undefined;
    const root = document.documentElement;
    root.style.setProperty('--cursor-accent', sub.accent);
    return () => root.style.removeProperty('--cursor-accent');
  }, [sub]);

  if (status !== 'success') return null;
  if (!sub) return <NotFoundPage />;

  const showcase = sub.showcase === 'home' ? content.showcase : sub.showcase;

  return (
    <div className={`sub-brand-page sub-brand-page--${brand}`} style={{ '--accent': sub.accent }}>
      <SiteHeader logo={content.brand.logo} tags={content.headerTags} variant="page" />

      <main id="main" className="sub-brand-page__main">
        <div className="container sub-brand-page__intro">
          <nav className="sub-brand-page__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">{sub.name}</li>
            </ol>
          </nav>


          <section className="sub-brand-page__hero" aria-label={sub.name}>
            <div className="sub-brand-page__copy">
              <h1 className="sub-brand-page__title">
                <SynthMark name={brand} className="sub-brand-page__logo" />
              </h1>
              <p className="sub-brand-page__description">{sub.description}</p>
              {content.disciplines?.[brand] && (
                <ul className="sub-brand-page__disciplines" aria-label="Disciplines">
                  {content.disciplines[brand].map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              <p className="sub-brand-page__meta">{sub.meta}</p>
            </div>
            <div className="sub-brand-page__art">
              <IsometricArt variant={sub.art} label={`${sub.name} illustration`} />
            </div>
          </section>
        </div>

        {/* synth.objects: floating object table instead of the bento */}
        {/* synth.formed: a card for every client (→ campaigns → campaign) */}
        {sub.clients ? (
          <ClientGrid />
        ) : sub.field ? (
          <ObjectField {...sub.field} />
        ) : (
          <ShowcaseSection morseCode={content.morseCode} {...showcase} />
        )}

        <div className="sub-brand-page__footer">
          <div className="container">
            <ContactSection morseCode={content.morseCode} tone="light" {...content.contact} />
          </div>
        </div>
      </main>
    </div>
  );
}
