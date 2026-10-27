import { useEffect, useRef, useState } from 'react';
import useGameClock from '../../hooks/useGameClock.js';
import { typingMetrics } from '../../utils/arcadeLogic.js';
import TypingKeyboard from './TypingKeyboard.jsx';
import { virtualEdit } from '../../utils/arcadeInput.js';

const passages = [
  'A clear interface helps people focus on the task in front of them. Small details matter: a useful label, a readable message, and a button that works as expected. Good software grows through careful testing and thoughtful changes.',
  'Building a web application is a process of discovery. Start with a small idea, make it work, and improve it with feedback. Keep the code readable so another developer can understand both the purpose and the decisions behind it.',
  'The quiet workshop filled with morning light. A table stood near the window, ready for its final coat. Every measured board and careful joint had a purpose. Creating something useful takes patience, attention, and a willingness to try again.',
];
export default function SpeedTyping({ onFinish, best }) {
  const [duration, setDuration] = useState(60), [round, setRound] = useState(0);
  return <><label>Duration <select value={duration} onChange={e => { setDuration(Number(e.target.value)); setRound(r => r + 1); }}>{[30, 60, 120].map(n => <option key={n} value={n}>{n} seconds</option>)}</select></label><TypingRound key={`${duration}-${round}`} duration={duration} best={best} onFinish={onFinish} restart={() => setRound(r => r + 1)} /></>;
}
function TypingRound({ duration, best, onFinish, restart }) {
  const [passage] = useState(() => passages[Math.floor(Math.random() * passages.length)]);
  const [typed, setTyped] = useState(''), [started, setStarted] = useState(false), [done, setDone] = useState(false);
  const [finalElapsed, setFinalElapsed] = useState(null);
  const [pressed, setPressed] = useState('');
  const [shift, setShift] = useState(false);
  const input = useRef(null), valueRef = useRef(''), selection = useRef({ start: 0, end: 0 }), pressTimer = useRef(null), caretFrame = useRef(null);
  useEffect(() => () => { clearTimeout(pressTimer.current); cancelAnimationFrame(caretFrame.current); }, []);
  const start = useRef(0), reported = useRef(false), seconds = useGameClock(started && !done);
  const elapsed = finalElapsed ?? Math.min(duration, seconds), metrics = typingMetrics(passage, typed, elapsed);
  useEffect(() => { if (started && seconds >= duration) { setFinalElapsed(duration); setDone(true); } }, [seconds, started, duration]);
  useEffect(() => { if (done && !reported.current) { reported.current = true; const result = typingMetrics(passage, typed, finalElapsed); onFinish({ game: 'typing', score: result.wpm, seconds: finalElapsed, activity: typed.length }); } }, [done, finalElapsed, onFinish, passage, typed]);
  function update(value) {
    if (done) return;
    if (start.current && performance.now() - start.current >= duration * 1000) { setFinalElapsed(duration); setDone(true); return; }
    if (!start.current && value.length) { start.current = performance.now(); setStarted(true); }
    valueRef.current = value; setTyped(value); if (value.length === passage.length) { setFinalElapsed(Math.min(duration, (performance.now() - start.current) / 1000)); setDone(true); }
  }
  function rememberSelection() { if (input.current) selection.current = { start: input.current.selectionStart, end: input.current.selectionEnd }; }
  function virtualKey(key, label) {
    if (done) return;
    const result = virtualEdit(valueRef.current, key, selection.current.start, selection.current.end, passage.length);
    update(result.value); selection.current = { start: result.caret, end: result.caret };
    // Keep selection without focusing: touch users need not open the native keyboard.
    cancelAnimationFrame(caretFrame.current);
    caretFrame.current = requestAnimationFrame(() => input.current?.setSelectionRange(result.caret, result.caret));
    setPressed(label.toLowerCase()); clearTimeout(pressTimer.current); pressTimer.current = setTimeout(() => setPressed(''), 130);
    if (key !== 'Backspace') setShift(false);
  }
  return <>
    <div className="game-toolbar"><span>Time: {Math.max(0, Math.ceil(duration - elapsed))}s</span><span>WPM: {metrics.wpm}</span><span>Accuracy: {metrics.accuracy}%</span><span>Best: {best ?? '—'} WPM</span><button onClick={restart}>Restart / New Text</button></div>
    <p className="typing-passage" aria-hidden="true">{[...passage].map((c, i) => <span key={i} className={i < typed.length ? typed[i] === c ? 'typed-correct' : 'typed-incorrect' : ''}>{c}</span>)}</p>
    <label className="typing-label">Type this passage<textarea ref={input} value={typed} onChange={e => { update(e.target.value); rememberSelection(); }} onSelect={rememberSelection} disabled={done} maxLength={passage.length} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onKeyDown={e => setPressed(e.key === ' ' ? 'space' : e.key.toLowerCase())} onKeyUp={() => setPressed('')} onBlur={() => setPressed('')} onPaste={e => e.preventDefault()} aria-describedby="typing-rule" /></label>
    <TypingKeyboard pressed={done ? '' : pressed} shift={shift} onShift={() => setShift(s => !s)} onKey={virtualKey} disabled={done} />
    <p className="sr-only">{passage}</p><p role="status" className="game-status">{done ? `Finished: ${metrics.wpm} WPM, ${metrics.accuracy}% accuracy.` : 'The timer starts with your first character.'}</p>
    <p id="typing-rule" className="game-help">Type above or tap the keys. Shift changes the next character.</p>
  </>;
}
