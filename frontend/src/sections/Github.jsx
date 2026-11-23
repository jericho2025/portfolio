import { useGithub, useGithubActivity } from '../hooks/useGithub.js';

function RepositoryLanguages({ repositories }) {
  const counts = new Map();
  for (const repo of repositories) {
    const language = repo.language || 'Not specified';
    counts.set(language, (counts.get(language) || 0) + 1);
  }
  return <section className="language-summary" aria-labelledby="languages-title"><h2 id="languages-title">Primary Languages</h2><p className="muted">Counts by primary language across the repositories displayed below. This is not a byte-based language breakdown.</p><ul>{[...counts].map(([name, count]) => <li key={name}><span>{name}</span><span>{count} {count === 1 ? 'repository' : 'repositories'}</span></li>)}</ul></section>;
}

function PublicActivity() {
  const { data, loading, error, retry } = useGithubActivity();
  const note = error || data?.status === 'unavailable'
    ? 'Public activity is temporarily unavailable.'
    : data?.status === 'rate-limited'
      ? 'GitHub is rate-limiting public activity. Please try again in a minute.'
      : '';
  return (
    <section className="github-activity" aria-labelledby="activity-title">
      <div className="section-row"><h2 id="activity-title">Recent public activity</h2></div>
      <p>Public events reported by GitHub.</p>
      <div aria-live="polite" aria-busy={loading}>
        {loading && <p className="status-panel">Loading public activity…</p>}
        {note && <div className="status-panel"><p>{note}</p><button type="button" className="button" onClick={retry}>Retry public activity</button></div>}
        {data?.status === 'ok' && (data.events.length ? (
          <ul className="activity-list">
            {data.events.map(event => <li key={event.id}>
              <div><strong>{event.action}</strong><a href={event.url} target="_blank" rel="noopener noreferrer">{event.repository}<span className="sr-only"> (opens in a new tab)</span></a></div>
              <time dateTime={event.createdAt}>{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(event.createdAt))}</time>
            </li>)}
          </ul>
        ) : <p className="status-panel">No recent public events were returned by GitHub.</p>)}
      </div>
    </section>
  );
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
      <PublicActivity />
    </section>
  );
}
