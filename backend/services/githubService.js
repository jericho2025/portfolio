const ACCOUNT = 'jericho2025';
const API = `https://api.github.com/users/${ACCOUNT}`;

export function createGithubService(fetcher = fetch) {
  let cached;
  let expires = 0;
  let pending;

  async function load(path) {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'jericho-portfolio', 'X-GitHub-Api-Version': '2022-11-28' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetcher(`${API}${path}`, { headers, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('GitHub request failed');
    return response.json();
  }

  return {
    async getOverview() {
      if (cached && Date.now() < expires) return cached;
      if (pending) return pending;
      pending = (async () => {
        try {
          const [profile, repositories] = await Promise.all([load(''), load('/repos?type=owner&sort=updated&per_page=100')]);
          if (!Array.isArray(repositories) || typeof profile.login !== 'string') throw new Error('Unexpected GitHub response');
          cached = {
            profile: { login: profile.login, url: profile.html_url },
            repositories: repositories.filter(repo => !repo.private).slice(0, 6).map(repo => ({
              id: repo.id, name: repo.name, description: repo.description || '', url: repo.html_url,
              language: repo.language || null, fork: Boolean(repo.fork), updatedAt: repo.updated_at,
            })),
          };
          expires = Date.now() + 5 * 60 * 1000;
          return cached;
        } catch {
          const error = new Error('GitHub is temporarily unavailable. Please try again later.');
          error.status = 502;
          throw error;
        } finally {
          pending = undefined;
        }
      })();
      return pending;
    },
  };
}
