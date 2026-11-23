import { Link } from 'react-router-dom';

export const projects = [
  {
    title: 'WISDOM',
    category: 'Collaborative capstone',
    description: 'Sales and inventory management for Spiral Wood Services, with furniture customization and an interactive 3D blueprint editor.',
    image: '/images/projects/wisdom-preview.png',
    alt: 'WISDOM homepage and furniture customization interface',
    dimensions: [1440, 900],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Three.js'],
    route: '/portfolio/wisdom',
    action: 'Explore project',
    externalUrl: 'https://spiralwoodservice.com/',
    externalLabel: 'Live website',
  },
  {
    title: 'AquaBless Water Ordering & Delivery System',
    shortTitle: 'AquaBless',
    category: 'Client-based academic project',
    description: 'A PHP and MySQL system for AquaBless Purified Water (AWODS) that manages water orders, payments, rider assignments, and deliveries, with stock tracking and reports.',
    image: '/images/projects/aquabless-landing.avif',
    alt: 'AquaBless landing page showing Welcome to AquaBless, an Order Now button, and a blue water splash',
    dimensions: [960, 540],
    tags: ['PHP', 'MySQL', 'MariaDB', 'JavaScript', 'Docker', 'Railway'],
    route: '/portfolio/aquabless',
    action: 'Explore project',
    externalUrl: 'https://aquabless-web-production.up.railway.app/',
    externalLabel: 'Live website',
  },
  {
    title: 'Personal Developer Portfolio & Interactive Arcade',
    shortTitle: 'Portfolio & Interactive Arcade',
    category: 'Personal full-stack project',
    description: 'A responsive portfolio with light and dark themes, live GitHub data, and six browser games with local scores and progress.',
    image: '/images/projects/arcade-preview.webp',
    alt: 'Dino Runner in the portfolio arcade, showing the jump stage and score controls',
    dimensions: [746, 466],
    tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Node.js', 'Express'],
    route: '/arcade',
    action: 'Open Arcade',
    externalUrl: 'https://github.com/jericho2025/portfolio',
    externalLabel: 'Source on GitHub',
  },
];

export const projectCount = projects.length;

function ProjectCard({ project, heading: Heading }) {
  const [width, height] = project.dimensions;

  return (
    <article className="project-preview">
      <Link className="project-image-link" to={project.route} aria-label={project.action + ': ' + project.title}>
        <img className="project-preview-image" src={project.image} alt={project.alt} width={width} height={height} loading="lazy" decoding="async" />
      </Link>
      <div className="project-card-content">
        <p className="eyebrow project-card-category">{project.category}</p>
        <div className="project-card-title-row">
          <Heading>{project.title}</Heading>
          <Link className="project-open-link" to={project.route} aria-label={`View details for ${project.title}`}><span aria-hidden="true">↗</span></Link>
        </div>
        <p className="project-card-description">{project.description}</p>
        <ul className="project-tech-list" aria-label="All project technologies">
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-card-bottom">
          <Link className="project-demo-link" to={project.route}>{project.action} <span aria-hidden="true">→</span></Link>
          <a className="project-demo-link" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
            {project.externalLabel}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase({ heading = 'h3' }) {
  return (
    <div className="portfolio-grid">
      {projects.map(project => <ProjectCard key={project.route} project={project} heading={heading} />)}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="page-content portfolio-page" aria-labelledby="portfolio-title">
      <div className="page-heading"><h1 id="portfolio-title">Projects</h1><p>Collaborative and personal full-stack projects.</p></div>
      <ProjectShowcase heading="h2" />
    </section>
  );
}