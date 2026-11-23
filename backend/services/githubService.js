const ACCOUNT = 'jericho2025';
const API = `https://api.github.com/users/${ACCOUNT}`;

function githubRequest(fetcher, path, authenticated = true) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'jericho-portfolio', 'X-GitHub-Api-Version': '2022-11-28' };
  if (authenticated && process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return fetcher(API + path, { headers, signal: AbortSignal.timeout(8000) });
}

export function createGithubService(fetcher = fetch) {
  let cached;
  let expires = 0;
  let pending;

  async function load(path) {
    const response = await githubRequest(fetcher, path);
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

const activityLabels = new Map([
  ['PushEvent', 'Pushed changes'],
  ['PullRequestEvent', 'Pull request activity'],
  ['IssuesEvent', 'Issue activity'],
  ['IssueCommentEvent', 'Commented on an issue or pull request'],
  ['CreateEvent', 'Created a repository, branch, or tag'],
  ['ForkEvent', 'Forked a repository'],
  ['WatchEvent', 'Starred a repository'],
  ['ReleaseEvent', 'Release activity'],
]);

function publicEvent(entry) {
  const { id, type, repo, created_at: createdAt } = entry ?? {};
  const action = activityLabels.get(type);
  if (entry?.public !== true || typeof id !== 'string' || !action ||
      typeof repo?.name !== 'string' || !/^[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(repo.name) ||
      typeof createdAt !== 'string' || !Number.isFinite(Date.parse(createdAt))) return null;
  const url = new URL('https://github.com/' + repo.name);
  if (url.pathname !== '/' + repo.name) return null;
  return { id, action, repository: repo.name, url: url.href, createdAt };
}

export function createGithubActivityService(fetcher = fetch) {
  let cached;
  let expires = 0;
  let pending;

  async function fetchActivity() {
    try {
      const response = await githubRequest(fetcher, '/events/public?per_page=20', false);
      if (!response.ok) {
        const limited = response.status === 429 || (response.status === 403 &&
          (response.headers.has('retry-after') || response.headers.get('x-ratelimit-remaining') === '0'));
        return { status: limited ? 'rate-limited' : 'unavailable', events: [] };
      }
      const entries = await response.json();
      if (!Array.isArray(entries)) return { status: 'unavailable', events: [] };
      const events = entries.map(publicEvent).filter(Boolean)
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 6);
      return { status: 'ok', events };
    } catch {
      return { status: 'unavailable', events: [] };
    }
  }

  function getActivity() {
    if (cached && Date.now() < expires) return Promise.resolve(cached);
    if (!pending) {
      pending = fetchActivity().then(result => {
        cached = result;
        expires = Date.now() + (result.status === 'ok' ? 300_000 : 60_000);
        return result;
      }).finally(() => { pending = undefined; });
    }
    return pending;
  }

  return { getActivity };
}
