import assert from 'node:assert/strict';
import test from 'node:test';
import { createGithubActivityService } from '../services/githubService.js';

const publicEvent = {
  id: '123',
  type: 'PushEvent',
  public: true,
  repo: { name: 'jericho2025/portfolio' },
  created_at: '2026-11-21T00:00:00Z',
};

test('public GitHub events are filtered, linked, and cached independently', async () => {
  let calls = 0;
  const service = createGithubActivityService(async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.github.com/users/jericho2025/events/public?per_page=20');
    assert.equal(options.headers.Authorization, undefined);
    return Response.json([
      publicEvent,
      { ...publicEvent, id: 'private', public: false },
      { ...publicEvent, id: 'invalid-repo', repo: { name: 'bad/repo/extra' } },
      { ...publicEvent, id: 'invalid-date', created_at: 'invalid' },
      { ...publicEvent, id: 'unknown', type: 'UnknownEvent' },
    ]);
  });
  const expected = { status: 'ok', events: [{ id: '123', action: 'Pushed changes', repository: 'jericho2025/portfolio', url: 'https://github.com/jericho2025/portfolio', createdAt: publicEvent.created_at }] };
  assert.deepEqual(await service.getActivity(), expected);
  assert.deepEqual(await service.getActivity(), expected);
  assert.equal(calls, 1);
});

test('public activity reports empty, rate-limited, and other failures separately', async () => {
  const check = async (response) => createGithubActivityService(async () => response).getActivity();
  assert.deepEqual(await check(Response.json([])), { status: 'ok', events: [] });
  assert.equal((await check(new Response(null, { status: 429 }))).status, 'rate-limited');
  assert.equal((await check(new Response(null, { status: 403, headers: { 'x-ratelimit-remaining': '0' } }))).status, 'rate-limited');
  assert.equal((await check(new Response(null, { status: 403 }))).status, 'unavailable');
  assert.equal((await check(Response.json({ invalid: true }))).status, 'unavailable');
  assert.equal((await createGithubActivityService(async () => { throw new Error('offline'); }).getActivity()).status, 'unavailable');
});