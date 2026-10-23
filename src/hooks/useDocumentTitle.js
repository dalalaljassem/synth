import { useEffect } from 'react';

const SITE_NAME = 'SYNTH';

/** Sets <title>; pass null to use the default site title. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} — ${SITE_NAME}`
      : `${SITE_NAME} — A Transdisciplinary Creative Practice`;
  }, [title]);
}
