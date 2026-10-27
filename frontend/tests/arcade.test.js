import test from 'node:test';
import assert from 'node:assert/strict';
import { createMines, revealMines, mineWon, shuffle, typingMetrics, sevenBag, emptyBoard, collides, lockPiece, rotate, runnerStep, initialRunner, initialBlocks, blocksAction } from '../src/utils/arcadeLogic.js';
import { validateProgress, applyResult, reward, readProgress, STORAGE_KEY } from '../src/utils/arcadeStorage.js';
import { triviaQuestions } from '../src/data/arcadeTrivia.js';

test('mine generation: exact count, safe first cell and adjacent counts at all difficulties', () => {
  for (const [rows,cols,count] of [[9,9,10],[16,16,40],[16,30,99]]) {
    const cells=createMines(rows,cols,count,0);
    assert.equal(cells.filter(c=>c.mine).length,count); assert.equal(cells[0].mine,false);
    cells.forEach((c,i)=>{const r=Math.floor(i/cols),col=i%cols;const n=cells.filter((x,j)=>x.mine&&Math.abs(Math.floor(j/cols)-r)<=1&&Math.abs(j%cols-col)<=1&&j!==i).length;assert.equal(c.count,n);});
  }
});
test('mine flood, flags and win/loss detection',()=>{
  const cells=Array.from({length:9},()=>({mine:false,count:0,open:false,flag:false}));
  assert.ok(revealMines(cells,3,3,0).every(c=>c.open));
  cells[0].flag=true;assert.equal(revealMines(cells,3,3,0)[0].open,false);
  assert.ok(mineWon(cells.map(c=>({...c,open:true}))));
  assert.equal(mineWon(cells),false);
});
test('shuffle preserves items, metrics use correct characters and safe elapsed time',()=>{
  assert.deepEqual(shuffle([1,2,3]).sort(),[1,2,3]);
  assert.deepEqual(typingMetrics('abcde','abcXe',60),{correct:4,wpm:1,accuracy:80});
  assert.equal(typingMetrics('abc','',0).wpm,0);assert.equal(typingMetrics('abc','',0).accuracy,100);
});
test('seven bag contains all shapes; collision bounds, rotation and line clearing',()=>{
  assert.equal(new Set(sevenBag()).size,7);const board=emptyBoard();
  assert.equal(board.length,20);assert.equal(board[0].length,10);
  assert.ok(collides(board,[[1,1]],9,0));assert.ok(collides(board,[[1]],0,20));
  assert.equal(collides(board,[[1]],0,0),false);
  assert.deepEqual(rotate([[1,0],[1,1]]),[[1,1],[1,0]]);
  board[19]=Array(10).fill(1);board[19][9]=0;
  const result=lockPiece(board,[[1]],9,19);assert.equal(result.lines,1);assert.ok(result.board[0].every(x=>!x));assert.equal(board[19][9],0);
});
test('runner jump, landing, speed increase and obstacle collision',()=>{
  let s=runnerStep(initialRunner(),0.016,true,()=>0.5);assert.ok(s.y>0);
  for(let i=0;i<100;i++)s=runnerStep({...s,obstacles:[],spawnIn:99},0.016,false,()=>0.5);
  assert.equal(s.y,0);assert.ok(s.speed>initialRunner().speed);
  assert.ok(runnerStep({...initialRunner(),obstacles:[{x:55,w:24,h:32}]},0.016,false).dead);
});
test('storage validation drops malformed/unknown records',()=>{
  const p=validateProgress({xp:-1,played:Infinity,records:{typing:NaN,unknown:999}});
  assert.equal(p.xp,0);assert.equal(p.played,0);assert.deepEqual(p.records,{});
  assert.equal(validateProgress(null).xp,0);
});
test('only qualifying completed attempts earn XP; records improve in correct direction',()=>{
  assert.equal(reward({game:'blocks',score:0,activity:0,seconds:0}),0);
  assert.equal(reward({game:'typing',score:80,activity:0,seconds:30}),0);
  let p=applyResult(validateProgress(null),{game:'mines',difficulty:'easy',won:true,seconds:30,score:30});
  assert.equal(p.played,1);assert.equal(p.records['mines-easy'],30);assert.ok(p.xp>0);
  p=applyResult(p,{game:'mines',difficulty:'easy',won:true,seconds:40,score:40});assert.equal(p.records['mines-easy'],30);
  p=applyResult(p,{game:'trivia',activity:10,score:7,seconds:20});assert.equal(p.records.trivia,7);
});
test('mine reveal leaves source immutable, reveals mines on loss, and a mine is not needed for win',()=>{
  const board=createMines(9,9,10,0), mine=board.findIndex(c=>c.mine);
  const next=revealMines(board,9,9,mine); assert.ok(next[mine].open); assert.equal(board[mine].open,false);
  assert.ok(mineWon(board.map(c=>({...c,open:!c.mine}))));
});
test('all safe first click positions and repeated boards maintain exact mine count',()=>{
  for(let safe=0;safe<81;safe++){const b=createMines(9,9,10,safe);assert.equal(b[safe].mine,false);assert.equal(b.filter(c=>c.mine).length,10);}
});
test('typing errors and corrections produce accurate current-input metrics',()=>{
  assert.deepEqual(typingMetrics('hello','xxxxx',30),{correct:0,wpm:0,accuracy:0});
  assert.deepEqual(typingMetrics('hello','hello',30),{correct:5,wpm:2,accuracy:100});
});
test('trivia bank has at least 40 unique questions and four unique options including one answer',()=>{
  assert.ok(triviaQuestions.length>=40);assert.equal(new Set(triviaQuestions.map(q=>q.question)).size,triviaQuestions.length);
  for(const q of triviaQuestions){assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(o=>o===q.answer).length,1);}
});
test('blocks movement, soft drop, hard drop and lock are immutable and score consistently',()=>{
  const s=initialBlocks(), left=blocksAction(s,'left');assert.equal(left.piece.x,s.piece.x-1);assert.equal(s.piece.x,3);
  const down=blocksAction(s,'down');assert.equal(down.piece.y,1);assert.equal(down.score,1);
  const drop=blocksAction(s,'drop');assert.equal(drop.locks,1);assert.ok(drop.score>0);assert.ok(drop.board.flat().some(Boolean));
});
test('four completed lines score 800 and spawn collision ends the run',()=>{
  const board=emptyBoard();for(let y=16;y<20;y++){board[y]=Array(10).fill(1);board[y][0]=0;}
  const s={...initialBlocks(),board,piece:{shape:[[1],[1],[1],[1]],x:0,y:16}};
  const next=blocksAction(s,'tick');assert.equal(next.lines,4);assert.equal(next.score,800);assert.ok(next.board.flat().every(x=>!x));
  const full=emptyBoard();full[0]=Array(10).fill(1);full[1]=Array(10).fill(1);full[0][0]=0;full[1][0]=0;
  const over=blocksAction({...initialBlocks(),board:full,piece:{shape:[[1]],x:9,y:19}},'tick');assert.ok(over.over);
  assert.equal(blocksAction(over,'drop'),over);
});
test('blocks walls reject movement and rotations preserve block count',()=>{
  const s={...initialBlocks(),piece:{shape:[[1,1],[1,1]],x:0,y:18}};
  assert.equal(blocksAction(s,'left'),s);assert.equal(blocksAction(s,'tick').locks,1);
  assert.equal(rotate([[1,0,0],[1,1,1]]).flat().filter(Boolean).length,4);
});
test('seven-bag refill supplies every type in each consecutive bag',()=>{
  let s=initialBlocks();const types=[s.piece.shape];
  for(let i=0;i<13;i++){s=blocksAction({...s,board:emptyBoard()},'drop');types.push(s.piece.shape);}
  assert.equal(new Set(types.slice(0,7).map(JSON.stringify)).size,7);assert.equal(new Set(types.slice(7,14).map(JSON.stringify)).size,7);
});
test('runner jumping clears obstacles and cannot double jump',()=>{
  const s={...initialRunner(),y:60,vy:100,obstacles:[{x:55,w:25,h:30}]};
  const next=runnerStep(s,.016,true);assert.equal(next.dead,false);assert.equal(next.jumps,0);assert.ok(next.vy<100);
});
test('runner fair spacing, capped delta and terminal collision',()=>{
  const next=runnerStep({...initialRunner(),spawnIn:0},10,false,()=>0);assert.equal(next.obstacles.length,1);assert.ok(next.spawnIn>=1.35);assert.ok(next.elapsed<=.04);
  const dead={...next,dead:true};assert.equal(runnerStep(dead,.016,true),dead);
});
test('all XP eligibility boundaries and best-score direction',()=>{
  const base=validateProgress(null);
  for(const r of [{game:'mines',won:false,seconds:30,score:30},{game:'match',won:true,difficulty:'easy',seconds:0,score:2},{game:'trivia',activity:9,seconds:20,score:9},{game:'runner',activity:0,seconds:20,score:20},{game:'blocks',activity:5,seconds:14,score:50}])assert.equal(applyResult(base,r),base);
  let p=applyResult(base,{game:'typing',score:40,seconds:30,activity:100});
  p=applyResult(p,{game:'typing',score:30,seconds:30,activity:100});assert.equal(p.records.typing,40);assert.equal(p.played,2);
});
test('storage missing/malformed/unavailable is safe and valid data round-trips',()=>{
  globalThis.localStorage={getItem:()=>null};assert.equal(readProgress().progress.xp,0);
  globalThis.localStorage={getItem:()=>'{bad'};assert.equal(readProgress().available,false);
  globalThis.localStorage={getItem:()=>{throw Error('denied');}};assert.equal(readProgress().available,false);
  const stored={xp:80,played:2,records:{trivia:8}};
  globalThis.localStorage={getItem:key=>{assert.equal(key,STORAGE_KEY);return JSON.stringify(stored);}};assert.deepEqual(readProgress().progress,stored);
  delete globalThis.localStorage;
});
