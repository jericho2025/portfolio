import { Link } from 'react-router-dom';

export default function Education() {
  return (
    <section id="journey" className="education-section" aria-labelledby="education-title" tabIndex={-1}>
      <h2 id="education-title">Journey</h2>
      <ol className="journey-timeline">
        <li>
          <p className="eyebrow"><time dateTime="2023">2023</time></p>
          <div><h3>Started learning programming</h3></div>
        </li>
        <li>
          <p className="eyebrow">Collaborative capstone</p>
          <div>
            <h3><Link className="text-link" to="/portfolio/wisdom">WISDOM</Link></h3>
            <p>Contributed to frontend interfaces, backend APIs, interactive 3D blueprint functionality, integration, debugging, and testing.</p>
          </div>
        </li>
        <li>
          <p className="eyebrow"><time dateTime="2026-01-21">January 21, 2026</time></p>
          <div><h3>IT Capstone Project Public Forum</h3><p>Certificate of Attendance</p><p>Pambayang Dalubhasaan ng Marilao</p></div>
        </li>
        <li>
          <p className="eyebrow">Expected 2026</p>
          <div><h3>Bachelor of Science in Information Technology</h3><p>Pambayang Dalubhasaan ng Marilao</p></div>
        </li>
      </ol>
    </section>
  );
}
