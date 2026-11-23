import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { arcadeGames } from '../data/arcadeGames.js';
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

const gameComponents = { mines: Minesweeper, match: PatternMatch, typing: SpeedTyping, trivia: DeveloperTrivia, blocks: FallingBlocks, runner: DinoRunner };

export default function Arcade() {
  const [params] = useSearchParams();
  const { key } = useLocation();
  const requested = params.get('game');
  const initial = arcadeGames.some(game => game.id === requested) ? requested : arcadeGames[0].id;
  return <ArcadePage key={key} initial={initial} />;
}

function ArcadePage({ initial }) {
  const [selected, select] = useState(initial);
  const { progress, available, finish, reset } = useArcadeProgress();
  const game = arcadeGames.find(g => g.id === selected), Game = gameComponents[selected];
  return <section className="page-content arcade-page" aria-labelledby="arcade-title">
    <header className="arcade-intro"><h1 id="arcade-title">Activity Arcade</h1><p>Take a break and explore interactive games built with React and JavaScript.</p></header>
    <ArcadeStats progress={progress} available={available} reset={reset} />
    <ArcadeGameTabs games={arcadeGames} selected={selected} select={select} />
    <section id="arcade-game-panel" tabIndex={-1} role="tabpanel" aria-labelledby={`tab-${selected}`} className="arcade-game"><h2>{game.title}</h2><Game key={selected} onFinish={finish} best={progress.records.typing} /></section>
  </section>;
}
