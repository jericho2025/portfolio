const platforms = [
  { id: 'email', label: 'Email', value: 'jerichoflores57@gmail.com', href: 'mailto:jerichoflores57@gmail.com' },
  { id: 'github', label: 'GitHub', value: 'jericho2025', href: 'https://github.com/jericho2025' },
  { id: 'facebook', label: 'Facebook', value: 'Jericho Flores', href: 'https://www.facebook.com/jericho.flores.554011' },
  { id: 'telegram', label: 'Telegram', value: '@reaperrr', href: 'https://t.me/reaperrr' },
  { id: 'discord', label: 'Discord', value: 'jericho_202' },
  { id: 'linkedin', label: 'LinkedIn', value: 'Coming Soon' },
];

function ContactIcon({ platform }) {
  const icons = {
    email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
    github: <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-6a4.7 4.7 0 0 0-1.3-3.3A4.3 4.3 0 0 0 18.5 2S17.4 1.7 15 3.3a12 12 0 0 0-6 0C6.6 1.7 5.5 2 5.5 2a4.3 4.3 0 0 0-.2 3.7A4.7 4.7 0 0 0 4 9c0 4.5 3 5.7 6 6a3.5 3.5 0 0 0-1 3v4" />,
    facebook: <path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.5-1.5H18V1.5A22 22 0 0 0 14.5 1C11 1 9 3 9 6v3H6v4h3v9" />,
    telegram: <><path d="m22 3-4 18-6-5-4 3v-6L2 11Z" /><path d="m8 13 10-6-6 9" /></>,
    discord: <><path d="M8 5 5 6c-2 3-3 7-3 11l5 2 1-2m8-12 3 1c2 3 3 7 3 11l-5 2-1-2M7 8c3-2 7-2 10 0M6 16c4 2 8 2 12 0" /><circle cx="8" cy="12" r="1.2" fill="currentColor" /><circle cx="16" cy="12" r="1.2" fill="currentColor" /></>,
    linkedin: <><rect x="2" y="2" width="20" height="20" rx="1" /><circle cx="7" cy="8" r=".7" fill="currentColor" /><path d="M7 11v6m5 0v-6m0 3c0-4 5-4 5 0v3" /></>,
  };
  return <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[platform]}</svg>;
}

export default function Contact() {
  return (
    <section className="page-content contact-page" aria-labelledby="contact-title">
      <div className="contact-introduction">
        <h1 id="contact-title">Let's talk.</h1>
        <p>Open to employment opportunities, freelance projects, and collaborations.</p>
        <dl className="contact-location"><div><dt>Location</dt><dd>Marilao, Bulacan, Philippines</dd></div></dl>
      </div>
      <div className="contact-details">
        <h2>GET IN TOUCH</h2>
        <dl className="contact-grid">
          {platforms.map(platform => {
            const external = platform.href && platform.id !== 'email';
            return <div key={platform.id} className={`contact-platform${platform.id === 'linkedin' ? ' is-unavailable' : ''}`}>
              <dt><ContactIcon platform={platform.id} />{platform.label}</dt>
              <dd>{platform.href ? <a href={platform.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{platform.value}{external && <span className="sr-only"> (opens in a new tab)</span>}</a> : <span className={platform.id === 'linkedin' ? 'coming-soon' : 'contact-username'}>{platform.value}</span>}</dd>
            </div>;
          })}
        </dl>
      </div>
    </section>
  );
}
