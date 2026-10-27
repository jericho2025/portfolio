import { useEffect, useRef, useState } from 'react';
import { initialRunner, runnerStep } from '../../utils/arcadeLogic.js';

export default function DinoRunner({ onFinish }) {
  const [round, setRound] = useState({ id: 0, autoStart: false });
  return <RunnerRound key={round.id} autoStart={round.autoStart} onFinish={onFinish} restart={(autoStart = false) => setRound(r => ({ id: r.id + 1, autoStart }))} />;
}
function RunnerRound({ onFinish, restart, autoStart }) {
  const [state, setState] = useState(initialRunner), [started, setStarted] = useState(autoStart), [paused, setPaused] = useState(false);
  const current = useRef(state), jumping = useRef(autoStart), reported = useRef(false), diedAt = useRef(Infinity), stage = useRef(null);
  useEffect(() => { if (autoStart) stage.current?.focus({ preventScroll: true }); }, [autoStart]);
  useEffect(() => {
    if (!started || paused || state.dead) return;
    let frame, previous;
    function tick(now) {
      // Establish a frame timestamp before consuming the first queued jump.
      if (previous === undefined) { previous = now; frame = requestAnimationFrame(tick); return; }
      const delta = (now - previous) / 1000; previous = now;
      const next = runnerStep(current.current, delta, jumping.current); jumping.current = false;
      current.current = next; setState(next); if (next.dead) diedAt.current = performance.now();
      if (!next.dead) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [started, paused, state.dead]);
  useEffect(() => { const hide = () => { if (document.hidden) setPaused(true); }; document.addEventListener('visibilitychange', hide); return () => document.removeEventListener('visibilitychange', hide); }, []);
  useEffect(() => { if (state.dead && !reported.current) { reported.current = true; onFinish({ game: 'runner', score: Math.floor(state.distance / 10), seconds: state.elapsed, activity: state.jumps }); } }, [state.dead, state.distance, state.elapsed, state.jumps, onFinish]);
  function jump() {
    stage.current?.focus({ preventScroll: true });
    if (current.current.dead) { if (performance.now() - diedAt.current > 500) restart(true); return; }
    if (!paused) { setStarted(true); jumping.current = true; }
  }
  function key(e) { if (!e.target.matches('button,input,select,textarea,a') && !e.ctrlKey && !e.altKey && !e.metaKey && [' ', 'ArrowUp'].includes(e.key)) { e.preventDefault(); if (!e.repeat) jump(); } }
  return <div ref={stage} className="keyboard-game" tabIndex="0" onKeyDown={key} aria-label="Dino Runner game controls"><div className="game-toolbar"><span>Score: {Math.floor(state.distance / 10)}</span><span>Speed: {Math.round(state.speed)}</span><button disabled={!started || state.dead} onClick={e => { setPaused(p => !p); e.currentTarget.closest('.keyboard-game').focus(); }}>{paused ? 'Resume' : 'Pause'}</button><button onClick={() => restart()}>Restart</button></div><p role="status" className="game-status">{state.dead ? `Game Over · Score ${Math.floor(state.distance / 10)} · Space or tap to restart.` : !started ? 'Press Space or tap to play.' : paused ? 'Paused.' : 'Jump over the obstacles.'}</p>
    <div className={`runner-stage ${!started ? 'is-idle' : paused || state.dead ? 'is-still' : state.y > 0 ? 'is-jumping' : 'is-running'}`}>
    <div className="runner-stage-caption" aria-hidden="true"><span>ENDLESS RUN</span><span>{!started ? 'READY WHEN YOU ARE' : state.dead ? 'RUN COMPLETE' : paused ? 'PAUSED' : 'KEEP MOVING'}</span></div>
    <svg className="runner-board" viewBox="0 0 640 190" role="img" aria-label="Original pixel dinosaur jumping over geometric obstacles" onPointerDown={jump}>
      <g className="runner-scenery" fill="none" stroke="currentColor" opacity=".14"><path d="M280 125h65l25-22 24 22h80l36-32 38 32h62" /><path d="M190 45h40m-20-8v16M475 48h46m-23-7v14" /></g>
      <path d="M0 150H640" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${i * 48 - state.distance % 48} 165h15`} stroke="currentColor" opacity=".3" />)}
      <ellipse cx="65" cy="154" rx="24" ry="3" fill="currentColor" opacity=".1" />
      <g transform={`translate(48 ${150 - state.y - 38})`} fill="currentColor" className="runner-character">
        <g className="runner-body"><path d="M0 12H10V0H30V5H34V20H20V27H5V23H0L-6 13V8Z" /><rect x="24" y="6" width="4" height="4" fill="var(--bg)" /><path d="M22 22h8v4h-8z" /></g>
        <path className="runner-leg runner-leg-back" d="M17 26h6v8h4v4h-10z" />
        <path className="runner-leg runner-leg-front" d="M8 26h6v8h4v4H8z" />
      </g>
      {state.obstacles.map((o, i) => <g key={i}><path d={`M${o.x} 150v-${o.h * .7}l${o.w / 2} -${o.h * .3}l${o.w / 2} ${o.h * .3}V150Z`} fill="currentColor" /><path d={`M${o.x + o.w * .3} ${150 - o.h * .65}l${o.w * .35} ${o.h * .3}`} stroke="var(--bg)" opacity=".6" /></g>)}
    </svg></div><div className="game-controls"><button disabled={paused} onClick={jump}>{state.dead ? 'Play Again' : 'Jump'}</button></div><details className="game-instructions"><summary>How to Play</summary><p>Space or ↑ jumps. On mobile, tap the stage or Jump. Avoid obstacles for as long as you can. After Game Over, press Space or tap to start a new run.</p></details></div>;
}
