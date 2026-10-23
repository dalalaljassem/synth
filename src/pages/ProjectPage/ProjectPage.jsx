import { useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { MorseDivider } from '@/components/ui/MorseDivider';
import { Icon } from '@/components/ui/Icon';
import { ProjectBrand } from '@/components/project/ProjectBrand';
import { ProjectSlide } from '@/components/project/ProjectSlide';
import { SlideIndicator } from '@/components/project/SlideIndicator';
import { ProjectInfo } from '@/components/project/ProjectInfo';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useMenu } from '@/context/MenuContext';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useActiveSlide } from '@/hooks/useActiveSlide';
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

function ProjectView({ project, site }) {
  const { openMenu } = useMenu();
  const { containerRef, registerSlide, activeIndex, scrollToSlide } = useActiveSlide(
    project.slides.length,
  );
  useDocumentTitle(project.name);

  const activeSlide = project.slides[activeIndex] ?? project.slides[0];
  const palette = activeSlide?.palette ?? project.palette;
  const caption = activeSlide?.caption ?? project.description;
  const showCaption = activeSlide?.showCaption ?? true;
  const tone = activeSlide?.textTone ?? project.textTone;

  return (
    <div
      className={`project-page project-page--tone-${tone}`}
      style={{ '--project-background': project.background }}
    >
      <SiteHeader logo={site.brand.logo} variant="overlay" tone={tone} />

      <main id="main" className="project-page__main">
        <div className="project-page__masthead">
          <MorseDivider code={site.morseCode} tone={tone === 'light' ? 'light' : 'dark'} />
          <ProjectBrand name={project.name} logo={project.logo} variant={activeSlide?.logoVariant} />
        </div>

        <div
          ref={containerRef}
          className="project-page__slides"
          tabIndex={0}
          aria-label={`${project.name} gallery`}
        >
          {project.slides.map((slide, index) => (
            <ProjectSlide
              key={slide.id}
              ref={registerSlide(index)}
              slide={slide}
              index={index}
              total={project.slides.length}
              projectName={project.name}
              isPriority={index === 0}
            />
          ))}
        </div>

        <SlideIndicator
          total={project.slides.length}
          activeIndex={activeIndex}
          onSelect={scrollToSlide}
        />

        <footer className="project-page__footer">
          <ProjectInfo
            palette={palette}
            description={caption}
            showCaption={showCaption}
          />
          <MorseDivider code={site.morseCode} tone={tone === 'light' ? 'light' : 'dark'} />
          <button type="button" className="project-page__back" onClick={openMenu}>
            <Icon name="arrow-left" />
            <span className="visually-hidden">All projects</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
