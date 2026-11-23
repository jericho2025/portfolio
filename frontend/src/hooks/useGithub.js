import { useEffect, useState } from 'react';
import { fetchGithub, fetchGithubActivity } from '../services/github.js';

function useGithubResource(load) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ loading: true, data: null, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, data: null, error: '' });
    load(controller.signal)
      .then(data => { if (!controller.signal.aborted) setState({ loading: false, data, error: '' }); })
      .catch(error => { if (!controller.signal.aborted) setState({ loading: false, data: null, error: error.message }); });
    return () => controller.abort();
  }, [attempt, load]);
  return { ...state, retry: () => setAttempt(current => current + 1) };
}

export const useGithub = () => useGithubResource(fetchGithub);
export const useGithubActivity = () => useGithubResource(fetchGithubActivity);
