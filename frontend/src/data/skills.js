export const skillGroups = [
  {
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'React Router', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'PHP', 'REST API Development', 'API Integration'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL / SQL'],
  },
  {
    title: 'Other Programming Languages',
    skills: ['Python', 'C#', 'Java'],
  },
  {
    title: 'UI/UX & Specialized Development',
    skills: ['Figma', 'UI/UX Design', '3D Web Interfaces'],
  },
  {
    title: 'Development Tools & Workflow',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Vite', 'Postman', 'Render / Web Deployment', 'Debugging & Testing', 'System Documentation', 'AI-assisted Development'],
  },
];

export const featuredSkills = [
  'React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL / SQL', 'Git', 'Figma',
];

export const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);
export const skillGroupId = title => 'skill-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
