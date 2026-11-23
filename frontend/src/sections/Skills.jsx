import { skillGroupId, skillGroups } from '../data/skills.js';

export function SkillList({ skills, label }) {
  return (
    <ul className="skill-tiles" aria-label={label}>
      {skills.map(skill => <li className="skill-tile" key={skill}>{skill}</li>)}
    </ul>
  );
}

function SkillCategory({ title, skills }) {
  return (
    <div className="skill-group" id={skillGroupId(title)} tabIndex={-1}>
      <h3>{title}</h3>
      <SkillList skills={skills} />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section" tabIndex={-1} aria-labelledby="skills-title">
      <p className="eyebrow">Technical skills</p>
      <h2 id="skills-title">Tech Stack</h2>
      <div className="skills-list">
        {skillGroups.map(group => <SkillCategory key={group.title} {...group} />)}
      </div>
    </section>
  );
}
