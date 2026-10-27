export function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
export function neighbors(index, rows, cols) {
  const result = [], row = Math.floor(index / cols), col = index % cols;
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    if ((dr || dc) && row + dr >= 0 && row + dr < rows && col + dc >= 0 && col + dc < cols) result.push((row + dr) * cols + col + dc);
  }
  return result;
}
export function createMines(rows, cols, mines, safe) {
  const cells = Array.from({ length: rows * cols }, () => ({ mine: false, count: 0, open: false, flag: false }));
  shuffle(cells.map((_, i) => i).filter(i => i !== safe)).slice(0, mines).forEach(i => { cells[i].mine = true; });
  cells.forEach((c, i) => { c.count = neighbors(i, rows, cols).filter(n => cells[n].mine).length; });
  return cells;
}
export function revealMines(cells, rows, cols, index) {
  const next = cells.map(c => ({ ...c })), queue = [index];
  while (queue.length) {
    const i = queue.pop(), cell = next[i];
    if (cell.open || cell.flag) continue;
    cell.open = true;
    if (!cell.mine && !cell.count) queue.push(...neighbors(i, rows, cols).filter(n => !next[n].mine && !next[n].open));
  }
  return next;
}
export const mineWon = cells => cells.every(c => c.mine || c.open);
export function typingMetrics(passage, typed, seconds) {
  const correct = [...typed].filter((c, i) => c === passage[i]).length;
  return { correct, wpm: seconds > 0 ? Math.round(correct / 5 / (seconds / 60)) : 0, accuracy: typed.length ? Math.round(correct / typed.length * 100) : 100 };
}
export const SHAPES = {
  I: [[1, 1, 1, 1]], O: [[1, 1], [1, 1]], T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]], Z: [[1, 1, 0], [0, 1, 1]], J: [[1, 0, 0], [1, 1, 1]], L: [[0, 0, 1], [1, 1, 1]],
};
export const sevenBag = () => shuffle(Object.keys(SHAPES));
export const emptyBoard = () => Array.from({ length: 20 }, () => Array(10).fill(0));
export const rotate = matrix => matrix[0].map((_, x) => matrix.map(row => row[x]).reverse());
export function collides(board, shape, x, y) {
  return shape.some((row, dy) => row.some((v, dx) => v && (x + dx < 0 || x + dx >= 10 || y + dy >= 20 || (y + dy >= 0 && board[y + dy][x + dx]))));
}
export function lockPiece(board, shape, x, y) {
  const next = board.map(row => [...row]); let topOut = false;
  shape.forEach((row, dy) => row.forEach((v, dx) => { if (v) { if (y + dy < 0) topOut = true; else next[y + dy][x + dx] = 1; } }));
  const remaining = next.filter(row => row.some(v => !v)), lines = 20 - remaining.length;
  return { board: [...Array.from({ length: lines }, () => Array(10).fill(0)), ...remaining], lines, topOut };
}
export function initialBlocks() {
  const bag = sevenBag(), type = bag.shift();
  return { board: emptyBoard(), piece: { shape: SHAPES[type], x: 3, y: 0 }, queue: bag, score: 0, lines: 0, locks: 0, over: false };
}
export function blocksAction(state, action) {
  if (state.over) return state;
  const { piece: p, board } = state;
  if (action === 'left' || action === 'right') { const x = p.x + (action === 'left' ? -1 : 1); return collides(board, p.shape, x, p.y) ? state : { ...state, piece: { ...p, x } }; }
  if (action === 'rotate') {
    const shape = rotate(p.shape);
    for (const offset of [0, -1, 1, -2, 2]) if (!collides(board, shape, p.x + offset, p.y)) return { ...state, piece: { ...p, shape, x: p.x + offset } };
    return state;
  }
  let y = p.y, bonus = 0;
  if (action === 'drop') { while (!collides(board, p.shape, p.x, y + 1)) { y++; bonus += 2; } }
  else if (!collides(board, p.shape, p.x, y + 1)) return { ...state, score: state.score + (action === 'down' ? 1 : 0), piece: { ...p, y: y + 1 } };
  const result = lockPiece(board, p.shape, p.x, y), queue = [...state.queue];
  if (queue.length < 7) queue.push(...sevenBag());
  const shape = SHAPES[queue.shift()], piece = { shape, x: 3, y: 0 };
  return { ...state, board: result.board, piece, queue, locks: state.locks + 1, lines: state.lines + result.lines, score: state.score + bonus + [0, 100, 300, 500, 800][result.lines], over: result.topOut || collides(result.board, shape, 3, 0) };
}
export const initialRunner = () => ({ y: 0, vy: 0, elapsed: 0, speed: 210, distance: 0, spawnIn: 1.8, obstacles: [], dead: false, jumps: 0 });
export function runnerStep(state, delta, jump = false, random = Math.random) {
  if (state.dead) return state;
  const dt = Math.min(delta, 0.04), elapsed = state.elapsed + dt, speed = Math.min(480, 210 + elapsed * 3);
  let vy = jump && state.y === 0 ? 560 : state.vy;
  let y = Math.max(0, state.y + vy * dt); vy = y > 0 ? vy - 1550 * dt : 0;
  const obstacles = state.obstacles.map(o => ({ ...o, x: o.x - speed * dt })).filter(o => o.x + o.w > 0);
  let spawnIn = state.spawnIn - dt;
  if (spawnIn <= 0) { obstacles.push({ x: 640, w: 22 + random() * 12, h: 28 + random() * 14 }); spawnIn = 1.35 + random() * 0.6; }
  const dead = obstacles.some(o => 52 < o.x + o.w && 78 > o.x && y < o.h - 3);
  return { y, vy, elapsed, speed, distance: state.distance + speed * dt, spawnIn, obstacles, dead, jumps: state.jumps + (jump && state.y === 0 ? 1 : 0) };
}
