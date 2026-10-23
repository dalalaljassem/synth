import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useMenu } from '@/context/MenuContext';
import './SiteHeader.css';

/**
 * Top bar: glass "synth." pill (toggles the project menu) + optional tags.
 * variant "page"    → sticky on the home page, pill aligned left
 * variant "overlay" → floats over project imagery, pill centred
 */
export function SiteHeader({ logo, tags = [], variant = 'page', tone = 'dark' }) {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <header className={`site-header site-header--${variant} site-header--tone-${tone}`}>
      <div className="site-header__inner">
        <button
          type="button"
          className={`site-header__menu-toggle ${isOpen ? 'is-active' : ''}`.trim()}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="project-menu"
          aria-label={isOpen ? 'Close project menu' : 'Open project menu'}
        >
          <BrandLogo logo={logo} className="site-header__logo" decorative />
        </button>

        {variant === 'page' && tags.length > 0 && (
          <ul className="site-header__tags" aria-label="Practice">
            {tags.map((tag) => (
              <li key={tag} className="site-header__tag">
                [ {tag} ]
              </li>
            ))}
          </ul>
        )}

        {variant === 'overlay' && (
          <Link to="/" className="visually-hidden">
            Back to home
          </Link>
        )}
      </div>
    </header>
  );
}
