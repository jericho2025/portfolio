import { Link } from 'react-router-dom';
import DownloadCvLink from '../components/DownloadCvLink.jsx';
import profilePhoto from '../assets/jericho-profile.webp';
import { ContactIcon, platforms } from './Contact.jsx';
import { ProjectShowcase, projectCount } from './Projects.jsx';
import { SkillList } from './Skills.jsx';
import { featuredSkills, skillGroups } from '../data/skills.js';
import { wisdomFeatures } from '../data/wisdomFeatures.js';

const featuredTools = ['React', 'Node.js', 'Three.js', 'Git'];

export default function Hero() {
  const stats = [
    [projectCount, 'Featured projects'],
    [wisdomFeatures.length, 'WISDOM feature walkthroughs'],
    [skillGroups.reduce((total, { skills }) => total + skills.length, 0), 'Listed skills and tools'],
    [2026, 'Expected graduation'],
  ];

  return (
    <div className="page-content home-page">
      <section className="home-layout" aria-labelledby="home-title">
        <div className="home-portrait"><img src={profilePhoto} alt="Jericho M. Flores in formal attire" width="1230" height="1278" fetchPriority="high" /></div>
        <div className="home-introduction">
          <p className="eyebrow home-meta"><span>Aspiring Full-Stack Web Developer</span><span>Marilao, Bulacan, Philippines</span></p>
          <h1 id="home-title">Jericho M. Flores</h1>
          <p>I build responsive web interfaces and the APIs behind them.</p>
          <p>On WISDOM, a collaborative capstone for Spiral Wood Services, I contributed to the frontend, backend APIs, and an interactive 3D blueprint editor.</p>
          <Link className="capstone-pill" to="/portfolio/wisdom">WISDOM <span aria-hidden="true">·</span> Collaborative capstone <span aria-hidden="true">↗</span></Link>
          <div className="home-tools">
            <p id="hero-tools" className="eyebrow">Development tools</p>
            <ul className="tags" aria-labelledby="hero-tools">{featuredTools.map(tool => <li key={tool}>{tool}</li>)}</ul>
          </div>
          <ul className="home-socials" aria-label="Social and contact links">
            {platforms.filter(({ href }) => href).map(({ id, label, href }) => {
              const external = id !== 'email';
              return (
                <li key={id}>
                  <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                    <ContactIcon platform={id} />{label}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section id="featured" className="home-section highlights-section" aria-labelledby="featured-title" tabIndex={-1}>
        <h2 id="featured-title" className="eyebrow">Selected highlights</h2>
        <div className="highlight-grid">
          <Link to="/portfolio/wisdom"><strong>WISDOM</strong><span>Capstone</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
          <Link to="/portfolio/wisdom"><strong>Spiral Wood Services</strong><span>Sales and inventory</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
          <Link to="/about#journey"><strong>Pambayang Dalubhasaan ng Marilao</strong><span>Information Technology</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section className="home-section" aria-label="Portfolio at a glance">
        <dl className="portfolio-stats">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="home-section" aria-labelledby="selected-work">
        <div className="section-row"><h2 id="selected-work"><span aria-hidden="true">01 · </span>Projects</h2><Link className="text-link" to="/portfolio">View all<span className="sr-only"> projects</span> <span aria-hidden="true">→</span></Link></div>
        <ProjectShowcase />
      </section>
      <section className="home-section stack-preview" aria-labelledby="stack-preview-title">
        <div className="section-row">
          <h2 id="stack-preview-title">Tech Stack</h2>
          <Link className="text-link" to="/about#skills">View Full Tech Stack <span aria-hidden="true">→</span></Link>
        </div>
        <SkillList skills={featuredSkills} label="Selected technical skills" />
      </section>
      <section id="availability" className="availability-panel" aria-labelledby="availability-title" tabIndex={-1}>
        <div className="availability-copy">
          <p className="eyebrow">Availability</p>
          <h2 id="availability-title"><span className="availability-indicator" aria-hidden="true" />Open to Opportunities</h2>
          <p className="availability-description">I'm currently open to entry-level web development opportunities, freelance projects, and meaningful collaborations. I'm interested in building practical digital solutions and growing alongside talented development teams.</p>
          <ul className="tags" aria-label="Opportunity categories">
            <li>Web Development</li>
            <li>Freelance Projects</li>
            <li>Collaborations</li>
          </ul>
        </div>
        <div className="availability-actions">
          <Link className="primary-link" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
          <DownloadCvLink className="primary-link cv-secondary" />
        </div>
      </section>
    </div>
  );
}
