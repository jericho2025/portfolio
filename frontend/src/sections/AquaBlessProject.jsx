import { Link } from 'react-router-dom';
import AquaBlessArtwork from '../components/AquaBlessArtwork.jsx';

const liveUrl = 'https://aquabless-web-production.up.railway.app/';

const facts = [
  ['Client', 'AquaBless Purified Water'],
  ['Development', 'Sole developer — Jericho M. Flores'],
  ['Academic documentation', '4 listed proponents'],
  ['Documented', 'November 2025'],
];

const workflow = [
  ['01', 'Place an order', 'Customers browse water products, choose quantities, and provide a delivery address.'],
  ['02', 'Review & verify', 'Operators review new orders and check cash or GCash payment details.'],
  ['03', 'Assign a rider', 'The operator assigns a rider to handle the customer delivery.'],
  ['04', 'Update delivery', 'Riders view assigned tasks and update delivery progress and completion.'],
  ['05', 'Monitor records', 'Customers view order status while staff and admins review transaction records.'],
];

const modules = [
  {
    title: 'Customer experience',
    description: 'Product browsing, quantity selection, shopping cart, checkout, saved delivery addresses, order history and status notifications.',
  },
  {
    title: 'Operations',
    description: 'Order review, payment-status checking, GCash proof verification, rider assignment and order-detail management.',
  },
  {
    title: 'Rider workflows',
    description: 'A dedicated interface to view assigned deliveries, update delivery status and record completion details.',
  },
  {
    title: 'Administration',
    description: 'Sales summaries, product and stock controls, account management, payment records and activity logs.',
  },
];

const stack = [
  ['Application', ['PHP 8.2', 'HTML', 'CSS', 'JavaScript']],
  ['Data', ['MySQL', 'MariaDB', 'SQL', 'Relational database design']],
  ['Hosting & tools', ['Railway', 'Docker', 'GitHub', 'XAMPP (local development)']],
];

export default function AquaBlessProject() {
  return (
    <article className="page-content project-page aquabless-project-page" aria-labelledby="aquabless-title">
      <Link className="text-link back-link" to="/portfolio">← Back to portfolio</Link>
      <header className="project-heading aquabless-client-heading">
        <p className="eyebrow">Real business client · Sole developer · Academic case study</p>
        <h1 id="aquabless-title">AquaBless</h1>
        <p>Water Ordering and Delivery System (AWODS)</p>
      </header>

      <div className="aquabless-detail-layout">
        <AquaBlessArtwork />
        <div className="aquabless-detail-copy">
          <p className="eyebrow">Built for AquaBless Purified Water</p>
          <h2>From handwritten order logs to a connected delivery workflow.</h2>
          <p>AquaBless Purified Water is a real water-refilling business. Its ordering process relied on text messages, calls, Facebook Messenger, dealers and handwritten paper records—making it harder for staff, riders and customers to keep order information aligned.</p>
          <p>I independently developed AWODS for AquaBless Purified Water, implementing the web application to organize ordering, payment checks, rider assignments and delivery records. The academic case study documentation lists four student proponents, but I was the sole developer of the system.</p>
          <a className="primary-link" href={liveUrl} target="_blank" rel="noopener noreferrer">Open live website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <p className="aquabless-demo-note">The public deployment uses case-study sample data. Some pages require an account or an authorized role. The source code is maintained in a private repository.</p>
        </div>
      </div>

      <section className="aquabless-facts" aria-label="Project facts">
        {facts.map(([label, value]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-role-title">
        <p className="eyebrow">My role · Sole developer</p>
        <h2 id="aquabless-role-title">Independently built the AWODS application</h2>
        <p className="aquabless-section-copy">I was responsible for the development of the system, including the PHP-based web interfaces, customer and staff workflows, and MySQL database integration. The case study was prepared by a four-member academic group; the application development was my individual contribution.</p>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-problem-title">
        <p className="eyebrow">01 · Context &amp; approach</p>
        <h2 id="aquabless-problem-title">The problem we set out to solve</h2>
        <div className="aquabless-problem-grid">
          <div>
            <h3>Before AWODS</h3>
            <p>Orders coming from different messaging channels were copied into handwritten logs. Missing details, delays and miscommunication could affect coordination between staff, riders and customers.</p>
          </div>
          <div>
            <h3>Our proposed solution</h3>
            <p>Provide a shared system for customer orders, delivery assignments, payment review, order history and role-specific access—designed around AquaBless Purified Water’s existing workflow.</p>
          </div>
        </div>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-flow-title">
        <p className="eyebrow">02 · Business workflow</p>
        <h2 id="aquabless-flow-title">From order to delivery</h2>
        <ol className="aquabless-process-list">
          {workflow.map(([number, title, description]) => (
            <li key={number}>
              <span className="aquabless-process-number" aria-hidden="true">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-modules-title">
        <p className="eyebrow">03 · Role-based access</p>
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

      <section className="aquabless-detail-section" aria-labelledby="aquabless-database-title">
        <p className="eyebrow">04 · Database design</p>
        <h2 id="aquabless-database-title">Keeping records connected</h2>
        <p className="aquabless-section-copy">The case study documents an entity-relationship design, primary and foreign keys, and a normalization process through 3NF. The relational model links customers and addresses with carts, products, orders, order items, payments, delivery assignments and order-status history.</p>
        <div className="aquabless-database-flow" aria-label="Simplified data relationships">
          <span>Customer &amp; address</span><span aria-hidden="true">→</span>
          <span>Order &amp; items</span><span aria-hidden="true">→</span>
          <span>Payment &amp; delivery</span><span aria-hidden="true">→</span>
          <span>Status &amp; records</span>
        </div>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-scope-title">
        <p className="eyebrow">05 · Project scope</p>
        <h2 id="aquabless-scope-title">Built around the client’s daily operations</h2>
        <p className="aquabless-section-copy">The documented scope focuses on ordering and delivery in the business’s existing service area. GCash payments are checked manually by an operator. The study identifies full inventory management, automatic billing, live GPS tracking and a dedicated mobile app as out-of-scope or future enhancements; the admin interface does include basic product and stock controls.</p>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-stack-title">
        <p className="eyebrow">06 · Engineering</p>
        <h2 id="aquabless-stack-title">Technology &amp; deployment</h2>
        <div className="project-technologies aquabless-stack">
          {stack.map(([title, items]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul className="technology-badges">{items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="aquabless-section-copy aquabless-deployment-note">The project was first developed for a local XAMPP setup and later published as a PHP application on Railway, using Docker and a separate MariaDB database service. The case study documentation was prepared for IT-DB2 in November 2025.</p>
      </section>
    </article>
  );
}
