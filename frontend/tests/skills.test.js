import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { skillCount, skillGroups, featuredSkills } from '../src/data/skills.js';

const approvedSkills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "React Router",
  "Tailwind CSS",
  "Bootstrap",
  "Responsive Web Design",
  "Node.js",
  "Express.js",
  "PHP",
  "REST API Development",
  "API Integration",
  "MongoDB",
  "MySQL / SQL",
  "Python",
  "C#",
  "Java",
  "Figma",
  "UI/UX Design",
  "3D Web Interfaces",
  "Git",
  "GitHub",
  "Visual Studio Code",
  "Vite",
  "Postman",
  "Render / Web Deployment",
  "Debugging & Testing",
  "System Documentation",
  "AI-assisted Development",
  "Supabase Database",
  "Vercel",
  "Cloudflare",
  "XAMPP",
  "Next.js",
  "FlutterFlow",
  "Android SDK"
];
const aiWorkflowTools = ['ChatGPT', 'Claude', 'Cursor', 'Grok', 'Gemini', 'GitHub Copilot'];

test('full Tech Stack contains exactly 38 approved technical skills', () => {
  const actual = skillGroups.flatMap(group => group.skills);
  assert.equal(skillGroups.length, 7);
  assert.equal(actual.length, 38);
  assert.equal(skillCount, 38);
  assert.equal(new Set(actual).size, 36);
  assert.deepEqual([...actual].sort(), [...approvedSkills].sort());
  assert.equal(actual.some(skill => aiWorkflowTools.includes(skill)), false);
  assert.equal(featuredSkills.every(skill => actual.includes(skill)), true);
});

test('all 38 skills render a branded SVG icon or a deliberate conceptual monogram', () => {
  const skillsCode = readFileSync(new URL('../src/sections/Skills.jsx', import.meta.url), 'utf8');
  const sprite = readFileSync(new URL('../public/icons/skill-sprite.svg', import.meta.url), 'utf8');
  const brandPairs = [...skillsCode.matchAll(/^\s*'([^']+)': '([^']+)',?\s*$/gm)];
  const icons = new Map(brandPairs.map(match => [match[1], match[2]]));
  const concepts = new Set([...skillsCode.matchAll(/^\s*'([^']+)': \[/gm)].map(match => match[1]));
  const symbols = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(match => match[1]));
  for (const skill of approvedSkills) {
    assert.ok(icons.has(skill) || concepts.has(skill), 'Missing icon for ' + skill);
    if (icons.has(skill)) assert.ok(symbols.has(icons.get(skill)), 'Missing SVG symbol for ' + skill);
  }
});

test('mobile skills are represented without implying Flutter, Dart or Android Studio experience', () => {
  const mobile = skillGroups.find(group => group.title === 'Mobile Development');
  assert.ok(mobile);
  assert.deepEqual(mobile.skills, ['FlutterFlow', 'Android SDK']);
  assert.ok(featuredSkills.includes('FlutterFlow'));
  assert.ok(featuredSkills.includes('Android SDK'));
  for (const notSelected of ['Flutter', 'Dart', 'Android Studio']) {
    assert.ok(!skillGroups.some(group => group.skills.includes(notSelected)));
  }
});

test('hero uses separate AI workflow section and wider dotted texture', () => {
  const hero = readFileSync(new URL('../src/sections/Hero.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  assert.match(hero, /AI tools in my workflow/);
  for (const tool of aiWorkflowTools) assert.ok(hero.includes(tool), 'Missing AI workflow tool ' + tool);
  assert.match(css, /background-image: radial-gradient\(circle, var\(--hero-dot\)/);
  assert.match(css, /mask-image: radial-gradient\(ellipse 77% 76%/);
});
