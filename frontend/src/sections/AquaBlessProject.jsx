import { Link } from 'react-router-dom';

const liveUrl = 'https://aquabless-web-production.up.railway.app/';

const technologies = [
  ['Frontend', ['HTML', 'CSS', 'JavaScript']],
  ['Backend', ['PHP']],
  ['Database', ['MySQL', 'MariaDB']],
  ['Deployment', ['Docker', 'Railway']],
  ['Development Tools', ['XAMPP', 'GitHub']],
];

const features = [
  {
    title: 'Customer',
    description: 'Place and track water orders online.',
    functions: [
      'Browse water products and manage shopping cart items.',
      'Choose saved delivery addresses or select a location on the map.',
      'Pay by cash or GCash, with reference and proof upload for GCash.',
      'Review order history, details, and notifications.',
      'Contact customer support through the chat feature.',
      'Manage profile information, addresses, and password.',
    ],
  },
  {
    title: 'Operator',
    description: 'Handle customer orders, payments, and rider assignments.',
    functions: [
      'Review pending orders, order details, and order reports.',
      'Verify or reject GCash payments and process cash orders.',
      'Approve, cancel, and prepare orders.',
      'Assign riders and handle returned orders or delivery issues.',
      'View notifications and communicate through chat.',
    ],
  },
  {
    title: 'Rider',
    description: 'Manage assigned deliveries and delivery records.',
    functions: [
      'View pending, ongoing, delivered, and declined assignments.',
      'Open assigned orders and start deliveries.',
      'Confirm cash collection when applicable.',
      'Update delivery status and provide delivery proof.',
      'Review delivery records and report delivery issues.',
    ],
  },
  {
    title: 'Admin',
    description: 'Manage store operations, records, and reporting.',
    functions: [
      'Review daily, weekly, and monthly sales summaries.',
      'Manage products, pricing, stock levels, and product availability.',
      'Monitor orders, payment records, and sales reports.',
      'Manage employee and user accounts.',
      'Review audit logs and use database backup tools.',
    ],
  },
];

export default function AquaBlessProject() {
  return (
    <article className="page-content project-page aquabless-project-page" aria-labelledby="aquabless-title">
      <Link className="text-link back-link" to="/portfolio">← Back to portfolio</Link>
      <header className="project-heading">
        <p className="eyebrow">Web Application · Client-Based Academic Project</p>
        <h1 id="aquabless-title">AquaBless (AWODS)</h1>
        <p>Water Ordering and Delivery System for AquaBless Purified Water</p>
      </header>

      <div className="project-detail-grid">
        <div className="project-summary">
          <section aria-labelledby="aquabless-overview-title">
            <h2 id="aquabless-overview-title">Project Overview</h2>
            <p>A web-based water ordering and delivery system developed for AquaBless Purified Water, a real water-refilling business. It connects customer ordering with payment processing, rider assignments, delivery updates, and business records.</p>
            <p>The system was designed to replace order records kept through calls, text messages, Facebook Messenger, and paper notes.</p>
          </section>
          <section aria-labelledby="aquabless-features-title">
            <h2 id="aquabless-features-title">Main Features</h2>
            <ul>
              <li>Online water ordering and shopping cart</li>
              <li>Customer accounts and delivery addresses</li>
              <li>Order and payment management</li>
              <li>Rider assignment and delivery updates</li>
              <li>Admin dashboard and basic stock management</li>
            </ul>
          </section>
          <a className="primary-link" href={liveUrl} target="_blank" rel="noopener noreferrer">
            Visit Live Website <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="aquabless-demo-note">Developer: Jericho M. Flores. The academic case study lists four student proponents. The live site uses sample data.</p>
        </div>
        <section aria-labelledby="aquabless-tech-title">
          <h2 id="aquabless-tech-title">Technologies Used</h2>
          <div className="project-technologies">
            {technologies.map(([category, items]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul className="technology-badges">{items.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-modules-title">
        <p className="eyebrow">How the system works</p>
        <h2 id="aquabless-modules-title">System Modules</h2>
        <div className="aquabless-detail-layout">
          <img className="aquabless-landing-preview" src="/images/projects/aquabless-landing.avif" alt="AquaBless website landing page with a water splash and Order Now button" width="960" height="540" loading="lazy" decoding="async" />
          <div className="aquabless-module-grid">
            {features.map(feature => (
              <section key={feature.title} className="aquabless-module">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="aquabless-module-functions">{feature.functions.map(item => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
