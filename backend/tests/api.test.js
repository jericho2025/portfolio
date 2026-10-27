import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../app.js';
import { createGithubService } from '../services/githubService.js';

async function request(t, app, path) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return fetch(`http://127.0.0.1:${server.address().port}${path}`);
}

test('health responds with JSON', async t => {
  const response = await request(t, createApp(), '/api/health');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('GitHub service projects public fields and caches responses', async () => {
  let calls = 0;
  const service = createGithubService(async url => {
    calls++;
    return { ok: true, json: async () => url.includes('/repos?')
      ? [{ id: 1, name: 'real-repo', html_url: 'https://github.com/jericho2025/real-repo', private: false, fork: false, secret: 'omit' }]
      : { login: 'jericho2025', html_url: 'https://github.com/jericho2025', secret: 'omit' } };
  });
  const data = await service.getOverview();
  assert.equal(data.profile.login, 'jericho2025');
  assert.equal(data.repositories[0].name, 'real-repo');
  assert.equal(JSON.stringify(data).includes('secret'), false);
  await service.getOverview();
  assert.equal(calls, 2);
});

test('empty public repository list remains empty', async () => {
  const service = createGithubService(async url => ({ ok: true, json: async () => url.includes('/repos?') ? [] : { login: 'jericho2025' } }));
  assert.deepEqual((await service.getOverview()).repositories, []);
});

for (const status of [403, 429, 500]) {
  test(`upstream ${status} returns a safe error`, async t => {
    const service = createGithubService(async () => ({ ok: false, status }));
    const response = await request(t, createApp(service), '/api/github');
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'GitHub is temporarily unavailable. Please try again later.' });
  });
}

test('network failures do not leak upstream details', async t => {
  const service = createGithubService(async () => { throw new Error('private token'); });
  const response = await request(t, createApp(service), '/api/github');
  assert.equal(response.status, 502);
  assert.equal(JSON.stringify(await response.json()).includes('private token'), false);
});

test('unknown routes return JSON 404', async t => {
  const response = await request(t, createApp(), '/api/missing');
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Route not found.' });
});
