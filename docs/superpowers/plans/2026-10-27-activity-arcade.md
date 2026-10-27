# Activity Arcade implementation

Baseline: user-supplied Activity Arcade full specification, October 27, 2026.
Implement locally in React/JS/plain CSS; no backend changes, dependencies, commits or deployment.

## Design and interfaces

- `/arcade` is a separate lazy-loaded route, sharing the existing header, footer and theme.
- Six selectable tabs mount only the active game. Switching abandons a round, clears timers/listeners and awards nothing.
- Game components report a completed result through `onFinish({game, score, difficulty, seconds, won, activity})`. A round can report only once.
- Pure utilities own mine generation/reveal, shuffling, typing metrics, blocks collision/locking/queue, runner physics/collision, and validated storage/scoring.
- Versioned localStorage stores aggregate XP, qualifying completed games, and personal records only. Active rounds restart after switching/reloading. Storage failures preserve session play and show a notice.
- Profile level = floor(XP/100)+1; never affects gameplay. Mines/matching win, typing requires meaningful input and elapsed time, trivia requires all ten answers, blocks/runner require genuine survival/activity. Resets and abandoned rounds earn nothing.
- Controls use semantic buttons and scoped keyboard handling. Large mines boards scroll inside their own container; other boards scale with available width. No decorative colors.

## Tasks

1. Add failing Node tests for mine counts/safe first click/flood/win, typing metrics, seven-bag/collision/line clear, runner physics/collision, progress validation/records/XP/reset.
2. Implement pure logic and storage utilities, then run `node --test tests/arcade.test.js`.
3. Implement six independent game components, shared round clock and progress hook, 40-question trivia bank, stats and game tabs.
4. Add route/navigation and scoped arcade CSS. Preserve existing pages and backend.
5. Browser-check each game's interactions, navigation, storage, keyboard/touch controls, tab cleanup, light/dark modes and widths 1440/1366/1024/768/390/320. Run production build and inspect Git changes.

## Review focus

- First-click mines must be generated only after the initial reveal; flags cannot exceed mine count.
- Match delay blocks third flips and clears on restart/unmount.
- Typing deadlines use elapsed wall time; scores never divide by zero.
- Blocks use fixed speed, seven-bag queue, collision-safe rotation and spawn top-out; no gameplay levels.
- Runner frame deltas are bounded, obstacle gaps account for speed; all loops/listeners clean up.
- Stored data is untrusted: validate each metric and known record key, ignore malformed values. Storage unavailable must not crash games.
