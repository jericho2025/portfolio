// All entries are explicitly approved by the portfolio owner.
// AI workflow tool names are displayed separately in Hero.jsx and do not affect this count.
export const skillGroups = [
  {
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'React Router', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'PHP', 'REST API Development', 'API Integration'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL / SQL', 'Supabase Database'],
  },
  {
    title: 'Other Programming Languages',
    skills: ['Python', 'C#', 'Java'],
  },
  {
    title: 'UI/UX & Specialized Development',
    skills: ['Figma', 'Canva', 'UI/UX Design', '3D Web Interfaces'],
  },
  {
    title: 'Mobile Development',
    skills: ['FlutterFlow', 'Android SDK'],
  },
  {
    title: 'Development Tools & Workflow',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Vite', 'Postman', 'Render / Web Deployment', 'Vercel', 'Cloudflare', 'XAMPP', 'Debugging & Testing', 'System Documentation', 'AI-assisted Development'],
  },
];

export const featuredSkills = [
  'React.js', 'Next.js', 'JavaScript', 'Node.js', 'Express.js',
  'MongoDB', 'Supabase Database', 'MySQL / SQL', 'FlutterFlow', 'Android SDK', 'Vercel', 'Cloudflare',
];

export const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);
export const skillGroupId = title => 'skill-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
