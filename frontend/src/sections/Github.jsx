import { useGithub } from '../hooks/useGithub.js';

function RepositoryLanguages({ repositories }) {
  const counts = new Map();
  for (const repo of repositories) {
    const language = repo.language || 'Not specified';
    counts.set(language, (counts.get(language) || 0) + 1);
  }
  return <section className="language-summary" aria-labelledby="languages-title"><h2 id="languages-title">Primary Languages</h2><p className="muted">Counts by primary language across the repositories displayed below. This is not a byte-based language breakdown.</p><ul>{[...counts].map(([name, count]) => <li key={name}><span>{name}</span><span>{count} {count === 1 ? 'repository' : 'repositories'}</span></li>)}</ul></section>;
}

export default function Github() {
  const { data, error, loading, retry } = useGithub();
  return (
    <section className="page-content github-page" aria-labelledby="github-title">
      <div className="page-heading"><h1 id="github-title">GitHub</h1><p>Recently updated public repositories from <a href="https://github.com/jericho2025" target="_blank" rel="noopener noreferrer">@jericho2025<span className="sr-only"> (opens in a new tab)</span></a>.</p></div>
      <div aria-live="polite" aria-busy={loading}>
        {loading && <p className="status-panel">Loading public repositories…</p>}
        {error && <div className="status-panel"><p>{error}</p><button className="button" onClick={retry}>Try again</button></div>}
        {!loading && !error && data?.repositories.length === 0 && <p className="status-panel">No public repositories are available to display.</p>}
        {!loading && !error && data?.repositories.length > 0 && <><RepositoryLanguages repositories={data.repositories} /><div className="repo-grid">{data.repositories.map(repo => <article className="repo-card" key={repo.id}><p className="eyebrow">{repo.fork ? 'Public / fork' : 'Public repository'}</p><h2><a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name} ↗<span className="sr-only"> (opens in a new tab)</span></a></h2><p>{repo.description || 'No description provided on GitHub.'}</p><div className="repo-meta"><span>{repo.language || 'Language not specified'}</span>{repo.updatedAt && !Number.isNaN(Date.parse(repo.updatedAt)) && <time dateTime={repo.updatedAt}>Updated {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(repo.updatedAt))}</time>}</div></article>)}</div></>}
      </div>
    </section>
  );
}
