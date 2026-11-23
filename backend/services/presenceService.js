// Approximate active browser-tab count. Session identifiers are anonymous,
// short-lived, and held only in memory; they are not written to a database.
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export function createPresenceService({ now = Date.now, ttlMs = 60_000, maxSessions = 2_000 } = {}) {
  const sessions = new Map();

  function sweep() {
    const timestamp = now();
    for (const [id, expiresAt] of sessions) {
      if (expiresAt <= timestamp) sessions.delete(id);
    }
    return timestamp;
  }

  function heartbeat(id) {
    if (typeof id !== 'string' || !UUID.test(id)) return null;
    const timestamp = sweep();
    if (!sessions.has(id) && sessions.size >= maxSessions) {
      return { status: 'unavailable' };
    }
    sessions.set(id, timestamp + ttlMs);
    return { status: 'ok', count: sessions.size, approximate: true };
  }

  return { heartbeat };
}
