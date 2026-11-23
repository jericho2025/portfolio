import { Router } from 'express';
import { createGithubActivityService } from '../services/githubService.js';
import { createGithubController } from '../controllers/githubController.js';

export function createApiRouter(githubService, activityService = createGithubActivityService()) {
  const router = Router();
  router.get('/health', (req, res) => res.json({ status: 'ok' }));
  router.get('/github', createGithubController(githubService));
  router.get('/github/activity', async (_req, res) => res.json(await activityService.getActivity()));
  return router;
}
