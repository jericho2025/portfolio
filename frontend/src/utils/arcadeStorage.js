export const STORAGE_KEY = 'jericho-arcade-v1';
const finite = n => Number.isFinite(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER;
const recordKeys = ['mines-easy', 'mines-medium', 'mines-hard', 'match-easy', 'match-medium', 'match-hard', 'typing', 'trivia', 'blocks', 'runner'];
export function validateProgress(raw) {
  const records = {};
  for (const key of recordKeys) if (finite(raw?.records?.[key])) records[key] = raw.records[key];
  return { xp: finite(raw?.xp) ? Math.floor(raw.xp) : 0, played: finite(raw?.played) ? Math.floor(raw.played) : 0, records };
}
export function readProgress() {
  try { return { progress: validateProgress(JSON.parse(localStorage.getItem(STORAGE_KEY))), available: true }; }
  catch { return { progress: validateProgress(null), available: false }; }
}
export function reward(r) {
  if (!finite(r.score) || !finite(r.seconds)) return 0;
  if ((r.game === 'mines' || r.game === 'match') && r.won && r.seconds >= 1 && ['easy', 'medium', 'hard'].includes(r.difficulty)) return { easy: 30, medium: 50, hard: 80 }[r.difficulty];
  if (r.game === 'typing' && r.activity >= 25 && r.seconds >= 10) return Math.min(60, 15 + Math.floor(r.score / 5));
  if (r.game === 'trivia' && r.activity === 10 && r.score <= 10) return 10 + r.score * 4;
  if (r.game === 'blocks' && r.activity >= 5 && r.seconds >= 15 && r.score > 0) return Math.min(80, 15 + Math.floor(r.score / 100));
  if (r.game === 'runner' && r.activity >= 1 && r.seconds >= 10) return Math.min(80, 10 + Math.floor(r.seconds / 2));
  return 0;
}
export function applyResult(progress, result) {
  const xp = reward(result);
  if (!xp) return progress;
  const key = ['mines', 'match'].includes(result.game) ? `${result.game}-${result.difficulty}` : result.game;
  const previous = progress.records[key], lower = key.startsWith('mines-') || key.startsWith('match-');
  const best = previous === undefined ? result.score : lower ? Math.min(previous, result.score) : Math.max(previous, result.score);
  return { xp: progress.xp + xp, played: progress.played + 1, records: { ...progress.records, [key]: best } };
}
