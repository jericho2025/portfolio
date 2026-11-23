import { Link } from 'react-router-dom';
import AquaBlessArtwork from '../components/AquaBlessArtwork.jsx';

const liveUrl = 'https://aquabless-web-production.up.railway.app/';

const facts = [
  ['Client', 'AquaBless Purified Water'],
  ['My role', 'Sole Developer'],
  ['School report', '4 student proponents'],
  ['Year', '2025'],
];

const steps = [
  ['01', 'Order water', 'Customers choose products and add them to their cart.'],
  ['02', 'Check payment', 'Staff review orders and check cash or GCash payments.'],
  ['03', 'Assign a rider', 'The operator assigns a rider to deliver the order.'],
  ['04', 'Deliver the order', 'The rider updates the delivery status.'],
  ['05', 'View the record', 'Customers and staff can check the order history.'],
];

const features = [
  {
    title: 'Customer',
    description: 'Browse water products, place orders, save addresses, and check order status.',
  },
  {
    title: 'Operator',
    description: 'Review orders, check payments, and assign riders.',
  },
  {
    title: 'Rider',
    description: 'See assigned orders and update delivery status.',
  },
  {
    title: 'Admin',
    description: 'View sales, manage products and stock, and manage accounts.',
  },
];

const stack = [
  ['Website', ['PHP 8.2', 'HTML', 'CSS', 'JavaScript']],
  ['Database', ['MySQL', 'MariaDB', 'SQL']],
  ['Tools & hosting', ['Railway', 'Docker', 'GitHub', 'XAMPP']],
];

export default function AquaBlessProject() {
  return (
    <article className="page-content project-page aquabless-project-page" aria-labelledby="aquabless-title">
      <Link className="text-link back-link" to="/portfolio">← Back to projects</Link>

      <header className="project-heading aquabless-client-heading">
        <p className="eyebrow">Real client · School project</p>
        <h1 id="aquabless-title">AquaBless</h1>
        <p>Water Ordering and Delivery System (AWODS)</p>
      </header>

      <div className="aquabless-detail-layout">
        <AquaBlessArtwork />
        <div className="aquabless-detail-copy">
          <p className="eyebrow">Project overview</p>
          <h2>A better way to order and deliver water.</h2>
          <p>AquaBless Purified Water is a real water-refilling business. The staff used calls, text messages, Facebook Messenger, and paper notes to take orders. This could lead to missing details and delays.</p>
          <p>I built AWODS, a website that helps customers order water and helps staff manage payments and deliveries.</p>
          <a className="primary-link" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit live website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <p className="aquabless-demo-note">The online site uses sample data. Some pages need an account. The source code is private.</p>
        </div>
      </div>

      <section className="aquabless-facts" aria-label="Project facts">
        {facts.map(([label, value]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-role-title">
        <p className="eyebrow">My role</p>
        <h2 id="aquabless-role-title">Sole Developer</h2>
        <p className="aquabless-section-copy">I built the website and connected it to a MySQL database. I developed the pages for customers, operators, riders, and admins.</p>
        <p className="aquabless-section-copy">The school case study lists four students. I was the only developer of the system.</p>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-problem-title">
        <p className="eyebrow">The problem &amp; solution</p>
        <h2 id="aquabless-problem-title">Why I built it</h2>
        <div className="aquabless-problem-grid">
          <div>
            <h3>Before</h3>
            <p>Orders came from different places and were written on paper. Staff could lose details or miss updates.</p>
          </div>
          <div>
            <h3>With AWODS</h3>
            <p>Customers can order online. Staff can check payments and assign deliveries in one system.</p>
          </div>
        </div>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-modules-title">
        <p className="eyebrow">Main features</p>
        <h2 id="aquabless-modules-title">What the system does</h2>
        <div className="aquabless-module-grid">
          {features.map(feature => (
            <section key={feature.title} className="aquabless-module">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-flow-title">
        <p className="eyebrow">How it works</p>
        <h2 id="aquabless-flow-title">From order to delivery</h2>
        <ol className="aquabless-process-list">
          {steps.map(([number, title, description]) => (
            <li key={number}>
              <span className="aquabless-process-number" aria-hidden="true">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-database-title">
        <p className="eyebrow">Database</p>
        <h2 id="aquabless-database-title">How the data is stored</h2>
        <p className="aquabless-section-copy">A MySQL database keeps account, order, payment, and delivery details. The school report includes a database diagram and a design organized up to 3NF.</p>
        <div className="aquabless-database-flow" aria-label="Basic database flow">
          <span>Customer</span><span aria-hidden="true">→</span>
          <span>Order</span><span aria-hidden="true">→</span>
          <span>Payment</span><span aria-hidden="true">→</span>
          <span>Delivery</span>
        </div>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-stack-title">
        <p className="eyebrow">Technology</p>
        <h2 id="aquabless-stack-title">Tools I used</h2>
        <div className="project-technologies aquabless-stack">
          {stack.map(([title, items]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul className="technology-badges">{items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="aquabless-section-copy aquabless-deployment-note">I first built the system for XAMPP. The website now runs on Railway with Docker and a MariaDB database.</p>
      </section>

      <section className="aquabless-detail-section" aria-labelledby="aquabless-scope-title">
        <p className="eyebrow">Project notes</p>
        <h2 id="aquabless-scope-title">What is not included</h2>
        <p className="aquabless-section-copy">Staff still check GCash payments by hand. Admins can update product stock, but full inventory management, automatic billing, live GPS tracking, and a mobile app are not part of this version.</p>
      </section>
    </article>
  );
}
