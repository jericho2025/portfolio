export function publicCors(origins = '') {
  const allowed = new Set(origins.split(',').map(s => s.trim()).filter(Boolean).map(origin => {
    const url = new URL(origin);
    if (!['https:', 'http:'].includes(url.protocol) || url.origin !== origin || url.username || url.password) throw new Error('FRONTEND_ORIGINS must contain exact HTTP(S) origins without trailing slashes or paths.');
    return origin;
  }));
  return (req, res, next) => {
    res.vary('Origin');
    const origin = req.get('Origin');
    if (origin) {
      if (!allowed.has(origin)) return res.status(403).json({ error: 'Origin not allowed.' });
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    }
    if (req.method === 'OPTIONS') {
      const method = req.get('Access-Control-Request-Method');
      if (method && !['GET', 'HEAD'].includes(method)) return res.status(405).json({ error: 'Method not allowed.' });
      return res.status(204).end();
    }
    next();
  };
}
