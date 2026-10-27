import { useRef, useState } from 'react';
import { triviaQuestions } from '../../data/arcadeTrivia.js';
import { shuffle } from '../../utils/arcadeLogic.js';

export default function DeveloperTrivia({ onFinish }) {
  const [round, setRound] = useState(0);
  return <TriviaRound key={round} onFinish={onFinish} restart={() => setRound(r => r + 1)} />;
}
function TriviaRound({ onFinish, restart }) {
  const [questions] = useState(() => shuffle(triviaQuestions).slice(0, 10).map(q => ({ ...q, options: shuffle(q.options) })));
  const [index, setIndex] = useState(0), [choice, setChoice] = useState(null), [score, setScore] = useState(0), [done, setDone] = useState(false);
  const started = useRef(performance.now()), answered = useRef(false), reported = useRef(false), q = questions[index];
  function answer(option) { if (answered.current) return; answered.current = true; setChoice(option); if (option === q.answer) setScore(s => s + 1); }
  function next() {
    if (!answered.current) return;
    if (index === 9) { setDone(true); if (!reported.current) { reported.current = true; onFinish({ game: 'trivia', score, seconds: (performance.now() - started.current) / 1000, activity: 10 }); } }
    else { answered.current = false; setIndex(i => i + 1); setChoice(null); }
  }
  return <><div className="game-toolbar"><span>Question {done ? 10 : index + 1} / 10</span><span>Score: {score} / 10</span><button onClick={restart}>Play Again</button></div>{done ? <p role="status" className="game-status">Round complete — {score} of 10 correct.</p> : <><h3 className="trivia-question">{q.question}</h3><div className="trivia-options">{q.options.map(option => <button key={option} disabled={choice !== null} onClick={() => answer(option)} className={choice !== null && option === q.answer ? 'correct-answer' : choice === option ? 'incorrect-answer' : ''}>{option}{choice !== null && option === q.answer ? ' ✓' : choice === option ? ' ×' : ''}</button>)}</div><p role="status" className="game-status">{choice === null ? 'Choose one answer.' : choice === q.answer ? 'Correct.' : `Incorrect. Correct answer: ${q.answer}.`}</p><button onClick={next} disabled={choice === null}>{index === 9 ? 'See results' : 'Next question'}</button></>}</>;
}
