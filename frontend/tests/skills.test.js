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
  "Canva",
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

test('full Tech Stack contains exactly 39 approved technical skills', () => {
  const actual = skillGroups.flatMap(group => group.skills);
  assert.equal(skillGroups.length, 7);
  assert.equal(actual.length, 39);
  assert.equal(skillCount, 39);
  assert.equal(new Set(actual).size, 39);
  assert.deepEqual([...actual].sort(), [...approvedSkills].sort());
  assert.equal(actual.some(skill => aiWorkflowTools.includes(skill)), false);
  assert.equal(featuredSkills.every(skill => actual.includes(skill)), true);
});

test('all 39 skills render a branded SVG icon or a deliberate conceptual monogram', () => {
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

test('Canva appears exactly once within UI/UX, not as a separate invented skill', () => {
  const category = skillGroups.find(group => group.title === 'UI/UX & Specialized Development');
  assert.ok(category);
  assert.ok(category.skills.includes('Canva'));
  assert.equal(skillGroups.flatMap(group => group.skills).filter(skill => skill === 'Canva').length, 1);
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


test('AquaBless is discoverable as a deployed case study without exposing its private source', () => {
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const hero = readFileSync(new URL('../src/sections/Hero.jsx', import.meta.url), 'utf8');
  const detail = readFileSync(new URL('../src/sections/AquaBlessProject.jsx', import.meta.url), 'utf8');
  assert.match(projects, /AquaBless Water Ordering/);
  assert.match(projects, /\/portfolio\/aquabless/);
  assert.match(projects, /aquabless-web-production\.up\.railway\.app/);
  assert.match(app, /Route path="\/portfolio\/aquabless"/);
  assert.match(app, /'\/portfolio\/aquabless':/);
  assert.match(hero, /to="\/portfolio\/aquabless"/);
  assert.match(detail, /Customer/);
  assert.match(detail, /Operator/);
  assert.match(detail, /Rider/);
  assert.match(detail, /Admin/);
  assert.doesNotMatch(projects, /github\.com\/jericho2025\/awods/);
});

test('project layout displays two cards with responsive single-column break', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const hero = readFileSync(new URL('../src/sections/Hero.jsx', import.meta.url), 'utf8');
  assert.match(css, /\.portfolio-grid \{[^}]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 1250px\) \{[\s\S]*?\.portfolio-grid \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
  assert.match(css, /@media \(max-width: 660px\) \{[\s\S]*?\.portfolio-grid \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.match(css, /\.portfolio-stats dd \{[^}]*font-size: clamp\(22px, 2vw, 28px\)/);
  assert.match(projects, /project-card-title-row/);
  assert.match(projects, /project-card-description/);
  assert.match(projects, /project-demo-link/);
  assert.match(projects, /shortTitle: 'AquaBless'/);
  assert.match(hero, /all \{projectCount\}/);
});


test('homepage includes every approved skill and project cards keep complete descriptions and technology lists', () => {
  const hero = readFileSync(new URL('../src/sections/Hero.jsx', import.meta.url), 'utf8');
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const styles = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const aqua = readFileSync(new URL('../src/sections/AquaBlessProject.jsx', import.meta.url), 'utf8');
  assert.match(hero, /skillGroups\.flatMap\(group => group\.skills\)/);
  assert.match(hero, /<SkillList skills=\{allSkills\} label="All 39 technical skills"/);
  assert.match(projects, /project\.tags\.map\(tag =>/);
  assert.doesNotMatch(projects, /project\.tags\.slice\(/);
  assert.match(projects, /project-card-category/);
  assert.match(projects, /<Heading>\{project\.title\}<\/Heading>/);
  assert.match(styles, /\.portfolio-grid \{[^\n]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(styles, /-webkit-line-clamp/);
  assert.match(projects, /externalLabel: 'Live website'/);
  assert.match(aqua, /Visit Live Website/);
});


test('AquaBless follows WISDOM-style project-first copy and keeps one clear developer credit', () => {
  const detail = readFileSync(new URL('../src/sections/AquaBlessProject.jsx', import.meta.url), 'utf8');
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(detail, /Project Overview/);
  assert.match(detail, /Main Features/);
  assert.match(detail, /Technologies Used/);
  assert.match(detail, /System Modules/);
  assert.match(detail, /project-detail-grid/);
  assert.match(detail, /AquaBless Purified Water/);
  assert.match(detail, /Developer: Jericho M\. Flores/);
  assert.match(detail, /four student proponents/);
  assert.match(detail, /Visit Live Website/);
  assert.match(projects, /Client-based academic project/);
  assert.match(projects, /manages water orders, payments, rider assignments, and deliveries/);
  assert.doesNotMatch(detail, /My role|Sole Developer|I independently|I built|My contributions/);
  assert.doesNotMatch(projects, /Sole developer|Independently developed/);
  assert.match(app, /AquaBless Water Ordering and Delivery System/);
});


test('AquaBless uses its landing page preview, while the sidebar shows the original text-only identity', () => {
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const page = readFileSync(new URL('../src/sections/AquaBlessProject.jsx', import.meta.url), 'utf8');
  const nav = readFileSync(new URL('../src/components/Navigation.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const screenshot = readFileSync(new URL('../public/images/projects/aquabless-landing.avif', import.meta.url));
  assert.equal(screenshot.subarray(4, 12).toString(), 'ftypavif');
  assert.ok(screenshot.byteLength > 4000);
  assert.match(projects, /image: '\/images\/projects\/aquabless-landing\.avif'/);
  assert.match(page, /className="aquabless-landing-preview"/);
  assert.doesNotMatch(projects, /AquaBlessArtwork/);
  assert.doesNotMatch(page, /AquaBlessArtwork/);
  assert.match(nav, /Jericho M\. Flores/);
  assert.match(nav, /className="wordmark"[\s\S]*?Jericho M\. Flores<\/Link>/);
  assert.doesNotMatch(nav, /wordmark-photo|import profilePhoto/);
  assert.doesNotMatch(css, /wordmark-photo/);
});

test('site favicon uses the actual portrait instead of initials, and the sidebar remains text-only', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const favicon = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
  const navigation = readFileSync(new URL('../src/components/Navigation.jsx', import.meta.url), 'utf8');
  assert.match(html, /rel="icon" href="\/favicon\.svg\?v=portrait-20261123"/);
  assert.match(favicon, /data:image\/webp;base64,UklGR/);
  assert.doesNotMatch(favicon, />JF<\/text>/);
  assert.doesNotMatch(navigation, /wordmark-photo/);
  assert.match(navigation, /className="wordmark"[\s\S]*?Jericho M\. Flores<\/Link>/);
});

test('GitHub stays available as a page without a separate Explore sidebar entry', () => {
  const navigation = readFileSync(new URL('../src/components/Navigation.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const projects = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(navigation, /\['\/github', 'GitHub', 'github'\]/);
  assert.match(navigation, /\['\/#featured', 'Featured', 'featured'\]/);
  assert.match(navigation, /\['\/arcade', 'Arcade', 'arcade'/);
  assert.match(app, /Route path="\/github"/);
  const contact = readFileSync(new URL('../src/sections/Contact.jsx', import.meta.url), 'utf8');
  assert.match(contact, /https:\/\/github\.com\/jericho2025/);
});

test('only WISDOM and AquaBless are shown as Projects; Arcade remains a standalone page', () => {
  const projectsSource = readFileSync(new URL('../src/sections/Projects.jsx', import.meta.url), 'utf8');
  const hero = readFileSync(new URL('../src/sections/Hero.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(projectsSource, /title: 'WISDOM'/);
  assert.match(projectsSource, /title: 'AquaBless Water Ordering & Delivery System'/);
  assert.doesNotMatch(projectsSource, /Personal Developer Portfolio & Interactive Arcade|route: '\/arcade'/);
  assert.match(projectsSource, /projectCount = projects\.length/);
  assert.match(hero, /<ProjectShowcase \/>/);
  assert.match(hero, /\[arcadeGames\.length, 'Arcade games'\]/);
  assert.match(app, /Route path="\/arcade"/);
  assert.doesNotMatch(app, /and the Personal Developer Portfolio & Interactive Arcade/);
});
