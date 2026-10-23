import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './NotFoundPage.css';

export function NotFoundPage() {
  useDocumentTitle('Not found');

  return (
    <main id="main" className="not-found-page">
      <img className="not-found-page__icon" src="/images/icons/rabbit-hole.png" alt="" width="160" height="160" />
      <p className="not-found-page__code">404 · Signal lost</p>
      <h1 className="not-found-page__title">This page fell down the rabbit hole</h1>
      <Link to="/" className="not-found-page__link">
        Back to SYNTH
      </Link>
    </main>
  );
}
