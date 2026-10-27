import { apiUrl } from '../utils/apiUrl.js';

export async function fetchGithub(signal) {
  const response = await fetch(apiUrl('/api/github', import.meta.env.VITE_API_BASE_URL || '', import.meta.env.PROD), { signal, credentials: 'omit' });
  if (!response.ok) throw new Error('GitHub is temporarily unavailable. You can still explore my profile directly.');
  return response.json();
}
