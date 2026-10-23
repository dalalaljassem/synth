import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useMenu } from '@/context/MenuContext';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useScrollLock } from '@/hooks/useScrollLock';
import { getProjectSummaries } from '@/services/contentService';
import { formatIndex } from '@/utils/format';
import './ProjectMenu.css';

/** Frosted overlay listing every published project. */
export function ProjectMenu() {
  const { isOpen, closeMenu } = useMenu();
  const { data: projects } = useAsyncData(getProjectSummaries);
  const firstLinkRef = useRef(null);
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    firstLinkRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <div
      id="project-menu"
      className={`project-menu ${isOpen ? 'is-open' : ''}`.trim()}
      aria-hidden={!isOpen}
      inert={isOpen ? undefined : ''}
    >
      <button
        type="button"
        className="project-menu__backdrop"
        onClick={closeMenu}
        aria-label="Close project menu"
        tabIndex={-1}
      />

      <nav className="project-menu__panel" aria-label="Projects">
        <div className="project-menu__header">
          <h2 className="project-menu__title">Projects</h2>
          <NavLink to="/" className="project-menu__home-link" onClick={closeMenu}>
            Home
          </NavLink>
        </div>

        <ol className="project-menu__list">
          {(projects ?? []).map((project, index) => (
            <li key={project.slug} className="project-menu__item">
              <NavLink
                ref={index === 0 ? firstLinkRef : undefined}
                to={`/projects/${project.slug}`}
                className={({ isActive }) =>
                  `project-menu__link ${isActive ? 'is-current' : ''}`.trim()
                }
                onClick={closeMenu}
              >
                <span className="project-menu__name">{project.name}</span>
                <span className="project-menu__index">[{formatIndex(index + 1)}]</span>
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
