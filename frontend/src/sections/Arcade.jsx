import { useState } from 'react';
import Minesweeper from '../components/arcade/Minesweeper.jsx';
import PatternMatch from '../components/arcade/PatternMatch.jsx';
import SpeedTyping from '../components/arcade/SpeedTyping.jsx';
import DeveloperTrivia from '../components/arcade/DeveloperTrivia.jsx';
import FallingBlocks from '../components/arcade/FallingBlocks.jsx';
import DinoRunner from '../components/arcade/DinoRunner.jsx';
import ArcadeStats from '../components/arcade/ArcadeStats.jsx';
import ArcadeGameTabs from '../components/arcade/ArcadeGameTabs.jsx';
import useArcadeProgress from '../hooks/useArcadeProgress.js';
import '../styles/arcade.css';

const games = [
  { id: 'mines', title: 'Minesweeper', component: Minesweeper },
  { id: 'match', title: 'Pattern Match', component: PatternMatch },
  { id: 'typing', title: 'Speed Typing Test', component: SpeedTyping },
  { id: 'trivia', title: 'Developer Trivia', component: DeveloperTrivia },
  { id: 'blocks', title: 'Endless Falling Blocks', component: FallingBlocks },
  { id: 'runner', title: 'Dino Runner', component: DinoRunner },
];
export default function Arcade() {
  const [selected, select] = useState('mines');
  const { progress, available, finish, reset } = useArcadeProgress();
  const game = games.find(g => g.id === selected), Game = game.component;
  return <section className="page-content arcade-page" aria-labelledby="arcade-title">
    <header className="arcade-intro"><h1 id="arcade-title">Activity Arcade</h1><p>Take a break and explore interactive games built with React and JavaScript.</p></header>
    <ArcadeStats progress={progress} available={available} reset={reset} />
    <ArcadeGameTabs games={games} selected={selected} select={select} />
    <section id="arcade-game-panel" role="tabpanel" aria-labelledby={`tab-${selected}`} className="arcade-game"><h2>{game.title}</h2><Game key={selected} onFinish={finish} best={progress.records.typing} /></section>
  </section>;
}
