import { Link } from 'react-router-dom';

export default function Education() {
  return (
    <section id="journey" className="education-section" aria-labelledby="education-title" tabIndex={-1}>
      <h2 id="education-title">Journey</h2>
      <ol className="journey-timeline">
        <li><p className="eyebrow">Expected graduation · 2026</p><h3>Bachelor of Science in Information Technology</h3><p>Pambayang Dalubhasaan ng Marilao</p></li>
        <li><p className="eyebrow">Collaborative capstone</p><h3><Link className="text-link" to="/portfolio/wisdom">WISDOM</Link></h3><p>Contributed to frontend development, APIs, the 3D blueprint editor, integration, and testing for Spiral Wood Services.</p></li>
        <li>
          <p className="eyebrow"><time dateTime="2026-01-21">January 21, 2026</time></p>
          <h3>IT Capstone Project Public Forum</h3>
          <p>Certificate of Attendance</p>
          <p>Pambayang Dalubhasaan ng Marilao</p>
        </li>
      </ol>
    </section>
  );
}
