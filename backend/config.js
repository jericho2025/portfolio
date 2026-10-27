export function serverConfig(env = process.env) {
  const port = Number(env.PORT || 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer between 1 and 65535.');
  const production = env.NODE_ENV === 'production' || env.RENDER === 'true';
  return { port, host: production ? '0.0.0.0' : env.HOST || '127.0.0.1' };
}
