import { useEffect, useRef, useState } from 'react';
import useGameClock from '../../hooks/useGameClock.js';
import { createMines, mineWon, revealMines } from '../../utils/arcadeLogic.js';

const levels = { easy: [9, 9, 10], medium: [16, 16, 40], hard: [16, 30, 99] };
export default function Minesweeper({ onFinish }) {
  const [difficulty, setDifficulty] = useState('easy'), [round, setRound] = useState(0);
  return <><label>Difficulty <select value={difficulty} onChange={e => { setDifficulty(e.target.value); setRound(r => r + 1); }}>{Object.keys(levels).map(l => <option key={l}>{l}</option>)}</select></label><MineRound key={`${difficulty}-${round}`} difficulty={difficulty} onFinish={onFinish} restart={() => setRound(r => r + 1)} /></>;
}
function MineRound({ difficulty, onFinish, restart }) {
  const [rows, cols, mines] = levels[difficulty];
  const [cells, setCells] = useState(() => Array.from({ length: rows * cols }, () => ({ open: false, flag: false })));
  const [status, setStatus] = useState('ready'), [flagMode, setFlagMode] = useState(false);
  const reported = useRef(false), seconds = useGameClock(status === 'playing');
  const flags = cells.filter(c => c.flag).length;
  useEffect(() => { if (status === 'won' && !reported.current) { reported.current = true; onFinish({ game: 'mines', difficulty, won: true, seconds: Math.max(1, seconds), score: Math.max(1, Math.round(seconds)) }); } }, [status, seconds, difficulty, onFinish]);
  function flag(index) {
    if (status === 'won' || status === 'lost' || cells[index].open || (!cells[index].flag && flags >= mines)) return;
    setCells(cells.map((c, i) => i === index ? { ...c, flag: !c.flag } : c));
  }
  function reveal(index) {
    if (flagMode) return flag(index);
    if (status === 'won' || status === 'lost' || cells[index].flag || cells[index].open) return;
    let board = cells;
    if (status === 'ready') { board = createMines(rows, cols, mines, index).map((c, i) => ({ ...c, flag: cells[i].flag })); setStatus('playing'); }
    const next = revealMines(board, rows, cols, index); setCells(next);
    if (next[index].mine) setStatus('lost'); else if (mineWon(next)) setStatus('won');
  }
  return <>
    <div className="game-toolbar"><span>Mines remaining: {mines - flags}</span><span>Time: {Math.floor(seconds)}s</span><button aria-pressed={flagMode} onClick={() => setFlagMode(!flagMode)}>Flag mode {flagMode ? 'on' : 'off'}</button><button onClick={restart}>Restart</button></div>
    <p className="game-status" role="status">{status === 'lost' ? 'Game Over — mine revealed.' : status === 'won' ? 'You cleared the board!' : 'Reveal every safe cell. First reveal is safe.'}</p>
    <div className="mine-scroll" tabIndex="0" aria-label="Minesweeper board, scroll for larger difficulties"><div className="mine-board" style={{ gridTemplateColumns: `repeat(${cols}, var(--mine-cell, 30px))` }}>
      {cells.map((c, i) => <button key={i} className={`mine-cell ${c.open ? 'revealed' : c.flag ? 'flagged' : ''}`} aria-label={`Row ${Math.floor(i / cols) + 1}, column ${i % cols + 1}: ${c.flag ? 'flagged' : c.open ? c.mine ? 'mine' : c.count + ' adjacent mines' : 'hidden'}`} disabled={status === 'lost' || status === 'won'} onClick={() => reveal(i)} onContextMenu={e => { e.preventDefault(); flag(i); }}>{c.flag ? '⚑' : (c.open || status === 'lost') && c.mine ? '✹' : c.open ? c.count || '' : ''}</button>)}
    </div></div>
    <details className="game-instructions"><summary>How to Play</summary><p>Reveal every safe cell. Right-click to flag, or enable Flag mode on touch screens. Your first reveal is safe. Large boards scroll horizontally.</p></details>
  </>;
}
