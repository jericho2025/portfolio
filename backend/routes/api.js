import { Router } from 'express';
import { createGithubController } from '../controllers/githubController.js';

export function createApiRouter(githubService) {
  const router = Router();
  router.get('/health', (req, res) => res.json({ status: 'ok' }));
  router.get('/github', createGithubController(githubService));
  return router;
}
