import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [['/', 'Home'], ['/about', 'About Me'], ['/portfolio', 'Portfolio'], ['/services', 'Services'], ['/github', 'GitHub'], ['/arcade', 'Arcade'], ['/contact', 'Contact']];

export default function Navigation({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const navigation = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    // Wait for the visibility transition before moving keyboard focus.
    const timer = setTimeout(() => navigation.current?.querySelector('a')?.focus(), 180);
    return () => clearTimeout(timer);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const body = document.body, root = document.documentElement;
    const previous = { overflow: body.style.overflow, padding: body.style.paddingRight, rootOverflow: root.style.overflow };
    const scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar) body.style.paddingRight = `${scrollbar}px`;
    body.style.overflow = 'hidden'; root.style.overflow = 'hidden';
    const background = [...document.querySelectorAll('#main, .footer')].map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    return () => {
      body.style.overflow = previous.overflow; body.style.paddingRight = previous.padding; root.style.overflow = previous.rootOverflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
    };
  }, [open]);
  useEffect(() => {
    function escape(event) {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab' && open) {
        const controls = [...navigation.current.closest('header').querySelectorAll('a, button')].filter(element => element.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    function outside(event) { if (open && !navigation.current.closest('header').contains(event.target)) { setOpen(false); toggle.current?.focus(); } }
    const media = matchMedia('(min-width: 901px)');
    const close = () => setOpen(false);
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    media.addEventListener('change', close);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); media.removeEventListener('change', close); };
  }, [open]);
  return (
    <header className="site-header"><div className="nav-shell">
      <Link className="wordmark" to="/" aria-label="Jericho Flores, home">JF.</Link>
      <nav ref={navigation} id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {links.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}><span aria-hidden="true">◐</span></button>
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" aria-hidden="true">{open ? <path d="m4 4 10 10M14 4 4 14" /> : <path d="M2 4h14M2 9h14M2 14h14" />}</svg>{open ? 'Close' : 'Menu'}</button>
      </div>
    </div></header>
  );
}
