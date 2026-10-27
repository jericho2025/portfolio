const groups = [
  ['Frontend', ['React.js', 'JavaScript / JSX', 'HTML5', 'CSS3', 'Responsive design']],
  ['Backend', ['Node.js', 'Express.js', 'REST APIs', 'API integration']],
  ['Workflow', ['Git', 'GitHub', 'VS Code', 'Vite', 'Debugging']],
];

export default function Skills() {
  return <section className="skills-section" aria-labelledby="skills-title"><h2 id="skills-title">Technical Skills</h2><div className="skills-list">{groups.map(([title, skills]) => <div className="skill-group" key={title}><h3>{title}</h3><ul className="tags">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div></section>;
}
