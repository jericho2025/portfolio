import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import PortfolioSearch from './components/PortfolioSearch.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import { useTheme } from './hooks/useTheme.js';
const About = lazy(() => import('./sections/About.jsx'));
const ProjectDetails = lazy(() => import('./sections/ProjectDetails.jsx'));
const AquaBlessProject = lazy(() => import('./sections/AquaBlessProject.jsx'));
const Github = lazy(() => import('./sections/Github.jsx'));
const Services = lazy(() => import('./sections/Services.jsx'));
const Arcade = lazy(() => import('./sections/Arcade.jsx'));

const homeMetadata = {
  title: 'Jericho M. Flores | Aspiring Full-Stack Web Developer',
  description: 'Jericho M. Flores is an aspiring full-stack web developer in Marilao, Bulacan, Philippines. Explore his projects, technical skills, and interactive Arcade.',
};

const routeMetadata = {
  '/': homeMetadata,
  '/about': { title: 'About & Journey', description: 'Learn about Jericho M. Flores, his information technology education, professional development, and technical skills.' },
  '/portfolio': { title: 'Projects', description: 'Explore WISDOM, AquaBless Water Ordering and Delivery System, and the Personal Developer Portfolio & Interactive Arcade by Jericho M. Flores.' },
  '/portfolio/wisdom': { title: 'WISDOM', description: 'Explore the collaborative WISDOM capstone for furniture sales, inventory, and customization, including eight feature walkthroughs.' },
  '/portfolio/aquabless': { title: 'AquaBless', description: 'Explore the PHP and MySQL AquaBless Water Ordering and Delivery System case study, its role-based workflows, and live Railway demo.' },
  '/services': { title: 'Services', description: 'See the web development services offered by Jericho M. Flores.' },
  '/github': { title: 'GitHub', description: 'Browse the latest public GitHub repositories from Jericho M. Flores.' },
  '/arcade': { title: 'Activity Arcade', description: 'Play six interactive browser games and track your scores and progress locally.' },
  '/contact': { title: 'Contact', description: 'Get in touch with Jericho M. Flores about entry-level web development, freelance projects, or collaboration.' },
};

function RouteDetails() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const metadata = Object.hasOwn(routeMetadata, normalizedPath) ? routeMetadata[normalizedPath] : null;
    const title = metadata === homeMetadata ? metadata.title : (metadata?.title || 'Page not found') + ' | Jericho M. Flores';
    const description = metadata?.description || 'This page is unavailable. Return to the portfolio of Jericho M. Flores.';
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[name="robots"]').content = metadata ? 'index, follow' : 'noindex, follow';
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash, key]);
  return null;
}

function PortfolioApp() {
  const [theme, toggleTheme] = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation theme={theme} toggleTheme={toggleTheme} searchOpen={searchOpen} openSearch={() => setSearchOpen(true)} />
      <main id="main" tabIndex="-1">
        <Suspense fallback={<p className="page-content" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Projects />} />
            <Route path="/portfolio/wisdom" element={<ProjectDetails />} />
            <Route path="/portfolio/aquabless" element={<AquaBlessProject />} />
            <Route path="/services" element={<Services />} />
            <Route path="/github" element={<Github />} />
            <Route path="/arcade" element={<Arcade />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<section className="page-content not-found"><p className="eyebrow">404</p><h1>Page not found.</h1><p>The page you’re looking for isn’t available.</p><Link className="text-link" to="/">Return home</Link></section>} />
          </Routes>
          <RouteDetails />
        </Suspense>
      </main>
      <Footer />
      <PortfolioSearch open={searchOpen} setOpen={setSearchOpen} />
    </div>
  );
}

export default function App() {
  return <BrowserRouter><PortfolioApp /></BrowserRouter>;
}
