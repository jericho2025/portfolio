import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <section className="page-content portfolio-page" aria-labelledby="portfolio-title">
      <div className="page-heading"><h1 id="portfolio-title">Portfolio</h1><p>Collaborative full-stack project work.</p></div>
      <div className="portfolio-grid">
        <article className="project-preview"><Link to="/portfolio/wisdom">
          <img className="project-preview-image" src="/images/projects/wisdom-preview.png" alt="WISDOM public homepage showing the Spiral Wood Services header and furniture customization interface" width="1440" height="900" />
        </Link>
          <h2>WISDOM</h2>
          <h3 className="project-card-title">Web-Based Sales &amp; Inventory with Digital Blueprint for Spiral Wood Services</h3>
          <p className="project-card-subtitle">Full-Stack Web Application · Collaborative Development</p>
          <p className="project-card-description">A web-based business management system developed for Spiral Wood Services, featuring sales and inventory management, furniture customization, and an interactive 3D blueprint editor.</p>
          <div className="project-card-actions">
            <Link className="project-explore-link" to="/portfolio/wisdom">Explore Project <span aria-hidden="true">→</span></Link>
            <a className="project-live-link" href="https://spiralwoodservice.com/" target="_blank" rel="noopener noreferrer">Live Website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </article>
      </div>
    </section>
  );
}
