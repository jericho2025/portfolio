import { Link } from 'react-router-dom';
import DownloadCvLink from '../components/DownloadCvLink.jsx';
import profilePhoto from '../assets/jericho-profile.webp';
import { ContactIcon, platforms } from './Contact.jsx';
import { ProjectShowcase, projectCount } from './Projects.jsx';
import { SkillList } from './Skills.jsx';
import { featuredSkills, skillCount } from '../data/skills.js';
import { wisdomFeatures } from '../data/wisdomFeatures.js';

import { arcadeGames } from '../data/arcadeGames.js';
import { workflowIcons } from '../data/workflowIcons.js';

const workflowTools = ['ChatGPT', 'Cursor', 'Gemini', 'Grok', 'Claude', 'GitHub Copilot'];

function WorkflowTools() {
  return (
    <div className="home-tools">
      <p id="hero-tools" className="eyebrow">AI tools in my workflow</p>
      <ul className="workflow-pills" aria-labelledby="hero-tools">
        {workflowTools.map(tool => (
          <li key={tool}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
              {workflowIcons[tool] ? <path fill="currentColor" d={workflowIcons[tool]} /> :
                <path fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"
                  d={tool === 'ChatGPT' ? 'M4 5h16v11H9l-5 4z M8 9h8 M8 12h5' : 'M5 19 19 5 M11 5h8v8 M5 13v6h6'} />}
            </svg>
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  const stats = [
    [projectCount, 'Featured projects'],
    [arcadeGames.length, 'Arcade games'],
    [skillCount, 'Technical skills'],
    [wisdomFeatures.length, 'WISDOM feature walkthroughs'],
  ];

  return (
    <div className="page-content home-page">
      <section className="home-layout" aria-labelledby="home-title">
        <div className="home-portrait"><img src={profilePhoto} alt="Jericho M. Flores in formal attire" width="1230" height="1278" fetchPriority="high" /></div>
        <div className="home-introduction">
          <p className="eyebrow home-meta"><span>Aspiring Full-Stack Web Developer</span><span>Marilao, Bulacan, Philippines</span></p>
          <h1 id="home-title">Jericho M. Flores</h1>
          <p>I build responsive interfaces with React and JavaScript, and the APIs behind them with Node.js and Express.</p>
          <p>On WISDOM, a collaborative capstone for Spiral Wood Services, I contributed to the frontend, backend APIs, and an interactive 3D blueprint editor.</p>
          <Link className="capstone-pill" to="/portfolio/wisdom">WISDOM <span aria-hidden="true">·</span> Collaborative capstone <span aria-hidden="true">↗</span></Link>
          <WorkflowTools />
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
            <li><DownloadCvLink /></li>
          </ul>
        </div>
      </section>
      <section id="featured" className="home-section highlights-section" aria-labelledby="featured-title" tabIndex={-1}>
        <h2 id="featured-title" className="eyebrow">Selected highlights</h2>
        <div className="highlight-grid">
          <Link to="/portfolio/wisdom"><strong>WISDOM</strong><span>Capstone</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
          <Link to="/arcade"><strong>Portfolio &amp; Interactive Arcade</strong><span>Personal project</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
          <Link to="/portfolio/aquabless"><strong>AquaBless</strong><span>Water ordering system</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
          <Link to="/about#journey"><strong>Pambayang Dalubhasaan ng Marilao</strong><span>Information Technology</span><span className="highlight-arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section className="home-section" aria-label="Portfolio at a glance">
        <dl className="portfolio-stats">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="home-section projects-section" aria-labelledby="selected-work">
        <div className="section-row"><h2 id="selected-work"><span aria-hidden="true">01 · </span>Projects</h2><Link className="project-all-link" to="/portfolio">all {projectCount}<span className="sr-only"> projects</span> <span aria-hidden="true">→</span></Link></div>
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
