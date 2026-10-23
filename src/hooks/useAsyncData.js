import { useEffect, useState } from 'react';

/**
 * Runs an async loader and tracks { data, status, error }.
 * `deps` re-runs the loader (e.g. when a route param changes).
 * Stale responses from a previous run are ignored.
 */
export function useAsyncData(loader, deps = []) {
  const [state, setState] = useState({ data: null, status: 'loading', error: null });

  useEffect(() => {
    let isCurrent = true;
    setState((previous) => ({ ...previous, status: 'loading', error: null }));

    loader()
      .then((data) => {
        if (isCurrent) setState({ data, status: 'success', error: null });
      })
      .catch((error) => {
        if (isCurrent) setState({ data: null, status: 'error', error });
      });

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
