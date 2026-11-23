import { useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { platforms } from '../sections/Contact.jsx';
import DownloadCvLink from './DownloadCvLink.jsx';
import { searchShortcut } from './PortfolioSearch.jsx';
import { arcadeGames } from '../data/arcadeGames.js';
import { skillCount } from '../data/skills.js';
import { projectCount } from '../sections/Projects.jsx';

const groups = [
  { label: 'Explore', links: [
    ['/#featured', 'Featured', 'featured'],
    ['/github', 'GitHub', 'github'],
    ['/arcade', 'Arcade', 'arcade', arcadeGames.length],
  ] },
  { label: 'Portfolio', links: [
    ['/', 'Home', 'home'],
    ['/portfolio', 'Projects', 'projects', projectCount],
    ['/about#journey', 'Journey', 'journey'],
    ['/about#skills', 'Stack', 'stack', skillCount],
    ['/services', 'Services', 'services'],
    ['/#availability', 'Availability', 'contact'],
  ] },
];

const email = platforms.find(({ id }) => id === 'email');

const icons = {
  home: 'm3 10 9-7 9 7v10H3z M9 20v-6h6v6',
  projects: 'M3 6h18v14H3z M8 6V3h8v3 M3 11h18',
  journey: 'M5 21V3 M5 7h7l3-3h5v7h-5l-3 3H5',
  stack: 'm12 3 9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5',
  services: 'm12 3 9 5v8l-9 5-9-5V8z M3 8l9 5 9-5 M12 13v8',
  featured: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z',
  github: 'm8 6-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16',
  arcade: 'M8 8h8a4 4 0 0 1 4 3l1 5a2 2 0 0 1-3 2l-3-2H9l-3 2a2 2 0 0 1-3-2l1-5a4 4 0 0 1 4-3z M8 10v5 M5.5 12.5h5 M16 12h.01 M18 14h.01',
  contact: 'M3 5h18v14H3z m0 1 9 7 9-7',
  theme: 'M20 15a8 8 0 0 1-11-11 8.5 8.5 0 1 0 11 11z',
  menu: 'M3 6h18 M3 12h18 M3 18h18',
  search: 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z M16 16l4 4',
  close: 'm5 5 14 14 M19 5 5 19',
};

function NavIcon({ name }) {
  return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>;
}

export default function Navigation({ theme, toggleTheme, searchOpen, openSearch }) {
  const [openOn, setOpenOn] = useState(null);
  const toggle = useRef(null);
  const header = useRef(null);
  const { pathname, hash, key } = useLocation();
  const drawerRequested = openOn === key;
  const open = drawerRequested && !searchOpen;
  useLayoutEffect(() => {
    if (!searchOpen || !drawerRequested) return;
    setOpenOn(null);
    toggle.current?.focus();
  }, [searchOpen, drawerRequested]);
  const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  useLayoutEffect(() => {
    if (!open) return;

    const desktop = matchMedia('(min-width: 901px)');
    if (desktop.matches) {
      setOpenOn(null);
      return;
    }

    const root = document.documentElement;
    const controls = () => [...header.current.querySelectorAll('a[href], button')];
    const background = [...document.querySelectorAll('.skip-link, #main, .footer')];
    const priorInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    root.classList.add('mobile-menu-open');
    header.current.querySelector('nav a')?.focus({ preventScroll: true });

    function handleKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenOn(null);
        toggle.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const items = controls();
      const boundary = event.shiftKey ? items[0] : items.at(-1);
      if (document.activeElement === boundary || !items.includes(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? items.at(-1) : items[0]).focus();
      }
    }

    function handleResize(event) {
      if (event.matches) setOpenOn(null);
    }

    document.addEventListener('keydown', handleKey);
    desktop.addEventListener('change', handleResize);
    return () => {
      root.classList.remove('mobile-menu-open');
      background.forEach((element, index) => { element.inert = priorInert[index]; });
      document.removeEventListener('keydown', handleKey);
      desktop.removeEventListener('change', handleResize);
    };
  }, [open]);

  function dismiss() {
    setOpenOn(null);
    toggle.current?.focus();
  }

  function renderLink([path, label, icon, count]) {
    const [destination, fragment] = path.split('#');
    const selected = fragment
      ? normalizedPath === destination && (hash === '#' + fragment || (fragment === 'journey' && !hash))
      : (normalizedPath === destination && !hash) || (destination === '/portfolio' && normalizedPath.startsWith('/portfolio/'));
    return <Link key={path} className={selected ? 'active' : undefined} aria-current={selected ? (fragment ? 'location' : 'page') : undefined} to={path} onClick={() => setOpenOn(null)}><NavIcon name={icon} />{label}{count != null && <span className="nav-count" aria-hidden="true">{count}</span>}</Link>;
  }

  const themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
  return (
    <header className="site-header" ref={header}>
      <div className="nav-shell" role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label={open ? "Site menu" : undefined}>
        <Link className="wordmark" to="/" onClick={() => setOpenOn(null)}>Jericho Flores</Link>
        <button ref={toggle} className="menu-toggle" aria-controls="main-navigation" aria-expanded={open} type="button" onClick={() => open ? dismiss() : setOpenOn(key)}><NavIcon name={open ? 'close' : 'menu'} />{open ? 'Close' : 'Menu'}</button>
        {open && <div className="menu-backdrop" aria-hidden="true" onClick={dismiss} />}
        <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          {groups.map(({ label, links }) => <div className="nav-group" key={label}><p>{label}</p>{links.map(renderLink)}</div>)}
          <div className="nav-actions">
            <p className="eyebrow nav-utilities">Utilities</p>
            <button className="nav-search" type="button" aria-haspopup="dialog" aria-controls="portfolio-search" onClick={() => { if (open) dismiss(); openSearch(); }}><NavIcon name="search" />Search <kbd aria-hidden="true">{searchShortcut}</kbd></button>
            <button className="theme-toggle" type="button" onClick={toggleTheme}><NavIcon name="theme" />{themeLabel}</button>
            <DownloadCvLink onClick={open ? dismiss : undefined} />
            <NavLink to="/contact" onClick={() => setOpenOn(null)}><NavIcon name="contact" />Get in touch</NavLink>
            <a className="sidebar-email" href={email.href}>{email.value}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
