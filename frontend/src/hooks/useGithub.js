import { useEffect, useState } from 'react';
import { fetchGithub } from '../services/github.js';

export function useGithub() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ loading: true, data: null, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, data: null, error: '' });
    fetchGithub(controller.signal)
      .then(data => { if (!controller.signal.aborted) setState({ loading: false, data, error: '' }); })
      .catch(error => { if (!controller.signal.aborted) setState({ loading: false, data: null, error: error.message }); });
    return () => controller.abort();
  }, [attempt]);
  return { ...state, retry: () => setAttempt(current => current + 1) };
}
