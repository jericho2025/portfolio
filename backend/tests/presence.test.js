import assert from 'node:assert/strict';
import test from 'node:test';
import { createApp } from '../app.js';
import { createPresenceService } from '../services/presenceService.js';

const first = 'a2d9b47e-c4f3-4514-9f3a-d05b783fb230';
const second = 'bd1676b7-6c81-4ecf-9b92-88b026690faf';
const origin = 'https://portfolio-jkr6.onrender.com';

test('presence counts distinct recent sessions, refreshes heartbeats and expires idle sessions', () => {
  let clock = 1000;
  const presence = createPresenceService({ now: () => clock, ttlMs: 60_000 });
  assert.deepEqual(presence.heartbeat(first), { status: 'ok', count: 1, approximate: true });
  assert.equal(presence.heartbeat(first).count, 1);
  clock += 20_000;
  assert.equal(presence.heartbeat(second).count, 2);
  clock += 40_000;
  assert.equal(presence.heartbeat(second).count, 1);
  assert.equal(presence.heartbeat('not-a-session'), null);
});

test('presence refuses new sessions when at capacity, without fabricating counts', () => {
  const presence = createPresenceService({ maxSessions: 1 });
  assert.equal(presence.heartbeat(first).count, 1);
  assert.deepEqual(presence.heartbeat(second), { status: 'unavailable' });
  assert.equal(presence.heartbeat(first).count, 1);
});

test('presence endpoint supports allowed-origin CORS preflight and rejects invalid sessions', async t => {
  const server = createApp(undefined, { allowedOrigins: origin }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}/api/presence`;
  const preflight = await fetch(base, {
    method: 'OPTIONS',
    headers: { Origin: origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' },
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
  assert.match(preflight.headers.get('access-control-allow-methods') || '', /POST/);
  assert.match(preflight.headers.get('access-control-allow-headers') || '', /Content-Type/i);

  const good = await fetch(base, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: first }),
  });
  assert.equal(good.status, 200);
  assert.deepEqual(await good.json(), { status: 'ok', count: 1, approximate: true });
  assert.equal(good.headers.get('cache-control'), 'no-store');

  const invalid = await fetch(base, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 'not-valid' }),
  });
  assert.equal(invalid.status, 400);

  const blocked = await fetch(base, {
    method: 'POST',
    headers: { Origin: 'https://not-allowed.example', 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: second }),
  });
  assert.equal(blocked.status, 403);
});
