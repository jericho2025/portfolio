import profilePhoto from '../assets/jericho-profile.png';
import Skills from './Skills.jsx';
import Education from './Education.jsx';

export default function About() {
  return (
    <section className="page-content about-page" aria-labelledby="about-title">
      <div className="about-portrait"><img src={profilePhoto} alt="Jericho M. Flores" width="1230" height="1278" /></div>
      <div className="about-copy">
        <h1 id="about-title">About Me</h1>
        <p>I’m Jericho, a Full-Stack Web Developer based in Marilao, Bulacan, Philippines.</p>
        <p>My work connects frontend interfaces with backend APIs. Through WISDOM, a collaborative capstone project, I’ve contributed to UI development, backend APIs, a 3D blueprint editor, integration, and debugging.</p>
        <p>I’m looking to bring that experience to a development team and to freelance projects where thoughtful interfaces and practical functionality matter. I continue to learn and develop my technical skills by building responsive, user-friendly websites.</p>
        <dl className="personal-details"><div><dt>Email</dt><dd><a href="mailto:jerichoflores57@gmail.com">jerichoflores57@gmail.com</a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/jericho2025" target="_blank" rel="noopener noreferrer">jericho2025<span className="sr-only"> (opens in a new tab)</span></a></dd></div><div><dt>Location</dt><dd>Marilao, Bulacan, Philippines</dd></div></dl>
        <Skills /><Education />
      </div>
    </section>
  );
}
