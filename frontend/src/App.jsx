import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import ProjectDetails from './sections/ProjectDetails.jsx';
import Github from './sections/Github.jsx';
import Contact from './sections/Contact.jsx';
import Services from './sections/Services.jsx';
import { useTheme } from './hooks/useTheme.js';
const Arcade = lazy(() => import('./sections/Arcade.jsx'));

const titles = { '/': 'Home', '/about': 'About Me', '/portfolio': 'Portfolio', '/portfolio/wisdom': 'WISDOM', '/services': 'Services', '/github': 'GitHub', '/arcade': 'Activity Arcade', '/contact': 'Contact' };

function RouteAccessibility() {
  const { pathname } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    document.title = (titles[normalizedPath] || 'Page not found') + ' | Jericho M. Flores';
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

function PortfolioApp() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <RouteAccessibility />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/portfolio/wisdom" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/github" element={<Github />} />
          <Route path="/arcade" element={<Suspense fallback={<p className="page-content" role="status">Loading Arcade…</p>}><Arcade /></Suspense>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<section className="page-content not-found"><p className="eyebrow">404</p><h1>Page not found.</h1><p>The page you’re looking for isn’t available.</p><Link className="text-link" to="/">Return home</Link></section>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <BrowserRouter><PortfolioApp /></BrowserRouter>;
}
