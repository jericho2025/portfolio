import { skillGroupId, skillGroups } from '../data/skills.js';

// Colorful product logos are bundled locally from Devicon (MIT).
// Conceptual skills have distinct colored monograms, not invented brand logos.
const brandIcons = {
  'HTML5': 'html5',
  'CSS3': 'css3',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'React.js': 'react',
  'Next.js': 'nextjs',
  'React Router': 'reactrouter',
  'Tailwind CSS': 'tailwindcss',
  'Bootstrap': 'bootstrap',
  'Node.js': 'nodejs',
  'Express.js': 'express',
  'PHP': 'php',
  'MongoDB': 'mongodb',
  'MySQL / SQL': 'mysql',
  'Supabase Database': 'supabase',
  'Python': 'python',
  'C#': 'csharp',
  'Java': 'java',
  'Figma': 'figma',
  'Git': 'git',
  'GitHub': 'github',
  'Visual Studio Code': 'vscode',
  'Vite': 'vitejs',
  'Postman': 'postman',
  'Vercel': 'vercel',
  'Cloudflare': 'cloudflare',
};

const conceptualIcons = {
  'Responsive Web Design': ['R', '#2563eb'],
  'REST API Development': ['API', '#0f766e'],
  'API Integration': ['↔', '#0891b2'],
  'UI/UX Design': ['UX', '#be185d'],
  '3D Web Interfaces': ['3D', '#7c3aed'],
  'Render / Web Deployment': ['↗', '#0d9488'],
  'Debugging & Testing': ['✓', '#15803d'],
  'System Documentation': ['D', '#b45309'],
  'AI-assisted Development': ['AI', '#7c3aed'],
  'XAMPP': ['X', '#f37626'],
};

function SkillIcon({ name }) {
  const icon = brandIcons[name];
  if (icon) {
    return (
      <svg className={['github', 'express', 'vercel', 'nextjs'].includes(icon) ? 'skill-icon skill-logo-dark' : 'skill-icon'} viewBox="0 0 128 128" focusable="false" aria-hidden="true">
        <use href={`/icons/skill-sprite.svg#${icon}`} />
      </svg>
    );
  }
  const [mark, color] = conceptualIcons[name] || ['•', '#64748b'];
  return <span aria-hidden="true" className="skill-icon skill-concept-icon" style={{ '--skill-color': color }}>{mark}</span>;
}

export function SkillList({ skills, label }) {
  return (
    <ul className="skill-tiles" aria-label={label}>
      {skills.map(skill => <li className="skill-tile" key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>)}
    </ul>
  );
}

function SkillCategory({ title, skills }) {
  return (
    <div className="skill-group" id={skillGroupId(title)} tabIndex={-1}>
      <h3>{title}</h3>
      <SkillList skills={skills} label={title} />
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
