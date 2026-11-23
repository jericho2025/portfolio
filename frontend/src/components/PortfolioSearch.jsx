import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { arcadeGames } from '../data/arcadeGames.js';
import { skillGroupId, skillGroups } from '../data/skills.js';
import { projects } from '../sections/Projects.jsx';

const entries = [
  { title: 'Home', group: 'Page', to: '/' },
  { title: 'Selected Highlights', group: 'Section', to: '/#featured' },
  { title: 'Projects', group: 'Page', to: '/portfolio' },
  { title: 'About & Journey', group: 'Page', to: '/about#journey', keywords: 'education capstone forum attendance programming' },
  { title: 'Tech Stack', group: 'Section', to: '/about#skills' },
  { title: 'Activity Arcade', group: 'Page', to: '/arcade', keywords: 'games scores progress' },
  { title: 'GitHub Activity', group: 'Page', to: '/github', keywords: 'public repositories contributions' },
  { title: 'Availability', group: 'Section', to: '/#availability', keywords: 'open opportunities freelance' },
  { title: 'Services', group: 'Page', to: '/services' },
  { title: 'Contact', group: 'Page', to: '/contact', keywords: 'email linkedin facebook telegram discord' },
  ...projects.map(project => ({ title: project.title, group: 'Project', to: project.route, keywords: project.tags.join(' ') })),
  ...skillGroups.map(group => ({ title: group.title, group: 'Skill category', to: '/about#' + skillGroupId(group.title), keywords: group.skills.join(' ') })),
  ...arcadeGames.map(game => ({ title: game.title, group: 'Arcade game', to: '/arcade?game=' + game.id + '#arcade-game-panel' })),
];

export const searchShortcut = /mac/i.test(navigator.userAgentData?.platform || navigator.platform) ? '⌘ K' : 'Ctrl K';

function search(query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return entries.slice(0, 8);
  return entries.map(entry => {
    const title = entry.title.toLowerCase();
    const text = [title, entry.group.toLowerCase(), entry.keywords?.toLowerCase()].join(' ');
    if (!terms.every(term => text.includes(term))) return null;
    const rank = terms.reduce((score, term) => score + (title.startsWith(term) ? 4 : title.includes(term) ? 2 : 0), 0);
    return { entry, rank };
  }).filter(Boolean).sort((a, b) => b.rank - a.rank).slice(0, 10).map(({ entry }) => entry);
}

export default function PortfolioSearch({ open, setOpen }) {
  const dialog = useRef(null);
  const input = useRef(null);
  const list = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const results = search(query);
  const selected = results[active];

  useEffect(() => {
    function shortcut(event) {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k' && !event.isComposing) {
        event.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, [setOpen]);

  useLayoutEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    modal.showModal();
    document.documentElement.classList.add('search-dialog-open');
    input.current?.focus();
    return () => {
      document.documentElement.classList.remove('search-dialog-open');
      if (modal.open) modal.close();
    };
  }, [open]);

  useEffect(() => {
    if (open && selected) list.current?.children[active]?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [active, open, selected]);

  function reset() {
    setQuery('');
    setActive(0);
    setOpen(false);
  }

  function choose(result) {
    if (!result) return;
    dialog.current.close();
    navigate(result.to);
  }

  function dismissOnEscape(event) {
    if (event.key !== 'Escape' || event.isComposing) return;
    event.preventDefault();
    dialog.current.close();
  }

  function handleKey(event) {
    if (event.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      choose(selected);
    }
    if (!results.length || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    setActive(index => (index + delta + results.length) % results.length);
  }

  return (
    <dialog ref={dialog} id="portfolio-search" className="portfolio-search" aria-labelledby="portfolio-search-title" onClose={reset} onKeyDown={dismissOnEscape}>
      <div className="search-heading">
        <h2 id="portfolio-search-title">Search portfolio</h2>
        <button type="button" onClick={() => dialog.current.close()} aria-label="Close portfolio search">Close <span aria-hidden="true">×</span></button>
      </div>
      <label className="sr-only" htmlFor="portfolio-search-input">Search pages, projects, skills and games</label>
      <input ref={input} id="portfolio-search-input" type="search" role="combobox" aria-controls="portfolio-search-results" aria-autocomplete="list" aria-expanded={open && results.length > 0} aria-activedescendant={selected ? 'search-result-' + active : undefined} value={query}
        placeholder="Search projects, skills, games…" onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={handleKey} />
      <p className="sr-only" role="status">{results.length} results</p>
      <ul ref={list} id="portfolio-search-results" className="search-results" role="listbox" aria-label="Search results" hidden={!results.length}>
        {results.map((result, index) => (
          <li key={result.title + result.to} id={'search-result-' + index} role="option" aria-selected={index === active} onClick={() => choose(result)}>
            <strong>{result.title}</strong><span>{result.group}</span>
          </li>
        ))}
      </ul>
      {!results.length && <p className="search-empty">No matching pages or sections.</p>}
      <p className="search-hint">↑ ↓ Navigate <span>Enter to open</span></p>
    </dialog>
  );
}