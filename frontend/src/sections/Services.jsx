const services = [
  ['FRONTEND WEB DEVELOPMENT', 'Building responsive, user-friendly websites and interfaces using React, JavaScript, and CSS.'],
  ['FULL-STACK WEB APPLICATIONS', 'Developing web-based systems for business workflows, including sales, inventory, and scheduling.'],
  ['BACKEND & DATABASE DEVELOPMENT', 'Building REST APIs, integrating databases, and connecting frontend applications with backend services.'],
  ['INTERACTIVE 3D WEB DEVELOPMENT', 'Creating interactive 3D viewers and furniture customization tools using Three.js.'],
];

export default function Services() {
  return <section className="page-content services-page" aria-labelledby="services-title"><div className="page-heading"><h1 id="services-title">What I Can Build</h1><p>Web development solutions focused on functionality, usability, and real-world needs.</p></div><div className="services-grid">{services.map(([title, description]) => <article key={title}><h2>{title}</h2><p>{description}</p></article>)}</div></section>;
}
