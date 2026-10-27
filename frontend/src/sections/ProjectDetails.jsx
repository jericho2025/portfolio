import { Link } from 'react-router-dom';
import WisdomFeatureShowcase from '../components/WisdomFeatureShowcase.jsx';

const technologies = [
  ['Frontend', ['React.js', 'JavaScript / JSX', 'CSS3', 'React Router']],
  ['Backend', ['Node.js', 'Express.js', 'REST APIs']],
  ['Database', ['MySQL']],
  ['3D Development', ['Three.js']],
  ['Version Control', ['Git', 'GitHub']],
];

export default function ProjectDetails() {
  return (
    <article className="page-content project-page" aria-labelledby="project-title">
      <Link className="text-link back-link" to="/portfolio">← Back to portfolio</Link>
      <header className="project-heading"><p className="eyebrow">Full-Stack Web Application · Collaborative Development</p><h1 id="project-title">WISDOM</h1><p>Web-Based Sales &amp; Inventory with Digital Blueprint for Spiral Wood Services</p></header>
      <div className="project-detail-grid">
        <div className="project-summary">
          <section aria-labelledby="overview-title"><h2 id="overview-title">Project Overview</h2><p>A collaborative full-stack system developed for Spiral Wood Services to manage sales, inventory, and custom furniture workflows. Features an interactive 3D blueprint editor and customer furniture customization.</p></section>
          <section aria-labelledby="contributions-title"><h2 id="contributions-title">Development Contributions</h2><ul><li>Frontend Development</li><li>Backend API Development</li><li>3D Blueprint Editor Development</li><li>System Integration &amp; Debugging</li><li>Testing &amp; Quality Assurance</li></ul></section>
        </div>
        <section aria-labelledby="technologies-title"><h2 id="technologies-title">Technologies Used</h2><div className="project-technologies">{technologies.map(([category, items]) => <div key={category}><h3>{category}</h3><ul className="technology-badges">{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
      </div>
      <WisdomFeatureShowcase />
    </article>
  );
}
