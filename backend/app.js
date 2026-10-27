import express from 'express';
import { createApiRouter } from './routes/api.js';
import { createGithubService } from './services/githubService.js';
import { publicCors } from './middleware/publicCors.js';

export function createApp(githubService = createGithubService(), { allowedOrigins = process.env.FRONTEND_ORIGINS || '' } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use('/api', publicCors(allowedOrigins), createApiRouter(githubService));
  app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.status === 502 ? 502 : 500;
    res.status(status).json({ error: status === 502 ? error.message : 'An unexpected server error occurred.' });
  });
  return app;
}
