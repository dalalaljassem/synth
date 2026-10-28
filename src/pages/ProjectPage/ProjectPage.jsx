import { Link, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProjectBrand } from '@/components/project/ProjectBrand';
import { ColorPalette } from '@/components/project/ColorPalette';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useMenu } from '@/context/MenuContext';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getProjectBySlug, getSiteContent } from '@/services/contentService';
import './ProjectPage.css';

export function ProjectPage() {
  const { slug } = useParams();
  const project = useAsyncData(() => getProjectBySlug(slug), [slug]);
  const site = useAsyncData(getSiteContent);

  if (project.status === 'loading' || site.status === 'loading') return null;
  if (!project.data) return <NotFoundPage />;

  return <ProjectView key={slug} project={project.data} site={site.data} />;
}

/**
 * Project page:
 * 1. Intro screen on white — client logo, concept and colours.
 * 2. Gallery — images only: a 3-column grid on desktop,
 *    full-screen images scrolling down on mobile.
 */
export function ProjectView({ project, site, campaign, backTo }) {
  const { openMenu } = useMenu();
  useDocumentTitle(campaign ? `${project.name} — ${campaign.title}` : project.name);
  const imageCount = String(project.slides.length).padStart(2, '0');

  return (
    <div className="project-page">
      <SiteHeader logo={site.brand.logo} variant="overlay" tone="dark" />

      <main id="main" className="project-page__main">
        <section
          className={`project-intro ${project.logo?.tone === 'light' ? 'project-intro--logo-light' : ''}`.trim()}
          aria-label={`${project.name} — concept`}
        >

          <div className="project-intro__body">
            <ProjectBrand name={project.name} logo={project.logo} />
            {campaign && (
              <p className="project-intro__campaign">
                <span>Campaign {campaign.number} / {String(campaign.total).padStart(2, '0')}</span>
                <strong>{campaign.title}</strong>
              </p>
            )}
            <p className="project-intro__concept">{project.description}</p>
            <ColorPalette colors={project.palette} />
          </div>

          <p className="project-intro__hint">
            <span>({imageCount}) Images</span>
            <span aria-hidden="true">Scroll ↓</span>
          </p>
        </section>

        <section className="project-gallery" aria-label={`${project.name} images`}>
          {project.slides.map((slide, index) => (
            <figure key={slide.id} className="project-gallery__item">
              <SmartImage
                className="project-gallery__image"
                src={slide.image}
                alt={slide.alt || `${project.name} — image ${index + 1} of ${project.slides.length}`}
                style={{ objectPosition: slide.focus }}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </section>
      </main>

      {backTo ? (
        <Link className="project-page__back" to={backTo}>
          <Icon name="arrow-left" />
          <span className="visually-hidden">All {project.name} campaigns</span>
        </Link>
      ) : (
        <button type="button" className="project-page__back" onClick={openMenu}>
          <Icon name="arrow-left" />
          <span className="visually-hidden">All projects</span>
        </button>
      )}
    </div>
  );
}
