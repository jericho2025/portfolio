import express, { Router } from 'express';
import { createGithubActivityService } from '../services/githubService.js';
import { createGithubController } from '../controllers/githubController.js';
import { createPresenceService } from '../services/presenceService.js';

export function createApiRouter(githubService, activityService = createGithubActivityService(), presenceService = createPresenceService()) {
  const router = Router();
  router.get('/health', (req, res) => res.json({ status: 'ok' }));
  router.get('/github', createGithubController(githubService));
  router.get('/github/activity', async (_req, res) => res.json(await activityService.getActivity()));
  router.post('/presence', express.json({ limit: '512b' }), (req, res) => {
    res.set('Cache-Control', 'no-store');
    const result = presenceService.heartbeat(req.body?.id);
    if (!result) return res.status(400).json({ error: 'A valid anonymous session ID is required.' });
    if (result.status !== 'ok') return res.status(503).json(result);
    return res.json(result);
  });
  return router;
}
