import { Link } from 'react-router-dom';
import AquaBlessArtwork from '../components/AquaBlessArtwork.jsx';

const liveUrl = 'https://aquabless-web-production.up.railway.app/';

const modules = [
  {
    title: 'Customer experience',
    description: 'Product listings, customer accounts, cart and ordering workflows for water delivery.',
  },
  {
    title: 'Operations',
    description: 'Staff interfaces for managing orders, reviewing payments and tracking fulfillment.',
  },
  {
    title: 'Rider workflows',
    description: 'A dedicated delivery interface for assigned orders and delivery progress.',
  },
  {
    title: 'Administration',
    description: 'Role-based management tools and reporting for system administrators.',
  },
];

const stack = [
  ['Application', ['PHP 8.2', 'HTML', 'CSS', 'JavaScript']],
  ['Database', ['MySQL', 'MariaDB', 'SQL']],
  ['Hosting & tooling', ['Railway', 'Docker', 'GitHub', 'XAMPP (local development)']],
];

export default function AquaBlessProject() {
  return (
    <article className="page-content project-page aquabless-project-page" aria-labelledby="aquabless-title">
      <Link className="text-link back-link" to="/portfolio">← Back to portfolio</Link>
      <header className="project-heading">
        <p className="eyebrow">Academic case study · Collaborative development · Deployed web application</p>
        <h1 id="aquabless-title">AquaBless</h1>
        <p>Water Ordering and Delivery System</p>
      </header>
      <div className="aquabless-detail-layout">
        <AquaBlessArtwork />
        <div className="aquabless-detail-copy">
          <h2>Project overview</h2>
          <p>AquaBless is a PHP and MySQL-based web application built around the workflow of a water ordering and delivery business. It brings customer ordering, operational management, rider coordination, and administration into a role-based system.</p>
          <p>The application was originally developed for a local XAMPP environment and was later deployed online using Docker on Railway, with a separate MariaDB service.</p>
          <a className="primary-link" href={liveUrl} target="_blank" rel="noopener noreferrer">Open live website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <p className="aquabless-demo-note">Live web application using sample case-study data. Some screens require an account or an authorized role. The source repository is private.</p>
        </div>
      </div>
      <section className="aquabless-detail-section" aria-labelledby="aquabless-modules-title">
        <h2 id="aquabless-modules-title">System modules</h2>
        <div className="aquabless-module-grid">
          {modules.map(module => (
            <section key={module.title} className="aquabless-module">
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </section>
          ))}
        </div>
      </section>
      <section className="aquabless-detail-section" aria-labelledby="aquabless-stack-title">
        <h2 id="aquabless-stack-title">Technology &amp; deployment</h2>
        <div className="project-technologies aquabless-stack">
          {stack.map(([title, items]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul className="technology-badges">{items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
