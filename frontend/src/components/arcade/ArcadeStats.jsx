const labels = { 'mines-easy': 'Mines · easy (seconds)', 'mines-medium': 'Mines · medium (seconds)', 'mines-hard': 'Mines · hard (seconds)', 'match-easy': 'Match · easy (moves)', 'match-medium': 'Match · medium (moves)', 'match-hard': 'Match · hard (moves)', typing: 'Typing (WPM)', trivia: 'Trivia (out of 10)', blocks: 'Falling Blocks', runner: 'Dino Runner' };
export default function ArcadeStats({ progress, available, reset }) {
  const level = Math.floor(progress.xp / 100) + 1;
  return <section className="arcade-stats" aria-label="Local arcade profile">
    <div className="arcade-stat-line"><span>Total XP <strong>{progress.xp}</strong></span><span>Arcade Profile Level <strong>{level}</strong></span><span>Games Played <strong>{progress.played}</strong></span><label className="xp-progress">{progress.xp % 100} / 100 XP to next profile level <progress max="100" value={progress.xp % 100} /></label></div>
    <div className="arcade-records"><details><summary>Personal Records ({Object.keys(progress.records).length})</summary>{Object.keys(progress.records).length ? <dl>{Object.entries(progress.records).map(([key, value]) => <div key={key}><dt>{labels[key]}</dt><dd>{value}</dd></div>)}</dl> : <p>Complete a qualifying round to save your first record.</p>}</details><button onClick={() => { if (window.confirm('Reset all Arcade XP, games played and personal records on this browser? This cannot be undone.')) reset(); }}>Reset Arcade Progress</button></div>
    <p className="arcade-storage-note" role={available ? undefined : 'status'}>{available ? 'Progress saved in this browser.' : 'Storage unavailable. Progress is saved for this session only.'}</p>
  </section>;
}
