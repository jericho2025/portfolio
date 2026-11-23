import { apiUrl } from '../utils/apiUrl.js';

async function fetchResource(path, signal) {
  const response = await fetch(apiUrl(path, import.meta.env.VITE_API_BASE_URL || '', import.meta.env.PROD), { signal, credentials: 'omit' });
  if (!response.ok) throw new Error('GitHub is temporarily unavailable. You can still explore my profile directly.');
  return response.json();
}

export const fetchGithub = signal => fetchResource('/api/github', signal);
export const fetchGithubActivity = signal => fetchResource('/api/github/activity', signal);
