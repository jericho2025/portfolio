import { useEffect, useRef, useState } from 'react';
import { blocksAction, initialBlocks, SHAPES } from '../../utils/arcadeLogic.js';
import useGameClock from '../../hooks/useGameClock.js';

export default function FallingBlocks({ onFinish }) {
  const [round, setRound] = useState(0);
  return <BlocksRound key={round} onFinish={onFinish} restart={() => setRound(r => r + 1)} />;
}
function BlocksRound({ onFinish, restart }) {
  const [state, setState] = useState(initialBlocks), [started, setStarted] = useState(false), [paused, setPaused] = useState(false);
  const reported = useRef(false), seconds = useGameClock(started && !paused && !state.over);
  const active = started && !paused && !state.over;
  const act = action => { if (!paused && !state.over) { setStarted(true); setState(s => blocksAction(s, action)); } };
  useEffect(() => { if (!active) return; const id = setInterval(() => setState(s => blocksAction(s, 'tick')), 700); return () => clearInterval(id); }, [active]);
  useEffect(() => {
    const pause = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', pause); return () => document.removeEventListener('visibilitychange', pause);
  }, []);
  useEffect(() => { if (state.over && !reported.current) { reported.current = true; onFinish({ game: 'blocks', score: state.score, seconds, activity: state.locks }); } }, [state.over, state.score, state.locks, seconds, onFinish]);
  function key(e) {
    if (e.target.matches('button,input,select,textarea,a') || e.ctrlKey || e.altKey || e.metaKey) return;
    const actions = { ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'down', ArrowUp: 'rotate', ' ': 'drop' };
    if (actions[e.key]) { e.preventDefault(); act(actions[e.key]); }
    if (e.key.toLowerCase() === 'p' && started && !state.over) { e.preventDefault(); setPaused(p => !p); }
  }
  const board = state.board.map(r => [...r]);
  if (!state.over) state.piece.shape.forEach((r, dy) => r.forEach((v, dx) => { const y = state.piece.y + dy, x = state.piece.x + dx; if (v && y >= 0 && y < 20 && x >= 0 && x < 10) board[y][x] = 2; }));
  return <div className="keyboard-game" tabIndex="0" onKeyDown={key} aria-label="Falling Blocks game controls">
    <div className="game-toolbar"><span>Score: {state.score}</span><span>Lines: {state.lines}</span><button disabled={!started || state.over} onClick={e => { setPaused(p => !p); e.currentTarget.closest('.keyboard-game').focus(); }}>{paused ? 'Resume' : 'Pause'}</button><button onClick={restart}>Restart</button></div>
    <p role="status" className="game-status">{state.over ? 'Game Over — no space to spawn.' : !started ? 'Press a control to play.' : paused ? 'Paused.' : 'Endless survival'}</p>
    <div className="blocks-layout"><div className="blocks-board" role="img" onPointerDown={e => e.currentTarget.closest('.keyboard-game').focus()} aria-label="10 column by 20 row falling block board">{board.flatMap((r, y) => r.map((v, x) => <span key={`${y}-${x}`} className={v === 2 ? 'falling filled' : v ? 'filled' : ''} />))}</div><div className="blocks-next"><p>Next piece</p><div style={{ display: 'grid', gridTemplateColumns: `repeat(${SHAPES[state.queue[0]][0].length}, 18px)` }}>{SHAPES[state.queue[0]].flat().map((v, i) => <span key={i} className={v ? 'filled' : ''} />)}</div></div></div>
    <div className="game-controls">{[['left', 'Left'], ['right', 'Right'], ['rotate', 'Rotate'], ['down', 'Down'], ['drop', 'Drop']].map(([action, label]) => <button key={action} disabled={paused || state.over} onClick={e => { act(action); e.currentTarget.closest('.keyboard-game').focus(); }}>{label}</button>)}</div>
    <details className="game-instructions"><summary>How to Play</summary><p>Focus the board: ←/→ move, ↑ rotate, ↓ soft drop, Space hard drop, P pause. Or use the buttons. Clear full rows and survive at a fixed falling speed.</p></details>
  </div>;
}
