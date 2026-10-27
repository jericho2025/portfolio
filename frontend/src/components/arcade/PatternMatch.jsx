import { useEffect, useRef, useState } from 'react';
import useGameClock from '../../hooks/useGameClock.js';
import { shuffle } from '../../utils/arcadeLogic.js';

const symbols = ['◈', '◇', '●', '▲', '■', '★', '✚', '○', '△', '□', '✦', '⬡', '⊕', '⊗', '≋', '⌘', '∞', '≠'];
const levels = { easy: [4, 4], medium: [4, 5], hard: [6, 6] };
export default function PatternMatch({ onFinish }) {
  const [difficulty, setDifficulty] = useState('easy'), [round, setRound] = useState(0);
  return <><label>Difficulty <select value={difficulty} onChange={e => { setDifficulty(e.target.value); setRound(r => r + 1); }}>{Object.keys(levels).map(l => <option key={l}>{l}</option>)}</select></label><MatchRound key={`${difficulty}-${round}`} difficulty={difficulty} onFinish={onFinish} restart={() => setRound(r => r + 1)} /></>;
}
function MatchRound({ difficulty, onFinish, restart }) {
  const [rows, cols] = levels[difficulty];
  const [cards] = useState(() => { const pairs = symbols.slice(0, rows * cols / 2); return shuffle([...pairs, ...pairs]); });
  const [flipped, setFlipped] = useState([]), [matched, setMatched] = useState([]), [moves, setMoves] = useState(0), [started, setStarted] = useState(false);
  const won = matched.length === cards.length, reported = useRef(false), seconds = useGameClock(started && !won);
  useEffect(() => {
    if (flipped.length !== 2) return;
    const match = cards[flipped[0]] === cards[flipped[1]];
    const id = setTimeout(() => { if (match) setMatched(m => [...m, ...flipped]); setFlipped([]); }, match ? 180 : 750);
    return () => clearTimeout(id);
  }, [flipped, cards]);
  useEffect(() => { if (won && !reported.current) { reported.current = true; onFinish({ game: 'match', difficulty, won: true, seconds: Math.max(1, seconds), score: moves }); } }, [won, onFinish, difficulty, seconds, moves]);
  function flip(i) { if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return; setStarted(true); if (flipped.length === 1) setMoves(m => m + 1); setFlipped(f => [...f, i]); }
  return <><div className="game-toolbar"><span>Moves: {moves}</span><span>Time: {Math.floor(seconds)}s</span><button onClick={restart}>Restart</button></div><p role="status" className="game-status">{won ? 'All pairs matched!' : 'Find the matching pairs.'}</p><div className="match-board" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>{cards.map((symbol, i) => { const visible = flipped.includes(i) || matched.includes(i); return <button key={i} className={`${matched.includes(i) ? 'matched' : ''} ${visible ? 'card-visible' : ''}`} aria-label={`Card ${i + 1}: ${visible ? symbol + (matched.includes(i) ? ', matched' : '') : 'face down'}`} disabled={matched.includes(i) || flipped.length === 2} onClick={() => flip(i)}>{visible ? symbol : '?'}</button>; })}</div><details className="game-instructions"><summary>How to Play</summary><p>Flip two cards to find a pair. Matching pairs stay visible; mismatches turn back.</p></details></>;
}
