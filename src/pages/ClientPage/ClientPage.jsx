import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ProjectBrand } from '@/components/project/ProjectBrand';
import { SmartImage } from '@/components/ui/SmartImage';
import { ContactSection } from '@/sections/home/ContactSection';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getFormedClient, getSiteContent } from '@/services/contentService';
import '@/pages/SubBrandPage/SubBrandPage.css';
import '@/sections/formed/ClientGrid/ClientGrid.css';
import './ClientPage.css';

const pad = (n) => String(n).padStart(2, '0');

/** synth.formed, level 2: one client and its campaigns (each → its own page). */
export function ClientPage() {
  const { client: slug } = useParams();
  const client = useAsyncData(() => getFormedClient(slug), [slug]);
  const site = useAsyncData(getSiteContent);
  const formed = site.data?.subBrands?.formed;
  useDocumentTitle(client.data ? `${client.data.name} — synth.formed` : null);

  useEffect(() => {
    if (!formed) return undefined;
    document.documentElement.style.setProperty('--cursor-accent', formed.accent);
    return () => document.documentElement.style.removeProperty('--cursor-accent');
  }, [formed]);

  if (client.status === 'loading' || site.status === 'loading') return null;
  if (!client.data) return <NotFoundPage />;
  const { data: c } = client;
  const content = site.data;

  return (
    <div className="sub-brand-page sub-brand-page--formed client-page" style={{ '--accent': formed.accent }}>
      <SiteHeader logo={content.brand.logo} tags={content.headerTags} variant="page" />

      <main id="main" className="sub-brand-page__main">
        <div className="container sub-brand-page__intro">
          <nav className="sub-brand-page__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/formed">synth.formed</Link></li>
              <li aria-current="page">{c.name}</li>
            </ol>
          </nav>

          <section className={`client-page__hero ${c.logo?.tone === 'light' ? 'client-page__hero--logo-light' : ''}`.trim()}>
            <ProjectBrand name={c.name} logo={c.logo} />
            <p className="sub-brand-page__meta">
              ({pad(c.campaigns.length)}) {c.campaigns.length === 1 ? 'Campaign' : 'Campaigns'}
            </p>
          </section>

          <section className="client-campaigns" aria-labelledby="client-campaigns-heading">
            <header className="client-campaigns__head">
              <h2 id="client-campaigns-heading">Campaigns</h2>
              <span>({pad(c.campaigns.length)})</span>
            </header>
            <ol className="client-campaigns__list">
              {c.campaigns.map((campaign, index) => (
                <li key={campaign.slug}>
                  <Link className="campaign-folder" to={`/formed/${c.slug}/${campaign.slug}`}>
                    {/* tags sit in the step beside the folder tab */}
                    <ul className="campaign-folder__tags">
                      <li>{campaign.number}</li>
                      <li>({pad(campaign.slides.length)}) {campaign.slides.length === 1 ? 'Image' : 'Images'}</li>
                    </ul>
                    <div className="campaign-folder__body">
                      <div className="campaign-folder__media" style={{ background: c.background }}>
                        <SmartImage
                          className="campaign-folder__image"
                          src={campaign.cover}
                          alt=""
                          style={{ objectPosition: campaign.slides[0].focus }}
                          loading={index < 4 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="campaign-folder__foot">
                        <div>
                          <h3 className="campaign-folder__title">{campaign.title}</h3>
                          <p className="campaign-folder__text">{campaign.text}</p>
                        </div>
                        <span className="campaign-folder__go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="sub-brand-page__footer">
          <div className="container">
            <ContactSection morseCode={content.morseCode} tone="light" {...content.contact} />
          </div>
        </div>
      </main>
    </div>
  );
}
