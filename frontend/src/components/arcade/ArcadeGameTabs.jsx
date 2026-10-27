export default function ArcadeGameTabs({ games, selected, select }) {
  function key(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % games.length;
    if (event.key === 'ArrowLeft') next = (index + games.length - 1) % games.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = games.length - 1;
    if (next === undefined) return;
    event.preventDefault(); select(games[next].id); document.getElementById(`tab-${games[next].id}`)?.focus();
  }
  return <div className="arcade-tabs" role="tablist" aria-label="Choose a game">{games.map((game, i) => <button key={game.id} id={`tab-${game.id}`} role="tab" aria-selected={selected === game.id} aria-controls="arcade-game-panel" tabIndex={selected === game.id ? 0 : -1} onKeyDown={e => key(e, i)} onClick={e => { select(game.id); if (e.detail > 0) requestAnimationFrame(() => document.querySelector('#arcade-game-panel .keyboard-game')?.focus({ preventScroll: true })); }}>{game.title}</button>)}</div>;
}
